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
