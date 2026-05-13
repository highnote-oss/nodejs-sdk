import { print } from "graphql";

import type { TestResource } from "./index.js";
import { throwIfError, HighnoteUnexpectedResponseError } from "../../errors.js";
import type {
  SimulateInitiateFinancialAccountClosureMutation,
  SimulateInitiateFinancialAccountClosureMutationVariables,
  SimulateCloseFinancialAccountMutation,
  SimulateCloseFinancialAccountMutationVariables,
} from "../../generated/graphql.js";
import {
  SimulateInitiateFinancialAccountClosureDocument,
  SimulateCloseFinancialAccountDocument,
} from "../../generated/graphql.js";

// ── Types ──

type SimulatedFinancialAccount = Extract<
  NonNullable<SimulateInitiateFinancialAccountClosureMutation["simulateInitiateFinancialAccountClosure"]>,
  { __typename: "FinancialAccount" }
>;

// ── Resource ──

export class TestFinancialAccountsResource {
  constructor(private readonly _test: TestResource) {}

  async initiateClosure(
    input: SimulateInitiateFinancialAccountClosureMutationVariables["input"],
  ): Promise<SimulatedFinancialAccount> {
    this._test.guardEnvironment("test.financialAccounts.initiateClosure");
    const { data } = await this._test._client.graphql.rawRequest<SimulateInitiateFinancialAccountClosureMutation>(
      print(SimulateInitiateFinancialAccountClosureDocument),
      { input },
    );
    const result = data?.simulateInitiateFinancialAccountClosure;
    throwIfError(result);
    if (!result || result.__typename !== "FinancialAccount") {
      throw new HighnoteUnexpectedResponseError(result?.__typename ?? "null", "Unexpected response from simulateInitiateFinancialAccountClosure");
    }
    return result as SimulatedFinancialAccount;
  }

  async close(
    input: SimulateCloseFinancialAccountMutationVariables["input"],
  ): Promise<SimulatedFinancialAccount> {
    this._test.guardEnvironment("test.financialAccounts.close");
    const { data } = await this._test._client.graphql.rawRequest<SimulateCloseFinancialAccountMutation>(
      print(SimulateCloseFinancialAccountDocument),
      { input },
    );
    const result = data?.simulateCloseFinancialAccount;
    throwIfError(result);
    if (!result || result.__typename !== "FinancialAccount") {
      throw new HighnoteUnexpectedResponseError(result?.__typename ?? "null", "Unexpected response from simulateCloseFinancialAccount");
    }
    return result as SimulatedFinancialAccount;
  }
}
