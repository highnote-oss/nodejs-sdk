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
