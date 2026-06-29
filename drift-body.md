## Schema Drift Detected

Highest criticality in the last 14 days: **BREAKING** (across 7 deployments).

### ⚠️ Breaking changes detected — triage required

Each path below was removed or modified incompatibly upstream. For each:

1. `rg "<path>" src/resources/` — does any resource code reference it?
2. **Hit:** patch the affected resource in this PR (rename method, drop resource, etc.) before merging. CI's typecheck will fail otherwise.
3. **Miss:** schema-level break, no SDK consumer impact — safe to merge as docs-only refresh.

- **`OnDemandPricingChargeCalculationMetadata`** — Type 'OnDemandPricingChargeCalculationMetadata' was removed
- **`OnDemandPricingPerItemCalculation`** — Type 'OnDemandPricingPerItemCalculation' was removed
- **`OnDemandPricingPercentageCalculation`** — Type 'OnDemandPricingPercentageCalculation' was removed
- **`OnDemandPricingCharge.metadata`** — Field 'metadata' was removed from object type 'OnDemandPricingCharge'
- **`VisaFleetAuthorizationData.purchaseRestrictonsFlag`** — Field 'purchaseRestrictonsFlag' (deprecated) was removed from object type 'VisaFleetAuthorizationData'
- **`SimulateVisaFleetAuthorizationDataInput.purchaseRestrictonsFlag`** — Input field 'purchaseRestrictonsFlag' was removed from input object type 'SimulateVisaFleetAuthorizationDataInput'

### Deployments included

<details><summary><strong>2026-06-25</strong> — scl_c247376b7d41476b94f6b5f052f6bb85 (20 changes)</summary>

**NON_BREAKING** (20)

- `TYPE_ADDED` `AccountReceivable` — Type 'AccountReceivable' was added
- `TYPE_ADDED` `AccountPayableParty` — Type 'AccountPayableParty' was added
- `TYPE_ADDED` `AccountReceivableParty` — Type 'AccountReceivableParty' was added
- `TYPE_ADDED` `AccountReceivableStatus` — Type 'AccountReceivableStatus' was added
- `TYPE_ADDED` `AccountReceivableType` — Type 'AccountReceivableType' was added
- `TYPE_ADDED` `AccountReceivableCollectionSchedule` — Type 'AccountReceivableCollectionSchedule' was added
- `TYPE_ADDED` `AcquiringThreeDSecureAuthentication` — Type 'AcquiringThreeDSecureAuthentication' was added
- `TYPE_ADDED` `FinancialAccountHolder` — Type 'FinancialAccountHolder' was added
- `TYPE_ADDED` `AssignFinancialBankAccountToBusinessInput` — Type 'AssignFinancialBankAccountToBusinessInput' was added
- `TYPE_ADDED` `AssignFinancialBankAccountInput` — Type 'AssignFinancialBankAccountInput' was added
- `TYPE_ADDED` `BusinessServiceTargetInput` — Type 'BusinessServiceTargetInput' was added
- `TYPE_ADDED` `MerchantBusinessServiceTargetInput` — Type 'MerchantBusinessServiceTargetInput' was added
- `TYPE_ADDED` `MerchantPayfacRelationshipQualifierInput` — Type 'MerchantPayfacRelationshipQualifierInput' was added
- `TYPE_ADDED` `PayfacBusinessServiceTargetInput` — Type 'PayfacBusinessServiceTargetInput' was added
- `TYPE_ADDED` `AssignFinancialBankAccountToBusinessPayload` — Type 'AssignFinancialBankAccountToBusinessPayload' was added
- `FIELD_ADDED` `Mutation.assignFinancialBankAccountToBusiness` — Field 'assignFinancialBankAccountToBusiness' was added to object type 'Mutation'
- `INPUT_FIELD_TYPE_CHANGED` `RefundPaymentTransactionInput.amount` — Input field 'RefundPaymentTransactionInput.amount' changed type from 'AmountInput!' to 'AmountInput'
- `FIELD_ADDED` `Merchant.businessAccountConfigurations` — Field 'businessAccountConfigurations' was added to object type 'Merchant'
- `FIELD_ADDED` `Payfac.businessAccountConfigurations` — Field 'businessAccountConfigurations' was added to object type 'Payfac'
- `FIELD_ADDED` `PaymentMethodToken.acquiringThreeDSecureAuthentication` — Field 'acquiringThreeDSecureAuthentication' was added to object type 'PaymentMethodToken'

</details>

<details><summary><strong>2026-06-24</strong> — scl_fd51f8b91a75489ea1c907d0f484ef31 (15 changes)</summary>

**BREAKING** (4)

- `TYPE_REMOVED` `OnDemandPricingChargeCalculationMetadata` — Type 'OnDemandPricingChargeCalculationMetadata' was removed
- `TYPE_REMOVED` `OnDemandPricingPerItemCalculation` — Type 'OnDemandPricingPerItemCalculation' was removed
- `TYPE_REMOVED` `OnDemandPricingPercentageCalculation` — Type 'OnDemandPricingPercentageCalculation' was removed
- `FIELD_REMOVED` `OnDemandPricingCharge.metadata` — Field 'metadata' was removed from object type 'OnDemandPricingCharge'

**NON_BREAKING** (11)

- `TYPE_ADDED` `Invoice` — Type 'Invoice' was added
- `TYPE_ADDED` `InvoiceItem` — Type 'InvoiceItem' was added
- `TYPE_ADDED` `InvoiceParty` — Type 'InvoiceParty' was added
- `TYPE_ADDED` `InvoiceItemServicePeriod` — Type 'InvoiceItemServicePeriod' was added
- `TYPE_ADDED` `InvoiceItemCalculationMetadata` — Type 'InvoiceItemCalculationMetadata' was added
- `TYPE_ADDED` `InvoiceItemPerItemCalculation` — Type 'InvoiceItemPerItemCalculation' was added
- `TYPE_ADDED` `InvoiceItemPercentageCalculation` — Type 'InvoiceItemPercentageCalculation' was added
- `TYPE_ADDED` `InvoiceItemServicePeriodRange` — Type 'InvoiceItemServicePeriodRange' was added
- `TYPE_ADDED` `InvoiceItemServiceDate` — Type 'InvoiceItemServiceDate' was added
- `TYPE_ADDED` `InvoiceItemConnection` — Type 'InvoiceItemConnection' was added
- `TYPE_ADDED` `InvoiceItemEdge` — Type 'InvoiceItemEdge' was added

</details>

<details><summary><strong>2026-06-23</strong> — scl_c373ef2a734343f2bae9e535f3581eae (10 changes)</summary>

**NON_BREAKING** (10)

- `TYPE_ADDED` `PrimaryAuthorizedPerson` — Type 'PrimaryAuthorizedPerson' was added
- `TYPE_ADDED` `UltimateBeneficialOwner` — Type 'UltimateBeneficialOwner' was added
- `TYPE_ADDED` `BusinessAccountPurpose` — Type 'BusinessAccountPurpose' was added
- `TYPE_ADDED` `BusinessAccountConfiguration` — Type 'BusinessAccountConfiguration' was added
- `FIELD_ADDED` `USBusinessAccountHolder.primaryAuthorizedPersonDetail` — Field 'primaryAuthorizedPersonDetail' was added to object type 'USBusinessAccountHolder'
- `FIELD_DEPRECATION_ADDED` `USBusinessAccountHolder.primaryAuthorizedPerson` — Field 'USBusinessAccountHolder.primaryAuthorizedPerson' is deprecated
- `FIELD_DEPRECATION_REASON_ADDED` `USBusinessAccountHolder.primaryAuthorizedPerson` — Field 'USBusinessAccountHolder.primaryAuthorizedPerson' has deprecation reason 'Use primaryAuthorizedPersonDetail instead.'
- `FIELD_ADDED` `USBusinessProfile.ultimateBeneficialOwnerDetails` — Field 'ultimateBeneficialOwnerDetails' was added to object type 'USBusinessProfile'
- `FIELD_DEPRECATION_ADDED` `USBusinessProfile.ultimateBeneficialOwners` — Field 'USBusinessProfile.ultimateBeneficialOwners' is deprecated
- `FIELD_DEPRECATION_REASON_ADDED` `USBusinessProfile.ultimateBeneficialOwners` — Field 'USBusinessProfile.ultimateBeneficialOwners' has deprecation reason 'Use ultimateBeneficialOwnerDetails instead.'

</details>

<details><summary><strong>2026-06-18</strong> — scl_d3331347e1a34c569d17f308da46568b (14 changes)</summary>

**BREAKING** (2)

- `FIELD_REMOVED` `VisaFleetAuthorizationData.purchaseRestrictonsFlag` — Field 'purchaseRestrictonsFlag' (deprecated) was removed from object type 'VisaFleetAuthorizationData'
- `INPUT_FIELD_REMOVED` `SimulateVisaFleetAuthorizationDataInput.purchaseRestrictonsFlag` — Input field 'purchaseRestrictonsFlag' was removed from input object type 'SimulateVisaFleetAuthorizationDataInput'

**DANGEROUS** (5)

- `UNION_MEMBER_ADDED` `PersonIdentificationDocument` — Member 'PassportIdentificationDocument' was added to Union type 'PersonIdentificationDocument'
- `UNION_MEMBER_ADDED` `NotificationEventNode` — Member 'LinkVerifiedExternalBankAccountVerificationRequiredEvent' was added to Union type 'NotificationEventNode'
- `UNION_MEMBER_ADDED` `NotificationEventNode` — Member 'LinkVerifiedExternalBankAccountExpiredEvent' was added to Union type 'NotificationEventNode'
- `ENUM_VALUE_ADDED` `NotificationEventName.LINK_VERIFIED_EXTERNAL_BANK_ACCOUNT_VERIFICATION_REQUIRED` — Enum value 'LINK_VERIFIED_EXTERNAL_BANK_ACCOUNT_VERIFICATION_REQUIRED' was added to enum 'NotificationEventName'
- `ENUM_VALUE_ADDED` `NotificationEventName.LINK_VERIFIED_EXTERNAL_BANK_ACCOUNT_EXPIRED` — Enum value 'LINK_VERIFIED_EXTERNAL_BANK_ACCOUNT_EXPIRED' was added to enum 'NotificationEventName'

**NON_BREAKING** (7)

- `TYPE_ADDED` `LinkVerifiedExternalBankAccountVerificationRequiredEvent` — Type 'LinkVerifiedExternalBankAccountVerificationRequiredEvent' was added
- `TYPE_ADDED` `LinkVerifiedExternalBankAccountExpiredEvent` — Type 'LinkVerifiedExternalBankAccountExpiredEvent' was added
- `TYPE_ADDED` `InstantNetworkTransferCapabilityDeclineReason` — Type 'InstantNetworkTransferCapabilityDeclineReason' was added
- `FIELD_ADDED` `Ledger.signedBalance` — Field 'signedBalance' was added to object type 'Ledger'
- `FIELD_ADDED` `InstantNetworkTransferDestinationPaymentInstrumentCapability.declineReasons` — Field 'declineReasons' was added to object type 'InstantNetworkTransferDestinationPaymentInstrumentCapability'
- `FIELD_ADDED` `InstantNetworkTransferSourcePaymentInstrumentCapability.declineReasons` — Field 'declineReasons' was added to object type 'InstantNetworkTransferSourcePaymentInstrumentCapability'
- `FIELD_ADDED` `FinancialAccountBalanceLedgerDetail.signedBalance` — Field 'signedBalance' was added to object type 'FinancialAccountBalanceLedgerDetail'

</details>

<details><summary><strong>2026-06-17</strong> — scl_f8949fb29bf44c6cb028ac99e81b8cb6 (1 change)</summary>

**DANGEROUS** (1)

- `ENUM_VALUE_ADDED` `RewardPointsTransferFailureReasonCode.INVALID_ACCOUNT_ID` — Enum value 'INVALID_ACCOUNT_ID' was added to enum 'RewardPointsTransferFailureReasonCode'

</details>

<details><summary><strong>2026-06-16</strong> — scl_b8d6037df49a4ab1990d1db2ec494439 (2 changes)</summary>

**NON_BREAKING** (2)

- `TYPE_ADDED` `PaymentTransactionHoldReason` — Type 'PaymentTransactionHoldReason' was added
- `TYPE_ADDED` `CardPaymentAuthorizationHeldEvent` — Type 'CardPaymentAuthorizationHeldEvent' was added

</details>

<details><summary><strong>2026-06-15</strong> — scl_07a994b19e1441e986633741f6d7cd92 (13 changes)</summary>

**DANGEROUS** (11)

- `ENUM_VALUE_ADDED` `FinancialAccountFeatureType.CRYPTO_FUNDING` — Enum value 'CRYPTO_FUNDING' was added to enum 'FinancialAccountFeatureType'
- `ENUM_VALUE_ADDED` `FinancialAccountFeatureType.CRYPTO_RECEIVING` — Enum value 'CRYPTO_RECEIVING' was added to enum 'FinancialAccountFeatureType'
- `ENUM_VALUE_ADDED` `RewardPointsTransferFailureReasonCode.REDEMPTION_CONFIGURATION_NOT_FOUND` — Enum value 'REDEMPTION_CONFIGURATION_NOT_FOUND' was added to enum 'RewardPointsTransferFailureReasonCode'
- `ENUM_VALUE_ADDED` `RewardPointsTransferFailureReasonCode.REDEMPTION_CONFIGURATION_ID_OR_POINT_VALUE_REQUIRED` — Enum value 'REDEMPTION_CONFIGURATION_ID_OR_POINT_VALUE_REQUIRED' was added to enum 'RewardPointsTransferFailureReasonCode'
- `ENUM_VALUE_ADDED` `RewardPointsTransferFailureReasonCode.INSUFFICIENT_FUNDING_ACCOUNT_BALANCE` — Enum value 'INSUFFICIENT_FUNDING_ACCOUNT_BALANCE' was added to enum 'RewardPointsTransferFailureReasonCode'
- `ENUM_VALUE_ADDED` `RewardPointsTransferFailureReasonCode.TRANSFER_AMOUNT_NOT_POSITIVE` — Enum value 'TRANSFER_AMOUNT_NOT_POSITIVE' was added to enum 'RewardPointsTransferFailureReasonCode'
- `ENUM_VALUE_ADDED` `RewardPointsTransferFailureReasonCode.ACCOUNT_NOT_ACTIVE` — Enum value 'ACCOUNT_NOT_ACTIVE' was added to enum 'RewardPointsTransferFailureReasonCode'
- `INPUT_FIELD_ADDED` `RedeemRewardsToFinancialAccountInput.idempotencyKey` — Input field 'idempotencyKey' of type 'IdempotencyKey' was added to input object type 'RedeemRewardsToFinancialAccountInput'
- `INPUT_FIELD_ADDED` `RedeemRewardsForStatementCreditInput.idempotencyKey` — Input field 'idempotencyKey' of type 'IdempotencyKey' was added to input object type 'RedeemRewardsForStatementCreditInput'
- `ENUM_VALUE_ADDED` `InstantNetworkTransferStatus.ON_HOLD_AWAITING_NETWORK` — Enum value 'ON_HOLD_AWAITING_NETWORK' was added to enum 'InstantNetworkTransferStatus'
- `ENUM_VALUE_ADDED` `InstantNetworkTransferStatus.ON_HOLD_AWAITING_RESOLUTION` — Enum value 'ON_HOLD_AWAITING_RESOLUTION' was added to enum 'InstantNetworkTransferStatus'

**NON_BREAKING** (2)

- `TYPE_ADDED` `CryptoFundingFinancialAccountFeature` — Type 'CryptoFundingFinancialAccountFeature' was added
- `TYPE_ADDED` `CryptoReceivingFinancialAccountFeature` — Type 'CryptoReceivingFinancialAccountFeature' was added

</details>

### Review checklist

- [ ] If `breaking_count > 0`: triage each path per the guidance above
- [ ] Skim the docs diff (`docs/SDK_REFERENCE.md`, `docs/resources/*.md`) for new/renamed types
- [ ] Decide version bump: patch (docs/desc only), minor (new fields/enums), major (SDK surface broke)

> Body generated by `scripts/fetch-schema-changelog.ts` from `Query.schemaChangelogs` (env: `test`, lookback: 14 days).