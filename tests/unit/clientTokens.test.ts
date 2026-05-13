import { describe, it, expect, vi, beforeEach } from "vitest";
import { Highnote } from "../../src/client.js";
import { HighnoteUserError, HighnoteAccessDeniedError } from "../../src/errors.js";
import { DocumentUploadClientTokenPermission } from "../../src/generated/graphql.js";

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

describe("ClientTokensResource", () => {
  let client: Highnote;

  beforeEach(() => {
    vi.clearAllMocks();
    client = new Highnote({ apiKey: "sk_test_fake" });
  });

  describe("createForPaymentCard()", () => {
    it("returns a client token on success", async () => {
      mockRawRequest.mockResolvedValueOnce({
        data: {
          generatePaymentCardClientToken: {
            __typename: "ClientToken",
            value: "tok_abc123",
            expirationDate: "2026-01-01T00:00:00Z",
          },
        },
      });

      const token = await client.clientTokens.createForPaymentCard({
        paymentCardId: "pc_123",
        permissions: [],
      });

      expect(token.value).toBe("tok_abc123");
      expect(token.expirationDate).toBe("2026-01-01T00:00:00Z");
    });

    it("throws HighnoteUserError on UserError", async () => {
      mockRawRequest.mockResolvedValueOnce({
        data: {
          generatePaymentCardClientToken: {
            __typename: "UserError",
            errors: [{ code: "INVALID_ID", description: "Card not found" }],
          },
        },
      });

      await expect(
        client.clientTokens.createForPaymentCard({ paymentCardId: "bad", permissions: [] }),
      ).rejects.toThrow(HighnoteUserError);
    });

    it("throws HighnoteAccessDeniedError on AccessDeniedError", async () => {
      mockRawRequest.mockResolvedValueOnce({
        data: {
          generatePaymentCardClientToken: {
            __typename: "AccessDeniedError",
            message: "Forbidden",
          },
        },
      });

      await expect(
        client.clientTokens.createForPaymentCard({ paymentCardId: "pc_1", permissions: [] }),
      ).rejects.toThrow(HighnoteAccessDeniedError);
    });
  });

  describe("createForTokenization()", () => {
    it("returns a client token on success", async () => {
      mockRawRequest.mockResolvedValueOnce({
        data: {
          generatePaymentMethodTokenizationClientToken: {
            __typename: "ClientToken",
            value: "tok_xyz",
            expirationDate: "2026-06-01T00:00:00Z",
          },
        },
      });

      const token = await client.clientTokens.createForTokenization({
        permissions: [],
      });

      expect(token.value).toBe("tok_xyz");
    });
  });

  describe("createForDocumentUpload()", () => {
    it("returns a client token on success", async () => {
      mockRawRequest.mockResolvedValueOnce({
        data: {
          generateDocumentUploadClientToken: {
            __typename: "ClientToken",
            value: "tok_doc_abc",
            expirationDate: "2026-12-01T00:00:00Z",
          },
        },
      });

      const token = await client.clientTokens.createForDocumentUpload({
        documentUploadSessionId: "dus_123",
        permissions: [DocumentUploadClientTokenPermission.MANAGE_DOCUMENT_UPLOAD_SESSION],
      });

      expect(token.value).toBe("tok_doc_abc");
      expect(token.expirationDate).toBe("2026-12-01T00:00:00Z");
    });

    it("throws HighnoteUserError on UserError", async () => {
      mockRawRequest.mockResolvedValueOnce({
        data: {
          generateDocumentUploadClientToken: {
            __typename: "UserError",
            errors: [{ code: "INVALID_SESSION", description: "Session not found" }],
          },
        },
      });

      await expect(
        client.clientTokens.createForDocumentUpload({
          documentUploadSessionId: "bad",
          permissions: [DocumentUploadClientTokenPermission.MANAGE_DOCUMENT_UPLOAD_SESSION],
        }),
      ).rejects.toThrow(HighnoteUserError);
    });
  });

  describe("null field checks", () => {
    it("throws when ClientToken value is null", async () => {
      mockRawRequest.mockResolvedValueOnce({
        data: {
          generatePaymentCardClientToken: {
            __typename: "ClientToken",
            value: null,
            expirationDate: "2025-01-01",
          },
        },
      });

      await expect(
        client.clientTokens.createForPaymentCard({ paymentCardId: "pc_1", permissions: [] }),
      ).rejects.toThrow("missing value or expirationDate");
    });

    it("throws when ClientToken expirationDate is null", async () => {
      mockRawRequest.mockResolvedValueOnce({
        data: {
          generatePaymentCardClientToken: {
            __typename: "ClientToken",
            value: "token",
            expirationDate: null,
          },
        },
      });

      await expect(
        client.clientTokens.createForPaymentCard({ paymentCardId: "pc_1", permissions: [] }),
      ).rejects.toThrow("missing value or expirationDate");
    });
  });
});
