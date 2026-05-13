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

describe("TestPhysicalCardsResource", () => {
  let client: Highnote;

  beforeEach(() => {
    vi.clearAllMocks();
    client = new Highnote({ apiKey: "sk_test_fake", environment: "test" });
  });

  describe("sendToPrinter()", () => {
    it("returns PhysicalPaymentCardOrder on success", async () => {
      mockRawRequest.mockResolvedValueOnce({
        data: {
          simulatePhysicalPaymentCardOrderSendToPrinter: {
            __typename: "PhysicalPaymentCardOrder",
            id: "order_123",
            orderState: { status: "SENT_TO_PRINTER" },
            createdAt: "2026-03-20T00:00:00Z",
            updatedAt: "2026-03-20T00:00:00Z",
          },
        },
      });
      const result = await client.test.physicalCards.sendToPrinter({
        cardOrderId: "order_123",
      });
      expect(result.id).toBe("order_123");
      expect(result.__typename).toBe("PhysicalPaymentCardOrder");
    });

    it("throws HighnoteSimulationError in live environment", async () => {
      const liveClient = new Highnote({ apiKey: "sk_live_fake", environment: "live" });
      await expect(
        liveClient.test.physicalCards.sendToPrinter({ cardOrderId: "order_123" }),
      ).rejects.toThrow(HighnoteSimulationError);
    });

    it("throws HighnoteUserError on UserError", async () => {
      mockRawRequest.mockResolvedValueOnce({
        data: {
          simulatePhysicalPaymentCardOrderSendToPrinter: {
            __typename: "UserError",
            errors: [{ code: "INVALID", description: "Bad input" }],
          },
        },
      });
      await expect(
        client.test.physicalCards.sendToPrinter({ cardOrderId: "order_123" }),
      ).rejects.toThrow(HighnoteUserError);
    });
  });

  describe("approve()", () => {
    it("returns PhysicalPaymentCardOrder on success", async () => {
      mockRawRequest.mockResolvedValueOnce({
        data: {
          simulatePhysicalPaymentCardOrderApproval: {
            __typename: "PhysicalPaymentCardOrder",
            id: "order_456",
            orderState: { status: "APPROVED" },
            createdAt: "2026-03-20T00:00:00Z",
            updatedAt: "2026-03-20T00:00:00Z",
          },
        },
      });
      const result = await client.test.physicalCards.approve({
        cardOrderId: "order_456",
      });
      expect(result.id).toBe("order_456");
      expect(result.__typename).toBe("PhysicalPaymentCardOrder");
    });
  });

  describe("ship()", () => {
    it("returns PhysicalPaymentCardOrder on success", async () => {
      mockRawRequest.mockResolvedValueOnce({
        data: {
          simulatePhysicalPaymentCardOrderShipped: {
            __typename: "PhysicalPaymentCardOrder",
            id: "order_789",
            orderState: { status: "SHIPPED" },
            createdAt: "2026-03-20T00:00:00Z",
            updatedAt: "2026-03-20T00:00:00Z",
          },
        },
      });
      const result = await client.test.physicalCards.ship({
        cardOrderId: "order_789",
      });
      expect(result.id).toBe("order_789");
      expect(result.__typename).toBe("PhysicalPaymentCardOrder");
    });
  });

  describe("failShipment()", () => {
    it("returns PhysicalPaymentCardOrder on success", async () => {
      mockRawRequest.mockResolvedValueOnce({
        data: {
          simulatePhysicalPaymentCardOrderShipmentFailed: {
            __typename: "PhysicalPaymentCardOrder",
            id: "order_999",
            orderState: { status: "SHIPMENT_FAILED" },
            createdAt: "2026-03-20T00:00:00Z",
            updatedAt: "2026-03-20T00:00:00Z",
          },
        },
      });
      const result = await client.test.physicalCards.failShipment({
        cardOrderId: "order_999",
      });
      expect(result.id).toBe("order_999");
      expect(result.__typename).toBe("PhysicalPaymentCardOrder");
    });
  });
});
