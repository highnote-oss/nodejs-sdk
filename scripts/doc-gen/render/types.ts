/**
 * DocSpec — the in-memory model that both validation (Stage 3) and rendering
 * (Stage 4) operate on. Decouples the parsers (TypeDoc + GraphQL) from the
 * markdown output. Renderers are pure: DocSpec → string.
 */

export interface DocSpec {
  config: ConfigDoc;
  resources: ResourceDoc[];
  errors: ErrorClassDoc[];
  utilities: UtilityDoc[];
  enums: EnumDoc[];
  types: TypeAliasDoc[];
}

export interface ConfigDoc {
  /** Type name of the constructor options (e.g. "HighnoteOptions"). */
  typeName: string;
  options: ConfigOptionDoc[];
}

export interface ConfigOptionDoc {
  name: string;
  type: string;
  required: boolean;
  defaultValue?: string;
  description?: string;
}

export interface ResourceDoc {
  /** Property name on the client (e.g. "cards" → `client.cards`). */
  name: string;
  /** Class name (e.g. "CardsResource"). */
  className: string;
  description?: string;
  methods: MethodDoc[];
}

export interface MethodDoc {
  name: string;
  /** Method signature as displayed (e.g. "issue(input)"). */
  signatureLabel: string;
  summary: string;
  parameters: ParameterDoc[];
  returns: ReturnDoc;
  /** Error class names this method may throw. */
  throws: string[];
  /** Verbatim code from the first inline ts code block in the JSDoc. */
  example: string;
}

export interface ParameterDoc {
  /** Dot-path from the top-level argument (e.g. "options.activateOnCreate"). */
  path: string;
  type: string;
  required: boolean;
  description?: string;
}

export interface ReturnDoc {
  /** Resolved type name (e.g. "IssuedPaymentCard"). */
  typeName: string;
  /** Fields populated by the underlying GraphQL operation. Empty if N/A. */
  fields: string[];
}

export interface ErrorClassDoc {
  name: string;
  description?: string;
  /** Public properties on the error class (e.g. `fieldErrors`). */
  properties: PropertyDoc[];
}

export interface PropertyDoc {
  name: string;
  type: string;
  description?: string;
}

export interface UtilityDoc {
  name: string;
  summary: string;
  signatureLabel: string;
  parameters: ParameterDoc[];
  returns: ReturnDoc;
  example: string;
}

export interface EnumDoc {
  name: string;
  description?: string;
  members: EnumMemberDoc[];
}

export interface EnumMemberDoc {
  name: string;
  /** Underlying value, if any (string enums in TS). */
  value?: string;
}

export interface TypeAliasDoc {
  name: string;
  description?: string;
  /** For object-shaped or union-of-objects types, the merged field set. */
  fields?: PropertyDoc[];
  /** For other types, the source-text shape of the alias. */
  sourceText?: string;
}
