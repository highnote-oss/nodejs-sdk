### client.externalAccounts

#### `addNonVerified(input)`

Add a non-verified external US financial bank account.

**Parameters**

- `input.accountHolderId` (string, **required**) — The identifier of an Account holder
- `input.accountNumber` (string, **required**) — The account number of the bank account
- `input.bankAccountType` (BankAccountType, **required**) — The type of bank account (Checking or Savings)
- `input.name` (string, optional) — An optional nick name for the bank account
- `input.routingNumber` (string, **required**) — The routing number of the bank account

**Returns** `NonVerifiedExternalUSFinancialBankAccount` — fields: `createdAt`, `externalBankAccountDetails`, `id`, `name`, `updatedAt`.

**Throws** `HighnoteUserError`, `HighnoteAccessDeniedError`, `HighnoteUnexpectedResponseError`.

**Example**

```ts
const account = await client.externalAccounts.addNonVerified({
  accountHolderId: "ah_...",
  routingNumber: "091000019",
  accountNumber: "123456789",
  bankAccountType: BankAccountType.CHECKING,
  name: "Manual Checking",
});
```

#### `addVerifiedThroughFinicity(input)`

Add an external bank account verified through Finicity.

**Parameters**

- `input.accountHolderId` (string, **required**) — The Global ID of the account holder for whom bank account is added.
- `input.bankAccountType` (BankAccountType, **required**) — The type of bank account (Checking or Savings)
- `input.externalToken.customerId` (string, **required**) — A pseudo customer ID that Highnote will use to retrieve data via Finicity's 3PA integration.
- `input.externalToken.products` (FinicityProduct[], optional) — An array of products/api-endpoints that Highnote can use to retrieve users' financial data.
- `input.externalToken.receiptId` (string, **required**) — Proof of user consent to share financial data with Highnote.
- `input.name` (string, **required**) — The account name from the institution that Finicity's Get Customer Account API must return.

**Returns** `ExternalFinancialBankAccount` — fields: `createdAt`, `externalBankAccountDetails`, `id`, `name`, `updatedAt`.

**Throws** `HighnoteUserError`, `HighnoteAccessDeniedError`, `HighnoteUnexpectedResponseError`.

**Example**

```ts
const account = await client.externalAccounts.addVerifiedThroughFinicity({
  accountHolderId: "ah_...",
  name: "My Checking",
  bankAccountType: BankAccountType.CHECKING,
  externalToken: { customerId: "cust_..." },
});
```

#### `addVerifiedThroughPlaid(input)`

Add an external bank account verified through Plaid.

**Parameters**

- `input.accountHolderId` (string, **required**) — The Global ID of the account holder for whom bank account is added.
- `input.externalToken.value` (string, **required**) — A token provided by a third-party (e.g. Plaid) that Highnote can use to securely fetch an account holder's bank details.

**Returns** `ExternalFinancialBankAccount` — fields: `createdAt`, `externalBankAccountDetails`, `id`, `name`, `updatedAt`.

**Throws** `HighnoteUserError`, `HighnoteAccessDeniedError`, `HighnoteUnexpectedResponseError`.

**Example**

```ts
const account = await client.externalAccounts.addVerifiedThroughPlaid({
  accountHolderId: "ah_...",
  externalToken: { value: "plaid_token_..." },
});
```
