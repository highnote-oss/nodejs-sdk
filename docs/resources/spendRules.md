### client.spendRules

#### `attachToCard(input)`

Attach a spend rule to a payment card.

**Parameters**

- `input.paymentCardId` (string, **required**) — The Global ID of the Payment Card to attach the spend rule.
- `input.spendRule.id` (string, **required**) — The Global ID of the Spend Rule to attach.
- `input.spendRule.version` (string, **required**) — The version of the spend rule to attach.

  To always use the latest version, set `version` to `LATEST`.

**Returns** `PaymentCard` — fields: `id`, `status`.

**Throws** `HighnoteUserError`, `HighnoteAccessDeniedError`, `HighnoteUnexpectedResponseError`.

**Example**

```ts
await client.spendRules.attachToCard({
  paymentCardId: "pc_...",
  spendRule: { id: "sr_...", version: "LATEST" },
});
```

#### `createAmountLimit(input)`

Create an amount limit spend rule.

**Parameters**

- `input.maximumAmount.currencyCode` (Iso4217Alpha3SupportedCurrency, **required**) — Three-character [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217) currency code

  **Examples:** `"USD", "EUR", "GBP"`
- `input.maximumAmount.value` (number, **required**) — Value of the amount as an integer. The number of decimal places [varies by currency](https://en.wikipedia.org/wiki/ISO_4217#Active_codes) so the value should be an integer accounting for the minor units.

  For example, a US dollar value of $10.99 should be provided as `1099`. A US dollar value of $10 should be provided as `1000`.

  Currencies with zero decimal places (such as `JPY`) or those with more than 2 (such as `JOD`) should be provided as `1099` and `10990` respectively.

  | Currency | Value
  | --- | --- |
  | USD | 1099 |
  | JPY | 1099 |
  | JOD | 10990 |
- `input.name` (string, **required**) — A name for the rule for future reference.
- `input.userType` (ApplicableRuleUserType, optional) — The `ApplicableRuleUserType` for which the rule will be evaluated.

**Returns** `AmountLimitSpendRule` — fields: `createdAt`, `id`, `name`, `updatedAt`, `version`.

**Throws** `HighnoteUserError`, `HighnoteAccessDeniedError`, `HighnoteUnexpectedResponseError`.

**Example**

```ts
const rule = await client.spendRules.createAmountLimit({
  name: "Max $500",
  maximumAmount: { value: "500.00", currencyCode: "USD" },
});
```

#### `createMerchantCategory(input)`

Create a merchant category spend rule (allow/block by MCC).

**Parameters**

- `input.allowed` (MerchantCategory[], optional) — The merchant categories that will be allowed during authorizations.

  Min: 1
  Max: 5000
- `input.allowedMcc` (string[], optional) — The merchant category codes that will be allowed during authorizations.

  Min: 1
  Max: 5000
- `input.blocked` (MerchantCategory[], optional) — The merchant categories that will result in declined authorizations.

  Min: 1
  Max: 5000
- `input.blockedMcc` (string[], optional) — The merchant category codes that will result in declined authorizations.

  Min: 1
  Max: 5000
- `input.name` (string, **required**) — A name for the rule for future reference.
- `input.userType` (ApplicableRuleUserType, optional) — The `ApplicableRuleUserType` for which the rule will be evaluated.

**Returns** `MerchantCategorySpendRule` — fields: `createdAt`, `id`, `name`, `updatedAt`, `version`.

**Throws** `HighnoteUserError`, `HighnoteAccessDeniedError`, `HighnoteUnexpectedResponseError`.

**Example**

```ts
const rule = await client.spendRules.createMerchantCategory({
  name: "Block ATM",
  blocked: ["6011"],
});
```

#### `detachFromCard(input)`

Detach a spend rule from a payment card.

**Parameters**

- `input.paymentCardId` (string, **required**) — The Global ID of the Payment Card to detach the spend rule.
- `input.spendRule.id` (string, **required**) — The Global ID of the Spend Rule to detach.

**Returns** `PaymentCard` — fields: `id`, `status`.

**Throws** `HighnoteUserError`, `HighnoteAccessDeniedError`, `HighnoteUnexpectedResponseError`.

**Example**

```ts
await client.spendRules.detachFromCard({
  paymentCardId: "pc_...",
  spendRule: { id: "sr_..." },
});
```
