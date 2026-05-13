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

describe("TestApplicationsResource", () => {
  let client: Highnote;

  beforeEach(() => {
    vi.clearAllMocks();
    client = new Highnote({ apiKey: "sk_test_fake", environment: "test" });
  });

  describe("changeStatus()", () => {
    it("returns AccountHolderCardProductApplication on success", async () => {
      mockRawRequest.mockResolvedValueOnce({
        data: {
          simulateApplicationStatusChange: {
            __typename: "AccountHolderCardProductApplication",
            id: "app_123",
            applicationState: { status: "APPROVED" },
            createdAt: "2026-03-20T00:00:00Z",
          },
        },
      });
      const result = await client.test.applications.changeStatus({
        applicationId: "app_123",
        newApplicationStatus: "APPROVED",
      });
      expect(result.id).toBe("app_123");
      expect(result.__typename).toBe("AccountHolderCardProductApplication");
    });

    it("throws HighnoteSimulationError in live environment", async () => {
      const liveClient = new Highnote({ apiKey: "sk_live_fake", environment: "live" });
      await expect(
        liveClient.test.applications.changeStatus({
          applicationId: "app_123",
          newApplicationStatus: "APPROVED",
        }),
      ).rejects.toThrow(HighnoteSimulationError);
    });

    it("throws HighnoteUserError on UserError", async () => {
      mockRawRequest.mockResolvedValueOnce({
        data: {
          simulateApplicationStatusChange: {
            __typename: "UserError",
            errors: [{ code: "INVALID", description: "Bad input" }],
          },
        },
      });
      await expect(
        client.test.applications.changeStatus({
          applicationId: "app_123",
          newApplicationStatus: "APPROVED",
        }),
      ).rejects.toThrow(HighnoteUserError);
    });
  });

  describe("changeVerificationStatus()", () => {
    it("returns AccountHolderCardProductApplication on success", async () => {
      mockRawRequest.mockResolvedValueOnce({
        data: {
          simulateApplicationVerificationStatusChange: {
            __typename: "AccountHolderCardProductApplication",
            id: "app_456",
            applicationState: { status: "PENDING" },
            createdAt: "2026-03-20T00:00:00Z",
          },
        },
      });
      const result = await client.test.applications.changeVerificationStatus({
        applicationId: "app_456",
        applicantId: "ah_456",
        newVerificationStatus: "VERIFIED",
      });
      expect(result.id).toBe("app_456");
      expect(result.__typename).toBe("AccountHolderCardProductApplication");
    });
  });

  describe("reviewDocument()", () => {
    it("returns AccountHolderApplicationDocument on success", async () => {
      mockRawRequest.mockResolvedValueOnce({
        data: {
          simulateApplicationDocumentReview: {
            __typename: "AccountHolderApplicationDocument",
            id: "doc_123",
            status: "APPROVED",
            createdAt: "2026-03-20T00:00:00Z",
          },
        },
      });
      const result = await client.test.applications.reviewDocument({
        documentId: "doc_123",
        reviewStatus: "APPROVED",
      });
      expect(result.id).toBe("doc_123");
      expect(result.__typename).toBe("AccountHolderApplicationDocument");
    });
  });

  describe("createDocumentUploadSessions()", () => {
    it("returns AccountHolderCardProductApplication on success", async () => {
      mockRawRequest.mockResolvedValueOnce({
        data: {
          simulateCreateApplicationDocumentsUploadSessions: {
            __typename: "AccountHolderCardProductApplication",
            id: "app_789",
            applicationState: { status: "PENDING" },
            createdAt: "2026-03-20T00:00:00Z",
          },
        },
      });
      const result = await client.test.applications.createDocumentUploadSessions({
        applicationId: "app_789",
      });
      expect(result.id).toBe("app_789");
      expect(result.__typename).toBe("AccountHolderCardProductApplication");
    });
  });
});
