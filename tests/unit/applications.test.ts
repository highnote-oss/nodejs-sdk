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

describe("ApplicationsResource", () => {
  let client: Highnote;

  beforeEach(() => {
    vi.clearAllMocks();
    client = new Highnote({ apiKey: "sk_test_fake" });
  });

  describe("create()", () => {
    it("returns an application on success", async () => {
      mockRawRequest.mockResolvedValueOnce({
        data: {
          createAccountHolderCardProductApplication: {
            __typename: "AccountHolderCardProductApplication",
            id: "app_123",
            createdAt: "2026-01-01T00:00:00Z",
            updatedAt: "2026-01-01T00:00:00Z",
            applicationState: { status: "PENDING" },
          },
        },
      });

      const app = await client.applications.create({
        accountHolderId: "ah_1",
        cardProductId: "cp_1",
        cardHolderAgreementConsent: {
          consentTimestamp: "2026-01-01T00:00:00Z",
          primaryAuthorizedPersonId: "ah_1",
        },
      });

      expect(app.id).toBe("app_123");
      expect(app.applicationState?.status).toBe("PENDING");
    });

    it("throws HighnoteUserError on validation failure", async () => {
      mockRawRequest.mockResolvedValueOnce({
        data: {
          createAccountHolderCardProductApplication: {
            __typename: "UserError",
            errors: [{ code: "INVALID", description: "Bad card product" }],
          },
        },
      });

      await expect(
        client.applications.create({
          accountHolderId: "ah_1",
          cardProductId: "bad",
          cardHolderAgreementConsent: {
            consentTimestamp: "2026-01-01T00:00:00Z",
            primaryAuthorizedPersonId: "ah_1",
          },
        }),
      ).rejects.toThrow(HighnoteUserError);
    });
  });

  describe("get()", () => {
    it("returns an application by ID", async () => {
      mockRawRequest.mockResolvedValueOnce({
        data: {
          node: {
            __typename: "AccountHolderCardProductApplication",
            id: "app_123",
            createdAt: "2026-01-01T00:00:00Z",
            updatedAt: "2026-01-01T00:00:00Z",
            decisionedAt: null,
            applicationState: { status: "APPROVED" },
          },
        },
      });

      const app = await client.applications.get("app_123");
      expect(app.id).toBe("app_123");
      expect(app.applicationState?.status).toBe("APPROVED");
    });

    it("throws when not found", async () => {
      mockRawRequest.mockResolvedValueOnce({
        data: { node: null },
      });

      await expect(client.applications.get("bad")).rejects.toThrow("Application not found");
    });
  });
});
