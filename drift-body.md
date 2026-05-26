## Schema Drift Detected

Highest criticality in the last 14 days: **BREAKING** (across 7 deployments).

### ⚠️ Breaking changes detected — triage required

Each path below was removed or modified incompatibly upstream. For each:

1. `rg "<path>" src/resources/` — does any resource code reference it?
2. **Hit:** patch the affected resource in this PR (rename method, drop resource, etc.) before merging. CI's typecheck will fail otherwise.
3. **Miss:** schema-level break, no SDK consumer impact — safe to merge as docs-only refresh.

- **`CryptoFundingFlowTransfer.postedAt`** — Field 'postedAt' was removed from object type 'CryptoFundingFlowTransfer'
- **`CryptoFundingFlowTransfer.ledgers`** — Field 'ledgers' was removed from object type 'CryptoFundingFlowTransfer'
- **`CryptoFundingFlowProcessedEvent.postedAt`** — Field 'postedAt' was removed from object type 'CryptoFundingFlowProcessedEvent'
- **`Query.businessesWithAccountHolderDetails`** — Field 'businessesWithAccountHolderDetails' was removed from object type 'Query'
- **`Query.businessesWithMerchantDetails`** — Field 'businessesWithMerchantDetails' was removed from object type 'Query'

### Deployments included

<details><summary><strong>2026-05-22</strong> — scl_af296ed6d6c145258367bb21e8824279 (5 changes)</summary>

**BREAKING** (1)

- `FIELD_REMOVED` `CryptoFundingFlowTransfer.postedAt` — Field 'postedAt' was removed from object type 'CryptoFundingFlowTransfer'

**DANGEROUS** (1)

- `INPUT_FIELD_ADDED` `PaymentCardDeliveryDetailsInput.additionalInformation` — Input field 'additionalInformation' of type 'AdditionalRecipientInformationInput' was added to input object type 'PaymentCardDeliveryDetailsInput'

**NON_BREAKING** (3)

- `TYPE_ADDED` `AdditionalRecipientInformationInput` — Type 'AdditionalRecipientInformationInput' was added
- `TYPE_ADDED` `AdditionalRecipientInformation` — Type 'AdditionalRecipientInformation' was added
- `FIELD_ADDED` `PaymentCardDeliveryDetails.additionalInformation` — Field 'additionalInformation' was added to object type 'PaymentCardDeliveryDetails'

</details>

<details><summary><strong>2026-05-22</strong> — scl_5356a953be2347018c3ba6b95e7605c2 (2 changes)</summary>

**DANGEROUS** (2)

- `ENUM_VALUE_ADDED` `TransactionEventResponseCode.RESTRICTED_ACCOUNT_HOLDER` — Enum value 'RESTRICTED_ACCOUNT_HOLDER' was added to enum 'TransactionEventResponseCode'
- `ENUM_VALUE_ADDED` `TransactionEventResponseCode.RESTRICTED_CARD_HOLDER` — Enum value 'RESTRICTED_CARD_HOLDER' was added to enum 'TransactionEventResponseCode'

</details>

<details><summary><strong>2026-05-22</strong> — scl_6446bd7a63234ad38719c767520acf85 (8 changes)</summary>

**DANGEROUS** (3)

- `INPUT_FIELD_ADDED` `ForceCapturePaymentTransactionInput.amount` — Input field 'amount' of type 'AmountInput' was added to input object type 'ForceCapturePaymentTransactionInput'
- `UNION_MEMBER_ADDED` `TransactionSearchSource` — Member 'NonOriginatedRtpTransfer' was added to Union type 'TransactionSearchSource'
- `UNION_MEMBER_ADDED` `TransactionSearchSource` — Member 'NonOriginatedRtpTransferEvent' was added to Union type 'TransactionSearchSource'

**NON_BREAKING** (5)

- `TYPE_ADDED` `PaymentTransactionPaymentMethodInput` — Type 'PaymentTransactionPaymentMethodInput' was added
- `TYPE_ADDED` `ForceStandaloneCapturePaymentInput` — Type 'ForceStandaloneCapturePaymentInput' was added
- `FIELD_ADDED` `Mutation.forceStandaloneCapturePayment` — Field 'forceStandaloneCapturePayment' was added to object type 'Mutation'
- `FIELD_DEPRECATION_ADDED` `BalanceNotificationEvent.balance` — Field 'BalanceNotificationEvent.balance' is deprecated
- `FIELD_DEPRECATION_REASON_ADDED` `BalanceNotificationEvent.balance` — Field 'BalanceNotificationEvent.balance' has deprecation reason 'Use ledger { creditBalance debitBalance } instead. The ledger field exposes the balance in the canonical Ledger shape — `creditBalance` and `debitBalance` form a magnitude pair (one carries the value, the other is zero). Combined with `ledger.normalBalance`, these surface the correct sign across all ledger types.'

</details>

<details><summary><strong>2026-05-20</strong> — scl_ad93ba0098c245b3b80b05920fcb17d8 (20 changes)</summary>

**DANGEROUS** (15)

- `OBJECT_TYPE_INTERFACE_ADDED` `USBusinessUltimateBeneficialOwner` — 'USBusinessUltimateBeneficialOwner' object implements 'BusinessUltimateBeneficialOwner' interface
- `INPUT_FIELD_ADDED` `BusinessFilterInput.businessProfile` — Input field 'businessProfile' of type 'BusinessAccountHolderBusinessProfileFilterInput' was added to input object type 'BusinessFilterInput'
- `INPUT_FIELD_ADDED` `BusinessFilterInput.externalId` — Input field 'externalId' of type 'IDFilterInput' was added to input object type 'BusinessFilterInput'
- `INPUT_FIELD_ADDED` `BusinessFilterInput.primaryAuthorizedPerson` — Input field 'primaryAuthorizedPerson' of type 'BusinessAccountHolderPrimaryAuthorizedPersonFilterInput' was added to input object type 'BusinessFilterInput'
- `UNION_MEMBER_ADDED` `NotificationEventNode` — Member 'OriginatedRtpTransferEvent' was added to Union type 'NotificationEventNode'
- `UNION_MEMBER_ADDED` `NotificationEventNode` — Member 'NonOriginatedRtpTransferEvent' was added to Union type 'NotificationEventNode'
- `ENUM_VALUE_ADDED` `NotificationEventName.ORIGINATED_RTP_TRANSFER_INITIATED_EVENT` — Enum value 'ORIGINATED_RTP_TRANSFER_INITIATED_EVENT' was added to enum 'NotificationEventName'
- `ENUM_VALUE_ADDED` `NotificationEventName.ORIGINATED_RTP_TRANSFER_PENDING_EVENT` — Enum value 'ORIGINATED_RTP_TRANSFER_PENDING_EVENT' was added to enum 'NotificationEventName'
- `ENUM_VALUE_ADDED` `NotificationEventName.ORIGINATED_RTP_TRANSFER_PROCESSING_EVENT` — Enum value 'ORIGINATED_RTP_TRANSFER_PROCESSING_EVENT' was added to enum 'NotificationEventName'
- `ENUM_VALUE_ADDED` `NotificationEventName.ORIGINATED_RTP_TRANSFER_COMPLETED_EVENT` — Enum value 'ORIGINATED_RTP_TRANSFER_COMPLETED_EVENT' was added to enum 'NotificationEventName'
- `ENUM_VALUE_ADDED` `NotificationEventName.ORIGINATED_RTP_TRANSFER_FAILED_EVENT` — Enum value 'ORIGINATED_RTP_TRANSFER_FAILED_EVENT' was added to enum 'NotificationEventName'
- `ENUM_VALUE_ADDED` `NotificationEventName.NON_ORIGINATED_RTP_TRANSFER_RECEIVED_EVENT` — Enum value 'NON_ORIGINATED_RTP_TRANSFER_RECEIVED_EVENT' was added to enum 'NotificationEventName'
- `ENUM_VALUE_ADDED` `NotificationEventName.NON_ORIGINATED_RTP_TRANSFER_PROCESSING_EVENT` — Enum value 'NON_ORIGINATED_RTP_TRANSFER_PROCESSING_EVENT' was added to enum 'NotificationEventName'
- `ENUM_VALUE_ADDED` `NotificationEventName.NON_ORIGINATED_RTP_TRANSFER_COMPLETED_EVENT` — Enum value 'NON_ORIGINATED_RTP_TRANSFER_COMPLETED_EVENT' was added to enum 'NotificationEventName'
- `ENUM_VALUE_ADDED` `NotificationEventName.NON_ORIGINATED_RTP_TRANSFER_FAILED_EVENT` — Enum value 'NON_ORIGINATED_RTP_TRANSFER_FAILED_EVENT' was added to enum 'NotificationEventName'

**NON_BREAKING** (5)

- `TYPE_ADDED` `BusinessUltimateBeneficialOwner` — Type 'BusinessUltimateBeneficialOwner' was added
- `TYPE_ADDED` `MerchantAcceptor` — Type 'MerchantAcceptor' was added
- `TYPE_ADDED` `MerchantAcceptorDetails` — Type 'MerchantAcceptorDetails' was added
- `TYPE_ADDED` `MerchantAcceptorProcessorConfiguration` — Type 'MerchantAcceptorProcessorConfiguration' was added
- `FIELD_ADDED` `OnboardingIdentificationDocument.nationalIdentificationDocument` — Field 'nationalIdentificationDocument' was added to object type 'OnboardingIdentificationDocument'

</details>

<details><summary><strong>2026-05-18</strong> — scl_da09dbfb92a843e890dbd4358b9a0bec (10 changes)</summary>

**NON_BREAKING** (10)

- `TYPE_ADDED` `SignedInt` — Type 'SignedInt' was added
- `TYPE_ADDED` `SignedAmount` — Type 'SignedAmount' was added
- `TYPE_ADDED` `TransactionBatch` — Type 'TransactionBatch' was added
- `TYPE_ADDED` `TransactionBatchFee` — Type 'TransactionBatchFee' was added
- `TYPE_ADDED` `BatchHold` — Type 'BatchHold' was added
- `TYPE_ADDED` `ReserveHold` — Type 'ReserveHold' was added
- `TYPE_ADDED` `BatchAdjustment` — Type 'BatchAdjustment' was added
- `TYPE_ADDED` `CashAdvanceRepayment` — Type 'CashAdvanceRepayment' was added
- `TYPE_ADDED` `TransactionBatchProcessingFee` — Type 'TransactionBatchProcessingFee' was added
- `TYPE_ADDED` `TransactionBatchStatus` — Type 'TransactionBatchStatus' was added

</details>

<details><summary><strong>2026-05-15</strong> — scl_adf502e4a90f4e14aa5f382bfeaf5e0e (19 changes)</summary>

**BREAKING** (2)

- `FIELD_REMOVED` `CryptoFundingFlowTransfer.ledgers` — Field 'ledgers' was removed from object type 'CryptoFundingFlowTransfer'
- `FIELD_REMOVED` `CryptoFundingFlowProcessedEvent.postedAt` — Field 'postedAt' was removed from object type 'CryptoFundingFlowProcessedEvent'

**DANGEROUS** (15)

- `ENUM_VALUE_ADDED` `LedgerName.ACCOUNT_RECEIVABLE_HOLD` — Enum value 'ACCOUNT_RECEIVABLE_HOLD' was added to enum 'LedgerName'
- `ENUM_VALUE_ADDED` `LedgerName.CASH_ADVANCE_OUTSTANDING` — Enum value 'CASH_ADVANCE_OUTSTANDING' was added to enum 'LedgerName'
- `ENUM_VALUE_ADDED` `LedgerName.CASH_ADVANCE_PAYABLE` — Enum value 'CASH_ADVANCE_PAYABLE' was added to enum 'LedgerName'
- `ENUM_VALUE_ADDED` `LedgerName.CASH_ADVANCE_PRINCIPAL` — Enum value 'CASH_ADVANCE_PRINCIPAL' was added to enum 'LedgerName'
- `ENUM_VALUE_ADDED` `LedgerName.CASH_ADVANCE_RECEIVABLE` — Enum value 'CASH_ADVANCE_RECEIVABLE' was added to enum 'LedgerName'
- `ENUM_VALUE_ADDED` `LedgerName.CASH_ADVANCE_REPAID` — Enum value 'CASH_ADVANCE_REPAID' was added to enum 'LedgerName'
- `ENUM_VALUE_ADDED` `LedgerName.CONTRA_EXTERNAL_FUNDING` — Enum value 'CONTRA_EXTERNAL_FUNDING' was added to enum 'LedgerName'
- `ENUM_VALUE_ADDED` `LedgerName.FEE_PAYABLE` — Enum value 'FEE_PAYABLE' was added to enum 'LedgerName'
- `ENUM_VALUE_ADDED` `LedgerName.FEE_RECEIVABLE` — Enum value 'FEE_RECEIVABLE' was added to enum 'LedgerName'
- `UNION_MEMBER_ADDED` `FinancialEvent` — Member 'CryptoFundingFlowProcessedEvent' was added to Union type 'FinancialEvent'
- `ENUM_VALUE_ADDED` `BalanceNotificationSubeventType.CRYPTO_PAYOUT` — Enum value 'CRYPTO_PAYOUT' was added to enum 'BalanceNotificationSubeventType'
- `OBJECT_TYPE_INTERFACE_ADDED` `CryptoFundingFlowReceivedEvent` — 'CryptoFundingFlowReceivedEvent' object implements 'CryptoFundingFlowEvent' interface
- `OBJECT_TYPE_INTERFACE_ADDED` `CryptoFundingFlowProcessingEvent` — 'CryptoFundingFlowProcessingEvent' object implements 'CryptoFundingFlowEvent' interface
- `OBJECT_TYPE_INTERFACE_ADDED` `CryptoFundingFlowProcessedEvent` — 'CryptoFundingFlowProcessedEvent' object implements 'CryptoFundingFlowEvent' interface
- `OBJECT_TYPE_INTERFACE_ADDED` `CryptoFundingFlowFailedEvent` — 'CryptoFundingFlowFailedEvent' object implements 'CryptoFundingFlowEvent' interface

**NON_BREAKING** (2)

- `TYPE_ADDED` `CryptoFundingFlowEvent` — Type 'CryptoFundingFlowEvent' was added
- `FIELD_ADDED` `CryptoFundingFlowTransfer.events` — Field 'events' was added to object type 'CryptoFundingFlowTransfer'

</details>

<details><summary><strong>2026-05-13</strong> — scl_9d3d866e6966409281fe44023decc448 (6 changes)</summary>

**BREAKING** (2)

- `FIELD_REMOVED` `Query.businessesWithAccountHolderDetails` — Field 'businessesWithAccountHolderDetails' was removed from object type 'Query'
- `FIELD_REMOVED` `Query.businessesWithMerchantDetails` — Field 'businessesWithMerchantDetails' was removed from object type 'Query'

**DANGEROUS** (1)

- `ENUM_VALUE_ADDED` `RtpTransferStatus.RECEIVED` — Enum value 'RECEIVED' was added to enum 'RtpTransferStatus'

**NON_BREAKING** (3)

- `FIELD_ADDED` `Query.businesses` — Field 'businesses' was added to object type 'Query'
- `FIELD_DEPRECATION_ADDED` `Query.businessesForSubscriber` — Field 'Query.businessesForSubscriber' is deprecated
- `FIELD_DEPRECATION_REASON_ADDED` `Query.businessesForSubscriber` — Field 'Query.businessesForSubscriber' has deprecation reason 'Please use `businesses` instead.'

</details>

### Review checklist

- [ ] If `breaking_count > 0`: triage each path per the guidance above
- [ ] Skim the docs diff (`docs/SDK_REFERENCE.md`, `docs/resources/*.md`) for new/renamed types
- [ ] Decide version bump: patch (docs/desc only), minor (new fields/enums), major (SDK surface broke)

> Body generated by `scripts/fetch-schema-changelog.ts` from `Query.schemaChangelogs` (env: `test`, lookback: 14 days).