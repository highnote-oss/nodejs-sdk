### client.collaborativeAuth

#### `activateEndpoint(input)`

Activate a collaborative authorization endpoint.

**Parameters**

- `input.endpointId` (string, **required**) — The Global ID of the `CollaborativeAuthorizationEndpoint` to activate.

**Returns** `CollaborativeAuthorizationEndpoint` — fields: `createdAt`, `id`, `name`, `status`, `updatedAt`, `uri`.

**Throws** `HighnoteUserError`, `HighnoteAccessDeniedError`, `HighnoteUnexpectedResponseError`.

**Example**

```ts
await client.collaborativeAuth.activateEndpoint({ endpointId: "cae_..." });
```

#### `addEndpoint(input)`

Add a collaborative authorization endpoint.

**Parameters**

- `input.name` (string, **required**) — A name for the `CollaborativeAuthorizationEndpoint`.

  Must be between 1 and 255 characters.
- `input.uri` (string, **required**) — A valid URI to send collaborative authorization requests. The protocol _must be included_ and is required to be `https`.

  Example: `https://mywebhook.com`

**Returns** `CollaborativeAuthorizationEndpoint` — fields: `createdAt`, `id`, `name`, `signingKeys`, `status`, `updatedAt`, `uri`.

**Throws** `HighnoteUserError`, `HighnoteAccessDeniedError`, `HighnoteUnexpectedResponseError`.

**Example**

```ts
const endpoint = await client.collaborativeAuth.addEndpoint({
  name: "My Auth Endpoint",
  uri: "https://example.com/auth",
});
```

#### `deactivateEndpoint(input)`

Deactivate a collaborative authorization endpoint.

**Parameters**

- `input.endpointId` (string, **required**) — The Global ID of the `CollaborativeAuthorizationEndpoint` to deactivate.

**Returns** `CollaborativeAuthorizationEndpoint` — fields: `id`, `name`, `status`.

**Throws** `HighnoteUserError`, `HighnoteAccessDeniedError`, `HighnoteUnexpectedResponseError`.

**Example**

```ts
await client.collaborativeAuth.deactivateEndpoint({ endpointId: "cae_..." });
```

#### `list(options)`

Async-iterate every registered collaborative-authorization endpoint on the
caller's organization.

Pages are fetched lazily — break out of the loop to stop fetching.

**Parameters**

- `options.pageSize` (number, optional) — Number of items per page. Defaults to the client's `defaultPageSize`.

**Returns** `AsyncIterable<object>`.

**Throws** `HighnoteUserError`, `HighnoteAccessDeniedError`, `HighnoteUnexpectedResponseError`.

**Example**

```ts
for await (const ep of client.collaborativeAuth.list()) {
  console.log(ep.name, ep.status);
}
```

#### `removeEndpoint(input)`

Remove a collaborative authorization endpoint permanently.

**Parameters**

- `input.endpointId` (string, **required**) — The Global ID of the `CollaborativeAuthorizationEndpoint` to remove.

**Returns** `CollaborativeAuthorizationEndpoint` — fields: `createdAt`, `id`, `name`, `status`, `updatedAt`, `uri`.

**Throws** `HighnoteUserError`, `HighnoteAccessDeniedError`, `HighnoteUnexpectedResponseError`.

**Example**

```ts
await client.collaborativeAuth.removeEndpoint({ endpointId: "cae_..." });
```

#### `renameEndpoint(input)`

Rename a collaborative authorization endpoint.

**Parameters**

- `input.endpointId` (string, **required**) — The Global ID of the `CollaborativeAuthorizationEndpoint` to rename.
- `input.name` (string, **required**) — The new, human-friendly name for your `CollaborativeAuthorizationEndpoint`.

  This value can contain any characters but cannot exceed a length of 255.

**Returns** `CollaborativeAuthorizationEndpoint` — fields: `createdAt`, `id`, `name`, `status`, `updatedAt`, `uri`.

**Throws** `HighnoteUserError`, `HighnoteAccessDeniedError`, `HighnoteUnexpectedResponseError`.

**Example**

```ts
await client.collaborativeAuth.renameEndpoint({
  endpointId: "cae_...",
  name: "Production AP automation endpoint",
});
```
