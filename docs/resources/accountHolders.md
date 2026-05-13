### client.accountHolders

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
