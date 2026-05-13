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
