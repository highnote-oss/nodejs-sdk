import { describe, it, expect, vi, beforeEach } from "vitest";
import { Highnote } from "../../src/client.js";
import { HighnoteUserError } from "../../src/errors.js";

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

describe("TransfersResource", () => {
  let client: Highnote;

  beforeEach(() => {
    vi.clearAllMocks();
    client = new Highnote({ apiKey: "sk_test_fake" });
  });

  describe("initiateBetweenAccounts()", () => {
    it("returns a transfer on success", async () => {
      mockRawRequest.mockResolvedValueOnce({
        data: {
          initiateTransferBetweenFinancialAccounts: {
            __typename: "InterFinancialAccountTransfer",
            id: "ift_123",
            createdAt: "2026-01-01T00:00:00Z",
            updatedAt: "2026-01-01T00:00:00Z",
            status: "PENDING",
            statusReason: null,
            purpose: "GENERAL",
            memo: "Test transfer",
            amount: { value: "100.00", currencyCode: "USD" },
          },
        },
      });

      const transfer = await client.transfers.initiateBetweenAccounts({
        fromFinancialAccountId: "fa_1",
        toFinancialAccountId: "fa_2",
        amount: { value: "100.00", currencyCode: "USD" },
        purpose: "GENERAL" as any,
      });

      expect(transfer.id).toBe("ift_123");
      expect(transfer.status).toBe("PENDING");
    });

    it("throws HighnoteUserError on error", async () => {
      mockRawRequest.mockResolvedValueOnce({
        data: {
          initiateTransferBetweenFinancialAccounts: {
            __typename: "UserError",
            errors: [{ code: "INSUFFICIENT_FUNDS", description: "Not enough balance" }],
          },
        },
      });

      await expect(
        client.transfers.initiateBetweenAccounts({
          fromFinancialAccountId: "fa_1",
          toFinancialAccountId: "fa_2",
          amount: { value: "999999.00", currencyCode: "USD" },
          purpose: "GENERAL" as any,
        }),
      ).rejects.toThrow(HighnoteUserError);
    });
  });
});
