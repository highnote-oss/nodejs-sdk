import { describe, it, expect, vi, beforeEach } from "vitest";
import { Highnote } from "../../src/client.js";

// Mock GraphQLClient's rawRequest
const { mockRawRequest, MockGraphQLClient } = vi.hoisted(() => {
  const mockRawRequest = vi.fn();
  const MockGraphQLClient = vi.fn().mockImplementation(function () {
    return { rawRequest: mockRawRequest };
  });
  return { mockRawRequest, MockGraphQLClient };
});
vi.mock("graphql-request", () => ({
  default: MockGraphQLClient,
  GraphQLClient: MockGraphQLClient,
  gql: (strings: TemplateStringsArray) => strings.join(""),
}));

describe("CardProductsResource", () => {
  let client: Highnote;

  beforeEach(() => {
    vi.clearAllMocks();
    client = new Highnote({ apiKey: "sk_test_fake" });
  });

  describe("list()", () => {
    it("returns card products from a single page", async () => {
      mockRawRequest.mockResolvedValueOnce({
        data: {
          cardProducts: {
            edges: [
              { node: { id: "cp_1", name: "Product 1", __typename: "CardProduct" }, cursor: "c1" },
              { node: { id: "cp_2", name: "Product 2", __typename: "CardProduct" }, cursor: "c2" },
            ],
            pageInfo: { hasNextPage: false, endCursor: "c2" },
          },
        },
      });

      const results = [];
      for await (const product of client.cardProducts.list()) {
        results.push(product);
      }

      expect(results).toHaveLength(2);
      expect(results[0].id).toBe("cp_1");
      expect(results[1].id).toBe("cp_2");
    });

    it("paginates across multiple pages", async () => {
      mockRawRequest
        .mockResolvedValueOnce({
          data: {
            cardProducts: {
              edges: [{ node: { id: "cp_1", __typename: "CardProduct" }, cursor: "c1" }],
              pageInfo: { hasNextPage: true, endCursor: "c1" },
            },
          },
        })
        .mockResolvedValueOnce({
          data: {
            cardProducts: {
              edges: [{ node: { id: "cp_2", __typename: "CardProduct" }, cursor: "c2" }],
              pageInfo: { hasNextPage: false, endCursor: "c2" },
            },
          },
        });

      const results = [];
      for await (const product of client.cardProducts.list()) {
        results.push(product);
      }

      expect(results).toHaveLength(2);
      expect(mockRawRequest).toHaveBeenCalledTimes(2);
    });

    it("respects custom pageSize", async () => {
      mockRawRequest.mockResolvedValueOnce({
        data: {
          cardProducts: {
            edges: [],
            pageInfo: { hasNextPage: false, endCursor: "" },
          },
        },
      });

      const results = [];
      for await (const product of client.cardProducts.list({ pageSize: 5 })) {
        results.push(product);
      }

      const callArgs = mockRawRequest.mock.calls[0];
      const variables = callArgs[1];
      expect(variables.first).toBe(5);
    });
  });

  describe("get()", () => {
    it("returns a card product by ID", async () => {
      mockRawRequest.mockResolvedValueOnce({
        data: {
          node: { id: "cp_123", name: "Test Product", __typename: "CardProduct" },
        },
      });

      const product = await client.cardProducts.get("cp_123");
      expect(product.id).toBe("cp_123");
      expect(product.name).toBe("Test Product");
    });

    it("throws when node is null", async () => {
      mockRawRequest.mockResolvedValueOnce({
        data: { node: null },
      });

      await expect(client.cardProducts.get("cp_missing")).rejects.toThrow(
        "Card product not found: cp_missing",
      );
    });

    it("throws when node is wrong type", async () => {
      mockRawRequest.mockResolvedValueOnce({
        data: {
          node: { id: "fa_123", __typename: "FinancialAccount" },
        },
      });

      await expect(client.cardProducts.get("fa_123")).rejects.toThrow(
        "Card product not found: fa_123",
      );
    });
  });
});
