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
- `input.address.postalCode` (string, **required**) — The postal code of the address, in the postal format of the address's
  country. A United States ZIP code, for example, is five digits, optionally
  followed by a hyphen and four more ("94107" or "94107-1234").
- `input.address.region` (string, optional) — The state, province, or other principal subdivision of the address, given as
  the subdivision portion of its
  [ISO 3166-2](https://en.wikipedia.org/wiki/ISO_3166-2) code: the part after
  the hyphen, without the country prefix. For example, provide "CA" for
  California (US-CA), "ON" for Ontario (CA-ON), or "NSW" for New South Wales
  (AU-NSW). For United States addresses this is the
  [two-letter state code](https://en.wikipedia.org/wiki/ISO_3166-2:US),
  including districts and outlying areas.

  Required for United States addresses and for most other supported countries.
  Omit it for those whose addresses are written without a subdivision, such as
  the United Kingdom and Israel.

  Omitting it where it is required is rejected, and the error names the
  `region` field: a United States or Canadian address submitted without one is
  refused. Creating or updating an account holder reports this as a
  `NON_NULL_INPUT_REQUIRED` error; ordering a physical card reports it as a
  `NON_EMPTY_INPUT_REQUIRED` error. An empty string counts as omitting it.
  A value that is present but blank, such as a single space, is rejected with a
  `NON_EMPTY_INPUT_REQUIRED` error.

  A value that is stated but is not the subdivision code is rejected with an
  `INVALID_STATE` error, such as "California" in place of "CA" or "Ontario" in
  place of "ON".
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
