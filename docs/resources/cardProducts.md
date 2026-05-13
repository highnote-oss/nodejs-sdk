### client.cardProducts

#### `get(id)`

Retrieve a single card product by ID.

**Parameters**

- `id` (string, **required**)

**Returns** `CardProduct` — fields: `commercial`, `id`, `name`, `usage`, `vertical`.

**Throws** `HighnoteUserError`, `HighnoteAccessDeniedError`, `HighnoteUnexpectedResponseError`.

**Example**

```ts
const product = await client.cardProducts.get("cp_...");
```

#### `list(options)`

Returns an async iterable over all card products.

**Parameters**

- `options.pageSize` (number, optional) — Number of items per page. Defaults to client's defaultPageSize.

**Returns** `AsyncIterable<object>`.

**Throws** `HighnoteUserError`, `HighnoteAccessDeniedError`, `HighnoteUnexpectedResponseError`.

**Example**

```ts
for await (const product of client.cardProducts.list()) {
  console.log(product.name);
}
```
