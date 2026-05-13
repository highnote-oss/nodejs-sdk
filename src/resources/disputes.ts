import { print } from "graphql";

import type { Highnote } from "../client.js";
import { throwIfError, HighnoteUnexpectedResponseError } from "../errors.js";
import type {
  InitiateCustomerCardTransactionDisputeMutation,
  InitiateCustomerCardTransactionDisputeMutationVariables,
  FindDisputeQuery,
} from "../generated/graphql.js";
import {
  InitiateCustomerCardTransactionDisputeDocument,
  FindDisputeDocument,
} from "../generated/graphql.js";

// ── Types ──

type InitiatedDisputeResponse = Extract<
  NonNullable<
    InitiateCustomerCardTransactionDisputeMutation["initiateCustomerCardTransactionDispute"]
  >,
  { __typename: "PaymentCardTransactionDispute" }
>;

type FindDisputeNode = Extract<
  NonNullable<FindDisputeQuery["node"]>,
  { __typename: "PaymentCardTransactionDispute" }
>;

export type Dispute = InitiatedDisputeResponse | FindDisputeNode;

// ── Resource ──

export class DisputesResource {
  constructor(private readonly client: Highnote) {}

  /**
   * Initiate a customer card transaction dispute.
   *
   * ```ts
   * import {
   *   PaymentCardDisputeCategoryType,
   *   PaymentCardDisputeCustomerClaimType,
   * } from "@highnote-oss/nodejs-sdk";
   *
   * const dispute = await client.disputes.initiate({
   *   cardTransactionEventId: "te_...",
   *   amount: { value: "50.00", currencyCode: "USD" },
   *   category: PaymentCardDisputeCategoryType.FRAUD,
   *   customerClaimType: PaymentCardDisputeCustomerClaimType.VERBAL,
   *   customerContact: {
   *     givenName: "Jane",
   *     familyName: "Doe",
   *     email: "jane@example.com",
   *   },
   *   customerInitiatedOn: "2026-03-18",
   * });
   * ```
   */
  async initiate(
    input: InitiateCustomerCardTransactionDisputeMutationVariables["input"],
  ): Promise<InitiatedDisputeResponse> {
    const { data } =
      await this.client.graphql.rawRequest<InitiateCustomerCardTransactionDisputeMutation>(
        print(InitiateCustomerCardTransactionDisputeDocument),
        { input },
      );

    const result = data?.initiateCustomerCardTransactionDispute;
    throwIfError(result);

    if (!result || result.__typename !== "PaymentCardTransactionDispute") {
      throw new HighnoteUnexpectedResponseError(
        result?.__typename ?? "null",
        "Unexpected response from initiateCustomerCardTransactionDispute",
      );
    }

    return result as InitiatedDisputeResponse;
  }

  /**
   * Retrieve a dispute by ID, including chargebacks and provisional credit history.
   *
   * ```ts
   * const dispute = await client.disputes.get("dis_...");
   * console.log(dispute.status, dispute.chargebacks);
   * ```
   */
  async get(id: string): Promise<FindDisputeNode> {
    const { data } = await this.client.graphql.rawRequest<FindDisputeQuery>(
      print(FindDisputeDocument),
      { id },
    );

    const node = data?.node;
    if (!node || node.__typename !== "PaymentCardTransactionDispute") {
      throw new HighnoteUnexpectedResponseError(
        node?.__typename ?? "null",
        `Dispute not found: ${id}`,
      );
    }

    return node as FindDisputeNode;
  }
}
