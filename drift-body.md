## Schema Drift Detected

Highest criticality in the last 14 days: **BREAKING** (across 9 deployments).

### ⚠️ Breaking changes detected — triage required

Each path below was removed or modified incompatibly upstream. For each:

1. `rg "<path>" src/resources/` — does any resource code reference it?
2. **Hit:** patch the affected resource in this PR (rename method, drop resource, etc.) before merging. CI's typecheck will fail otherwise.
3. **Miss:** schema-level break, no SDK consumer impact — safe to merge as docs-only refresh.

- **`FeaturePermission.createdBy`** — Field 'FeaturePermission.createdBy' changed type from 'String' to 'UserPayload'
- **`FeaturePermission.updatedBy`** — Field 'FeaturePermission.updatedBy' changed type from 'String' to 'UserPayload'
- **`FeaturePermissionRevision.createdBy`** — Field 'FeaturePermissionRevision.createdBy' changed type from 'String' to 'UserPayload'
- **`FeaturePermissionRevision.updatedBy`** — Field 'FeaturePermissionRevision.updatedBy' changed type from 'String' to 'UserPayload'
- **`RiskApplicationSDK.createdBy`** — Field 'RiskApplicationSDK.createdBy' changed type from 'String' to 'UserPayload'
- **`RiskApplicationSDK.updatedBy`** — Field 'RiskApplicationSDK.updatedBy' changed type from 'String' to 'UserPayload'
- **`RiskApplicationSDKRevision.createdBy`** — Field 'RiskApplicationSDKRevision.createdBy' changed type from 'String' to 'UserPayload'
- **`RiskApplicationSDKRevision.updatedBy`** — Field 'RiskApplicationSDKRevision.updatedBy' changed type from 'String' to 'UserPayload'

### Deployments included

<details><summary><strong>2026-11-20</strong> — scl_edbbecd63b714333839adad0d7659d17 (50 changes)</summary>

**BREAKING** (8)

- `FIELD_TYPE_CHANGED` `FeaturePermission.createdBy` — Field 'FeaturePermission.createdBy' changed type from 'String' to 'UserPayload'
- `FIELD_TYPE_CHANGED` `FeaturePermission.updatedBy` — Field 'FeaturePermission.updatedBy' changed type from 'String' to 'UserPayload'
- `FIELD_TYPE_CHANGED` `FeaturePermissionRevision.createdBy` — Field 'FeaturePermissionRevision.createdBy' changed type from 'String' to 'UserPayload'
- `FIELD_TYPE_CHANGED` `FeaturePermissionRevision.updatedBy` — Field 'FeaturePermissionRevision.updatedBy' changed type from 'String' to 'UserPayload'
- `FIELD_TYPE_CHANGED` `RiskApplicationSDK.createdBy` — Field 'RiskApplicationSDK.createdBy' changed type from 'String' to 'UserPayload'
- `FIELD_TYPE_CHANGED` `RiskApplicationSDK.updatedBy` — Field 'RiskApplicationSDK.updatedBy' changed type from 'String' to 'UserPayload'
- `FIELD_TYPE_CHANGED` `RiskApplicationSDKRevision.createdBy` — Field 'RiskApplicationSDKRevision.createdBy' changed type from 'String' to 'UserPayload'
- `FIELD_TYPE_CHANGED` `RiskApplicationSDKRevision.updatedBy` — Field 'RiskApplicationSDKRevision.updatedBy' changed type from 'String' to 'UserPayload'

**DANGEROUS** (8)

- `ENUM_VALUE_ADDED` `LedgerName.INSTANT_FUND_PENDING` — Enum value 'INSTANT_FUND_PENDING' was added to enum 'LedgerName'
- `INPUT_FIELD_ADDED` `AddPaymentCardToGooglePayByDevicePushProvisioningInput.serverSessionId` — Input field 'serverSessionId' of type 'String' was added to input object type 'AddPaymentCardToGooglePayByDevicePushProvisioningInput'
- `ENUM_VALUE_ADDED` `UnifiedFundsTransferFailureReason.DUPLICATE_ORIGINAL_APPROVED` — Enum value 'DUPLICATE_ORIGINAL_APPROVED' was added to enum 'UnifiedFundsTransferFailureReason'
- `ENUM_VALUE_ADDED` `UnifiedFundsTransferFailureReason.DUPLICATE_ORIGINAL_DECLINED` — Enum value 'DUPLICATE_ORIGINAL_DECLINED' was added to enum 'UnifiedFundsTransferFailureReason'
- `ENUM_VALUE_ADDED` `UnifiedFundsTransferFailureReason.DUPLICATE_ORIGINAL_STATUS_UNKNOWN` — Enum value 'DUPLICATE_ORIGINAL_STATUS_UNKNOWN' was added to enum 'UnifiedFundsTransferFailureReason'
- `ENUM_VALUE_ADDED` `InstantNetworkTransferFailureReason.DUPLICATE_ORIGINAL_APPROVED` — Enum value 'DUPLICATE_ORIGINAL_APPROVED' was added to enum 'InstantNetworkTransferFailureReason'
- `ENUM_VALUE_ADDED` `InstantNetworkTransferFailureReason.DUPLICATE_ORIGINAL_DECLINED` — Enum value 'DUPLICATE_ORIGINAL_DECLINED' was added to enum 'InstantNetworkTransferFailureReason'
- `ENUM_VALUE_ADDED` `InstantNetworkTransferFailureReason.DUPLICATE_ORIGINAL_STATUS_UNKNOWN` — Enum value 'DUPLICATE_ORIGINAL_STATUS_UNKNOWN' was added to enum 'InstantNetworkTransferFailureReason'

**NON_BREAKING** (34)

- `TYPE_ADDED` `IPAllowListAndKeySelfService` — Type 'IPAllowListAndKeySelfService' was added
- `TYPE_ADDED` `IPAllowListAndKeySelfServiceRevision` — Type 'IPAllowListAndKeySelfServiceRevision' was added
- `TYPE_ADDED` `APIAccount` — Type 'APIAccount' was added
- `FIELD_ADDED` `FeaturePermission.createdAt` — Field 'createdAt' was added to interface 'FeaturePermission'
- `FIELD_ADDED` `FeaturePermission.updatedAt` — Field 'updatedAt' was added to interface 'FeaturePermission'
- `FIELD_DEPRECATION_ADDED` `FeaturePermission.createDate` — Field 'FeaturePermission.createDate' is deprecated
- `FIELD_DEPRECATION_REASON_ADDED` `FeaturePermission.createDate` — Field 'FeaturePermission.createDate' has deprecation reason 'Use `createdAt` instead.'
- `FIELD_DEPRECATION_ADDED` `FeaturePermission.updateDate` — Field 'FeaturePermission.updateDate' is deprecated
- `FIELD_DEPRECATION_REASON_ADDED` `FeaturePermission.updateDate` — Field 'FeaturePermission.updateDate' has deprecation reason 'Use `updatedAt` instead.'
- `FIELD_ADDED` `FeaturePermissionRevision.featurePermission` — Field 'featurePermission' was added to interface 'FeaturePermissionRevision'
- `FIELD_ADDED` `FeaturePermissionRevision.createdAt` — Field 'createdAt' was added to interface 'FeaturePermissionRevision'
- `FIELD_ADDED` `FeaturePermissionRevision.updatedAt` — Field 'updatedAt' was added to interface 'FeaturePermissionRevision'
- `FIELD_DEPRECATION_ADDED` `FeaturePermissionRevision.featurePermissionId` — Field 'FeaturePermissionRevision.featurePermissionId' is deprecated
- `FIELD_DEPRECATION_REASON_ADDED` `FeaturePermissionRevision.featurePermissionId` — Field 'FeaturePermissionRevision.featurePermissionId' has deprecation reason 'Use `featurePermission` instead.'
- `FIELD_DEPRECATION_ADDED` `FeaturePermissionRevision.createDate` — Field 'FeaturePermissionRevision.createDate' is deprecated
- `FIELD_DEPRECATION_REASON_ADDED` `FeaturePermissionRevision.createDate` — Field 'FeaturePermissionRevision.createDate' has deprecation reason 'Use `createdAt` instead.'
- `FIELD_DEPRECATION_ADDED` `FeaturePermissionRevision.updateDate` — Field 'FeaturePermissionRevision.updateDate' is deprecated
- `FIELD_DEPRECATION_REASON_ADDED` `FeaturePermissionRevision.updateDate` — Field 'FeaturePermissionRevision.updateDate' has deprecation reason 'Use `updatedAt` instead.'
- `FIELD_ADDED` `RiskApplicationSDK.createdAt` — Field 'createdAt' was added to object type 'RiskApplicationSDK'
- `FIELD_ADDED` `RiskApplicationSDK.updatedAt` — Field 'updatedAt' was added to object type 'RiskApplicationSDK'
- `FIELD_DEPRECATION_ADDED` `RiskApplicationSDK.createDate` — Field 'RiskApplicationSDK.createDate' is deprecated
- `FIELD_DEPRECATION_REASON_ADDED` `RiskApplicationSDK.createDate` — Field 'RiskApplicationSDK.createDate' has deprecation reason 'Use `createdAt` instead.'
- `FIELD_DEPRECATION_ADDED` `RiskApplicationSDK.updateDate` — Field 'RiskApplicationSDK.updateDate' is deprecated
- `FIELD_DEPRECATION_REASON_ADDED` `RiskApplicationSDK.updateDate` — Field 'RiskApplicationSDK.updateDate' has deprecation reason 'Use `updatedAt` instead.'
- `FIELD_ADDED` `RiskApplicationSDKRevision.featurePermission` — Field 'featurePermission' was added to object type 'RiskApplicationSDKRevision'
- `FIELD_ADDED` `RiskApplicationSDKRevision.createdAt` — Field 'createdAt' was added to object type 'RiskApplicationSDKRevision'
- `FIELD_ADDED` `RiskApplicationSDKRevision.updatedAt` — Field 'updatedAt' was added to object type 'RiskApplicationSDKRevision'
- `FIELD_DEPRECATION_ADDED` `RiskApplicationSDKRevision.featurePermissionId` — Field 'RiskApplicationSDKRevision.featurePermissionId' is deprecated
- `FIELD_DEPRECATION_REASON_ADDED` `RiskApplicationSDKRevision.featurePermissionId` — Field 'RiskApplicationSDKRevision.featurePermissionId' has deprecation reason 'Use `featurePermission` instead.'
- `FIELD_DEPRECATION_ADDED` `RiskApplicationSDKRevision.createDate` — Field 'RiskApplicationSDKRevision.createDate' is deprecated
- `FIELD_DEPRECATION_REASON_ADDED` `RiskApplicationSDKRevision.createDate` — Field 'RiskApplicationSDKRevision.createDate' has deprecation reason 'Use `createdAt` instead.'
- `FIELD_DEPRECATION_ADDED` `RiskApplicationSDKRevision.updateDate` — Field 'RiskApplicationSDKRevision.updateDate' is deprecated
- `FIELD_DEPRECATION_REASON_ADDED` `RiskApplicationSDKRevision.updateDate` — Field 'RiskApplicationSDKRevision.updateDate' has deprecation reason 'Use `updatedAt` instead.'
- `FIELD_ADDED` `PaymentCardDigitalWalletTokenGooglePayPushProvisioning.googleOpaquePaymentCard` — Field 'googleOpaquePaymentCard' was added to object type 'PaymentCardDigitalWalletTokenGooglePayPushProvisioning'

</details>

<details><summary><strong>2026-11-19</strong> — scl_750291c5f2a4413c9ede12134c9ac7fd (2 changes)</summary>

**NON_BREAKING** (2)

- `FIELD_ADDED` `FinancialAccountStatementInstallmentCreditPlanActivity.periodMinimumPaymentDue` — Field 'periodMinimumPaymentDue' was added to object type 'FinancialAccountStatementInstallmentCreditPlanActivity'
- `FIELD_ADDED` `FinancialAccountStatementInstallmentCreditPlanActivity.periodPaymentDue` — Field 'periodPaymentDue' was added to object type 'FinancialAccountStatementInstallmentCreditPlanActivity'

</details>

<details><summary><strong>2026-11-18</strong> — scl_f48ff6e1038b46409a9c19c4cc9bf7b4 (21 changes)</summary>

**DANGEROUS** (7)

- `ENUM_VALUE_ADDED` `IdentityVerificationResultCode.NATIONAL_ID_MATCH` — Enum value 'NATIONAL_ID_MATCH' was added to enum 'IdentityVerificationResultCode'
- `ENUM_VALUE_ADDED` `IdentityVerificationResultCode.NATIONAL_ID_MULTI_IDENTITY` — Enum value 'NATIONAL_ID_MULTI_IDENTITY' was added to enum 'IdentityVerificationResultCode'
- `ENUM_VALUE_ADDED` `AccountHolderVerificationResultCode.NATIONAL_ID_MATCH` — Enum value 'NATIONAL_ID_MATCH' was added to enum 'AccountHolderVerificationResultCode'
- `ENUM_VALUE_ADDED` `AccountHolderVerificationResultCode.NATIONAL_ID_MULTI_IDENTITY` — Enum value 'NATIONAL_ID_MULTI_IDENTITY' was added to enum 'AccountHolderVerificationResultCode'
- `INPUT_FIELD_ADDED` `PaymentCredentialInput.walletCheckout` — Input field 'walletCheckout' of type 'DigitalWalletCheckoutCredentialInput' was added to input object type 'PaymentCredentialInput'
- `UNION_MEMBER_ADDED` `AuthorizePaymentTransactionPayload` — Member 'PaymentActionRequired' was added to Union type 'AuthorizePaymentTransactionPayload'
- `UNION_MEMBER_ADDED` `ChargePaymentTransactionPayload` — Member 'PaymentActionRequired' was added to Union type 'ChargePaymentTransactionPayload'

**NON_BREAKING** (14)

- `TYPE_ADDED` `DigitalWalletCheckoutCredentialInput` — Type 'DigitalWalletCheckoutCredentialInput' was added
- `TYPE_ADDED` `ApplePayCheckoutInput` — Type 'ApplePayCheckoutInput' was added
- `TYPE_ADDED` `GooglePayCheckoutInput` — Type 'GooglePayCheckoutInput' was added
- `TYPE_ADDED` `DigitalWalletCardDisplayInput` — Type 'DigitalWalletCardDisplayInput' was added
- `TYPE_ADDED` `DigitalWalletCardFundingSource` — Type 'DigitalWalletCardFundingSource' was added
- `TYPE_ADDED` `PaymentActionRequired` — Type 'PaymentActionRequired' was added
- `TYPE_ADDED` `PaymentNextStep` — Type 'PaymentNextStep' was added
- `TYPE_ADDED` `DigitalWalletActionRequiredDetails` — Type 'DigitalWalletActionRequiredDetails' was added
- `TYPE_ADDED` `DigitalWalletAuthMethod` — Type 'DigitalWalletAuthMethod' was added
- `TYPE_ADDED` `DigitalWalletAuthenticationReason` — Type 'DigitalWalletAuthenticationReason' was added
- `TYPE_ADDED` `InitiateApplePayPaymentSessionInput` — Type 'InitiateApplePayPaymentSessionInput' was added
- `TYPE_ADDED` `InitiateApplePayPaymentSessionPayload` — Type 'InitiateApplePayPaymentSessionPayload' was added
- `TYPE_ADDED` `ApplePayMerchantSession` — Type 'ApplePayMerchantSession' was added
- `FIELD_ADDED` `Mutation.initiateApplePayPaymentSession` — Field 'initiateApplePayPaymentSession' was added to object type 'Mutation'

</details>

<details><summary><strong>2026-11-17</strong> — scl_615bda2c7b67485b90d82983bc918680 (23 changes)</summary>

**DANGEROUS** (3)

- `ENUM_VALUE_ADDED` `PaymentTransactionResponseCodeProcessorResponseCode.DUPLICATE_ORIGINAL_APPROVED` — Enum value 'DUPLICATE_ORIGINAL_APPROVED' was added to enum 'PaymentTransactionResponseCodeProcessorResponseCode'
- `ENUM_VALUE_ADDED` `PaymentTransactionResponseCodeProcessorResponseCode.DUPLICATE_ORIGINAL_DECLINED` — Enum value 'DUPLICATE_ORIGINAL_DECLINED' was added to enum 'PaymentTransactionResponseCodeProcessorResponseCode'
- `ENUM_VALUE_ADDED` `PaymentTransactionResponseCodeProcessorResponseCode.DUPLICATE_ORIGINAL_STATUS_UNKNOWN` — Enum value 'DUPLICATE_ORIGINAL_STATUS_UNKNOWN' was added to enum 'PaymentTransactionResponseCodeProcessorResponseCode'

**NON_BREAKING** (20)

- `TYPE_ADDED` `ActivityLogChannel` — Type 'ActivityLogChannel' was added
- `TYPE_ADDED` `PaymentCardPcvvReference` — Type 'PaymentCardPcvvReference' was added
- `FIELD_ADDED` `PaymentCardSnapshot.updatedVia` — Field 'updatedVia' was added to object type 'PaymentCardSnapshot'
- `FIELD_ADDED` `AuthorizationEvent.pcvv` — Field 'pcvv' was added to object type 'AuthorizationEvent'
- `FIELD_ADDED` `IssuerPreliminaryAuthorizationEvent.pcvv` — Field 'pcvv' was added to object type 'IssuerPreliminaryAuthorizationEvent'
- `FIELD_ADDED` `PaymentCardTransactionEvent.pcvv` — Field 'pcvv' was added to interface 'PaymentCardTransactionEvent'
- `FIELD_ADDED` `PaymentCardAuthorizationApprovedEvent.pcvv` — Field 'pcvv' was added to object type 'PaymentCardAuthorizationApprovedEvent'
- `FIELD_ADDED` `PaymentCardAuthorizationCreatedEvent.pcvv` — Field 'pcvv' was added to object type 'PaymentCardAuthorizationCreatedEvent'
- `FIELD_ADDED` `PaymentCardAuthorizationDeclinedEvent.pcvv` — Field 'pcvv' was added to object type 'PaymentCardAuthorizationDeclinedEvent'
- `FIELD_ADDED` `PaymentCardAuthorizationReversedEvent.pcvv` — Field 'pcvv' was added to object type 'PaymentCardAuthorizationReversedEvent'
- `FIELD_ADDED` `PaymentCardClearedEvent.pcvv` — Field 'pcvv' was added to object type 'PaymentCardClearedEvent'
- `FIELD_ADDED` `PaymentCardEnhancedDataEvent.pcvv` — Field 'pcvv' was added to object type 'PaymentCardEnhancedDataEvent'
- `FIELD_ADDED` `PaymentCardAuthorizationAndClearApprovedEvent.pcvv` — Field 'pcvv' was added to object type 'PaymentCardAuthorizationAndClearApprovedEvent'
- `FIELD_ADDED` `PaymentCardAuthorizationAndClearDeclinedEvent.pcvv` — Field 'pcvv' was added to object type 'PaymentCardAuthorizationAndClearDeclinedEvent'
- `FIELD_ADDED` `PaymentCardVerificationApprovedEvent.pcvv` — Field 'pcvv' was added to object type 'PaymentCardVerificationApprovedEvent'
- `FIELD_ADDED` `PaymentCardVerificationDeclinedEvent.pcvv` — Field 'pcvv' was added to object type 'PaymentCardVerificationDeclinedEvent'
- `FIELD_ADDED` `PaymentCardAdjustmentEvent.pcvv` — Field 'pcvv' was added to object type 'PaymentCardAdjustmentEvent'
- `FIELD_ADDED` `AuthorizationAndClearEvent.pcvv` — Field 'pcvv' was added to object type 'AuthorizationAndClearEvent'
- `FIELD_ADDED` `VerificationEvent.pcvv` — Field 'pcvv' was added to object type 'VerificationEvent'
- `FIELD_ADDED` `BalanceInquiryEvent.pcvv` — Field 'pcvv' was added to object type 'BalanceInquiryEvent'

</details>

<details><summary><strong>2026-11-16</strong> — scl_74ca9a70c07d486e897405a8971ef5aa (10 changes)</summary>

**DANGEROUS** (5)

- `ENUM_VALUE_ADDED` `CardProductVertical.WALLET` — Enum value 'WALLET' was added to enum 'CardProductVertical'
- `ENUM_VALUE_ADDED` `NotificationEventName.CARD_PAYMENT_DISPUTE_INQUIRY_UPDATED` — Enum value 'CARD_PAYMENT_DISPUTE_INQUIRY_UPDATED' was added to enum 'NotificationEventName'
- `ENUM_VALUE_ADDED` `NotificationEventName.CARD_PAYMENT_DISPUTE_SUBMISSION_FAILED` — Enum value 'CARD_PAYMENT_DISPUTE_SUBMISSION_FAILED' was added to enum 'NotificationEventName'
- `ENUM_VALUE_ADDED` `NotificationEventName.CARD_PAYMENT_DISPUTE_EVIDENCE_RECEIVED` — Enum value 'CARD_PAYMENT_DISPUTE_EVIDENCE_RECEIVED' was added to enum 'NotificationEventName'
- `INPUT_FIELD_ADDED` `BindCardAuthenticationContactChannelInput.threeDsStepUpEnabled` — Input field 'threeDsStepUpEnabled' of type 'Boolean' was added to input object type 'BindCardAuthenticationContactChannelInput'

**NON_BREAKING** (5)

- `TYPE_ADDED` `WalletAcquiringCardProductFeature` — Type 'WalletAcquiringCardProductFeature' was added
- `TYPE_ADDED` `DigitalWalletProvisioningStepUpReason` — Type 'DigitalWalletProvisioningStepUpReason' was added
- `TYPE_ADDED` `CardPaymentDisputeInquiryStage` — Type 'CardPaymentDisputeInquiryStage' was added
- `FIELD_ADDED` `DigitalCardProfileTokenProvisioningControls.stepUpOnProvisioningReasons` — Field 'stepUpOnProvisioningReasons' was added to object type 'DigitalCardProfileTokenProvisioningControls'
- `FIELD_ADDED` `CardAuthenticationContact.threeDsStepUp` — Field 'threeDsStepUp' was added to object type 'CardAuthenticationContact'

</details>

<details><summary><strong>2026-11-13</strong> — scl_d62fa4f04643424c8fc8079e88492ebe (10 changes)</summary>

**DANGEROUS** (3)

- `UNION_MEMBER_ADDED` `FeeChargeActivity` — Member 'FinancialAccountStatementInstallmentFeeChargeActivity' was added to Union type 'FeeChargeActivity'
- `ENUM_VALUE_ADDED` `FeeTransferEventFeeActivityType.MONTHLY_CARD_FEE` — Enum value 'MONTHLY_CARD_FEE' was added to enum 'FeeTransferEventFeeActivityType'
- `ENUM_VALUE_ADDED` `FeeTransferEventFeeActivityTypeInput.MONTHLY_CARD_FEE` — Enum value 'MONTHLY_CARD_FEE' was added to enum 'FeeTransferEventFeeActivityTypeInput'

**NON_BREAKING** (7)

- `TYPE_ADDED` `ChargeAccountHolderFeeInput` — Type 'ChargeAccountHolderFeeInput' was added
- `TYPE_ADDED` `AccountHolderFeeInput` — Type 'AccountHolderFeeInput' was added
- `TYPE_ADDED` `MonthlyCardFeeInput` — Type 'MonthlyCardFeeInput' was added
- `TYPE_ADDED` `ChargeAccountHolderFeePayload` — Type 'ChargeAccountHolderFeePayload' was added
- `TYPE_ADDED` `FinancialAccountStatementInstallmentFeeChargeActivity` — Type 'FinancialAccountStatementInstallmentFeeChargeActivity' was added
- `FIELD_ADDED` `Mutation.chargeAccountHolderFee` — Field 'chargeAccountHolderFee' was added to object type 'Mutation'
- `FIELD_ADDED` `FinancialAccountStatementInstallmentCreditPlanActivity.id` — Field 'id' was added to object type 'FinancialAccountStatementInstallmentCreditPlanActivity'

</details>

<details><summary><strong>2026-11-11</strong> — scl_b047451c6b75426f85e054da3cb8589f (7 changes)</summary>

**DANGEROUS** (2)

- `ENUM_VALUE_ADDED` `AchTransferStatusFailureReason.AMOUNT_LIMIT_EXCEEDED` — Enum value 'AMOUNT_LIMIT_EXCEEDED' was added to enum 'AchTransferStatusFailureReason'
- `INPUT_FIELD_ADDED` `ChargePaymentTransactionInput.accountFunding` — Input field 'accountFunding' of type 'AccountFundingTransactionInput' was added to input object type 'ChargePaymentTransactionInput'

**NON_BREAKING** (5)

- `TYPE_ADDED` `PaymentCardThreeDSecureAuthenticationDecidedBy` — Type 'PaymentCardThreeDSecureAuthenticationDecidedBy' was added
- `TYPE_ADDED` `AccountFundingTransactionInput` — Type 'AccountFundingTransactionInput' was added
- `TYPE_ADDED` `EndCustomerReferenceInput` — Type 'EndCustomerReferenceInput' was added
- `FIELD_ADDED` `PaymentCardThreeDSecureAuthentication.decidedBy` — Field 'decidedBy' was added to object type 'PaymentCardThreeDSecureAuthentication'
- `FIELD_ADDED` `CardCaptureStepSummary.holdReason` — Field 'holdReason' was added to object type 'CardCaptureStepSummary'

</details>

<details><summary><strong>2026-11-10</strong> — scl_637efc51ef8c4d209212427b1c37e763 (3 changes)</summary>

**NON_BREAKING** (3)

- `TYPE_ADDED` `CardPaymentDisputePage` — Type 'CardPaymentDisputePage' was added
- `TYPE_ADDED` `CardPaymentDisputePagePayload` — Type 'CardPaymentDisputePagePayload' was added
- `FIELD_ADDED` `Organization.cardPaymentDisputesPage` — Field 'cardPaymentDisputesPage' was added to object type 'Organization'

</details>

<details><summary><strong>2026-11-09</strong> — scl_37129ee1f4774341b968eea416eb6579 (3 changes)</summary>

**DANGEROUS** (2)

- `ENUM_VALUE_ADDED` `InterFinancialAccountTransferActivityType.CODE_SPEND_RECEIVABLE_PURCHASE` — Enum value 'CODE_SPEND_RECEIVABLE_PURCHASE' was added to enum 'InterFinancialAccountTransferActivityType'
- `ENUM_VALUE_ADDED` `InterFinancialAccountTransferActivityType.CODE_SPEND_RECEIVABLE_PURCHASE_REVERSAL` — Enum value 'CODE_SPEND_RECEIVABLE_PURCHASE_REVERSAL' was added to enum 'InterFinancialAccountTransferActivityType'

**NON_BREAKING** (1)

- `INPUT_FIELD_TYPE_CHANGED` `ReevaluateApplicationInput.productApplicationWorkflowConfigurationId` — Input field 'ReevaluateApplicationInput.productApplicationWorkflowConfigurationId' changed type from 'ID!' to 'ID'

</details>

### Review checklist

- [ ] If `breaking_count > 0`: triage each path per the guidance above
- [ ] Skim the docs diff (`docs/SDK_REFERENCE.md`, `docs/resources/*.md`) for new/renamed types
- [ ] Decide version bump: patch (docs/desc only), minor (new fields/enums), major (SDK surface broke)

> Body generated by `scripts/fetch-schema-changelog.ts` from `Query.schemaChangelogs` (env: `test`, lookback: 14 days).