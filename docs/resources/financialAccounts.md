### client.financialAccounts

#### `get(id)`

Retrieve a financial account by ID.

**Parameters**

- `id` (string, **required**)

**Returns** `FinancialAccount` — fields: `accountStatus`, `createdAt`, `externalId`, `id`, `incomingScheduledTransfers`, `ledgers`, `name`, `paymentCards`.

**Throws** `HighnoteUserError`, `HighnoteAccessDeniedError`, `HighnoteUnexpectedResponseError`.

**Example**

```ts
const account = await client.financialAccounts.get("fa_...");
```

#### `issue(input)`

Issue a financial account for an approved application.

**Parameters**

- `input.applicationId` (string, **required**) — The ID of the application to issue this Financial Account against.

  **Note:** The Application must be APPROVED.
- `input.customFields` (CustomFieldInput[], optional) — The `CustomFields` for the Financial Account.
- `input.externalId` (string, optional) — Externally provided ID (255 character limit) that is unique per organization and tenant. If not provided, Highnote will generate an ID (ten digit, Base58, all caps).
- `input.idempotencyKey` (string, optional) — The idempotency key for this request.

  This is a UUIDv4 string used to uniquely identify requests.

  If a request with the same `IdempotencyKey` is received multiple times, only the first request will be processed. Subsequent requests will return the same response as the first request.

  [See this link for more](https://en.wikipedia.org/wiki/Universally_unique_identifier#Version_4_(random))
- `input.name` (string, **required**) — The name of the Financial Account.

**Returns** `FinancialAccount` — fields: `accountStatus`, `createdAt`, `externalId`, `id`, `name`.

**Throws** `HighnoteUserError`, `HighnoteAccessDeniedError`, `HighnoteUnexpectedResponseError`.

**Example**

```ts
const account = await client.financialAccounts.issue({
  applicationId: "app_...",
  name: "Main Account",
});
```

#### `listActivities(financialAccountId, options)`

List activities for a financial account with auto-pagination.
Activities include card transactions, deposits, transfers, and fees.

**Parameters**

- `financialAccountId` (string, **required**)
- `options.pageSize` (number, optional)

**Returns** `AsyncIterable<object>`.

**Throws** `HighnoteUserError`, `HighnoteAccessDeniedError`, `HighnoteUnexpectedResponseError`.

**Example**

```ts
for await (const activity of client.financialAccounts.listActivities("fa_...")) {
  console.log(activity.sign, activity.pendingAmount, activity.postedAmount);
}
```

#### `listReviewWorkflowEvents(financialAccountId, options)`

List review workflow events (wire transfers) for a financial account.

**Parameters**

- `financialAccountId` (string, **required**)
- `options.pageSize` (number, optional)

**Returns** `AsyncIterable<object>`.

**Throws** `HighnoteUserError`, `HighnoteAccessDeniedError`, `HighnoteUnexpectedResponseError`.

**Example**

```ts
for await (const event of client.financialAccounts.listReviewWorkflowEvents("fa_...")) {
  console.log(event.reviewState, event.transfer?.amount, event.transfer?.type);
}
```

#### `suspend(input)`

Suspend a financial account.

**Parameters**

- `input.id` (string, **required**) — The `FinancialAccount` ID to be suspended.
- `input.memo` (string, **required**) — The memo for suspending the `FinancialAccount`.

  Regex: ^[a-zA-Z\d$ ',.\-\_!@#$%^&*+=`?"\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF\n]+$
  Memo has a max length of 2048 characters.
  For compliance and security reasons, memo should not contain any sensitive information, such as PII or PCI.
- `input.suspensionReason` (FinancialAccountSuspensionReasonInput, **required**) — The reason for suspending the `FinancialAccount`.

**Returns** `FinancialAccount` — fields: `accountStatus`, `createdAt`, `externalId`, `id`, `name`.

**Throws** `HighnoteUserError`, `HighnoteAccessDeniedError`, `HighnoteUnexpectedResponseError`.

**Example**

```ts
import { FinancialAccountSuspensionReasonInput } from "@highnote-oss/nodejs-sdk";

await client.financialAccounts.suspend({
  id: "fa_...",
  memo: "Suspected fraud",
  suspensionReason: FinancialAccountSuspensionReasonInput.SUSPECTED_FRAUD,
});
```

#### `unsuspend(input)`

Unsuspend a financial account.

**Parameters**

- `input.id` (string, **required**) — The `FinancialAccount` ID to be unsuspended.
- `input.memo` (string, **required**) — The memo for unsuspending the `FinancialAccount`.

  Regex: ^[a-zA-Z\d$ ',.\-\_!@#$%^&*+=`?"\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF\n]+$
  Memo has a max length of 2048 characters.
  For compliance and security reasons, memo should not contain any sensitive information, such as PII or PCI.

**Returns** `FinancialAccount` — fields: `accountStatus`, `createdAt`, `externalId`, `id`, `name`.

**Throws** `HighnoteUserError`, `HighnoteAccessDeniedError`, `HighnoteUnexpectedResponseError`.

**Example**

```ts
await client.financialAccounts.unsuspend({
  id: "fa_...",
  memo: "Issue resolved",
});
```
