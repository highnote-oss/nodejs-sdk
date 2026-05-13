import { describe, it, expect, vi, beforeEach } from "vitest";
import { Highnote } from "../../src/client.js";

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
}));

describe("TransactionsResource", () => {
  let client: Highnote;

  beforeEach(() => {
    vi.clearAllMocks();
    client = new Highnote({ apiKey: "sk_test_fake" });
  });

  describe("list()", () => {
    it("returns transactions from a single page", async () => {
      mockRawRequest.mockResolvedValueOnce({
        data: {
          paymentTransactions: {
            edges: [
              {
                node: {
                  id: "txn_1",
                  createdAt: "2026-01-01T00:00:00Z",
                  status: "CAPTURED",
                  authorizedAmount: { value: "50.00", currencyCode: "USD" },
                  __typename: "PaymentTransaction",
                },
                cursor: "c1",
              },
            ],
            pageInfo: { hasNextPage: false, endCursor: "c1" },
          },
        },
      });

      const results = [];
      for await (const txn of client.transactions.list()) {
        results.push(txn);
      }

      expect(results).toHaveLength(1);
      expect(results[0].id).toBe("txn_1");
    });

    it("passes filterBy to the query", async () => {
      mockRawRequest.mockResolvedValueOnce({
        data: {
          paymentTransactions: {
            edges: [],
            pageInfo: { hasNextPage: false, endCursor: "" },
          },
        },
      });

      const results = [];
      for await (const txn of client.transactions.list({ filterBy: {} as any })) {
        results.push(txn);
      }

      const callArgs = mockRawRequest.mock.calls[0];
      expect(callArgs[1]).toHaveProperty("filterBy");
    });
  });
});
