### client.transfers

#### `initiateBetweenAccounts(input)`

Initiate a transfer between two financial accounts.

**Parameters**

- `input.amount.currencyCode` (Iso4217Alpha3SupportedCurrency, **required**) — Three-character [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217) currency code

  **Examples:** `"USD", "EUR", "GBP"`
- `input.amount.value` (number, **required**) — Value of the amount as an integer. The number of decimal places [varies by currency](https://en.wikipedia.org/wiki/ISO_4217#Active_codes) so the value should be an integer accounting for the minor units.

  For example, a US dollar value of $10.99 should be provided as `1099`. A US dollar value of $10 should be provided as `1000`.

  Currencies with zero decimal places (such as `JPY`) or those with more than 2 (such as `JOD`) should be provided as `1099` and `10990` respectively.

  | Currency | Value
  | --- | --- |
  | USD | 1099 |
  | JPY | 1099 |
  | JOD | 10990 |
- `input.externalIdentifier` (string, optional) — Externally provided identifier that can be used to reference the transfer. If not provided, this field will be blank.

  The identifier can be any valid ASCII character and cannot exceed 255 characters.
- `input.fromFinancialAccountId` (string, **required**) — The ID of the source financial account.
- `input.idempotencyKey` (string, optional) — The idempotency key for this request.

  This is a UUIDv4 string used to uniquely identify requests.

  If a request with the same `IdempotencyKey` is received multiple times, only the first request will be processed. Subsequent requests will return the same response as the first request.

  [See this link for more](https://en.wikipedia.org/wiki/Universally_unique_identifier#Version_4_(random))
- `input.memo` (string, optional) — A description of the transfer for later reference. Maximum length is 1024, and valid characters
  are all UTF-8 and ASCII characters.
- `input.purpose` (TransferPurpose, **required**) — The purpose for the transfer.
- `input.toFinancialAccountId` (string, **required**) — The ID of the target financial account.

**Returns** `InterFinancialAccountTransfer` — fields: `amount`, `createdAt`, `id`, `memo`, `purpose`, `status`, `statusReason`, `updatedAt`.

**Throws** `HighnoteUserError`, `HighnoteAccessDeniedError`, `HighnoteUnexpectedResponseError`.

**Example**

```ts
import { TransferPurpose } from "@highnote-oss/nodejs-sdk";

const transfer = await client.transfers.initiateBetweenAccounts({
  fromFinancialAccountId: "fa_source",
  toFinancialAccountId: "fa_target",
  amount: { value: "100.00", currencyCode: "USD" },
  purpose: TransferPurpose.GENERAL,
});
```
