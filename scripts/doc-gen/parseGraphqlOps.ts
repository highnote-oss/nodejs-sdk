/**
 * Stage 2 — walk `src/graphql/<resource>/*.graphql`, parse each operation, and
 * extract the field names selected on the success-typed response variants.
 *
 * "Success variants" = inline fragments whose target type does NOT end in
 * "Error" (UserError, AccessDeniedError, etc. are stripped — those are
 * surfaced as `**Throws**` in the doc, not as response fields).
 *
 * Returns a map: operation name (e.g. "IssuePaymentCardForFinancialAccount")
 * → ordered, deduped field names.
 */

import { promises as fs } from "node:fs";
import * as path from "node:path";
import {
  parse,
  Kind,
  type DocumentNode,
  type FieldNode,
  type InlineFragmentNode,
  type OperationDefinitionNode,
  type SelectionNode,
  type SelectionSetNode,
} from "graphql";

export interface GraphqlOpInfo {
  /** Operation name (e.g. "IssuePaymentCardForFinancialAccount"). */
  name: string;
  /** Field names selected on success variants, in declaration order, deduped. */
  successFields: string[];
  /** Source file, for error messages. */
  sourceFile: string;
}

export async function parseGraphqlOps(graphqlDir: string): Promise<GraphqlOpInfo[]> {
  const files = await collectGraphqlFiles(graphqlDir);
  const ops: GraphqlOpInfo[] = [];
  for (const file of files) {
    const text = await fs.readFile(file, "utf8");
    const doc = parse(text);
    for (const op of operationDefinitions(doc)) {
      if (!op.name) {
        throw new Error(`Anonymous operation in ${file} — every operation must be named`);
      }
      ops.push({
        name: op.name.value,
        successFields: extractSuccessFields(op),
        sourceFile: file,
      });
    }
  }
  return ops;
}

async function collectGraphqlFiles(dir: string): Promise<string[]> {
  const out: string[] = [];
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      out.push(...(await collectGraphqlFiles(full)));
    } else if (entry.isFile() && entry.name.endsWith(".graphql")) {
      out.push(full);
    }
  }
  return out.sort();
}

function operationDefinitions(doc: DocumentNode): OperationDefinitionNode[] {
  return doc.definitions.filter(
    (d): d is OperationDefinitionNode => d.kind === Kind.OPERATION_DEFINITION,
  );
}

function extractSuccessFields(op: OperationDefinitionNode): string[] {
  const fields: string[] = [];
  const seen = new Set<string>();
  walkSuccessSelections(op.selectionSet, (fieldName) => {
    if (fieldName === "__typename" || seen.has(fieldName)) return;
    seen.add(fieldName);
    fields.push(fieldName);
  });
  return fields;
}

function walkSuccessSelections(
  selectionSet: SelectionSetNode,
  onField: (name: string) => void,
): void {
  for (const sel of selectionSet.selections) {
    if (isInlineFragment(sel)) {
      if (isErrorTypeCondition(sel)) continue;
      for (const inner of sel.selectionSet.selections) {
        if (isField(inner)) onField(inner.name.value);
      }
    } else if (isField(sel) && sel.selectionSet) {
      walkSuccessSelections(sel.selectionSet, onField);
    }
  }
}

function isInlineFragment(sel: SelectionNode): sel is InlineFragmentNode {
  return sel.kind === Kind.INLINE_FRAGMENT;
}

function isField(sel: SelectionNode): sel is FieldNode {
  return sel.kind === Kind.FIELD;
}

function isErrorTypeCondition(frag: InlineFragmentNode): boolean {
  const name = frag.typeCondition?.name.value;
  return !!name && name.endsWith("Error");
}
