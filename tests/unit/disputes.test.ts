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

describe("DisputesResource", () => {
  let client: Highnote;

  beforeEach(() => {
    vi.clearAllMocks();
    client = new Highnote({ apiKey: "sk_test_fake" });
  });

  describe("initiate()", () => {
    it("returns a dispute on success", async () => {
      mockRawRequest.mockResolvedValueOnce({
        data: {
          initiateCustomerCardTransactionDispute: {
            __typename: "PaymentCardTransactionDispute",
            id: "dis_123",
            createdAt: "2026-01-01T00:00:00Z",
            updatedAt: "2026-01-01T00:00:00Z",
            status: "INITIATED",
            category: "FRAUD",
            customerClaimType: "VERBAL",
            liability: null,
            amount: { value: "50.00", currencyCode: "USD" },
            provisionalCreditHistory: [],
          },
        },
      });

      const dispute = await client.disputes.initiate({
        cardTransactionEventId: "te_123",
        amount: { value: "50.00", currencyCode: "USD" },
        category: "FRAUD" as any,
        customerClaimType: "VERBAL" as any,
        customerContact: {
          givenName: "Jane",
          familyName: "Doe",
          email: "jane@example.com",
        },
        customerInitiatedOn: "2026-03-18",
      });

      expect(dispute.id).toBe("dis_123");
      expect(dispute.status).toBe("INITIATED");
    });

    it("throws HighnoteUserError on error", async () => {
      mockRawRequest.mockResolvedValueOnce({
        data: {
          initiateCustomerCardTransactionDispute: {
            __typename: "UserError",
            errors: [{ code: "INVALID", description: "Transaction not eligible" }],
          },
        },
      });

      await expect(
        client.disputes.initiate({
          cardTransactionEventId: "bad",
          amount: { value: "50.00", currencyCode: "USD" },
          category: "FRAUD" as any,
          customerClaimType: "VERBAL" as any,
          customerContact: {
            givenName: "Jane",
            familyName: "Doe",
            email: "jane@example.com",
          },
          customerInitiatedOn: "2026-03-18",
        }),
      ).rejects.toThrow(HighnoteUserError);
    });
  });

  describe("get()", () => {
    it("returns a dispute with chargebacks", async () => {
      mockRawRequest.mockResolvedValueOnce({
        data: {
          node: {
            __typename: "PaymentCardTransactionDispute",
            id: "dis_123",
            createdAt: "2026-01-01T00:00:00Z",
            updatedAt: "2026-01-02T00:00:00Z",
            status: "IN_PROGRESS",
            category: "FRAUD",
            customerClaimType: "VERBAL",
            liability: "MERCHANT_LIABLE",
            amount: { value: "50.00", currencyCode: "USD" },
            subscriberNote: "Customer reported unauthorized transaction",
            provisionalCreditHistory: [
              {
                creditAmount: { value: "50.00", currencyCode: "USD" },
                creditStatus: "PROVISIONAL_CREDIT_ISSUED",
                createdAt: "2026-01-01T12:00:00Z",
              },
            ],
            chargebacks: [
              {
                id: "cb_456",
                status: "SUBMITTED",
                requestedAmount: { value: "50.00", currencyCode: "USD" },
                receivedAmount: null,
                creditStatus: "PROVISIONAL_CREDIT_ISSUED",
                createdAt: "2026-01-01T12:00:00Z",
                updatedAt: "2026-01-02T00:00:00Z",
              },
            ],
          },
        },
      });

      const dispute = await client.disputes.get("dis_123");
      expect(dispute.id).toBe("dis_123");
      expect(dispute.chargebacks).toHaveLength(1);
      expect(dispute.chargebacks?.[0].id).toBe("cb_456");
      expect(dispute.provisionalCreditHistory).toHaveLength(1);
    });

    it("throws when not found", async () => {
      mockRawRequest.mockResolvedValueOnce({ data: { node: null } });
      await expect(client.disputes.get("bad")).rejects.toThrow("Dispute not found");
    });
  });
});
