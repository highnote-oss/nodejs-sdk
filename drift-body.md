## Schema Drift Detected

Highest criticality in the last 14 days: **DANGEROUS** (across 8 deployments).

### Deployments included

<details><summary><strong>2026-11-05</strong> — scl_48066041abc74740b894c0a2c45221dd (11 changes)</summary>

**DANGEROUS** (1)

- `OBJECT_TYPE_INTERFACE_ADDED` `WalletPayment` — 'WalletPayment' object implements 'Node' interface

**NON_BREAKING** (10)

- `TYPE_ADDED` `PaymentCardPcvvRotationType` — Type 'PaymentCardPcvvRotationType' was added
- `TYPE_ADDED` `PaymentCardPcvvSettings` — Type 'PaymentCardPcvvSettings' was added
- `TYPE_ADDED` `PaymentCardPcvvRestrictionsInput` — Type 'PaymentCardPcvvRestrictionsInput' was added
- `TYPE_ADDED` `IssuePaymentCardPcvvInput` — Type 'IssuePaymentCardPcvvInput' was added
- `TYPE_ADDED` `PaymentCardPcvvRestrictions` — Type 'PaymentCardPcvvRestrictions' was added
- `TYPE_ADDED` `PaymentCardPcvv` — Type 'PaymentCardPcvv' was added
- `TYPE_ADDED` `IssuePaymentCardPcvvPayload` — Type 'IssuePaymentCardPcvvPayload' was added
- `FIELD_ADDED` `Mutation.issuePaymentCardPcvv` — Field 'issuePaymentCardPcvv' was added to object type 'Mutation'
- `FIELD_ADDED` `PaymentCard.pcvvSettings` — Field 'pcvvSettings' was added to object type 'PaymentCard'
- `FIELD_ADDED` `PaymentCardRestrictedDetails.pcvvs` — Field 'pcvvs' was added to object type 'PaymentCardRestrictedDetails'

</details>

<details><summary><strong>2026-11-04</strong> — scl_629a6c8566d849a19b897e845290d256 (31 changes)</summary>

**DANGEROUS** (11)

- `ENUM_VALUE_ADDED` `PaymentCardShippingMethod.NEXT_DAY_USPS_PRIORITY` — Enum value 'NEXT_DAY_USPS_PRIORITY' was added to enum 'PaymentCardShippingMethod'
- `ENUM_VALUE_ADDED` `PaymentCardShippingMethod.NEXT_DAY_USPS_EXPRESS` — Enum value 'NEXT_DAY_USPS_EXPRESS' was added to enum 'PaymentCardShippingMethod'
- `ENUM_VALUE_ADDED` `PaymentCardShippingMethod.NEXT_DAY_FEDEX_2_DAY` — Enum value 'NEXT_DAY_FEDEX_2_DAY' was added to enum 'PaymentCardShippingMethod'
- `ENUM_VALUE_ADDED` `PaymentCardShippingMethod.NEXT_DAY_FEDEX_OVERNIGHT` — Enum value 'NEXT_DAY_FEDEX_OVERNIGHT' was added to enum 'PaymentCardShippingMethod'
- `ENUM_VALUE_ADDED` `PaymentCardShippingMethod.NEXT_DAY_FEDEX_OVERNIGHT_SATURDAY_DELIVERY` — Enum value 'NEXT_DAY_FEDEX_OVERNIGHT_SATURDAY_DELIVERY' was added to enum 'PaymentCardShippingMethod'
- `ENUM_VALUE_ADDED` `PaymentCardShippingMethod.NEXT_DAY_FEDEX_FIRST_OVERNIGHT_SATURDAY_DELIVERY` — Enum value 'NEXT_DAY_FEDEX_FIRST_OVERNIGHT_SATURDAY_DELIVERY' was added to enum 'PaymentCardShippingMethod'
- `ENUM_VALUE_ADDED` `PaymentCardShippingMethod.NEXT_DAY_FEDEX_PRIORITY_OVERNIGHT_SATURDAY_DELIVERY` — Enum value 'NEXT_DAY_FEDEX_PRIORITY_OVERNIGHT_SATURDAY_DELIVERY' was added to enum 'PaymentCardShippingMethod'
- `ENUM_VALUE_ADDED` `PricingRuleTrigger.ESTIMATE` — Enum value 'ESTIMATE' was added to enum 'PricingRuleTrigger'
- `UNION_MEMBER_ADDED` `TransactionSearchSource` — Member 'WalletPayment' was added to Union type 'TransactionSearchSource'
- `UNION_MEMBER_ADDED` `TransactionSearchSource` — Member 'WalletPaymentEvent' was added to Union type 'TransactionSearchSource'
- `ENUM_VALUE_ADDED` `TransactionSearchObjectType.WALLET_PAYMENT` — Enum value 'WALLET_PAYMENT' was added to enum 'TransactionSearchObjectType'

**NON_BREAKING** (20)

- `TYPE_ADDED` `CreateEndCustomerInput` — Type 'CreateEndCustomerInput' was added
- `TYPE_ADDED` `UpdateEndCustomerInput` — Type 'UpdateEndCustomerInput' was added
- `TYPE_ADDED` `CreateEndCustomerPayload` — Type 'CreateEndCustomerPayload' was added
- `TYPE_ADDED` `UpdateEndCustomerPayload` — Type 'UpdateEndCustomerPayload' was added
- `TYPE_ADDED` `WalletPayment` — Type 'WalletPayment' was added
- `TYPE_ADDED` `WalletPaymentEvent` — Type 'WalletPaymentEvent' was added
- `TYPE_ADDED` `WalletPaymentEventType` — Type 'WalletPaymentEventType' was added
- `TYPE_ADDED` `WalletPaymentKind` — Type 'WalletPaymentKind' was added
- `TYPE_ADDED` `WalletPaymentReference` — Type 'WalletPaymentReference' was added
- `TYPE_ADDED` `AcquiringEnhancedData` — Type 'AcquiringEnhancedData' was added
- `TYPE_ADDED` `AcquiringVisaEnhancedData` — Type 'AcquiringVisaEnhancedData' was added
- `TYPE_ADDED` `AcquiringVisaEnhancedDataHeader` — Type 'AcquiringVisaEnhancedDataHeader' was added
- `TYPE_ADDED` `AcquiringVisaEnhancedDataLineItem` — Type 'AcquiringVisaEnhancedDataLineItem' was added
- `TYPE_ADDED` `AcquiringMastercardEnhancedData` — Type 'AcquiringMastercardEnhancedData' was added
- `TYPE_ADDED` `AcquiringMastercardEnhancedDataHeader` — Type 'AcquiringMastercardEnhancedDataHeader' was added
- `TYPE_ADDED` `AcquiringMastercardEnhancedDataLineItem` — Type 'AcquiringMastercardEnhancedDataLineItem' was added
- `FIELD_ADDED` `Mutation.createEndCustomer` — Field 'createEndCustomer' was added to object type 'Mutation'
- `FIELD_ADDED` `Mutation.updateEndCustomer` — Field 'updateEndCustomer' was added to object type 'Mutation'
- `FIELD_ADDED` `CardAuthorizationStep.enhancedData` — Field 'enhancedData' was added to object type 'CardAuthorizationStep'
- `FIELD_ADDED` `CardCaptureStep.enhancedData` — Field 'enhancedData' was added to object type 'CardCaptureStep'

</details>

<details><summary><strong>2026-11-03</strong> — scl_6d29cb3ab9c145e986e447e94d15e7e7 (2 changes)</summary>

**DANGEROUS** (1)

- `INPUT_FIELD_ADDED` `CardPaymentDisputesFilterInput.type` — Input field 'type' of type 'CardPaymentDisputeTypeFilterInput' was added to input object type 'CardPaymentDisputesFilterInput'

**NON_BREAKING** (1)

- `TYPE_ADDED` `CardPaymentDisputeTypeFilterInput` — Type 'CardPaymentDisputeTypeFilterInput' was added

</details>

<details><summary><strong>2026-11-02</strong> — scl_e442e626e50f4efbb04cb7d99edf3d2b (45 changes)</summary>

**DANGEROUS** (27)

- `ENUM_VALUE_ADDED` `IdentityVerificationResultCode.NATIONAL_ID_MISMATCH` — Enum value 'NATIONAL_ID_MISMATCH' was added to enum 'IdentityVerificationResultCode'
- `ENUM_VALUE_ADDED` `AccountHolderVerificationResultCode.NATIONAL_ID_MISMATCH` — Enum value 'NATIONAL_ID_MISMATCH' was added to enum 'AccountHolderVerificationResultCode'
- `UNION_MEMBER_ADDED` `GlobalNotePrimaryEntity` — Member 'AccountReceivable' was added to Union type 'GlobalNotePrimaryEntity'
- `ENUM_VALUE_ADDED` `GlobalNotePrimaryEntityType.ACCOUNT_RECEIVABLE` — Enum value 'ACCOUNT_RECEIVABLE' was added to enum 'GlobalNotePrimaryEntityType'
- `UNION_MEMBER_ADDED` `FinancialEvent` — Member 'AccountReceivableTransactionEvent' was added to Union type 'FinancialEvent'
- `ENUM_VALUE_ADDED` `NotificationEventName.CARD_PAYMENT_DISPUTE_PRE_COMPLIANCE_UPDATED` — Enum value 'CARD_PAYMENT_DISPUTE_PRE_COMPLIANCE_UPDATED' was added to enum 'NotificationEventName'
- `ENUM_VALUE_ADDED` `NotificationEventName.CARD_PAYMENT_DISPUTE_PRE_COMPLIANCE_RESPONSE_UPDATED` — Enum value 'CARD_PAYMENT_DISPUTE_PRE_COMPLIANCE_RESPONSE_UPDATED' was added to enum 'NotificationEventName'
- `ENUM_VALUE_ADDED` `NotificationEventName.CARD_PAYMENT_DISPUTE_COMPLIANCE_UPDATED` — Enum value 'CARD_PAYMENT_DISPUTE_COMPLIANCE_UPDATED' was added to enum 'NotificationEventName'
- `ENUM_VALUE_ADDED` `SimulateCardPaymentDisputeNetworkReasonCode.VISA_AUTHORIZATION_REQUIREMENTS` — Enum value 'VISA_AUTHORIZATION_REQUIREMENTS' was added to enum 'SimulateCardPaymentDisputeNetworkReasonCode'
- `ENUM_VALUE_ADDED` `SimulateCardPaymentDisputeNetworkReasonCode.VISA_CREDIT_REFUND_REQUIREMENTS` — Enum value 'VISA_CREDIT_REFUND_REQUIREMENTS' was added to enum 'SimulateCardPaymentDisputeNetworkReasonCode'
- `ENUM_VALUE_ADDED` `SimulateCardPaymentDisputeNetworkReasonCode.VISA_SURCHARGES_AND_TAXES` — Enum value 'VISA_SURCHARGES_AND_TAXES' was added to enum 'SimulateCardPaymentDisputeNetworkReasonCode'
- `ENUM_VALUE_ADDED` `SimulateCardPaymentDisputeNetworkReasonCode.VISA_PAYMENT_OF_EXISTING_DEBT` — Enum value 'VISA_PAYMENT_OF_EXISTING_DEBT' was added to enum 'SimulateCardPaymentDisputeNetworkReasonCode'
- `ENUM_VALUE_ADDED` `SimulateCardPaymentDisputeNetworkReasonCode.VISA_AMENDED_AMOUNTS_OR_DELAYED_CHARGES` — Enum value 'VISA_AMENDED_AMOUNTS_OR_DELAYED_CHARGES' was added to enum 'SimulateCardPaymentDisputeNetworkReasonCode'
- `ENUM_VALUE_ADDED` `SimulateCardPaymentDisputeNetworkReasonCode.VISA_FRAUDULENT_CREDITS` — Enum value 'VISA_FRAUDULENT_CREDITS' was added to enum 'SimulateCardPaymentDisputeNetworkReasonCode'
- `ENUM_VALUE_ADDED` `SimulateCardPaymentDisputeNetworkReasonCode.VISA_TRANSACTION_REVERSAL_OR_ADJUSTMENT` — Enum value 'VISA_TRANSACTION_REVERSAL_OR_ADJUSTMENT' was added to enum 'SimulateCardPaymentDisputeNetworkReasonCode'
- `ENUM_VALUE_ADDED` `SimulateCardPaymentDisputeNetworkReasonCode.VISA_RESERVATION_SERVICE` — Enum value 'VISA_RESERVATION_SERVICE' was added to enum 'SimulateCardPaymentDisputeNetworkReasonCode'
- `ENUM_VALUE_ADDED` `SimulateCardPaymentDisputeNetworkReasonCode.VISA_CHARGEBACK_REDUCTION_SERVICE_RETURN` — Enum value 'VISA_CHARGEBACK_REDUCTION_SERVICE_RETURN' was added to enum 'SimulateCardPaymentDisputeNetworkReasonCode'
- `ENUM_VALUE_ADDED` `SimulateCardPaymentDisputeNetworkReasonCode.VISA_SPLIT_TRANSACTION` — Enum value 'VISA_SPLIT_TRANSACTION' was added to enum 'SimulateCardPaymentDisputeNetworkReasonCode'
- `ENUM_VALUE_ADDED` `SimulateCardPaymentDisputeNetworkReasonCode.VISA_OTHER_RULE_VIOLATION` — Enum value 'VISA_OTHER_RULE_VIOLATION' was added to enum 'SimulateCardPaymentDisputeNetworkReasonCode'
- `ENUM_VALUE_ADDED` `SimulateCardPaymentDisputeNetworkReasonCode.VISA_CAVV_REUSE` — Enum value 'VISA_CAVV_REUSE' was added to enum 'SimulateCardPaymentDisputeNetworkReasonCode'
- `ENUM_VALUE_ADDED` `SimulateCardPaymentDisputeNetworkReasonCode.VISA_MERCHANT_USE_OF_PAYMENT_CREDENTIAL` — Enum value 'VISA_MERCHANT_USE_OF_PAYMENT_CREDENTIAL' was added to enum 'SimulateCardPaymentDisputeNetworkReasonCode'
- `ENUM_VALUE_ADDED` `SimulateCardPaymentDisputeNetworkReasonCode.VISA_LIMITS_OF_FEE_COLLECTION_RETURNS` — Enum value 'VISA_LIMITS_OF_FEE_COLLECTION_RETURNS' was added to enum 'SimulateCardPaymentDisputeNetworkReasonCode'
- `ENUM_VALUE_ADDED` `SimulateCardPaymentDisputeNetworkReasonCode.VISA_CARDHOLDER_LETTER_REQUIRED_FOR_LEGAL_PURPOSES` — Enum value 'VISA_CARDHOLDER_LETTER_REQUIRED_FOR_LEGAL_PURPOSES' was added to enum 'SimulateCardPaymentDisputeNetworkReasonCode'
- `ENUM_VALUE_ADDED` `SimulateCardPaymentDisputeNetworkReasonCode.VISA_NO_VALID_FORM_OF_IDENTIFICATION` — Enum value 'VISA_NO_VALID_FORM_OF_IDENTIFICATION' was added to enum 'SimulateCardPaymentDisputeNetworkReasonCode'
- `UNION_MEMBER_ADDED` `TransactionSearchSource` — Member 'AccountReceivableTransaction' was added to Union type 'TransactionSearchSource'
- `UNION_MEMBER_ADDED` `TransactionSearchSource` — Member 'AccountReceivableTransactionEvent' was added to Union type 'TransactionSearchSource'
- `ENUM_VALUE_ADDED` `TransactionSearchObjectType.ACCOUNT_RECEIVABLE` — Enum value 'ACCOUNT_RECEIVABLE' was added to enum 'TransactionSearchObjectType'

**NON_BREAKING** (18)

- `TYPE_ADDED` `AccountReceivablePayment` — Type 'AccountReceivablePayment' was added
- `TYPE_ADDED` `AccountReceivablePaymentStatus` — Type 'AccountReceivablePaymentStatus' was added
- `TYPE_ADDED` `AccountReceivableCollectionItem` — Type 'AccountReceivableCollectionItem' was added
- `TYPE_ADDED` `AccountReceivableCollectionSource` — Type 'AccountReceivableCollectionSource' was added
- `TYPE_ADDED` `AccountReceivableCollectionItemStatus` — Type 'AccountReceivableCollectionItemStatus' was added
- `TYPE_ADDED` `AccountReceivableTransaction` — Type 'AccountReceivableTransaction' was added
- `TYPE_ADDED` `AccountReceivableTransactionType` — Type 'AccountReceivableTransactionType' was added
- `TYPE_ADDED` `AccountReceivableTransactionStatus` — Type 'AccountReceivableTransactionStatus' was added
- `TYPE_ADDED` `AccountReceivableTransactionEvent` — Type 'AccountReceivableTransactionEvent' was added
- `TYPE_ADDED` `AccountReceivableTransactionEventType` — Type 'AccountReceivableTransactionEventType' was added
- `TYPE_ADDED` `AccountReceivableTransactionEventStatus` — Type 'AccountReceivableTransactionEventStatus' was added
- `TYPE_ADDED` `CardPaymentDisputePreComplianceStage` — Type 'CardPaymentDisputePreComplianceStage' was added
- `TYPE_ADDED` `CardPaymentDisputePreComplianceResponseStage` — Type 'CardPaymentDisputePreComplianceResponseStage' was added
- `TYPE_ADDED` `CardPaymentDisputeComplianceStage` — Type 'CardPaymentDisputeComplianceStage' was added
- `TYPE_ADDED` `CardPaymentDisputeType` — Type 'CardPaymentDisputeType' was added
- `FIELD_ADDED` `AccountReceivable.externalId` — Field 'externalId' was added to object type 'AccountReceivable'
- `FIELD_ADDED` `AccountReceivable.globalNotes` — Field 'globalNotes' was added to object type 'AccountReceivable'
- `FIELD_ADDED` `CardPaymentDispute.type` — Field 'type' was added to object type 'CardPaymentDispute'

</details>

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

### Review checklist

- [ ] If `breaking_count > 0`: triage each path per the guidance above
- [ ] Skim the docs diff (`docs/SDK_REFERENCE.md`, `docs/resources/*.md`) for new/renamed types
- [ ] Decide version bump: patch (docs/desc only), minor (new fields/enums), major (SDK surface broke)

> Body generated by `scripts/fetch-schema-changelog.ts` from `Query.schemaChangelogs` (env: `test`, lookback: 14 days).