## Schema Drift Detected

Highest criticality in the last 14 days: **DANGEROUS** (across 6 deployments).

### Deployments included

<details><summary><strong>2026-09-18</strong> — scl_1cab72b516034a579a9db9e87bf80f4a (16 changes)</summary>

**NON_BREAKING** (16)

- `TYPE_ADDED` `CardAuthenticationContactType` — Type 'CardAuthenticationContactType' was added
- `TYPE_ADDED` `CardAuthenticationContactScopeInput` — Type 'CardAuthenticationContactScopeInput' was added
- `TYPE_ADDED` `BindCardAuthenticationContactChannelInput` — Type 'BindCardAuthenticationContactChannelInput' was added
- `TYPE_ADDED` `BindCardAuthenticationContactAddressInput` — Type 'BindCardAuthenticationContactAddressInput' was added
- `TYPE_ADDED` `RevokeCardAuthenticationContactInput` — Type 'RevokeCardAuthenticationContactInput' was added
- `TYPE_ADDED` `CardAuthenticationContactPurposeStatus` — Type 'CardAuthenticationContactPurposeStatus' was added
- `TYPE_ADDED` `CardAuthenticationContactScope` — Type 'CardAuthenticationContactScope' was added
- `TYPE_ADDED` `CardAuthenticationContact` — Type 'CardAuthenticationContact' was added
- `TYPE_ADDED` `BindCardAuthenticationContactChannelPayload` — Type 'BindCardAuthenticationContactChannelPayload' was added
- `TYPE_ADDED` `BindCardAuthenticationContactAddressPayload` — Type 'BindCardAuthenticationContactAddressPayload' was added
- `TYPE_ADDED` `RevokeCardAuthenticationContactPayload` — Type 'RevokeCardAuthenticationContactPayload' was added
- `FIELD_ADDED` `Mutation.bindCardAuthenticationContactChannel` — Field 'bindCardAuthenticationContactChannel' was added to object type 'Mutation'
- `FIELD_ADDED` `Mutation.bindCardAuthenticationContactAddress` — Field 'bindCardAuthenticationContactAddress' was added to object type 'Mutation'
- `FIELD_ADDED` `Mutation.revokeCardAuthenticationContact` — Field 'revokeCardAuthenticationContact' was added to object type 'Mutation'
- `FIELD_ADDED` `FinancialAccount.cardAuthenticationContacts` — Field 'cardAuthenticationContacts' was added to object type 'FinancialAccount'
- `FIELD_ADDED` `PaymentCard.cardAuthenticationContacts` — Field 'cardAuthenticationContacts' was added to object type 'PaymentCard'

</details>

<details><summary><strong>2026-09-15</strong> — scl_933dcd4036794682b08d3567a8e4e047 (1 change)</summary>

**DANGEROUS** (1)

- `ENUM_VALUE_ADDED` `VelocityConstraintLevel.EXTERNAL_BANK_ACCOUNT` — Enum value 'EXTERNAL_BANK_ACCOUNT' was added to enum 'VelocityConstraintLevel'

</details>

<details><summary><strong>2026-09-12</strong> — scl_00bc7a542c69477e999c04746b2cafa9 (12 changes)</summary>

**DANGEROUS** (12)

- `UNION_MEMBER_ADDED` `AchFromFinancialAccount` — Member 'NonVerifiedExternalUSFinancialBankAccount' was added to Union type 'AchFromFinancialAccount'
- `ENUM_VALUE_ADDED` `RtpTransferFailureReason.NON_TRANSACTION_ACCOUNT` — Enum value 'NON_TRANSACTION_ACCOUNT' was added to enum 'RtpTransferFailureReason'
- `ENUM_VALUE_ADDED` `RtpTransferFailureReason.TRANSFER_REFUSED` — Enum value 'TRANSFER_REFUSED' was added to enum 'RtpTransferFailureReason'
- `ENUM_VALUE_ADDED` `RtpTransferFailureReason.DO_NOT_HONOR` — Enum value 'DO_NOT_HONOR' was added to enum 'RtpTransferFailureReason'
- `ENUM_VALUE_ADDED` `RtpTransferFailureReason.INVALID_ACCOUNT_NUMBER` — Enum value 'INVALID_ACCOUNT_NUMBER' was added to enum 'RtpTransferFailureReason'
- `ENUM_VALUE_ADDED` `RtpTransferFailureReason.ACCOUNT_IDENTIFIER_STALE` — Enum value 'ACCOUNT_IDENTIFIER_STALE' was added to enum 'RtpTransferFailureReason'
- `ENUM_VALUE_ADDED` `RtpTransferFailureReason.INVALID_CARD_NUMBER` — Enum value 'INVALID_CARD_NUMBER' was added to enum 'RtpTransferFailureReason'
- `ENUM_VALUE_ADDED` `UnifiedFundsTransferFailureReason.CONFIGURATION_ERROR` — Enum value 'CONFIGURATION_ERROR' was added to enum 'UnifiedFundsTransferFailureReason'
- `ENUM_VALUE_ADDED` `UnifiedFundsTransferFailureReason.NON_TRANSACTION_ACCOUNT` — Enum value 'NON_TRANSACTION_ACCOUNT' was added to enum 'UnifiedFundsTransferFailureReason'
- `ENUM_VALUE_ADDED` `UnifiedFundsTransferFailureReason.TRANSFER_REFUSED` — Enum value 'TRANSFER_REFUSED' was added to enum 'UnifiedFundsTransferFailureReason'
- `ENUM_VALUE_ADDED` `UnifiedFundsTransferFailureReason.INVALID_ACCOUNT_NUMBER` — Enum value 'INVALID_ACCOUNT_NUMBER' was added to enum 'UnifiedFundsTransferFailureReason'
- `ENUM_VALUE_ADDED` `UnifiedFundsTransferFailureReason.ACCOUNT_IDENTIFIER_STALE` — Enum value 'ACCOUNT_IDENTIFIER_STALE' was added to enum 'UnifiedFundsTransferFailureReason'

</details>

<details><summary><strong>2026-09-11</strong> — scl_93be80f5590e4d2f8a53f3edd9815f2a (5 changes)</summary>

**DANGEROUS** (3)

- `INPUT_FIELD_ADDED` `ApproveCreditProductApplicationUnderwritingInput.interestRates` — Input field 'interestRates' of type '[UnderwritingInterestRateInput!]' was added to input object type 'ApproveCreditProductApplicationUnderwritingInput'
- `ENUM_VALUE_ADDED` `PartnerBankName.EMPRISE_BANK` — Enum value 'EMPRISE_BANK' was added to enum 'PartnerBankName'
- `ENUM_VALUE_ADDED` `PaymentTransactionResponseCodeProcessorResponseCode.COMPLIANCE_VERIFICATION_FAILED` — Enum value 'COMPLIANCE_VERIFICATION_FAILED' was added to enum 'PaymentTransactionResponseCodeProcessorResponseCode'

**NON_BREAKING** (2)

- `TYPE_ADDED` `UnderwritingInterestRateInput` — Type 'UnderwritingInterestRateInput' was added
- `FIELD_ADDED` `PhysicalCardProfile.vendorClientIdentifier` — Field 'vendorClientIdentifier' was added to object type 'PhysicalCardProfile'

</details>

<details><summary><strong>2026-09-10</strong> — scl_f24b9b58ef4a4f268965df35e03ef482 (1 change)</summary>

**DANGEROUS** (1)

- `INPUT_FIELD_ADDED` `TransferFundsCardTransferDetailsInput.threeDSecureAuthentication` — Input field 'threeDSecureAuthentication' of type 'ExternalThreeDSecureAuthenticationInput' was added to input object type 'TransferFundsCardTransferDetailsInput'

</details>

<details><summary><strong>2026-09-08</strong> — scl_b7b2828a869a430eb371c7c06082d046 (3 changes)</summary>

**DANGEROUS** (3)

- `ENUM_VALUE_ADDED` `NotificationEventName.PAYMENT_CARD_TRANSACTION_CHARGEBACK_PROVISIONAL_CREDIT_RETAINED_ISSUER_LIABLE` — Enum value 'PAYMENT_CARD_TRANSACTION_CHARGEBACK_PROVISIONAL_CREDIT_RETAINED_ISSUER_LIABLE' was added to enum 'NotificationEventName'
- `ENUM_VALUE_ADDED` `NotificationEventName.PAYMENT_CARD_TRANSACTION_DISPUTE_PROVISIONAL_CREDIT_RETAINED_ISSUER_LIABLE` — Enum value 'PAYMENT_CARD_TRANSACTION_DISPUTE_PROVISIONAL_CREDIT_RETAINED_ISSUER_LIABLE' was added to enum 'NotificationEventName'
- `ENUM_VALUE_ADDED` `NotificationEventName.PAYMENT_CARD_TRANSACTION_DISPUTE_PROVISIONAL_CREDIT_RETAINED_ISSUER_LIABLE_PARTIAL` — Enum value 'PAYMENT_CARD_TRANSACTION_DISPUTE_PROVISIONAL_CREDIT_RETAINED_ISSUER_LIABLE_PARTIAL' was added to enum 'NotificationEventName'

</details>

### Review checklist

- [ ] If `breaking_count > 0`: triage each path per the guidance above
- [ ] Skim the docs diff (`docs/SDK_REFERENCE.md`, `docs/resources/*.md`) for new/renamed types
- [ ] Decide version bump: patch (docs/desc only), minor (new fields/enums), major (SDK surface broke)

> Body generated by `scripts/fetch-schema-changelog.ts` from `Query.schemaChangelogs` (env: `test`, lookback: 14 days).