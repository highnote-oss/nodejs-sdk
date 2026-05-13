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

describe("AddressesResource", () => {
  let client: Highnote;

  beforeEach(() => {
    vi.clearAllMocks();
    client = new Highnote({ apiKey: "sk_test_fake" });
  });

  describe("validate()", () => {
    it("returns AddressValidationResult with AddressValidatedResult outcome", async () => {
      mockRawRequest.mockResolvedValueOnce({
        data: {
          validateAddress: {
            __typename: "AddressValidationResult",
            outcome: {
              __typename: "AddressValidatedResult",
              token: {
                id: "vat_123",
                provided: { streetAddress: "24 Willie Mays Plz", locality: "San Francisco", region: "CA", postalCode: "94107", countryCodeAlpha3: "USA" },
                standardized: { streetAddress: "24 Willie Mays Plz", locality: "San Francisco", region: "CA", postalCode: "94107-2134", countryCodeAlpha3: "USA" },
                deliveryStatus: "CONFIRMED",
                deliveryStatusMessage: null,
                expiresAt: "2026-03-21T00:00:00Z",
              },
            },
          },
        },
      });

      const result = await client.addresses.validate({
        address: { streetAddress: "24 Willie Mays Plz", locality: "San Francisco", region: "CA", postalCode: "94107", countryCodeAlpha3: "USA" },
        idempotencyKey: "test-key-123",
      });

      expect(result.__typename).toBe("AddressValidationResult");
      expect(result.outcome?.__typename).toBe("AddressValidatedResult");
    });

    it("returns AddressValidationResult with AddressValidatedWithChangesResult outcome", async () => {
      mockRawRequest.mockResolvedValueOnce({
        data: {
          validateAddress: {
            __typename: "AddressValidationResult",
            outcome: {
              __typename: "AddressValidatedWithChangesResult",
              componentsChanged: ["POSTAL_CODE"],
              token: {
                id: "vat_456",
                provided: { streetAddress: "24 Willie Mays Plz", locality: "San Francisco", region: "CA", postalCode: "94107", countryCodeAlpha3: "USA" },
                standardized: { streetAddress: "24 Willie Mays Plz", locality: "San Francisco", region: "CA", postalCode: "94107-2134", countryCodeAlpha3: "USA" },
                deliveryStatus: "CONFIRMED",
                deliveryStatusMessage: null,
                expiresAt: "2026-03-21T00:00:00Z",
              },
            },
          },
        },
      });

      const result = await client.addresses.validate({
        address: { streetAddress: "24 Willie Mays Plz changed", locality: "San Francisco", region: "CA", postalCode: "94107", countryCodeAlpha3: "USA" },
        idempotencyKey: "test-key-456",
      });

      expect(result.outcome?.__typename).toBe("AddressValidatedWithChangesResult");
    });

    it("returns AddressValidationResult with AddressIncompleteResult outcome", async () => {
      mockRawRequest.mockResolvedValueOnce({
        data: {
          validateAddress: {
            __typename: "AddressValidationResult",
            outcome: {
              __typename: "AddressIncompleteResult",
            },
          },
        },
      });

      const result = await client.addresses.validate({
        address: { streetAddress: "incomplete", locality: "San Francisco", region: "CA", postalCode: "94107", countryCodeAlpha3: "USA" },
        idempotencyKey: "test-key-789",
      });

      expect(result.outcome?.__typename).toBe("AddressIncompleteResult");
    });

    it("throws HighnoteUserError on UserError", async () => {
      mockRawRequest.mockResolvedValueOnce({
        data: {
          validateAddress: {
            __typename: "UserError",
            errors: [{ code: "INVALID", description: "Bad input" }],
          },
        },
      });

      await expect(
        client.addresses.validate({
          address: { streetAddress: "x", locality: "x", region: "x", postalCode: "x", countryCodeAlpha3: "USA" },
          idempotencyKey: "test-key-err",
        }),
      ).rejects.toThrow(HighnoteUserError);
    });

    it("throws HighnoteAccessDeniedError on AccessDeniedError", async () => {
      mockRawRequest.mockResolvedValueOnce({
        data: {
          validateAddress: {
            __typename: "AccessDeniedError",
            message: "Not authorized",
          },
        },
      });

      await expect(
        client.addresses.validate({
          address: { streetAddress: "x", locality: "x", region: "x", postalCode: "x", countryCodeAlpha3: "USA" },
          idempotencyKey: "test-key-denied",
        }),
      ).rejects.toThrow(HighnoteAccessDeniedError);
    });
  });
});
