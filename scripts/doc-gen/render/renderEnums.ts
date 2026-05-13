import type { EnumDoc } from "./types.js";

export function renderEnums(enums: EnumDoc[]): string {
  const lines: string[] = ["## Enums"];
  for (const e of enums) {
    lines.push("");
    lines.push(`### \`${e.name}\``);
    if (e.description) {
      lines.push("");
      lines.push(e.description);
    }
    lines.push("");
    for (const member of e.members) {
      const showValue = member.value !== undefined && member.value !== member.name;
      lines.push(showValue ? `- \`${member.name}\` = \`"${member.value}"\`` : `- \`${member.name}\``);
    }
  }
  return lines.join("\n");
}
