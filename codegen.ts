import type { CodegenConfig } from "@graphql-codegen/cli";
import "dotenv/config";

const apiKey = process.env.HIGHNOTE_API_KEY;
if (!apiKey) {
  console.error(
    "[ERROR] HIGHNOTE_API_KEY is required for schema introspection. Copy .env.template to .env and fill it in.",
  );
  process.exit(1);
}

const encoded = Buffer.from(`${apiKey}:`, "ascii").toString("base64");

const config: CodegenConfig = {
  schema: [
    {
      "https://api.us.test.highnote.com/graphql": {
        headers: {
          Authorization: `Basic ${encoded}`,
        },
      },
    },
  ],
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
