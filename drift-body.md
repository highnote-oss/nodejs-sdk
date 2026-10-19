## Schema Drift Detected

Highest criticality in the last 14 days: **DANGEROUS** (across 7 deployments).

### Deployments included

<details><summary><strong>2026-10-16</strong> — scl_2ea99ab62d0c45e7ad3e0ef4c306bc24 (5 changes)</summary>

**DANGEROUS** (4)

- `UNION_MEMBER_ADDED` `FinancialAccountActivitySource` — Member 'InstantNetworkTransfer' was added to Union type 'FinancialAccountActivitySource'
- `ENUM_VALUE_ADDED` `FinancialAccountActivityType.INSTANT_NETWORK_TRANSFER` — Enum value 'INSTANT_NETWORK_TRANSFER' was added to enum 'FinancialAccountActivityType'
- `INPUT_FIELD_ADDED` `AcquiringThreeDSecureBrowserInfoInput.ipAddress` — Input field 'ipAddress' of type 'IPAddressInput' was added to input object type 'AcquiringThreeDSecureBrowserInfoInput'
- `ENUM_VALUE_ADDED` `TransferFundsPaymentPreference.FED_NOW` — Enum value 'FED_NOW' was added to enum 'TransferFundsPaymentPreference'

**NON_BREAKING** (1)

- `FIELD_ADDED` `PaymentCardInstrument.paymentAccountReference` — Field 'paymentAccountReference' was added to object type 'PaymentCardInstrument'

</details>

<details><summary><strong>2026-10-15</strong> — scl_f2f8d8dfcbcc49bbb5fb4a7a33e19a3c (11 changes)</summary>

**DANGEROUS** (4)

- `INPUT_FIELD_ADDED` `USPersonAccountHolderInput.identityVerificationDocument` — Input field 'identityVerificationDocument' of type 'PersonIdentificationDocumentInput' was added to input object type 'USPersonAccountHolderInput'
- `UNION_MEMBER_ADDED` `FinancialEvent` — Member 'NonOriginatedFedNowTransferEvent' was added to Union type 'FinancialEvent'
- `ENUM_VALUE_ADDED` `FedNowTransferFailureReason.DO_NOT_HONOR` — Enum value 'DO_NOT_HONOR' was added to enum 'FedNowTransferFailureReason'
- `ENUM_VALUE_ADDED` `FedNowTransferFailureReason.INVALID_CARD_NUMBER` — Enum value 'INVALID_CARD_NUMBER' was added to enum 'FedNowTransferFailureReason'

**NON_BREAKING** (7)

- `TYPE_ADDED` `SimulateNonOriginatedFedNowTransferInput` — Type 'SimulateNonOriginatedFedNowTransferInput' was added
- `TYPE_ADDED` `SimulateNonOriginatedFedNowTransferCreditorInput` — Type 'SimulateNonOriginatedFedNowTransferCreditorInput' was added
- `TYPE_ADDED` `SimulateNonOriginatedFedNowTransferDebtorInput` — Type 'SimulateNonOriginatedFedNowTransferDebtorInput' was added
- `TYPE_ADDED` `SimulateNonOriginatedFedNowTransferPayload` — Type 'SimulateNonOriginatedFedNowTransferPayload' was added
- `FIELD_ADDED` `Mutation.simulateNonOriginatedFedNowTransfer` — Field 'simulateNonOriginatedFedNowTransfer' was added to object type 'Mutation'
- `FIELD_ADDED` `USPersonAccountHolder.identityVerificationDocuments` — Field 'identityVerificationDocuments' was added to object type 'USPersonAccountHolder'
- `FIELD_ADDED` `USPersonAccountHolderSnapshot.identityVerificationDocuments` — Field 'identityVerificationDocuments' was added to object type 'USPersonAccountHolderSnapshot'

</details>

<details><summary><strong>2026-10-13</strong> — scl_0925307caef845f1a0adcc230fc09281 (28 changes)</summary>

**DANGEROUS** (7)

- `UNION_MEMBER_ADDED` `FinancialEvent` — Member 'NonOriginatedWireTransferEvent' was added to Union type 'FinancialEvent'
- `UNION_MEMBER_ADDED` `NotificationEventNode` — Member 'NonOriginatedWireTransferEvent' was added to Union type 'NotificationEventNode'
- `ENUM_VALUE_ADDED` `NotificationEventName.NON_ORIGINATED_WIRE_TRANSFER_RECEIVED_EVENT` — Enum value 'NON_ORIGINATED_WIRE_TRANSFER_RECEIVED_EVENT' was added to enum 'NotificationEventName'
- `ENUM_VALUE_ADDED` `NotificationEventName.NON_ORIGINATED_WIRE_TRANSFER_COMPLETED_EVENT` — Enum value 'NON_ORIGINATED_WIRE_TRANSFER_COMPLETED_EVENT' was added to enum 'NotificationEventName'
- `ENUM_VALUE_ADDED` `NotificationEventName.NON_ORIGINATED_WIRE_TRANSFER_FAILED_EVENT` — Enum value 'NON_ORIGINATED_WIRE_TRANSFER_FAILED_EVENT' was added to enum 'NotificationEventName'
- `UNION_MEMBER_ADDED` `TransactionSearchSource` — Member 'NonOriginatedWireTransfer' was added to Union type 'TransactionSearchSource'
- `UNION_MEMBER_ADDED` `TransactionSearchSource` — Member 'NonOriginatedWireTransferEvent' was added to Union type 'TransactionSearchSource'

**NON_BREAKING** (21)

- `TYPE_ADDED` `SimulateNonOriginatedWireTransferInput` — Type 'SimulateNonOriginatedWireTransferInput' was added
- `TYPE_ADDED` `SimulateNonOriginatedWireTransferCreditorInput` — Type 'SimulateNonOriginatedWireTransferCreditorInput' was added
- `TYPE_ADDED` `SimulateNonOriginatedWireTransferDebtorInput` — Type 'SimulateNonOriginatedWireTransferDebtorInput' was added
- `TYPE_ADDED` `SimulateNonOriginatedWireTransferPayload` — Type 'SimulateNonOriginatedWireTransferPayload' was added
- `TYPE_ADDED` `NonOriginatedWireTransferStatus` — Type 'NonOriginatedWireTransferStatus' was added
- `TYPE_ADDED` `WireFundsTransferType` — Type 'WireFundsTransferType' was added
- `TYPE_ADDED` `WireTransferSign` — Type 'WireTransferSign' was added
- `TYPE_ADDED` `WireFundsTransfer` — Type 'WireFundsTransfer' was added
- `TYPE_ADDED` `NonOriginatedWireTransfer` — Type 'NonOriginatedWireTransfer' was added
- `TYPE_ADDED` `WireTransferSource` — Type 'WireTransferSource' was added
- `TYPE_ADDED` `WireTransferSourceNode` — Type 'WireTransferSourceNode' was added
- `TYPE_ADDED` `WireTransferDestination` — Type 'WireTransferDestination' was added
- `TYPE_ADDED` `WireTransferDestinationNode` — Type 'WireTransferDestinationNode' was added
- `TYPE_ADDED` `NonOriginatedWireTransferEvent` — Type 'NonOriginatedWireTransferEvent' was added
- `TYPE_ADDED` `WireTransferBankTransferDetails` — Type 'WireTransferBankTransferDetails' was added
- `TYPE_ADDED` `WireOriginatorToBeneficiaryInformation` — Type 'WireOriginatorToBeneficiaryInformation' was added
- `TYPE_ADDED` `WireTransferReferences` — Type 'WireTransferReferences' was added
- `TYPE_ADDED` `WireInstructionInput` — Type 'WireInstructionInput' was added
- `TYPE_ADDED` `WireOriginatorToBeneficiaryInput` — Type 'WireOriginatorToBeneficiaryInput' was added
- `TYPE_ADDED` `WireTransferFailureReason` — Type 'WireTransferFailureReason' was added
- `FIELD_ADDED` `Mutation.simulateNonOriginatedWireTransfer` — Field 'simulateNonOriginatedWireTransfer' was added to object type 'Mutation'

</details>

<details><summary><strong>2026-10-12</strong> — scl_713ea44b7638403bba0700d0eae7fec4 (7 changes)</summary>

**DANGEROUS** (7)

- `ENUM_VALUE_ADDED` `LedgerName.CHECK_DEPOSIT_RECEIVABLE` — Enum value 'CHECK_DEPOSIT_RECEIVABLE' was added to enum 'LedgerName'
- `ENUM_VALUE_ADDED` `LedgerName.CHECK_PENDING_DEPOSIT` — Enum value 'CHECK_PENDING_DEPOSIT' was added to enum 'LedgerName'
- `UNION_MEMBER_ADDED` `TransactionSearchSource` — Member 'OriginatedFedNowTransfer' was added to Union type 'TransactionSearchSource'
- `UNION_MEMBER_ADDED` `TransactionSearchSource` — Member 'OriginatedFedNowTransferEvent' was added to Union type 'TransactionSearchSource'
- `UNION_MEMBER_ADDED` `TransactionSearchSource` — Member 'NonOriginatedFedNowTransfer' was added to Union type 'TransactionSearchSource'
- `UNION_MEMBER_ADDED` `TransactionSearchSource` — Member 'NonOriginatedFedNowTransferEvent' was added to Union type 'TransactionSearchSource'
- `ENUM_VALUE_ADDED` `TransactionSearchObjectType.FED_NOW_TRANSFER` — Enum value 'FED_NOW_TRANSFER' was added to enum 'TransactionSearchObjectType'

</details>

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

### Review checklist

- [ ] If `breaking_count > 0`: triage each path per the guidance above
- [ ] Skim the docs diff (`docs/SDK_REFERENCE.md`, `docs/resources/*.md`) for new/renamed types
- [ ] Decide version bump: patch (docs/desc only), minor (new fields/enums), major (SDK surface broke)

> Body generated by `scripts/fetch-schema-changelog.ts` from `Query.schemaChangelogs` (env: `test`, lookback: 14 days).