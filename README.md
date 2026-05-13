# @highnote-oss/nodejs-sdk

[![npm version](https://img.shields.io/npm/v/@highnote-oss/nodejs-sdk.svg)](https://www.npmjs.com/package/@highnote-oss/nodejs-sdk)
[![CI](https://github.com/highnote-oss/nodejs-sdk/actions/workflows/ci.yml/badge.svg)](https://github.com/highnote-oss/nodejs-sdk/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

TypeScript server SDK for the [Highnote](https://highnote.com) GraphQL API. Resource-oriented — no GraphQL knowledge required.

## Installation

```bash
npm install @highnote-oss/nodejs-sdk
```

## Quick Start

```typescript
import {
  Highnote,
  PaymentCardClientTokenPermission,
  PhoneLabel,
} from "@highnote-oss/nodejs-sdk";

const client = new Highnote({
  apiKey: "sk_test_...",
  environment: "test", // "test" | "live"
});

// Create an account holder
const holder = await client.accountHolders.createUSPerson({
  personAccountHolder: {
    name: { givenName: "Jane", familyName: "Doe" },
    dateOfBirth: "1990-01-15",
    email: "jane@example.com",
    billingAddress: {
      streetAddress: "123 Main St",
      locality: "San Francisco",
      region: "CA",
      postalCode: "94105",
      countryCodeAlpha3: "USA",
    },
    phoneNumber: {
      countryCode: "1",
      number: "5551234567",
      label: PhoneLabel.MOBILE,
    },
  },
});

// Issue a card
const card = await client.cards.issue({
  financialAccountId: "fa_...",
  options: { activateOnCreate: true, expirationDate: "2028-12-31T00:00:00Z" },
});

// Generate a client token for the frontend card viewer
const token = await client.clientTokens.createForPaymentCard({
  paymentCardId: card.id,
  permissions: [PaymentCardClientTokenPermission.READ_RESTRICTED_DETAILS],
});

// List card products (auto-paginated)
for await (const product of client.cardProducts.list()) {
  console.log(product.name);
}
```

## Resources

<!-- resources:start -->
| Resource | Methods | Status |
|----------|---------|--------|
| `accountHolders` | `createUSPerson()`, `get()`, `listBusinesses()`, `listPersons()`, `searchBusinesses()`, `searchPersons()` | Available |
| `ach` | `cancelTransfer()`, `createOneTimeTransfer()`, `createRecurringTransfer()`, `initiateTransfer()` | Available |
| `addresses` | `validate()` | Available |
| `applications` | `create()`, `get()` | Available |
| `cardProducts` | `get()`, `list()` | Available |
| `cards` | `activate()`, `cancelPhysicalOrder()`, `close()`, `findATMLocations()`, `get()`, `issue()`, `orderPhysical()`, `orderPhysicalWithValidatedAddress()`, `reissue()`, `suspend()` | Available |
| `clientTokens` | `createForDocumentUpload()`, `createForPaymentCard()`, `createForTokenization()` | Available |
| `collaborativeAuth` | `activateEndpoint()`, `addEndpoint()`, `deactivateEndpoint()` | Available |
| `digitalWallets` | `addToApplePay()`, `addToGooglePay()` | Available |
| `disputes` | `get()`, `initiate()` | Available |
| `documents` | `createUploadLink()`, `endSession()`, `startSession()` | Available |
| `externalAccounts` | `addNonVerified()`, `addVerifiedThroughFinicity()`, `addVerifiedThroughPlaid()` | Available |
| `financialAccounts` | `get()`, `issue()`, `listActivities()`, `listReviewWorkflowEvents()`, `suspend()`, `unsuspend()` | Available |
| `provisioning` | `create()` | Available |
| `spendRules` | `attachToCard()`, `createAmountLimit()`, `createMerchantCategory()`, `detachFromCard()` | Available |
| `transactions` | `list()` | Available |
| `transfers` | `initiateBetweenAccounts()` | Available |
| `webhooks` | `activate()`, `add()`, `addSubscriptions()`, `deactivate()`, `get()`, `list()`, `listEvents()`, `remove()`, `removeEmail()`, `removeSubscriptions()`, `rename()`, `replay()`, `rotateSigningKey()`, `setEmail()` | Available |
<!-- resources:end -->

## Configuration

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `apiKey` | `string` | *required* | Highnote API key (`sk_test_...` or `sk_live_...`) |
| `environment` | `"test" \| "live"` | `"test"` | API environment |
| `baseUrl` | `string` | — | Override API URL (for proxies/mocking) |
| `defaultPageSize` | `number` | `20` | Items per page for paginated queries |

## Exported Enums

The SDK exports enums for properly typing inputs — no `as any` needed:

| Enum | Used For |
|------|----------|
| `PhoneLabel` | Account holder phone numbers (`MOBILE`, `HOME`, `WORK`, `SUPPORT`) |
| `PaymentCardClientTokenPermission` | Client token permissions (`READ_RESTRICTED_DETAILS`, `SET_PAYMENT_CARD_PIN`, etc.) |
| `GeneratePaymentMethodTokenizationClientTokenPermission` | Tokenization permissions |
| `PaymentCardStatus` | Card status (`ACTIVE`, `SUSPENDED`, `CLOSED`, `ACTIVATION_REQUIRED`) |
| `PaymentCardOrderStatus` | Physical card order status (`NEW`, `APPROVED`, `SHIPPED`, `CANCELED`, etc.) |
| `CardFormFactor` | Card form factor (`PHYSICAL`, `VIRTUAL`) |
| `FinancialAccountStatus` | Account status (`ACTIVE`, `SUSPENDED`, `CLOSED`, `PENDING_CLOSURE`) |
| `FinancialAccountSuspensionReasonInput` | Suspension reason (`ACCOUNT_HOLDER_REQUEST`, `SUSPECTED_FRAUD`, etc.) |
| `AccountHolderApplicationStatusCode` | Application status (`APPROVED`, `DENIED`, `IN_REVIEW`, `PENDING`, `CLOSED`) |
| `PaymentTransactionStatus` | Transaction status (`AUTHORIZED`, `CAPTURED`, etc.) |
| `TransferPurpose` | Transfer purpose (`GENERAL`, `LOAN_ADVANCE`, `REFUND_OR_REVERSAL`, etc.) |
| `InterFinancialAccountTransferStatus` | Transfer status |
| `NotificationEventName` | Webhook event subscriptions (50+ events) |
| `NotificationTargetStatus` | Webhook target status (`ACTIVE`, `PENDING_VERIFICATION`, `DEACTIVATED`) |
| `DocumentType` | Document upload type (`DRIVERS_LICENSE`, `BANK_STATEMENT`, etc.) |
| `DocumentUploadSessionStatusCode` | Upload session status (`CREATED`, `INITIATED`, `SUBMITTED`, etc.) |
| `PaymentCardDigitalWalletDeviceType` | Device type for wallet provisioning (`MOBILE`, `TABLET`, `WATCH`) |
| `CollaborativeAuthorizationEndpointStatus` | Auth endpoint status (`ACTIVE`, `PENDING_VERIFICATION`, `DEACTIVATED`) |
| `PaymentCardDisputeStatus` | Dispute status (`INITIATED`, `IN_PROGRESS`, `WON`, `LOST`, etc.) |
| `PaymentCardDisputeCategoryType` | Dispute category (`FRAUD`, `CUSTOMER_DISPUTE`, `AUTHORIZATION`, `PROCESSING_ERROR`) |
| `PaymentCardDisputeCustomerClaimType` | Customer claim type (`VERBAL`, `WRITTEN`) |
| `PaymentCardChargebackStatus` | Chargeback status (`SUBMITTED`, `RECEIVED`, `WON`, `LOST`, etc.) |
| `BankAccountType` | External bank account type (`CHECKING`, `SAVINGS`) |
| `AchTransferPurpose` | ACH transfer purpose (`DEPOSIT`, `WITHDRAWAL`, `PAYROLL`, etc.) |

## Error Handling

The SDK throws typed exceptions when the API returns error union members:

```typescript
import {
  HighnoteUserError,
  HighnoteAccessDeniedError,
} from "@highnote-oss/nodejs-sdk";

try {
  await client.cardProducts.get("invalid_id");
} catch (err) {
  if (err instanceof HighnoteUserError) {
    // fieldErrors: Array<{ code?: string, description?: string }>
    console.error("Validation errors:", err.fieldErrors);
  } else if (err instanceof HighnoteAccessDeniedError) {
    console.error("Permission denied:", err.message);
  }
}
```

## Pagination

All `.list()` methods return async iterables with lazy page fetching:

```typescript
// Iterate all items (fetches pages on demand)
for await (const product of client.cardProducts.list()) {
  console.log(product.name);
}

// Custom page size
for await (const product of client.cardProducts.list({ pageSize: 10 })) {
  // ...
}

// Break early — no extra pages fetched
for await (const product of client.cardProducts.list()) {
  if (product.name === "Target") break;
}
```

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for setup, development workflow, and how to add new resources.

## License

MIT
