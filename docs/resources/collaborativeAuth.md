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

**Returns** `CollaborativeAuthorizationEndpoint` — fields: `createdAt`, `id`, `name`, `status`, `updatedAt`, `uri`.

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
