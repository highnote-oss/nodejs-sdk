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
