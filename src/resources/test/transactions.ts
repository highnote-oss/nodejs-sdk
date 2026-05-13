import { print } from "graphql";

import type { TestResource } from "./index.js";
import { throwIfError, HighnoteUnexpectedResponseError } from "../../errors.js";
import type {
  SimulateAuthorizationMutation,
  SimulateAuthorizationMutationVariables,
  SimulateClearingMutation,
  SimulateClearingMutationVariables,
  SimulateSingleStepAuthAndClearMutation,
  SimulateSingleStepAuthAndClearMutationVariables,
  SimulateReversalMutation,
  SimulateReversalMutationVariables,
  SimulateRefundMutation,
  SimulateRefundMutationVariables,
  SimulateAdjustmentMutation,
  SimulateAdjustmentMutationVariables,
} from "../../generated/graphql.js";
import {
  SimulateAuthorizationDocument,
  SimulateClearingDocument,
  SimulateSingleStepAuthAndClearDocument,
  SimulateReversalDocument,
  SimulateRefundDocument,
  SimulateAdjustmentDocument,
  CardTransactionProcessingType,
  Iso4217Alpha3SupportedCurrency,
} from "../../generated/graphql.js";

// ── Types ──

type SimulatedAuthorization = Extract<
  NonNullable<SimulateAuthorizationMutation["simulateAuthorization"]>,
  { __typename: "AuthorizationEvent" }
>;

type SimulatedClearing = Extract<
  NonNullable<SimulateClearingMutation["simulateClearing"]>,
  { __typename: "ClearingEvent" }
>;

type SimulatedAuthAndClear = Extract<
  NonNullable<SimulateSingleStepAuthAndClearMutation["simulateSingleStepAuthAndClear"]>,
  { __typename: "AuthorizationAndClearEvent" }
>;

type SimulatedReversal = Extract<
  NonNullable<SimulateReversalMutation["simulateReversal"]>,
  { __typename: "ReversalEvent" }
>;

type SimulatedRefund = Extract<
  NonNullable<SimulateRefundMutation["simulateRefund"]>,
  { __typename: "ClearingEvent" }
>;

type SimulatedAdjustment = Extract<
  NonNullable<SimulateAdjustmentMutation["simulateAdjustment"]>,
  { __typename: "AdjustmentEvent" }
>;

// ── Resource ──

export class TestTransactionsResource {
  constructor(private readonly _test: TestResource) {}

  async authorize(
    input: SimulateAuthorizationMutationVariables["input"],
  ): Promise<SimulatedAuthorization> {
    this._test.guardEnvironment("test.transactions.authorize");
    const { data } = await this._test._client.graphql.rawRequest<SimulateAuthorizationMutation>(
      print(SimulateAuthorizationDocument),
      { input },
    );
    const result = data?.simulateAuthorization;
    throwIfError(result);
    if (!result || result.__typename !== "AuthorizationEvent") {
      throw new HighnoteUnexpectedResponseError(result?.__typename ?? "null", "Unexpected response from simulateAuthorization");
    }
    return result as SimulatedAuthorization;
  }

  async clear(
    input: SimulateClearingMutationVariables["input"],
  ): Promise<SimulatedClearing> {
    this._test.guardEnvironment("test.transactions.clear");
    const { data } = await this._test._client.graphql.rawRequest<SimulateClearingMutation>(
      print(SimulateClearingDocument),
      { input },
    );
    const result = data?.simulateClearing;
    throwIfError(result);
    if (!result || result.__typename !== "ClearingEvent") {
      throw new HighnoteUnexpectedResponseError(result?.__typename ?? "null", "Unexpected response from simulateClearing");
    }
    return result as SimulatedClearing;
  }

  async authAndClear(
    input: SimulateSingleStepAuthAndClearMutationVariables["input"],
  ): Promise<SimulatedAuthAndClear> {
    this._test.guardEnvironment("test.transactions.authAndClear");
    const { data } = await this._test._client.graphql.rawRequest<SimulateSingleStepAuthAndClearMutation>(
      print(SimulateSingleStepAuthAndClearDocument),
      { input },
    );
    const result = data?.simulateSingleStepAuthAndClear;
    throwIfError(result);
    if (!result || result.__typename !== "AuthorizationAndClearEvent") {
      throw new HighnoteUnexpectedResponseError(result?.__typename ?? "null", "Unexpected response from simulateSingleStepAuthAndClear");
    }
    return result as SimulatedAuthAndClear;
  }

  async reverse(
    input: SimulateReversalMutationVariables["input"],
  ): Promise<SimulatedReversal> {
    this._test.guardEnvironment("test.transactions.reverse");
    const { data } = await this._test._client.graphql.rawRequest<SimulateReversalMutation>(
      print(SimulateReversalDocument),
      { input },
    );
    const result = data?.simulateReversal;
    throwIfError(result);
    if (!result || result.__typename !== "ReversalEvent") {
      throw new HighnoteUnexpectedResponseError(result?.__typename ?? "null", "Unexpected response from simulateReversal");
    }
    return result as SimulatedReversal;
  }

  async refund(
    input: SimulateRefundMutationVariables["input"],
  ): Promise<SimulatedRefund> {
    this._test.guardEnvironment("test.transactions.refund");
    const { data } = await this._test._client.graphql.rawRequest<SimulateRefundMutation>(
      print(SimulateRefundDocument),
      { input },
    );
    const result = data?.simulateRefund;
    throwIfError(result);
    if (!result || result.__typename !== "ClearingEvent") {
      throw new HighnoteUnexpectedResponseError(result?.__typename ?? "null", "Unexpected response from simulateRefund");
    }
    return result as SimulatedRefund;
  }

  async verify(
    input: Omit<SimulateAuthorizationMutationVariables["input"], "amount" | "transactionProcessingType"> & {
      amount?: SimulateAuthorizationMutationVariables["input"]["amount"];
    },
  ): Promise<SimulatedAuthorization> {
    this._test.guardEnvironment("test.transactions.verify");
    return this.authorize({
      ...input,
      amount: input.amount ?? { value: "0", currencyCode: Iso4217Alpha3SupportedCurrency.USD },
      transactionProcessingType: CardTransactionProcessingType.ACCOUNT_VERIFICATION,
    });
  }

  async adjust(
    input: SimulateAdjustmentMutationVariables["input"],
  ): Promise<SimulatedAdjustment> {
    this._test.guardEnvironment("test.transactions.adjust");
    const { data } = await this._test._client.graphql.rawRequest<SimulateAdjustmentMutation>(
      print(SimulateAdjustmentDocument),
      { input },
    );
    const result = data?.simulateAdjustment;
    throwIfError(result);
    if (!result || result.__typename !== "AdjustmentEvent") {
      throw new HighnoteUnexpectedResponseError(result?.__typename ?? "null", "Unexpected response from simulateAdjustment");
    }
    return result as SimulatedAdjustment;
  }
}
