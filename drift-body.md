## Schema Drift Detected

Highest criticality in the last 14 days: **BREAKING** (across 7 deployments).

### ⚠️ Breaking changes detected — triage required

Each path below was removed or modified incompatibly upstream. For each:

1. `rg "<path>" src/resources/` — does any resource code reference it?
2. **Hit:** patch the affected resource in this PR (rename method, drop resource, etc.) before merging. CI's typecheck will fail otherwise.
3. **Miss:** schema-level break, no SDK consumer impact — safe to merge as docs-only refresh.

- **`UpdatePricingConfigurationPayload`** — Type 'UpdatePricingConfigurationPayload' was removed
- **`UpdatePricingConfigurationInput`** — Type 'UpdatePricingConfigurationInput' was removed
- **`Mutation.updatePricingConfiguration`** — Field 'updatePricingConfiguration' was removed from object type 'Mutation'
- **`TransactionBatch.merchantAcceptorId`** — Field 'merchantAcceptorId' was removed from object type 'TransactionBatch'
- **`TransactionBatchStatus.PAYOUT_SENT`** — Enum value 'PAYOUT_SENT' was removed from enum 'TransactionBatchStatus'
- **`CryptoFundingFlowTransfer.postedAt`** — Field 'postedAt' was removed from object type 'CryptoFundingFlowTransfer'

### Deployments included

<details><summary><strong>2026-06-02</strong> — scl_b7b41c9383d046589f67ca08a2185953 (17 changes)</summary>

**BREAKING** (5)

- `TYPE_REMOVED` `UpdatePricingConfigurationPayload` — Type 'UpdatePricingConfigurationPayload' was removed
- `TYPE_REMOVED` `UpdatePricingConfigurationInput` — Type 'UpdatePricingConfigurationInput' was removed
- `FIELD_REMOVED` `Mutation.updatePricingConfiguration` — Field 'updatePricingConfiguration' was removed from object type 'Mutation'
- `FIELD_REMOVED` `TransactionBatch.merchantAcceptorId` — Field 'merchantAcceptorId' was removed from object type 'TransactionBatch'
- `ENUM_VALUE_REMOVED` `TransactionBatchStatus.PAYOUT_SENT` — Enum value 'PAYOUT_SENT' was removed from enum 'TransactionBatchStatus'

**DANGEROUS** (5)

- `ENUM_VALUE_ADDED` `PricingRuleTrigger.RECURRING` — Enum value 'RECURRING' was added to enum 'PricingRuleTrigger'
- `ENUM_VALUE_ADDED` `PricingRuleFrequency.MONTHLY` — Enum value 'MONTHLY' was added to enum 'PricingRuleFrequency'
- `ENUM_VALUE_ADDED` `TransactionBatchStatus.PAYOUT_COMPLETE` — Enum value 'PAYOUT_COMPLETE' was added to enum 'TransactionBatchStatus'
- `ENUM_VALUE_ADDED` `TransactionBatchStatus.PAYOUT_PENDING` — Enum value 'PAYOUT_PENDING' was added to enum 'TransactionBatchStatus'
- `ENUM_VALUE_ADDED` `TransactionBatchStatus.PAYOUT_FAILED` — Enum value 'PAYOUT_FAILED' was added to enum 'TransactionBatchStatus'

**NON_BREAKING** (7)

- `TYPE_ADDED` `OnDemandPricingCharge` — Type 'OnDemandPricingCharge' was added
- `TYPE_ADDED` `OnDemandPricingChargeImpact` — Type 'OnDemandPricingChargeImpact' was added
- `TYPE_ADDED` `OnDemandPricingChargeCalculationMetadata` — Type 'OnDemandPricingChargeCalculationMetadata' was added
- `TYPE_ADDED` `OnDemandPricingPerItemCalculation` — Type 'OnDemandPricingPerItemCalculation' was added
- `TYPE_ADDED` `OnDemandPricingPercentageCalculation` — Type 'OnDemandPricingPercentageCalculation' was added
- `TYPE_ADDED` `TransactionBatchOwner` — Type 'TransactionBatchOwner' was added
- `FIELD_ADDED` `TransactionBatch.owner` — Field 'owner' was added to object type 'TransactionBatch'

</details>

<details><summary><strong>2026-05-27</strong> — scl_15557885667544dcb79a70b89849831e (16 changes)</summary>

**NON_BREAKING** (16)

- `TYPE_ADDED` `MerchantStatus` — Type 'MerchantStatus' was added
- `TYPE_ADDED` `AcquiringMerchantType` — Type 'AcquiringMerchantType' was added
- `TYPE_ADDED` `PayfacStatus` — Type 'PayfacStatus' was added
- `TYPE_ADDED` `IsoStatus` — Type 'IsoStatus' was added
- `TYPE_ADDED` `MerchantPayfacRelationship` — Type 'MerchantPayfacRelationship' was added
- `TYPE_ADDED` `MerchantPayfacRelationshipConnection` — Type 'MerchantPayfacRelationshipConnection' was added
- `TYPE_ADDED` `MerchantPayfacRelationshipEdge` — Type 'MerchantPayfacRelationshipEdge' was added
- `TYPE_ADDED` `PayfacIsoPartnership` — Type 'PayfacIsoPartnership' was added
- `TYPE_ADDED` `PayfacIsoPartnershipConnection` — Type 'PayfacIsoPartnershipConnection' was added
- `TYPE_ADDED` `PayfacIsoPartnershipEdge` — Type 'PayfacIsoPartnershipEdge' was added
- `TYPE_ADDED` `Merchant` — Type 'Merchant' was added
- `TYPE_ADDED` `MerchantConnection` — Type 'MerchantConnection' was added
- `TYPE_ADDED` `MerchantEdge` — Type 'MerchantEdge' was added
- `TYPE_ADDED` `Payfac` — Type 'Payfac' was added
- `TYPE_ADDED` `Iso` — Type 'Iso' was added
- `TYPE_ADDED` `BusinessService` — Type 'BusinessService' was added

</details>

<details><summary><strong>2026-05-27</strong> — scl_ecaa8e7132574ef39e6202790d96c63f (1 change)</summary>

**NON_BREAKING** (1)

- `FIELD_ADDED` `BalanceNotificationEvent.accountingDirection` — Field 'accountingDirection' was added to object type 'BalanceNotificationEvent'

</details>

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

### Review checklist

- [ ] If `breaking_count > 0`: triage each path per the guidance above
- [ ] Skim the docs diff (`docs/SDK_REFERENCE.md`, `docs/resources/*.md`) for new/renamed types
- [ ] Decide version bump: patch (docs/desc only), minor (new fields/enums), major (SDK surface broke)

> Body generated by `scripts/fetch-schema-changelog.ts` from `Query.schemaChangelogs` (env: `test`, lookback: 14 days).