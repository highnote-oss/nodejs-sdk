import { describe, it, expect, vi, beforeEach } from "vitest";
import { Highnote } from "../../src/client.js";
import { HighnoteAccessDeniedError, HighnoteUserError } from "../../src/errors.js";
import { FinancialAccountSuspensionReasonInput } from "../../src/generated/graphql.js";

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

describe("FinancialAccountsResource", () => {
  let client: Highnote;

  beforeEach(() => {
    vi.clearAllMocks();
    client = new Highnote({ apiKey: "sk_test_fake" });
  });

  describe("issue()", () => {
    it("returns a financial account on success", async () => {
      mockRawRequest.mockResolvedValueOnce({
        data: {
          issueFinancialAccountForApplication: {
            __typename: "FinancialAccount",
            id: "fa_123",
            externalId: null,
            createdAt: "2026-01-01T00:00:00Z",
            accountStatus: "ACTIVE",
            name: "Main Account",
          },
        },
      });

      const account = await client.financialAccounts.issue({
        applicationId: "app_1",
        name: "Main Account",
      });

      expect(account.id).toBe("fa_123");
      expect(account.name).toBe("Main Account");
    });

    it("throws HighnoteUserError on error", async () => {
      mockRawRequest.mockResolvedValueOnce({
        data: {
          issueFinancialAccountForApplication: {
            __typename: "UserError",
            errors: [{ code: "NOT_APPROVED", description: "Application not approved" }],
          },
        },
      });

      await expect(
        client.financialAccounts.issue({ applicationId: "bad", name: "Test" }),
      ).rejects.toThrow(HighnoteUserError);
    });
  });

  describe("get()", () => {
    it("returns a financial account by ID", async () => {
      mockRawRequest.mockResolvedValueOnce({
        data: {
          node: {
            __typename: "FinancialAccount",
            id: "fa_123",
            externalId: null,
            createdAt: "2026-01-01T00:00:00Z",
            accountStatus: "ACTIVE",
            name: "Main Account",
          },
        },
      });

      const account = await client.financialAccounts.get("fa_123");
      expect(account.id).toBe("fa_123");
    });

    it("throws when not found", async () => {
      mockRawRequest.mockResolvedValueOnce({
        data: { node: null },
      });

      await expect(client.financialAccounts.get("bad")).rejects.toThrow(
        "Financial account not found",
      );
    });
  });

  describe("suspend()", () => {
    it("returns suspended account", async () => {
      mockRawRequest.mockResolvedValueOnce({
        data: {
          suspendFinancialAccount: {
            __typename: "FinancialAccount",
            id: "fa_123",
            accountStatus: "SUSPENDED",
          },
        },
      });

      const result = await client.financialAccounts.suspend({
        id: "fa_123",
        memo: "Test suspension",
        suspensionReason: FinancialAccountSuspensionReasonInput.ACCOUNT_HOLDER_REQUEST,
      });
      expect(result.accountStatus).toBe("SUSPENDED");
    });
  });

  describe("unsuspend()", () => {
    it("returns unsuspended account", async () => {
      mockRawRequest.mockResolvedValueOnce({
        data: {
          unsuspendFinancialAccount: {
            __typename: "FinancialAccount",
            id: "fa_123",
            accountStatus: "ACTIVE",
          },
        },
      });

      const result = await client.financialAccounts.unsuspend({
        id: "fa_123",
        memo: "Test unsuspension",
      });
      expect(result.accountStatus).toBe("ACTIVE");
    });
  });

  describe("listActivities()", () => {
    const mockActivity = {
      createdAt: "2026-04-01T00:00:00Z",
      updatedAt: "2026-04-01T01:00:00Z",
      isComplete: true,
      pendingAmount: { value: 0, currencyCode: "USD" },
      postedAmount: { value: 1099, currencyCode: "USD" },
      sign: "NEGATIVE",
      source: {
        __typename: "DebitTransaction" as const,
        id: "dt_1",
        transactionEvents: [],
      },
    };

    it("returns activities from a single page", async () => {
      mockRawRequest.mockResolvedValueOnce({
        data: {
          node: {
            __typename: "FinancialAccount",
            id: "fa_123",
            financialAccountActivities: {
              edges: [{ node: mockActivity }],
              pageInfo: { hasNextPage: false, endCursor: "c1" },
            },
          },
        },
      });

      const results = [];
      for await (const activity of client.financialAccounts.listActivities("fa_123")) {
        results.push(activity);
      }

      expect(results).toHaveLength(1);
      expect(results[0].sign).toBe("NEGATIVE");
      expect(results[0].postedAmount?.value).toBe(1099);
      expect(results[0].source?.__typename).toBe("DebitTransaction");
    });

    it("paginates across multiple pages", async () => {
      mockRawRequest
        .mockResolvedValueOnce({
          data: {
            node: {
              __typename: "FinancialAccount",
              id: "fa_123",
              financialAccountActivities: {
                edges: [{ node: { ...mockActivity, sign: "NEGATIVE" } }],
                pageInfo: { hasNextPage: true, endCursor: "c1" },
              },
            },
          },
        })
        .mockResolvedValueOnce({
          data: {
            node: {
              __typename: "FinancialAccount",
              id: "fa_123",
              financialAccountActivities: {
                edges: [{ node: { ...mockActivity, sign: "POSITIVE" } }],
                pageInfo: { hasNextPage: false, endCursor: "c2" },
              },
            },
          },
        });

      const results = [];
      for await (const activity of client.financialAccounts.listActivities("fa_123")) {
        results.push(activity);
      }

      expect(results).toHaveLength(2);
      expect(results[0].sign).toBe("NEGATIVE");
      expect(results[1].sign).toBe("POSITIVE");
      expect(mockRawRequest).toHaveBeenCalledTimes(2);
    });

    it("returns empty when node is not a FinancialAccount", async () => {
      mockRawRequest.mockResolvedValueOnce({
        data: { node: null },
      });

      const results = [];
      for await (const activity of client.financialAccounts.listActivities("bad_id")) {
        results.push(activity);
      }

      expect(results).toHaveLength(0);
    });
  });

  describe("listReviewWorkflowEvents()", () => {
    const mockEvent = {
      id: "rwe_1",
      reviewState: "COMPLETED",
      createdAt: "2026-04-01T00:00:00Z",
      updatedAt: "2026-04-01T01:00:00Z",
      transfer: {
        __typename: "WireTransfer" as const,
        id: "wt_1",
        amount: { value: "10000.00", currencyCode: "USD" },
        memo: "Account funding",
        status: "COMPLETED",
        statusReason: null,
        type: "INCOMING",
        createdAt: "2026-04-01T00:00:00Z",
        updatedAt: "2026-04-01T01:00:00Z",
      },
    };

    it("returns review workflow events from a single page", async () => {
      mockRawRequest.mockResolvedValueOnce({
        data: {
          node: {
            __typename: "FinancialAccount",
            id: "fa_123",
            reviewWorkflowEvents: {
              __typename: "ReviewWorkflowEventConnection",
              edges: [{ cursor: "c1", node: mockEvent }],
              pageInfo: { hasNextPage: false, endCursor: "c1" },
            },
          },
        },
      });

      const results = [];
      for await (const event of client.financialAccounts.listReviewWorkflowEvents("fa_123")) {
        results.push(event);
      }

      expect(results).toHaveLength(1);
      expect(results[0].id).toBe("rwe_1");
      expect(results[0].reviewState).toBe("COMPLETED");
      expect(results[0].transfer?.__typename).toBe("WireTransfer");
      expect(results[0].transfer?.amount.value).toBe("10000.00");
    });

    it("paginates across multiple pages", async () => {
      mockRawRequest
        .mockResolvedValueOnce({
          data: {
            node: {
              __typename: "FinancialAccount",
              id: "fa_123",
              reviewWorkflowEvents: {
                __typename: "ReviewWorkflowEventConnection",
                edges: [{ cursor: "c1", node: { ...mockEvent, id: "rwe_1" } }],
                pageInfo: { hasNextPage: true, endCursor: "c1" },
              },
            },
          },
        })
        .mockResolvedValueOnce({
          data: {
            node: {
              __typename: "FinancialAccount",
              id: "fa_123",
              reviewWorkflowEvents: {
                __typename: "ReviewWorkflowEventConnection",
                edges: [{ cursor: "c2", node: { ...mockEvent, id: "rwe_2" } }],
                pageInfo: { hasNextPage: false, endCursor: "c2" },
              },
            },
          },
        });

      const results = [];
      for await (const event of client.financialAccounts.listReviewWorkflowEvents("fa_123")) {
        results.push(event);
      }

      expect(results).toHaveLength(2);
      expect(results[0].id).toBe("rwe_1");
      expect(results[1].id).toBe("rwe_2");
      expect(mockRawRequest).toHaveBeenCalledTimes(2);
    });

    it("returns empty when node is not a FinancialAccount", async () => {
      mockRawRequest.mockResolvedValueOnce({
        data: { node: null },
      });

      const results = [];
      for await (const event of client.financialAccounts.listReviewWorkflowEvents("bad_id")) {
        results.push(event);
      }

      expect(results).toHaveLength(0);
    });

    it("throws HighnoteUserError on UserError response", async () => {
      mockRawRequest.mockResolvedValueOnce({
        data: {
          node: {
            __typename: "FinancialAccount",
            id: "fa_123",
            reviewWorkflowEvents: {
              __typename: "UserError",
              errors: [{ code: "INVALID", description: "Invalid request" }],
            },
          },
        },
      });

      const results = [];
      await expect(async () => {
        for await (const event of client.financialAccounts.listReviewWorkflowEvents("fa_123")) {
          results.push(event);
        }
      }).rejects.toThrow(HighnoteUserError);
    });

    it("throws HighnoteAccessDeniedError on AccessDeniedError response", async () => {
      mockRawRequest.mockResolvedValueOnce({
        data: {
          node: {
            __typename: "FinancialAccount",
            id: "fa_123",
            reviewWorkflowEvents: {
              __typename: "AccessDeniedError",
              message: "Not authorized",
            },
          },
        },
      });

      const results = [];
      await expect(async () => {
        for await (const event of client.financialAccounts.listReviewWorkflowEvents("fa_123")) {
          results.push(event);
        }
      }).rejects.toThrow(HighnoteAccessDeniedError);
    });
  });
});
