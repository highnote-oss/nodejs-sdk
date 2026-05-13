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

describe("SpendRulesResource", () => {
  let client: Highnote;

  beforeEach(() => {
    vi.clearAllMocks();
    client = new Highnote({ apiKey: "sk_test_fake" });
  });

  describe("createMerchantCategory()", () => {
    it("returns a spend rule on success", async () => {
      mockRawRequest.mockResolvedValueOnce({
        data: {
          createMerchantCategorySpendRule: {
            __typename: "MerchantCategorySpendRule",
            id: "sr_123",
            name: "Block ATM",
            createdAt: "2026-01-01T00:00:00Z",
            updatedAt: "2026-01-01T00:00:00Z",
            version: "1",
          },
        },
      });

      const rule = await client.spendRules.createMerchantCategory({
        name: "Block ATM",
        blocked: ["6011"],
      } as any);

      expect(rule.id).toBe("sr_123");
      expect(rule.name).toBe("Block ATM");
    });
  });

  describe("createAmountLimit()", () => {
    it("returns a spend rule on success", async () => {
      mockRawRequest.mockResolvedValueOnce({
        data: {
          createAmountLimitSpendRule: {
            __typename: "AmountLimitSpendRule",
            id: "sr_456",
            name: "Max $500",
            createdAt: "2026-01-01T00:00:00Z",
            updatedAt: "2026-01-01T00:00:00Z",
            version: "1",
          },
        },
      });

      const rule = await client.spendRules.createAmountLimit({
        name: "Max $500",
        maximumAmount: { value: "500.00", currencyCode: "USD" },
      } as any);

      expect(rule.id).toBe("sr_456");
    });
  });

  describe("attachToCard()", () => {
    it("returns the card on success", async () => {
      mockRawRequest.mockResolvedValueOnce({
        data: {
          attachSpendRuleToPaymentCard: {
            __typename: "PaymentCard",
            id: "pc_123",
            status: "ACTIVE",
          },
        },
      });

      const card = await client.spendRules.attachToCard({
        paymentCardId: "pc_123",
        spendRule: { id: "sr_123", version: "LATEST" },
      });

      expect(card.id).toBe("pc_123");
    });
  });

  describe("detachFromCard()", () => {
    it("returns the card on success", async () => {
      mockRawRequest.mockResolvedValueOnce({
        data: {
          detachSpendRuleFromPaymentCard: {
            __typename: "PaymentCard",
            id: "pc_123",
            status: "ACTIVE",
          },
        },
      });

      const card = await client.spendRules.detachFromCard({
        paymentCardId: "pc_123",
        spendRule: { id: "sr_123" },
      } as any);

      expect(card.id).toBe("pc_123");
    });
  });
});
