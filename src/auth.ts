/**
 * Encode an API key as a Basic auth header value.
 *
 * Highnote uses `Basic base64(apiKey + ":")` — no password, just the key
 * followed by a colon (same pattern as Stripe).
 */
export function encodeApiKey(apiKey: string): string {
  // Works in Node 18+, Bun, Deno, and edge runtimes
  const encoded =
    typeof btoa === "function"
      ? btoa(`${apiKey}:`)
      : Buffer.from(`${apiKey}:`).toString("base64");

  return `Basic ${encoded}`;
}
