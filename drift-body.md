## Schema Drift Detected

Highest criticality in the last 14 days: **DANGEROUS** (across 7 deployments).

### Deployments included

<details><summary><strong>2026-10-29</strong> — scl_229f0651238d447886dc3463b7badd10 (23 changes)</summary>

**DANGEROUS** (3)

- `INPUT_FIELD_ADDED` `ProcessingCapabilityInput.amexServiceEstablishmentNumber` — Input field 'amexServiceEstablishmentNumber' of type 'String' was added to input object type 'ProcessingCapabilityInput'
- `INPUT_FIELD_ADDED` `ProcessingCapabilityInput.amexTerminalIdentifier` — Input field 'amexTerminalIdentifier' of type 'String' was added to input object type 'ProcessingCapabilityInput'
- `INPUT_FIELD_ADDED` `SimulateFeeConfigurationInput.configuredConditions` — Input field 'configuredConditions' of type '[FeeConditionInput!]' was added to input object type 'SimulateFeeConfigurationInput'

**NON_BREAKING** (20)

- `TYPE_ADDED` `FeeScheduleAttachment` — Type 'FeeScheduleAttachment' was added
- `TYPE_ADDED` `FeeScheduleCardProductAttachment` — Type 'FeeScheduleCardProductAttachment' was added
- `TYPE_ADDED` `FeeScheduleFinancialAccountAttachment` — Type 'FeeScheduleFinancialAccountAttachment' was added
- `TYPE_ADDED` `FeeScheduleAttachmentFilterInput` — Type 'FeeScheduleAttachmentFilterInput' was added
- `TYPE_ADDED` `FinancialAccountFeeScheduleAttachmentFilterInput` — Type 'FinancialAccountFeeScheduleAttachmentFilterInput' was added
- `TYPE_ADDED` `FeeScheduleAttachmentConnection` — Type 'FeeScheduleAttachmentConnection' was added
- `TYPE_ADDED` `FeeScheduleAttachmentEdge` — Type 'FeeScheduleAttachmentEdge' was added
- `TYPE_ADDED` `FeeConditionInput` — Type 'FeeConditionInput' was added
- `TYPE_ADDED` `FeeCondition` — Type 'FeeCondition' was added
- `TYPE_ADDED` `FeeConditionField` — Type 'FeeConditionField' was added
- `TYPE_ADDED` `FeeConditionOperator` — Type 'FeeConditionOperator' was added
- `TYPE_ADDED` `FeeScheduleAttachmentType` — Type 'FeeScheduleAttachmentType' was added
- `FIELD_ADDED` `CardProcessingCapability.amexServiceEstablishmentNumber` — Field 'amexServiceEstablishmentNumber' was added to object type 'CardProcessingCapability'
- `FIELD_ADDED` `CardProcessingCapability.amexTerminalIdentifier` — Field 'amexTerminalIdentifier' was added to object type 'CardProcessingCapability'
- `FIELD_ADDED` `FinancialAccount.attachedFeeSchedules` — Field 'attachedFeeSchedules' was added to object type 'FinancialAccount'
- `FIELD_ADDED` `FeeSchedule.attachmentType` — Field 'attachmentType' was added to object type 'FeeSchedule'
- `FIELD_ADDED` `FeeSchedule.attachments` — Field 'attachments' was added to object type 'FeeSchedule'
- `FIELD_DEPRECATION_ADDED` `FeeSchedule.feeScheduleAssociatedTo` — Field 'FeeSchedule.feeScheduleAssociatedTo' is deprecated
- `FIELD_DEPRECATION_REASON_ADDED` `FeeSchedule.feeScheduleAssociatedTo` — Field 'FeeSchedule.feeScheduleAssociatedTo' has deprecation reason 'Use `attachments` instead.'
- `FIELD_ADDED` `FeeConfiguration.configuredConditions` — Field 'configuredConditions' was added to object type 'FeeConfiguration'

</details>

<details><summary><strong>2026-10-28</strong> — scl_c8180b9223b54c5f8667fd458bd70fff (4 changes)</summary>

**NON_BREAKING** (4)

- `TYPE_ADDED` `RtpTransferReferences` — Type 'RtpTransferReferences' was added
- `TYPE_ADDED` `FedNowTransferReferences` — Type 'FedNowTransferReferences' was added
- `FIELD_ADDED` `RtpTransferBankTransferDetails.references` — Field 'references' was added to object type 'RtpTransferBankTransferDetails'
- `FIELD_ADDED` `FedNowTransferBankTransferDetails.references` — Field 'references' was added to object type 'FedNowTransferBankTransferDetails'

</details>

<details><summary><strong>2026-10-27</strong> — scl_bc32ac20c24c4eef9831ff2ba72d88f7 (12 changes)</summary>

**DANGEROUS** (3)

- `INPUT_FIELD_DEFAULT_VALUE_CHANGED` `UpdateUSPersonAccountHolderBillingAddressInput.updatePaymentCardBillingAddress` — Input field 'UpdateUSPersonAccountHolderBillingAddressInput.updatePaymentCardBillingAddress' default value changed from 'false' to 'true'
- `INPUT_FIELD_DEFAULT_VALUE_CHANGED` `UpdateUSPersonAuthorizedUserBillingAddressInput.updatePaymentCardBillingAddress` — Input field 'UpdateUSPersonAuthorizedUserBillingAddressInput.updatePaymentCardBillingAddress' default value changed from 'false' to 'true'
- `INPUT_FIELD_DEFAULT_VALUE_CHANGED` `UpdateUSBusinessAccountHolderBillingAddressInput.updatePaymentCardBillingAddress` — Input field 'UpdateUSBusinessAccountHolderBillingAddressInput.updatePaymentCardBillingAddress' default value changed from 'false' to 'true'

**NON_BREAKING** (9)

- `TYPE_ADDED` `PaymentCardThreeDSecureAuthentication` — Type 'PaymentCardThreeDSecureAuthentication' was added
- `TYPE_ADDED` `PaymentCardThreeDSecureAuthenticationStatus` — Type 'PaymentCardThreeDSecureAuthenticationStatus' was added
- `TYPE_ADDED` `PaymentCardThreeDSecureAuthenticationFlow` — Type 'PaymentCardThreeDSecureAuthenticationFlow' was added
- `TYPE_ADDED` `AttachFeeScheduleToFinancialAccountPayload` — Type 'AttachFeeScheduleToFinancialAccountPayload' was added
- `TYPE_ADDED` `DetachFeeScheduleFromFinancialAccountPayload` — Type 'DetachFeeScheduleFromFinancialAccountPayload' was added
- `TYPE_ADDED` `AttachFeeScheduleToFinancialAccountInput` — Type 'AttachFeeScheduleToFinancialAccountInput' was added
- `TYPE_ADDED` `DetachFeeScheduleFromFinancialAccountInput` — Type 'DetachFeeScheduleFromFinancialAccountInput' was added
- `FIELD_ADDED` `Mutation.attachFeeScheduleToFinancialAccount` — Field 'attachFeeScheduleToFinancialAccount' was added to object type 'Mutation'
- `FIELD_ADDED` `Mutation.detachFeeScheduleFromFinancialAccount` — Field 'detachFeeScheduleFromFinancialAccount' was added to object type 'Mutation'

</details>

<details><summary><strong>2026-10-26</strong> — scl_3a3bd85f550840bfa85fd32f262dad8d (30 changes)</summary>

**DANGEROUS** (6)

- `UNION_MEMBER_ADDED` `CapturePaymentTransactionPayload` — Member 'WalletCaptureStepSummary' was added to Union type 'CapturePaymentTransactionPayload'
- `UNION_MEMBER_ADDED` `RefundPaymentTransactionPayload` — Member 'WalletRefundStepSummary' was added to Union type 'RefundPaymentTransactionPayload'
- `UNION_MEMBER_ADDED` `RefundCaptureStepPayload` — Member 'WalletRefundStepSummary' was added to Union type 'RefundCaptureStepPayload'
- `UNION_MEMBER_ADDED` `AuthorizePaymentTransactionPayload` — Member 'WalletAuthorizationStepSummary' was added to Union type 'AuthorizePaymentTransactionPayload'
- `UNION_MEMBER_ADDED` `ReversePaymentTransactionPayload` — Member 'WalletReversalStepSummary' was added to Union type 'ReversePaymentTransactionPayload'
- `INPUT_FIELD_ADDED` `AcquiringMastercardEnhancedDataInput.lineItems` — Input field 'lineItems' of type '[AcquiringMastercardEnhancedDataLineItemInput!]' was added to input object type 'AcquiringMastercardEnhancedDataInput'

**NON_BREAKING** (24)

- `TYPE_ADDED` `BusinessAssociatedPersonInput` — Type 'BusinessAssociatedPersonInput' was added
- `TYPE_ADDED` `AddBeneficialOwnersInput` — Type 'AddBeneficialOwnersInput' was added
- `TYPE_ADDED` `IncomingPrimaryAuthorizedPersonInput` — Type 'IncomingPrimaryAuthorizedPersonInput' was added
- `TYPE_ADDED` `ReplacePrimaryAuthorizedPersonInput` — Type 'ReplacePrimaryAuthorizedPersonInput' was added
- `TYPE_ADDED` `UpdateBeneficialOwnershipInput` — Type 'UpdateBeneficialOwnershipInput' was added
- `TYPE_ADDED` `AddBeneficialOwnersPayload` — Type 'AddBeneficialOwnersPayload' was added
- `TYPE_ADDED` `ReplacePrimaryAuthorizedPersonPayload` — Type 'ReplacePrimaryAuthorizedPersonPayload' was added
- `TYPE_ADDED` `UpdateBeneficialOwnershipPayload` — Type 'UpdateBeneficialOwnershipPayload' was added
- `TYPE_ADDED` `IncomingPersonConsentInput` — Type 'IncomingPersonConsentInput' was added
- `TYPE_ADDED` `WalletPaymentMethodStatus` — Type 'WalletPaymentMethodStatus' was added
- `TYPE_ADDED` `WalletConnection` — Type 'WalletConnection' was added
- `TYPE_ADDED` `WalletEdge` — Type 'WalletEdge' was added
- `TYPE_ADDED` `WalletRefundStepSummary` — Type 'WalletRefundStepSummary' was added
- `TYPE_ADDED` `WalletAuthorizationStepSummary` — Type 'WalletAuthorizationStepSummary' was added
- `TYPE_ADDED` `WalletCaptureStepSummary` — Type 'WalletCaptureStepSummary' was added
- `TYPE_ADDED` `WalletReversalStepSummary` — Type 'WalletReversalStepSummary' was added
- `TYPE_ADDED` `AcquiringMastercardEnhancedDataLineItemInput` — Type 'AcquiringMastercardEnhancedDataLineItemInput' was added
- `TYPE_ADDED` `AcquiringMastercardDebitCreditIndicator` — Type 'AcquiringMastercardDebitCreditIndicator' was added
- `FIELD_ADDED` `Mutation.addBeneficialOwners` — Field 'addBeneficialOwners' was added to object type 'Mutation'
- `FIELD_ADDED` `Mutation.replacePrimaryAuthorizedPerson` — Field 'replacePrimaryAuthorizedPerson' was added to object type 'Mutation'
- `FIELD_ADDED` `Mutation.updateBeneficialOwnership` — Field 'updateBeneficialOwnership' was added to object type 'Mutation'
- `FIELD_ADDED` `FinancialAccount.wallets` — Field 'wallets' was added to object type 'FinancialAccount'
- `FIELD_ADDED` `WalletPaymentMethod.status` — Field 'status' was added to object type 'WalletPaymentMethod'
- `FIELD_ADDED` `WalletPaymentMethod.createdAt` — Field 'createdAt' was added to object type 'WalletPaymentMethod'

</details>

<details><summary><strong>2026-10-22</strong> — scl_f284548a7713467fa7ed69db98532392 (21 changes)</summary>

**DANGEROUS** (5)

- `UNION_MEMBER_ADDED` `EndDocumentUploadSessionPayload` — Member 'CheckDepositDocumentUploadSession' was added to Union type 'EndDocumentUploadSessionPayload'
- `UNION_MEMBER_ADDED` `StartDocumentUploadSessionPayload` — Member 'CheckDepositDocumentUploadSession' was added to Union type 'StartDocumentUploadSessionPayload'
- `UNION_MEMBER_ADDED` `PaymentInstrument` — Member 'WalletPaymentMethod' was added to Union type 'PaymentInstrument'
- `INPUT_FIELD_ADDED` `PaymentCredentialInput.walletPaymentMethod` — Input field 'walletPaymentMethod' of type 'WalletPaymentMethodCredentialInput' was added to input object type 'PaymentCredentialInput'
- `UNION_MEMBER_ADDED` `ChargePaymentTransactionPayload` — Member 'WalletChargeStepSummary' was added to Union type 'ChargePaymentTransactionPayload'

**NON_BREAKING** (16)

- `TYPE_ADDED` `CreateWalletInput` — Type 'CreateWalletInput' was added
- `TYPE_ADDED` `WalletFundingSourceInput` — Type 'WalletFundingSourceInput' was added
- `TYPE_ADDED` `WalletFinancialAccountFundingSourceInput` — Type 'WalletFinancialAccountFundingSourceInput' was added
- `TYPE_ADDED` `CreateWalletPayload` — Type 'CreateWalletPayload' was added
- `TYPE_ADDED` `Wallet` — Type 'Wallet' was added
- `TYPE_ADDED` `WalletFundingSource` — Type 'WalletFundingSource' was added
- `TYPE_ADDED` `WalletFundingSourceNode` — Type 'WalletFundingSourceNode' was added
- `TYPE_ADDED` `WalletPaymentMethod` — Type 'WalletPaymentMethod' was added
- `TYPE_ADDED` `WalletPaymentMethodCredentialInput` — Type 'WalletPaymentMethodCredentialInput' was added
- `TYPE_ADDED` `WalletChargeStepSummary` — Type 'WalletChargeStepSummary' was added
- `TYPE_ADDED` `CheckDepositDocumentType` — Type 'CheckDepositDocumentType' was added
- `TYPE_ADDED` `CheckDepositDocumentUploadSession` — Type 'CheckDepositDocumentUploadSession' was added
- `TYPE_ADDED` `CheckDepositStatus` — Type 'CheckDepositStatus' was added
- `TYPE_ADDED` `CheckDepositFailureReason` — Type 'CheckDepositFailureReason' was added
- `TYPE_ADDED` `CheckDeposit` — Type 'CheckDeposit' was added
- `FIELD_ADDED` `Mutation.createWallet` — Field 'createWallet' was added to object type 'Mutation'

</details>

<details><summary><strong>2026-10-20</strong> — scl_f620e23fd611400db63f2e7edb2cfc7e (4 changes)</summary>

**DANGEROUS** (2)

- `ENUM_VALUE_ADDED` `LedgerName.ACCOUNT_HOLDER_FEE_HOLD` — Enum value 'ACCOUNT_HOLDER_FEE_HOLD' was added to enum 'LedgerName'
- `INPUT_FIELD_ADDED` `ProvisionCreateAccountHolderCardProductApplicationInput.bankProcessingAttributes` — Input field 'bankProcessingAttributes' of type 'BankProcessingAttributesInput' was added to input object type 'ProvisionCreateAccountHolderCardProductApplicationInput'

**NON_BREAKING** (2)

- `FIELD_ADDED` `PaymentCard.cardPersonalization` — Field 'cardPersonalization' was added to object type 'PaymentCard'
- `FIELD_ADDED` `ProvisionCreateAccountHolderCardProductApplicationActionDetail.bankProcessingAttributes` — Field 'bankProcessingAttributes' was added to object type 'ProvisionCreateAccountHolderCardProductApplicationActionDetail'

</details>

<details><summary><strong>2026-10-19</strong> — scl_c012d63a9b7d4aa78f95ed8babf661a2 (20 changes)</summary>

**DANGEROUS** (1)

- `INPUT_FIELD_ADDED` `CardHolderInput.name` — Input field 'name' of type 'CardHolderNameInput' was added to input object type 'CardHolderInput'

**NON_BREAKING** (19)

- `TYPE_ADDED` `CardHolderNameInput` — Type 'CardHolderNameInput' was added
- `TYPE_ADDED` `CheckInstrumentEligibilityDetailsInput` — Type 'CheckInstrumentEligibilityDetailsInput' was added
- `TYPE_ADDED` `InstrumentEligibilityDetailRequestInput` — Type 'InstrumentEligibilityDetailRequestInput' was added
- `TYPE_ADDED` `EligibilityInstrumentInput` — Type 'EligibilityInstrumentInput' was added
- `TYPE_ADDED` `EligibilityPaymentCardInput` — Type 'EligibilityPaymentCardInput' was added
- `TYPE_ADDED` `EligibilityPaymentCardBinInput` — Type 'EligibilityPaymentCardBinInput' was added
- `TYPE_ADDED` `CheckInstrumentEligibilityDetailsPayload` — Type 'CheckInstrumentEligibilityDetailsPayload' was added
- `TYPE_ADDED` `InstrumentEligibilityDetails` — Type 'InstrumentEligibilityDetails' was added
- `TYPE_ADDED` `InstrumentEligibilityDetailResult` — Type 'InstrumentEligibilityDetailResult' was added
- `TYPE_ADDED` `InstrumentEligibilityDetail` — Type 'InstrumentEligibilityDetail' was added
- `TYPE_ADDED` `CardEligibilityDetail` — Type 'CardEligibilityDetail' was added
- `TYPE_ADDED` `CardNetworkMoneyMovementEligibility` — Type 'CardNetworkMoneyMovementEligibility' was added
- `TYPE_ADDED` `CardNetworkTransferEligibility` — Type 'CardNetworkTransferEligibility' was added
- `TYPE_ADDED` `NetworkMoneyMovementEligibilityStatus` — Type 'NetworkMoneyMovementEligibilityStatus' was added
- `TYPE_ADDED` `PaymentCardDesignation` — Type 'PaymentCardDesignation' was added
- `TYPE_ADDED` `PaymentCardFundingSource` — Type 'PaymentCardFundingSource' was added
- `FIELD_ADDED` `Mutation.checkInstrumentEligibilityDetails` — Field 'checkInstrumentEligibilityDetails' was added to object type 'Mutation'
- `FIELD_ADDED` `LinkVerifiedExternalBankAccountVerificationRequiredEvent.externalLinkToken` — Field 'externalLinkToken' was added to object type 'LinkVerifiedExternalBankAccountVerificationRequiredEvent'
- `FIELD_ADDED` `CardHolder.name` — Field 'name' was added to object type 'CardHolder'

</details>

### Review checklist

- [ ] If `breaking_count > 0`: triage each path per the guidance above
- [ ] Skim the docs diff (`docs/SDK_REFERENCE.md`, `docs/resources/*.md`) for new/renamed types
- [ ] Decide version bump: patch (docs/desc only), minor (new fields/enums), major (SDK surface broke)

> Body generated by `scripts/fetch-schema-changelog.ts` from `Query.schemaChangelogs` (env: `test`, lookback: 14 days).