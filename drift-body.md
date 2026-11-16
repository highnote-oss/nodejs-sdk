## Schema Drift Detected

Highest criticality in the last 14 days: **DANGEROUS** (across 8 deployments).

### Deployments included

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

### Review checklist

- [ ] If `breaking_count > 0`: triage each path per the guidance above
- [ ] Skim the docs diff (`docs/SDK_REFERENCE.md`, `docs/resources/*.md`) for new/renamed types
- [ ] Decide version bump: patch (docs/desc only), minor (new fields/enums), major (SDK surface broke)

> Body generated by `scripts/fetch-schema-changelog.ts` from `Query.schemaChangelogs` (env: `test`, lookback: 14 days).