## Schema Drift Detected

Highest criticality in the last 14 days: **BREAKING** (across 6 deployments).

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

### Deployments included

<details><summary><strong>2026-06-05</strong> — scl_cf0f677b01434df581a1e0f7cd17649a (7 changes)</summary>

**DANGEROUS** (5)

- `ENUM_VALUE_ADDED` `RewardPointsTransferFailureReasonCode.REDEMPTION_CONFIGURATION_ID_NOT_PROVIDED` — Enum value 'REDEMPTION_CONFIGURATION_ID_NOT_PROVIDED' was added to enum 'RewardPointsTransferFailureReasonCode'
- `ENUM_VALUE_ADDED` `RewardPointsTransferFailureReasonCode.PREPAID_CARD_FEATURE_NOT_ENABLED` — Enum value 'PREPAID_CARD_FEATURE_NOT_ENABLED' was added to enum 'RewardPointsTransferFailureReasonCode'
- `ENUM_VALUE_ADDED` `RewardPointsTransferFailureReasonCode.ACCOUNTS_DO_NOT_BELONG_TO_SAME_PRODUCT` — Enum value 'ACCOUNTS_DO_NOT_BELONG_TO_SAME_PRODUCT' was added to enum 'RewardPointsTransferFailureReasonCode'
- `INPUT_FIELD_ADDED` `CreateRewardRedemptionConfigurationInput.type` — Input field 'type' of type 'RedemptionConfigurationType' was added to input object type 'CreateRewardRedemptionConfigurationInput'
- `ENUM_VALUE_ADDED` `RedemptionConfigurationType.REDEEM_TO_FINANCIAL_ACCOUNT` — Enum value 'REDEEM_TO_FINANCIAL_ACCOUNT' was added to enum 'RedemptionConfigurationType'

**NON_BREAKING** (2)

- `TYPE_ADDED` `RedeemRewardsToFinancialAccountInput` — Type 'RedeemRewardsToFinancialAccountInput' was added
- `FIELD_ADDED` `Mutation.redeemRewardsToFinancialAccount` — Field 'redeemRewardsToFinancialAccount' was added to object type 'Mutation'

</details>

<details><summary><strong>2026-06-04</strong> — scl_9bdd3ad315a24876abdbd59380168f88 (1 change)</summary>

**DANGEROUS** (1)

- `ENUM_VALUE_ADDED` `FinancialAccountStatus.UNACTIVATED` — Enum value 'UNACTIVATED' was added to enum 'FinancialAccountStatus'

</details>

<details><summary><strong>2026-06-03</strong> — scl_0ee7a928dfe040df94645435f12f63c2 (39 changes)</summary>

**DANGEROUS** (4)

- `ENUM_VALUE_ADDED` `LedgerName.PSEUDO_OUTSTANDING_BALANCE_PAYABLE` — Enum value 'PSEUDO_OUTSTANDING_BALANCE_PAYABLE' was added to enum 'LedgerName'
- `ENUM_VALUE_ADDED` `LedgerName.PSEUDO_OUTSTANDING_BALANCE_RECEIVABLE` — Enum value 'PSEUDO_OUTSTANDING_BALANCE_RECEIVABLE' was added to enum 'LedgerName'
- `ENUM_VALUE_ADDED` `LedgerName.DISBURSEMENT_CASH` — Enum value 'DISBURSEMENT_CASH' was added to enum 'LedgerName'
- `ENUM_VALUE_ADDED` `LedgerName.DISBURSEMENT_AVAILABLE_CASH` — Enum value 'DISBURSEMENT_AVAILABLE_CASH' was added to enum 'LedgerName'

**NON_BREAKING** (35)

- `TYPE_ADDED` `BusinessServiceConnection` — Type 'BusinessServiceConnection' was added
- `TYPE_ADDED` `BusinessServiceEdge` — Type 'BusinessServiceEdge' was added
- `TYPE_ADDED` `TransactionBatchFilterInput` — Type 'TransactionBatchFilterInput' was added
- `TYPE_ADDED` `TransactionBatchConnectionPayload` — Type 'TransactionBatchConnectionPayload' was added
- `TYPE_ADDED` `PaymentTransactionsConnectionPayload` — Type 'PaymentTransactionsConnectionPayload' was added
- `TYPE_ADDED` `TransactionBatchConnection` — Type 'TransactionBatchConnection' was added
- `TYPE_ADDED` `TransactionBatchEdge` — Type 'TransactionBatchEdge' was added
- `TYPE_ADDED` `CloseTransactionBatchInput` — Type 'CloseTransactionBatchInput' was added
- `TYPE_ADDED` `CloseTransactionBatchPayload` — Type 'CloseTransactionBatchPayload' was added
- `TYPE_ADDED` `CloseTransactionBatch` — Type 'CloseTransactionBatch' was added
- `TYPE_ADDED` `TransactionBatchEntryFilterInput` — Type 'TransactionBatchEntryFilterInput' was added
- `TYPE_ADDED` `TransactionBatchTotal` — Type 'TransactionBatchTotal' was added
- `TYPE_ADDED` `BatchHoldConnection` — Type 'BatchHoldConnection' was added
- `TYPE_ADDED` `BatchHoldEdge` — Type 'BatchHoldEdge' was added
- `TYPE_ADDED` `BatchAdjustmentConnection` — Type 'BatchAdjustmentConnection' was added
- `TYPE_ADDED` `BatchAdjustmentEdge` — Type 'BatchAdjustmentEdge' was added
- `FIELD_ADDED` `Query.transactionBatches` — Field 'transactionBatches' was added to object type 'Query'
- `FIELD_ADDED` `Mutation.closeTransactionBatch` — Field 'closeTransactionBatch' was added to object type 'Mutation'
- `FIELD_ADDED` `Business.services` — Field 'services' was added to object type 'Business'
- `FIELD_ADDED` `MerchantAcceptor.merchant` — Field 'merchant' was added to object type 'MerchantAcceptor'
- `FIELD_ADDED` `MerchantAcceptorDetails.merchantCategoryCode` — Field 'merchantCategoryCode' was added to object type 'MerchantAcceptorDetails'
- `FIELD_ADDED` `MerchantAcceptorProcessorConfiguration.merchantCategoryCode` — Field 'merchantCategoryCode' was added to object type 'MerchantAcceptorProcessorConfiguration'
- `FIELD_ADDED` `MerchantPayfacRelationship.payfac` — Field 'payfac' was added to object type 'MerchantPayfacRelationship'
- `FIELD_ADDED` `TransactionBatch.debitTotal` — Field 'debitTotal' was added to object type 'TransactionBatch'
- `FIELD_ADDED` `TransactionBatch.creditTotal` — Field 'creditTotal' was added to object type 'TransactionBatch'
- `FIELD_ADDED` `TransactionBatch.chargebackTotal` — Field 'chargebackTotal' was added to object type 'TransactionBatch'
- `FIELD_ADDED` `TransactionBatch.holdsTotalAmount` — Field 'holdsTotalAmount' was added to object type 'TransactionBatch'
- `FIELD_ADDED` `TransactionBatch.adjustmentsTotalAmount` — Field 'adjustmentsTotalAmount' was added to object type 'TransactionBatch'
- `FIELD_ADDED` `TransactionBatch.disbursedAmount` — Field 'disbursedAmount' was added to object type 'TransactionBatch'
- `FIELD_ADDED` `TransactionBatch.transactions` — Field 'transactions' was added to object type 'TransactionBatch'
- `FIELD_ADDED` `TransactionBatch.holds` — Field 'holds' was added to object type 'TransactionBatch'
- `FIELD_ADDED` `TransactionBatch.adjustments` — Field 'adjustments' was added to object type 'TransactionBatch'
- `FIELD_ADDED` `TransactionBatch.currentTotal` — Field 'currentTotal' was added to object type 'TransactionBatch'
- `FIELD_ADDED` `TransactionBatch.createdAt` — Field 'createdAt' was added to object type 'TransactionBatch'
- `FIELD_ADDED` `TransactionBatch.closeRequestedAt` — Field 'closeRequestedAt' was added to object type 'TransactionBatch'

</details>

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

### Review checklist

- [ ] If `breaking_count > 0`: triage each path per the guidance above
- [ ] Skim the docs diff (`docs/SDK_REFERENCE.md`, `docs/resources/*.md`) for new/renamed types
- [ ] Decide version bump: patch (docs/desc only), minor (new fields/enums), major (SDK surface broke)

> Body generated by `scripts/fetch-schema-changelog.ts` from `Query.schemaChangelogs` (env: `test`, lookback: 14 days).