### client.disputes

#### `get(id)`

Retrieve a dispute by ID, including chargebacks and provisional credit history.

**Parameters**

- `id` (string, **required**)

**Returns** `PaymentCardTransactionDispute` — fields: `amount`, `category`, `chargebacks`, `createdAt`, `customerClaimType`, `id`, `liability`, `provisionalCreditHistory`, `status`, `subscriberNote`, `updatedAt`.

**Throws** `HighnoteUserError`, `HighnoteAccessDeniedError`, `HighnoteUnexpectedResponseError`.

**Example**

```ts
const dispute = await client.disputes.get("dis_...");
console.log(dispute.status, dispute.chargebacks);
```

#### `initiate(input)`

Initiate a customer card transaction dispute.

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
- `input.cardTransactionEventId` (string, **required**) — The ID of the transaction event (AuthorizationAndClearEvent or ClearingEvent).
- `input.category` (PaymentCardDisputeCategoryType, **required**) — The category type of the dispute.
- `input.customerClaimType` (PaymentCardDisputeCustomerClaimType, **required**) — The customer claim type for the card transaction dispute.
- `input.customerContact.email` (string, **required**) — The email of the customer.
- `input.customerContact.familyName` (string, **required**) — The family name of the customer.
- `input.customerContact.givenName` (string, **required**) — The given name of the customer.
- `input.customerContact.phone` (PhoneInput, optional) — The phone number of the customer.
- `input.customerInitiatedOn` (string, **required**) — The customer initiated date, in YYYY-MM-DD format, for the card transaction dispute.
- `input.subscriberNote` (string, optional) — The subscriber note for the card transaction dispute. Maximum length is 2048.

**Returns** `PaymentCardTransactionDispute` — fields: `amount`, `category`, `createdAt`, `customerClaimType`, `id`, `liability`, `provisionalCreditHistory`, `status`, `updatedAt`.

**Throws** `HighnoteUserError`, `HighnoteAccessDeniedError`, `HighnoteUnexpectedResponseError`.

**Example**

```ts
import {
  PaymentCardDisputeCategoryType,
  PaymentCardDisputeCustomerClaimType,
} from "@highnote-oss/nodejs-sdk";

const dispute = await client.disputes.initiate({
  cardTransactionEventId: "te_...",
  amount: { value: "50.00", currencyCode: "USD" },
  category: PaymentCardDisputeCategoryType.FRAUD,
  customerClaimType: PaymentCardDisputeCustomerClaimType.VERBAL,
  customerContact: {
    givenName: "Jane",
    familyName: "Doe",
    email: "jane@example.com",
  },
  customerInitiatedOn: "2026-03-18",
});
```
