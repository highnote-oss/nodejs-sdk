export type HighnoteEnvironment = "test" | "live";

export interface HighnoteOptions {
  /** Highnote API key (starts with `sk_test_` or `sk_live_`). */
  apiKey: string;

  /** API environment. Defaults to `"test"`. */
  environment?: HighnoteEnvironment;

  /** Override the base API URL (useful for proxies or mocking). */
  baseUrl?: string;

  /** Default page size for paginated queries. Defaults to 20. */
  defaultPageSize?: number;
}

export const API_URLS: Record<HighnoteEnvironment, string> = {
  test: "https://api.us.test.highnote.com",
  live: "https://api.us.highnote.com",
};
