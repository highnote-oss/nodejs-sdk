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
            signingKeys: [
              {
                id: "sk_1",
                secret: "shh",
                createdAt: "2026-01-01T00:00:00Z",
                expiresAt: null,
              },
            ],
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
      expect(endpoint.signingKeys?.[0]?.secret).toBe("shh");
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

  describe("removeEndpoint()", () => {
    it("returns the removed endpoint", async () => {
      mockRawRequest.mockResolvedValueOnce({
        data: {
          removeCollaborativeAuthorizationEndpoint: {
            __typename: "CollaborativeAuthorizationEndpoint",
            id: "cae_1",
            name: "Gone",
            uri: "https://example.com/x",
            status: "DEACTIVATED",
            createdAt: "2026-01-01T00:00:00Z",
            updatedAt: "2026-06-04T00:00:00Z",
          },
        },
      });
      const ep = await client.collaborativeAuth.removeEndpoint({ endpointId: "cae_1" });
      expect(ep.id).toBe("cae_1");
      expect(ep.__typename).toBe("CollaborativeAuthorizationEndpoint");
    });

    it("throws HighnoteUserError on validation failure", async () => {
      mockRawRequest.mockResolvedValueOnce({
        data: {
          removeCollaborativeAuthorizationEndpoint: {
            __typename: "UserError",
            errors: [{ code: "INVALID" }],
          },
        },
      });
      await expect(
        client.collaborativeAuth.removeEndpoint({ endpointId: "cae_bad" }),
      ).rejects.toThrow(HighnoteUserError);
    });

    it("throws HighnoteUnexpectedResponseError on unknown __typename", async () => {
      mockRawRequest.mockResolvedValueOnce({
        data: { removeCollaborativeAuthorizationEndpoint: { __typename: "Other" } },
      });
      await expect(
        client.collaborativeAuth.removeEndpoint({ endpointId: "cae_1" }),
      ).rejects.toThrow(/Unexpected response/);
    });
  });

  describe("list()", () => {
    it("yields endpoints across pages", async () => {
      mockRawRequest.mockResolvedValueOnce({
        data: {
          organizations: [
            {
              collaborativeAuthorizationEndpoints: {
                pageInfo: { hasNextPage: false, endCursor: "" },
                edges: [
                  {
                    node: {
                      __typename: "CollaborativeAuthorizationEndpoint",
                      id: "cae_1",
                      name: "A",
                      uri: "https://a",
                      status: "ACTIVE",
                      createdAt: "2026-01-01T00:00:00Z",
                      updatedAt: "2026-01-01T00:00:00Z",
                    },
                  },
                  {
                    node: {
                      __typename: "CollaborativeAuthorizationEndpoint",
                      id: "cae_2",
                      name: "B",
                      uri: "https://b",
                      status: "DEACTIVATED",
                      createdAt: "2026-01-01T00:00:00Z",
                      updatedAt: "2026-01-01T00:00:00Z",
                    },
                  },
                ],
              },
            },
          ],
        },
      });

      const ids: string[] = [];
      for await (const ep of client.collaborativeAuth.list()) {
        ids.push(ep.id);
      }
      expect(ids).toEqual(["cae_1", "cae_2"]);
    });

    it("honors options.pageSize", async () => {
      mockRawRequest.mockResolvedValueOnce({
        data: {
          organizations: [
            {
              collaborativeAuthorizationEndpoints: {
                pageInfo: { hasNextPage: false, endCursor: "" },
                edges: [],
              },
            },
          ],
        },
      });

      const iter = client.collaborativeAuth.list({ pageSize: 5 });
      for await (const _ of iter) {
        // exhaust
      }
      const variables = mockRawRequest.mock.calls[0][1];
      expect(variables.first).toBe(5);
    });
  });
});
