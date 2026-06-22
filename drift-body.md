## Schema Drift Detected

Highest criticality in the last 14 days: **BREAKING** (across 9 deployments).

### ⚠️ Breaking changes detected — triage required

Each path below was removed or modified incompatibly upstream. For each:

1. `rg "<path>" src/resources/` — does any resource code reference it?
2. **Hit:** patch the affected resource in this PR (rename method, drop resource, etc.) before merging. CI's typecheck will fail otherwise.
3. **Miss:** schema-level break, no SDK consumer impact — safe to merge as docs-only refresh.

- **`VisaFleetAuthorizationData.purchaseRestrictonsFlag`** — Field 'purchaseRestrictonsFlag' (deprecated) was removed from object type 'VisaFleetAuthorizationData'
- **`SimulateVisaFleetAuthorizationDataInput.purchaseRestrictonsFlag`** — Input field 'purchaseRestrictonsFlag' was removed from input object type 'SimulateVisaFleetAuthorizationDataInput'
- **`AddPricingConfigurationPayload`** — Type 'AddPricingConfigurationPayload' was removed
- **`AddPricingConfigurationInput`** — Type 'AddPricingConfigurationInput' was removed
- **`AddPricingConfigurationEntityInput`** — Type 'AddPricingConfigurationEntityInput' was removed
- **`PricingConfigurationAttachmentEntityType`** — Type 'PricingConfigurationAttachmentEntityType' was removed
- **`Mutation.addPricingConfiguration`** — Field 'addPricingConfiguration' was removed from object type 'Mutation'
- **`BusinessFilterInput.businessProfile`** — Input field 'businessProfile' was removed from input object type 'BusinessFilterInput'
- **`BusinessFilterInput.externalId`** — Input field 'externalId' was removed from input object type 'BusinessFilterInput'
- **`BusinessFilterInput.primaryAuthorizedPerson`** — Input field 'primaryAuthorizedPerson' was removed from input object type 'BusinessFilterInput'
- **`AcquiringMerchantType`** — Type 'AcquiringMerchantType' was removed
- **`MerchantAcceptor.pricingPlan`** — Field 'pricingPlan' was removed from object type 'MerchantAcceptor'
- **`Merchant.merchantType`** — Field 'merchantType' was removed from object type 'Merchant'

### Deployments included

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

<details><summary><strong>2026-06-12</strong> — scl_e687a36205c74b2ab3f4235c5b9366fd (7 changes)</summary>

**BREAKING** (5)

- `TYPE_REMOVED` `AddPricingConfigurationPayload` — Type 'AddPricingConfigurationPayload' was removed
- `TYPE_REMOVED` `AddPricingConfigurationInput` — Type 'AddPricingConfigurationInput' was removed
- `TYPE_REMOVED` `AddPricingConfigurationEntityInput` — Type 'AddPricingConfigurationEntityInput' was removed
- `TYPE_REMOVED` `PricingConfigurationAttachmentEntityType` — Type 'PricingConfigurationAttachmentEntityType' was removed
- `FIELD_REMOVED` `Mutation.addPricingConfiguration` — Field 'addPricingConfiguration' was removed from object type 'Mutation'

**DANGEROUS** (1)

- `ENUM_VALUE_ADDED` `FinancialAccountFeatureType.MERCHANT_FUNDING` — Enum value 'MERCHANT_FUNDING' was added to enum 'FinancialAccountFeatureType'

**NON_BREAKING** (1)

- `TYPE_ADDED` `MerchantFundingFinancialAccountFeature` — Type 'MerchantFundingFinancialAccountFeature' was added

</details>

<details><summary><strong>2026-06-11</strong> — scl_6def30022bb944d4a2e30f01b8e1ee22 (2 changes)</summary>

**DANGEROUS** (2)

- `UNION_MEMBER_ADDED` `NotificationEventNode` — Member 'WireTransfer' was added to Union type 'NotificationEventNode'
- `ENUM_VALUE_ADDED` `NotificationEventName.WIRE_TRANSFER_COMPLETED_EVENT` — Enum value 'WIRE_TRANSFER_COMPLETED_EVENT' was added to enum 'NotificationEventName'

</details>

<details><summary><strong>2026-06-10</strong> — scl_46f7c4c1e036493da59b2fa22b430188 (8 changes)</summary>

**BREAKING** (3)

- `INPUT_FIELD_REMOVED` `BusinessFilterInput.businessProfile` — Input field 'businessProfile' was removed from input object type 'BusinessFilterInput'
- `INPUT_FIELD_REMOVED` `BusinessFilterInput.externalId` — Input field 'externalId' was removed from input object type 'BusinessFilterInput'
- `INPUT_FIELD_REMOVED` `BusinessFilterInput.primaryAuthorizedPerson` — Input field 'primaryAuthorizedPerson' was removed from input object type 'BusinessFilterInput'

**NON_BREAKING** (5)

- `TYPE_ADDED` `MerchantAcceptorFilterInput` — Type 'MerchantAcceptorFilterInput' was added
- `TYPE_ADDED` `MerchantAcceptorConnection` — Type 'MerchantAcceptorConnection' was added
- `TYPE_ADDED` `MerchantAcceptorEdge` — Type 'MerchantAcceptorEdge' was added
- `FIELD_ADDED` `Query.merchantAcceptors` — Field 'merchantAcceptors' was added to object type 'Query'
- `FIELD_ADDED` `Merchant.merchantAcceptors` — Field 'merchantAcceptors' was added to object type 'Merchant'

</details>

<details><summary><strong>2026-06-09</strong> — scl_4b1f4f3bbe3e43c48d4ea5540289357a (12 changes)</summary>

**NON_BREAKING** (12)

- `TYPE_ADDED` `BusinessRelationship` — Type 'BusinessRelationship' was added
- `TYPE_ADDED` `BusinessRelationshipParty` — Type 'BusinessRelationshipParty' was added
- `TYPE_ADDED` `BusinessCustomerRelationship` — Type 'BusinessCustomerRelationship' was added
- `TYPE_ADDED` `BusinessPartnerRelationship` — Type 'BusinessPartnerRelationship' was added
- `TYPE_ADDED` `BusinessRelationshipConnection` — Type 'BusinessRelationshipConnection' was added
- `TYPE_ADDED` `BusinessRelationshipEdge` — Type 'BusinessRelationshipEdge' was added
- `TYPE_ADDED` `BusinessRelationshipStatus` — Type 'BusinessRelationshipStatus' was added
- `TYPE_ADDED` `BusinessRelationshipType` — Type 'BusinessRelationshipType' was added
- `TYPE_ADDED` `BusinessRelationshipFilterInput` — Type 'BusinessRelationshipFilterInput' was added
- `FIELD_ADDED` `Query.businessRelationships` — Field 'businessRelationships' was added to object type 'Query'
- `FIELD_DEPRECATION_ADDED` `Query.organizationBusinessRelationships` — Field 'Query.organizationBusinessRelationships' is deprecated
- `FIELD_DEPRECATION_REASON_ADDED` `Query.organizationBusinessRelationships` — Field 'Query.organizationBusinessRelationships' has deprecation reason 'Use businessRelationships instead.'

</details>

<details><summary><strong>2026-06-08</strong> — scl_16aa9b5db44841b19f5c13a35c8b7ff2 (6 changes)</summary>

**BREAKING** (3)

- `TYPE_REMOVED` `AcquiringMerchantType` — Type 'AcquiringMerchantType' was removed
- `FIELD_REMOVED` `MerchantAcceptor.pricingPlan` — Field 'pricingPlan' was removed from object type 'MerchantAcceptor'
- `FIELD_REMOVED` `Merchant.merchantType` — Field 'merchantType' was removed from object type 'Merchant'

**DANGEROUS** (2)

- `ENUM_VALUE_ADDED` `AchTransferPurpose.INTRA_BANK_ACH_TRANSFER` — Enum value 'INTRA_BANK_ACH_TRANSFER' was added to enum 'AchTransferPurpose'
- `ENUM_VALUE_ADDED` `RtpTransferFailureReason.RISK_DECLINE` — Enum value 'RISK_DECLINE' was added to enum 'RtpTransferFailureReason'

**NON_BREAKING** (1)

- `FIELD_ADDED` `CardPaymentDispute.networkCaseIdentifier` — Field 'networkCaseIdentifier' was added to object type 'CardPaymentDispute'

</details>

### Review checklist

- [ ] If `breaking_count > 0`: triage each path per the guidance above
- [ ] Skim the docs diff (`docs/SDK_REFERENCE.md`, `docs/resources/*.md`) for new/renamed types
- [ ] Decide version bump: patch (docs/desc only), minor (new fields/enums), major (SDK surface broke)

> Body generated by `scripts/fetch-schema-changelog.ts` from `Query.schemaChangelogs` (env: `test`, lookback: 14 days).