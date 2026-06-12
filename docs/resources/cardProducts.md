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

#### `listFinancialAccounts(cardProductId, options)`

Returns an async iterable over the financial accounts associated with a
card product. This is the right entry point for org-scoped accounts such
as the Product Funding Account (`ProductFundingFinancialAccountFeature`)
which back ODF-enabled card products — those FAs do NOT appear under
`accountHolders.listFinancialAccounts(<applicant's accountHolderId>)`,
because they are owned by the issuer, not by the applicant.

The optional `filterBy` accepts Highnote's search-query language:



Pass no options to iterate every account on the product.

**Parameters**

- `cardProductId` (string, **required**)
- `options.filterBy` (AccountHolderFinancialAccountsFilterInput, optional) — Optional Highnote search-language filter passed through to the API.
- `options.pageSize` (number, optional) — Number of items per page. Defaults to client's defaultPageSize.

**Returns** `AsyncIterable<FinancialAccountSummaryFragment>`.

**Throws** `HighnoteUserError`, `HighnoteAccessDeniedError`, `HighnoteUnexpectedResponseError`.

**Example**

```ts
for await (const fa of client.cardProducts.listFinancialAccounts(
  cardProductId,
  { filterBy: { searchQueryLanguage: { query: "", version: "VERSION_1" } } },
)) {
  console.log(fa.name, fa.features?.map((f) => f.__typename));
}
```
