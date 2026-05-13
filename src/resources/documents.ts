import { print } from "graphql";

import type { Highnote } from "../client.js";
import { throwIfError, HighnoteUnexpectedResponseError } from "../errors.js";
import type {
  StartDocumentUploadSessionMutation,
  StartDocumentUploadSessionMutationVariables,
  CreateDocumentUploadLinkMutation,
  CreateDocumentUploadLinkMutationVariables,
  EndDocumentUploadSessionMutation,
  EndDocumentUploadSessionMutationVariables,
} from "../generated/graphql.js";
import {
  StartDocumentUploadSessionDocument,
  CreateDocumentUploadLinkDocument,
  EndDocumentUploadSessionDocument,
} from "../generated/graphql.js";

// ── Types ──

/** Union of possible document upload session types returned by start/end. */
export type DocumentUploadSession = Extract<
  NonNullable<StartDocumentUploadSessionMutation["startDocumentUploadSession"]>,
  { __typename: "IdentityVerificationDocumentUploadSession" | "USAccountHolderApplicationDocumentUploadSession" }
>;

type DocumentUploadLinkResponse = Extract<
  NonNullable<CreateDocumentUploadLinkMutation["createDocumentUploadLink"]>,
  { __typename: "DocumentUploadLink" }
>;

export type DocumentUploadLink = DocumentUploadLinkResponse;

// ── Resource ──

export class DocumentsResource {
  constructor(private readonly client: Highnote) {}

  /**
   * Start a document upload session.
   *
   * ```ts
   * const session = await client.documents.startSession({
   *   documentUploadSessionId: "dus_...",
   * });
   * ```
   */
  async startSession(
    input: StartDocumentUploadSessionMutationVariables["input"],
  ): Promise<DocumentUploadSession> {
    const { data } =
      await this.client.graphql.rawRequest<StartDocumentUploadSessionMutation>(
        print(StartDocumentUploadSessionDocument),
        { input },
      );

    const result = data?.startDocumentUploadSession;
    throwIfError(result);

    if (
      !result ||
      (result.__typename !== "IdentityVerificationDocumentUploadSession" &&
        result.__typename !== "USAccountHolderApplicationDocumentUploadSession")
    ) {
      throw new HighnoteUnexpectedResponseError(
        result?.__typename ?? "null",
        "Unexpected response from startDocumentUploadSession",
      );
    }

    return result as DocumentUploadSession;
  }

  /**
   * Create a document upload link within a session.
   *
   * ```ts
   * import { DocumentType } from "@highnote-oss/nodejs-sdk";
   *
   * const link = await client.documents.createUploadLink({
   *   documentUploadSessionId: "dus_...",
   *   documentType: DocumentType.DRIVERS_LICENSE,
   * });
   * ```
   */
  async createUploadLink(
    input: CreateDocumentUploadLinkMutationVariables["input"],
  ): Promise<DocumentUploadLinkResponse> {
    const { data } =
      await this.client.graphql.rawRequest<CreateDocumentUploadLinkMutation>(
        print(CreateDocumentUploadLinkDocument),
        { input },
      );

    const result = data?.createDocumentUploadLink;
    throwIfError(result);

    if (!result || result.__typename !== "DocumentUploadLink") {
      throw new HighnoteUnexpectedResponseError(
        result?.__typename ?? "null",
        "Unexpected response from createDocumentUploadLink",
      );
    }

    return result as DocumentUploadLinkResponse;
  }

  /**
   * End a document upload session.
   *
   * ```ts
   * await client.documents.endSession({
   *   documentUploadSessionId: "dus_...",
   * });
   * ```
   */
  async endSession(
    input: EndDocumentUploadSessionMutationVariables["input"],
  ): Promise<DocumentUploadSession> {
    const { data } =
      await this.client.graphql.rawRequest<EndDocumentUploadSessionMutation>(
        print(EndDocumentUploadSessionDocument),
        { input },
      );

    const result = data?.endDocumentUploadSession;
    throwIfError(result);

    if (
      !result ||
      (result.__typename !== "IdentityVerificationDocumentUploadSession" &&
        result.__typename !== "USAccountHolderApplicationDocumentUploadSession")
    ) {
      throw new HighnoteUnexpectedResponseError(
        result?.__typename ?? "null",
        "Unexpected response from endDocumentUploadSession",
      );
    }

    return result as DocumentUploadSession;
  }
}
