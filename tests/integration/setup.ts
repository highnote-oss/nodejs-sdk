import "dotenv/config";

if (!process.env.HIGHNOTE_API_KEY) {
  throw new Error(
    "HIGHNOTE_API_KEY is required for integration tests. Copy .env.template to .env and fill it in.",
  );
}
