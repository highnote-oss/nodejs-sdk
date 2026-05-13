import type { ResourceDoc } from "./types.js";

const HEADER = "| Resource | Methods | Status |";
const SEPARATOR = "|----------|---------|--------|";

export function renderReadmeTable(resources: ResourceDoc[]): string {
  const lines: string[] = [HEADER, SEPARATOR];
  for (const resource of resources) {
    const methods = resource.methods.map((m) => `\`${m.name}()\``).join(", ");
    lines.push(`| \`${resource.name}\` | ${methods} | Available |`);
  }
  return lines.join("\n");
}
