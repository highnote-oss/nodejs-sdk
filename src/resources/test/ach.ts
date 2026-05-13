import { print } from "graphql";

import type { TestResource } from "./index.js";
import { throwIfError, HighnoteUnexpectedResponseError } from "../../errors.js";
import type {
  SimulateAchTransferProcessingMutation,
  SimulateAchTransferProcessingMutationVariables,
  SimulateAchTransferReturnMutation,
  SimulateAchTransferReturnMutationVariables,
  SimulateExternallyInitiatedAchTransferMutation,
  SimulateExternallyInitiatedAchTransferMutationVariables,
  SimulateNonOriginatedAchTransferMutation,
  SimulateNonOriginatedAchTransferMutationVariables,
} from "../../generated/graphql.js";
import {
  SimulateAchTransferProcessingDocument,
  SimulateAchTransferReturnDocument,
  SimulateExternallyInitiatedAchTransferDocument,
  SimulateNonOriginatedAchTransferDocument,
} from "../../generated/graphql.js";

// ── Types ──

type SimulatedAchTransfer = Extract<
  NonNullable<SimulateAchTransferProcessingMutation["simulateAchTransferProcessing"]>,
  { __typename: "NonOriginatedAchTransfer" } | { __typename: "OriginatedAchTransfer" }
>;

type SimulatedExternallyInitiatedAchTransfer = Extract<
  NonNullable<SimulateExternallyInitiatedAchTransferMutation["simulateExternallyInitiatedACHTransfer"]>,
  { __typename: "CreditFunds" } | { __typename: "DebitFunds" } | { __typename: "PayrollTransfer" } | { __typename: "SecureDeposit" }
>;

type SimulatedNonOriginatedAchTransfer = Extract<
  NonNullable<SimulateNonOriginatedAchTransferMutation["simulateNonOriginatedAchTransfer"]>,
  { __typename: "NonOriginatedAchTransfer" }
>;

// ── Resource ──

export class TestAchResource {
  constructor(private readonly _test: TestResource) {}

  async simulateProcessing(
    input: SimulateAchTransferProcessingMutationVariables["input"],
  ): Promise<SimulatedAchTransfer> {
    this._test.guardEnvironment("test.ach.simulateProcessing");
    const { data } = await this._test._client.graphql.rawRequest<SimulateAchTransferProcessingMutation>(
      print(SimulateAchTransferProcessingDocument),
      { input },
    );
    const result = data?.simulateAchTransferProcessing;
    throwIfError(result);
    const successTypes = ["NonOriginatedAchTransfer", "OriginatedAchTransfer"];
    if (!result || !successTypes.includes(result.__typename)) {
      throw new HighnoteUnexpectedResponseError(result?.__typename ?? "null", "Unexpected response from simulateAchTransferProcessing");
    }
    return result as SimulatedAchTransfer;
  }

  async simulateReturn(
    input: SimulateAchTransferReturnMutationVariables["input"],
  ): Promise<SimulatedAchTransfer> {
    this._test.guardEnvironment("test.ach.simulateReturn");
    const { data } = await this._test._client.graphql.rawRequest<SimulateAchTransferReturnMutation>(
      print(SimulateAchTransferReturnDocument),
      { input },
    );
    const result = data?.simulateAchTransferReturn;
    throwIfError(result);
    const successTypes = ["NonOriginatedAchTransfer", "OriginatedAchTransfer"];
    if (!result || !successTypes.includes(result.__typename)) {
      throw new HighnoteUnexpectedResponseError(result?.__typename ?? "null", "Unexpected response from simulateAchTransferReturn");
    }
    return result as SimulatedAchTransfer;
  }

  async simulateExternallyInitiated(
    input: SimulateExternallyInitiatedAchTransferMutationVariables["input"],
  ): Promise<SimulatedExternallyInitiatedAchTransfer> {
    this._test.guardEnvironment("test.ach.simulateExternallyInitiated");
    const { data } = await this._test._client.graphql.rawRequest<SimulateExternallyInitiatedAchTransferMutation>(
      print(SimulateExternallyInitiatedAchTransferDocument),
      { input },
    );
    const result = data?.simulateExternallyInitiatedACHTransfer;
    throwIfError(result);
    const successTypes = ["CreditFunds", "DebitFunds", "PayrollTransfer", "SecureDeposit"];
    if (!result || !successTypes.includes(result.__typename)) {
      throw new HighnoteUnexpectedResponseError(result?.__typename ?? "null", "Unexpected response from simulateExternallyInitiatedACHTransfer");
    }
    return result as SimulatedExternallyInitiatedAchTransfer;
  }

  async simulateNonOriginated(
    input: SimulateNonOriginatedAchTransferMutationVariables["input"],
  ): Promise<SimulatedNonOriginatedAchTransfer> {
    this._test.guardEnvironment("test.ach.simulateNonOriginated");
    const { data } = await this._test._client.graphql.rawRequest<SimulateNonOriginatedAchTransferMutation>(
      print(SimulateNonOriginatedAchTransferDocument),
      { input },
    );
    const result = data?.simulateNonOriginatedAchTransfer;
    throwIfError(result);
    if (!result || result.__typename !== "NonOriginatedAchTransfer") {
      throw new HighnoteUnexpectedResponseError(result?.__typename ?? "null", "Unexpected response from simulateNonOriginatedAchTransfer");
    }
    return result as SimulatedNonOriginatedAchTransfer;
  }
}
