import type { ErrorClassDoc, PropertyDoc } from "./types.js";

export function renderErrors(errors: ErrorClassDoc[]): string {
  const lines: string[] = ["## Errors"];
  for (const err of errors) {
    lines.push("");
    lines.push(`### \`${err.name}\``);
    if (err.description) {
      lines.push("");
      lines.push(err.description);
    }
    if (err.properties.length > 0) {
      lines.push("");
      lines.push("**Properties**");
      lines.push("");
      for (const prop of err.properties) {
        lines.push(renderProperty(prop));
      }
    }
  }
  return lines.join("\n");
}

function renderProperty(prop: PropertyDoc): string {
  const head = `- \`${prop.name}\` (\`${prop.type}\`)`;
  return prop.description ? `${head} — ${prop.description}` : head;
}
