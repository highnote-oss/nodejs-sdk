import type { MethodDoc, ParameterDoc, ResourceDoc, ReturnDoc } from "./types.js";

export function renderResource(resource: ResourceDoc): string {
  const lines: string[] = [];
  lines.push(`### client.${resource.name}`);
  if (resource.description) {
    lines.push("");
    lines.push(resource.description);
  }
  for (const method of resource.methods) {
    lines.push("");
    lines.push(...renderMethod(method));
  }
  return lines.join("\n");
}

function renderMethod(method: MethodDoc): string[] {
  const lines: string[] = [];
  lines.push(`#### \`${method.signatureLabel}\``);
  lines.push("");
  lines.push(method.summary);
  if (method.parameters.length > 0) {
    lines.push("");
    lines.push("**Parameters**");
    lines.push("");
    for (const param of method.parameters) {
      lines.push(renderParameter(param));
    }
  }
  lines.push("");
  lines.push(renderReturn(method.returns));
  if (method.throws.length > 0) {
    lines.push("");
    lines.push(renderThrows(method.throws));
  }
  lines.push("");
  lines.push("**Example**");
  lines.push("");
  lines.push("```ts");
  lines.push(method.example);
  lines.push("```");
  return lines;
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

function renderReturn(returns: ReturnDoc): string {
  const head = `**Returns** \`${returns.typeName}\``;
  if (returns.fields.length === 0) {
    return `${head}.`;
  }
  const fieldList = returns.fields.map((f) => `\`${f}\``).join(", ");
  return `${head} — fields: ${fieldList}.`;
}

function renderThrows(throws: string[]): string {
  const list = throws.map((t) => `\`${t}\``).join(", ");
  return `**Throws** ${list}.`;
}
