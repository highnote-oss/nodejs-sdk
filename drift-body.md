## Schema Drift Detected

Highest criticality in the last 14 days: **BREAKING** (across 5 deployments).

### ⚠️ Breaking changes detected — triage required

Each path below was removed or modified incompatibly upstream. For each:

1. `rg "<path>" src/resources/` — does any resource code reference it?
2. **Hit:** patch the affected resource in this PR (rename method, drop resource, etc.) before merging. CI's typecheck will fail otherwise.
3. **Miss:** schema-level break, no SDK consumer impact — safe to merge as docs-only refresh.

- **`InitiateAcquiringThreeDSecureDataExchangeInput.credential`** — Input field 'credential' of type 'AcquiringThreeDSecureDataExchangeCredentialInput!' was added to input object type 'InitiateAcquiringThreeDSecureDataExchangeInput'
- **`InitiateAcquiringThreeDSecureDataExchangeInput.paymentMethodTokenId`** — Input field 'paymentMethodTokenId' was removed from input object type 'InitiateAcquiringThreeDSecureDataExchangeInput'
- **`InitiateAcquiringThreeDSecureAuthenticationInput.credential`** — Input field 'credential' of type 'AcquiringThreeDSecureAuthenticationCredentialInput!' was added to input object type 'InitiateAcquiringThreeDSecureAuthenticationInput'
- **`InitiateAcquiringThreeDSecureAuthenticationInput.paymentMethodTokenId`** — Input field 'paymentMethodTokenId' was removed from input object type 'InitiateAcquiringThreeDSecureAuthenticationInput'
- **`CompleteAcquiringThreeDSecureAuthenticationChallengeInput.credential`** — Input field 'credential' of type 'AcquiringThreeDSecureChallengeCredentialInput!' was added to input object type 'CompleteAcquiringThreeDSecureAuthenticationChallengeInput'
- **`CompleteAcquiringThreeDSecureAuthenticationChallengeInput.paymentMethodTokenId`** — Input field 'paymentMethodTokenId' was removed from input object type 'CompleteAcquiringThreeDSecureAuthenticationChallengeInput'

### Deployments included

<details><summary><strong>2026-09-04</strong> — scl_7b707b9671154e4a8f67f68e4e7b68d4 (2 changes)</summary>

**DANGEROUS** (2)

- `INPUT_FIELD_ADDED` `SimulateFinalizeProvisionalCreditForCardTransactionDisputeInput.networkRecoveredAmount` — Input field 'networkRecoveredAmount' of type 'AmountInput' was added to input object type 'SimulateFinalizeProvisionalCreditForCardTransactionDisputeInput'
- `ENUM_VALUE_ADDED` `PaymentTransactionResponseCodeProcessorResponseCode.VELOCITY_LIMIT_EXCEEDED` — Enum value 'VELOCITY_LIMIT_EXCEEDED' was added to enum 'PaymentTransactionResponseCodeProcessorResponseCode'

</details>

<details><summary><strong>2026-09-01</strong> — scl_f1bbd1ad01924d5c852a93f61d989b58 (26 changes)</summary>

**DANGEROUS** (18)

- `INPUT_FIELD_ADDED` `USAuthorizedPersonUpdateInput.identityVerificationDocument` — Input field 'identityVerificationDocument' of type 'PersonIdentificationDocumentInput' was added to input object type 'USAuthorizedPersonUpdateInput'
- `INPUT_FIELD_ADDED` `USAuthorizedPersonUpdateInput.jurisdiction` — Input field 'jurisdiction' of type 'PersonJurisdictionInput' was added to input object type 'USAuthorizedPersonUpdateInput'
- `INPUT_FIELD_ADDED` `USUltimateBeneficialOwnerUpdateInput.identityVerificationDocument` — Input field 'identityVerificationDocument' of type 'PersonIdentificationDocumentInput' was added to input object type 'USUltimateBeneficialOwnerUpdateInput'
- `INPUT_FIELD_ADDED` `USUltimateBeneficialOwnerUpdateInput.jurisdiction` — Input field 'jurisdiction' of type 'PersonJurisdictionInput' was added to input object type 'USUltimateBeneficialOwnerUpdateInput'
- `ENUM_VALUE_ADDED` `RequestedIdentityUpdateType.PASSPORT_NUMBER` — Enum value 'PASSPORT_NUMBER' was added to enum 'RequestedIdentityUpdateType'
- `ENUM_VALUE_ADDED` `RequestedIdentityUpdateType.NATIONAL_IDENTIFICATION_NUMBER` — Enum value 'NATIONAL_IDENTIFICATION_NUMBER' was added to enum 'RequestedIdentityUpdateType'
- `ENUM_VALUE_ADDED` `RequestedIdentityUpdateType.JURISDICTION` — Enum value 'JURISDICTION' was added to enum 'RequestedIdentityUpdateType'
- `ENUM_VALUE_ADDED` `RequestedIdentityUpdateType.COUNTRY_OF_RESIDENCE` — Enum value 'COUNTRY_OF_RESIDENCE' was added to enum 'RequestedIdentityUpdateType'
- `ENUM_VALUE_ADDED` `RequestedIdentityUpdateType.COUNTRY_OF_CITIZENSHIP` — Enum value 'COUNTRY_OF_CITIZENSHIP' was added to enum 'RequestedIdentityUpdateType'
- `ENUM_VALUE_ADDED` `RequestedIdentityUpdateType.COUNTRY_OF_INCORPORATION` — Enum value 'COUNTRY_OF_INCORPORATION' was added to enum 'RequestedIdentityUpdateType'
- `ENUM_VALUE_ADDED` `RequestedIdentityUpdateType.REGION_OF_INCORPORATION` — Enum value 'REGION_OF_INCORPORATION' was added to enum 'RequestedIdentityUpdateType'
- `INPUT_FIELD_ADDED` `PersonJurisdictionInput.countryOfCitizenship` — Input field 'countryOfCitizenship' of type 'String' was added to input object type 'PersonJurisdictionInput'
- `INPUT_FIELD_ADDED` `AuthorizePaymentCardInput.threeDSecureAuthenticationToken` — Input field 'threeDSecureAuthenticationToken' of type 'ID' was added to input object type 'AuthorizePaymentCardInput'
- `INPUT_FIELD_ADDED` `ChargePaymentCardInput.threeDSecureAuthenticationToken` — Input field 'threeDSecureAuthenticationToken' of type 'ID' was added to input object type 'ChargePaymentCardInput'
- `INPUT_FIELD_ADDED` `PaymentCardCredentialInput.threeDSecureAuthenticationToken` — Input field 'threeDSecureAuthenticationToken' of type 'ID' was added to input object type 'PaymentCardCredentialInput'
- `INPUT_FIELD_ADDED` `AcquiringThreeDSecureDataExchangeCredentialInput.paymentCard` — Input field 'paymentCard' of type 'AcquiringThreeDSecurePaymentCardInput' was added to input object type 'AcquiringThreeDSecureDataExchangeCredentialInput'
- `INPUT_FIELD_ADDED` `AcquiringThreeDSecureAuthenticationCredentialInput.paymentCardCredential` — Input field 'paymentCardCredential' of type 'AcquiringThreeDSecurePaymentCardCredentialInput' was added to input object type 'AcquiringThreeDSecureAuthenticationCredentialInput'
- `INPUT_FIELD_ADDED` `AcquiringThreeDSecureChallengeCredentialInput.threeDSecureSessionToken` — Input field 'threeDSecureSessionToken' of type 'ID' was added to input object type 'AcquiringThreeDSecureChallengeCredentialInput'

**NON_BREAKING** (8)

- `TYPE_ADDED` `AcquiringThreeDSecurePaymentCardInput` — Type 'AcquiringThreeDSecurePaymentCardInput' was added
- `TYPE_ADDED` `AcquiringThreeDSecurePaymentCardCredentialInput` — Type 'AcquiringThreeDSecurePaymentCardCredentialInput' was added
- `TYPE_ADDED` `AcquiringThreeDSecureAuthenticationStatus` — Type 'AcquiringThreeDSecureAuthenticationStatus' was added
- `TYPE_ADDED` `AcquiringThreeDSecureSession` — Type 'AcquiringThreeDSecureSession' was added
- `TYPE_ADDED` `AcquiringThreeDSecureSessionToken` — Type 'AcquiringThreeDSecureSessionToken' was added
- `FIELD_ADDED` `AcquiringThreeDSecureDataExchangeResult.threeDSecureSessionToken` — Field 'threeDSecureSessionToken' was added to object type 'AcquiringThreeDSecureDataExchangeResult'
- `FIELD_ADDED` `AcquiringThreeDSecureAuthenticationResult.threeDSecureSessionToken` — Field 'threeDSecureSessionToken' was added to object type 'AcquiringThreeDSecureAuthenticationResult'
- `FIELD_ADDED` `AcquiringThreeDSecureChallengeRequired.threeDSecureSessionToken` — Field 'threeDSecureSessionToken' was added to object type 'AcquiringThreeDSecureChallengeRequired'

</details>

<details><summary><strong>2026-08-31</strong> — scl_8dc6632a627f49bfa3ebdb356e7d2971 (10 changes)</summary>

**DANGEROUS** (5)

- `FIELD_ARGUMENT_ADDED` `Organization.cardPaymentDisputes.sortBy` — Argument 'sortBy: CardPaymentDisputesSortByType' (with default value) added to field 'Organization.cardPaymentDisputes'
- `ENUM_VALUE_ADDED` `DocumentType.CERTIFICATE_OF_REINSTATEMENT` — Enum value 'CERTIFICATE_OF_REINSTATEMENT' was added to enum 'DocumentType'
- `ENUM_VALUE_ADDED` `DocumentType.IRS_LETTER_147C` — Enum value 'IRS_LETTER_147C' was added to enum 'DocumentType'
- `INPUT_FIELD_ADDED` `CardPaymentDisputesFilterInput.responseDueAt` — Input field 'responseDueAt' of type 'TimestampFilterInput' was added to input object type 'CardPaymentDisputesFilterInput'
- `INPUT_FIELD_ADDED` `CardPaymentDisputesFilterInput.timeToExpire` — Input field 'timeToExpire' of type 'CardPaymentDisputeTimeToExpireFilterInput' was added to input object type 'CardPaymentDisputesFilterInput'

**NON_BREAKING** (5)

- `TYPE_ADDED` `CardPaymentDisputeTimeToExpireFilterInput` — Type 'CardPaymentDisputeTimeToExpireFilterInput' was added
- `TYPE_ADDED` `CardPaymentDisputesSortByType` — Type 'CardPaymentDisputesSortByType' was added
- `FIELD_ADDED` `Phone.extension` — Field 'extension' was added to object type 'Phone'
- `FIELD_ADDED` `PaymentCardInstrument.email` — Field 'email' was added to object type 'PaymentCardInstrument'
- `FIELD_ADDED` `CardPaymentDispute.responseDueAt` — Field 'responseDueAt' was added to object type 'CardPaymentDispute'

</details>

<details><summary><strong>2026-08-27</strong> — scl_e9a8cc7eb85f447d8c6eaeed73a5a967 (20 changes)</summary>

**BREAKING** (6)

- `INPUT_FIELD_ADDED` `InitiateAcquiringThreeDSecureDataExchangeInput.credential` — Input field 'credential' of type 'AcquiringThreeDSecureDataExchangeCredentialInput!' was added to input object type 'InitiateAcquiringThreeDSecureDataExchangeInput'
- `INPUT_FIELD_REMOVED` `InitiateAcquiringThreeDSecureDataExchangeInput.paymentMethodTokenId` — Input field 'paymentMethodTokenId' was removed from input object type 'InitiateAcquiringThreeDSecureDataExchangeInput'
- `INPUT_FIELD_ADDED` `InitiateAcquiringThreeDSecureAuthenticationInput.credential` — Input field 'credential' of type 'AcquiringThreeDSecureAuthenticationCredentialInput!' was added to input object type 'InitiateAcquiringThreeDSecureAuthenticationInput'
- `INPUT_FIELD_REMOVED` `InitiateAcquiringThreeDSecureAuthenticationInput.paymentMethodTokenId` — Input field 'paymentMethodTokenId' was removed from input object type 'InitiateAcquiringThreeDSecureAuthenticationInput'
- `INPUT_FIELD_ADDED` `CompleteAcquiringThreeDSecureAuthenticationChallengeInput.credential` — Input field 'credential' of type 'AcquiringThreeDSecureChallengeCredentialInput!' was added to input object type 'CompleteAcquiringThreeDSecureAuthenticationChallengeInput'
- `INPUT_FIELD_REMOVED` `CompleteAcquiringThreeDSecureAuthenticationChallengeInput.paymentMethodTokenId` — Input field 'paymentMethodTokenId' was removed from input object type 'CompleteAcquiringThreeDSecureAuthenticationChallengeInput'

**DANGEROUS** (7)

- `ENUM_VALUE_ADDED` `PaymentTransactionResponseCodeProcessorResponseCode.INVALID_ISSUER` — Enum value 'INVALID_ISSUER' was added to enum 'PaymentTransactionResponseCodeProcessorResponseCode'
- `ENUM_VALUE_ADDED` `PaymentTransactionResponseCodeProcessorResponseCode.AML_REQUIREMENT_NOT_MET` — Enum value 'AML_REQUIREMENT_NOT_MET' was added to enum 'PaymentTransactionResponseCodeProcessorResponseCode'
- `ENUM_VALUE_ADDED` `PaymentTransactionResponseCodeProcessorResponseCode.VIOLATION_OF_LAW` — Enum value 'VIOLATION_OF_LAW' was added to enum 'PaymentTransactionResponseCodeProcessorResponseCode'
- `ENUM_VALUE_ADDED` `PaymentTransactionResponseCodeProcessorResponseCode.SURCHARGE_NOT_PERMITTED` — Enum value 'SURCHARGE_NOT_PERMITTED' was added to enum 'PaymentTransactionResponseCodeProcessorResponseCode'
- `ENUM_VALUE_ADDED` `PaymentTransactionResponseCodeProcessorResponseCode.LIFE_CYCLE_DECLINE` — Enum value 'LIFE_CYCLE_DECLINE' was added to enum 'PaymentTransactionResponseCodeProcessorResponseCode'
- `ENUM_VALUE_ADDED` `PaymentTransactionResponseCodeProcessorResponseCode.POLICY_DECLINE` — Enum value 'POLICY_DECLINE' was added to enum 'PaymentTransactionResponseCodeProcessorResponseCode'
- `ENUM_VALUE_ADDED` `PaymentTransactionResponseCodeProcessorResponseCode.INVALID_MERCHANT_CATEGORY_CODE` — Enum value 'INVALID_MERCHANT_CATEGORY_CODE' was added to enum 'PaymentTransactionResponseCodeProcessorResponseCode'

**NON_BREAKING** (7)

- `TYPE_ADDED` `PlatformAgent` — Type 'PlatformAgent' was added
- `TYPE_ADDED` `UserPayload` — Type 'UserPayload' was added
- `TYPE_ADDED` `AcquiringThreeDSecureDataExchangeCredentialInput` — Type 'AcquiringThreeDSecureDataExchangeCredentialInput' was added
- `TYPE_ADDED` `AcquiringThreeDSecureAuthenticationCredentialInput` — Type 'AcquiringThreeDSecureAuthenticationCredentialInput' was added
- `TYPE_ADDED` `AcquiringThreeDSecureChallengeCredentialInput` — Type 'AcquiringThreeDSecureChallengeCredentialInput' was added
- `FIELD_ADDED` `PaymentCardSnapshot.updatedBy` — Field 'updatedBy' was added to object type 'PaymentCardSnapshot'
- `FIELD_ADDED` `FinancialAccountSnapshot.updatedBy` — Field 'updatedBy' was added to object type 'FinancialAccountSnapshot'

</details>

<details><summary><strong>2026-08-25</strong> — scl_fadd541ffc634a2d862c7004a0042544 (2 changes)</summary>

**NON_BREAKING** (2)

- `FIELD_ADDED` `ProductApplication.applicationDenialReason` — Field 'applicationDenialReason' was added to object type 'ProductApplication'
- `FIELD_ADDED` `ProductApplication.moneyMovementCapabilities` — Field 'moneyMovementCapabilities' was added to object type 'ProductApplication'

</details>

### Review checklist

- [ ] If `breaking_count > 0`: triage each path per the guidance above
- [ ] Skim the docs diff (`docs/SDK_REFERENCE.md`, `docs/resources/*.md`) for new/renamed types
- [ ] Decide version bump: patch (docs/desc only), minor (new fields/enums), major (SDK surface broke)

> Body generated by `scripts/fetch-schema-changelog.ts` from `Query.schemaChangelogs` (env: `test`, lookback: 14 days).