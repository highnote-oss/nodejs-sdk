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
