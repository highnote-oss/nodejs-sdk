/**
 * Doc generator entry point.
 *
 * Modes:
 *   tsx scripts/gen-docs.ts            # writes output files
 *   tsx scripts/gen-docs.ts --check    # exit 1 if any output differs from disk
 */

import { promises as fs } from "node:fs";
import * as path from "node:path";

import { buildDocSpec } from "./doc-gen/buildDocSpec.js";
import { parseGraphqlOps } from "./doc-gen/parseGraphqlOps.js";
import { parseTypedoc } from "./doc-gen/parseTypedoc.js";
import { renderConsolidated } from "./doc-gen/render/renderConsolidated.js";
import { renderReadmeTable } from "./doc-gen/render/renderReadmeTable.js";
import { renderResource } from "./doc-gen/render/renderResource.js";
import type { DocSpec } from "./doc-gen/render/types.js";

const README_START = "<!-- resources:start -->";
const README_END = "<!-- resources:end -->";

interface OutputFile {
  /** Absolute path. */
  path: string;
  /** Full file contents to write. */
  contents: string;
}

async function main(): Promise<void> {
  const checkMode = process.argv.includes("--check");
  const cwd = path.resolve(process.cwd());

  const spec = await buildSpec(cwd);
  const outputs = computeOutputs(cwd, spec);
  outputs.push(await computeReadmeOutput(cwd, spec));

  const stale = await findStaleResourceFiles(cwd, spec);

  if (checkMode) {
    const drift = await detectDrift(outputs);
    if (drift.length > 0 || stale.length > 0) {
      console.error("docs:check failed — these files would change:");
      for (const { path: file, expected, actual } of drift) {
        console.error(`\n=== ${path.relative(cwd, file)} ===`);
        console.error(unifiedDiff(actual, expected));
      }
      for (const file of stale) {
        console.error(`\n  - ${path.relative(cwd, file)} (stale, would be removed)`);
      }
      console.error(
        "\nRun `npm run codegen && npm run docs:gen` and commit the result.",
      );
      console.error(
        "(If your last `codegen` was a while ago, the upstream Highnote schema",
      );
      console.error(
        "may have drifted — the descriptions/enums in this diff come from there.)",
      );
      process.exit(1);
    }
    console.log("docs:check OK — no drift.");
    return;
  }

  for (const out of outputs) {
    await fs.mkdir(path.dirname(out.path), { recursive: true });
    await fs.writeFile(out.path, out.contents);
  }
  for (const file of stale) {
    await fs.unlink(file);
  }
  const removedNote = stale.length > 0 ? ` (removed ${stale.length} stale)` : "";
  console.log(`docs:gen wrote ${outputs.length} file(s)${removedNote}.`);
}

async function findStaleResourceFiles(cwd: string, spec: DocSpec): Promise<string[]> {
  const dir = path.join(cwd, "docs/resources");
  const expected = new Set(spec.resources.map((r) => `${r.name}.md`));
  let entries: string[];
  try {
    entries = await fs.readdir(dir);
  } catch {
    return [];
  }
  return entries
    .filter((f) => f.endsWith(".md") && !expected.has(f))
    .map((f) => path.join(dir, f));
}

async function buildSpec(cwd: string): Promise<DocSpec> {
  const resourcesDir = path.join(cwd, "src/resources");
  // Sort so entry-point order is stable across filesystems (APFS vs ext4).
  const resourceFiles = (await fs.readdir(resourcesDir))
    .filter((f) => f.endsWith(".ts"))
    .sort()
    .map((f) => path.join(resourcesDir, f));

  const reflection = await parseTypedoc({
    entryPoints: [
      path.join(cwd, "src/index.ts"),
      path.join(cwd, "src/client.ts"),
      ...resourceFiles,
      // Generated types — needed so input types like
      // `IssuePaymentCardForFinancialAccountInput` resolve and parameters
      // can be flattened into dot-paths.
      path.join(cwd, "src/generated/graphql.ts"),
    ],
    tsconfig: path.join(cwd, "tsconfig.json"),
    cwd,
  });
  const graphqlOps = await parseGraphqlOps(path.join(cwd, "src/graphql"));
  return buildDocSpec({ reflection, graphqlOps });
}

function computeOutputs(cwd: string, spec: DocSpec): OutputFile[] {
  const outputs: OutputFile[] = [];
  outputs.push({
    path: path.join(cwd, "docs/SDK_REFERENCE.md"),
    contents: renderConsolidated(spec),
  });
  for (const resource of spec.resources) {
    outputs.push({
      path: path.join(cwd, `docs/resources/${resource.name}.md`),
      contents: renderResource(resource) + "\n",
    });
  }
  return outputs;
}

async function computeReadmeOutput(cwd: string, spec: DocSpec): Promise<OutputFile> {
  const readmePath = path.join(cwd, "README.md");
  const current = await fs.readFile(readmePath, "utf8");
  const startIdx = current.indexOf(README_START);
  const endIdx = current.indexOf(README_END);
  if (startIdx < 0 || endIdx < 0 || endIdx <= startIdx) {
    throw new Error(
      `README.md is missing ${README_START} / ${README_END} markers — add them around the resource table.`,
    );
  }
  const before = current.slice(0, startIdx + README_START.length);
  const after = current.slice(endIdx);
  const table = renderReadmeTable(spec.resources);
  const updated = `${before}\n${table}\n${after}`;
  return { path: readmePath, contents: updated };
}

interface Drift {
  path: string;
  /** What's currently on disk. */
  actual: string;
  /** What the generator would write. */
  expected: string;
}

async function detectDrift(outputs: OutputFile[]): Promise<Drift[]> {
  const drift: Drift[] = [];
  for (const out of outputs) {
    const existing = await readFileOrEmpty(out.path);
    if (existing !== out.contents) {
      drift.push({ path: out.path, actual: existing, expected: out.contents });
    }
  }
  return drift;
}

/** Tiny Myers-style line diff — prints up to ~30 changed lines for context. */
function unifiedDiff(actual: string, expected: string): string {
  const a = actual.split("\n");
  const e = expected.split("\n");
  const out: string[] = [];
  const max = Math.max(a.length, e.length);
  let shown = 0;
  const LIMIT = 30;
  for (let i = 0; i < max && shown < LIMIT; i++) {
    if (a[i] === e[i]) continue;
    if (a[i] !== undefined) {
      out.push(`- ${a[i]}`);
      shown++;
    }
    if (e[i] !== undefined && shown < LIMIT) {
      out.push(`+ ${e[i]}`);
      shown++;
    }
  }
  if (shown >= LIMIT) out.push(`(diff truncated at ${LIMIT} lines)`);
  return out.join("\n");
}

async function readFileOrEmpty(file: string): Promise<string> {
  try {
    return await fs.readFile(file, "utf8");
  } catch {
    return "";
  }
}

main().catch((err: unknown) => {
  console.error(err instanceof Error ? err.stack ?? err.message : err);
  process.exit(1);
});
