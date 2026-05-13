import { describe, it, expect, beforeAll } from "vitest";
import { Highnote } from "../../src/index.js";

describe("accountHolders (integration)", () => {
  let client: Highnote;

  beforeAll(() => {
    client = new Highnote({
      apiKey: process.env.HIGHNOTE_API_KEY!,
      environment: "test",
    });
  });

  it("createUSPerson() creates an account holder and get() retrieves it", async () => {
    const holder = await client.accountHolders.createUSPerson({
      personAccountHolder: {
        name: {
          givenName: "Test",
          familyName: "Person",
        },
        dateOfBirth: "1990-01-15",
        email: "test-sdk@example.com",
        billingAddress: {
          streetAddress: "123 Main St",
          locality: "San Francisco",
          region: "CA",
          postalCode: "94105",
          countryCodeAlpha3: "USA",
        },
      },
    });

    expect(holder.__typename).toBe("USPersonAccountHolder");
    expect(holder.id).toBeDefined();
    expect(holder.name?.givenName).toBe("Test");
    expect(holder.name?.familyName).toBe("Person");

    // Now retrieve it by ID
    const fetched = await client.accountHolders.get(holder.id);
    expect(fetched.__typename).toBe("USPersonAccountHolder");
    if (fetched.__typename === "USPersonAccountHolder") {
      expect(fetched.id).toBe(holder.id);
    }
  });

  it("listPersons() returns the created account holder", async () => {
    // Create one first so the list is never empty (fresh API key = empty tenant)
    await client.accountHolders.createUSPerson({
      personAccountHolder: {
        name: { givenName: "List", familyName: "Test" },
        dateOfBirth: "1992-05-10",
        email: "list-test@example.com",
        billingAddress: {
          streetAddress: "456 List Ave",
          locality: "San Francisco",
          region: "CA",
          postalCode: "94105",
          countryCodeAlpha3: "USA",
        },
      },
    });

    const results = [];
    for await (const holder of client.accountHolders.listPersons({ pageSize: 3 })) {
      results.push(holder);
      if (results.length >= 2) break;
    }

    expect(results.length).toBeGreaterThan(0);
    expect(results[0]).toHaveProperty("id");
  });
});
