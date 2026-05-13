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
