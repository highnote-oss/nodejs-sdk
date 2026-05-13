import { describe, it, expect, vi, beforeEach } from "vitest";
import { Highnote } from "../../src/client.js";
import {
  HighnoteUserError,
  HighnoteAccessDeniedError,
  HighnoteUnexpectedResponseError,
} from "../../src/errors.js";

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

describe("ExternalAccountsResource", () => {
  let client: Highnote;

  beforeEach(() => {
    vi.clearAllMocks();
    client = new Highnote({ apiKey: "sk_test_fake", environment: "test" });
  });

  describe("addVerifiedThroughPlaid()", () => {
    it("returns ExternalFinancialBankAccount on success", async () => {
      mockRawRequest.mockResolvedValueOnce({
        data: {
          addExternalBankAccountVerifiedThroughPlaid: {
            __typename: "ExternalFinancialBankAccount",
            id: "eba_plaid_123",
            name: "Plaid Checking",
            createdAt: "2026-03-20T00:00:00Z",
            updatedAt: "2026-03-20T00:00:00Z",
            externalBankAccountDetails: {
              id: "detail_1",
              last4: "1234",
              type: "CHECKING",
            },
          },
        },
      });
      const result = await client.externalAccounts.addVerifiedThroughPlaid({
        accountHolderId: "ah_123",
        externalToken: { value: "plaid_token_abc" },
      });
      expect(result.id).toBe("eba_plaid_123");
      expect(result.__typename).toBe("ExternalFinancialBankAccount");
    });

    it("throws HighnoteUserError on UserError", async () => {
      mockRawRequest.mockResolvedValueOnce({
        data: {
          addExternalBankAccountVerifiedThroughPlaid: {
            __typename: "UserError",
            errors: [{ code: "INVALID", description: "Bad token" }],
          },
        },
      });
      await expect(
        client.externalAccounts.addVerifiedThroughPlaid({
          accountHolderId: "ah_123",
          externalToken: { value: "bad_token" },
        }),
      ).rejects.toThrow(HighnoteUserError);
    });

    it("throws HighnoteAccessDeniedError on AccessDeniedError", async () => {
      mockRawRequest.mockResolvedValueOnce({
        data: {
          addExternalBankAccountVerifiedThroughPlaid: {
            __typename: "AccessDeniedError",
            message: "Not authorized",
          },
        },
      });
      await expect(
        client.externalAccounts.addVerifiedThroughPlaid({
          accountHolderId: "ah_123",
          externalToken: { value: "token" },
        }),
      ).rejects.toThrow(HighnoteAccessDeniedError);
    });
  });

  describe("addVerifiedThroughFinicity()", () => {
    it("returns ExternalFinancialBankAccount on success", async () => {
      mockRawRequest.mockResolvedValueOnce({
        data: {
          addExternalBankAccountVerifiedThroughFinicity: {
            __typename: "ExternalFinancialBankAccount",
            id: "eba_finicity_123",
            name: "Finicity Savings",
            createdAt: "2026-03-20T00:00:00Z",
            updatedAt: "2026-03-20T00:00:00Z",
            externalBankAccountDetails: {
              id: "detail_2",
              last4: "5678",
              type: "SAVINGS",
            },
          },
        },
      });
      const result = await client.externalAccounts.addVerifiedThroughFinicity({
        accountHolderId: "ah_123",
        name: "My Savings",
        bankAccountType: "SAVINGS" as any,
        externalToken: { customerId: "cust_1" },
      });
      expect(result.id).toBe("eba_finicity_123");
      expect(result.__typename).toBe("ExternalFinancialBankAccount");
    });

    it("throws HighnoteUnexpectedResponseError for unknown __typename", async () => {
      mockRawRequest.mockResolvedValueOnce({
        data: {
          addExternalBankAccountVerifiedThroughFinicity: {
            __typename: "SomeUnknown",
            id: "x",
          },
        },
      });
      await expect(
        client.externalAccounts.addVerifiedThroughFinicity({
          accountHolderId: "ah_123",
          name: "Test",
          bankAccountType: "CHECKING" as any,
          externalToken: { customerId: "c" },
        }),
      ).rejects.toThrow(HighnoteUnexpectedResponseError);
    });
  });

  describe("addNonVerified()", () => {
    it("returns NonVerifiedExternalUSFinancialBankAccount on success", async () => {
      mockRawRequest.mockResolvedValueOnce({
        data: {
          addNonVerifiedExternalUSFinancialBankAccount: {
            __typename: "NonVerifiedExternalUSFinancialBankAccount",
            id: "eba_nv_123",
            name: "Manual Checking",
            createdAt: "2026-03-20T00:00:00Z",
            updatedAt: "2026-03-20T00:00:00Z",
            externalBankAccountDetails: {
              id: "detail_3",
              last4: "9012",
              routingNumber: "091000019",
              type: "CHECKING",
            },
          },
        },
      });
      const result = await client.externalAccounts.addNonVerified({
        accountHolderId: "ah_123",
        routingNumber: "091000019",
        accountNumber: "123456789",
        bankAccountType: "CHECKING" as any,
        name: "Manual Checking",
      });
      expect(result.id).toBe("eba_nv_123");
      expect(result.__typename).toBe(
        "NonVerifiedExternalUSFinancialBankAccount",
      );
    });

    it("throws HighnoteUserError on UserError", async () => {
      mockRawRequest.mockResolvedValueOnce({
        data: {
          addNonVerifiedExternalUSFinancialBankAccount: {
            __typename: "UserError",
            errors: [
              { code: "INVALID", description: "Invalid routing number" },
            ],
          },
        },
      });
      await expect(
        client.externalAccounts.addNonVerified({
          accountHolderId: "ah_123",
          routingNumber: "000000000",
          accountNumber: "123",
          bankAccountType: "CHECKING" as any,
        }),
      ).rejects.toThrow(HighnoteUserError);
    });

    it("throws HighnoteAccessDeniedError on AccessDeniedError", async () => {
      mockRawRequest.mockResolvedValueOnce({
        data: {
          addNonVerifiedExternalUSFinancialBankAccount: {
            __typename: "AccessDeniedError",
            message: "Unauthorized",
          },
        },
      });
      await expect(
        client.externalAccounts.addNonVerified({
          accountHolderId: "ah_123",
          routingNumber: "091000019",
          accountNumber: "123456789",
          bankAccountType: "CHECKING" as any,
        }),
      ).rejects.toThrow(HighnoteAccessDeniedError);
    });
  });
});
