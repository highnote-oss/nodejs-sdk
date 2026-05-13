import { describe, it, expect, vi, beforeEach, expectTypeOf } from "vitest";
import { Highnote } from "../../src/client.js";
import {
  HighnoteUserError,
  HighnoteAccessDeniedError,
  HighnoteUnexpectedResponseError,
} from "../../src/errors.js";
import type {
  WebhookNotificationTargetNode,
  WebhookNotificationTargetEventNode,
} from "../../src/index.js";

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

// Public type-export smoke tests: catch `never` resolutions caused by a broken
// Extract<> chain (e.g. when the underlying GraphQL query forgets to select
// __typename on an inline fragment, the discriminator becomes optional and the
// Extract returns never). Without these checks, a type export can ship in a
// broken state and no runtime test will ever notice.
describe("public type exports", () => {
  it("WebhookNotificationTargetNode resolves to a usable shape", () => {
    expectTypeOf<WebhookNotificationTargetNode>().not.toBeNever();
    expectTypeOf<WebhookNotificationTargetNode>().toHaveProperty("id");
    expectTypeOf<WebhookNotificationTargetNode>().toHaveProperty("status");
  });

  it("WebhookNotificationTargetEventNode resolves to a usable shape", () => {
    expectTypeOf<WebhookNotificationTargetEventNode>().not.toBeNever();
    expectTypeOf<NonNullable<WebhookNotificationTargetEventNode>>().toHaveProperty("event");
    expectTypeOf<NonNullable<WebhookNotificationTargetEventNode>>().toHaveProperty("hasSuccessfulDelivery");
  });
});

describe("WebhooksResource", () => {
  let client: Highnote;

  beforeEach(() => {
    vi.clearAllMocks();
    client = new Highnote({ apiKey: "sk_test_fake" });
  });

  describe("add()", () => {
    it("returns a webhook target on success", async () => {
      mockRawRequest.mockResolvedValueOnce({
        data: {
          addWebhookNotificationTarget: {
            __typename: "WebhookNotificationTarget",
            id: "nt_123",
            name: "My Webhook",
            uri: "https://example.com/webhooks",
            status: "PENDING_VERIFICATION",
            createdAt: "2026-01-01T00:00:00Z",
            updatedAt: "2026-01-01T00:00:00Z",
          },
        },
      });

      const target = await client.webhooks.add({
        name: "My Webhook",
        uri: "https://example.com/webhooks",
        subscriptions: ["CARD_PAYMENT_AUTHORIZED_EVENT" as any],
      });

      expect(target.id).toBe("nt_123");
      expect(target.status).toBe("PENDING_VERIFICATION");
    });

    it("throws HighnoteUserError on invalid input", async () => {
      mockRawRequest.mockResolvedValueOnce({
        data: {
          addWebhookNotificationTarget: {
            __typename: "UserError",
            errors: [{ code: "INVALID_URI", description: "URI must be HTTPS" }],
          },
        },
      });

      await expect(
        client.webhooks.add({
          name: "Bad",
          uri: "http://not-https.com",
          subscriptions: [],
        }),
      ).rejects.toThrow(HighnoteUserError);
    });
  });

  describe("activate()", () => {
    it("returns the activated target", async () => {
      mockRawRequest.mockResolvedValueOnce({
        data: {
          activateNotificationTarget: {
            __typename: "WebhookNotificationTarget",
            id: "nt_123",
            name: "My Webhook",
            status: "ACTIVE",
          },
        },
      });

      const target = await client.webhooks.activate({ targetId: "nt_123" });
      expect(target.status).toBe("ACTIVE");
    });

    it("throws HighnoteUserError on error", async () => {
      mockRawRequest.mockResolvedValueOnce({
        data: {
          activateNotificationTarget: {
            __typename: "UserError",
            errors: [{ code: "NOT_FOUND", description: "Target not found" }],
          },
        },
      });

      await expect(
        client.webhooks.activate({ targetId: "bad" }),
      ).rejects.toThrow(HighnoteUserError);
    });
  });

  describe("deactivate()", () => {
    it("returns the deactivated target", async () => {
      mockRawRequest.mockResolvedValueOnce({
        data: {
          deactivateNotificationTarget: {
            __typename: "WebhookNotificationTarget",
            id: "nt_123",
            name: "My Webhook",
            status: "DEACTIVATED",
          },
        },
      });

      const target = await client.webhooks.deactivate({ targetId: "nt_123" });
      expect(target.status).toBe("DEACTIVATED");
    });
  });

  describe("addSubscriptions()", () => {
    it("returns the updated target", async () => {
      mockRawRequest.mockResolvedValueOnce({
        data: {
          addSubscriptionsToNotificationTarget: {
            __typename: "WebhookNotificationTarget",
            id: "nt_123",
            name: "My Webhook",
            status: "ACTIVE",
          },
        },
      });

      const target = await client.webhooks.addSubscriptions({
        targetId: "nt_123",
        subscriptions: ["CARD_PAYMENT_CLEARED_EVENT" as any],
      });
      expect(target.id).toBe("nt_123");
    });

    it("throws HighnoteUserError on error", async () => {
      mockRawRequest.mockResolvedValueOnce({
        data: {
          addSubscriptionsToNotificationTarget: {
            __typename: "UserError",
            errors: [{ code: "INVALID", description: "Invalid subscription" }],
          },
        },
      });

      await expect(
        client.webhooks.addSubscriptions({
          targetId: "nt_123",
          subscriptions: [],
        }),
      ).rejects.toThrow(HighnoteUserError);
    });
  });

  describe("removeSubscriptions()", () => {
    it("returns the updated target", async () => {
      mockRawRequest.mockResolvedValueOnce({
        data: {
          removeSubscriptionsFromNotificationTarget: {
            __typename: "WebhookNotificationTarget",
            id: "nt_123",
            name: "My Webhook",
            status: "ACTIVE",
          },
        },
      });

      const target = await client.webhooks.removeSubscriptions({
        targetId: "nt_123",
        subscriptions: ["CARD_PAYMENT_CLEARED_EVENT" as any],
      });
      expect(target.id).toBe("nt_123");
    });
  });

  describe("remove()", () => {
    it("returns the removed target on success", async () => {
      mockRawRequest.mockResolvedValueOnce({
        data: {
          removeNotificationTarget: {
            __typename: "WebhookNotificationTarget",
            id: "nt_123",
            name: "Old Webhook",
            status: "ACTIVE",
          },
        },
      });

      const result = await client.webhooks.remove({ targetId: "nt_123" });
      expect(result.id).toBe("nt_123");
      expect(result.__typename).toBe("WebhookNotificationTarget");
    });

    it("throws HighnoteUserError on bad targetId", async () => {
      mockRawRequest.mockResolvedValueOnce({
        data: {
          removeNotificationTarget: {
            __typename: "UserError",
            errors: [{ code: "NOT_FOUND", description: "Target not found" }],
          },
        },
      });

      await expect(
        client.webhooks.remove({ targetId: "nt_missing" }),
      ).rejects.toThrow(HighnoteUserError);
    });

    it("throws HighnoteAccessDeniedError when access is denied", async () => {
      mockRawRequest.mockResolvedValueOnce({
        data: {
          removeNotificationTarget: {
            __typename: "AccessDeniedError",
            message: "Insufficient permissions",
          },
        },
      });

      await expect(
        client.webhooks.remove({ targetId: "nt_123" }),
      ).rejects.toThrow(HighnoteAccessDeniedError);
    });
  });

  describe("get()", () => {
    it("returns a target by id", async () => {
      mockRawRequest.mockResolvedValueOnce({
        data: {
          node: {
            __typename: "WebhookNotificationTarget",
            id: "nt_123",
            name: "My Webhook",
            uri: "https://example.com/webhooks",
            status: "ACTIVE",
          },
        },
      });

      const target = await client.webhooks.get("nt_123");
      expect(target.id).toBe("nt_123");
      expect(target.__typename).toBe("WebhookNotificationTarget");
    });

    it("throws HighnoteUnexpectedResponseError when id is not a webhook target", async () => {
      mockRawRequest.mockResolvedValueOnce({
        data: { node: { __typename: "PaymentCard", id: "pc_123" } },
      });

      await expect(client.webhooks.get("pc_123")).rejects.toThrow(
        HighnoteUnexpectedResponseError,
      );
    });

    it("throws HighnoteUnexpectedResponseError when node is null", async () => {
      mockRawRequest.mockResolvedValueOnce({ data: { node: null } });

      await expect(client.webhooks.get("nt_missing")).rejects.toThrow(
        HighnoteUnexpectedResponseError,
      );
    });
  });

  describe("list()", () => {
    it("yields targets from the first page", async () => {
      mockRawRequest.mockResolvedValueOnce({
        data: {
          organizations: [
            {
              webhookNotificationTargets: {
                edges: [
                  {
                    cursor: "c1",
                    node: {
                      __typename: "WebhookNotificationTarget",
                      id: "nt_1",
                      name: "First",
                      uri: "https://example.com/1",
                      status: "ACTIVE",
                    },
                  },
                  {
                    cursor: "c2",
                    node: {
                      __typename: "WebhookNotificationTarget",
                      id: "nt_2",
                      name: "Second",
                      uri: "https://example.com/2",
                      status: "ACTIVE",
                    },
                  },
                ],
                pageInfo: { hasNextPage: false, endCursor: "c2" },
              },
            },
          ],
        },
      });

      const ids: string[] = [];
      for await (const t of client.webhooks.list()) {
        ids.push(t.id);
      }
      expect(ids).toEqual(["nt_1", "nt_2"]);
    });

    it("paginates across multiple pages until hasNextPage is false", async () => {
      mockRawRequest
        .mockResolvedValueOnce({
          data: {
            organizations: [
              {
                webhookNotificationTargets: {
                  edges: [
                    {
                      cursor: "c1",
                      node: {
                        __typename: "WebhookNotificationTarget",
                        id: "nt_1",
                        name: "Page1",
                        uri: "https://example.com/1",
                        status: "ACTIVE",
                      },
                    },
                  ],
                  pageInfo: { hasNextPage: true, endCursor: "c1" },
                },
              },
            ],
          },
        })
        .mockResolvedValueOnce({
          data: {
            organizations: [
              {
                webhookNotificationTargets: {
                  edges: [
                    {
                      cursor: "c2",
                      node: {
                        __typename: "WebhookNotificationTarget",
                        id: "nt_2",
                        name: "Page2",
                        uri: "https://example.com/2",
                        status: "ACTIVE",
                      },
                    },
                  ],
                  pageInfo: { hasNextPage: false, endCursor: "c2" },
                },
              },
            ],
          },
        });

      const ids: string[] = [];
      for await (const t of client.webhooks.list({ pageSize: 1 })) {
        ids.push(t.id);
      }

      expect(ids).toEqual(["nt_1", "nt_2"]);
      expect(mockRawRequest).toHaveBeenCalledTimes(2);
      expect(mockRawRequest.mock.calls[0][1]).toEqual({ first: 1, after: undefined });
      expect(mockRawRequest.mock.calls[1][1]).toEqual({ first: 1, after: "c1" });
    });

    it("yields nothing when the org has no targets", async () => {
      mockRawRequest.mockResolvedValueOnce({
        data: {
          organizations: [
            {
              webhookNotificationTargets: {
                edges: [],
                pageInfo: { hasNextPage: false, endCursor: null },
              },
            },
          ],
        },
      });

      const ids: string[] = [];
      for await (const t of client.webhooks.list()) {
        ids.push(t.id);
      }
      expect(ids).toEqual([]);
    });

    it("yields nothing when organizations is empty", async () => {
      mockRawRequest.mockResolvedValueOnce({
        data: { organizations: [] },
      });

      const ids: string[] = [];
      for await (const t of client.webhooks.list()) {
        ids.push(t.id);
      }
      expect(ids).toEqual([]);
    });

    it("uses the client's defaultPageSize when no pageSize option is provided", async () => {
      mockRawRequest.mockResolvedValueOnce({
        data: {
          organizations: [
            {
              webhookNotificationTargets: {
                edges: [],
                pageInfo: { hasNextPage: false, endCursor: null },
              },
            },
          ],
        },
      });

      for await (const _t of client.webhooks.list()) {
        // no-op
      }
      expect(mockRawRequest.mock.calls[0][1]).toEqual({ first: 20, after: undefined });
    });
  });

  describe("rename()", () => {
    it("returns the renamed target", async () => {
      mockRawRequest.mockResolvedValueOnce({
        data: {
          renameNotificationTarget: {
            __typename: "WebhookNotificationTarget",
            id: "nt_123",
            name: "Renamed",
            status: "ACTIVE",
          },
        },
      });

      const target = await client.webhooks.rename({ targetId: "nt_123", name: "Renamed" });
      expect(target.name).toBe("Renamed");
    });

    it("throws HighnoteUserError on invalid name", async () => {
      mockRawRequest.mockResolvedValueOnce({
        data: {
          renameNotificationTarget: {
            __typename: "UserError",
            errors: [{ code: "INVALID", description: "Name too long" }],
          },
        },
      });

      await expect(
        client.webhooks.rename({ targetId: "nt_123", name: "x".repeat(300) }),
      ).rejects.toThrow(HighnoteUserError);
    });
  });

  describe("setEmail()", () => {
    it("returns the target with the new email set", async () => {
      mockRawRequest.mockResolvedValueOnce({
        data: {
          setEmailForNotificationTarget: {
            __typename: "WebhookNotificationTarget",
            id: "nt_123",
            name: "My Webhook",
            email: "ops@example.com",
            status: "ACTIVE",
          },
        },
      });

      const target = await client.webhooks.setEmail({
        targetId: "nt_123",
        email: "ops@example.com",
      });
      expect(target.email).toBe("ops@example.com");
    });

    it("throws HighnoteUserError on invalid email", async () => {
      mockRawRequest.mockResolvedValueOnce({
        data: {
          setEmailForNotificationTarget: {
            __typename: "UserError",
            errors: [{ code: "INVALID_EMAIL", description: "Bad email" }],
          },
        },
      });

      await expect(
        client.webhooks.setEmail({ targetId: "nt_123", email: "not-an-email" }),
      ).rejects.toThrow(HighnoteUserError);
    });
  });

  describe("removeEmail()", () => {
    it("returns the target with email cleared", async () => {
      mockRawRequest.mockResolvedValueOnce({
        data: {
          removeEmailFromNotificationTarget: {
            __typename: "WebhookNotificationTarget",
            id: "nt_123",
            name: "My Webhook",
            email: null,
            status: "ACTIVE",
          },
        },
      });

      const target = await client.webhooks.removeEmail({ targetId: "nt_123" });
      expect(target.id).toBe("nt_123");
      expect(target.email).toBeNull();
    });
  });

  describe("rotateSigningKey()", () => {
    it("returns the target with the new signing key", async () => {
      mockRawRequest.mockResolvedValueOnce({
        data: {
          rotateNotificationTargetSigningKey: {
            __typename: "WebhookNotificationTarget",
            id: "nt_123",
            name: "My Webhook",
            status: "ACTIVE",
            signingKeys: [
              { id: "sk_old", secret: "old_secret", createdAt: "2026-01-01", expiresAt: "2026-04-29" },
              { id: "sk_new", secret: "new_secret", createdAt: "2026-04-28", expiresAt: null },
            ],
          },
        },
      });

      const target = await client.webhooks.rotateSigningKey({ targetId: "nt_123" });
      expect(target.signingKeys).toHaveLength(2);
      const newest = target.signingKeys?.find((k) => k.expiresAt == null);
      expect(newest?.secret).toBe("new_secret");
    });

    it("throws HighnoteAccessDeniedError on permission denial", async () => {
      mockRawRequest.mockResolvedValueOnce({
        data: {
          rotateNotificationTargetSigningKey: {
            __typename: "AccessDeniedError",
            message: "Insufficient permissions",
          },
        },
      });

      await expect(
        client.webhooks.rotateSigningKey({ targetId: "nt_123" }),
      ).rejects.toThrow(HighnoteAccessDeniedError);
    });
  });

  describe("replay()", () => {
    it("returns the replayed event", async () => {
      mockRawRequest.mockResolvedValueOnce({
        data: {
          replayNotificationEvent: {
            __typename: "NotificationEvent",
            id: "evt_123",
          },
        },
      });

      const event = await client.webhooks.replay({
        notificationEventId: "evt_123",
        targetIds: ["nt_123"],
      });
      expect(event.id).toBe("evt_123");
    });

    it("throws HighnoteUserError when the event id is unknown", async () => {
      mockRawRequest.mockResolvedValueOnce({
        data: {
          replayNotificationEvent: {
            __typename: "UserError",
            errors: [{ code: "NOT_FOUND", description: "Event not found" }],
          },
        },
      });

      await expect(
        client.webhooks.replay({ notificationEventId: "evt_missing" }),
      ).rejects.toThrow(HighnoteUserError);
    });
  });

  describe("listEvents()", () => {
    it("yields events from the target", async () => {
      mockRawRequest.mockResolvedValueOnce({
        data: {
          node: {
            __typename: "WebhookNotificationTarget",
            webhookNotificationTargetEvents: {
              edges: [
                {
                  cursor: "c1",
                  node: {
                    __typename: "WebhookNotificationTargetEvent",
                    event: {
                      __typename: "CardPaymentAuthorizedEvent",
                      id: "evt_1",
                      name: "CARD_PAYMENT_AUTHORIZED_EVENT",
                      createdAt: "2026-04-28T00:00:00Z",
                    },
                    hasSuccessfulDelivery: true,
                  },
                },
              ],
              pageInfo: { hasNextPage: false, endCursor: "c1" },
            },
          },
        },
      });

      const events = [];
      for await (const e of client.webhooks.listEvents("nt_123")) {
        events.push(e);
      }
      expect(events).toHaveLength(1);
      expect(events[0].hasSuccessfulDelivery).toBe(true);
    });

    it("passes filterBy when unsuccessfulOnly=true", async () => {
      mockRawRequest.mockResolvedValueOnce({
        data: {
          node: {
            __typename: "WebhookNotificationTarget",
            webhookNotificationTargetEvents: {
              edges: [],
              pageInfo: { hasNextPage: false, endCursor: null },
            },
          },
        },
      });

      for await (const _e of client.webhooks.listEvents("nt_123", { unsuccessfulOnly: true })) {
        // no-op
      }

      expect(mockRawRequest.mock.calls[0][1]).toMatchObject({
        targetId: "nt_123",
        filterBy: { hasSuccessfulDelivery: false },
      });
    });

    it("yields nothing when target node is missing", async () => {
      mockRawRequest.mockResolvedValueOnce({
        data: { node: null },
      });

      const events = [];
      for await (const e of client.webhooks.listEvents("nt_missing")) {
        events.push(e);
      }
      expect(events).toEqual([]);
    });

    it("omits filterBy when no filter options provided", async () => {
      mockRawRequest.mockResolvedValueOnce({
        data: {
          node: {
            __typename: "WebhookNotificationTarget",
            webhookNotificationTargetEvents: {
              edges: [],
              pageInfo: { hasNextPage: false, endCursor: null },
            },
          },
        },
      });

      for await (const _e of client.webhooks.listEvents("nt_123")) {
        // no-op
      }

      expect(mockRawRequest.mock.calls[0][1]).toMatchObject({
        targetId: "nt_123",
        filterBy: undefined,
      });
    });
  });
});
