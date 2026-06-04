# @highnote-oss/nodejs-sdk — SDK Reference

> Auto-generated from src/. Do not edit by hand.
> For LLM consumption: point your CLAUDE.md / system prompt at this file.

## Setup

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `apiKey` | `string` | *required* | Highnote API key (starts with `sk_test_` or `sk_live_`). |
| `baseUrl` | `string` | — | Override the base API URL (useful for proxies or mocking). |
| `defaultPageSize` | `number` | — | Default page size for paginated queries. Defaults to 20. |
| `environment` | `HighnoteEnvironment` | — | API environment. Defaults to `"test"`. |

## Resources

### client.accountHolders

#### `createMinimalUSBusiness(input)`

Create a US business account holder with the minimal required profile.
Use this when you intend to fill in additional fields via subsequent
update mutations.

**Parameters**

- `input.businessProfile.billingAddress` (AddressInput, optional) — The business' U.S. billing address.

  Exactly one of `billingAddress` or `billingAddressToken` must be provided.
- `input.businessProfile.billingAddressToken` (string, optional) — A token representing the business' U.S. billing address.

  Exactly one of `billingAddress` or `billingAddressToken` must be provided.
- `input.businessProfile.businessCreditRiskAttributes` (BusinessCreditRiskAttributesInput, optional) — The business' credit risk attributes. Only used for unsecured credit applications.
- `input.businessProfile.businessDescription` (string, optional) — A short description of what the business does, its purpose, and the products or services it provides.

  Max length: 140 characters.
  Min length: 1 character.
  Input Regex Validation: `^[a-zA-Z\d$ ',.\-\_!@#$%^&*+=`?"\n]+$`
- `input.businessProfile.businessType` (BusinessStructure, **required**) — Type of business.
- `input.businessProfile.identificationDocument` (UsBusinessIdentificationDocumentInput, optional) — Business identification document such as employer identification number in USA.

  A business identification document is not required for SOLE_PROPRIETORSHIP.

  Highnote recommends passing an identification document when available to streamline the onboarding and future product approval processes.
- `input.businessProfile.legalAddress` (AddressInput, optional) — The address supplied for the business' registration.
  Supplying the address associated with the business primary SOS filing location is recommended.

  **Note**:  Depending on the product that the Account Holder is applying for, the legal entity address may be required.
  During your implementation review, requirements around conditionally mandatory fields will be outlined.
- `input.businessProfile.name.doingBusinessAsName` (string, optional) — The business' doing business as name.

  **Minimum length:** 1 character
  **Maximum length:** 255 characters
- `input.businessProfile.name.legalBusinessName` (string, **required**) — The business' legal name.
  **Minimum length:** 1 character
  **Maximum length:** 255 characters
- `input.businessProfile.phoneNumber` (PhoneInput, optional) — The primary phone number for this business.
- `input.businessProfile.ultimateBeneficialOwners` (MinimalUsUltimateBeneficialOwnerInput[], optional) — Ultimate beneficial owners of business information
- `input.businessProfile.website` (string, optional) — Business website URL.

  The validation for the `website` URL uses the following regex pattern `^((((https?|ftps?|gopher|telnet|nntp)://)|(mailto:|news:))(%[0-9A-Fa-f]{2}|[-()_.!~*';/?:@&=+$,A-Za-z0-9])+)([).!';/?:,][[:blank:|:blank:]])?$`
- `input.externalId` (string, optional) — An ID representing this account holder in an external system. Provide this field if you create identifiers for this business that you would like us to store for easy access to their information.
- `input.idempotencyKey` (string, **required**) — The idempotency key for this request.

  This is a random string such as UUIDv4 used to uniquely identify requests.

  If a request with the same `IdempotencyKey` is received multiple times, only the first request will be processed. Subsequent requests will return the same response as the first request.

  [See this link for more](https://en.wikipedia.org/wiki/Universally_unique_identifier#Version_4_(random))

  Minimum length: 5 characters
  Maximum length: 255 characters
- `input.primaryAuthorizedPerson.authorizingPersonTitle` (BusinessTitle, optional) — Authorized person's title.
- `input.primaryAuthorizedPerson.dateOfBirth` (string, **required**) — Date of birth in YYYY-MM-DD format.
  **Minimum age:** 18 years. **Maximum age:** 100 years, in place to combat fraud and potential elder financial abuse.
- `input.primaryAuthorizedPerson.email` (string, optional) — The authorized person's e-mail address.

  **Note:** Highnote does not verify the e-mail address.
- `input.primaryAuthorizedPerson.homeAddress` (AddressInput, optional) — The authorized person's U.S. physical address.

  Provide either `homeAddress` or `homeAddressToken`, but not both.
- `input.primaryAuthorizedPerson.homeAddressToken` (string, optional) — A token representing the authorized person's U.S. physical address.

  Provide either `homeAddress` or `homeAddressToken`, but not both.
- `input.primaryAuthorizedPerson.identificationDocument` (UsIdentificationDocumentInput, optional) — The identification document used to verify the authorized person.
- `input.primaryAuthorizedPerson.name.familyName` (string, **required**) — Part of a personal name that identifies a family, tribe, or community.

  **Minimum length:** 2 characters
  **Maximum length:** 255 characters
  **Allowed characters:** Lower and upper case Latin letters (without [diacritical marks](https://en.wikipedia.org/wiki/Diacritic)) and any of: ''', ',', '.', ' ','-'
- `input.primaryAuthorizedPerson.name.givenName` (string, **required**) — The part of the name that identifies a person.

  **Minimum length:** 1 character
  **Maximum length:** 255 characters
  **Allowed characters:** Lower and upper case Latin letters (without [diacritical marks](https://en.wikipedia.org/wiki/Diacritic)) and any of: ''', ',', '.', ' ','-'
- `input.primaryAuthorizedPerson.name.middleName` (string, optional) — Additional part of name that identifies a person.

  **Minimum length:** 1 character
  **Maximum length:** 255 characters
  **Allowed characters:** Lower and upper case Latin letters (without [diacritical marks](https://en.wikipedia.org/wiki/Diacritic)) and any of: ''', ',', '.', ' ','-'
- `input.primaryAuthorizedPerson.name.suffix` (string, optional) — Provides additional information about the person (e.g. Jr., Sr.)
- `input.primaryAuthorizedPerson.name.title` (string, optional) — One or more words used before the person's name (e.g. Mx., Dr.).
- `input.primaryAuthorizedPerson.percentageOwnership` (number, optional) — Percentage ownership of this authorized person in business if any.
- `input.primaryAuthorizedPerson.phoneNumber` (PhoneInput, optional) — The primary phone number for this authorized person.

**Returns** `USBusinessAccountHolder` — fields: `createdAt`, `externalId`, `id`.

**Throws** `HighnoteUserError`, `HighnoteAccessDeniedError`, `HighnoteUnexpectedResponseError`.

**Example**

```ts
const holder = await client.accountHolders.createMinimalUSBusiness({
  businessProfile: { ... },
});
```

#### `createUSBusiness(input)`

Create a US business account holder with the full profile and onboarding details
(authorized persons, ultimate beneficial owners, credit risk attributes).

**Parameters**

- `input.businessProfile.billingAddress` (AddressInput, optional) — The business' U.S. billing address.

  Exactly one of `billingAddress` or `billingAddressToken` must be provided.
- `input.businessProfile.billingAddressToken` (string, optional) — A token representing the business' U.S. billing address.

  Exactly one of `billingAddress` or `billingAddressToken` must be provided.
- `input.businessProfile.businessCreditRiskAttributes` (BusinessCreditRiskAttributesInput, optional) — The business' credit risk attributes. Only used for unsecured credit applications.
- `input.businessProfile.businessDescription` (string, optional) — A short description of what the business does, its purpose, and the products or services it provides.

  Max length: 140 characters.
  Min length: 1 character.
  Input Regex Validation: `^[a-zA-Z\d$ ',.\-\_!@#$%^&*+=`?"\n]+$`
- `input.businessProfile.businessPlanAttributes` (BusinessPlanAttributeInput[], optional) — Business plan indicator attributes for this business.
- `input.businessProfile.businessType` (BusinessStructure, **required**) — Type of business.
- `input.businessProfile.creditRiskAttributes` (CreditRiskAttributesInput, optional) — The business' credit risk attributes. Only used for unsecured credit applications.
  ***Note** This attribute is deprecated and will be removed in a future release. Please use `businessCreditRiskAttributes`.
- `input.businessProfile.identificationDocument` (UsBusinessIdentificationDocumentInput, optional) — Business identification document such as employer identification number in USA.

  A business identification document is not required for SOLE_PROPRIETORSHIP.

  Highnote recommends passing an identification document when available to streamline the onboarding and future product approval processes.
- `input.businessProfile.legalAddress` (AddressInput, optional) — The address supplied for the business' registration.
  Supplying the address associated with the business primary SOS filing location is recommended.

  **Note**:  Depending on the product that the Account Holder is applying for, the legal entity address may be required.
  During your implementation review, requirements around conditionally mandatory fields will be outlined.
- `input.businessProfile.name.doingBusinessAsName` (string, optional) — The business' doing business as name.

  **Minimum length:** 1 character
  **Maximum length:** 255 characters
- `input.businessProfile.name.legalBusinessName` (string, **required**) — The business' legal name.
  **Minimum length:** 1 character
  **Maximum length:** 255 characters
- `input.businessProfile.phoneNumber.countryCode` (string, **required**) — The assigned country code for the number.
- `input.businessProfile.phoneNumber.extension` (string, optional) — A number representing a specific phone on the same number as the main line.
- `input.businessProfile.phoneNumber.label` (PhoneLabel, **required**) — A classification for the type of the device the phone number is attached or how the phone number is used (e.g. home or work)
- `input.businessProfile.phoneNumber.number` (string, **required**) — The phone number in a country specific format.
- `input.businessProfile.ultimateBeneficialOwners` (UsUltimateBeneficialOwnerInput[], optional) — Ultimate beneficial owners of business information
- `input.businessProfile.website` (string, optional) — Business website URL.

  The validation for the `website` URL uses the following regex pattern `^((((https?|ftps?|gopher|telnet|nntp)://)|(mailto:|news:))(%[0-9A-Fa-f]{2}|[-()_.!~*';/?:@&=+$,A-Za-z0-9])+)([).!';/?:,][[:blank:|:blank:]])?$`
- `input.externalId` (string, optional) — An ID representing this account holder in an external system. Provide this field if you create identifiers for this business that you would like us to store for easy access to their information.
  **Maximum length:** 255 characters.

  The validation for the `externalId` uses the following regex pattern `^([a-zA-Z\d[\s][_][=][,][-][.][^;]])+$`.
- `input.primaryAuthorizedPerson.authorizingPersonTitle` (BusinessTitle, optional) — Authorized person's title.
- `input.primaryAuthorizedPerson.dateOfBirth` (string, **required**) — Date of birth in YYYY-MM-DD format.
  **Minimum age:** 18 years. **Maximum age:** 100 years, in place to combat fraud and potential elder financial abuse.
- `input.primaryAuthorizedPerson.email` (string, **required**) — The authorized person's e-mail address.

  **Note:** Highnote does not verify the e-mail address.
- `input.primaryAuthorizedPerson.homeAddress` (AddressInput, optional) — The authorized person's U.S. physical address.

  Exactly one of `homeAddress` or `homeAddressToken` must be provided.
- `input.primaryAuthorizedPerson.homeAddressToken` (string, optional) — A token representing the authorized person's U.S. physical address.

  Exactly one of `homeAddress` or `homeAddressToken` must be provided.
- `input.primaryAuthorizedPerson.identificationDocument.socialSecurityNumber.countryCodeAlpha3` (string, **required**) — The three character country code of the issuing country.
- `input.primaryAuthorizedPerson.identificationDocument.socialSecurityNumber.number` (string, **required**) — The full tax identification number.
- `input.primaryAuthorizedPerson.identificationDocument.socialSecurityNumber.taxIdentificationNumberType` (TaxIdentificationNumberType, optional) — The type of tax identification number.
- `input.primaryAuthorizedPerson.name.familyName` (string, **required**) — Part of a personal name that identifies a family, tribe, or community.

  **Minimum length:** 2 characters
  **Maximum length:** 255 characters
  **Allowed characters:** Lower and upper case Latin letters (without [diacritical marks](https://en.wikipedia.org/wiki/Diacritic)) and any of: ''', ',', '.', ' ','-'
- `input.primaryAuthorizedPerson.name.givenName` (string, **required**) — The part of the name that identifies a person.

  **Minimum length:** 1 character
  **Maximum length:** 255 characters
  **Allowed characters:** Lower and upper case Latin letters (without [diacritical marks](https://en.wikipedia.org/wiki/Diacritic)) and any of: ''', ',', '.', ' ','-'
- `input.primaryAuthorizedPerson.name.middleName` (string, optional) — Additional part of name that identifies a person.

  **Minimum length:** 1 character
  **Maximum length:** 255 characters
  **Allowed characters:** Lower and upper case Latin letters (without [diacritical marks](https://en.wikipedia.org/wiki/Diacritic)) and any of: ''', ',', '.', ' ','-'
- `input.primaryAuthorizedPerson.name.suffix` (string, optional) — Provides additional information about the person (e.g. Jr., Sr.)
- `input.primaryAuthorizedPerson.name.title` (string, optional) — One or more words used before the person's name (e.g. Mx., Dr.).
- `input.primaryAuthorizedPerson.percentageOwnership` (number, optional) — Percentage ownership of this authorized person in business if any.
- `input.primaryAuthorizedPerson.phoneNumber.countryCode` (string, **required**) — The assigned country code for the number.
- `input.primaryAuthorizedPerson.phoneNumber.extension` (string, optional) — A number representing a specific phone on the same number as the main line.
- `input.primaryAuthorizedPerson.phoneNumber.label` (PhoneLabel, **required**) — A classification for the type of the device the phone number is attached or how the phone number is used (e.g. home or work)
- `input.primaryAuthorizedPerson.phoneNumber.number` (string, **required**) — The phone number in a country specific format.

**Returns** `USBusinessAccountHolder` — fields: `createdAt`, `externalId`, `id`.

**Throws** `HighnoteUserError`, `HighnoteAccessDeniedError`, `HighnoteUnexpectedResponseError`.

**Example**

```ts
const holder = await client.accountHolders.createUSBusiness({
  businessProfile: { ... },
  authorizedPersons: [...],
  ultimateBeneficialOwners: [...],
});
```

#### `createUSPerson(input)`

Create a US person account holder.

**Parameters**

- `input.personAccountHolder.billingAddress` (AddressInput, optional) — The account holder's U.S. billing address.

  Exactly one of `billingAddress` or `billingAddressToken` must be provided.
- `input.personAccountHolder.billingAddressToken` (string, optional) — A token representing the account holder's U.S. billing address.

  Exactly one of `billingAddress` or `billingAddressToken` must be provided.
- `input.personAccountHolder.dateOfBirth` (string, **required**) — Date of birth in YYYY-MM-DD format.
  **Minimum age:** 10 years. **Maximum age:** 100 years, in place to combat fraud and potential elder financial abuse.
- `input.personAccountHolder.email` (string, optional) — The account holder's e-mail address.

  **Note:** Highnote does not verify the e-mail address.
- `input.personAccountHolder.externalId` (string, optional) — An ID representing this account holder in an external system. Provide this field if you create identifiers for this person that you would like us to store for easy access to their information.
  **Maximum length:** 255 characters.

  The validation for the `externalId` uses the following regex pattern `^([a-zA-Z\d[\s][_][=][,][-][.][^;]])+$`.
- `input.personAccountHolder.identificationDocument` (UsIdentificationDocumentInput, optional) — The identification documents used to verify the account holder.
- `input.personAccountHolder.name.familyName` (string, **required**) — Part of a personal name that identifies a family, tribe, or community.

  **Minimum length:** 2 characters
  **Maximum length:** 255 characters
  **Allowed characters:** Lower and upper case Latin letters (without [diacritical marks](https://en.wikipedia.org/wiki/Diacritic)) and any of: ''', ',', '.', ' ','-'
- `input.personAccountHolder.name.givenName` (string, **required**) — The part of the name that identifies a person.

  **Minimum length:** 1 character
  **Maximum length:** 255 characters
  **Allowed characters:** Lower and upper case Latin letters (without [diacritical marks](https://en.wikipedia.org/wiki/Diacritic)) and any of: ''', ',', '.', ' ','-'
- `input.personAccountHolder.name.middleName` (string, optional) — Additional part of name that identifies a person.

  **Minimum length:** 1 character
  **Maximum length:** 255 characters
  **Allowed characters:** Lower and upper case Latin letters (without [diacritical marks](https://en.wikipedia.org/wiki/Diacritic)) and any of: ''', ',', '.', ' ','-'
- `input.personAccountHolder.name.suffix` (string, optional) — Provides additional information about the person (e.g. Jr., Sr.)
- `input.personAccountHolder.name.title` (string, optional) — One or more words used before the person's name (e.g. Mx., Dr.).
- `input.personAccountHolder.personCreditRiskAttributes` (PersonCreditRiskAttributesInput, optional) — The credit risk attributes used to verify the `USPersonAccountHolder`'s underwriting details.
- `input.personAccountHolder.phoneNumber` (PhoneInput, optional) — The primary phone number for this account holder.

**Returns** `USPersonAccountHolder` — fields: `billingAddress`, `createdAt`, `dateOfBirth`, `email`, `externalId`, `id`, `name`.

**Throws** `HighnoteUserError`, `HighnoteAccessDeniedError`, `HighnoteUnexpectedResponseError`.

**Example**

```ts
const holder = await client.accountHolders.createUSPerson({
  personAccountHolder: { ... },
});
```

#### `get(id)`

Retrieve an account holder by ID (person or business).

**Parameters**

- `id` (string, **required**)

**Returns** `FindAccountHolderNode`.

**Throws** `HighnoteUserError`, `HighnoteAccessDeniedError`, `HighnoteUnexpectedResponseError`.

**Example**

```ts
const holder = await client.accountHolders.get("ah_...");
```

#### `listBusinesses(options)`

List business account holders with auto-pagination.

**Parameters**

- `options.pageSize` (number, optional)

**Returns** `AsyncIterable<object>`.

**Throws** `HighnoteUserError`, `HighnoteAccessDeniedError`, `HighnoteUnexpectedResponseError`.

**Example**

```ts
for await (const holder of client.accountHolders.listBusinesses()) {
  console.log(holder.id);
}
```

#### `listFinancialAccounts(accountHolderId, options)`

List the financial accounts owned by an account holder, auto-paginated.
Dispatches across the `AccountHolder` union internally — works for
`USPersonAccountHolder`, `USBusinessAccountHolder`, and `Organization` IDs.

**Parameters**

- `accountHolderId` (string, **required**)
- `options.filterBy` (AccountHolderFinancialAccountsFilterInput, optional)
- `options.pageSize` (number, optional)

**Returns** `AsyncIterable<FinancialAccountSummaryFragment>`.

**Throws** `HighnoteUserError`, `HighnoteAccessDeniedError`, `HighnoteUnexpectedResponseError`.

**Example**

```ts
import { FinancialAccountFeatureType } from "@highnote-oss/nodejs-sdk";

for await (const fa of client.accountHolders.listFinancialAccounts(
  accountHolderId,
  {
    filterBy: {
      features: { includes: [FinancialAccountFeatureType.CARD_FUNDING_ACCOUNT] },
      cardProductId: { equals: cardProductId },
    },
  },
)) {
  console.log(fa.name);
}
```

#### `listPersons(options)`

List person account holders with auto-pagination.

**Parameters**

- `options.pageSize` (number, optional)

**Returns** `AsyncIterable<object>`.

**Throws** `HighnoteUserError`, `HighnoteAccessDeniedError`, `HighnoteUnexpectedResponseError`.

**Example**

```ts
for await (const holder of client.accountHolders.listPersons()) {
  console.log(holder.id);
}
```

#### `searchBusinesses(filterBy, options)`

Search business account holders with auto-pagination.

**Parameters**

- `filterBy` (BusinessAccountHolderFilterInput, **required**)
- `options.pageSize` (number, optional)

**Returns** `AsyncIterable<object>`.

**Throws** `HighnoteUserError`, `HighnoteAccessDeniedError`, `HighnoteUnexpectedResponseError`.

**Example**

```ts
for await (const holder of client.accountHolders.searchBusinesses({ businessProfile: { website: { contains: "example.com" } } })) {
  console.log(holder.id);
}
```

#### `searchPersons(filterBy, options)`

Search person account holders with auto-pagination.

**Parameters**

- `filterBy` (PersonAccountHolderFilterInput, **required**)
- `options.pageSize` (number, optional)

**Returns** `AsyncIterable<object>`.

**Throws** `HighnoteUserError`, `HighnoteAccessDeniedError`, `HighnoteUnexpectedResponseError`.

**Example**

```ts
for await (const holder of client.accountHolders.searchPersons({ email: { contains: "@example.com" } })) {
  console.log(holder.id);
}
```

### client.ach

#### `cancelTransfer(input)`

Cancel a scheduled (one-time or recurring) ACH transfer.

**Parameters**

- `input.scheduledTransferId` (string, **required**) — Global ID used to reference the scheduled transfer

**Returns** `CancelledTransfer`.

**Throws** `HighnoteUserError`, `HighnoteAccessDeniedError`, `HighnoteUnexpectedResponseError`.

**Example**

```ts
await client.ach.cancelTransfer({ scheduledTransferId: "st_..." });
```

#### `createOneTimeTransfer(input)`

Schedule a one-time ACH transfer for a future date.

**Parameters**

- `input.descriptor.companyEntryDescription` (string, **required**) — Company entered value for the type of ACH.

  It can be at most 10 characters. The characters should be alphanumeric.
- `input.descriptor.individualIdentificationNumber` (string, optional) — Receiver’s identification number set by the bank initiating the ACH entry.

  This can be at most 15 characters. The characters should be alphanumeric.
- `input.descriptor.individualName` (string, **required**) — Receiver’s individual name set by the bank initiating the ACH entry.

  This could be a person or a business. It can be at most 22 characters. The characters should be alphanumeric.
- `input.fromFinancialAccountId` (string, **required**) — The ID of the `FinancialAccount` the funds will be coming from.

  Exactly one of `fromFinancialAccountId` and `toFinancialAccountId` will reference an external account id and the other will reference a Highnote account.
- `input.toFinancialAccountId` (string, **required**) — Exactly one of `fromFinancialAccountId` and `toFinancialAccountId` will reference an external account id and the other will reference a Highnote account.
- `input.transferAgreementConsent.authorizedPersonId` (string, **required**) — The ID of the individual who is authorizing the transfer
- `input.transferAgreementConsent.consentTimestamp` (string, **required**) — The date and time, in ISO 8601 format, marking when the primary authorized person or person account holder gave consent for the transfer.

  For example, `2022-01-01T22:00:00.000Z`.
- `input.transferAgreementConsent.template.consentTemplateId` (string, **required**) — The id indicating which consent was recorded.
- `input.transferAgreementConsent.template.consentTemplateVersion` (string, **required**) — The version of the template id.
- `input.transferAmountStrategy.balanceAmountType` (TransferBalanceAmountCode, optional) — A calculated balance amount
- `input.transferAmountStrategy.transferAmount` (AmountInput, optional) — An amount to be transferred
- `input.transferDateStrategy` (TransferDateStrategyInput, optional) — The strategy for the transfer date

**Returns** `OneTimeACHTransfer` — fields: `createdAt`, `id`, `scheduledTransferDate`, `status`, `transferAmount`, `updatedAt`.

**Throws** `HighnoteUserError`, `HighnoteAccessDeniedError`, `HighnoteUnexpectedResponseError`.

**Example**

```ts
const scheduled = await client.ach.createOneTimeTransfer({
  financialAccountId: "fa_...",
  externalAccountId: "ea_...",
  amount: { value: 5000, currencyCode: "USD" },
  purpose: AchTransferPurpose.WITHDRAWAL,
  scheduledDate: "2026-06-01",
});
```

#### `createRecurringTransfer(input)`

Schedule a recurring ACH transfer (e.g., payroll, monthly deposits).

**Parameters**

- `input.descriptor.companyEntryDescription` (string, **required**) — Company entered value for the type of ACH.

  It can be at most 10 characters. The characters should be alphanumeric.
- `input.descriptor.individualIdentificationNumber` (string, optional) — Receiver’s identification number set by the bank initiating the ACH entry.

  This can be at most 15 characters. The characters should be alphanumeric.
- `input.descriptor.individualName` (string, **required**) — Receiver’s individual name set by the bank initiating the ACH entry.

  This could be a person or a business. It can be at most 22 characters. The characters should be alphanumeric.
- `input.frequency` (RecurringAchTransferFrequencyCode, **required**) — The frequency of the scheduled payment
- `input.fromFinancialAccountId` (string, **required**) — The financial account id sending the funds.


  Exactly one of `fromFinancialAccountId` and `toFinancialAccountId` will reference an external account id and the other will reference a Highnote account.
- `input.toFinancialAccountId` (string, **required**) — The financial account id receiving the funds.

  Exactly one of `fromFinancialAccountId` and `toFinancialAccountId` will reference an external account id and the other will reference a Highnote account.
- `input.transferAgreementConsent.authorizedPersonId` (string, **required**) — The ID of the individual who is authorizing the transfer
- `input.transferAgreementConsent.consentTimestamp` (string, **required**) — The date and time, in ISO 8601 format, marking when the primary authorized person or person account holder gave consent for the transfer.

  For example, `2022-01-01T22:00:00.000Z`.
- `input.transferAgreementConsent.template.consentTemplateId` (string, **required**) — The id indicating which consent was recorded.
- `input.transferAgreementConsent.template.consentTemplateVersion` (string, **required**) — The version of the template id.
- `input.transferAmountStrategy.balanceAmountType` (TransferBalanceAmountCode, optional) — A calculated balance amount
- `input.transferAmountStrategy.transferAmount` (AmountInput, optional) — An amount to be transferred
- `input.transferDayStrategy` (TransferDayStrategyInput, optional) — The strategy for the transfer day

**Returns** `RecurringACHTransfer` — fields: `createdAt`, `frequency`, `id`, `status`, `transferAmount`, `updatedAt`.

**Throws** `HighnoteUserError`, `HighnoteAccessDeniedError`, `HighnoteUnexpectedResponseError`.

**Example**

```ts
const recurring = await client.ach.createRecurringTransfer({
  financialAccountId: "fa_...",
  externalAccountId: "ea_...",
  amount: { value: 100000, currencyCode: "USD" },
  purpose: AchTransferPurpose.PAYROLL,
  schedule: { frequency: "BIWEEKLY", startDate: "2026-06-01" },
});
```

#### `initiateTransfer(input)`

Initiate an ACH transfer to or from an external bank account.

**Parameters**

- `input.amount.currencyCode` (Iso4217Alpha3SupportedCurrency, **required**) — Three-character [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217) currency code

  **Examples:** `"USD", "EUR", "GBP"`
- `input.amount.value` (number, **required**) — Value of the amount as an integer. The number of decimal places [varies by currency](https://en.wikipedia.org/wiki/ISO_4217#Active_codes) so the value should be an integer accounting for the minor units.

  For example, a US dollar value of $10.99 should be provided as `1099`. A US dollar value of $10 should be provided as `1000`.

  Currencies with zero decimal places (such as `JPY`) or those with more than 2 (such as `JOD`) should be provided as `1099` and `10990` respectively.

  | Currency | Value
  | --- | --- |
  | USD | 1099 |
  | JPY | 1099 |
  | JOD | 10990 |
- `input.cancellationPeriodMillis` (number, optional) — The number of milliseconds after the transfer is initiated during which cancellation is allowed.
  The transfer will not be processed until the cancellation period elapses.

  The default value is 0.
- `input.companyEntryDescription` (string, **required**) — Provides the receiving financial institution with information about the nature or purpose of the transaction.
  Examples include "ACCTVERIFY". "PAYROLL", "PAYMENT", etc.

  Maximum length: 10 characters. The characters should be alphanumeric.
- `input.fromFinancialAccountId` (string, **required**) — The financial account to send funds from.

  This must be a verified external financial account (`ExternalFinancialBankAccount`) id when pulling funds
  and a Highnote `FinancialAccount` id when pushing funds.
- `input.idempotencyKey` (string, **required**) — A value to uniquely distinguish transfers, e.g. a UUID.

  This helps prevent duplicate transfers in error scenarios. If a failure happens and it is unclear
  if a transfer went through, it is safe to repeat the request with the same idempotency key. If the
  transfer already exists, the request will be deduped and the original transfer will be returned
  instead of a new transfer getting created for the same amount. If idempotency key is the same between
  two requests, the other fields will be ignored and the original transfer will be returned.

  This value is required. Maximum length: 255 characters.
- `input.individualIdentificationNumber` (string, optional) — Receiver’s identification number. This could be a person or a business.

  Maximum length: 15 characters. The characters should be alphanumeric.
- `input.individualName` (string, **required**) — Receiver’s individual name. This could be a person or a business.

  Maximum length: 22 characters. The characters should be alphanumeric.
- `input.paymentRelatedInformation` (string, optional) — Contains payment-related information provided by the originator of the transaction.
  It can include free-form text, structured data, or codes. The field supports alphanumeric characters,
  including the following symbols: ! " & ' ( ) \* + , - . / : ; ? = % ~ @ [ ] { } \\ | < > # $.

  **Example:** RMR\*IV\*0123456789\*\*999.99\\.

  Please note that this information may or may not be displayed to the recipient, based on the bank's
  capabilities, and method of access (i.e., online banking, statement, etc.)

  **Maximum length:** 80 characters
- `input.purpose` (AchTransferPurpose, **required**) — The purpose of the transfer, e.g. deposit.
- `input.sameDay` (boolean, optional) — A flag that indicates the desire to process this transaction using same-day ACH.
  Note that this flag is not a guarantee the transaction will be processed the same day.
  Funds availability is highly dependent on the ACH network processing schedule.
- `input.toFinancialAccountId` (string, **required**) — The financial account to send funds to.

  This must be a Highnote `FinancialAccount` id when pulling funds
  and a verified or non-verified external financial account (`ExternalFinancialBankAccount`
  or `NonVerifiedExternalUSFinancialBankAccount`) id when pushing funds.
- `input.transferAgreementConsent.authorizedPersonId` (string, **required**) — The ID of the individual who is authorizing the transfer
- `input.transferAgreementConsent.consentTimestamp` (string, **required**) — The date and time, in ISO 8601 format, marking when the primary authorized person or person account holder gave consent for the transfer.

  For example, `2022-01-01T22:00:00.000Z`.
- `input.transferAgreementConsent.template.consentTemplateId` (string, **required**) — The id indicating which consent was recorded.
- `input.transferAgreementConsent.template.consentTemplateVersion` (string, **required**) — The version of the template id.

**Returns** `OriginatedAchTransfer` — fields: `amount`, `companyEntryDescription`, `createdAt`, `id`, `purpose`, `status`.

**Throws** `HighnoteUserError`, `HighnoteAccessDeniedError`, `HighnoteUnexpectedResponseError`.

**Example**

```ts
const transfer = await client.ach.initiateTransfer({
  financialAccountId: "fa_...",
  externalAccountId: "ea_...",
  amount: { value: 10000, currencyCode: "USD" },
  purpose: AchTransferPurpose.DEPOSIT,
});
```

### client.addresses

#### `validate(input)`

Validate an address for physical card delivery.
Returns an AddressValidationResult with an outcome union:
- AddressValidatedResult: address is valid, has token.id
- AddressValidatedWithChangesResult: valid but corrected, has token.id + componentsChanged
- AddressIncompleteResult: address is missing components
- AddressInvalidResult: address is not deliverable

**Parameters**

- `input.address.countryCodeAlpha3` (string, **required**) — The [three letter country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-3) where the address resides.
- `input.address.extendedAddress` (string, optional) — Additional data about the address, e.g. apartment, unit, floor, or place name.

  The validation for the `extendedAddress` uses the following regex pattern `^[a-zA-Z\d',. \-#]+(([',. \-#/][a-zA-Z \d])?[a-zA-Z.]*)*$`.

  It checks for numeric string with special characters and whitespace.
- `input.address.locality` (string, **required**) — The locality of the address (e.g. town, city)

  The validation for the `locality` uses the following regex pattern `^['\p{L}]+(?:[ \p{L},'-:])*$`.

  It checks to ensure it begins with a single quote or any letter, followed by whitespace, commas, single quote, any letter, or character in this set '()*+,-./0123456789: .
- `input.address.postalCode` (string, **required**) — The postal code of the address.  The value can include 5 numbers only or a hyphen - and 4 numbers
- `input.address.region` (string, **required**) — A region for the address based on the two letter state [IS0 3166 standard](https://en.wikipedia.org/wiki/ISO_3166-2:US), including districts and outlying areas.
- `input.address.streetAddress` (string, **required**) — The number and street of the address.

  The validation for the `address` uses the following regex pattern `^\s*\S+(?:\s+\S+){1,3}`.

  This pattern matches two to four groups of non-whitespace characters. These can include special characters like dashes or slashes. For example, 'Cozy Cottage', '200 Lake Rd', '123 Second Street NW', and '111 1/2 Center Street' all match.

  When the field is used for creating an application, it will also validate that a PO Box is not included using this regex pattern `^(?:((\S([^pPOo])+)|(?:[0-9]+)))\s(?:[0-9A-Za-z\.]|[^\S\r\n])+$`.

  When the field is used for creating a physical payment card order or physical payment card group order, it will also support mailing to a PO Box using this regex pattern `^(?:(?:(?:\S[^pPOo\r\n]+)|(?:[0-9/#]+)))\s(?:[0-9A-Za-z\.]|[^\S\r\n])+$|^\b[P|p]*(?:OST|ost)*\.*\s*[O|o|0]*(?:ffice|FFICE)*\.*\s*[B|b][O|o|0][X|x]\s[0-9A-Za-z]+\b$`.
- `input.idempotencyKey` (string, **required**) — The idempotency key for this request.

  This is a random string such as UUIDv4 used to uniquely identify requests.

  If a request with the same `IdempotencyKey` is received multiple times, only the first request will be processed. Subsequent requests will return the same response as the first request.

  [See this link for more](https://en.wikipedia.org/wiki/Universally_unique_identifier#Version_4_(random))

  Minimum length: 5 characters
  Maximum length: 255 characters
- `input.scope` (AddressTokenScope, optional) — The intended scope of the validated address token. Defaults to `SINGLE_USE` if not provided.

**Returns** `AddressValidationResult` — fields: `outcome`.

**Throws** `HighnoteUserError`, `HighnoteAccessDeniedError`, `HighnoteUnexpectedResponseError`.

**Example**

```ts
const result = await client.addresses.validate({
  address: { streetAddress: "24 Willie Mays Plz", locality: "San Francisco", region: "CA", postalCode: "94107", countryCodeAlpha3: "USA" },
  idempotencyKey: crypto.randomUUID(),
});
if (result.outcome?.__typename === "AddressValidatedResult") {
  const tokenId = result.outcome.token?.id; // use for ordering
}
```

### client.applications

#### `create(input)`

Create a card product application for an account holder.

**Parameters**

- `input.accountHolderCreditReportPullConsent` (ConsentInput, optional) — Details on the account holder's consent to pull their credit report as part of the card product application.
- `input.accountHolderId` (string, **required**) — The ID of the account holder applicant.
- `input.applicationConfiguration` (ApplicationConfigurationInput, optional) — Optional application-level configuration provided by the applicant at the start of the application,
  such as billing cycle preferences.
- `input.cardHolderAgreementConsent.consentIpAddress` (IpAddressInput, optional) — The `IPAddress` of the consenting party when they accepted the agreement.
- `input.cardHolderAgreementConsent.consentTimestamp` (string, **required**) — The date and time, in ISO 8601 format, marking when the primary authorized person or person card holder accepted card holder agreement.

  For example, `2022-01-01T22:00:00.000Z`.
- `input.cardHolderAgreementConsent.primaryAuthorizedPersonId` (string, **required**) — The ID of the primary authorized person of the business or the person card holder. For authorized user applications, the primaryAuthorizedPersonId is the authorized user id.
- `input.cardProductId` (string, **required**) — The ID of the Card Product for which the account holder is applying to use.
- `input.ipAddress` (IpAddressInput, optional) — The IP address details of the account holder applicant.

**Returns** `AccountHolderCardProductApplication` — fields: `applicationState`, `createdAt`, `id`, `updatedAt`.

**Throws** `HighnoteUserError`, `HighnoteAccessDeniedError`, `HighnoteUnexpectedResponseError`.

**Example**

```ts
const app = await client.applications.create({
  accountHolderId: "ah_...",
  cardProductId: "cp_...",
  cardHolderAgreementConsent: {
    consentTimestamp: new Date().toISOString(),
    primaryAuthorizedPersonId: "ah_...",
  },
});
```

#### `get(id)`

Retrieve an application by ID.

**Parameters**

- `id` (string, **required**)

**Returns** `AccountHolderCardProductApplication` — fields: `accountHolderSnapshot`, `applicationState`, `applicationWorkflows`, `cardProduct`, `createdAt`, `decisionedAt`, `id`, `updatedAt`.

**Throws** `HighnoteUserError`, `HighnoteAccessDeniedError`, `HighnoteUnexpectedResponseError`.

**Example**

```ts
const app = await client.applications.get("app_...");
```

### client.cardProducts

#### `get(id)`

Retrieve a single card product by ID.

**Parameters**

- `id` (string, **required**)

**Returns** `CardProduct` — fields: `commercial`, `id`, `name`, `usage`, `vertical`.

**Throws** `HighnoteUserError`, `HighnoteAccessDeniedError`, `HighnoteUnexpectedResponseError`.

**Example**

```ts
const product = await client.cardProducts.get("cp_...");
```

#### `list(options)`

Returns an async iterable over all card products.

**Parameters**

- `options.pageSize` (number, optional) — Number of items per page. Defaults to client's defaultPageSize.

**Returns** `AsyncIterable<object>`.

**Throws** `HighnoteUserError`, `HighnoteAccessDeniedError`, `HighnoteUnexpectedResponseError`.

**Example**

```ts
for await (const product of client.cardProducts.list()) {
  console.log(product.name);
}
```

### client.cards

#### `activate(input)`

Activate a payment card.

**Parameters**

- `input.paymentCardId` (string, **required**) — The ID of the Payment Card to activate.

**Returns** `PaymentCard` — fields: `bin`, `expirationDate`, `expirationMonth`, `expirationYear`, `externalId`, `formFactor`, `id`, `last4`, `network`, `status`.

**Throws** `HighnoteUserError`, `HighnoteAccessDeniedError`, `HighnoteUnexpectedResponseError`.

**Example**

```ts
const card = await client.cards.activate({ paymentCardId: "pc_..." });
```

#### `cancelPhysicalOrder(input)`

Cancel a pending physical card order.

**Parameters**

- `input.physicalPaymentCardOrderId` (string, **required**) — Physical Payment Card ID

**Returns** `PhysicalPaymentCardOrder` — fields: `createdAt`, `id`, `orderState`, `updatedAt`.

**Throws** `HighnoteUserError`, `HighnoteAccessDeniedError`, `HighnoteUnexpectedResponseError`.

**Example**

```ts
const canceled = await client.cards.cancelPhysicalOrder({
  physicalPaymentCardOrderId: "pco_...",
});
```

#### `close(input)`

Close a payment card permanently.

**Parameters**

- `input.paymentCardId` (string, **required**) — The ID of the Payment Card to close.

**Returns** `PaymentCard` — fields: `bin`, `expirationDate`, `expirationMonth`, `expirationYear`, `externalId`, `formFactor`, `id`, `last4`, `network`, `status`.

**Throws** `HighnoteUserError`, `HighnoteAccessDeniedError`, `HighnoteUnexpectedResponseError`.

**Example**

```ts
await client.cards.close({ paymentCardId: "pc_..." });
```

#### `findATMLocations(input)`

Find ATM locations near coordinates for a payment card.

**Parameters**

- `input.features` (string[], optional)
- `input.latitude` (string, **required**)
- `input.limit` (number, optional)
- `input.longitude` (string, **required**)
- `input.paymentCardId` (string, **required**)
- `input.radiusMiles` (number, optional)

**Returns** `any`.

**Throws** `HighnoteUserError`, `HighnoteAccessDeniedError`, `HighnoteUnexpectedResponseError`.

**Example**

```ts
const atms = await client.cards.findATMLocations({
  paymentCardId: "pc_...",
  latitude: "37.7749",
  longitude: "-122.4194",
  radiusMiles: 10,
});
```

#### `get(id)`

Retrieve a payment card by ID.

**Parameters**

- `id` (string, **required**)

**Returns** `PaymentCard` — fields: `bin`, `expirationDate`, `expirationMonth`, `expirationYear`, `externalId`, `formFactor`, `id`, `last4`, `network`, `status`.

**Throws** `HighnoteUserError`, `HighnoteAccessDeniedError`, `HighnoteUnexpectedResponseError`.

**Example**

```ts
const card = await client.cards.get("pc_...");
```

#### `issue(input)`

Issue a payment card for a financial account.

**Parameters**

- `input.customFields` (CustomFieldInput[], optional) — The `CustomFields` for the Payment Card.
- `input.financialAccountId` (string, **required**) — The ID of the financial account to issue this Payment Card against.

  **Note:** The Financial Account must have a payment card feature enabled.
- `input.idempotencyKey` (string, optional) — A value to distinguish unique `IssuePaymentCardForFinancialAccount` request.
  This helps prevent duplicate cards from be issued. If a failure happens and it is unclear
  if an issue payment card request went through, it is safe to repeat the request with the same idempotency key.
  If card has already been issued, the request will be deduped and the original payment card response will be
  returned instead.

  **Minimum length:** 10 characters
  **Maximum length:** 255 characters
- `input.options.activateOnCreate` (boolean, **required**) — Whether or not to activate the card when created. If **not** activated on creation, the card must be activated separately before use.
- `input.options.cardProfileSetId` (string, optional) — The card profile set containing the card profile to use for the newly issued Payment Card.
- `input.options.expirationDate` (string, **required**) — The exact date and time the payment card will expire. e.g. 2026-01-01T23:59:59Z
- `input.options.externalId` (string, optional) — Externally provided ID (255 character limit) that is unique per organization and tenant. If not provided, Highnote will generate an ID (ten digit, Base58, all caps).

**Returns** `PaymentCard` — fields: `bin`, `expirationDate`, `expirationMonth`, `expirationYear`, `externalId`, `formFactor`, `id`, `last4`, `network`, `status`.

**Throws** `HighnoteUserError`, `HighnoteAccessDeniedError`, `HighnoteUnexpectedResponseError`.

**Example**

```ts
const card = await client.cards.issue({
  financialAccountId: "fa_...",
  options: { activateOnCreate: true, expirationDate: "2028-12-31T00:00:00Z" },
});
```

#### `issueForApplicationWithOnDemandFunding(input)`

Issue a payment card AND open a new on-demand-funded FinancialAccount
under the given approved application, in a single mutation. The new FA
pulls from `sourceFinancialAccountId` at authorization time.

Use this when each card needs its own backing FA (e.g. AP invoice
automation: one card == one invoice == one FA).
For issuing an additional card on an EXISTING FA, use `cards.issue()`.

**Parameters**

- `input.applicationId` (string, **required**) — The ID of the application to issue this `PaymentCard` against.

  **Note:** The Application must be APPROVED.
- `input.customFields` (CustomFieldInput[], optional) — The `CustomFields` for the `PaymentCard`.
- `input.externalId` (string, optional) — Externally provided ID (255 character limit) that is unique per organization and tenant. If not provided, Highnote will generate an ID (ten digit, Base58, all caps).
- `input.idempotencyKey` (string, optional) — The idempotency key for this request.

  This is a UUIDv4 string used to uniquely identify requests.

  If a request with the same `IdempotencyKey` is received multiple times, only the first request will be processed. Subsequent requests will return the same response as the first request.

  [See this link for more](https://en.wikipedia.org/wiki/Universally_unique_identifier#Version_4_(random))
- `input.options.activateOnCreate` (boolean, **required**) — Whether or not to activate the card when created. If **not** activated on creation, the card must be activated separately before use.
- `input.options.cardProfileSetId` (string, optional) — The card profile set containing the card profile to use for the newly issued Payment Card.
- `input.options.expirationDate` (string, **required**) — The exact date and time the payment card will expire. e.g. 2026-01-01T23:59:59Z
- `input.options.externalId` (string, optional) — Externally provided ID (255 character limit) that is unique per organization and tenant. If not provided, Highnote will generate an ID (ten digit, Base58, all caps).
- `input.sourceFinancialAccountId` (string, **required**) — The source `FinancialAccount` that will act as the on-demand funding source for this `PaymentCard`.

**Returns** `PaymentCard` — fields: `bin`, `expirationDate`, `expirationMonth`, `expirationYear`, `externalId`, `financialAccounts`, `formFactor`, `id`, `last4`, `network`, `status`.

**Throws** `HighnoteUserError`, `HighnoteAccessDeniedError`, `HighnoteUnexpectedResponseError`.

**Example**

```ts
const card = await client.cards.issueForApplicationWithOnDemandFunding({
  applicationId: "app_...",
  sourceFinancialAccountId: "fa_program_funding",
  options: { activateOnCreate: true, expirationDate: "2028-12-31T00:00:00Z" },
  idempotencyKey: invoice.id,
});
const newFinancialAccountId = card.financialAccounts?.[0]?.id;
```

#### `orderPhysical(input)`

Order a physical card for an existing payment card.

**Parameters**

- `input.cardPersonalization.textLines.line1` (string, **required**) — First line.

  The value provided will be stored and returned fully capitalized.

  For example, `Jane` will be stored as `JANE`.

  Minimum length is 1 and maximum length is 23. Valid characters are all alphanumeric characters, `,`,
  `.`, `'`, `&`, `-`, `\`, `$`, and space. The regex used to validate is `^[0-9A-Za-z \&\-\,\./\'\$]*$`.
- `input.cardPersonalization.textLines.line2` (string, optional) — Second line.

  The value provided will be stored and returned fully capitalized.

  For example, `Jane` will be stored as `JANE`.

  Minimum length is 1 and maximum length is 23. Valid characters are all alphanumeric characters, `,`,
  `.`, `'`, `&`, `-`, `\`, `$`, and space. The regex used to validate is `^[0-9A-Za-z \&\-\,\./\'\$]*$`.
- `input.cardPersonalization.textLines.line3` (string, optional) — Third line.

  The value provided will be stored and returned fully capitalized.

  For example, `Jane` will be stored as `JANE`.

  Minimum length is 1 and maximum length is 23. Valid characters are all alphanumeric characters, `,`,
  `.`, `'`, `&`, `-`, `\`, `$`, and space. The regex used to validate is `^[0-9A-Za-z \&\-\,\./\'\$]*$`.
- `input.courier` (PaymentCardShipmentCourierInput, optional) — Courier information.
- `input.deliveryDetails.additionalInformation` (AdditionalRecipientInformationInput, optional) — Additional information about the recipient required for international card shipping.
- `input.deliveryDetails.address.countryCodeAlpha3` (string, **required**) — The [three letter country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-3) where the address resides.
- `input.deliveryDetails.address.extendedAddress` (string, optional) — Additional data about the address, e.g. apartment, unit, floor, or place name.

  The validation for the `extendedAddress` uses the following regex pattern `^[a-zA-Z\d',. \-#]+(([',. \-#/][a-zA-Z \d])?[a-zA-Z.]*)*$`.

  It checks for numeric string with special characters and whitespace.
- `input.deliveryDetails.address.locality` (string, **required**) — The locality of the address (e.g. town, city)

  The validation for the `locality` uses the following regex pattern `^['\p{L}]+(?:[ \p{L},'-:])*$`.

  It checks to ensure it begins with a single quote or any letter, followed by whitespace, commas, single quote, any letter, or character in this set '()*+,-./0123456789: .
- `input.deliveryDetails.address.postalCode` (string, **required**) — The postal code of the address.  The value can include 5 numbers only or a hyphen - and 4 numbers
- `input.deliveryDetails.address.region` (string, **required**) — A region for the address based on the two letter state [IS0 3166 standard](https://en.wikipedia.org/wiki/ISO_3166-2:US), including districts and outlying areas.
- `input.deliveryDetails.address.streetAddress` (string, **required**) — The number and street of the address.

  The validation for the `address` uses the following regex pattern `^\s*\S+(?:\s+\S+){1,3}`.

  This pattern matches two to four groups of non-whitespace characters. These can include special characters like dashes or slashes. For example, 'Cozy Cottage', '200 Lake Rd', '123 Second Street NW', and '111 1/2 Center Street' all match.

  When the field is used for creating an application, it will also validate that a PO Box is not included using this regex pattern `^(?:((\S([^pPOo])+)|(?:[0-9]+)))\s(?:[0-9A-Za-z\.]|[^\S\r\n])+$`.

  When the field is used for creating a physical payment card order or physical payment card group order, it will also support mailing to a PO Box using this regex pattern `^(?:(?:(?:\S[^pPOo\r\n]+)|(?:[0-9/#]+)))\s(?:[0-9A-Za-z\.]|[^\S\r\n])+$|^\b[P|p]*(?:OST|ost)*\.*\s*[O|o|0]*(?:ffice|FFICE)*\.*\s*[B|b][O|o|0][X|x]\s[0-9A-Za-z]+\b$`.
- `input.deliveryDetails.companyName` (string, optional) — The company to whom the shipment should be delivered.
- `input.deliveryDetails.name.familyName` (string, **required**) — Part of a personal name that identifies a family, tribe, or community.

  **Minimum length:** 2 character
  **Maximum length:** 255 characters

  The validation for the input uses the following regex pattern `^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$`.
- `input.deliveryDetails.name.givenName` (string, **required**) — The part of the name that identifies a person.

  **Minimum length:** 1 character
  **Maximum length:** 255 characters

  The validation for the input uses the following regex pattern `^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$`.
- `input.deliveryDetails.name.middleName` (string, optional) — Additional part of name that identifies a person.

  **Maximum length:** 255 characters

  The validation for the input uses the following regex pattern `^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$`.
- `input.deliveryDetails.name.suffix` (string, optional) — Provides additional information about the person (e.g. Jr., Sr.)

  **Maximum length:** 10 characters

  The validation for the input uses the following regex pattern `^[a-zA-Z.]+$`.
- `input.deliveryDetails.name.title` (string, optional) — One or more words used before the person's name (e.g. Mx., Dr.).

  **Maximum length:** 10 characters

  The validation for the input uses the following regex pattern `^[a-zA-Z.]+$`.
- `input.paymentCardId` (string, **required**) — Id of the payment card.
- `input.requestedShipDate` (string, optional) — Requested ship date in YYYY-MM-DD format.

  Use this if the fulfillment should not happen before a certain date.

  If the card should be shipped as soon as possible, omit this field. If the date provided is in the past, the value will be ignored.

**Returns** `PhysicalPaymentCardOrder` — fields: `cardPersonalization`, `createdAt`, `id`, `orderState`, `paymentCardShipment`, `updatedAt`.

**Throws** `HighnoteUserError`, `HighnoteAccessDeniedError`, `HighnoteUnexpectedResponseError`.

**Example**

```ts
const order = await client.cards.orderPhysical({
  paymentCardId: "pc_...",
  cardPersonalization: { textLines: { line1: "JANE DOE" } },
  deliveryDetails: {
    name: { givenName: "Jane", familyName: "Doe" },
    address: {
      streetAddress: "123 Main St",
      locality: "San Francisco",
      region: "CA",
      postalCode: "94105",
      countryCodeAlpha3: "USA",
    },
  },
});
```

#### `orderPhysicalWithValidatedAddress(input)`

Order a physical card using a validated address token.
Call `client.addresses.validate()` first to get the token ID.

**Parameters**

- `input.cardPersonalization.textLines.line1` (string, **required**) — First line.

  The value provided will be stored and returned fully capitalized.

  For example, `Jane` will be stored as `JANE`.

  Minimum length is 1 and maximum length is 23. Valid characters are all alphanumeric characters, `,`,
  `.`, `'`, `&`, `-`, `\`, `$`, and space. The regex used to validate is `^[0-9A-Za-z \&\-\,\./\'\$]*$`.
- `input.cardPersonalization.textLines.line2` (string, optional) — Second line.

  The value provided will be stored and returned fully capitalized.

  For example, `Jane` will be stored as `JANE`.

  Minimum length is 1 and maximum length is 23. Valid characters are all alphanumeric characters, `,`,
  `.`, `'`, `&`, `-`, `\`, `$`, and space. The regex used to validate is `^[0-9A-Za-z \&\-\,\./\'\$]*$`.
- `input.cardPersonalization.textLines.line3` (string, optional) — Third line.

  The value provided will be stored and returned fully capitalized.

  For example, `Jane` will be stored as `JANE`.

  Minimum length is 1 and maximum length is 23. Valid characters are all alphanumeric characters, `,`,
  `.`, `'`, `&`, `-`, `\`, `$`, and space. The regex used to validate is `^[0-9A-Za-z \&\-\,\./\'\$]*$`.
- `input.courier` (PaymentCardShipmentCourierInput, optional) — Courier information.
- `input.deliveryDetails.companyName` (string, optional) — The company to whom the shipment should be delivered.
- `input.deliveryDetails.name.familyName` (string, **required**) — Part of a personal name that identifies a family, tribe, or community.

  **Minimum length:** 2 character
  **Maximum length:** 255 characters

  The validation for the input uses the following regex pattern `^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$`.
- `input.deliveryDetails.name.givenName` (string, **required**) — The part of the name that identifies a person.

  **Minimum length:** 1 character
  **Maximum length:** 255 characters

  The validation for the input uses the following regex pattern `^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$`.
- `input.deliveryDetails.name.middleName` (string, optional) — Additional part of name that identifies a person.

  **Maximum length:** 255 characters

  The validation for the input uses the following regex pattern `^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$`.
- `input.deliveryDetails.name.suffix` (string, optional) — Provides additional information about the person (e.g. Jr., Sr.)

  **Maximum length:** 10 characters

  The validation for the input uses the following regex pattern `^[a-zA-Z.]+$`.
- `input.deliveryDetails.name.title` (string, optional) — One or more words used before the person's name (e.g. Mx., Dr.).

  **Maximum length:** 10 characters

  The validation for the input uses the following regex pattern `^[a-zA-Z.]+$`.
- `input.deliveryDetails.validatedAddressId` (string, **required**) — The ID of validated address to where the shipment should be delivered.
- `input.idempotencyKey` (string, **required**) — The idempotency key for this request.

  This is a random string such as UUIDv4 used to uniquely identify requests.

  If a request with the same `IdempotencyKey` is received multiple times, only the first request will be processed. Subsequent requests will return the same response as the first request.

  [See this link for more](https://en.wikipedia.org/wiki/Universally_unique_identifier#Version_4_(random))

  Minimum length: 5 characters
  Maximum length: 255 characters
- `input.paymentCardId` (string, **required**) — Id of the payment card.
- `input.requestedShipDate` (string, optional) — Requested ship date in YYYY-MM-DD format.

  Use this if the fulfillment should not happen before a certain date.

  If the card should be shipped as soon as possible, omit this field. If the date provided is in the past, the value will be ignored.

**Returns** `PhysicalPaymentCardOrder` — fields: `cardPersonalization`, `createdAt`, `id`, `orderState`, `paymentCardShipment`, `updatedAt`.

**Throws** `HighnoteUserError`, `HighnoteAccessDeniedError`, `HighnoteUnexpectedResponseError`.

**Example**

```ts
const { token } = await client.addresses.validate({ address });
const order = await client.cards.orderPhysicalWithValidatedAddress({
  paymentCardId: "pc_...",
  cardPersonalization: { textLines: { line1: "JANE DOE" } },
  validatedAddressToken: token,
});
```

#### `reissue(input)`

Reissue a payment card (e.g., lost, stolen, or expired).
Creates a new card from an existing one.

**Parameters**

- `input.customFields` (CustomFieldInput[], optional) — The `CustomFields` for the Payment Card.
- `input.idempotencyKey` (string, optional) — A value to distinguish unique reissue request.

  This helps prevent duplicate cards from be reissued. If a failure happens and it is unclear
  if a reissue payment card request went through, it is safe to repeat the request with the same idempotency key.
  If the reissue process has already happened, the request will be deduped and the original response will be
  returned instead.

  **Minimum length:** 10 characters
  **Maximum length:** 255 characters
- `input.options.activateOnCreate` (boolean, **required**) — Whether or not to activate the card when created. If **not** activated on creation, the card must be activated separately before use.
- `input.options.cardLostDate` (string, optional) — The date on which the card was lost. e.g. 2026-01-01T23:59:59Z
- `input.options.expirationDate` (string, **required**) — The exact date and time the payment card will expire. e.g. 2026-01-01T23:59:59Z
  If copying the number, cannot be in the same month/year (in UTC timezone) as the original card.
- `input.options.reason` (ReissueReason, optional) — The reason why a card is being reissued
- `input.options.reissueFeatures` (ReissuePaymentCardFeaturesInput, optional) — Options for specifying which attributes of the original card should be copied.
  If not specified, no attributes will be copied.
- `input.originalPaymentCardId` (string, **required**) — The ID of the card to issue this Payment Card against.

  **Note:** The card cannot be CLOSED.

**Returns** `PaymentCard` — fields: `bin`, `expirationDate`, `expirationMonth`, `expirationYear`, `externalId`, `formFactor`, `id`, `last4`, `network`, `status`.

**Throws** `HighnoteUserError`, `HighnoteAccessDeniedError`, `HighnoteUnexpectedResponseError`.

**Example**

```ts
const newCard = await client.cards.reissue({
  originalPaymentCardId: "pc_...",
  options: { activateOnCreate: true, expirationDate: "2029-12-31T00:00:00Z" },
});
```

#### `suspend(input)`

Suspend a payment card.

**Parameters**

- `input.paymentCardId` (string, **required**) — The ID of the Payment Card to suspend.

**Returns** `PaymentCard` — fields: `bin`, `expirationDate`, `expirationMonth`, `expirationYear`, `externalId`, `formFactor`, `id`, `last4`, `network`, `status`.

**Throws** `HighnoteUserError`, `HighnoteAccessDeniedError`, `HighnoteUnexpectedResponseError`.

**Example**

```ts
await client.cards.suspend({ paymentCardId: "pc_..." });
```

### client.clientTokens

#### `createForDocumentUpload(input)`

Generate a scoped client token for a document upload session.

**Parameters**

- `input.documentUploadSessionId` (string, **required**) — The global ID of the Document Upload Session for this token.
- `input.permissions` (DocumentUploadClientTokenPermission[], **required**) — Specify permissions for this token.

**Returns** `ClientToken` — fields: `expirationDate`, `value`.

**Throws** `HighnoteUserError`, `HighnoteAccessDeniedError`, `HighnoteUnexpectedResponseError`.

**Example**

```ts
const token = await client.clientTokens.createForDocumentUpload({
  documentUploadSessionId: "dus_...",
  permissions: ["MANAGE_DOCUMENT_UPLOAD_SESSION"],
});
```

#### `createForPaymentCard(input)`

Generate a scoped client token for a payment card.

**Parameters**

- `input.paymentCardId` (string, **required**) — The global ID of the Payment Card for this token.
- `input.permissions` (PaymentCardClientTokenPermission[], **required**) — Specify permissions for this token.

**Returns** `ClientToken` — fields: `expirationDate`, `value`.

**Throws** `HighnoteUserError`, `HighnoteAccessDeniedError`, `HighnoteUnexpectedResponseError`.

**Example**

```ts
const token = await client.clientTokens.createForPaymentCard({
  paymentCardId: "pc_...",
  permissions: ["READ_RESTRICTED_DETAILS"],
});
```

#### `createForTokenization(input)`

Generate a scoped client token for payment method tokenization.

**Parameters**

- `input.permissions` (GeneratePaymentMethodTokenizationClientTokenPermission[], **required**) — Requested permissions for the `GeneratePaymentMethodTokenizationClientToken`

**Returns** `ClientToken` — fields: `expirationDate`, `value`.

**Throws** `HighnoteUserError`, `HighnoteAccessDeniedError`, `HighnoteUnexpectedResponseError`.

**Example**

```ts
const token = await client.clientTokens.createForTokenization({
  permissions: ["TOKENIZE_PAYMENT_METHOD"],
});
```

### client.collaborativeAuth

#### `activateEndpoint(input)`

Activate a collaborative authorization endpoint.

**Parameters**

- `input.endpointId` (string, **required**) — The Global ID of the `CollaborativeAuthorizationEndpoint` to activate.

**Returns** `CollaborativeAuthorizationEndpoint` — fields: `createdAt`, `id`, `name`, `status`, `updatedAt`, `uri`.

**Throws** `HighnoteUserError`, `HighnoteAccessDeniedError`, `HighnoteUnexpectedResponseError`.

**Example**

```ts
await client.collaborativeAuth.activateEndpoint({ endpointId: "cae_..." });
```

#### `addEndpoint(input)`

Add a collaborative authorization endpoint.

**Parameters**

- `input.name` (string, **required**) — A name for the `CollaborativeAuthorizationEndpoint`.

  Must be between 1 and 255 characters.
- `input.uri` (string, **required**) — A valid URI to send collaborative authorization requests. The protocol _must be included_ and is required to be `https`.

  Example: `https://mywebhook.com`

**Returns** `CollaborativeAuthorizationEndpoint` — fields: `createdAt`, `id`, `name`, `status`, `updatedAt`, `uri`.

**Throws** `HighnoteUserError`, `HighnoteAccessDeniedError`, `HighnoteUnexpectedResponseError`.

**Example**

```ts
const endpoint = await client.collaborativeAuth.addEndpoint({
  name: "My Auth Endpoint",
  uri: "https://example.com/auth",
});
```

#### `deactivateEndpoint(input)`

Deactivate a collaborative authorization endpoint.

**Parameters**

- `input.endpointId` (string, **required**) — The Global ID of the `CollaborativeAuthorizationEndpoint` to deactivate.

**Returns** `CollaborativeAuthorizationEndpoint` — fields: `id`, `name`, `status`.

**Throws** `HighnoteUserError`, `HighnoteAccessDeniedError`, `HighnoteUnexpectedResponseError`.

**Example**

```ts
await client.collaborativeAuth.deactivateEndpoint({ endpointId: "cae_..." });
```

#### `list(options)`

Async-iterate every registered collaborative-authorization endpoint on the
caller's organization.

Pages are fetched lazily — break out of the loop to stop fetching.

**Parameters**

- `options.pageSize` (number, optional) — Number of items per page. Defaults to the client's `defaultPageSize`.

**Returns** `AsyncIterable<object>`.

**Throws** `HighnoteUserError`, `HighnoteAccessDeniedError`, `HighnoteUnexpectedResponseError`.

**Example**

```ts
for await (const ep of client.collaborativeAuth.list()) {
  console.log(ep.name, ep.status);
}
```

#### `removeEndpoint(input)`

Remove a collaborative authorization endpoint permanently.

**Parameters**

- `input.endpointId` (string, **required**) — The Global ID of the `CollaborativeAuthorizationEndpoint` to remove.

**Returns** `CollaborativeAuthorizationEndpoint` — fields: `createdAt`, `id`, `name`, `status`, `updatedAt`, `uri`.

**Throws** `HighnoteUserError`, `HighnoteAccessDeniedError`, `HighnoteUnexpectedResponseError`.

**Example**

```ts
await client.collaborativeAuth.removeEndpoint({ endpointId: "cae_..." });
```

#### `renameEndpoint(input)`

Rename a collaborative authorization endpoint.

**Parameters**

- `input.endpointId` (string, **required**) — The Global ID of the `CollaborativeAuthorizationEndpoint` to rename.
- `input.name` (string, **required**) — The new, human-friendly name for your `CollaborativeAuthorizationEndpoint`.

  This value can contain any characters but cannot exceed a length of 255.

**Returns** `CollaborativeAuthorizationEndpoint` — fields: `createdAt`, `id`, `name`, `status`, `updatedAt`, `uri`.

**Throws** `HighnoteUserError`, `HighnoteAccessDeniedError`, `HighnoteUnexpectedResponseError`.

**Example**

```ts
await client.collaborativeAuth.renameEndpoint({
  endpointId: "cae_...",
  name: "Production AP automation endpoint",
});
```

### client.digitalWallets

#### `addToApplePay(input)`

Add a payment card to Apple Pay via device push provisioning.

**Parameters**

- `input.certificates` (string[], **required**) — A Base64-encoded list of certificates.
- `input.deviceType` (PaymentCardDigitalWalletDeviceType, **required**) — Specifies the type of device which is initiating the provisioning.
- `input.nonce` (string, **required**) — A HEX-encoded, one-time use nonce generated by Apple’s servers.
- `input.nonceSignature` (string, **required**) — A HEX-encoded device and account specific signature of the nonce.
- `input.paymentCardId` (string, **required**) — The ID of the payment card to be push provisioned.

**Returns** `PaymentCardDigitalWalletTokenApplePayDevicePushProvisioning` — fields: `activationData`, `encryptedPassData`, `ephemeralPublicKey`.

**Throws** `HighnoteUserError`, `HighnoteAccessDeniedError`, `HighnoteUnexpectedResponseError`.

**Example**

```ts
import { PaymentCardDigitalWalletDeviceType } from "@highnote-oss/nodejs-sdk";

const result = await client.digitalWallets.addToApplePay({
  paymentCardId: "pc_...",
  certificates: ["base64cert1", "base64cert2"],
  nonce: "base64nonce",
  nonceSignature: "base64sig",
  deviceType: PaymentCardDigitalWalletDeviceType.MOBILE,
});
```

#### `addToGooglePay(input)`

Add a payment card to Google Pay via device push provisioning.

**Parameters**

- `input.deviceType` (PaymentCardDigitalWalletDeviceType, **required**) — Specifies the type of device which is initiating the provisioning.
- `input.displayName` (string, optional) — Display Name describes the Payment Card in the user interface. Highnote can return this value in the response which the Subscriber’s mobile app can override before calling pushTokenize on the wallet app. If not provided, Highnote will leverage the name of the product.
- `input.paymentCardId` (string, **required**) — The ID of the payment card to be push provisioned.
- `input.walletDetails` (WalletDetailsInput, optional) — Token provisioning wallet details.

**Returns** `PaymentCardDigitalWalletTokenGooglePayPushProvisioning` — fields: `opaquePaymentCard`.

**Throws** `HighnoteUserError`, `HighnoteAccessDeniedError`, `HighnoteUnexpectedResponseError`.

**Example**

```ts
import { PaymentCardDigitalWalletDeviceType } from "@highnote-oss/nodejs-sdk";

const result = await client.digitalWallets.addToGooglePay({
  paymentCardId: "pc_...",
  deviceType: PaymentCardDigitalWalletDeviceType.MOBILE,
});
```

### client.disputes

#### `get(id)`

Retrieve a dispute by ID, including chargebacks and provisional credit history.

**Parameters**

- `id` (string, **required**)

**Returns** `PaymentCardTransactionDispute` — fields: `amount`, `category`, `chargebacks`, `createdAt`, `customerClaimType`, `id`, `liability`, `provisionalCreditHistory`, `status`, `subscriberNote`, `updatedAt`.

**Throws** `HighnoteUserError`, `HighnoteAccessDeniedError`, `HighnoteUnexpectedResponseError`.

**Example**

```ts
const dispute = await client.disputes.get("dis_...");
console.log(dispute.status, dispute.chargebacks);
```

#### `initiate(input)`

Initiate a customer card transaction dispute.

**Parameters**

- `input.amount.currencyCode` (Iso4217Alpha3SupportedCurrency, **required**) — Three-character [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217) currency code

  **Examples:** `"USD", "EUR", "GBP"`
- `input.amount.value` (number, **required**) — Value of the amount as an integer. The number of decimal places [varies by currency](https://en.wikipedia.org/wiki/ISO_4217#Active_codes) so the value should be an integer accounting for the minor units.

  For example, a US dollar value of $10.99 should be provided as `1099`. A US dollar value of $10 should be provided as `1000`.

  Currencies with zero decimal places (such as `JPY`) or those with more than 2 (such as `JOD`) should be provided as `1099` and `10990` respectively.

  | Currency | Value
  | --- | --- |
  | USD | 1099 |
  | JPY | 1099 |
  | JOD | 10990 |
- `input.cardTransactionEventId` (string, **required**) — The ID of the transaction event (AuthorizationAndClearEvent or ClearingEvent).
- `input.category` (PaymentCardDisputeCategoryType, **required**) — The category type of the dispute.
- `input.customerClaimType` (PaymentCardDisputeCustomerClaimType, **required**) — The customer claim type for the card transaction dispute.
- `input.customerContact.email` (string, **required**) — The email of the customer.
- `input.customerContact.familyName` (string, **required**) — The family name of the customer.
- `input.customerContact.givenName` (string, **required**) — The given name of the customer.
- `input.customerContact.phone` (PhoneInput, optional) — The phone number of the customer.
- `input.customerInitiatedOn` (string, **required**) — The customer initiated date, in YYYY-MM-DD format, for the card transaction dispute.
- `input.subscriberNote` (string, optional) — The subscriber note for the card transaction dispute. Maximum length is 2048.

**Returns** `PaymentCardTransactionDispute` — fields: `amount`, `category`, `createdAt`, `customerClaimType`, `id`, `liability`, `provisionalCreditHistory`, `status`, `updatedAt`.

**Throws** `HighnoteUserError`, `HighnoteAccessDeniedError`, `HighnoteUnexpectedResponseError`.

**Example**

```ts
import {
  PaymentCardDisputeCategoryType,
  PaymentCardDisputeCustomerClaimType,
} from "@highnote-oss/nodejs-sdk";

const dispute = await client.disputes.initiate({
  cardTransactionEventId: "te_...",
  amount: { value: "50.00", currencyCode: "USD" },
  category: PaymentCardDisputeCategoryType.FRAUD,
  customerClaimType: PaymentCardDisputeCustomerClaimType.VERBAL,
  customerContact: {
    givenName: "Jane",
    familyName: "Doe",
    email: "jane@example.com",
  },
  customerInitiatedOn: "2026-03-18",
});
```

### client.documents

#### `createUploadLink(input)`

Create a document upload link within a session.

**Parameters**

- `input.documentType` (DocumentType, **required**) — The document type to be uploaded
- `input.documentUploadSessionId` (string, **required**) — The ID of the document upload session

**Returns** `DocumentUploadLink` — fields: `createdAt`, `documentType`, `id`, `status`, `updatedAt`.

**Throws** `HighnoteUserError`, `HighnoteAccessDeniedError`, `HighnoteUnexpectedResponseError`.

**Example**

```ts
import { DocumentType } from "@highnote-oss/nodejs-sdk";

const link = await client.documents.createUploadLink({
  documentUploadSessionId: "dus_...",
  documentType: DocumentType.DRIVERS_LICENSE,
});
```

#### `endSession(input)`

End a document upload session.

**Parameters**

- `input.documentUploadSessionId` (string, **required**) — The ID of the document upload session

**Returns** `DocumentUploadSession`.

**Throws** `HighnoteUserError`, `HighnoteAccessDeniedError`, `HighnoteUnexpectedResponseError`.

**Example**

```ts
await client.documents.endSession({
  documentUploadSessionId: "dus_...",
});
```

#### `startSession(input)`

Start a document upload session.

**Parameters**

- `input.documentUploadSessionId` (string, **required**) — The ID of the document upload session

**Returns** `DocumentUploadSession`.

**Throws** `HighnoteUserError`, `HighnoteAccessDeniedError`, `HighnoteUnexpectedResponseError`.

**Example**

```ts
const session = await client.documents.startSession({
  documentUploadSessionId: "dus_...",
});
```

### client.externalAccounts

#### `addNonVerified(input)`

Add a non-verified external US financial bank account.

**Parameters**

- `input.accountHolderId` (string, **required**) — The identifier of an Account holder
- `input.accountNumber` (string, **required**) — The account number of the bank account
- `input.bankAccountType` (BankAccountType, **required**) — The type of bank account (Checking or Savings)
- `input.name` (string, optional) — An optional nick name for the bank account
- `input.routingNumber` (string, **required**) — The routing number of the bank account

**Returns** `NonVerifiedExternalUSFinancialBankAccount` — fields: `createdAt`, `externalBankAccountDetails`, `id`, `name`, `updatedAt`.

**Throws** `HighnoteUserError`, `HighnoteAccessDeniedError`, `HighnoteUnexpectedResponseError`.

**Example**

```ts
const account = await client.externalAccounts.addNonVerified({
  accountHolderId: "ah_...",
  routingNumber: "091000019",
  accountNumber: "123456789",
  bankAccountType: BankAccountType.CHECKING,
  name: "Manual Checking",
});
```

#### `addVerifiedThroughFinicity(input)`

Add an external bank account verified through Finicity.

**Parameters**

- `input.accountHolderId` (string, **required**) — The Global ID of the account holder for whom bank account is added.
- `input.bankAccountType` (BankAccountType, **required**) — The type of bank account (Checking or Savings)
- `input.externalToken.customerId` (string, **required**) — A pseudo customer ID that Highnote will use to retrieve data via Finicity's 3PA integration.
- `input.externalToken.products` (FinicityProduct[], optional) — An array of products/api-endpoints that Highnote can use to retrieve users' financial data.
- `input.externalToken.receiptId` (string, **required**) — Proof of user consent to share financial data with Highnote.
- `input.name` (string, **required**) — The account name from the institution that Finicity's Get Customer Account API must return.

**Returns** `ExternalFinancialBankAccount` — fields: `createdAt`, `externalBankAccountDetails`, `id`, `name`, `updatedAt`.

**Throws** `HighnoteUserError`, `HighnoteAccessDeniedError`, `HighnoteUnexpectedResponseError`.

**Example**

```ts
const account = await client.externalAccounts.addVerifiedThroughFinicity({
  accountHolderId: "ah_...",
  name: "My Checking",
  bankAccountType: BankAccountType.CHECKING,
  externalToken: { customerId: "cust_..." },
});
```

#### `addVerifiedThroughPlaid(input)`

Add an external bank account verified through Plaid.

**Parameters**

- `input.accountHolderId` (string, **required**) — The Global ID of the account holder for whom bank account is added.
- `input.externalToken.value` (string, **required**) — A token provided by a third-party (e.g. Plaid) that Highnote can use to securely fetch an account holder's bank details.

**Returns** `ExternalFinancialBankAccount` — fields: `createdAt`, `externalBankAccountDetails`, `id`, `name`, `updatedAt`.

**Throws** `HighnoteUserError`, `HighnoteAccessDeniedError`, `HighnoteUnexpectedResponseError`.

**Example**

```ts
const account = await client.externalAccounts.addVerifiedThroughPlaid({
  accountHolderId: "ah_...",
  externalToken: { value: "plaid_token_..." },
});
```

### client.financialAccounts

#### `get(id)`

Retrieve a financial account by ID.

**Parameters**

- `id` (string, **required**)

**Returns** `FinancialAccount` — fields: `accountStatus`, `createdAt`, `externalId`, `id`, `incomingScheduledTransfers`, `ledgers`, `name`, `paymentCards`.

**Throws** `HighnoteUserError`, `HighnoteAccessDeniedError`, `HighnoteUnexpectedResponseError`.

**Example**

```ts
const account = await client.financialAccounts.get("fa_...");
```

#### `issue(input)`

Issue a financial account for an approved application.

**Parameters**

- `input.applicationId` (string, **required**) — The ID of the application to issue this Financial Account against.

  **Note:** The Application must be APPROVED.
- `input.customFields` (CustomFieldInput[], optional) — The `CustomFields` for the Financial Account.
- `input.externalId` (string, optional) — Externally provided ID (255 character limit) that is unique per organization and tenant. If not provided, Highnote will generate an ID (ten digit, Base58, all caps).
- `input.idempotencyKey` (string, optional) — The idempotency key for this request.

  This is a UUIDv4 string used to uniquely identify requests.

  If a request with the same `IdempotencyKey` is received multiple times, only the first request will be processed. Subsequent requests will return the same response as the first request.

  [See this link for more](https://en.wikipedia.org/wiki/Universally_unique_identifier#Version_4_(random))
- `input.name` (string, **required**) — The name of the Financial Account.

**Returns** `FinancialAccount` — fields: `accountStatus`, `createdAt`, `externalId`, `id`, `name`.

**Throws** `HighnoteUserError`, `HighnoteAccessDeniedError`, `HighnoteUnexpectedResponseError`.

**Example**

```ts
const account = await client.financialAccounts.issue({
  applicationId: "app_...",
  name: "Main Account",
});
```

#### `listActivities(financialAccountId, options)`

List activities for a financial account with auto-pagination.
Activities include card transactions, deposits, transfers, and fees.

**Parameters**

- `financialAccountId` (string, **required**)
- `options.pageSize` (number, optional)

**Returns** `AsyncIterable<object>`.

**Throws** `HighnoteUserError`, `HighnoteAccessDeniedError`, `HighnoteUnexpectedResponseError`.

**Example**

```ts
for await (const activity of client.financialAccounts.listActivities("fa_...")) {
  console.log(activity.sign, activity.pendingAmount, activity.postedAmount);
}
```

#### `listReviewWorkflowEvents(financialAccountId, options)`

List review workflow events (wire transfers) for a financial account.

**Parameters**

- `financialAccountId` (string, **required**)
- `options.pageSize` (number, optional)

**Returns** `AsyncIterable<object>`.

**Throws** `HighnoteUserError`, `HighnoteAccessDeniedError`, `HighnoteUnexpectedResponseError`.

**Example**

```ts
for await (const event of client.financialAccounts.listReviewWorkflowEvents("fa_...")) {
  console.log(event.reviewState, event.transfer?.amount, event.transfer?.type);
}
```

#### `suspend(input)`

Suspend a financial account.

**Parameters**

- `input.id` (string, **required**) — The `FinancialAccount` ID to be suspended.
- `input.memo` (string, **required**) — The memo for suspending the `FinancialAccount`.

  Regex: ^[a-zA-Z\d$ ',.\-\_!@#$%^&*+=`?"\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF\n]+$
  Memo has a max length of 2048 characters.
  For compliance and security reasons, memo should not contain any sensitive information, such as PII or PCI.
- `input.suspensionReason` (FinancialAccountSuspensionReasonInput, **required**) — The reason for suspending the `FinancialAccount`.

**Returns** `FinancialAccount` — fields: `accountStatus`, `createdAt`, `externalId`, `id`, `name`.

**Throws** `HighnoteUserError`, `HighnoteAccessDeniedError`, `HighnoteUnexpectedResponseError`.

**Example**

```ts
import { FinancialAccountSuspensionReasonInput } from "@highnote-oss/nodejs-sdk";

await client.financialAccounts.suspend({
  id: "fa_...",
  memo: "Suspected fraud",
  suspensionReason: FinancialAccountSuspensionReasonInput.SUSPECTED_FRAUD,
});
```

#### `unsuspend(input)`

Unsuspend a financial account.

**Parameters**

- `input.id` (string, **required**) — The `FinancialAccount` ID to be unsuspended.
- `input.memo` (string, **required**) — The memo for unsuspending the `FinancialAccount`.

  Regex: ^[a-zA-Z\d$ ',.\-\_!@#$%^&*+=`?"\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF\n]+$
  Memo has a max length of 2048 characters.
  For compliance and security reasons, memo should not contain any sensitive information, such as PII or PCI.

**Returns** `FinancialAccount` — fields: `accountStatus`, `createdAt`, `externalId`, `id`, `name`.

**Throws** `HighnoteUserError`, `HighnoteAccessDeniedError`, `HighnoteUnexpectedResponseError`.

**Example**

```ts
await client.financialAccounts.unsuspend({
  id: "fa_...",
  memo: "Issue resolved",
});
```

### client.provisioning

#### `create(input)`

Provision an account holder — orchestrates application creation,
approval, and financial account issuance in a single call.

**Parameters**

- `input.accountHolderId` (string, **required**) — The unique identifier of the account holder being provisioned. This field should be a valid ID representing the account holder.
- `input.actionInput.createAccountHolderCardProductApplicationInput` (ProvisionCreateAccountHolderCardProductApplicationInput, optional) — Input details required to create an account holder application.

  This field provides the necessary parameters for processing an application for the account holder.
- `input.actionInput.initiateFinancialAccountCreditLimitUpdateFromProductFundingInput` (ProvisionInitiateFinancialAccountCreditLimitUpdateFromProductFundingInput, optional) — Input details for setting or updating the credit limit of a financial account.

  This field contains the parameters needed to define or modify the credit limit for the account holder’s financial account.
- `input.actionInput.issueFinancialAccountForApplicationInput` (ProvisionIssueFinancialAccountForApplicationInput, optional) — Input details required to issue a financial account for the account holder.

  This field includes the necessary parameters to establish and configure a new financial account.
- `input.actionInput.issuePaymentCardForFinancialAccountInput` (ProvisionIssuePaymentCardForFinancialAccountInput, optional) — Input details required to issue a payment card associated with the account holder’s financial account.

  This field provides the necessary parameters for issuing a payment card.
- `input.actionInput.linkVerifiedExternalBankAccountInput` (LinkVerifiedExternalBankInput, optional) — Input details for linking an account holder with verified external bank account.
- `input.actions` (ProvisionAccountHolderAction[], **required**) — A list of actions to be performed during the provisioning process. Each action represents a specific operation or step to be executed.
- `input.idempotencyKey` (string, **required**) — A UUIDv4 string used to uniquely identify requests.

  If a request with the same `IdempotencyKey` is received multiple times, only the first request will be processed. Subsequent requests will return the same response as the first request.

  [See this link for more](https://en.wikipedia.org/wiki/Universally_unique_identifier#Version_4_(random))

**Returns** `AccountHolderProvisioning` — fields: `accountHolder`, `id`, `outcome`, `workflowActions`.

**Throws** `HighnoteUserError`, `HighnoteAccessDeniedError`, `HighnoteUnexpectedResponseError`.

**Example**

```ts
const provisioning = await client.provisioning.create({
  accountHolderId: "ah_...",
  idempotencyKey: "uuid-v4",
  actions: [
    ProvisionAccountHolderAction.CREATE_APPLICATION,
    ProvisionAccountHolderAction.ISSUE_FINANCIAL_ACCOUNT,
  ],
  actionInput: {
    createAccountHolderCardProductApplicationInput: {
      cardProductId: "cp_...",
      cardHolderAgreementConsent: {
        consentTimestamp: new Date().toISOString(),
        primaryAuthorizedPersonId: "ah_...",
      },
    },
    issueFinancialAccountForApplicationInput: {
      name: "My Account",
    },
  },
});
```

### client.spendRules

#### `attachToCard(input)`

Attach a spend rule to a payment card.

**Parameters**

- `input.paymentCardId` (string, **required**) — The Global ID of the Payment Card to attach the spend rule.
- `input.spendRule.id` (string, **required**) — The Global ID of the Spend Rule to attach.
- `input.spendRule.version` (string, **required**) — The version of the spend rule to attach.

  To always use the latest version, set `version` to `LATEST`.

**Returns** `PaymentCard` — fields: `id`, `status`.

**Throws** `HighnoteUserError`, `HighnoteAccessDeniedError`, `HighnoteUnexpectedResponseError`.

**Example**

```ts
await client.spendRules.attachToCard({
  paymentCardId: "pc_...",
  spendRule: { id: "sr_...", version: "LATEST" },
});
```

#### `createAmountLimit(input)`

Create an amount limit spend rule.

**Parameters**

- `input.maximumAmount.currencyCode` (Iso4217Alpha3SupportedCurrency, **required**) — Three-character [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217) currency code

  **Examples:** `"USD", "EUR", "GBP"`
- `input.maximumAmount.value` (number, **required**) — Value of the amount as an integer. The number of decimal places [varies by currency](https://en.wikipedia.org/wiki/ISO_4217#Active_codes) so the value should be an integer accounting for the minor units.

  For example, a US dollar value of $10.99 should be provided as `1099`. A US dollar value of $10 should be provided as `1000`.

  Currencies with zero decimal places (such as `JPY`) or those with more than 2 (such as `JOD`) should be provided as `1099` and `10990` respectively.

  | Currency | Value
  | --- | --- |
  | USD | 1099 |
  | JPY | 1099 |
  | JOD | 10990 |
- `input.name` (string, **required**) — A name for the rule for future reference.
- `input.userType` (ApplicableRuleUserType, optional) — The `ApplicableRuleUserType` for which the rule will be evaluated.

**Returns** `AmountLimitSpendRule` — fields: `createdAt`, `id`, `name`, `updatedAt`, `version`.

**Throws** `HighnoteUserError`, `HighnoteAccessDeniedError`, `HighnoteUnexpectedResponseError`.

**Example**

```ts
const rule = await client.spendRules.createAmountLimit({
  name: "Max $500",
  maximumAmount: { value: "500.00", currencyCode: "USD" },
});
```

#### `createMerchantCategory(input)`

Create a merchant category spend rule (allow/block by MCC).

**Parameters**

- `input.allowed` (MerchantCategory[], optional) — The merchant categories that will be allowed during authorizations.

  Min: 1
  Max: 5000
- `input.allowedMcc` (string[], optional) — The merchant category codes that will be allowed during authorizations.

  Min: 1
  Max: 5000
- `input.blocked` (MerchantCategory[], optional) — The merchant categories that will result in declined authorizations.

  Min: 1
  Max: 5000
- `input.blockedMcc` (string[], optional) — The merchant category codes that will result in declined authorizations.

  Min: 1
  Max: 5000
- `input.name` (string, **required**) — A name for the rule for future reference.
- `input.userType` (ApplicableRuleUserType, optional) — The `ApplicableRuleUserType` for which the rule will be evaluated.

**Returns** `MerchantCategorySpendRule` — fields: `createdAt`, `id`, `name`, `updatedAt`, `version`.

**Throws** `HighnoteUserError`, `HighnoteAccessDeniedError`, `HighnoteUnexpectedResponseError`.

**Example**

```ts
const rule = await client.spendRules.createMerchantCategory({
  name: "Block ATM",
  blocked: ["6011"],
});
```

#### `detachFromCard(input)`

Detach a spend rule from a payment card.

**Parameters**

- `input.paymentCardId` (string, **required**) — The Global ID of the Payment Card to detach the spend rule.
- `input.spendRule.id` (string, **required**) — The Global ID of the Spend Rule to detach.

**Returns** `PaymentCard` — fields: `id`, `status`.

**Throws** `HighnoteUserError`, `HighnoteAccessDeniedError`, `HighnoteUnexpectedResponseError`.

**Example**

```ts
await client.spendRules.detachFromCard({
  paymentCardId: "pc_...",
  spendRule: { id: "sr_..." },
});
```

### client.transactions

#### `list(options)`

List payment transactions with auto-pagination.

**Parameters**

- `options.filterBy` (PaymentTransactionFilterInput, optional)
- `options.pageSize` (number, optional)

**Returns** `AsyncIterable<PaymentTransaction>`.

**Throws** `HighnoteUserError`, `HighnoteAccessDeniedError`, `HighnoteUnexpectedResponseError`.

**Example**

```ts
for await (const txn of client.transactions.list()) {
  console.log(txn.authorizedAmount);
}
```

### client.transfers

#### `initiateBetweenAccounts(input)`

Initiate a transfer between two financial accounts.

**Parameters**

- `input.amount.currencyCode` (Iso4217Alpha3SupportedCurrency, **required**) — Three-character [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217) currency code

  **Examples:** `"USD", "EUR", "GBP"`
- `input.amount.value` (number, **required**) — Value of the amount as an integer. The number of decimal places [varies by currency](https://en.wikipedia.org/wiki/ISO_4217#Active_codes) so the value should be an integer accounting for the minor units.

  For example, a US dollar value of $10.99 should be provided as `1099`. A US dollar value of $10 should be provided as `1000`.

  Currencies with zero decimal places (such as `JPY`) or those with more than 2 (such as `JOD`) should be provided as `1099` and `10990` respectively.

  | Currency | Value
  | --- | --- |
  | USD | 1099 |
  | JPY | 1099 |
  | JOD | 10990 |
- `input.externalIdentifier` (string, optional) — Externally provided identifier that can be used to reference the transfer. If not provided, this field will be blank.

  The identifier can be any valid ASCII character and cannot exceed 255 characters.
- `input.fromFinancialAccountId` (string, **required**) — The ID of the source financial account.
- `input.idempotencyKey` (string, optional) — The idempotency key for this request.

  This is a UUIDv4 string used to uniquely identify requests.

  If a request with the same `IdempotencyKey` is received multiple times, only the first request will be processed. Subsequent requests will return the same response as the first request.

  [See this link for more](https://en.wikipedia.org/wiki/Universally_unique_identifier#Version_4_(random))
- `input.memo` (string, optional) — A description of the transfer for later reference. Maximum length is 1024, and valid characters
  are all UTF-8 and ASCII characters.
- `input.purpose` (TransferPurpose, **required**) — The purpose for the transfer.
- `input.toFinancialAccountId` (string, **required**) — The ID of the target financial account.

**Returns** `InterFinancialAccountTransfer` — fields: `amount`, `createdAt`, `id`, `memo`, `purpose`, `status`, `statusReason`, `updatedAt`.

**Throws** `HighnoteUserError`, `HighnoteAccessDeniedError`, `HighnoteUnexpectedResponseError`.

**Example**

```ts
import { TransferPurpose } from "@highnote-oss/nodejs-sdk";

const transfer = await client.transfers.initiateBetweenAccounts({
  fromFinancialAccountId: "fa_source",
  toFinancialAccountId: "fa_target",
  amount: { value: "100.00", currencyCode: "USD" },
  purpose: TransferPurpose.GENERAL,
});
```

### client.webhooks

#### `activate(input)`

Activate a notification target.

**Parameters**

- `input.targetId` (string, **required**)

**Returns** `WebhookNotificationTarget` — fields: `id`, `name`, `status`.

**Throws** `HighnoteUserError`, `HighnoteAccessDeniedError`, `HighnoteUnexpectedResponseError`.

**Example**

```ts
await client.webhooks.activate({ targetId: "nt_..." });
```

#### `add(input)`

Add a webhook notification target.

**Parameters**

- `input.email` (string, optional) — The email address to which target deactivation emails are sent.
  This data is only stored in the live environment. Deactivation emails are not sent in the test environment.
- `input.name` (string, **required**) — A name for the target.

  Must be between 1 and 255 characters.
- `input.subscriptions` (NotificationEventName[], **required**) — The event names to receive notifications about.
- `input.uri` (string, **required**) — A valid URI to send notifications. The protocol _must be included_ and is required to be `https`.

  Example: `https://mywebhook.com`

**Returns** `WebhookNotificationTarget` — fields: `createdAt`, `id`, `name`, `signingKeys`, `status`, `updatedAt`, `uri`.

**Throws** `HighnoteUserError`, `HighnoteAccessDeniedError`, `HighnoteUnexpectedResponseError`.

**Example**

```ts
import { NotificationEventName } from "@highnote-oss/nodejs-sdk";

const target = await client.webhooks.add({
  name: "My Webhook",
  uri: "https://example.com/webhooks",
  subscriptions: [NotificationEventName.CARD_PAYMENT_AUTHORIZED_EVENT],
});
```

#### `addSubscriptions(input)`

Add event subscriptions to a notification target.

**Parameters**

- `input.subscriptions` (NotificationEventName[], **required**) — The event names to receive notifications about.
- `input.targetId` (string, **required**) — Target Id

**Returns** `WebhookNotificationTarget` — fields: `id`, `name`, `status`.

**Throws** `HighnoteUserError`, `HighnoteAccessDeniedError`, `HighnoteUnexpectedResponseError`.

**Example**

```ts
import { NotificationEventName } from "@highnote-oss/nodejs-sdk";

await client.webhooks.addSubscriptions({
  targetId: "nt_...",
  subscriptions: [NotificationEventName.CARD_PAYMENT_CLEARED_EVENT],
});
```

#### `deactivate(input)`

Deactivate a notification target.

**Parameters**

- `input.targetId` (string, **required**)

**Returns** `WebhookNotificationTarget` — fields: `id`, `name`, `status`.

**Throws** `HighnoteUserError`, `HighnoteAccessDeniedError`, `HighnoteUnexpectedResponseError`.

**Example**

```ts
await client.webhooks.deactivate({ targetId: "nt_..." });
```

#### `get(id)`

Retrieve a single webhook notification target by id.

**Parameters**

- `id` (string, **required**)

**Returns** `WebhookNotificationTarget` — fields: `createdAt`, `deactivatedAt`, `id`, `name`, `status`, `subscriptions`, `updatedAt`, `uri`.

**Throws** `HighnoteUserError`, `HighnoteAccessDeniedError`, `HighnoteUnexpectedResponseError`.

**Example**

```ts
const target = await client.webhooks.get("nt_...");
console.log(target.status); // ACTIVE | PENDING_VERIFICATION | DEACTIVATED
```

#### `list(options)`

Async-iterate every webhook notification target on the caller's organization.

Pages are fetched lazily — break out of the loop to stop fetching.

**Parameters**

- `options.pageSize` (number, optional) — Number of items per page. Defaults to the client's `defaultPageSize`.

**Returns** `AsyncIterable<object>`.

**Throws** `HighnoteUserError`, `HighnoteAccessDeniedError`, `HighnoteUnexpectedResponseError`.

**Example**

```ts
for await (const t of client.webhooks.list()) {
  if (t.name?.startsWith("auto-")) {
    await client.webhooks.remove({ targetId: t.id });
  }
}
```

#### `listEvents(targetId, options)`

Async-iterate the events that should have been delivered to a target.

Useful for reviewing recent delivery attempts (set `unsuccessfulOnly: true`
to focus on failures). Pages are fetched lazily — break out of the loop to
stop fetching.

**Parameters**

- `targetId` (string, **required**)
- `options.eventNames` (NotificationEventName[], optional) — Restrict to events whose original notification name is in this list.
- `options.pageSize` (number, optional) — Number of items per page. Defaults to the client's `defaultPageSize`.
- `options.unsuccessfulOnly` (boolean, optional) — Restrict to events where the latest delivery attempt was unsuccessful or skipped.

**Returns** `AsyncIterable<object>`.

**Throws** `HighnoteUserError`, `HighnoteAccessDeniedError`, `HighnoteUnexpectedResponseError`.

**Example**

```ts
for await (const e of client.webhooks.listEvents("nt_...", { unsuccessfulOnly: true })) {
  console.log(e.event?.id, e.hasSuccessfulDelivery);
}
```

#### `remove(input)`

Permanently remove a webhook notification target.

Distinct from `deactivate`: `deactivate` sets the target's status to
`DEACTIVATED` and the target lingers (auto-deletes after 30 days), whereas
`remove` deletes it immediately and stops all event delivery.

**Parameters**

- `input.targetId` (string, **required**)

**Returns** `WebhookNotificationTarget` — fields: `id`, `name`, `status`.

**Throws** `HighnoteUserError`, `HighnoteAccessDeniedError`, `HighnoteUnexpectedResponseError`.

**Example**

```ts
await client.webhooks.remove({ targetId: "nt_..." });
```

#### `removeEmail(input)`

Remove the deactivation-notice email from a notification target.

Live environment only — calling this against the test environment throws
`HighnoteAccessDeniedError`.

**Parameters**

- `input.targetId` (string, **required**) — The notification target ID.

**Returns** `WebhookNotificationTarget` — fields: `email`, `id`, `name`, `status`.

**Throws** `HighnoteUserError`, `HighnoteAccessDeniedError`, `HighnoteUnexpectedResponseError`.

**Example**

```ts
await client.webhooks.removeEmail({ targetId: "nt_..." });
```

#### `removeSubscriptions(input)`

Remove event subscriptions from a notification target.

**Parameters**

- `input.subscriptions` (NotificationEventName[], **required**) — The event names to no longer receive notifications about.
- `input.targetId` (string, **required**) — Target Id

**Returns** `WebhookNotificationTarget` — fields: `id`, `name`, `status`.

**Throws** `HighnoteUserError`, `HighnoteAccessDeniedError`, `HighnoteUnexpectedResponseError`.

**Example**

```ts
import { NotificationEventName } from "@highnote-oss/nodejs-sdk";

await client.webhooks.removeSubscriptions({
  targetId: "nt_...",
  subscriptions: [NotificationEventName.CARD_PAYMENT_CLEARED_EVENT],
});
```

#### `rename(input)`

Rename a webhook notification target. Pure metadata change — does not
affect delivery, subscriptions, or signing keys.

**Parameters**

- `input.name` (string, **required**) — A name for the target.
  Must be between 1 and 255 characters.
- `input.targetId` (string, **required**) — The notification target ID.

**Returns** `WebhookNotificationTarget` — fields: `id`, `name`, `status`.

**Throws** `HighnoteUserError`, `HighnoteAccessDeniedError`, `HighnoteUnexpectedResponseError`.

**Example**

```ts
await client.webhooks.rename({ targetId: "nt_...", name: "Renamed" });
```

#### `replay(input)`

Replay a previously delivered (or attempted) notification event.

If `targetIds` is omitted, the event is replayed to every active target
subscribed to its event type. Targets that don't subscribe or are inactive
are silently ignored.

**Parameters**

- `input.notificationEventId` (string, **required**) — The id of the event to replay.
- `input.targetIds` (string[], optional) — Optional list of target IDs to replay the event for. If absent or empty,
  the event will be sent to all active targets that subscribe to this event
  type. If a target ID is provided for a target that does not subscribe to this
  event type or is not active, the replay request for that target will be
  ignored.

**Returns** `NotificationEvent` — fields: `id`.

**Throws** `HighnoteUserError`, `HighnoteAccessDeniedError`, `HighnoteUnexpectedResponseError`.

**Example**

```ts
await client.webhooks.replay({
  notificationEventId: "evt_...",
  targetIds: ["nt_..."],
});
```

#### `rotateSigningKey(input)`

Generate a new signing key for a notification target.

**Important:** rotating creates a *new* signing key while the previous key
remains active for a 24-hour overlap window. During that window the target
may have up to 5 active keys; consumers should accept signatures from any
active key. The newly returned `signingKeys[].secret` is the only place
the secret is exposed — store it before the response is discarded.

**Parameters**

- `input.targetId` (string, **required**) — The notification target ID.

**Returns** `WebhookNotificationTarget` — fields: `id`, `name`, `signingKeys`, `status`.

**Throws** `HighnoteUserError`, `HighnoteAccessDeniedError`, `HighnoteUnexpectedResponseError`.

**Example**

```ts
const updated = await client.webhooks.rotateSigningKey({ targetId: "nt_..." });
const newest = updated.signingKeys?.find((k) => k.expiresAt == null);
// ...persist newest.secret somewhere durable...
```

#### `setEmail(input)`

Set the email address that receives target deactivation notices.

Live environment only — calling this against the test environment throws
`HighnoteAccessDeniedError` because deactivation emails are not stored or
sent in test.

**Parameters**

- `input.email` (string, **required**) — The email address to which target deactivation emails are sent.
- `input.targetId` (string, **required**) — The notification target ID.

**Returns** `WebhookNotificationTarget` — fields: `email`, `id`, `name`, `status`.

**Throws** `HighnoteUserError`, `HighnoteAccessDeniedError`, `HighnoteUnexpectedResponseError`.

**Example**

```ts
await client.webhooks.setEmail({ targetId: "nt_...", email: "ops@example.com" });
```

## Errors

### `HighnoteAccessDeniedError`

Thrown when the API returns an AccessDeniedError.

### `HighnoteError`

Base class for all Highnote SDK errors.

### `HighnoteSimulationError`

Thrown when a simulation method is called outside the test environment.

### `HighnoteUnexpectedResponseError`

Thrown when the API returns a __typename we don't recognise as success.

**Properties**

- `typename` (`string`)

### `HighnoteUserError`

Thrown when the API returns a UserError (validation / bad input).

**Properties**

- `fieldErrors` (`FieldError[]`)

## Utilities

### `paginate(fetchPage)`

Returns an async iterable that lazily fetches pages and yields individual
nodes. Supports `break` and early termination.

**Parameters**

- `fetchPage` (PageFetcher<T>, **required**)

**Returns** `AsyncIterable<T>`.

**Example**

```ts
for await (const item of paginate(fetchPage)) {
  console.log(item);
}
```

### `verifyWebhookSignature(input)`

Verify a webhook payload's HMAC-SHA256 signature against the signing secret
issued at webhook registration. Returns `{ valid, event }` — the parsed
event is returned even when invalid so callers can inspect it for logging.

**Parameters**

- `input.payload` (string, **required**) — Raw request body string.
- `input.secret` (string, **required**) — Signing secret from webhook registration.
- `input.signature` (string, **required**) — Value of the `highnote-signature` header (comma-separated if multiple keys).
- `input.toleranceInMs` (number, optional) — Max age of the signature timestamp in ms. Default: 15 minutes (900_000).

**Returns** `VerifyWebhookSignatureResult`.

**Example**

```ts
const { valid, event } = verifyWebhookSignature({
  payload: rawBodyString,
  signature: req.headers["highnote-signature"],
  secret: process.env.WEBHOOK_SIGNING_SECRET!,
});
```

## Enums

### `AccountClosureBlocker`

All the possible states that could prevent a `FinancialAccount` from being
closed.

- `ACCOUNT_BALANCE_PAYABLE`
- `ACCOUNT_BALANCE_RECEIVABLE`
- `ACTIVE_AUTHORIZED_USER_ACCOUNTS`
- `ACTIVE_MLA`
- `ACTIVE_PAYMENT_CARD`
- `ACTIVE_SCRA`
- `NO_EXTERNAL_FINANCIAL_ACCOUNT`
- `OPEN_LINE_OF_CREDIT`
- `PAYROLL_ADVANCE_PAYABLE`
- `PENDING_AUTHORIZATION`
- `PENDING_TRANSFER`
- `PSEUDO_BALANCE`
- `RISK_HOLD`
- `SCHEDULED_TRANSFER`

### `AccountHolderApplicationStatusCode`

High-level account holder application states.

- `APPROVED`
- `CLOSED`
- `DENIED`
- `IN_REVIEW`
- `PENDING`

### `AccountHolderProvisioningStatus`

Represents the different statuses that an account holder provisioning process can be in, from initiation to completion.

Each status reflects a specific stage of the process, including potential error handling and review.

- `COMPLETED`
- `ERROR`
- `IN_PROGRESS`
- `INITIATED`
- `REJECTED`

### `AccountHolderProvisioningWorkflowActionStatus`

Represents the different statuses that an account holder provisioning process can be in, from initiation to completion.

Each status reflects a specific stage of the process, including potential error handling and review.

- `COMPLETED`
- `ERROR`
- `IN_PROGRESS`
- `INITIATED`
- `NOT_EXECUTED`

### `AccountHolderRiskVerificationStatusCode`

High-level account holder risk verification states.

- `DENIED`
- `IN_REVIEW`
- `PASSED`
- `PENDING`

### `AccountHolderVerificationResultCode`

The verification attempt results.

- `ADDRESS_MATCH`
- `ADDRESS_MISMATCH`
- `ADDRESS_WARNING`
- `BUSINESS_NAME_MATCH`
- `BUSINESS_NAME_MISMATCH`
- `BUSINESS_VERIFICATION_SCORE_FAILED`
- `BUSINESS_VERIFICATION_SCORE_PASSED`
- `DENIED_FRAUD`
- `DENIED_KYC`
- `DEVICE_WARNING`
- `DOB_MATCH`
- `DOB_MISKEY`
- `DOB_MISMATCH`
- `EMAIL_WARNING`
- `FEIN_DOCUMENT_REQUIRED`
- `FEIN_MATCH`
- `FEIN_MISMATCH`
- `FOREIGN_DEVICE`
- `FRAUD_REVIEW`
- `FRAUD_RISK`
- `FRAUD_WARNING`
- `HIGH_ABUSE_SCORE`
- `HIGH_THEFT_SCORE`
- `KYC_FRAUD_PASS`
- `KYC_WARNING`
- `LOW_ABUSE_SCORE`
- `LOW_THEFT_SCORE`
- `MEDIUM_ABUSE_SCORE`
- `MEDIUM_THEFT_SCORE`
- `NAME_MATCH`
- `NAME_MISMATCH`
- `OFAC_MATCH`
- `PHONE_MATCH`
- `PHONE_MISMATCH`
- `REPRESENTATIVE_MATCH`
- `REPRESENTATIVE_MISMATCH`
- `SOS_ACTIVE`
- `SOS_INACTIVE`
- `SOS_MATCH`
- `SOS_MISMATCH`
- `SOS_UNKNOWN`
- `SSN_MATCH`
- `SSN_MISKEY`
- `SSN_MISMATCH`
- `SSN_MULTI_IDENTITY`
- `SSN_WARNING`
- `WATCHLIST_HIT`
- `WATCHLIST_WARNING`

### `AccountHolderVerificationStatusCode`

High-level account holder verification states.

- `DENIED`
- `PASSED`
- `PENDING`

### `AccountHolderVerificationStatusReasonCode`

The specific reason for being in an account holder verification state.

- `DENIED`
- `DOCUMENT_UPLOAD_REQUIRED`
- `IDENTITY_UPDATE_REQUESTED`
- `IN_REVIEW`
- `KBA_REQUIRED`
- `PASSED`
- `PENDING`
- `REVIEW_REQUIRED`

### `AccountingDirection`

Represents the direction funds are moving in an accounting context.

- `CREDIT`
- `DEBIT`

### `AccountRelationshipStatus`

The status of an account relationship.

- `ACTIVE`
- `INACTIVE`

### `AccountRelationshipType`

The type of an account relationship.

- `MERCHANT_CASH_ADVANCE`
- `VISA_FLEXIBLE_CREDENTIAL`

### `AchHoldStatus`

The hold status of an ACH.

- `HOLD_REMOVED`
- `NO_HOLDS`
- `ON_HOLD`

### `AchHoldType`

The hold type of an ACH.

- `RISK`
- `UNSPECIFIED`

### `AchTransferPurpose`

The purpose of the `AchTransfer`.

- `DEPOSIT`
- `MERCHANT_DISBURSEMENT`
- `MERCHANT_PAYOUT`
- `MERCHANT_PUSH_PAYMENT_FUNDING`
- `PAYROLL`
- `REPAYMENT`
- `SECURED_DEPOSIT`
- `WITHDRAWAL`

### `AchTransferSign`

The impact of the `AchTransfer` on the Highnote `FinancialAccount`.

- `NEGATIVE`
- `POSITIVE`

### `AchTransferStatus`

Status of an integrator initiated ACH transfer that has been generated by Highnote.

- `CANCELED`
- `FAILED`
- `INITIATED`
- `PROCESSED`
- `PROCESSING`
- `RETURNED`

### `AchTransferStatusFailureReason`

Additional details regarding a `FAILED` or `RETURNED` `AchTransfer`.

- `ACCOUNTS_DO_NOT_BELONG_TO_SAME_PRODUCT`
- `ACH_CAPABLE_BANK_ACCOUNT_FEATURE_NOT_ENABLED`
- `ACH_LOAD_NOT_ALLOWED_BY_PROGRAM`
- `ADDENDA_ERROR`
- `AMOUNT_FIELD_ERROR`
- `AUTHORIZATION_REVOKED_BY_CUSTOMER`
- `BALANCE_CONSTRAIN_FEATURE_NOT_ENABLED`
- `BENEFICIARY_OR_ACCOUNT_HOLDER_DECEASED`
- `BRANCH_SOLD_TO_ANOTHER_DFI`
- `CARD_FUNDING_ACCOUNT_FEATURE_NOT_ENABLED`
- `CHARGE_CARD_FEATURE_NOT_ENABLED`
- `COMMERCIAL_CREDIT_PAY_IN_FULL_CREDIT_CARD_FEATURE_NOT_ENABLED`
- `COMMERCIAL_CREDIT_PAY_IN_FULL_FEATURE_NOT_ENABLED`
- `CORPORATE_BANK_ACCOUNT_FEATURE_NOT_ENABLED`
- `CORRECTED_RETURN`
- `CREDIT_CARD_FEATURE_NOT_ENABLED`
- `CREDIT_ENTRY_REFUSED_BY_THE_RECEIVER`
- `CREDIT_LIMIT_NOT_SET_ON_ACCOUNT`
- `DDA_FEATURE_NOT_ENABLED`
- `DEBIT_CARD_FEATURE_NOT_ENABLED`
- `DIRECT_MERCHANT_SETTLEMENT_FEATURE_NOT_ENABLED`
- `DUPLICATE_ENROLLMENT`
- `DUPLICATE_ENTRY`
- `DUPLICATE_RETURN`
- `ENTRY_NOT_IN_ACCORDANCE_WITH_TERMS_OF_AUTHORIZATION`
- `ENTRY_NOT_PROCESSED_BY_GATEWAY`
- `ERRONEOUS_OR_REVERSING_DEBIT`
- `EXTERNAL_ACCOUNT_CLOSED`
- `EXTERNAL_ACCOUNT_FROZEN`
- `EXTERNAL_ACCOUNT_NOT_FOUND`
- `FIELD_ERRORS`
- `FILE_RECORD_EDIT_CRITERIA`
- `FLEET_FEATURE_NOT_ENABLED`
- `FOREIGN_RECEIVING_DFI_UNABLE_TO_SETTLE`
- `FUNDING_ACCOUNT_FEATURE_NOT_ENABLED`
- `FUNDING_CARD_NOT_SUPPORTED`
- `HIGHNOTE_ACCOUNT_CLOSED`
- `HIGHNOTE_ACCOUNT_FEATURE_NOT_ENABLED`
- `HIGHNOTE_ACCOUNT_FROZEN`
- `HIGHNOTE_ACCOUNT_NOT_FOUND`
- `IAT_ENTRY_CODING_ERRORS`
- `IMPROPER_EFFECTIVE_ENTRY_DATE`
- `IMPROPER_SOURCE_DOCUMENT_OR_SOURCE_DOCUMENT_PRESENTED_FOR_PAYMENT`
- `INCOME_ACCOUNT_FEATURE_NOT_ENABLED`
- `INCORRECTLY_CODED_OUTBOUND_INTERNATIONAL_PAYMENT`
- `INSUFFICIENT_FUNDS_IN_EXTERNAL_ACCOUNT`
- `INSUFFICIENT_FUNDS_IN_HIGHNOTE_ACCOUNT`
- `INTERNAL_ERROR`
- `INVALID_ACH_ROUTING_NUMBER`
- `INVALID_COMPANY_ID_NUMBER`
- `INVALID_DFI_ACCOUNT_NUMBER`
- `INVALID_EXTERNAL_ACCOUNT_NUMBER`
- `INVALID_FOREIGN_RECEIVING_DFI_IDENTIFICATION`
- `INVALID_HIGHNOTE_ACCOUNT_NUMBER`
- `INVALID_INDIVIDUAL_ID_NUMBER`
- `INVALID_INDIVIDUAL_ID_NUMBER_OR_IDENTIFICATION_NUMBER`
- `INVALID_INDIVIDUAL_NAME_OR_COMPANY_NAME`
- `INVALID_REPRESENTATIVE_PAYEE_INDICATOR`
- `INVALID_TRANSACTION_CODE`
- `ITEM_AND_RCK_ENTRY_PRESENTED_FOR_PAYMENT`
- `ITEM_RELATED_TO_RCK_ENTRY_IS_INELIGIBLE_OR_RCK_ENTRY_IS_IMPROPER`
- `JIT_FEATURE_NOT_ENABLED`
- `LIMITED_PARTICIPATION_DFI`
- `MANDATORY_FIELD_ERROR`
- `MISROUTED_DISHONORED_RETURN`
- `MISROUTED_RETURN`
- `NEGATIVE_BALANCE_RESERVE_FEATURE_NOT_ENABLED`
- `NO_ERRORS_FOUND`
- `NON_ACCEPTANCE_OF_R62_DISHONORED_RETURN`
- `NON_PARTICIPANT_IN_IAT_PROGRAM`
- `NON_TRANSACTION_ACCOUNT`
- `NON_VERIFIED_BANK_ACCOUNT_FEATURE_NOT_ENABLED`
- `ORIGINATED_ACH_UNLOAD_NOT_SUPPORTED_ON_PRODUCT`
- `PARTIAL_FUNDING_FEATURE_NOT_ENABLED`
- `PAYMENT_STOPPED`
- `PAYROLL_ADVANCE_FEATURE_NOT_ENABLED`
- `PAYROLL_EMPLOYER_ADVANCE_FEATURE_NOT_ENABLED`
- `PERMISSIBLE_RETURN_ENTRY`
- `PERMISSIBLE_RETURN_ENTRY_NOT_ACCEPTED_OR_RETURN_NOT_REQUESTED_BY_ODFI`
- `POINT_REWARDS_FEATURE_NOT_ENABLED`
- `PREPAID_CARD_FEATURE_NOT_ENABLED`
- `PREPRINTED_CARD_FEATURE_NOT_ENABLED`
- `PRODUCT_FUNDING_FEATURE_NOT_ENABLED`
- `PRODUCT_RESERVE_FEATURE_NOT_ENABLED`
- `PRODUCT_SECURED_DEPOSIT_ACCOUNT_NOT_ENABLED`
- `RDFI_NON_SETTLEMENT`
- `RDFI_NOT_A_PARTICIPANT_IN_CHECK_TRUNCATION_PROGRAM`
- `REPAYMENT_ACCOUNT_FEATURE_NOT_ENABLED`
- `REPAYMENT_ACCOUNT_NOT_PRESENT_ON_PRODUCT`
- `REPRESENTATIVE_PAYEE_DECEASED_OR_UNABLE_TO_CONTINUE_IN_THAT_CAPACITY`
- `RETURN_NOT_A_DUPLICATE`
- `RETURN_OF_ENR_ENTRY_BY_FEDERAL_GOVERNMENT_AGENCY`
- `RETURN_OF_IMPROPER_CREDIT_ENTRY`
- `RETURN_OF_IMPROPER_DEBIT_ENTRY`
- `RETURN_OF_XCK_ENTRY`
- `RETURNED_PER_ODFI_REQUEST`
- `REVOLVING_CARD_FEATURE_NOT_ENABLED`
- `ROUTING_NUMBER_CHECK_DIGIT_ERROR`
- `ROUTING_NUMBER_OR_CHECK_DIGIT_ERROR`
- `SECURE_CARD_FEATURE_NOT_ENABLED`
- `SECURED_CREDIT_CARD_FEATURE_NOT_ENABLED`
- `SECURED_DEPOSIT_ACCOUNT_NOT_ENABLED`
- `SOURCE_DOCUMENT_PRESENTED_FOR_PAYMENT`
- `STATE_LAW_AFFECTING_RCK_ACCEPTANCE`
- `STOP_PAYMENT_ON_ITEM_RELATED_TO_RCK_ENTRY`
- `STOP_PAYMENT_ON_SOURCE_DOCUMENT`
- `TIMELY_ORIGINAL_RETURN`
- `TRACE_NUMBER_ERROR`
- `TRANSACTION_NOT_AUTHORIZED_BY_ACCOUNT_HOLDER`
- `TRANSACTION_REJECTED_BY_PARTNER_BANK`
- `TRANSFER_AMOUNT_BELOW_MIN_PROGRAM_RELOAD_LIMIT`
- `TRANSFER_AMOUNT_EXCEEDING_MAX_PROGRAM_LOAD_LIMIT`
- `TRANSFER_AMOUNT_EXCEEDING_MAX_PROGRAM_RELOAD_LIMIT`
- `TRANSFER_AMOUNT_IS_NEGATIVE`
- `TRANSFER_AMOUNT_IS_NEGATIVE_OR_ZERO`
- `TRANSFER_NOT_SUPPORTED_ON_PRODUCT`
- `UNAUTHORIZED_CONSUMER_DEBIT_USING_CORPORATE_SEC_CODE`
- `UNAUTHORIZED_IMPROPER_INELIGIBLE_OR_INCOMPLETE_TRANSACTION`
- `UNCOLLECTED_FUNDS`
- `UNTIMELY_DISHONORED_RETURN`
- `UNTIMELY_RETURN`
- `VERIFIED_BANK_ACCOUNT_FEATURE_NOT_ENABLED`

### `AchTransferStatusReasonCode`

Additional details regarding a FAILED or RETURNED transfer.

- `ACCOUNT_FROZEN`
- `ACCOUNTS_DO_NOT_BELONG_TO_SAME_PRODUCT`
- `ACH_LOAD_NOT_SUPPORTED`
- `AMOUNT_FIELD_ERROR`
- `AUTHORIZATION_REVOKED_BY_CUSTOMER`
- `CORPORATE_BANK_ACCOUNT_FEATURE_NOT_ENABLED`
- `CURRENCY_MISMATCH_WITH_HIGHNOTE_ACCOUNT`
- `DUPLICATE_ENTRY`
- `ENTRY_NOT_IN_ACCORDANCE_WITH_TERMS_OF_AUTHORIZATION`
- `EXTERNAL_ACCOUNT_CLOSED`
- `EXTERNAL_ACCOUNT_NOT_FOUND`
- `HIGHNOTE_ACCOUNT_CLOSED`
- `HIGHNOTE_ACCOUNT_NOT_FOUND`
- `IMPROPER_EFFECTIVE_ENTRY_DATE`
- `INSUFFICIENT_FUNDS_IN_EXTERNAL_ACCOUNT`
- `INSUFFICIENT_FUNDS_IN_HIGHNOTE_ACCOUNT`
- `INTERNAL_ERROR`
- `INVALID_ACCOUNT_NUMBER`
- `INVALID_COMPANY_ID_NUMBER`
- `INVALID_INDIVIDUAL_ID_NUMBER`
- `NON_TRANSACTION_ACCOUNT`
- `PAYMENT_STOPPED`
- `PAYROLL_ADVANCE_FEATURE_NOT_ENABLED`
- `PAYROLL_EMPLOYER_ADVANCE_FEATURE_NOT_ENABLED`
- `RETURNED_PER_ODFI_REQUEST`
- `SECURE_CARD_FEATURE_NOT_ENABLED`
- `TRANSACTION_NOT_AUTHORIZED_BY_ACCOUNT_HOLDER`
- `TRANSFER_AMOUNT_BELOW_MIN_RELOAD_LIMIT`
- `TRANSFER_AMOUNT_EXCEEDING_MAX_LOAD_LIMIT`
- `TRANSFER_AMOUNT_EXCEEDING_MAX_RELOAD_LIMIT`
- `UNAUTHORIZED_CONSUMER_DEBIT_USING_CORPORATE_SEC_CODE`
- `UNAUTHORIZED_IMPROPER_INELIGIBLE_OR_INCOMPLETE_TRANSACTION`
- `UNCOLLECTED_FUNDS`

### `AchTransferType`

The type of the `AchTransfer`.

- `PULL`
- `PUSH`

### `AcquirerNetwork`

The Card Processing Network that will process a payment

- `AMERICAN_EXPRESS`
- `DISCOVER`
- `HIGHNOTE`
- `INTERLINK`
- `MAESTRO`
- `MASTERCARD`
- `MNGS_DISCOVER`
- `MNGS_PULSE`
- `PAYROC_AMERICAN_EXPRESS`
- `PULSE`
- `VISA`

### `AcquiringMerchantType`

The classification of a `Merchant`.

- `CONNECTED_SUB`
- `DIRECT`
- `MANAGED_SUB`

### `AcquiringPaymentCardBrand`

The brand which the payment card belongs to.

- `AMERICAN_EXPRESS`
- `DINERS_CLUB`
- `DISCOVER`
- `JCB`
- `MAESTRO`
- `MASTERCARD`
- `UNIONPAY`
- `UNKNOWN`
- `VISA`

### `AcquiringPaymentInitiator`

Enum representing the different ways that a payment has been initiated.

- `CUSTOMER_INITIATED_INSTALLMENT_FIRST`
- `CUSTOMER_INITIATED_RECURRING_FIRST`
- `CUSTOMER_INITIATED_VIA_MAIL_ORDER_OR_TELEPHONE_ORDER`
- `CUSTOMER_INITIATED_VIA_WEB`
- `MERCHANT_INITIATED_INSTALLMENT`
- `MERCHANT_INITIATED_RECURRING`
- `MERCHANT_INITIATED_TRANSACTION_RECURRING`
- `MERCHANT_INITIATED_TRANSACTION_UNSCHEDULED`
- `MERCHANT_INITIATED_UNSCHEDULED`

### `AcquiringProviderType`

Acquiring provider

- `CRB`
- `HIGHNOTE`
- `PAYROC`

### `AddressComponent`

Possible address components.

- `COUNTRY_CODE_ALPHA_3`
- `EXTENDED_ADDRESS`
- `LOCALITY`
- `POSTAL_CODE`
- `REGION`
- `STREET_ADDRESS`

### `AddressDeliveryStatus`

The delivery status of a validated address, as determined by USPS Delivery Point Validation (DPV).

- `CONFIRMED`
- `NOT_AVAILABLE`
- `PARTIAL`
- `UNCONFIRMED`

### `AddressTokenScope`

The intended scope of a validated address token.

- `MULTI_USE`
- `SINGLE_USE`

### `AdverseActionCode`

Reasons behind adverse actions for credit underwriting.

- `BANKRUPTCY`
- `COLLECTIONS`
- `DECEASED`
- `DELINQUENT_CREDIT_OBLIGATIONS`
- `EXCESSIVE_DEBT_OBLIGATIONS`
- `EXCESSIVE_OBLIGATIONS_TO_INCOME`
- `HIGH_UTILIZATION`
- `INCOMPLETE_IDENTITY_INFORMATION`
- `INSUFFICIENT_CASH_BALANCES`
- `INSUFFICIENT_INCOME`
- `INSUFFICIENT_REVENUE`
- `LENGTH_OF_EMPLOYMENT`
- `LENGTH_OF_RESIDENCE`
- `LIEN_POSITION`
- `LIMITED_CREDIT_EXPERIENCE`
- `MIN_CREDIT_SCORE`
- `MIN_YEARS_INCORPORATION`
- `RECENT_CREDIT_ACCOUNTS`
- `RECENT_CREDIT_APPLICATIONS`
- `UNABLE_TO_VERIFY_CREDIT_REFERENCES`
- `UNABLE_TO_VERIFY_EMPLOYMENT`
- `UNABLE_TO_VERIFY_IDENTITY`
- `UNABLE_TO_VERIFY_INCOME`
- `UNACCEPTED_BUSINESS_INDUSTRY`
- `WITHDRAWN`

### `AdverseActionCodeInput`

Inputs values for possible reasons for behind adverse actions for credit underwriting.

- `BANKRUPTCY`
- `COLLECTIONS`
- `DELINQUENT_CREDIT_OBLIGATIONS`
- `EXCESSIVE_DEBT_OBLIGATIONS`
- `EXCESSIVE_OBLIGATIONS_TO_INCOME`
- `HIGH_UTILIZATION`
- `INCOMPLETE_IDENTITY_INFORMATION`
- `INSUFFICIENT_CASH_BALANCES`
- `INSUFFICIENT_INCOME`
- `INSUFFICIENT_REVENUE`
- `LENGTH_OF_EMPLOYMENT`
- `LENGTH_OF_RESIDENCE`
- `LIEN_POSITION`
- `LIMITED_CREDIT_EXPERIENCE`
- `MIN_CREDIT_SCORE`
- `MIN_YEARS_INCORPORATION`
- `RECENT_CREDIT_ACCOUNTS`
- `RECENT_CREDIT_APPLICATIONS`
- `UNABLE_TO_VERIFY_CREDIT_REFERENCES`
- `UNABLE_TO_VERIFY_EMPLOYMENT`
- `UNABLE_TO_VERIFY_IDENTITY`
- `UNABLE_TO_VERIFY_INCOME`
- `UNACCEPTED_BUSINESS_INDUSTRY`
- `WITHDRAWN`

### `AdvertisingMethod`

Methods for advertising a business.

- `CATALOG_PUBLICATIONS`
- `INTERNET`
- `MASS_DIRECT_MAIL`
- `TELEMARKETING`
- `WORD_OF_MOUTH`
- `YELLOW_PAGES`

### `ApplicableRuleUserType`

The applicable rule user type for which a rule will be evaluated.

- `AUTHORIZED_USER`

### `ApplicationDenialReason`

Application denial reasons.

- `DENIED_DUE_TO_APPLICATION_INACTIVITY`
- `DENIED_DUE_TO_OTHER`

### `ApplicationDocumentReviewReason`

"Possible reasons for an `AccountHolderApplicationDocument`'s `ApplicationDocumentUploadStatus`"

- `BLANK_DOCUMENT`
- `DUPLICATE_DOCUMENT`
- `EXPIRED_DOCUMENT`
- `ILLEGIBLE_DOCUMENT`
- `INCORRECT_DOCUMENT`
- `PARTIAL_DOCUMENT`
- `UNACCEPTABLE_DOCUMENT`

### `ApplicationDocumentUploadSessionStatus`

A status for an applicant's document upload session

- `CREATED`
- `EXPIRED`
- `SUBMITTED`

### `ApplicationDocumentUploadStatus`

A status for a document uploaded by the applicant

- `APPROVED`
- `DENIED`
- `IN_REVIEW`
- `UPLOADED`

### `AtmLocationBrand`

Brands of different ATM providers.

- `MONEY_PASS`

### `AtmLocationFeature`

Features available at an ATM Location.

- `ACCESSIBLE`
- `DEPOSIT_AVAILABLE`
- `OPEN_24_HOURS`

### `AttachedLevel`

The Attached Level.

- `ACCOUNT`
- `CARD`
- `PLATFORM`
- `PRODUCT`
- `UNSPECIFIED`

### `AuthorizedAccountHolderRelationshipStatus`

The status of an authorized account holder relationship.

- `ACTIVE`
- `INACTIVE`

### `AuthorizedUserApplicationStatusCode`

High-level authorized user application states.

- `APPROVED`
- `CLOSED`
- `DENIED`
- `IN_REVIEW`
- `PENDING`

### `AvsResponseCode`

Code representing the result of AVS address verification

- `MATCH`
- `NO_MATCH`
- `NOT_PERFORMED`
- `NOT_PROVIDED`

### `BalanceNotificationEventType`

The event type for a balance notification.

- `EFT`

### `BalanceNotificationStepType`

The step type for a balance notification.

- `COMPLETE`
- `PENDING`

### `BalanceNotificationSubeventType`

The sub-event type for a balance notification.

- `ACH_CREDIT`
- `CRYPTO_PAYOUT`
- `NON_ORIGINATING_ACH_LOAD`
- `ORIGINATING_ACH_LOAD`
- `RTP_INBOUND`

### `BalanceType`

Plan and statement entries are based on specific balance type.

- `PURCHASE`

### `BankAccountType`

Type of bank accounts.

- `CHECKING`
- `SAVINGS`

### `BankName`

The possible bank names.

- `CFSB_BANK`
- `CROSS_RIVER_BANK`
- `SUTTON_BANK`

### `BankVerificationProvider`

The provider that Highnote uses to verify bank accounts.

- `FINICITY`
- `PLAID`
- `PLAID_RESELLER`
- `SIMULATED`
- `UNSPECIFIED`

### `BillingCycleType`

Whether statement cycles are `WEEKLY`, `BIWEEKLY`, or `MONTHLY`.

- `BIWEEKLY`
- `MONTHLY`
- `WEEKLY`

### `BusinessAccountHolderClientTokenPermission`

Permissions for a `BusinessAccountHolder` Client Token

- `READ_BUSINESS_ACCOUNT_HOLDER_DETAILS`

### `BusinessAccountHolderIdentityUpdateType`

The type of identifying information which has been modified in a `BusinessAccountHolderIdentityUpdatedEvent`.

- `ANNUAL_REVENUE`
- `BILLING_ADDRESS`
- `EMPLOYER_IDENTIFICATION_NUMBER`
- `LEGAL_BUSINESS_NAME`

### `BusinessAddressType`

Roles a business address may fill. Exactly one address per `Business` is the
LEGAL address; BILLING and SHIPPING are optional additional roles.

- `BILLING`
- `LEGAL`
- `SHIPPING`

### `BusinessAssociatedPersonIdentityUpdateType`

The type of identifying information which has been modified in a `BusinessAuthorizedPersonIdentityUpdatedEvent` or `BusinessUltimateBeneficialOwnerIdentityUpdatedEvent`.

- `DATE_OF_BIRTH`
- `FULL_LEGAL_NAME`
- `HOME_ADDRESS`
- `SOCIAL_SECURITY_NUMBER`

### `BusinessCustomerInteractionMethod`

A method of customer interaction

- `IN_PERSON`
- `MAIL_ORDER_TELEPHONE_ORDER`
- `MOBILE`
- `ONLINE`

### `BusinessEntityType`

The type of business entity

- `GOVERNMENT`
- `PRIVATE`
- `PUBLIC`

### `BusinessMetricAttributeSortedDirection`

Sort types of the metric returned in response.

- `ASCENDING`
- `DESCENDING`

### `BusinessPersonRole`

Roles a person associated with a `Business` may hold. A person may hold any
combination of these roles. The primary applicant designation is a separate
flag — see `BusinessPersonInput.isPrimaryApplicant`.

- `CONTROL_PRONG`
- `GUARANTOR`
- `ULTIMATE_BENEFICIAL_OWNER`

### `BusinessPlanIndicatorAttributeType`

Supported indicator-type business plan attribute types.

- `FUEL_TAX_EXEMPT`

### `BusinessPlanOperatingGoodsAndServiceCategory`

Good and/or service provided by the business.

- `AGRICULTURAL_SERVICES`
- `BUSINESS_SERVICES`
- `CHARITABLE_ORGANIZATIONS`
- `CLOTHING_STORES`
- `CONTRACTED_SERVICES`
- `GOVERNMENT_SERVICES`
- `MISCELLANEOUS_STORES`
- `PROFESSIONAL_SERVICES_OR_MEMBERSHIP_ORGANIZATIONS`
- `RETAIL_OUTLET_SERVICES`
- `TRANSPORTATION_SERVICES`
- `TRAVEL`
- `UTILITY_SERVICES`

### `BusinessPlanOperatingModelType`

Describes conditions on how the business operates.

- `FORWARD_COMMITMENT`
- `PHYSICAL_GOODS_SOLD`
- `SEASONAL_BUSINESS`

### `BusinessStructure`

Business Type.

- `CORPORATION`
- `LLC`
- `NON_PROFIT`
- `PARTNERSHIP`
- `PRIVATE_CORPORATION`
- `PUBLIC_CORPORATION`
- `SOLE_PROPRIETORSHIP`

### `BusinessTitle`

Authorizing officer's business title.

- `CEO`
- `CFO`
- `COO`
- `OWNER`
- `PRESIDENT`
- `TREASURER`
- `VICE_PRESIDENT`

### `CalculatedTransferAmountType`

The way the amount to be transferred is calculated

- `MINIMUM_PAYMENT`
- `OUTSTANDING_BALANCE`
- `OUTSTANDING_STATEMENT_BALANCE`

### `CaptureType`

The type of capture to perform on the authorized amount.

- `FINAL_CAPTURE`
- `MULTI_CAPTURE`

### `CardArtDocumentType`

The type of card art document

- `DIGITAL_BACKGROUND`
- `DIGITAL_FRONT_OF_CARD`
- `DIGITAL_ICON`
- `DIGITAL_LOGO`
- `PHYSICAL_BACK_OF_CARD`
- `PHYSICAL_FRONT_OF_CARD`
- `VIRTUAL_FRONT_OF_CARD`
- `VIRTUAL_THREE_DS_VERIFICATION_LOGO`

### `CardDataInputCapability`

The capabilities of the terminal to read card data.

- `BARCODE_OR_QR_CODE`
- `CAPABILITY_UNKNOWN`
- `CONTACTLESS_ONLY_SUPPORTED`
- `CONTACTLESS_READ_VIA_CHIP_RULES`
- `CONTACTLESS_READ_VIA_MAG_STRIPE_RULES`
- `FILE`
- `INTEGRATED_CIRCUIT_CARD`
- `KEY_ENTERED`
- `MAG_STRIPE_READER_AND_EMV_ICC`
- `MAG_STRIPE_READER_AND_KEY_ENTRY`
- `MAG_STRIPE_READER_AND_KEY_ENTRY_AND_EMV_ICC`
- `MAGNETIC_STRIPE`
- `MANUAL_NO_TERMINAL`
- `OCR`
- `SECURE_CARDLESS_ENTRY`

### `CardDigitalWalletTokenSourceEntryMethod`

The method used to enter the card information when creating a digital wallet token.

- `APP_PROVISIONED`
- `BROWSER`
- `CARD_ON_FILE`
- `CHIP_DATA`
- `MANUAL_ENTRY`
- `TOKEN`

### `CardDigitalWalletTokenState`

States of a card digital wallet token.

- `ACTIVE`
- `REQUESTED`
- `SUSPENDED`
- `TERMINATED`

### `CardDigitalWalletTokenStateReason`

A reason for a card digital wallet token state transition.

- `ACCOUNT_CLOSED`
- `ACCOUNT_HOLDER_DELETED`
- `ACTIVATION_METHOD`
- `CUSTOMER_SERVICE_AGENT`
- `DEVICE_FOUND`
- `DEVICE_LOST`
- `DEVICE_STOLEN`
- `FRAUDULENT_TRANSACTIONS`
- `NETWORK_INITIATED`
- `NON_FRAUDULENT_TRANSACTIONS`
- `OTHER`

### `CardDigitalWalletTokenType`

The Card Digital Wallet Token type.

- `CARD_ON_FILE`
- `CLOUD_BASED`
- `DEVICE_SECURE_ELEMENT`
- `ECOMMERCE`
- `STATIC`

### `CardDigitalWalletTokenVerificationMethodType`

Verification methods available for digital wallet token provisioning. These methods determine how cardholders verify their identity when adding cards to digital wallets like Apple Pay, Google Pay, or Samsung Pay.

- `CUSTOMER_SERVICE`
- `EMAIL`
- `SMS`

### `CardFormFactor`

Whether a card is (or will be) `VIRTUAL` or `PHYSICAL`.

- `PHYSICAL`
- `VIRTUAL`

### `CardPaymentDisputeCategory`

The category of a dispute.

- `CONSUMER_DISPUTE`
- `FRAUD`
- `INVALID_AUTHORIZATION`
- `PROCESSING_ERROR`

### `CardPaymentDisputeStageDecisionChoice`

A decision choice available on a dispute stage action.

- `ACCEPT`
- `CHALLENGE`
- `WITHDRAW`

### `CardPaymentDisputeStageEvidenceCategory`

The category of evidence submitted for a dispute.

- `CUSTOMER_COMMUNICATION`
- `IDENTITY_VERIFICATION`
- `ORDER_HISTORY`
- `PROOF_OF_DELIVERY`
- `REFUND_REVERSAL_PROOF`
- `SERVICE_DOCUMENTATION`

### `CardPaymentDisputeStageEvidenceStatus`

The processing status of an evidence file.

- `ACCEPTED`
- `PENDING`
- `REJECTED`
- `SUBMITTED`

### `CardPaymentDisputeStageStatus`

The lifecycle status of an individual dispute stage.

- `COMPLETED`
- `EXPIRED`
- `IN_PROGRESS`
- `PENDING`

### `CardPaymentDisputeStatus`

Represents the overall lifecycle state of a `Dispute`.

- `CLOSED`
- `IN_REVIEW`
- `INITIATED`
- `ISSUER_ACCEPTED`
- `MERCHANT_ACCEPTED`
- `TIMED_OUT`
- `WITHDRAWN`

### `CardProductApplicationOfferCategory`

The offer category of an `AccountHolderCardProductApplicationOffer`

- `SECURED_CREDIT`
- `UNSECURED_CREDIT`

### `CardProductApplicationOfferStatus`

The status of an `AccountHolderCardProductApplicationOffer`

- `ACCEPTED`
- `DISQUALIFIED`
- `EXPIRED`
- `EXTENDED`
- `OPEN`
- `REJECTED`

### `CardProductVertical`

The product vertical for a card.

- `ACQUIRING`
- `AP_INVOICE_AUTOMATION`
- `COMMERCIAL_CREDIT`
- `COMMERCIAL_CREDIT_PAY_IN_FULL`
- `COMMERCIAL_DEBIT`
- `COMMERCIAL_PREPAID`
- `CONSUMER_CREDIT`
- `CONSUMER_PREPAID`
- `EARNED_WAGE_ACCESS`
- `FLEET`
- `GENERAL_PURPOSE_RELOADABLE`
- `MONEY_MOVEMENT`
- `PAYROLL`
- `SECURED_COMMERCIAL_CREDIT`

### `CardProfileBankStatus`

Payment Card Profile Bank Status

- `APPROVED`
- `IN_REVIEW`
- `PENDING`
- `READY_FOR_REVIEW`

### `CardProfilePaymentNetworkStatus`

Physical Card Profile Payment Network Status

- `APPROVED`
- `IN_REVIEW`
- `PENDING`
- `READY_FOR_REVIEW`

### `CardProfileSetIntent`

Card Profile Set Intent

- `DIGITAL`
- `PHYSICAL`
- `VIRTUAL`

### `CardProfileSetNetwork`

Card Profile Set Network

- `MASTERCARD`
- `VISA`

### `CardProfileSetStatus`

Card Profile Set states

- `APPROVED`
- `ARCHIVED`
- `IN_REVIEW`
- `INACTIVE`
- `PENDING`
- `READY_FOR_REVIEW`

### `CardProfileStatus`

Card Profile states.

- `APPROVED`
- `IN_REVIEW`
- `INACTIVE`
- `PENDING`
- `READY_FOR_REVIEW`

### `CardProfileVendorStatus`

Physical Card Profile Vendor Status

- `APPROVED`
- `IN_REVIEW`
- `PENDING`
- `READY_FOR_REVIEW`

### `CardTransactionProcessingType`

The transaction processing type for a card event

- `ACCOUNT_VERIFICATION`
- `ADJUSTMENT_CREDIT`
- `ADJUSTMENT_DEBIT`
- `ATM_MINI_STATEMENT`
- `AVAILABLE_FUNDS_INQUIRY`
- `BALANCE_INQUIRY`
- `CARDHOLDER_ACCOUNTS_TRANSFER`
- `CASH`
- `CASH_DISBURSEMENT`
- `DEPOSITS`
- `ELIGIBILITY_INQUIRY`
- `FEE_COLLECTION_DEBIT`
- `FUNDS_DISBURSEMENT_CREDIT`
- `FUNDS_WITHDRAWAL_FOR_ELECTRONIC_PURSE`
- `GOODS_AND_SERVICES`
- `GOODS_AND_SERVICES_WITH_CASH_DISBURSEMENT`
- `LOAD_OF_PREPAID_OR_STORED_VALUE_CARD`
- `NON_CASH_FINANCIAL_FOR_FUNDING`
- `NOTIFICATION_TO_BANK`
- `ORIGINAL_CREDIT`
- `PAYMENT_CREDIT`
- `PAYMENT_DEBIT`
- `PAYMENT_ENCLOSED`
- `PAYMENT_FROM_THIRD_PARTY`
- `PAYMENT_TO_ANOTHER_PARTY`
- `PAYMENT_TRANSACTION`
- `PIN_CHANGE`
- `PIN_UNBLOCK`
- `QUASI_CASH_AND_SCRIP`
- `RETURNS`

### `CardUsage`

Whether a card is (or will be) `MULTI_USE` or `SINGLE_USE`.

- `MULTI_USE`
- `SINGLE_USE`

### `ChargebackExternalNetworkType`

The external network type of the chargeback.

- `NGOM`
- `VROL`

### `CheckbookUserVerificationStatus`

The verification status to simulate for a checkbook user.

- `REJECTED`
- `VERIFIED`

### `CheckPaymentDocumentType`

The type of `CheckPayment` document.

- `ACCOUNT_HOLDER_SIGNATURE`

### `CheckPaymentEventType`

The current event type of the check.

- `COMPLETED`
- `FAILED`
- `FUNDING_COMPLETED`
- `FUNDING_DISBURSED`
- `FUNDING_PENDING`
- `FUNDING_STARTED`
- `ON_RISK_HOLD`
- `PAID`
- `PENDING_PROCESSING_BY_HIGHNOTE`
- `PENDING_SHIPMENT`
- `PRINTED`
- `PROCESSED_BY_HIGHNOTE`
- `PROCESSING_BY_HIGHNOTE`
- `REVERSAL_COMPLETED`
- `REVERSAL_INITIATED`
- `SHIPPED`
- `VOIDED`

### `CheckPaymentFailureReason`

The reason for the check failure, if applicable.

- `ACCOUNT_CLOSED`
- `FINANCIAL_ACCOUNT_NOT_ENABLED_FOR_CHECK_PAYMENTS`
- `INSUFFICIENT_FUNDS`
- `INTERNAL_ERROR`
- `INVALID_ADDRESS`
- `PAYMENT_STOPPED`
- `RISK`
- `UNKNOWN`

### `CheckPaymentShippingTime`

Enum representing the shipping time for a physical check.

- `CERTIFIED`
- `EXPEDITED`
- `OVERNIGHT`
- `STANDARD`

### `CheckPaymentStatus`

The status of the check.

- `COMPLETE`
- `FAILED`
- `PENDING`

### `CheckPaymentType`

The type of the check: digital or physical.

- `PHYSICAL`

### `ClientTokenUsage`

Options for how the client token can be used

- `SINGLE_USE`
- `UNTIL_EXPIRATION`

### `CollaborativeAuthorizationEndpointStatus`

The status of a `CollaborativeAuthorizationEndpoint`.

- `ACTIVATION_FAILED`
- `ACTIVE`
- `DEACTIVATED`
- `PENDING_VERIFICATION`

### `CollaborativeAuthorizationResponseCode`

The possible values for a transaction Authorization Response in the Collaborative Authorization flow.

- `APPROVED`
- `BLOCKED_CARD`
- `CARD_NOT_PRESENT_AT_POS`
- `CASHBACK_LIMIT_EXCEEDED`
- `DECLINED`
- `DUPLICATE_TRANSACTION`
- `ERROR`
- `EXCEEDS_FREQUENCY`
- `EXCEEDS_LIMIT`
- `INSUFFICIENT_FUNDS`
- `INVALID_DRIVER`
- `INVALID_ID`
- `INVALID_LOCATION`
- `INVALID_MERCHANT`
- `INVALID_MERCHANT_CATEGORY_CODE`
- `INVALID_PURCHASE_TIME`
- `INVALID_TRANSACTION`
- `INVALID_VEHICLE`
- `MANUAL_KEY_ENTERED_AT_POS`
- `PARTIAL_AMOUNT_APPROVED`
- `PROHIBITED_SELFPAY`
- `RESTRICTED_CARD`
- `RESTRICTED_LOCATION`
- `RESTRICTED_MERCHANT`
- `RESTRICTED_MERCHANT_CATEGORY_CODE`
- `SUSPECTED_FRAUD`
- `TIMEOUT`

### `CollaborativeAuthorizationStandIn`

Determines whether transactions are approved or declined in the case of a timeout during collaborative authorization.

- `APPROVE`
- `DECLINE`

### `ComputeRegion`

Available regions to persist data.

- `ASIA`
- `EUROPE`
- `USA`

### `CreateScheduledTransferClientTokenPermission`

Permissions for a `CreateScheduledTransfer` Client Token

- `CREATE_SCHEDULED_TRANSFER`

### `CreditBalanceType`

The type of balance this `CreditPlan` applies to. For example, `PURCHASE`, `CASH_ADVANCE`, `INSTALLMENT`, or `BALANCE_TRANSFER`.

- `BALANCE_TRANSFER`
- `CASH_ADVANCE`
- `INSTALLMENT`
- `PURCHASE`

### `CreditBureau`

Credit Bureaus

- `EXPERIAN`

### `CreditCardProductFeature`

Type of credit card product feature.

- `CHARGE`
- `REVOLVING`

### `CreditDecisionResult`

A result from a credit decision.

- `ACTIVE_BANKRUPTCY`
- `ADDRESS_MISMATCH`
- `AGE_OF_OLDEST_TRADELINE`
- `BANKRUPTCY`
- `COLLECTIONS`
- `CREDIT_REPORT_FRAUD_ALERT`
- `CREDIT_REPORT_FREEZE`
- `CURRENT_DEBT_OBLIGATIONS`
- `CURRENT_DELINQUENT_CREDIT_OBLIGATIONS`
- `CURRENT_DELINQUENT_CREDIT_OBLIGATIONS_30`
- `CURRENT_DELINQUENT_CREDIT_OBLIGATIONS_90`
- `DECEASED`
- `DELINQUENT_CREDIT_OBLIGATIONS`
- `DOB_MISMATCH`
- `EXCESSIVE_DEBT_OBLIGATIONS`
- `EXCESSIVE_OBLIGATIONS_TO_INCOME`
- `FORECLOSURE`
- `HIGH_CREDIT_CARD_UTILIZATION`
- `HIGH_DEBT_TO_INCOME`
- `HIGH_DEBT_TO_INCOME_EXCLUDING_HOUSING`
- `HIGH_REVOLVING_CREDIT_CARD_UTILIZATION`
- `INSUFFICIENT_INCOME`
- `LIMITED_CREDIT_EXPERIENCE`
- `MIN_CREDIT_SCORE`
- `MLA_ELIGIBLE`
- `NAME_MISMATCH`
- `NO_CREDIT_HISTORY`
- `NUMBER_OF_OPEN_ACCOUNTS`
- `PAST_CHARGE_OFFS`
- `PAST_DELINQUENT_CREDIT_OBLIGATIONS`
- `RECENT_BANKRUPTCY`
- `RECENT_CHARGE_OFF`
- `RECENT_CREDIT_ACCOUNTS`
- `RECENT_CREDIT_APPLICATIONS`
- `RECENT_DELINQUENCY`
- `RECENT_INQUIRIES`
- `SSN_MISMATCH`

### `CreditInstallmentEligibilityStatusForTransactionEvent`

Possible status values for installment eligibility for a `TransactionEvent`.

- `ELIGIBLE`
- `NOT_ELIGIBLE`

### `CreditLimitChangeRequestFailureReason`

Possible reasons for a `CreditLimitChangeRequestStatus` of `FAILED`.

- `NSF`
- `OTHER`

### `CreditLimitChangeRequestor`

Possible requestors of `CreditLimitChangeRequest`.

- `CUSTOMER`
- `SUBSCRIBER`

### `CreditLimitChangeRequestStatus`

Possible `CreditLimitChangeRequest` statuses.

- `APPROVED`
- `CLOSED`
- `DENIED`
- `FAILED`
- `INITIATED`
- `PENDING`

### `CreditLimitChangeRequestType`

Types of `CreditLimitChangeRequest`.

- `DECREASE`
- `INCREASE`

### `CreditPlanDurationUnits`

The units used to express the duration of a `CreditPlan`, for example `BILLING_CYCLES`.

- `BILLING_CYCLES`

### `CreditPlanStatus`

The status of the `CreditPlan`. For example, `ACTIVE`, `INACTIVE`, or `DEPRECATED`.

- `ACTIVE`
- `DEPRECATED`
- `INACTIVE`

### `CreditPlanTemplateStatus`

The status of the `CreditPlanTemplate`. For example, `ACTIVE`, `INACTIVE`, or `DEPRECATED`.

- `ACTIVE`
- `DEPRECATED`
- `INACTIVE`

### `CreditPlanType`

The type of `CreditPlan`. For example, `STANDARD` or `PROMOTIONAL`.

- `PROMOTIONAL`
- `STANDARD`

### `CreditRepaymentMethod`

The methods available to repay a credit balance. For example, `ACH`.

- `ACH`
- `FEE_ADJUSTMENT`
- `INTEREST_ADJUSTMENT`
- `MANUAL_ADJUSTMENT`
- `REWARD_BALANCE`

### `CreditRepaymentType`

Whether the Credit Repayment decreases the owed balance (a `CREDIT`) or increases the owed balance (a `DEBIT`).

- `CREDIT`
- `DEBIT`

### `CreditStatementCyclePeriod`

Whether statement cycles are `WEEKLY` or `MONTHLY`.

- `MONTHLY`
- `WEEKLY`

### `CreditStatementGracePeriodType`

Whether the grace period is `FLOATING` or `FIXED`.

- `FIXED`
- `FLOATING`

### `CreditUnderwritingVerificationReviewStatusReasonCode`

Reasons for `CreditUnderwritingVerification` to be `IN_REVIEW` status.

- `AWAITING_CREDIT_REPORT_TO_BE_UNFROZEN`
- `AWAITING_FRAUD_ALERT_REVIEW`

### `CryptoFundingFlowFailureReason`

The reason a `CryptoFundingFlowTransfer` failed.

- `ACCOUNT_CLOSED`
- `ACCOUNT_NOT_ACTIVE`
- `ACCOUNT_NOT_FOUND`
- `CRYPTO_FUNDING_ACCOUNT_FEATURE_NOT_ENABLED`
- `CRYPTO_RECEIVING_ACCOUNT_FEATURE_NOT_ENABLED`
- `CURRENCY_MISMATCH`
- `INVALID_AMOUNT`
- `TRANSFER_BETWEEN_PRODUCTS_NOT_ALLOWED`
- `TRANSFER_NOT_PERMITTED`
- `TRANSFER_NOT_SUPPORTED_ON_PRODUCT`

### `CryptoFundingFlowProvider`

The external crypto provider that originated a `CryptoFundingFlowTransfer`.

- `BVNK`

### `CryptoFundingFlowStatus`

The lifecycle status of a `CryptoFundingFlowTransfer`.

- `FAILED`
- `PROCESSED`
- `PROCESSING`
- `RECEIVED`

### `CvvResponseCode`

Code representing the result of CVV (security code) verification

- `MATCH`
- `NO_MATCH`
- `NOT_ON_CARD`
- `NOT_PERFORMED`
- `NOT_PROVIDED`

### `DeliveryAttemptStatus`

Indicates whether a delivery attempt was successful, failed or skipped.

- `FAILURE`
- `SKIPPED`
- `SUCCESS`

### `DepositProcessingNetwork`

The list of Processing Networks that can be utilized for a deposit

- `ACCEL`
- `ACCEL_CARD_FREE_CASH`
- `ACCEL_NEBRASKA`
- `ACCEL_NO_PIN`
- `ACCEL_SURCHARGE_FREE`
- `AFFN`
- `AFFN_HIGH_TICKET_POS`
- `AFFN_LOW_TICKET_POS`
- `AFFN_RECIPROCAL`
- `ALASKA_OPTION`
- `ALLPOINT_NETWORK`
- `AMERICAN_EXPRESS_ATM`
- `CIRRUS_ATM`
- `CIRRUS_EUROPE_ACQUIRED_DUAL_MESSAGE`
- `CREDIT_UNION_COOPERATIVE_ATM`
- `CU24`
- `CULIANCE`
- `CULIANCE_CUHERE_MONEYPASS_RECIPROCAL`
- `CULIANCE_CUHERE_PRESTO_PUBLIX`
- `CULIANCE_CUHERE_PROGRAM`
- `CULIANCE_NYCE_RECIPROCAL`
- `CULIANCE_PINLESS_LOW_VALUE_POS`
- `DISCOVER_ATM`
- `EBT_ATM`
- `EBT_POS`
- `EBT_PROGRAMS`
- `INTERLINK`
- `MAESTRO`
- `MAESTRO_EUROPE_ACQUIRER_DUAL_MESSAGE`
- `MASTERCARD_ATM`
- `MASTERCARD_DUAL_MESSAGE_AUTHORIZATION_SYSTEM`
- `MASTERCARD_SINGLE_MESSAGE_SYSTEM`
- `MONEY_PASS`
- `MONEY_PASS_ATM_NEBRASKA`
- `MONEY_PASS_ATM_STAR`
- `NETS`
- `NYCE`
- `NYCE_AFFN_RECIPROCAL`
- `NYCE_CROSS_BORDER`
- `NYCE_CULIANCE_RECIPROCAL`
- `NYCE_DIRECT_SETTLEMENT_LINK`
- `NYCE_ECOMMERCE`
- `NYCE_INTERNATIONAL_RECIPROCAL_GROUP1`
- `NYCE_INTERNATIONAL_RECIPROCAL_GROUP2`
- `NYCE_PINLESS_POS`
- `PLUS_ATM`
- `PRIMARY_ROUTING_OR_GENERIC_FILE_UPDATE`
- `PULSE`
- `PULSE_ACCEL_RECIPROCAL`
- `PULSE_AFFN_RECIPROCAL`
- `PULSE_CANADA`
- `PULSE_DIRECT_SETTLEMENT_LINK`
- `PULSE_MEXICO`
- `PULSE_PAY_EXPRESS`
- `PULSE_SELECT`
- `SHAZAM`
- `STAR`
- `STAR_ACCESS`
- `STAR_BC_CARD_KOREA_RECIPROCAL`
- `STAR_DIRECT_SETTLEMENT_LINK`
- `STAR_PUBLIX_PRESTO`
- `STAR_RAPIDFLASH`
- `STAR_SF`
- `UNKNOWN`
- `VISA`
- `VISA_DIRECT`
- `VISA_DIRECT_SETTLEMENT_LINK`
- `VISA_SINGAPORE_DIRECT_SETTLEMENT_LINK`

### `DevicePaymentType`

Different types of Payments supported for the token.

- `DSRP`
- `ECOMMERCE`
- `NFC`

### `DigitalWalletProvider`

Digital Wallet Provider

- `APPLE_PAY`
- `GOOGLE_PAY`
- `SAMSUNG_PAY`

### `DigitalWalletTokenStatus`

The status of a `CardDigitalWalletToken`.

- `ACTIVE`
- `REQUESTED`
- `SUSPENDED`
- `TERMINATED`

### `DigitalWalletTokenStatusChangeReason`

The reason for a `CardDigitalWalletToken` status change.

- `ACCOUNT_CLOSED`
- `ACCOUNT_HOLDER_DELETED`
- `ACTIVATION_METHOD`
- `CUSTOMER_SERVICE_AGENT`
- `DEVICE_FOUND`
- `DEVICE_LOST`
- `DEVICE_STOLEN`
- `FRAUDULENT_TRANSACTIONS`
- `NETWORK_INITIATED`
- `NON_FRAUDULENT_TRANSACTIONS`
- `OTHER`

### `DirectDepositDetailClientTokenPermission`

Permissions for a Direct Deposit Details Client Token

- `READ_RESTRICTED_DETAILS`

### `DisbursementTransferEventFailureReason`

Additional details when the `DisbursementTransferEvent` status is failed.

- `ACCOUNT_CLOSED`
- `ACCOUNT_NOT_ACTIVE`
- `ACCOUNT_NOT_FOUND`
- `ACCOUNT_NOT_PROVIDED`
- `ACCOUNTS_DO_NOT_BELONG_TO_SAME_PRODUCT`
- `ACH_LOAD_NOT_ALLOWED_BY_PROGRAM`
- `CARD_FUNDING_FEATURE_NOT_ENABLED`
- `CASH_FUND_OUT_NOT_SUPPORTED_ON_PRODUCT`
- `COMMERCIAL_CREDIT_PAY_IN_FULL_FEATURE_NOT_ENABLED`
- `CORPORATE_BANK_ACCOUNT_FEATURE_NOT_ENABLED`
- `CREDIT_CARD_FEATURE_NOT_ENABLED`
- `CREDIT_LIMIT_NOT_SET_ON_ACCOUNT`
- `CURRENCY_MISMATCH`
- `DDA_FEATURE_NOT_ENABLED`
- `DEBIT_CARD_FEATURE_NOT_ENABLED`
- `FLEET_FEATURE_NOT_ENABLED`
- `FUNDING_ACCOUNT_FEATURE_NOT_ENABLED`
- `FUNDING_CARD_NOT_SUPPORTED`
- `IDEMPOTENCY_KEY_NOT_PROVIDED`
- `INSUFFICIENT_FUNDS`
- `INVALID_DISBURSEMENT_AMOUNT`
- `MERCHANT_SETTLEMENT_FEATURE_NOT_ENABLED`
- `NOT_AN_ORGANIZATION_OWNED_ACCOUNT`
- `NOT_ENOUGH_BALANCE_TO_REDUCE_CREDIT_LIMIT`
- `ORGANIZATION_ID_NOT_PROVIDED`
- `ORIGINATED_ACH_UNLOAD_NOT_SUPPORTED_ON_PRODUCT`
- `PAYROLL_ADVANCE_FEATURE_NOT_ENABLED`
- `PAYROLL_EMPLOYER_ADVANCE_FEATURE_NOT_ENABLED`
- `PREPAID_CARD_FEATURE_NOT_ENABLED`
- `PRODUCT_FUNDING_FEATURE_NOT_ENABLED`
- `REWARD_POINT_FEATURE_NOT_ENABLED`
- `SECURE_CARD_FEATURE_NOT_ENABLED`
- `TENANT_ID_NOT_PROVIDED`
- `TRANSACTION_ID_NOT_PROVIDED`
- `TRANSFER_AMOUNT_BELOW_MIN_PROGRAM_RELOAD_LIMIT`
- `TRANSFER_AMOUNT_EXCEEDING_MAX_AGGREGATE_CREDIT_DISTRIBUTION_AMOUNT`
- `TRANSFER_AMOUNT_EXCEEDING_MAX_PROGRAM_CARD_BALANCE`
- `TRANSFER_AMOUNT_EXCEEDING_MAX_PROGRAM_LOAD_LIMIT`
- `TRANSFER_AMOUNT_EXCEEDING_MAX_PROGRAM_RELOAD_LIMIT`
- `TRANSFER_AMOUNT_IS_NEGATIVE_OR_ZERO`
- `TRANSFER_CONDITION_SAME_PRIMARY_ACCOUNT_HOLDER_NOT_SATISFIED`
- `TRANSFER_NOT_SUPPORTED_ON_PRODUCT`
- `UNSPECIFIED`

### `DisbursementTransferEventStatus`

Status of the `DisbursementTransferEvent`.

- `COMPLETED`
- `FAILED`
- `PENDING`
- `UNSPECIFIED`

### `DisbursementTransferEventType`

The event type for the `DisbursementTransferEvent`.

- `DISBURSEMENT_CARRY_OVER`
- `DISBURSEMENT_CHARGEBACK_FEE`
- `DISBURSEMENT_INTERCHANGE_FEE`
- `DISBURSEMENT_INTERCHANGE_FEE_PRECISION_ADJUSTMENT`
- `DISBURSEMENT_NETWORK_FEE`
- `DISBURSEMENT_PAYABLE`
- `DISBURSEMENT_PAYMENT`
- `DISBURSEMENT_PAYOUT_PAYABLE`
- `DISBURSEMENT_PLATFORM_FEE`
- `UNSPECIFIED`

### `DistanceUnit`

A unit of distance measurement.

- `KILOMETER`
- `MILE`

### `DocumentCategoryType`

A categorization of an uploaded document

- `PRIMARY_DOCUMENT_TYPE`
- `SECONDARY_DOCUMENT_TYPE`
- `SUPPORTING_DOCUMENT_TYPE`

### `DocumentType`

Document types that can be uploaded for identity verification.

- `ACCOUNT_HOLDER_SIGNATURE`
- `ARTICLES_OF_INCORPORATION`
- `AUTO_INSURANCE`
- `BANK_STATEMENT`
- `BIRTH_CERTIFICATE`
- `BROKERAGE_STATEMENT`
- `BUSINESS_LICENSE`
- `BUSINESS_REGISTRATION`
- `CABLE_BILL`
- `CERTIFICATE_OF_CITIZENSHIP`
- `CERTIFICATE_OF_GOOD_STANDING`
- `CERTIFICATE_OF_RELEASE_OR_DISCHARGE_FROM_ACTIVE_DUTY`
- `COURT_ORDER_FOR_LEGAL_NAME_CHANGE`
- `DIGITAL_BACKGROUND`
- `DIGITAL_FRONT_OF_CARD`
- `DIGITAL_ICON`
- `DIGITAL_LOGO`
- `DIVORCE_DECREE`
- `DRIVERS_LICENSE`
- `FEDERAL_EMPLOYER_IDENTIFICATION_NUMBER`
- `FORM_1098`
- `FORM_1099`
- `FORM_5498`
- `FORM_CP_575`
- `HEALTH_INSURANCE`
- `INTERNET_BILL`
- `IRS_ISSUED_FEDERAL_TAX_RETURN`
- `IRS_ISSUED_STATE_TAX_RETURN`
- `IRS_ISSUED_TAX_RETURN`
- `LEASE_AGREEMENT`
- `LIFE_INSURANCE`
- `MARRIAGE_CERTIFICATE`
- `MEDICARE_CARD`
- `MUNICIPAL_ID`
- `NON_PROFIT_501_C3`
- `OPERATING_AGREEMENT`
- `PARTNERSHIP_AGREEMENT`
- `PASSPORT`
- `PAY_STUB`
- `PHONE_BILL`
- `PHYSICAL_BACK_OF_CARD`
- `PHYSICAL_FRONT_OF_CARD`
- `PRISON_ID`
- `PRISON_RELEASE_PAPERWORK`
- `SOCIAL_SECURITY_CARD`
- `SOLE_PROPRIETOR_SOCIAL_SECURITY_CARD`
- `STATE_CONSULAR_IDENTIFICATION_CARD`
- `STATE_ISSUED_BENEFIT_CARD`
- `STATE_ISSUED_ID`
- `STATE_ISSUED_PERMIT`
- `STATE_TRIBAL_ID`
- `STATE_US_BORDER_CROSSING_CARD`
- `STATE_US_EMPLOYMENT_AUTHORIZATION_CARD`
- `STATE_US_MILITARY_ARMED_FORCES_ID`
- `STATE_US_PERMANENT_RESIDENT_CARD`
- `STATEMENT_401K`
- `TAX_ID_APPLICATION`
- `TRUST_AGREEMENT`
- `US_MILITARY_RECORD_OF_SERVICE`
- `US_TAX_FORM`
- `UTILITY_BILL`
- `VETERAN_AFFAIRS_BENEFITS_LETTER`
- `VIRTUAL_FRONT_OF_CARD`
- `VIRTUAL_THREE_DS_VERIFICATION_LOGO`
- `W2`
- `WIRE_CONFIRMATION`

### `DocumentUploadCategory`

Domains that may drive requests for document uploads.

- `APPLICATION`
- `CARD_ART`
- `CHECK_PAYMENTS`
- `DISPUTES`
- `IDENTITY_CASE`
- `MANUAL_REQUEST`

### `DocumentUploadClientTokenPermission`

Permissions for a Document Upload Client Token

- `MANAGE_DOCUMENT_UPLOAD_SESSION`

### `DocumentUploadLinkStatusCode`

A status representing a file upload

- `COMPLETED`
- `DENIED`
- `FAILED`
- `IN_PROGRESS`
- `PENDING`

### `DocumentUploadSessionStatusCode`

A status code representing the state of the document upload session

- `CREATED`
- `EXPIRED`
- `IN_PROGRESS`
- `INITIATED`
- `SUBMITTED`

### `EarnRuleType`

Method of Earning for Rewards Rule.

- `PER_TRANSACTION_SPEND_AMOUNT`

### `ElectronicFundTransferSource`

Electronic fund transfer type used for fund movement.

- `WIRE`

### `EmploymentStatus`

The types of employment status.

- `EMPLOYED`
- `OTHER`
- `RETIRED`
- `SELF_EMPLOYED`
- `STUDENT`
- `UNEMPLOYED`

### `ExternalBankAccountDetailClientTokenPermission`

Permissions for a Direct Deposit Details Client Token

- `READ_RESTRICTED_DETAILS`

### `ExternalFinancialAccountStatus`

The status of a `ExternalFinancialAccount`.

- `ACTIVE`
- `CLOSED`

### `ExternallyInitiatedAchHoldStatus`

Hold status of an ACH integrator initiated transaction

- `HOLD_REMOVED`
- `NO_HOLDS`
- `ON_HOLD`
- `UNSPECIFIED`

### `ExternallyInitiatedAchStatus`

Status of an externally initiated ACH transfer that has been sent to Highnote by a partner bank.

- `CANCELED`
- `FAILED`
- `PENDING`
- `PROCESSED`
- `PROCESSING`
- `RETURNED`
- `REVERSED`

### `ExternallyInitiatedAchStatusReasonCode`

Additional details regarding a `FAILED` or `RETURNED` transfer.

- `ACCOUNT_CLOSED`
- `ACCOUNT_FROZEN`
- `ACCOUNT_NOT_FOUND`
- `ACCOUNTS_DO_NOT_BELONG_TO_SAME_PRODUCT`
- `ACH_LOAD_NOT_SUPPORTED`
- `AMOUNT_FIELD_ERROR`
- `AUTHORIZATION_REVOKED_BY_CUSTOMER`
- `COMMERCIAL_CREDIT_PAY_IN_FULL_FEATURE_NOT_ENABLED`
- `CORPORATE_BANK_ACCOUNT_FEATURE_NOT_ENABLED`
- `CREDIT_LIMIT_NOT_SET_ON_ACCOUNT`
- `CURRENCY_MISMATCH`
- `DUPLICATE_ENTRY`
- `ENTRY_NOT_IN_ACCORDANCE_WITH_TERMS_OF_AUTHORIZATION`
- `IMPROPER_EFFECTIVE_ENTRY_DATE`
- `INSUFFICIENT_FUNDS`
- `INTERNAL_ERROR`
- `INVALID_ACCOUNT_NUMBER`
- `INVALID_COMPANY_ID_NUMBER`
- `INVALID_INDIVIDUAL_ID_NUMBER`
- `NON_TRANSACTION_ACCOUNT`
- `PAYMENT_STOPPED`
- `PAYROLL_ADVANCE_FEATURE_NOT_ENABLED`
- `PAYROLL_EMPLOYER_ADVANCE_FEATURE_NOT_ENABLED`
- `RETURNED_PER_ODFI_REQUEST`
- `TRANSACTION_NOT_AUTHORIZED_BY_ACCOUNT_HOLDER`
- `TRANSFER_AMOUNT_BELOW_MIN_RELOAD_LIMIT`
- `TRANSFER_AMOUNT_EXCEEDING_MAX_LOAD_LIMIT`
- `TRANSFER_AMOUNT_EXCEEDING_MAX_RELOAD_LIMIT`
- `UNAUTHORIZED_CONSUMER_DEBIT_USING_CORPORATE_SEC_CODE`
- `UNAUTHORIZED_IMPROPER_INELIGIBLE_OR_INCOMPLETE_TRANSACTION`
- `UNCOLLECTED_FUNDS`

### `ExternallyInitiatedTransferType`

Transaction Type of an externally initiated ACH transfer.

- `CREDIT_FUNDS`
- `DEBIT_FUNDS`
- `PAYROLL`

### `ExternalMoneyMovementTransactionEventStatus`

The status of the `ExternalMoneyMovementTransactionEvent`.

- `FAILED`
- `INITIATED`
- `PROCESSED`
- `PROCESSING`

### `ExternalMoneyMovementTransactionEventStatusFailureReason`

The reason for a `ExternalMoneyMovementTransactionEvent` failure.

- `ACCOUNT_NOT_FOUND`
- `IDEMPOTENCY_KEY_NOT_PROVIDED`
- `INSUFFICIENT_FUNDS`
- `INVALID_ACCOUNT_NUMBER`
- `TRANSFER_AMOUNT_IS_NEGATIVE_OR_ZERO`
- `UNSPECIFIED`

### `ExternalMoneyMovementTransactionEventType`

The type of an `ExternalMoneyMovementTransactionEvent`.

- `PAYOUT`
- `PLATFORM_FEE`

### `ExternalMoneyMovementTransactionStatus`

The status of a `ExternalMoneyMovementTransaction`

- `COMPLETED`
- `FAILED`
- `INITIATED`
- `PENDING`
- `UNSPECIFIED`

### `ExternalMoneyMovementTransactionStatusReasonCode`

The possible reasons a `ExternalMoneyMovementTransaction` could fail.

- `ACCOUNT_NOT_FOUND`
- `IDEMPOTENCY_KEY_NOT_PROVIDED`
- `INSUFFICIENT_FUNDS`
- `INVALID_ACCOUNT_NUMBER`
- `TRANSFER_AMOUNT_IS_NEGATIVE_OR_ZERO`
- `UNSPECIFIED`

### `ExternalMoneyMovementTransactionType`

The type of an `ExternalMoneyMovementTransaction`.

- `PAYOUT`
- `PLATFORM_FEE`

### `FeeChargeConditionDuration`

The possible Fee Charge Condition accumulation durations.

- `DAY`
- `LIFETIME`
- `MONTH`
- `NONE`
- `WEEK`
- `YEAR`

### `FeeChargeOperator`

The possible Fee Charge Condition operator types.

- `BETWEEN`
- `EQUAL`
- `GREATER_THAN`
- `GREATER_THAN_OR_EQUAL`
- `LESS_THAN`
- `LESS_THAN_OR_EQUAL`
- `NOT_EQUAL`

### `FeeConditionAggregation`

Type to which fee condition is attached.

- `ACCOUNT`
- `PAYMENT_CARD`

### `FeedbackCode`

A enum of `FeedbackCode` codes

- `OVERRIDE_RULE_RESULTS_TO_ACCEPTED`
- `OVERRIDE_RULE_RESULTS_TO_DENIED`

### `FeeScheduleStatus`

Fee schedule status.

- `ACTIVE`
- `INACTIVE`
- `PENDING`

### `FeeTransferEventFailureType`

The reasons a Fee Transfer Event could fail.

- `ACCOUNT_CLOSED`
- `ACCOUNT_NOT_ACTIVE`
- `ACCOUNT_NOT_FOUND`
- `ACCOUNT_NOT_PROVIDED`
- `ACCOUNTS_DO_NOT_BELONG_TO_SAME_PRODUCT`
- `ACH_LOAD_NOT_ALLOWED_BY_PROGRAM`
- `CARD_FUNDING_FEATURE_NOT_ENABLED`
- `CASH_FUND_OUT_NOT_SUPPORTED_ON_PRODUCT`
- `COMMERCIAL_CREDIT_PAY_IN_FULL_FEATURE_NOT_ENABLED`
- `CORPORATE_BANK_ACCOUNT_FEATURE_NOT_ENABLED`
- `CREDIT_CARD_FEATURE_NOT_ENABLED`
- `CREDIT_LIMIT_NOT_SET_ON_ACCOUNT`
- `CURRENCY_MISMATCH`
- `DDA_FEATURE_NOT_ENABLED`
- `DEBIT_CARD_FEATURE_NOT_ENABLED`
- `FLEET_FEATURE_NOT_ENABLED`
- `FUNDING_ACCOUNT_FEATURE_NOT_ENABLED`
- `FUNDING_CARD_NOT_SUPPORTED`
- `IDEMPOTENCY_KEY_NOT_PROVIDED`
- `INSUFFICIENT_FUNDS`
- `NOT_AN_ORGANIZATION_OWNED_ACCOUNT`
- `NOT_ENOUGH_BALANCE_TO_REDUCE_CREDIT_LIMIT`
- `ORGANIZATION_ID_NOT_PROVIDED`
- `ORIGINATED_ACH_UNLOAD_NOT_SUPPORTED_ON_PRODUCT`
- `PAYROLL_ADVANCE_FEATURE_NOT_ENABLED`
- `PAYROLL_EMPLOYER_ADVANCE_FEATURE_NOT_ENABLED`
- `PREPAID_CARD_FEATURE_NOT_ENABLED`
- `PRODUCT_FUNDING_FEATURE_NOT_ENABLED`
- `REWARD_POINT_FEATURE_NOT_ENABLED`
- `SECURE_CARD_FEATURE_NOT_ENABLED`
- `TENANT_ID_NOT_PROVIDED`
- `TRANSACTION_ID_NOT_PROVIDED`
- `TRANSFER_AMOUNT_BELOW_MIN_PROGRAM_RELOAD_LIMIT`
- `TRANSFER_AMOUNT_EXCEEDING_MAX_PROGRAM_CARD_BALANCE`
- `TRANSFER_AMOUNT_EXCEEDING_MAX_PROGRAM_LOAD_LIMIT`
- `TRANSFER_AMOUNT_EXCEEDING_MAX_PROGRAM_RELOAD_LIMIT`
- `TRANSFER_AMOUNT_IS_NEGATIVE_OR_ZERO`
- `TRANSFER_CONDITION_SAME_PRIMARY_ACCOUNT_HOLDER_NOT_SATISFIED`
- `TRANSFER_NOT_SUPPORTED_ON_PRODUCT`

### `FeeTransferEventFeeActivityType`

The possible fee types that can be charged.

- `ACCOUNT_INACTIVITY_FEE`
- `ACCOUNT_INITIATION_FEE`
- `ATM_BALANCE_INQUIRY_IN_NETWORK_FEE`
- `ATM_BALANCE_INQUIRY_IN_NETWORK_INTERNATIONAL_FEE`
- `ATM_BALANCE_INQUIRY_OUT_OF_NETWORK_FEE`
- `ATM_BALANCE_INQUIRY_OUT_OF_NETWORK_INTERNATIONAL_FEE`
- `ATM_DECLINE_FEE`
- `ATM_DECLINE_INTERNATIONAL_FEE`
- `ATM_WITHDRAWAL_IN_NETWORK_FEE`
- `ATM_WITHDRAWAL_IN_NETWORK_INTERNATIONAL_FEE`
- `ATM_WITHDRAWAL_OUT_OF_NETWORK_FEE`
- `ATM_WITHDRAWAL_OUT_OF_NETWORK_INTERNATIONAL_FEE`
- `CASH_BACK_OTC_FEE`
- `CASH_BACK_POS_FEE`
- `EXPEDITED_PHYSICAL_CARD_FEE`
- `FOREIGN_EXCHANGE_FEE`
- `INSTALLMENT_FEE`
- `INTERNATIONAL_TRANSACTION_FEE`
- `LATE_PAYMENT_FEE`
- `MONTHLY_ACCOUNT_ANNIVERSARY_FEE`
- `PHYSICAL_CARD_REISSUE_FEE`
- `RETURN_PAYMENT_FEE`
- `VIRTUAL_CARD_REISSUE_FEE`

### `FeeTransferEventFeeActivityTypeInput`

The possible fee types that can be charged.

- `ACCOUNT_INACTIVITY_FEE`
- `ACCOUNT_INITIATION_FEE`
- `ATM_BALANCE_INQUIRY_IN_NETWORK_FEE`
- `ATM_BALANCE_INQUIRY_IN_NETWORK_INTERNATIONAL_FEE`
- `ATM_BALANCE_INQUIRY_OUT_OF_NETWORK_FEE`
- `ATM_BALANCE_INQUIRY_OUT_OF_NETWORK_INTERNATIONAL_FEE`
- `ATM_DECLINE_FEE`
- `ATM_DECLINE_INTERNATIONAL_FEE`
- `ATM_WITHDRAWAL_IN_NETWORK_FEE`
- `ATM_WITHDRAWAL_IN_NETWORK_INTERNATIONAL_FEE`
- `ATM_WITHDRAWAL_OUT_OF_NETWORK_FEE`
- `ATM_WITHDRAWAL_OUT_OF_NETWORK_INTERNATIONAL_FEE`
- `CASH_BACK_OTC_FEE`
- `CASH_BACK_POS_FEE`
- `EXPEDITED_PHYSICAL_CARD_FEE`
- `FOREIGN_EXCHANGE_FEE`
- `INSTALLMENT_FEE`
- `INTERNATIONAL_TRANSACTION_FEE`
- `LATE_PAYMENT_FEE`
- `MONTHLY_ACCOUNT_ANNIVERSARY_FEE`
- `PHYSICAL_CARD_REISSUE_FEE`
- `RETURN_PAYMENT_FEE`
- `VIRTUAL_CARD_REISSUE_FEE`

### `FeeTransferEventStatus`

Status of the Fee Transfer Event.

- `COMPLETE`
- `FAIL`
- `PENDING`

### `FinancialAccountActivitySign`

Whether the activity decreases or increases available cash or credit for
the account.

- `NEGATIVE`
- `POSITIVE`

### `FinancialAccountActivityType`

Financial Account Activity Types to return

- `ACCOUNT_HOLDER_FEE`
- `EXTERNALLY_INITIATED_ACH`
- `INTEGRATOR_INITIATED_ACH`
- `INTERNAL_TRANSFER`
- `PAYMENT_CARD`

### `FinancialAccountAttribute`

An Attribute of a `FinancialAccount`.

Account Attributes are used to signal specific capability restrictions and/or substatuses.

For more information on `FinancialAccountAttribute` please check the developer documentation.

- `ACCOUNT_TAKEOVER`
- `ACH_RISK_HOLD`
- `CHARGE_OFF`
- `CLOSED_WITH_BALANCE`
- `DELINQUENT`
- `DELINQUENT_SUSPENDED`
- `IDENTITY_THEFT`
- `OFAC_WARNING`
- `PENDING_CLOSURE`
- `PROGRAM_OWNER_INITIATED_SUSPENSION`
- `SUSPECTED_FRAUD`

### `FinancialAccountAttributeReason`

The reason for a `FinancialAccountAttribute`.

- `PROGRAM_OWNER_INITIATED_SUSPENSION_REASON_ACCOUNT_HOLDER_REQUEST`
- `PROGRAM_OWNER_INITIATED_SUSPENSION_REASON_ACCOUNT_REVIEW`
- `PROGRAM_OWNER_INITIATED_SUSPENSION_REASON_ACH_RETURNS`
- `PROGRAM_OWNER_INITIATED_SUSPENSION_REASON_DELINQUENCY`
- `PROGRAM_OWNER_INITIATED_SUSPENSION_REASON_LOST_OR_STOLEN_CARD`
- `PROGRAM_OWNER_INITIATED_SUSPENSION_REASON_SUSPECTED_FRAUD`
- `PROGRAM_OWNER_INITIATED_SUSPENSION_REASON_UNSPECIFIED`

### `FinancialAccountBalanceSearchField`

The available fields that are available to search on.

- `AVAILABLE_CASH_LEDGER_BALANCE`
- `AVAILABLE_CREDIT_LEDGER_BALANCE`
- `CARD_PRODUCT_ID`
- `CASH_LEDGER_BALANCE`
- `CREDIT_OUTSTANDING_LEDGER_BALANCE`
- `FINANCIAL_ACCOUNT_CREATED_AT`
- `FINANCIAL_ACCOUNT_ID`
- `FINANCIAL_ACCOUNT_OWNER_ID`
- `OUTSTANDING_BALANCE_PAYABLE_LEDGER_BALANCE`
- `OUTSTANDING_BALANCE_RECEIVABLE_LEDGER_BALANCE`

### `FinancialAccountClosureReason`

The possible reasons for closure of a `FinancialAccount`.

- `ACCOUNT_HOLDER_REQUEST`
- `BANKRUPTCY`
- `CHARGE_OFF`
- `DECEASED`
- `INACTIVITY`
- `LOST_OR_STOLEN_CARD`
- `PROHIBITED_BUSINESS_TYPE`
- `SECURITY_CONCERN`
- `UNUSUAL_ACTIVITY`

### `FinancialAccountCreditLimitUpdateFromProductFundingStatus`

The states of a FinancialAccountCreditLimitUpdateFromProductFunding.

- `COMPLETED`
- `FAILED`
- `PENDING`
- `PROCESSING`

### `FinancialAccountCreditLimitUpdateFromProductFundingStatusReasonCode`

The reasons a FinancialAccountCreditLimitUpdateFromProductFunding could fail.

- `ACCOUNT_CLOSED`
- `ACCOUNT_NOT_FOUND`
- `INSUFFICIENT_FUNDS`
- `LIMIT_AMOUNT_EXCEEDING_MAX_PROGRAM_LOAD_LIMIT`
- `NOT_ENOUGH_BALANCE_TO_REDUCE_CREDIT_LIMIT`
- `TRANSFER_AMOUNT_EXCEEDING_MAX_AGGREGATE_CREDIT_DISTRIBUTION_AMOUNT`

### `FinancialAccountDelinquencyState`

`FinancialAccount` delinquency state.

- `CLOSED`
- `CLOSING`
- `CURRENT`
- `DELINQUENT`

### `FinancialAccountFeatureType`

Possible features of the Financial Accounts

- `AUTHORIZED_USER`
- `CARD_FUNDING_ACCOUNT`
- `CREDIT_PAYMENT_CARD`
- `DEBIT_PAYMENT_CARD`
- `DIRECT_DEPOSIT`
- `INCOME_ACCOUNT`
- `JUST_IN_TIME_FUNDING`
- `MERCHANT_SETTLEMENT`
- `NEGATIVE_BALANCE_RESERVE`
- `ON_DEMAND_FUNDING`
- `PAYROLL_ADVANCE`
- `PAYROLL_EMPLOYER_ADVANCE`
- `POINT_REWARDS`
- `PREPAID_PAYMENT_CARD`
- `PREPRINTED_CARD`
- `PRODUCT_FUNDING`
- `PRODUCT_RESERVE`
- `PRODUCT_SECURED_DEPOSIT`
- `REPAYMENT_ACCOUNT`
- `RESET_BALANCE`
- `SECURED_CREDIT_PAYMENT_CARD`
- `SECURED_DEPOSIT`
- `SUSPENSE`

### `FinancialAccountPseudoBalanceUpdateStatus`

An enum used to represent the status of the pseudo balance update request.

- `COMPLETED`
- `FAILED`
- `PENDING`

### `FinancialAccountPseudoBalanceUpdateStatusReason`

An enum used to represent the failure reasons for the pseudo balance update request.

- `ACCOUNT_CLOSED`
- `ACCOUNT_NOT_FOUND`

### `FinancialAccountStatus`

The status of a `FinancialAccount`.

Depending on the `CardProduct` and `FinancialAccountFeature` of this account there may be restrictions placed on the account when the status is anything other than `ACTIVE`.

For more information on `FinancialAccountStatuses` please check the developer documentation.

- `ACTIVE`
- `CLOSED`
- `PENDING_CLOSURE`
- `SUSPENDED`
- `UNDER_REVIEW`

### `FinancialAccountSuspensionReasonInput`

The reason input for suspending a `FinancialAccount`.

- `ACCOUNT_HOLDER_REQUEST`
- `ACCOUNT_REVIEW`
- `ACH_RETURNS`
- `DELINQUENCY`
- `LOST_OR_STOLEN_CARD`
- `SUSPECTED_FRAUD`

### `FinancialEventType`

The possible values of a financial event's name.

- `ADJUST_FEE`
- `ADJUST_SETTLEMENT_AMOUNT`
- `ADJUST_TRANSACTION_AMOUNT`
- `AUTHORIZATION`
- `AUTHORIZATION_AND_CLEAR_EVENT`
- `AUTHORIZATION_EVENT`
- `AUTHORIZE`
- `AUTHORIZE_AND_CLEAR`
- `CLEAR`
- `CLEARING`
- `CLEARING_EVENT`
- `CREDIT_CARD_TRANSFER`
- `CREDIT_CARD_TRANSFER_EVENT`
- `CREDIT_FUNDS_ACH_TRANSFER`
- `CREDIT_FUNDS_ACH_TRANSFER_EVENT`
- `DEBIT_FUNDS_ACH_TRANSFER`
- `DEBIT_FUNDS_ACH_TRANSFER_EVENT`
- `DISBURSEMENT_TRANSFER`
- `DISBURSEMENT_TRANSFER_EVENT`
- `EFT`
- `EXTERNAL_MONEY_MOVEMENT`
- `EXTERNAL_MONEY_MOVEMENT_TRANSACTION_EVENT`
- `EXTERNALLY_INITIATED_ACH_RELEASE_HOLD_TRANSFER`
- `FEE_TRANSFER`
- `FEE_TRANSFER_EVENT`
- `FINANCIAL_ACCOUNT_CREDIT_LIMIT_UPDATE_FROM_PRODUCT_FUNDING`
- `FINANCIAL_ACCOUNT_PSEUDO_BALANCE_UPDATE`
- `INSTANT_NETWORK_TRANSFER`
- `INTEGRATOR_INITIATED_FUNDS_DEPOSIT_ACH_TRANSFER`
- `INTEGRATOR_INITIATED_FUNDS_DEPOSIT_ACH_TRANSFER_EVENT`
- `INTEGRATOR_INITIATED_FUNDS_WITHDRAWAL_ACH_TRANSFER`
- `INTEGRATOR_INITIATED_FUNDS_WITHDRAWAL_ACH_TRANSFER_EVENT`
- `INTER_FINANCIAL_ACCOUNT_TRANSFER`
- `INTER_FINANCIAL_ACCOUNT_TRANSFER_EVENT`
- `ISSUER_PRELIMINARY_AUTHORIZATION`
- `ISSUER_PRELIMINARY_AUTHORIZATION_EVENT`
- `MANUAL_ADJUSTMENT_EVENT`
- `MANUAL_RECONCILE`
- `PAYROLL_ACH_TRANSFER`
- `PAYROLL_ACH_TRANSFER_EVENT`
- `PAYROLL_ADVANCE_REPAYMENT_TRANSFER`
- `PAYROLL_ADVANCE_WRITEOFF_TRANSFER`
- `RECONCILIATION_ACCOUNT_TRANSFER`
- `REVERSAL_EVENT`
- `REVERSE`
- `REWARD_POINTS_TRANSFER`
- `SECURE_CARD_BALANCE_REPAYMENT_ACH_TRANSFER`
- `SECURE_CARD_BALANCE_REPAYMENT_ACH_TRANSFER_EVENT`
- `SECURE_DEPOSIT_ACH_TRANSFER`
- `SECURE_DEPOSIT_ACH_TRANSFER_EVENT`
- `SECURE_DEPOSIT_TRANSFER`
- `SECURE_DEPOSIT_TRANSFER_EVENT`
- `TRANSFER`
- `WIRE_TRANSFER`

### `FinicityProductType`

A specific product type represented by an api endpoint.

- `ACH_DETAILS`
- `ACH_OWNER_DETAILS`
- `APPROXIMATE_BALANCE`
- `CURRENT_BALANCE`

### `FormFactorType`

Type of form factor

- `PHYSICAL_CARD`
- `WRISTBAND`

### `GenerateFinancialAccountSingleUseClientTokenPermission`

Permissions for `generateFinancialAccountSingleUseClientToken`

- `ISSUE_PAYMENT_CARD`

### `GeneratePaymentMethodTokenizationClientTokenPermission`

Permissions for generating a `PaymentMethodTokenizationClientToken`.

- `TOKENIZE_PAYMENT_METHOD`

### `GlobalNoteAggregateEntityType`

The allowable aggregate entities for creating a `GlobalNote`.

- `ACCOUNT_HOLDER`

### `GlobalNotePrimaryEntityType`

The allowable primary entities for creating a `GlobalNote`.

- `ACCOUNT_HOLDER_CARD_PRODUCT_APPLICATION`
- `FINANCIAL_ACCOUNT`

### `IdentityRiskLevel`

The identity risk level

- `HIGH`
- `LOW`
- `MEDIUM`
- `MEDIUM_LOW`
- `VERY_HIGH`

### `IdentityTaskGroupReviewCategory`

All possible categories for an `IdentityTaskGroupReview` to be created.

- `ENHANCED_DUE_DILIGENCE`

### `IdentityVerificationDocumentRequestReason`

Reasons for which identity verification documents may be requested.

- `ACCOUNT_HOLDER_UPDATE`
- `CIP_VERIFICATION`

### `InitiateSecureDepositClientTokenPermission`

Permissions for a `SecureDeposit` Client Token

- `INITIATE_SECURE_DEPOSIT`

### `InstallmentAgreementStatus`

Possible status values for an `InstallmentAgreement`

- `CHARGED_OFF`
- `OPEN`
- `PAID_OFF`
- `REVERSED`

### `InstallmentFrequency`

The frequency at which installment payments occur.

- `MONTHLY`

### `InstantNetworkTransferDestinationPaymentInstrumentCapabilityStatus`

The possible statuses of the `InstantNetworkTransferDestinationPaymentInstrumentCapabilityStatus`

- `DISABLED`
- `ENABLED`
- `REQUIRES_REVIEW`

### `InstantNetworkTransferEventType`

Possible types of events that have happened on `InstantNetworkTransfer`.

- `AUTHORIZE_PULL_PAYMENT_FUND`
- `AUTHORIZE_PUSH_PAYMENT_FUND`
- `CLEAR_PULL_PAYMENT_FUND`
- `CLEAR_PUSH_PAYMENT_FUND`
- `COMPLIANCE_REVIEW`
- `INITIAL_REQUEST`
- `PULL_PAYMENT`
- `PUSH_PAYMENT`
- `REVERSE_PULL_PAYMENT_FUND`
- `REVERSE_PUSH_PAYMENT_FUND`

### `InstantNetworkTransferFailureReason`

Reasons an `InstantNetworkTransfer` may have failed.

- `ACCOUNT_CLOSED`
- `ACCOUNT_NOT_ACTIVE`
- `ACCOUNT_NOT_FOUND`
- `ACCOUNT_NOT_PROVIDED`
- `ACCOUNTS_DO_NOT_BELONG_TO_SAME_PRODUCT`
- `ACH_LOAD_NOT_ALLOWED_BY_PROGRAM`
- `ANI_VERIFICATION_FAILED`
- `BAD_CVC3_DCVV`
- `BAD_CVV`
- `BAD_CVV2`
- `BANK_MANAGED_BETA_ACCOUNT_FEATURE_NOT_ENABLED`
- `BLOCKED_CARD`
- `CARD_FUNDING_FEATURE_NOT_ENABLED`
- `CASH_BACK_LIMIT_EXCEEDED`
- `CASH_FUND_OUT_NOT_SUPPORTED_ON_PRODUCT`
- `CHARGE_OFF_EXCEEDS_BALANCE`
- `CHECK_CAPABLE_ACCOUNT_FEATURE_NOT_ENABLED`
- `CHECK_PAYMENT_NOT_SUPPORTED_ON_PRODUCT`
- `CHIP_CARD_ARQC_VALIDATION_FAILURE`
- `COMMERCIAL_CREDIT_PAY_IN_FULL_FEATURE_NOT_ENABLED`
- `COMPLIANCE_VERIFICATION_FAILED`
- `CORPORATE_BANK_ACCOUNT_FEATURE_NOT_ENABLED`
- `CREDIT_CARD_FEATURE_NOT_ENABLED`
- `CREDIT_LIMIT_NOT_SET_ON_ACCOUNT`
- `CRYPTO_FUNDING_ACCOUNT_FEATURE_NOT_ENABLED`
- `CRYPTO_RECEIVING_ACCOUNT_FEATURE_NOT_ENABLED`
- `CURRENCY_MISMATCH`
- `DDA_FEATURE_NOT_ENABLED`
- `DEBIT_CARD_FEATURE_NOT_ENABLED`
- `DISPUTE_CHARGEBACK_NOT_ENABLED`
- `DISPUTE_CHARGEBACK_PROVISIONAL_CREDIT_NOT_ENABLED`
- `DO_NOT_HONOR`
- `EXCEEDS_APPROVAL_AMOUNT_LIMIT`
- `EXCEEDS_WITHDRAWAL_FREQUENCY_LIMIT`
- `EXPIRED_CARD`
- `EXTERNAL_MONEY_MOVEMENT_NOT_SUPPORTED_ON_PRODUCT`
- `FLEET_FEATURE_NOT_ENABLED`
- `FUNDING_ACCOUNT_FEATURE_NOT_ENABLED`
- `FUNDING_CARD_NOT_SUPPORTED`
- `HIGHNOTE_ACCOUNT_FEATURE_NOT_ENABLED`
- `IDEMPOTENCY_KEY_NOT_PROVIDED`
- `INSUFFICIENT_FUNDS`
- `INTER_FINANCIAL_ACCOUNT_TRANSFER_RULES_NOT_PASSED`
- `INTERNAL_SERVER_ERROR`
- `INVALID_AUTHORIZATION_EXPIRATION`
- `INVALID_CARD_NUMBER`
- `INVALID_DISBURSEMENT_AMOUNT`
- `INVALID_MERCHANT`
- `INVALID_TRACK_DATA`
- `INVALID_TRANSACTION`
- `JIT_FEATURE_NOT_ENABLED`
- `MERCHANT_FUNDING_FEATURE_NOT_ENABLED`
- `MERCHANT_SETTLEMENT_FEATURE_NOT_ENABLED`
- `NOT_AN_ORGANIZATION_OWNED_ACCOUNT`
- `NOT_ENOUGH_BALANCE_TO_REDUCE_CREDIT_LIMIT`
- `ODF_FEATURE_NOT_ENABLED`
- `ORGANIZATION_ID_NOT_PROVIDED`
- `ORIGINATED_ACH_UNLOAD_NOT_SUPPORTED_ON_PRODUCT`
- `PARTIAL_FUNDING_FEATURE_NOT_ENABLED`
- `PAYROLL_ADVANCE_FEATURE_NOT_ENABLED`
- `PAYROLL_EMPLOYER_ADVANCE_FEATURE_NOT_ENABLED`
- `PRE_AUTHORIZATION_EXPIRED`
- `PREPAID_CARD_FEATURE_NOT_ENABLED`
- `PRODUCT_FUNDING_FEATURE_NOT_ENABLED`
- `PRODUCT_SECURED_DEPOSIT_ACCOUNT_FEATURE_NOT_ENABLED`
- `PSEUDO_BALANCE_NOT_ENABLED`
- `PULL_PAYMENT_FAILED`
- `PULL_PAYMENT_FEE_STRUCTURE_NOT_SUPPORTED`
- `PUSH_PAYMENT_FAILED`
- `PUSH_PAYMENT_FEE_STRUCTURE_NOT_SUPPORTED`
- `RE_ENTER_TRANSACTION`
- `RECEIVABLE_PURCHASE_NOT_ENABLED`
- `REPAYMENT_ACCOUNT_NOT_PRESENT_ON_PRODUCT`
- `RESTRICTED_LOCATION`
- `REWARD_POINT_FEATURE_NOT_ENABLED`
- `RISK_DECLINE`
- `SECURE_CARD_FEATURE_NOT_ENABLED`
- `SECURED_DEPOSIT_ACCOUNT_FEATURE_NOT_ENABLED`
- `SPECIAL_CONDITION_NO_PICK_UP`
- `SUSPENDED_CARD`
- `TENANT_ID_NOT_PROVIDED`
- `TERMINATED_CARD`
- `TRANSACTION_ID_NOT_PROVIDED`
- `TRANSACTION_NOT_PERMITTED`
- `TRANSFER_AMOUNT_BELOW_MIN_PROGRAM_RELOAD_LIMIT`
- `TRANSFER_AMOUNT_EXCEEDING_MAX_AGGREGATE_CREDIT_DISTRIBUTION_AMOUNT`
- `TRANSFER_AMOUNT_EXCEEDING_MAX_PROGRAM_CARD_BALANCE`
- `TRANSFER_AMOUNT_EXCEEDING_MAX_PROGRAM_LOAD_LIMIT`
- `TRANSFER_AMOUNT_EXCEEDING_MAX_PROGRAM_RELOAD_LIMIT`
- `TRANSFER_AMOUNT_IS_NEGATIVE_OR_ZERO`
- `TRANSFER_BETWEEN_PRODUCTS_NOT_ALLOWED`
- `TRANSFER_CONDITION_SAME_PRIMARY_ACCOUNT_HOLDER_NOT_SATISFIED`
- `TRANSFER_NOT_SUPPORTED`
- `TRANSFER_NOT_SUPPORTED_ON_PRODUCT`
- `TRANSFER_ORCHESTRATION_ID_NOT_PROVIDED`
- `UNACTIVATED_CARD`
- `VALID_ACCOUNT_AMOUNT_NOT_SUPPORTED`

### `InstantNetworkTransferSourcePaymentInstrumentCapabilityStatus`

The possible statuses of the `InstantNetworkTransferSourcePaymentInstrumentCapabilityStatus`

- `DISABLED`
- `ENABLED`
- `REQUIRES_REVIEW`

### `InstantNetworkTransferStatus`

The status of a `InstantNetworkTransfer`.

- `COMPLETED`
- `FAILED`
- `PENDING`

### `InstantSettlementTransactionEventType`

The type of event on an `InstantSettlementTransaction`.

- `ACH`
- `FEE_VARIANCE_TRANSFER`

### `InstantSettlementTransactionStatus`

The status of an `InstantSettlementTransaction`.

- `COMPLETED`
- `FAILED`
- `PENDING`

### `IntegrationEnvironment`

The different environments available on the Highnote platform.

- `LIVE`
- `TEST`

### `IntegratorInitiatedAchHoldStatus`

Hold status of an ACH integrator initiated transaction

- `HOLD_REMOVED`
- `NO_HOLDS`
- `ON_HOLD`
- `UNSPECIFIED`

### `IntegratorInitiatedAchStatus`

Status of an integrator initiated ACH transfer that has been generated by Highnote.

- `CANCELED`
- `FAILED`
- `INITIATED`
- `PROCESSED`
- `PROCESSING`
- `RETURNED`

### `IntegratorInitiatedAchStatusReasonCode`

Additional details regarding a FAILED or RETURNED transfer.

- `ACCOUNT_FROZEN`
- `ACCOUNTS_DO_NOT_BELONG_TO_SAME_PRODUCT`
- `ACH_LOAD_NOT_SUPPORTED`
- `AMOUNT_FIELD_ERROR`
- `AUTHORIZATION_REVOKED_BY_CUSTOMER`
- `COMMERCIAL_CREDIT_PAY_IN_FULL_FEATURE_NOT_ENABLED`
- `CORPORATE_BANK_ACCOUNT_FEATURE_NOT_ENABLED`
- `CREDIT_LIMIT_NOT_SET_ON_ACCOUNT`
- `CURRENCY_MISMATCH_WITH_HIGHNOTE_ACCOUNT`
- `DUPLICATE_ENTRY`
- `ENTRY_NOT_IN_ACCORDANCE_WITH_TERMS_OF_AUTHORIZATION`
- `EXTERNAL_ACCOUNT_CLOSED`
- `EXTERNAL_ACCOUNT_NOT_FOUND`
- `HIGHNOTE_ACCOUNT_CLOSED`
- `HIGHNOTE_ACCOUNT_NOT_FOUND`
- `IMPROPER_EFFECTIVE_ENTRY_DATE`
- `INSUFFICIENT_FUNDS_IN_EXTERNAL_ACCOUNT`
- `INSUFFICIENT_FUNDS_IN_HIGHNOTE_ACCOUNT`
- `INTERNAL_ERROR`
- `INVALID_ACCOUNT_NUMBER`
- `INVALID_COMPANY_ID_NUMBER`
- `INVALID_INDIVIDUAL_ID_NUMBER`
- `NON_TRANSACTION_ACCOUNT`
- `PAYMENT_STOPPED`
- `PAYROLL_ADVANCE_FEATURE_NOT_ENABLED`
- `PAYROLL_EMPLOYER_ADVANCE_FEATURE_NOT_ENABLED`
- `RETURNED_PER_ODFI_REQUEST`
- `SECURE_CARD_FEATURE_NOT_ENABLED`
- `TRANSACTION_NOT_AUTHORIZED_BY_ACCOUNT_HOLDER`
- `TRANSFER_AMOUNT_BELOW_MIN_RELOAD_LIMIT`
- `TRANSFER_AMOUNT_EXCEEDING_MAX_LOAD_LIMIT`
- `TRANSFER_AMOUNT_EXCEEDING_MAX_RELOAD_LIMIT`
- `UNAUTHORIZED_CONSUMER_DEBIT_USING_CORPORATE_SEC_CODE`
- `UNAUTHORIZED_IMPROPER_INELIGIBLE_OR_INCOMPLETE_TRANSACTION`
- `UNCOLLECTED_FUNDS`

### `IntegratorInitiatedTransferType`

Transaction Type of an integrator initiated ACH transfer.

- `FUNDS_DEPOSIT`
- `FUNDS_WITHDRAWAL`
- `REPAYMENT`
- `SECURE_DEPOSIT`

### `InterestAccrualMethod`

The date used to calculate interest accrual. For example, `TRANSACTION_POST_DATE`, `FIRST_DAY_OF_BILLING_PERIOD`, or `PAYMENT_DUE_DATE`.

- `FIRST_DAY_OF_BILLING_PERIOD`
- `PAYMENT_DUE_DATE`
- `TRANSACTION_POST_DATE`

### `InterestAccrualType`

Whether interest accrues using a `SIMPLE` or `COMPOUND` formula.

- `COMPOUND`
- `SIMPLE`

### `InterestAssessmentSchedule`

Whether interest is assessed `DAILY` or on the `STATEMENT` cycle close date.

- `DAILY`
- `STATEMENT`

### `InterestRateIndex`

The index used for interest rate calculation. For example, `PRIME`.

- `LIBOR`
- `PRIME`

### `InterestRateType`

Whether the interest rate is fixed or variable.

- `FIXED`
- `VARIABLE`

### `InterFinancialAccountTransferAccountType`

The subject account type to which the inter financial account transfer rule applies.

- `SOURCE`

### `InterFinancialAccountTransferActivityType`

The type of activity associated with the InterFinancialAccountTransfer.

- `ACCOUNT_PAYROLL_ADVANCE`
- `ACCOUNT_PAYROLL_ADVANCE_REPAYMENT`
- `ADJUSTMENT`
- `CASH_REDEEM_REWARD_POINTS`
- `CASH_REDEEM_REWARD_POINTS_REVERSAL`
- `CHARGE_OFF`
- `CHARGEBACK_LOSS`
- `CHARGEBACK_PROVISIONAL_CREDIT`
- `CHARGEBACK_WIN`
- `CHARGEBACK_WIN_WITHOUT_PROVISIONAL_CREDIT`
- `CLOSE_LINE_OF_CREDIT`
- `CUSTOMER_FEE`
- `DECREASE_PSEUDO_BALANCE`
- `DECREASE_PSEUDO_LIMIT`
- `DISPUTE_ADJUSTMENT_ISSUER_LIABLE`
- `DISPUTE_ADJUSTMENT_REVERSAL`
- `DISPUTE_CREDIT`
- `DISPUTE_WON_CHARGEBACK_LOSS_ISSUER_LIABLE`
- `EARNED_CREDIT`
- `EARNED_CREDIT_REVERSAL`
- `GENERAL`
- `GENERAL_ADJUSTMENT`
- `GOODS_AND_SERVICES`
- `INCREASE_PSEUDO_BALANCE`
- `INCREASE_PSEUDO_LIMIT`
- `INTERCHANGE_SWEEP`
- `INTRA_COMPANY`
- `ISSUER_BALANCE_MIGRATION`
- `LOAD_PAYMENT_CARD_ACCOUNT`
- `MERCHANT_PAYOUT`
- `PAYOUT`
- `PAYROLL`
- `PAYROLL_ADVANCE`
- `PAYROLL_ADVANCE_CHARGE_OFF`
- `PAYROLL_ADVANCE_REPAYMENT`
- `PAYROLL_ADVANCE_REPAYMENT_REVERSAL`
- `PAYROLL_ADVANCE_REVERSAL`
- `PAYROLL_DEPOSIT`
- `PAYROLL_REVERSAL`
- `PEER_TO_PEER`
- `PEER_TO_PEER_REVERSAL`
- `PREFUNDED_ADVANCE`
- `PREFUNDED_ADVANCE_REPAYMENT`
- `RECEIVABLE_PURCHASE`
- `RECEIVABLE_PURCHASE_INTEREST`
- `RECEIVABLE_PURCHASE_INTEREST_REVERSAL`
- `RECEIVABLE_PURCHASE_REVERSAL`
- `RECOVER_SECURED_DEPOSIT`
- `REPAYMENT`
- `REPAYMENT_ADJUSTMENT`
- `REPAYMENT_REVERSAL`
- `RESET_PSEUDO_BALANCE`
- `REWARD`
- `REWARD_REVERSAL`
- `SECURED_DEPOSIT`
- `SECURED_DEPOSIT_REVERSAL`
- `SET_LIMIT`
- `SET_PSEUDO_BALANCE`
- `SET_PSEUDO_LIMIT`
- `TIP_DISBURSEMENT`
- `TIP_DISBURSEMENT_REVERSAL`

### `InterFinancialAccountTransferRuleResultStatus`

A enum of `InterFinancialAccountTransferRuleResult` statuses

- `EXCEPTION`
- `FAILED`
- `NO_DECISION`
- `NOT_RAN`
- `OVERRIDDEN_TO_PASS`
- `PASSED`
- `WARNING`

### `InterFinancialAccountTransferStatus`

The states of a InterFinancialAccountTransfer.

- `COMPLETED`
- `FAILED`
- `PENDING`
- `PROCESSING`

### `InterFinancialAccountTransferStatusReasonCode`

The reasons a InterFinancialAccountTransfer could fail.

- `ACCOUNT_CLOSED`
- `ACCOUNT_HOLDER_IS_NOT_AN_ORGANIZATION`
- `ACCOUNT_NOT_ACTIVE`
- `ACCOUNT_NOT_FOUND`
- `ACCOUNT_NOT_PROVIDED`
- `ACCOUNTS_DO_NOT_BELONG_TO_SAME_PRODUCT`
- `ACH_LOAD_NOT_ALLOWED_BY_PRODUCT`
- `BANK_MANAGED_BETA_ACCOUNT_FEATURE_NOT_ENABLED`
- `CASH_FUND_OUT_NOT_SUPPORTED_ON_PRODUCT`
- `CHARGE_OFF_EXCEEDS_BALANCE`
- `CHECK_CAPABLE_ACCOUNT_FEATURE_NOT_ENABLED`
- `CHECK_PAYMENT_NOT_SUPPORTED_ON_PRODUCT`
- `COMMERCIAL_CREDIT_PAY_IN_FULL_FEATURE_NOT_ENABLED`
- `CORPORATE_BANK_ACCOUNT_FEATURE_NOT_ENABLED`
- `CREDIT_CARD_FEATURE_NOT_ENABLED`
- `CREDIT_LIMIT_NOT_SET_ON_ACCOUNT`
- `CURRENCY_MISMATCH`
- `DDA_FEATURE_NOT_ENABLED`
- `DEBIT_CARD_FEATURE_NOT_ENABLED`
- `DISPUTE_CHARGEBACK_NOT_ENABLED`
- `DISPUTE_CHARGEBACK_PROVISIONAL_CREDIT_NOT_ENABLED`
- `EXTERNAL_MONEY_MOVEMENT_NOT_SUPPORTED_ON_PRODUCT`
- `FLEET_FEATURE_NOT_ENABLED`
- `FUNDING_ACCOUNT_FEATURE_NOT_ENABLED`
- `FUNDING_CARD_NOT_SUPPORTED`
- `HIGHNOTE_ACCOUNT_FEATURE_NOT_ENABLED`
- `IDEMPOTENCY_KEY_NOT_PROVIDED`
- `INSUFFICIENT_FUNDS`
- `INTER_FINANCIAL_ACCOUNT_TRANSFER_RULES_NOT_PASSED`
- `INTERNAL_SERVER_ERROR`
- `INVALID_DISBURSEMENT_AMOUNT`
- `ISSUER_MIGRATION_CANNOT_SET_CASH_BALANCE_LESS_THAN_AVAILABLE_CASH`
- `JIT_FEATURE_NOT_ENABLED`
- `LIMIT_AMOUNT_EXCEEDING_MAX_PROGRAM_LOAD_LIMIT`
- `MERCHANT_FUNDING_FEATURE_NOT_ENABLED`
- `MERCHANT_SETTLEMENT_FEATURE_NOT_ENABLED`
- `NOT_ENOUGH_BALANCE_TO_REDUCE_CREDIT_LIMIT`
- `ODF_FEATURE_NOT_ENABLED`
- `ORGANIZATION_ID_NOT_PROVIDED`
- `ORIGINATED_ACH_UNLOAD_NOT_SUPPORTED_ON_PRODUCT`
- `PARTIAL_FUNDING_FEATURE_NOT_ENABLED`
- `PAYROLL_ADVANCE_FEATURE_NOT_ENABLED`
- `PAYROLL_EMPLOYER_ADVANCE_FEATURE_NOT_ENABLED`
- `PREPAID_CARD_OR_DEBIT_CARD_FEATURE_NOT_ENABLED`
- `PRODUCT_FUNDING_OR_CARD_FUNDING_FEATURE_NOT_ENABLED`
- `PRODUCT_SECURED_DEPOSIT_ACCOUNT_FEATURE_NOT_ENABLED`
- `PSEUDO_BALANCE_NOT_ENABLED`
- `RECEIVABLE_PURCHASE_NOT_ENABLED`
- `REPAYMENT_ACCOUNT_NOT_PRESENT_ON_PRODUCT`
- `REWARD_POINT_FEATURE_NOT_ENABLED`
- `SECURE_CARD_FEATURE_NOT_ENABLED`
- `SECURED_DEPOSIT_ACCOUNT_FEATURE_NOT_ENABLED`
- `TENANT_ID_NOT_PROVIDED`
- `TRANSACTION_ID_NOT_PROVIDED`
- `TRANSFER_AMOUNT_BELOW_MIN_PRODUCT_RELOAD_LIMIT`
- `TRANSFER_AMOUNT_EXCEEDING_MAX_AGGREGATE_CREDIT_DISTRIBUTION_AMOUNT`
- `TRANSFER_AMOUNT_EXCEEDING_MAX_PRODUCT_CARD_BALANCE`
- `TRANSFER_AMOUNT_EXCEEDING_MAX_PRODUCT_RELOAD_LIMIT`
- `TRANSFER_AMOUNT_IS_NEGATIVE`
- `TRANSFER_AMOUNT_IS_NEGATIVE_OR_ZERO`
- `TRANSFER_BETWEEN_PRODUCTS_NOT_ALLOWED`
- `TRANSFER_CONDITION_SAME_PRIMARY_ACCOUNT_HOLDER_NOT_SATISFIED`
- `TRANSFER_NOT_SUPPORTED_ON_PRODUCT`
- `TRANSFER_ORCHESTRATION_ID_NOT_PROVIDED`

### `Iso3166Alpha3Country`

The three character alpha codes for support countries.

See [ISO 3166](https://www.iso.org/iso-3166-country-codes.html)

- `ABW`
- `AFG`
- `AGO`
- `AIA`
- `ALA`
- `ALB`
- `AND`
- `ARE`
- `ARG`
- `ARM`
- `ASM`
- `ATA`
- `ATF`
- `ATG`
- `AUS`
- `AUT`
- `AZE`
- `BDI`
- `BEL`
- `BEN`
- `BES`
- `BFA`
- `BGD`
- `BGR`
- `BHR`
- `BHS`
- `BIH`
- `BLM`
- `BLR`
- `BLZ`
- `BMU`
- `BOL`
- `BRA`
- `BRB`
- `BRN`
- `BTN`
- `BVT`
- `BWA`
- `CAF`
- `CAN`
- `CCK`
- `CHE`
- `CHL`
- `CHN`
- `CIV`
- `CMR`
- `COD`
- `COG`
- `COK`
- `COL`
- `COM`
- `CPV`
- `CRI`
- `CUB`
- `CUW`
- `CXR`
- `CYM`
- `CYP`
- `CZE`
- `DEU`
- `DJI`
- `DMA`
- `DNK`
- `DOM`
- `DZA`
- `ECU`
- `EGY`
- `ERI`
- `ESH`
- `ESP`
- `EST`
- `ETH`
- `FIN`
- `FJI`
- `FLK`
- `FRA`
- `FRO`
- `FSM`
- `GAB`
- `GBR`
- `GEO`
- `GGY`
- `GHA`
- `GIB`
- `GIN`
- `GLP`
- `GMB`
- `GNB`
- `GNQ`
- `GRC`
- `GRD`
- `GRL`
- `GTM`
- `GUF`
- `GUM`
- `GUY`
- `HKG`
- `HMD`
- `HND`
- `HRV`
- `HTI`
- `HUN`
- `IDN`
- `IMN`
- `IND`
- `IOT`
- `IRL`
- `IRN`
- `IRQ`
- `ISL`
- `ISR`
- `ITA`
- `JAM`
- `JEY`
- `JOR`
- `JPN`
- `KAZ`
- `KEN`
- `KGZ`
- `KHM`
- `KIR`
- `KNA`
- `KOR`
- `KWT`
- `LAO`
- `LBN`
- `LBR`
- `LBY`
- `LCA`
- `LIE`
- `LKA`
- `LSO`
- `LTU`
- `LUX`
- `LVA`
- `MAC`
- `MAF`
- `MAR`
- `MCO`
- `MDA`
- `MDG`
- `MDV`
- `MEX`
- `MHL`
- `MKD`
- `MLI`
- `MLT`
- `MMR`
- `MNE`
- `MNG`
- `MNP`
- `MOZ`
- `MRT`
- `MSR`
- `MTQ`
- `MUS`
- `MWI`
- `MYS`
- `MYT`
- `NAM`
- `NCL`
- `NER`
- `NFK`
- `NGA`
- `NIC`
- `NIU`
- `NLD`
- `NOR`
- `NPL`
- `NRU`
- `NZL`
- `OMN`
- `PAK`
- `PAN`
- `PCN`
- `PER`
- `PHL`
- `PLW`
- `PNG`
- `POL`
- `PRI`
- `PRK`
- `PRT`
- `PRY`
- `PSE`
- `PYF`
- `QAT`
- `QZZ`
- `REU`
- `ROU`
- `RUS`
- `RWA`
- `SAU`
- `SDN`
- `SEN`
- `SGP`
- `SGS`
- `SHN`
- `SJM`
- `SLB`
- `SLE`
- `SLV`
- `SMR`
- `SOM`
- `SPM`
- `SRB`
- `SSD`
- `STP`
- `SUR`
- `SVK`
- `SVN`
- `SWE`
- `SWZ`
- `SXM`
- `SYC`
- `SYR`
- `TCA`
- `TCD`
- `TGO`
- `THA`
- `TJK`
- `TKL`
- `TKM`
- `TLS`
- `TON`
- `TTO`
- `TUN`
- `TUR`
- `TUV`
- `TWN`
- `TZA`
- `UGA`
- `UKR`
- `UMI`
- `URY`
- `USA`
- `UZB`
- `VAT`
- `VCT`
- `VEN`
- `VGB`
- `VIR`
- `VNM`
- `VUT`
- `WLF`
- `WSM`
- `YEM`
- `ZAF`
- `ZMB`
- `ZWE`

### `Iso4217Alpha3CurrencyCode`

All currency codes for ISO4217.

- `ADP`
- `AED`
- `AFA`
- `AFN`
- `ALK`
- `ALL`
- `AMD`
- `ANG`
- `AOA`
- `AOK`
- `AON`
- `AOR`
- `ARA`
- `ARP`
- `ARS`
- `ARY`
- `ATS`
- `AUD`
- `AWG`
- `AYM`
- `AZM`
- `AZN`
- `BAD`
- `BAM`
- `BBD`
- `BDT`
- `BEC`
- `BEF`
- `BEL`
- `BGJ`
- `BGK`
- `BGL`
- `BGN`
- `BHD`
- `BIF`
- `BMD`
- `BND`
- `BOB`
- `BOP`
- `BOV`
- `BRB`
- `BRC`
- `BRE`
- `BRL`
- `BRN`
- `BRR`
- `BSD`
- `BTN`
- `BUK`
- `BWP`
- `BYB`
- `BYN`
- `BYR`
- `BZD`
- `CAD`
- `CDF`
- `CHC`
- `CHE`
- `CHF`
- `CHW`
- `CLF`
- `CLP`
- `CNY`
- `COP`
- `COU`
- `CRC`
- `CSD`
- `CSJ`
- `CSK`
- `CUC`
- `CUP`
- `CVE`
- `CYP`
- `CZK`
- `DDM`
- `DEM`
- `DJF`
- `DKK`
- `DOP`
- `DZD`
- `ECS`
- `ECV`
- `EEK`
- `EGP`
- `ERN`
- `ESA`
- `ESB`
- `ESP`
- `ETB`
- `EUR`
- `FIM`
- `FJD`
- `FKP`
- `FRF`
- `GBP`
- `GEK`
- `GEL`
- `GHC`
- `GHP`
- `GHS`
- `GIP`
- `GMD`
- `GNE`
- `GNF`
- `GNS`
- `GQE`
- `GRD`
- `GTQ`
- `GWE`
- `GWP`
- `GYD`
- `HKD`
- `HNL`
- `HRD`
- `HRK`
- `HTG`
- `HUF`
- `IDR`
- `IEP`
- `ILP`
- `ILR`
- `ILS`
- `INR`
- `IQD`
- `IRR`
- `ISJ`
- `ISK`
- `ITL`
- `JMD`
- `JOD`
- `JPY`
- `KES`
- `KGS`
- `KHR`
- `KMF`
- `KPW`
- `KRW`
- `KWD`
- `KYD`
- `KZT`
- `LAJ`
- `LAK`
- `LBP`
- `LKR`
- `LRD`
- `LSL`
- `LSM`
- `LTL`
- `LTT`
- `LUC`
- `LUF`
- `LUL`
- `LVL`
- `LVR`
- `LYD`
- `MAD`
- `MDL`
- `MGA`
- `MGF`
- `MKD`
- `MLF`
- `MMK`
- `MNT`
- `MOP`
- `MRO`
- `MRU`
- `MTL`
- `MTP`
- `MUR`
- `MVQ`
- `MVR`
- `MWK`
- `MXN`
- `MXP`
- `MXV`
- `MYR`
- `MZE`
- `MZM`
- `MZN`
- `NAD`
- `NGN`
- `NIC`
- `NIO`
- `NLG`
- `NOK`
- `NPR`
- `NZD`
- `OMR`
- `PAB`
- `PEH`
- `PEI`
- `PEN`
- `PES`
- `PGK`
- `PHP`
- `PKR`
- `PLN`
- `PLZ`
- `PTE`
- `PYG`
- `QAR`
- `RHD`
- `ROK`
- `ROL`
- `RON`
- `RSD`
- `RUB`
- `RUR`
- `RWF`
- `SAR`
- `SBD`
- `SCR`
- `SDD`
- `SDG`
- `SDP`
- `SEK`
- `SGD`
- `SHP`
- `SIT`
- `SKK`
- `SLL`
- `SOS`
- `SRD`
- `SRG`
- `SSP`
- `STD`
- `STN`
- `SUR`
- `SVC`
- `SYP`
- `SZL`
- `THB`
- `TJR`
- `TJS`
- `TMM`
- `TMT`
- `TND`
- `TOP`
- `TPE`
- `TRL`
- `TRY`
- `TTD`
- `TWD`
- `TZS`
- `UAH`
- `UAK`
- `UGS`
- `UGW`
- `UGX`
- `USD`
- `USN`
- `USS`
- `UYI`
- `UYN`
- `UYP`
- `UYU`
- `UYW`
- `UZS`
- `VEB`
- `VEF`
- `VES`
- `VNC`
- `VND`
- `VUV`
- `WST`
- `XAF`
- `XAG`
- `XAU`
- `XBA`
- `XBB`
- `XBC`
- `XBD`
- `XCD`
- `XDR`
- `XEU`
- `XFO`
- `XFU`
- `XOF`
- `XPD`
- `XPF`
- `XPT`
- `XRE`
- `XSU`
- `XTS`
- `XUA`
- `XXX`
- `YDD`
- `YER`
- `YUD`
- `YUM`
- `YUN`
- `ZAL`
- `ZAR`
- `ZMK`
- `ZMW`
- `ZRN`
- `ZRZ`
- `ZWC`
- `ZWD`
- `ZWL`
- `ZWN`
- `ZWR`

### `Iso4217Alpha3SupportedCurrency`

The supported currencies on the Highnote platform.

- `USD`

### `IsoStatus`

The lifecycle status of an `Iso`.

- `ACTIVE`
- `INACTIVE`

### `IssuePaymentCardForFinancialAccountResponseStatus`

The status of the `issuePaymentCardForFinancialAccountResponse` request.

- `FAILURE`
- `PROCESSING`
- `SUCCESS`
- `UNKNOWN`

### `LedgerName`

The possible values of a Ledger's name, based on the type of activity a ledger tracks.

- `ACCOUNT_CHARGE_OFF`
- `ACCOUNT_HOLDER_CREDIT_LIMIT`
- `ACCOUNT_HOLDER_PAYMENT_PAYABLE`
- `ACCOUNT_HOLDER_PAYMENT_RECEIVABLE`
- `ACCOUNT_HOLDER_PSEUDO_LIMIT`
- `ACCOUNT_HOLDER_SECURED_DEPOSIT`
- `ACCOUNT_RECEIVABLE_HOLD`
- `ACH_DEBIT_PAYABLE`
- `ACH_PENDING_SETTLEMENT`
- `ACH_PENDING_SETTLEMENT_OUT`
- `ACTIVITY`
- `ALLOCATED_CREDIT_LIMIT`
- `ALLOCATED_PSEUDO_LIMIT`
- `AUTHORIZATION`
- `AVAILABLE_CASH`
- `AVAILABLE_CREDIT`
- `CARD_PAYABLE`
- `CARD_RECEIVABLE`
- `CARD_TRANSACTION_CREDIT_HOLD`
- `CASH`
- `CASH_ADVANCE_OUTSTANDING`
- `CASH_ADVANCE_PAYABLE`
- `CASH_ADVANCE_PRINCIPAL`
- `CASH_ADVANCE_RECEIVABLE`
- `CASH_ADVANCE_REPAID`
- `CASH_EXPENSE`
- `CHARGE_OFF_EXPENSE`
- `CHECK_PAYABLE`
- `CHECK_PROCESSING`
- `CHECK_SETTLEMENT_DEPOSIT`
- `CLEARED`
- `CONTRA_EXTERNAL_FUNDING`
- `CREDIT_AUTHORIZATION`
- `CREDIT_HOLD`
- `CREDIT_OUTSTANDING`
- `CRYPTO_AVAILABLE_CASH`
- `CRYPTO_CASH`
- `CRYPTO_FUNDING_PAYABLE`
- `CRYPTO_PLATFORM_FEE_PAYABLE`
- `CUSTOMER_FEE_PAYABLE`
- `DEPOSIT_AUTHORIZATION`
- `DEPOSIT_HOLD`
- `DEPOSIT_RECEIVABLE`
- `DISBURSEMENT_CARRY_OVER_PAYABLE`
- `DISBURSEMENT_CARRY_OVER_RECEIVABLE`
- `DISPUTE_CREDIT`
- `DISPUTE_EXPENSE`
- `EXTERNAL_TRANSFER_PAYABLE`
- `FEE_AUTHORIZATION`
- `FEE_CLEARED`
- `FEE_PAYABLE`
- `FEE_RECEIVABLE`
- `FUND_IN_HOLD`
- `INTERCHANGE_FEE_PRECISION_ADJUSTMENT`
- `INTERCHANGE_REVENUE`
- `NETWORK_CREDIT_RECEIVABLE`
- `NETWORK_EXPENSE`
- `NETWORK_PAYABLE`
- `NETWORK_RECEIVABLE`
- `OUTSTANDING_BALANCE_PAYABLE`
- `OUTSTANDING_BALANCE_RECEIVABLE`
- `PAYMENT_CHARGEBACK_FEE_PAYABLE`
- `PAYMENT_INTERCHANGE_FEE_PAYABLE`
- `PAYMENT_NETWORK_FEE_PAYABLE`
- `PAYMENT_PAYOUT_PAYABLE`
- `PAYMENT_PLATFORM_FEE_PAYABLE`
- `PAYROLL_ADVANCE_PAYABLE`
- `PAYROLL_ADVANCE_RECEIVABLE`
- `PAYROLL_ADVANCE_WRITE_OFF`
- `PAYROLL_ADVANCE_WRITE_OFF_EXPENSE`
- `PENDING_PAYMENT_RECEIVABLE`
- `PREFUNDED_ADVANCE_PAYABLE`
- `PREFUNDED_ADVANCE_RECEIVABLE`
- `PROVISIONAL_CREDIT_PAYABLE`
- `PROVISIONAL_CREDIT_RECEIVABLE`
- `PSEUDO_AVAILABLE_CASH`
- `PSEUDO_AVAILABLE_CREDIT`
- `PSEUDO_CASH`
- `PSEUDO_CREDIT_OUTSTANDING`
- `PULL_PAYMENT_CREDIT_HOLD`
- `PULL_PAYMENT_FEE_PAYABLE`
- `PULL_PAYMENT_RECEIVABLE`
- `PUSH_PAYMENT_FEE_PAYABLE`
- `PUSH_PAYMENT_PAYABLE`
- `REDEEMABLE_REWARDS_POINTS`
- `REFUND_AUTHORIZATION`
- `REFUND_HOLD`
- `RESERVE`
- `REWARDS_POINTS`
- `RISK_HOLD`
- `RTP_DEBIT_PAYABLE`
- `RTP_PENDING_SETTLEMENT`
- `SECURED_DEPOSIT_COLLATERAL`
- `SECURED_DEPOSIT_PAYABLE`
- `SECURED_DEPOSIT_RECEIVABLE`
- `SELF_PAYOUT_SHORTAGE`
- `SELF_PAYOUT_SHORTAGE_EXPENSE`
- `SETTLEMENT_PAYABLE`
- `STATEMENT_DUE_PAYABLE`
- `STATEMENT_DUE_RECEIVABLE`
- `TRANSFER_PAYABLE`
- `TRANSFER_PENDING_SETTLEMENT`
- `TRANSFER_RECEIVABLE`
- `UNCOLLECTED_FUNDS`

### `ManualAdjustmentActivityType`

The activity type for a `ManualAdjustmentEvent`

- `ACCOUNT_CLOSURE_CREDIT_AVAILABLE_CREDIT_SETTLEMENT`
- `ACCOUNT_CLOSURE_CREDIT_CHARGE_OFF`
- `ACCOUNT_CLOSURE_SECURED_DEPOSIT_SETTLEMENT`
- `ADJUST_FEE`
- `CARD_TRANSACTION_ADJUSTMENT`
- `CHARGEBACK`
- `CHARGEBACK_CREATE_PROVISIONAL_CREDIT`
- `EWA_REPAYMENT`
- `GENERAL_ADJUSTMENT`
- `INTEREST_CHARGED_ADJUSTMENT`
- `NON_ORIGINATING_ACH_PAYROLL_LOAD`
- `NON_ORIGINATING_ACH_UNLOAD`
- `ORIGINATING_ACH_COMMERCIAL_SECURED_CREDIT_CARD_BALANCE_PAYMENT`
- `ORIGINATING_ACH_COMMERCIAL_SECURED_CREDIT_DEPOSIT`
- `ORIGINATING_ACH_COMMERCIAL_SECURED_CREDIT_DEPOSIT_REPAYMENT`
- `RECEIVABLE_PURCHASE`
- `RECEIVABLE_PURCHASE_INTEREST`
- `REPAYMENT_ADJUSTMENT`
- `RISK_HOLD_CREDIT`
- `WIRE_TRANSFER_ACCOUNT_LOAD`
- `WIRE_TRANSFER_ACCOUNT_UNLOAD`

### `MastercardAavResultCode`

Validation result for Mastercard's Accountholder Authentication Value.

- `AAV_FAILED_VALIDATION`
- `AAV_MISFORMATTED`
- `AAV_NOT_VALIDATED`
- `AAV_PASSED_VALIDATION`
- `INVALID_AAV`

### `MastercardFleetCreditOrDebitIndicator`

Mastercard Fleet credit or debit indicator

- `CREDIT`
- `DEBIT`

### `MastercardFleetFuelBrand`

Mastercard Fleet fuel brands

- `AAFES`
- `AMOCO`
- `AMOCO_CA`
- `ARCO`
- `ASDA`
- `ASHLAND`
- `BFL`
- `BP`
- `BP_MOBIL`
- `BURNAH`
- `BUTLER`
- `CANADIAN_TIRE`
- `CANADIAN_TURBO`
- `CASEYS`
- `CENEX`
- `CHEVRON`
- `CHEVRON_CA`
- `CIRCLE_K`
- `CITGO`
- `CLARK`
- `CONOCO`
- `CONOCO_CA`
- `CROWN_CENTRAL`
- `DIAMOND_SHAMROCK`
- `DISCOUNT_TIRE`
- `DOMO`
- `ELF`
- `ERICKSON`
- `ESSO_CA`
- `ESSO_EU`
- `EXXON`
- `EXXON_MOBIL`
- `FAMILY`
- `FAS`
- `FINA`
- `FINA_EU`
- `FKG`
- `FLARE`
- `FLYING_J`
- `GAS_AMERICA`
- `GATE`
- `GETTY`
- `GIANT_EAGLE`
- `GROWMARK`
- `GULF`
- `GULF_CA`
- `GULF_CHEVRON`
- `HANDY_WAY`
- `HERON`
- `HESS`
- `HOLIDAY`
- `HOME_DEPOT`
- `HUCKS`
- `HUSKY`
- `HYVEES`
- `IRVING`
- `IRVING_CA`
- `JET`
- `JSAINSBURY`
- `KROGER`
- `KUWAIT`
- `KWIK_FILL`
- `KWIK_TRIP`
- `LASSUS`
- `LOVES`
- `MAPCO`
- `MARATHON`
- `MAXOL`
- `MEINEKE`
- `MFA`
- `MOHAWK`
- `MORRISON`
- `MR_GAS`
- `MURCO`
- `MURPHY`
- `MURPHY_CA`
- `NEXCOM`
- `NORDSTROM`
- `OLCO`
- `PDQ`
- `PENNZOIL`
- `PETRO`
- `PETRO_T`
- `PETROCANADA`
- `PHILLIPS`
- `PILOT`
- `PIONEER`
- `PIONEER_EU`
- `PURE`
- `QUAKER_STATE`
- `QUARLES`
- `QUIK_TRIP`
- `RACETRAC`
- `RACEWAY`
- `REPSOL`
- `RUDY`
- `SAFEWAY`
- `SEVEN_ELEVEN`
- `SEVEN_ELEVEN_CA`
- `SHEETZ`
- `SHELL`
- `SHELL_CA`
- `SHELL_EU`
- `SINCLAIR`
- `SONIC`
- `SOUTHLAND`
- `SPAR`
- `SPEEDWAY`
- `SUN`
- `SUNOCO_CA`
- `TA`
- `TEMPO`
- `TESCO_EU`
- `TESORO_AK`
- `TEXACO`
- `TEXACO_EU`
- `THE_PANTRY`
- `THORNTON`
- `TOSCO`
- `TOTAL`
- `UK`
- `ULTRAMAR`
- `UNBRANDED`
- `UNION_76`
- `UNITED_DAIRY`
- `US_OIL`
- `USA_PETROLEUM`
- `VALVOLINE`
- `VG`
- `WARREN_EQUITIES`
- `WAWA`
- `WESTERN_ENERGETIX`
- `WILCO`
- `ZIONS`

### `MastercardFleetFuelProductCode`

Mastercard Fleet fuel product codes

- `ADDITIVE_DOSAGE`
- `ADDITIZED_DIESEL_2`
- `ADDITIZED_DIESEL_3`
- `AVIATION_BIOFUEL`
- `AVIATION_FUEL_4`
- `AVIATION_FUEL_5`
- `AVIATION_FUEL_JP8`
- `AVIATION_FUEL_PREMIUM`
- `AVIATION_FUEL_REGULAR`
- `B1_DIESEL_BLEND`
- `B10_DIESEL_BLEND`
- `B100_DIESEL_BLEND`
- `B11_DIESEL_BLEND`
- `B15_DIESEL_BLEND`
- `B2_DIESEL_BLEND`
- `B20_DIESEL_BLEND`
- `B5_DIESEL_BLEND`
- `B75_DIESEL_BLEND`
- `B99_DIESEL_BLEND`
- `BIODIESEL_BLEND_1_OFF_ROAD`
- `BIODIESEL_BLEND_10_OFF_ROAD`
- `BIODIESEL_BLEND_100_OFF_ROAD`
- `BIODIESEL_BLEND_11_OFF_ROAD`
- `BIODIESEL_BLEND_15_OFF_ROAD`
- `BIODIESEL_BLEND_2_OFF_ROAD`
- `BIODIESEL_BLEND_20_OFF_ROAD`
- `BIODIESEL_BLEND_5_OFF_ROAD`
- `BIODIESEL_BLEND_75_OFF_ROAD`
- `BIODIESEL_BLEND_99_OFF_ROAD`
- `BIODIESEL_BLEND_OFF_ROAD`
- `BIOJET`
- `BLENDED_DIESEL`
- `COMPRESSED_NATURAL_GAS`
- `DEF`
- `DIESEL_1_OFF_ROAD`
- `DIESEL_1_PREMIUM_OFF_ROAD`
- `DIESEL_2_OFF_ROAD`
- `DIESEL_2_PREMIUM_OFF_ROAD`
- `DIESEL_OFF_ROAD_1_AND_2_NON_TAXABLE`
- `DIESEL_OFF_ROAD_NON_TAXABLE`
- `E_85`
- `ETHANOL_5_7_BLEND`
- `ETHANOL_7_7_BLEND`
- `ETHANOL_BLENDS_E16_E84`
- `EVC_LEVEL_1_CHARGE`
- `EVC_LEVEL_2_CHARGE`
- `EVC_LEVEL_3_CHARGE`
- `GREEN_GASOLINE_MID_PLUS`
- `GREEN_GASOLINE_PREMIUM_SUPER`
- `GREEN_GASOLINE_REGULAR`
- `HEATING_OIL`
- `HYDROGEN_H35`
- `HYDROGEN_H70`
- `JET_FUEL`
- `KEROSENE_LOW_SULFUR`
- `KEROSENE_LOW_SULFUR_NON_TAXABLE`
- `KEROSENE_ULTRA_LOW_SULFUR`
- `KEROSENE_ULTRA_LOW_SULFUR_NON_TAXABLE`
- `LIQUID_NATURAL_GAS`
- `LIQUID_PROPANE_GAS`
- `LOW_OCTANE_UNL`
- `MARINE_DIESEL`
- `MARINE_FUEL_1`
- `MARINE_FUEL_2`
- `MARINE_FUEL_3`
- `MARINE_FUEL_4`
- `MARINE_FUEL_5`
- `MARINE_OTHER`
- `MID_PLUS`
- `MID_PLUS_2`
- `MID_PLUS_2_10_PERCENT_BLEND`
- `MID_PLUS_ETHANOL_10_BLEND`
- `MID_PLUS_ETHANOL_15_BLEND`
- `MID_PLUS_ETHANOL_2_10_BLEND`
- `MID_PLUS_ETHANOL_5_7_BLEND`
- `MID_PLUS_ETHANOL_7_7_BLEND`
- `MISCELLANEOUS_AVIATION_FUEL`
- `MISCELLANEOUS_FUEL`
- `MISCELLANEOUS_MARINE_FUEL`
- `MISCELLANEOUS_OTHER_FUEL`
- `OFF_ROAD_MID_PLUS`
- `OFF_ROAD_MID_PLUS_2`
- `OFF_ROAD_PREMIUM_SUPER`
- `OFF_ROAD_PREMIUM_SUPER_2`
- `OFF_ROAD_REGULAR`
- `OTHER_FUEL`
- `PREMIUM_DIESEL_1`
- `PREMIUM_DIESEL_2`
- `PREMIUM_DIESEL_BLEND_1`
- `PREMIUM_DIESEL_BLEND_2`
- `PREMIUM_SUPER`
- `PREMIUM_SUPER_2`
- `PREMIUM_SUPER_2_10_BLEND`
- `PREMIUM_SUPER_ETHANOL_10_BLEND`
- `PREMIUM_SUPER_ETHANOL_15_BLEND`
- `PREMIUM_SUPER_ETHANOL_2_10_BLEND`
- `PREMIUM_SUPER_ETHANOL_5_7_BLEND`
- `PREMIUM_SUPER_ETHANOL_7_7_BLEND`
- `RACING_FUEL`
- `RECREATIONAL_FUEL`
- `REFORMULATED_1`
- `REFORMULATED_2`
- `REFORMULATED_3`
- `REFORMULATED_4`
- `REFORMULATED_5`
- `REGULAR`
- `REGULAR_DIESEL_1`
- `REGULAR_DIESEL_2`
- `REGULAR_ETHANOL_10_BLEND`
- `REGULAR_ETHANOL_15_BLEND`
- `RENEWABLE_DIESEL`
- `RENEWABLE_DIESEL_BIODIESEL`
- `RENEWABLE_DIESEL_BIODIESEL_OFF_ROAD`
- `RENEWABLE_DIESEL_OFF_ROAD`
- `UNDEFINED_FUEL`
- `WHITE_GAS`

### `MastercardFleetFuelServiceType`

Mastercard Fleet fuel service type

- `FULL_SERVICE`
- `ONLY_NON_FUEL_PRODUCTS`
- `SELF_SERVICE`
- `UNDEFINED`

### `MastercardFleetNonFuelProductCode`

Mastercard Fleet non-fuel product codes

- `AC_PARTS`
- `AIR_CONDITIONING_SERVICE`
- `AIR_FILTER`
- `AIRCRAFT_ACCESSORIES`
- `AIRCRAFT_CLEANING`
- `AIRCRAFT_FUEL_ADDITIVE`
- `AIRCRAFT_GROUND_HANDLING`
- `AIRCRAFT_GROUND_POWER_UNIT`
- `AIRCRAFT_LABOR`
- `AIRCRAFT_MAINTENANCE`
- `AIRCRAFT_PARKING_FEES`
- `AIRCRAFT_RENTAL`
- `AIRCRAFT_SANITATION_FEES`
- `AIRCRAFT_SERVICE`
- `AIRCRAFT_TIE_DOWN_FEES`
- `AIRCRAFT_WORK_ORDER`
- `AIRPORT_FEES`
- `ALTERNATIVE_SNACKS`
- `ANTI_FREEZE`
- `AVGAS_FEDERAL_EXCISE_TAX`
- `BATTERIES`
- `BEER_ALCOHOLIC`
- `BEER_NON_ALCOHOLIC`
- `BODY_WORK`
- `BRAKE_FLUID`
- `BRAKE_SERVICE`
- `BREAD_PACKAGED`
- `CALL_OUT_FEE`
- `CANNABIDIOL`
- `CAR_WASH`
- `CARGO_HANDLING`
- `CASH_BACK`
- `CASH_BACK_FEE`
- `CATERING`
- `CHARITY`
- `CHARTER_FEE`
- `CIGARETTES`
- `COLD_DISPENSED_BEVERAGES`
- `COMMUNICATION_FEE`
- `CORROSION_INHIBITOR`
- `COUPON_1`
- `COUPON_2`
- `COUPON_3`
- `COUPON_4`
- `COUPON_5`
- `DE_FUEL`
- `DE_ICING`
- `DELI_ITEMS`
- `DISABLE_DEVICE_HANDSET_LOCK`
- `DISCOUNT_1`
- `DISCOUNT_2`
- `DISCOUNT_3`
- `DISCOUNT_4`
- `DISCOUNT_5`
- `ENABLE_DEVICE_HANDSET_UNLOCK`
- `ENGINE_SERVICE`
- `EV_BATTERY_EXCHANGES`
- `EV_CHARGING_FEE`
- `EXHAUST_SERVICE`
- `FEDERAL_EXCISE_TAX_TIRES`
- `FEE_1`
- `FEE_2`
- `FEE_3`
- `FEE_4`
- `FEE_5`
- `FINANCIAL_PREPAID_CARD_ACTIVATE`
- `FINANCIAL_PREPAID_CARD_RELOAD`
- `FLIGHT_PLANS_WEATHER_BRIEF`
- `FLOW_FEE`
- `FLUID_MILK_PRODUCTS`
- `FROZEN_DISPENSED_BEVERAGES`
- `FROZEN_FOODS`
- `FUEL_SYSTEM`
- `GENERAL_ALCOHOL`
- `GENERAL_AUTOMOTIVE_MERCHANDISE`
- `GENERAL_CANDY`
- `GENERAL_DAIRY`
- `GENERAL_DELI`
- `GENERAL_DISPENSED_BEVERAGE`
- `GENERAL_FOOD_SERVICE`
- `GENERAL_GROCERY`
- `GENERAL_HEALTH_BEAUTY_CARE`
- `GENERAL_ICE`
- `GENERAL_LOTTERY`
- `GENERAL_MERCHANDISE`
- `GENERAL_MONEY_ORDER`
- `GENERAL_PACKAGED_BEVERAGE`
- `GENERAL_PUBLICATIONS`
- `GENERAL_PURPOSE_ACTIVATE`
- `GENERAL_PURPOSE_RELOAD`
- `GENERAL_SNACKS`
- `GENERAL_STORE_SERVICE`
- `GENERAL_TOBACCO`
- `GRATUITY`
- `GROCERIES_EDIBLE`
- `GROCERIES_NON_EDIBLE`
- `GROCERIES_PERISHABLE`
- `GROUND_EQUIPMENT_SERVICE_FEES`
- `GST_HST_CANADIAN_VAT_1`
- `HANGAR_FEE`
- `HOME_DELIVERY`
- `HOSES`
- `HOT_DISPENSED_BEVERAGES`
- `INSPECTION`
- `INSTRUCTION_FEE`
- `IT_BLADDER`
- `JET_FEDERAL_EXCISE_TAX`
- `LABOR`
- `LAMPS`
- `LANDING_FEE`
- `LAUNCH_FEE`
- `LIQUOR`
- `LOCAL_DISCOUNT_1`
- `LOCAL_DISCOUNT_2`
- `LOCAL_DISCOUNT_3`
- `LOCAL_DISCOUNT_4`
- `LOCAL_DISCOUNT_5`
- `LODGING`
- `LOTTERY_INSTANT`
- `LOTTERY_ONLINE`
- `LOTTERY_OTHER`
- `LOTTERY_PAY_OUT_INSTANT`
- `LOTTERY_PAY_OUT_ONLINE`
- `LOTTERY_PAY_OUT_OTHER`
- `LUBE`
- `MARINE_LABOR`
- `MARINE_SERVICE`
- `MARINE_WORK_ORDER`
- `MEMBERSHIP_LOYALTY`
- `MISCELLANEOUS_ADMINISTRATIVE`
- `MISCELLANEOUS_AVIATION_PRODUCTS_SERVICES`
- `MISCELLANEOUS_AVIATION_TAX`
- `MISCELLANEOUS_MARINE_PRODUCTS_SERVICES`
- `MISCELLANEOUS_NEGATIVE_ADMINISTRATIVE`
- `MISCELLANEOUS_PACKAGED_FUELS`
- `MISCELLANEOUS_VEHICLE_PRODUCTS_SERVICES`
- `MONEY_ORDER_DIVIDEND_CHECK`
- `MONEY_ORDER_GIFT_CERTIFICATE`
- `MONEY_ORDER_OFFICIAL_CHECK`
- `MONEY_ORDER_PAYROLL_CHECK`
- `MONEY_ORDER_REBATE_CHECK`
- `MONEY_ORDER_REFUND_CHECK`
- `MONEY_ORDER_UTILITY_CHECK`
- `MONEY_ORDER_VENDOR_PAYMENT`
- `MOTOR_OIL`
- `MULTIPLE_PAYEE_BILL_PAY`
- `OIL_CHANGE`
- `OIL_FILTER`
- `OTHER_DAIRY`
- `OTHER_DISPENSED_BEVERAGES`
- `OTHER_LUBRICANTS`
- `OTHER_PACKAGED_BEVERAGES`
- `OVERTIME_FEES`
- `OXYGEN`
- `PACKAGED_ADDITIVE`
- `PACKAGED_B100`
- `PACKAGED_B99`
- `PACKAGED_BEVERAGES_NON_ALCOHOLIC`
- `PACKAGED_DEF`
- `PACKAGED_ICE_CREAM_NOVELTIES`
- `PACKAGED_JUICE`
- `PACKAGED_KEROSENE`
- `PACKAGED_PROPANE`
- `PACKAGED_SANDWICHES_DELI_PRODUCTS`
- `PILOT_SUPPLIES`
- `PIN_ACTIVATE_PREPAID_CARD`
- `PIN_RETURN_PREPAID_CARD`
- `POS_LOYALTY_RESERVED_DISCOUNT_1`
- `POS_LOYALTY_RESERVED_DISCOUNT_2`
- `POS_LOYALTY_RESERVED_DISCOUNT_3`
- `POS_LOYALTY_RESERVED_DISCOUNT_4`
- `POS_LOYALTY_RESERVED_DISCOUNT_5`
- `PREPAID_CARDS_ACTIVATION_RECHARGE`
- `PREPAID_CARDS_PURCHASE`
- `PREPARED_FOODS`
- `PREVENTATIVE_MAINTENANCE`
- `PROPRIETARY_PREPAID_CARD_ACTIVATE`
- `PROPRIETARY_PREPAID_CARD_RELOAD`
- `PST_QST_CANADIAN_VAT_2`
- `RAMP_FEES`
- `RE_SERVICE`
- `REAL_TIME_RECHARGE`
- `REPAIRS`
- `ROAD_SERVICE`
- `RV_DUMP_FEE`
- `SALTY_SNACKS`
- `SCALES`
- `SECURE_FEES`
- `SERVICE_PACKAGE`
- `SHOWER`
- `SINGLE_PAYEE_BILL_PAY`
- `SLIP_RENTAL`
- `SPLIT_TENDER`
- `STATIC_DISSIPATER_ADDITIVE`
- `STORAGE`
- `SWEET_SNACKS_PACKAGED`
- `SWT_RATE_CANADIAN`
- `SYNTHETIC_OIL`
- `TAX_1`
- `TAX_2`
- `TAX_3`
- `TAX_4`
- `TAX_5`
- `TAX_6`
- `TAX_7`
- `TAX_8`
- `TAX_DISCOUNT_FORGIVEN`
- `THIRD_PARTY_PREPAID_CARD_ACTIVATE`
- `THIRD_PARTY_PREPAID_CARD_RELOAD`
- `TIRE_RELATED`
- `TIRE_REPAIR`
- `TIRE_ROTATION`
- `TIRES`
- `TOBACCO_OTHER`
- `TOLL_PAYMENTS`
- `TOWING`
- `TRAILER_WASH`
- `TRANSMISSION_SERVICE`
- `TRANSPORTATION`
- `TRUCK_TANK_CLEANING`
- `VEHICLE_ACCESSORIES`
- `VEHICLE_FUEL_ADDITIVES_TREATMENT`
- `VEHICLE_GLASS`
- `VEHICLE_PARKING`
- `VEHICLE_PARTS`
- `VEHICLE_PREP`
- `VEHICLE_RENTAL`
- `WASH_OUT`
- `WASHER_FLUID`
- `WINE`
- `WIPERS`
- `WIRELESS_REAL_TIME_RECHARGE`
- `WORK_ORDER`

### `MastercardFleetProductCode`

Mastercard Fleet product codes

- `AC_ACC`
- `AIRCRAFT_CLEANING`
- `APU`
- `AUTO_ACC`
- `AUTO_GLASS`
- `AV_CATERING`
- `AV_FUEL`
- `AV_FUEL_100`
- `AV_MAINTENANCE`
- `BATTERIES`
- `BEER_WINE`
- `BIODIESEL`
- `BIODIESEL_NON_TAXABLE`
- `BOAT_SERVICE`
- `BRAKE_FLUID`
- `BRAKE_SERVICE`
- `CALL_OUT_FEE`
- `CAR_WASH`
- `CARGO_HANDLING`
- `CHARTER_FEE`
- `CIGARETTES`
- `CNG`
- `COMM_FEE`
- `DE_ICING`
- `DEF`
- `DIESEL`
- `DIESEL_EXHAUST_FLUID_DISPENSED`
- `DIESEL_NON_TAXABLE`
- `DIESEL_PREMIUM`
- `DYED_DIESEL`
- `E85`
- `ENGINE_SERVICE`
- `EV_LEVEL_1_CHARGE`
- `EV_LEVEL_2_CHARGE`
- `EV_LEVEL_3_CHARGE`
- `FLIGHT_PLAN_FEE`
- `GASOHOL`
- `GROUND_HANDLING`
- `HEALTH_BEAUTY`
- `INSTRUCTION_FEE`
- `JET_FUEL`
- `KEROSENE`
- `LANDING_FEE`
- `LEADED_ETHANOL`
- `LEADED_METHANOL`
- `LNG`
- `LPG`
- `M85`
- `MARINE_FUEL`
- `MID`
- `MID_ETHANOL`
- `MID_METHANOL`
- `MILK_JUICE`
- `MISC_AV`
- `MISC_BEV`
- `MISC_FOOD`
- `MISC_FUEL`
- `MISC_LABOR`
- `MISC_OTHER_FUEL`
- `MISC_PARTS`
- `MISC_REPAIRS`
- `MOTOR_OIL`
- `OIL_CHANGE`
- `PLANE_RENTAL`
- `PREMIUM`
- `PREMIUM_ETHANOL`
- `PREMIUM_METHANOL`
- `RACING_FUEL`
- `RAMP_FEE`
- `REGULAR`
- `REGULAR_ETHANOL`
- `REGULAR_LEADED`
- `REGULAR_METHANOL`
- `RESTAURANT`
- `SODA`
- `SOLVENT`
- `SUPER`
- `SUPER_ETHANOL`
- `SUPER_METHANOL`
- `TIEDOWN_HANGAR`
- `TIRES`
- `TIRES_BATTERIES_ACCESSORIES`
- `TOWING`
- `TRANSMISSION_SERVICE`
- `ULSD`
- `UNLEADED_MID_REFORMULATED`
- `UNLEADED_REFORMULATED`
- `WHITE_GAS`

### `MastercardFleetProductType`

Mastercard Fleet product type code

- `NO_PROMPTS_ISSUED`
- `PROMPT_FOR_DRIVER_NUMBER_AND_ODOMETER`
- `PROMPT_FOR_ID_AND_ODOMETER`
- `PROMPT_FOR_ODOMETER_ONLY`
- `PROMPT_FOR_VEHICLE_NUMBER_AND_ODOMETER`

### `MastercardFleetPromptType`

Mastercard Fleet prompt types

- `ADDITIONAL_CARD_DATA`
- `ADDITIONAL_VEHICLE_DATA`
- `BATTERY_VOLTAGE`
- `BILLING_ID`
- `CHECK_ENGINE_STATUS`
- `CONTROL_NUMBER`
- `COOLANT_TEMPERATURE`
- `CUSTOMER_NUMBER`
- `DELIVERY_TICKET_NUMBER`
- `DEPARTMENT_NUMBER`
- `DRIVER_ID`
- `DRIVER_OR_VEHICLE_CARD`
- `ENGINE_HOURS`
- `ENGINE_LOAD`
- `ENGINE_OIL_LIFE`
- `ENGINE_OIL_PRESSURE`
- `ENGINE_OIL_TEMPERATURE`
- `ENGINE_RPM`
- `ENGINE_TIME_TOTAL`
- `ENTERED_DATA_ALPHA`
- `ENTERED_DATA_NUM`
- `FUEL_ECONOMY`
- `FUEL_GAUGE_LEVEL`
- `HARD_ACCELERATION`
- `HARD_BREAKING`
- `HUBOMETER`
- `IDLE_TIME`
- `INVOICE_NUMBER`
- `JOB_NUMBER`
- `MAINTENANCE_ID`
- `ODOMETER`
- `REEFER_HOURS`
- `REEFER_TEMPERATURE`
- `REPLACEMENT_CAR`
- `SUB_FLEET_NUMBER`
- `TANK_LEVEL_START`
- `TOTAL_IDLE_TIME`
- `TRAILER_NUMBER`
- `TRANSACTION_NUMBER`
- `TRIP_NUMBER`
- `UNIT_NUMBER`
- `USER_ID`
- `VEHICLE_NUMBER`
- `VEHICLE_TAG`
- `WEB_PORTAL_DATA`
- `WORK_ORDER_OR_PO_NUMBER`
- `ZIP_OR_POSTAL_CODE`

### `MastercardFleetUnitOfMeasure`

Mastercard Fleet fuel unit of measure

- `GALLONS`
- `HOURS`
- `IMPERIAL_GALLONS`
- `KILOS`
- `KILOWATT_HOURS`
- `LITERS`
- `MINUTES`
- `NOT_APPLICABLE`
- `POUNDS`

### `MastercardThreeDSecureCardholderAuthentication`

Information about the 3DSecure Cardholder Authentication.

- `CARDHOLDER_CERTIFICATE_NOT_USED`
- `MASTERPASS_PROCESSED`
- `TOKENIZED_PAYMENT`

### `MastercardUcafCollectionIndicator`

Information about the collection capabilities of the Universal Cardholder Authentication Field.

- `ISSUER_RISK_DECISIONING`
- `MERCHANT_RISK_DECISIONING`
- `NOT_SUPPORTED`
- `PARTIAL_SHIPMENT_OR_RECURRING_PAYMENT`
- `UCAF_DATA_NOT_SUPPORTED`
- `UCAF_DATA_REQUIRED`
- `UCAF_DATA_STATIC`
- `UCAF_DATA_SUPPORTED`

### `MerchantCategory`

The list of human friendly merchant category codes (MCC) according to [ISO-18245](https://en.wikipedia.org/wiki/ISO_18245).

- `A1_RENT_A_CAR`
- `AB_HOTEL`
- `AC_HOTELS`
- `AC_REFRIGERATION_REPAIR`
- `ACCENT_RENT_A_CAR`
- `ACCOUNTING_BOOKKEEPING_SERVICES`
- `ACTION_AUTO_RENTAL`
- `ADAMS_MARK`
- `ADRIA_AIR`
- `ADVANTAGE_RENT_A_CAR`
- `ADVERTISING_SERVICES`
- `AEORFLOT`
- `AER_LINGUS`
- `AERO_COACH_AVIATION`
- `AERO_CONTINENTE`
- `AERO_NICARAGUENSIS`
- `AERO_PERU`
- `AERO_VIRGIN_ISLANDS`
- `AEROLINEAS_ARGENTINAS`
- `AEROMEXICO`
- `AFFILIATED_AUTO_RENTAL`
- `AFFINIA`
- `AGENCY_RENT_A_CAR`
- `AGRICULTURAL_COOPERATIVE`
- `AIR_AFRIQUE`
- `AIR_ALGERIE`
- `AIR_ARABIA`
- `AIR_ASTANA`
- `AIR_BALTIC`
- `AIR_BERLIN`
- `AIR_BRITISH_COLUMBIA`
- `AIR_CANADA`
- `AIR_CHINA`
- `AIR_DJIBOUTI`
- `AIR_FRANCE`
- `AIR_INDIA`
- `AIR_JAMAICA`
- `AIR_LANKA`
- `AIR_LITTORAL`
- `AIR_MALTA`
- `AIR_MAROC`
- `AIR_MAURITIUS`
- `AIR_NEW_ZEALAND`
- `AIR_PANAMA`
- `AIR_SEYCHELLES`
- `AIR_TRANSAT`
- `AIR_ZAIRE`
- `AIR_ZIMBABWE_CORP`
- `AIRINTER`
- `AIRLINES_AIR_CARRIERS`
- `AIRPORTS_FLYING_FIELDS`
- `AIRTRAN_AIRWAYS`
- `AIRWAYS`
- `AJAX_RENT_A_CAR`
- `ALA_MOANA_HOTEL`
- `ALADDIN_RESORT_AND_CASINO`
- `ALAMO_RENT_A_CAR`
- `ALASKA_AIR`
- `ALITALIA`
- `ALLSTATE`
- `ALM_AIRLINE`
- `ALOFT`
- `ALOHA_AIRLINES`
- `ALTRA_AUTO_RENTAL`
- `AMBULANCE_SERVICES`
- `AMELIA_ISLAND_PLANTATION`
- `AMERICA_WEST`
- `AMERICAN_AIRLINES`
- `AMERICAN_INTERNATIONAL`
- `AMERICANA_HOTELS_CORPORATION`
- `AMERICAS_BEST_VALUE_INN`
- `AMERICINN`
- `AMERISUITES`
- `AMFAC_HOTELS`
- `AMUSEMENT_PARKS_CARNIVALS`
- `ANA_AIR`
- `ANA_HOTELS`
- `ANSA_INTERNATIONAL`
- `ANSETT_AIRLINES`
- `ANTIQUE_REPRODUCTIONS`
- `ANTIQUE_SHOPS`
- `AQUARIUMS`
- `ARABELLA_HOTELS`
- `ARCADE`
- `ARCHITECTURAL_SURVEYING_SERVICES`
- `ARCTIA`
- `ARIA`
- `ARIZONA_BILTMORE`
- `ART_DEALERS_AND_GALLERIES`
- `ARTISTS_SUPPLY_AND_CRAFT_SHOPS`
- `ASC_AIRLINE`
- `ASIANA_AIRLINES`
- `ATA_AIR`
- `ATLANTIC_CITY_HILTON`
- `AUBERGE_DES_GOVERNEURS`
- `AUSTRIAN_AIR`
- `AUSTRIAN_AIR_SERVICE`
- `AUTO_AND_HOME_SUPPLY_STORES`
- `AUTO_BODY_REPAIR_SHOPS`
- `AUTO_HOST_RENTAL_CARS`
- `AUTO_PAINT_SHOPS`
- `AUTO_SERVICE_SHOPS`
- `AUTOGRAPH`
- `AUTOHANSA`
- `AUTOMATE`
- `AUTOMATED_CASH_DISBURSE`
- `AUTOMATED_FUEL_DISPENSERS`
- `AUTOMOBILE_ASSOCIATIONS`
- `AUTOMOTIVE_PARTS_AND_ACCESSORIES_STORES`
- `AUTOMOTIVE_TIRE_STORES`
- `AVCAR`
- `AVENSA_AIR`
- `AVIACO_AIR`
- `AVIANCA`
- `AVIATECA_AIR`
- `AVIS_RENT_A_CAR`
- `AVON_RENT_A_CAR`
- `AZUL_BRAZILIAN_AIRLINES`
- `BAHAMAS_AIR`
- `BAIL_AND_BOND_PAYMENTS`
- `BAKERIES`
- `BALKAN_AIR`
- `BALLYS_HOTEL_AND_CASINO`
- `BANDS_ORCHESTRAS`
- `BANYAN_TREE_HOTELS_AND_RESORTS`
- `BAR_HARBOR_AIRLINES`
- `BARBER_AND_BEAUTY_SHOPS`
- `BARTON_CREEK_RESORT`
- `BAYMONT_INN_SUITES`
- `BEAU_RIVAGE_HOTEL_AND_CASINO`
- `BELLAGIO`
- `BEMIDJI_AIR`
- `BEST_WESTERN`
- `BETTING_CASINO_GAMBLING`
- `BEVERLY_HILLS_HOTEL`
- `BICYCLE_SHOPS`
- `BILLIARD_POOL_ESTABLISHMENTS`
- `BILTMORE_HOTEL_AND_SUITES`
- `BINIONS_HORSESHOE_CLUB`
- `BLUEPRINTING_AND_PHOTOCOPYING_SERVICES`
- `BOAT_DEALERS`
- `BOAT_RENTALS_AND_LEASES`
- `BOCA_RATON_RESORT`
- `BOOK_STORES`
- `BOOKS_PERIODICALS_AND_NEWSPAPERS`
- `BOWLING_ALLEYS`
- `BRAATHENS`
- `BRADBURY_SUITES`
- `BREAKERS_RESORT`
- `BREEZBAY_HOTEL_GROUP`
- `BRITISH_AIRWAYS`
- `BRITISH_MIDLAND_AIR`
- `BROADMOOR_HOTEL`
- `BROCKWAY_AIR`
- `BROOKS_RENT_A_CAR`
- `BUDGET_HOST_INNS`
- `BUDGET_RENT_A_CAR`
- `BUDGETEL`
- `BUFFALO_BILLS_HOTEL_AND_CASINO`
- `BULGARI`
- `BUS_LINES`
- `BUSINESS_SECRETARIAL_SCHOOLS`
- `BUYING_SHOPPING_SERVICES`
- `C_MON_INN`
- `CABLE_SATELLITE_AND_OTHER_PAY_TELEVISION_AND_RADIO`
- `CAESARS_HOTEL_AND_CASINO`
- `CALIFORNIA_HOTEL_AND_CASINO`
- `CAMERA_AND_PHOTOGRAPHIC_SUPPLY_STORES`
- `CAMPANILE`
- `CANADIAN_AIR`
- `CANADIAN_PACIFIC`
- `CANDEO_HOTELS`
- `CANDLEWOOD_SUITES`
- `CANDY_NUT_AND_CONFECTIONERY_STORES`
- `CANYON_RANCH`
- `CAPITOL_AIR`
- `CAR_AND_TRUCK_DEALERS_NEW_USED`
- `CAR_AND_TRUCK_DEALERS_USED_ONLY`
- `CAR_RENTAL`
- `CAR_RENTAL_AGENCIES`
- `CAR_WASHES`
- `CAREFREE_RESORTS`
- `CAREY`
- `CARIBBEAN_AIRLINES`
- `CARIBE_ROYAL`
- `CARIBE_ROYAL_RESORT_SUITE_AND_VILLAS`
- `CARLTON_HOTELS`
- `CARNIVAL_AIRLINES`
- `CARPENTRY_SERVICES`
- `CARPET_UPHOLSTERY_CLEANING`
- `CATERERS`
- `CATHAY_PACIFIC`
- `CAYMAN_AIRWAYS`
- `CEBU_PACIFIC_AIRLINES`
- `CENTURION_HOTELS`
- `CEST_LA_VIE_RESORT_IZUMIGO`
- `CHAMPAGNE_PRODUCERS`
- `CHARITABLE_AND_SOCIAL_SERVICE_ORGANIZATIONS_FUNDRAISING`
- `CHATEAU_ELAN_WINERY_AND_RESORT`
- `CHEMICALS_AND_ALLIED_PRODUCTS`
- `CHILD_CARE_SERVICES`
- `CHILDRENS_AND_INFANTS_WEAR_STORES`
- `CHINA_AIRLINES`
- `CHINA_EASTERN_AIRLINES`
- `CHINA_SOUTHERN_AIRLINES`
- `CHIROPODISTS_PODIATRISTS`
- `CHIROPRACTORS`
- `CHISUN_HOTELS`
- `CIGAHOTELS`
- `CIGAR_STORES_AND_STANDS`
- `CIRCUS_CIRCUS_HOTEL_AND_CASINO`
- `CITE`
- `CITY_LODGE_HOTELS`
- `CIVIC_SOCIAL_FRATERNAL_ASSOCIATIONS`
- `CLARIDGE_CASINO_HOTEL`
- `CLARION_HOTEL`
- `CLEANING_AND_MAINTENANCE`
- `CLIMAT_DE_FRANCE`
- `CLOTHING_RENTAL`
- `CLUB_CORPORATION_CLUB_RESORTS`
- `CLUB_MED`
- `COAST_HOTELS`
- `COLLEGES_UNIVERSITIES`
- `COLORADO_BELLE_EDGEWATER_RESORT`
- `COMAIR`
- `COMFORT_HOTEL_INTERNATIONAL`
- `COMMAND_AIR`
- `COMMERCIAL_EQUIPMENT`
- `COMMERCIAL_FOOTWEAR`
- `COMMERCIAL_PHOTOGRAPHY_ART_AND_GRAPHICS`
- `COMMUTER_TRANSPORT_AND_FERRIES`
- `COMP_FAU_AIR`
- `COMPRI_HOTEL`
- `COMPUTER_NETWORK_SERVICES`
- `COMPUTER_PROGRAMMING`
- `COMPUTER_REPAIR`
- `COMPUTER_SOFTWARE_STORES`
- `COMPUTERS_PERIPHERALS_AND_SOFTWARE`
- `CONCESSION`
- `CONCORDE_HOTELS`
- `CONCRETE_WORK_SERVICES`
- `CONRAD_HOTELS`
- `CONSORT`
- `CONSTRUCTION_MATERIALS`
- `CONSULTING_PUBLIC_RELATIONS`
- `CONTINENTAL_AIRLINES`
- `COPA_AIR`
- `CORE_GLOBAL_MANAGEMENT_HOTELS_AND_RESORTS`
- `CORRESPONDENCE_SCHOOLS`
- `COSMETIC_STORES`
- `COSMOPOLITAN_OF_LAS_VEGAS`
- `COUNSELING_SERVICES`
- `COUNTRY_CLUBS`
- `COUNTRY_INN_BY_CARLSON`
- `COURIER_SERVICES`
- `COURT_COSTS`
- `COURTYARD_BY_MARRIOTT`
- `CREDIT_REPORTING_AGENCIES`
- `CREST_HOTELS`
- `CROATIA_AIR`
- `CROSSLAND`
- `CROWN_AIR`
- `CROWNE_PLAZA_HOTELS`
- `CRUISE_LINES`
- `CRUZIERO_AIR`
- `CSA_AIRLINE`
- `CUMBERLAND_AIRLINES`
- `CUMULUS_HOTELS`
- `CUNARD_HOTELS`
- `CURIO_HOTELS`
- `CYPRUS_AIRWAYS`
- `DAIRY_PRODUCTS_STORES`
- `DAN_AIR_SERVICES`
- `DAN_HOTELS`
- `DANCE_HALL_STUDIOS_SCHOOLS`
- `DATING_ESCORT_SERVICES`
- `DAYS_INNS_OF_AMERICA`
- `DBA_AIR`
- `DE_VERE_HOTELS`
- `DEBT_COLLECTION_AGENCIES`
- `DELTA_AIRLINES`
- `DELTA_HOTELS`
- `DENTISTS_ORTHODONTISTS`
- `DEPARTMENT_STORES`
- `DETECTIVE_AGENCIES`
- `DIGITAL_GOODS_APPLICATIONS`
- `DIGITAL_GOODS_GAMES`
- `DIGITAL_GOODS_LARGE_VOLUME`
- `DIGITAL_GOODS_MEDIA`
- `DILLON_INN`
- `DIRECT_MARKETING_CATALOG_MERCHANT`
- `DIRECT_MARKETING_COMBINATION_CATALOG_AND_RETAIL_MERCHANT`
- `DIRECT_MARKETING_INBOUND_TELEMARKETING`
- `DIRECT_MARKETING_INSURANCE_SERVICES`
- `DIRECT_MARKETING_OTHER`
- `DIRECT_MARKETING_OUTBOUND_TELEMARKETING`
- `DIRECT_MARKETING_SUBSCRIPTION`
- `DIRECT_MARKETING_TRAVEL`
- `DISCOUNT_STORES`
- `DISNEYLAND_RESORTS`
- `DOCTORS`
- `DOLLAR_RENT_A_CAR`
- `DOMINICA_AIR`
- `DOOR_TO_DOOR_SALES`
- `DORAL_GOLF_RESORT`
- `DORAL_HOTELS`
- `DORINT_HOTELS`
- `DOUBLETREE`
- `DOWNTOWNER_PASSPORT`
- `DRAPERY_WINDOW_COVERING_AND_UPHOLSTERY_STORES`
- `DRINKING_PLACES`
- `DRUG_STORES_AND_PHARMACIES`
- `DRUGS_DRUG_PROPRIETARIES_AND_DRUGGIST_SUNDRIES`
- `DRURY_INN`
- `DRY_CLEANERS`
- `DUNFEY_HOTELS`
- `DURABLE_GOODS`
- `DUTY_FREE_STORES`
- `EASYJET_AIR`
- `EATING_PLACES_RESTAURANTS`
- `ECONO_CAR_RENT_A_CAR`
- `ECONO_TRAVEL_MOTOR_HOTEL`
- `ECONOMY_INNS_OF_AMERICA`
- `ECUATORIANA`
- `EDITION`
- `EDUCATIONAL_SERVICES`
- `EGYPT_AIR`
- `EL_AL_AIRLINES`
- `ELDORADO_HOTEL_AND_CASINO`
- `ELECTRIC_RAZOR_STORES`
- `ELECTRIC_VEHICLE_CHARGING`
- `ELECTRICAL_PARTS_AND_EQUIPMENT`
- `ELECTRICAL_SERVICES`
- `ELECTRONICS_REPAIR_SHOPS`
- `ELECTRONICS_STORES`
- `ELEMENT`
- `ELEMENTARY_SECONDARY_SCHOOLS`
- `EMBASSY_HOTELS`
- `EMBASSY_SUITES`
- `EMBASSY_VACATION_RESORT`
- `EMIRATES`
- `EMPLOYMENT_TEMP_AGENCIES`
- `ENTERPRISE_RENT_A_CAR`
- `EQUIPMENT_RENTAL`
- `ETHIOPIAN_AIRLINES`
- `ETIHAD_AIR`
- `EUROPCAR`
- `EUROPE_BY_CAR`
- `EVA_AIRWAYS`
- `EXCALIBUR_HOTEL_AND_CASINO`
- `EXCEL_INN`
- `EXTENDED_STAY`
- `EXTENDED_STAY_AMERICA`
- `EXTENDED_STAY_DELUXE`
- `EXTERMINATING_SERVICES`
- `FAIRFIELD_HOTEL`
- `FAIRFIELD_INN`
- `FAIRMONT_HOTELS_CORPORATION`
- `FAMILY_CLOTHING_STORES`
- `FAST_FOOD`
- `FAST_FOOD_RESTAURANTS`
- `FINANCIAL_INSTITUTIONS`
- `FINES_GOVERNMENT_ADMINISTRATIVE_ENTITIES`
- `FINNAIR`
- `FIREPLACE_FIREPLACE_SCREENS_AND_ACCESSORIES_STORES`
- `FIRST_HOSPITALITY_HOTELS`
- `FLAG_INNS`
- `FLAG_INNS_AUSTRALIA`
- `FLOOR_COVERING_STORES`
- `FLORISTS`
- `FLORISTS_SUPPLIES_NURSERY_STOCK_AND_FLOWERS`
- `FLYBE`
- `FONTAINEBLEAU_RESORT`
- `FOUR_POINTS_HOTELS`
- `FOUR_SEASONS`
- `FOUR_SEASONS_AUSTRALIA`
- `FRANKENMUTH_BAVARIAN`
- `FREEDOM_AIRLINES`
- `FREEZER_AND_LOCKER_MEAT_PROVISIONERS`
- `FREMONT_HOTEL_AND_CASINO`
- `FRIENDSHIP_INNS_INTERNATIONAL`
- `FRONTIER_AIRLINES`
- `FUEL_DEALERS_NON_AUTOMOTIVE`
- `FUFU_JAPAN`
- `FUNDING_TRANSACTION`
- `FUNERAL_SERVICES_CREMATORIES`
- `FURNITURE_HOME_FURNISHINGS_AND_EQUIPMENT_STORES_EXCEPT_APPLIANCES`
- `FURNITURE_REPAIR_REFINISHING`
- `FURRIERS_AND_FUR_SHOPS`
- `GALT_HOUSE`
- `GARDEN_PLACE_HOTEL`
- `GARUDA`
- `GAYLORD_OPRYLAND`
- `GAYLORD_PALMS`
- `GAYLORD_TEXAN`
- `GENERAL_RENT_A_CAR`
- `GENERAL_SERVICES`
- `GIFT_CARD_NOVELTY_AND_SOUVENIR_SHOPS`
- `GLASS_PAINT_AND_WALLPAPER_STORES`
- `GLASSWARE_CRYSTAL_STORES`
- `GODFREY_NATIONAL`
- `GOFLY`
- `GOL_AIRLINES`
- `GOLDEN_NUGGET`
- `GOLDEN_PACIFIC_AIR`
- `GOLDEN_TULIP`
- `GOLF_COURSES_PUBLIC`
- `GOVERNMENT_LICENSED_HORSE_OR_DOG_RACING`
- `GOVERNMENT_LICENSED_ON_LINE_CASINO`
- `GOVERNMENT_OWNED_LOTTERY`
- `GOVERNMENT_OWNED_LOTTERY_GLOBAL`
- `GOVERNMENT_SERVICES`
- `GRANBELL_HOTELS_AND_RESORT`
- `GRAND_CASINO_HOTELS`
- `GRAND_MET_FORUM_HOTELS`
- `GRAND_SIERRA_RESORT`
- `GRAND_WAILEA_RESORT`
- `GREAT_WOLF`
- `GREENBRIAR_RESORTS`
- `GROCERY_STORES_SUPERMARKETS`
- `GRUPO_HOTELS_HUSA_SA`
- `GULF_AIR`
- `GUNS_AMMO`
- `GUYANA_AIRWAYS`
- `HAINAN_AIRLINES`
- `HALE_KOA_HOTEL`
- `HALEKULANI_HOTEL_WAIKIKI_PARC`
- `HAMPTON_INNS`
- `HARDWARE_EQUIPMENT_AND_SUPPLIES`
- `HARDWARE_STORES`
- `HARLEY_HOTEL`
- `HARRAHS_HOTELS_AND_CASINOS`
- `HARVEY_BRISTOL_HOTELS`
- `HAVASU_AIRLINES`
- `HAWAIIAN_AIR`
- `HEALTH_AND_BEAUTY_SPAS`
- `HEARING_AIDS_SALES_AND_SUPPLIES`
- `HEATING_PLUMBING_A_C`
- `HELMSLEY_HOTELS`
- `HERMITAGE_HOTELS`
- `HERTZ`
- `HILTON`
- `HILTON_GARDEN_INN`
- `HILTON_INTERNATIONAL`
- `HLX_AIR`
- `HMI_HOTEL_GROUP`
- `HOBBY_TOY_AND_GAME_SHOPS`
- `HOLIDAY_INNS`
- `HOLIDAY_RENT_A_CAR`
- `HOME_2_SUITES`
- `HOME_SUPPLY_WAREHOUSE_STORES`
- `HOME2SUITES`
- `HOMESTEAD`
- `HOMESTEAD_SUITES`
- `HOMEWOOD_SUITES`
- `HOSPITALITY_INNS`
- `HOSPITALS`
- `HOTEIS_OTHAN`
- `HOTEL_ALPHA_1`
- `HOTEL_DEL_CORONADO`
- `HOTEL_INDIGO`
- `HOTEL_LIVEMAX`
- `HOTEL_MERCURE`
- `HOTEL_METROPOLITAN`
- `HOTEL_OKURA`
- `HOTEL_SIERRA`
- `HOTEL_SUNROUTE`
- `HOTEL_UNIVERSAL`
- `HOTEL_UNIZO`
- `HOTELES_EL_PRESIDENTE`
- `HOTELS_MELIA`
- `HOTELS_MOTELS_AND_RESORTS`
- `HOUSEHOLD_APPLIANCE_STORES`
- `HOWARD_JOHNSON`
- `HUDSON_HOTEL`
- `HUNGAR_HOTELS`
- `HYATT_HOTELS_INTERNATIONAL`
- `HYATT_PLACE`
- `IBERIA`
- `IBEROTEL`
- `IBUSZ_HOTELS`
- `ICELAND_AIR`
- `IMPERIAL_LONDON_HOTELS`
- `INDIAN_AIRLINES`
- `INDUSTRIAL_SUPPLIES`
- `INFORMATION_RETRIEVAL_SERVICES`
- `INSURANCE_AGENTS_BROKERS_SERVICE`
- `INSURANCE_DEFAULT`
- `INSURANCE_PREMIUMS`
- `INSURANCE_RENT_A_CAR`
- `INSURANCE_UNDERWRITING_PREMIUMS`
- `INTER_NOR_HOTELS`
- `INTERCONTINENTAL`
- `INTERENT`
- `INTERHOTEL_CEDOK`
- `INTRA_COMPANY_PURCHASES`
- `ISLAND_AIRLINES`
- `ITOEN_HOTEL`
- `JAPAN_AIRLINES`
- `JEFFERSON_HOTEL`
- `JET_AIRWAYS`
- `JETBLUE_AIRWAYS`
- `JETSTAR_AIRWAYS`
- `JEWELRY_STORES_WATCHES_CLOCKS_AND_SILVERWARE_STORES`
- `JHAT`
- `JOHN_ASCUAGAS_NUGGET`
- `JOLLY_HOTELS`
- `JOURNEYS_END_MOTELS`
- `JR_EAST_HOTEL_METS`
- `JUGOSLAV_AIR`
- `JUMEIRAH_ESSEX_HOUSE`
- `JURYS_DOYLE_HOTEL_GROUP`
- `JW_MARRIOTT`
- `KAHALA_MANDARIN_ORIENTAL_HOTEL`
- `KAROS_HOTELS`
- `KAUAI_COCONUT_BEACH_RESORT`
- `KEIO_PRESSO_INN`
- `KEMWELL_GROUP`
- `KENYA_AIRWAYS`
- `KLM_ROYAL_DUTCH_AIRLINES`
- `KNIGHTS_INN`
- `KOREAN_AIRLINES`
- `KUWAIT_AIR`
- `KYORITSUHOTELS`
- `LA_COSTA_RESORT`
- `LA_MANSION_DEL_RIO`
- `LA_QUINTA_MOTOR_INNS`
- `LA_QUINTA_RESORT`
- `LA_VISTA`
- `LAB_AIR`
- `LACSA_AIR`
- `LADBROKE_HOTELS`
- `LADECO_AIR`
- `LADY_LUCK_HOTEL_AND_CASINO`
- `LAN_AIR`
- `LANDSCAPING_SERVICES`
- `LAP_AIR`
- `LAUNDRIES`
- `LAUNDRY_CLEANING_SERVICES`
- `LAV_AIR`
- `LEGAL_SERVICES_ATTORNEYS`
- `LIAT_AIRLINE`
- `LOEWS_HOTELS`
- `LOT_AIR`
- `LUFTHANSA`
- `LUGGAGE_AND_LEATHER_GOODS_STORES`
- `LUMBER_BUILDING_MATERIALS_STORES`
- `LUXAIR`
- `LUXOR_HOTEL_AND_CASINO`
- `LUXURY_RESORTS`
- `MAIN_STREET_STATION_HOTEL_AND_CASINO`
- `MAINSTAY_SUITES`
- `MAJOR_RENT_A_CAR`
- `MALAYSIAN_AIRLINE_SYSTEM`
- `MALEV`
- `MALMO_AIR`
- `MANDALAY_BAY_RESORT`
- `MANDARIN_INTERNATIONAL`
- `MANHATTAN_EAST_SUITE_HOTELS`
- `MANUAL_CASH_DISBURSE`
- `MARINAS_SERVICE_AND_SUPPLIES`
- `MARITIM`
- `MARRIOTT`
- `MARRIOTT_EXECUTIVE_APARTMENTS`
- `MASONRY_STONEWORK_AND_PLASTER`
- `MASSAGE_PARLORS`
- `MASTERS_ECONOMY_INNS`
- `MEDICAL_AND_DENTAL_LABS`
- `MEDICAL_DENTAL_OPHTHALMIC_AND_HOSPITAL_EQUIPMENT_AND_SUPPLIES`
- `MEDICAL_SERVICES`
- `MEITETSU_INN`
- `MEMBERSHIP_ORGANIZATIONS`
- `MENS_AND_BOYS_CLOTHING_AND_ACCESSORIES_STORES`
- `MENS_WOMENS_CLOTHING_STORES`
- `MERCHANTS_RENT_A_CAR`
- `MERIDIEN`
- `MERLIN_HOTEL_PERTH`
- `MESA_AIR`
- `METAL_SERVICE_CENTERS`
- `METRO_AIRLINES`
- `METROFLIGHT_AIRLINES`
- `METROPOLE_HOTELS`
- `MEXICANA_AIRLINES`
- `MGM_GRAND_HOTEL`
- `MICROTEL_INN_AND_SUITES`
- `MIDDLE_EAST_AIR`
- `MIDWAY_MOTOR_LODGE`
- `MIDWEST_EXPRESS_AIRLINES`
- `MILLENNIUM_BROADWAY_HOTEL`
- `MILLEVILLE`
- `MINACIA`
- `MIRAGE_HOTEL_AND_CASINO`
- `MISCELLANEOUS_APPAREL_AND_ACCESSORY_SHOPS`
- `MISCELLANEOUS_AUTO_DEALERS`
- `MISCELLANEOUS_BUSINESS_SERVICES`
- `MISCELLANEOUS_FOOD_STORES`
- `MISCELLANEOUS_GENERAL_MERCHANDISE`
- `MISCELLANEOUS_GENERAL_SERVICES`
- `MISCELLANEOUS_HOME_FURNISHING_SPECIALTY_STORES`
- `MISCELLANEOUS_PUBLISHING_AND_PRINTING`
- `MISCELLANEOUS_RECREATION_SERVICES`
- `MISCELLANEOUS_REPAIR_SHOPS`
- `MISCELLANEOUS_SPECIALTY_RETAIL`
- `MIYAKO_HOTEL_KINTETSU`
- `MOBILE_HOME_DEALERS`
- `MOEVENPICK`
- `MONEY_TRANSFER_FINANCIAL_INSTITUTION`
- `MONEYSEND_FUNDING`
- `MONEYSEND_INTERCOUNTRY`
- `MONEYSEND_INTRACOUNTRY`
- `MONTE_CARLO_HOTEL_AND_CASINO`
- `MORTGAGE_BANKERS_LOAN_CORRESPONDENTS`
- `MOTEL_6`
- `MOTION_PICTURE_THEATERS`
- `MOTOR_FREIGHT_CARRIERS_AND_TRUCKING`
- `MOTOR_HOMES_DEALERS`
- `MOTOR_VEHICLE_SUPPLIES_AND_NEW_PARTS`
- `MOTORCYCLE_SHOPS_AND_DEALERS`
- `MOTORCYCLE_SHOPS_DEALERS`
- `MOUNT_CHARLOTTE_HOTELS`
- `MOUNT_COOK`
- `MOXY`
- `MUSIC_STORES_MUSICAL_INSTRUMENTS_PIANOS_AND_SHEET_MUSIC`
- `NATIONAIR`
- `NATIONAL_CAR_RENTAL`
- `NEMACOLIN_WOODLANDS`
- `NEST_HOTEL`
- `NEVELE_GRANDE_RESORT_AND_COUNTRY_CLUB`
- `NEW_OTANI_HOTELS`
- `NEW_YORK_NEW_YORK_HOTEL_AND_CASINO`
- `NEWS_DEALERS_AND_NEWSSTANDS`
- `NICKELODEON_FAMILY_SUITES_BY_HOLIDAY_INN`
- `NIGERIA_AIR`
- `NOAHS_HOTEL_MELBOURNE`
- `NON_FI_MONEY_ORDERS`
- `NON_FI_STORED_VALUE_CARD_PURCHASE_LOAD`
- `NONDURABLE_GOODS`
- `NORD_AIR`
- `NORONTAIR`
- `NORWEGIAN_AIR_SHUTTLE`
- `NOVOTEL_SIEH_ACCOR`
- `NURSERIES_LAWN_AND_GARDEN_SUPPLY_STORES`
- `NURSING_PERSONAL_CARE`
- `NWA_AIR`
- `NY_HELI`
- `OBEROI_HOTELS`
- `OFFICE_AND_COMMERCIAL_FURNITURE`
- `OHANA_HOTELS_OF_HAWAII`
- `OLYMPIC_AIRWAYS`
- `OMAN_AIR`
- `OMNI_INTERNATIONAL`
- `ONLINE_MARKETPLACES`
- `OPRYLAND_HOTEL`
- `OPTICIANS_EYEGLASSES`
- `OPTOMETRISTS_OPHTHALMOLOGIST`
- `ORCHID_AT_MAUNA_LAI`
- `ORIX_HOTELS_AND_RESORTS`
- `ORTHOPEDIC_GOODS_PROSTHETIC_DEVICES`
- `OSTEOPATHS`
- `OUTRIGGER_HOTELS_AND_RESORTS`
- `OVERPAYMENT_TRANSACTIONS`
- `OXFORD_SUITES`
- `PACKAGE_STORES_BEER_WINE_AND_LIQUOR`
- `PAINTS_VARNISHES_AND_SUPPLIES`
- `PAKISTAN_INTERNATIONAL`
- `PAN_AMERICAN`
- `PANNONIA_HOTELS`
- `PARIS_LAS_VEGAS_HOTEL`
- `PARK_INN_BY_RADISSON`
- `PARK_PLAZA_HOTEL`
- `PARKING_LOTS_GARAGES`
- `PARKS_INNS_INTERNATIONAL`
- `PASSENGER_RAILWAYS`
- `PATRICIA_GRAND_RESORT_HOTELS`
- `PAWN_SHOPS`
- `PAYLESS_CAR_RENTAL`
- `PAYMENT_SERVICE_PROVIDER_MONEY_TRANSFER`
- `PBA_AIRLINE`
- `PEABODY_HOTELS`
- `PENINSULA_HOTELS`
- `PENTA_HOTELS`
- `PEPPERMILL_HOTEL_CASINO`
- `PERSONAL_CREDIT_INSTITUTIONS`
- `PET_SHOPS_PET_FOOD_AND_SUPPLIES`
- `PETROLEUM_AND_PETROLEUM_PRODUCTS`
- `PHILIPPINE_AIRLINES`
- `PHOTO_DEVELOPING`
- `PHOTOGRAPHIC_PHOTOCOPY_MICROFILM_EQUIPMENT_AND_SUPPLIES`
- `PHOTOGRAPHIC_STUDIOS`
- `PICTURE_VIDEO_PRODUCTION`
- `PIECE_GOODS_NOTIONS_AND_OTHER_DRY_GOODS`
- `PINEHURST_RESORT`
- `PINLESS_DEBIT_BILLPAY_TIER_2`
- `PLM_ETAP_INTERNATIONAL`
- `PLUMBING_HEATING_EQUIPMENT_AND_SUPPLIES`
- `POLITICAL_ORGANIZATIONS`
- `POSTAL_SERVICES_GOVERNMENT_ONLY`
- `PRECIOUS_STONES_AND_METALS_WATCHES_AND_JEWELRY`
- `PREMIER_TRAVEL_INNS`
- `PRIMADONNA_HOTEL_AND_CASINO`
- `PRINCE_HOTELS`
- `PRINCESS_HOTELS_INTERNATIONAL`
- `PRINCEVILLE_AIR`
- `PRINCEVILLE_RESORT`
- `PROFESSIONAL_SERVICES`
- `PROTEA_HOTELS`
- `PUBLIC_WAREHOUSING_AND_STORAGE`
- `QATAR_AIRWAYS`
- `QUALITY_INTERNATIONAL`
- `QUALITY_PACIFIC_HOTEL`
- `QUANTAS`
- `QUASI_CASH_CUSTOMER_FINANCIAL_INSTITUTIONS`
- `QUEENS_MOAT_HOUSES`
- `QUICK_COPY_REPRO_AND_BLUEPRINT`
- `QUINTESSA_HOTEL`
- `RADISSON`
- `RADISSON_BLU`
- `RAFFLES_HOTELS`
- `RAILROADS`
- `RAMADA_INNS`
- `RANK_HOTELS`
- `RANTASIPI_HOTELS`
- `REAL_ESTATE_AGENTS_AND_MANAGERS_RENTALS`
- `RECORD_STORES`
- `RECREATIONAL_VEHICLE_RENTALS`
- `RED_ROOF_INNS`
- `REGAL_8_INNS`
- `REGENT_HOTELS`
- `REGISTRY_HOTELS`
- `RELAX_INNS`
- `RELIGIOUS_GOODS_STORES`
- `RELIGIOUS_ORGANIZATIONS`
- `RELO_VACATIONS`
- `REMOTE_STORED_VALUE_LOAD_FINANCIAL_INSTITUTION`
- `REMOTE_STORED_VALUE_LOAD_MERCHANT`
- `RENAISSANCE_HOTELS`
- `RENO_AIR`
- `RENT_A_WRECK`
- `REPLACEMENT_RENT_A_CAR`
- `RESERVE_RENT_A_CAR`
- `RESIDENCE_INN`
- `RESO_HOTELS`
- `RICA_HOTELS`
- `RIO_HOTELS`
- `RIO_SUITES`
- `RITZ_CARLTON`
- `RIVERSIDE_RESORT_AND_CASINO`
- `RIVIERA_HOTEL_AND_CASINO`
- `RIYADH_AIR`
- `RODEWAY_INNS_INTERNATIONAL`
- `ROOFING_SIDING_SHEET_METAL`
- `ROSEN_HOTEL_AND_RESORTS`
- `ROYAL_HOTELS`
- `ROYAL_KONA_RESORT`
- `ROYCE_HOTEL`
- `RYANAIR`
- `SABENA`
- `SADDLEBROOK_RESORT_TAMPA`
- `SAETA_AIR`
- `SAHARA_HOTEL_AND_CASINO`
- `SAHSA_AIR`
- `SAMS_TOWN_HOTEL_AND_CASINO`
- `SAN_JUAN_AIR`
- `SANCO_INN`
- `SANDMAN_HOTELS`
- `SANDMAN_INN`
- `SANDS_RESORT`
- `SARA_HOTELS`
- `SAROVA_HOTELS`
- `SAUDIA_ARABIAN_AIRLINES`
- `SCANDIC_HOTELS`
- `SCANDINAVIAN_AIRLINE_SYSTEM`
- `SCENIC_AIRLINES`
- `SEA_PINES_RESORT`
- `SECRETARIAL_SUPPORT_SERVICES`
- `SECURITY_BROKERS_DEALERS`
- `SERVICE_STATIONS`
- `SETTLE_INN`
- `SEWING_NEEDLEWORK_FABRIC_AND_PIECE_GOODS_STORES`
- `SHANGRI_LA_INTERNATIONAL`
- `SHERATON`
- `SHILO_INN`
- `SHOE_REPAIR_HAT_CLEANING`
- `SHOE_STORES`
- `SHONEYS_INN`
- `SHOWCASE_RENTAL_CARS`
- `SILVER_LEGACY_HOTEL_AND_CASINO`
- `SILVER_STAR_HOTEL_AND_CASINO`
- `SIMMONS_AIRLINES`
- `SINGAPORE_AIRLINES`
- `SINGLETON_AIR`
- `SIXT_CAR_RENTAL`
- `SKYWAYS_AIR`
- `SLEEP_INN`
- `SMALL_APPLIANCE_REPAIR`
- `SMILE_HOTEL`
- `SMUGGLERS_NOTCH_RESORT`
- `SNAPPY_CAR_RENTAL`
- `SNOWMOBILE_DEALERS`
- `SOFITEL_HOTELS`
- `SOHO_GRAND_HOTEL`
- `SOKOS_HOTEL`
- `SOL_HOTELS`
- `SONESTA_INTERNATIONAL_HOTELS`
- `SOTETSU_FRESA_INN`
- `SOUTH_AFRICAN_AIRWAYS`
- `SOUTHERN_PACIFIC_HOTEL`
- `SOUTHERN_SUN_HOTELS`
- `SOUTHWEST_AIRLINES`
- `SPANAIR`
- `SPECIAL_TRADE_SERVICES`
- `SPECIALTY_CLEANING`
- `SPIRIT_AIRLINES`
- `SPORTING_GOODS_STORES`
- `SPORTING_RECREATION_CAMPS`
- `SPORTS_AND_RIDING_APPAREL_STORES`
- `SPORTS_CLUBS_FIELDS`
- `SPRINGHILL_SUITES`
- `ST_REGIS_HOTEL`
- `STAKIS_HOTELS`
- `STAMP_AND_COIN_STORES`
- `STATIONARY_OFFICE_SUPPLIES_PRINTING_AND_WRITING_PAPER`
- `STATIONERY_STORES_OFFICE_AND_SCHOOL_SUPPLY_STORES`
- `STAYBRIDGE_SUITES`
- `STEIGENBERGER`
- `STRATOSPHERE_HOTEL_AND_CASINO`
- `STUDIO_PLUS`
- `SUDAN_AIRWAYS`
- `SUISSE_CHALET`
- `SUMMERFIELD_SUITES_HOTEL`
- `SUN_COUNTRY_AIRLINES`
- `SUNBELT_AIRLINES`
- `SUNWORLD_AIR`
- `SUPER_8_MOTEL`
- `SUPER_HOTEL`
- `SURINAM_AIRWAYS`
- `SWALLOW_HOTELS`
- `SWIMMING_POOLS_SALES`
- `SWISS_AIR`
- `SWISSOTEL`
- `T_UI_TRAVEL_GERMANY`
- `TACA_INTERNATIONAL_AIR`
- `TAILORS_ALTERATIONS`
- `TAJ_HOTELS_INTL`
- `TAL_AIR`
- `TAM_AIRLINES`
- `TAME_AIR`
- `TAN_AIR`
- `TAP_AIR_PORTUGAL`
- `TAROM_AIR`
- `TAX_PAYMENTS_GOVERNMENT_AGENCIES`
- `TAX_PREPARATION_SERVICES`
- `TAXICABS_LIMOUSINES`
- `TELECOMMUNICATION_EQUIPMENT_AND_TELEPHONE_SALES`
- `TELECOMMUNICATION_SERVICES`
- `TELEGRAPH_SERVICES`
- `TENT_AND_AWNING_SHOPS`
- `TESTING_LABORATORIES`
- `THAI_AIRWAYS`
- `THE_ATLANTIC`
- `THE_DIPLOMAT_COUNTRY_CLUB_AND_SPA`
- `THE_ELIOT_HOTEL`
- `THE_FLAMINGO_HOTELS`
- `THE_LUXURY_COLLECTION`
- `THE_PALACE_HOTEL`
- `THE_PHOENICIAN`
- `THE_ROOSEVELT_HOTEL_NY`
- `THE_WIGWAM_GOLF_RESORT_AND_SPA`
- `THEATRICAL_TICKET_AGENCIES`
- `THRIFTY_CAR_RENTAL`
- `THUNDERBIRD_RED_LION`
- `THY_AIRLINE`
- `TIGERAIR`
- `TILDEN_RENT_A_CAR`
- `TIMESHARES`
- `TIRE_RETREADING_AND_REPAIR`
- `TOKYO_GROUP`
- `TOKYU_HARVESTCLUB`
- `TOLLS_BRIDGE_FEES`
- `TOURIST_ATTRACTIONS_AND_EXHIBITS`
- `TOWER_AIR`
- `TOWING_SERVICES`
- `TOWN_AND_COUNTRY_RESORT_AND_CONVENTION_CENTER`
- `TOWNEPLACE_SUITES`
- `TRADEWINDS_RESORT`
- `TRAILER_PARKS_CAMPGROUNDS`
- `TRANS_WORLD_AIRLINES`
- `TRANSAERO`
- `TRANSPORTATION_SERVICES`
- `TRAVEL_AGENCIES_TOUR_OPERATORS`
- `TRAVELODGE_MOTELS`
- `TREASURE_ISLAND_HOTEL_AND_CASINO`
- `TRIANGLE_RENT_A_CAR`
- `TRIBECA_GRAND_HOTEL`
- `TRIBUTE_PORTFOLIO`
- `TROPICAL_RENT_A_CAR`
- `TROPICANA_RESORT_AND_CASINO`
- `TRUCK_STOP_ITERATION`
- `TRUCK_UTILITY_TRAILER_RENTALS`
- `TRUSTHOUSE_FORTE`
- `TUNIS_AIR`
- `TYPESETTING_PLATE_MAKING_AND_RELATED_SERVICES`
- `TYPEWRITER_STORES`
- `UGLY_DUCKLING_RENT_A_CAR`
- `UNI_AIRWAYS_CORPORATION`
- `UNIFORMS_COMMERCIAL_CLOTHING`
- `UNITED_AIRLINES`
- `US_AIR_SHUTTLE`
- `US_AIRWAYS`
- `US_FEDERAL_GOVERNMENT_AGENCIES_OR_DEPARTMENTS`
- `USA_RENTAL`
- `USED_MERCHANDISE_AND_SECONDHAND_STORES`
- `UTA_INTERAIR`
- `UTILITIES`
- `VAGABOND_HOTELS`
- `VALLEY_AIRLINES`
- `VALUE_RENT_A_CAR`
- `VANGUARD_AIR`
- `VARIETY_STORES`
- `VARIG`
- `VASP_AIR`
- `VDARA`
- `VENETIAN_RESORT_HOTEL_AND_CASINO`
- `VENTURE_INN`
- `VETERINARY_SERVICES`
- `VIASA_AIR`
- `VIDEO_AMUSEMENT_GAME_SUPPLIES`
- `VIDEO_GAME_ARCADES`
- `VIDEO_TAPE_RENTAL_STORES`
- `VILLA_FONTAINE`
- `VIRGIN_AMERICA`
- `VIRGIN_ATLANTIC`
- `VIRGIN_EXPRESS_AIR`
- `VIRGIN_RIVER_HOTEL_AND_CASINO`
- `VLM_AIRLINES`
- `VOCATIONAL_TRADE_SCHOOLS`
- `W_HOTELS`
- `WALDORF`
- `WASHINGTON_HOTEL`
- `WATCH_JEWELRY_REPAIR`
- `WELCOMGROUP`
- `WELDING_REPAIR`
- `WELLESLEY_INNS`
- `WESTIN_HOTELS`
- `WESTJET_AIRLINES`
- `WHISKEY_PETES_HOTEL_AND_CASINO`
- `WHOLESALE`
- `WHOLESALE_CLUBS`
- `WIDEROES`
- `WIG_AND_TOUPEE_STORES`
- `WILDERNESS_HOTEL_AND_RESORT`
- `WINDWARD_ISLAND_AIR`
- `WINE_PRODUCERS`
- `WINGS_AIRWAYS`
- `WIRES_MONEY_ORDERS`
- `WIZZ_AIR`
- `WOMENS_ACCESSORY_AND_SPECIALTY_SHOPS`
- `WOMENS_READY_TO_WEAR_STORES`
- `WOODSIDE_HOTELS_AND_RESORTS`
- `WRECKING_AND_SALVAGE_YARDS`
- `WYNDHAM`
- `WYNN_LAS_VEGAS`
- `YUTORELO`
- `ZAMBIA_AIRWAYS`

### `MerchantStatus`

The lifecycle status of a `Merchant`.

- `ACTIVE`
- `PENDING`
- `SUSPENDED`
- `TERMINATED`

### `Month`

A month in the calendar year.

- `APRIL`
- `AUGUST`
- `DECEMBER`
- `FEBRUARY`
- `JANUARY`
- `JULY`
- `JUNE`
- `MARCH`
- `MAY`
- `NOVEMBER`
- `OCTOBER`
- `SEPTEMBER`

### `NationalIdentificationNumberType`

National identification number types.

- `EMPLOYER_IDENTIFICATION_NUMBER`
- `INDIVIDUAL_TAXPAYER_IDENTIFICATION_NUMBER`
- `ISRAELI_IDENTITY_NUMBER`
- `NATIONAL_INSURANCE_NUMBER`
- `SOCIAL_INSURANCE_NUMBER`
- `SOCIAL_SECURITY_NUMBER`

### `NonOriginatedAchTransferStatus`

The status of a `NonOriginatedAchTransfer`.

- `CANCELED`
- `FAILED`
- `PROCESSED`
- `RECEIVED`
- `RETURNED`

### `NormalBalance`

The expected balance of a Ledger.

- `CREDIT`
- `DEBIT`

### `NotificationEventName`

The Notification Events that can be triggered in the Highnote platform.

- `ACCOUNT_STATUS_ACTIVE`
- `ACCOUNT_STATUS_CLOSED`
- `ACCOUNT_STATUS_PENDING_CLOSURE`
- `ACCOUNT_STATUS_SUSPENDED`
- `ACCOUNT_STATUS_UNDER_REVIEW`
- `ACH_EXTERNALLY_INITIATED_DEPOSIT_FAILED`
- `ACH_EXTERNALLY_INITIATED_DEPOSIT_PROCESSED`
- `ACH_EXTERNALLY_INITIATED_DEPOSIT_RECEIVED`
- `ACH_EXTERNALLY_INITIATED_WITHDRAWAL_FAILED`
- `ACH_EXTERNALLY_INITIATED_WITHDRAWAL_PROCESSED`
- `ACH_EXTERNALLY_INITIATED_WITHDRAWAL_RECEIVED`
- `ACH_FUNDS_DEPOSIT_CANCELED`
- `ACH_FUNDS_DEPOSIT_FAILED`
- `ACH_FUNDS_DEPOSIT_INITIATED`
- `ACH_FUNDS_DEPOSIT_PROCESSED`
- `ACH_FUNDS_DEPOSIT_PROCESSING`
- `ACH_FUNDS_DEPOSIT_RETURNED`
- `ACH_FUNDS_WITHDRAWAL_CANCELED`
- `ACH_FUNDS_WITHDRAWAL_FAILED`
- `ACH_FUNDS_WITHDRAWAL_INITIATED`
- `ACH_FUNDS_WITHDRAWAL_PROCESSED`
- `ACH_FUNDS_WITHDRAWAL_PROCESSING`
- `ACH_FUNDS_WITHDRAWAL_RETURNED`
- `ACH_HOLD_ADDED`
- `ACH_HOLD_REMOVED`
- `ACH_REPAYMENT_FAILED`
- `ACH_REPAYMENT_PROCESSED`
- `ACH_REPAYMENT_PROCESSING`
- `ACH_REPAYMENT_RETURNED`
- `ACH_SECURE_DEPOSIT_CANCELED`
- `ACH_SECURE_DEPOSIT_FAILED`
- `ACH_SECURE_DEPOSIT_INITIATED`
- `ACH_SECURE_DEPOSIT_PROCESSED`
- `ACH_SECURE_DEPOSIT_PROCESSING`
- `ACH_SECURE_DEPOSIT_RETURNED`
- `ACH_TRANSFER_HOLD_ADDED`
- `ACH_TRANSFER_HOLD_REMOVED`
- `AUTHORIZATION_CREATED`
- `AUTHORIZED_USER_CARD_PRODUCT_APPLICATION_APPROVED`
- `AUTHORIZED_USER_CARD_PRODUCT_APPLICATION_CLOSED`
- `AUTHORIZED_USER_CARD_PRODUCT_APPLICATION_DENIED`
- `AUTHORIZED_USER_CARD_PRODUCT_APPLICATION_DOCUMENT_UPLOAD_REQUESTED`
- `AUTHORIZED_USER_CARD_PRODUCT_APPLICATION_IN_REVIEW`
- `AUTHORIZED_USER_CARD_PRODUCT_APPLICATION_MANUAL_REVIEW`
- `AUTHORIZED_USER_CARD_PRODUCT_APPLICATION_UNDERWRITING_DECISION_REQUESTED`
- `BALANCE_NOTIFICATION_EVENT`
- `BUSINESS_ACCOUNT_HOLDER_IDENTITY_DOCUMENTS_REQUESTED`
- `BUSINESS_ACCOUNT_HOLDER_IDENTITY_UPDATED`
- `BUSINESS_AUTHORIZED_PERSON_IDENTITY_DOCUMENTS_REQUESTED`
- `BUSINESS_AUTHORIZED_PERSON_IDENTITY_UPDATED`
- `BUSINESS_ULTIMATE_BENEFICIAL_OWNER_IDENTITY_DOCUMENTS_REQUESTED`
- `BUSINESS_ULTIMATE_BENEFICIAL_OWNER_IDENTITY_UPDATED`
- `CARD_DIGITAL_WALLET_TOKEN_ACTIVATED`
- `CARD_DIGITAL_WALLET_TOKEN_SUSPENDED`
- `CARD_DIGITAL_WALLET_TOKEN_TERMINATED`
- `CARD_PAYMENT_AUTHORIZATION_DECLINED_EVENT`
- `CARD_PAYMENT_AUTHORIZED_EVENT`
- `CARD_PAYMENT_AUTHORIZING_EVENT`
- `CARD_PAYMENT_CAPTURE_DECLINED_EVENT`
- `CARD_PAYMENT_CAPTURE_PROCESSING_EVENT`
- `CARD_PAYMENT_CAPTURED_EVENT`
- `CARD_PAYMENT_CAPTURING_EVENT`
- `CARD_PAYMENT_CLEARED_EVENT`
- `CARD_PAYMENT_CLEARING_FAILED_EVENT`
- `CARD_PAYMENT_DISBURSED_EVENT`
- `CARD_PAYMENT_DISPUTE_ACTION_REQUIRED`
- `CARD_PAYMENT_INCREMENTAL_AUTHORIZATION_DECLINED_EVENT`
- `CARD_PAYMENT_INCREMENTAL_AUTHORIZED_EVENT`
- `CARD_PAYMENT_PARTIAL_REVERSED_EVENT`
- `CARD_PAYMENT_PAYOUT_EVENT`
- `CARD_PAYMENT_REVERSAL_DECLINED_EVENT`
- `CARD_PAYMENT_REVERSED_EVENT`
- `CARD_PAYMENT_SETTLED_EVENT`
- `CARD_PAYMENT_VERIFICATION_DECLINED_EVENT`
- `CARD_PAYMENT_VERIFICATION_PENDING_EVENT`
- `CARD_PAYMENT_VERIFIED_EVENT`
- `CARD_PRODUCT_APPLICATION_APPROVED`
- `CARD_PRODUCT_APPLICATION_CLOSED`
- `CARD_PRODUCT_APPLICATION_CREDIT_REPORT_FRAUD_ALERT`
- `CARD_PRODUCT_APPLICATION_CREDIT_REPORT_FREEZE`
- `CARD_PRODUCT_APPLICATION_DENIED`
- `CARD_PRODUCT_APPLICATION_DOCUMENT_UPLOAD_REQUESTED`
- `CARD_PRODUCT_APPLICATION_IDENTITY_UPDATE_REQUESTED`
- `CARD_PRODUCT_APPLICATION_IN_REVIEW`
- `CARD_PRODUCT_APPLICATION_MANUAL_REVIEW`
- `CARD_PRODUCT_APPLICATION_OFFER_MANAGEMENT_REQUESTED`
- `CARD_PRODUCT_APPLICATION_UNDERWRITING_DECISION_REQUESTED`
- `CHECK_PAYMENT_EVENT_COMPLETED`
- `CHECK_PAYMENT_EVENT_FAILED`
- `CHECK_PAYMENT_EVENT_FUNDING_COMPLETED`
- `CHECK_PAYMENT_EVENT_FUNDING_DISBURSED`
- `CHECK_PAYMENT_EVENT_FUNDING_PENDING`
- `CHECK_PAYMENT_EVENT_FUNDING_STARTED`
- `CHECK_PAYMENT_EVENT_ON_RISK_HOLD`
- `CHECK_PAYMENT_EVENT_PAID`
- `CHECK_PAYMENT_EVENT_PENDING_PROCESSING_BY_HIGHNOTE`
- `CHECK_PAYMENT_EVENT_PENDING_SHIPMENT`
- `CHECK_PAYMENT_EVENT_PRINTED`
- `CHECK_PAYMENT_EVENT_PROCESSED_BY_HIGHNOTE`
- `CHECK_PAYMENT_EVENT_PROCESSING_BY_HIGHNOTE`
- `CHECK_PAYMENT_EVENT_REVERSAL_COMPLETED`
- `CHECK_PAYMENT_EVENT_REVERSAL_INITIATED`
- `CHECK_PAYMENT_EVENT_SHIPPED`
- `CHECK_PAYMENT_EVENT_VOIDED`
- `CREDIT_LIMIT_CHANGE_REQUEST_STATUS_CHANGED`
- `CRYPTO_FUNDING_FLOW_FAILED`
- `CRYPTO_FUNDING_FLOW_PROCESSED`
- `CRYPTO_FUNDING_FLOW_PROCESSING`
- `CRYPTO_FUNDING_FLOW_RECEIVED`
- `DOCUMENT_UPLOAD_REQUESTED_EVENT`
- `DOCUMENT_UPLOAD_SESSION_COMPLETE_EVENT`
- `EXTERNAL_BANK_ACCOUNT_ADDED`
- `EXTERNAL_BANK_ACCOUNT_REMOVED`
- `FEE_CHARGE_EVENT`
- `FEE_REVERSAL_EVENT`
- `FILE_UPLOAD_COMPLETE_EVENT`
- `FINANCIAL_ACCOUNT_ATTRIBUTE_ADDED_CHARGE_OFF`
- `FINANCIAL_ACCOUNT_ATTRIBUTE_ADDED_CLOSED_WITH_BALANCE`
- `FINANCIAL_ACCOUNT_ATTRIBUTE_ADDED_DELINQUENT`
- `FINANCIAL_ACCOUNT_ATTRIBUTE_ADDED_DELINQUENT_SUSPENDED`
- `FINANCIAL_ACCOUNT_ATTRIBUTE_ADDED_PROGRAM_OWNER_INITIATED_SUSPENSION`
- `FINANCIAL_ACCOUNT_ATTRIBUTE_REMOVED_CHARGE_OFF`
- `FINANCIAL_ACCOUNT_ATTRIBUTE_REMOVED_CLOSED_WITH_BALANCE`
- `FINANCIAL_ACCOUNT_ATTRIBUTE_REMOVED_DELINQUENT`
- `FINANCIAL_ACCOUNT_ATTRIBUTE_REMOVED_DELINQUENT_SUSPENDED`
- `FINANCIAL_ACCOUNT_ATTRIBUTE_REMOVED_PROGRAM_OWNER_INITIATED_SUSPENSION`
- `FINANCIAL_ACCOUNT_STATEMENT_READY`
- `INSTANT_NETWORK_TRANSFER_COMPLETED_EVENT`
- `INSTANT_NETWORK_TRANSFER_FAILED_EVENT`
- `INSTANT_NETWORK_TRANSFER_INITIATED_EVENT`
- `INTERNAL_TRANSFER_BETWEEN_FINANCIAL_ACCOUNTS_COMPLETED`
- `INTERNAL_TRANSFER_BETWEEN_FINANCIAL_ACCOUNTS_FAILED`
- `INTERNAL_TRANSFER_BETWEEN_FINANCIAL_ACCOUNTS_PENDING`
- `INTERNAL_TRANSFER_FROM_FUNDING_FINANCIAL_ACCOUNT_TO_PAYMENT_CARD_FINANCIAL_ACCOUNT_COMPLETED`
- `INTERNAL_TRANSFER_FROM_FUNDING_FINANCIAL_ACCOUNT_TO_PAYMENT_CARD_FINANCIAL_ACCOUNT_FAILED`
- `INTERNAL_TRANSFER_FROM_FUNDING_FINANCIAL_ACCOUNT_TO_PAYMENT_CARD_FINANCIAL_ACCOUNT_PENDING`
- `INTERNAL_TRANSFER_FROM_PAYMENT_CARD_FINANCIAL_ACCOUNT_TO_FUNDING_FINANCIAL_ACCOUNT_COMPLETED`
- `INTERNAL_TRANSFER_FROM_PAYMENT_CARD_FINANCIAL_ACCOUNT_TO_FUNDING_FINANCIAL_ACCOUNT_FAILED`
- `INTERNAL_TRANSFER_FROM_PAYMENT_CARD_FINANCIAL_ACCOUNT_TO_FUNDING_FINANCIAL_ACCOUNT_PENDING`
- `LINK_VERIFIED_EXTERNAL_BANK_ACCOUNT_FAILED`
- `NON_ORIGINATED_ACH_TRANSFER_FAILED`
- `NON_ORIGINATED_ACH_TRANSFER_PROCESSED`
- `NON_ORIGINATED_ACH_TRANSFER_RECEIVED`
- `NON_ORIGINATED_ACH_TRANSFER_RETURNED`
- `NON_ORIGINATED_RTP_TRANSFER_COMPLETED_EVENT`
- `NON_ORIGINATED_RTP_TRANSFER_FAILED_EVENT`
- `NON_ORIGINATED_RTP_TRANSFER_PROCESSING_EVENT`
- `NON_ORIGINATED_RTP_TRANSFER_RECEIVED_EVENT`
- `NOTIFICATION_ACTIVATION`
- `ORIGINATED_ACH_TRANSFER_CANCELED`
- `ORIGINATED_ACH_TRANSFER_FAILED`
- `ORIGINATED_ACH_TRANSFER_INITIATED`
- `ORIGINATED_ACH_TRANSFER_PENDING`
- `ORIGINATED_ACH_TRANSFER_PROCESSED`
- `ORIGINATED_ACH_TRANSFER_PROCESSING`
- `ORIGINATED_ACH_TRANSFER_RETURNED`
- `ORIGINATED_RTP_TRANSFER_COMPLETED_EVENT`
- `ORIGINATED_RTP_TRANSFER_FAILED_EVENT`
- `ORIGINATED_RTP_TRANSFER_INITIATED_EVENT`
- `ORIGINATED_RTP_TRANSFER_PENDING_EVENT`
- `ORIGINATED_RTP_TRANSFER_PROCESSING_EVENT`
- `PAYMENT_CARD_ACTIVATED`
- `PAYMENT_CARD_ADJUSTMENT`
- `PAYMENT_CARD_AUTHORIZATION_AND_CLEAR_APPROVED`
- `PAYMENT_CARD_AUTHORIZATION_AND_CLEAR_DECLINED`
- `PAYMENT_CARD_AUTHORIZATION_APPROVED`
- `PAYMENT_CARD_AUTHORIZATION_CREATED`
- `PAYMENT_CARD_AUTHORIZATION_DECLINED`
- `PAYMENT_CARD_AUTHORIZATION_REVERSED`
- `PAYMENT_CARD_CLEARED`
- `PAYMENT_CARD_CLOSED`
- `PAYMENT_CARD_ENHANCED_DATA_RECEIVED`
- `PAYMENT_CARD_ISSUED`
- `PAYMENT_CARD_SUSPENDED`
- `PAYMENT_CARD_TRANSACTION_CHARGEBACK_PROVISIONAL_CREDIT_ISSUED`
- `PAYMENT_CARD_TRANSACTION_CHARGEBACK_PROVISIONAL_CREDIT_REVOKED`
- `PAYMENT_CARD_TRANSACTION_DISPUTE_CASE_STATUS_CANCELLED`
- `PAYMENT_CARD_TRANSACTION_DISPUTE_CASE_STATUS_CASE_CARDHOLDER_LOST`
- `PAYMENT_CARD_TRANSACTION_DISPUTE_CASE_STATUS_CASE_CARDHOLDER_WON`
- `PAYMENT_CARD_TRANSACTION_DISPUTE_CASE_STATUS_INITIATED`
- `PAYMENT_CARD_TRANSACTION_DISPUTE_CASE_STATUS_REJECTED`
- `PAYMENT_CARD_TRANSACTION_DISPUTE_CASE_STATUS_RESOLVED_WITH_DISPUTE_CREDIT`
- `PAYMENT_CARD_TRANSACTION_DISPUTE_CREDIT_ISSUED`
- `PAYMENT_CARD_TRANSACTION_DISPUTE_CREDIT_REVERSED`
- `PAYMENT_CARD_TRANSACTION_DISPUTE_PROVISIONAL_CREDIT_ISSUED`
- `PAYMENT_CARD_TRANSACTION_DISPUTE_PROVISIONAL_CREDIT_REVOKED`
- `PAYMENT_CARD_TRANSACTION_DISPUTE_PROVISIONAL_CREDIT_WON`
- `PAYMENT_CARD_UNSUSPENDED`
- `PAYMENT_CARD_VERIFICATION_APPROVED`
- `PAYMENT_CARD_VERIFICATION_DECLINED`
- `PAYMENT_METHOD_CAPABILITY_STATUS_DISABLED_EVENT`
- `PAYMENT_METHOD_CAPABILITY_STATUS_ENABLED_EVENT`
- `PAYMENT_METHOD_CAPABILITY_STATUS_REQUIRES_REVIEW_EVENT`
- `PAYMENT_METHOD_CAPABILITY_STATUS_REVIEWED_EVENT`
- `PAYOUT_TRANSFER_COMPLETED_EVENT`
- `PAYROLL_ADVANCE_REPAYMENT_COMPLETED`
- `PAYROLL_ADVANCE_WRITE_OFF_COMPLETED`
- `PERSON_ACCOUNT_HOLDER_IDENTITY_DOCUMENTS_REQUESTED`
- `PERSON_ACCOUNT_HOLDER_IDENTITY_UPDATED`
- `PHYSICAL_PAYMENT_CARD_GROUP_ORDER_SHIP_FAILED`
- `PHYSICAL_PAYMENT_CARD_GROUP_ORDER_SHIPPED`
- `PHYSICAL_PAYMENT_CARD_SHIP_FAILED`
- `PHYSICAL_PAYMENT_CARD_SHIPPED`
- `PROVISION_ACCOUNT_HOLDER_COMPLETED`
- `PROVISION_ACCOUNT_HOLDER_CREATE_APPLICATION_COMPLETED`
- `PROVISION_ACCOUNT_HOLDER_CREATE_APPLICATION_ERROR`
- `PROVISION_ACCOUNT_HOLDER_CREATE_APPLICATION_IN_PROGRESS`
- `PROVISION_ACCOUNT_HOLDER_CREATE_APPLICATION_INITIATED`
- `PROVISION_ACCOUNT_HOLDER_CREATE_APPLICATION_NOT_COMPLETED`
- `PROVISION_ACCOUNT_HOLDER_ERROR`
- `PROVISION_ACCOUNT_HOLDER_IN_PROGRESS`
- `PROVISION_ACCOUNT_HOLDER_INITIATED`
- `PROVISION_ACCOUNT_HOLDER_ISSUE_FINANCIAL_ACCOUNT_COMPLETED`
- `PROVISION_ACCOUNT_HOLDER_ISSUE_FINANCIAL_ACCOUNT_ERROR`
- `PROVISION_ACCOUNT_HOLDER_ISSUE_FINANCIAL_ACCOUNT_IN_PROGRESS`
- `PROVISION_ACCOUNT_HOLDER_ISSUE_FINANCIAL_ACCOUNT_INITIATED`
- `PROVISION_ACCOUNT_HOLDER_ISSUE_FINANCIAL_ACCOUNT_NOT_COMPLETED`
- `PROVISION_ACCOUNT_HOLDER_ISSUE_PAYMENT_CARD_COMPLETED`
- `PROVISION_ACCOUNT_HOLDER_ISSUE_PAYMENT_CARD_ERROR`
- `PROVISION_ACCOUNT_HOLDER_ISSUE_PAYMENT_CARD_IN_PROGRESS`
- `PROVISION_ACCOUNT_HOLDER_ISSUE_PAYMENT_CARD_INITIATED`
- `PROVISION_ACCOUNT_HOLDER_ISSUE_PAYMENT_CARD_NOT_COMPLETED`
- `PROVISION_ACCOUNT_HOLDER_LINK_EXTERNAL_BANK_ACCOUNT_COMPLETED`
- `PROVISION_ACCOUNT_HOLDER_LINK_EXTERNAL_BANK_ACCOUNT_ERROR`
- `PROVISION_ACCOUNT_HOLDER_LINK_EXTERNAL_BANK_ACCOUNT_IN_PROGRESS`
- `PROVISION_ACCOUNT_HOLDER_LINK_EXTERNAL_BANK_ACCOUNT_INITIATED`
- `PROVISION_ACCOUNT_HOLDER_LINK_EXTERNAL_BANK_ACCOUNT_NOT_COMPLETED`
- `PROVISION_ACCOUNT_HOLDER_NOTIFY_PROVIDER_COMPLETED`
- `PROVISION_ACCOUNT_HOLDER_NOTIFY_PROVIDER_ERROR`
- `PROVISION_ACCOUNT_HOLDER_NOTIFY_PROVIDER_IN_PROGRESS`
- `PROVISION_ACCOUNT_HOLDER_NOTIFY_PROVIDER_INITIATED`
- `PROVISION_ACCOUNT_HOLDER_NOTIFY_PROVIDER_NOT_COMPLETED`
- `PROVISION_ACCOUNT_HOLDER_REGISTER_VISA_PAYABLE_FUNDING_ACCOUNT_COMPLETED`
- `PROVISION_ACCOUNT_HOLDER_REGISTER_VISA_PAYABLE_FUNDING_ACCOUNT_ERROR`
- `PROVISION_ACCOUNT_HOLDER_REGISTER_VISA_PAYABLE_FUNDING_ACCOUNT_IN_PROGRESS`
- `PROVISION_ACCOUNT_HOLDER_REGISTER_VISA_PAYABLE_FUNDING_ACCOUNT_INITIATED`
- `PROVISION_ACCOUNT_HOLDER_REGISTER_VISA_PAYABLE_FUNDING_ACCOUNT_NOT_COMPLETED`
- `PROVISION_ACCOUNT_HOLDER_REJECTED`
- `PROVISION_ACCOUNT_HOLDER_SET_CREDIT_LIMIT_COMPLETED`
- `PROVISION_ACCOUNT_HOLDER_SET_CREDIT_LIMIT_ERROR`
- `PROVISION_ACCOUNT_HOLDER_SET_CREDIT_LIMIT_IN_PROGRESS`
- `PROVISION_ACCOUNT_HOLDER_SET_CREDIT_LIMIT_INITIATED`
- `PROVISION_ACCOUNT_HOLDER_SET_CREDIT_LIMIT_NOT_COMPLETED`
- `REPORT_COMPLETED`
- `REPORT_FAILED`
- `UNIFIED_FUNDS_TRANSFER_COMPLETED_EVENT`
- `UNIFIED_FUNDS_TRANSFER_FAILED_EVENT`
- `UNIFIED_FUNDS_TRANSFER_INITIATED_EVENT`
- `UPCOMING_STATEMENT_DUE_DATE`

### `NotificationTargetStatus`

The status of a notification target.

- `ACTIVATION_FAILED`
- `ACTIVE`
- `DEACTIVATED`
- `PENDING_VERIFICATION`

### `OnboardingApplicationStepStatus`

Status of an individual step of the business onboarding application

- `NOT_STARTED`
- `SUBMITTED`

### `OnboardingAverageMonthlyPaymentVolumeRange`

The range of monthly average volume for a business

- `BETWEEN_1_000_000_AND_5_000_000`
- `BETWEEN_5_000_000_AND_25_000_000`
- `BETWEEN_500_000_AND_1_000_000`
- `OVER_25_000_000`
- `UNDER_500_000`

### `OnboardingAverageMonthlyVolumeRange`

The range of monthly average volume for a business

- `BETWEEN_1_000_000_AND_5_000_000`
- `BETWEEN_10_000_000_AND_50_000_000`
- `BETWEEN_5_000_000_AND_10_000_000`
- `BETWEEN_500_000_AND_1_000_000`
- `OVER_50_000_000`
- `UNDER_500_000`

### `OnBoardingBusinessGlobalRegion`

Region of the world

- `APAC`
- `CANADA`
- `EUROPE`
- `LATIN_AMERICA`
- `OTHER`
- `UNITED_STATES`

### `OnboardingBusinessOrganizationInformationStatus`

Overall status on the business onboarding application

- `PROCESSING_STARTED`
- `UPDATE_COMPLETE`
- `UPDATE_IN_PROGRESS`

### `OnboardingBusinessPaymentSolution`

The types of payment solutions desired by the business

- `ACCEPT_PAYMENTS_AS_MARKETPLACE`
- `ACCEPT_PAYMENTS_ONLINE`
- `ACCEPT_PAYMENTS_ONLINE_AND_SWIPED`
- `ACCEPT_SWIPED_PAYMENTS`
- `ISSUE_VIRTUAL_CARDS`

### `OnboardingBusinessTitle`

The title held by the business representative

- `AUTHORIZED_SIGNATORY`
- `CEO`
- `CFO`
- `COO`
- `OWNER`
- `PRESIDENT`
- `TREASURER`
- `VICE_PRESIDENT`

### `OnboardingCustomerLocation`

Location where customers are based

- `HALF_UNITED_STATES`
- `MAJORITY_OUTSIDE_UNITED_STATES`
- `MAJORITY_UNITED_STATES`
- `UNITED_STATES`

### `OnboardingDesiredPaymentSolution`

The types of payment solutions desired by the business

- `ACCEPT_IN_PERSON_PAYMENTS`
- `ACCEPT_PAYMENTS_ONLINE`
- `ISSUE_PAYMENT_CARDS`

### `OnboardingPaymentCardBrand`

Possible Payment Card Brand types

- `AMERICAN_EXPRESS`
- `DINERS_CLUB`
- `DISCOVER`
- `JCB`
- `MAESTRO`
- `MASTERCARD`
- `VISA`

### `OnboardingPreApprovalStatus`

Status of the preliminary decision on the merchant onboarding application

- `APPROVED`
- `APPROVED_WITH_OUTREACH`
- `DENIED`
- `NOT_DECISIONED`
- `REDIRECT_TO_ISSUING`

### `OrganizationBusinessRelationshipStatus`

The status of an organization business relationship.

- `ACTIVE`
- `INACTIVE`

### `OrganizationBusinessRelationshipType`

The type of an organization business relationship.

- `CUSTOMER`
- `PARTNER`

### `OrganizationReportType`

Available report types that apply to `Organizations` and that can be passed into
`initiateOrganizationReport`.

- `ACH_EVENT_ACTIVITY`
- `CARD_INTERCHANGE_ACTIVITY`
- `CARD_TRANSACTION_ACTIVITY`
- `CREDIT_LOAN_TAPE`
- `EXPERIAN_CREDIT_REPORT`
- `FLEET_ENHANCED_DATA_SUMMARY`
- `LEDGER_ENTRY`
- `NEGATIVE_ACCOUNT_BALANCE`
- `RECEIVABLE_ACCOUNTS_SALE`
- `RECEIVABLE_SALE`
- `RECEIVABLE_SALE_AGREEMENT`
- `RECEIVABLE_SALE_TRANSACTIONS`
- `TRANSFER_EVENT_ACTIVITY`

### `OriginatedAchTransferStatus`

The status of an `OriginatedAchTransfer`.

- `CANCELED`
- `FAILED`
- `INITIATED`
- `PENDING`
- `PROCESSED`
- `PROCESSING`
- `RETURNED`

### `PanEntryMode`

The PAN entry mode.

- `BAR_CODE_OR_QR_CODE`
- `CC_UNABLE_TO_PROCESS_ENTERED_VIA_MAGNETIC_STRIPE`
- `CHIP_CARD_UNABLE_TO_PROCESS_ENTERED_MANUALLY`
- `CONTACTLESS_VIA_CHIP_RULES`
- `CONTACTLESS_VIA_MAGNETIC_STRIPE_RULES`
- `CREDENTIALS_ON_FILE`
- `FULL_MAGNETIC_STRIPE_READ`
- `ICC_CARD_CVV_DATA_MAY_BE_UNRELIABLE`
- `INTEGRATED_CIRCUIT_CARD`
- `MAGNETIC_STRIPE`
- `MANUAL`
- `MANUAL_KEY_ENTERED`
- `OPTICAL_CHARACTER_READER`
- `PAN_AUTO_ENTRY_VIA_SERVER`
- `RESERVED`
- `SECURE_CARD_LESS_ENTRY`
- `VIA_ELECTRONIC_COMMERCE`

### `PartnerBankName`

The possible bank names.

- `BANCORP`
- `BNY`
- `CASS_BANK`
- `CELTIC`
- `CFSB`
- `CROSS_RIVER`
- `FINWISE_BANK`
- `HIGHNOTE`
- `SUTTON`
- `SVB_BANK`
- `TRANSPECOS_BANK`
- `VERITEX_BANK`

### `PayfacStatus`

The lifecycle status of a `Payfac`.

- `ACTIVE`
- `INACTIVE`
- `SUSPENDED`

### `PaymentAdvanceStatus`

The states of a Payment Advance.

- `FULLY_REPAID`
- `NOT_REPAID`
- `PARTIALLY_REPAID`
- `WRITTEN_OFF`

### `PaymentAdvanceWriteOffReason`

The reasons for writing off a payment advance.

- `EXCEED_MAX_ATTEMPT_COUNT`

### `PaymentCardBinClassification`

Possible Payment Card Bin classification.

- `BUSINESS`
- `COMMERCIAL`
- `CONSUMER`
- `FLEET`
- `GOVERNMENT`

### `PaymentCardBinFundingModel`

Possible Payment Card Bin funding model.

- `CREDIT`
- `DEBIT`
- `PREPAID`

### `PaymentCardBinProductCode`

Possible Payment Card Bin Product Codes.

- `MASTERCARD_MCF`
- `MASTERCARD_MCO`
- `MASTERCARD_MDB`
- `MASTERCARD_MDJ`
- `MASTERCARD_MPA`
- `MASTERCARD_MPG`
- `MASTERCARD_MPL`
- `MASTERCARD_MPM`
- `MASTERCARD_MPW`
- `MASTERCARD_MWF`
- `VISA_A`
- `VISA_B`
- `VISA_C`
- `VISA_F`
- `VISA_G`
- `VISA_G1`
- `VISA_G4`
- `VISA_I`
- `VISA_J3`
- `VISA_K`
- `VISA_K1`
- `VISA_Q`
- `VISA_Q2`
- `VISA_Q3`
- `VISA_Q4`
- `VISA_Q5`
- `VISA_Q6`
- `VISA_R`
- `VISA_S`
- `VISA_S1`
- `VISA_S2`
- `VISA_X`

### `PaymentCardBinSubProductCode`

Possible Payment Card Bin Sub Product Codes.

- `VISA_BX`
- `VISA_CB`
- `VISA_FS`
- `VISA_GI`
- `VISA_GP`
- `VISA_GV`
- `VISA_HS`
- `VISA_IC`
- `VISA_IP`
- `VISA_MS`
- `VISA_OT`
- `VISA_PP`
- `VISA_ST`
- `VISA_TP`

### `PaymentCardBrand`

Possible Payment Card Brand types

- `AMERICAN_EXPRESS`
- `DANKORT`
- `DINERS`
- `DISCOVER`
- `ELECTRON`
- `JCB`
- `MAESTRO`
- `MASTERCARD`
- `PAYMENT`
- `UNION_PAY`
- `VISA`

### `PaymentCardChargebackCreditStatus`

The credit status of the chargeback.

- `CREDIT_NOT_ISSUED`
- `CREDIT_PARTIALLY_WON`
- `CREDIT_PENDING_PARTIAL_WIN`
- `CREDIT_PENDING_WIN`
- `CREDIT_WON`
- `PROVISIONAL_CREDIT_ISSUED`
- `PROVISIONAL_CREDIT_PARTIALLY_WON`
- `PROVISIONAL_CREDIT_PENDING_ISSUE`
- `PROVISIONAL_CREDIT_PENDING_PARTIAL_WIN`
- `PROVISIONAL_CREDIT_PENDING_REVOCATION`
- `PROVISIONAL_CREDIT_PENDING_WIN`
- `PROVISIONAL_CREDIT_REVOKED`
- `PROVISIONAL_CREDIT_WON`

### `PaymentCardChargebackNetworkReasonCode`

The external network reason code of the chargeback.

- `ACCOUNT_NUMBER_NOT_ON_FILE`
- `AUTHORIZATION_RELATED_FOR_DUAL_MESSAGE_SYSTEM`
- `CANCELLED_RECURRING_TRANSACTION`
- `CARDHOLDER_DISPUTE`
- `CARDHOLDER_DISPUTE_US_ONLY`
- `CHIP_LIABILITY_SHIFT`
- `CHIP_PIN_LIABILITY_SHIFT_LOST_STOLEN`
- `CHIP_READ_POS_LATE_PRESENTMENT`
- `CREDIT_NOT_PROCESSED`
- `DOMESTIC_CHARGEBACK_INTRA_EUROPEAN_USE`
- `INCORRECT_CURRENCY`
- `INCORRECT_CURRENCY_OR_TRANSACTION_CODE`
- `INCORRECT_TRANSACTION_AMOUNT_OR_ACCOUNT_NUMBER`
- `INCORRECT_TRANSACTION_CODE`
- `INSTALLMENT_BILLING_DISPUTE`
- `LATE_PRESENTMENT`
- `NO_AUTHORIZATION`
- `NO_SHOW_ADDENDUM_OR_ATM_DISPUTE`
- `NON_RECEIPT_OF_CASH_OR_LOAD_TRANSACTION_VALUE_AT_ATM`
- `NOT_AS_DESCRIBED_OR_DEFECTIVE_MERCHANDISE`
- `NOT_AUTHORIZED_CARD_ABSENT`
- `NOT_AUTHORIZED_CARD_PRESENT`
- `POINT_OF_INTERACTION_ERRORS`
- `QUESTIONABLE_MERCHANT_ACTIVITY`
- `SERVICE_NOT_PROVIDED_MERCHANDISE_NOT_RECEIVED`
- `WARNING_BULLETIN_FILE`

### `PaymentCardChargebackStatus`

The status of the chargeback.

- `CANCELLED`
- `LOST`
- `PARTIALLY_WON`
- `RECEIVED`
- `REJECTED`
- `RESOLVED`
- `SUBMITTED`
- `WON`

### `PaymentCardClientTokenPermission`

Permissions for a PaymentCard Client Token

- `MANAGE_CARD_FULFILLMENT`
- `MANAGE_PAYMENT_CARD`
- `READ_FULFILLMENT_DETAILS`
- `READ_RESTRICTED_DETAILS`
- `SET_PAYMENT_CARD_PIN`

### `PaymentCardDigitalWalletDeviceType`

The Payment Card Digital Wallet Device Type.

- `MOBILE`
- `TABLET`
- `WATCH`

### `PaymentCardDisputeCategoryType`

The type of dispute category.

- `AUTHORIZATION`
- `CUSTOMER_DISPUTE`
- `FRAUD`
- `MERCHANT_DISPUTE`
- `PROCESSING_ERROR`

### `PaymentCardDisputeCreditStatus`

The credit status of the dispute credit.

- `ISSUED`
- `NOT_ISSUED`
- `PENDING_ISSUE`
- `PENDING_REVERSAL`
- `REVERSED`

### `PaymentCardDisputeCustomerClaimType`

The customer claim type of the dispute.

- `VERBAL`
- `WRITTEN`

### `PaymentCardDisputeLiability`

The possible dispute liability types for a payment card transaction.

- `ISSUER_LIABLE`
- `MERCHANT_LIABLE`

### `PaymentCardDisputeStatus`

The status of the dispute.

- `CANCELLED`
- `IN_PROGRESS`
- `INITIATED`
- `LOST`
- `PENDING_RESOLUTION`
- `REJECTED`
- `RESOLVED`
- `WON`

### `PaymentCardEmvType`

Possible Payment Card EMV types.

- `CONTACT`
- `CONTACTLESS`
- `NONE`

### `PaymentCardGroupOrderStatus`

Group order status.

- `APPROVED`
- `CANCELED`
- `NEW`
- `PENDING`
- `SENT_TO_PRINTER`
- `SHIP_FAILED`
- `SHIPPED`

### `PaymentCardNetwork`

The card networks that the Highnote platform uses to issue Payment Cards.

- `MASTERCARD`
- `VISA`

### `PaymentCardOrderStatus`

Payment card order status.

- `APPROVED`
- `CANCELED`
- `COMPLETED`
- `NEW`
- `SENT_TO_PRINTER`
- `SHIP_FAILED`
- `SHIPPED`

### `PaymentCardProvisionalCreditStatus`

The provisional credit status of the dispute.

- `FINALIZATION_FAILED`
- `FINALIZED`
- `ISSUED`
- `NOT_ISSUED`
- `PENDING_FINALIZATION`
- `PENDING_ISSUE`

### `PaymentCardShippingMethod`

Payment card shipping method.

- `FEDEX_2_DAY`
- `FEDEX_GROUND`
- `FEDEX_INTERNATIONAL_PRIORITY`
- `FEDEX_ONE_RATE`
- `FEDEX_OVERNIGHT`
- `FEDEX_PRIORITY_OVERNIGHT`
- `SAME_DAY_FEDEX_1_DAY`
- `SAME_DAY_FEDEX_GROUND`
- `SAME_DAY_UPS_GROUND`
- `SAME_DAY_UPS_NEXT_DAY`
- `SAME_DAY_UPS_SECOND_DAY`
- `SAME_DAY_USPS_GROUND`
- `SAME_DAY_USPS_PRIORITY`
- `UPS_GROUND`
- `UPS_NEXT_DAY`
- `UPS_SECOND_DAY`
- `USPS_EXPRESS`
- `USPS_GROUND`
- `USPS_PRIORITY`

### `PaymentCardStatus`

Possible statuses of a Payment Card.

- `ACTIVATION_REQUIRED`
- `ACTIVE`
- `CLOSED`
- `SUSPENDED`

### `PaymentCardStatusChangeReason`

The different reasons for a `PaymentCard` status change

- `CREATED`
- `EXPIRED`
- `LOST`
- `OTHER`
- `STOLEN`
- `UNSPECIFIED`

### `PaymentCardSuspensionFlag`

A suspension flag on a `PaymentCard`.

Payment Card Suspension Flags are used to denote the type of suspension on a `PaymentCard`.

- `ISSUER_INITIATED_SUSPENSION`
- `PROGRAM_OWNER_INITIATED_SUSPENSION`

### `PaymentCreditTransactionRefundReason`

The reason why the `PaymentTransaction` was refunded to the original payment method

- `CUSTOMER_REQUESTED`
- `DUPLICATE_TRANSACTION`
- `FRAUD`
- `INCORRECT_RECIPIENT`
- `OTHER`

### `PaymentMethod`

The Card Processing Network that will process a payment

- `CARD`

### `PaymentMethodTokenUsage`

How many times this `PaymentMethodToken` can be used.

- `REUSABLE`
- `SINGLE_USE`

### `PaymentMethodType`

Possible payment method types.

- `PAYMENT_CARD`

### `PaymentTransactionAccountNameVerificationResponseCode`

Possible values for the `PaymentTransactionAccountNameVerificationResponseCode` enum.

- `MATCHED`
- `NOT_APPLICABLE`
- `NOT_MATCHED`
- `NOT_PROVIDED`
- `PARTIALLY_MATCHED`

### `PaymentTransactionAddressCodeResponseCode`

Possible values for the `PaymentTransactionAddressCodeResponseCode` enum.

- `MATCHED`
- `NOT_MATCHED`
- `NOT_PROVIDED`
- `NOT_VERIFIED`
- `SKIPPED`
- `UNKNOWN`

### `PaymentTransactionLifecycleStepStatus`

The status of a `PaymentTransactionLifecycleStep`

- `COMPLETED`
- `DECLINED`
- `PENDING`
- `UNKNOWN`

### `PaymentTransactionPostalCodeResponseCode`

Possible values for the `PaymentTransactionCardCodeResponseCode` enum.

- `MATCHED`
- `NOT_MATCHED`
- `NOT_PROVIDED`
- `NOT_VERIFIED`
- `SKIPPED`
- `UNKNOWN`

### `PaymentTransactionResponseCodeProcessorResponseCode`

Possible response codes from the processor for a payment transaction.

- `APPROVED`
- `AUTHENTICATION_REQUIRED`
- `BAD_CVC3_DCVV`
- `BAD_CVV`
- `BAD_CVV2`
- `BLOCKED_CARD`
- `CHIP_CARD_ARQC_VALIDATION_FAILURE`
- `CLOSED_ACCOUNT`
- `DO_NOT_HONOR`
- `EXCEEDS_APPROVAL_AMOUNT_LIMIT`
- `EXCEEDS_WITHDRAWAL_FREQUENCY_LIMIT`
- `EXPIRED_CARD`
- `INACTIVE_CARD`
- `INCORRECT_EXPIRATION_DATE`
- `INSTANT_NETWORK_PULL_CAPABILITY_NOT_ENABLED`
- `INSTANT_NETWORK_PUSH_CAPABILITY_NOT_ENABLED`
- `INSUFFICIENT_FUNDS`
- `INVALID_AUTHORIZATION_EXPIRATION`
- `INVALID_CARD_NUMBER`
- `INVALID_MERCHANT`
- `INVALID_PAYMENT_CREDENTIAL`
- `INVALID_TRACK_DATA`
- `INVALID_TRANSACTION`
- `PROCESSOR_NETWORK_INTERNAL_ERROR`
- `PROCESSOR_NETWORK_NOT_AVAILABLE`
- `PROCESSOR_NETWORK_TIMED_OUT`
- `RE_ENTER_TRANSACTION`
- `RESTRICTED_LOCATION`
- `SPECIAL_CONDITION_NO_PICK_UP`
- `SUSPENDED_CARD`
- `TERMINATED_CARD`
- `TRANSACTION_NOT_PERMITTED`
- `TRANSACTION_NOT_SUPPORTED`
- `UNACTIVATED_CARD`
- `UNKNOWN`

### `PaymentTransactionSecurityCodeResponseCode`

Possible values for the `PaymentTransactionSecurityCodeResponseCode` enum.

- `MATCHED`
- `NOT_MATCHED`
- `NOT_PROVIDED`
- `NOT_VERIFIED`
- `SKIPPED`
- `UNKNOWN`

### `PaymentTransactionStatus`

Different statuses that a `PaymentTransaction` can be.

- `COMPLETED`
- `DECLINED`
- `DISPUTED`
- `PENDING`
- `PENDING_DISPUTE`
- `REVERSED`

### `PayOffType`

The possible values for Payment Detail type of the Payoff warning associated with the statement

- `MINIMUM_PAY_OFF`
- `THREE_YEAR_PAY_OFF`

### `PersonAccountHolderClientTokenPermission`

Permissions for a `PersonAccountHolder` Client Token

- `READ_PERSON_ACCOUNT_HOLDER_DETAILS`

### `PersonAccountHolderIdentityUpdateType`

The type of identifying information which has been modified in a `PersonAccountHolderIdentityUpdatedEvent`.

- `BILLING_ADDRESS`
- `CURRENT_DEBT_OBLIGATIONS`
- `DATE_OF_BIRTH`
- `EMPLOYMENT_STATUS`
- `FULL_LEGAL_NAME`
- `SOCIAL_SECURITY_NUMBER`
- `TOTAL_ANNUAL_INCOME`

### `PersonAuthorizedUserClientTokenPermission`

Permissions for a `PersonAuthorizedUser` Client Token

- `READ_PERSON_AUTHORIZED_USER_DETAILS`

### `PhoneLabel`

The types or usages of a phone number.

- `HOME`
- `MOBILE`
- `SUPPORT`
- `WORK`

### `PhysicalCardMaterial`

Physical Card Material

- `METAL`
- `PLASTIC`

### `PhysicalCardPersonalizationFormat`

the format of a physical card

- `EMBOSSED`
- `PRINTED`

### `PhysicalCardPersonalizationLineType`

The line type for the physical card profile

- `ACCOUNT_HOLDER_NAME`
- `BUSINESS_NAME`
- `CUSTOM`

### `PhysicalCardType`

The type of physical card.

- `CONTACTLESS_ONLY`
- `EMV_CHIP_CONTACT_ONLY`
- `EMV_CHIP_CONTACTLESS`
- `MAGNETIC_STRIPE_ONLY`

### `PhysicalCardVendorName`

The vendors for a physical card

- `ARROW_EYE`
- `DIGISEQ`
- `TAG`

### `PinEntryMode`

The PIN entry mode.

- `NO_PIN_ENTRY_CAPABILITY`
- `PIN_ENTRY_CAPABILITY`
- `PIN_PAD_INOPERATIVE`
- `PIN_VERIFIED_BY_TERMINAL_DEVICE`
- `RESERVED`

### `PinResponseCode`

The PIN Response Code value outlines whether the cardholder entered a PIN during the transaction, whether the PIN was validated, and the result of the validation.

- `DECRYPTION_ISSUE`
- `MATCH`
- `NO_MATCH`
- `NOT_PERFORMED`
- `NOT_PROVIDED`

### `PointOfServiceCategory`

An identification as to where a payment initiated

- `ADMINISTRATIVE_TERMINAL`
- `AUTHORIZATION`
- `AUTOMATED_FUEL_DISPENSER`
- `AUTOMATED_TELLER_MACHINE`
- `COUPON_MACHINE`
- `DIAL_TERMINAL`
- `ECOMMERCE`
- `ELECTRONIC_CASH_REGISTER`
- `FRANCHISE_TELLER`
- `HOME_TERMINAL`
- `INTERACTIVE_TELEVISION`
- `MICR_TERMINAL`
- `MPOS`
- `PAYMENT`
- `PERSONAL_BANKING`
- `PERSONAL_DIGITAL_ASSISTANCE`
- `POINT_OF_BANKING_TERMINAL`
- `POS_TERMINAL`
- `PUBLIC_UTILITY`
- `SCREEN_PHONE`
- `SCRIP_MACHINE`
- `SELF_SERVICE`
- `SMART_PHONE`
- `TELEPHONE_DEVICE`
- `TELLER`
- `TICKET_MACHINE`
- `TRAVELERS_CHECK_MACHINE`
- `UNATTENDED_CARDHOLDER_ACTIVATED_AUTHORIZED`
- `UNATTENDED_CARDHOLDER_ACTIVATED_NO_AUTHORIZATION`
- `UNATTENDED_CHIP_PIN_TERMINAL`
- `UNATTENDED_CUSTOMER_TERMINAL`
- `VENDING`
- `VRU`

### `PointOfServiceCategoryCondition`

A condition for the point of service category, which serves as acceptable input arguments for creating an authorization control.

- `ADMINISTRATIVE_TERMINAL`
- `AUTOMATED_FUEL_DISPENSER`
- `AUTOMATED_TELLER_MACHINE`
- `ECOMMERCE`
- `FRANCHISE_TELLER`
- `MICR_TERMINAL`
- `POINT_OF_BANKING_TERMINAL`
- `POS_TERMINAL`
- `TELLER`
- `VENDING`

### `PostalCodeResponseCode`

Code representing the result of AVS postal code verification

- `MATCH`
- `NO_MATCH`
- `NOT_PERFORMED`
- `NOT_PROVIDED`
- `ZIP5_MATCH`
- `ZIP9_MATCH`

### `PricingConfigurationAttachmentEntityType`

The type of entity a `PricingConfiguration` can be attached to.

- `MERCHANT`

### `PricingPlanStatus`

The lifecycle states for a `PricingPlan`.

- `ARCHIVED`
- `DRAFT`
- `PUBLISHED`

### `PricingRuleFrequency`

The frequency at which a `PricingRule` is evaluated and billed.

- `TRANSACTIONAL`

### `PricingRuleParameterType`

The type of a `PricingRuleParameter` value.

- `BOOLEAN`
- `DECIMAL`
- `LONG`
- `STRING`

### `PricingRuleTrigger`

The event that triggers a `PricingRule`.

- `BATCH`
- `TRANSACTION`

### `ProcessingCapabilityStatus`

The status of a `CardProcessingCapability`.

- `ACTIVE`
- `DEACTIVATED`
- `PENDING`
- `REJECTED`

### `ProductApplicationStatusCode`

The High-level status of a `ProductApplication`.

- `APPROVED`
- `CLOSED`
- `DENIED`
- `IN_REVIEW`
- `PENDING`

### `ProductApplicationWorkflowStatus`

The status of an `ProductApplicationWorkflow`

- `COMPLETED`
- `IN_PROGRESS`
- `PENDING`

### `ProductApplicationWorkflowType`

The type of `ProductApplicationWorkflow`

- `BUSINESS_RULE_VALIDATION`
- `CREATE_VPA_BUYER`
- `CREDIT_UNDERWRITING`
- `EXTERNAL_BANK_ONBOARDING`
- `IDENTITY`
- `OFFER_MANAGEMENT`
- `RISK`

### `ProvisionAccountHolderAction`

Defines the different actions that can be performed during the provisioning process for an account holder.

Each action represents a specific step or operation to be executed.

- `CREATE_APPLICATION`
- `ISSUE_FINANCIAL_ACCOUNT`
- `ISSUE_PAYMENT_CARD`
- `LINK_VERIFIED_EXTERNAL_BANK_ACCOUNT`
- `NOTIFY_PROVIDER`
- `REGISTER_VISA_PAYABLE_FUNDING_ACCOUNT`
- `SET_CREDIT_LIMIT`

### `ProvisionWorkflowProvider`

Defines the providers involved in the provisioning workflow.

Currently supported providers are listed, with their associated configuration and usage details.

- `BOTTOM_LINE`

### `PseudoBalanceAmountSign`

Indicates whether an amount should be added to or subtracted from the pseudo balance.
Used for balance adjustments and limit calculations.

- `NEGATIVE`
- `POSITIVE`

### `PseudoBalanceCadence`

Defines how frequently the pseudo balance resets automatically.
Controls the rollover period for balance tracking and limit enforcement.

Defaults to LIFETIME.

- `DAILY`
- `LIFETIME`
- `MONTHLY`
- `NINETY_DAYS`
- `QUARTERLY`
- `WEEKLY`
- `YEARLY`

### `RecurringAchTransferFrequencyCode`

The frequency of the scheduled transfer

- `MONTHLY`

### `RedemptionConfigurationType`

Method of Redemption for Rewards Points.

- `STATEMENT_CREDIT`

### `ReissueReason`

The different reasons for a `PaymentCard` to be reissued

- `EXPIRED`
- `LOST`
- `OTHER`
- `STOLEN`

### `RepaymentCategory`

The category of this `Repayment`. For example, `PURCHASE`, `INTEREST`, or `FEES`.

- `FEES`
- `INTEREST`
- `PURCHASE`

### `ReportStatus`

Represents the current status of a Report.

- `COMPLETED`
- `FAILED`
- `IN_PROGRESS`

### `ReportType`

All available report types.

- `ACH_EVENT_ACTIVITY`
- `CARD_INTERCHANGE_ACTIVITY`
- `CARD_TRANSACTION_ACTIVITY`
- `CREDIT_LOAN_TAPE`
- `EXPERIAN_CREDIT_REPORT`
- `FLEET_ENHANCED_DATA_SUMMARY`
- `LEDGER_ENTRY`
- `NEGATIVE_ACCOUNT_BALANCE`
- `RECEIVABLE_ACCOUNTS_SALE`
- `RECEIVABLE_SALE`
- `RECEIVABLE_SALE_AGREEMENT`
- `RECEIVABLE_SALE_TRANSACTIONS`
- `TRANSFER_EVENT_ACTIVITY`

### `RequestedIdentityUpdateStatus`

A status representing the state of the `RequestedIdentityUpdate`

- `CANCELED`
- `CONFIRMED`
- `INITIATED`
- `OPEN`

### `RequestedIdentityUpdateType`

The types of identity updates requested.

- `BILLING_ADDRESS`
- `DATE_OF_BIRTH`
- `EMAIL`
- `EMPLOYER_IDENTIFICATION_NUMBER`
- `FULL_LEGAL_NAME`
- `HOME_ADDRESS`
- `LEGAL_BUSINESS_NAME`
- `NEW_ULTIMATE_BENEFICIAL_OWNER`
- `OWNERSHIP_PERCENTAGE`
- `PHONE`
- `SOCIAL_SECURITY_NUMBER`

### `ReviewWorkflowEventStatus`

The status of the `ReviewWorkflowEvent`

- `APPROVED`
- `CANCELED`
- `COMPLETED`
- `FAILED`
- `PENDING`
- `REJECTED`
- `UNSPECIFIED`

### `RewardPointsActivityType`

Reward points activity that was requested during transfer

- `AWARD`
- `DEDUCT`
- `REDEEM`
- `REFUND`

### `RewardPointsActivityTypeInput`

Reward points activity that was requested during transfer

- `AWARD`
- `DEDUCT`

### `RewardPointsTransferFailureReasonCode`

Additional details regarding a `FAILED` reward points transfer.

- `ACCOUNT_CLOSED`
- `ACCOUNT_CURRENCY_MISMATCH`
- `ACCOUNT_NOT_FOUND`
- `INSUFFICIENT_FUNDS`
- `REWARD_POINT_FEATURE_NOT_ENABLED`

### `RewardPointsTransferSource`

Source of transfer request for reward points transfer

- `API`
- `CARD_TRANSACTION`
- `MANUAL_ADJUSTMENT`

### `RewardPointsTransferStatus`

Status of the reward points transfer.

- `COMPLETED`
- `FAILED`
- `PENDING`

### `RiskPeriodicityType`

Enumeration of periodicity options for data aggregation, allowing analysis over different time intervals.

- `MONTHLY`
- `WEEKLY`

### `RiskSmsMessageDirection`

The direction of an SMS message.

- `INBOUND`
- `OUTBOUND`
- `UNSPECIFIED`

### `RoundingStrategy`

The rounding strategy when a value has more minor unit precision than the system can process.

i.e. A value may have 5 decimal places, but the transfer only supports 2 decimal places. Highnote would round the value to support the transfer.

- `ROUND_DOWN`
- `ROUND_UP`

### `RtpTransferFailureReason`

Reasons an `RtpTransfer` may have failed.

- `ACCOUNT_CLOSED`
- `ACCOUNT_FROZEN`
- `ACCOUNT_NOT_ACTIVE`
- `ACCOUNT_NOT_FOUND`
- `CONFIGURATION_ERROR`
- `CURRENCY_MISMATCH`
- `INSUFFICIENT_FUNDS`
- `INVALID_AMOUNT`
- `NETWORK_ERROR`
- `NETWORK_NOT_SUPPORTED`
- `TIMEOUT`
- `TRANSFER_NOT_PERMITTED`
- `UNSPECIFIED`

### `RtpTransferStatus`

The status of an `RtpTransfer`.

- `CANCELLED`
- `COMPLETED`
- `FAILED`
- `HOLD`
- `INITIATED`
- `PENDING`
- `PROCESSING`
- `RECEIVED`

### `ScheduledTransferClientTokenPermission`

Permissions for a `ScheduledTransfer` Client Token

- `MANAGE_SCHEDULED_TRANSFER`

### `ScheduledTransferEventStatusCode`

The status of the scheduled transfer event

- `COMPLETED`
- `FAILED`
- `INITIATED`
- `NOT_EXECUTED`
- `REJECTED`

### `ScheduledTransferStatusCode`

The status of the scheduled transfer

- `ACTIVE`
- `CANCELED`
- `CLOSED`
- `SCHEDULED`

### `SchemaChangeCriticalityLevel`

The level of the `SchemaChange`

- `BREAKING`
- `DANGEROUS`
- `NON_BREAKING`

### `SearchQueryLanguageVersion`

Denotes the version of `SearchQueryLanguage` to be used.

- `VERSION_1`

### `SecondaryAtmNetwork`

Possible secondary atm network.

- `MAESTRO`
- `PLUS`
- `PULSE`

### `SecondaryPointOfSaleNetwork`

Possible secondart point of sale network.

- `INTERLINK`
- `NYCE`
- `PULSE`

### `SecondarySurchargeFreeAtmNetwork`

Possible secondary surcharge free atm network.

- `ALL_POINT`
- `MONEY_PASS`
- `SUM`

### `SecureDepositClientTokenPermission`

Permissions for a `InitiateSecureDeposit` Client Token

- `MANAGE_SECURE_DEPOSIT`

### `ServiceCode`

Specify intended POS behavior for card

- `INTERNATIONAL_ICC_NORMAL_NO_RESTRICTION`
- `INTERNATIONAL_NORMAL_NO_RESTRICTION`
- `NATIONAL_NORMAL_NO_RESTRICTION`

### `ServicemembersCivilReliefActStatus`

Possible status values for a `ServicemembersCivilReliefActConfiguration`.

- `APPROVED`
- `PENDING`
- `REJECTED`

### `SpendRuleRecommendation`

The recommendation to `ALLOW` or `BLOCK` an event based on the application of the spend rule.

- `ALLOW`
- `BLOCK`
- `NONE`

### `StockExchange`

Public stock exchanges.

- `NASDAQ`
- `NYSE`

### `SuspendCardDigitalWalletTokenReason`

Reasons for a card digital wallet token to be suspended.

- `DEVICE_LOST`
- `DEVICE_STOLEN`
- `FRAUDULENT_TRANSACTIONS`
- `OTHER`

### `TaxIdentificationNumberType`

The type of tax identification number.

- `EIN`
- `EMPLOYER_IDENTIFICATION_NUMBER`
- `INDIVIDUAL_TAXPAYER_IDENTIFICATION_NUMBER`
- `ITIN`
- `SOCIAL_SECURITY_NUMBER`
- `SSN`

### `TerminalAttendance`

The possible values for attendance at the terminal.

- `ATTENDED`
- `UNATTENDED`

### `TerminateCardDigitalWalletTokenReason`

Reasons for a card digital wallet token to be terminated.

- `ACCOUNT_HOLDER_DELETED`
- `DEVICE_LOST`
- `DEVICE_STOLEN`
- `FRAUDULENT_TRANSACTIONS`
- `OTHER`

### `TokenScope`

Possible scope of the token.

- `ECOMMERCE`

### `TokenUserApplicationType`

The type of application where a digital wallet token is provisioned for use.

- `BIOMETRIC_APPLICATION`
- `MARKETPLACE_APPLICATION`
- `MOBILE_APPLICATION`
- `MOBILE_WEB`
- `VOICE_APPLICATION`
- `WEB`

### `TransactionAdviceEventResponseCode`

The response code provided on an advice message.

- `APPROVED`
- `DO_NOT_HONOR`
- `SUSPECTED_FRAUD`

### `TransactionBatchStatus`

The status of a transaction batch.

- `CLEAR_PENDING`
- `CLEARED`
- `CLOSE_REQUESTED`
- `CLOSED`
- `DISBURSED`
- `DISBURSEMENT_PENDING`
- `ON_HOLD`
- `OPEN`
- `PAYOUT_SENT`
- `PROCESSING`
- `REJECTED`

### `TransactionEventFilter`

The filters used to scope the type of TransactionEvents returned.

- `ADJUSTMENT_EVENT`
- `AUTHORIZATION_AND_CLEAR_EVENT`
- `AUTHORIZATION_EVENT`
- `BALANCE_INQUIRY_EVENT`
- `CLEARING_EVENT`
- `ENHANCED_DATA_EVENT`
- `ISSUER_PRELIMINARY_AUTHORIZATION_EVENT`
- `REVERSAL_EVENT`
- `VERIFICATION_EVENT`

### `TransactionEventResponseCode`

The Highnote provided response code.

- `ALL_APPROVED_CODES`
- `ALL_ISSUER_DECLINED_CODES`
- `APPROVED`
- `APPROVED_FOR_PARTIAL_AMOUNT`
- `APPROVED_FOR_PURCHASE_AMOUNT_ONLY`
- `BAD_CVC3`
- `BAD_CVV`
- `BAD_CVV2`
- `BLOCKED_CARD`
- `CA_DECLINED`
- `CASH_BACK_LIMIT_EXCEEDED`
- `CHIP_CARD_ARQC_VALIDATION_FAILURE`
- `CLOSED_ACCOUNT`
- `DO_NOT_HONOR`
- `EXCEEDS_APPROVAL_AMOUNT_LIMIT`
- `EXCEEDS_WITHDRAWAL_FREQUENCY_LIMIT`
- `EXPIRED_CARD`
- `INCORRECT_EXPIRATION_DATE`
- `INCORRECT_PIN`
- `INSUFFICIENT_FUNDS`
- `INVALID_3DS_VERIFICATION`
- `INVALID_AUTHORIZATION_EXPIRATION`
- `INVALID_CARD_NUMBER`
- `INVALID_MERCHANT`
- `INVALID_TRACK_DATA`
- `INVALID_TRANSACTION`
- `NO_CARD_RECORD`
- `PIN_DECRYPTION_ERROR`
- `PRE_AUTHORIZATION_EXPIRED`
- `RE_ENTER_TRANSACTION`
- `REAL_TIME_RISK_DECISION_DECLINE`
- `RESTRICTED_ACCOUNT_HOLDER`
- `RESTRICTED_CARD_HOLDER`
- `RESTRICTED_LOCATION`
- `SPECIAL_CONDITION_NO_PICK_UP`
- `SUSPENDED_CARD`
- `SUSPENDED_DIGITAL_WALLET_TOKEN`
- `TERMINATED_CARD`
- `TERMINATED_DIGITAL_WALLET_TOKEN`
- `TRANSACTION_NOT_PERMITTED`
- `TRANSACTION_NOT_SUPPORTED`
- `UNACTIVATED_CARD`
- `UNACTIVATED_DIGITAL_WALLET_TOKEN`
- `VALID_ACCOUNT_AMOUNT_NOT_SUPPORTED`

### `TransactionFeeType`

The type of fee that was applied to a transaction.

- `SURCHARGE`

### `TransactionSearchObjectType`

A more granular logical grouping that different transaction objects are categorized
as to narrow searches down even further than `TransactionSearchType`.

- `ACH_TRANSFER`
- `CARD_TRANSACTION`
- `CHECK_PAYMENT`
- `DISBURSEMENT`
- `INSTANT_NETWORK_TRANSFER`
- `INSTANT_SETTLEMENT_TRANSACTION`
- `INTER_FINANCIAL_ACCOUNT_TRANSFER`
- `INTERNAL_ACCOUNT_TRANSFER`
- `MANUAL_ADJUSTMENT`
- `RTP_TRANSFER`
- `WIRE_TRANSFER`

### `TransactionSearchStatus`

A normalized status value that is shared across transaction types.

- `COMPLETED`
- `FAILED`
- `PENDING`

### `TransactionSearchType`

A top level logical grouping that different transaction objects are categorized
as to make searching across transaction types easier.

- `ACTIVITY`
- `EVENT`
- `TRANSACTION`

### `TransactionTypeFilter`

The filters used to scope TransactionEvents to specific types of Transactions.

- `CREDIT`
- `DEBIT`

### `TransferBalanceAmountCode`

The transfer balance strategy for a transfer

- `MINIMUM_PAYMENT`
- `OUTSTANDING_BALANCE`
- `OUTSTANDING_STATEMENT_BALANCE`

### `TransferDateCode`

The date strategy for a transfer

- `PAYMENT_DUE_DATE`

### `TransferFundsChargeFromType`

Specifies which party is charged the fee.

- `DESTINATION`
- `SOURCE`

### `TransferFundsPaymentPreference`

Payment rail preferences.

- `INSTANT_NETWORK_TRANSFER`
- `RTP`

### `TransferPurpose`

Purpose for the transfer.

- `ADJUSTMENT`
- `DECREASE_PSEUDO_BALANCE`
- `DECREASE_PSEUDO_LIMIT`
- `EARNED_CREDIT`
- `EARNED_CREDIT_REVERSAL`
- `GENERAL`
- `GOODS_AND_SERVICES`
- `INCREASE_PSEUDO_BALANCE`
- `INCREASE_PSEUDO_LIMIT`
- `INTRA_COMPANY`
- `ISSUER_BALANCE_MIGRATION`
- `MERCHANT_PAYOUT`
- `PAYOUT`
- `PAYROLL`
- `PAYROLL_ADVANCE`
- `PAYROLL_ADVANCE_REPAYMENT`
- `PAYROLL_ADVANCE_REPAYMENT_REVERSAL`
- `PAYROLL_ADVANCE_REVERSAL`
- `PAYROLL_REVERSAL`
- `PEER_TO_PEER`
- `PEER_TO_PEER_REVERSAL`
- `PREFUNDED_ADVANCE`
- `PREFUNDED_ADVANCE_REPAYMENT`
- `REPAYMENT`
- `REPAYMENT_REVERSAL`
- `RESET_PSEUDO_BALANCE`
- `REWARD`
- `REWARD_REVERSAL`
- `SECURED_DEPOSIT`
- `SECURED_DEPOSIT_REVERSAL`
- `SET_PSEUDO_LIMIT`
- `TIP_DISBURSEMENT`
- `TIP_DISBURSEMENT_REVERSAL`

### `TransferStatus`

The states of a Transfer.

DEPRECATED: See ElectronicFundsTransfer and the types that implement it. They each have their own more specific version of status.

- `COMPLETED`
- `FAILED`
- `PENDING`
- `PROCESSING`

### `TransferStatusReasonCode`

The reasons a Transfer could fail.

DEPRECATED: See ElectronicFundsTransfer and the types that implement it. They each have their own more specific version of status reason code.

- `ACCOUNT_CLOSED`
- `ACCOUNT_HOLDER_IS_NOT_AN_ORGANIZATION`
- `ACCOUNT_NOT_FOUND`
- `CURRENCY_MISMATCH`
- `INSUFFICIENT_FUNDS`
- `PAYROLL_ADVANCE_FEATURE_NOT_ENABLED`

### `TransferType`

Denotes the type of transfer to create on a simulated `ExternallyInitiatedACHTransfer`.

- `CREDIT`
- `DEBIT`
- `PAYROLL`
- `SECURE_DEPOSIT`

### `UnderwriterVerificationStatusCode`

High-level account holder underwriting verification states.

- `DENIED`
- `IN_REVIEW`
- `PASSED`
- `PENDING`

### `UnifiedFundsTransferFailureReason`

Reasons an `UnifiedFundsTransfer` may have failed.

- `ACCOUNT_CLOSED`
- `ACCOUNT_FROZEN`
- `ACCOUNT_NOT_ACTIVE`
- `ACCOUNT_NOT_FOUND`
- `ACCOUNT_NOT_PROVIDED`
- `ACCOUNTS_DO_NOT_BELONG_TO_SAME_PRODUCT`
- `ACH_LOAD_NOT_ALLOWED_BY_PROGRAM`
- `ANI_VERIFICATION_FAILED`
- `BAD_CVC3_DCVV`
- `BAD_CVV`
- `BAD_CVV2`
- `BANK_MANAGED_BETA_ACCOUNT_FEATURE_NOT_ENABLED`
- `BLOCKED_CARD`
- `CARD_FUNDING_FEATURE_NOT_ENABLED`
- `CASH_BACK_LIMIT_EXCEEDED`
- `CASH_FUND_OUT_NOT_SUPPORTED_ON_PRODUCT`
- `CHARGE_OFF_EXCEEDS_BALANCE`
- `CHECK_CAPABLE_ACCOUNT_FEATURE_NOT_ENABLED`
- `CHECK_PAYMENT_NOT_SUPPORTED_ON_PRODUCT`
- `CHIP_CARD_ARQC_VALIDATION_FAILURE`
- `COMMERCIAL_CREDIT_PAY_IN_FULL_FEATURE_NOT_ENABLED`
- `COMPLIANCE_VERIFICATION_FAILED`
- `CORPORATE_BANK_ACCOUNT_FEATURE_NOT_ENABLED`
- `CREDIT_CARD_FEATURE_NOT_ENABLED`
- `CREDIT_LIMIT_NOT_SET_ON_ACCOUNT`
- `CRYPTO_FUNDING_ACCOUNT_FEATURE_NOT_ENABLED`
- `CRYPTO_RECEIVING_ACCOUNT_FEATURE_NOT_ENABLED`
- `CURRENCY_MISMATCH`
- `DDA_FEATURE_NOT_ENABLED`
- `DEBIT_CARD_FEATURE_NOT_ENABLED`
- `DISPUTE_CHARGEBACK_NOT_ENABLED`
- `DISPUTE_CHARGEBACK_PROVISIONAL_CREDIT_NOT_ENABLED`
- `DO_NOT_HONOR`
- `EXCEEDS_APPROVAL_AMOUNT_LIMIT`
- `EXCEEDS_WITHDRAWAL_FREQUENCY_LIMIT`
- `EXPIRED_CARD`
- `EXTERNAL_MONEY_MOVEMENT_NOT_SUPPORTED_ON_PRODUCT`
- `FEE_COLLECTION_FAILED`
- `FEE_REVERSAL_FAILED`
- `FEE_REVERSED`
- `FLEET_FEATURE_NOT_ENABLED`
- `FUNDING_ACCOUNT_FEATURE_NOT_ENABLED`
- `FUNDING_CARD_NOT_SUPPORTED`
- `HIGHNOTE_ACCOUNT_FEATURE_NOT_ENABLED`
- `IDEMPOTENCY_KEY_NOT_PROVIDED`
- `INSUFFICIENT_FUNDS`
- `INTER_FINANCIAL_ACCOUNT_TRANSFER_RULES_NOT_PASSED`
- `INTERNAL_SERVER_ERROR`
- `INVALID_AMOUNT`
- `INVALID_AUTHORIZATION_EXPIRATION`
- `INVALID_CARD_NUMBER`
- `INVALID_DISBURSEMENT_AMOUNT`
- `INVALID_MERCHANT`
- `INVALID_TRACK_DATA`
- `INVALID_TRANSACTION`
- `JIT_FEATURE_NOT_ENABLED`
- `MERCHANT_FUNDING_FEATURE_NOT_ENABLED`
- `MERCHANT_SETTLEMENT_FEATURE_NOT_ENABLED`
- `NETWORK_ERROR`
- `NETWORK_NOT_SUPPORTED`
- `NOT_AN_ORGANIZATION_OWNED_ACCOUNT`
- `NOT_ENOUGH_BALANCE_TO_REDUCE_CREDIT_LIMIT`
- `ODF_FEATURE_NOT_ENABLED`
- `ORGANIZATION_ID_NOT_PROVIDED`
- `ORIGINATED_ACH_UNLOAD_NOT_SUPPORTED_ON_PRODUCT`
- `PARTIAL_FUNDING_FEATURE_NOT_ENABLED`
- `PAYROLL_ADVANCE_FEATURE_NOT_ENABLED`
- `PAYROLL_EMPLOYER_ADVANCE_FEATURE_NOT_ENABLED`
- `PRE_AUTHORIZATION_EXPIRED`
- `PREPAID_CARD_FEATURE_NOT_ENABLED`
- `PRODUCT_FUNDING_FEATURE_NOT_ENABLED`
- `PRODUCT_SECURED_DEPOSIT_ACCOUNT_FEATURE_NOT_ENABLED`
- `PSEUDO_BALANCE_NOT_ENABLED`
- `PULL_PAYMENT_FAILED`
- `PUSH_PAYMENT_FAILED`
- `RE_ENTER_TRANSACTION`
- `RECEIVABLE_PURCHASE_NOT_ENABLED`
- `REPAYMENT_ACCOUNT_NOT_PRESENT_ON_PRODUCT`
- `RESTRICTED_LOCATION`
- `REWARD_POINT_FEATURE_NOT_ENABLED`
- `RISK_DECLINE`
- `SECURE_CARD_FEATURE_NOT_ENABLED`
- `SECURED_DEPOSIT_ACCOUNT_FEATURE_NOT_ENABLED`
- `SPECIAL_CONDITION_NO_PICK_UP`
- `SUSPENDED_CARD`
- `TENANT_ID_NOT_PROVIDED`
- `TERMINATED_CARD`
- `TIMEOUT`
- `TRANSACTION_ID_NOT_PROVIDED`
- `TRANSACTION_NOT_PERMITTED`
- `TRANSFER_AMOUNT_BELOW_MIN_PROGRAM_RELOAD_LIMIT`
- `TRANSFER_AMOUNT_EXCEEDING_MAX_AGGREGATE_CREDIT_DISTRIBUTION_AMOUNT`
- `TRANSFER_AMOUNT_EXCEEDING_MAX_PROGRAM_CARD_BALANCE`
- `TRANSFER_AMOUNT_EXCEEDING_MAX_PROGRAM_LOAD_LIMIT`
- `TRANSFER_AMOUNT_EXCEEDING_MAX_PROGRAM_RELOAD_LIMIT`
- `TRANSFER_AMOUNT_IS_NEGATIVE_OR_ZERO`
- `TRANSFER_BETWEEN_PRODUCTS_NOT_ALLOWED`
- `TRANSFER_CONDITION_SAME_PRIMARY_ACCOUNT_HOLDER_NOT_SATISFIED`
- `TRANSFER_NOT_PERMITTED`
- `TRANSFER_NOT_SUPPORTED`
- `TRANSFER_NOT_SUPPORTED_ON_PRODUCT`
- `TRANSFER_ORCHESTRATION_ID_NOT_PROVIDED`
- `UNACTIVATED_CARD`
- `VALID_ACCOUNT_AMOUNT_NOT_SUPPORTED`

### `UnifiedFundsTransferStatus`

The status of a `UnifiedFundsTransfer`.

- `COMPLETED`
- `FAILED`
- `PROCESSING`

### `UnsuspendCardDigitalWalletTokenReason`

Reasons for a card digital wallet token to be unsuspended/reactivated.

- `DEVICE_FOUND`
- `NON_FRAUDULENT_TRANSACTIONS`
- `OTHER`

### `UsBankAccountType`

The type of US bank account.

- `CHECKING`
- `SAVINGS`

### `UserDefinedFieldDefinitionDataType`

Defines the type that a `UserDefinedField` is.

- `BOOLEAN`
- `INTEGER`
- `STRING`

### `UserDefinedFieldDefinitionRelationshipType`

The relationship to the `Node` type that the `UserDefinedFieldDefinition` will apply to.

- `FINANCIAL_ACCOUNT`
- `PAYMENT_CARD`
- `WIRE_TRANSFER`

### `UserRole`

Types of User Roles, full details can be found [here](https://highnote.com/docs/basics/core-concepts/team-members)

- `ADMIN`
- `DEVELOPER`
- `FINANCE`
- `SUPPORT`
- `UNSPECIFIED`
- `USER`

### `ValidatedAddressLabel`

Possible labels for a validated address.

- `BUSINESS`
- `CMRA`
- `INACTIVE`
- `PO_BOX`
- `RESIDENTIAL`
- `UNCONFIRMED_EXTENDED_ADDRESS`
- `UNSECURED_LOCATION`
- `VACANT`

### `VelocityConstraintLevel`

The level at which a cumulative rule will be evaluated.

- `ACCOUNT`
- `ACCOUNT_HOLDER`
- `CARD`
- `CARD_LINEAGE`
- `PLATFORM`
- `PRODUCT`

### `VelocityRuleWindow`

A enum of `VelocityRule` evaluation windows

- `COOLDOWN_HOUR`
- `COOLDOWN_MINUTE`
- `DAILY`
- `MONTHLY`
- `NINETY_DAYS`
- `PER_TRANSACTION`
- `QUARTERLY`
- `WEEKLY`
- `YEARLY`

### `VerifiedExternalBankAccountLinkExperienceFlow`

The type of link experience.

- `ANDROID_SDK`
- `ANDROID_WEB_HOSTED`
- `IOS_SDK`
- `IOS_WEB_HOSTED`
- `WEB_HOSTED`
- `WEB_SDK`

### `VirtualCardPersonalizationType`

The Personalization type for the virtual card profile

- `BUSINESS_AUTHORIZED_PERSON_NAME`
- `BUSINESS_NAME`
- `GENERIC_NAME`
- `PERSON_NAME`
- `UNIQUE_GENERIC_NAME`

### `VisaAmountSignage`

Visa Fleet line item amount type (credit/debit)

Used for `visaShippingAmountSignage`, `visaDutyAmountSignage`, `visaShippingTaxAmountSignage`

- `CREDIT`
- `DEBIT`
- `NULL`

### `VisaCavvResultCode`

Information about the Cardholder Authentication Verification Value (CAVV) for this transaction.

- `FAILED`
- `FAILED_ISSUER_ATTEMPT`
- `FAILED_VISA_ATTEMPT`
- `FAILED_VISA_ATTEMPT_ISSUER_ACS_UNAVAILABLE`
- `NOT_VERIFIED`
- `NOT_VERIFIED_ATTEMPT`
- `NOT_VERIFIED_ISSUER_NOT_PARTICIPATING`
- `NOT_VERIFIED_SUCCESS`
- `PASSED`
- `PASSED_ISSUER_ATTEMPT`
- `PASSED_NO_LIABILITY_SHIFT`
- `PASSED_VISA_ATTEMPT`
- `PASSED_VISA_ATTEMPT_ISSUER_ACS_UNAVAILABLE`

### `VisaDiscountTreatment`

Visa Fleet discount treatment types

- `NO_DISCOUNT`
- `POST_DISCOUNT`
- `PRE_DISCOUNT`

### `VisaEvChargingReasonCode`

Visa Electric Vehicle Charging Reason Codes

- `CONNECTOR_LOCK_FAILURE`
- `EV_COMMUNICATION_ERROR`
- `GROUND_FAILURE`
- `HIGH_TEMPERATURE`
- `INTERNAL_ERROR`
- `NO_ERROR`
- `OTHER_ERROR`
- `OVER_CURRENT_FAILURE`
- `OVER_VOLTAGE`
- `PAYMENT_RELATED_ERROR`
- `POWER_METER_FAILURE`
- `POWER_SWITCH_FAILURE`
- `READER_FAILURE`
- `RESET_FAILURE`
- `UNDER_VOLTAGE`
- `WEAK_SIGNAL`

### `VisaEvConnectorType`

Visa Electric Vehicle Connector Types

- `AC_GBT`
- `AC_J1772`
- `AC_MENNEKES`
- `DC_CCS1`
- `DC_CCS2`
- `DC_CHADEMO`
- `DC_GBT`
- `NACS`

### `VisaFleetDiscountAgent`

Entity that calculated the discount

- `MERCHANT`
- `VISA`

### `VisaFleetDiscountMethod`

Visa Fleet discount method

- `BEST_OF_RETAIL_MINUS_OR_COST_PLUS`
- `COST_PLUS`
- `RETAIL_MINUS`

### `VisaFleetPurchaseIdentifierFormat`

Visa Fleet purchase Identifier format

- `INVOICE`
- `ORDER`

### `VisaFleetPurchaseRestrictionsType`

The kind of purchase-restriction processing supported for a Visa Fleet
authorization, as conveyed by the network.

- `CHIP_BASED`
- `CHIP_BASED_AND_HOST_BASED`
- `HOST_BASED`
- `NO_RESTRICTIONS_SUPPORTED`

### `VisaFuelPurchaseType`

Visa Fleet fuel purchase types

- `FUEL_PURCHASE`
- `MIXED`
- `NON_FUEL_PURCHASE`

### `VisaFuelServiceType`

Visa Fleet fuel service types

- `FULL_SERVICE`
- `HIGH_SPEED_DISPENSE`
- `SELF_SERVICE`

### `VisaFuelType`

Visa Fleet fuel types

- `ADDITIVE_DOSAGE`
- `AV_BIOFUEL`
- `AV_FUEL_4`
- `AV_FUEL_5`
- `AV_FUEL_JP8`
- `AV_FUEL_PREMIUM`
- `AV_FUEL_REGULAR`
- `AV_FUEL_UNDEFINED_1`
- `AV_FUEL_UNDEFINED_10`
- `AV_FUEL_UNDEFINED_11`
- `AV_FUEL_UNDEFINED_2`
- `AV_FUEL_UNDEFINED_3`
- `AV_FUEL_UNDEFINED_4`
- `AV_FUEL_UNDEFINED_5`
- `AV_FUEL_UNDEFINED_6`
- `AV_FUEL_UNDEFINED_7`
- `AV_FUEL_UNDEFINED_8`
- `AV_FUEL_UNDEFINED_9`
- `B10_DIESEL`
- `B100_DIESEL`
- `B11_DIESEL`
- `B15_DIESEL`
- `B2_DIESEL`
- `B20_DIESEL`
- `B5_DIESEL`
- `B75_DIESEL`
- `B99_DIESEL`
- `BIODIESEL_BLEND_10_OR_NT`
- `BIODIESEL_BLEND_11_OR_NT`
- `BIODIESEL_BLEND_15_OR_NT`
- `BIODIESEL_BLEND_2_OR_NT`
- `BIODIESEL_BLEND_20_OR_NT`
- `BIODIESEL_BLEND_5_OR_NT`
- `BIODIESEL_OFF_ROAD_NON_TAXABLE`
- `BIODIESEL_OFF_ROAD_NON_TAXABLE_35`
- `BIOJET`
- `BLENDED_DIESEL_1_2`
- `BOTTLED_PROPANE`
- `COMPRESSED_NAT_GAS`
- `DEF`
- `DIESEL_1_OR_NT`
- `DIESEL_1_PREMIUM_OR_NT`
- `DIESEL_2_OR_NT`
- `DIESEL_2_PREMIUM_OR_NT`
- `DIESEL_OFF_ROAD_NON_TAXABLE`
- `DIESEL_OFF_ROAD_TAXABLE`
- `E16_E84`
- `E85`
- `ETHANOL_57`
- `ETHANOL_77`
- `EVC_1`
- `EVC_2`
- `EVC_3`
- `GREEN_GAS_PLUS`
- `GREEN_GAS_REGULAR`
- `GREEN_GAS_SUPER`
- `H35`
- `H70`
- `HEATING_OIL`
- `JET_FUEL`
- `KEROSENE`
- `KEROSENE_LS_NT`
- `KEROSENE_ULS`
- `KEROSENE_ULS_NT`
- `LNG`
- `LO_UNL`
- `LPG`
- `M85`
- `MARINE_DIESEL`
- `MARINE_FUEL_1`
- `MARINE_FUEL_2`
- `MARINE_FUEL_3`
- `MARINE_FUEL_4`
- `MARINE_FUEL_5`
- `MARINE_FUEL_OTHER`
- `MID_PLUS`
- `MID_PLUS_2`
- `MID_PLUS_2_10`
- `MID_PLUS_ETHANOL_57`
- `MID_PLUS_ETHANOL_77`
- `MISC_AV_FUEL`
- `MISC_FUEL`
- `MISC_FUEL_1`
- `MISC_FUEL_2`
- `MISC_FUEL_3`
- `MISC_FUEL_4`
- `MISC_FUEL_5`
- `MISC_MARINE_FUEL`
- `MISC_OTHER_FUEL`
- `MISC_PACKAGED_FUEL`
- `OTHER_FUEL_NT`
- `PACKAGED_ADDITIVE`
- `PACKAGED_B100`
- `PACKAGED_B99`
- `PACKAGED_DEF`
- `PACKAGED_KEROSENE`
- `PACKAGED_PROPANE`
- `PLUS_2_OR_NT`
- `PLUS_ETHANOL_10`
- `PLUS_ETHANOL_15`
- `PLUS_ETHANOL_2_15`
- `PLUS_OR_NT`
- `PREMIUM_BIODIESEL_BLEND_OVER_20`
- `PREMIUM_BIODIESEL_BLEND_UNDER_20`
- `PREMIUM_DIESEL_1`
- `PREMIUM_DIESEL_2`
- `PREMIUM_SUPER`
- `PREMIUM_SUPER_2`
- `PREMIUM_SUPER_2_10`
- `PREMIUM_SUPER_ETHANOL_57`
- `RACING_FUEL`
- `RECREATIONAL_FUEL`
- `REFORMULATED_1`
- `REFORMULATED_2`
- `REFORMULATED_3`
- `REFORMULATED_4`
- `REFORMULATED_5`
- `REGULAR`
- `REGULAR_DIESEL_1`
- `REGULAR_DIESEL_2`
- `REGULAR_ETHANOL_10`
- `REGULAR_ETHANOL_15`
- `REGULAR_OR_NT`
- `RESERVED_1`
- `RESERVED_10`
- `RESERVED_11`
- `RESERVED_12`
- `RESERVED_13`
- `RESERVED_14`
- `RESERVED_15`
- `RESERVED_16`
- `RESERVED_17`
- `RESERVED_18`
- `RESERVED_19`
- `RESERVED_2`
- `RESERVED_20`
- `RESERVED_21`
- `RESERVED_22`
- `RESERVED_23`
- `RESERVED_24`
- `RESERVED_25`
- `RESERVED_3`
- `RESERVED_4`
- `RESERVED_5`
- `RESERVED_6`
- `RESERVED_7`
- `RESERVED_8`
- `RESERVED_9`
- `SUPER_2_OR_NT`
- `SUPER_ETHANOL_10`
- `SUPER_ETHANOL_15`
- `SUPER_ETHANOL_2_15`
- `SUPER_OR_NT`
- `ULTRA_LOW_SULFUR_1`
- `ULTRA_LOW_SULFUR_2`
- `ULTRA_LOW_SULFUR_BIODIESEL_BLEND_10`
- `ULTRA_LOW_SULFUR_BIODIESEL_BLEND_100`
- `ULTRA_LOW_SULFUR_BIODIESEL_BLEND_11`
- `ULTRA_LOW_SULFUR_BIODIESEL_BLEND_15`
- `ULTRA_LOW_SULFUR_BIODIESEL_BLEND_2`
- `ULTRA_LOW_SULFUR_BIODIESEL_BLEND_20`
- `ULTRA_LOW_SULFUR_BIODIESEL_BLEND_5`
- `ULTRA_LOW_SULFUR_PREMIUM_1`
- `UNDEFINED_FUEL_1`
- `UNDEFINED_FUEL_10`
- `UNDEFINED_FUEL_11`
- `UNDEFINED_FUEL_12`
- `UNDEFINED_FUEL_13`
- `UNDEFINED_FUEL_14`
- `UNDEFINED_FUEL_15`
- `UNDEFINED_FUEL_16`
- `UNDEFINED_FUEL_17`
- `UNDEFINED_FUEL_18`
- `UNDEFINED_FUEL_19`
- `UNDEFINED_FUEL_2`
- `UNDEFINED_FUEL_20`
- `UNDEFINED_FUEL_21`
- `UNDEFINED_FUEL_22`
- `UNDEFINED_FUEL_23`
- `UNDEFINED_FUEL_3`
- `UNDEFINED_FUEL_4`
- `UNDEFINED_FUEL_5`
- `UNDEFINED_FUEL_6`
- `UNDEFINED_FUEL_7`
- `UNDEFINED_FUEL_8`
- `UNDEFINED_FUEL_9`
- `UNDEFINED_OTHER_FUEL_1`
- `UNDEFINED_OTHER_FUEL_10`
- `UNDEFINED_OTHER_FUEL_11`
- `UNDEFINED_OTHER_FUEL_12`
- `UNDEFINED_OTHER_FUEL_13`
- `UNDEFINED_OTHER_FUEL_14`
- `UNDEFINED_OTHER_FUEL_15`
- `UNDEFINED_OTHER_FUEL_16`
- `UNDEFINED_OTHER_FUEL_17`
- `UNDEFINED_OTHER_FUEL_18`
- `UNDEFINED_OTHER_FUEL_2`
- `UNDEFINED_OTHER_FUEL_3`
- `UNDEFINED_OTHER_FUEL_4`
- `UNDEFINED_OTHER_FUEL_5`
- `UNDEFINED_OTHER_FUEL_6`
- `UNDEFINED_OTHER_FUEL_7`
- `UNDEFINED_OTHER_FUEL_8`
- `UNDEFINED_OTHER_FUEL_9`
- `UNDEFINED_PACKAGED_FUEL_1`
- `UNDEFINED_PACKAGED_FUEL_10`
- `UNDEFINED_PACKAGED_FUEL_11`
- `UNDEFINED_PACKAGED_FUEL_12`
- `UNDEFINED_PACKAGED_FUEL_13`
- `UNDEFINED_PACKAGED_FUEL_14`
- `UNDEFINED_PACKAGED_FUEL_15`
- `UNDEFINED_PACKAGED_FUEL_16`
- `UNDEFINED_PACKAGED_FUEL_17`
- `UNDEFINED_PACKAGED_FUEL_18`
- `UNDEFINED_PACKAGED_FUEL_2`
- `UNDEFINED_PACKAGED_FUEL_3`
- `UNDEFINED_PACKAGED_FUEL_4`
- `UNDEFINED_PACKAGED_FUEL_5`
- `UNDEFINED_PACKAGED_FUEL_6`
- `UNDEFINED_PACKAGED_FUEL_7`
- `UNDEFINED_PACKAGED_FUEL_8`
- `UNDEFINED_PACKAGED_FUEL_9`
- `UNKNOWN`
- `UNLEADED_METHANOL_57`
- `UNLEADED_METHANOL_77`
- `UNLEADED_PLUS_METHANOL_57`
- `UNLEADED_PLUS_METHANOL_77`
- `UNLEADED_SUPER_METHANOL_57`
- `WHITE_GAS`

### `VisaFuelUnitOfMeasure`

Visa Fleet fuel unit of measure types

- `CHARGING_MINUTES`
- `GALLON`
- `IMPERIAL`
- `KILO`
- `KILOWATT_HOUR`
- `LITER`
- `POUND`

### `VisaItemCommodityCode`

All the Visa Fleet commodity codes.

- `AC_PARTS`
- `AC_SERVICE`
- `ADDITIVE_DOSAGE`
- `AIR_FILTER`
- `AIRCRAFT_ACC`
- `AIRCRAFT_CLEANING`
- `AIRCRAFT_FUEL_ADDITIVE`
- `AIRCRAFT_GROUND_HAULING`
- `AIRCRAFT_GROUND_PU`
- `AIRCRAFT_LABOR`
- `AIRCRAFT_MAINTENANCE`
- `AIRCRAFT_PARKING_FEE`
- `AIRCRAFT_RENTAL`
- `AIRCRAFT_SANITATION`
- `AIRCRAFT_SERVICE`
- `AIRCRAFT_TIE_DOWN_FEE`
- `AIRCRAFT_WO`
- `AIRPORT_FEE`
- `ALT_SNACKS`
- `ANTI_FREEZE`
- `APU`
- `AV_BIOFUEL`
- `AV_FUEL_4`
- `AV_FUEL_5`
- `AV_FUEL_JP8`
- `AV_FUEL_PREMIUM`
- `AV_FUEL_REGULAR`
- `AV_GAS_FED_E_TAX`
- `AVIONICS`
- `B10_DIESEL`
- `B100_DIESEL`
- `B11_DIESEL`
- `B15_DIESEL`
- `B2_DIESEL`
- `B20_DIESEL`
- `B5_DIESEL`
- `B75_DIESEL`
- `B99_DIESEL`
- `BATTERIES`
- `BEER`
- `BEER_NA`
- `BIODIESEL_BLEND_10_OR_NT`
- `BIODIESEL_BLEND_11_OR_NT`
- `BIODIESEL_BLEND_15_OR_NT`
- `BIODIESEL_BLEND_2_OR_NT`
- `BIODIESEL_BLEND_20_OR_NT`
- `BIODIESEL_BLEND_5_OR_NT`
- `BIODIESEL_OFF_ROAD_NON_TAXABLE`
- `BIODIESEL_OFF_ROAD_NON_TAXABLE_35`
- `BIOJET`
- `BLENDED_DIESEL_1_2`
- `BODY_WORK`
- `BOTTLED_PROPANE`
- `BRAKE_FLUID`
- `BRAKE_SERVICE`
- `CALL_OUT_FEE`
- `CAR_WASH`
- `CARGO_HANDLING`
- `CASH_BACK`
- `CASH_BACK_FEE`
- `CATERING`
- `CBD`
- `CHARITY`
- `CHARTER_FEE`
- `CIGARETTES`
- `COLD_DISPENSED_BEV`
- `COMMUNICATION_FEE`
- `COMPRESSED_NAT_GAS`
- `CORROSION_INHIBITOR`
- `COUPON_1`
- `COUPON_2`
- `COUPON_3`
- `COUPON_4`
- `COUPON_5`
- `DE_FUEL`
- `DE_ICING`
- `DEF`
- `DELI_ITEMS`
- `DIESEL_1_OR_NT`
- `DIESEL_1_PREMIUM_OR_NT`
- `DIESEL_2_OR_NT`
- `DIESEL_2_PREMIUM_OR_NT`
- `DIESEL_OFF_ROAD_NON_TAXABLE`
- `DIESEL_OFF_ROAD_TAXABLE`
- `DISABLE_HANDSET`
- `DISCOUNT_1`
- `DISCOUNT_2`
- `DISCOUNT_3`
- `DISCOUNT_4`
- `DISCOUNT_5`
- `E16_E84`
- `E85`
- `ENABLE_HANDSET`
- `ENGINE_SERVICE`
- `ETHANOL_57`
- `ETHANOL_77`
- `EV_BATTERY_ECH`
- `EV_CHARGE`
- `EVC_1`
- `EVC_2`
- `EVC_3`
- `EXHAUST_SERVICE`
- `FEE_1`
- `FEE_2`
- `FEE_3`
- `FEE_4`
- `FEE_5`
- `FIN_PREPAID_ACT`
- `FIN_PREPAID_REL`
- `FLIGHT_PLANNING_FEES`
- `FLIGHT_PLANS`
- `FLOW_FEE`
- `FLUID_MILK`
- `FROZEN_DISPENSED_BEV`
- `FROZEN_FOOD`
- `FUEL_SYSTEM`
- `GEN_ALCOHOL`
- `GEN_AUTO_MERCH`
- `GEN_CANDY`
- `GEN_DAIRY`
- `GEN_DELI`
- `GEN_DISPENSED_BEV`
- `GEN_FOODSERVICE`
- `GEN_GROCERY`
- `GEN_HEALTH`
- `GEN_ICE`
- `GEN_LOTTERY`
- `GEN_MERCH`
- `GEN_MONEY_ORDER`
- `GEN_PACKAGED_BEV`
- `GEN_PUBLICATIONS`
- `GEN_PURPOSE_ACT`
- `GEN_PURPOSE_REL`
- `GEN_SNACKS`
- `GEN_STORE_SERVICE`
- `GEN_TOBACCO`
- `GEN_UNDEFINED_1`
- `GEN_UNDEFINED_2`
- `GEN_UNDEFINED_3`
- `GEN_UNDEFINED_4`
- `GEN_UNDEFINED_5`
- `GEN_UNDEFINED_6`
- `GEN_UNDEFINED_7`
- `GEN_UNDEFINED_8`
- `GES_FEE`
- `GRATUITY`
- `GREEN_GAS_PLUS`
- `GREEN_GAS_REGULAR`
- `GREEN_GAS_SUPER`
- `GROCERY_EDIBLE`
- `GROCERY_NON_EDIBLE`
- `GROCERY_PERISHABLE`
- `GST_HST_VAT_1`
- `H35`
- `H70`
- `HANGAR_FEE`
- `HEATING_OIL`
- `HOME_DELIVERY`
- `HOSES`
- `HOT_DISPENSED_BEV`
- `INSPECTION`
- `INSTRUCTION_FEE`
- `IT_BLADDER`
- `JET_FD_E_TAX`
- `JET_FUEL`
- `KEROSENE`
- `KEROSENE_LS_NT`
- `KEROSENE_ULS`
- `KEROSENE_ULS_NT`
- `LABOR`
- `LAMPS`
- `LANDING_FEE`
- `LAUNCH_FEE`
- `LIQUOR`
- `LNG`
- `LO_UNL`
- `LOCAL_DISCOUNT_1`
- `LOCAL_DISCOUNT_2`
- `LOCAL_DISCOUNT_3`
- `LOCAL_DISCOUNT_4`
- `LOCAL_DISCOUNT_5`
- `LODGING`
- `LOTTERY_IN`
- `LOTTERY_ON`
- `LOTTERY_OTHER`
- `LOTTERY_PO_IN`
- `LOTTERY_PO_ON`
- `LOTTERY_PO_OT`
- `LPG`
- `LUBE`
- `M85`
- `MARINE_DIESEL`
- `MARINE_FUEL_1`
- `MARINE_FUEL_2`
- `MARINE_FUEL_3`
- `MARINE_FUEL_4`
- `MARINE_FUEL_5`
- `MARINE_FUEL_OTHER`
- `MARINE_LABOR`
- `MARINE_SERVICE`
- `MARINE_WO`
- `MEMBERSHIP`
- `MID_PLUS`
- `MID_PLUS_2`
- `MID_PLUS_2_10`
- `MID_PLUS_ETHANOL_57`
- `MID_PLUS_ETHANOL_77`
- `MISC`
- `MISC_ADMIN`
- `MISC_AV_FUEL`
- `MISC_AV_PS`
- `MISC_AV_TAX`
- `MISC_FUEL`
- `MISC_MARINE_FUEL`
- `MISC_MARINE_PS`
- `MISC_NEG_ADMIN`
- `MISC_OTHER_FUEL`
- `MISC_PACKAGED_FUEL`
- `MISC_VEHICLE_PS`
- `MONEY_ORDER_DC`
- `MONEY_ORDER_GC`
- `MONEY_ORDER_OC`
- `MONEY_ORDER_PC`
- `MONEY_ORDER_REBC`
- `MONEY_ORDER_REFC`
- `MONEY_ORDER_UC`
- `MONEY_ORDER_VP`
- `MOTOR_OIL`
- `MULTI_BILL_PAY`
- `OIL_CHANGE`
- `OIL_FILTER`
- `OTHER_DAIRY`
- `OTHER_DISPENSED_BEV`
- `OTHER_FUEL_NT`
- `OTHER_LUBE`
- `OTHER_PACKAGED_BEV`
- `OVERTIME_FEE`
- `OXYGEN`
- `PACKAGED_ADDITIVE`
- `PACKAGED_B100`
- `PACKAGED_B99`
- `PACKAGED_BEV_NA`
- `PACKAGED_BREAD`
- `PACKAGED_DEF`
- `PACKAGED_DELI`
- `PACKAGED_ICE_CREAM`
- `PACKAGED_JUICE`
- `PACKAGED_KEROSENE`
- `PACKAGED_PROPANE`
- `PILOT_SUPPLIES`
- `PIN_PREPAID_ACT`
- `PIN_PREPAID_RET`
- `PLUS_2_OR_NT`
- `PLUS_ETHANOL_10`
- `PLUS_ETHANOL_15`
- `PLUS_ETHANOL_2_15`
- `PLUS_OR_NT`
- `POS_RES_DISCOUNT_1`
- `POS_RES_DISCOUNT_2`
- `POS_RES_DISCOUNT_3`
- `POS_RES_DISCOUNT_4`
- `POS_RES_DISCOUNT_5`
- `PREMIUM_BIODIESEL_BLEND_OVER_20`
- `PREMIUM_BIODIESEL_BLEND_UNDER_20`
- `PREMIUM_DIESEL_1`
- `PREMIUM_DIESEL_2`
- `PREMIUM_SUPER`
- `PREMIUM_SUPER_2`
- `PREMIUM_SUPER_2_10`
- `PREMIUM_SUPER_ETHANOL_57`
- `PREPAID_ACT`
- `PREPAID_PURCHASE`
- `PREPARED_FOOD`
- `PREV_MAINTENANCE`
- `PROP_PREPAID_ACT`
- `PROP_PREPAID_REL`
- `PST_HST_VAT_2`
- `RACING_FUEL`
- `RAMP_FEES`
- `RE_SERVICE`
- `REAL_TIME_RECHARGE`
- `RECREATIONAL_FUEL`
- `REFORMULATED_1`
- `REFORMULATED_2`
- `REFORMULATED_3`
- `REFORMULATED_4`
- `REFORMULATED_5`
- `REGULAR`
- `REGULAR_DIESEL_1`
- `REGULAR_DIESEL_2`
- `REGULAR_ETHANOL_10`
- `REGULAR_ETHANOL_15`
- `REGULAR_OR_NT`
- `REPAIRS`
- `ROAD_SERVICE`
- `RV_DUMP_FEE`
- `SALES_TAX_NON_FUEL`
- `SALTY_SNACKS`
- `SCALES`
- `SECURE_FEE`
- `SERVICE_PACKAGE`
- `SHOWER`
- `SINGLE_BILL_PAY`
- `SLIP_RENTAL`
- `SODA`
- `SPLIT_TENDER`
- `STATIC_DISSIPATER_ADDITIVE`
- `STORAGE`
- `SUPER_2_OR_NT`
- `SUPER_ETHANOL_10`
- `SUPER_ETHANOL_15`
- `SUPER_ETHANOL_2_15`
- `SUPER_OR_NT`
- `SWEET_SNACKS`
- `SWT_RATE`
- `SYNTHETIC_OIL`
- `TAX_1`
- `TAX_2`
- `TAX_3`
- `TAX_4`
- `TAX_5`
- `TAX_6`
- `TAX_7`
- `TAX_8`
- `TAX_DISCOUNT_F`
- `THIRD_PARTY_PREPAID_ACT`
- `THIRD_PARTY_PREPAID_REL`
- `TIRE_RELATED`
- `TIRE_REPAIR`
- `TIRE_ROTATION`
- `TIRES`
- `TIRES_BATTERIES_ACCESSORIES`
- `TIRES_FET`
- `TOBACCO_OTHER`
- `TOLL`
- `TOWING`
- `TRAILER_WASH`
- `TRANSMISSION_SERVICE`
- `TRANSPORTATION`
- `TRUNK_TANK_CLEANING`
- `ULTRA_LOW_SULFUR_1`
- `ULTRA_LOW_SULFUR_2`
- `ULTRA_LOW_SULFUR_BIODIESEL_BLEND_10`
- `ULTRA_LOW_SULFUR_BIODIESEL_BLEND_100`
- `ULTRA_LOW_SULFUR_BIODIESEL_BLEND_11`
- `ULTRA_LOW_SULFUR_BIODIESEL_BLEND_15`
- `ULTRA_LOW_SULFUR_BIODIESEL_BLEND_2`
- `ULTRA_LOW_SULFUR_BIODIESEL_BLEND_20`
- `ULTRA_LOW_SULFUR_BIODIESEL_BLEND_5`
- `ULTRA_LOW_SULFUR_PREMIUM_1`
- `UNASSIGNED_1`
- `UNASSIGNED_10`
- `UNASSIGNED_11`
- `UNASSIGNED_12`
- `UNASSIGNED_13`
- `UNASSIGNED_14`
- `UNASSIGNED_15`
- `UNASSIGNED_16`
- `UNASSIGNED_17`
- `UNASSIGNED_18`
- `UNASSIGNED_19`
- `UNASSIGNED_2`
- `UNASSIGNED_20`
- `UNASSIGNED_21`
- `UNASSIGNED_22`
- `UNASSIGNED_23`
- `UNASSIGNED_24`
- `UNASSIGNED_25`
- `UNASSIGNED_26`
- `UNASSIGNED_27`
- `UNASSIGNED_28`
- `UNASSIGNED_29`
- `UNASSIGNED_3`
- `UNASSIGNED_30`
- `UNASSIGNED_31`
- `UNASSIGNED_32`
- `UNASSIGNED_33`
- `UNASSIGNED_34`
- `UNASSIGNED_35`
- `UNASSIGNED_36`
- `UNASSIGNED_37`
- `UNASSIGNED_4`
- `UNASSIGNED_5`
- `UNASSIGNED_6`
- `UNASSIGNED_7`
- `UNASSIGNED_8`
- `UNASSIGNED_9`
- `UNASSIGNED_AUTO_PS_1`
- `UNASSIGNED_AUTO_PS_2`
- `UNASSIGNED_AUTO_PS_3`
- `UNASSIGNED_AUTO_PS_4`
- `UNASSIGNED_BEV_1`
- `UNASSIGNED_BEV_2`
- `UNASSIGNED_BEV_3`
- `UNASSIGNED_BEV_4`
- `UNASSIGNED_BEV_5`
- `UNASSIGNED_BEV_6`
- `UNASSIGNED_BEV_7`
- `UNASSIGNED_GROCERY_1`
- `UNASSIGNED_GROCERY_2`
- `UNASSIGNED_GROCERY_3`
- `UNASSIGNED_GROCERY_4`
- `UNASSIGNED_GROCERY_5`
- `UNASSIGNED_GROCERY_6`
- `UNASSIGNED_REPAIR_1`
- `UNASSIGNED_REPAIR_2`
- `UNASSIGNED_REPAIR_3`
- `UNASSIGNED_REPAIR_4`
- `UNDEFINED_ALCOHOL_1`
- `UNDEFINED_ALCOHOL_2`
- `UNDEFINED_ALCOHOL_3`
- `UNDEFINED_ALCOHOL_4`
- `UNDEFINED_ALCOHOL_5`
- `UNDEFINED_AMIN_1`
- `UNDEFINED_AMIN_10`
- `UNDEFINED_AMIN_11`
- `UNDEFINED_AMIN_12`
- `UNDEFINED_AMIN_13`
- `UNDEFINED_AMIN_14`
- `UNDEFINED_AMIN_15`
- `UNDEFINED_AMIN_16`
- `UNDEFINED_AMIN_17`
- `UNDEFINED_AMIN_18`
- `UNDEFINED_AMIN_19`
- `UNDEFINED_AMIN_2`
- `UNDEFINED_AMIN_20`
- `UNDEFINED_AMIN_21`
- `UNDEFINED_AMIN_22`
- `UNDEFINED_AMIN_23`
- `UNDEFINED_AMIN_24`
- `UNDEFINED_AMIN_25`
- `UNDEFINED_AMIN_26`
- `UNDEFINED_AMIN_3`
- `UNDEFINED_AMIN_4`
- `UNDEFINED_AMIN_5`
- `UNDEFINED_AMIN_6`
- `UNDEFINED_AMIN_7`
- `UNDEFINED_AMIN_8`
- `UNDEFINED_AMIN_9`
- `UNDEFINED_AVIATION_1`
- `UNDEFINED_AVIATION_10`
- `UNDEFINED_AVIATION_2`
- `UNDEFINED_AVIATION_3`
- `UNDEFINED_AVIATION_4`
- `UNDEFINED_AVIATION_5`
- `UNDEFINED_AVIATION_6`
- `UNDEFINED_AVIATION_7`
- `UNDEFINED_AVIATION_8`
- `UNDEFINED_AVIATION_9`
- `UNDEFINED_BILL_PAY_1`
- `UNDEFINED_BILL_PAY_10`
- `UNDEFINED_BILL_PAY_11`
- `UNDEFINED_BILL_PAY_12`
- `UNDEFINED_BILL_PAY_13`
- `UNDEFINED_BILL_PAY_14`
- `UNDEFINED_BILL_PAY_15`
- `UNDEFINED_BILL_PAY_2`
- `UNDEFINED_BILL_PAY_3`
- `UNDEFINED_BILL_PAY_4`
- `UNDEFINED_BILL_PAY_5`
- `UNDEFINED_BILL_PAY_6`
- `UNDEFINED_BILL_PAY_7`
- `UNDEFINED_BILL_PAY_8`
- `UNDEFINED_BILL_PAY_9`
- `UNDEFINED_CANDY_1`
- `UNDEFINED_CANDY_2`
- `UNDEFINED_CANDY_3`
- `UNDEFINED_CANDY_4`
- `UNDEFINED_CANDY_5`
- `UNDEFINED_CANDY_6`
- `UNDEFINED_CANDY_7`
- `UNDEFINED_CANDY_8`
- `UNDEFINED_CANDY_9`
- `UNDEFINED_CBD_1`
- `UNDEFINED_CBD_10`
- `UNDEFINED_CBD_11`
- `UNDEFINED_CBD_12`
- `UNDEFINED_CBD_13`
- `UNDEFINED_CBD_14`
- `UNDEFINED_CBD_15`
- `UNDEFINED_CBD_16`
- `UNDEFINED_CBD_17`
- `UNDEFINED_CBD_18`
- `UNDEFINED_CBD_19`
- `UNDEFINED_CBD_2`
- `UNDEFINED_CBD_3`
- `UNDEFINED_CBD_4`
- `UNDEFINED_CBD_5`
- `UNDEFINED_CBD_6`
- `UNDEFINED_CBD_7`
- `UNDEFINED_CBD_8`
- `UNDEFINED_CBD_9`
- `UNDEFINED_DAIRY_1`
- `UNDEFINED_DAIRY_2`
- `UNDEFINED_DAIRY_3`
- `UNDEFINED_DAIRY_4`
- `UNDEFINED_DAIRY_5`
- `UNDEFINED_DAIRY_6`
- `UNDEFINED_DELI_1`
- `UNDEFINED_DELI_2`
- `UNDEFINED_DELI_3`
- `UNDEFINED_DELI_4`
- `UNDEFINED_DELI_5`
- `UNDEFINED_DELI_6`
- `UNDEFINED_DISPENSED_BEV_1`
- `UNDEFINED_DISPENSED_BEV_2`
- `UNDEFINED_DISPENSED_BEV_3`
- `UNDEFINED_DISPENSED_BEV_4`
- `UNDEFINED_DISPENSED_BEV_5`
- `UNDEFINED_FOODSERVICE_1`
- `UNDEFINED_FOODSERVICE_2`
- `UNDEFINED_FOODSERVICE_3`
- `UNDEFINED_FOODSERVICE_4`
- `UNDEFINED_FOODSERVICE_5`
- `UNDEFINED_FOODSERVICE_6`
- `UNDEFINED_FOODSERVICE_7`
- `UNDEFINED_FOODSERVICE_8`
- `UNDEFINED_FOODSERVICE_9`
- `UNDEFINED_GROCERY_1`
- `UNDEFINED_GROCERY_2`
- `UNDEFINED_GROCERY_3`
- `UNDEFINED_GROCERY_4`
- `UNDEFINED_HEALTH_1`
- `UNDEFINED_HEALTH_2`
- `UNDEFINED_HEALTH_3`
- `UNDEFINED_HEALTH_4`
- `UNDEFINED_HEALTH_5`
- `UNDEFINED_HEALTH_6`
- `UNDEFINED_HEALTH_7`
- `UNDEFINED_HEALTH_8`
- `UNDEFINED_HEALTH_9`
- `UNDEFINED_LOTTERY_1`
- `UNDEFINED_LOTTERY_2`
- `UNDEFINED_LOTTERY_3`
- `UNDEFINED_LOTTERY_4`
- `UNDEFINED_LOTTERY_5`
- `UNDEFINED_LOTTERY_6`
- `UNDEFINED_MARINE_SERVICES_1`
- `UNDEFINED_MARINE_SERVICES_10`
- `UNDEFINED_MARINE_SERVICES_11`
- `UNDEFINED_MARINE_SERVICES_12`
- `UNDEFINED_MARINE_SERVICES_13`
- `UNDEFINED_MARINE_SERVICES_14`
- `UNDEFINED_MARINE_SERVICES_15`
- `UNDEFINED_MARINE_SERVICES_16`
- `UNDEFINED_MARINE_SERVICES_17`
- `UNDEFINED_MARINE_SERVICES_18`
- `UNDEFINED_MARINE_SERVICES_19`
- `UNDEFINED_MARINE_SERVICES_2`
- `UNDEFINED_MARINE_SERVICES_20`
- `UNDEFINED_MARINE_SERVICES_21`
- `UNDEFINED_MARINE_SERVICES_22`
- `UNDEFINED_MARINE_SERVICES_23`
- `UNDEFINED_MARINE_SERVICES_24`
- `UNDEFINED_MARINE_SERVICES_25`
- `UNDEFINED_MARINE_SERVICES_26`
- `UNDEFINED_MARINE_SERVICES_27`
- `UNDEFINED_MARINE_SERVICES_28`
- `UNDEFINED_MARINE_SERVICES_29`
- `UNDEFINED_MARINE_SERVICES_3`
- `UNDEFINED_MARINE_SERVICES_30`
- `UNDEFINED_MARINE_SERVICES_31`
- `UNDEFINED_MARINE_SERVICES_32`
- `UNDEFINED_MARINE_SERVICES_33`
- `UNDEFINED_MARINE_SERVICES_34`
- `UNDEFINED_MARINE_SERVICES_35`
- `UNDEFINED_MARINE_SERVICES_36`
- `UNDEFINED_MARINE_SERVICES_37`
- `UNDEFINED_MARINE_SERVICES_38`
- `UNDEFINED_MARINE_SERVICES_39`
- `UNDEFINED_MARINE_SERVICES_4`
- `UNDEFINED_MARINE_SERVICES_40`
- `UNDEFINED_MARINE_SERVICES_41`
- `UNDEFINED_MARINE_SERVICES_42`
- `UNDEFINED_MARINE_SERVICES_43`
- `UNDEFINED_MARINE_SERVICES_44`
- `UNDEFINED_MARINE_SERVICES_5`
- `UNDEFINED_MARINE_SERVICES_6`
- `UNDEFINED_MARINE_SERVICES_7`
- `UNDEFINED_MARINE_SERVICES_8`
- `UNDEFINED_MARINE_SERVICES_9`
- `UNDEFINED_MERCHANDISE_1`
- `UNDEFINED_MERCHANDISE_2`
- `UNDEFINED_MERCHANDISE_3`
- `UNDEFINED_MERCHANDISE_4`
- `UNDEFINED_MERCHANDISE_5`
- `UNDEFINED_MERCHANDISE_6`
- `UNDEFINED_MERCHANDISE_7`
- `UNDEFINED_MERCHANDISE_8`
- `UNDEFINED_MERCHANDISE_9`
- `UNDEFINED_MONEY_ORDER`
- `UNDEFINED_NEG_1`
- `UNDEFINED_NEG_10`
- `UNDEFINED_NEG_11`
- `UNDEFINED_NEG_12`
- `UNDEFINED_NEG_13`
- `UNDEFINED_NEG_14`
- `UNDEFINED_NEG_15`
- `UNDEFINED_NEG_16`
- `UNDEFINED_NEG_17`
- `UNDEFINED_NEG_18`
- `UNDEFINED_NEG_19`
- `UNDEFINED_NEG_2`
- `UNDEFINED_NEG_20`
- `UNDEFINED_NEG_21`
- `UNDEFINED_NEG_22`
- `UNDEFINED_NEG_23`
- `UNDEFINED_NEG_24`
- `UNDEFINED_NEG_3`
- `UNDEFINED_NEG_4`
- `UNDEFINED_NEG_5`
- `UNDEFINED_NEG_6`
- `UNDEFINED_NEG_7`
- `UNDEFINED_NEG_8`
- `UNDEFINED_NEG_9`
- `UNDEFINED_PACKAGED_BEV_1`
- `UNDEFINED_PACKAGED_BEV_2`
- `UNDEFINED_PACKAGED_BEV_3`
- `UNDEFINED_PACKAGED_BEV_4`
- `UNDEFINED_PACKAGED_BEV_5`
- `UNDEFINED_PACKAGED_BEV_6`
- `UNDEFINED_PUBLICATIONS_1`
- `UNDEFINED_PUBLICATIONS_2`
- `UNDEFINED_PUBLICATIONS_3`
- `UNDEFINED_PUBLICATIONS_4`
- `UNDEFINED_PUBLICATIONS_5`
- `UNDEFINED_PUBLICATIONS_6`
- `UNDEFINED_PUBLICATIONS_7`
- `UNDEFINED_PUBLICATIONS_8`
- `UNDEFINED_PUBLICATIONS_9`
- `UNDEFINED_SNACKS_1`
- `UNDEFINED_SNACKS_2`
- `UNDEFINED_SNACKS_3`
- `UNDEFINED_SNACKS_4`
- `UNDEFINED_SNACKS_5`
- `UNDEFINED_SNACKS_6`
- `UNDEFINED_STORE_SERVICES_1`
- `UNDEFINED_STORE_SERVICES_2`
- `UNDEFINED_STORE_SERVICES_3`
- `UNDEFINED_STORE_SERVICES_4`
- `UNDEFINED_STORE_SERVICES_5`
- `UNDEFINED_TOBACCO_1`
- `UNDEFINED_TOBACCO_2`
- `UNDEFINED_TOBACCO_3`
- `UNDEFINED_TOBACCO_4`
- `UNDEFINED_TOBACCO_5`
- `UNDEFINED_TOBACCO_6`
- `UNDEFINED_TOBACCO_7`
- `UNDEFINED_VEHICLE_PS_1`
- `UNDEFINED_VEHICLE_PS_10`
- `UNDEFINED_VEHICLE_PS_11`
- `UNDEFINED_VEHICLE_PS_12`
- `UNDEFINED_VEHICLE_PS_13`
- `UNDEFINED_VEHICLE_PS_14`
- `UNDEFINED_VEHICLE_PS_15`
- `UNDEFINED_VEHICLE_PS_16`
- `UNDEFINED_VEHICLE_PS_17`
- `UNDEFINED_VEHICLE_PS_18`
- `UNDEFINED_VEHICLE_PS_19`
- `UNDEFINED_VEHICLE_PS_2`
- `UNDEFINED_VEHICLE_PS_20`
- `UNDEFINED_VEHICLE_PS_21`
- `UNDEFINED_VEHICLE_PS_22`
- `UNDEFINED_VEHICLE_PS_23`
- `UNDEFINED_VEHICLE_PS_24`
- `UNDEFINED_VEHICLE_PS_25`
- `UNDEFINED_VEHICLE_PS_26`
- `UNDEFINED_VEHICLE_PS_27`
- `UNDEFINED_VEHICLE_PS_28`
- `UNDEFINED_VEHICLE_PS_29`
- `UNDEFINED_VEHICLE_PS_3`
- `UNDEFINED_VEHICLE_PS_30`
- `UNDEFINED_VEHICLE_PS_31`
- `UNDEFINED_VEHICLE_PS_32`
- `UNDEFINED_VEHICLE_PS_33`
- `UNDEFINED_VEHICLE_PS_34`
- `UNDEFINED_VEHICLE_PS_35`
- `UNDEFINED_VEHICLE_PS_36`
- `UNDEFINED_VEHICLE_PS_37`
- `UNDEFINED_VEHICLE_PS_38`
- `UNDEFINED_VEHICLE_PS_39`
- `UNDEFINED_VEHICLE_PS_4`
- `UNDEFINED_VEHICLE_PS_40`
- `UNDEFINED_VEHICLE_PS_41`
- `UNDEFINED_VEHICLE_PS_42`
- `UNDEFINED_VEHICLE_PS_43`
- `UNDEFINED_VEHICLE_PS_44`
- `UNDEFINED_VEHICLE_PS_45`
- `UNDEFINED_VEHICLE_PS_46`
- `UNDEFINED_VEHICLE_PS_5`
- `UNDEFINED_VEHICLE_PS_6`
- `UNDEFINED_VEHICLE_PS_7`
- `UNDEFINED_VEHICLE_PS_8`
- `UNDEFINED_VEHICLE_PS_9`
- `UNKNOWN`
- `UNLEADED_METHANOL_57`
- `UNLEADED_METHANOL_77`
- `UNLEADED_PLUS_METHANOL_57`
- `UNLEADED_PLUS_METHANOL_77`
- `UNLEADED_SUPER_METHANOL_57`
- `VEHICLE_ACC`
- `VEHICLE_FUEL_ADDITIVES`
- `VEHICLE_GLASS`
- `VEHICLE_PARKING`
- `VEHICLE_PARTS`
- `VEHICLE_PREP`
- `VEHICLE_RENTAL`
- `WASH_OUT`
- `WASHER_FLUID`
- `WEATHER_FEES`
- `WHITE_GAS`
- `WINE`
- `WIPERS`
- `WL_REAL_TIME_RECHARGE`
- `WORK_ORDER`

### `VisaLineItemDetailIndicator`

Visa Fleet line item detail indicator

- `CREDIT`
- `NORMAL`
- `PAYMENT`

### `VisaMotoAndElectronicCommerceIndicator`

Classification information for Mail Order/Telephone Order (MOTO) and Electronic Commerce transactions.

- `INSTALLMENT_PAYMENT`
- `NON_AUTHENTICATED_SECURITY_TRANSACTION`
- `NON_AUTHENTICATED_SECURITY_TRANSACTION_WITH_3D_SECURE`
- `NON_SECURE_TRANSACTION`
- `NOT_APPLICABLE`
- `RECURRING_TRANSACTION`
- `SECURE_ELECTRONIC_COMMERCE_TRANSACTION`
- `SINGLE_TRANSACTION_OF_MAIL_OR_PHONE_ORDER`
- `UNKNOWN_CLASSIFICATION`

### `VisaNonFuelProductCode`

Visa Fleet non fuel product codes

- `AC_PARTS`
- `AC_SERVICE`
- `AIR_FILTER`
- `AIRCRAFT_ACC`
- `AIRCRAFT_CLEANING`
- `AIRCRAFT_FUEL_ADDITIVE`
- `AIRCRAFT_GROUND_HAULING`
- `AIRCRAFT_GROUND_PU`
- `AIRCRAFT_LABOR`
- `AIRCRAFT_MAINTENANCE`
- `AIRCRAFT_PARKING_FEE`
- `AIRCRAFT_RENTAL`
- `AIRCRAFT_SANITATION`
- `AIRCRAFT_SERVICE`
- `AIRCRAFT_TIE_DOWN_FEE`
- `AIRCRAFT_WO`
- `AIRPORT_FEE`
- `ALT_SNACKS`
- `ANTI_FREEZE`
- `APU`
- `AV_GAS_FED_E_TAX`
- `AVIONICS`
- `BATTERIES`
- `BEER`
- `BEER_NA`
- `BODY_WORK`
- `BRAKE_FLUID`
- `BRAKE_SERVICE`
- `CALL_OUT_FEE`
- `CAR_WASH`
- `CARGO_HANDLING`
- `CASH_BACK`
- `CASH_BACK_FEE`
- `CATERING`
- `CBD`
- `CHARITY`
- `CHARTER_FEE`
- `CIGARETTES`
- `COLD_DISPENSED_BEV`
- `COMMUNICATION_FEE`
- `CORROSION_INHIBITOR`
- `COUPON_1`
- `COUPON_2`
- `COUPON_3`
- `COUPON_4`
- `COUPON_5`
- `DE_FUEL`
- `DE_ICING`
- `DELI_ITEMS`
- `DISABLE_HANDSET`
- `DISCOUNT_1`
- `DISCOUNT_2`
- `DISCOUNT_3`
- `DISCOUNT_4`
- `DISCOUNT_5`
- `ENABLE_HANDSET`
- `ENGINE_SERVICE`
- `EV_BATTERY_ECH`
- `EV_CHARGE`
- `EXHAUST_SERVICE`
- `FEE_1`
- `FEE_2`
- `FEE_3`
- `FEE_4`
- `FEE_5`
- `FIN_PREPAID_ACT`
- `FIN_PREPAID_REL`
- `FLIGHT_PLANNING_FEES`
- `FLIGHT_PLANS`
- `FLOW_FEE`
- `FLUID_MILK`
- `FROZEN_DISPENSED_BEV`
- `FROZEN_FOOD`
- `FUEL_SYSTEM`
- `GEN_ALCOHOL`
- `GEN_AUTO_MERCH`
- `GEN_CANDY`
- `GEN_DAIRY`
- `GEN_DELI`
- `GEN_DISPENSED_BEV`
- `GEN_FOODSERVICE`
- `GEN_GROCERY`
- `GEN_HEALTH`
- `GEN_ICE`
- `GEN_LOTTERY`
- `GEN_MERCH`
- `GEN_MONEY_ORDER`
- `GEN_PACKAGED_BEV`
- `GEN_PUBLICATIONS`
- `GEN_PURPOSE_ACT`
- `GEN_PURPOSE_REL`
- `GEN_SNACKS`
- `GEN_STORE_SERVICE`
- `GEN_TOBACCO`
- `GEN_UNDEFINED`
- `GEN_UNDEFINED_2`
- `GEN_UNDEFINED_3`
- `GEN_UNDEFINED_4`
- `GEN_UNDEFINED_5`
- `GEN_UNDEFINED_6`
- `GEN_UNDEFINED_7`
- `GEN_UNDEFINED_8`
- `GES_FEE`
- `GRATUITY`
- `GROCERY_EDIBLE`
- `GROCERY_NON_EDIBLE`
- `GROCERY_PER_EDIBLE`
- `GST_HST_VAT_1`
- `HANGAR_FEE`
- `HOME_DELIVERY`
- `HOSES`
- `HOT_DISPENSED_BEV`
- `INSPECTION`
- `INSTRUCTION_FEE`
- `IT_BLADDER`
- `JET_FD_E_TAX`
- `LABOR`
- `LAMPS`
- `LANDING_FEE`
- `LAUNCH_FEE`
- `LIQUOR`
- `LOCAL_DISCOUNT_1`
- `LOCAL_DISCOUNT_2`
- `LOCAL_DISCOUNT_3`
- `LOCAL_DISCOUNT_4`
- `LOCAL_DISCOUNT_5`
- `LODGING`
- `LOTTERT_OT`
- `LOTTERY_IN`
- `LOTTERY_ON`
- `LOTTERY_PO_IN`
- `LOTTERY_PO_ON`
- `LOTTERY_PO_OT`
- `LUBE`
- `MARINE_LABOR`
- `MARINE_SERVICE`
- `MARINE_WO`
- `MEMBERSHIP`
- `MISC`
- `MISC_ADMIN`
- `MISC_AV_PS`
- `MISC_AV_TAX`
- `MISC_MARINE_PS`
- `MISC_NEG_ADMIN`
- `MISC_VEHICLE_PS`
- `MONEY_ORDER_DC`
- `MONEY_ORDER_GC`
- `MONEY_ORDER_OC`
- `MONEY_ORDER_PC`
- `MONEY_ORDER_REBC`
- `MONEY_ORDER_REFC`
- `MONEY_ORDER_UC`
- `MONEY_ORDER_VP`
- `MOTOR_OIL`
- `MULTI_BILL_PAY`
- `OIL_CHANGE`
- `OIL_FILTER`
- `OTHER_DAIRY`
- `OTHER_DISPENSED_BEV`
- `OTHER_LUBE`
- `OTHER_PACKAGED_BEV`
- `OVERTIME_FEE`
- `OXYGEN`
- `PACKAGED_BEV_NA`
- `PACKAGED_BREAD`
- `PACKAGED_DELI`
- `PACKAGED_ICE_CREAM`
- `PACKAGED_JUICE`
- `PILOT_SUPPLIES`
- `PIN_PREPAID_ACT`
- `PIN_PREPAID_RET`
- `POS_RES_DISCOUNT_1`
- `POS_RES_DISCOUNT_2`
- `POS_RES_DISCOUNT_3`
- `POS_RES_DISCOUNT_4`
- `POS_RES_DISCOUNT_5`
- `PREPAID_ACT`
- `PREPAID_PURCHASE`
- `PREPARED_FOOD`
- `PREV_MAINTENANCE`
- `PROP_PREPAID_ACT`
- `PROP_PREPAID_REL`
- `PST_HST_VAT_2`
- `RAMP_FEES`
- `RE_SERVICE`
- `REAL_TIME_RECHARGE`
- `REPAIRS`
- `RESERVED_1`
- `RESERVED_2`
- `RESERVED_3`
- `RESERVED_4`
- `RESERVED_5`
- `RESERVED_6`
- `RESERVED_7`
- `RESERVED_8`
- `ROAD_SERVICE`
- `RV_DUMP_FEE`
- `SALES_TAX_NON_FUEL`
- `SALTY_SNACKS`
- `SCALES`
- `SECURE_FEE`
- `SERVICE_PACKAGE`
- `SHOWER`
- `SINGLE_BILL_PAY`
- `SLIP_RENTAL`
- `SODA`
- `SPLIT_TENDER`
- `STATIC_DISSIPATER_ADDITIVE`
- `STORAGE`
- `SWEET_SNACKS`
- `SWT_RATE`
- `SYNTHETIC_OIL`
- `TAX_1`
- `TAX_2`
- `TAX_3`
- `TAX_4`
- `TAX_5`
- `TAX_6`
- `TAX_7`
- `TAX_8`
- `TAX_DISCOUNT_F`
- `THREE_P_PREPAID_ACT`
- `THREE_P_PREPAID_REL`
- `TIRE_RELATED`
- `TIRE_REPAIR`
- `TIRE_ROTATION`
- `TIRES`
- `TIRES_BATTERIES_ACCESSORIES`
- `TIRES_FET`
- `TOBACCO_OTHER`
- `TOLL`
- `TOWING`
- `TRAILER_WASH`
- `TRANSMISSION_SERVICE`
- `TRANSPORTATION`
- `TRUNK_TANK_CLEANING`
- `UNASSIGNED_BEV`
- `UNASSIGNED_BEV_2`
- `UNASSIGNED_BEV_3`
- `UNASSIGNED_BEV_4`
- `UNASSIGNED_BEV_5`
- `UNASSIGNED_BEV_6`
- `UNASSIGNED_BEV_7`
- `UNASSIGNED_GROCERY`
- `UNASSIGNED_GROCERY_2`
- `UNASSIGNED_GROCERY_3`
- `UNASSIGNED_GROCERY_4`
- `UNASSIGNED_GROCERY_5`
- `UNASSIGNED_GROCERY_6`
- `UNKNOWN`
- `VEHICLE_ACC`
- `VEHICLE_FUEL_ADDITIVES`
- `VEHICLE_GLASS`
- `VEHICLE_PARKING`
- `VEHICLE_PARTS`
- `VEHICLE_PREP`
- `VEHICLE_RENTAL`
- `WASH_OUT`
- `WASHER_FLUID`
- `WEATHER_FEES`
- `WINE`
- `WIPERS`
- `WL_REAL_TIME_RECHARGE`
- `WORK_ORDER`

### `VisaTaxTreatment`

Visa Fleet tax treatment types

- `GIL`
- `GLL`
- `NIL`
- `NLL`
- `NON`

### `VisaThreeDSecureIndicator`

Information about the verification method used in this transaction.

- `ATTEMPTS_SERVER_RESPONDING`
- `BEHAVIORAL_BIOMETRICS`
- `CHALLENGE_KBA`
- `CHALLENGE_OOB_APP`
- `CHALLENGE_OOB_BIOMETRIC`
- `CHALLENGE_OOB_OTHER`
- `CHALLENGE_OTHER`
- `CHALLENGE_OTP_APP`
- `CHALLENGE_OTP_FOB`
- `CHALLENGE_OTP_OTHER`
- `CHALLENGE_OTP_SMS`
- `CHALLENGE_STATIC_PASSCODE`
- `DECOUPLED`
- `DELEGATED_TRUSTED`
- `FRICTIONLESS`
- `FRICTIONLESS_RBA`
- `FRICTIONLESS_RBA_REVIEW`
- `FRICTIONLESS_SMART_ATTEMPTS`
- `FRICTIONLESS_USING_FIDO_STANDARD`
- `FRICTIONLESS_VISA_SECURE_ON_BEHALF_OF_ISSUER`
- `ISSUER_DEFINED_1`
- `ISSUER_DEFINED_2`
- `ISSUER_DEFINED_3`
- `ISSUER_DEFINED_4`
- `ISSUER_DEFINED_5`
- `PUSH_CONFIRMATION`
- `SECURE_PAYMENT_CONFIRMATION`
- `UNRECOGNIZED_METHOD`
- `WEBAUTHN`

### `WalletProviderType`

Highnote supported Client Wallet Providers.

- `GOOGLE_PAY`
- `SAMSUNG_PAY`

### `WebPushAssetType`

Web push provisioning asset type

- `CARD_TEMPLATES`
- `NETWORK_CARD_ASSETS`

### `WireStatusReasonCode`

Additional details for wire transfer errors. This will only be relevant when the `WireTransferStatus` is FAILED.

- `ACCOUNT_CLOSED`
- `ACCOUNT_HOLDER_IS_NOT_AN_ORGANIZATION`
- `ACCOUNT_NOT_FOUND`
- `CURRENCY_MISMATCH`
- `PAYROLL_ADVANCE_FEATURE_NOT_ENABLED`

### `WireTransferReviewDirection`

The direction of the `WireTransferReview`.

- `INCOMING`
- `OUTGOING`

### `WireTransferStatus`

The status of the wire transfer.

- `COMPLETED`
- `FAILED`
- `PENDING`
- `PROCESSING`

### `WireTransferStatusReasonCode`

The reasons a `WireTransfer` could fail.

- `ACCOUNT_CLOSED`
- `ACCOUNT_HOLDER_IS_NOT_AN_ORGANIZATION`
- `ACCOUNT_NOT_FOUND`
- `CURRENCY_MISMATCH`
- `INSUFFICIENT_FUNDS`
- `PAYROLL_ADVANCE_FEATURE_NOT_ENABLED`

### `WireTransferType`

The possible types of `WireTransfer`.

- `INCOMING_WIRE_TRANSFER`
- `INCOMING_WIRE_TRANSFER_REVERSAL`
- `OUTGOING_WIRE_TRANSFER`
- `OUTGOING_WIRE_TRANSFER_REVERSAL`

## Types

### `AcceptAccountHolderCardProductApplicationOfferInput`

The input to accept an extended `AccountHolderCardProductApplicationOffer` on an `AccountHolderCardProductApplication`

### `AcceptCounterOfferInput`

The Accepted Counter Offer input

### `AccessDeniedError`

The error type surfaced when you do not have permissions to access a field.

### `AccountHolder`

Account holder types

### `AccountHolderApplicationDocument`

An uploaded document for an application

### `AccountHolderApplicationDocumentRevision`

A revision of an uploaded document for an application

### `AccountHolderApplicationDocumentToVerificationResultCodeContext`

A context describing the impact of a `DocumentType` presented on the `USAccountHolderApplicationDocumentUploadSession` to the `AccountHolderVerificationResultCode`s

### `AccountHolderApplicationDocumentToVerificationResultCodeEntry`

An entry providing a list of `AccountHolderVerificationResultCode`s that a `DocumentType` would address.

### `AccountHolderApplicationDocumentUploadSession`

Return types for an account holder application document upload session

### `AccountHolderApplicationDocumentUploadSessionContext`

A document upload session context for an Account Holder's Application

### `AccountHolderApplicationRequiredDocument`

A document upload for an account holder application

### `AccountHolderApplicationState`

A type representing a state of the account holder application.

### `AccountHolderApplicationStateInput`

Inputs for filtering Application Status data.

### `AccountHolderApplicationVerificationResultCodeToDocumentContext`

A context describing the impact of a `AccountHolderVerificationResultCode` on the requested `DocumentType`s presented on the `USAccountHolderApplicationDocumentUploadSession`

### `AccountHolderApplicationVerificationResultCodeToDocumentEntry`

An entry providing a list of `DocumentType`s that address the `AccountHolderVerificationResultCode`

### `AccountHolderCardProductApplication`

An AccountHolderCardProductApplication.

### `AccountHolderCardProductApplicationApplicationHistoryArgs`

An AccountHolderCardProductApplication.

### `AccountHolderCardProductApplicationConnection`

The connection type for AccountHolderCardProductApplication.

### `AccountHolderCardProductApplicationEdge`

The edge type for an `AccountHolderCardProductApplication`.

### `AccountHolderCardProductApplicationFinancialAccountsArgs`

An AccountHolderCardProductApplication.

### `AccountHolderCardProductApplicationGlobalNotesArgs`

An AccountHolderCardProductApplication.

### `AccountHolderCardProductApplicationOffer`

An Offer associated with an `AccountHolderCardProductApplication`.

### `AccountHolderCardProductApplicationOfferConnection`

The connection type for `AccountHolderCardProductApplicationOffer`.

### `AccountHolderCardProductApplicationOfferEdge`

An edge for `AccountHolderCardProductApplicationOffer`

### `AccountHolderCardProductApplicationOfferFilterByInput`

Input to filter a paginated search for `AccountHolderCardProductApplicationOffer`.

### `AccountHolderCardProductApplicationOffersArgs`

An AccountHolderCardProductApplication.

### `AccountHolderCardProductApplicationOffersPayload`

The response type for updating `AccountHolderCardProductApplicationOffer` on an `AccountHolderCardProductApplication`.

### `AccountHolderCardProductApplicationPreviousApplicationsArgs`

An AccountHolderCardProductApplication.

### `AccountHolderCardProductApplicationSnapshot`

An AccountHolderCardProductApplicationSnapshot.

### `AccountHolderCardProductApplicationSnapshotConnection`

The connection type for AccountHolderCardProductApplicationSnapshot.

### `AccountHolderCardProductApplicationSnapshotEdge`

The edge type for an AccountHolderCardProductApplicationSnapshot.

### `AccountHolderConnection`

The connection type for AccountHolder.

### `AccountHolderEdge`

The edge type for an `AccountHolder`.

### `AccountHolderFinancialAccountsFilterInput`

Inputs for filtering business account holder data.

### `AccountHolderFinancialAccountSummary`

### `AccountHolderIdentityRiskScore`

Interface representing the common fields related to an account holder's identity risk score

### `AccountHolderPaymentCardsFilterInput`

Inputs for filtering Payment Card data for Account Holder.

### `AccountHolderProvisioning`

Represents the provisioning process for an account holder.

This type includes information about the provisioning request, its current and next actions, outcomes, and timestamps, as well as the sequence of workflow actions involved.

### `AccountHolderProvisioningActionNode`

Union type representing the different types of nodes involved in account holder provisioning actions.

This union can include various result types, such as account applications, financial accounts, payment cards, or workflow action outcomes.

### `AccountHolderProvisioningOutcome`

Represents the outcome of the account holder provisioning process.

It includes both the current status of the process and the specific reason or result of that status.

### `AccountHolderProvisioningWorkflowAction`

Represents an action in the workflow for provisioning an account holder.

This type includes details about the action performed, its outcome, associated inputs, the order of execution, and related nodes.

### `AccountHolderProvisioningWorkflowActionDetail`

Represents the outcome of the account holder provisioning process.
It includes both the current status of the process and the specific reason or result of that status.

### `AccountHolderRiskScore`

A list of account holder risk scores

### `AccountHolderSnapshot`

A snapshot of an account holder's data at time of application.

### `AccountHolderVerification`

Type representing a verification attempt on an Account Holder. Not all attempts are successful.

### `AccountHolderVerificationResult`

Type representing one result on a verification.

### `AccountRelationship`

Represents a relationship between two financial accounts.

### `AccountReview`

Account Review

### `AccountReviewConnection`

The connection type for an `AccountReview`.

### `AccountReviewConnectionPayload`

The payload for listing `AccountReview`s for a `FinancialAccount`.

### `AccountReviewEdge`

The edge type for an `AccountReview`.

### `AccountSpendRule`

A Spend Control rule that allows or blocks authorizations based on the `Account` used for the transaction.

### `AccountSpendRuleResult`

The result of applying an `AccountSpendRule` to an event.

### `AccountSpendRuleRevisionsArgs`

A Spend Control rule that allows or blocks authorizations based on the `Account` used for the transaction.

### `AccountStatusActiveEvent`

The `AccountStatusActiveEvent` notifies when an `FinancialAccount` is set to the Active Status.

### `AccountStatusClosedEvent`

The `AccountStatusClosedEvent` notifies when an `FinancialAccount` is set to the Closed Status.

### `AccountStatusEvent`

### `AccountStatusPendingClosureEvent`

The `AccountStatusPendingClosureEvent` notifies when an `FinancialAccount` is set to the Pending Closure Status.

### `AccountStatusSuspendedEvent`

The `AccountStatusSuspendedEvent` notifies when an `FinancialAccount` is set to the Suspended Status.

### `AccountStatusUnderReviewEvent`

The `AccountStatusUnderReviewEvent` notifies when an `FinancialAccount` is set to the Under Review Status.

### `AccountTransactionCountSpendRule`

A Spend Control rule that blocks transactions if the number of transactions on the account is above a configured threshold.

### `AccountTransactionCountSpendRuleResult`

The result of applying a `AccountTransactionCountSpendRule` to an event.

### `AccountTransactionCountSpendRuleRevisionsArgs`

A Spend Control rule that blocks transactions if the number of transactions on the account is above a configured threshold.

### `AccumulatedAccountInterestAndFees`

The interest and fees that an account has accumulated.

### `AchCapableFinancialAccountFeature`

Whether or not the Financial Account is a Non Verified account

### `AchDescriptor`

Informational fields included in an ACH transfer.

### `AchDescriptorInput`

Input for fields describing an ACH transfer.

### `AchExternallyInitatedDepositFailedEvent`

The AchExternallyInitatedDepositFailedEvent event will be triggered when processing an incoming NACHA file transaction has failed.

### `AchExternallyInitatedDepositProcessedEvent`

The AchExternallyInitatedDepositProcessedEvent event will be triggered when an incoming NACHA file transaction has been processed.

### `AchExternallyInitatedDepositReceivedEvent`

The AchExternallyInitatedDepositReceivedEvent event will be triggered when an incoming NACHA file transaction has been received.

### `AchExternallyInitatedEvent`

### `AchExternallyInitiatedWithdrawalFailedEvent`

The AchExternallyInitiatedWithdrawalFailedEvent event will be triggered when processing an incoming NACHA file transaction has failed.

### `AchExternallyInitiatedWithdrawalProcessedEvent`

The AchExternallyInitiatedWithdrawalProcessedEvent event will be triggered when an incoming NACHA file transaction has been processed.

### `AchExternallyInitiatedWithdrawalReceivedEvent`

The AchExternallyInitiatedWithdrawalReceivedEvent event will be triggered when an incoming NACHA file transaction has been received.

### `AchFromFinancialAccount`

The financial account sending funds. This can be a Highnote `FinancialAccount`
or a verified external financial account (`ExternalFinancialBankAccount`).

### `AchHoldAddedEvent`

The `AchHoldAddedEvent` notifies when an ach transaction is put on hold.

### `AchHoldEvent`

### `AchHoldRemovedEvent`

The `AchHoldRemovedEvent` notifies when the hold on an ach transaction is removed.

### `AchHoldStatusFilterInput`

Input for filtering by `AchTransferPurpose`.

### `AchToFinancialAccount`

The financial account receiving funds. This can be a Highnote `FinancialAccount`
or a verified or non-verified external financial account (`ExternalFinancialBankAccount` or `NonVerifiedExternalUSFinancialBankAccount`).

### `AchTransactionConnection`

The connection type for ACH Transaction.
Deprecated.

### `AchTransactionEdge`

The edge type for a ACH Transaction.
Deprecated.

### `AchTransactionEdgeNode`

### `AchTransfer`

The base details of an `OriginatedAchTransfer` or `NonOriginatedAchTransfer`.

An `OriginatedAchTransfer` is initiated by Highnote.
It can `PUSH` funds from a Highnote `FinancialAccount` to an external financial institution
or `PULL` funds from an external financial institution to a Highnote `FinancialAccount`.

A `NonOriginatedAchTransfer` is initiated by an external financial institution.
It can `PULL` funds from a Highnote `FinancialAccount` to an external financial institution
or `PUSH` funds from an external financial institution to a Highnote `FinancialAccount`.

### `AchTransferEvent`

A financial event that represents an ACH transfer.

### `AchTransferHoldAddedEvent`

An event that occurs when an `OriginatedAchTransfer` or `NonOriginatedTransfer` has a hold added by Highnote.

### `AchTransferHoldRemovedEvent`

An event that occurs when an `OriginatedAchTransfer` or `NonOriginatedTransfer` has a hold removed by Highnote.

### `AchTransferLedgersArgs`

The base details of an `OriginatedAchTransfer` or `NonOriginatedAchTransfer`.

An `OriginatedAchTransfer` is initiated by Highnote.
It can `PUSH` funds from a Highnote `FinancialAccount` to an external financial institution
or `PULL` funds from an external financial institution to a Highnote `FinancialAccount`.

A `NonOriginatedAchTransfer` is initiated by an external financial institution.
It can `PULL` funds from a Highnote `FinancialAccount` to an external financial institution
or `PUSH` funds from an external financial institution to a Highnote `FinancialAccount`.

### `AchTransferPurposeFilterInput`

Input for filtering by `AchTransferPurpose`.

### `AchTransferSignFilterInput`

Input for filtering by `AchTransferPurpose`.

### `AchTransferStatusDetails`

Details about the status of the ACH transfer.

### `AchTransferStatusFailureReasonFilterInput`

Input for filtering by `AchTransferPurpose`.

### `AchTransferTypeFilterInput`

Input for filtering by `AchTransferType`.

### `AcquiringExternalCredentialOnFileInput`

Input for specifying an externally stored credential on file.

### `ActivateCardProductCreditPlanInput`

Input fields for activating a `CreditPlan` for a `CardProduct`.

### `ActivateCardProductCreditPlanPayload`

Types that can be returned for `ActivateCardProductCreditPlan`.

### `ActivateCollaborativeAuthorizationEndpointInput`

The input to activate a `CollaborativeAuthorizationEndpoint`.

### `ActivateCollaborativeAuthorizationEndpointMutation`

### `ActivateCollaborativeAuthorizationEndpointMutationVariables`

### `ActivateCollaborativeAuthorizationEndpointPayload`

The return types when activating a `CollaborativeAuthorizationEndpoint`.

### `ActivateInstallmentAgreementForTransactionEventInput`

Input for activating an `InstallmentAgreement` for a `Transaction` by providing a `TransactionEvent`.

### `ActivateInstallmentAgreementForTransactionEventPayload`

Types which can be returned when converting a `Transaction` into an `InstallmentAgreement`.

### `ActivateNotificationTargetInput`

The input to activate a notification target.

### `ActivateNotificationTargetMutation`

### `ActivateNotificationTargetMutationVariables`

### `ActivateNotificationTargetPayload`

The return types when activating a notification target.

### `ActivatePaymentCardInput`

The details of the Payment Card to activate.

### `ActivatePaymentCardMutation`

### `ActivatePaymentCardMutationVariables`

### `ActivatePaymentCardPayload`

The return types when activating a Payment Card.

### `AddCollaborativeAuthorizationEndpointInput`

The input to add a new `CollaborativeAuthorizationEndpoint`.

### `AddCollaborativeAuthorizationEndpointMutation`

### `AddCollaborativeAuthorizationEndpointMutationVariables`

### `AddCollaborativeAuthorizationEndpointPayload`

The return types when adding a `CollaborativeAuthorizationEndpoint`.

### `AddExternalBankAccountFromTokenInput`

The details to add the bank account for account holder.

### `AddExternalBankAccountFromTokenPayload`

The external financial account created while adding bank account for account holder.

### `AddExternalBankAccountVerifiedThroughFinicityInput`

The details needed in order to add an external bank account via Finicity.

### `AddExternalBankAccountVerifiedThroughFinicityMutation`

### `AddExternalBankAccountVerifiedThroughFinicityMutationVariables`

### `AddExternalBankAccountVerifiedThroughPlaidInput`

The details needed in order to add an external bank account via Plaid.

### `AddExternalBankAccountVerifiedThroughPlaidMutation`

### `AddExternalBankAccountVerifiedThroughPlaidMutationVariables`

### `AddExternalBankAccountVerifiedThroughPlaidUsingThirdPartyProcessorTokenInput`

The input type to add an external bank account via a Third Party and Plaid.

### `AddFundsToPaymentCardInput`

The details to add funds to a Payment Card.

### `AddFundsToPaymentCardPayload`

The return types when adding funds to a payment card.

WARNING: Transfer is deprecated. ElectronicFundsTransfer should be used instead.

### `AdditionalNetworkData`

Additional network transaction data.

### `AdditionalRecipientInformation`

Additional recipient information required for international card shipping destinations.

### `AdditionalRecipientInformationInput`

Additional recipient information required for international card shipping destinations.

### `AdditionalTransactionData`

### `AddNonVerifiedExternalUsFinancialBankAccountInput`

The information of the US bank account to be added to an account holder that can only be transferred to

### `AddNonVerifiedExternalUsFinancialBankAccountMutation`

### `AddNonVerifiedExternalUsFinancialBankAccountMutationVariables`

### `AddNonVerifiedExternalUsFinancialBankAccountPayload`

Response type for adding a non verified bank account.
Will return the last four digits of the account and it's name

### `AddPaymentCardDigitalWalletTokenApplePayDevicePushProvisioningPayload`

### `AddPaymentCardDigitalWalletTokenGooglePayPushProvisioningPayload`

### `AddPaymentCardToApplePayByDevicePushProvisioningInput`

Input to Provision a `PaymentCard` to an Apple Pay Eligible Device via Push Provisioning.

### `AddPaymentCardToApplePayByDevicePushProvisioningMutation`

### `AddPaymentCardToApplePayByDevicePushProvisioningMutationVariables`

### `AddPaymentCardToGooglePayByDevicePushProvisioningInput`

Input to Provision a `PaymentCard` to a Google Pay Eligible Device via Push Provisioning.

### `AddPaymentCardToGooglePayByDevicePushProvisioningMutation`

### `AddPaymentCardToGooglePayByDevicePushProvisioningMutationVariables`

### `AddPricingConfigurationEntityInput`

The entity to attach a `PricingConfiguration` to.

### `AddPricingConfigurationInput`

The input details for creating a `PricingConfiguration`.

### `AddPricingConfigurationPayload`

The result of creating a `PricingConfiguration`.
Returns the newly created configuration or error details.

### `Address`

Type representing the parts of an address.

### `AddressFilterInput`

Input for filtering by Address.

### `AddressIncompleteResult`

`Address` validation result type returned when address is incomplete.

### `AddressInput`

Input representing the parts of an address.

### `AddressInvalidResult`

`Address` validation result type returned when address is invalid.

### `AddressValidatedResult`

`Address` validation result type returned when address is validated without any changes.

### `AddressValidatedWithChangesResult`

`Address` validation result type returned when address is validated with changes.

### `AddressValidationOutcome`

Types which can be returned for `validateAddress` outcome.

### `AddressValidationResult`

Result of `validatedAddress`.

### `AddSubscriptionsToNotificationTargetInput`

The input to add subscriptions to a notification target.

### `AddSubscriptionsToNotificationTargetMutation`

### `AddSubscriptionsToNotificationTargetMutationVariables`

### `AddSubscriptionsToNotificationTargetPayload`

The return types when adding subscriptions to a notification target.

### `AddUserDefinedFieldDefinitionRelationshipInput`

Add a relationship to a `UserDefinedFieldDefinition`.

### `AddWebhookNotificationTargetInput`

The input to add a new webhook notification target.

### `AddWebhookNotificationTargetMutation`

### `AddWebhookNotificationTargetMutationVariables`

### `AddWebhookNotificationTargetPayload`

The return types when adding webhook notification targets.

### `AdjustmentEvent`

A Adjustment Event for a transaction.

### `AdminAgentOrganization`

Organization that an Admin Agent can access.

### `AdverseActionReason`

An explanation given as to why the application was denied.

### `AdverseActionReasonInput`

An explanation given as to why the application was denied.

### `AdviceDetail`

Details about an advice message for a transaction.

### `AllFinancialAccount`

An internal or external financial account.

### `Amount`

Monetary amount where the currency is used to express the expectations for the number of decimal places. See [ISO Standard Currency Codes](https://en.wikipedia.org/wiki/ISO_4217#Active_codes) for more information.

### `AmountFeeCondition`

The logical condition which compares amount in account holder activity.

### `AmountFeeConditionValue`

Amount Condition value.

### `AmountImpact`

### `AmountInput`

Monetary amount where the currency is used to express the expectations for the number of decimal places. See [ISO Standard Currency Codes](https://en.wikipedia.org/wiki/ISO_4217#Active_codes) for more information.

### `AmountLimitCheckRule`

A `CheckRule` that will put a check on hold if the amount is exceeded.

### `AmountLimitCheckRuleRevisionsArgs`

A `CheckRule` that will put a check on hold if the amount is exceeded.

### `AmountLimitInterFinancialAccountTransferRule`

An `InterFinancialAccountTransferRule` that will result in the decline of an inter financial account transfer if the maximum amount is exceeded.

### `AmountLimitInterFinancialAccountTransferRuleResult`

Result of `AmountLimitInterFinancialAccountTransferRule`

### `AmountLimitInterFinancialAccountTransferRuleRevisionsArgs`

An `InterFinancialAccountTransferRule` that will result in the decline of an inter financial account transfer if the maximum amount is exceeded.

### `AmountLimitSpendRule`

A Spend Control rule that limits the dollar amount during authorizations.

### `AmountLimitSpendRuleResult`

The result of applying an amount limit spend rule to an event.

### `AmountLimitSpendRuleRevisionsArgs`

A Spend Control rule that limits the dollar amount during authorizations.

### `AmountRange`

The range type for `Amount`.

### `AmountStrategyInput`

A strategy for allowing amount calculation. Only one of the strategies below should be requested.

### `ApiKey`

Details of an API Key.

### `ApiKeyConnection`

The connection type for APIKey.

### `ApiKeyEdge`

The edge type for an APIKey.

### `ApplePayProvisioning`

### `AppleWebPushProvisioningJws`

JSON Web Signature (JWS) structure for Apple Pay Web Push Provisioning.
Field names follow Apple's JWS specification requirements.

### `AppleWebPushProvisioningJwsHeader`

JWS header for Apple Pay Web Push Provisioning.

### `AppleWebPushProvisioningToken`

Apple Pay Web Push Provisioning token response.

### `Application`

### `ApplicationConfiguration`

Application-level configuration provided by the applicant at the start of the application.

### `ApplicationConfigurationInput`

Application-level configuration provided by the applicant at the start of the application.

### `ApplicationContract`

A contract on an `ApplicationProduct`

### `ApplicationContractConnection`

The connection type for `ApplicationContract`.

### `ApplicationContractConnectionPayload`

The return types when querying a paginated list of `ApplicationContract`;

### `ApplicationContractEdge`

The edge type for `ApplicationContract`.

### `ApplicationContractFilterInput`

Inputs for filtering `ApplictionContract`.

### `ApplicationDocument`

Return types for an account holder application document

### `ApplicationProduct`

Used to resolve the Product for an `ProductApplication`.

### `ApproveCreditLimitDecreaseInput`

The input type for approving a credit limit decrease for a `CreditLimitChangeRequest`.

### `ApproveCreditLimitIncreaseInput`

The input type for approving a credit limit increase for a `CreditLimitChangeRequest`.

### `ApproveCreditProductApplicationUnderwritingInput`

The input for approving a credit-based `AccountHolderCardProductApplication`.

### `ApproveCreditProductApplicationUnderwritingPayload`

The response type for approving a credit-product `AccountHolderCardProductApplication`.

### `AssignPaymentCardToFinancialAccountInput`

Input values for `assignPaymentCardToFinancialAccount`

### `AssignPaymentCardToFinancialAccountOptionsInput`

Options for assigning a `PaymentCard` to a `FinancialAccount`.

### `AssignPaymentCardToFinancialAccountPayload`

The return types for `assignPaymentCardToFinancialAccount`

### `AtmLocation`

Location details for an ATM (Automated Teller Machine).

### `AtmLocationFilterInput`

Filters the ATM Locations by available features per location.

### `AtmLocationLogoDetails`

Details about the ATM location Logo.

### `AtmLocationRadiusInput`

Details to search for ATM Locations by Radius.

### `AtmLocations`

A result of ATM locations for a Payment Card.

### `AtmLocationsResult`

The result of the ATM Locations.

### `AtmLocationViewportInput`

Details to search for ATM Locations by Viewport.

### `AttachCardProductVelocityRuleInput`

The details of the `VelocityRule` to attach to the `CardProduct`

### `AttachCardProductVelocityRulePayload`

The return types when attaching a `VelocityRule` to a `CardProduct`.

### `AttachFeeToCreditPlanInput`

Input for attaching a fee to a `CreditPlan`.

### `AttachFeeToCreditPlanPayload`

Types which can be returned when attaching a `FeeSchedule` to a `CreditPlan`.

### `AttachPaymentCardVelocityRuleInput`

The details of the `VelocityRule` to attach to the `PaymentCard`

### `AttachPaymentCardVelocityRulePayload`

The return types when attaching a `VelocityRule` to a `PaymentCard`.

### `AttachRealtimeRiskRuleToCardProductInput`

The details of the realtime risk rule to attach to the Card Product.

### `AttachRealtimeRiskRuleToCardProductPayload`

The return types when attaching a realtime risk rule to a card product.

### `AttachRealtimeRiskRuleToFinancialAccountInput`

The details of the realtime risk rule to attach to the Financial Account.

### `AttachRealtimeRiskRuleToFinancialAccountPayload`

The return types when attaching a realtime risk rule to a financial account.

### `AttachRealtimeRiskRuleToPaymentCardInput`

The details of the realtime risk rule to attach to the Payment Card.

### `AttachRealtimeRiskRuleToPaymentCardPayload`

The return types when attaching a realtime risk rule to a payment card.

### `AttachRewardEarnRuleToProductInput`

Input to attach `RewardEarnRule` to `CardProduct`.

### `AttachRewardEarnRuleToProductPayload`

Types which can be returned for Attach Mcc reward earn rule.

### `AttachRewardRedemptionConfigurationToProductInput`

Attach `RewardRedemptionConfiguration` to `CardProduct`.

### `AttachRewardRedemptionConfigurationToProductPayload`

Types which can be returned for attaching `RewardRedemptionConfiguration` to `CardProduct`.

### `AttachRiskRuleInput`

The details of the risk rule to attach.

### `AttachSpendRuleInput`

The details of the spend rule to attach.

### `AttachSpendRuleToCardProductInput`

The details of the spend rule to attach to the Card Product

### `AttachSpendRuleToCardProductPayload`

The return types when attaching a spend control rule to a card product.

### `AttachSpendRuleToFinancialAccountInput`

The details of the spend rule to attach to the Payment Card

### `AttachSpendRuleToFinancialAccountPayload`

The return types when attaching a `SpendRule` to a `FinancialAccount`.

### `AttachSpendRuleToPaymentCardInput`

The details of the spend rule to attach to the Payment Card

### `AttachSpendRuleToPaymentCardMutation`

### `AttachSpendRuleToPaymentCardMutationVariables`

### `AttachSpendRuleToPaymentCardPayload`

The return types when attaching a spend control rule to a payment card.

### `AttachVelocityRuleToFinancialAccountInput`

The details of the `VelocityRule` to attach to the `FinancialAccount`

### `AttachVelocityRuleToFinancialAccountPayload`

The return types when attaching a `VelocityRule` to a `FinancialAccount`.

### `AuthorizationAndClearEvent`

A Authorization and Clear Event for a transaction.

### `AuthorizationAndClearEventSpendRuleResultsArgs`

A Authorization and Clear Event for a transaction.

### `AuthorizationEvent`

An AuthorizationEvent for a transaction.

### `AuthorizationEventSpendRuleResultsArgs`

An AuthorizationEvent for a transaction.

### `AuthorizedAccountHolderPersonRelationship`

Represents an authorized relationship where the account holder is a person.

### `AuthorizedAccountHolderRelationship`

Represents all possible types of authorized account holder relationships, whether a person or business.

### `AuthorizedAccountHolderRelationshipConnection`

A paginated list of authorized account holder relationships.

### `AuthorizedAccountHolderRelationshipEdge`

An edge in the authorized account holder relationship connection.

### `AuthorizedPerson`

Person authorized to act on behalf of the business.

### `AuthorizedPersonAccountHolder`

Represents an individual account holder who has been granted authorization.

### `AuthorizedPersonRelationship`

Represents the types of individuals that can be an authorized party.

### `AuthorizedPersonUser`

Represents a user who has been granted authorization.

### `AuthorizedUserAccountFeature`

Whether or not the `FinancialAccount` is for an authorized user.

### `AuthorizedUserApplicationState`

A type representing a state of the authorized user application.

### `AuthorizedUserCardProductApplication`

An AuthorizedUserCardProductApplication.

### `AuthorizedUserCardProductApplicationApplicationHistoryArgs`

An AuthorizedUserCardProductApplication.

### `AuthorizedUserCardProductApplicationConnection`

The connection type for AuthorizedUserCardProductApplication.

### `AuthorizedUserCardProductApplicationEdge`

The edge type for AuthorizedUserCardProductApplication.

### `AuthorizedUserCardProductApplicationSnapshot`

An AuthorizedUserCardProductApplicationSnapshot.

### `AuthorizedUserCardProductApplicationSnapshotConnection`

The connection type for AuthorizedUserCardProductApplicationSnapshot.

### `AuthorizedUserCardProductApplicationSnapshotEdge`

The edge type for an AuthorizedUserCardProductApplicationSnapshot.

### `AuthorizedUserCardProductFeature`

Whether or not the `CardProduct` supports Authorized Users.

### `AuthorizedUserConnection`

The connection type for AuthorizedUser.

### `AuthorizedUserEdge`

The edge type for AuthorizedUser.

### `AuthorizedUserPaymentCardsFilterInput`

Inputs for filtering Payment Card data for Authorized User.

### `AuthorizedUserSnapshot`

A snapshot of an authorized user's data at time of application.

### `AuthorizeNetworkTokenInput`

Input for authorizing a `NetworkToken`.

### `AuthorizeNetworkTokenPayload`

Result of authorizing a `NetworkToken`.

### `AuthorizePaymentCardInput`

Input for authorizing a `PaymentCard`.

### `AuthorizePaymentCardPayload`

Result of authorizing a `PaymentCard`.

### `AuthorizePaymentMethodTokenInput`

Input for authorizing a `PaymentMethodToken`.

### `AuthorizePaymentMethodTokenPayload`

Result of authorizing a payment method token.

### `AvsResponseCodeFilterInput`

Input for filtering AVS response code

### `BalanceInquiryEvent`

A Balance Inquiry Event for a transaction.

### `BalanceInquiryEventSpendRuleResultsArgs`

A Balance Inquiry Event for a transaction.

### `BalanceNotificationEvent`

A notification event triggered when a balance update occurs, such as when funds become available.

### `BankDetails`

The details about the backing bank.

### `BatchAdjustment`

A permanent adjustment on a `TransactionBatch`.

### `BatchHold`

A temporary hold on a `TransactionBatch`.

### `BillingCycle`

A billing cycle for a credit product.

### `BillingCycleConfiguration`

Billing cycle configuration for account

### `BillingCycleConnection`

The connection type for a `BillingCycle`.

### `BillingCycleEdge`

The edge type for a `BillingCycle`.

### `BillingCycleFilterInput`

The input type for filtering `BillingCycle`.

### `BillingCycleOverride`

An override of the default billing cycle type.

### `BillingCycleOverrideInput`

An override of the default billing cycle type.

### `BooleanFilterInput`

Boolean value type

### `Business`

A `Business` including profile details such as name and address, and service details such as account holder and merchant details.

### `BusinessAccountHolder`

The base fields for all BusinessAccountHolders (regardless of region or snapshot).

### `BusinessAccountHolderBusinessNameFilterInput`

Input for filtering Business Account Holder's business by name.

### `BusinessAccountHolderBusinessProfileFilterInput`

Inputs for filtering business account holder business profile data.

### `BusinessAccountHolderDetails`

The account holder details for a `Business`.

### `BusinessAccountHolderDetailsAuthorizedAccountHolderRelationshipsArgs`

The account holder details for a `Business`.

### `BusinessAccountHolderDetailsCardProductApplicationsArgs`

The account holder details for a `Business`.

### `BusinessAccountHolderDetailsExternalFinancialAccountsArgs`

The account holder details for a `Business`.

### `BusinessAccountHolderDetailsFinancialAccountsArgs`

The account holder details for a `Business`.

### `BusinessAccountHolderDetailsPaymentCardsArgs`

The account holder details for a `Business`.

### `BusinessAccountHolderFieldsFragment`

### `BusinessAccountHolderFilterInput`

Inputs for filtering business account holder data.

### `BusinessAccountHolderIdentityDocumentsRequestedEvent`

Indicates that identity verification documents have been requested for a `USBusinessAccountHolder`.

### `BusinessAccountHolderIdentityUpdatedEvent`

Indicates that the identifying information of a `USBusinessAccountHolder` has been updated.

### `BusinessAccountHolderNameInput`

Input representing common fields of a BusinessAccountHolder's name.

### `BusinessAccountHolderNameUpdateInput`

Input representing updatable fields of a BusinessAccountHolder's name.

### `BusinessAccountHolderPrimaryAuthorizedAddressFilterInput`

Input for filtering by Business Account Holder's Primary Authorized Person's Address.

### `BusinessAccountHolderPrimaryAuthorizedPersonFilterInput`

Inputs for filtering business account holder's primary authorized person.

### `BusinessAccountHolderPrimaryAuthorizedPersonNameFilterInput`

Input for filtering Business Account Holders by name.
The matching for these name fields are performed using similar sounding scores.
e.g. keywords like Mayer, mayer, Mire & Mary will lead to the same score.

### `BusinessAccountHolderRiskDetails`

Account holder risk fields for a `Business`.

### `BusinessAccountHolderSummaryFragment`

### `BusinessAccountHolderUltimateBeneficialOwnerFilterInput`

Inputs for filtering `USBusinessAccountHolder`s by `USBusinessUltimateBeneficialOwner`.

### `BusinessAddress`

An address associated with a `Business`. The role this address fills is
identified by `addressType` (LEGAL, BILLING, or SHIPPING).

### `BusinessAuthorizedPerson`

The details of a person authorized to act on behalf of a `Business`.

### `BusinessAuthorizedPersonIdentityDocumentsRequestedEvent`

Indicates that identity verification documents have been requested for a `USBusinessAuthorizedPerson`.

### `BusinessAuthorizedPersonIdentityUpdatedEvent`

Indicates that the identifying information of a `USBusinessAuthorizedPerson` has been updated.

### `BusinessAuthorizedPersonSnapshot`

The snapshot details of the person authorized to act on behalf of business.

### `BusinessConnection`

The connection type for `Business`.

### `BusinessConnectionPayload`

The result of a `businesses` query, containing a list of `Business` entities or an error.

### `BusinessCreditRiskAttributes`

A type representing credit risk attributes.

### `BusinessCreditRiskAttributesInput`

Input fields for business credit risk attributes.

### `BusinessDetail`

Detailed information about the business

### `BusinessEdge`

The edge type for a `Business`.

### `BusinessFilterInput`

Filter input for the `businesses` query.

### `BusinessIdentificationDocument`

`Business` identification document types.

### `BusinessJurisdiction`

Jurisdiction details for a `Business`.

### `BusinessMerchantDetails`

The merchant details for a `Business`.

### `BusinessMerchantDetailsProductApplicationsArgs`

The merchant details for a `Business`.

### `BusinessMetricResult`

Describes generic metric Result interface.

### `BusinessMetricSortAttribute`

Describes attributes of a sorted metric.

### `BusinessMetricTimeRange`

Describes start and end timestamp of returned response.

### `BusinessName`

Type representing common name fields of a business.

### `BusinessOwnershipInformation`

Information about a business' ownership

### `BusinessPlanAttributeInput`

A business plan attribute to be set on a business profile.

### `BusinessPlanCustomerSupportContactInformation`

Details on the business' customer support contact information

### `BusinessPlanIndicatorAttribute`

An indicator-type (boolean) business plan attribute on the response.

### `BusinessPlanIndicatorAttributeInput`

An indicator-type (boolean) business plan attribute.

### `BusinessPlanOperatingDetails`

The business' reported operating details.

### `BusinessPlanOperatingModel`

Business Plan Operating Model.

### `BusinessPlanOperatingModelDetail`

Details about the business plan operating model.

### `BusinessPlanOperatingModelForwardCommitment`

For those that engage in forward commitments, identifies the timeframe
for when contractually obligated sales will be completed

### `BusinessPlanOperatingModelGoodsAndService`

Captures the types of goods and services provided by the business.

### `BusinessPlanOperatingModelSeasonal`

Captures when the business operates and whether they have seasonal peaks. Capture the open season or the peak season.

### `BusinessPlanOperatingModelSeasonalMonthlyRange`

Represents a monthly start and ending range for seasonality.

### `BusinessPlanReportedAmount`

Reporting amount for a business plan

### `BusinessPlanReportedValue`

Reporting value for a business plan

### `BusinessProductApplicantSnapshot`

A type representing a snapshot of the applicant's data at the time of `ProductApplication`.

### `BusinessProfile`

Information about the business.

### `BusinessProfileDetail`

Profile for a `Business`.

### `BusinessService`

A service a `Business` is set up for in the payments ecosystem.

### `BusinessServices`

The service-specific details for the `Business`, such as account holder and merchant details.

### `BusinessUltimateBeneficialOwner`

An ultimate beneficial owner of a business.

Currently implemented only by `USBusinessUltimateBeneficialOwner`. The
interface anticipates the international-Business migration (CRISP-13692
follow-up) when non-US UBO types — backed by `Business` rather than
`USBusinessAccountHolder` — are added as additional implementers.

### `BusinessUltimateBeneficialOwnerIdentityDocumentsRequestedEvent`

Indicates that identity verification documents have been requested for a `USBusinessUltimateBeneficialOwner`.

### `BusinessUltimateBeneficialOwnerIdentityUpdatedEvent`

Indicates that the identifying information of a `USBusinessUltimateBeneficialOwner` has been updated.

### `CancelledTransfer`

### `CancelPaymentTransactionInput`

Input for canceling the remaining authorized amount from a payment transaction.

### `CancelPaymentTransactionPayload`

Result of canceling a payment transaction.

### `CancelPhysicalCardGroupOrderInput`

Input fields for canceling a physical card group order.

### `CancelPhysicalPaymentCardOrderInput`

Input fields for canceling an order for a physical payment card

### `CancelPhysicalPaymentCardOrderMutation`

### `CancelPhysicalPaymentCardOrderMutationVariables`

### `CancelPhysicalPaymentCardPayload`

Types which can be returned for canceling a physical payment card order

### `CancelRequestedIdentityUpdateInput`

The input for canceling a `RequestedIdentityUpdate`.

### `CancelRequestedIdentityUpdatePayload`

The response type when canceling a `RequestedIdentityUpdate`

### `CancelScheduledTransferInput`

Input to cancel a scheduled transfer

### `CancelScheduledTransferMutation`

### `CancelScheduledTransferMutationVariables`

### `CancelScheduledTransferPayload`

The return types when a scheduled transfer is canceled.

### `CapturePaymentTransactionInput`

Input for capturing a payment transaction.

### `CapturePaymentTransactionPayload`

Result of capturing a payment transaction.

### `CardAcceptanceMethodBreakdown`

The percentage breakdown of how the business accepts card payments

### `CardArtDocument`

A secure upload link for a card art document upload session

### `CardAuthorizationAndCaptureStep`

Deprecated: Reference `CardAuthorizationStep` and `CardCaptureStep` instead of `CardAuthorizationAndCaptureStep`.

Record of an acquiring `PaymentTransaction` authorization and capture step.

### `CardAuthorizationStep`

Record of an acquiring `PaymentTransaction` authorizing an amount with a `PaymentMethod`.

### `CardAuthorizationStepSummary`

Record of a payment transaction authorizing an amount with a `PaymentMethod`.

### `CardAuthorizedStep`

Record of an acquiring `PaymentTransaction` authorizing an amount with a `PaymentMethod`.

### `CardCapturedStep`

Record of an acquiring `PaymentTransaction` capturing an amount with a `PaymentMethod`.

### `CardCapturePaymentOrderSummary`

Record of an `PaymentOrder` capturing an amount with a `PaymentMethod`.

### `CardCaptureStep`

Record of an acquiring `PaymentTransaction` capturing an amount with a `PaymentMethod`.

### `CardCaptureStepSummary`

Record of a payment transaction capturing an amount with a `PaymentMethod`.

### `CardCreditedStep`

Record of an acquiring `PaymentTransaction` refunding an amount to a `PaymentMethod`.

### `CardCreditStep`

Record of an acquiring `PaymentTransaction` refunding an amount to a `PaymentMethod`.

### `CardCreditStepSummary`

Record of a payment transaction refunding an amount to a `PaymentMethod`.

### `CardDataInputCapabilitySpendRule`

A Spend Control rule that allows or blocks certain `CardDataInputCapability` types during authorizations.

### `CardDataInputCapabilitySpendRuleResult`

The result of applying a `CardDataInputCapabilitySpendRule` to an event.

### `CardDataInputCapabilitySpendRuleRevisionsArgs`

A Spend Control rule that allows or blocks certain `CardDataInputCapability` types during authorizations.

### `CardDigitalWalletToken`

A Card Digital Wallet Token which can be used for a card transactions.

### `CardDigitalWalletTokenActivatedEvent`

The CardDigitalWalletTokenActivatedEvent is triggered when a `CardDigitalWalletToken` has been activated.

### `CardDigitalWalletTokenAdditionalInformation`

Additional Card Digital Wallet Token information.

### `CardDigitalWalletTokenCardDigitalWalletTokenStateTransitionsArgs`

A Card Digital Wallet Token which can be used for a card transactions.

### `CardDigitalWalletTokenConnection`

The connection type for card digital wallet token.

### `CardDigitalWalletTokenDetails`

The details of a `CardDigitalWalletToken` at the time of a transaction event.

### `CardDigitalWalletTokenDetailsInput`

Used to simulate digital wallet token specific data for a transaction.

### `CardDigitalWalletTokenDeviceInformation`

The Card Digital Wallet Token device information.

### `CardDigitalWalletTokenEdge`

The edge type for card digital wallet token.

### `CardDigitalWalletTokenEvent`

### `CardDigitalWalletTokenStateTransition`

State transitions for a card digital wallet token.

### `CardDigitalWalletTokenStateTransitionConnection`

The connection type for card digital wallet token state transition.

### `CardDigitalWalletTokenStateTransitionEdge`

The edge type for card digital wallet token state transition.

### `CardDigitalWalletTokenSuspendedEvent`

The CardDigitalWalletTokenSuspendedEvent is triggered when a  `CardDigitalWalletToken` has been suspended.

### `CardDigitalWalletTokenTerminatedEvent`

The CardDigitalWalletTokenTerminatedEvent is triggered when a  `CardDigitalWalletToken` has been terminated.

### `CardDigitalWalletTokenVerificationMethod`

The Card Digital Wallet Token verification method.

### `CardFormFactorFilterInput`

Input for filtering by `CardFormFactor`.

### `CardFundingFinancialAccountFeature`

Whether or not the Financial Account supports Card Funding.

### `CardHolder`

Used to represent cardHolder data.

### `CardHolderInput`

Used to represent cardHolder data.

### `CardIncrementalAuthorizationStep`

Record of an acquiring `PaymentTransaction` authorized some incremental amount.

### `CardIncrementalAuthorizedStep`

Record of an acquiring `PaymentTransaction` authorized some incremental amount.

### `CardPaymentArbitrationEvent`

Represents an arbitration event for an acquiring `PaymentTransaction`.

### `CardPaymentAuthorizationDeclinedEvent`

Represents a synchronous card authorization declined payment event for an acquiring `PaymentTransaction`.

### `CardPaymentAuthorizedEvent`

Represents a synchronous card authorized payment event for an acquiring `PaymentTransaction`.

### `CardPaymentAuthorizingEvent`

Represents a synchronous card authorizing payment event for an acquiring `PaymentTransaction`.

### `CardPaymentCaptureDeclinedEvent`

Represents a synchronous card capture declined payment event for an acquiring `PaymentTransaction`.

### `CardPaymentCapturedEvent`

Represents a synchronous card captured payment event for an acquiring `PaymentTransaction`.

### `CardPaymentCaptureProcessingEvent`

Represents a synchronous card capture processing payment event for an acquiring `PaymentTransaction`.

### `CardPaymentCapturingEvent`

Represents a synchronous card capturing payment event for an acquiring `PaymentTransaction`.

### `CardPaymentClearedEvent`

Represents a synchronous card cleared payment event for an acquiring `PaymentTransaction`.

### `CardPaymentClearingFailedEvent`

Represents a synchronous card clearing failed payment event for an acquiring `PaymentTransaction`.

### `CardPaymentDisbursedEvent`

Represents a synchronous card disbursed payment event for an acquiring `PaymentTransaction`.

### `CardPaymentDispute`

Represents an acquiring payment transaction dispute raised by a card network.

A dispute progresses through stages
with its own actions and evidence.

### `CardPaymentDisputeArbitrationStage`

Stage implementation for formal network arbitration.

Arbitration is the final stage where the card network makes a binding decision.

### `CardPaymentDisputeArbitrationStageActionsArgs`

Stage implementation for formal network arbitration.

Arbitration is the final stage where the card network makes a binding decision.

### `CardPaymentDisputeChargebackStage`

Stage implementation for the first chargeback issued by the network.

This is the first stage where the transaction is actively disputed with evidence.

### `CardPaymentDisputeChargebackStageActionsArgs`

Stage implementation for the first chargeback issued by the network.

This is the first stage where the transaction is actively disputed with evidence.

### `CardPaymentDisputeNetworkReason`

The network-defined reason for a dispute.

### `CardPaymentDisputePreArbitrationStage`

Stage implementation for pre-arbitration.

Pre-arbitration is an escalation after representment, where the issuer disputes
the merchant's representment before formal arbitration. This is the last opportunity
for the parties to resolve the dispute without network intervention.

### `CardPaymentDisputePreArbitrationStageActionsArgs`

Stage implementation for pre-arbitration.

Pre-arbitration is an escalation after representment, where the issuer disputes
the merchant's representment before formal arbitration. This is the last opportunity
for the parties to resolve the dispute without network intervention.

### `CardPaymentDisputeRepresentmentDetails`

Details specific to the representment stage.

### `CardPaymentDisputeRepresentmentStage`

Stage implementation for the merchant's representment response.

Representment is the process of challenging a chargeback by submitting evidence.

### `CardPaymentDisputeRepresentmentStageActionsArgs`

Stage implementation for the merchant's representment response.

Representment is the process of challenging a chargeback by submitting evidence.

### `CardPaymentDisputeStage`

The base contract for any stage in the dispute lifecycle.

### `CardPaymentDisputeStageAction`

Represents an action that is available during a dispute stage.

### `CardPaymentDisputeStageActionDetails`

Action-specific details for a dispute stage action.

### `CardPaymentDisputeStageActionFilterInput`

Filter input for dispute stage actions.

### `CardPaymentDisputeStageActionsArgs`

The base contract for any stage in the dispute lifecycle.

### `CardPaymentDisputeStageDecisionActionDetails`

Used for simple network operations or questions.
Provides the UI with the valid button choices.

### `CardPaymentDisputeStageEvidence`

Represents evidence submitted for a dispute stage.

### `CardPaymentDisputeStageEvidenceDetails`

### `CardPaymentDisputeStageFileEvidenceDetails`

Details for evidence uploaded as a document.

### `CardPaymentDisputeStageFileUploadActionDetails`

Used when the action requires uploading documents or evidence files.

### `CardPaymentDisputeStageGlobalNoteEvidenceDetails`

Details for evidence recorded as a global note on a dispute stage.

### `CardPaymentFirstChargebackEvent`

Represents a first chargeback event for an acquiring `PaymentTransaction`.

### `CardPaymentIncrementalAuthorizationDeclinedEvent`

Represents a synchronous card incremental authorization declined payment event for an acquiring `PaymentTransaction`.

### `CardPaymentIncrementalAuthorizedEvent`

Represents a synchronous card incremental authorized payment event for an acquiring `PaymentTransaction`.

### `CardPaymentPartialReversedEvent`

Represents a synchronous card partial reversed payment event for an acquiring `PaymentTransaction`.

### `CardPaymentPayoutEvent`

Represents a disbursement payout event for an acquiring `PaymentTransaction`.

### `CardPaymentPreArbitrationEvent`

Represents a pre-arbitration event for an acquiring `PaymentTransaction`.

### `CardPaymentRepresentmentEvent`

Represents a representment event for an acquiring `PaymentTransaction`.

### `CardPaymentReversalDeclinedEvent`

Represents a synchronous card reversal declined payment event for an acquiring `PaymentTransaction`.

### `CardPaymentReversedEvent`

Represents a synchronous card reversed payment event for an acquiring `PaymentTransaction`.

### `CardPaymentSettledEvent`

Represents a synchronous card settled payment event for an acquiring `PaymentTransaction`.

### `CardPaymentVerificationDeclinedEvent`

Represents a synchronous card verification declined event for an acquiring `PaymentTransaction`.

### `CardPaymentVerificationPendingEvent`

Represents a synchronous card verification pending event for an acquiring `PaymentTransaction`.

### `CardPaymentVerifiedEvent`

Represents a synchronous card verification event for an acquiring `PaymentTransaction`.

### `CardProcessingCapability`

A card processing capability

### `CardProcessingProductFeature`

### `CardProduct`

A shared configuration for a group of cards.

### `CardProductAccountsArgs`

A shared configuration for a group of cards.

### `CardProductApplication`

The possible application types

### `CardProductApplicationBusinessMetric`

Describes the metrics for applications.

### `CardProductApplicationBusinessMetricFilterInput`

Used to filter which application metrics are requested.

### `CardProductApplicationBusinessMetricResult`

Describes metric Result of card product application metric.

### `CardProductApplicationConnection`

The connection type for `CardProductApplication`.

### `CardProductApplicationEdge`

The edge type for an `CardProductApplication`.

### `CardProductApplicationFilterInput`

Inputs for filtering `CardProductApplication` data.

### `CardProductApplicationOfferStatusFilterInput`

`CardProductApplicationOfferStatus` filter input

### `CardProductAttachedInterFinancialAccountTransferRulesArgs`

A shared configuration for a group of cards.

### `CardProductAttachedPlatformSpendRulesArgs`

A shared configuration for a group of cards.

### `CardProductAttachedPlatformVelocityRulesArgs`

A shared configuration for a group of cards.

### `CardProductAttachedRealtimeRiskRulesArgs`

A shared configuration for a group of cards.

### `CardProductAttachedRewardRedemptionConfigurationsArgs`

A shared configuration for a group of cards.

### `CardProductAttachedRewardRulesArgs`

A shared configuration for a group of cards.

### `CardProductAttachedSpendRulesArgs`

A shared configuration for a group of cards.

### `CardProductAttachedVelocityInterFinancialAccountTransferRulesArgs`

A shared configuration for a group of cards.

### `CardProductAttachedVelocityRulesArgs`

A shared configuration for a group of cards.

### `CardProductCardProductApplicationsArgs`

A shared configuration for a group of cards.

### `CardProductCardProfileSetsArgs`

A shared configuration for a group of cards.

### `CardProductConnection`

The connection type for Card Product.

### `CardProductCreditPlansArgs`

A shared configuration for a group of cards.

### `CardProductCreditPlanTemplatesArgs`

A shared configuration for a group of cards.

### `CardProductEdge`

The edge type for a CardProduct.

### `CardProductExternalAchTransfersArgs`

A shared configuration for a group of cards.

### `CardProductFeature`

### `CardProductFeeSchedulesArgs`

A shared configuration for a group of cards.

### `CardProductGroupOrdersArgs`

A shared configuration for a group of cards.

### `CardProductInput`

Details about the Card Product to be created.

### `CardProductIntegratorAchTransfersArgs`

A shared configuration for a group of cards.

### `CardProductInterFinancialAccountTransfersArgs`

A shared configuration for a group of cards.

### `CardProductNonOriginatedAchTransfersArgs`

A shared configuration for a group of cards.

### `CardProductOriginatedAchTransfersArgs`

A shared configuration for a group of cards.

### `CardProductPaymentCardsArgs`

A shared configuration for a group of cards.

### `CardProductPaymentCardsFilterInput`

Inputs for filtering Payment Card data.

### `CardProductPaymentCardTransactionChargebacksArgs`

A shared configuration for a group of cards.

### `CardProductPaymentCardTransactionChargebacksFilterInput`

Input for filtering `PaymentCardTransactionChargeback` on `CardProduct`

### `CardProductPaymentCardTransactionDisputesArgs`

A shared configuration for a group of cards.

### `CardProductPaymentCardTransactionDisputesFilterInput`

Input for filtering `PaymentCardTransactionDispute` on `CardProduct`

### `CardProductSearchCardProductApplicationsArgs`

A shared configuration for a group of cards.

### `CardProductTransactionEventsArgs`

A shared configuration for a group of cards.

### `CardProductTransactionEventsFilterInput`

Inputs for filtering transaction events.

### `CardProfile`

Card Profile common interface

### `CardProfileBin`

The details of a card profile bin.

### `CardProfileDocumentUploadSession`

A document upload session for a card profile

### `CardProfileDuration`

Input to pass time in milliseconds.

### `CardProfileSet`

A selected set of Card Profiles for a given card product

### `CardProfileSetConnection`

The connection type for `CardProfileSetConnection`.

### `CardProfileSetConnectionPayload`

The payload for querying card profile sets

### `CardProfileSetEdge`

The edge type for CardProfileSet.

### `CardProfileSetInterface`

A selected set of Card Profiles for a given card product

### `CardProfileSetRelationship`

The card profile set relationship

### `CardProfileSetRestricted`

A selected set of Card Profiles for a given card product

### `CardProfileSetStatusInput`

The input to filter by card profile set status

### `CardProfileShipment`

CardProfileShipment

### `CardProfileShipmentCourier`

The details of the shipping information.

### `CardReversalStep`

Record of an acquiring `PaymentTransaction` authorization being canceled.

### `CardReversalStepSummary`

Record of a payment transaction authorization being canceled.

### `CardReversedStep`

Record of an acquiring `PaymentTransaction` authorization being canceled.

### `CardTransactionProcessingTypeConditionSpendRule`

A rule that will allow or block `CardTransactionProcessingType`.

### `CardTransactionProcessingTypeConditionSpendRuleResult`

The result of applying a `CardTransactionProcessingTypeConditionSpendRule` to an event.

### `CardTransactionProcessingTypeConditionSpendRuleRevisionsArgs`

A rule that will allow or block `CardTransactionProcessingType`.

### `CardVerificationStep`

Record of an acquiring `PaymentTransaction` verifying a `PaymentMethod`.

### `CashAdvanceRepayment`

A cash advance repayment adjustment on a `TransactionBatch`.

### `CatalogItem`

An defined item that can be added to an `PaymentOrder`.

### `ChargebackExternalNetwork`

The external network of the chargeback.

### `ChargeCardProductFeature`

Whether or not the `CardProduct` supports charge.

### `ChargedFeeTransfer`

Charged fee transfer. Fees are charged to the account holder and transferred from

account holder financial account to income financial account.

### `ChargeNetworkTokenInput`

Input for charging a `NetworkToken`.

### `ChargeNetworkTokenPayload`

Result of charging a `NetworkToken`.

### `ChargePaymentCardInput`

Input for charging a `PaymentCard`.

### `ChargePaymentCardPayload`

Result of charging a `PaymentCard`.

### `ChargePaymentMethodTokenInput`

Input for charging a `PaymentMethodToken`.

### `ChargePaymentMethodTokenPayload`

Result of charging a payment method token.

### `ChargePaymentOrderInput`

Input for charging an `PaymentOrder`.

### `ChargePaymentOrderPayload`

Result of charging an order.

### `ChargePaymentOrderPaymentMethodTokenInput`

Input for charging an `PaymentOrder` via a `PaymentMethodToken`.

### `CheckCapableAccountFeature`

Whether or not the `FinancialAccount` is capable of sending checks.

### `CheckPayment`

An object representing a check.

### `CheckPaymentDocumentUploadSession`

A document upload session for `CheckPayment`.

### `CheckPaymentEvent`

An object representing a check event type change.

### `CheckPaymentRecipient`

An object representing a check recipient.

### `CheckPaymentsConnection`

The connection object for the `checkPayments` query.

### `CheckPaymentsEdge`

The edge object for the `checkPayments` query.

### `CheckRuleConnection`

The connection type for `CheckRule`.

### `CheckRuleEdge`

The edge type for a `CheckRule`.

### `ClearedTransactionBusinessMetricAttribute`

Describes attributes of a cleared transaction metric.

### `ClearedTransactionBusinessMetricTopMerchantCategory`

Describes cleared transaction merchant category metrics.

### `ClearedTransactionBusinessMetricTopMerchantName`

Describes cleared transaction merchant metrics.

### `ClearedTransactionMerchantCategoryBusinessMetricAttribute`

Describes attributes of a cleared transaction merchant Category metric.

### `ClearedTransactionMerchantNameBusinessMetricAttribute`

Describes attributes of a cleared transaction merchant name metric.

### `ClearingEvent`

A Clearing event for a transaction.

### `ClientToken`

A token for use in a client-side integration.

### `CloseExternalFinancialBankAccountInput`

The details to close the external financial bank account for account holder.

### `CloseExternalFinancialBankAccountPayload`

The external financial bank account closed while removing bank account for account holder.

The bank account details like routing number, last four and account type will be returned
as response to closeExternalFinancialBankAccount mutation.

Once the external financial bank account is closed, querying will not return bank account details.

### `ClosePaymentCardInput`

The details of the Payment Card to close.

### `ClosePaymentCardMutation`

### `ClosePaymentCardMutationVariables`

### `ClosePaymentCardPayload`

The return types when closing a Payment Card.

### `CollaborativeApplicationUnderwritingCardProductFeature`

Whether or not the `CardProduct` supports collaborative app underwriting.

### `CollaborativeAuthorizationCardProductFeature`

Whether or not the `CardProduct` supports collaborative authorization.

### `CollaborativeAuthorizationDetails`

Details regarding your responses and settings for collaborative authorization on a transaction

### `CollaborativeAuthorizationEndpoint`

A collaborative authorization endpoint.

### `CollaborativeAuthorizationEndpointConnection`

The connection type for `CollaborativeAuthorizationEndpoints`.

### `CollaborativeAuthorizationEndpointEdge`

The edge type for `CollaborativeAuthorizationEndpoints`.

### `CollaborativeAuthorizationEndpointNode`

The canonical shape of a `CollaborativeAuthorizationEndpoint` yielded by
`list()`. Useful as a parameter type when writing helpers that operate on
endpoints.

### `CommercialChargeCardFinancialAccountStatement`

Statement for commercial charge card accounts

### `CommercialChargeCardFinancialAccountStatementEntry`

Statement entry for Commercial Charge

### `CommercialChargeCardFinancialAccountStatementSnapshot`

Current account snapshot for a commercial charge card

### `CommercialChargeCardFinancialAccountStatementStatementEntriesArgs`

Statement for commercial charge card accounts

### `CommercialCreditPayInFullCardAccountFeature`

Whether or not the Financial Account supports a Commercial Credit Pay In Full Card.

### `CommercialRevolvingCardFinancialAccountStatement`

Statement for commercial revolving card accounts

### `CommercialRevolvingCardFinancialAccountStatementEntry`

Statement entry for Commercial Revolving

### `CommercialRevolvingCardFinancialAccountStatementSnapshot`

Current account snapshot for a commercial revolving card

### `CommercialRevolvingCardFinancialAccountStatementStatementEntriesArgs`

Statement for commercial revolving card accounts

### `CompletePhysicalCardGroupOrderInput`

Input fields for completing a physical card group order.

### `ConditionalInterFinancialAccountTransferRule`

All possible conditional rules to be used with a `VelocityInterFinancialAccountTransferRule`

### `ConditionalRuleSetSpendRule`

A rule that combines multiple other spend rule results together in an all or none approach.
Must be used as a cumulativeRule for a `VelocityRule` with a `PER_TRANSACTION` window.
The resulting `VelocityRule` will have a passing result if all spendRules on the
`VelocityRule` pass or if all spendRules on the `VelocityRule` fail.

### `ConditionalRuleSetSpendRuleRevisionsArgs`

A rule that combines multiple other spend rule results together in an all or none approach.
Must be used as a cumulativeRule for a `VelocityRule` with a `PER_TRANSACTION` window.
The resulting `VelocityRule` will have a passing result if all spendRules on the
`VelocityRule` pass or if all spendRules on the `VelocityRule` fail.

### `ConfirmCreditReportUnfrozenInput`

The input for confirming a credit freeze is lifted for a credit-based `AccountHolderCardProductApplication`.

### `ConfirmCreditReportUnfrozenPayload`

The response type for confirming a credit freeze is lifted for a credit-product `AccountHolderCardProductApplication`.

### `ConfirmPayrollDepositInput`

The details to confirm a payroll deposit.

### `ConfirmPayrollDepositPayload`

The return types when confirming a payroll deposit.

### `ConfirmRequestedIdentityUpdateInput`

The input for confirming a `RequestedIdentityUpdate`.

### `ConfirmRequestedIdentityUpdatePayload`

The response type when confirming a `RequestedIdentityUpdate`

### `ConfirmVerificationOfCreditProductApplicationForFraudAlertInput`

The input for confirming the details of a credit-based `AccountHolderCardProductApplication` in the case of a fraud alert on the applicant's credit report.

### `ConfirmVerificationOfCreditProductApplicationForFraudAlertPayload`

The response type for verifying a credit-product `AccountHolderCardProductApplication` in the case of a fraud alert.

### `ConsentAgreement`

Details on the acceptance of terms and conditions

### `ConsentingParty`

Represents a consenting party

### `ConsentInput`

Details on the acceptance of terms and conditions of the card holder agreement.

### `ConsumerChargeCardFinancialAccountStatement`

Statement for consumer charge card accounts

### `ConsumerChargeCardFinancialAccountStatementEntry`

Statement entry for consumer charge card

### `ConsumerChargeCardFinancialAccountStatementSnapshot`

Current account snapshot for a consumer charge card

### `ConsumerChargeCardFinancialAccountStatementStatementEntriesArgs`

Statement for consumer charge card accounts

### `ConsumerPrepaidCardFinancialAccountStatement`

Statement for consumer prepaid card accounts

### `ConsumerPrepaidCardFinancialAccountStatementEntry`

Statement entry for consumer prepaid card

### `ConsumerPrepaidCardFinancialAccountStatementSnapshot`

Current account snapshot for a consumer prepaid card

### `ConsumerPrepaidCardFinancialAccountStatementStatementEntriesArgs`

Statement for consumer prepaid card accounts

### `ConsumerRevolvingCardFinancialAccountStatement`

Statement for consumer revolving card accounts

### `ConsumerRevolvingCardFinancialAccountStatementEntry`

Statement entry for consumer revolving card

### `ConsumerRevolvingCardFinancialAccountStatementSnapshot`

Current account snapshot for a consumer revolving card

### `ConsumerRevolvingCardFinancialAccountStatementStatementEntriesArgs`

Statement for consumer revolving card accounts

### `Coordinates`

Representation of a unique location on a georgraphic plane.

### `CoordinatesInput`

Representation of a unique location on a georgraphic plane.

### `CountFeeCondition`

The logical condition which compares count of account holder activity.

### `CountFeeConditionValue`

Count Condition value.

### `CountLimitCheckRule`

A `CheckRule` that will put a check on hold if the number of checks is exceeded.

### `CountLimitCheckRuleRevisionsArgs`

A `CheckRule` that will put a check on hold if the number of checks is exceeded.

### `CountLimitInterFinancialAccountTransferRule`

A `InterFinancialAccountTransferRule` that will put an inter financial account transfer on hold if the count is exceeded.
This `TransferRule` must be used in a `VelocityInterFinancialAccountTransferRule`.

### `CountLimitInterFinancialAccountTransferRuleRevisionsArgs`

A `InterFinancialAccountTransferRule` that will put an inter financial account transfer on hold if the count is exceeded.
This `TransferRule` must be used in a `VelocityInterFinancialAccountTransferRule`.

### `CountLimitSpendRule`

A Spend Control rule that limits the number of allowed transactions.

### `CountLimitSpendRuleRevisionsArgs`

A Spend Control rule that limits the number of allowed transactions.

### `CreateAccountHolderCardProductApplicationInput`

Input fields for creating an Account Holder Card Product Application.

### `CreateAccountHolderCardProductApplicationMutation`

### `CreateAccountHolderCardProductApplicationMutationVariables`

### `CreateAccountHolderCardProductApplicationPayload`

Response type for creating an Account Holder Card Product Application.

### `CreateAccountSpendRuleInput`

The details of the `AccountSpendRule` to create.

### `CreateAccountSpendRulePayload`

The return types when creating a `AccountSpendRule`.

### `CreateAccountTransactionCountSpendRuleInput`

The details of the `AccountTransactionCountSpendRule` spend rule to create.

### `CreateAccountTransactionCountSpendRulePayload`

The return types when creating a `AccountTransactionCountSpendRule`.

### `CreateAmountLimitSpendRuleInput`

The details of the `CreateAmountLimitSpendRuleInput` spend rule to create.

### `CreateAmountLimitSpendRuleMutation`

### `CreateAmountLimitSpendRuleMutationVariables`

### `CreateAmountLimitSpendRulePayload`

The return types when creating a new amount limit rule.

### `CreateAuthorizedUserCardProductApplicationInput`

Input fields for creating an Authorized User Card Product Application.

### `CreateAuthorizedUserCardProductApplicationPayload`

Response type for creating an Authorized User Card Product Application.

### `CreateCardDataInputCapabilitySpendRuleInput`

The details of the `CardDataInputCapabilitySpendRule` spend rule to create.

### `CreateCardDataInputCapabilitySpendRulePayload`

The return types when creating a `CardDataInputCapabilitySpendRule`.

### `CreateCardProductCreditPlanInput`

Create a `CreditPlan` for a `CardProduct` based on a `CreditPlanTemplate`.

### `CreateCardProductCreditPlanPayload`

Types which can be returned when creating a `CreditPlan` for a `CardProduct`.

### `CreateCardProductInput`

Top-level input type.

### `CreateCardProductInstallmentCreditPlanInput`

Create a `CreditPlan` for a `CardProduct` with a `BalanceType` of `INSTALLMENT`, based on a `CreditPlanTemplate`.

### `CreateCardProductInstallmentCreditPlanPayload`

Types which can be returned when creating a `CreditPlan` with `CreditBalanceType` of `INSTALLMENT` for a `CardProduct`.

### `CreateCardProductPayload`

Types which can be returned for Card Product operations.

### `CreateCardProductWithTemplate`

The return type for `createCardProductWithTemplate`

### `CreateCardProductWithTemplateCardProductInput`

Input values for `createCardProductWithTemplate`

### `CreateCardProductWithTemplateInput`

Input values for `createCardProductWithTemplate`

### `CreateCardProductWithTemplatePayload`

The return types for `createCardProductWithTemplate`

### `CreateCardTransactionProcessingTypeConditionSpendRuleInput`

The details of the `CardTransactionProcessingTypeConditionSpendRule` to create

### `CreateCardTransactionProcessingTypeConditionSpendRulePayload`

The return types when creating a new `CardTransactionProcessingTypeConditionSpendRule`.

### `CreateChargeCreditCardProductConfigurationInput`

The input type for creating a charge `CardProductCreditConfiguration`

### `CreateCheckPaymentDocumentUploadSessionInput`

Input object for the `createCheckPaymentDocumentUploadSession` mutation.

### `CreateCheckPaymentDocumentUploadSessionPayload`

### `CreateConditionalRuleSetSpendRuleInput`

The details of the `ConditionalRuleSetSpendRule` to create

### `CreateConditionalRuleSetSpendRulePayload`

The return types when creating a new conditional rule set rule.

### `CreateCountLimitSpendRuleInput`

The details of the `CreateCountLimitSpendRuleInput` spend rule to create.

### `CreateCountLimitSpendRulePayload`

The return types when creating a new count limit rule.

### `CreateCreditCardProductConfigurationPayload`

Types that can be returned when creating a `CardProductCreditConfiguration`.

### `CreateCreditLimitChangeRequestInput`

The input type for creating a `CreditLimitChangeRequest`.

### `CreateCreditLimitPercentageSpendRuleInput`

The details of the `CreditLimitPercentageSpendRule` spend rule to create.

### `CreateCreditLimitPercentageSpendRulePayload`

The return types when creating a `CreditLimitPercentageSpendRule`.

### `CreateCvvSpendRuleInput`

The details of the spend rule to create.

### `CreateCvvSpendRulePayload`

The return types when creating a new CVV rule.

### `CreateDaysWithinAccountCreateDateSpendRuleInput`

The details of the `DaysWithinAccountCreateDateSpendRule` spend rule to create.

### `CreateDaysWithinAccountCreateDateSpendRulePayload`

The return types when creating a `DaysWithinAccountCreateDateSpendRule`.

### `CreateDaysWithinCardCreateDateSpendRuleInput`

The details of the `DaysWithinCardCreateDateSpendRule` spend rule to create.

### `CreateDaysWithinCardCreateDateSpendRulePayload`

The return types when creating a `DaysWithinCardCreateDateSpendRule`.

### `CreateDepositAmountLimitSpendRuleInput`

The details of the `DepositAmountLimitSpendRule` to create.

### `CreateDepositAmountLimitSpendRulePayload`

The return types when creating a new deposit amount limit rule.

### `CreateDepositCountLimitSpendRuleInput`

The details of the `DepositCountLimitSpendRule` to create.

### `CreateDepositCountLimitSpendRulePayload`

The return types when creating a new deposit count limit rule.

### `CreateDepositProcessingNetworkSpendRuleInput`

The details of the `DepositProcessingNetworkSpendRule` spend rule to create.

### `CreateDepositProcessingNetworkSpendRulePayload`

The return types when creating a new cash deposit processing network rule.

### `CreateDocumentUploadLinkInput`

The input to generate a secure upload link

### `CreateDocumentUploadLinkMutation`

### `CreateDocumentUploadLinkMutationVariables`

### `CreateDocumentUploadLinkPayload`

### `CreatedOrApprovedApplicationBusinessMetricAttribute`

Describes attributes of an approved application metric.

### `CreateGlobalNoteInput`

The input details of the `GlobalNote` being created.

### `CreateMastercardFraudScoreSpendRuleInput`

The details of the `MastercardFraudScoreSpendRule` spend rule to create.

### `CreateMastercardFraudScoreSpendRulePayload`

The return types when creating a `MastercardFraudScoreSpendRule`.

### `CreateMaximumAmountVarianceOnCreditLimitSpendRuleInput`

The details of the `MaximumAmountVarianceOnCreditLimitSpendRule` spend rule to create.

### `CreateMaximumAmountVarianceOnCreditLimitSpendRulePayload`

The return types when creating a `MaximumAmountVarianceOnCreditLimitSpendRule`.

### `CreateMaximumAmountVarianceOnPseudoBalanceSpendRuleInput`

The details of the `MaximumAmountVarianceOnPseudoBalanceSpendRule` spend rule to create.

### `CreateMaximumAmountVarianceOnPseudoBalanceSpendRulePayload`

The return types when creating a `MaximumAmountVarianceOnPseudoBalanceSpendRule`.

### `CreateMaximumPercentVarianceOnCreditLimitSpendRuleInput`

The details of the `MaximumPercentVarianceOnCreditLimitSpendRule` spend rule to create.

### `CreateMaximumPercentVarianceOnCreditLimitSpendRulePayload`

The return types when creating a `MaximumPercentVarianceOnCreditLimitSpendRule`.

### `CreateMaximumPercentVarianceOnPseudoBalanceSpendRuleInput`

The details of the `MaximumPercentVarianceOnPseudoBalanceSpendRule` spend rule to create.

### `CreateMaximumPercentVarianceOnPseudoBalanceSpendRulePayload`

The return types when creating a `MaximumPercentVarianceOnPseudoBalanceSpendRule`.

### `CreateMerchantCategorySpendRuleInput`

The details of the spend rule to create.

### `CreateMerchantCategorySpendRuleMutation`

### `CreateMerchantCategorySpendRuleMutationVariables`

### `CreateMerchantCategorySpendRulePayload`

The return types when creating a new category rule.

### `CreateMerchantCountrySpendRuleInput`

The details of the spend rule to create.

### `CreateMerchantCountrySpendRulePayload`

The return types when creating a new country rule.

### `CreateMerchantIdentifierSpendRuleInput`

The details of the spend rule to create.

### `CreateMerchantIdentifierSpendRulePayload`

The return types when creating a new merchant identifier rule.

### `CreateMinimalUsBusinessAccountHolderInput`

The input for creating a minimal `USBusinessAccountHolder`

### `CreateMinimalUsBusinessAccountHolderMutation`

### `CreateMinimalUsBusinessAccountHolderMutationVariables`

### `CreateMinimalUsBusinessAccountHolderPayload`

Response type for creating a minimal `USBusinessAccountHolder`.

### `CreateMinimumAmountLimitSpendRuleInput`

The details of the `MinimumAmountLimitSpendRule` spend rule to create.

### `CreateMinimumAmountLimitSpendRulePayload`

The return types when creating a `MinimumAmountLimitSpendRule`.

### `CreateOneTimeAchTransferInput`

Input to create a one time ACH transfer

### `CreateOneTimeAchTransferMutation`

### `CreateOneTimeAchTransferMutationVariables`

### `CreateOneTimeAchTransferPayload`

The return types when a one time transfer is created.

### `CreatePanEntryModeSpendRuleInput`

The details of the `PanEntryModeSpendRule` to be created.

### `CreatePanEntryModeSpendRulePayload`

The return types when creating a `PanEntryModeSpendRule`.

### `CreatePaymentOrderInput`

Input for creating a new `PaymentOrder`.

### `CreatePaymentOrderPayload`

Result of creating a new `PaymentOrder`.

### `CreatePhysicalCardGroupOrderInput`

Input fields for creating a physical card group order.

### `CreatePhysicalCardGroupOrderWithValidatedAddressInput`

Input fields for creating a physical card group order with validated address.

### `CreatePhysicalCardGroupOrderWithValidatedAddressTokenInput`

Input fields for creating a physical card group order with validated address token.

### `CreatePointOfServiceCategorySpendRuleInput`

The details of the `PointOfServiceCategorySpendRule` spend rule to create.

### `CreatePointOfServiceCategorySpendRulePayload`

The return types when creating a point of service category rule.

### `CreatePostalCodeVerificationSpendRuleInput`

The details of the `PostalCodeVerificationSpendRule` spend rule to create.

### `CreatePostalCodeVerificationSpendRulePayload`

The return types when creating a postal code verification rule.

### `CreatePricingPlanInput`

The input details for creating a `PricingPlan`.

### `CreatePricingPlanPayload`

The result of creating a `PricingPlan`.
Returns the newly created pricing plan or error details.

### `CreateRecurringAchTransferInput`

Input to create a recurring ACH transfer

### `CreateRecurringAchTransferMutation`

### `CreateRecurringAchTransferMutationVariables`

### `CreateRecurringAchTransferPayload`

The return types when a recurring transfer is created.

### `CreateReusablePaymentMethodTokenInput`

Input fields for creating a reusable payment method from a tokenized payment method.

### `CreateReusablePaymentMethodTokenPayload`

Types which can be returned when saving payment method

### `CreateRevolvingCreditCardProductConfigurationInput`

The input type for creating a revolving `CardProductCreditConfiguration`

### `CreateRewardDefaultEarnRuleInput`

Input type for creating a `RewardDefaultEarnRule` that holds configuration for how transactions should earn rewards.

### `CreateRewardDefaultEarnRulePayload`

Types which can be returned for Create `RewardDefaultEarnRule`.

### `CreateRewardMerchantCategoryEarnRuleInput`

Input type for creating a `RewardMerchantCategoryEarnRule` that holds configuration for how transactions should earn rewards.

### `CreateRewardMerchantCategoryEarnRulePayload`

Types which can be returned for Create `RewardMerchantCategoryEarnRule`.

### `CreateRewardPointsAdjustmentInput`

Create a Manual Reward Point deduction.

### `CreateRewardRedemptionConfigurationInput`

Create `RewardRedemptionConfiguration`

### `CreateRewardRedemptionConfigurationPayload`

Types which can be returned when creating a `RewardRedemptionConfiguration`.

### `CreateSecretApiKeyInput`

Top level Relay compatible input type.

### `CreateSecretApiKeyPayload`

The possible return types from `createSecretAPIKey`.

### `CreateStreetAddressSpendRuleInput`

The details of the spend rule to create.

### `CreateStreetAddressSpendRulePayload`

The return types when creating a new street address rule.

### `CreateUnifiedFundsTransferQuoteInput`

Input for `createUnifiedFundsTransferQuote`.

One of `source.amount` or `destination.amount` must be provided, but not both. The other amount will be calculated based on the remaining amount after the fee.

### `CreateUnifiedFundsTransferQuotePayload`

The possible results of `createUnifiedFundsTransferQuote`

### `CreateUnifiedFundsTransferQuoteResult`

The result of `createUnifiedFundsTransferQuote`.

### `CreateUsBusinessAccountHolderFromTokenInput`

The input for creating a new USBusinessAccountHolder from tokenized data.

### `CreateUsBusinessAccountHolderFromTokenPayload`

Response type for onboarding a USBusinessAccountHolder from a token.

User error paths returned match paths for `CreateUSBusinessAccountHolderInput`.

### `CreateUsBusinessAccountHolderInput`

Input fields for creating a USBusinessAccountHolder.

### `CreateUsBusinessAccountHolderMutation`

### `CreateUsBusinessAccountHolderMutationVariables`

### `CreateUsBusinessAccountHolderPayload`

Response type for creating a USBusinessAccountHolder.

### `CreateUserDefinedFieldDefinitionInput`

The input for creating a `UserDefinedFieldDefinition`.

### `CreateUserDefinedFieldInput`

The input to create a `UserDefinedField`

### `CreateUsPersonAccountHolderFromTokenInput`

The input for creating a new USPersonAccountHolder from tokenized data.

### `CreateUsPersonAccountHolderFromTokenPayload`

Response type for onboarding a USPersonAccountHolder from a token.

User error paths returned match paths for `CreateUSPersonAccountHolderInput`.

### `CreateUsPersonAccountHolderInput`

Input fields for creating PersonAccountHolder.

### `CreateUsPersonAccountHolderMutation`

### `CreateUsPersonAccountHolderMutationVariables`

### `CreateUsPersonAccountHolderPayload`

Response type for onboarding a USPersonAccountHolder.

### `CreateUsPersonAuthorizedUserFromTokenInput`

The input for creating a new USPersonAuthorizedUser from tokenized data.

### `CreateUsPersonAuthorizedUserFromTokenPayload`

Response type for onboarding a USPersonAuthorizedUser from a token.

User error paths returned match paths for `CreateUSPersonAuthorizedUserInput`.

### `CreateUsPersonAuthorizedUserInput`

Input fields for creating PersonAuthorizedUser.

### `CreateUsPersonAuthorizedUserPayload`

Response type for onboarding a USPersonAuthorizedUser.

### `CreateVelocityRuleInput`

The details of the `VelocityRule` to create

### `CreateVelocityRulePayload`

The return types when creating a new `VelocityRule`.

### `CreateVisaRiskScoreSpendRuleInput`

The details of the `VisaRiskScoreSpendRule` spend rule to create.

### `CreateVisaRiskScoreSpendRulePayload`

The return types when creating a `VisaRiskScoreSpendRule`.

### `CreditAccountAgingCardProductConfiguration`

The account aging configuration available on a `CardProduct`. For example, the number of days until a payment is due, and until an account is
considered `DELINQUENT`, `SUSPENDED`, or `CLOSED`.

### `CreditAccountAgingProductConfigurationInput`

The input type for the account aging configuration available on a `CardProduct`. For example, the number of days until a payment is due, and until an account is
considered `DELINQUENT`, `SUSPENDED`, or `CLOSED`.

### `CreditBillingCycleCardProductConfiguration`

The billing statement configuration available on a `CardProduct`.

### `CreditBillingCycleCardProductConfigurationInput`

The billing statement configuration available on a `CardProduct`.

### `CreditCardAccountFeature`

Whether or not the Financial Account supports a Credit Card.

### `CreditCardInterestAccrual`

Details about interest accrual.

### `CreditCardInterestReversal`

Details about interest reversal.

### `CreditCardInterestTransfer`

The union type for `CreditCardInterestTransfer`, which supports accrual and reversal.

### `CreditCardProductConfiguration`

The credit configuration values available on a `CardProduct`. For example, account aging, minimum payment, and repayment configuration.

### `CreditCardTransferEvent`

A financial event that represents a credit card transfer.

### `CreditFinancialAccountConfiguration`

The credit configuration for this `FinancialAccount`.

### `CreditFunds`

A credit transfer to a Highnote account.

### `CreditFundsAchTransferEvent`

A financial event that represents a `CreditFunds` transfer.

### `CreditFundsLedgersArgs`

A credit transfer to a Highnote account.

### `CreditInterestApplicationCardProductConfiguration`

The interest calculation configuration available on a `CardProduct`.

### `CreditLedgerEntry`

A ledger entry of type credit, it represents the portion of a financial event where a Ledger had money credited to it.

### `CreditLimitChangeRequest`

A review of the credit limit on a `FinancialAccount` to either increase or decrease it.

### `CreditLimitChangeRequestCustomerDetails`

Details collected about the customer.

### `CreditLimitChangeRequestCustomerDetailsInput`

The input type for details collected about the customer.

### `CreditLimitChangeRequestDetails`

Details about the requested credit limit change.

### `CreditLimitChangeRequestDetailsInput`

The input type for specifying details about the `CreditLimitChangeRequest`.

### `CreditLimitChangeRequestPayload`

Types that can be returned for `CreditLimitChangeRequest`.

### `CreditLimitChangeRequestStatusChangedEvent`

An event that occurs when a `CreditLimitChangeRequest` has a change in status.

### `CreditLimitChangeRequestStatusHistory`

`CreditLimitChangeRequest` status history.

### `CreditLimitPercentageSpendRule`

A Spend Control rule that blocks transactions if the amount is above a configured percentage of the account's credit limit.

### `CreditLimitPercentageSpendRuleResult`

The result of applying a `CreditLimitPercentageSpendRule` to an event.

### `CreditLimitPercentageSpendRuleRevisionsArgs`

A Spend Control rule that blocks transactions if the amount is above a configured percentage of the account's credit limit.

### `CreditLimitVarianceCardProductFeature`

Whether or not the `CardProduct` supports credit limit variance.

### `CreditManualAdjustmentDetail`

This event encapsulates the impacted account and credit amount for a `ManualAdjustmentEvent`.

### `CreditMinimumPaymentCardProductConfiguration`

The minimum payment configuration available on a `CardProduct`. For example, whether the minimum payment includes the past due amount, interest, and fees.

### `CreditMinimumPaymentCardProductConfigurationInput`

The input type for the minimum payment configuration available on a `CardProduct`. For example, whether the minimum payment includes the past due amount, interest, and fees.

### `CreditPayInFullCardFinancialAccountStatement`

Statement for credit pay in full card accounts

### `CreditPayInFullCardFinancialAccountStatementEntry`

Statement entry for credit pay in full card

### `CreditPayInFullCardFinancialAccountStatementSnapshot`

Current account snapshot for a credit pay in full card

### `CreditPayInFullCardFinancialAccountStatementStatementEntriesArgs`

Statement for credit pay in full card accounts

### `CreditPayInFullFinancialAccountDelinquency`

Delinquency for a `FinancialAccount` associated with a credit pay in full product.

### `CreditPayInFullFinancialAccountDelinquencyCycle`

A billing cycle where a `FinancialAccount` associated with a credit pay in full product is delinquent at some point.

### `CreditPaymentCardFinancialAccountFeature`

**Deprecated**. Please use `CreditCardAccountFeature` instead.

Whether or not the Financial Account supports a Credit Payment Card.

### `CreditPlan`

`CreditPlans` define the credit and interest terms of a credit `CardProduct`. For example, they include the interest rate (APR), the way interest will accrue and be assessed, and the effective dates of the plan.

### `CreditPlanConnection`

The connection type for a `CreditPlan`.

### `CreditPlanDuration`

The duration type for `CreditPlan`.

### `CreditPlanEdge`

The edge type for a `CreditPlan`.

### `CreditPlanFeeInput`

The input type for `CreditPlan` fee configuration. Currently only used for `CreditPlan`s of `CreditBalanceType` `INSTALLMENT`.

### `CreditPlanFilterInput`

The input type for filtering `CreditPlan`.

### `CreditPlanFinancialAccountConfiguration`

The credit configuration values for `CreditPlan`s available on a `FinancialAccount`. For example, the interest rate configured for this `FinancialAccount` for this `CreditPlan`.

### `CreditPlanInstallmentPolicy`

The installment policy for this `CreditPlan`.

### `CreditPlanInterestPolicy`

The interest policy for this `CreditPlan`.

### `CreditPlanPromotionalPolicy`

The promotional policy for this `CreditPlan`.

### `CreditPlanTemplate`

`CreditPlanTemplates` provide a base configuration for creating a `CreditPlan`. For example, they define the interest policy, the transaction and plan types, and the maximum credit limit allowed by the `CreditPlan`.

### `CreditPlanTemplateConnection`

The connection type for a `CreditPlanTemplate`.

### `CreditPlanTemplateEdge`

The edge type for a `CreditPlanTemplate`.

### `CreditPlanTemplateFilterInput`

The input type for filtering `CreditPlanTemplate`.

### `CreditPlanTemplateInstallmentPolicy`

The installment policy for this `CreditPlanTemplate`.

### `CreditPlanTemplateInterestPolicy`

The interest policy for this `CreditPlanTemplate`.

### `CreditPlanTemplatePromotionalPolicy`

The promotional policy for this `CreditPlanTemplate`.

### `CreditPlanTerms`

The terms in play for a `CreditPlan`, such as interest rate.

### `CreditRepayment`

A payment towards a balance owed for a credit product.

### `CreditRepaymentCardProductConfiguration`

The repayment configuration available on a `CardProduct`.

### `CreditRepaymentStatementApplication`

An application of a repayment to a statement.

### `CreditReportFraudAlertVerificationResult`

The `AccountHolderCardProductApplication` fields that were confirmed in response to a fraud alert on the applicant's credit report.

### `CreditRiskAttributes`

A type representing credit risk attributes.

### `CreditRiskAttributesInput`

Input fields for credit risk attributes.

### `CreditScoreModel`

Details about the factors considered behind specific credit scores.

### `CreditTransaction`

A Transaction which credits money to a PaymentCard.

### `CreditTransactionTransactionEventsArgs`

A Transaction which credits money to a PaymentCard.

### `CreditUnderwritingVerification`

A type representing the current state in the credit underwriting process.

### `CreditUnderwritingVerificationCreditScoreDetails`

Details about the source, model, and retrieval context for a specific credit score used in underwriting.

### `CreditUnderwritingVerificationReviewReasonDetails`

Details about why a `CreditUnderwritingVerification` is in `IN_REVIEW` status.

### `CryptoFundingFlowEvent`

A lifecycle event emitted for a `CryptoFundingFlowTransfer`.

### `CryptoFundingFlowFailedEvent`

An event that occurs when a `CryptoFundingFlowTransfer` has failed.

### `CryptoFundingFlowProcessedEvent`

An event that occurs when a `CryptoFundingFlowTransfer` has been processed successfully and ledgers are posted.

### `CryptoFundingFlowProcessingEvent`

An event that occurs when a `CryptoFundingFlowTransfer` is being processed by Highnote.

### `CryptoFundingFlowReceivedEvent`

An event that occurs when a `CryptoFundingFlowTransfer` is first received from the provider.

### `CryptoFundingFlowTransfer`

A crypto funding flow movement. This represents the overall state of the transfer.

### `CumulativeInterFinancialAccountTransferRule`

All possible cumulative rules to be used with a `VelocityInterFinancialAccountTransferRule`

### `CurrentFinancialAccountDelinquencyState`

The current delinquency state of this `FinancialAccount`.

### `Customer`

Type for customer

### `CustomerAddress`

Saved `CustomerAddress` details.

### `CustomerAddressTokenArgs`

Saved `CustomerAddress` details.

### `CustomerContactInput`

Input for customer contact information.

### `CustomerEmailContactMethod`

Saved Email contact details.

### `CustomerName`

Saved `CustomerName` details.

### `CustomerPayload`

Types which can be returned for a `Customer`.

### `CustomerPhone`

Saved `CustomerPhone` details.

### `CustomerReferencePayload`

Types to expect when looking up a customer.

### `CustomerWalletArgs`

Type for customer

### `CustomerWebsiteContactMethod`

Saved Website contact details.

### `CustomField`

The interface for an element of `CustomFields`.

### `CustomFieldInput`

The input to specify a `CustomFields` key value pair.

### `CustomFieldsFilterInput`

Inputs for filtering `CustomFields`.

### `CustomFieldsPayload`

The return types for `CustomFields`.

### `CustomFieldsResult`

The result object returned when you update CustomFields.

### `CustomStringField`

The string value data type for an element of `CustomFields`.

### `CvvResponseCodeFilterInput`

Input for filtering CVV response code

### `CvvSpendRule`

A Spend Control rule that allows or blocks certain CVV response codes during authorizations.

### `CvvSpendRuleResult`

The result of applying a CVV spend rule to an event.

### `CvvSpendRuleRevisionsArgs`

A Spend Control rule that allows or blocks certain CVV response codes during authorizations.

### `DateFilterInput`

Input for filtering dates.

The format for each `String` field should be in YYYY-MM-DD format.

Example: `2021-11-12`

### `DateFilterInputRange`

Input for filtering by date value ranges (inclusive).

The format for each `String` field should be in YYYY-MM-DD format.

Example: `2021-11-12`

### `DaysWithinAccountCreateDateSpendRule`

A Spend Control rule that blocks transactions if the card's `FinancialAccount` was created more than a specified number of days ago.

### `DaysWithinAccountCreateDateSpendRuleResult`

The result of applying a `DaysWithinAccountCreateDateSpendRule` to an event.

### `DaysWithinAccountCreateDateSpendRuleRevisionsArgs`

A Spend Control rule that blocks transactions if the card's `FinancialAccount` was created more than a specified number of days ago.

### `DaysWithinCardCreateDateSpendRule`

A Spend Control rule that blocks transactions if the `PaymentCard` was created more than a specified number of days ago.

### `DaysWithinCardCreateDateSpendRuleResult`

The result of applying a `DaysWithinCardCreateDateSpendRule` to an event.

### `DaysWithinCardCreateDateSpendRuleRevisionsArgs`

A Spend Control rule that blocks transactions if the `PaymentCard` was created more than a specified number of days ago.

### `DeactivateCollaborativeAuthorizationEndpointInput`

The input to deactivate a `CollaborativeAuthorizationEndpoint`.

### `DeactivateCollaborativeAuthorizationEndpointMutation`

### `DeactivateCollaborativeAuthorizationEndpointMutationVariables`

### `DeactivateCollaborativeAuthorizationEndpointPayload`

The return types when deactivating a `CollaborativeAuthorizationEndpoint`.

### `DeactivateNotificationTargetInput`

The input to deactivate a notification target.

### `DeactivateNotificationTargetMutation`

### `DeactivateNotificationTargetMutationVariables`

### `DeactivateNotificationTargetPayload`

The return types when deactivating a notification target.

### `DebitFunds`

A debit transfer to a Highnote account.

### `DebitFundsAchTransferEvent`

A financial event that represents a `DebitFunds` transfer.

### `DebitFundsLedgersArgs`

A debit transfer to a Highnote account.

### `DebitLedgerEntry`

A ledger entry of type debit, it represents the portion of a financial event where a Ledger had money debited from it.

### `DebitManualAdjustmentDetail`

This event encapsulates the impacted account and debit amount for a `ManualAdjustmentEvent`.

### `DebitPaymentCardFinancialAccountFeature`

Whether or not the Financial Account supports a Debit Payment Card.

### `DebitTransaction`

A Transaction which debits money from a PaymentCard.

### `DebitTransactionTransactionEventsArgs`

A Transaction which debits money from a PaymentCard.

### `DeclinedTransactionBusinessMetricAttribute`

Describes attributes of a declined transaction metric.

### `DeclinedTransactionResponseCodeBusinessMetric`

Describes declined transaction reasons metric.

### `DeclinedTransactionResponseCodeBusinessMetricAttribute`

Describes attributes of a declined transaction reason metric.

### `DeleteCustomFieldsInput`

The input to clear all `CustomFields` keys associated with the object.

### `DeleteSpendRuleInput`

The details of the spend rule you want to delete.

### `DeleteSpendRulePayload`

The return types when deleting an existing spend rule.

### `DeleteVelocityRuleInput`

The details of the velocity rule you want to delete.

### `DeleteVelocityRulePayload`

The return types when deleting an existing velocity rule.

### `DelinquencyStateTransition`

The transition of a `FinancialAccount` to a certain `FinancialAccountDelinquencyState`, such as CURRENT, DELINQUENT, or CLOSING.

### `DeliveryAttempt`

An attempt to delivery a Notification Event to a target.

### `DeliveryAttemptConnection`

The connection type for DeliveryAttempt.

### `DeliveryAttemptEdge`

The edge type for DeliveryAttempt.

### `DeliveryAttemptResponse`

Provides details about the response from the target on the delivery attempt

### `DenyCreditLimitDecreaseInput`

The input type for denying a credit limit decrease for a `CreditLimitChangeRequest`.

### `DenyCreditLimitIncreaseInput`

The input type for denying a credit limit increase for a `CreditLimitChangeRequest`.

### `DenyCreditProductApplicationUnderwritingInput`

The input for denying a credit-based `AccountHolderCardProductApplication`.

### `DenyCreditProductApplicationUnderwritingPayload`

The response type for denying a credit-product `AccountHolderCardProductApplication`.

### `DepositAmountLimitSpendRule`

A rule that limits the dollar amount that can be deposited.

### `DepositAmountLimitSpendRuleResult`

The result of applying a `DepositAmountLimitSpendRule` to an event.

### `DepositAmountLimitSpendRuleRevisionsArgs`

A rule that limits the dollar amount that can be deposited.

### `DepositCountLimitSpendRule`

A rule that limits the number of times that a cash deposit can be made.

### `DepositCountLimitSpendRuleRevisionsArgs`

A rule that limits the number of times that a cash deposit can be made.

### `DepositProcessingNetworkSpendRule`

A rule that limits which processing networks can be used to make a deposit.

### `DepositProcessingNetworkSpendRuleResult`

The result of applying a `DepositProcessingNetworkSpendRule` to an event.

### `DepositProcessingNetworkSpendRuleRevisionsArgs`

A rule that limits which processing networks can be used to make a deposit.

### `DetachCardProductVelocityRuleInput`

The details of the `VelocityRule` to detach from the `CardProduct`

### `DetachCardProductVelocityRulePayload`

The return types when detaching a `VelocityRule` from a `CardProduct`.

### `DetachPaymentCardVelocityRuleInput`

The details of the `VelocityRule` to detach from the `PaymentCard`

### `DetachPaymentCardVelocityRulePayload`

The return types when detaching a `VelocityRule` from a `PaymentCard`.

### `DetachRealtimeRiskRuleFromCardProductInput`

The details of the realtime risk rule to detach from the Card Product.

### `DetachRealtimeRiskRuleFromCardProductPayload`

The return types when detaching a realtime risk rule from a card product.

### `DetachRealtimeRiskRuleFromFinancialAccountInput`

The details of the realtime risk rule to detach from the Financial Account.

### `DetachRealtimeRiskRuleFromFinancialAccountPayload`

The return types when detaching a realtime risk rule from a financial account.

### `DetachRealtimeRiskRuleFromPaymentCardInput`

The details of the realtime risk rule to detach from the Payment Card.

### `DetachRealtimeRiskRuleFromPaymentCardPayload`

The return types when detaching a realtime risk rule from a payment card.

### `DetachRiskRuleInput`

The details of the risk rule to detach.

### `DetachSpendRuleFromCardProductInput`

The details of the spend rule to detach from the Card Product

### `DetachSpendRuleFromCardProductPayload`

The return types when detaching a spend rule from a card product.

### `DetachSpendRuleFromFinancialAccountInput`

The details of the spend rule to detach from the Payment Card.

### `DetachSpendRuleFromFinancialAccountPayload`

The return types when detaching a `SpendRule` from a `FinancialAccount`.

### `DetachSpendRuleFromPaymentCardInput`

The details of the spend rule to detach from the Payment Card.

### `DetachSpendRuleFromPaymentCardMutation`

### `DetachSpendRuleFromPaymentCardMutationVariables`

### `DetachSpendRuleFromPaymentCardPayload`

The return types when detaching a spend control rule from a payment card.

### `DetachSpendRuleInput`

The details of the spend rule to detach.

### `DetachVelocityRuleFromFinancialAccountInput`

The details of the `VelocityRule` to detach from the `FinancialAccount`

### `DetachVelocityRuleFromFinancialAccountPayload`

The return types when detaching a `VelocityRule` from a `FinancialAccount`.

### `DigitalArtColors`

Digital card Art color customizations

### `DigitalCardArtDocument`

Digital Card art properties for a card art document upload session

### `DigitalCardProfile`

Digital Card Profile attributes

### `DigitalCardProfileActiveTokenLimits`

Active token quantity restrictions that limit how many digital wallet tokens can exist simultaneously. These controls help manage security exposure by preventing unlimited token proliferation across devices.

### `DigitalCardProfileHistoricalTokenLimits`

Historical usage tracking that monitors lifetime token creation patterns to detect suspicious behavior. These limits look at the total number of tokens ever created by a cardholder, regardless of current status.

### `DigitalCardProfileTokenProvisioningAccountBalanceControl`

Account balance requirements for digital wallet enrollment eligibility. These controls ensure cardholders have sufficient funds before allowing digital wallet provisioning.

### `DigitalCardProfileTokenProvisioningConstraints`

Active digital wallet provisioning configuration applied to this card profile. This type contains the current restrictions and limits that govern how cardholders can add and use this card in digital wallets.
Use this to understand what restrictions and options are currently active for digital wallet provisioning.

### `DigitalCardProfileTokenProvisioningControls`

Primary controls that govern the digital wallet provisioning experience and requirements. These settings determine both how users can add their card and what conditions must be met for successful enrollment.

### `DigitalCardProfileTokenProvisioningLifeCycleControls`

Lifecycle management controls that govern automatic cleanup and maintenance of digital wallet tokens.
These settings determine when tokens should be automatically deleted based on card or account status changes, helping maintain security hygiene and reduce orphaned tokens across digital wallets.

### `DigitalCardProfileTokenProvisioningLimits`

Current token quantity limits and restrictions for this card profile. These limits control how many digital wallet tokens cardholders can create and maintain across all their devices and digital wallets.

### `DigitalCardProfileTokenProvisioningSourceEntryControls`

Card information entry method restrictions that control how cardholders can input their details when adding cards to digital wallets. These settings balance security, user experience, and fraud prevention.

### `DigitalCardProfileTokenProvisioningVerificationMethodRules`

Specific verification method configuration that defines which identity verification channels are available to cardholders. This determines the actual verification options presented in the digital wallet interface.

### `DigitalCardProfileTokenProvisioningVerificationRules`

Identity verification requirements and available methods for digital wallet provisioning. These rules determine what verification options are presented to cardholders when adding their card to a digital wallet.

### `DigitalCardProfileTokenRateLimits`

Time-based restrictions that prevent rapid provisioning attempts while allowing legitimate user retries. These controls help distinguish between normal user behavior and potential attack patterns.

### `DigitalWalletPushProvisioningCardholderName`

Type representing common fields of a person's name.

### `DirectDepositDetail`

A financial instrument with an associated account and routing number.

The direct deposit detail that can be used to deposit funds.

### `DirectDepositDetailRestrictedDetails`

Direct deposit details for a financial account.

### `DirectDepositDetailRestrictedDetailsResult`

### `DirectDepositFinancialAccountFeature`

Whether or not the Financial Account supports a backing account and routing number.

The account and routing number can be used to deposit funds.

### `DirectMerchantAcquiringCardProductFeature`

Whether or not the `CardProduct` supports direct merchant acquiring.

### `DisableAuthorizedUserFeatureInput`

The input to disable the authorized user product feature.

### `DisableAuthorizedUserFeaturePayload`

The return types when calling `disableAuthorizedUserFeature` on a `CardProduct`.

### `DisbursementTransferEvent`

`TransferEvent` for disbursement.

### `DisbursementTransferEventLedgersArgs`

`TransferEvent` for disbursement.

### `Dispute`

### `DisputeChargebackCardProductFeature`

Whether or not the `CardProduct` supports Disputes and feature configurations for Dispute and Chargeback restrictions.

### `DisputeStep`

Record of an acquiring `PaymentTransaction` dispute step.

### `Distance`

A representation of size and unit of measurement of a distance.

### `DistanceInput`

A representation of size and unit of measurement of a distance.

### `DocumentCollectionAggregateEntity`

### `DocumentCollectionOwnerEntity`

### `DocumentCollectionPrimaryEntity`

### `DocumentRequest`

The document being requested

### `DocumentUploadCollection`

A collection of documents pertaining to a specific `DocumentUploadDomain`, all associated with a single entity

### `DocumentUploadCollectionEntry`

A set of documents collected in a single document upload session

### `DocumentUploadLink`

A secure upload link for a document upload session

### `DocumentUploadLinkDocumentDetails`

Upload link document details.

### `DocumentUploadLinkDocumentDetailsResult`

Response type for upload link document details.

### `DocumentUploadRequestEvent`

A document upload session that has been requested.

### `DocumentUploadRequirementConstraint`

A requirement constraint for a document upload

### `DocumentUploadSession`

### `DocumentUploadSessionCompleteEvent`

### `DocumentUploadSessionContext`

A union representing a `DocumentUploadSessionContext`

### `EarlyDirectDepositCardProductFeature`

Whether or not the `CardProduct` supports early direct deposit feature.

### `ElectronicFundsTransfer`

A movement of money within the Highnote platform.

### `ElectronicFundsTransferLedgersArgs`

A movement of money within the Highnote platform.

### `EmbeddedDeviceInformation`

Embedded Device information

### `EmployerFinancialAccount`

A employee financial account allows you to move money from Employer owned accounts to their customer accounts

### `EnableAuthorizedUserFeatureInput`

The input to enable the authorized user product feature.

### `EnableAuthorizedUserFeaturePayload`

The return types when calling `enableAuthorizedUserFeature` on a `CardProduct`.

### `EnableCollaborativeApplicationUnderwritingFeatureInput`

The input to configure the Collaborative Application Decisioning product feature.

### `EnableCollaborativeApplicationUnderwritingFeaturePayload`

The return types when calling `enableCollaborativeApplicationUnderwritingFeature` on a `CardProduct`.

### `EnableCollaborativeAuthorizationFeatureInput`

The input to configure the Collaborative Authorization product feature.

### `EnableCollaborativeAuthorizationFeaturePayload`

The return types when enabling the Collaborative Authorization product feature.

### `EnableCreditCardFeatureInput`

The input to configure the credit card product feature.

### `EnableCreditCardFeaturePayload`

The return types when calling `enableCreditCardFeature` on a `CardProduct`.

### `EnableOnDemandFundingFeatureInput`

The input to configure the On demand product feature.

### `EnableOnDemandFundingFeaturePayload`

The return types when calling `enableOnDemandFundingFeature` on a `CardProduct`.

### `EndDocumentUploadSessionInput`

The input to end a document upload session

### `EndDocumentUploadSessionMutation`

### `EndDocumentUploadSessionMutationVariables`

### `EndDocumentUploadSessionPayload`

### `EnhancedDataEvent`

A event containing additional data related to a transaction.

### `Exact`

### `ExpirationDetail`

A time range that an api can be accessed.

### `ExternalBankAccount`

### `ExternalBankAccountAddedEvent`

Event generated when an external bank account is linked to an account holder.

### `ExternalBankAccountDetail`

A financial instrument with an associated account and routing number.

The direct deposit detail that can be used to deposit funds.

If ExternalFinancialBankAccount is CLOSED then ExternalBankAccountDetail will not be returned except during close mutation.

### `ExternalBankAccountEvent`

External Bank Account Added Event

### `ExternalBankAccountRemovedEvent`

Event generated when an external bank account was disconnected from an account holder.

### `ExternalBusinessManagementCardProductFeature`

Whether or not the `CardProduct` supports external business management

### `ExternalFinancialAccount`

The external financial account created for any external financial instrument of account holder.

### `ExternalFinancialAccountConnection`

The connection type for External Financial Account.

### `ExternalFinancialAccountEdge`

The edge type for a ExternalFinancialAccount.

### `ExternalFinancialBankAccount`

External financial account for external bank account.

### `ExternalFinancialBankAccountExternalAchTransfersArgs`

External financial account for external bank account.

### `ExternalFinancialBankAccountExternallyInitiatedAchTransferArgs`

External financial account for external bank account.

### `ExternalFinancialBankAccountExternallyInitiatedAchTransfersArgs`

External financial account for external bank account.

### `ExternalFinancialBankAccountIntegratorAchTransfersArgs`

External financial account for external bank account.

### `ExternalFinancialBankAccountIntegratorInitiatedAchTransferArgs`

External financial account for external bank account.

### `ExternalFinancialBankAccountIntegratorInitiatedAchTransfersArgs`

External financial account for external bank account.

### `ExternalFinancialBankAccountNonOriginatedAchTransfersArgs`

External financial account for external bank account.

### `ExternalFinancialBankAccountOriginatedAchTransfersArgs`

External financial account for external bank account.

### `ExternalFinancialBankAccountTransactionEventsArgs`

External financial account for external bank account.

### `ExternallyInitiatedAchHoldStatusFilterInput`

Input for filtering by `ExternallyInitiatedACHHoldStatusFilterInput`.

### `ExternallyInitiatedAchReleaseHoldTransfer`

A movement of money to release hold on non originated ach credit

### `ExternallyInitiatedAchReleaseHoldTransferLedgersArgs`

A movement of money to release hold on non originated ach credit

### `ExternallyInitiatedAchStatusDetails`

Details about the status of the ACH transfer.

### `ExternallyInitiatedAchStatusFilterInput`

Input for filtering by `ExternallyInitiatedACHStatusFilterInput`.

### `ExternallyInitiatedAchStatusReasonCodeFilterInput`

Input for filtering by `ExternallyInitiatedACHStatusReasonCodeFilterInput`.

### `ExternallyInitiatedAchTransfer`

An ACH transfer initiated by an outside company and sent to Highnote.

[ACH](https://en.wikipedia.org/wiki/Automated_clearing_house) is a method of transferring funds between banks.

### `ExternallyInitiatedAchTransferConnection`

The connection type for Externally Initiated ACH Transfers.

### `ExternallyInitiatedAchTransferEdge`

The edge type for an Externally Initiated ACH Transfer.

### `ExternallyInitiatedAchTransferEdgeNode`

### `ExternallyInitiatedAchTransferFilterInput`

Inputs for filtering Externally Initiated ACH Transfer data.

### `ExternallyInitiatedAchTransferLedgersArgs`

An ACH transfer initiated by an outside company and sent to Highnote.

[ACH](https://en.wikipedia.org/wiki/Automated_clearing_house) is a method of transferring funds between banks.

### `ExternallyInitiatedAchTransferPayload`

The return types when initiating a new simulated `ExternallyInitiatedACHTransfer`.

### `ExternallyInitiatedTransferTypeFilterInput`

Input for filtering by `ExternallyInitiatedTransferType`.

### `ExternallyInitiatedWireTransfer`

A wire transfer in to a Highnote account.

### `ExternallyInitiatedWireTransferLedgersArgs`

A wire transfer in to a Highnote account.

### `ExternalMoneyMovementTransaction`

A transaction for an external money movement.

### `ExternalMoneyMovementTransactionEvent`

A transaction event for an external money movement.

### `ExternalMoneyMovementTransactionLedgersArgs`

A transaction for an external money movement.

### `ExternalPhysicalPaymentCardOrder`

External Physical Payment Card Order

### `ExternalTokenFinicityInput`

The Finicity token that can be used to fetch bank account details of account holder.

### `ExternalTokenInput`

The external token that can be used to fetch bank account details of account holder.

### `FailureAchTransferStatus`

Information about integrator initiated transfers which have failed.

### `FailureExternallyInitiatedAchStatus`

Information about externally initiated transfers which have failed.

### `FailureFeeTransferStatus`

Failure fee transfer event status.

### `FailureIntegratorInitiatedAchStatus`

Information about integrator initiated transfers which have failed.

### `FailureWireTransferStatus`

Information about wire transfers which have failed.

### `FeaturePermission`

The `FeaturePermission` interface

### `FeaturePermissionConnection`

The connection object for a `FeaturePermission`

### `FeaturePermissionEdge`

The edge object for a `FeaturePermission`

### `FeaturePermissionRevision`

The `FeaturePermissionRevision` interface

### `FeaturePermissionRevisionConnection`

The connection object for a `FeaturePermissionRevision`

### `FeaturePermissionRevisionEdge`

The edge object for a `FeaturePermissionRevision`

### `FeaturePermissionRevisionsArgs`

The `FeaturePermission` interface

### `FeeChargeActivity`

Activity that is triggering the fee transfer event.

### `FeeChargeEvent`

An event that occurs when a Fee is charged.

### `FeeChargeRule`

A fee charge rule.

### `FeeChargeRuleAmountCondition`

A fee charge condition that is based on amount in account holder activity.

### `FeeChargeRuleCondition`

Fee charge rule condition.

### `FeeChargeRuleCountCondition`

A fee charge condition that is based on count of account holder activity.

### `FeeChargeValue`

Fee charge value.

### `FeeConfiguration`

A fee configuration. Fee configuration consists of account holder activity that is being
charged and the rules that determines what fee charge is applicable.

### `FeeReversalEvent`

An event that occurs when a Fee is reversed.

### `FeeSchedule`

Fee schedule. It has set of fee configurations.

### `FeeScheduleAssociatedTo`

Fee schedules associated to.

### `FeeScheduleConnection`

The connection type for Fee Schedule.

### `FeeScheduleEdge`

The edge type for a Fee Schedule.

### `FeeScheduleFilterInput`

Inputs for filtering Fee Schedules.

### `FeeTransfer`

Union of charged fee transfer and reversed fee transfer.

### `FeeTransferEvent`

A Fee Transfer Event.

### `FeeTransferEventConnection`

The connection type for Fee Transfer Event.

### `FeeTransferEventEdge`

The edge type for a Fee Transfer Event.

### `FeeTransferEventFailure`

A Fee Transfer Event Failure.

### `FeeTransferEventFilterInput`

Inputs for filtering Fee Transfer Events.

### `FeeTransferEventPayload`

Response type for waive fee.

### `FeeTransferStatusDetails`

Details about the status of the fee transfer.

### `FieldUserError`

A validation error for a specific field or input path.

### `FileUploadCompleteEvent`

### `FilteredCardProductCardProfileSetsInput`

The input to filter card profile sets on a 'CardProduct'

### `FilteredCardProfileSetsInput`

The input to filter card profile sets

### `FilteredPaymentMethodInput`

Input to filter payment method.

### `FinancialAccount`

A financial account allows you to move money into the Highnote platform and move funds to other accounts.

### `FinancialAccountAccountReviewHistoryArgs`

A financial account allows you to move money into the Highnote platform and move funds to other accounts.

### `FinancialAccountActivitiesFilterInput`

Inputs for filtering Financial Account Activities.

### `FinancialAccountActivity`

Details of an activity, such as a transfer or payment card transaction, for a Financial Account.

### `FinancialAccountActivityConnection`

The connection type for `FinancialAccountActivity`.

### `FinancialAccountActivityEdge`

The edge type for a `FinancialAccountActivity`.

### `FinancialAccountActivitySource`

### `FinancialAccountActivityTypeFilterInput`

Inputs for filtering Financial Account Activity types

### `FinancialAccountAttachedRealtimeRiskRulesArgs`

A financial account allows you to move money into the Highnote platform and move funds to other accounts.

### `FinancialAccountAttachedSpendRulesArgs`

A financial account allows you to move money into the Highnote platform and move funds to other accounts.

### `FinancialAccountAttachedVelocityRulesArgs`

A financial account allows you to move money into the Highnote platform and move funds to other accounts.

### `FinancialAccountAttributeWithReason`

The Attribute of a `FinancialAccount` with a reason.

### `FinancialAccountAuthorizedUserFinancialAccountsArgs`

A financial account allows you to move money into the Highnote platform and move funds to other accounts.

### `FinancialAccountBalanceLedgerDetail`

The ledger details for the `FinancialAccount` balance.

### `FinancialAccountBalanceSearchFilter`

A filter to search for a `FinancialAccountBalanceSearchResult`.
Each `FinancialAccountBalanceSearchFilter` must define a `searchField`, along with the value filter for that
field.
stringFilter field names:
- `FINANCIAL_ACCOUNT_ID`
- `CARD_PRODUCT_ID`
- `FINANCIAL_ACCOUNT_OWNER_ID`

timestampFilter field names:
- `FINANCIAL_ACCOUNT_CREATE_DATE`

signedBalance field can be used with any `*_LEDGER_BALANCE` fields to filter by the current balance of the ledger.

creditBalance field for positive amounts:
- `AVAILABLE_CASH_LEDGER_BALANCE`
- `AVAILABLE_CREDIT_LEDGER_BALANCE`
- `OUTSTANDING_BALANCE_PAYABLE_LEDGER_BALANCE`

debitBalance field for positive amounts:
- `CASH_LEDGER_BALANCE`
- `CREDIT_OUTSTANDING_LEDGER_BALANCE`
- `OUTSTANDING_BALANCE_RECEIVABLE_LEDGER_BALANCE`

For negative balances, the creditBalance and debitBalance fields for the respective ledger's `NormalBalance` will be reversed.

### `FinancialAccountBalanceSearchFilterInput`

Input for filtering `FinancialAccountBalanceSearchResults`.

### `FinancialAccountBalanceSearchResult`

The `FinancialAccount` balance search result object.

### `FinancialAccountBalanceSearchResultConnection`

The connection type for `FinancialAccountBalanceSearchResult`

### `FinancialAccountBalanceSearchResultEdge`

The edge type for `FinancialAccountBalanceSearchResult`

### `FinancialAccountBalanceSearchResultPayload`

The possible return types of `searchFinancialAccountBalances`.

### `FinancialAccountBillingCycleHistoryArgs`

A financial account allows you to move money into the Highnote platform and move funds to other accounts.

### `FinancialAccountBillingSummary`

The current billing summary, including information on remaining latest closed statement balance, minimum payment, and payment due date, for this `FinancialAccount`

### `FinancialAccountCheckPaymentsArgs`

A financial account allows you to move money into the Highnote platform and move funds to other accounts.

### `FinancialAccountConnection`

The connection type for FinancialAccount.

### `FinancialAccountCreditLimitUpdateFromProductFunding`

Credit limit update of a Financial Account within the Highnote platform.

### `FinancialAccountCreditLimitUpdateFromProductFundingLedgersArgs`

Credit limit update of a Financial Account within the Highnote platform.

### `FinancialAccountDelinquency`

Interface for a delinquency for a `FinancialAccount` associated with a credit product.

### `FinancialAccountDelinquencyCycle`

A billing cycle where a `FinancialAccount` is delinquent at some point.

### `FinancialAccountEdge`

The edge type for a FinancialAccount.

### `FinancialAccountExternalAchTransfersArgs`

A financial account allows you to move money into the Highnote platform and move funds to other accounts.

### `FinancialAccountExternallyInitiatedAchTransferArgs`

A financial account allows you to move money into the Highnote platform and move funds to other accounts.

### `FinancialAccountExternallyInitiatedAchTransfersArgs`

A financial account allows you to move money into the Highnote platform and move funds to other accounts.

### `FinancialAccountFeature`

### `FinancialAccountFeatureTypeFilterInput`

Input for filtering Financial Account feature

### `FinancialAccountFeeTransferEventsArgs`

A financial account allows you to move money into the Highnote platform and move funds to other accounts.

### `FinancialAccountFinancialAccountActivitiesArgs`

A financial account allows you to move money into the Highnote platform and move funds to other accounts.

### `FinancialAccountGlobalNotesArgs`

A financial account allows you to move money into the Highnote platform and move funds to other accounts.

### `FinancialAccountIncomingScheduledTransfersArgs`

A financial account allows you to move money into the Highnote platform and move funds to other accounts.

### `FinancialAccountInstallmentAgreementsArgs`

A financial account allows you to move money into the Highnote platform and move funds to other accounts.

### `FinancialAccountIntegratorAchTransfersArgs`

A financial account allows you to move money into the Highnote platform and move funds to other accounts.

### `FinancialAccountIntegratorInitiatedAchTransferArgs`

A financial account allows you to move money into the Highnote platform and move funds to other accounts.

### `FinancialAccountIntegratorInitiatedAchTransfersArgs`

A financial account allows you to move money into the Highnote platform and move funds to other accounts.

### `FinancialAccountInterFinancialAccountTransfersArgs`

A financial account allows you to move money into the Highnote platform and move funds to other accounts.

### `FinancialAccountLedgersArgs`

A financial account allows you to move money into the Highnote platform and move funds to other accounts.

### `FinancialAccountNonOriginatedAchTransfersArgs`

A financial account allows you to move money into the Highnote platform and move funds to other accounts.

### `FinancialAccountOriginatedAchTransfersArgs`

A financial account allows you to move money into the Highnote platform and move funds to other accounts.

### `FinancialAccountOwner`

The possible owners of a `FinancialAccount`

### `FinancialAccountPayload`

### `FinancialAccountPaymentCardsArgs`

A financial account allows you to move money into the Highnote platform and move funds to other accounts.

### `FinancialAccountPaymentCardsFilterInput`

Inputs for filtering Payment Card data.

### `FinancialAccountPaymentCardTransactionChargebacksArgs`

A financial account allows you to move money into the Highnote platform and move funds to other accounts.

### `FinancialAccountPaymentCardTransactionChargebacksFilterInput`

Input for filtering `PaymentCardTransactionChargeback` on `FinancialAccount`

### `FinancialAccountPaymentCardTransactionDisputesArgs`

A financial account allows you to move money into the Highnote platform and move funds to other accounts.

### `FinancialAccountPaymentCardTransactionDisputesFilterInput`

Input for filtering `PaymentCardTransactionDispute` on `FinancialAccount`

### `FinancialAccountPseudoBalanceUpdate`

The pseudo balance update applied to a financial account ID.

### `FinancialAccountPseudoBalanceUpdatePayload`

One of the possible return types for FinancialAccountPseudoBalanceUpdatePayload.

### `FinancialAccountPurchaseCreditPlan`

A `CreditPlan` for `PURCHASE` balances that is configured with an APR for this `FinancialAccount`.

### `FinancialAccountReviewWorkflowEventsArgs`

A financial account allows you to move money into the Highnote platform and move funds to other accounts.

### `FinancialAccountRevisionSnapshotsArgs`

A financial account allows you to move money into the Highnote platform and move funds to other accounts.

### `FinancialAccountRewardPointsTransfersArgs`

A financial account allows you to move money into the Highnote platform and move funds to other accounts.

### `FinancialAccountSnapshot`

The initial details of the `FinancialAccount` before the revision was applied.

### `FinancialAccountSnapshotConnection`

The connection type for `FinancialAccountSnapshot`.

### `FinancialAccountSnapshotEdge`

The edge type for a `FinancialAccountSnapshot`.

### `FinancialAccountStatement`

Interface for a Statement for a Financial Account.

### `FinancialAccountStatementBalanceType`

### `FinancialAccountStatementConnection`

The connection type for `FinancialAccountStatement`.

### `FinancialAccountStatementEdge`

The edge type for a `FinancialAccountStatementy`.

### `FinancialAccountStatementEntriesFilterInput`

Inputs for filtering Financial Account Statement Entry.

### `FinancialAccountStatementEntry`

FinancialAccountStatementEntry

### `FinancialAccountStatementEntryConnection`

The connection type for `FinancialAccountStatementEntry`.

### `FinancialAccountStatementEntryEdge`

The edge type for a `FinancialAccountStatementEntry`.

### `FinancialAccountStatementEvent`

### `FinancialAccountStatementFilterInput`

Inputs for filtering Financial Account Statement.

### `FinancialAccountStatementInstallmentCreditPlanActivity`

`FinancialAccount` activity for this statement related to `InstallmentAgreement`s.

### `FinancialAccountStatementPayOffPayment`

The FinanceAccountStatementPayOffPayment is the amount paid by the consumer. This can be minimum or time based details.

### `FinancialAccountStatementPayOffWarning`

Warning for consumer to let them know about how much time it takes for them to pay statement balance and how additional payment they do with minimum or 36 months pay.

### `FinancialAccountStatementPurchaseCreditPlan`

Financial Account Statement purchase credit Plan with details related to purchase interest charge and balance subject to interest.

### `FinancialAccountStatementReadyEvent`

The FinancialAccountStatementEvent notifies when a statement is ready.

### `FinancialAccountStatementsArgs`

A financial account allows you to move money into the Highnote platform and move funds to other accounts.

### `FinancialAccountStatementSnapshot`

Interface for a FinancialAccountStatementSnapshot.

### `FinancialAccountStatementStatementEntriesArgs`

Interface for a Statement for a Financial Account.

### `FinancialAccountSummaryFragment`

### `FinancialAccountTransactionEventsArgs`

A financial account allows you to move money into the Highnote platform and move funds to other accounts.

### `FinancialAccountUserDefinedFieldsArgs`

A financial account allows you to move money into the Highnote platform and move funds to other accounts.

### `FinancialAccountVelocityInterFinancialAccountTransferRuleBalancesArgs`

A financial account allows you to move money into the Highnote platform and move funds to other accounts.

### `FinancialEvent`

The financial event that the `LedgerEntry` results from.

### `FindAccountHolderQuery`

### `FindAccountHolderQueryVariables`

### `FindApplicationQuery`

### `FindApplicationQueryVariables`

### `FindAtmLocationsForPaymentCardQuery`

### `FindAtmLocationsForPaymentCardQueryVariables`

### `FindCardProductQuery`

### `FindCardProductQueryVariables`

### `FindDisputeQuery`

### `FindDisputeQueryVariables`

### `FindFinancialAccountActivitiesQuery`

### `FindFinancialAccountActivitiesQueryVariables`

### `FindFinancialAccountQuery`

### `FindFinancialAccountQueryVariables`

### `FindPaymentCardQuery`

### `FindPaymentCardQueryVariables`

### `FindReviewWorkflowEventsQuery`

### `FindReviewWorkflowEventsQueryVariables`

### `FinicityProduct`

A single product/api-endpoint that Highnote can use to retrieve users' financial data.

### `FixedFeeChargeValue`

Flat amount fee charge value.

### `FleetCardAccountFeature`

Whether or not the Financial Account supports a Fleet Card.

### `ForceCapturePaymentTransactionInput`

Input for force capturing a payment transaction.

### `ForceStandaloneCapturePaymentInput`

Input for `forceStandaloneCapturePayment`. Force-captures an arbitrary amount
with no prior authorization — clearing-only forced-post emission. Restricted
to allowlisted organizations. Visa and Mastercard only.

### `ForwardCommittmentBreakdown`

The percentage breakdown of forward comittments

### `FundsDepositCanceledEvent`

The `FundsDepositCanceledEvent` notifies when `IntegratorInitiatedFundsDepositACHTransfer`s are canceled.

### `FundsDepositFailedEvent`

The `FundsDepositFailedEvent` notifies when `IntegratorInitiatedFundsDepositACHTransfer`s have failed.

### `FundsDepositInitiatedEvent`

The `FundsDepositInitiatedEvent` notifies when `IntegratorInitiatedFundsDepositACHTransfer`s are initiated.

### `FundsDepositProcessedEvent`

The `FundsDepositProcessedEvent` notifies when `IntegratorInitiatedFundsDepositACHTransfer`s are processed.

### `FundsDepositProcessingEvent`

The `FundsDepositProcessingEvent` notifies when `IntegratorInitiatedFundsDepositACHTransfer`s are processing.

### `FundsDepositReturnedEvent`

The `FundsDepositReturnedEvent` notifies when `IntegratorInitiatedFundsDepositACHTransfer`s are returned.

### `FundsWithdrawalCanceledEvent`

The `FundsWithdrawalCanceledEvent` notifies when `IntegratorInitiatedFundsWithdrawalACHTransfer`s are canceled.

### `FundsWithdrawalFailedEvent`

The `FundsWithdrawalFailedEvent` notifies when `IntegratorInitiatedFundsWithdrawalACHTransfer`s have failed.

### `FundsWithdrawalInitiatedEvent`

The `FundsWithdrawalInitiatedEvent` notifies when `IntegratorInitiatedFundsWithdrawalACHTransfer`s are initiated.

### `FundsWithdrawalProcessedEvent`

The `FundsWithdrawalProcessedEvent` notifies when `IntegratorInitiatedFundsWithdrawalACHTransfer`s are processed.

### `FundsWithdrawalProcessingEvent`

The `FundsWithdrawalProcessingEvent` notifies when `IntegratorInitiatedFundsWithdrawalACHTransfer`s are processing.

### `FundsWithdrawalReturnedEvent`

The `FundsWithdrawalReturnedEvent` notifies when `IntegratorInitiatedFundsWithdrawalACHTransfer`s are returned.

### `GenerateAppleWebPushProvisioningTokenInput`

Input for generating an Apple Pay Web Push Provisioning token.

### `GenerateAppleWebPushProvisioningTokenPayload`

The possible return types from `generateAppleWebPushProvisioningToken`.

### `GenerateBusinessAccountHolderClientTokenInput`

Input for creating a Business Account Holder Client Token.

### `GenerateBusinessAccountHolderClientTokenPayload`

The possible return types of `generateBusinessAccountHolderClientToken`

### `GenerateCreateScheduledTransferClientTokenInput`

Input for creating a Scheduled Transfer Client Token.

### `GenerateCreateScheduledTransferClientTokenPayload`

The possible return types of `generateCreateScheduledTransferClientToken`

### `GenerateDirectDepositDetailClientTokenInput`

Input for creating a Direct Deposit Detail Client Token.

### `GenerateDirectDepositDetailClientTokenPayload`

The possible return types of `generateDirectDepositDetailClientToken`

### `GenerateDocumentUploadClientTokenInput`

Input for creating a Document Upload Client Token.

### `GenerateDocumentUploadClientTokenMutation`

### `GenerateDocumentUploadClientTokenMutationVariables`

### `GenerateDocumentUploadClientTokenPayload`

The possible return types of `generateDocumentUploadClientToken`

### `GenerateExternalBankAccountDetailClientTokenInput`

Input for creating a Direct Deposit Detail Client Token.

### `GenerateExternalBankAccountDetailClientTokenPayload`

The possible return types of `generateDirectDepositDetailClientToken`

### `GenerateFinancialAccountSingleUseClientTokenInput`

Details for creating a Single Use Client Token for a Financial Account

### `GenerateFinancialAccountSingleUseClientTokenPayload`

The possible return types of `generateFinancialAccountSingleUseClientToken`

### `GenerateInitiateSecureDepositClientTokenInput`

Input for creating a Secure Deposit Client Token.

### `GenerateInitiateSecureDepositClientTokenPayload`

The possible return types of `generateInitiateSecureDepositClientToken`

### `GeneratePaymentCardClientTokenInput`

Input for creating a Payment Card Client Token.

### `GeneratePaymentCardClientTokenMutation`

### `GeneratePaymentCardClientTokenMutationVariables`

### `GeneratePaymentCardClientTokenPayload`

The possible return types of `generatePaymentCardClientToken`

### `GeneratePaymentMethodTokenizationClientTokenInput`

Input to generate a client token for payment method tokenization

### `GeneratePaymentMethodTokenizationClientTokenMutation`

### `GeneratePaymentMethodTokenizationClientTokenMutationVariables`

### `GeneratePaymentMethodTokenizationClientTokenPayload`

The possible return types of `generatePaymentMethodTokenizationClientToken`

### `GeneratePersonAccountHolderClientTokenInput`

Input for creating a Person Account Holder Client Token.

### `GeneratePersonAccountHolderClientTokenPayload`

The possible return types of `generatePersonAccountHolderClientToken`

### `GeneratePersonAuthorizedUserClientTokenInput`

Input for creating a Person Authorized User Client Token.

### `GeneratePersonAuthorizedUserClientTokenPayload`

The possible return types of `generatePersonAuthorizedUserClientToken`

### `GenerateRiskApplicationSdkSessionTokenPayload`

The possible return types from `generateRiskApplicationSDKSessionToken`.

### `GenerateRiskClientTokenInput`

Details for creating a `ClientToken` for `generateRiskClientToken`

### `GenerateRiskClientTokenPayload`

The possible return types from `generateRiskClientToken`.

### `GenerateScheduledTransferClientTokenInput`

Input for a Scheduled Transfer Client Token.

### `GenerateSecureDepositClientTokenInput`

Input for creating a Secure Deposit Client Token.

### `GenerateSecureDepositClientTokenPayload`

The possible return types of `generateSecureDepositClientToken`

### `GenerateTokenizeAccountHolderClientTokenPayload`

The possible return types of `generateTokenizeAccountHolderClientToken`

### `GenerateTokenizeAuthorizedUserClientTokenPayload`

The possible return types of `generateTokenizeAuthorizedUserClientToken`

### `GenerateVerifiedExternalBankAccountExternalLinkToken`

The details of the link token from the third-party provider.

### `GenerateVerifiedExternalBankAccountLinkTokenInput`

Input for retrieving a link token.

### `GenerateVerifiedExternalBankAccountLinkTokenPayload`

### `GetWebhookNotificationTargetQuery`

### `GetWebhookNotificationTargetQueryVariables`

### `GlobalNote`

A `GlobalNote`

### `GlobalNoteAggregateEntity`

The potential types for a `GlobalNote` aggregate entity

### `GlobalNoteAggregateEntityInput`

The input details for a aggregate entity of a `GlobalNote`.

### `GlobalNoteConnection`

The connection object for a `GlobalNote`

### `GlobalNoteConnectionPayload`

### `GlobalNoteEdge`

The edge object for a `GlobalNote`

### `GlobalNotePayload`

The return types when creating a `GlobalNote`.

### `GlobalNotePrimaryEntity`

The potential types for a `GlobalNote` primary entity.

### `GlobalNotePrimaryEntityInput`

The input details for a primary entity of a `GlobalNote`.

### `GooglePayProvisioning`

### `HashedFilterInput`

Input for filtering by sensitive data using Hashing

### `IdentityTaskGroupReviewCategoryFilterInput`

Inputs for filtering by `IdentityTaskGroupReviewCategory`.

### `IdentityVerificationDocumentUploadSession`

A document upload session for identity verification documents.

### `IdFilterInput`

ID value type
Input for filtering objects using id (ID).

### `IncomeAccountFinancialAccountFeature`

Whether or not the Financial Account supports Product Income.

### `Incremental`

### `IncrementalAuthorizePaymentTransactionInput`

Input for incrementally authorizing an existing `PaymentTransaction`.

### `IncrementalAuthorizePaymentTransactionPayload`

Result of incrementally authorizing a `PaymentTransaction`.

### `InitiateAchTransferInput`

Input details when initiating an `OriginatedAchTransfer`.

### `InitiateAchTransferMutation`

### `InitiateAchTransferMutationVariables`

### `InitiateAchTransferPayload`

The return types when initiating an `OriginatedAchTransfer`.

### `InitiateAddWiredFundsPayload`

The return types when initiating add funds to a `FinancialAccount` via wire.

### `InitiateAddWiredFundsToFinancialAccountInput`

Input details when initiating an add wire transfer to `FinancialAccount`.

### `InitiateCustomerCardTransactionDisputeInput`

Input for `initiateCustomerCardTransactionDispute`.

### `InitiateCustomerCardTransactionDisputeMutation`

### `InitiateCustomerCardTransactionDisputeMutationVariables`

### `InitiateFinancialAccountCreditLimitUpdateFromProductFundingInput`

The details to update credit limit of an account holder Financial Account.

### `InitiateFinancialAccountCreditLimitUpdateFromProductFundingPayload`

The return types of credit limit update to an account holder financial account.

### `InitiateFinancialAccountPseudoBalanceUpdateInput`

The input to update a pseudo balance for a financial account.

### `InitiateFundPaymentCardFinancialAccountTransferInput`

The details to fund card to an account holder Financial Account.

### `InitiateFundPaymentCardFinancialAccountTransferPayload`

The return types when fund card to an account holder financial account.

### `InitiateFundsDepositAchTransferInput`

The details to deposit funds from an `ExternalFinancialAccount` to a `FinancialAccount` using ACH.

### `InitiateFundsDepositAchTransferPayload`

The return types when the integrator initiates a withdrawal of funds from
an `ExternalFinancialAccount` to a `FinancialAccount`.

### `InitiateFundsWithdrawalAchTransferInput`

The details to withdraw funds from a `FinancialAccount` to an `ExternalFinancialAccount` using ACH.

### `InitiateFundsWithdrawalAchTransferPayload`

The return types when the integrator initiates a withdrawal of funds from
a `FinancialAccount` to an `ExternalFinancialAccount`.

### `InitiateOrganizationReportInput`

The details needed in order to generate a report for
an `Organization`.

### `InitiateOrganizationReportPayload`

The return types when calling `initiateOrganizationReport`.

### `InitiatePayrollAdvanceInput`

The details to payroll advance to an employee Financial Account.

### `InitiatePayrollAdvancePayload`

The return types when payroll advance funds to an employee financial account.

WARNING: Transfer is deprecated. ElectronicFundsTransfer should be used instead.

### `InitiatePhysicalCheckPaymentInput`

The input object that defines the fields for the initiatePhysicalCheckPayment mutation.

### `InitiatePhysicalCheckPaymentPayload`

### `InitiateSecureDepositAchTransferInput`

The details for the integrator to initiate a secure deposit ACH transfer.

### `InitiateSecureDepositAchTransferPayload`

The return types when the integrator initiates an ACH transfer.

### `InitiateTransferBetweenFinancialAccountsInput`

The details to transfer money between financial accounts.

### `InitiateTransferBetweenFinancialAccountsMutation`

### `InitiateTransferBetweenFinancialAccountsMutationVariables`

### `InitiateTransferBetweenFinancialAccountsPayload`

The return types when transfer occurs between financial accounts.

### `InitiateTransferFromFundingFinancialAccountToPaymentCardFinancialAccountInput`

The details to transfer money from a funding financial account to a financial account backing a payment card.

### `InitiateTransferFromFundingFinancialAccountToPaymentCardFinancialAccountPayload`

The return types when financial account is used to fund a financial account backing a payment card.

### `InitiateTransferFromPaymentCardFinancialAccountToFundingFinancialAccountInput`

The details to transfer money from a financial account backing a payment card to a funding financial account.

### `InitiateTransferFromPaymentCardFinancialAccountToFundingFinancialAccountPayload`

The return types when financial account backing a payment card is used to fund a funding financial account.

### `InitiateUnifiedFundsTransferInput`

Input for `initiateUnifiedFundsTransfer`.

### `InitiateUnifiedFundsTransferPayload`

The possible results of `initiateUnifiedFundsTransfer`

### `InitiateUnloadWiredFundsFromFinancialAccountInput`

Input details when initiating an unload wire transfer from a `FinancialAccount`.

### `InitiateUnloadWiredFundsPayload`

The return types when initiating unloading funds from a `FinancialAccount` via wire.

### `InitiateUsBusinessAuthorizedPersonRequestedIdentityUpdateInput`

The input for initiating an `USBusinessAuthorizedPersonRequestedIdentityUpdate`.

### `InitiateUsBusinessAuthorizedPersonRequestedIdentityUpdatePayload`

The response type when applying an update for a `USBusinessAuthorizedPersonRequestedIdentityUpdate`

### `InitiateUsBusinessProfileRequestedIdentityUpdateInput`

The input for initiating an `USBusinessProfileRequestedIdentityUpdate`.

### `InitiateUsBusinessProfileRequestedIdentityUpdatePayload`

The response type when initiating an update for a `USBusinessProfileRequestedIdentityUpdate`

### `InitiateUsBusinessUltimateBeneficialOwnerRequestedIdentityUpdateInput`

The input for initiating an `USBusinessUltimateBeneficialOwnerRequestedIdentityUpdate`.

### `InitiateUsBusinessUltimateBeneficialOwnerRequestedIdentityUpdatePayload`

The response type when applying an update for a `USBusinessUltimateBeneficialOwnerRequestedIdentityUpdate`

### `InitiateUsPersonAccountHolderRequestedIdentityUpdateInput`

The input for initiating an `USPersonAccountHolderRequestedIdentityUpdate`.

### `InitiateUsPersonAccountHolderRequestedIdentityUpdatePayload`

The response type when applying an update for a `USPersonAccountHolderRequestedIdentityUpdate`

### `InputMaybe`

### `InstallmentAgreement`

An arrangement to convert a `Transaction` into installments.

### `InstallmentAgreementCompletedRollup`

A summary of completed `InstallmentAgreement` activity.

### `InstallmentAgreementConnection`

The connection type for a `InstallmentAgreement`.

### `InstallmentAgreementEdge`

The edge type for a `InstallmentAgreement`.

### `InstallmentAgreementFilterInput`

The input type for filtering `InstallmentAgreement`.

### `InstallmentAgreementRemainingRollup`

A summary of remaining `InstallmentAgreement` activity.

### `InstallmentAgreementSnapshot`

The progress to date and remaining obligations for this `InstallmentAgreement`.

### `InstallmentAgreementStatusHistory`

`InstallmentAgreement` status history.

### `InstallmentEligibilityForTransactionEvent`

The installment eligibility status of a `TransactionEvent`.

### `InstallmentEligibilityForTransactionEvents`

The installment eligibility status of the provided `TransactionEvent`s.

### `InstallmentEligibilityForTransactionEventsInput`

The input type for viewing `InstallmentEligibilityForTransactionEvents`.

### `InstallmentEligibilityForTransactionEventsPayload`

Types which can be returned when querying `InstallmentEligibilityForTransactionEvents`.

### `InstallmentNetworkData`

Network-specific installment payment data.

### `InstallmentNetworkDataInput`

Network-specific installment payment input data.

### `InstallmentOffer`

An offer to convert a transaction into installments.

### `InstallmentOfferDetails`

Details about the `Amount` due for installment offer.

### `InstallmentOffersForTransactionEvent`

The available `InstallmentOffer`s for a given `TransactionEvent`.

### `InstallmentOffersForTransactionEventInput`

The input type for viewing `InstallmentOffersForTransactionEvent`.

### `InstallmentOffersForTransactionEventPayload`

Types which can be returned when querying `InstallmentOffersForTransaction`.

### `InstantNetworkTransfer`

Allows for transferring money between a `FinancialAccount` and a `PaymentMethodToken`.

### `InstantNetworkTransferDestination`

The destination of the funds being transferred.

### `InstantNetworkTransferDestinationNode`

The possible destinations of the `InstantNetworkTransfer`.

### `InstantNetworkTransferDestinationPaymentInstrumentCapability`

Indicates that this `PaymentInstrument` can be used as the destination ID for `InstantNetworkTransfer`.

### `InstantNetworkTransferDetail`

Detail about the transfer.

### `InstantNetworkTransferEvent`

An event associated with a `InstantNetworkTransfer`.

### `InstantNetworkTransferSource`

The source of the funds to transfer.

### `InstantNetworkTransferSourceNode`

The possible sources of the `InstantNetworkTransfer`.

### `InstantNetworkTransferSourcePaymentInstrumentCapability`

Indicates that this `PaymentInstrument` can be used as the source ID for `InstantNetworkTransfer`.

### `InstantSettlementTransaction`

### `InstantSettlementTransactionEvent`

### `IntegratorInitiatedAchHoldStatusFilterInput`

Input for filtering by `IntegratorInitiatedACHHoldStatusFilterInput`.

### `IntegratorInitiatedAchStatusDetails`

Details about the status of the ACH transfer.

### `IntegratorInitiatedAchStatusFilterInput`

Input for filtering by `IntegratorInitiatedACHStatusFilterInput`.

### `IntegratorInitiatedAchStatusReasonCodeFilterInput`

Input for filtering by `IntegratorInitiatedACHStatusReasonCodeFilterInput`.

### `IntegratorInitiatedAchTransfer`

An ACH transfer initiated by Highnote and sent to an external bank.

[ACH](https://en.wikipedia.org/wiki/Automated_clearing_house) is a method of transferring funds between banks.

### `IntegratorInitiatedAchTransferConnection`

The connection type for Integrator Initiated ACH Transfers.

### `IntegratorInitiatedAchTransferEdge`

The edge type for an Integrator Initiated ACH Transfer.

### `IntegratorInitiatedAchTransferEdgeNode`

### `IntegratorInitiatedAchTransferFilterInput`

Inputs for filtering Integrator Initiated ACH Transfer data.

### `IntegratorInitiatedAchTransferLedgersArgs`

An ACH transfer initiated by Highnote and sent to an external bank.

[ACH](https://en.wikipedia.org/wiki/Automated_clearing_house) is a method of transferring funds between banks.

### `IntegratorInitiatedFundsDepositAchTransfer`

A withdrawal of funds from an `ExternalFinancialAccount` to a `FinancialAccount`.

### `IntegratorInitiatedFundsDepositAchTransferEvent`

A financial event that represents ACH funds deposit.

### `IntegratorInitiatedFundsDepositAchTransferLedgersArgs`

A withdrawal of funds from an `ExternalFinancialAccount` to a `FinancialAccount`.

### `IntegratorInitiatedFundsWithdrawalAchTransfer`

A withdrawal of funds from a `FinancialAccount` to an `ExternalFinancialAccount`.

### `IntegratorInitiatedFundsWithdrawalAchTransferEvent`

A financial event that represents ACH funds withdrawal.

### `IntegratorInitiatedFundsWithdrawalAchTransferLedgersArgs`

A withdrawal of funds from a `FinancialAccount` to an `ExternalFinancialAccount`.

### `IntegratorInitiatedTransferTypeFilterInput`

Input for filtering by `IntegratorInitiatedTransferType`.

### `InterchangeFeePaymentTransactionFee`

A fee associated with interchange a `PaymentTransaction`.

### `InterestDetails`

Details about the interest that will be charged, such as the annual percentage rate (APR).

### `InterestRateIndexConfiguration`

The current configuration of the index used for variable APRs.

### `InterestRateRange`

A range type for interest rates (APRs), including a minimum and maximum value.

### `InterFinancialAccountTransfer`

A movement of money within the Highnote platform.

### `InterFinancialAccountTransferActivityTypeFilterInput`

Inputs for filtering the purpose of InterFinancialAccountTransfer.

### `InterFinancialAccountTransferConnection`

The connection type for InterFinancialAccountTransfers.

### `InterFinancialAccountTransferEdge`

The edge type for a InterFinancialAccountTransfer.

### `InterFinancialAccountTransferFilterInput`

Inputs for filtering by InterFinancialAccountTransfer.

### `InterFinancialAccountTransferLedgersArgs`

A movement of money within the Highnote platform.

### `InterFinancialAccountTransferRule`

A rule applicable to Inter Financial Account Transfers.

### `InterFinancialAccountTransferRuleConnection`

The connection type for `InterFinancialAccountTransferRule`.

### `InterFinancialAccountTransferRuleConnectionPayload`

The return types for finding inter financial account transfer rules.

### `InterFinancialAccountTransferRuleEdge`

The edge type for a `InterFinancialAccountTransferRule`.

### `InterFinancialAccountTransferRuleResult`

The result of a `InterFinancialAccountTransferRule` execution in the risk layer.

### `InterFinancialAccountTransferRuleRevisionsArgs`

A rule applicable to Inter Financial Account Transfers.

### `InterFinancialAccountTransferStatusFilterInput`

Inputs for filtering InterFinancialAccountTransfer data.

### `InternalTransferEvent`

### `InternalTransferFromFundingFinancialAccountToPaymentCardFinancialAccountCompletedEvent`

The InternalTransferFromFundingFinancialAccountToPaymentCardFinancialAccountPendingEvent is triggered when money movement from a Funding Financial Account to a Payment Financial Account has completed.

### `InternalTransferFromFundingFinancialAccountToPaymentCardFinancialAccountFailedEvent`

The InternalTransferFromFundingFinancialAccountToPaymentCardFinancialAccountPendingEvent is triggered when money movement from a Funding Financial Account to a Payment Financial Account has failed.

### `InternalTransferFromFundingFinancialAccountToPaymentCardFinancialAccountPendingEvent`

The InternalTransferFromFundingFinancialAccountToPaymentCardFinancialAccountPendingEvent is triggered when money movement from a Funding Financial Account to a Payment Financial Account is pending.

### `InternalTransferFromPaymentCardFinancialAccountToFundingFinancialAccountCompletedEvent`

The InternalTransferFromPaymentCardFinancialAccountToFundingFinancialAccountCompletedEvent is triggered when money movement from a Payment Financial Account to a Funding Financial Account has completed.

### `InternalTransferFromPaymentCardFinancialAccountToFundingFinancialAccountFailedEvent`

The InternalTransferFromPaymentCardFinancialAccountToFundingFinancialAccountFailedEvent is triggered when money movement from a Payment Financial Account to a Funding Financial Account has failed.

### `InternalTransferFromPaymentCardFinancialAccountToFundingFinancialAccountPendingEvent`

The InternalTransferFromPaymentCardFinancialAccountToFundingFinancialAccountPendingEvent is triggered when money movement from a Payment Financial Account to a Funding Financial Account is pending.

### `InviteUserInput`

Data needed to invite a new User.

### `InviteUserPayload`

The possible return types of `inviteUser`.

### `IpAddress`

IP address details.

### `IpAddressInput`

Input fields for IP address details.

### `Iso`

A `Business` operating as an `Iso`, brokering
merchant onboarding to Payment Facilitators.

### `IsoPayfacPartnershipsArgs`

A `Business` operating as an `Iso`, brokering
merchant onboarding to Payment Facilitators.

### `IssueEmployerFinancialAccountForCardProductInput`

Details for issuing an Employer Financial Account against a Card Product.

### `IssueEmployerFinancialAccountForCardProductPayload`

The return types when creating a new Financial Account against an Application.

### `IssueFinancialAccountForApplicationInput`

Details for issuing a Financial Account against an Application.

### `IssueFinancialAccountForApplicationMutation`

### `IssueFinancialAccountForApplicationMutationVariables`

### `IssueFinancialAccountForApplicationPayload`

The return types when creating a new Financial Account against an Application.

### `IssueFinancialAccountForApplicationWithOnDemandFundingSourceInput`

Details for issuing a Financial Account against an on-demand funding source.

### `IssueFinancialAccountForApplicationWithOnDemandFundingSourcePayload`

The return types when creating a new Financial Account with an on-demand funding source.

### `IssueFundingFinancialAccountForApplicationInput`

Details for issuing a Funding Financial Account against an Application.

### `IssueFundingFinancialAccountForApplicationPayload`

The return types when creating a new Funding Financial Account against an Application.

### `IssuePaymentCardForApplicationInput`

Details for issuing a Payment Card against an Application.

### `IssuePaymentCardForApplicationPayload`

The return types when creating a new Payment Card against an Application.

### `IssuePaymentCardForApplicationWithOnDemandFundingSourceInput`

Details for issuing a `PaymentCard` against an on-demand funding source.

### `IssuePaymentCardForApplicationWithOnDemandFundingSourceMutation`

### `IssuePaymentCardForApplicationWithOnDemandFundingSourceMutationVariables`

### `IssuePaymentCardForApplicationWithOnDemandFundingSourcePayload`

The return types when creating a new `PaymentCard` with an on-demand funding source.

### `IssuePaymentCardForAuthorizedUserApplicationInput`

Details for issuing a Payment Card against an Authorized User Application.

### `IssuePaymentCardForFinancialAccountInput`

Details for issuing a Payment Card against Financial Account.

### `IssuePaymentCardForFinancialAccountMutation`

### `IssuePaymentCardForFinancialAccountMutationVariables`

### `IssuePaymentCardForFinancialAccountPayload`

The return types when creating a new Payment Card against a Financial Account.

### `IssuePaymentCardForFinancialAccountResponse`

Represents a payment card creation request.

### `IssuePaymentCardOptionsDetail`

Representation of `IssuePaymentCardOptionsInput`.

`IssuePaymentCardOptionsDetail` is used to safely return the values provided in `IssuePaymentCardOptionsInput`

### `IssuePaymentCardOptionsInput`

Options for the newly issued Payment Card.

### `IssuePreprintedPaymentCardFinancialAccountForApplicationInput`

Input values for `IssuePreprintedPaymentCardFinancialAccountForApplication`

### `IssuePreprintedPaymentCardFinancialAccountForApplicationPayload`

The return types for `issuePreprintedPaymentCardFinancialAccountForApplication`

### `IssuerPreliminaryAuthorizationEvent`

An `IssuerPreliminaryAuthorizationEvent` for a transaction. This event is created before subscriber's collaborative authorization endpoint is called. `AuthorizationEvent` is created after the subscribers response to collaborative request.

### `IssuerPreliminaryAuthorizationEventSpendRuleResultsArgs`

An `IssuerPreliminaryAuthorizationEvent` for a transaction. This event is created before subscriber's collaborative authorization endpoint is called. `AuthorizationEvent` is created after the subscribers response to collaborative request.

### `JournalEntry`

A Journal Entry, showing the debit and credit ledger entries of a financial event. Every Journal Entry will have
a `LedgerEntry` that is crediting a Ledger and a corresponding `LedgerEntry` that is debiting from a Ledger.

### `JustInTimeFundingFinancialAccountFeature`

Whether or not the Financial Account supports Just-in-time Funding.

### `Ledger`

A ledger represents a record in an account used to collect related activity.
For example, an `Organization` will have a `CASH` ledger which tracks every transaction related to `CASH`.

### `LedgerEntriesFilterInput`

Inputs for  filtering ledger entries.

### `LedgerEntry`

### `LedgerEntryConnection`

The connection type for `LedgerEntry`.

### `LedgerEntryEdge`

Edge for `LedgerEntry`.

### `LedgerLedgerEntriesArgs`

A ledger represents a record in an account used to collect related activity.
For example, an `Organization` will have a `CASH` ledger which tracks every transaction related to `CASH`.

### `LedgerNameFilterInput`

Inputs for  filtering ledger entries.

### `LedgerReportParametersInput`

ledger report parameters.
these are additional, optional, parameters applicable only to ledger report.

### `LinkVerifiedExternalBankAccountFailedEvent`

Event generated when an external bank account linking is failed.

### `LinkVerifiedExternalBankAccountFailureReason`

A reason for the external bank account linking failure.

### `LinkVerifiedExternalBankInput`

Input for linking an account holder with a verified external bank account

### `ListAccountHolderFinancialAccountsQuery`

### `ListAccountHolderFinancialAccountsQueryVariables`

### `ListBusinessAccountHoldersQuery`

### `ListBusinessAccountHoldersQueryVariables`

### `ListCardProductsQuery`

### `ListCardProductsQueryVariables`

### `ListCollaborativeAuthorizationEndpointsQuery`

### `ListCollaborativeAuthorizationEndpointsQueryVariables`

### `ListPaymentTransactionsQuery`

### `ListPaymentTransactionsQueryVariables`

### `ListPersonAccountHoldersQuery`

### `ListPersonAccountHoldersQueryVariables`

### `ListWebhookNotificationTargetEventsQuery`

### `ListWebhookNotificationTargetEventsQueryVariables`

### `ListWebhookNotificationTargetsQuery`

### `ListWebhookNotificationTargetsQueryVariables`

### `MakeEmpty`

### `MakeMaybe`

### `MakeOptional`

### `ManualAdjustmentDetail`

### `ManualAdjustmentEvent`

A `ManualAdjustmentEvent` for an event that triggers the ledger

### `ManualDocumentRequestUploadSession`

A document upload session that has been requested.

### `ManualTransferAmount`

A manually set amount to be transferred

### `MastercardAdditionalFuelLocationDetails`

Details about the fuel location used in a fleet transaction.

### `MastercardData`

Mastercard specific transaction data.

### `MastercardFleetAuthorizationData`

Details pertaining to a Mastercard Fleet transaction available at Authorization and Authorization Advice time

### `MastercardFleetAuthorizationDataFuelProduct`

Details of a Mastercard Fleet fuel product available at Authorization and Authorization Advice time

### `MastercardFleetAuthorizationDataNonFuelProduct`

Details of a Mastercard Fleet non-fuel product available at Authorization and Authorization Advice time

### `MastercardFleetEnhancedData`

Details of Mastercard Fleet enhanced transaction data. These are relevant additional transaction data items pertaining to a fleet transaction.

### `MastercardFleetEnhancedDataLineItem`

An single line item within a `MastercardFleetEnhancedData`

### `MastercardFleetPrompt`

Details of a Mastercard Fleet Prompt. Contains a prompt code and cardholder-entered value

### `MastercardFraudScoreSpendRule`

A Spend Control rule that blocks transactions if the Mastercard Fraud Score is above a configured threshold.

### `MastercardFraudScoreSpendRuleResult`

The result of applying a `MastercardFraudScoreSpendRule` to an event.

### `MastercardFraudScoreSpendRuleRevisionsArgs`

A Spend Control rule that blocks transactions if the Mastercard Fraud Score is above a configured threshold.

### `MastercardInstallmentData`

Mastercard-specific installment payment data.

### `MastercardInstallmentDataInput`

Mastercard-specific installment payment input data.

### `MaximumAmountVarianceOnCreditLimitSpendRule`

A Spend Control rule that allows transactions up to a specified `Amount` over the credit limit.

### `MaximumAmountVarianceOnCreditLimitSpendRuleResult`

The result of applying a `MaximumAmountVarianceOnCreditLimitSpendRule` to an event.

### `MaximumAmountVarianceOnCreditLimitSpendRuleRevisionsArgs`

A Spend Control rule that allows transactions up to a specified `Amount` over the credit limit.

### `MaximumAmountVarianceOnPseudoBalanceSpendRule`

A Spend Control rule that allows for spending up to a specified `Amount` above the account's original balance'.

### `MaximumAmountVarianceOnPseudoBalanceSpendRuleResult`

The result of applying a `MaximumAmountVarianceOnPseudoBalanceSpendRule` to an event.

### `MaximumAmountVarianceOnPseudoBalanceSpendRuleRevisionsArgs`

A Spend Control rule that allows for spending up to a specified `Amount` above the account's original balance'.

### `MaximumPercentVarianceOnCreditLimitSpendRule`

A Spend Control rule that allows transactions up to a specified percentage over the credit limit.

### `MaximumPercentVarianceOnCreditLimitSpendRuleResult`

The result of applying a `MaximumPercentVarianceOnCreditLimitSpendRule` to an event.

### `MaximumPercentVarianceOnCreditLimitSpendRuleRevisionsArgs`

A Spend Control rule that allows transactions up to a specified percentage over the credit limit.

### `MaximumPercentVarianceOnPseudoBalanceSpendRule`

A Spend Control rule that allows for spending up to a specified percentage over the account's original balance.

### `MaximumPercentVarianceOnPseudoBalanceSpendRuleResult`

The result of applying a `MaximumPercentVarianceOnPseudoBalanceSpendRule` to an event.

### `MaximumPercentVarianceOnPseudoBalanceSpendRuleRevisionsArgs`

A Spend Control rule that allows for spending up to a specified percentage over the account's original balance.

### `Maybe`

### `Merchant`

A `Business` enrolled as an acquiring merchant, either directly or as a
submerchant of a `Payfac`.

### `MerchantAcceptor`

A merchant acceptor — Identifies how transactions for a merchant are routed and reported
across processors and card networks.

### `MerchantAcceptorDetails`

Descriptive details about the merchant accepting payments through a
`MerchantAcceptor`. These values describe the merchant as it appears to
cardholders and to card networks.

### `MerchantAcceptorProcessorConfiguration`

A single processor routing row for a `MerchantAcceptor`. Defines how
transactions of a given network, card brand, and transaction type are
processed and where they settle.

### `MerchantCategoryCodeSankeyDataPointsFilterInput`

Input filter for querying data points for a Sankey diagram representing flows between account holders and merchant categories.

### `MerchantCategoryCodeSankeyDataPointsPayload`

Union type for the Sankey data points query response, which can include data points, user errors, or access denial messages.

### `MerchantCategoryDetails`

A representation of the merchant category that includes the category, the code and a display name.

### `MerchantCategoryDetailsContainer`

A container for a list of merchant category details.

### `MerchantCategoryFilterInput`

Input for filtering merchant category

### `MerchantCategorySpendRule`

A Spend Control rule that allows or blocks certain merchant categories codes (MCC) during authorizations.

### `MerchantCategorySpendRuleResult`

The result of applying a merchant category spend rule to an event.

### `MerchantCategorySpendRuleRevisionsArgs`

A Spend Control rule that allows or blocks certain merchant categories codes (MCC) during authorizations.

### `MerchantConnection`

The connection type for `Merchant`.

### `MerchantCountrySpendRule`

A Spend Control rule that allows or blocks certain merchant countries during authorizations.

### `MerchantCountrySpendRuleResult`

The result of applying a merchant country spend rule to an event.

### `MerchantCountrySpendRuleRevisionsArgs`

A Spend Control rule that allows or blocks certain merchant countries during authorizations.

### `MerchantDescriptorInput`

Used to represent merchant descriptor data.

### `MerchantDetails`

The details about the merchant who requested the authorization.

### `MerchantDetailsAddressInput`

Input representing the parts of an address for a `MerchantDetails` input.

### `MerchantDetailsFilterInput`

Inputs for filtering merchant details.

### `MerchantDetailsInput`

Details to set about a Merchant submitting the authorization.

You can use these details to test merchant specific spend rules.

### `MerchantDrilldownSankeyDataPointsFilterInput`

Input filter for querying detailed Sankey diagram data points, including flows between account holders, merchant categories, and merchants.

### `MerchantDrilldownSankeyDataPointsPayload`

Union type for the detailed Sankey data points query response, which can include data points, user errors, or access denial messages.

### `MerchantEdge`

The edge type for `Merchant`.

### `MerchantFeePaymentTransactionFee`

A fee associated for the merchant to process the `PaymentTransaction`.

### `MerchantIdentifierSpendRule`

A Spend Control rule that allows or blocks authorizations based on merchant identifier.

A merchant identifier is typically a numeric string representing the merchant in an acquirer's or network's system.

### `MerchantIdentifierSpendRuleResult`

The result of applying a merchant identifier spend rule to an event.

### `MerchantIdentifierSpendRuleRevisionsArgs`

A Spend Control rule that allows or blocks authorizations based on merchant identifier.

A merchant identifier is typically a numeric string representing the merchant in an acquirer's or network's system.

### `MerchantManagedInstallmentPayment`

Information about a merchant-managed installment payment plan.

### `MerchantManagedInstallmentPaymentInput`

Information about a merchant-managed installment payment plan.

### `MerchantPayfacRelationship`

A relationship between a `Merchant` and a `Payfac`, optionally brokered by
an `Iso`.

### `MerchantPayfacRelationshipConnection`

The connection type for `MerchantPayfacRelationship`.

### `MerchantPayfacRelationshipEdge`

The edge type for `MerchantPayfacRelationship`.

### `MerchantPayfacRelationshipsArgs`

A `Business` enrolled as an acquiring merchant, either directly or as a
submerchant of a `Payfac`.

### `MerchantProductApplicationsArgs`

A `Business` enrolled as an acquiring merchant, either directly or as a
submerchant of a `Payfac`.

### `MerchantSettlementFinancialAccountFeature`

Whether or not the `FinancialAccount` supports merchant settlement.

### `MilitaryLendingActConfiguration`

The Military Lending Act (MLA) configuration.

### `MinimalUsAuthorizedPersonInput`

The input for creating a minimal `USAuthorizedPerson`

### `MinimalUsBusinessProfileInput`

Input fields for creating a `USBusinessProfile` with minimum required details.

### `MinimalUsUltimateBeneficialOwnerInput`

Input fields for creating a `USUltimateBeneficialOwner` with minimal information.

### `MinimumAmountLimitSpendRule`

A Spend Control rule that only allows transactions for a specified amount.

### `MinimumAmountLimitSpendRuleResult`

The result of applying a `MinimumAmountLimitSpendRule` to an event.

### `MinimumAmountLimitSpendRuleRevisionsArgs`

A Spend Control rule that only allows transactions for a specified amount.

### `MoneyFilterInput`

Money value type

### `MoneyFilterInputRange`

Money value range (inclusive)

### `MoneyMovementProductFeature`

### `Mutation`

Root Mutation type extending the main GraphQL schema.

### `MutationAcceptAccountHolderCardProductApplicationOfferArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationActivateCardProductCreditPlanArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationActivateCollaborativeAuthorizationEndpointArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationActivateInstallmentAgreementForTransactionEventArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationActivateNotificationTargetArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationActivatePaymentCardArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationAddCollaborativeAuthorizationEndpointArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationAddExternalBankAccountFromTokenArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationAddExternalBankAccountVerifiedThroughFinicityArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationAddExternalBankAccountVerifiedThroughPlaidArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationAddExternalBankAccountVerifiedThroughPlaidUsingThirdPartyProcessorTokenArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationAddFundsToPaymentCardArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationAddNonVerifiedExternalUsFinancialBankAccountArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationAddPaymentCardToApplePayByDevicePushProvisioningArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationAddPaymentCardToGooglePayByDevicePushProvisioningArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationAddPricingConfigurationArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationAddSubscriptionsToNotificationTargetArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationAddUserDefinedFieldDefinitionRelationshipArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationAddWebhookNotificationTargetArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationApproveCreditLimitDecreaseArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationApproveCreditLimitIncreaseArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationApproveCreditProductApplicationUnderwritingArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationAssignPaymentCardToFinancialAccountArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationAttachCardProductVelocityRuleArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationAttachFeeToCreditPlanArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationAttachPaymentCardVelocityRuleArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationAttachRealtimeRiskRuleToCardProductArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationAttachRealtimeRiskRuleToFinancialAccountArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationAttachRealtimeRiskRuleToPaymentCardArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationAttachRewardEarnRuleToProductArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationAttachRewardRedemptionConfigurationToProductArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationAttachSpendRuleToCardProductArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationAttachSpendRuleToFinancialAccountArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationAttachSpendRuleToPaymentCardArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationAttachVelocityRuleToFinancialAccountArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationAuthorizeNetworkTokenArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationAuthorizePaymentCardArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationAuthorizePaymentMethodTokenArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationCancelPaymentTransactionArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationCancelPhysicalCardGroupOrderArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationCancelPhysicalPaymentCardOrderArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationCancelRequestedIdentityUpdateArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationCancelScheduledTransferArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationCapturePaymentTransactionArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationChargeNetworkTokenArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationChargePaymentCardArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationChargePaymentMethodTokenArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationChargePaymentOrderArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationChargePaymentOrderFromPaymentMethodTokenArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationCloseExternalFinancialBankAccountArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationClosePaymentCardArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationCompletePhysicalCardGroupOrderArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationConfirmCreditReportUnfrozenArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationConfirmPayrollDepositArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationConfirmRequestedIdentityUpdateArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationConfirmVerificationOfCreditProductApplicationForFraudAlertArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationCreateAccountHolderCardProductApplicationArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationCreateAccountSpendRuleArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationCreateAccountTransactionCountSpendRuleArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationCreateAmountLimitSpendRuleArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationCreateAuthorizedUserCardProductApplicationArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationCreateCardDataInputCapabilitySpendRuleArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationCreateCardProductArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationCreateCardProductCreditPlanArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationCreateCardProductInstallmentCreditPlanArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationCreateCardProductWithTemplateArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationCreateCardTransactionProcessingTypeConditionSpendRuleArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationCreateChargeCreditCardProductConfigurationArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationCreateCheckPaymentDocumentUploadSessionArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationCreateConditionalRuleSetSpendRuleArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationCreateCountLimitSpendRuleArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationCreateCreditLimitChangeRequestArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationCreateCreditLimitPercentageSpendRuleArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationCreateCvvSpendRuleArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationCreateDaysWithinAccountCreateDateSpendRuleArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationCreateDaysWithinCardCreateDateSpendRuleArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationCreateDepositAmountLimitSpendRuleArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationCreateDepositCountLimitSpendRuleArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationCreateDepositProcessingNetworkSpendRuleArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationCreateDocumentUploadLinkArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationCreateGlobalNoteArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationCreateMastercardFraudScoreSpendRuleArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationCreateMaximumAmountVarianceOnCreditLimitSpendRuleArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationCreateMaximumAmountVarianceOnPseudoBalanceSpendRuleArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationCreateMaximumPercentVarianceOnCreditLimitSpendRuleArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationCreateMaximumPercentVarianceOnPseudoBalanceSpendRuleArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationCreateMerchantCategorySpendRuleArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationCreateMerchantCountrySpendRuleArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationCreateMerchantIdentifierSpendRuleArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationCreateMinimalUsBusinessAccountHolderArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationCreateMinimumAmountLimitSpendRuleArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationCreateOneTimeAchTransferArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationCreatePanEntryModeSpendRuleArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationCreatePaymentOrderArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationCreatePhysicalCardGroupOrderArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationCreatePhysicalCardGroupOrderWithValidatedAddressArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationCreatePhysicalCardGroupOrderWithValidatedAddressTokenArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationCreatePointOfServiceCategorySpendRuleArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationCreatePostalCodeVerificationSpendRuleArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationCreatePricingPlanArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationCreateRecurringAchTransferArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationCreateReusablePaymentMethodTokenArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationCreateRevolvingCreditCardProductConfigurationArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationCreateRewardDefaultEarnRuleArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationCreateRewardMerchantCategoryEarnRuleArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationCreateRewardPointsAdjustmentArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationCreateRewardRedemptionConfigurationArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationCreateSecretApiKeyArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationCreateStreetAddressSpendRuleArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationCreateUnifiedFundsTransferQuoteArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationCreateUsBusinessAccountHolderArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationCreateUsBusinessAccountHolderFromTokenArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationCreateUserDefinedFieldArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationCreateUserDefinedFieldDefinitionArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationCreateUsPersonAccountHolderArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationCreateUsPersonAccountHolderFromTokenArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationCreateUsPersonAuthorizedUserArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationCreateUsPersonAuthorizedUserFromTokenArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationCreateVelocityRuleArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationCreateVisaRiskScoreSpendRuleArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationDeactivateCollaborativeAuthorizationEndpointArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationDeactivateNotificationTargetArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationDeleteCustomFieldsArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationDeleteSpendRuleArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationDeleteVelocityRuleArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationDenyCreditLimitDecreaseArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationDenyCreditLimitIncreaseArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationDenyCreditProductApplicationUnderwritingArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationDetachCardProductVelocityRuleArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationDetachPaymentCardVelocityRuleArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationDetachRealtimeRiskRuleFromCardProductArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationDetachRealtimeRiskRuleFromFinancialAccountArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationDetachRealtimeRiskRuleFromPaymentCardArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationDetachSpendRuleFromCardProductArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationDetachSpendRuleFromFinancialAccountArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationDetachSpendRuleFromPaymentCardArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationDetachVelocityRuleFromFinancialAccountArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationDisableAuthorizedUserFeatureArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationEnableAuthorizedUserFeatureArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationEnableCollaborativeApplicationUnderwritingFeatureArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationEnableCollaborativeAuthorizationFeatureArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationEnableCreditCardFeatureArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationEnableOnDemandFundingFeatureArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationEndDocumentUploadSessionArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationForceCapturePaymentTransactionArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationForceStandaloneCapturePaymentArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationGenerateAppleWebPushProvisioningTokenArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationGenerateBusinessAccountHolderClientTokenArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationGenerateCreateScheduledTransferClientTokenArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationGenerateDirectDepositDetailClientTokenArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationGenerateDocumentUploadClientTokenArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationGenerateExternalBankAccountDetailClientTokenArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationGenerateFinancialAccountSingleUseClientTokenArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationGenerateInitiateSecureDepositClientTokenArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationGeneratePaymentCardClientTokenArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationGeneratePaymentMethodTokenizationClientTokenArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationGeneratePersonAccountHolderClientTokenArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationGeneratePersonAuthorizedUserClientTokenArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationGenerateRiskClientTokenArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationGenerateScheduledTransferClientTokenArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationGenerateSecureDepositClientTokenArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationGenerateVerifiedExternalBankAccountLinkTokenArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationIncrementalAuthorizePaymentTransactionArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationInitiateAchTransferArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationInitiateAddWiredFundsToFinancialAccountArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationInitiateCustomerCardTransactionDisputeArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationInitiateFinancialAccountCreditLimitUpdateFromProductFundingArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationInitiateFinancialAccountPseudoBalanceUpdateArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationInitiateFundPaymentCardFinancialAccountTransferArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationInitiateFundsDepositAchTransferArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationInitiateFundsWithdrawalAchTransferArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationInitiateOrganizationReportArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationInitiatePayrollAdvanceArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationInitiatePhysicalCheckPaymentArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationInitiateSecureDepositAchTransferArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationInitiateTransferBetweenFinancialAccountsArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationInitiateTransferFromFundingFinancialAccountToPaymentCardFinancialAccountArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationInitiateTransferFromPaymentCardFinancialAccountToFundingFinancialAccountArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationInitiateUnifiedFundsTransferArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationInitiateUnloadWiredFundsFromFinancialAccountArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationInitiateUsBusinessAuthorizedPersonRequestedIdentityUpdateArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationInitiateUsBusinessProfileRequestedIdentityUpdateArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationInitiateUsBusinessUltimateBeneficialOwnerRequestedIdentityUpdateArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationInitiateUsPersonAccountHolderRequestedIdentityUpdateArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationInviteUserArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationIssueEmployerFinancialAccountForCardProductArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationIssueFinancialAccountForApplicationArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationIssueFinancialAccountForApplicationWithOnDemandFundingSourceArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationIssueFundingFinancialAccountForApplicationArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationIssuePaymentCardForApplicationArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationIssuePaymentCardForApplicationWithOnDemandFundingSourceArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationIssuePaymentCardForAuthorizedUserApplicationArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationIssuePaymentCardForFinancialAccountArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationIssuePreprintedPaymentCardFinancialAccountForApplicationArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationOrderPhysicalPaymentCardArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationOrderPhysicalPaymentCardForGroupArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationOrderPhysicalPaymentCardWithValidatedAddressArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationOrderPhysicalPaymentCardWithValidatedAddressTokenArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationProvisionAccountHolderArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationPublishPricingPlanArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationRedeemRewardsForStatementCreditArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationReevaluateApplicationArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationRefundCaptureStepArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationRefundPaymentTransactionArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationReissuePaymentCardArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationRemoveCollaborativeAuthorizationEndpointArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationRemoveEmailFromNotificationTargetArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationRemoveNotificationTargetArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationRemoveSubscriptionsFromNotificationTargetArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationRemoveUserArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationRenameCollaborativeAuthorizationEndpointArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationRenameNotificationTargetArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationReplayNotificationEventArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationResetPseudoBalanceArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationRevokeApiKeyArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationRotateNotificationTargetSigningKeyArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationSetEmailForNotificationTargetArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationSetPinForPaymentCardArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationSetPseudoLimitArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationSimulateAchTransferProcessingArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationSimulateAchTransferReturnArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationSimulateAdjustmentArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationSimulateApplicationDocumentReviewArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationSimulateApplicationStatusChangeArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationSimulateApplicationVerificationStatusChangeArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationSimulateAuthorizationArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationSimulateBackwardShiftAndAgeCurrentFinancialAccountStatementPeriodArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationSimulateCardDigitalWalletTokenActivatedArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationSimulateCardDigitalWalletTokenActivationArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationSimulateCheckbookUserVerificationArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationSimulateCheckPaymentEventArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationSimulateClearingArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationSimulateCloseFinancialAccountArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationSimulateCreateAndActivateFeeScheduleArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationSimulateCreateApplicationDocumentsUploadSessionsArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationSimulateDepositArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationSimulateDigitalWalletTokenAuthorizationArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationSimulateDigitalWalletTokenMastercardFleetAuthorizationArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationSimulateDigitalWalletTokenSingleStepAuthAndClearArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationSimulateDigitalWalletTokenVisaFleetAuthorizationArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationSimulateExternallyInitiatedAchTransferArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationSimulateFinalizeProvisionalCreditForCardTransactionDisputeArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationSimulateInitiateCardTransactionChargebackArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationSimulateInitiateCardTransactionDisputeArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationSimulateInitiateFinancialAccountClosureArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationSimulateIssueCreditForCardTransactionDisputeArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationSimulateIssueProvisionalCreditForCardTransactionDisputeArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationSimulateMastercardFleetAuthorizationAdviceArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationSimulateMastercardFleetAuthorizationArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationSimulateMastercardFleetClearingArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationSimulateMastercardFleetEnhancedDataArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationSimulateNonOriginatedAchTransferArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationSimulatePhysicalCardGroupOrderApprovalArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationSimulatePhysicalCardGroupOrderSendToPrinterArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationSimulatePhysicalCardGroupOrderShipmentFailedArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationSimulatePhysicalCardGroupOrderShippedArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationSimulatePhysicalPaymentCardOrderApprovalArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationSimulatePhysicalPaymentCardOrderSendToPrinterArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationSimulatePhysicalPaymentCardOrderShipmentFailedArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationSimulatePhysicalPaymentCardOrderShippedArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationSimulatePricingPlanArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationSimulateProcessedIntegratorInitiatedStatusChangeArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationSimulateProcessingExternallyInitiatedStatusChangeArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationSimulateProcessingIntegratorInitiatedStatusChangeArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationSimulateRefundArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationSimulateResolvePaymentCardTransactionChargebackArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationSimulateReturnedIntegratorInitiatedStatusChangeArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationSimulateReversalArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationSimulateRolloverCurrentFinancialAccountStatementPeriodArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationSimulateShiftCurrentFinancialAccountStatementPeriodArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationSimulateSingleStepAuthAndClearArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationSimulateUpdateCardTransactionDisputeArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationSimulateUpdatePaymentCardTransactionChargebackArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationSimulateVisaFleetAuthorizationAdviceArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationSimulateVisaFleetAuthorizationArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationSimulateVisaFleetClearingArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationSimulateVisaFleetL3EnhancedDataArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationStartDocumentUploadSessionArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationSuspendCardDigitalWalletTokenArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationSuspendFinancialAccountArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationSuspendPaymentCardArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationTerminateCardDigitalWalletTokenArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationTokenizeCardPaymentMethodArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationTokenizeUsBusinessAccountHolderArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationTokenizeUsPersonAccountHolderArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationTokenizeUsPersonAuthorizedUserArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationTransferFundsArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationUnsuspendCardDigitalWalletTokenArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationUnsuspendFinancialAccountArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationUpdateAccountHolderCardProductApplicationOffersArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationUpdateAccountSpendRuleArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationUpdateAccountTransactionCountSpendRuleArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationUpdateAmountLimitSpendRuleArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationUpdateCardDataInputCapabilitySpendRuleArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationUpdateCardProductNameArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationUpdateCardTransactionProcessingTypeConditionSpendRuleArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationUpdateConditionalRuleSetSpendRuleArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationUpdateCountLimitSpendRuleArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationUpdateCreditLimitPercentageSpendRuleArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationUpdateCustomFieldsArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationUpdateCvvSpendRuleArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationUpdateDaysWithinAccountCreateDateSpendRuleArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationUpdateDaysWithinCardCreateDateSpendRuleArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationUpdateDepositAmountLimitSpendRuleArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationUpdateDepositCountLimitSpendRuleArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationUpdateDepositProcessingNetworkSpendRuleArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationUpdateFinancialAccountBillingCycleConfigurationArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationUpdateFinancialAccountNameArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationUpdateMastercardFraudScoreSpendRuleArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationUpdateMaximumAmountVarianceOnCreditLimitSpendRuleArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationUpdateMaximumAmountVarianceOnPseudoBalanceSpendRuleArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationUpdateMaximumPercentVarianceOnCreditLimitSpendRuleArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationUpdateMaximumPercentVarianceOnPseudoBalanceSpendRuleArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationUpdateMerchantCategorySpendRuleArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationUpdateMerchantCountrySpendRuleArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationUpdateMerchantIdentifierSpendRuleArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationUpdateMinimumAmountLimitSpendRuleArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationUpdateOrganizationProfileDisplayNameArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationUpdatePanEntryModeSpendRuleArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationUpdatePointOfServiceCategorySpendRuleArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationUpdatePostalCodeVerificationSpendRuleArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationUpdatePricingConfigurationArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationUpdatePseudoBalanceArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationUpdatePseudoLimitArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationUpdateRewardRedemptionConfigurationAttachmentArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationUpdateRewardRuleAttachmentArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationUpdateStreetAddressSpendRuleArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationUpdateUsAssociatedPersonAccountHolderEmailArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationUpdateUsAssociatedPersonAccountHolderHomeAddressArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationUpdateUsAssociatedPersonAccountHolderPhoneArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationUpdateUsBusinessAccountHolderBillingAddressArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationUpdateUsBusinessAccountHolderCreditRiskAttributeArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationUpdateUsBusinessAccountHolderPhoneArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationUpdateUsBusinessAccountHolderWebsiteArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationUpdateUserArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationUpdateUserDefinedFieldArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationUpdateUserDefinedFieldDefinitionArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationUpdateUsPersonAccountHolderBillingAddressArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationUpdateUsPersonAccountHolderCreditRiskAttributeArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationUpdateUsPersonAccountHolderEmailArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationUpdateUsPersonAccountHolderPhoneArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationUpdateUsPersonAuthorizedUserBillingAddressArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationUpdateUsPersonAuthorizedUserEmailArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationUpdateUsPersonAuthorizedUserPhoneArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationUpdateVelocityRuleArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationUpdateVisaRiskScoreSpendRuleArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationValidateAddressArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationVerifyNetworkTokenArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationVerifyPaymentCardArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationVerifyPaymentMethodTokenArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationWaiveFeeTransferArgs`

Root Mutation type extending the main GraphQL schema.

### `MutationWaiveInterestAmountForClosedStatementArgs`

Root Mutation type extending the main GraphQL schema.

### `Name`

Type representing common fields of a person's name.

### `NameInput`

Input representing common fields of a person's name.

### `NationalIdentificationDocument`

A country-specific identification document.

### `NegativeBalanceReserveFinancialAccountFeature`

The Negative Reserve is held to cover deficits in the product such as potential over limits, fraud, uncollectible negative balances, and losses due to disputes or network charges. Funds may not be transferred out of the Negative Reserve.

### `NetworkFeePaymentTransactionFee`

A fee associated with network processing the `PaymentTransaction`.

### `NetworkTokenInput`

Used to represent a `NetworkToken`.

### `NetworkTokenizationInfoInput`

Information about the network tokenization

### `Node`

### `NonFailureAchTransferStatus`

The status of the ACH transfer that has not failed.

This could be statuses which are still pending work or that have successfully completed.

### `NonFailureExternallyInitiatedAchStatus`

The status of the ACH transfer that has not failed.

This could be statuses which are still pending work or that have successfully completed.

### `NonFailureFeeTransferStatus`

Non failure fee transfer event status.

### `NonFailureIntegratorInitiatedAchStatus`

The status of the ACH transfer that has not failed.

This could be statuses which are still pending work or that have successfully completed.

### `NonFailureWireTransferStatus`

The status of the wire transfer that has not failed.

This could be statuses which are still pending work or that have successfully completed.

### `NonOriginatedAchTransfer`

The details of an `AchTransfer` initiated by an external financial institution.
It can `PULL` funds from a Highnote `FinancialAccount` to an external financial institution
or `PUSH` funds from an external financial institution to a Highnote `FinancialAccount`.

### `NonOriginatedAchTransferConnection`

The connection type for `NonOriginatedAchTransfer`.

### `NonOriginatedAchTransferEdge`

The edge type for a `NonOriginatedAchTransfer`.

### `NonOriginatedAchTransferFailedEvent`

An event that occurs when a `NonOriginatedAchTransfer` is failed by Highnote.

### `NonOriginatedAchTransferFilterInput`

Inputs for filtering non-originated ACH transfer data.

### `NonOriginatedAchTransferLedgersArgs`

The details of an `AchTransfer` initiated by an external financial institution.
It can `PULL` funds from a Highnote `FinancialAccount` to an external financial institution
or `PUSH` funds from an external financial institution to a Highnote `FinancialAccount`.

### `NonOriginatedAchTransferPayload`

### `NonOriginatedAchTransferProcessedEvent`

An event that occurs when a `NonOriginatedAchTransfer` is processed by Highnote.

### `NonOriginatedAchTransferReceivedEvent`

An event that occurs when a `NonOriginatedAchTransfer` is received from an external financial institution.

### `NonOriginatedAchTransferReturnedEvent`

An event that occurs when a `NonOriginatedAchTransfer` is returned by Highnote.

### `NonOriginatedAchTransferSnapshot`

A snapshot of a non-originated ACH transfer.

### `NonOriginatedAchTransferSnapshotLedgersArgs`

A snapshot of a non-originated ACH transfer.

### `NonOriginatedAchTransferStatusFilterInput`

Input for filtering by `AchTransferPurpose`.

### `NonOriginatedRtpTransfer`

A non-originated RTP (Real-Time Payments) transfer via the TCH network.

A `NonOriginatedRtpTransfer` represents an RTP transfer received by the Highnote partner bank
from an external bank account.

### `NonOriginatedRtpTransferEvent`

An event associated with a `NonOriginatedRtpTransfer`.

### `NonVerifiedExternalBankAccount`

### `NonVerifiedExternalUsFinancialBankAccount`

A NonVerifiedExternalUSFinancialBankAccount

### `NonVerifiedExternalUsFinancialBankAccountDetail`

A financial instrument with an associated account and routing number.

The direct deposit detail that can be used to deposit funds.

### `NonVerifiedExternalUsFinancialBankAccountDetailRestrictedDetailsResult`

### `NonVerifiedExternalUsFinancialBankAccountRestrictedDetails`

Non Verified External US Financial Bank Account Details.

### `NonVerifiedFinancialAccountFeature`

Whether or not the Financial Account is a Non Verified account

### `NotificationEvent`

The Notification Event that was triggered in the Highnote platform.

### `NotificationEventDeliveryAttemptsArgs`

The Notification Event that was triggered in the Highnote platform.

### `NotificationEventEdge`

The edge type for Notification Events.

### `NotificationEventNode`

The types providing more details about the Notification Event.

### `NotificationEventsConnection`

The connection type for Notification Events.

### `NotificationEventsFilterInput`

The input to provide filters for the notificationEvents query.

### `NotificationEventValidationTestEvent`

The event sent when initiateEventValidationTest mutation is called.

### `NotificationPingTestEvent`

The event sent when initiateNotificationPingTest mutation is called.

### `NotificationTarget`

The types of notification targets.

### `NotificationTargetActivationEvent`

The event sent to a notification target during activation.

### `NotificationTargetStatusHistory`

Notification Target status history

### `NotificationTargetStatusHistoryConnection`

The connection type for a notification target's status history.

### `NotificationTargetStatusHistoryEdge`

The edge type for a notification target's status history'.

### `NotificationTimestampFilterInput`

Input for filtering dates.

The format for each `String` field should be in YYYY-MM-DD format.

Example: `2021-11-12`

### `NotificationTimestampFilterInputRange`

Input for filtering by date value ranges (inclusive).

The format for each `String` field should be in YYYY-MM-DD format.

Example: `2021-11-12`

### `OnboardingApplicantContact`

The person to contract for questions about this application

### `OnboardingApplicationStep`

### `OnboardingBusinessAuthorizedPerson`

The details of the person authorized to act on behalf of business.

### `OnboardingBusinessDetails`

Business information collected for an application

### `OnboardingBusinessHistory`

Business history related to incorporaton, history, and goods and services provided.

### `OnboardingBusinessOrganizationInformation`

Business information collected for a subscriber application

### `OnboardingBusinessProcessingAttributes`

The business' reported operating details.

### `OnboardingBusinessType`

Business information collected for an application

### `OnboardingControlProng`

Under the control prong, the beneficial owner is a single individual who has significant responsibility to control, manage, or direct the business.

### `OnboardingESignature`

eSignature and date

### `OnboardingIdentificationDocument`

The identification documents attached to a Person.

### `OnboardingPreliminaryBusinessInformation`

The initial business information collected from a potential business customer

### `OnDemandFundingCardProductFeature`

Whether or not the `CardProduct` supports on demand funding.

### `OnDemandFundingFinancialAccountFeature`

Whether or not the Financial Account supports On-Demand Funding.

### `OneTimeAchTransfer`

A scheduled one time ACH transfer

### `OneTimeAchTransferTransferEventsArgs`

A scheduled one time ACH transfer

### `OrderPhysicalPaymentCardForGroupInput`

Input fields for ordering a payment card.

### `OrderPhysicalPaymentCardInput`

Input fields for ordering a payment card.

### `OrderPhysicalPaymentCardMutation`

### `OrderPhysicalPaymentCardMutationVariables`

### `OrderPhysicalPaymentCardPayload`

Types which can be returned for ordering a payment card.

### `OrderPhysicalPaymentCardWithValidatedAddressInput`

Input fields for ordering a payment card with validated address.

### `OrderPhysicalPaymentCardWithValidatedAddressTokenInput`

Input fields for ordering a payment card with validated address token.

### `OrderPhysicalPaymentCardWithValidatedAddressTokenMutation`

### `OrderPhysicalPaymentCardWithValidatedAddressTokenMutationVariables`

### `Organization`

Organization that controls a set of card programs.

### `OrganizationAccountsArgs`

Organization that controls a set of card programs.

### `OrganizationApiKeysArgs`

Organization that controls a set of card programs.

### `OrganizationBusinessCustomerRelationship`

Represents an organization business relationship with a customer.

### `OrganizationBusinessPartnerRelationship`

Represents an organization business relationship with a partner.

### `OrganizationBusinessRelationship`

Represents all possible types of organization business relationships.

### `OrganizationBusinessRelationshipConnection`

A paginated list of organization business relationships.

### `OrganizationBusinessRelationshipEdge`

An edge in the organization business relationship connection.

### `OrganizationBusinessRelationshipFilterInput`

Inputs for filtering organization business relationships.

### `OrganizationCardProductsArgs`

Organization that controls a set of card programs.

### `OrganizationCollaborativeAuthorizationEndpointsArgs`

Organization that controls a set of card programs.

### `OrganizationInterFinancialAccountTransferRulesArgs`

Organization that controls a set of card programs.

### `OrganizationPaymentCardTransactionChargebacksArgs`

Organization that controls a set of card programs.

### `OrganizationPaymentCardTransactionDisputesArgs`

Organization that controls a set of card programs.

### `OrganizationPhysicalCardGroupOrdersArgs`

Organization that controls a set of card programs.

### `OrganizationPhysicalPaymentCardGroupOrdersArgs`

Organization that controls a set of card programs.

### `OrganizationPhysicalPaymentCardOrdersArgs`

Organization that controls a set of card programs.

### `OrganizationPricingPlansArgs`

Organization that controls a set of card programs.

### `OrganizationProfile`

Details of the Organization

### `OrganizationProfileFeaturePermissionsArgs`

Details of the Organization

### `OrganizationRealtimeRiskRulesArgs`

Organization that controls a set of card programs.

### `OrganizationReviewWorkflowEventsArgs`

Organization that controls a set of card programs.

### `OrganizationRewardEarnRulesArgs`

Organization that controls a set of card programs.

### `OrganizationRewardRedemptionConfigurationsArgs`

Organization that controls a set of card programs.

### `OrganizationSearchFinancialAccountBalancesArgs`

Organization that controls a set of card programs.

### `OrganizationSearchTransactionsArgs`

Organization that controls a set of card programs.

### `OrganizationSpendRulesArgs`

Organization that controls a set of card programs.

### `OrganizationUserDefinedFieldDefinitionsArgs`

Organization that controls a set of card programs.

### `OrganizationUserDefinedFieldsArgs`

Organization that controls a set of card programs.

### `OrganizationUsersArgs`

Organization that controls a set of card programs.

### `OrganizationVelocityInterFinancialAccountTransferRulesArgs`

Organization that controls a set of card programs.

### `OrganizationVelocityRulesArgs`

Organization that controls a set of card programs.

### `OrganizationWebhookNotificationTargetsArgs`

Organization that controls a set of card programs.

### `OriginatedAchTransfer`

The details of an `AchTransfer` initiated by Highnote.
It can `PUSH` funds from a Highnote `FinancialAccount` to an external financial institution
or `PULL` funds from an external financial institution to a Highnote `FinancialAccount`.

### `OriginatedAchTransferCanceledEvent`

An event that occurs when an `OriginatedAchTransfer` is canceled by Highnote.

### `OriginatedAchTransferConnection`

The connection type for `OriginatedAchTransfer`s.

### `OriginatedAchTransferEdge`

The edge type for an `OriginatedAchTransfer`.

### `OriginatedAchTransferFailedEvent`

An event that occurs when an `OriginatedAchTransfer` is failed by Highnote.

### `OriginatedAchTransferFilterInput`

Inputs for filtering originated ACH transfer data.

### `OriginatedAchTransferInitiatedEvent`

An event that occurs when an `OriginatedAchTransfer` is initiated by Highnote.

### `OriginatedAchTransferLedgersArgs`

The details of an `AchTransfer` initiated by Highnote.
It can `PUSH` funds from a Highnote `FinancialAccount` to an external financial institution
or `PULL` funds from an external financial institution to a Highnote `FinancialAccount`.

### `OriginatedAchTransferPayload`

### `OriginatedAchTransferPendingEvent`

An event that occurs when an `OriginatedAchTransfer` is processed as `PENDING` by Highnote.

### `OriginatedAchTransferProcessedEvent`

An event that occurs when an `OriginatedAchTransfer` was processed (e.g. transitioned to `PROCESSED`) and reflected on the financial account.

### `OriginatedAchTransferProcessingEvent`

An event that occurs when an `OriginatedAchTransfer` is sent to the external financial institution.

### `OriginatedAchTransferReturnedEvent`

An event that occurs when a return received from the external financial institution for this transfer was processed by Highnote,
in ISO 8601 date and time format, e.g. 2024-01-01T00:00:00.000Z.

### `OriginatedAchTransferSnapshot`

A snapshot of an originated ACH transfer.

### `OriginatedAchTransferSnapshotLedgersArgs`

A snapshot of an originated ACH transfer.

### `OriginatedAchTransferStatusFilterInput`

Input for filtering by `AchTransferPurpose`.

### `OriginatedRtpTransfer`

An originated RTP (Real-Time Payments) transfer via the TCH network.

An `OriginatedRtpTransfer` represents an RTP transfer originated by the Highnote partner bank
to an external bank account.

### `OriginatedRtpTransferEvent`

An event associated with an `OriginatedRtpTransfer`.

### `Origination`

Information about the origination of a relayed notification event.
Provides context about which organization originally triggered the event
and when it was relayed to the current organization.

### `PageInfo`

Information about the paginated result set.

### `PanEntryModeSpendRule`

A Spend Control rule that allows or blocks certain `PanEntryMode` types during authorizations.

### `PanEntryModeSpendRuleResult`

The result of applying a `PanEntryModeSpendRule` to an event.

### `PanEntryModeSpendRuleRevisionsArgs`

A Spend Control rule that allows or blocks certain `PanEntryMode` types during authorizations.

### `PartialFundingCardProductFeature`

Whether or not the `CardProduct` supports Partial funding configurations for unsecured credit product funding.

### `PartialFundingFinancialAccountFeature`

Whether or not the `FinancialAccount` supports partial funding.

### `PassportIdentificationDocument`

A representation of a passport identification document.

### `Payfac`

A `Business` operating as a Payment Facilitator, onboarding and managing
submerchants on behalf of the acquirer.

### `PayfacIsoPartnership`

A partnership between a `Payfac` and an `Iso`.

### `PayfacIsoPartnershipConnection`

The connection type for `PayfacIsoPartnership`.

### `PayfacIsoPartnershipEdge`

The edge type for `PayfacIsoPartnership`.

### `PayfacIsoPartnershipsArgs`

A `Business` operating as a Payment Facilitator, onboarding and managing
submerchants on behalf of the acquirer.

### `PayfacSubmerchantsArgs`

A `Business` operating as a Payment Facilitator, onboarding and managing
submerchants on behalf of the acquirer.

### `PaymentAdvance`

### `PaymentCard`

A Payment Card which can be used for card transactions.

### `PaymentCardActivatedEvent`

The PaymentCardActivatedEvent is triggered when a Payment Card has been activated.

### `PaymentCardAdjustmentEvent`

`PaymentCardAdjustmentEvent` indicates an adjustment has been made to a `Transaction`.

### `PaymentCardAtmLocationsArgs`

A Payment Card which can be used for card transactions.

### `PaymentCardAttachedRealtimeRiskRulesArgs`

A Payment Card which can be used for card transactions.

### `PaymentCardAttachedSpendRulesArgs`

A Payment Card which can be used for card transactions.

### `PaymentCardAttachedVelocityRulesArgs`

A Payment Card which can be used for card transactions.

### `PaymentCardAuthorizationAndClearApprovedEvent`

PaymentCardAuthorizationAndClearApprovedEvent indicates that a PaymentCard Transaction Authorization and Clear has been approved.

### `PaymentCardAuthorizationAndClearDeclinedEvent`

PaymentCardAuthorizationAndClearDeclinedEvent indicates that a PaymentCard Transaction Authorization and Clear has been declined.

### `PaymentCardAuthorizationApprovedEvent`

PaymentCardAuthorizationApprovedEvent indicates if a Payment Card Transaction Authorization has been approved.

### `PaymentCardAuthorizationCreatedEvent`

PaymentCardAuthorizationCreatedEvent indicates if a Payment Card Transaction Authorization has been created.

### `PaymentCardAuthorizationDeclinedEvent`

PaymentCardAuthorizationDeclinedEvent indicates if a Payment Card Transaction Authorization has been declined.

### `PaymentCardAuthorizationReversedEvent`

PaymentCardAuthorizationReversedEvent indicates that a PaymentCard Transaction Reversal has occurred.

### `PaymentCardBinRange`

Payment Card Bin Range details.

### `PaymentCardCardDigitalWalletTokensArgs`

A Payment Card which can be used for card transactions.

### `PaymentCardChargebackStatusFilterInput`

Input to filter by `PaymentCardChargebackStatus`.

### `PaymentCardClearedEvent`

PaymentCardClearedEvent indicates if a Payment Card Transaction has been cleared. This event will be conditionally fired after a `PaymentCardAuthorizationApprovedEvent` | `PaymentCardAuthorizationDeclinedEvent`. This event will not be triggered after a `PaymentCardAuthorizationAndClearApprovedEvent` | `PaymentCardAuthorizationAndClearDeclinedEvent`

### `PaymentCardClosedEvent`

The PaymentCardClosedEvent is triggered when a Payment Card has been closed.

### `PaymentCardConnection`

The connection type for Payment Card.

### `PaymentCardDeliveryDetails`

The details of the delivery.

### `PaymentCardDeliveryDetailsInput`

The details of the delivery.

### `PaymentCardDeliveryDetailsWithValidatedAddressInput`

The details of the delivery.

### `PaymentCardDigitalWalletTokenApplePayDevicePushProvisioning`

Return type to push provision a `PaymentCard` to an Apple Pay Enabled Device.

### `PaymentCardDigitalWalletTokenGooglePayPushProvisioning`

Return type to push provision a `PaymentCard` to a Google Pay Enabled Device.

### `PaymentCardDisputeCustomerContact`

The customer contact information of the dispute.

### `PaymentCardDisputeStatusFilterInput`

Input to filter by `PaymentCardDisputeStatus`.

### `PaymentCardEdge`

The edge type for a PaymentCard.

### `PaymentCardEnhancedDataEvent`

PaymentCardEnhancedDataEvent indicates if enhanced data for a Payment Card Transaction has been received. This event will be conditionally fired after a `PaymentCardClearedEvent`. This event will not be triggered after a `PaymentCardAuthorizationAndClearApprovedEvent` | `PaymentCardAuthorizationAndClearDeclinedEvent`

### `PaymentCardEvent`

### `PaymentCardFilterInput`

Inputs for filtering based on `PaymentCard` details.

### `PaymentCardGroupOrderStateDetail`

Group order status detail.

### `PaymentCardGroupOrderStateDetailHistory`

Group order detail history.

### `PaymentCardGroupOrderStatusFilterInput`

Inputs for filtering by `PaymentCardGroupOrderStatus`

### `PaymentCardHolder`

The identity type of a payment card holder.

### `PaymentCardHolderDetails`

Card holder details for a payment card.

### `PaymentCardInput`

Used to represent a Payment Card.

### `PaymentCardInstrument`

Used to represent data available on a Payment Card.

### `PaymentCardInstrumentCapability`

### `PaymentCardIssuedEvent`

The `PaymentCardIssuedEvent` is triggered when a Payment Card has been activated.

### `PaymentCardNetworkFilterInput`

Input for filtering by `PaymentCardNetwork`.

### `PaymentCardOrderStateDetail`

Payment card order status detail.

### `PaymentCardOrderStateDetailHistory`

Payment card order date detail history.

### `PaymentCardOrderStatusFilterInput`

Input for filtering by `PaymentCardOrderStatus`.

### `PaymentCardPersonalization`

Payment card personalization.

### `PaymentCardPersonalizationInput`

Payment card personalization input.

### `PaymentCardPersonalizationTextLines`

Payment card personalization text lines.

### `PaymentCardPersonalizationTextLinesInput`

Payment card personalization text lines input.

### `PaymentCardPinDetails`

PIN details for the `PaymentCard`.

### `PaymentCardPinUpdate`

Update details for the `PaymentCardPinDetails`.

### `PaymentCardRestrictedDetails`

Raw payment card details.

**Note:** This is only available to users/organizations who have provided an AOC (attestation of compliance).

### `PaymentCardRestrictedDetailsResult`

### `PaymentCardRevisionSnapshotsArgs`

A Payment Card which can be used for card transactions.

### `PaymentCardSenderDetails`

The details of the sender.

### `PaymentCardShipment`

PaymentCardShipment

### `PaymentCardShipmentCourier`

The details of the shipment.

### `PaymentCardShipmentCourierInput`

The details specifying the shipment.

### `PaymentCardShipmentTracking`

PaymentCardShipmentTracking

### `PaymentCardShippingMethodFilterInput`

Input for filtering by `PaymentCardShippingMethod`

### `PaymentCardSnapshot`

A snapshot of the `PaymentCard` at the time of a transaction event.

### `PaymentCardSnapshotConnection`

The connection type for `PaymentCardSnapshotConnection`.

### `PaymentCardSnapshotEdge`

The edge type for a `PaymentCardSnapshot`.

### `PaymentCardStatusFilterInput`

Input for filtering by `PaymentCardStatus`.

### `PaymentCardSuspendedEvent`

The PaymentCardSuspendedEvent is triggered when a Payment Card has been suspended.

### `PaymentCardTransactionBusinessMetric`

Describes the metrics for transactions.

### `PaymentCardTransactionBusinessMetricFilterInput`

Used to filter which transaction metrics are requested.

### `PaymentCardTransactionBusinessMetricResult`

Describes metric Result of card product transaction metric.

### `PaymentCardTransactionChargeback`

The payment card transaction chargeback.

### `PaymentCardTransactionChargebackConnection`

The connection type for a `PaymentCardTransactionChargeback`.

### `PaymentCardTransactionChargebackEdge`

The edge type for the `PaymentCardTransactionChargeback`.

### `PaymentCardTransactionChargebacksFilterInput`

Input for filtering `PaymentCardTransactionChargeback`

### `PaymentCardTransactionDispute`

The payment card transaction dispute.

### `PaymentCardTransactionDisputeConnection`

The connection type for a `PaymentCardTransactionDispute`.

### `PaymentCardTransactionDisputeConnectionPayload`

The possible return types of `PaymentCardTransactionDisputeConnectionPayload`.

### `PaymentCardTransactionDisputeCredit`

The payment card transaction dispute credit.

### `PaymentCardTransactionDisputeEdge`

The edge type for the `PaymentCardTransactionDispute`.

### `PaymentCardTransactionDisputePayload`

The possible return types of `PaymentCardTransactionDisputePayload`.

### `PaymentCardTransactionDisputeProvisionalCredit`

The payment card transaction chargeback credit.

### `PaymentCardTransactionDisputesFilterInput`

Input for filtering `PaymentCardTransactionDispute`

### `PaymentCardTransactionEvent`

### `PaymentCardTransactionEventsArgs`

A Payment Card which can be used for card transactions.

### `PaymentCardTransactionEventsFilterInput`

Inputs for filtering transaction events.

### `PaymentCardUnsuspendedEvent`

The PaymentCardUnsuspendedEvent is triggered when a Payment Card has been unsuspended.

### `PaymentCardUserDefinedFieldsArgs`

A Payment Card which can be used for card transactions.

### `PaymentCardVerification`

The result of a verification check ran against a payment card.

### `PaymentCardVerificationApprovedEvent`

PaymentCardVerificationApprovedEvent indicates that a PaymentCard Transaction Verification has been approved.

### `PaymentCardVerificationDeclinedEvent`

PaymentCardVerificationDeclinedEvent indicates that a PaymentCard Transaction Verification has been declined.

### `PaymentCardVerificationResponseCode`

Response codes for a payment card verification.

### `PaymentCreditTransaction`

A payment transaction for a refund. This is a record of a payment being refunded.

### `PaymentCreditTransactionSummary`

### `PaymentDebitTransaction`

A payment transaction for a purchase. This is a record of a payment being made.

### `PaymentDebitTransactionSummary`

### `PaymentInstruction`

The `PaymentInstruction` type defines where funds dirbused to, and the amount to disburse for an `PaymentOrderItem`.

### `PaymentInstructionDisbursementTarget`

The `Node` types that `PaymentInstruction` can disburse funds to.

### `PaymentInstructionInput`

Allows for the specification of payment instructions for `PaymentOrder`s, which allows choice on how to disburse funds for each `PaymentOrderItem`.

Must define either `disbursementPercent` or `disbursementAmount`, but not both.

If choosing to specify an amount to disburse, the amount must be in the same currency as the `PaymentOrderItem` and all disbursementAmount must sum to the total amount of the `PaymentOrderItem`.
If choosing to specify a percentage to disburse, the sum of all disbursementPercent must equal 100.

### `PaymentInstrument`

Used to represent the payment method data.

### `PaymentMethodCapabilityDisabledEvent`

Triggered when a `PaymentMethodCapability` has been disabled.

### `PaymentMethodCapabilityEnabledEvent`

Triggered when a `PaymentMethodCapability` has been enabled.

### `PaymentMethodCapabilityRequiresReviewEvent`

Triggered when a `PaymentMethodCapability` requires review.

### `PaymentMethodCapabilityReviewedEvent`

Triggered when a `PaymentMethodCapability` has been reviewed. The `status` field indicates the outcome of the review (`ENABLED` or `DISABLED`).

### `PaymentMethodConnection`

The connection type for Payment Method.

### `PaymentMethodConnectionPayload`

Types to expect for payment method connection

### `PaymentMethodEdge`

The edge type for a Payment Method.

### `PaymentMethodToken`

A token representing a payment method.

### `PaymentMethodTokenTokenArgs`

A token representing a payment method.

### `PaymentMethodTypeInput`

The input to filter by payment method type.

### `PaymentMethodVariant`

Types which can be returned while fetching payment method.

### `PaymentOrder`

An `PaymentOrder` is used to represent a collection of items that a customer wants to purchase.

### `PaymentOrderItem`

### `PaymentOrderItemFromCatalogItem`

A catalog item that is added to an `PaymentOrder`.

### `PaymentOrderItemFromCatalogItemInput`

Input for creating a new `PaymentOrderItemFromCatalogItem`.

### `PaymentOrderItemFromCustomItem`

A custom one time item that is added to an `PaymentOrder`. These are one-off items defined at the time the order is created. They cannot be queried outside of the `PaymentOrder`.

### `PaymentOrderItemFromCustomItemInput`

Input for creating a new `PaymentOrderItemFromCustomItem`.

### `PaymentOrderLineItem`

The `PaymentOrderLineItem` type defines an item and the quantity of that item for an `PaymentOrder`.

### `PaymentTransaction`

A payment transaction. This is a record of a payment being made.

### `PaymentTransactionEvent`

Represents a synchronous payment event for an acquiring `PaymentTransaction`.

### `PaymentTransactionFee`

Fee associated with a `PaymentTransaction`.

### `PaymentTransactionFilterInput`

The filters used to scope the type of `PaymentTransaction`s returned.

### `PaymentTransactionLifecycleStep`

A payment transaction event. This is a record of a payment transaction moving money.

### `PaymentTransactionLifecycleStepSummary`

A payment transaction lifecycle step summary. This is a summary record of a payment transaction moving money returned
from a mutation.

### `PaymentTransactionPaymentMethodInput`

Input for the polymorphic credential supplied to payment transaction mutations.
**Exactly one** of `paymentCard`, `paymentMethodToken`, or `networkToken` must
be set.

### `PaymentTransactionResponseCode`

Response codes for a payment transaction.

### `PaymentTransactionsConnection`

The connection type for the `paymentTransactions` query.

### `PaymentTransactionsEdge`

The edge type for the `paymentTransactions` query.

### `PaymentTransactionSummary`

### `PayOffPaymentDetails`

Payoff payment details.

### `PayoutTransferCompletedEvent`

Represents a completed payout transfer event for an acquiring `PaymentTransaction`.

This event is created when the funds are transferred.

See `transferedTo` for more details in where it transferred to.

### `PayrollAchTransferEvent`

A financial event that represents a `PayrollTransfer`.

### `PayrollAdvance`

The Payroll Payment Advance within the Highnote platform.

### `PayrollAdvanceEvent`

### `PayrollAdvanceFinancialAccountFeature`

Whether or not the Financial Account supports Payroll Advance.

### `PayrollAdvanceRepaymentCompletedEvent`

The PayrollAdvanceRepaymentCompletedEvent is triggered when an amount pertaining to a `PayrollAdvance` is has been repaid.

### `PayrollAdvanceRepaymentTransfer`

A movement of money to repay payroll advance

### `PayrollAdvanceRepaymentTransferLedgersArgs`

A movement of money to repay payroll advance

### `PayrollAdvanceWriteOffCompletedEvent`

The PayrollAdvanceWriteOffCompletedEvent is triggered when an amount pertaining to a `PayrollAdvance` is has been written off.

### `PayrollAdvanceWriteoffTransfer`

A movement of money to write off payroll advance

### `PayrollAdvanceWriteoffTransferLedgersArgs`

A movement of money to write off payroll advance

### `PayrollEmployerAdvanceFinancialAccountFeature`

Whether or not the Financial Account supports Payroll Employer Advance.

### `PayrollTransfer`

A transfer for the purposes of payroll.

### `PayrollTransferLedgersArgs`

A transfer for the purposes of payroll.

### `PersonAccountHolder`

The base fields for all PersonAccountHolders (regardless of region or snapshot)

### `PersonAccountHolderFieldsFragment`

### `PersonAccountHolderFilterInput`

Inputs for filtering person account holder data.

**Note:** Filtering by a single field will yield accurate results. You may also
combine the `dateOfBirth` and `name` fields within the same query for successful
search results. However, combining other fields may not yield the expected results
and is not supported.

### `PersonAccountHolderIdentityDocumentsRequestedEvent`

Indicates that identity verification documents have been requested for a `USPersonAccountHolder`.

### `PersonAccountHolderIdentityUpdatedEvent`

Indicates that the identifying information of a `USPersonAccountHolder` has been updated.

### `PersonAccountHolderNameFilterInput`

Input for filtering Account Holders by name.
The matching for these name fields are performed using similar sounding scores.
e.g. keywords like Mayer, mayer, Mire & Mary will lead to the same score.

### `PersonAccountHolderNameInput`

Input representing common fields of a PersonAccountHolder's name.

### `PersonAccountHolderSummaryFragment`

### `PersonAuthorizedUser`

The base fields for all PersonAuthorizedUser (regardless of region or snapshot)

### `PersonAuthorizedUserFilterInput`

Inputs for filtering person authorized user data.

### `PersonAuthorizedUserNameFilterInput`

Input for filtering authorized users by name.
The matching for these name fields are performed using similar sounding scores.
e.g. keywords like Mayer, mayer, Mire & Mary will lead to the same score.

### `PersonAuthorizedUserNameInput`

Input representing common fields of a PersonAuthorizedUser's name.

### `PersonCreditRiskAttributes`

A type representing credit risk attributes for person underwriting.

### `PersonCreditRiskAttributesInput`

Input representing credit risk attributes for person underwriting.

### `PersonIdentificationDocument`

`Person` identification document types.

### `PersonJurisdiction`

Jurisdiction details for a `Person`.

### `PersonNameFilterInput`

Input for filtering persons by name.
The matching for these name fields are performed using similar sounding scores.
e.g. keywords like Mayer, mayer, Mire & Mary will lead to the same score.

### `Phone`

Type representing parts of a phone number.

### `PhoneFilterInput`

Input for filtering phone number.

### `PhoneInput`

Input representing parts of a phone number.

### `PhoneLabelFilterInput`

Input for filtering by `PhoneLabel`.

### `PhysicalCardGroupOrder`

A created PhysicalCardGroupOrder.

### `PhysicalCardGroupOrderConnection`

The connection type for `PhysicalCardGroupOrder`.

### `PhysicalCardGroupOrderEdge`

The edge type for a `PhysicalCardGroupOrder`.

### `PhysicalCardGroupOrderFilterInput`

Inputs for filtering physical payment card group orders.

### `PhysicalCardGroupOrderPayload`

Types which can be returned for creating a group order.

### `PhysicalCardGroupOrderPhysicalPaymentCardOrdersArgs`

A created PhysicalCardGroupOrder.

### `PhysicalCardPersonalization`

The personalization line for a physical card

### `PhysicalCardPersonalizationLine`

The personalization for a line.

### `PhysicalCardProfile`

Physical Card Profile attributes

### `PhysicalCheckPaymentRecipientInput`

The input object that defines the fields for the recipient input.

There are multiple ways to provide recipient information:
* One of `validatedAddressTokenId`, or `address` needs to be provided.

### `PhysicalPaymentCardGroupOrderFilterInput`

Inputs for filtering physical payment card group orders.

### `PhysicalPaymentCardGroupOrderShipFailedEvent`

PhysicalPaymentCardGroupOrderShipFailedEvent indicates when a Physical Payment Card Group Order has failed to ship

### `PhysicalPaymentCardGroupOrderShippedEvent`

PhysicalPaymentCardGroupOrderShippedEvent indicates when a Physical Payment Card Group Order has shipped successfully

### `PhysicalPaymentCardOrder`

A created PhysicalPaymentCardOrder.

### `PhysicalPaymentCardOrderConnection`

The connection type for `PhysicalPaymentCardOrder`.

### `PhysicalPaymentCardOrderEdge`

The edge type for a `PhysicalPaymentCardOrder`.

### `PhysicalPaymentCardOrderFilterInput`

Inputs for filtering PhysicalPaymentCardOrders.

### `PhysicalPaymentCardShipFailedEvent`

PhysicalPaymentCardShipFailedEvent indicates when a Physical Payment Card has failed to ship

### `PhysicalPaymentCardShippedEvent`

PhysicalPaymentCardShippedEvent indicates when a Physical Payment Card has shipped successfully

### `PointOfServiceCategorySpendRule`

A Spend Control rule that allows or blocks certain point of service categories during authorizations.

### `PointOfServiceCategorySpendRuleResult`

The result of applying a point of service category spend rule to an event.

### `PointOfServiceCategorySpendRuleRevisionsArgs`

A Spend Control rule that allows or blocks certain point of service categories during authorizations.

### `PointOfServiceDetails`

Details about the point of service for the transaction.

### `PointOfServiceDetailsInput`

Details about the point of service for the transaction.

### `PointRewardCardProductFeature`

Whether or not the `CardProduct` supports rewards.

### `PointRewardFinancialAccountFeature`

Whether or not the Financial Account supports Point Rewards.

### `PostalCodeResponseCodeFilterInput`

Input for filtering Postal code response code

### `PostalCodeVerificationSpendRule`

A Spend Control rule that allows or blocks certain postal code response codes during authorizations.

### `PostalCodeVerificationSpendRuleResult`

The result of applying a `PostalCodeVerificationSpendRule` to an event.

### `PostalCodeVerificationSpendRuleRevisionsArgs`

A Spend Control rule that allows or blocks certain postal code response codes during authorizations.

### `PrePaidPaymentCardFinancialAccountFeature`

Whether or not the Financial Account supports a PrePaid Payment Card.

### `PreprintedCardFinancialAccountFeature`

Whether or not the `FinancialAccount` supports preprinted cards.

### `PreviousProductApplication`

a type representing a previous application

### `PreviousProductApplicationConnection`

The connection type for previous applications

### `PreviousProductApplicationEdge`

An edge for a previous product application

### `PreviousProductApplicationFilterInput`

Filter input for previous applications

### `PricingConfiguration`

Associates a `PricingPlan` with specific parties and a validity period.

### `PricingPlan`

The pricing plan available for an organization.

### `PricingPlanConnection`

The connection type for `PricingPlan`.

### `PricingPlanEdge`

The edge type for a `PricingPlan`.

### `PricingPlanFilterInput`

Filter criteria for `PricingPlan` records.

### `PricingPlanRulesArgs`

The pricing plan available for an organization.

### `PricingPlanSimulationResult`

The result of a pricing plan simulation.
Contains the simulation output as a base64-encoded CSV.

### `PricingRule`

A pricing rule within a `PricingPlan`, referencing a template and containing trigger, frequency, and parameter values.

### `PricingRuleConnection`

The connection type for `PricingRule`.

### `PricingRuleEdge`

The edge type for a `PricingRule`.

### `PricingRuleInput`

The input details for creating a `PricingRule`.

### `PricingRuleParameter`

A key-value pair used to inject data into a `PricingRuleTemplate` script.

### `PricingRuleParameterInput`

The input details for a `PricingRuleParameter`.

### `PricingRuleParameterValue`

The value of a `PricingRuleParameter`.

### `PricingRuleParameterValueInput`

The input details for a `PricingRuleParameter` value.
Supports either a single value or a list of values.

### `PricingRuleParameterValueSingle`

A single value for a `PricingRuleParameter`.

### `ProcessingCapability`

### `ProductApplicantBusinessProfileSnapshot`

Snapshot of the product applicant's business profile.

### `ProductApplication`

An Application for an `ApplicationProduct`.

### `ProductApplicationConnection`

The connection type for `ProductApplication`.

### `ProductApplicationConnectionPayload`

The return types when querying a paginated list of `ProductApplication`;

### `ProductApplicationEdge`

The edge type for `ProductApplication`.

### `ProductApplicationState`

A type representing a state of a `ProductApplication`

### `ProductApplicationWorkflow`

### `ProductFeature`

Defines the abilities of a `Product`.

### `ProductFundingFinancialAccountFeature`

Whether or not the Financial Account supports Product Funding.

### `ProductProfile`

Represents a profile for a `Product` which is a collection of `ProductFeature`s.

### `ProductReserveFinancialAccountFeature`

The Product Reserve is held to cover deficits in the product such as card activity settlement. Funds may not be transferred out of the Product Reserve

### `ProductSecuredDepositFinancialAccountFeature`

Whether or not the `FinancialAccount` supports product secured deposits.

### `ProvisionAccountHolderActionDetail`

Represents the details of an account holder provisioning action.

This type includes the various inputs required for different provisioning actions, such as creating an application, setting a credit limit, or issuing a payment card.

### `ProvisionAccountHolderActionInput`

Input object for specifying actions during the provisioning of an account holder.

This type contains the inputs required for various provisioning actions, such as creating an application, setting a financial account credit limit, or issuing a payment card.

### `ProvisionAccountHolderInput`

Input to provision an Account Holder

### `ProvisionAccountHolderMutation`

### `ProvisionAccountHolderMutationVariables`

### `ProvisionAccountHolderPayload`

Union type representing the possible payloads for provisioning an account holder.

This union includes the outcomes of provisioning actions, error messages, and access permissions.

### `ProvisionCreateAccountHolderCardProductApplicationActionDetail`

Details for an account holder's application process.

### `ProvisionCreateAccountHolderCardProductApplicationInput`

Input for an account holder's application process.

This input type includes fields for consent to terms and conditions, IP address details, and credit report pull consent.

### `ProvisionInitiateFinancialAccountCreditLimitUpdateFromProductFundingActionDetail`

Input for setting the credit limit of a financial account.

This input type includes details for specifying the credit limit amount and an optional description.

### `ProvisionInitiateFinancialAccountCreditLimitUpdateFromProductFundingInput`

Input for setting the credit limit of a financial account.

This input type includes details for specifying the credit limit amount and an optional description.

### `ProvisionIssueFinancialAccountForApplicationActionDetail`

Request contents for ProvisionIssueFinancialAccountForApplicationAction

### `ProvisionIssueFinancialAccountForApplicationInput`

Input for issuing a new financial account.

This input type includes fields for specifying an external identifier and the name of the financial account.

### `ProvisionIssuePaymentCardForFinancialAccountActionDetail`

Input for provisioning an issued payment card for a financial account.

This input type includes options for configuring the newly issued payment card.

### `ProvisionIssuePaymentCardForFinancialAccountInput`

Input for provisioning an issued payment card for a financial account.

This input type includes options for configuring the newly issued payment card.

### `ProvisionLinkVerifiedExternalBankAccountActionDetail`

Details for linking verified external bank account.

### `PublishPricingPlanInput`

The input details for publishing a `PricingPlan`.

### `PublishPricingPlanPayload`

The result of publishing a `PricingPlan`.
Returns the published pricing plan or error details.

### `Query`

All Queries that can be performed.

### `QueryApplicationContractsArgs`

All Queries that can be performed.

### `QueryBusinessAccountHoldersArgs`

All Queries that can be performed.

### `QueryBusinessesArgs`

All Queries that can be performed.

### `QueryBusinessesForSubscriberArgs`

All Queries that can be performed.

### `QueryCardProductApplicationBusinessMetricArgs`

All Queries that can be performed.

### `QueryCardProductsArgs`

All Queries that can be performed.

### `QueryCardProfileSetsArgs`

All Queries that can be performed.

### `QueryCustomerArgs`

All Queries that can be performed.

### `QueryFeeTransferEventsArgs`

All Queries that can be performed.

### `QueryInstallmentEligibilityForTransactionEventsArgs`

All Queries that can be performed.

### `QueryInstallmentOffersForTransactionEventArgs`

All Queries that can be performed.

### `QueryMerchantCategoryCodeSankeyDataPointsArgs`

All Queries that can be performed.

### `QueryMerchantDrilldownSankeyDataPointsArgs`

All Queries that can be performed.

### `QueryNodeArgs`

All Queries that can be performed.

### `QueryNotificationEventsArgs`

All Queries that can be performed.

### `QueryOrganizationBusinessRelationshipsArgs`

All Queries that can be performed.

### `QueryPaymentCardTransactionBusinessMetricArgs`

All Queries that can be performed.

### `QueryPaymentTransactionsArgs`

All Queries that can be performed.

### `QueryPersonAccountHoldersArgs`

All Queries that can be performed.

### `QueryPersonAuthorizedUsersArgs`

All Queries that can be performed.

### `QueryProductApplicationsArgs`

All Queries that can be performed.

### `QueryReportsArgs`

All Queries that can be performed.

### `QueryRiskGeolocationDensityArgs`

All Queries that can be performed.

### `QueryRiskGeolocationPathsArgs`

All Queries that can be performed.

### `QueryRiskScatterDataPointsArgs`

All Queries that can be performed.

### `QueryRiskSmsMessagesArgs`

All Queries that can be performed.

### `QuerySchemaChangelogsArgs`

All Queries that can be performed.

### `QuoteBankTransferDetailsInput`

Additional details for bank-to-bank transfers used in `createUnifiedFundsTransferQuote`.

Consent is not required at quote time. Provide consent on `InitiateUnifiedFundsTransferInput.consent` when initiating the transfer.

### `RealtimeRiskRule`

The interface for a realtime risk rule. These rules execute in realtime during the authorization of a card transaction.

### `RealtimeRiskRuleConnection`

The connection type for Realtime Risk Rule.

### `RealtimeRiskRuleConnectionPayload`

The return types for searching for realtime risk rules.

### `RealtimeRiskRuleEdge`

The edge type for a `RealtimeRiskRule`.

### `RealtimeRiskRuleRevisionsArgs`

The interface for a realtime risk rule. These rules execute in realtime during the authorization of a card transaction.

### `RecurringAchTransfer`

A scheduled recurring ACH transfer

### `RecurringAchTransferTransferEventsArgs`

A scheduled recurring ACH transfer

### `RedeemRewardsForStatementCreditInput`

Input type for redeeming reward points.

### `RedemptionCriteriaInput`

Redemption information required to redeem points.

### `ReevaluateApplicationInput`

The input for reevaluating a pre-existing, approved application

### `ReevaluateApplicationPayload`

The response type for reevaluating an existing, APPROVED application.

### `RefundCaptureStepInput`

Input for refunding a specific capture step on a payment transaction.

### `RefundCaptureStepPayload`

Result of refunding a specific capture step.

### `RefundPaymentTransactionInput`

Input for refunding a payment transaction.

### `RefundPaymentTransactionPayload`

Result of refunding a payment transaction.

### `ReissuePaymentCardFeaturesInput`

Options for specifying which attributes of the original card should be copied.

### `ReissuePaymentCardInput`

Details for issuing a new Payment Card based on an existing card.

### `ReissuePaymentCardMutation`

### `ReissuePaymentCardMutationVariables`

### `ReissuePaymentCardOptionsInput`

Options for the newly issued Payment Card.

### `ReissuePaymentCardPayload`

The return types when creating a new Payment Card based on an existing card.

### `RemoveCollaborativeAuthorizationEndpointInput`

The input to remove a `CollaborativeAuthorizationEndpoint`.

### `RemoveCollaborativeAuthorizationEndpointMutation`

### `RemoveCollaborativeAuthorizationEndpointMutationVariables`

### `RemoveCollaborativeAuthorizationEndpointPayload`

The return types when removing a `CollaborativeAuthorizationEndpoint`.

### `RemoveEmailFromNotificationTargetInput`

Input for removing the email for a notification target.

### `RemoveEmailFromNotificationTargetMutation`

### `RemoveEmailFromNotificationTargetMutationVariables`

### `RemoveEmailFromNotificationTargetPayload`

The return types when unsetting the email for a notification target.

### `RemoveNotificationTargetInput`

The input to delete a notification target.

### `RemoveNotificationTargetMutation`

### `RemoveNotificationTargetMutationVariables`

### `RemoveNotificationTargetPayload`

The return types when delete a notification target.

### `RemoveSubscriptionsFromNotificationTargetInput`

The input to remove subscriptions from a notification target.

### `RemoveSubscriptionsFromNotificationTargetMutation`

### `RemoveSubscriptionsFromNotificationTargetMutationVariables`

### `RemoveSubscriptionsFromNotificationTargetPayload`

The return types when removing subscriptions from a notification target.

### `RemoveUserInput`

Data needed to remove a new User.

### `RemoveUserPayload`

The possible return types of `removeUser`.

### `RenameCollaborativeAuthorizationEndpointInput`

The input to rename a `CollaborativeAuthorizationEndpoint`.

### `RenameCollaborativeAuthorizationEndpointMutation`

### `RenameCollaborativeAuthorizationEndpointMutationVariables`

### `RenameCollaborativeAuthorizationEndpointPayload`

The return types when renaming a `CollaborativeAuthorizationEndpoint`.

### `RenameNotificationTargetInput`

The input to update the name of an existing notification target.

### `RenameNotificationTargetMutation`

### `RenameNotificationTargetMutationVariables`

### `RenameNotificationTargetPayload`

The return types when updating the name of an existing notification target.

### `RepaymentFailedEvent`

The RepaymentFailedEvent notifies when ACH Repayments have failed to process.

### `RepaymentFinancialAccountFeature`

Whether or not the `FinancialAccount` supports repayment account feature.

### `RepaymentProcessedEvent`

The RepaymentProcessedEvent notifies when ACH Repayments are finished processing.

### `RepaymentProcessingEvent`

The RepaymentProcessingEvent notifies when ACH Repayments are processing.

### `RepaymentReturnedEvent`

The RepaymentReturnedEvent notifies when ACH Repayments are returned.

### `ReplayNotificationEventInput`

The input to replay a Notification Event.

### `ReplayNotificationEventMutation`

### `ReplayNotificationEventMutationVariables`

### `ReplayNotificationEventPayload`

The return types when replaying a Notification Event.

### `Report`

Describes the current status of a report and where it can be downloaded from.

### `ReportConnection`

The connection type for Report.

### `ReportDownload`

Contains information related to downloading a report.

### `ReportEdge`

The edge type for a Report.

### `ReportFilterInput`

Used to filter which reports are requested.

### `ReportParametersInput`

The parameters used to generate Report.

### `ReportParameterTimestampRangeInput`

The time range used to generate a report.
All external report requests must be supplied with this Parameter.
Timestamp value range in ISO 8601 format.

### `ReportStatusFilterInput`

Filters reports by `ReportStatus`.

### `ReportTypeFilterInput`

Filters reports by `ReportType`.

### `ReportUsage`

Provides information about the current usage of a report type.

### `RequestedDocuments`

Input for agent servicing application manual review requested documents.

### `RequestedIdentityAppliedUpdate`

Changes applied to a requested identity update.

### `RequestedIdentityUpdate`

A request to update an identity.

### `RequestedIdentityUpdateParty`

Identities that qualify for a requested update.

### `RequestedIdentityUpdateSource`

Sources that can refer a requested identity update.

### `ReserveHold`

A reserve hold on a `TransactionBatch`.

### `ResetBalanceFinancialAccountFeature`

Whether or not the `FinancialAccount` is enabled for reset balance.

### `ResetPseudoBalanceInput`

Input for resetting a pseudo balance back to zero or a baseline amount.
Used to manually trigger a balance reset outside of the automatic cadence.

### `ResetPseudoBalancePayload`

### `RestrictedAccountHolderSpendRule`

A Spend Control rule that blocks certain account holders during authorization.

### `RestrictedAccountHolderSpendRuleResult`

The result of applying a `RestrictedAccountHolderSpendRule` to an event.

### `RestrictedAccountHolderSpendRuleRevisionsArgs`

A Spend Control rule that blocks certain account holders during authorization.

### `RestrictedCardHolderSpendRule`

A Spend Control rule that blocks certain card holders during authorization.

### `RestrictedCardHolderSpendRuleResult`

The result of applying a `RestrictedCardHolderSpendRule` to an event.

### `RestrictedCardHolderSpendRuleRevisionsArgs`

A Spend Control rule that blocks certain card holders during authorization.

### `ReversalEvent`

An ReversalEvent for a transaction.

### `ReversedFeeTransfer`

Reversed fee transfer. Reversing the charged fee transfer.

### `ReviewWorkflowEvent`

An event representing the review process of a transfer. Use the `reviewState`
field to determine the current state of the review.

### `ReviewWorkflowEventConnection`

The connection type for `ReviewWorkflowEvent`.

### `ReviewWorkflowEventConnectionPayload`

The return types for finding `ReviewWorkflowEvents`

### `ReviewWorkflowEventEdge`

The edge type for `ReviewWorkflowEvent

### `ReviewWorkflowEventFilterInput`

Inputs for filtering `ReviewWorkflowEvents`.

### `ReviewWorkflowEventTransfer`

### `RevokeApiKeyInput`

Data needed to revoke an API Key.

### `RevokeApiKeyPayload`

The possible return types of `revokeAPIKey`.

### `RevolvingCardProductFeature`

Whether or not the `CardProduct` supports revolving.

### `RewardDefaultEarnRule`

`RewardEarnRule` that will hold default reward configuration for transfers that have not accrued points from other `RewardEarnRules`s.

### `RewardDefaultEarnRuleAttachmentsArgs`

`RewardEarnRule` that will hold default reward configuration for transfers that have not accrued points from other `RewardEarnRules`s.

### `RewardEarnRate`

The earn rate for reward points, describing the number of points earned per dollar spent.

### `RewardEarnRateInput`

The earn rate for reward points, describing the number of points earned per dollar spent.

### `RewardEarnRule`

Rule that holds configuration for how transactions should earn reward points.

### `RewardEarnRuleAttachmentsArgs`

Rule that holds configuration for how transactions should earn reward points.

### `RewardEarnRuleConnection`

The connection type for `RewardEarnRule`.

### `RewardEarnRuleEdge`

The edge type for a `RewardEarnRule`.

### `RewardMerchantCategoryEarnRule`

`RewardEarnRule` that will earn rewards on transfers for specific `MerchantCategory`s.

### `RewardMerchantCategoryEarnRuleAttachmentsArgs`

`RewardEarnRule` that will earn rewards on transfers for specific `MerchantCategory`s.

### `RewardPointsTransfer`

A transfer for the purposes of reward points

### `RewardPointsTransferConnection`

The connection type for `RewardPointsTransfer`.

### `RewardPointsTransferConnectionPayload`

The return types for finding transfer rules

### `RewardPointsTransferEdge`

The edge type for a `RewardPointsTransfer`.

### `RewardPointsTransferFailureStatus`

Information about reward points transfers which have failed.

### `RewardPointsTransferLedgersArgs`

A transfer for the purposes of reward points

### `RewardPointsTransferPayload`

The return types for finding transfer rules

### `RewardPointsTransferStatusDetails`

Details about the status of the reward points transfer.

### `RewardPointsTransferSuccessStatus`

The status of the reward points transfer that has not failed.

This could be statuses which are still pending work or that have successfully completed.

### `RewardRedemptionConfiguration`

`RewardRedemptionConfiguration` holds configuration for how rewards points could be redeemed.

### `RewardRedemptionConfigurationAttachment`

Attachment object that a `RewardRedemptionConfiguration` is attached to.

### `RewardRedemptionConfigurationAttachmentConnection`

The connection type for `RewardRedemptionConfigurationAttachment`.

### `RewardRedemptionConfigurationAttachmentEdge`

The edge type for a `RewardRedemptionConfigurationAttachment`.

### `RewardRedemptionConfigurationAttachmentInput`

Input for attaching `RewardRedemptionConfiguration` to an object.

### `RewardRedemptionConfigurationAttachmentsArgs`

`RewardRedemptionConfiguration` holds configuration for how rewards points could be redeemed.

### `RewardRedemptionConfigurationConnection`

The connection type for `RewardRedemptionConfiguration`.

### `RewardRedemptionConfigurationEdge`

The edge type for a `RewardRedemptionConfiguration`.

### `RewardRedemptionConfigurationProductAttachment`

`CardProduct` attachment that a `RewardRedemptionConfiguration` is attached to.

### `RewardRedemptionRate`

The redemption rate for reward points, describing the monetary value per point.

### `RewardRedemptionRateInput`

The redemption rate for reward points, describing the monetary value per point.

### `RewardRuleAttachment`

`RewardEarnRule` attachment object.

### `RewardRuleAttachmentConnection`

The connection type for `RewardRuleAttachment`.

### `RewardRuleAttachmentEdge`

The edge type for a `RewardRuleAttachment`.

### `RewardRuleAttachmentInput`

Input for attaching reward rules to an object.

### `RewardRuleProductAttachment`

`RewardEarnRule` attachment object attaching to a `CardProduct`

### `RiskAmountAmplitude`

Represents the amplitude or variability in monetary risk metrics.

### `RiskApplicationSdk`

The risk application sdk feature permission

### `RiskApplicationSdkRevision`

A revision of the risk application sdk feature permission

### `RiskApplicationSdkRevisionsArgs`

The risk application sdk feature permission

### `RiskApplicationSdkSessionToken`

Contains the necessary information to pass into the risk application sdk.

### `RiskBasedPricingPolicy`

The risk based pricing policy.

### `RiskCountAmplitude`

Represents the amplitude or variability in numerical risk counts.

### `RiskGeolocationDataPoint`

Defines a data point for geolocation scatter plots, including coordinates, label, and associated amplitude.

### `RiskGeolocationDensity`

Structure for holding geolocation density data points, used in visualizing the distribution of locations.

### `RiskGeolocationDensityFilterInput`

Input filter for querying density of geolocation data points, specifying account holder, aggregation type, and date range.

### `RiskGeolocationDensityPayload`

Union type for the response payload of the geolocation density query, which can include density points, user errors, or access denial messages.

### `RiskGeolocationPath`

Represents a geolocation path, comprising a sequence of data points to illustrate movement or trajectories.

### `RiskGeolocationPaths`

Structure for holding geolocation paths data, used in visualizing movement trajectories of the account holder.

### `RiskGeolocationPathsFilterInput`

Input filter for querying paths of geolocation data points, specifying account holder and date range.

### `RiskGeolocationPathsPayload`

Union type for the response payload of the geolocation paths query, which can include paths, user errors, or access denial messages.

### `RiskMoneyCoordinate`

Defines a monetary data point's coordinates for a scatter plot, including amount and potential anomalies indicated by error.

### `RiskMoneyScatterDataPoint`

Represents a single data point in a scatter plot, encapsulating the coordinates and other pertinent information for visualization.

### `RiskPositionalCoordinate`

Defines a data point's coordinates for a scatter plot, including position and potential anomalies indicated by error.

### `RiskPositionalScatterDataPoint`

Represents a single data point in a scatter plot, encapsulating the coordinates and other pertinent information for visualization.

### `RiskSankeyAmountValue`

Represents the value in monetary risk metrics.

### `RiskSankeyCountValue`

Represents the value in numerical risk counts.

### `RiskScatterDataPoints`

The `RiskScatterDataPoints` type defines the structure of the response when querying for scatter data points. This type
encapsulates various attributes necessary for plotting data points on a scatter plot, including information about each
data point and any metadata that may be relevant to the visualization

### `RiskScatterDataPointsFilterInput`

Input filter for retrieving scatter plot data, specifying criteria like account holder, periodicity, aggregation, and date range.

### `RiskScatterDataPointsPayload`

Union type for the response payload of the scatter data points query, which can include data points, user errors, or access denial messages.

### `RiskSmsMessage`

An SMS message associated with a risk transaction event.

### `RiskSmsMessageConnection`

The connection type for `RiskSmsMessage`.

### `RiskSmsMessageConnectionPayload`

The return types when querying for SMS messages by transaction risk event.

### `RiskSmsMessageEdge`

An edge for a `RiskSmsMessage`.

### `RotateNotificationTargetSigningKeyInput`

Input for removing the email for a notification target.

### `RotateNotificationTargetSigningKeyMutation`

### `RotateNotificationTargetSigningKeyMutationVariables`

### `RotateNotificationTargetSigningKeyPayload`

The return types when removing subscriptions from an existing webhook
notification target.

### `RtpTransfer`

An RTP (Real-Time Payments) transfer via the TCH network.

### `RtpTransferBankTransferDetails`

Additional details for an `RtpTransfer`.

### `RtpTransferDestination`

The destination of the funds in an `RtpTransfer`.

### `RtpTransferDestinationNode`

The possible destination nodes for an `RtpTransfer`.

### `RtpTransferSource`

The source of the funds in an `RtpTransfer`.

### `RtpTransferSourceNode`

The possible source nodes for an `RtpTransfer`.

### `RuleCollection`

A `RuleCollection` is a set of `SpendRule`, `TransferRule`, `InterFinancialAccountTransferRule`, `RiskRule`,
`VelocityRule`, `VelocityRiskRule`, `VelocityTransferRule`, and/or `VelocityInterFinancialAccountTransferRule`
that can be used as a template to attach to a `PaymentCard`, `FinancialAccount`, `CardProduct` or `Platform`
in 1 operation

### `RuleCollectionRevision`

A `RuleCollectionRevision` is a specific version of a `RuleCollection`.

### `SankeyDataLink`

Defines a single link in a Sankey diagram, including source and target nodes, and the value representing the flow between them.

### `SankeyDataPoints`

Structure for Sankey diagram data points, including nodes and links that illustrate the flow of money or other metrics.

### `SardineIdentityRiskScore`

Values associated with the sardine assessing risk

### `Scalars`

All built-in and custom scalars, mapped to their actual values

### `ScheduledTransfer`

### `ScheduledTransferAchEvent`

A scheduled transfer event that executed on the ACH rails.

### `ScheduledTransferConnection`

The connection type for Scheduled Transfer.

### `ScheduledTransferEdge`

The edge type for a `ScheduledTransfer`.

### `ScheduledTransferEvent`

An interface for a scheduled transfer event

### `ScheduledTransferEventConnection`

The connection type for Scheduled Transfer Event.

### `ScheduledTransferEventEdge`

The edge type for a `ScheduledTransferEvent`.

### `SchemaChange`

Details of a change to a specific schema path

### `SchemaChangeCriticality`

The criticality of the `SchemaChange`

### `SchemaChangelog`

The schema changes for a specific deploy timestamp.

### `SchemaChangelogConnection`

The connection type for `SchemaChangelogs`.

### `SchemaChangelogEdge`

The edge type for `SchemaChangelogs`.

### `SchemaChangesForRootPath`

The schema changes for a specified schema `rootPath`

### `ScopedCustomerAddressToken`

A short lived token representing the customer address to a scope of usage.

### `ScopedCustomerAddressTokenPayload`

Types to expect while requesting a scoped payment method token.

### `ScopedPaymentMethodToken`

A short lived token representing the payment method limited to a scope of usage.

### `ScopedPaymentMethodTokenPayload`

Types to expect while requesting a scoped payment method token.

### `ScriptRealtimeRiskRule`

A realtime script-based risk rule. These rules execute in realtime during the
authorization of a card transaction.

### `ScriptRealtimeRiskRuleRevisionsArgs`

A realtime script-based risk rule. These rules execute in realtime during the
authorization of a card transaction.

### `Sdk`

### `SdkFunctionWrapper`

### `SearchBusinessAccountHoldersQuery`

### `SearchBusinessAccountHoldersQueryVariables`

### `SearchCardProductApplicationConnection`

The connection type for `CardProductApplication` search.

### `SearchCardProductApplicationEdge`

The edge type for a `CardProductApplication`.

### `SearchPersonAccountHoldersQuery`

### `SearchPersonAccountHoldersQueryVariables`

### `SearchQueryLanguageInput`

Used to search using the Highnote `SearchQueryLanguage`.

### `SeasonalVolumeBreakdown`

Breakdown of seasonal volumme by month

### `SecretApiKeyInput`

Details of the new Secret Key

### `SecureCardBalanceRepaymentAchTransfer`

A transfer that refills the balance on a secure card.

### `SecureCardBalanceRepaymentAchTransferEvent`

A financial event that represents card balance repayment ACH transfer.

### `SecureCardBalanceRepaymentAchTransferLedgersArgs`

A transfer that refills the balance on a secure card.

### `SecuredCreditPaymentCardFinancialAccountFeature`

Whether or not the Financial Account supports a Secured Credit Deposit funded Credit Payment Card.

### `SecuredDepositCardProductFeature`

Whether or not the `CardProduct` supports secured deposits.

### `SecuredDepositCommercialCreditCardFinancialAccountStatement`

Statement for secured deposit commercial credit card accounts

### `SecuredDepositCommercialCreditCardFinancialAccountStatementEntry`

Statement entry for secured commercial credit card

### `SecuredDepositCommercialCreditCardFinancialAccountStatementSnapshot`

Current account snapshot for a secured deposit commercial credit card

### `SecuredDepositCommercialCreditCardFinancialAccountStatementStatementEntriesArgs`

Statement for secured deposit commercial credit card accounts

### `SecuredDepositFinancialAccountFeature`

Whether or not the `FinancialAccount` supports secured deposits.

### `SecureDeposit`

Externally Initiated Secure Deposit transfer

### `SecureDepositAchTransfer`

Originated SecureDeposit transfer

### `SecureDepositAchTransferEvent`

A financial event that represents secure deposit transfer.

### `SecureDepositAchTransferLedgersArgs`

Originated SecureDeposit transfer

### `SecureDepositCanceledEvent`

The SecureDepositCanceledEvent notifies when ACH Secure Deposits are canceled.

### `SecureDepositFailedEvent`

The SecureDepositFailedEvent notifies when ACH Secure Deposits have failed to process.

### `SecureDepositInitiatedEvent`

The SecureDepositInitiatedEvent notifies when ACH Secure Deposits are initiated.

### `SecureDepositLedgersArgs`

Externally Initiated Secure Deposit transfer

### `SecureDepositProcessedEvent`

The SecureDepositProcessedEvent notifies when ACH Secure Deposits are finished processing.

### `SecureDepositProcessingEvent`

The SecureDepositProcessingEvent notifies when ACH Secure Deposits are processing.

### `SecureDepositReturnedEvent`

The SecureDepositReturnedEvent notifies when ACH Secure Deposits are returned.

### `SecureDepositTransferEvent`

A financial event that represents a non-originated secure deposit transfer.

### `ServicemembersCivilReliefActConfiguration`

The Servicemembers Civil Relief Act (SCRA) configuration.

### `SetEmailForNotificationTargetInput`

Input for setting the email for a notification target.

### `SetEmailForNotificationTargetMutation`

### `SetEmailForNotificationTargetMutationVariables`

### `SetEmailForNotificationTargetPayload`

The return types when setting the email for a notification target.

### `SetPinForPaymentCardInput`

Input fields for setting the pin on a payment card

### `SetPinForPaymentCardPayload`

Types which can be returned when setting the pin on a payment card

### `SetPseudoLimitInput`

Input for setting an absolute spending limit on a pseudo balance.
Replaces the current limit with a new fixed amount.

### `SetPseudoLimitPayload`

### `SignedAmount`

Monetary amount where the currency is used to express the expectations for the number of decimal places. See [ISO Standard Currency Codes](https://en.wikipedia.org/wiki/ISO_4217#Active_codes) for more information. This type is identical to `Amount`, but can also represent negative values.

### `SignedMoneyFilterInput`

Money value type the allows for positive or negative values

### `SignedMoneyFilterInputRange`

Money value range (inclusive)

### `SigningKey`

A key used to sign the notification payload.

### `SimulateAchTransferProcessingInput`

Input details when simulating the processing of an `OriginatedAchTransfer` or `NonOriginatedAchTransfer`.

### `SimulateAchTransferProcessingMutation`

### `SimulateAchTransferProcessingMutationVariables`

### `SimulateAchTransferProcessingPayload`

The return types when simulating the processing of an `OriginatedAchTransfer` or `NonOriginatedAchTransfer`.

### `SimulateAchTransferReturnInput`

Input details when simulating the return of an `OriginatedAchTransfer` or `NonOriginatedAchTransfer`.

### `SimulateAchTransferReturnMutation`

### `SimulateAchTransferReturnMutationVariables`

### `SimulateAchTransferReturnPayload`

The return types when simulating the return of an `OriginatedAchTransfer` or `NonOriginatedAchTransfer`.

### `SimulateAdditionalNetworkDataInput`

Simulate network specific transaction data.

### `SimulateAdjustmentInput`

Details to simulate an adjustment event for a transaction.

### `SimulateAdjustmentMutation`

### `SimulateAdjustmentMutationVariables`

### `SimulateAdjustmentPayload`

### `SimulateApplicationDocumentReviewInput`

An input representing the parts of a simulated update to review status on a previously created AccountHolderApplicationDocument.

### `SimulateApplicationDocumentReviewMutation`

### `SimulateApplicationDocumentReviewMutationVariables`

### `SimulateApplicationDocumentReviewPayload`

Response type for a simulated update to an `ApplicationDocument`.

### `SimulateApplicationManualReviewPayload`

The possible return types of `SimulateApplicationManualReviewPayload`.

### `SimulateApplicationStatusChangeInput`

An input representing the parts of a simulated update to application status on a previously created Card Product Application.

### `SimulateApplicationStatusChangeMutation`

### `SimulateApplicationStatusChangeMutationVariables`

### `SimulateApplicationUpdatePayload`

Response type for a simulated update to an `AccountHolderCardProductApplication`.

### `SimulateApplicationVerificationStatusChangeInput`

An input representing the parts of a simulated update to verification status for an Account Holder on a previously created Card Product Application.

### `SimulateApplicationVerificationStatusChangeMutation`

### `SimulateApplicationVerificationStatusChangeMutationVariables`

### `SimulateAuthAndClearPayload`

### `SimulateAuthorizationAdvicePayload`

### `SimulateAuthorizationInput`

Details to simulate the authorization.

### `SimulateAuthorizationMutation`

### `SimulateAuthorizationMutationVariables`

### `SimulateAuthorizationPayload`

### `SimulateBackwardShiftAndAgeCurrentFinancialAccountStatementPeriodInput`

Input fields for shifting the current statement period backward and aging the Financial Account.

### `SimulateCardDigitalWalletTokenActivatedInput`

Input to simulate a card digital wallet token activation.

### `SimulateCardDigitalWalletTokenActivationInput`

Input to simulate a card digital wallet token activation.

### `SimulateCardDigitalWalletTokenPayload`

Simulate card digital wallet token payload.

### `SimulateCheckbookUserVerificationInput`

The input for `simulateCheckbookUserVerification`.

### `SimulateCheckbookUserVerificationPayload`

### `SimulateCheckbookUserVerificationSuccess`

Successful result of simulating a checkbook user verification.

### `SimulateCheckPaymentEventChangePayload`

### `SimulateCheckPaymentEventInput`

The input for `simulateCheckPaymentEvent`. This will trigger a webhook.

### `SimulateClearingInput`

Details to simulate the clearing.

### `SimulateClearingMutation`

### `SimulateClearingMutationVariables`

### `SimulateClearingPayload`

### `SimulateCloseFinancialAccountInput`

Details for simulating `FinancialAccount` closure.

### `SimulateCloseFinancialAccountMutation`

### `SimulateCloseFinancialAccountMutationVariables`

### `SimulateCloseFinancialAccountPayload`

The return types for `simulateCloseFinancialAccount`

### `SimulateCreateAndActivateFeeScheduleInput`

Simulated fee schedule input.

### `SimulateCreateAndActivateFeeSchedulePayload`

Response type for simulate create fee schedule.

### `SimulateCreateApplicationDocumentsUploadSessionsInput`

Input for simulate creating application documents upload sessions.

### `SimulateCreateApplicationDocumentsUploadSessionsMutation`

### `SimulateCreateApplicationDocumentsUploadSessionsMutationVariables`

### `SimulateDepositInput`

The details to simulate a electronic fund transfer in the test environment.

### `SimulateDepositMutation`

### `SimulateDepositMutationVariables`

### `SimulateDepositPayload`

The return types when simulating electronic funds transfers into an Organization's account.

WARNING: Transfer is deprecated. ElectronicFundsTransfer should be used instead.

### `SimulatedFeeAmountInput`

Fee amount to be charged.

### `SimulateDigitalWalletTokenAuthorizationInput`

Details to simulate authorization using a digital wallet token.

### `SimulateDigitalWalletTokenMastercardFleetAuthorizationInput`

Details to simulate a Mastercard Fleet authorization using a digital wallet token.

### `SimulateDigitalWalletTokenSingleStepAuthAndClearInput`

Details to simulate authorization and clear using a digital wallet token.

### `SimulateDigitalWalletTokenVisaFleetAuthorizationInput`

Details to simulate a Visa Fleet authorization using a digital wallet token. Allows for partial authorizations.

### `SimulateEnhancedDataPayload`

### `SimulateExternallyInitiatedAchTransferInput`

Input for creating a new simulated `ExternallyInitiatedACHTransfer`.

This is used only for testing.

### `SimulateExternallyInitiatedAchTransferMutation`

### `SimulateExternallyInitiatedAchTransferMutationVariables`

### `SimulateFeeConfigurationInput`

Simulated fee configuration input.

### `SimulateFinalizeProvisionalCreditForCardTransactionDisputeInput`

Input for `simulateFinalizeProvisionalCreditForCardTransactionDispute`.

### `SimulateFinancialAccountAgingPayload`

Types which can be returned for simulating account aging.

### `SimulateFinancialAccountStatementPayload`

Types which can be returned for simulating statement period shift and rollover

### `SimulateInitiateCardTransactionChargebackInput`

Input for `simulateInitiateCardTransactionChargeback`.

### `SimulateInitiateCardTransactionDisputeInput`

Input for `simulateInitiateCardTransactionDispute`.

### `SimulateInitiateFinancialAccountClosureInput`

Details for simulating initiation of `FinancialAccount` closure.

### `SimulateInitiateFinancialAccountClosureMutation`

### `SimulateInitiateFinancialAccountClosureMutationVariables`

### `SimulateInitiateFinancialAccountClosurePayload`

The return types for `simulateInitiateFinancialAccountClosure`

### `SimulateIssueCreditForCardTransactionDisputeInput`

Input for `simulateIssueCreditForCardTransactionDispute`.

### `SimulateIssueProvisionalCreditForCardTransactionDisputeInput`

Input for `simulateIssueProvisionalCreditForCardTransactionDispute`.

### `SimulateMastercardAdditionalFuelLocationDetailsInput`

Details about the fuel location used in a fleet transaction.

### `SimulateMastercardAdditionalNetworkDataInput`

Simulate Mastercard network specific transaction data.

### `SimulateMastercardFleetAuthorizationAdviceInput`

Details to simulate the authorization advice of a Mastercard Fleet transaction.

### `SimulateMastercardFleetAuthorizationDataFuelProductInput`

Details of a Mastercard Fleet fuel product available at Authorization and Authorization Advice time

### `SimulateMastercardFleetAuthorizationDataInput`

Details pertaining to a Mastercard Fleet transaction available at Authorization and Authorization Advice time

### `SimulateMastercardFleetAuthorizationDataNonFuelProductInput`

Details of a Mastercard Fleet non-fuel product available at Authorization and Authorization Advice time

### `SimulateMastercardFleetAuthorizationInput`

Details to simulate a Mastercard Fleet authorization. Allows for partial authorizations

### `SimulateMastercardFleetClearingEnhancedDataInput`

Details to simulate Mastercard Fleet enhanced transaction data included with a clearing. Same as `SimulateMastercardFleetEnhancedDataInput` but without the `transactionId` since it is already provided on the parent input.

### `SimulateMastercardFleetClearingInput`

Details to simulate the clearing of a Mastercard Fleet transaction.

### `SimulateMastercardFleetEnhancedDataInput`

Details to simulate Mastercard Fleet enhanced transaction data. These are relevant additional transaction data items pertaining to a fleet transaction.

### `SimulateMastercardFleetEnhancedDataLineItemInput`

An single simulated line item within a `MastercardFleetEnhancedData`

### `SimulateMastercardFleetPromptInput`

Details of a Mastercard Fleet Prompt. Contains a prompt code and cardholder-entered value

### `SimulateNonOriginatedAchTransferInput`

Input for creating a new simulated `ExternallyInitiatedACHTransfer`.

This is used only for testing.

### `SimulateNonOriginatedAchTransferMutation`

### `SimulateNonOriginatedAchTransferMutationVariables`

### `SimulateNonOriginatedAchTransferPayload`

The return types when simulating receiving a `NonOriginatedAchTransfer`.

### `SimulatePaymentCardTransactionDisputePayload`

The possible return types of `SimulatePaymentCardTransactionDisputePayload`.

### `SimulatePhysicalCardGroupOrderApprovalInput`

Input fields for simulating approval

### `SimulatePhysicalCardGroupOrderPayload`

Types which can be returned for simulating physical card group orders

### `SimulatePhysicalCardGroupOrderSendToPrinterInput`

Input fields for simulating sending to printer

### `SimulatePhysicalCardGroupOrderShipmentFailedInput`

Input fields for simulating shipment failed

### `SimulatePhysicalCardGroupOrderShippedInput`

Input fields for simulating shipped

### `SimulatePhysicalPaymentCardApprovalInput`

Input fields for simulating approval

### `SimulatePhysicalPaymentCardOrderApprovalMutation`

### `SimulatePhysicalPaymentCardOrderApprovalMutationVariables`

### `SimulatePhysicalPaymentCardOrderSendToPrinterMutation`

### `SimulatePhysicalPaymentCardOrderSendToPrinterMutationVariables`

### `SimulatePhysicalPaymentCardOrderShipmentFailedMutation`

### `SimulatePhysicalPaymentCardOrderShipmentFailedMutationVariables`

### `SimulatePhysicalPaymentCardOrderShippedMutation`

### `SimulatePhysicalPaymentCardOrderShippedMutationVariables`

### `SimulatePhysicalPaymentCardPayload`

Types which can be returned for simulating physical payment card orders

### `SimulatePhysicalPaymentCardSendToPrinterInput`

Input fields for simulating sending to printer

### `SimulatePhysicalPaymentCardShipmentFailedInput`

Input fields for simulating shipment failed

### `SimulatePhysicalPaymentCardShippedInput`

Input fields for simulating shipped

### `SimulatePricingPlanInput`

The input details for simulating a `PricingPlan`.

### `SimulatePricingPlanPayload`

The result of simulating a `PricingPlan`.
Returns the simulation results or error details.

### `SimulateProcessedIntegratorInitiatedStatusChangeInput`

Input for changing the status of an `IntegratorInitiatedACHTransfer` to `PROCESSED`.

This will fail if the status of the transfer is not `PROCESSING`.

### `SimulateProcessedIntegratorInitiatedStatusChangePayload`

The return types when changing an `IntegratorInitiatedACHTransfer` from `PROCESSING` to `PROCESSED`.

### `SimulateProcessingExternallyInitiatedStatusChangeInput`

Input for changing the status of an `ExternallyInitiatedACHTransfer` to `PROCESSING`.

This will fail if the status of the transfer is not `PENDING`.

### `SimulateProcessingIntegratorInitiatedStatusChangeInput`

Input for changing the status of an `IntegratorInitiatedACHTransfer` to `PROCESSING`.

This will fail if the status of the transfer is not `INITIATED`.

### `SimulateProcessingIntegratorInitiatedStatusChangePayload`

The return types when changing an `IntegratorInitiatedACHTransfer` from `INITIATED` to `PROCESSING`.

### `SimulateRefundInput`

Details to simulate the authorization reversal.

### `SimulateRefundMutation`

### `SimulateRefundMutationVariables`

### `SimulateRefundPayload`

### `SimulateResolvePaymentCardTransactionChargebackInput`

Input for `simulateResolvePaymentCardTransactionChargeback`

### `SimulateReturnedIntegratorInitiatedStatusChangeInput`

Input for changing the status of an `IntegratorInitiatedACHTransfer` to `RETURNED`.

This will fail if the status of the transfer is not `PROCESSING`.

### `SimulateReturnedIntegratorInitiatedStatusChangePayload`

The return types when changing an `IntegratorInitiatedACHTransfer` from `PROCESSING` to `RETURNED`.

### `SimulateReversalInput`

Details to simulate the authorization reversal.

### `SimulateReversalMutation`

### `SimulateReversalMutationVariables`

### `SimulateReversalPayload`

### `SimulateRolloverCurrentFinancialAccountStatementPeriodInput`

Input fields for rolling over the current statement period

### `SimulateShiftCurrentFinancialAccountStatementPeriodInput`

Input fields for shifting the current statement period

### `SimulateSingleStepAuthAndClearInput`

Details to simulate the authorization and clear.

### `SimulateSingleStepAuthAndClearMutation`

### `SimulateSingleStepAuthAndClearMutationVariables`

### `SimulateUpdateCardTransactionDisputeInput`

Input for `simulateUpdateCardTransactionDispute`.

### `SimulateUpdatePaymentCardTransactionChargebackInput`

Input for `SimulateUpdatePaymentCardTransactionChargebackInput`.

### `SimulateVisaAdditionalNetworkDataInput`

Simulate Visa network specific transaction data.

### `SimulateVisaFleetAuthorizationAdviceInput`

Details to simulate the authorization advice of a Visa Fleet transaction.

### `SimulateVisaFleetAuthorizationDataInput`

Details pertaining to a Visa Fleet transaction available at Authorization and Authorization Advice time

### `SimulateVisaFleetAuthorizationInput`

Details to simulate a Visa Fleet authorization. Allows for partial authorizations

### `SimulateVisaFleetClearingInput`

Details to simulate the clearing of a Visa Fleet transaction.

### `SimulateVisaFleetL3EnhancedDataDiscountInput`

Discount fields for simulating Visa Fleet Level 3 transaction data.

### `SimulateVisaFleetL3EnhancedDataDutyInput`

Duty fields for simulating Visa Fleet Level 3 transaction data.

### `SimulateVisaFleetL3EnhancedDataInput`

Simulated Visa Fleet Level 3 transaction data. These are relevant additional transaction data items pertaining to a fleet transaction.

### `SimulateVisaFleetL3EnhancedDataInvoiceInput`

Invoice fields for simulating Visa Fleet Level 3 transaction data.

### `SimulateVisaFleetL3EnhancedDataLineItemInput`

An single simulated line item within a `VisaFleetL3EnhancedData`

### `SimulateVisaFleetL3EnhancedDataPayload`

### `SimulateVisaFleetL3EnhancedDataShippingInput`

Shipping related fields for simulating Visa Fleet Level 3 transaction data.

### `SimulateVisaFleetL3EnhancedDataTaxInput`

Tax fields for simulating Visa Fleet Level 3 transaction data.

### `SoundsLikeFilterInput`

String value type accepting similar sounding data

### `SpendRule`

### `SpendRuleConnection`

The connection type for Spend Rule.

### `SpendRuleContainer`

A container that holds a `SpendRule`.

### `SpendRuleEdge`

The edge type for a SpendRule.

### `SpendRuleResult`

The result of applying a spend rule to an event.

### `SpendRuleResultConnection`

The connection type for `SpendRuleResult`.

### `SpendRuleResultEdge`

Edge for `SpendRuleResult`.

### `SpendRuleRevisionsArgs`

### `StartDocumentUploadSessionInput`

The input to start a document upload session.

### `StartDocumentUploadSessionMutation`

### `StartDocumentUploadSessionMutationVariables`

### `StartDocumentUploadSessionPayload`

The return types when a document upload session is started.

### `StreetAddressSpendRule`

A Spend Control rule that allows or blocks certain AVS response codes during authorizations.

**Note** A `StreetAddressSpendRule` only applies to street numbers. To control postal codes, use `PostalCodeSpendRule`.

### `StreetAddressSpendRuleResult`

The result of applying a street address spend rule to an event.

### `StreetAddressSpendRuleRevisionsArgs`

A Spend Control rule that allows or blocks certain AVS response codes during authorizations.

**Note** A `StreetAddressSpendRule` only applies to street numbers. To control postal codes, use `PostalCodeSpendRule`.

### `StringFilterInput`

String value type

### `StringSearchFilterInput`

String value type to provide matching of the text

### `SuspendCardDigitalWalletTokenInput`

The input to suspend a card digital wallet token.

### `SuspendCardDigitalWalletTokenPayload`

The return types when suspending a card digital wallet token.

### `SuspendFinancialAccountInput`

The input details for suspending a `FinancialAccount`.

### `SuspendFinancialAccountMutation`

### `SuspendFinancialAccountMutationVariables`

### `SuspendPaymentCardInput`

The details of the Payment Card to suspend.

### `SuspendPaymentCardMutation`

### `SuspendPaymentCardMutationVariables`

### `SuspendPaymentCardPayload`

The return types when suspending a Payment Card.

### `SuspenseFinancialAccountFeature`

Whether or not the `FinancialAccount` is enabled as a suspense account.

### `TaxIdentificationDocument`

A type representing the parts of a tax identification number (e.g. SSN, TIN, EIN).

### `TaxIdentificationDocumentInput`

An input representing the parts of a tax identification number (e.g. SSN, TIN, EIN).

### `TerminateCardDigitalWalletTokenInput`

The input to terminate a card digital wallet token.

### `TerminateCardDigitalWalletTokenPayload`

The return types when terminating a card digital wallet token.

### `TimestampFilterInput`

Timestamp value type in ISO 8601 format

### `TimestampFilterInputRange`

Timestamp value range in ISO 8601 format

### `TokenizeAddressInput`

Input representing parts of an address for tokenization.

### `TokenizeCardPaymentMethodCardHolderInput`

Input for tokenizing a card payment method's card holder information.

### `TokenizeCardPaymentMethodInput`

Input for tokenizing a payment card.

### `TokenizeCardPaymentMethodPayload`

Result of tokenizing a payment card.

### `TokenizePhoneInput`

Input representing parts of a phone number for tokenization.

### `TokenizeUsBusinessAccountHolderPayload`

Response type for tokenizing a USBusinessAccountHolder.

### `TokenizeUsPersonAccountHolderPayload`

Response type for tokenizing a USPersonAccountHolder.

### `TokenizeUsPersonAuthorizedUserPayload`

Response type for tokenizing a USPersonAuthorizedUser.

### `Transaction`

The possible types of transactions.

### `TransactionBatch`

A `TransactionBatch` groups `PaymentTransaction`s for settlement and payout.

### `TransactionBatchFee`

Fee associated with a `PaymentTransaction`.

### `TransactionBatchProcessingFee`

A processing fee on a `TransactionBatch`.

### `TransactionBusinessMetricAttribute`

Describes attributes of a transaction metric.

### `TransactionEvent`

### `TransactionEventConnection`

The connection type for `TransactionEvent`.

### `TransactionEventEdge`

The edge type for a `TransactionEvent`.

### `TransactionEventFilterInput`

TransactionEventFilter value type

### `TransactionEventResponseCodeFilterInput`

Input for filtering transaction event response code

### `TransactionEventsFilterInput`

Inputs for filtering transaction events.

### `TransactionFee`

Details about a fee applied to a transaction.

### `TransactionFeeInput`

Details about a fee applied to a simulated transaction.

### `TransactionSearchFilterInput`

Inputs for filtering `TransactionSearchResults`.

### `TransactionSearchResult`

Represents a normalized object that has common fields shared
across all `Transaction` and `TransactionEvent` types

### `TransactionSearchResultConnection`

The connection type for `TransactionSearchResult`

### `TransactionSearchResultEdge`

The edge type for `TransactionSearchResult`

### `TransactionSearchResultPayload`

### `TransactionSearchSource`

### `TransactionTypeFilterInput`

Input for filtering transaction type

### `Transfer`

A movement of money within the Highnote platform.

DEPRECATED: Use type ElectronicFundsTransfer instead.

### `TransferAgreementConsentInput`

Input to consent to the transfer agreement.

### `TransferAgreementConsentTemplateInput`

The template of the transfer agreement consent.

### `TransferAmountCalculation`

The strategy used to calculate the amount to be transferred

### `TransferAmountStrategy`

### `TransferDateStrategyInput`

A strategy for scheduling the transfer date. Only one of the strategies below should be requested.

### `TransferDayStrategyInput`

A strategy for scheduling the transfer day. Only one of the strategies below should be requested.

### `TransferFundsBankTransferDetailsInput`

Additional details for bank-to-bank transfers (RTP, ACH).

### `TransferFundsCustomerFeeDestinationInput`

Account reference for a customer fee destination.

### `TransferFundsCustomerFeeInput`

Input for a customer fee to be collected as part of the transfer.

### `TransferFundsCustomerFeeSourceInput`

Account reference for a customer fee source.

### `TransferFundsDestinationInput`

Destination for a direct transfer.

### `TransferFundsInput`

Input for `transferFunds` mutation.

One of `source.amount` or `destination.amount` must be provided, but not both.
The other amount will be calculated based on the remaining amount after fees.

### `TransferFundsPayload`

The possible results of `transferFunds`.

### `TransferFundsPaymentStrategyInput`

Payment strategy configuration.

### `TransferFundsSourceInput`

Source of funds for a direct transfer.

### `TransferFundsUsBankAccountInput`

Raw US bank account input.

### `TransferLedgersArgs`

A movement of money within the Highnote platform.

DEPRECATED: Use type ElectronicFundsTransfer instead.

### `TransferPurposeInterFinancialAccountTransferRule`

A `InterFinancialAccountTransferRule` that will block an inter financial account transfer if the transfer purpose is not allowed or blocked.

### `TransferPurposeInterFinancialAccountTransferRuleResult`

Result of `TransferPurposeInterFinancialAccountTransferRule`

### `TransferPurposeInterFinancialAccountTransferRuleRevisionsArgs`

A `InterFinancialAccountTransferRule` that will block an inter financial account transfer if the transfer purpose is not allowed or blocked.

### `TransferredEventNode`

### `UltimateBeneficialOwnerAddressFilterInput`

Input for filtering by `USBusinessUltimateBeneficialOwner`'s `Address`.

### `UnderwriterAdverseDecision`

A type representing an adverse underwriting decision.

### `UnderwriterDecision`

The underwriting decision. Can be positive or adverse.

### `UnderwriterPositiveDecision`

A type representing a positive underwriting decision.

### `UndeterminedFeePaymentTransactionFee`

This fee is undetermined. Contact Highnote to get more details about this fee.

### `UnifiedFundsTransfer`

`UnifiedFundsTransfer` is a common type object used to transfer money between multiple objects.

Once the transfer has started, use `UnifiedFundsTransfer.transfer` to view the actual transfer between the source and destination objects.

### `UnifiedFundsTransferCryptoFundingFlowStep`

A step associated with a `UnifiedFundsTransfer` when a `CryptoFundingFlow` is being processed.

### `UnifiedFundsTransferDestination`

The destination of the funds being transferred.

### `UnifiedFundsTransferDestinationInput`

The destination of the funds to transfer.

One of `id` or `usBankAccount` must be provided.

### `UnifiedFundsTransferDestinationNode`

The possible destinations of the `UnifiedFundsTransfer`.

### `UnifiedFundsTransferDetail`

Detail about the transfer.

### `UnifiedFundsTransferInitiateRequestStep`

A step associated with a `UnifiedFundsTransfer` when the request was initiated.

### `UnifiedFundsTransferInstantNetworkTransferStep`

A step associated with a `UnifiedFundsTransfer` when a transfer has initiated.

### `UnifiedFundsTransferQuote`

A quote generated by `createUnifiedFundsTransferQuote`. This is the first step towards transferring funds.
Show this quote to your customer for them to accept.

Once the quote is accepted, call `initiateUnifiedFundsTransfer` with the `UnifiedFundsTransferQuote.id` to initiate the transfer.

### `UnifiedFundsTransferRtpStep`

A step associated with a `UnifiedFundsTransfer` when an RTP (Real-Time Payments) transfer has initiated.

### `UnifiedFundsTransferSource`

The source of the funds to transfer.

### `UnifiedFundsTransferSourceInput`

The source of the funds to transfer.

One of `id` or `usBankAccount` must be provided.

### `UnifiedFundsTransferSourceNode`

The possible sources of the `UnifiedFundsTransfer`.

### `UnifiedFundsTransferStep`

### `UnifiedFundsTransferStepTransfer`

The types of transfers that the `UnifiedFundsTransfer` may start.

### `UnsignedIntegerRange`

The range type for `UnsignedInt`.

### `UnsuspendCardDigitalWalletTokenInput`

The input to unsuspend a card digital wallet token.

### `UnsuspendCardDigitalWalletTokenPayload`

The return types when unsuspending a card digital wallet token.

### `UnsuspendFinancialAccountInput`

The input details for unsuspending a `FinancialAccount`.

### `UnsuspendFinancialAccountMutation`

### `UnsuspendFinancialAccountMutationVariables`

### `UpcomingBillingCycleConfiguration`

The anticipated configuration values for the next upcoming billing cycle.

### `UpcomingStatementDueDateEvent`

Event generated when a `FinancialAccountStatement` has an upcoming due date.

### `UpdateAccountHolderCardProductApplicationOffersInput`

The input to request to update `AccountHolderCardProductApplicationOffer` on an `AccountHolderCardProductApplication`

### `UpdateAccountSpendRuleInput`

The details of the `AccountSpendRule` you want to update.

### `UpdateAccountSpendRulePayload`

The return types when updating an existing `AccountSpendRule`.

### `UpdateAccountTransactionCountSpendRuleInput`

The details of the `AccountTransactionCountSpendRule` spend rule you want to update.

### `UpdateAccountTransactionCountSpendRulePayload`

The return types when updating an existing `AccountTransactionCountSpendRule`.

### `UpdateAmountLimitSpendRuleInput`

The details of the `AmountLimitSpendRule` spend rule you want to update.

### `UpdateAmountLimitSpendRulePayload`

The return types when updating an existing amount limit rule.

### `UpdateApplicationOfferInput`

A single offer update.

### `UpdateCardDataInputCapabilitySpendRuleInput`

The details of the `CardDataInputCapabilitySpendRule` spend rule to update.

### `UpdateCardDataInputCapabilitySpendRulePayload`

The return types when updating an existing `CardDataInputCapabilitySpendRule`.

### `UpdateCardProductNameInput`

The details of the Card Product name change.

### `UpdateCardProductNamePayload`

The return types when updating a Card Product name.

### `UpdateCardTransactionProcessingTypeConditionSpendRuleInput`

The details of the `CardTransactionProcessingTypeConditionSpendRule` to update

### `UpdateCardTransactionProcessingTypeConditionSpendRulePayload`

The return types when updating an existing `CardTransactionProcessingTypeConditionSpendRule`.

### `UpdateConditionalRuleSetSpendRuleInput`

The details of the `ConditionalRuleSetSpendRule` to update

### `UpdateConditionalRuleSetSpendRulePayload`

The return types when updating a conditional rule set rule.

### `UpdateCountLimitSpendRuleInput`

The details of the `CountLimitSpendRule` spend rule you want to update.

### `UpdateCountLimitSpendRulePayload`

The return types when updating an existing count limit rule.

### `UpdateCreditLimitPercentageSpendRuleInput`

The details of the `CreditLimitPercentageSpendRule` spend rule you want to update.

### `UpdateCreditLimitPercentageSpendRulePayload`

The return types when updating an existing `CreditLimitPercentageSpendRule`.

### `UpdateCustomFieldsInput`

The input to update existing `CustomFields`.

### `UpdateCvvSpendRuleInput`

The details of the `CVVSpendRule` spend rule you want to update.

### `UpdateCvvSpendRulePayload`

The return types when updating an existing CVV rule.

### `UpdateDaysWithinAccountCreateDateSpendRuleInput`

The details of the `DaysWithinAccountCreateDateSpendRule` spend rule you want to update.

### `UpdateDaysWithinAccountCreateDateSpendRulePayload`

The return types when updating an existing `DaysWithinAccountCreateDateSpendRule`.

### `UpdateDaysWithinCardCreateDateSpendRuleInput`

The details of the `DaysWithinCardCreateDateSpendRule` spend rule you want to update.

### `UpdateDaysWithinCardCreateDateSpendRulePayload`

The return types when updating an existing `DaysWithinCardCreateDateSpendRule`.

### `UpdateDepositAmountLimitSpendRuleInput`

The details of the `DepositAmountLimitSpendRule` to update.

### `UpdateDepositAmountLimitSpendRulePayload`

The return types when updating a deposit amount limit rule.

### `UpdateDepositCountLimitSpendRuleInput`

The details of the `DepositCountLimitSpendRule` to update.

### `UpdateDepositCountLimitSpendRulePayload`

The return types when updating a deposit count limit rule.

### `UpdateDepositProcessingNetworkSpendRuleInput`

The details of the `DepositProcessingNetworkSpendRule` spend rule to update.

### `UpdateDepositProcessingNetworkSpendRulePayload`

The return types when updating a cash deposit processing network rule.

### `UpdateFinancialAccountBillingCycleConfigurationInput`

The input to update the billing cycle configuration for a `FinancialAccount`.

### `UpdateFinancialAccountBillingCycleConfigurationPayload`

The return types when calling `updateFinancialAccountBillingCycleConfiguration`.

### `UpdateFinancialAccountNameInput`

The details of the Card Product name change.

### `UpdateFinancialAccountNamePayload`

The return types when updating a Financial Account name.

### `UpdateMastercardFraudScoreSpendRuleInput`

The details of the `MastercardFraudScoreSpendRule` spend rule you want to update.

### `UpdateMastercardFraudScoreSpendRulePayload`

The return types when updating an existing `MastercardFraudScoreSpendRule`.

### `UpdateMaximumAmountVarianceOnCreditLimitSpendRuleInput`

The details of the `MaximumAmountVarianceOnCreditLimitSpendRule` spend rule you want to update.

### `UpdateMaximumAmountVarianceOnCreditLimitSpendRulePayload`

The return types when updating an existing `MaximumAmountVarianceOnCreditLimitSpendRule`.

### `UpdateMaximumAmountVarianceOnPseudoBalanceSpendRuleInput`

The details of the `MaximumAmountVarianceOnPseudoBalanceSpendRule` spend rule you want to update.

### `UpdateMaximumAmountVarianceOnPseudoBalanceSpendRulePayload`

The return types when updating an existing `MaximumAmountVarianceOnPseudoBalanceSpendRule`.

### `UpdateMaximumPercentVarianceOnCreditLimitSpendRuleInput`

The details of the `MaximumPercentVarianceOnCreditLimitSpendRule` spend rule you want to update.

### `UpdateMaximumPercentVarianceOnCreditLimitSpendRulePayload`

The return types when updating an existing `MaximumPercentVarianceOnCreditLimitSpendRule`.

### `UpdateMaximumPercentVarianceOnPseudoBalanceSpendRuleInput`

The details of the `MaximumPercentVarianceOnPseudoBalanceSpendRule` spend rule you want to update.

### `UpdateMaximumPercentVarianceOnPseudoBalanceSpendRulePayload`

The return types when updating an existing `MaximumPercentVarianceOnPseudoBalanceSpendRule`.

### `UpdateMerchantCategorySpendRuleInput`

The details of the `MerchantCategorySpendRule` spend rule you want to update.

### `UpdateMerchantCategorySpendRulePayload`

The return types when updating an existing category rule.

### `UpdateMerchantCountrySpendRuleInput`

The details of the `MerchantCountrySpendRule` spend rule you want to update.

### `UpdateMerchantCountrySpendRulePayload`

The return types when updating an existing country rule.

### `UpdateMerchantIdentifierSpendRuleInput`

The details of the `MerchantIdentifierSpendRule` spend rule you want to update.

### `UpdateMerchantIdentifierSpendRulePayload`

The return types when updating an existing merchant identifier rule.

### `UpdateMinimumAmountLimitSpendRuleInput`

The details of the `MinimumAmountLimitSpendRule` spend rule you want to update.

### `UpdateMinimumAmountLimitSpendRulePayload`

The return types when updating an existing `MinimumAmountLimitSpendRule`.

### `UpdateOrganizationProfileDisplayNameInput`

Input for updating organization display name.

### `UpdateOrganizationProfileDisplayNamePayload`

### `UpdatePanEntryModeSpendRuleInput`

The details of the `PanEntryModeSpendRule` to be updated.

### `UpdatePanEntryModeSpendRulePayload`

The return types when updating an existing `PanEntryModeSpendRule`.

### `UpdatePointOfServiceCategorySpendRuleInput`

The details of the `PointOfServiceCategorySpendRule` spend rule to update.

### `UpdatePointOfServiceCategorySpendRulePayload`

The return types when updating an existing a point of service category rule.

### `UpdatePostalCodeVerificationSpendRuleInput`

The details of the `PostalCodeVerificationSpendRule` spend rule to update.

### `UpdatePostalCodeVerificationSpendRulePayload`

The return types when updating an existing postal code verification rule.

### `UpdatePricingConfigurationInput`

The input details for updating the `effectiveThrough` timestamp of a `PricingConfiguration`.

### `UpdatePricingConfigurationPayload`

The result of updating the `effectiveThrough` timestamp of a `PricingConfiguration`.
Returns the updated configuration or error details.

### `UpdatePseudoBalanceInput`

Input for adjusting the current pseudo balance amount.
Allows manual increases or decreases to the tracked spending balance.

### `UpdatePseudoBalancePayload`

### `UpdatePseudoLimitInput`

Input for updating the pseudo limit.
Allows increasing or decreasing the maximum allowed balance.

### `UpdatePseudoLimitPayload`

### `UpdateRewardRedemptionConfigurationAttachmentInput`

Input for updating a `RewardRedemptionConfigurationAttachment`. Note: only the effective through date is modifiable.

### `UpdateRewardRedemptionConfigurationAttachmentPayload`

Types which can be returned for updating a `RewardRedemptionConfigurationAttachment`'s effective through date.

### `UpdateRewardRuleAttachmentInput`

Input for updating a `RewardRuleAttachment`. Note: only the effective through date is modifiable.

### `UpdateRewardRuleAttachmentPayload`

Types which can be returned for `UpdateRewardRuleAttachment`

### `UpdateStreetAddressSpendRuleInput`

The details of the `StreetAddressSpendRule` spend rule you want to update.

### `UpdateStreetAddressSpendRulePayload`

The return types when updating an existing street address rule.

### `UpdateUsAssociatedPersonAccountHolderEmailInput`

An input representing the parts of an update for an associated person's account holder email

### `UpdateUsAssociatedPersonAccountHolderHomeAddressInput`

An input representing the parts of an update for an associated person's account holder home address

### `UpdateUsAssociatedPersonAccountHolderPayload`

Response type for update of a USAssociatedPersonAccountHolder containing the updates or errors.

### `UpdateUsAssociatedPersonAccountHolderPhoneInput`

An input representing the parts of an update for an associated person's account holder phone

### `UpdateUsBusinessAccountHolderBillingAddressInput`

An input representing the parts of an update for a business account holder billing address

### `UpdateUsBusinessAccountHolderCreditRiskAttributeInput`

An input representing the parts of an update for a business account holder credit risk attributes

### `UpdateUsBusinessAccountHolderPayload`

Response type for updating a USBusinessAccountHolder containing the updates or errors.

### `UpdateUsBusinessAccountHolderPhoneInput`

An input representing the parts of an update for a business account holder phone

### `UpdateUsBusinessAccountHolderWebsiteInput`

An input representing the parts of an update for a business account holder website

### `UpdateUserDefinedFieldDefinitionInput`

The input for updating a `UserDefinedFieldDefinition`.

### `UpdateUserDefinedFieldInput`

The input to update a `UserDefinedField`

### `UpdateUserInput`

Data needed to login a User.

### `UpdateUserPayload`

The possible return types of `updateUser`.

### `UpdateUsPersonAccountHolderBillingAddressInput`

An input representing the parts of an update for a person account holder billing address

### `UpdateUsPersonAccountHolderCreditRiskAttributeInput`

An input representing the parts of an update for a person account holder credit risk attributes

### `UpdateUsPersonAccountHolderEmailInput`

An input representing the parts of an update for a person account holder email

### `UpdateUsPersonAccountHolderPayload`

Response type for updating a USPersonAccountHolder containing the updates or errors.

### `UpdateUsPersonAccountHolderPhoneInput`

An input representing the parts of an update for a person account holder phone

### `UpdateUsPersonAuthorizedUserBillingAddressInput`

An input representing the parts of an update for a person authorized user billing address

### `UpdateUsPersonAuthorizedUserEmailInput`

An input representing the parts of an update for a person authorized user email

### `UpdateUsPersonAuthorizedUserPayload`

Response type for update of a `USPersonAuthorizedUser`.

### `UpdateUsPersonAuthorizedUserPhoneInput`

An input representing the parts of an update for a person authorized user phone

### `UpdateVelocityRuleInput`

The details of the `VelocityRule` to update

### `UpdateVelocityRulePayload`

The return types when updating an existing `VelocityRule`.

### `UpdateVisaRiskScoreSpendRuleInput`

The details of the `VisaRiskScoreSpendRule` spend rule you want to update.

### `UpdateVisaRiskScoreSpendRulePayload`

The return types when updating an existing `VisaRiskScoreSpendRule`.

### `UploadLink`

An interface representing an upload link

### `UploadRequirement`

Details of the requirements for the upload.

### `UploadRequirementConstraint`

### `UsAccountHolderApplicationDocumentUploadSession`

A document upload session for a US Account Holder Application

### `UsAssociatedPersonNameInput`

Input representing common fields of the name of a person associated with a business.

### `UsAssociatedPersonNameUpdateInput`

Input representing common fields to update the name of a person associated with a business.

### `UsAuthorizedPersonInput`

The details of the USAuthorizedPersonInput.

### `UsAuthorizedPersonUpdateInput`

Input fields for updating a USAuthorizedPerson.

### `UsBankAccount`

A US bank account used for RTP transfers.

### `UsBusinessAccountHolder`

A USBusinessAccountHolder.

### `UsBusinessAccountHolderAuthorizedAccountHolderRelationshipsArgs`

A USBusinessAccountHolder.

### `UsBusinessAccountHolderCardProductApplicationsArgs`

A USBusinessAccountHolder.

### `UsBusinessAccountHolderConnection`

The connection type for USBusinessAccountHolder.

### `UsBusinessAccountHolderEdge`

The edge type for a USBusinessAccountHolder.

### `UsBusinessAccountHolderExternalFinancialAccountsArgs`

A USBusinessAccountHolder.

### `UsBusinessAccountHolderFinancialAccountsArgs`

A USBusinessAccountHolder.

### `UsBusinessAccountHolderGlobalNotesArgs`

A USBusinessAccountHolder.

### `UsBusinessAccountHolderPaymentCardsArgs`

A USBusinessAccountHolder.

### `UsBusinessAccountHolderSnapshot`

The details of a USBusinessAccountHolder at the time of application.

### `UsBusinessAccountHolderToken`

A reference to a tokenized USBusinessAccountHolder.

### `UsBusinessAuthorizedPerson`

The details of the person authorized to act on behalf of business.

### `UsBusinessAuthorizedPersonSnapshot`

The details of the person authorized to act on behalf of business.

### `UsBusinessIdentificationDocument`

The US business identification document attached to a Business.

### `UsBusinessIdentificationDocumentInput`

The US Business identification documents for verification.

### `UsBusinessProfile`

Information about the US business.

### `UsBusinessProfileAuthorizedUsersArgs`

Information about the US business.

### `UsBusinessProfileInput`

Input fields for creating a USBusinessProfile.

### `UsBusinessProfileSnapshot`

Information about the US business.

### `UsBusinessProfileUpdateInput`

Input fields for updating a `USBusinessProfile`.

### `UsBusinessUltimateBeneficialOwner`

Ultimate beneficial owner for the business owning 25% or more of the business.

### `UsBusinessUltimateBeneficialOwnerSnapshot`

A snapshot of the Ultimate beneficial owner for the business.

### `User`

A human User of the Highnote Platform.

### `UserClientCredential`

A credential for a User that can be used to make a client-side request. The credential is scoped to a specific Organization the User has access to.

### `UserConnection`

The connection type for User.

### `UserDefinedBooleanField`

### `UserDefinedBooleanFieldRevision`

A historical snapshot of a `UserDefinedBooleanField` at a specific point in time.

### `UserDefinedBooleanFieldRevisionsArgs`

### `UserDefinedField`

A custom field instance with a value, associated with a specific `Node`.

### `UserDefinedFieldConnection`

The connection type for `UserDefinedField`

### `UserDefinedFieldDefinition`

Configuration template for creating `UserDefinedField` instances.

### `UserDefinedFieldDefinitionConnection`

The connection type for `UserDefinedFieldDefinition`.

### `UserDefinedFieldDefinitionEdge`

The edge type for `UserDefinedFieldDefinition`.

### `UserDefinedFieldDefinitionPayload`

### `UserDefinedFieldDefinitionRevision`

A historical snapshot of a `UserDefinedFieldDefinition` at a specific point in time.

### `UserDefinedFieldDefinitionRevisionConnection`

The connection type for `UserDefinedFieldDefinitionRevision`.

### `UserDefinedFieldDefinitionRevisionEdge`

The edge type for `UserDefinedFieldDefinitionRevision`.

### `UserDefinedFieldDefinitionRevisionPayload`

### `UserDefinedFieldDefinitionRevisionsArgs`

Configuration template for creating `UserDefinedField` instances.

### `UserDefinedFieldDefinitionsFilterInput`

Used to search `UserDefinedFieldDefinitions` using the `SearchQueryLanguage`

### `UserDefinedFieldEdge`

The edge type for `UserDefinedField`.

### `UserDefinedFieldNode`

The possible `Node` entity types for a `UserDefinedField`

### `UserDefinedFieldPayload`

### `UserDefinedFieldRevision`

A historical snapshot of a `UserDefinedField` at a specific point in time.

### `UserDefinedFieldRevisionConnection`

The connection type for `UserDefinedFieldRevision`.

### `UserDefinedFieldRevisionEdge`

The edge type for `UserDefinedFieldRevision`.

### `UserDefinedFieldRevisionPayload`

### `UserDefinedFieldRevisionsArgs`

A custom field instance with a value, associated with a specific `Node`.

### `UserDefinedFieldsFilterInput`

Used to search `UserDefinedFields` using the `SearchQueryLanguage`

### `UserDefinedFieldValueInput`

The input value for the `UserDefinedField`.

### `UserDefinedIntegerField`

### `UserDefinedIntegerFieldRevision`

A historical snapshot of a `UserDefinedIntegerField` at a specific point in time.

### `UserDefinedIntegerFieldRevisionsArgs`

### `UserDefinedStringField`

### `UserDefinedStringFieldRevision`

A historical snapshot of a `UserDefinedStringField` at a specific point in time.

### `UserDefinedStringFieldRevisionsArgs`

### `UserEdge`

The edge type for a User.

### `UserError`

Result type when user errors are present on the request.

### `UserPayload`

Payload for user.

### `UsIdentificationDocument`

The US identification documents attached to a Person.

### `UsIdentificationDocumentInput`

The US identification documents for verification.

### `UsPersonAccountHolder`

A USPersonAccountHolder.

### `UsPersonAccountHolderApplicationsArgs`

A USPersonAccountHolder.

### `UsPersonAccountHolderAuthorizedAccountHolderRelationshipsArgs`

A USPersonAccountHolder.

### `UsPersonAccountHolderAuthorizedUserFinancialAccountsArgs`

A USPersonAccountHolder.

### `UsPersonAccountHolderCardProductApplicationsArgs`

A USPersonAccountHolder.

### `UsPersonAccountHolderConnection`

The connection type for USPersonAccountHolder.

### `UsPersonAccountHolderEdge`

The edge type for a USPersonAccountHolder.

### `UsPersonAccountHolderExternalFinancialAccountsArgs`

A USPersonAccountHolder.

### `UsPersonAccountHolderFinancialAccountsArgs`

A USPersonAccountHolder.

### `UsPersonAccountHolderGlobalNotesArgs`

A USPersonAccountHolder.

### `UsPersonAccountHolderInput`

The details of the PersonAccountHolder.

### `UsPersonAccountHolderPaymentCardsArgs`

A USPersonAccountHolder.

### `UsPersonAccountHolderSnapshot`

The details of the PersonAccountHolder at the time of application.

### `UsPersonAccountHolderToken`

A reference to a tokenized USPersonAccountHolder.

### `UsPersonAccountHolderUpdateInput`

Input fields for updating a `USPersonAccountHolder`.

### `UsPersonAuthorizedUser`

A USPersonAuthorizedUser.

### `UsPersonAuthorizedUserAssociatedAccountHoldersArgs`

A USPersonAuthorizedUser.

### `UsPersonAuthorizedUserCardProductApplicationsArgs`

A USPersonAuthorizedUser.

### `UsPersonAuthorizedUserInput`

The details of the PersonAuthorizedUser.

### `UsPersonAuthorizedUserPaymentCardsArgs`

A USPersonAuthorizedUser.

### `UsPersonAuthorizedUserSnapshot`

The details of the AuthorizedUser at the time of application.

### `UsPersonAuthorizedUserToken`

A reference to a tokenized USPersonAuthorizedUser.

### `UsUltimateBeneficialOwnerInput`

Input fields for creating a USUltimateBeneficialOwner.

### `UsUltimateBeneficialOwnerUpdateInput`

Input fields for updating a `USUltimateBeneficialOwner`.

### `ValidAddress`

### `ValidateAddressInput`

Input fields for `validateAddress`.

### `ValidateAddressMutation`

### `ValidateAddressMutationVariables`

### `ValidateAddressPayload`

Types which can be returned for `validateAddress`.

### `ValidatedAddress`

The `ValidatedAddress`.

### `ValidatedAddressToken`

The `ValidatedAddressToken`.

### `VariableFeeChargeValue`

Percentage based fee charge value.

### `VelocityInterFinancialAccountTransferRule`

A `VelocityInterFinancialAccountTransferRule` is window constrained inter financial account transfer control that is composed of at most
3 `ConditionalInterFinancialAccountTransferRules` and 1 cumulative `CumulativeInterFinancialAccountTransferRule` (e.g. `AmountLimitInterFinancialAccountTransferRule`)

### `VelocityInterFinancialAccountTransferRuleAmountBalance`

The amount balance details of an amount `VelocityInterFinancialAccountTransferRule`.

### `VelocityInterFinancialAccountTransferRuleBalance`

The balance, tracking either amount or count.

### `VelocityInterFinancialAccountTransferRuleBalanceConnection`

The connection type for `VelocityInterFinancialAccountTransferRuleBalance`.

### `VelocityInterFinancialAccountTransferRuleBalanceConnectionPayload`

The return type for finding inter financial account transfer rule balances

### `VelocityInterFinancialAccountTransferRuleBalanceEdge`

The edge type for a `VelocityInterFinancialAccountTransferRuleBalance`.

### `VelocityInterFinancialAccountTransferRuleConnection`

The connection type for `VelocityInterFinancialAccountTransferRule`.

### `VelocityInterFinancialAccountTransferRuleConnectionPayload`

The return types for finding velocity inter financial account transfer rules

### `VelocityInterFinancialAccountTransferRuleCountBalance`

The count balance details of a count `VelocityInterFinancialAccountTransferRule`.

### `VelocityInterFinancialAccountTransferRuleEdge`

The edge type for a `VelocityInterFinancialAccountTransferRule`.

### `VelocityInterFinancialAccountTransferRuleResult`

The result of applying a `VelocityInterFinancialAccountTransferRule` to an event.

### `VelocityInterFinancialAccountTransferRuleVersionArgs`

A `VelocityInterFinancialAccountTransferRule` is window constrained inter financial account transfer control that is composed of at most
3 `ConditionalInterFinancialAccountTransferRules` and 1 cumulative `CumulativeInterFinancialAccountTransferRule` (e.g. `AmountLimitInterFinancialAccountTransferRule`)

### `VelocityRule`

A `VelocityRule` is window constrained authorization control that is composed of at most 3 SpendRules and 1 cumulative `SpendRule` (e.g. `AmountLimitSpendRule`)

### `VelocityRuleAssociatedType`

The types that a `VelocityRule` could be associated to.

### `VelocityRuleAssociation`

A `VelocityRule` that is or was attached.

### `VelocityRuleBalance`

DEPRECATED: The balance details of a `VelocityRule`

### `VelocityRuleConnection`

The connection type for `VelocityRule`.

### `VelocityRuleContainer`

A container that holds a `VelocityRule`.

### `VelocityRuleEdge`

The edge type for a `VelocityRule`.

### `VelocityRuleInput`

The details of the `VelocityRule`

### `VelocityRuleResult`

The result of applying an `VelocityRule` to an event.

### `VelocityRuleRevisionsArgs`

A `VelocityRule` is window constrained authorization control that is composed of at most 3 SpendRules and 1 cumulative `SpendRule` (e.g. `AmountLimitSpendRule`)

### `VelocityRuleVersionArgs`

A `VelocityRule` is window constrained authorization control that is composed of at most 3 SpendRules and 1 cumulative `SpendRule` (e.g. `AmountLimitSpendRule`)

### `VelocitySpendRuleAmountBalance`

The amount balance details of a `VelocityRule`

### `VelocitySpendRuleBalance`

The return types when getting a `VelocityRule` balance.

### `VelocitySpendRuleCountBalance`

The count balance details of a `VelocityRule`

### `VendorProvidedBankFinancialAccountFeature`

Whether or not the Financial Account is a Non Verified account

### `VendorRelationship`

Represents a relationship between an originating organization and a vendor organization.
Defines which notification events should be relayed from the originator to the vendor.

### `VerificationEvent`

A Verification Event for a transaction.

### `VerificationEventSpendRuleResultsArgs`

A Verification Event for a transaction.

### `VerificationOverridesInput`

Verification details that can be overridden when simulating an Authorization.

### `VerifiedApplicationFieldsForFraudAlertInput`

The `AccountHolderCardProductApplication` fields that were confirmed. These must all be confirmed in order to move forward with this application.

### `VerifiedExternalBankAccountLinkExperience`

Link experience configuration.

### `VerifyNetworkTokenInput`

Input for verifying a `NetworkToken`.

### `VerifyNetworkTokenPayload`

Result of verifying a `NetworkToken`.

### `VerifyPaymentCardInput`

Input for verifying a `PaymentCard`.

### `VerifyPaymentCardPayload`

Result of verifying a `PaymentCard`.

### `VerifyPaymentMethodTokenInput`

Input for verifying a payment method token.

### `VerifyPaymentMethodTokenPayload`

Result of verifying a payment method token.

### `ViewportCoordinatesInput`

An input of coordinates to form a viewport

### `VirtualCardAppText`

The subscriber text for 3DS Verifications for Mobile Apps

### `VirtualCardBrowserText`

The subscriber text for 3DS Verifications for Browsers

### `VirtualCardProfile`

Virtual Card Profile attributes

### `VisaData`

Visa specific transaction data.

### `VisaFleetAuthorizationData`

Details pertaining to a Visa Fleet transaction available at Authorization and Authorization Advice time

### `VisaFleetL2FuelLineItem`

Visa Fleet Level 2 fuel line item data. These are relevant data items describing fuel products purchased in a fleet transaction. Also used to provide EV charging information

### `VisaFleetL2FuelLineItemInput`

Visa Fleet Level 2 fuel line item data. These are relevant data items describing fuel products purchased in a fleet transaction. Also used to provide EV charging information

### `VisaFleetL2TransactionData`

An Visa Fleet L2 additional transaction data

### `VisaFleetL2TransactionDataInput`

Simulated Visa Fleet L2 transaction data. These are relevant additional transaction data items pertaining to a fleet transaction.

### `VisaFleetL3EnhancedData`

Visa Fleet Level 3 enhanced transaction Data. These are relevant additional transaction data items pertaining to a fleet transaction.

### `VisaFleetL3EnhancedDataDiscount`

Discount data for this transaction.

### `VisaFleetL3EnhancedDataDuty`

Duty data for this transaction.

### `VisaFleetL3EnhancedDataInvoice`

Invoice data for this transaction.

### `VisaFleetL3EnhancedDataLineItem`

An single line item within a `VisaFleetL3EnhancedData`

### `VisaFleetL3EnhancedDataShipping`

Shipping data for this transaction.

### `VisaFleetL3EnhancedDataTax`

Tax data for this transaction.

### `VisaRiskScoreSpendRule`

A Spend Control rule that blocks transactions if the Visa Risk Score is above a configured threshold.

### `VisaRiskScoreSpendRuleResult`

The result of applying a `VisaRiskScoreSpendRule` to an event.

### `VisaRiskScoreSpendRuleRevisionsArgs`

A Spend Control rule that blocks transactions if the Visa Risk Score is above a configured threshold.

### `WaiveFeeTransferInput`

Waive fee input.

### `WaiveInterestAmountForClosedStatementInput`

Input type for waiving interest for a `CreditCardTransferEvent` associated with a closed `FinancialAccountStatement`.

### `WaiveInterestAmountForClosedStatementPayload`

Types which can be returned when waiving full interest for a given `InterestAssessmentEvent` associated with a closed `FinancialAccountStatement`

### `WalletDetailsInput`

Token provisioning wallet details

### `WatchlistInterFinancialAccountTransferRule`

A inter account transfer rule that is connected to the watchlist.

### `WatchlistInterFinancialAccountTransferRuleResult`

The result of applying a `WatchlistInterFinancialAccountTransferRule` to an event.

### `WatchlistInterFinancialAccountTransferRuleRevisionsArgs`

A inter account transfer rule that is connected to the watchlist.

### `WebhookNotificationTarget`

A webhook notification target.

### `WebhookNotificationTargetConnection`

The connection type for Webhook Notification Targets.

### `WebhookNotificationTargetDeliveryAttemptsArgs`

A webhook notification target.

### `WebhookNotificationTargetEdge`

The edge type for Webhook Notification Target.

### `WebhookNotificationTargetEvent`

This type wraps a notification event to indicate that this event should have been delivered to a particular target based on its subscriptions.

### `WebhookNotificationTargetEventConnection`

The connection type for a `WebhookNotificationTargetEvent`

### `WebhookNotificationTargetEventDeliveryAttemptsArgs`

This type wraps a notification event to indicate that this event should have been delivered to a particular target based on its subscriptions.

### `WebhookNotificationTargetEventEdge`

The edge type for a `WebhookNotificationTargetEvent`

### `WebhookNotificationTargetEventFilterInput`

Input for filtering `WebhookNotificationTargetEvent`.

### `WebhookNotificationTargetEventNode`

A single event delivery attempt record returned by `listEvents()`.

### `WebhookNotificationTargetNode`

The canonical fully-fielded shape of a `WebhookNotificationTarget` returned by
`get()` and yielded by `list()`. Useful as a parameter type when writing
helpers that operate on targets.

### `WebhookNotificationTargetStatusHistoryArgs`

A webhook notification target.

### `WebhookNotificationTargetWebhookNotificationTargetEventsArgs`

A webhook notification target.

### `WireTransfer`

Represents money being moved via wire.

### `WireTransferLedgersArgs`

Represents money being moved via wire.

### `WireTransferReview`

The details of an `WireTransferReview` initiated by Highnote.

### `WireTransferReviewItem`

### `WireTransferStatusDetails`

Details about the status of the wire transfer.

### `WireTransferUserDefinedFieldsArgs`

Represents money being moved via wire.

### `WorkflowActionEmailNotificationResult`

Results from a workflow action related to sending an email notification.

This type includes details about the email, such as recipients, sender, provider, and delivery time.

### `WorkflowActionLinkVerifiedExternalBankAccountResult`

Results from a workflow action related to linking an account holder with a verified external bank account.

### `WorkflowActionResult`

Union type representing the possible results from a workflow action.

This union can be one of several result types, including email notification results or Visa Payable Automation results.

### `WorkflowActionResultOutcome`

Represents the outcome of a workflow action, including metadata and the result.

This type includes information about the action's creation and update timestamps, as well as the result of the action.

### `WorkflowActionVisaPayableAutomationResult`

Results from a workflow action related to Visa's Payable Automation solution.

This type includes details specific to the Visa Payable Automation process, such as buyer and account IDs.
