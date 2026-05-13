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

describe("TestAchResource", () => {
  let client: Highnote;

  beforeEach(() => {
    vi.clearAllMocks();
    client = new Highnote({ apiKey: "sk_test_fake", environment: "test" });
  });

  describe("simulateProcessing()", () => {
    it("returns NonOriginatedAchTransfer on success", async () => {
      mockRawRequest.mockResolvedValueOnce({
        data: {
          simulateAchTransferProcessing: {
            __typename: "NonOriginatedAchTransfer",
            id: "noach_123",
            createdAt: "2026-03-20T00:00:00Z",
          },
        },
      });
      const result = await client.test.ach.simulateProcessing({
        achTransferId: "noach_123",
      });
      expect(result.id).toBe("noach_123");
      expect(result.__typename).toBe("NonOriginatedAchTransfer");
    });

    it("throws HighnoteSimulationError in live environment", async () => {
      const liveClient = new Highnote({ apiKey: "sk_live_fake", environment: "live" });
      await expect(
        liveClient.test.ach.simulateProcessing({ achTransferId: "noach_123" }),
      ).rejects.toThrow(HighnoteSimulationError);
    });

    it("throws HighnoteUserError on UserError", async () => {
      mockRawRequest.mockResolvedValueOnce({
        data: {
          simulateAchTransferProcessing: {
            __typename: "UserError",
            errors: [{ code: "INVALID", description: "Bad input" }],
          },
        },
      });
      await expect(
        client.test.ach.simulateProcessing({ achTransferId: "noach_123" }),
      ).rejects.toThrow(HighnoteUserError);
    });
  });

  describe("simulateReturn()", () => {
    it("returns OriginatedAchTransfer on success", async () => {
      mockRawRequest.mockResolvedValueOnce({
        data: {
          simulateAchTransferReturn: {
            __typename: "OriginatedAchTransfer",
            id: "oach_123",
            createdAt: "2026-03-20T00:00:00Z",
          },
        },
      });
      const result = await client.test.ach.simulateReturn({
        achTransferId: "oach_123",
        returnReasonCode: "R01",
      });
      expect(result.id).toBe("oach_123");
      expect(result.__typename).toBe("OriginatedAchTransfer");
    });
  });

  describe("simulateExternallyInitiated()", () => {
    it("returns CreditFunds on success", async () => {
      mockRawRequest.mockResolvedValueOnce({
        data: {
          simulateExternallyInitiatedACHTransfer: {
            __typename: "CreditFunds",
            id: "cf_123",
            amount: { value: "200.00", currencyCode: "USD" },
            createdAt: "2026-03-20T00:00:00Z",
          },
        },
      });
      const result = await client.test.ach.simulateExternallyInitiated({
        financialAccountId: "fa_123",
        transferType: "CREDIT_FUNDS",
      });
      expect(result.id).toBe("cf_123");
      expect(result.__typename).toBe("CreditFunds");
    });
  });

  describe("simulateNonOriginated()", () => {
    it("returns NonOriginatedAchTransfer on success", async () => {
      mockRawRequest.mockResolvedValueOnce({
        data: {
          simulateNonOriginatedAchTransfer: {
            __typename: "NonOriginatedAchTransfer",
            id: "noach_456",
            status: "PENDING",
            createdAt: "2026-03-20T00:00:00Z",
          },
        },
      });
      const result = await client.test.ach.simulateNonOriginated({
        financialAccountId: "fa_123",
      });
      expect(result.id).toBe("noach_456");
      expect(result.__typename).toBe("NonOriginatedAchTransfer");
    });
  });
});
