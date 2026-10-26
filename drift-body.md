## Schema Drift Detected

Highest criticality in the last 14 days: **DANGEROUS** (across 7 deployments).

### Deployments included

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

### Review checklist

- [ ] If `breaking_count > 0`: triage each path per the guidance above
- [ ] Skim the docs diff (`docs/SDK_REFERENCE.md`, `docs/resources/*.md`) for new/renamed types
- [ ] Decide version bump: patch (docs/desc only), minor (new fields/enums), major (SDK surface broke)

> Body generated by `scripts/fetch-schema-changelog.ts` from `Query.schemaChangelogs` (env: `test`, lookback: 14 days).