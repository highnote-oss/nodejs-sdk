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

describe("AchResource", () => {
  let client: Highnote;

  beforeEach(() => {
    vi.clearAllMocks();
    client = new Highnote({ apiKey: "sk_test_fake", environment: "test" });
  });

  describe("initiateTransfer()", () => {
    const validInput = {
      fromFinancialAccountId: "eba_123",
      toFinancialAccountId: "fa_456",
      amount: { value: 5000, currencyCode: "USD" as any },
      purpose: "DEPOSIT" as any,
      companyEntryDescription: "PAYMENT",
      individualName: "JANE DOE",
      idempotencyKey: "test-key-123",
      transferAgreementConsent: {
        authorizedPersonId: "ah_123",
        consentTimestamp: "2026-03-24T00:00:00Z",
        template: {
          consentTemplateId: "template_1",
          consentTemplateVersion: "1.0",
        },
      },
    };

    it("returns OriginatedAchTransfer on success", async () => {
      mockRawRequest.mockResolvedValueOnce({
        data: {
          initiateAchTransfer: {
            __typename: "OriginatedAchTransfer",
            id: "ach_transfer_123",
            amount: { value: 5000, currencyCode: "USD" },
            companyEntryDescription: "PAYMENT",
            createdAt: "2026-03-24T00:00:00Z",
            purpose: "DEPOSIT",
            status: "PENDING",
          },
        },
      });

      const result = await client.ach.initiateTransfer(validInput);
      expect(result.id).toBe("ach_transfer_123");
      expect(result.__typename).toBe("OriginatedAchTransfer");
      expect(result.amount).toEqual({ value: 5000, currencyCode: "USD" });
      expect(result.status).toBe("PENDING");
    });

    it("throws HighnoteUserError on UserError", async () => {
      mockRawRequest.mockResolvedValueOnce({
        data: {
          initiateAchTransfer: {
            __typename: "UserError",
            errors: [{ code: "INVALID", description: "Invalid account" }],
          },
        },
      });

      await expect(
        client.ach.initiateTransfer(validInput),
      ).rejects.toThrow(HighnoteUserError);
    });

    it("throws HighnoteAccessDeniedError on AccessDeniedError", async () => {
      mockRawRequest.mockResolvedValueOnce({
        data: {
          initiateAchTransfer: {
            __typename: "AccessDeniedError",
            message: "Not authorized",
          },
        },
      });

      await expect(
        client.ach.initiateTransfer(validInput),
      ).rejects.toThrow(HighnoteAccessDeniedError);
    });

    it("throws HighnoteUnexpectedResponseError for unknown __typename", async () => {
      mockRawRequest.mockResolvedValueOnce({
        data: {
          initiateAchTransfer: {
            __typename: "SomeUnknownType",
            id: "x",
          },
        },
      });

      await expect(
        client.ach.initiateTransfer(validInput),
      ).rejects.toThrow(HighnoteUnexpectedResponseError);
    });
  });

  describe("createOneTimeTransfer()", () => {
    const validInput = {
      externalBankAccountId: "eba_123",
      financialAccountId: "fa_456",
      amount: { value: 10000, currencyCode: "USD" as any },
      purpose: "DEPOSIT" as any,
      scheduledDate: "2026-04-01",
      idempotencyKey: "one-time-key-123",
      transferAgreementConsent: {
        authorizedPersonId: "ah_123",
        consentTimestamp: "2026-03-24T00:00:00Z",
        template: {
          consentTemplateId: "template_1",
          consentTemplateVersion: "1.0",
        },
      },
    };

    it("returns OneTimeACHTransfer on success", async () => {
      mockRawRequest.mockResolvedValueOnce({
        data: {
          createOneTimeACHTransfer: {
            __typename: "OneTimeACHTransfer",
            id: "one_time_transfer_123",
            amount: { value: 10000, currencyCode: "USD" },
            scheduledDate: "2026-04-01",
            status: "SCHEDULED",
          },
        },
      });

      const result = await client.ach.createOneTimeTransfer(validInput);
      expect(result.id).toBe("one_time_transfer_123");
      expect(result.__typename).toBe("OneTimeACHTransfer");
      expect(result.amount).toEqual({ value: 10000, currencyCode: "USD" });
      expect(result.status).toBe("SCHEDULED");
    });

    it("throws HighnoteUserError on UserError", async () => {
      mockRawRequest.mockResolvedValueOnce({
        data: {
          createOneTimeACHTransfer: {
            __typename: "UserError",
            errors: [{ code: "INVALID", description: "Invalid account" }],
          },
        },
      });

      await expect(
        client.ach.createOneTimeTransfer(validInput),
      ).rejects.toThrow(HighnoteUserError);
    });

    it("throws HighnoteAccessDeniedError on AccessDeniedError", async () => {
      mockRawRequest.mockResolvedValueOnce({
        data: {
          createOneTimeACHTransfer: {
            __typename: "AccessDeniedError",
            message: "Not authorized",
          },
        },
      });

      await expect(
        client.ach.createOneTimeTransfer(validInput),
      ).rejects.toThrow(HighnoteAccessDeniedError);
    });
  });

  describe("createRecurringTransfer()", () => {
    const validInput = {
      externalBankAccountId: "eba_123",
      financialAccountId: "fa_456",
      amount: { value: 25000, currencyCode: "USD" as any },
      purpose: "DEPOSIT" as any,
      schedule: { frequency: "WEEKLY" as any, startDate: "2026-04-01" },
      idempotencyKey: "recurring-key-123",
      transferAgreementConsent: {
        authorizedPersonId: "ah_123",
        consentTimestamp: "2026-03-24T00:00:00Z",
        template: {
          consentTemplateId: "template_1",
          consentTemplateVersion: "1.0",
        },
      },
    };

    it("returns RecurringACHTransfer on success", async () => {
      mockRawRequest.mockResolvedValueOnce({
        data: {
          createRecurringACHTransfer: {
            __typename: "RecurringACHTransfer",
            id: "recurring_transfer_123",
            amount: { value: 25000, currencyCode: "USD" },
            status: "ACTIVE",
          },
        },
      });

      const result = await client.ach.createRecurringTransfer(validInput);
      expect(result.id).toBe("recurring_transfer_123");
      expect(result.__typename).toBe("RecurringACHTransfer");
      expect(result.amount).toEqual({ value: 25000, currencyCode: "USD" });
      expect(result.status).toBe("ACTIVE");
    });

    it("throws HighnoteUserError on UserError", async () => {
      mockRawRequest.mockResolvedValueOnce({
        data: {
          createRecurringACHTransfer: {
            __typename: "UserError",
            errors: [{ code: "INVALID", description: "Invalid schedule" }],
          },
        },
      });

      await expect(
        client.ach.createRecurringTransfer(validInput),
      ).rejects.toThrow(HighnoteUserError);
    });

    it("throws HighnoteAccessDeniedError on AccessDeniedError", async () => {
      mockRawRequest.mockResolvedValueOnce({
        data: {
          createRecurringACHTransfer: {
            __typename: "AccessDeniedError",
            message: "Not authorized",
          },
        },
      });

      await expect(
        client.ach.createRecurringTransfer(validInput),
      ).rejects.toThrow(HighnoteAccessDeniedError);
    });
  });

  describe("cancelTransfer()", () => {
    const validInput = {
      scheduledTransferId: "transfer_123",
    };

    it("returns OneTimeACHTransfer on success", async () => {
      mockRawRequest.mockResolvedValueOnce({
        data: {
          cancelScheduledTransfer: {
            __typename: "OneTimeACHTransfer",
            id: "one_time_transfer_123",
            amount: { value: 10000, currencyCode: "USD" },
            status: "CANCELLED",
          },
        },
      });

      const result = await client.ach.cancelTransfer(validInput);
      expect(result.id).toBe("one_time_transfer_123");
      expect(result.__typename).toBe("OneTimeACHTransfer");
      expect(result.status).toBe("CANCELLED");
    });

    it("returns RecurringACHTransfer on success", async () => {
      mockRawRequest.mockResolvedValueOnce({
        data: {
          cancelScheduledTransfer: {
            __typename: "RecurringACHTransfer",
            id: "recurring_transfer_456",
            amount: { value: 25000, currencyCode: "USD" },
            status: "CANCELLED",
          },
        },
      });

      const result = await client.ach.cancelTransfer(validInput);
      expect(result.id).toBe("recurring_transfer_456");
      expect(result.__typename).toBe("RecurringACHTransfer");
      expect(result.status).toBe("CANCELLED");
    });

    it("throws HighnoteUserError on UserError", async () => {
      mockRawRequest.mockResolvedValueOnce({
        data: {
          cancelScheduledTransfer: {
            __typename: "UserError",
            errors: [{ code: "INVALID", description: "Cannot cancel" }],
          },
        },
      });

      await expect(
        client.ach.cancelTransfer(validInput),
      ).rejects.toThrow(HighnoteUserError);
    });

    it("throws HighnoteAccessDeniedError on AccessDeniedError", async () => {
      mockRawRequest.mockResolvedValueOnce({
        data: {
          cancelScheduledTransfer: {
            __typename: "AccessDeniedError",
            message: "Not authorized",
          },
        },
      });

      await expect(
        client.ach.cancelTransfer(validInput),
      ).rejects.toThrow(HighnoteAccessDeniedError);
    });
  });
});
