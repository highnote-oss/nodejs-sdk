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
import { DocumentUploadClientTokenPermission } from "@highnote-oss/nodejs-sdk";

const token = await client.clientTokens.createForDocumentUpload({
  documentUploadSessionId: "dus_...",
  permissions: [DocumentUploadClientTokenPermission.MANAGE_DOCUMENT_UPLOAD_SESSION],
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
import { PaymentCardClientTokenPermission } from "@highnote-oss/nodejs-sdk";

const token = await client.clientTokens.createForPaymentCard({
  paymentCardId: "pc_...",
  permissions: [PaymentCardClientTokenPermission.READ_RESTRICTED_DETAILS],
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
import { GeneratePaymentMethodTokenizationClientTokenPermission } from "@highnote-oss/nodejs-sdk";

const token = await client.clientTokens.createForTokenization({
  permissions: [
    GeneratePaymentMethodTokenizationClientTokenPermission.TOKENIZE_PAYMENT_METHOD,
  ],
});
```
