import { describe, it, expect, vi, beforeEach } from "vitest";
import { Highnote } from "../../../src/client.js";
import {
  HighnoteUserError,
  HighnoteAccessDeniedError,
  HighnoteUnexpectedResponseError,
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

describe("TestTransactionsResource", () => {
  let client: Highnote;

  beforeEach(() => {
    vi.clearAllMocks();
    client = new Highnote({ apiKey: "sk_test_fake", environment: "test" });
  });

  describe("authorize()", () => {
    it("returns AuthorizationEvent on success", async () => {
      mockRawRequest.mockResolvedValueOnce({
        data: {
          simulateAuthorization: {
            __typename: "AuthorizationEvent",
            id: "auth_123",
            approvedAmount: { value: "50.00", currencyCode: "USD" },
            requestedAmount: { value: "50.00", currencyCode: "USD" },
            responseCode: "APPROVED",
            createdAt: "2026-03-20T00:00:00Z",
          },
        },
      });
      const result = await client.test.transactions.authorize({
        cardId: "pc_123",
        amount: { value: "50.00", currencyCode: "USD" },
      });
      expect(result.id).toBe("auth_123");
      expect(result.__typename).toBe("AuthorizationEvent");
    });

    it("throws HighnoteSimulationError in live environment", async () => {
      const liveClient = new Highnote({ apiKey: "sk_live_fake", environment: "live" });
      await expect(
        liveClient.test.transactions.authorize({
          cardId: "pc_123",
          amount: { value: "50.00", currencyCode: "USD" },
        }),
      ).rejects.toThrow(HighnoteSimulationError);
    });

    it("throws HighnoteUserError on UserError", async () => {
      mockRawRequest.mockResolvedValueOnce({
        data: {
          simulateAuthorization: {
            __typename: "UserError",
            errors: [{ code: "INVALID", description: "Bad input" }],
          },
        },
      });
      await expect(
        client.test.transactions.authorize({
          cardId: "pc_123",
          amount: { value: "50.00", currencyCode: "USD" },
        }),
      ).rejects.toThrow(HighnoteUserError);
    });

    it("throws HighnoteAccessDeniedError on AccessDeniedError", async () => {
      mockRawRequest.mockResolvedValueOnce({
        data: {
          simulateAuthorization: {
            __typename: "AccessDeniedError",
            message: "Not authorized",
          },
        },
      });
      await expect(
        client.test.transactions.authorize({
          cardId: "pc_123",
          amount: { value: "50.00", currencyCode: "USD" },
        }),
      ).rejects.toThrow(HighnoteAccessDeniedError);
    });

    it("throws HighnoteUnexpectedResponseError for unknown __typename", async () => {
      mockRawRequest.mockResolvedValueOnce({
        data: {
          simulateAuthorization: { __typename: "SomeUnknown", id: "x" },
        },
      });
      await expect(
        client.test.transactions.authorize({
          cardId: "pc_123",
          amount: { value: "50.00", currencyCode: "USD" },
        }),
      ).rejects.toThrow(HighnoteUnexpectedResponseError);
    });
  });

  describe("clear()", () => {
    it("returns ClearingEvent on success", async () => {
      mockRawRequest.mockResolvedValueOnce({
        data: {
          simulateClearing: {
            __typename: "ClearingEvent",
            id: "clr_123",
            approvedAmount: { value: "50.00", currencyCode: "USD" },
            createdAt: "2026-03-20T00:00:00Z",
          },
        },
      });
      const result = await client.test.transactions.clear({ transactionId: "txn_123" });
      expect(result.id).toBe("clr_123");
      expect(result.__typename).toBe("ClearingEvent");
    });
  });

  describe("authAndClear()", () => {
    it("returns AuthorizationAndClearEvent on success", async () => {
      mockRawRequest.mockResolvedValueOnce({
        data: {
          simulateSingleStepAuthAndClear: {
            __typename: "AuthorizationAndClearEvent",
            id: "aac_123",
            approvedAmount: { value: "25.00", currencyCode: "USD" },
            createdAt: "2026-03-20T00:00:00Z",
          },
        },
      });
      const result = await client.test.transactions.authAndClear({
        cardId: "pc_123",
        amount: { value: "25.00", currencyCode: "USD" },
      });
      expect(result.id).toBe("aac_123");
      expect(result.__typename).toBe("AuthorizationAndClearEvent");
    });
  });

  describe("reverse()", () => {
    it("returns ReversalEvent on success", async () => {
      mockRawRequest.mockResolvedValueOnce({
        data: {
          simulateReversal: {
            __typename: "ReversalEvent",
            id: "rev_123",
            approvedAmount: { value: "50.00", currencyCode: "USD" },
            createdAt: "2026-03-20T00:00:00Z",
          },
        },
      });
      const result = await client.test.transactions.reverse({ transactionId: "txn_123" });
      expect(result.id).toBe("rev_123");
    });
  });

  describe("refund()", () => {
    it("returns ClearingEvent on success (refund returns clearing)", async () => {
      mockRawRequest.mockResolvedValueOnce({
        data: {
          simulateRefund: {
            __typename: "ClearingEvent",
            id: "ref_123",
            approvedAmount: { value: "50.00", currencyCode: "USD" },
            createdAt: "2026-03-20T00:00:00Z",
          },
        },
      });
      const result = await client.test.transactions.refund({ transactionId: "txn_123" });
      expect(result.id).toBe("ref_123");
      expect(result.__typename).toBe("ClearingEvent");
    });
  });

  describe("verify()", () => {
    it("returns AuthorizationEvent on success", async () => {
      mockRawRequest.mockResolvedValueOnce({
        data: {
          simulateAuthorization: {
            __typename: "AuthorizationEvent",
            id: "verify_123",
            approvedAmount: { value: "0", currencyCode: "USD" },
            requestedAmount: { value: "0", currencyCode: "USD" },
            responseCode: "APPROVED",
            createdAt: "2026-03-20T00:00:00Z",
          },
        },
      });
      const result = await client.test.transactions.verify({
        cardId: "pc_123",
      });
      expect(result.id).toBe("verify_123");
      expect(result.__typename).toBe("AuthorizationEvent");
      // Verify the correct variables were sent
      expect(mockRawRequest).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          input: expect.objectContaining({
            cardId: "pc_123",
            amount: { value: "0", currencyCode: "USD" },
            transactionProcessingType: "ACCOUNT_VERIFICATION",
          }),
        }),
      );
    });

    it("throws HighnoteSimulationError in live environment", async () => {
      const liveClient = new Highnote({ apiKey: "sk_live_fake", environment: "live" });
      await expect(
        liveClient.test.transactions.verify({ cardId: "pc_123" }),
      ).rejects.toThrow(HighnoteSimulationError);
    });

    it("defaults amount to $0/USD when no amount provided", async () => {
      mockRawRequest.mockResolvedValueOnce({
        data: {
          simulateAuthorization: {
            __typename: "AuthorizationEvent",
            id: "verify_456",
            approvedAmount: { value: "0", currencyCode: "USD" },
            responseCode: "APPROVED",
            createdAt: "2026-03-20T00:00:00Z",
          },
        },
      });
      await client.test.transactions.verify({ cardId: "pc_123" });
      expect(mockRawRequest).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          input: expect.objectContaining({
            amount: { value: "0", currencyCode: "USD" },
          }),
        }),
      );
    });

    it("allows custom amount override", async () => {
      mockRawRequest.mockResolvedValueOnce({
        data: {
          simulateAuthorization: {
            __typename: "AuthorizationEvent",
            id: "verify_789",
            approvedAmount: { value: "1.00", currencyCode: "USD" },
            responseCode: "APPROVED",
            createdAt: "2026-03-20T00:00:00Z",
          },
        },
      });
      await client.test.transactions.verify({
        cardId: "pc_123",
        amount: { value: "1.00", currencyCode: "USD" },
      });
      expect(mockRawRequest).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          input: expect.objectContaining({
            amount: { value: "1.00", currencyCode: "USD" },
          }),
        }),
      );
    });
  });

  describe("adjust()", () => {
    it("returns AdjustmentEvent on success", async () => {
      mockRawRequest.mockResolvedValueOnce({
        data: {
          simulateAdjustment: {
            __typename: "AdjustmentEvent",
            id: "adj_123",
            approvedAmount: { value: "10.00", currencyCode: "USD" },
            createdAt: "2026-03-20T00:00:00Z",
          },
        },
      });
      const result = await client.test.transactions.adjust({
        transactionId: "txn_123",
        amount: { value: "10.00", currencyCode: "USD" },
        transactionProcessingType: "ADJUSTMENT_CREDIT",
      });
      expect(result.id).toBe("adj_123");
      expect(result.__typename).toBe("AdjustmentEvent");
    });
  });
});
