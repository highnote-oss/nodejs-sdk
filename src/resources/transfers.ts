import { print } from "graphql";

import type { Highnote } from "../client.js";
import { throwIfError, HighnoteUnexpectedResponseError } from "../errors.js";
import type {
  InitiateTransferBetweenFinancialAccountsMutation,
  InitiateTransferBetweenFinancialAccountsMutationVariables,
} from "../generated/graphql.js";
import { InitiateTransferBetweenFinancialAccountsDocument } from "../generated/graphql.js";

// ── Types ──

type InterFinancialAccountTransferResponse = Extract<
  NonNullable<
    InitiateTransferBetweenFinancialAccountsMutation["initiateTransferBetweenFinancialAccounts"]
  >,
  { __typename: "InterFinancialAccountTransfer" }
>;

export type InterFinancialAccountTransfer = InterFinancialAccountTransferResponse;

// ── Resource ──

export class TransfersResource {
  constructor(private readonly client: Highnote) {}

  /**
   * Initiate a transfer between two financial accounts.
   *
   * ```ts
   * import { TransferPurpose } from "@highnote-oss/nodejs-sdk";
   *
   * const transfer = await client.transfers.initiateBetweenAccounts({
   *   fromFinancialAccountId: "fa_source",
   *   toFinancialAccountId: "fa_target",
   *   amount: { value: "100.00", currencyCode: "USD" },
   *   purpose: TransferPurpose.GENERAL,
   * });
   * ```
   */
  async initiateBetweenAccounts(
    input: InitiateTransferBetweenFinancialAccountsMutationVariables["input"],
  ): Promise<InterFinancialAccountTransferResponse> {
    const { data } =
      await this.client.graphql.rawRequest<InitiateTransferBetweenFinancialAccountsMutation>(
        print(InitiateTransferBetweenFinancialAccountsDocument),
        { input },
      );

    const result = data?.initiateTransferBetweenFinancialAccounts;
    throwIfError(result);

    if (!result || result.__typename !== "InterFinancialAccountTransfer") {
      throw new HighnoteUnexpectedResponseError(
        result?.__typename ?? "null",
        "Unexpected response from initiateTransferBetweenFinancialAccounts",
      );
    }

    return result as InterFinancialAccountTransferResponse;
  }
}
