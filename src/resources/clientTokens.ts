import { print } from "graphql";

import type { Highnote } from "../client.js";
import { throwIfError, HighnoteUnexpectedResponseError } from "../errors.js";
import type {
  GenerateDocumentUploadClientTokenMutation,
  GenerateDocumentUploadClientTokenMutationVariables,
  GeneratePaymentCardClientTokenMutation,
  GeneratePaymentCardClientTokenMutationVariables,
  GeneratePaymentMethodTokenizationClientTokenMutation,
  GeneratePaymentMethodTokenizationClientTokenMutationVariables,
} from "../generated/graphql.js";
import {
  GenerateDocumentUploadClientTokenDocument,
  GeneratePaymentCardClientTokenDocument,
  GeneratePaymentMethodTokenizationClientTokenDocument,
} from "../generated/graphql.js";

/** A generated client token with value and expiration. */
export interface ClientToken {
  value: string;
  expirationDate: string;
}

export class ClientTokensResource {
  constructor(private readonly client: Highnote) {}

  /**
   * Generate a scoped client token for a payment card.
   *
   * ```ts
   * const token = await client.clientTokens.createForPaymentCard({
   *   paymentCardId: "pc_...",
   *   permissions: ["READ_RESTRICTED_DETAILS"],
   * });
   * ```
   */
  async createForPaymentCard(
    input: GeneratePaymentCardClientTokenMutationVariables["input"],
  ): Promise<ClientToken> {
    const { data } =
      await this.client.graphql.rawRequest<GeneratePaymentCardClientTokenMutation>(
        print(GeneratePaymentCardClientTokenDocument),
        { input },
      );

    const result = data?.generatePaymentCardClientToken;
    throwIfError(result);

    if (!result || result.__typename !== "ClientToken") {
      throw new HighnoteUnexpectedResponseError(
        result?.__typename ?? "null",
        "Unexpected response from generatePaymentCardClientToken",
      );
    }

    if (!result.value || !result.expirationDate) {
      throw new Error("ClientToken response missing value or expirationDate");
    }

    return { value: result.value, expirationDate: result.expirationDate };
  }

  /**
   * Generate a scoped client token for payment method tokenization.
   *
   * ```ts
   * const token = await client.clientTokens.createForTokenization({
   *   permissions: ["TOKENIZE_PAYMENT_METHOD"],
   * });
   * ```
   */
  async createForTokenization(
    input: GeneratePaymentMethodTokenizationClientTokenMutationVariables["input"],
  ): Promise<ClientToken> {
    const { data } =
      await this.client.graphql.rawRequest<GeneratePaymentMethodTokenizationClientTokenMutation>(
        print(GeneratePaymentMethodTokenizationClientTokenDocument),
        { input },
      );

    const result = data?.generatePaymentMethodTokenizationClientToken;
    throwIfError(result);

    if (!result || result.__typename !== "ClientToken") {
      throw new HighnoteUnexpectedResponseError(
        result?.__typename ?? "null",
        "Unexpected response from generatePaymentMethodTokenizationClientToken",
      );
    }

    if (!result.value || !result.expirationDate) {
      throw new Error("ClientToken response missing value or expirationDate");
    }

    return { value: result.value, expirationDate: result.expirationDate };
  }

  /**
   * Generate a scoped client token for a document upload session.
   *
   * ```ts
   * const token = await client.clientTokens.createForDocumentUpload({
   *   documentUploadSessionId: "dus_...",
   *   permissions: ["MANAGE_DOCUMENT_UPLOAD_SESSION"],
   * });
   * ```
   */
  async createForDocumentUpload(
    input: GenerateDocumentUploadClientTokenMutationVariables["input"],
  ): Promise<ClientToken> {
    const { data } =
      await this.client.graphql.rawRequest<GenerateDocumentUploadClientTokenMutation>(
        print(GenerateDocumentUploadClientTokenDocument),
        { input },
      );

    const result = data?.generateDocumentUploadClientToken;
    throwIfError(result);

    if (!result || result.__typename !== "ClientToken") {
      throw new HighnoteUnexpectedResponseError(
        result?.__typename ?? "null",
        "Unexpected response from generateDocumentUploadClientToken",
      );
    }

    if (!result.value || !result.expirationDate) {
      throw new Error("ClientToken response missing value or expirationDate");
    }

    return { value: result.value, expirationDate: result.expirationDate };
  }
}
