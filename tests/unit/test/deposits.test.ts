import { describe, it, expect, vi, beforeEach } from "vitest";
import { Highnote } from "../../../src/client.js";
import {
  HighnoteUserError,
  HighnoteSimulationError,
} from "../../../src/errors.js";

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

describe("TestDepositsResource", () => {
  let client: Highnote;

  beforeEach(() => {
    vi.clearAllMocks();
    client = new Highnote({ apiKey: "sk_test_fake", environment: "test" });
  });

  describe("create()", () => {
    it("returns Transfer on success", async () => {
      mockRawRequest.mockResolvedValueOnce({
        data: {
          simulateDeposit: {
            __typename: "Transfer",
            id: "txfr_123",
            amount: { value: "100.00", currencyCode: "USD" },
            createdAt: "2026-03-20T00:00:00Z",
          },
        },
      });
      const result = await client.test.deposits.create({
        financialAccountId: "fa_123",
        amount: { value: "100.00", currencyCode: "USD" },
      });
      expect(result.id).toBe("txfr_123");
      expect(result.__typename).toBe("Transfer");
    });

    it("returns WireTransfer on success", async () => {
      mockRawRequest.mockResolvedValueOnce({
        data: {
          simulateDeposit: {
            __typename: "WireTransfer",
            id: "wire_123",
            amount: { value: "500.00", currencyCode: "USD" },
            createdAt: "2026-03-20T00:00:00Z",
          },
        },
      });
      const result = await client.test.deposits.create({
        financialAccountId: "fa_123",
        amount: { value: "500.00", currencyCode: "USD" },
      });
      expect(result.id).toBe("wire_123");
      expect(result.__typename).toBe("WireTransfer");
    });

    it("throws HighnoteSimulationError in live environment", async () => {
      const liveClient = new Highnote({ apiKey: "sk_live_fake", environment: "live" });
      await expect(
        liveClient.test.deposits.create({
          financialAccountId: "fa_123",
          amount: { value: "100.00", currencyCode: "USD" },
        }),
      ).rejects.toThrow(HighnoteSimulationError);
    });

    it("throws HighnoteUserError on UserError", async () => {
      mockRawRequest.mockResolvedValueOnce({
        data: {
          simulateDeposit: {
            __typename: "UserError",
            errors: [{ code: "INVALID", description: "Bad input" }],
          },
        },
      });
      await expect(
        client.test.deposits.create({
          financialAccountId: "fa_123",
          amount: { value: "100.00", currencyCode: "USD" },
        }),
      ).rejects.toThrow(HighnoteUserError);
    });
  });
});
