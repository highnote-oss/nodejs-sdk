import { describe, it, expect, vi, beforeEach } from "vitest";
import { Highnote } from "../../src/client.js";
import {
  HighnoteUnexpectedResponseError,
  HighnoteUserError,
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

describe("CollaborativeAuthResource", () => {
  let client: Highnote;

  beforeEach(() => {
    vi.clearAllMocks();
    client = new Highnote({ apiKey: "sk_test_fake" });
  });

  describe("addEndpoint()", () => {
    it("returns an endpoint on success", async () => {
      mockRawRequest.mockResolvedValueOnce({
        data: {
          addCollaborativeAuthorizationEndpoint: {
            __typename: "CollaborativeAuthorizationEndpoint",
            id: "cae_123",
            name: "My Endpoint",
            uri: "https://example.com/auth",
            status: "PENDING_VERIFICATION",
            createdAt: "2026-01-01T00:00:00Z",
            updatedAt: "2026-01-01T00:00:00Z",
          },
        },
      });

      const endpoint = await client.collaborativeAuth.addEndpoint({
        name: "My Endpoint",
        uri: "https://example.com/auth",
      });

      expect(endpoint.id).toBe("cae_123");
      expect(endpoint.status).toBe("PENDING_VERIFICATION");
    });

    it("throws HighnoteUserError on invalid input", async () => {
      mockRawRequest.mockResolvedValueOnce({
        data: {
          addCollaborativeAuthorizationEndpoint: {
            __typename: "UserError",
            errors: [{ code: "INVALID_URI", description: "Must be HTTPS" }],
          },
        },
      });

      await expect(
        client.collaborativeAuth.addEndpoint({
          name: "Bad",
          uri: "http://not-https.com",
        }),
      ).rejects.toThrow(HighnoteUserError);
    });
  });

  describe("activateEndpoint()", () => {
    it("returns the activated endpoint", async () => {
      mockRawRequest.mockResolvedValueOnce({
        data: {
          activateCollaborativeAuthorizationEndpoint: {
            __typename: "CollaborativeAuthorizationEndpoint",
            id: "cae_123",
            name: "My Endpoint",
            uri: "https://example.com/auth",
            status: "ACTIVE",
            createdAt: "2026-01-01T00:00:00Z",
            updatedAt: "2026-01-01T00:00:00Z",
          },
        },
      });

      const endpoint = await client.collaborativeAuth.activateEndpoint({
        endpointId: "cae_123",
      });
      expect(endpoint.status).toBe("ACTIVE");
    });

    it("throws HighnoteUserError on error", async () => {
      mockRawRequest.mockResolvedValueOnce({
        data: {
          activateCollaborativeAuthorizationEndpoint: {
            __typename: "UserError",
            errors: [{ code: "NOT_FOUND", description: "Endpoint not found" }],
          },
        },
      });

      await expect(
        client.collaborativeAuth.activateEndpoint({ endpointId: "bad" }),
      ).rejects.toThrow(HighnoteUserError);
    });
  });

  describe("deactivateEndpoint()", () => {
    it("returns the deactivated endpoint", async () => {
      mockRawRequest.mockResolvedValueOnce({
        data: {
          deactivateCollaborativeAuthorizationEndpoint: {
            __typename: "CollaborativeAuthorizationEndpoint",
            id: "cae_123",
            name: "My Endpoint",
            status: "DEACTIVATED",
          },
        },
      });

      const endpoint = await client.collaborativeAuth.deactivateEndpoint({
        endpointId: "cae_123",
      });
      expect(endpoint.status).toBe("DEACTIVATED");
    });
  });

  describe("renameEndpoint()", () => {
    it("returns the renamed endpoint", async () => {
      mockRawRequest.mockResolvedValueOnce({
        data: {
          renameCollaborativeAuthorizationEndpoint: {
            __typename: "CollaborativeAuthorizationEndpoint",
            id: "cae_1",
            name: "New Name",
            uri: "https://example.com/auth",
            status: "ACTIVE",
            createdAt: "2026-01-01T00:00:00Z",
            updatedAt: "2026-06-04T00:00:00Z",
          },
        },
      });

      const ep = await client.collaborativeAuth.renameEndpoint({
        endpointId: "cae_1",
        name: "New Name",
      });
      expect(ep.name).toBe("New Name");
      expect(ep.__typename).toBe("CollaborativeAuthorizationEndpoint");
    });

    it("throws HighnoteUserError on invalid name", async () => {
      mockRawRequest.mockResolvedValueOnce({
        data: {
          renameCollaborativeAuthorizationEndpoint: {
            __typename: "UserError",
            errors: [{ code: "INVALID_NAME" }],
          },
        },
      });
      await expect(
        client.collaborativeAuth.renameEndpoint({ endpointId: "cae_1", name: "" }),
      ).rejects.toThrow(HighnoteUserError);
    });

    it("throws HighnoteUnexpectedResponseError on unknown __typename", async () => {
      mockRawRequest.mockResolvedValueOnce({
        data: {
          renameCollaborativeAuthorizationEndpoint: { __typename: "Other" },
        },
      });
      await expect(
        client.collaborativeAuth.renameEndpoint({ endpointId: "cae_1", name: "X" }),
      ).rejects.toThrow(/Unexpected response/);
    });
  });
});
