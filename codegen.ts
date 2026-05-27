import type { CodegenConfig } from "@graphql-codegen/cli";

// Reads from the checked-in schema.graphql snapshot instead of introspecting
// the live Highnote API. Refresh the snapshot via `npm run schema:fetch` —
// drift between the snapshot and the live API is caught by the weekly
// `schema-drift` workflow, which opens an auto-PR to update both the
// snapshot and the regenerated docs in lockstep.
const config: CodegenConfig = {
  schema: "schema.graphql",
  documents: "src/graphql/**/*.graphql",
  generates: {
    "src/generated/graphql.ts": {
      plugins: ["typescript", "typescript-operations", "typescript-graphql-request"],
      config: {
        rawRequest: true,
        maybeValue: "T | undefined",
        namingConvention: {
          enumValues: "upper-case#upperCase",
        },
      },
    },
  },
};

export default config;
