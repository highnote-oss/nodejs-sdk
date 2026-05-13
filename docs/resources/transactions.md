### client.transactions

#### `list(options)`

List payment transactions with auto-pagination.

**Parameters**

- `options.filterBy` (PaymentTransactionFilterInput, optional)
- `options.pageSize` (number, optional)

**Returns** `AsyncIterable<PaymentTransaction>`.

**Throws** `HighnoteUserError`, `HighnoteAccessDeniedError`, `HighnoteUnexpectedResponseError`.

**Example**

```ts
for await (const txn of client.transactions.list()) {
  console.log(txn.authorizedAmount);
}
```
