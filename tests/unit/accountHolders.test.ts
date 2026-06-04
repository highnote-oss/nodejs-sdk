import { describe, it, expect, vi, beforeEach } from "vitest";
import { Highnote } from "../../src/client.js";
import { HighnoteUserError, HighnoteUnexpectedResponseError } from "../../src/errors.js";

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

describe("AccountHoldersResource", () => {
  let client: Highnote;

  beforeEach(() => {
    vi.clearAllMocks();
    client = new Highnote({ apiKey: "sk_test_fake" });
  });

  describe("createUSPerson()", () => {
    it("returns created account holder", async () => {
      mockRawRequest.mockResolvedValueOnce({
        data: {
          createUSPersonAccountHolder: {
            __typename: "USPersonAccountHolder",
            id: "ah_123",
            externalId: null,
            createdAt: "2026-01-01T00:00:00Z",
            email: "test@example.com",
            name: { givenName: "John", familyName: "Doe", middleName: null, suffix: null },
            dateOfBirth: "1990-01-01",
            billingAddress: null,
          },
        },
      });

      const holder = await client.accountHolders.createUSPerson({
        personAccountHolder: {} as any,
      });

      expect(holder.id).toBe("ah_123");
      expect(holder.__typename).toBe("USPersonAccountHolder");
    });

    it("throws HighnoteUserError on validation failure", async () => {
      mockRawRequest.mockResolvedValueOnce({
        data: {
          createUSPersonAccountHolder: {
            __typename: "UserError",
            errors: [{ code: "REQUIRED", description: "Name is required" }],
          },
        },
      });

      await expect(
        client.accountHolders.createUSPerson({ personAccountHolder: {} as any }),
      ).rejects.toThrow(HighnoteUserError);
    });
  });

  describe("get()", () => {
    it("returns a person account holder", async () => {
      mockRawRequest.mockResolvedValueOnce({
        data: {
          node: {
            __typename: "USPersonAccountHolder",
            id: "ah_123",
            externalId: null,
            createdAt: "2026-01-01T00:00:00Z",
            updatedAt: "2026-01-01T00:00:00Z",
            email: "test@example.com",
            name: { givenName: "John", familyName: "Doe" },
            dateOfBirth: "1990-01-01",
            billingAddress: null,
          },
        },
      });

      const holder = await client.accountHolders.get("ah_123");
      expect(holder.__typename).toBe("USPersonAccountHolder");
    });

    it("returns a business account holder", async () => {
      mockRawRequest.mockResolvedValueOnce({
        data: {
          node: {
            __typename: "USBusinessAccountHolder",
            id: "bah_123",
            externalId: null,
            createdAt: "2026-01-01T00:00:00Z",
            updatedAt: "2026-01-01T00:00:00Z",
          },
        },
      });

      const holder = await client.accountHolders.get("bah_123");
      expect(holder.__typename).toBe("USBusinessAccountHolder");
    });

    it("throws when node is not an account holder", async () => {
      mockRawRequest.mockResolvedValueOnce({
        data: { node: null },
      });

      await expect(client.accountHolders.get("bad_id")).rejects.toThrow(
        "Account holder not found",
      );
    });

    it("throws HighnoteUnexpectedResponseError for unknown __typename", async () => {
      mockRawRequest.mockResolvedValueOnce({
        data: {
          node: {
            __typename: "SomeUnknownType",
            id: "x",
          },
        },
      });

      await expect(client.accountHolders.get("x")).rejects.toThrow(
        HighnoteUnexpectedResponseError,
      );
    });
  });

  describe("listPersons()", () => {
    it("returns person account holders with core fields", async () => {
      mockRawRequest.mockResolvedValueOnce({
        data: {
          personAccountHolders: {
            edges: [
              {
                node: {
                  id: "ah_1",
                  externalId: null,
                  createdAt: "2026-01-01T00:00:00Z",
                  updatedAt: null,
                  email: "a@b.com",
                  name: { givenName: "A", familyName: "B", middleName: null, suffix: null },
                  dateOfBirth: "1990-01-01",
                  billingAddress: null,
                  __typename: "USPersonAccountHolder",
                },
                cursor: "c1",
              },
            ],
            pageInfo: { hasNextPage: false, endCursor: "c1" },
          },
        },
      });

      const results = [];
      for await (const holder of client.accountHolders.listPersons()) {
        results.push(holder);
      }

      expect(results).toHaveLength(1);
      expect(results[0].id).toBe("ah_1");
      expect(results[0].email).toBe("a@b.com");
      expect(results[0].name?.givenName).toBe("A");
    });
  });

  describe("listBusinesses()", () => {
    it("returns business account holders with pagination", async () => {
      mockRawRequest.mockResolvedValueOnce({
        data: {
          businessAccountHolders: {
            edges: [
              {
                node: {
                  id: "bah_1",
                  externalId: null,
                  createdAt: "2026-01-01T00:00:00Z",
                  updatedAt: null,
                  __typename: "USBusinessAccountHolder",
                },
                cursor: "c1",
              },
            ],
            pageInfo: { hasNextPage: false, endCursor: "c1" },
          },
        },
      });

      const results = [];
      for await (const holder of client.accountHolders.listBusinesses()) {
        results.push(holder);
      }

      expect(results).toHaveLength(1);
      expect(results[0].id).toBe("bah_1");
    });
  });

  describe("searchPersons()", () => {
    it("returns filtered person account holders", async () => {
      mockRawRequest.mockResolvedValueOnce({
        data: {
          personAccountHolders: {
            edges: [
              {
                node: {
                  id: "ah_filtered",
                  externalId: null,
                  createdAt: "2026-01-01T00:00:00Z",
                  updatedAt: null,
                  email: "filtered@example.com",
                  name: { givenName: "Filtered", familyName: "Person" },
                  __typename: "USPersonAccountHolder",
                },
                cursor: "c1",
              },
            ],
            pageInfo: { hasNextPage: false, endCursor: "c1" },
          },
        },
      });

      const results = [];
      for await (const holder of client.accountHolders.searchPersons({ email: { equals: "filtered@example.com" } })) {
        results.push(holder);
      }

      expect(results).toHaveLength(1);
      expect(results[0].id).toBe("ah_filtered");
    });

    it("passes filterBy to the GraphQL query", async () => {
      mockRawRequest.mockResolvedValueOnce({
        data: {
          personAccountHolders: {
            edges: [],
            pageInfo: { hasNextPage: false, endCursor: "" },
          },
        },
      });

      const filterBy = { email: { equals: "test@example.com" } };
      const results = [];
      for await (const holder of client.accountHolders.searchPersons(filterBy)) {
        results.push(holder);
      }

      expect(mockRawRequest).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({ filterBy }),
      );
    });
  });

  describe("searchBusinesses()", () => {
    it("returns filtered business account holders", async () => {
      mockRawRequest.mockResolvedValueOnce({
        data: {
          businessAccountHolders: {
            edges: [
              {
                node: {
                  id: "bah_filtered",
                  externalId: "ext_1",
                  createdAt: "2026-01-01T00:00:00Z",
                  updatedAt: null,
                  __typename: "USBusinessAccountHolder",
                },
                cursor: "c1",
              },
            ],
            pageInfo: { hasNextPage: false, endCursor: "c1" },
          },
        },
      });

      const results = [];
      for await (const holder of client.accountHolders.searchBusinesses({ externalId: { equals: "ext_1" } })) {
        results.push(holder);
      }

      expect(results).toHaveLength(1);
      expect(results[0].id).toBe("bah_filtered");
    });

    it("passes filterBy to the GraphQL query", async () => {
      mockRawRequest.mockResolvedValueOnce({
        data: {
          businessAccountHolders: {
            edges: [],
            pageInfo: { hasNextPage: false, endCursor: "" },
          },
        },
      });

      const filterBy = { externalId: { equals: "ext_1" } };
      const results = [];
      for await (const holder of client.accountHolders.searchBusinesses(filterBy)) {
        results.push(holder);
      }

      expect(mockRawRequest).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({ filterBy }),
      );
    });
  });

  describe("createMinimalUSBusiness()", () => {
    it("returns a USBusinessAccountHolder on success", async () => {
      mockRawRequest.mockResolvedValueOnce({
        data: {
          createMinimalUSBusinessAccountHolder: {
            __typename: "USBusinessAccountHolder",
            id: "ah_biz_123",
            externalId: "ext_abc",
            createdAt: "2026-01-01T00:00:00Z",
          },
        },
      });

      const holder = await client.accountHolders.createMinimalUSBusiness({
        businessProfile: {
          businessName: "Acme Co",
          businessType: "CORPORATION",
        } as any,
      });

      expect(holder.id).toBe("ah_biz_123");
      expect(holder.__typename).toBe("USBusinessAccountHolder");
    });

    it("throws HighnoteUserError on validation failure", async () => {
      mockRawRequest.mockResolvedValueOnce({
        data: {
          createMinimalUSBusinessAccountHolder: {
            __typename: "UserError",
            errors: [{ code: "INVALID", description: "Missing field" }],
          },
        },
      });

      await expect(
        client.accountHolders.createMinimalUSBusiness({ businessProfile: {} as any }),
      ).rejects.toThrow(HighnoteUserError);
    });

    it("throws HighnoteUnexpectedResponseError on unknown __typename", async () => {
      mockRawRequest.mockResolvedValueOnce({
        data: { createMinimalUSBusinessAccountHolder: { __typename: "Other" } },
      });

      await expect(
        client.accountHolders.createMinimalUSBusiness({ businessProfile: {} as any }),
      ).rejects.toThrow(/Unexpected response/);
    });
  });

  describe("createUSBusiness()", () => {
    it("returns a USBusinessAccountHolder on success", async () => {
      mockRawRequest.mockResolvedValueOnce({
        data: {
          createUSBusinessAccountHolder: {
            __typename: "USBusinessAccountHolder",
            id: "ah_biz_456",
            externalId: null,
            createdAt: "2026-01-01T00:00:00Z",
          },
        },
      });

      const holder = await client.accountHolders.createUSBusiness({
        businessProfile: {} as any,
        authorizedPersons: [],
        ultimateBeneficialOwners: [],
      } as any);

      expect(holder.id).toBe("ah_biz_456");
      expect(holder.__typename).toBe("USBusinessAccountHolder");
    });

    it("throws HighnoteUserError on validation failure", async () => {
      mockRawRequest.mockResolvedValueOnce({
        data: {
          createUSBusinessAccountHolder: {
            __typename: "UserError",
            errors: [{ code: "INVALID" }],
          },
        },
      });

      await expect(
        client.accountHolders.createUSBusiness({} as any),
      ).rejects.toThrow(HighnoteUserError);
    });

    it("throws HighnoteUnexpectedResponseError on unknown __typename", async () => {
      mockRawRequest.mockResolvedValueOnce({
        data: { createUSBusinessAccountHolder: { __typename: "Other" } },
      });

      await expect(
        client.accountHolders.createUSBusiness({} as any),
      ).rejects.toThrow(/Unexpected response/);
    });
  });
});
