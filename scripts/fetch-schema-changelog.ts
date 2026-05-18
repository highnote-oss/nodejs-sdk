/**
 * Queries Highnote's `schemaChangelogs` query for recent deployment entries
 * and emits two artifacts the schema-drift workflow consumes:
 *
 *   1. $GITHUB_OUTPUT: `severity` and `label` based on the highest
 *      `SchemaChangeCriticalityLevel` across all in-window entries.
 *   2. A markdown file (path given by `--out`) containing the formatted
 *      PR body — entries grouped by deployment, paths and messages listed
 *      per criticality, with triage guidance for any BREAKING changes.
 *
 * Replaces the previous line-count heuristic in schema-drift.yml which
 * estimated severity from doc-diff size. The changelog API gives us an
 * authoritative `BREAKING | DANGEROUS | NON_BREAKING` classification
 * straight from the source.
 *
 * Usage:
 *   tsx scripts/fetch-schema-changelog.ts --out path/to/body.md
 *
 * Env:
 *   HIGHNOTE_API_KEY        — required (test or live; matches codegen).
 *   HIGHNOTE_ENVIRONMENT    — "test" (default) or "live".
 *   SCHEMA_CHANGELOG_DAYS   — lookback window in days (default 14).
 */

import "dotenv/config";
import { writeFileSync, appendFileSync } from "node:fs";
import { GraphQLClient, gql } from "graphql-request";

// ── CLI parsing ─────────────────────────────────────────────────────────

const args = process.argv.slice(2);
const outIdx = args.indexOf("--out");
if (outIdx === -1 || !args[outIdx + 1]) {
  console.error("usage: fetch-schema-changelog --out <body.md>");
  process.exit(2);
}
const outPath = args[outIdx + 1];

// ── Env / client ────────────────────────────────────────────────────────

const apiKey = process.env.HIGHNOTE_API_KEY;
if (!apiKey) {
  console.error("HIGHNOTE_API_KEY not set");
  process.exit(2);
}

const env = process.env.HIGHNOTE_ENVIRONMENT ?? "test";
const url =
  env === "live"
    ? "https://api.us.highnote.com/graphql"
    : "https://api.us.test.highnote.com/graphql";

const client = new GraphQLClient(url, {
  headers: {
    authorization: `Basic ${Buffer.from(apiKey + ":").toString("base64")}`,
  },
});

const lookbackDays = Number(process.env.SCHEMA_CHANGELOG_DAYS ?? "14");
const cutoff = new Date(Date.now() - lookbackDays * 24 * 60 * 60 * 1000);

// ── Query ───────────────────────────────────────────────────────────────

const QUERY = gql`
  query LatestSchemaChangelogs($first: Int!) {
    schemaChangelogs(first: $first) {
      edges {
        node {
          id
          createdAt
          changes {
            rootPath
            changes {
              changeType
              path
              message
              criticality {
                level
              }
            }
          }
        }
      }
    }
  }
`;

type Level = "BREAKING" | "DANGEROUS" | "NON_BREAKING";

interface Change {
  changeType: string;
  path: string;
  message: string;
  criticality: { level: Level };
}

interface RootPathGroup {
  rootPath: string;
  changes: Change[];
}

interface Changelog {
  id: string;
  createdAt: string;
  changes: RootPathGroup[];
}

interface Response {
  schemaChangelogs: {
    edges: Array<{ node: Changelog }>;
  };
}

const data = await client.request<Response>(QUERY, { first: 30 });

// ── Filter to lookback window ───────────────────────────────────────────

const inWindow: Changelog[] = data.schemaChangelogs.edges
  .map((e) => e.node)
  .filter((node) => new Date(node.createdAt) >= cutoff)
  .sort(
    (a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );

// ── Aggregate severity ──────────────────────────────────────────────────

const levelRank: Record<Level, number> = {
  NON_BREAKING: 0,
  DANGEROUS: 1,
  BREAKING: 2,
};

let maxLevel: Level = "NON_BREAKING";
const breakingChanges: Array<{ path: string; message: string }> = [];

for (const log of inWindow) {
  for (const group of log.changes) {
    for (const c of group.changes) {
      if (levelRank[c.criticality.level] > levelRank[maxLevel]) {
        maxLevel = c.criticality.level;
      }
      if (c.criticality.level === "BREAKING") {
        breakingChanges.push({ path: c.path, message: c.message });
      }
    }
  }
}

const severityMap: Record<Level, { severity: string; label: string }> = {
  BREAKING: { severity: "breaking", label: "breaking-change" },
  DANGEROUS: { severity: "dangerous", label: "schema-update-dangerous" },
  NON_BREAKING: { severity: "non-breaking", label: "schema-update" },
};

const { severity, label } = severityMap[maxLevel];

// ── Emit GitHub Action outputs ──────────────────────────────────────────

const outputFile = process.env.GITHUB_OUTPUT;
if (outputFile) {
  appendFileSync(outputFile, `severity=${severity}\n`);
  appendFileSync(outputFile, `label=${label}\n`);
  appendFileSync(outputFile, `deployment_count=${inWindow.length}\n`);
  appendFileSync(
    outputFile,
    `breaking_count=${breakingChanges.length}\n`,
  );
}

// ── Render the markdown body ────────────────────────────────────────────

const lines: string[] = [];
lines.push("## Schema Drift Detected");
lines.push("");
lines.push(
  `Highest criticality in the last ${lookbackDays} days: **${severity.toUpperCase()}** ` +
    `(across ${inWindow.length} deployment${inWindow.length === 1 ? "" : "s"}).`,
);
lines.push("");

if (breakingChanges.length > 0) {
  lines.push("### ⚠️ Breaking changes detected — triage required");
  lines.push("");
  lines.push(
    "Each path below was removed or modified incompatibly upstream. For each:",
  );
  lines.push("");
  lines.push(
    "1. `rg \"<path>\" src/resources/` — does any resource code reference it?",
  );
  lines.push(
    "2. **Hit:** patch the affected resource in this PR (rename method, drop resource, etc.) before merging. CI's typecheck will fail otherwise.",
  );
  lines.push(
    "3. **Miss:** schema-level break, no SDK consumer impact — safe to merge as docs-only refresh.",
  );
  lines.push("");
  for (const c of breakingChanges) {
    lines.push(`- **\`${c.path}\`** — ${c.message}`);
  }
  lines.push("");
}

lines.push("### Deployments included");
lines.push("");
for (const log of inWindow) {
  const date = log.createdAt.slice(0, 10);
  const totalChanges = log.changes.reduce(
    (n, g) => n + g.changes.length,
    0,
  );
  lines.push(
    `<details><summary><strong>${date}</strong> — ${log.id} (${totalChanges} change${totalChanges === 1 ? "" : "s"})</summary>`,
  );
  lines.push("");

  // Group by criticality for readability
  const byLevel: Record<Level, Change[]> = {
    BREAKING: [],
    DANGEROUS: [],
    NON_BREAKING: [],
  };
  for (const group of log.changes) {
    for (const c of group.changes) {
      byLevel[c.criticality.level].push(c);
    }
  }

  for (const level of ["BREAKING", "DANGEROUS", "NON_BREAKING"] as Level[]) {
    if (byLevel[level].length === 0) continue;
    lines.push(`**${level}** (${byLevel[level].length})`);
    lines.push("");
    for (const c of byLevel[level]) {
      lines.push(`- \`${c.changeType}\` \`${c.path}\` — ${c.message}`);
    }
    lines.push("");
  }
  lines.push("</details>");
  lines.push("");
}

lines.push("### Review checklist");
lines.push("");
lines.push(
  "- [ ] If `breaking_count > 0`: triage each path per the guidance above",
);
lines.push(
  "- [ ] Skim the docs diff (`docs/SDK_REFERENCE.md`, `docs/resources/*.md`) for new/renamed types",
);
lines.push(
  "- [ ] Decide version bump: patch (docs/desc only), minor (new fields/enums), major (SDK surface broke)",
);
lines.push("");
lines.push(
  `> Body generated by \`scripts/fetch-schema-changelog.ts\` from \`Query.schemaChangelogs\` (env: \`${env}\`, lookback: ${lookbackDays} days).`,
);

writeFileSync(outPath, lines.join("\n"));

// ── Console summary for CI logs ─────────────────────────────────────────

console.log(`severity: ${severity}`);
console.log(`label: ${label}`);
console.log(`deployments in window (${lookbackDays}d): ${inWindow.length}`);
console.log(`breaking changes: ${breakingChanges.length}`);
console.log(`body written to: ${outPath}`);
