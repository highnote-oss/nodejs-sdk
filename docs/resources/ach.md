### client.ach

#### `cancelTransfer(input)`

Cancel a scheduled (one-time or recurring) ACH transfer.

**Parameters**

- `input.scheduledTransferId` (string, **required**) — Global ID used to reference the scheduled transfer

**Returns** `CancelledTransfer`.

**Throws** `HighnoteUserError`, `HighnoteAccessDeniedError`, `HighnoteUnexpectedResponseError`.

**Example**

```ts
await client.ach.cancelTransfer({ scheduledTransferId: "st_..." });
```

#### `createOneTimeTransfer(input)`

Schedule a one-time ACH transfer for a future date.

**Parameters**

- `input.descriptor.companyEntryDescription` (string, **required**) — Company entered value for the type of ACH.

  It can be at most 10 characters. The characters should be alphanumeric.
- `input.descriptor.individualIdentificationNumber` (string, optional) — Receiver’s identification number set by the bank initiating the ACH entry.

  This can be at most 15 characters. The characters should be alphanumeric.
- `input.descriptor.individualName` (string, **required**) — Receiver’s individual name set by the bank initiating the ACH entry.

  This could be a person or a business. It can be at most 22 characters. The characters should be alphanumeric.
- `input.fromFinancialAccountId` (string, **required**) — The ID of the `FinancialAccount` the funds will be coming from.

  Exactly one of `fromFinancialAccountId` and `toFinancialAccountId` will reference an external account id and the other will reference a Highnote account.
- `input.toFinancialAccountId` (string, **required**) — Exactly one of `fromFinancialAccountId` and `toFinancialAccountId` will reference an external account id and the other will reference a Highnote account.
- `input.transferAgreementConsent.authorizedPersonId` (string, **required**) — The ID of the individual who is authorizing the transfer
- `input.transferAgreementConsent.consentTimestamp` (string, **required**) — The date and time, in ISO 8601 format, marking when the primary authorized person or person account holder gave consent for the transfer.

  For example, `2022-01-01T22:00:00.000Z`.
- `input.transferAgreementConsent.template.consentTemplateId` (string, **required**) — The id indicating which consent was recorded.
- `input.transferAgreementConsent.template.consentTemplateVersion` (string, **required**) — The version of the template id.
- `input.transferAmountStrategy.balanceAmountType` (TransferBalanceAmountCode, optional) — A calculated balance amount
- `input.transferAmountStrategy.transferAmount` (AmountInput, optional) — An amount to be transferred
- `input.transferDateStrategy` (TransferDateStrategyInput, optional) — The strategy for the transfer date

**Returns** `OneTimeACHTransfer` — fields: `createdAt`, `id`, `scheduledTransferDate`, `status`, `transferAmount`, `updatedAt`.

**Throws** `HighnoteUserError`, `HighnoteAccessDeniedError`, `HighnoteUnexpectedResponseError`.

**Example**

```ts
const scheduled = await client.ach.createOneTimeTransfer({
  financialAccountId: "fa_...",
  externalAccountId: "ea_...",
  amount: { value: 5000, currencyCode: "USD" },
  purpose: AchTransferPurpose.WITHDRAWAL,
  scheduledDate: "2026-06-01",
});
```

#### `createRecurringTransfer(input)`

Schedule a recurring ACH transfer (e.g., payroll, monthly deposits).

**Parameters**

- `input.descriptor.companyEntryDescription` (string, **required**) — Company entered value for the type of ACH.

  It can be at most 10 characters. The characters should be alphanumeric.
- `input.descriptor.individualIdentificationNumber` (string, optional) — Receiver’s identification number set by the bank initiating the ACH entry.

  This can be at most 15 characters. The characters should be alphanumeric.
- `input.descriptor.individualName` (string, **required**) — Receiver’s individual name set by the bank initiating the ACH entry.

  This could be a person or a business. It can be at most 22 characters. The characters should be alphanumeric.
- `input.frequency` (RecurringAchTransferFrequencyCode, **required**) — The frequency of the scheduled payment
- `input.fromFinancialAccountId` (string, **required**) — The financial account id sending the funds.


  Exactly one of `fromFinancialAccountId` and `toFinancialAccountId` will reference an external account id and the other will reference a Highnote account.
- `input.toFinancialAccountId` (string, **required**) — The financial account id receiving the funds.

  Exactly one of `fromFinancialAccountId` and `toFinancialAccountId` will reference an external account id and the other will reference a Highnote account.
- `input.transferAgreementConsent.authorizedPersonId` (string, **required**) — The ID of the individual who is authorizing the transfer
- `input.transferAgreementConsent.consentTimestamp` (string, **required**) — The date and time, in ISO 8601 format, marking when the primary authorized person or person account holder gave consent for the transfer.

  For example, `2022-01-01T22:00:00.000Z`.
- `input.transferAgreementConsent.template.consentTemplateId` (string, **required**) — The id indicating which consent was recorded.
- `input.transferAgreementConsent.template.consentTemplateVersion` (string, **required**) — The version of the template id.
- `input.transferAmountStrategy.balanceAmountType` (TransferBalanceAmountCode, optional) — A calculated balance amount
- `input.transferAmountStrategy.transferAmount` (AmountInput, optional) — An amount to be transferred
- `input.transferDayStrategy` (TransferDayStrategyInput, optional) — The strategy for the transfer day

**Returns** `RecurringACHTransfer` — fields: `createdAt`, `frequency`, `id`, `status`, `transferAmount`, `updatedAt`.

**Throws** `HighnoteUserError`, `HighnoteAccessDeniedError`, `HighnoteUnexpectedResponseError`.

**Example**

```ts
const recurring = await client.ach.createRecurringTransfer({
  financialAccountId: "fa_...",
  externalAccountId: "ea_...",
  amount: { value: 100000, currencyCode: "USD" },
  purpose: AchTransferPurpose.PAYROLL,
  schedule: { frequency: "BIWEEKLY", startDate: "2026-06-01" },
});
```

#### `initiateTransfer(input)`

Initiate an ACH transfer to or from an external bank account.

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
- `input.cancellationPeriodMillis` (number, optional) — The number of milliseconds after the transfer is initiated during which cancellation is allowed.
  The transfer will not be processed until the cancellation period elapses.

  The default value is 0.
- `input.companyEntryDescription` (string, **required**) — Provides the receiving financial institution with information about the nature or purpose of the transaction.
  Examples include "ACCTVERIFY". "PAYROLL", "PAYMENT", etc.

  Maximum length: 10 characters. The characters should be alphanumeric.
- `input.fromFinancialAccountId` (string, **required**) — The financial account to send funds from.

  This must be a verified external financial account (`ExternalFinancialBankAccount`) id when pulling funds
  and a Highnote `FinancialAccount` id when pushing funds.
- `input.idempotencyKey` (string, **required**) — A value to uniquely distinguish transfers, e.g. a UUID.

  This helps prevent duplicate transfers in error scenarios. If a failure happens and it is unclear
  if a transfer went through, it is safe to repeat the request with the same idempotency key. If the
  transfer already exists, the request will be deduped and the original transfer will be returned
  instead of a new transfer getting created for the same amount. If idempotency key is the same between
  two requests, the other fields will be ignored and the original transfer will be returned.

  This value is required. Maximum length: 255 characters.
- `input.individualIdentificationNumber` (string, optional) — Receiver’s identification number. This could be a person or a business.

  Maximum length: 15 characters. The characters should be alphanumeric.
- `input.individualName` (string, **required**) — Receiver’s individual name. This could be a person or a business.

  Maximum length: 22 characters. The characters should be alphanumeric.
- `input.paymentRelatedInformation` (string, optional) — Contains payment-related information provided by the originator of the transaction.
  It can include free-form text, structured data, or codes. The field supports alphanumeric characters,
  including the following symbols: ! " & ' ( ) \* + , - . / : ; ? = % ~ @ [ ] { } \\ | < > # $.

  **Example:** RMR\*IV\*0123456789\*\*999.99\\.

  Please note that this information may or may not be displayed to the recipient, based on the bank's
  capabilities, and method of access (i.e., online banking, statement, etc.)

  **Maximum length:** 80 characters
- `input.purpose` (AchTransferPurpose, **required**) — The purpose of the transfer, e.g. deposit.
- `input.sameDay` (boolean, optional) — A flag that indicates the desire to process this transaction using same-day ACH.
  Note that this flag is not a guarantee the transaction will be processed the same day.
  Funds availability is highly dependent on the ACH network processing schedule.
- `input.toFinancialAccountId` (string, **required**) — The financial account to send funds to.

  This must be a Highnote `FinancialAccount` id when pulling funds
  and a verified or non-verified external financial account (`ExternalFinancialBankAccount`
  or `NonVerifiedExternalUSFinancialBankAccount`) id when pushing funds.
- `input.transferAgreementConsent.authorizedPersonId` (string, **required**) — The ID of the individual who is authorizing the transfer
- `input.transferAgreementConsent.consentTimestamp` (string, **required**) — The date and time, in ISO 8601 format, marking when the primary authorized person or person account holder gave consent for the transfer.

  For example, `2022-01-01T22:00:00.000Z`.
- `input.transferAgreementConsent.template.consentTemplateId` (string, **required**) — The id indicating which consent was recorded.
- `input.transferAgreementConsent.template.consentTemplateVersion` (string, **required**) — The version of the template id.

**Returns** `OriginatedAchTransfer` — fields: `amount`, `companyEntryDescription`, `createdAt`, `id`, `purpose`, `status`.

**Throws** `HighnoteUserError`, `HighnoteAccessDeniedError`, `HighnoteUnexpectedResponseError`.

**Example**

```ts
const transfer = await client.ach.initiateTransfer({
  financialAccountId: "fa_...",
  externalAccountId: "ea_...",
  amount: { value: 10000, currencyCode: "USD" },
  purpose: AchTransferPurpose.DEPOSIT,
});
```
