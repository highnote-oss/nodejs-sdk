import { print } from "graphql";

import type { Highnote } from "../client.js";
import { throwIfError, HighnoteUnexpectedResponseError } from "../errors.js";
import type {
  InitiateAchTransferMutation,
  InitiateAchTransferMutationVariables,
  CreateOneTimeAchTransferMutation,
  CreateOneTimeAchTransferMutationVariables,
  CreateRecurringAchTransferMutation,
  CreateRecurringAchTransferMutationVariables,
  CancelScheduledTransferMutation,
  CancelScheduledTransferMutationVariables,
} from "../generated/graphql.js";
import {
  InitiateAchTransferDocument,
  CreateOneTimeAchTransferDocument,
  CreateRecurringAchTransferDocument,
  CancelScheduledTransferDocument,
} from "../generated/graphql.js";

// ── Types ──

type AchTransfer = Extract<
  NonNullable<InitiateAchTransferMutation["initiateAchTransfer"]>,
  { __typename: "OriginatedAchTransfer" }
>;

type OneTimeAchTransfer = Extract<
  NonNullable<CreateOneTimeAchTransferMutation["createOneTimeACHTransfer"]>,
  { __typename: "OneTimeACHTransfer" }
>;

type RecurringAchTransfer = Extract<
  NonNullable<CreateRecurringAchTransferMutation["createRecurringACHTransfer"]>,
  { __typename: "RecurringACHTransfer" }
>;

type CancelledTransfer = Extract<
  NonNullable<CancelScheduledTransferMutation["cancelScheduledTransfer"]>,
  { __typename: "OneTimeACHTransfer" | "RecurringACHTransfer" }
>;

export type { AchTransfer, OneTimeAchTransfer, RecurringAchTransfer, CancelledTransfer };

// ── Resource ──

export class AchResource {
  constructor(private readonly _client: Highnote) {}

  /**
   * Initiate an ACH transfer to or from an external bank account.
   *
   * ```ts
   * const transfer = await client.ach.initiateTransfer({
   *   financialAccountId: "fa_...",
   *   externalAccountId: "ea_...",
   *   amount: { value: 10000, currencyCode: "USD" },
   *   purpose: AchTransferPurpose.DEPOSIT,
   * });
   * ```
   */
  async initiateTransfer(
    input: InitiateAchTransferMutationVariables["input"],
  ): Promise<AchTransfer> {
    const { data } = await this._client.graphql.rawRequest<InitiateAchTransferMutation>(
      print(InitiateAchTransferDocument),
      { input },
    );
    const result = data?.initiateAchTransfer;
    throwIfError(result);
    if (!result || result.__typename !== "OriginatedAchTransfer") {
      throw new HighnoteUnexpectedResponseError(result?.__typename ?? "null", "Unexpected response from initiateAchTransfer");
    }
    return result as AchTransfer;
  }

  /**
   * Schedule a one-time ACH transfer for a future date.
   *
   * ```ts
   * const scheduled = await client.ach.createOneTimeTransfer({
   *   financialAccountId: "fa_...",
   *   externalAccountId: "ea_...",
   *   amount: { value: 5000, currencyCode: "USD" },
   *   purpose: AchTransferPurpose.WITHDRAWAL,
   *   scheduledDate: "2026-06-01",
   * });
   * ```
   */
  async createOneTimeTransfer(
    input: CreateOneTimeAchTransferMutationVariables["input"],
  ): Promise<OneTimeAchTransfer> {
    const { data } = await this._client.graphql.rawRequest<CreateOneTimeAchTransferMutation>(
      print(CreateOneTimeAchTransferDocument),
      { input },
    );
    const result = data?.createOneTimeACHTransfer;
    throwIfError(result);
    if (!result || result.__typename !== "OneTimeACHTransfer") {
      throw new HighnoteUnexpectedResponseError(result?.__typename ?? "null", "Unexpected response from createOneTimeAchTransfer");
    }
    return result as OneTimeAchTransfer;
  }

  /**
   * Schedule a recurring ACH transfer (e.g., payroll, monthly deposits).
   *
   * ```ts
   * const recurring = await client.ach.createRecurringTransfer({
   *   financialAccountId: "fa_...",
   *   externalAccountId: "ea_...",
   *   amount: { value: 100000, currencyCode: "USD" },
   *   purpose: AchTransferPurpose.PAYROLL,
   *   schedule: { frequency: "BIWEEKLY", startDate: "2026-06-01" },
   * });
   * ```
   */
  async createRecurringTransfer(
    input: CreateRecurringAchTransferMutationVariables["input"],
  ): Promise<RecurringAchTransfer> {
    const { data } = await this._client.graphql.rawRequest<CreateRecurringAchTransferMutation>(
      print(CreateRecurringAchTransferDocument),
      { input },
    );
    const result = data?.createRecurringACHTransfer;
    throwIfError(result);
    if (!result || result.__typename !== "RecurringACHTransfer") {
      throw new HighnoteUnexpectedResponseError(result?.__typename ?? "null", "Unexpected response from createRecurringAchTransfer");
    }
    return result as RecurringAchTransfer;
  }

  /**
   * Cancel a scheduled (one-time or recurring) ACH transfer.
   *
   * ```ts
   * await client.ach.cancelTransfer({ scheduledTransferId: "st_..." });
   * ```
   */
  async cancelTransfer(
    input: CancelScheduledTransferMutationVariables["input"],
  ): Promise<CancelledTransfer> {
    const { data } = await this._client.graphql.rawRequest<CancelScheduledTransferMutation>(
      print(CancelScheduledTransferDocument),
      { input },
    );
    const result = data?.cancelScheduledTransfer;
    throwIfError(result);
    if (!result || (result.__typename !== "OneTimeACHTransfer" && result.__typename !== "RecurringACHTransfer")) {
      throw new HighnoteUnexpectedResponseError(result?.__typename ?? "null", "Unexpected response from cancelScheduledTransfer");
    }
    return result as CancelledTransfer;
  }
}
