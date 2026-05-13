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

describe("TestFinancialAccountsResource", () => {
  let client: Highnote;

  beforeEach(() => {
    vi.clearAllMocks();
    client = new Highnote({ apiKey: "sk_test_fake", environment: "test" });
  });

  describe("initiateClosure()", () => {
    it("returns FinancialAccount on success", async () => {
      mockRawRequest.mockResolvedValueOnce({
        data: {
          simulateInitiateFinancialAccountClosure: {
            __typename: "FinancialAccount",
            id: "fa_123",
            accountStatus: "CLOSURE_INITIATED",
            name: "Test Account",
            createdAt: "2026-03-20T00:00:00Z",
          },
        },
      });
      const result = await client.test.financialAccounts.initiateClosure({
        financialAccountId: "fa_123",
      });
      expect(result.id).toBe("fa_123");
      expect(result.__typename).toBe("FinancialAccount");
    });

    it("throws HighnoteSimulationError in live environment", async () => {
      const liveClient = new Highnote({ apiKey: "sk_live_fake", environment: "live" });
      await expect(
        liveClient.test.financialAccounts.initiateClosure({ financialAccountId: "fa_123" }),
      ).rejects.toThrow(HighnoteSimulationError);
    });

    it("throws HighnoteUserError on UserError", async () => {
      mockRawRequest.mockResolvedValueOnce({
        data: {
          simulateInitiateFinancialAccountClosure: {
            __typename: "UserError",
            errors: [{ code: "INVALID", description: "Bad input" }],
          },
        },
      });
      await expect(
        client.test.financialAccounts.initiateClosure({ financialAccountId: "fa_123" }),
      ).rejects.toThrow(HighnoteUserError);
    });
  });

  describe("close()", () => {
    it("returns FinancialAccount on success", async () => {
      mockRawRequest.mockResolvedValueOnce({
        data: {
          simulateCloseFinancialAccount: {
            __typename: "FinancialAccount",
            id: "fa_456",
            accountStatus: "CLOSED",
            name: "Test Account",
            createdAt: "2026-03-20T00:00:00Z",
          },
        },
      });
      const result = await client.test.financialAccounts.close({
        financialAccountId: "fa_456",
      });
      expect(result.id).toBe("fa_456");
      expect(result.__typename).toBe("FinancialAccount");
    });
  });
});
