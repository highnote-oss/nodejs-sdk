### client.webhooks

#### `activate(input)`

Activate a notification target.

**Parameters**

- `input.targetId` (string, **required**)

**Returns** `WebhookNotificationTarget` — fields: `id`, `name`, `status`.

**Throws** `HighnoteUserError`, `HighnoteAccessDeniedError`, `HighnoteUnexpectedResponseError`.

**Example**

```ts
await client.webhooks.activate({ targetId: "nt_..." });
```

#### `add(input)`

Add a webhook notification target.

**Parameters**

- `input.email` (string, optional) — The email address to which target deactivation emails are sent.
  This data is only stored in the live environment. Deactivation emails are not sent in the test environment.
- `input.name` (string, **required**) — A name for the target.

  Must be between 1 and 255 characters.
- `input.subscriptions` (NotificationEventName[], **required**) — The event names to receive notifications about.
- `input.uri` (string, **required**) — A valid URI to send notifications. The protocol _must be included_ and is required to be `https`.

  Example: `https://mywebhook.com`

**Returns** `WebhookNotificationTarget` — fields: `createdAt`, `id`, `name`, `signingKeys`, `status`, `updatedAt`, `uri`.

**Throws** `HighnoteUserError`, `HighnoteAccessDeniedError`, `HighnoteUnexpectedResponseError`.

**Example**

```ts
import { NotificationEventName } from "@highnote-oss/nodejs-sdk";

const target = await client.webhooks.add({
  name: "My Webhook",
  uri: "https://example.com/webhooks",
  subscriptions: [NotificationEventName.CARD_PAYMENT_AUTHORIZED_EVENT],
});
```

#### `addSubscriptions(input)`

Add event subscriptions to a notification target.

**Parameters**

- `input.subscriptions` (NotificationEventName[], **required**) — The event names to receive notifications about.
- `input.targetId` (string, **required**) — Target Id

**Returns** `WebhookNotificationTarget` — fields: `id`, `name`, `status`.

**Throws** `HighnoteUserError`, `HighnoteAccessDeniedError`, `HighnoteUnexpectedResponseError`.

**Example**

```ts
import { NotificationEventName } from "@highnote-oss/nodejs-sdk";

await client.webhooks.addSubscriptions({
  targetId: "nt_...",
  subscriptions: [NotificationEventName.CARD_PAYMENT_CLEARED_EVENT],
});
```

#### `deactivate(input)`

Deactivate a notification target.

**Parameters**

- `input.targetId` (string, **required**)

**Returns** `WebhookNotificationTarget` — fields: `id`, `name`, `status`.

**Throws** `HighnoteUserError`, `HighnoteAccessDeniedError`, `HighnoteUnexpectedResponseError`.

**Example**

```ts
await client.webhooks.deactivate({ targetId: "nt_..." });
```

#### `get(id)`

Retrieve a single webhook notification target by id.

**Parameters**

- `id` (string, **required**)

**Returns** `WebhookNotificationTarget` — fields: `createdAt`, `deactivatedAt`, `id`, `name`, `status`, `subscriptions`, `updatedAt`, `uri`.

**Throws** `HighnoteUserError`, `HighnoteAccessDeniedError`, `HighnoteUnexpectedResponseError`.

**Example**

```ts
const target = await client.webhooks.get("nt_...");
console.log(target.status); // ACTIVE | PENDING_VERIFICATION | DEACTIVATED
```

#### `list(options)`

Async-iterate every webhook notification target on the caller's organization.

Pages are fetched lazily — break out of the loop to stop fetching.

**Parameters**

- `options.pageSize` (number, optional) — Number of items per page. Defaults to the client's `defaultPageSize`.

**Returns** `AsyncIterable<object>`.

**Throws** `HighnoteUserError`, `HighnoteAccessDeniedError`, `HighnoteUnexpectedResponseError`.

**Example**

```ts
for await (const t of client.webhooks.list()) {
  if (t.name?.startsWith("auto-")) {
    await client.webhooks.remove({ targetId: t.id });
  }
}
```

#### `listEvents(targetId, options)`

Async-iterate the events that should have been delivered to a target.

Useful for reviewing recent delivery attempts (set `unsuccessfulOnly: true`
to focus on failures). Pages are fetched lazily — break out of the loop to
stop fetching.

**Parameters**

- `targetId` (string, **required**)
- `options.eventNames` (NotificationEventName[], optional) — Restrict to events whose original notification name is in this list.
- `options.pageSize` (number, optional) — Number of items per page. Defaults to the client's `defaultPageSize`.
- `options.unsuccessfulOnly` (boolean, optional) — Restrict to events where the latest delivery attempt was unsuccessful or skipped.

**Returns** `AsyncIterable<object>`.

**Throws** `HighnoteUserError`, `HighnoteAccessDeniedError`, `HighnoteUnexpectedResponseError`.

**Example**

```ts
for await (const e of client.webhooks.listEvents("nt_...", { unsuccessfulOnly: true })) {
  console.log(e.event?.id, e.hasSuccessfulDelivery);
}
```

#### `remove(input)`

Permanently remove a webhook notification target.

Distinct from `deactivate`: `deactivate` sets the target's status to
`DEACTIVATED` and the target lingers (auto-deletes after 30 days), whereas
`remove` deletes it immediately and stops all event delivery.

**Parameters**

- `input.targetId` (string, **required**)

**Returns** `WebhookNotificationTarget` — fields: `id`, `name`, `status`.

**Throws** `HighnoteUserError`, `HighnoteAccessDeniedError`, `HighnoteUnexpectedResponseError`.

**Example**

```ts
await client.webhooks.remove({ targetId: "nt_..." });
```

#### `removeEmail(input)`

Remove the deactivation-notice email from a notification target.

Live environment only — calling this against the test environment throws
`HighnoteAccessDeniedError`.

**Parameters**

- `input.targetId` (string, **required**) — The notification target ID.

**Returns** `WebhookNotificationTarget` — fields: `email`, `id`, `name`, `status`.

**Throws** `HighnoteUserError`, `HighnoteAccessDeniedError`, `HighnoteUnexpectedResponseError`.

**Example**

```ts
await client.webhooks.removeEmail({ targetId: "nt_..." });
```

#### `removeSubscriptions(input)`

Remove event subscriptions from a notification target.

**Parameters**

- `input.subscriptions` (NotificationEventName[], **required**) — The event names to no longer receive notifications about.
- `input.targetId` (string, **required**) — Target Id

**Returns** `WebhookNotificationTarget` — fields: `id`, `name`, `status`.

**Throws** `HighnoteUserError`, `HighnoteAccessDeniedError`, `HighnoteUnexpectedResponseError`.

**Example**

```ts
import { NotificationEventName } from "@highnote-oss/nodejs-sdk";

await client.webhooks.removeSubscriptions({
  targetId: "nt_...",
  subscriptions: [NotificationEventName.CARD_PAYMENT_CLEARED_EVENT],
});
```

#### `rename(input)`

Rename a webhook notification target. Pure metadata change — does not
affect delivery, subscriptions, or signing keys.

**Parameters**

- `input.name` (string, **required**) — A name for the target.
  Must be between 1 and 255 characters.
- `input.targetId` (string, **required**) — The notification target ID.

**Returns** `WebhookNotificationTarget` — fields: `id`, `name`, `status`.

**Throws** `HighnoteUserError`, `HighnoteAccessDeniedError`, `HighnoteUnexpectedResponseError`.

**Example**

```ts
await client.webhooks.rename({ targetId: "nt_...", name: "Renamed" });
```

#### `replay(input)`

Replay a previously delivered (or attempted) notification event.

If `targetIds` is omitted, the event is replayed to every active target
subscribed to its event type. Targets that don't subscribe or are inactive
are silently ignored.

**Parameters**

- `input.notificationEventId` (string, **required**) — The id of the event to replay.
- `input.targetIds` (string[], optional) — Optional list of target IDs to replay the event for. If absent or empty,
  the event will be sent to all active targets that subscribe to this event
  type. If a target ID is provided for a target that does not subscribe to this
  event type or is not active, the replay request for that target will be
  ignored.

**Returns** `NotificationEvent` — fields: `id`.

**Throws** `HighnoteUserError`, `HighnoteAccessDeniedError`, `HighnoteUnexpectedResponseError`.

**Example**

```ts
await client.webhooks.replay({
  notificationEventId: "evt_...",
  targetIds: ["nt_..."],
});
```

#### `rotateSigningKey(input)`

Generate a new signing key for a notification target.

**Important:** rotating creates a *new* signing key while the previous key
remains active for a 24-hour overlap window. During that window the target
may have up to 5 active keys; consumers should accept signatures from any
active key. The newly returned `signingKeys[].secret` is the only place
the secret is exposed — store it before the response is discarded.

**Parameters**

- `input.targetId` (string, **required**) — The notification target ID.

**Returns** `WebhookNotificationTarget` — fields: `id`, `name`, `signingKeys`, `status`.

**Throws** `HighnoteUserError`, `HighnoteAccessDeniedError`, `HighnoteUnexpectedResponseError`.

**Example**

```ts
const updated = await client.webhooks.rotateSigningKey({ targetId: "nt_..." });
const newest = updated.signingKeys?.find((k) => k.expiresAt == null);
// ...persist newest.secret somewhere durable...
```

#### `setEmail(input)`

Set the email address that receives target deactivation notices.

Live environment only — calling this against the test environment throws
`HighnoteAccessDeniedError` because deactivation emails are not stored or
sent in test.

**Parameters**

- `input.email` (string, **required**) — The email address to which target deactivation emails are sent.
- `input.targetId` (string, **required**) — The notification target ID.

**Returns** `WebhookNotificationTarget` — fields: `email`, `id`, `name`, `status`.

**Throws** `HighnoteUserError`, `HighnoteAccessDeniedError`, `HighnoteUnexpectedResponseError`.

**Example**

```ts
await client.webhooks.setEmail({ targetId: "nt_...", email: "ops@example.com" });
```
