import { print } from "graphql";

import type { Highnote } from "../client.js";
import { throwIfError, HighnoteUnexpectedResponseError } from "../errors.js";
import type {
  AddExternalBankAccountVerifiedThroughPlaidMutation,
  AddExternalBankAccountVerifiedThroughPlaidMutationVariables,
  AddExternalBankAccountVerifiedThroughFinicityMutation,
  AddExternalBankAccountVerifiedThroughFinicityMutationVariables,
  AddNonVerifiedExternalUsFinancialBankAccountMutation,
  AddNonVerifiedExternalUsFinancialBankAccountMutationVariables,
} from "../generated/graphql.js";
import {
  AddExternalBankAccountVerifiedThroughPlaidDocument,
  AddExternalBankAccountVerifiedThroughFinicityDocument,
  AddNonVerifiedExternalUsFinancialBankAccountDocument,
} from "../generated/graphql.js";

// ── Types ──

type ExternalBankAccount = Extract<
  NonNullable<
    AddExternalBankAccountVerifiedThroughPlaidMutation["addExternalBankAccountVerifiedThroughPlaid"]
  >,
  { __typename: "ExternalFinancialBankAccount" }
>;

type NonVerifiedExternalBankAccount = Extract<
  NonNullable<
    AddNonVerifiedExternalUsFinancialBankAccountMutation["addNonVerifiedExternalUSFinancialBankAccount"]
  >,
  { __typename: "NonVerifiedExternalUSFinancialBankAccount" }
>;

export type { ExternalBankAccount, NonVerifiedExternalBankAccount };

// ── Resource ──

export class ExternalAccountsResource {
  constructor(private readonly client: Highnote) {}

  /**
   * Add an external bank account verified through Plaid.
   *
   * ```ts
   * const account = await client.externalAccounts.addVerifiedThroughPlaid({
   *   accountHolderId: "ah_...",
   *   externalToken: { value: "plaid_token_..." },
   * });
   * ```
   */
  async addVerifiedThroughPlaid(
    input: AddExternalBankAccountVerifiedThroughPlaidMutationVariables["input"],
  ): Promise<ExternalBankAccount> {
    const { data } =
      await this.client.graphql.rawRequest<AddExternalBankAccountVerifiedThroughPlaidMutation>(
        print(AddExternalBankAccountVerifiedThroughPlaidDocument),
        { input },
      );

    const result = data?.addExternalBankAccountVerifiedThroughPlaid;
    throwIfError(result);

    if (!result || result.__typename !== "ExternalFinancialBankAccount") {
      throw new HighnoteUnexpectedResponseError(
        result?.__typename ?? "null",
        "Unexpected response from addExternalBankAccountVerifiedThroughPlaid",
      );
    }

    return result as ExternalBankAccount;
  }

  /**
   * Add an external bank account verified through Finicity.
   *
   * ```ts
   * const account = await client.externalAccounts.addVerifiedThroughFinicity({
   *   accountHolderId: "ah_...",
   *   name: "My Checking",
   *   bankAccountType: BankAccountType.CHECKING,
   *   externalToken: { customerId: "cust_..." },
   * });
   * ```
   */
  async addVerifiedThroughFinicity(
    input: AddExternalBankAccountVerifiedThroughFinicityMutationVariables["input"],
  ): Promise<ExternalBankAccount> {
    const { data } =
      await this.client.graphql.rawRequest<AddExternalBankAccountVerifiedThroughFinicityMutation>(
        print(AddExternalBankAccountVerifiedThroughFinicityDocument),
        { input },
      );

    const result = data?.addExternalBankAccountVerifiedThroughFinicity;
    throwIfError(result);

    if (!result || result.__typename !== "ExternalFinancialBankAccount") {
      throw new HighnoteUnexpectedResponseError(
        result?.__typename ?? "null",
        "Unexpected response from addExternalBankAccountVerifiedThroughFinicity",
      );
    }

    return result as ExternalBankAccount;
  }

  /**
   * Add a non-verified external US financial bank account.
   *
   * ```ts
   * const account = await client.externalAccounts.addNonVerified({
   *   accountHolderId: "ah_...",
   *   routingNumber: "091000019",
   *   accountNumber: "123456789",
   *   bankAccountType: BankAccountType.CHECKING,
   *   name: "Manual Checking",
   * });
   * ```
   */
  async addNonVerified(
    input: AddNonVerifiedExternalUsFinancialBankAccountMutationVariables["input"],
  ): Promise<NonVerifiedExternalBankAccount> {
    const { data } =
      await this.client.graphql.rawRequest<AddNonVerifiedExternalUsFinancialBankAccountMutation>(
        print(AddNonVerifiedExternalUsFinancialBankAccountDocument),
        { input },
      );

    const result = data?.addNonVerifiedExternalUSFinancialBankAccount;
    throwIfError(result);

    if (
      !result ||
      result.__typename !== "NonVerifiedExternalUSFinancialBankAccount"
    ) {
      throw new HighnoteUnexpectedResponseError(
        result?.__typename ?? "null",
        "Unexpected response from addNonVerifiedExternalUSFinancialBankAccount",
      );
    }

    return result as NonVerifiedExternalBankAccount;
  }
}
