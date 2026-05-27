/**
 * Introspects the Highnote GraphQL API and writes the result to `schema.graphql`
 * (SDL) at the repo root.
 *
 * This script is the *only* place we hit the live API for schema purposes.
 * `codegen.ts` reads the checked-in SDL, so:
 *
 *   - PR CI never needs HIGHNOTE_API_KEY, never goes stale from API ships
 *   - schema changes only land via a deliberate snapshot refresh (this script
 *     + commit), reviewed like any other code change
 *
 * Usage:
 *   tsx scripts/fetch-schema.ts            # writes schema.graphql
 *   tsx scripts/fetch-schema.ts --check    # exit 1 if schema.graphql is stale
 *
 * Env:
 *   HIGHNOTE_API_KEY        — required (test or live)
 *   HIGHNOTE_ENVIRONMENT    — "test" (default) or "live"
 */

import "dotenv/config";
import { readFileSync, writeFileSync } from "node:fs";
import * as path from "node:path";
import { GraphQLClient } from "graphql-request";
import {
  buildClientSchema,
  getIntrospectionQuery,
  printSchema,
  type IntrospectionQuery,
} from "graphql";

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
    authorization: `Basic ${Buffer.from(`${apiKey}:`).toString("base64")}`,
  },
});

const introspection = await client.request<IntrospectionQuery>(
  getIntrospectionQuery({ descriptions: true }),
);

const sdl =
  printSchema(buildClientSchema(introspection))
    .trimEnd() + "\n";

const outPath = path.resolve("schema.graphql");

if (process.argv.includes("--check")) {
  let existing: string;
  try {
    existing = readFileSync(outPath, "utf8");
  } catch {
    console.error("schema.graphql does not exist; run `npm run schema:fetch`.");
    process.exit(1);
  }
  if (existing !== sdl) {
    console.error(
      "schema.graphql is stale — upstream Highnote schema has changed.\n" +
        "Run `npm run schema:fetch` and commit the refreshed file.",
    );
    process.exit(1);
  }
  console.log("schema.graphql is up to date.");
} else {
  writeFileSync(outPath, sdl);
  console.log(`Wrote ${sdl.length} chars to ${outPath} (env: ${env}).`);
}
