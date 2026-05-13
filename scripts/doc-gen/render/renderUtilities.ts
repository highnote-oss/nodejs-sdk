import type { ParameterDoc, UtilityDoc } from "./types.js";

export function renderUtilities(utilities: UtilityDoc[]): string {
  const lines: string[] = ["## Utilities"];
  for (const util of utilities) {
    lines.push("");
    lines.push(`### \`${util.signatureLabel}\``);
    lines.push("");
    lines.push(util.summary);
    if (util.parameters.length > 0) {
      lines.push("");
      lines.push("**Parameters**");
      lines.push("");
      for (const param of util.parameters) {
        lines.push(renderParameter(param));
      }
    }
    lines.push("");
    lines.push(`**Returns** \`${util.returns.typeName}\`.`);
    lines.push("");
    lines.push("**Example**");
    lines.push("");
    lines.push("```ts");
    lines.push(util.example);
    lines.push("```");
  }
  return lines.join("\n");
}

function renderParameter(param: ParameterDoc): string {
  const requiredness = param.required ? "**required**" : "optional";
  const head = `- \`${param.path}\` (${param.type}, ${requiredness})`;
  if (!param.description) return head;
  return `${head} — ${indentContinuation(param.description)}`;
}

function indentContinuation(text: string): string {
  return text
    .split("\n")
    .map((line, idx) => (idx === 0 || line === "" ? line : `  ${line}`))
    .join("\n");
}
