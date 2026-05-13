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

describe("DocumentsResource", () => {
  let client: Highnote;

  beforeEach(() => {
    vi.clearAllMocks();
    client = new Highnote({ apiKey: "sk_test_fake" });
  });

  describe("startSession()", () => {
    it("returns a session on success", async () => {
      mockRawRequest.mockResolvedValueOnce({
        data: {
          startDocumentUploadSession: {
            __typename: "IdentityVerificationDocumentUploadSession",
            id: "dus_123",
            status: "INITIATED",
            createdAt: "2026-01-01T00:00:00Z",
            updatedAt: "2026-01-01T00:00:00Z",
          },
        },
      });

      const session = await client.documents.startSession({
        documentUploadSessionId: "dus_123",
      });

      expect(session.id).toBe("dus_123");
      expect(session.status).toBe("INITIATED");
    });

    it("throws HighnoteUserError on error", async () => {
      mockRawRequest.mockResolvedValueOnce({
        data: {
          startDocumentUploadSession: {
            __typename: "UserError",
            errors: [{ code: "NOT_FOUND", description: "Session not found" }],
          },
        },
      });

      await expect(
        client.documents.startSession({ documentUploadSessionId: "bad" }),
      ).rejects.toThrow(HighnoteUserError);
    });
  });

  describe("createUploadLink()", () => {
    it("returns an upload link on success", async () => {
      mockRawRequest.mockResolvedValueOnce({
        data: {
          createDocumentUploadLink: {
            __typename: "DocumentUploadLink",
            id: "dul_123",
            documentType: "DRIVERS_LICENSE",
            status: "CREATED",
            createdAt: "2026-01-01T00:00:00Z",
            updatedAt: "2026-01-01T00:00:00Z",
          },
        },
      });

      const link = await client.documents.createUploadLink({
        documentUploadSessionId: "dus_123",
        documentType: "DRIVERS_LICENSE" as any,
      });

      expect(link.id).toBe("dul_123");
    });
  });

  describe("endSession()", () => {
    it("returns the ended session", async () => {
      mockRawRequest.mockResolvedValueOnce({
        data: {
          endDocumentUploadSession: {
            __typename: "IdentityVerificationDocumentUploadSession",
            id: "dus_123",
            status: "SUBMITTED",
          },
        },
      });

      const session = await client.documents.endSession({
        documentUploadSessionId: "dus_123",
      });

      expect(session.status).toBe("SUBMITTED");
    });
  });
});
