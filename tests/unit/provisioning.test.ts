import { describe, it, expect, vi, beforeEach } from "vitest";
import { Highnote } from "../../src/client.js";
import { HighnoteUserError, HighnoteUnexpectedResponseError, HighnoteAccessDeniedError } from "../../src/errors.js";

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

describe("ProvisioningResource", () => {
  let client: Highnote;

  beforeEach(() => {
    vi.clearAllMocks();
    client = new Highnote({ apiKey: "sk_test_fake" });
  });

  const validInput = {
    accountHolderId: "ah_123",
    idempotencyKey: "550e8400-e29b-41d4-a716-446655440000",
    actions: ["CREATE_APPLICATION" as const, "ISSUE_FINANCIAL_ACCOUNT" as const],
    actionInput: {
      createAccountHolderCardProductApplicationInput: {
        cardProductId: "cp_123",
        cardHolderAgreementConsent: {
          consentTimestamp: "2026-03-20T00:00:00Z",
          primaryAuthorizedPersonId: "ah_123",
        },
      },
      issueFinancialAccountForApplicationInput: {
        name: "My Card Account",
      },
    },
  };

  describe("create()", () => {
    it("returns AccountHolderProvisioning on success", async () => {
      mockRawRequest.mockResolvedValueOnce({
        data: {
          provisionAccountHolder: {
            __typename: "AccountHolderProvisioning",
            id: "prov_123",
            outcome: {
              status: "IN_PROGRESS",
            },
            workflowActions: [
              {
                action: "CREATE_APPLICATION",
                outcome: { status: "COMPLETED" },
              },
              {
                action: "ISSUE_FINANCIAL_ACCOUNT",
                outcome: { status: "IN_PROGRESS" },
              },
            ],
            accountHolder: {
              __typename: "USPersonAccountHolder",
              id: "ah_123",
            },
          },
        },
      });

      const result = await client.provisioning.create(validInput);

      expect(result.id).toBe("prov_123");
      expect(result.outcome?.status).toBe("IN_PROGRESS");
      expect(result.workflowActions).toHaveLength(2);
      expect(result.workflowActions?.[0]?.action).toBe("CREATE_APPLICATION");
      expect(result.workflowActions?.[0]?.outcome?.status).toBe("COMPLETED");
      expect(result.workflowActions?.[1]?.action).toBe("ISSUE_FINANCIAL_ACCOUNT");
    });

    it("throws HighnoteUserError on UserError", async () => {
      mockRawRequest.mockResolvedValueOnce({
        data: {
          provisionAccountHolder: {
            __typename: "UserError",
            errors: [{ code: "INVALID", description: "Invalid account holder" }],
          },
        },
      });

      await expect(
        client.provisioning.create(validInput),
      ).rejects.toThrow(HighnoteUserError);
    });

    it("throws HighnoteAccessDeniedError on AccessDeniedError", async () => {
      mockRawRequest.mockResolvedValueOnce({
        data: {
          provisionAccountHolder: {
            __typename: "AccessDeniedError",
            message: "Access denied",
          },
        },
      });
      await expect(client.provisioning.create(validInput)).rejects.toThrow(HighnoteAccessDeniedError);
    });

    it("throws HighnoteUnexpectedResponseError for unknown __typename", async () => {
      mockRawRequest.mockResolvedValueOnce({
        data: {
          provisionAccountHolder: {
            __typename: "SomeUnknownType",
            id: "x",
          },
        },
      });

      await expect(
        client.provisioning.create(validInput),
      ).rejects.toThrow(HighnoteUnexpectedResponseError);
    });
  });
});
