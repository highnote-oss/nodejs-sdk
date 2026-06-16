import { describe, it, expect, beforeAll } from "vitest";
import { Highnote } from "../../src/index.js";

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

// Highnote rate limit: 2500 complexity points per 10s.
// Rich account holder queries are expensive (~800 points each),
// so we pause between test groups to avoid 429s.
const RATE_LIMIT_PAUSE_MS = 11_000;

describe("account holder search (integration)", () => {
  let client: Highnote;

  beforeAll(async () => {
    client = new Highnote({
      apiKey: process.env.HIGHNOTE_API_KEY!,
      environment: "test",
    });

    // Create a person account holder with a unique email for search
    const holder = await client.accountHolders.createUSPerson({
      personAccountHolder: {
        name: { givenName: "Search", familyName: "TestUser" },
        dateOfBirth: "1985-03-15",
        email: `search-test-${Date.now()}@example.com`,
        billingAddress: {
          streetAddress: "789 Search Ln",
          locality: "San Francisco",
          region: "CA",
          postalCode: "94105",
          countryCodeAlpha3: "USA",
        },
      },
    });

    console.log(`Created person account holder: ${holder.id} (${holder.email})`);
  });

  it("listPersons() returns core account holder fields", async () => {
    const results = [];
    for await (const holder of client.accountHolders.listPersons({ pageSize: 1 })) {
      results.push(holder);
      if (results.length >= 1) break;
    }

    expect(results.length).toBeGreaterThan(0);

    const holder = results[0];
    expect(holder).toHaveProperty("id");
    expect(holder).toHaveProperty("email");
    expect(holder).toHaveProperty("name");
    expect(holder).toHaveProperty("dateOfBirth");
    expect(holder).toHaveProperty("billingAddress");
  }, 30_000);

  it("searchPersons() finds by email and returns core fields", async () => {
    const results = [];
    for await (const holder of client.accountHolders.searchPersons({
      email: { contains: "@example.com" },
    }, { pageSize: 1 })) {
      results.push(holder);
      if (results.length >= 1) break;
    }

    expect(results.length).toBeGreaterThan(0);
    expect(results[0].email).toContain("@example.com");
    expect(results[0]).toHaveProperty("dateOfBirth");
    expect(results[0]).toHaveProperty("name");
  }, 30_000);

  it("searchPersons() returns empty for non-matching filter", async () => {
    const results = [];
    for await (const holder of client.accountHolders.searchPersons({
      email: { equals: "definitely-does-not-exist-999@nowhere.invalid" },
    }, { pageSize: 1 })) {
      results.push(holder);
    }

    expect(results).toHaveLength(0);
  }, 30_000);

  it("listBusinesses() executes without error", async () => {
    const results = [];
    for await (const holder of client.accountHolders.listBusinesses({ pageSize: 1 })) {
      results.push(holder);
      if (results.length >= 1) break;
    }

    // Test env may not have business account holders — that's fine
    if (results.length > 0) {
      expect(results[0]).toHaveProperty("id");
      expect(results[0].__typename).toBe("USBusinessAccountHolder");
      // listBusinesses returns core fields only (like listPersons) — the
      // financialAccounts edge is not part of the list selection; use
      // listAccountHolderFinancialAccounts for that.
    }
  }, 30_000);

  it("searchBusinesses() returns empty for non-matching filter", async () => {
    const results = [];
    for await (const holder of client.accountHolders.searchBusinesses({
      id: { equals: "bah_definitely_does_not_exist_999" },
    }, { pageSize: 1 })) {
      results.push(holder);
    }

    expect(results).toHaveLength(0);
  }, 30_000);
});
