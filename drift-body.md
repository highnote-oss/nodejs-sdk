## Schema Drift Detected

Highest criticality in the last 14 days: **DANGEROUS** (across 6 deployments).

### Deployments included

<details><summary><strong>2026-10-08</strong> — scl_c954d97a83c045c4b403848202b29b9a (20 changes)</summary>

**DANGEROUS** (10)

- `INPUT_FIELD_ADDED` `CreateAccountHolderCardProductApplicationInput.bankProcessingAttributes` — Input field 'bankProcessingAttributes' of type 'BankProcessingAttributesInput' was added to input object type 'CreateAccountHolderCardProductApplicationInput'
- `ENUM_VALUE_ADDED` `LedgerName.CASH_ADVANCE_FUNDED` — Enum value 'CASH_ADVANCE_FUNDED' was added to enum 'LedgerName'
- `INPUT_FIELD_ADDED` `SimulateCardDigitalWalletTokenActivationInput.provisioningOutcome` — Input field 'provisioningOutcome' of type 'SimulatedWalletProvisioningOutcome' was added to input object type 'SimulateCardDigitalWalletTokenActivationInput'
- `INPUT_FIELD_ADDED` `UpdateVelocityRuleInput.velocityWindowTimeZone` — Input field 'velocityWindowTimeZone' of type 'String' was added to input object type 'UpdateVelocityRuleInput'
- `INPUT_FIELD_ADDED` `UpdateVelocityRuleInput.velocityWindowStartOfWeek` — Input field 'velocityWindowStartOfWeek' of type 'VelocityWindowStartOfWeek' was added to input object type 'UpdateVelocityRuleInput'
- `INPUT_FIELD_ADDED` `CreateVelocityRuleInput.velocityWindowTimeZone` — Input field 'velocityWindowTimeZone' of type 'String' was added to input object type 'CreateVelocityRuleInput'
- `INPUT_FIELD_ADDED` `CreateVelocityRuleInput.velocityWindowStartOfWeek` — Input field 'velocityWindowStartOfWeek' of type 'VelocityWindowStartOfWeek' was added to input object type 'CreateVelocityRuleInput'
- `ENUM_VALUE_ADDED` `CardPaymentDisputeStageStatus.SUBMITTED` — Enum value 'SUBMITTED' was added to enum 'CardPaymentDisputeStageStatus'
- `INPUT_FIELD_ADDED` `OnboardBusinessForMerchantInput.onboardingAttributes` — Input field 'onboardingAttributes' of type 'MerchantOnboardingAttributesInput' was added to input object type 'OnboardBusinessForMerchantInput'
- `INPUT_FIELD_ADDED` `OnboardBusinessForMoneyMovementInput.onboardingAttributes` — Input field 'onboardingAttributes' of type 'MoneyMovementOnboardingAttributesInput' was added to input object type 'OnboardBusinessForMoneyMovementInput'

**NON_BREAKING** (10)

- `TYPE_ADDED` `BankProcessingAttributes` — Type 'BankProcessingAttributes' was added
- `TYPE_ADDED` `BankProcessingAttributesInput` — Type 'BankProcessingAttributesInput' was added
- `TYPE_ADDED` `SimulatedWalletProvisioningOutcome` — Type 'SimulatedWalletProvisioningOutcome' was added
- `TYPE_ADDED` `VelocityWindowStartOfWeek` — Type 'VelocityWindowStartOfWeek' was added
- `TYPE_ADDED` `MerchantOnboardingAttributesInput` — Type 'MerchantOnboardingAttributesInput' was added
- `TYPE_ADDED` `MoneyMovementOnboardingAttributesInput` — Type 'MoneyMovementOnboardingAttributesInput' was added
- `FIELD_ADDED` `AccountHolderCardProductApplication.bankProcessingAttributes` — Field 'bankProcessingAttributes' was added to object type 'AccountHolderCardProductApplication'
- `FIELD_ADDED` `ProductApplication.bankProcessingAttributes` — Field 'bankProcessingAttributes' was added to object type 'ProductApplication'
- `FIELD_ADDED` `VelocityRule.velocityWindowTimeZone` — Field 'velocityWindowTimeZone' was added to object type 'VelocityRule'
- `FIELD_ADDED` `VelocityRule.velocityWindowStartOfWeek` — Field 'velocityWindowStartOfWeek' was added to object type 'VelocityRule'

</details>

<details><summary><strong>2026-10-07</strong> — scl_b39b271d208540948b10b4d5227ea40e (7 changes)</summary>

**DANGEROUS** (4)

- `ENUM_VALUE_ADDED` `InstantNetworkTransferCapabilityDeclineReason.VERIFICATION_DECLINED` — Enum value 'VERIFICATION_DECLINED' was added to enum 'InstantNetworkTransferCapabilityDeclineReason'
- `ENUM_VALUE_ADDED` `InstantNetworkTransferCapabilityDeclineReason.ADDRESS_VERIFICATION_MISMATCH` — Enum value 'ADDRESS_VERIFICATION_MISMATCH' was added to enum 'InstantNetworkTransferCapabilityDeclineReason'
- `ENUM_VALUE_ADDED` `InstantNetworkTransferCapabilityDeclineReason.NAME_VERIFICATION_MISMATCH` — Enum value 'NAME_VERIFICATION_MISMATCH' was added to enum 'InstantNetworkTransferCapabilityDeclineReason'
- `ENUM_VALUE_ADDED` `InstantNetworkTransferCapabilityDeclineReason.VERIFICATION_HELD_FOR_REVIEW` — Enum value 'VERIFICATION_HELD_FOR_REVIEW' was added to enum 'InstantNetworkTransferCapabilityDeclineReason'

**NON_BREAKING** (3)

- `TYPE_ADDED` `DigitalWalletTokenProvisioningDeclineReason` — Type 'DigitalWalletTokenProvisioningDeclineReason' was added
- `TYPE_ADDED` `CardPaymentAuthorizationDeclineSupersededEvent` — Type 'CardPaymentAuthorizationDeclineSupersededEvent' was added
- `FIELD_ADDED` `CardDigitalWalletTokenProvisioningEvent.declineReasons` — Field 'declineReasons' was added to object type 'CardDigitalWalletTokenProvisioningEvent'

</details>

<details><summary><strong>2026-10-05</strong> — scl_bbce1c3d3a36483899d7442be41ec4e2 (2 changes)</summary>

**NON_BREAKING** (2)

- `TYPE_ADDED` `ProductLineOfBusiness` — Type 'ProductLineOfBusiness' was added
- `FIELD_ADDED` `CardProduct.linesOfBusiness` — Field 'linesOfBusiness' was added to object type 'CardProduct'

</details>

<details><summary><strong>2026-10-01</strong> — scl_ee457012831942b5aa61396da2d3fb20 (2 changes)</summary>

**DANGEROUS** (1)

- `INPUT_FIELD_ADDED` `FeeScheduleFilterInput.status` — Input field 'status' of type 'FeeScheduleStatusFilterInput' was added to input object type 'FeeScheduleFilterInput'

**NON_BREAKING** (1)

- `TYPE_ADDED` `FeeScheduleStatusFilterInput` — Type 'FeeScheduleStatusFilterInput' was added

</details>

<details><summary><strong>2026-09-29</strong> — scl_1991b3c7c4034bc3bca455892715208d (8 changes)</summary>

**DANGEROUS** (3)

- `INPUT_FIELD_ADDED` `CapturePaymentTransactionInput.enhancedData` — Input field 'enhancedData' of type 'AcquiringEnhancedDataInput' was added to input object type 'CapturePaymentTransactionInput'
- `INPUT_FIELD_ADDED` `AuthorizePaymentTransactionInput.enhancedData` — Input field 'enhancedData' of type 'AcquiringEnhancedDataInput' was added to input object type 'AuthorizePaymentTransactionInput'
- `INPUT_FIELD_ADDED` `ChargePaymentTransactionInput.enhancedData` — Input field 'enhancedData' of type 'AcquiringEnhancedDataInput' was added to input object type 'ChargePaymentTransactionInput'

**NON_BREAKING** (5)

- `TYPE_ADDED` `VisaPurchaseIdFormat` — Type 'VisaPurchaseIdFormat' was added
- `TYPE_ADDED` `AcquiringEnhancedDataInput` — Type 'AcquiringEnhancedDataInput' was added
- `TYPE_ADDED` `AcquiringVisaEnhancedDataInput` — Type 'AcquiringVisaEnhancedDataInput' was added
- `TYPE_ADDED` `AcquiringVisaEnhancedDataHeaderInput` — Type 'AcquiringVisaEnhancedDataHeaderInput' was added
- `TYPE_ADDED` `AcquiringVisaEnhancedDataLineItemInput` — Type 'AcquiringVisaEnhancedDataLineItemInput' was added

</details>

<details><summary><strong>2026-09-28</strong> — scl_743ed103c70e4b719fe1ff00b78c9e5f (8 changes)</summary>

**DANGEROUS** (6)

- `ENUM_VALUE_ADDED` `LedgerName.INSTANT_FUND_AVAILABLE_CASH` — Enum value 'INSTANT_FUND_AVAILABLE_CASH' was added to enum 'LedgerName'
- `ENUM_VALUE_ADDED` `LedgerName.INSTANT_FUND_CASH` — Enum value 'INSTANT_FUND_CASH' was added to enum 'LedgerName'
- `ENUM_VALUE_ADDED` `LedgerName.INSTANT_FUND_HOLD` — Enum value 'INSTANT_FUND_HOLD' was added to enum 'LedgerName'
- `ENUM_VALUE_ADDED` `PaymentTransactionResponseCodeProcessorResponseCode.CHECK_ALREADY_POSTED` — Enum value 'CHECK_ALREADY_POSTED' was added to enum 'PaymentTransactionResponseCodeProcessorResponseCode'
- `INPUT_FIELD_ADDED` `TransferFundsInput.useInstantFunds` — Input field 'useInstantFunds' of type 'Boolean' was added to input object type 'TransferFundsInput'
- `ENUM_VALUE_ADDED` `InstantNetworkTransferFailureReason.NETWORK_UNAVAILABLE` — Enum value 'NETWORK_UNAVAILABLE' was added to enum 'InstantNetworkTransferFailureReason'

**NON_BREAKING** (2)

- `FIELD_ADDED` `FeeSchedule.name` — Field 'name' was added to object type 'FeeSchedule'
- `FIELD_ADDED` `FeeSchedule.memo` — Field 'memo' was added to object type 'FeeSchedule'

</details>

### Review checklist

- [ ] If `breaking_count > 0`: triage each path per the guidance above
- [ ] Skim the docs diff (`docs/SDK_REFERENCE.md`, `docs/resources/*.md`) for new/renamed types
- [ ] Decide version bump: patch (docs/desc only), minor (new fields/enums), major (SDK surface broke)

> Body generated by `scripts/fetch-schema-changelog.ts` from `Query.schemaChangelogs` (env: `test`, lookback: 14 days).