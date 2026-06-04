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

describe("CardsResource", () => {
  let client: Highnote;

  beforeEach(() => {
    vi.clearAllMocks();
    client = new Highnote({ apiKey: "sk_test_fake" });
  });

  describe("issue()", () => {
    it("returns a payment card on success", async () => {
      mockRawRequest.mockResolvedValueOnce({
        data: {
          issuePaymentCardForFinancialAccount: {
            __typename: "PaymentCard",
            id: "pc_123",
            bin: "411111",
            last4: "1234",
            network: "VISA",
            status: "ACTIVE",
            formFactor: "VIRTUAL",
            expirationDate: "2028-12-31T00:00:00Z",
            expirationMonth: "12",
            expirationYear: "2028",
            externalId: null,
          },
        },
      });

      const card = await client.cards.issue({
        financialAccountId: "fa_1",
        options: { activateOnCreate: true, expirationDate: "2028-12-31T00:00:00Z" },
      });

      expect(card.id).toBe("pc_123");
      expect(card.status).toBe("ACTIVE");
    });

    it("throws HighnoteUserError on UserError", async () => {
      mockRawRequest.mockResolvedValueOnce({
        data: {
          issuePaymentCardForFinancialAccount: {
            __typename: "UserError",
            errors: [{ code: "INVALID", description: "Bad account" }],
          },
        },
      });

      await expect(
        client.cards.issue({
          financialAccountId: "bad",
          options: { activateOnCreate: true, expirationDate: "2028-12-31T00:00:00Z" },
        }),
      ).rejects.toThrow(HighnoteUserError);
    });

    it("throws HighnoteUnexpectedResponseError for unknown __typename", async () => {
      mockRawRequest.mockResolvedValueOnce({
        data: {
          issuePaymentCardForFinancialAccount: {
            __typename: "SomeUnknownType",
            id: "x",
          },
        },
      });

      await expect(
        client.cards.issue({
          financialAccountId: "fa_1",
          options: { activateOnCreate: true, expirationDate: "2028-12-31T00:00:00Z" },
        }),
      ).rejects.toThrow(HighnoteUnexpectedResponseError);
    });
  });

  describe("activate()", () => {
    it("returns full payment card on activate success", async () => {
      mockRawRequest.mockResolvedValueOnce({
        data: {
          activatePaymentCard: {
            __typename: "PaymentCard",
            id: "pc_123",
            bin: "411111",
            last4: "1234",
            network: "VISA",
            status: "ACTIVE",
            formFactor: "VIRTUAL",
            expirationDate: "2028-12-31T00:00:00Z",
            externalId: "ext_123",
          },
        },
      });

      const card = await client.cards.activate({ paymentCardId: "pc_123" });
      expect(card.id).toBe("pc_123");
      expect(card.bin).toBe("411111");
      expect(card.last4).toBe("1234");
      expect(card.network).toBe("VISA");
      expect(card.status).toBe("ACTIVE");
      expect(card.formFactor).toBe("VIRTUAL");
      expect(card.expirationDate).toBe("2028-12-31T00:00:00Z");
      expect(card.externalId).toBe("ext_123");
    });

    it("throws HighnoteUserError on activate failure", async () => {
      mockRawRequest.mockResolvedValueOnce({
        data: {
          activatePaymentCard: {
            __typename: "UserError",
            errors: [{ code: "ALREADY_ACTIVE", description: "Card is already active" }],
          },
        },
      });

      await expect(
        client.cards.activate({ paymentCardId: "pc_123" }),
      ).rejects.toThrow(HighnoteUserError);
    });
  });

  describe("suspend()", () => {
    it("returns full payment card on suspend success", async () => {
      mockRawRequest.mockResolvedValueOnce({
        data: {
          suspendPaymentCard: {
            __typename: "PaymentCard",
            id: "pc_123",
            bin: "411111",
            last4: "1234",
            network: "VISA",
            status: "SUSPENDED",
            formFactor: "VIRTUAL",
            expirationDate: "2028-12-31T00:00:00Z",
            externalId: null,
          },
        },
      });

      const card = await client.cards.suspend({
        paymentCardId: "pc_123",
      });
      expect(card.id).toBe("pc_123");
      expect(card.bin).toBe("411111");
      expect(card.last4).toBe("1234");
      expect(card.network).toBe("VISA");
      expect(card.status).toBe("SUSPENDED");
      expect(card.formFactor).toBe("VIRTUAL");
      expect(card.expirationDate).toBe("2028-12-31T00:00:00Z");
      expect(card.externalId).toBeNull();
    });
  });

  describe("close()", () => {
    it("returns full payment card on close success", async () => {
      mockRawRequest.mockResolvedValueOnce({
        data: {
          closePaymentCard: {
            __typename: "PaymentCard",
            id: "pc_123",
            bin: "411111",
            last4: "1234",
            network: "VISA",
            status: "CLOSED",
            formFactor: "PHYSICAL",
            expirationDate: "2028-12-31T00:00:00Z",
            externalId: "ext_456",
          },
        },
      });

      const card = await client.cards.close({
        paymentCardId: "pc_123",
      });
      expect(card.id).toBe("pc_123");
      expect(card.bin).toBe("411111");
      expect(card.last4).toBe("1234");
      expect(card.network).toBe("VISA");
      expect(card.status).toBe("CLOSED");
      expect(card.formFactor).toBe("PHYSICAL");
      expect(card.expirationDate).toBe("2028-12-31T00:00:00Z");
      expect(card.externalId).toBe("ext_456");
    });
  });

  describe("get()", () => {
    it("returns a payment card by ID", async () => {
      mockRawRequest.mockResolvedValueOnce({
        data: {
          node: {
            __typename: "PaymentCard",
            id: "pc_123",
            bin: "411111",
            last4: "1234",
            network: "VISA",
            status: "ACTIVE",
            formFactor: "VIRTUAL",
          },
        },
      });

      const card = await client.cards.get("pc_123");
      expect(card.id).toBe("pc_123");
    });

    it("throws when node is not a PaymentCard", async () => {
      mockRawRequest.mockResolvedValueOnce({
        data: { node: { __typename: "FinancialAccount", id: "fa_1" } },
      });

      await expect(client.cards.get("fa_1")).rejects.toThrow("Payment card not found");
    });
  });

  describe("reissue()", () => {
    it("returns a new payment card on reissue success", async () => {
      mockRawRequest.mockResolvedValueOnce({
        data: {
          reissuePaymentCard: {
            __typename: "PaymentCard",
            id: "pc_new",
            bin: "411111",
            last4: "5678",
            network: "VISA",
            status: "ACTIVE",
            formFactor: "VIRTUAL",
            expirationDate: "2029-12-31T00:00:00Z",
            expirationMonth: "12",
            expirationYear: "2029",
            externalId: null,
          },
        },
      });

      const card = await client.cards.reissue({
        originalPaymentCardId: "pc_old",
        options: {
          activateOnCreate: true,
          expirationDate: "2029-12-31T00:00:00Z",
        },
      });

      expect(card.id).toBe("pc_new");
      expect(card.status).toBe("ACTIVE");
    });

    it("throws HighnoteUserError on reissue failure", async () => {
      mockRawRequest.mockResolvedValueOnce({
        data: {
          reissuePaymentCard: {
            __typename: "UserError",
            errors: [{ code: "CLOSED", description: "Cannot reissue a closed card" }],
          },
        },
      });

      await expect(
        client.cards.reissue({
          originalPaymentCardId: "pc_closed",
          options: { activateOnCreate: true, expirationDate: "2029-12-31T00:00:00Z" },
        }),
      ).rejects.toThrow(HighnoteUserError);
    });
  });

  describe("orderPhysical()", () => {
    it("returns a physical card order on success", async () => {
      mockRawRequest.mockResolvedValueOnce({
        data: {
          orderPhysicalPaymentCard: {
            __typename: "PhysicalPaymentCardOrder",
            id: "pco_123",
            createdAt: "2026-01-01T00:00:00Z",
            updatedAt: "2026-01-01T00:00:00Z",
            orderState: { status: "NEW" },
            cardPersonalization: { textLines: { line1: "JANE DOE", line2: null } },
            paymentCardShipment: {
              requestedShipDate: null,
              deliveryDetails: {
                name: { givenName: "Jane", familyName: "Doe" },
                address: {
                  streetAddress: "123 Main St",
                  locality: "San Francisco",
                  region: "CA",
                  postalCode: "94105",
                  countryCodeAlpha3: "USA",
                },
              },
            },
          },
        },
      });

      const order = await client.cards.orderPhysical({
        paymentCardId: "pc_123",
        cardPersonalization: { textLines: { line1: "JANE DOE" } },
        deliveryDetails: {
          name: { givenName: "Jane", familyName: "Doe" },
          address: {
            streetAddress: "123 Main St",
            locality: "San Francisco",
            region: "CA",
            postalCode: "94105",
            countryCodeAlpha3: "USA",
          },
        },
      });

      expect(order.id).toBe("pco_123");
      expect(order.orderState?.status).toBe("NEW");
    });

    it("throws HighnoteUserError on error", async () => {
      mockRawRequest.mockResolvedValueOnce({
        data: {
          orderPhysicalPaymentCard: {
            __typename: "UserError",
            errors: [{ code: "INVALID", description: "Card not eligible" }],
          },
        },
      });

      await expect(
        client.cards.orderPhysical({
          paymentCardId: "pc_bad",
          cardPersonalization: { textLines: { line1: "TEST" } },
          deliveryDetails: {
            name: { givenName: "Test", familyName: "User" },
            address: {
              streetAddress: "1 Test St",
              locality: "Test",
              region: "CA",
              postalCode: "00000",
              countryCodeAlpha3: "USA",
            },
          },
        }),
      ).rejects.toThrow(HighnoteUserError);
    });
  });

  describe("cancelPhysicalOrder()", () => {
    it("returns the canceled order on success", async () => {
      mockRawRequest.mockResolvedValueOnce({
        data: {
          cancelPhysicalPaymentCardOrder: {
            __typename: "PhysicalPaymentCardOrder",
            id: "pco_123",
            createdAt: "2026-01-01T00:00:00Z",
            updatedAt: "2026-01-02T00:00:00Z",
            orderState: { status: "CANCELED" },
          },
        },
      });

      const canceled = await client.cards.cancelPhysicalOrder({
        physicalPaymentCardOrderId: "pco_123",
      });

      expect(canceled.id).toBe("pco_123");
      expect(canceled.orderState?.status).toBe("CANCELED");
    });
  });

  describe("orderPhysicalWithValidatedAddress()", () => {
    it("returns a physical card order on success", async () => {
      mockRawRequest.mockResolvedValueOnce({
        data: {
          orderPhysicalPaymentCardWithValidatedAddressToken: {
            __typename: "PhysicalPaymentCardOrder",
            id: "ppco_validated_123",
            orderState: { status: "NEW" },
            createdAt: "2026-03-20T00:00:00Z",
            updatedAt: "2026-03-20T00:00:00Z",
          },
        },
      });

      const order = await client.cards.orderPhysicalWithValidatedAddress({
        paymentCardId: "pc_123",
        cardPersonalization: { textLines: { line1: "JANE DOE" } },
        deliveryDetails: {
          validatedAddressId: "vat_123",
          name: { givenName: "Jane", familyName: "Doe" },
        },
        idempotencyKey: "test-idem-key",
      });

      expect(order.id).toBe("ppco_validated_123");
      expect(order.orderState?.status).toBe("NEW");
    });

    it("throws HighnoteUserError on UserError", async () => {
      mockRawRequest.mockResolvedValueOnce({
        data: {
          orderPhysicalPaymentCardWithValidatedAddressToken: {
            __typename: "UserError",
            errors: [{ code: "INVALID", description: "Card not eligible" }],
          },
        },
      });

      await expect(
        client.cards.orderPhysicalWithValidatedAddress({
          paymentCardId: "pc_bad",
          cardPersonalization: { textLines: { line1: "TEST" } },
          deliveryDetails: {
            validatedAddressId: "vat_bad",
            name: { givenName: "Test", familyName: "User" },
          },
          idempotencyKey: "test-idem-key-err",
        }),
      ).rejects.toThrow(HighnoteUserError);
    });
  });

  describe("findATMLocations()", () => {
    const validInput = {
      paymentCardId: "cd_123",
      latitude: "37.7749",
      longitude: "-122.4194",
      radiusMiles: 10,
    };

    it("returns array of ATM locations on success", async () => {
      mockRawRequest.mockResolvedValueOnce({
        data: {
          node: {
            __typename: "PaymentCard",
            id: "cd_123",
            atmLocations: {
              __typename: "ATMLocations",
              atmLocations: [
                {
                  name: "TEST ATM",
                  address: {
                    streetAddress: "123 Main St",
                    locality: "SF",
                    region: "CA",
                    postalCode: "94105",
                    countryCodeAlpha3: "USA",
                  },
                  coordinates: { latitude: "37.7749", longitude: "-122.4194" },
                  distance: { length: 0.5, unit: "MILE" },
                  features: ["OPEN_24_HOURS"],
                  logo: { brand: "MONEY_PASS" },
                },
              ],
            },
          },
        },
      });

      const result = await client.cards.findATMLocations(validInput);
      expect(result).toHaveLength(1);
      expect(result[0].name).toBe("TEST ATM");
      expect(result[0].address.streetAddress).toBe("123 Main St");
      expect(result[0].coordinates.latitude).toBe("37.7749");
      expect(result[0].distance.length).toBe(0.5);
    });

    it("throws HighnoteUnexpectedResponseError when node is not PaymentCard", async () => {
      mockRawRequest.mockResolvedValueOnce({
        data: {
          node: {
            __typename: "FinancialAccount",
            id: "fa_123",
          },
        },
      });

      await expect(
        client.cards.findATMLocations(validInput),
      ).rejects.toThrow(HighnoteUnexpectedResponseError);
    });

    it("throws HighnoteUserError when atmLocations returns UserError", async () => {
      mockRawRequest.mockResolvedValueOnce({
        data: {
          node: {
            __typename: "PaymentCard",
            id: "cd_123",
            atmLocations: {
              __typename: "UserError",
              errors: [{ code: "INVALID", description: "Invalid card" }],
            },
          },
        },
      });

      await expect(
        client.cards.findATMLocations(validInput),
      ).rejects.toThrow(HighnoteUserError);
    });

    it("throws HighnoteAccessDeniedError when atmLocations returns AccessDeniedError", async () => {
      mockRawRequest.mockResolvedValueOnce({
        data: {
          node: {
            __typename: "PaymentCard",
            id: "cd_123",
            atmLocations: {
              __typename: "AccessDeniedError",
              message: "Not authorized",
            },
          },
        },
      });

      await expect(
        client.cards.findATMLocations(validInput),
      ).rejects.toThrow(HighnoteAccessDeniedError);
    });

    it("returns empty array when no ATMs found", async () => {
      mockRawRequest.mockResolvedValueOnce({
        data: {
          node: {
            __typename: "PaymentCard",
            id: "cd_123",
            atmLocations: {
              __typename: "ATMLocations",
              atmLocations: [],
            },
          },
        },
      });

      const result = await client.cards.findATMLocations(validInput);
      expect(result).toEqual([]);
    });
  });

  describe("issueForApplicationWithOnDemandFunding()", () => {
    it("returns a PaymentCard with its newly created FinancialAccount", async () => {
      mockRawRequest.mockResolvedValueOnce({
        data: {
          issuePaymentCardForApplicationWithOnDemandFundingSource: {
            __typename: "PaymentCard",
            id: "pc_1",
            bin: "411111",
            last4: "1234",
            network: "VISA",
            status: "ACTIVE",
            formFactor: "VIRTUAL",
            expirationDate: "2028-12-31T00:00:00Z",
            expirationMonth: "12",
            expirationYear: "2028",
            externalId: null,
            financialAccounts: [
              {
                __typename: "FinancialAccount",
                id: "fa_1",
                name: "Invoice INV-1",
              },
            ],
          },
        },
      });

      const card = await client.cards.issueForApplicationWithOnDemandFunding({
        applicationId: "app_1",
        sourceFinancialAccountId: "fa_funding",
        options: { activateOnCreate: true, expirationDate: "2028-12-31T00:00:00Z" },
      });

      expect(card.id).toBe("pc_1");
      expect(card.__typename).toBe("PaymentCard");
      expect(card.financialAccounts?.[0]?.id).toBe("fa_1");
    });

    it("throws HighnoteUserError on validation failure", async () => {
      mockRawRequest.mockResolvedValueOnce({
        data: {
          issuePaymentCardForApplicationWithOnDemandFundingSource: {
            __typename: "UserError",
            errors: [{ code: "INVALID" }],
          },
        },
      });

      await expect(
        client.cards.issueForApplicationWithOnDemandFunding({
          applicationId: "app_1",
          sourceFinancialAccountId: "fa_funding",
          options: { activateOnCreate: true, expirationDate: "2028-12-31T00:00:00Z" },
        }),
      ).rejects.toThrow(HighnoteUserError);
    });

    it("throws HighnoteUnexpectedResponseError on unknown __typename", async () => {
      mockRawRequest.mockResolvedValueOnce({
        data: { issuePaymentCardForApplicationWithOnDemandFundingSource: { __typename: "Other" } },
      });

      await expect(
        client.cards.issueForApplicationWithOnDemandFunding({
          applicationId: "app_1",
          sourceFinancialAccountId: "fa_funding",
          options: { activateOnCreate: true, expirationDate: "2028-12-31T00:00:00Z" },
        }),
      ).rejects.toThrow(/Unexpected response/);
    });
  });
});
