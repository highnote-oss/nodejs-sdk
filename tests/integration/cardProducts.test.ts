import { describe, it, expect, beforeAll } from "vitest";
import { Highnote } from "../../src/index.js";

describe("cardProducts (integration)", () => {
  let client: Highnote;

  beforeAll(() => {
    client = new Highnote({
      apiKey: process.env.HIGHNOTE_API_KEY!,
      environment: "test",
    });
  });

  it("list() returns at least one card product", async () => {
    const results = [];
    for await (const product of client.cardProducts.list({ pageSize: 5 })) {
      results.push(product);
      // Don't exhaust the entire list — just verify we get data
      if (results.length >= 2) break;
    }

    expect(results.length).toBeGreaterThan(0);
    expect(results[0]).toHaveProperty("id");
    expect(results[0]).toHaveProperty("__typename", "CardProduct");
  });

  it("get() retrieves a card product by ID", async () => {
    // First, get an ID from list
    let firstId: string | undefined;
    for await (const product of client.cardProducts.list({ pageSize: 1 })) {
      firstId = product.id;
      break;
    }

    expect(firstId).toBeDefined();

    const product = await client.cardProducts.get(firstId!);
    expect(product.id).toBe(firstId);
    expect(product.__typename).toBe("CardProduct");
  });
});
