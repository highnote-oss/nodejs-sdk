import type { TypeAliasDoc, PropertyDoc } from "./types.js";

export function renderTypes(types: TypeAliasDoc[]): string {
  const lines: string[] = ["## Types"];
  for (const t of types) {
    lines.push("");
    lines.push(`### \`${t.name}\``);
    if (t.description) {
      lines.push("");
      lines.push(t.description);
    }
    if (t.fields && t.fields.length > 0) {
      lines.push("");
      lines.push("**Fields**");
      lines.push("");
      for (const field of t.fields) {
        lines.push(renderField(field));
      }
    } else if (t.sourceText) {
      lines.push("");
      lines.push("```ts");
      lines.push(t.sourceText);
      lines.push("```");
    }
  }
  return lines.join("\n");
}

function renderField(prop: PropertyDoc): string {
  const head = `- \`${prop.name}\` (\`${prop.type}\`)`;
  return prop.description ? `${head} — ${prop.description}` : head;
}
