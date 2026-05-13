import { print } from "graphql";

import type { Highnote } from "../client.js";
import { throwIfError, HighnoteUnexpectedResponseError } from "../errors.js";
import type {
  AddWebhookNotificationTargetMutation,
  AddWebhookNotificationTargetMutationVariables,
  ActivateNotificationTargetMutation,
  ActivateNotificationTargetMutationVariables,
  DeactivateNotificationTargetMutation,
  DeactivateNotificationTargetMutationVariables,
  AddSubscriptionsToNotificationTargetMutation,
  AddSubscriptionsToNotificationTargetMutationVariables,
  RemoveSubscriptionsFromNotificationTargetMutation,
  RemoveSubscriptionsFromNotificationTargetMutationVariables,
  RemoveNotificationTargetMutation,
  RemoveNotificationTargetMutationVariables,
  GetWebhookNotificationTargetQuery,
  ListWebhookNotificationTargetsQuery,
  RenameNotificationTargetMutation,
  RenameNotificationTargetMutationVariables,
  SetEmailForNotificationTargetMutation,
  SetEmailForNotificationTargetMutationVariables,
  RemoveEmailFromNotificationTargetMutation,
  RemoveEmailFromNotificationTargetMutationVariables,
  RotateNotificationTargetSigningKeyMutation,
  RotateNotificationTargetSigningKeyMutationVariables,
  ReplayNotificationEventMutation,
  ReplayNotificationEventMutationVariables,
  ListWebhookNotificationTargetEventsQuery,
  ListWebhookNotificationTargetEventsQueryVariables,
  NotificationEventName,
} from "../generated/graphql.js";
import {
  AddWebhookNotificationTargetDocument,
  ActivateNotificationTargetDocument,
  DeactivateNotificationTargetDocument,
  AddSubscriptionsToNotificationTargetDocument,
  RemoveSubscriptionsFromNotificationTargetDocument,
  RemoveNotificationTargetDocument,
  GetWebhookNotificationTargetDocument,
  ListWebhookNotificationTargetsDocument,
  RenameNotificationTargetDocument,
  SetEmailForNotificationTargetDocument,
  RemoveEmailFromNotificationTargetDocument,
  RotateNotificationTargetSigningKeyDocument,
  ReplayNotificationEventDocument,
  ListWebhookNotificationTargetEventsDocument,
} from "../generated/graphql.js";
import { paginate, type RelayConnection } from "../pagination.js";

// ── Types ──

type WebhookNotificationTargetResponse = Extract<
  NonNullable<AddWebhookNotificationTargetMutation["addWebhookNotificationTarget"]>,
  { __typename: "WebhookNotificationTarget" }
>;

type ActivatedNotificationTargetResponse = Extract<
  NonNullable<ActivateNotificationTargetMutation["activateNotificationTarget"]>,
  { __typename: "WebhookNotificationTarget" }
>;

type DeactivatedNotificationTargetResponse = Extract<
  NonNullable<DeactivateNotificationTargetMutation["deactivateNotificationTarget"]>,
  { __typename: "WebhookNotificationTarget" }
>;

type SubscriptionAddedResponse = Extract<
  NonNullable<AddSubscriptionsToNotificationTargetMutation["addSubscriptionsToNotificationTarget"]>,
  { __typename: "WebhookNotificationTarget" }
>;

type SubscriptionRemovedResponse = Extract<
  NonNullable<RemoveSubscriptionsFromNotificationTargetMutation["removeSubscriptionsFromNotificationTarget"]>,
  { __typename: "WebhookNotificationTarget" }
>;

type RemovedNotificationTargetResponse = Extract<
  NonNullable<RemoveNotificationTargetMutation["removeNotificationTarget"]>,
  { __typename: "WebhookNotificationTarget" }
>;

/**
 * The canonical fully-fielded shape of a `WebhookNotificationTarget` returned by
 * `get()` and yielded by `list()`. Useful as a parameter type when writing
 * helpers that operate on targets.
 */
export type WebhookNotificationTargetNode = Extract<
  NonNullable<GetWebhookNotificationTargetQuery["node"]>,
  { __typename: "WebhookNotificationTarget" }
>;

type RenamedNotificationTargetResponse = Extract<
  NonNullable<RenameNotificationTargetMutation["renameNotificationTarget"]>,
  { __typename: "WebhookNotificationTarget" }
>;

type EmailSetResponse = Extract<
  NonNullable<SetEmailForNotificationTargetMutation["setEmailForNotificationTarget"]>,
  { __typename: "WebhookNotificationTarget" }
>;

type EmailRemovedResponse = Extract<
  NonNullable<RemoveEmailFromNotificationTargetMutation["removeEmailFromNotificationTarget"]>,
  { __typename: "WebhookNotificationTarget" }
>;

type SigningKeyRotatedResponse = Extract<
  NonNullable<RotateNotificationTargetSigningKeyMutation["rotateNotificationTargetSigningKey"]>,
  { __typename: "WebhookNotificationTarget" }
>;

type ReplayedNotificationEventResponse = Extract<
  NonNullable<ReplayNotificationEventMutation["replayNotificationEvent"]>,
  { __typename: "NotificationEvent" }
>;

/** A single event delivery attempt record returned by `listEvents()`. */
export type WebhookNotificationTargetEventNode = NonNullable<
  NonNullable<
    NonNullable<
      Extract<
        NonNullable<ListWebhookNotificationTargetEventsQuery["node"]>,
        { __typename: "WebhookNotificationTarget" }
      >["webhookNotificationTargetEvents"]
    >["edges"]
  >[number]
>["node"];

export type WebhookNotificationTarget =
  | WebhookNotificationTargetResponse
  | ActivatedNotificationTargetResponse
  | DeactivatedNotificationTargetResponse
  | SubscriptionAddedResponse
  | SubscriptionRemovedResponse
  | RemovedNotificationTargetResponse
  | WebhookNotificationTargetNode
  | RenamedNotificationTargetResponse
  | EmailSetResponse
  | EmailRemovedResponse
  | SigningKeyRotatedResponse;

export interface ListWebhookNotificationTargetsOptions {
  /** Number of items per page. Defaults to the client's `defaultPageSize`. */
  pageSize?: number;
}

export interface ListWebhookNotificationTargetEventsOptions {
  /** Number of items per page. Defaults to the client's `defaultPageSize`. */
  pageSize?: number;
  /** Restrict to events where the latest delivery attempt was unsuccessful or skipped. */
  unsuccessfulOnly?: boolean;
  /** Restrict to events whose original notification name is in this list. */
  eventNames?: NotificationEventName[];
}

// ── Resource ──

export class WebhooksResource {
  constructor(private readonly client: Highnote) {}

  /**
   * Add a webhook notification target.
   *
   * ```ts
   * import { NotificationEventName } from "@highnote-oss/nodejs-sdk";
   *
   * const target = await client.webhooks.add({
   *   name: "My Webhook",
   *   uri: "https://example.com/webhooks",
   *   subscriptions: [NotificationEventName.CARD_PAYMENT_AUTHORIZED_EVENT],
   * });
   * ```
   */
  async add(
    input: AddWebhookNotificationTargetMutationVariables["input"],
  ): Promise<WebhookNotificationTargetResponse> {
    const { data } =
      await this.client.graphql.rawRequest<AddWebhookNotificationTargetMutation>(
        print(AddWebhookNotificationTargetDocument),
        { input },
      );

    const result = data?.addWebhookNotificationTarget;
    throwIfError(result);

    if (!result || result.__typename !== "WebhookNotificationTarget") {
      throw new HighnoteUnexpectedResponseError(
        result?.__typename ?? "null",
        "Unexpected response from addWebhookNotificationTarget",
      );
    }

    return result as WebhookNotificationTargetResponse;
  }

  /**
   * Deactivate a notification target.
   *
   * ```ts
   * await client.webhooks.deactivate({ targetId: "nt_..." });
   * ```
   */
  async deactivate(
    input: DeactivateNotificationTargetMutationVariables["input"],
  ): Promise<DeactivatedNotificationTargetResponse> {
    const { data } =
      await this.client.graphql.rawRequest<DeactivateNotificationTargetMutation>(
        print(DeactivateNotificationTargetDocument),
        { input },
      );

    const result = data?.deactivateNotificationTarget;
    throwIfError(result);

    if (!result || result.__typename !== "WebhookNotificationTarget") {
      throw new HighnoteUnexpectedResponseError(
        result?.__typename ?? "null",
        "Unexpected response from deactivateNotificationTarget",
      );
    }

    return result as DeactivatedNotificationTargetResponse;
  }

  /**
   * Activate a notification target.
   *
   * ```ts
   * await client.webhooks.activate({ targetId: "nt_..." });
   * ```
   */
  async activate(
    input: ActivateNotificationTargetMutationVariables["input"],
  ): Promise<ActivatedNotificationTargetResponse> {
    const { data } =
      await this.client.graphql.rawRequest<ActivateNotificationTargetMutation>(
        print(ActivateNotificationTargetDocument),
        { input },
      );

    const result = data?.activateNotificationTarget;
    throwIfError(result);

    if (!result || result.__typename !== "WebhookNotificationTarget") {
      throw new HighnoteUnexpectedResponseError(
        result?.__typename ?? "null",
        "Unexpected response from activateNotificationTarget",
      );
    }

    return result as ActivatedNotificationTargetResponse;
  }

  /**
   * Add event subscriptions to a notification target.
   *
   * ```ts
   * import { NotificationEventName } from "@highnote-oss/nodejs-sdk";
   *
   * await client.webhooks.addSubscriptions({
   *   targetId: "nt_...",
   *   subscriptions: [NotificationEventName.CARD_PAYMENT_CLEARED_EVENT],
   * });
   * ```
   */
  async addSubscriptions(
    input: AddSubscriptionsToNotificationTargetMutationVariables["input"],
  ): Promise<SubscriptionAddedResponse> {
    const { data } =
      await this.client.graphql.rawRequest<AddSubscriptionsToNotificationTargetMutation>(
        print(AddSubscriptionsToNotificationTargetDocument),
        { input },
      );

    const result = data?.addSubscriptionsToNotificationTarget;
    throwIfError(result);

    if (!result || result.__typename !== "WebhookNotificationTarget") {
      throw new HighnoteUnexpectedResponseError(
        result?.__typename ?? "null",
        "Unexpected response from addSubscriptionsToNotificationTarget",
      );
    }

    return result as SubscriptionAddedResponse;
  }

  /**
   * Remove event subscriptions from a notification target.
   *
   * ```ts
   * import { NotificationEventName } from "@highnote-oss/nodejs-sdk";
   *
   * await client.webhooks.removeSubscriptions({
   *   targetId: "nt_...",
   *   subscriptions: [NotificationEventName.CARD_PAYMENT_CLEARED_EVENT],
   * });
   * ```
   */
  async removeSubscriptions(
    input: RemoveSubscriptionsFromNotificationTargetMutationVariables["input"],
  ): Promise<SubscriptionRemovedResponse> {
    const { data } =
      await this.client.graphql.rawRequest<RemoveSubscriptionsFromNotificationTargetMutation>(
        print(RemoveSubscriptionsFromNotificationTargetDocument),
        { input },
      );

    const result = data?.removeSubscriptionsFromNotificationTarget;
    throwIfError(result);

    if (!result || result.__typename !== "WebhookNotificationTarget") {
      throw new HighnoteUnexpectedResponseError(
        result?.__typename ?? "null",
        "Unexpected response from removeSubscriptionsFromNotificationTarget",
      );
    }

    return result as SubscriptionRemovedResponse;
  }

  /**
   * Permanently remove a webhook notification target.
   *
   * Distinct from {@link deactivate}: `deactivate` sets the target's status to
   * `DEACTIVATED` and the target lingers (auto-deletes after 30 days), whereas
   * `remove` deletes it immediately and stops all event delivery.
   *
   * ```ts
   * await client.webhooks.remove({ targetId: "nt_..." });
   * ```
   */
  async remove(
    input: RemoveNotificationTargetMutationVariables["input"],
  ): Promise<RemovedNotificationTargetResponse> {
    const { data } =
      await this.client.graphql.rawRequest<RemoveNotificationTargetMutation>(
        print(RemoveNotificationTargetDocument),
        { input },
      );

    const result = data?.removeNotificationTarget;
    throwIfError(result);

    if (!result || result.__typename !== "WebhookNotificationTarget") {
      throw new HighnoteUnexpectedResponseError(
        result?.__typename ?? "null",
        "Unexpected response from removeNotificationTarget",
      );
    }

    return result as RemovedNotificationTargetResponse;
  }

  /**
   * Retrieve a single webhook notification target by id.
   *
   * ```ts
   * const target = await client.webhooks.get("nt_...");
   * console.log(target.status); // ACTIVE | PENDING_VERIFICATION | DEACTIVATED
   * ```
   *
   * @throws {@link HighnoteUnexpectedResponseError} if the id does not resolve to a webhook notification target.
   */
  async get(id: string): Promise<WebhookNotificationTargetNode> {
    const { data } =
      await this.client.graphql.rawRequest<GetWebhookNotificationTargetQuery>(
        print(GetWebhookNotificationTargetDocument),
        { id },
      );

    const node = data?.node;
    if (!node || node.__typename !== "WebhookNotificationTarget") {
      throw new HighnoteUnexpectedResponseError(
        node?.__typename ?? "null",
        `Webhook notification target not found: ${id}`,
      );
    }

    return node as WebhookNotificationTargetNode;
  }

  /**
   * Async-iterate every webhook notification target on the caller's organization.
   *
   * Pages are fetched lazily — break out of the loop to stop fetching.
   *
   * ```ts
   * for await (const t of client.webhooks.list()) {
   *   if (t.name?.startsWith("auto-")) {
   *     await client.webhooks.remove({ targetId: t.id });
   *   }
   * }
   * ```
   */
  list(
    options?: ListWebhookNotificationTargetsOptions,
  ): AsyncIterable<WebhookNotificationTargetNode> {
    const pageSize = options?.pageSize ?? this.client.defaultPageSize;

    return paginate<WebhookNotificationTargetNode>(async (after) => {
      const { data } =
        await this.client.graphql.rawRequest<ListWebhookNotificationTargetsQuery>(
          print(ListWebhookNotificationTargetsDocument),
          { first: pageSize, after },
        );

      // The API key is org-scoped; organizations[0] is always the caller's org.
      const connection =
        data?.organizations?.[0]?.webhookNotificationTargets ?? {
          edges: [],
          pageInfo: { hasNextPage: false, endCursor: "" },
        };

      return connection as RelayConnection<WebhookNotificationTargetNode>;
    });
  }

  /**
   * Rename a webhook notification target. Pure metadata change — does not
   * affect delivery, subscriptions, or signing keys.
   *
   * ```ts
   * await client.webhooks.rename({ targetId: "nt_...", name: "Renamed" });
   * ```
   */
  async rename(
    input: RenameNotificationTargetMutationVariables["input"],
  ): Promise<RenamedNotificationTargetResponse> {
    const { data } =
      await this.client.graphql.rawRequest<RenameNotificationTargetMutation>(
        print(RenameNotificationTargetDocument),
        { input },
      );

    const result = data?.renameNotificationTarget;
    throwIfError(result);

    if (!result || result.__typename !== "WebhookNotificationTarget") {
      throw new HighnoteUnexpectedResponseError(
        result?.__typename ?? "null",
        "Unexpected response from renameNotificationTarget",
      );
    }

    return result as RenamedNotificationTargetResponse;
  }

  /**
   * Set the email address that receives target deactivation notices.
   *
   * Live environment only — calling this against the test environment throws
   * `HighnoteAccessDeniedError` because deactivation emails are not stored or
   * sent in test.
   *
   * ```ts
   * await client.webhooks.setEmail({ targetId: "nt_...", email: "ops@example.com" });
   * ```
   */
  async setEmail(
    input: SetEmailForNotificationTargetMutationVariables["input"],
  ): Promise<EmailSetResponse> {
    const { data } =
      await this.client.graphql.rawRequest<SetEmailForNotificationTargetMutation>(
        print(SetEmailForNotificationTargetDocument),
        { input },
      );

    const result = data?.setEmailForNotificationTarget;
    throwIfError(result);

    if (!result || result.__typename !== "WebhookNotificationTarget") {
      throw new HighnoteUnexpectedResponseError(
        result?.__typename ?? "null",
        "Unexpected response from setEmailForNotificationTarget",
      );
    }

    return result as EmailSetResponse;
  }

  /**
   * Remove the deactivation-notice email from a notification target.
   *
   * Live environment only — calling this against the test environment throws
   * `HighnoteAccessDeniedError`.
   *
   * ```ts
   * await client.webhooks.removeEmail({ targetId: "nt_..." });
   * ```
   */
  async removeEmail(
    input: RemoveEmailFromNotificationTargetMutationVariables["input"],
  ): Promise<EmailRemovedResponse> {
    const { data } =
      await this.client.graphql.rawRequest<RemoveEmailFromNotificationTargetMutation>(
        print(RemoveEmailFromNotificationTargetDocument),
        { input },
      );

    const result = data?.removeEmailFromNotificationTarget;
    throwIfError(result);

    if (!result || result.__typename !== "WebhookNotificationTarget") {
      throw new HighnoteUnexpectedResponseError(
        result?.__typename ?? "null",
        "Unexpected response from removeEmailFromNotificationTarget",
      );
    }

    return result as EmailRemovedResponse;
  }

  /**
   * Generate a new signing key for a notification target.
   *
   * **Important:** rotating creates a *new* signing key while the previous key
   * remains active for a 24-hour overlap window. During that window the target
   * may have up to 5 active keys; consumers should accept signatures from any
   * active key. The newly returned `signingKeys[].secret` is the only place
   * the secret is exposed — store it before the response is discarded.
   *
   * ```ts
   * const updated = await client.webhooks.rotateSigningKey({ targetId: "nt_..." });
   * const newest = updated.signingKeys?.find((k) => k.expiresAt == null);
   * // ...persist newest.secret somewhere durable...
   * ```
   */
  async rotateSigningKey(
    input: RotateNotificationTargetSigningKeyMutationVariables["input"],
  ): Promise<SigningKeyRotatedResponse> {
    const { data } =
      await this.client.graphql.rawRequest<RotateNotificationTargetSigningKeyMutation>(
        print(RotateNotificationTargetSigningKeyDocument),
        { input },
      );

    const result = data?.rotateNotificationTargetSigningKey;
    throwIfError(result);

    if (!result || result.__typename !== "WebhookNotificationTarget") {
      throw new HighnoteUnexpectedResponseError(
        result?.__typename ?? "null",
        "Unexpected response from rotateNotificationTargetSigningKey",
      );
    }

    return result as SigningKeyRotatedResponse;
  }

  /**
   * Replay a previously delivered (or attempted) notification event.
   *
   * If `targetIds` is omitted, the event is replayed to every active target
   * subscribed to its event type. Targets that don't subscribe or are inactive
   * are silently ignored.
   *
   * ```ts
   * await client.webhooks.replay({
   *   notificationEventId: "evt_...",
   *   targetIds: ["nt_..."],
   * });
   * ```
   */
  async replay(
    input: ReplayNotificationEventMutationVariables["input"],
  ): Promise<ReplayedNotificationEventResponse> {
    const { data } =
      await this.client.graphql.rawRequest<ReplayNotificationEventMutation>(
        print(ReplayNotificationEventDocument),
        { input },
      );

    const result = data?.replayNotificationEvent;
    throwIfError(result);

    if (!result || result.__typename !== "NotificationEvent") {
      throw new HighnoteUnexpectedResponseError(
        result?.__typename ?? "null",
        "Unexpected response from replayNotificationEvent",
      );
    }

    return result as ReplayedNotificationEventResponse;
  }

  /**
   * Async-iterate the events that should have been delivered to a target.
   *
   * Useful for reviewing recent delivery attempts (set `unsuccessfulOnly: true`
   * to focus on failures). Pages are fetched lazily — break out of the loop to
   * stop fetching.
   *
   * ```ts
   * for await (const e of client.webhooks.listEvents("nt_...", { unsuccessfulOnly: true })) {
   *   console.log(e.event?.id, e.hasSuccessfulDelivery);
   * }
   * ```
   */
  listEvents(
    targetId: string,
    options?: ListWebhookNotificationTargetEventsOptions,
  ): AsyncIterable<NonNullable<WebhookNotificationTargetEventNode>> {
    const pageSize = options?.pageSize ?? this.client.defaultPageSize;
    const filterBy: ListWebhookNotificationTargetEventsQueryVariables["filterBy"] =
      options?.unsuccessfulOnly != null || options?.eventNames != null
        ? {
            ...(options.unsuccessfulOnly != null
              ? { hasSuccessfulDelivery: !options.unsuccessfulOnly }
              : {}),
            ...(options.eventNames != null ? { name: options.eventNames } : {}),
          }
        : undefined;

    return paginate<NonNullable<WebhookNotificationTargetEventNode>>(async (after) => {
      const { data } =
        await this.client.graphql.rawRequest<ListWebhookNotificationTargetEventsQuery>(
          print(ListWebhookNotificationTargetEventsDocument),
          { targetId, first: pageSize, after, filterBy },
        );

      const node = data?.node;
      if (!node || node.__typename !== "WebhookNotificationTarget") {
        return {
          edges: [],
          pageInfo: { hasNextPage: false, endCursor: "" },
        };
      }

      const connection = node.webhookNotificationTargetEvents ?? {
        edges: [],
        pageInfo: { hasNextPage: false, endCursor: "" },
      };

      return connection as RelayConnection<NonNullable<WebhookNotificationTargetEventNode>>;
    });
  }
}
