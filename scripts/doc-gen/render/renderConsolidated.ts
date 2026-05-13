import { renderEnums } from "./renderEnums.js";
import { renderErrors } from "./renderErrors.js";
import { renderResource } from "./renderResource.js";
import { renderTypes } from "./renderTypes.js";
import { renderUtilities } from "./renderUtilities.js";
import type { ConfigDoc, ConfigOptionDoc, DocSpec } from "./types.js";

const PREAMBLE = [
  "# @highnote-oss/nodejs-sdk — SDK Reference",
  "",
  "> Auto-generated from src/. Do not edit by hand.",
  "> For LLM consumption: point your CLAUDE.md / system prompt at this file.",
];

export function renderConsolidated(spec: DocSpec): string {
  const sections: string[] = [];
  sections.push(PREAMBLE.join("\n"));
  sections.push(renderSetup(spec.config));
  sections.push(renderResourcesSection(spec));
  sections.push(renderErrors(spec.errors));
  sections.push(renderUtilities(spec.utilities));
  sections.push(renderEnums(spec.enums));
  sections.push(renderTypes(spec.types));
  return sections.join("\n\n") + "\n";
}

function renderSetup(config: ConfigDoc): string {
  const lines: string[] = [
    "## Setup",
    "",
    "| Option | Type | Default | Description |",
    "|--------|------|---------|-------------|",
  ];
  for (const opt of config.options) {
    lines.push(renderOptionRow(opt));
  }
  return lines.join("\n");
}

function renderOptionRow(opt: ConfigOptionDoc): string {
  const type = `\`${escapePipe(opt.type)}\``;
  const def = opt.required
    ? "*required*"
    : opt.defaultValue
      ? `\`${escapePipe(opt.defaultValue)}\``
      : "—";
  const desc = opt.description ?? "";
  return `| \`${opt.name}\` | ${type} | ${def} | ${desc} |`;
}

function escapePipe(s: string): string {
  return s.replace(/\|/g, "\\|");
}

function renderResourcesSection(spec: DocSpec): string {
  const lines: string[] = ["## Resources"];
  for (const resource of spec.resources) {
    lines.push("");
    lines.push(renderResource(resource));
  }
  return lines.join("\n");
}
