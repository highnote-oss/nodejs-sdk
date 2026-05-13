/**
 * Stage 3 — build the DocSpec from parsed inputs.
 *
 * Joins TypeDoc reflections with GraphQL selection sets. Pure helpers are
 * exported so they can be unit-tested in isolation.
 */

import type { JSONOutput } from "typedoc";
import type { GraphqlOpInfo } from "./parseGraphqlOps.js";
import type {
  ConfigDoc,
  ConfigOptionDoc,
  DocSpec,
  EnumDoc,
  EnumMemberDoc,
  ErrorClassDoc,
  MethodDoc,
  ParameterDoc,
  PropertyDoc,
  ResourceDoc,
  ReturnDoc,
  TypeAliasDoc,
  UtilityDoc,
} from "./render/types.js";

// TypeDoc reflection kind constants. See typedoc's ReflectionKind enum.
const KIND_MODULE = 2;
const KIND_ENUM = 8;
const KIND_ENUM_MEMBER = 16;
const KIND_VARIABLE = 32;
const KIND_FUNCTION = 64;
const KIND_CLASS = 128;
const KIND_INTERFACE = 256;
const KIND_PROPERTY = 1024;
const KIND_METHOD = 2048;
const KIND_TYPE_ALIAS = 2097152;
const KIND_TYPE_LITERAL = 65536;

const STANDARD_THROWS = [
  "HighnoteUserError",
  "HighnoteAccessDeniedError",
  "HighnoteUnexpectedResponseError",
] as const;

const TS_CODE_BLOCK = /```(?:ts|typescript)\n([\s\S]*?)\n?```/;

export function extractFirstTsCodeBlock(comment: string): string | undefined {
  const match = comment.match(TS_CODE_BLOCK);
  if (!match) return undefined;
  const body = match[1];
  if (body.length === 0) return undefined;
  return body;
}

export interface BuildDocSpecOptions {
  reflection: JSONOutput.ProjectReflection;
  graphqlOps: GraphqlOpInfo[];
}

export class DocSpecValidationError extends Error {
  constructor(public readonly issues: string[]) {
    super(`Doc generation failed with ${issues.length} issue(s):\n${issues.map((i) => `  - ${i}`).join("\n")}`);
    this.name = "DocSpecValidationError";
  }
}

export function buildDocSpec({ reflection, graphqlOps }: BuildDocSpecOptions): DocSpec {
  const ctx = createContext(reflection, graphqlOps);

  const highnote = findClass(ctx, "Highnote");
  if (!highnote) throw new Error("Could not find `Highnote` class in TypeDoc reflection");

  const resources = buildResources(ctx, highnote);
  const config = buildConfig(ctx);
  const errors = buildErrors(ctx);
  const utilities = buildUtilities(ctx);
  const enums = buildEnums(ctx);
  const types = buildTypeAliases(ctx);

  if (ctx.issues.length > 0) {
    throw new DocSpecValidationError(ctx.issues);
  }

  return { config, resources, errors, utilities, enums, types };
}

// ── Context ─────────────────────────────────────────────────────────────

interface BuildContext {
  /** Top-level children from src/index.ts re-exports + walked entry points. */
  children: JSONOutput.DeclarationReflection[];
  /** All reflections by id, for resolving references. */
  byId: Map<number, JSONOutput.DeclarationReflection>;
  /** All reflections by qualifiedName, for resolving cross-file references. */
  byQualifiedName: Map<string, JSONOutput.DeclarationReflection>;
  graphqlOps: GraphqlOpInfo[];
  /** Accumulated validation errors — surfaced together at end of run. */
  issues: string[];
}

function createContext(
  reflection: JSONOutput.ProjectReflection,
  graphqlOps: GraphqlOpInfo[],
): BuildContext {
  // With multiple entry points TypeDoc wraps each file in a Module (kind 2);
  // flatten one level so classes/enums/etc. are reachable as top-level symbols.
  const flat: JSONOutput.DeclarationReflection[] = [];
  for (const top of (reflection.children ?? []) as JSONOutput.DeclarationReflection[]) {
    if (top.kind === KIND_MODULE) {
      for (const child of (top.children ?? []) as JSONOutput.DeclarationReflection[]) {
        flat.push(child);
      }
    } else {
      flat.push(top);
    }
  }
  // Dedupe by qualified name — re-exports through index.ts produce duplicates.
  const seen = new Set<string>();
  const children: JSONOutput.DeclarationReflection[] = [];
  for (const decl of flat) {
    const key = `${decl.kind}:${decl.name}`;
    if (seen.has(key)) continue;
    seen.add(key);
    children.push(decl);
  }
  const byId = new Map<number, JSONOutput.DeclarationReflection>();
  const byQualifiedName = new Map<string, JSONOutput.DeclarationReflection>();
  const visit = (decl: JSONOutput.DeclarationReflection): void => {
    byId.set(decl.id, decl);
    if (decl.name && !byQualifiedName.has(decl.name)) byQualifiedName.set(decl.name, decl);
    for (const child of decl.children ?? []) visit(child as JSONOutput.DeclarationReflection);
  };
  for (const top of (reflection.children ?? []) as JSONOutput.DeclarationReflection[]) {
    visit(top);
  }
  return { children, byId, byQualifiedName, graphqlOps, issues: [] };
}

function findClass(ctx: BuildContext, name: string): JSONOutput.DeclarationReflection | undefined {
  return ctx.children.find((c) => c.kind === KIND_CLASS && c.name === name);
}

// ── Resources ───────────────────────────────────────────────────────────

// Properties on Highnote that aren't user-facing API resources.
const NON_RESOURCE_PROPERTIES = new Set(["test"]);

function buildResources(
  ctx: BuildContext,
  highnote: JSONOutput.DeclarationReflection,
): ResourceDoc[] {
  const out: ResourceDoc[] = [];
  for (const member of highnote.children ?? []) {
    if (member.kind !== KIND_PROPERTY) continue;
    if (NON_RESOURCE_PROPERTIES.has(member.name)) continue;
    const className = referencedTypeName(member.type);
    if (!className || !className.endsWith("Resource")) continue;
    const cls = ctx.byQualifiedName.get(className);
    if (!cls) continue;
    const methods = buildMethods(ctx, cls);
    if (methods.length === 0) continue;
    out.push({
      name: member.name,
      className,
      description: extractSummaryText(member.comment),
      methods,
    });
  }
  out.sort((a, b) => a.name.localeCompare(b.name));
  return out;
}

function buildMethods(
  ctx: BuildContext,
  cls: JSONOutput.DeclarationReflection,
): MethodDoc[] {
  const out: MethodDoc[] = [];
  for (const member of cls.children ?? []) {
    if (member.kind !== KIND_METHOD) continue;
    if (member.flags?.isPrivate || member.flags?.isProtected) continue;
    const sig = (member.signatures ?? [])[0];
    if (!sig) continue;
    const summary = extractSummaryText(sig.comment);
    const example = extractExampleCode(sig.comment);
    if (!summary) {
      ctx.issues.push(`${cls.name}.${member.name}: missing JSDoc summary`);
      continue;
    }
    if (!example) {
      ctx.issues.push(`${cls.name}.${member.name}: missing inline ts code block in JSDoc`);
      continue;
    }
    const parameters = buildParameters(ctx, sig.parameters ?? []);
    const returns = buildReturn(ctx, sig.type);
    out.push({
      name: member.name,
      signatureLabel: buildSignatureLabel(member.name, sig.parameters ?? []),
      summary,
      parameters,
      returns,
      throws: [...STANDARD_THROWS],
      example,
    });
  }
  return out;
}

function buildSignatureLabel(
  methodName: string,
  parameters: JSONOutput.ParameterReflection[],
): string {
  const paramList = parameters.map((p) => p.name).join(", ");
  return `${methodName}(${paramList})`;
}

function buildParameters(
  ctx: BuildContext,
  params: JSONOutput.ParameterReflection[],
): ParameterDoc[] {
  const out: ParameterDoc[] = [];
  for (const p of params) {
    flattenParameter(ctx, p.name, p.type, !p.flags?.isOptional, undefined, out);
  }
  return out;
}

function flattenParameter(
  ctx: BuildContext,
  path: string,
  type: JSONOutput.SomeType | undefined,
  required: boolean,
  description: string | undefined,
  out: ParameterDoc[],
): void {
  const resolved = resolveType(ctx, type);
  if (resolved && resolved.kind === "literal" && resolved.literal.children) {
    for (const child of resolved.literal.children) {
      const childRequired = required && !child.flags?.isOptional;
      flattenParameter(
        ctx,
        `${path}.${child.name}`,
        child.type,
        childRequired,
        extractSummaryText(child.comment),
        out,
      );
    }
    return;
  }
  out.push({
    path,
    type: typeToString(type),
    required,
    description,
  });
}

interface ResolvedLiteral {
  kind: "literal";
  literal: JSONOutput.DeclarationReflection;
}

function resolveType(
  ctx: BuildContext,
  type: JSONOutput.SomeType | undefined,
): ResolvedLiteral | undefined {
  if (!type) return undefined;
  if (type.type === "reflection") {
    const decl = type.declaration as JSONOutput.DeclarationReflection;
    if (decl.kind === KIND_TYPE_LITERAL && decl.children?.length) {
      return { kind: "literal", literal: decl };
    }
    if (decl.kind === KIND_INTERFACE && decl.children?.length) {
      return { kind: "literal", literal: decl };
    }
    return undefined;
  }
  if (type.type === "reference") {
    const decl = resolveReferenceTarget(ctx, type);
    if (!decl) return undefined;
    // graphql-codegen emits `export type Foo = { ... }` which TypeDoc
    // serializes with `children` directly on the TypeAlias node — check
    // children before falling through to `decl.type`.
    if ((decl.kind === KIND_TYPE_ALIAS || decl.kind === KIND_INTERFACE) && decl.children?.length) {
      return { kind: "literal", literal: decl };
    }
    if (decl.kind === KIND_TYPE_ALIAS && decl.type) {
      return resolveType(ctx, decl.type);
    }
    if (decl.kind === KIND_TYPE_LITERAL && decl.children?.length) {
      return { kind: "literal", literal: decl };
    }
  }
  return undefined;
}

function resolveReferenceTarget(
  ctx: BuildContext,
  type: Extract<JSONOutput.SomeType, { type: "reference" }>,
): JSONOutput.DeclarationReflection | undefined {
  if (typeof type.target === "number") return ctx.byId.get(type.target);
  // Cross-module / cross-file reference — fall back to qualifiedName lookup.
  const name = type.name;
  return ctx.byQualifiedName.get(name);
}

function buildReturn(
  ctx: BuildContext,
  type: JSONOutput.SomeType | undefined,
): ReturnDoc {
  const unwrapped = unwrapPromise(type);
  const typeName = computeReturnTypeName(unwrapped);
  const fields = computeReturnFields(ctx, unwrapped);
  return { typeName, fields };
}

function unwrapPromise(type: JSONOutput.SomeType | undefined): JSONOutput.SomeType | undefined {
  if (!type) return undefined;
  if (type.type === "reference" && type.name === "Promise" && type.typeArguments?.length) {
    return type.typeArguments[0];
  }
  return type;
}

function computeReturnTypeName(type: JSONOutput.SomeType | undefined): string {
  if (!type) return "void";
  if (type.type === "reflection") {
    const decl = type.declaration as JSONOutput.DeclarationReflection;
    if (decl.kind === KIND_TYPE_LITERAL) {
      const typename = findTypenameLiteral(decl);
      if (typename) return typename;
    }
  }
  if (type.type === "reference") {
    const args = type.typeArguments
      ? `<${type.typeArguments.map(typeToString).join(", ")}>`
      : "";
    return `${type.name}${args}`;
  }
  if (type.type === "intrinsic") return type.name;
  if (type.type === "array") return `${typeToString(type.elementType)}[]`;
  if (type.type === "union") {
    const candidates = type.types
      .filter((t) => !(t.type === "intrinsic" && t.name === "undefined"))
      .map(typeToString);
    return candidates.join(" | ");
  }
  return typeToString(type);
}

function findTypenameLiteral(decl: JSONOutput.DeclarationReflection): string | undefined {
  for (const child of decl.children ?? []) {
    if (child.name === "__typename" && child.type?.type === "literal") {
      const v = child.type.value;
      if (typeof v === "string") return v;
    }
  }
  return undefined;
}

function computeReturnFields(
  ctx: BuildContext,
  type: JSONOutput.SomeType | undefined,
): string[] {
  if (!type) return [];
  // Direct TypeLiteral — list its children (skip __typename).
  if (type.type === "reflection") {
    const decl = type.declaration as JSONOutput.DeclarationReflection;
    return (decl.children ?? [])
      .filter((c) => c.name !== "__typename")
      .map((c) => c.name);
  }
  // Reference to a TypeAlias / Interface / TypeLiteral — resolve and recurse.
  if (type.type === "reference") {
    const decl = resolveReferenceTarget(ctx, type);
    if ((decl?.kind === KIND_TYPE_ALIAS || decl?.kind === KIND_INTERFACE) && decl.children?.length) {
      return decl.children.filter((c) => c.name !== "__typename").map((c) => c.name);
    }
    if (decl?.kind === KIND_TYPE_ALIAS && decl.type) {
      return computeReturnFields(ctx, decl.type);
    }
  }
  // Union — merge fields from object members.
  if (type.type === "union") {
    const seen = new Set<string>();
    const merged: string[] = [];
    for (const member of type.types) {
      for (const field of computeReturnFields(ctx, member)) {
        if (!seen.has(field)) {
          seen.add(field);
          merged.push(field);
        }
      }
    }
    return merged;
  }
  // Array — return the element fields wrapped (we just show element fields).
  if (type.type === "array") {
    return computeReturnFields(ctx, type.elementType);
  }
  return [];
}

function referencedTypeName(type: JSONOutput.SomeType | undefined): string | undefined {
  if (!type) return undefined;
  if (type.type === "reference") return type.name;
  return undefined;
}

// graphql-codegen's Scalars table — maps GraphQL scalar names to TS primitives.
const SCALARS: Record<string, string> = {
  ID: "string",
  String: "string",
  Boolean: "boolean",
  Int: "number",
  Float: "number",
  Date: "string",
  IdempotencyKey: "string",
  UnsignedInt: "number",
};

function typeToString(type: JSONOutput.SomeType | undefined): string {
  if (!type) return "unknown";
  switch (type.type) {
    case "intrinsic":
      return type.name;
    case "literal":
      return JSON.stringify(type.value);
    case "reference": {
      // Maybe<T> / InputMaybe<T> are nullable wrappers — unwrap to T.
      if ((type.name === "Maybe" || type.name === "InputMaybe") && type.typeArguments?.[0]) {
        return typeToString(type.typeArguments[0]);
      }
      const args = type.typeArguments
        ? `<${type.typeArguments.map(typeToString).join(", ")}>`
        : "";
      return `${type.name}${args}`;
    }
    case "array":
      return `${typeToString(type.elementType)}[]`;
    case "union": {
      const filtered = type.types.filter(
        (t) => !(t.type === "intrinsic" && t.name === "undefined"),
      );
      return filtered.map(typeToString).join(" | ");
    }
    case "reflection":
      return "object";
    case "tuple":
      return `[${(type.elements ?? []).map(typeToString).join(", ")}]`;
    case "indexedAccess": {
      // graphql-codegen uses `Scalars['ID']['input']` everywhere; resolve.
      const scalar = matchScalarsAccess(type);
      if (scalar) return scalar;
      return `${typeToString(type.objectType)}[${typeToString(type.indexType)}]`;
    }
    default:
      return type.type;
  }
}

function matchScalarsAccess(
  type: Extract<JSONOutput.SomeType, { type: "indexedAccess" }>,
): string | undefined {
  // Pattern: Scalars['<Name>']['input' | 'output']
  if (type.objectType.type !== "indexedAccess") return undefined;
  const outer = type.objectType;
  if (
    outer.objectType.type !== "reference" ||
    outer.objectType.name !== "Scalars" ||
    outer.indexType.type !== "literal" ||
    typeof outer.indexType.value !== "string"
  ) {
    return undefined;
  }
  const scalarName = outer.indexType.value;
  return SCALARS[scalarName];
}

// ── Comments ────────────────────────────────────────────────────────────

function extractSummaryText(comment: JSONOutput.Comment | undefined): string | undefined {
  if (!comment?.summary) return undefined;
  const parts: string[] = [];
  for (const part of comment.summary) {
    if (part.kind === "text") {
      parts.push(part.text);
    } else if (part.kind === "code") {
      // Preserve inline code (`foo`) verbatim; drop multi-line ts blocks
      // since those are surfaced separately as the @example.
      if (!part.text.includes("\n")) parts.push(part.text);
    } else if (part.kind === "inline-tag" && part.tag === "@link") {
      // {@link Foo} → `Foo`
      parts.push(`\`${part.text || part.target || ""}\``);
    }
  }
  const text = parts.join("").trim();
  return text.length > 0 ? text : undefined;
}

function extractExampleCode(comment: JSONOutput.Comment | undefined): string | undefined {
  if (!comment?.summary) return undefined;
  for (const part of comment.summary) {
    if (part.kind === "code") {
      const code = extractFirstTsCodeBlock(part.text);
      if (code) return code;
    }
  }
  // Also check @example tag blocks.
  for (const block of comment.blockTags ?? []) {
    if (block.tag === "@example") {
      const text = block.content.map((p) => p.text).join("");
      const code = extractFirstTsCodeBlock(text);
      if (code) return code;
    }
  }
  return undefined;
}

// ── Config (HighnoteOptions) ────────────────────────────────────────────

function buildConfig(ctx: BuildContext): ConfigDoc {
  const opts = ctx.byQualifiedName.get("HighnoteOptions");
  if (!opts) throw new Error("Could not find `HighnoteOptions`");
  const options: ConfigOptionDoc[] = [];
  let members: readonly JSONOutput.DeclarationReflection[] | undefined;
  if (opts.kind === KIND_INTERFACE) {
    members = (opts.children ?? []) as JSONOutput.DeclarationReflection[];
  } else if (opts.kind === KIND_TYPE_ALIAS && opts.type?.type === "reflection") {
    const decl = opts.type.declaration as JSONOutput.DeclarationReflection;
    members = (decl.children ?? []) as JSONOutput.DeclarationReflection[];
  } else if (opts.kind === KIND_TYPE_LITERAL) {
    members = (opts.children ?? []) as JSONOutput.DeclarationReflection[];
  }
  for (const child of members ?? []) {
    options.push({
      name: child.name,
      type: typeToString(child.type),
      required: !child.flags?.isOptional,
      description: extractSummaryText(child.comment),
    });
  }
  return { typeName: "HighnoteOptions", options };
}

// ── Errors ──────────────────────────────────────────────────────────────

function buildErrors(ctx: BuildContext): ErrorClassDoc[] {
  const out: ErrorClassDoc[] = [];
  for (const child of ctx.children) {
    if (child.kind !== KIND_CLASS) continue;
    if (!child.name.endsWith("Error")) continue;
    if (!child.name.startsWith("Highnote")) continue;
    const properties: PropertyDoc[] = [];
    for (const member of child.children ?? []) {
      if (member.kind !== KIND_PROPERTY) continue;
      if (member.flags?.isPrivate || member.flags?.isProtected) continue;
      if (member.name === "name") continue;
      properties.push({
        name: member.name,
        type: typeToString(member.type),
        description: extractSummaryText(member.comment),
      });
    }
    out.push({
      name: child.name,
      description: extractSummaryText(child.comment),
      properties,
    });
  }
  out.sort((a, b) => a.name.localeCompare(b.name));
  return out;
}

// ── Utilities ───────────────────────────────────────────────────────────

const KNOWN_UTILITIES = new Set(["paginate", "verifyWebhookSignature"]);

function buildUtilities(ctx: BuildContext): UtilityDoc[] {
  const out: UtilityDoc[] = [];
  for (const child of ctx.children) {
    if (child.kind !== KIND_FUNCTION) continue;
    if (!KNOWN_UTILITIES.has(child.name)) continue;
    const sig = (child.signatures ?? [])[0];
    if (!sig) continue;
    const summary = extractSummaryText(sig.comment);
    const example = extractExampleCode(sig.comment);
    if (!summary) {
      ctx.issues.push(`Utility ${child.name}: missing JSDoc summary`);
      continue;
    }
    if (!example) {
      ctx.issues.push(`Utility ${child.name}: missing ts code block in JSDoc`);
      continue;
    }
    out.push({
      name: child.name,
      signatureLabel: buildSignatureLabel(child.name, sig.parameters ?? []),
      summary,
      parameters: buildParameters(ctx, sig.parameters ?? []),
      returns: buildReturn(ctx, sig.type),
      example,
    });
  }
  out.sort((a, b) => a.name.localeCompare(b.name));
  return out;
}

// ── Enums ───────────────────────────────────────────────────────────────

function buildEnums(ctx: BuildContext): EnumDoc[] {
  const out: EnumDoc[] = [];
  for (const child of ctx.children) {
    if (child.kind !== KIND_ENUM) continue;
    const members: EnumMemberDoc[] = [];
    for (const m of child.children ?? []) {
      if (m.kind !== KIND_ENUM_MEMBER) continue;
      const value = m.type?.type === "literal" && typeof m.type.value === "string" ? m.type.value : undefined;
      members.push({ name: m.name, value });
    }
    out.push({
      name: child.name,
      description: extractSummaryText(child.comment),
      members,
    });
  }
  out.sort((a, b) => a.name.localeCompare(b.name));
  return out;
}

// ── Type aliases ────────────────────────────────────────────────────────

const SKIP_TYPE_ALIASES = new Set([
  "HighnoteOptions",
  "HighnoteEnvironment",
  "FieldError",
  "VerifyWebhookSignatureInput",
  "VerifyWebhookSignatureResult",
  "WebhookEvent",
  "PageFetcher",
  "RelayConnection",
]);

function buildTypeAliases(ctx: BuildContext): TypeAliasDoc[] {
  const out: TypeAliasDoc[] = [];
  for (const child of ctx.children) {
    if (child.kind !== KIND_TYPE_ALIAS) continue;
    if (SKIP_TYPE_ALIASES.has(child.name)) continue;
    const fields = extractTypeAliasFields(ctx, child.type);
    out.push({
      name: child.name,
      description: extractSummaryText(child.comment),
      fields: fields.length > 0 ? fields : undefined,
    });
  }
  out.sort((a, b) => a.name.localeCompare(b.name));
  return out;
}

function extractTypeAliasFields(
  ctx: BuildContext,
  type: JSONOutput.SomeType | undefined,
): PropertyDoc[] {
  if (!type) return [];
  if (type.type === "reflection") {
    const decl = type.declaration as JSONOutput.DeclarationReflection;
    return (decl.children ?? [])
      .filter((c) => c.name !== "__typename")
      .map((c) => ({
        name: c.name,
        type: typeToString(c.type),
        description: extractSummaryText(c.comment),
      }));
  }
  if (type.type === "reference") {
    const decl = resolveReferenceTarget(ctx, type);
    if (decl?.kind === KIND_TYPE_ALIAS && decl.type) {
      return extractTypeAliasFields(ctx, decl.type);
    }
    if (decl?.kind === KIND_TYPE_LITERAL || decl?.kind === KIND_INTERFACE) {
      return (decl.children ?? [])
        .filter((c) => c.name !== "__typename")
        .map((c) => ({
          name: c.name,
          type: typeToString(c.type),
          description: extractSummaryText(c.comment),
        }));
    }
  }
  if (type.type === "union") {
    const seen = new Set<string>();
    const merged: PropertyDoc[] = [];
    for (const member of type.types) {
      for (const field of extractTypeAliasFields(ctx, member)) {
        if (!seen.has(field.name)) {
          seen.add(field.name);
          merged.push(field);
        }
      }
    }
    return merged;
  }
  return [];
}
