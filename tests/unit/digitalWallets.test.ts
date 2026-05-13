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

describe("DigitalWalletsResource", () => {
  let client: Highnote;

  beforeEach(() => {
    vi.clearAllMocks();
    client = new Highnote({ apiKey: "sk_test_fake" });
  });

  describe("addToApplePay()", () => {
    it("returns provisioning data on success", async () => {
      mockRawRequest.mockResolvedValueOnce({
        data: {
          addPaymentCardToApplePayByDevicePushProvisioning: {
            __typename: "PaymentCardDigitalWalletTokenApplePayDevicePushProvisioning",
            activationData: "base64data",
            encryptedPassData: "base64pass",
            ephemeralPublicKey: "base64key",
          },
        },
      });

      const result = await client.digitalWallets.addToApplePay({
        paymentCardId: "pc_123",
        certificates: ["cert1"],
        nonce: "nonce",
        nonceSignature: "sig",
        deviceType: "MOBILE" as any,
      });

      expect(result.activationData).toBe("base64data");
      expect(result.encryptedPassData).toBe("base64pass");
    });

    it("throws HighnoteUserError on error", async () => {
      mockRawRequest.mockResolvedValueOnce({
        data: {
          addPaymentCardToApplePayByDevicePushProvisioning: {
            __typename: "UserError",
            errors: [{ code: "INVALID", description: "Card not eligible" }],
          },
        },
      });

      await expect(
        client.digitalWallets.addToApplePay({
          paymentCardId: "pc_bad",
          certificates: [],
          nonce: "",
          nonceSignature: "",
          deviceType: "MOBILE" as any,
        }),
      ).rejects.toThrow(HighnoteUserError);
    });
  });

  describe("addToGooglePay()", () => {
    it("returns provisioning data on success", async () => {
      mockRawRequest.mockResolvedValueOnce({
        data: {
          addPaymentCardToGooglePayByDevicePushProvisioning: {
            __typename: "PaymentCardDigitalWalletTokenGooglePayPushProvisioning",
            opaquePaymentCard: "opaque_data",
          },
        },
      });

      const result = await client.digitalWallets.addToGooglePay({
        paymentCardId: "pc_123",
        deviceType: "MOBILE" as any,
      });

      expect(result.opaquePaymentCard).toBe("opaque_data");
    });
  });
});
