import { print } from "graphql";

import type { TestResource } from "./index.js";
import { throwIfError, HighnoteUnexpectedResponseError } from "../../errors.js";
import type {
  SimulateDepositMutation,
  SimulateDepositMutationVariables,
} from "../../generated/graphql.js";
import {
  SimulateDepositDocument,
} from "../../generated/graphql.js";

// ── Types ──

type SimulatedDeposit = Extract<
  NonNullable<SimulateDepositMutation["simulateDeposit"]>,
  { __typename: "Transfer" } | { __typename: "WireTransfer" }
>;

// ── Resource ──

export class TestDepositsResource {
  constructor(private readonly _test: TestResource) {}

  async create(
    input: SimulateDepositMutationVariables["input"],
  ): Promise<SimulatedDeposit> {
    this._test.guardEnvironment("test.deposits.create");
    const { data } = await this._test._client.graphql.rawRequest<SimulateDepositMutation>(
      print(SimulateDepositDocument),
      { input },
    );
    const result = data?.simulateDeposit;
    throwIfError(result);
    if (!result || (result.__typename !== "Transfer" && result.__typename !== "WireTransfer")) {
      throw new HighnoteUnexpectedResponseError(result?.__typename ?? "null", "Unexpected response from simulateDeposit");
    }
    return result as SimulatedDeposit;
  }
}
