import { print } from "graphql";

import type { Highnote } from "../client.js";
import { throwIfError, HighnoteUnexpectedResponseError } from "../errors.js";
import type {
  CreateMerchantCategorySpendRuleMutation,
  CreateMerchantCategorySpendRuleMutationVariables,
  CreateAmountLimitSpendRuleMutation,
  CreateAmountLimitSpendRuleMutationVariables,
  AttachSpendRuleToPaymentCardMutation,
  AttachSpendRuleToPaymentCardMutationVariables,
  DetachSpendRuleFromPaymentCardMutation,
  DetachSpendRuleFromPaymentCardMutationVariables,
} from "../generated/graphql.js";
import {
  CreateMerchantCategorySpendRuleDocument,
  CreateAmountLimitSpendRuleDocument,
  AttachSpendRuleToPaymentCardDocument,
  DetachSpendRuleFromPaymentCardDocument,
} from "../generated/graphql.js";

// ── Types ──

type MerchantCategorySpendRuleResponse = Extract<
  NonNullable<CreateMerchantCategorySpendRuleMutation["createMerchantCategorySpendRule"]>,
  { __typename: "MerchantCategorySpendRule" }
>;

type AmountLimitSpendRuleResponse = Extract<
  NonNullable<CreateAmountLimitSpendRuleMutation["createAmountLimitSpendRule"]>,
  { __typename: "AmountLimitSpendRule" }
>;

type AttachSpendRuleResponse = Extract<
  NonNullable<AttachSpendRuleToPaymentCardMutation["attachSpendRuleToPaymentCard"]>,
  { __typename: "PaymentCard" }
>;

type DetachSpendRuleResponse = Extract<
  NonNullable<DetachSpendRuleFromPaymentCardMutation["detachSpendRuleFromPaymentCard"]>,
  { __typename: "PaymentCard" }
>;

export type SpendRule = MerchantCategorySpendRuleResponse | AmountLimitSpendRuleResponse;

// ── Resource ──

export class SpendRulesResource {
  constructor(private readonly client: Highnote) {}

  /**
   * Create a merchant category spend rule (allow/block by MCC).
   *
   * ```ts
   * const rule = await client.spendRules.createMerchantCategory({
   *   name: "Block ATM",
   *   blocked: ["6011"],
   * });
   * ```
   */
  async createMerchantCategory(
    input: CreateMerchantCategorySpendRuleMutationVariables["input"],
  ): Promise<MerchantCategorySpendRuleResponse> {
    const { data } =
      await this.client.graphql.rawRequest<CreateMerchantCategorySpendRuleMutation>(
        print(CreateMerchantCategorySpendRuleDocument),
        { input },
      );

    const result = data?.createMerchantCategorySpendRule;
    throwIfError(result);

    if (!result || result.__typename !== "MerchantCategorySpendRule") {
      throw new HighnoteUnexpectedResponseError(
        result?.__typename ?? "null",
        "Unexpected response from createMerchantCategorySpendRule",
      );
    }

    return result as MerchantCategorySpendRuleResponse;
  }

  /**
   * Create an amount limit spend rule.
   *
   * ```ts
   * const rule = await client.spendRules.createAmountLimit({
   *   name: "Max $500",
   *   maximumAmount: { value: "500.00", currencyCode: "USD" },
   * });
   * ```
   */
  async createAmountLimit(
    input: CreateAmountLimitSpendRuleMutationVariables["input"],
  ): Promise<AmountLimitSpendRuleResponse> {
    const { data } =
      await this.client.graphql.rawRequest<CreateAmountLimitSpendRuleMutation>(
        print(CreateAmountLimitSpendRuleDocument),
        { input },
      );

    const result = data?.createAmountLimitSpendRule;
    throwIfError(result);

    if (!result || result.__typename !== "AmountLimitSpendRule") {
      throw new HighnoteUnexpectedResponseError(
        result?.__typename ?? "null",
        "Unexpected response from createAmountLimitSpendRule",
      );
    }

    return result as AmountLimitSpendRuleResponse;
  }

  /**
   * Attach a spend rule to a payment card.
   *
   * ```ts
   * await client.spendRules.attachToCard({
   *   paymentCardId: "pc_...",
   *   spendRule: { id: "sr_...", version: "LATEST" },
   * });
   * ```
   */
  async attachToCard(
    input: AttachSpendRuleToPaymentCardMutationVariables["input"],
  ): Promise<AttachSpendRuleResponse> {
    const { data } =
      await this.client.graphql.rawRequest<AttachSpendRuleToPaymentCardMutation>(
        print(AttachSpendRuleToPaymentCardDocument),
        { input },
      );

    const result = data?.attachSpendRuleToPaymentCard;
    throwIfError(result);

    if (!result || result.__typename !== "PaymentCard") {
      throw new HighnoteUnexpectedResponseError(
        result?.__typename ?? "null",
        "Unexpected response from attachSpendRuleToPaymentCard",
      );
    }

    return result as AttachSpendRuleResponse;
  }

  /**
   * Detach a spend rule from a payment card.
   *
   * ```ts
   * await client.spendRules.detachFromCard({
   *   paymentCardId: "pc_...",
   *   spendRule: { id: "sr_..." },
   * });
   * ```
   */
  async detachFromCard(
    input: DetachSpendRuleFromPaymentCardMutationVariables["input"],
  ): Promise<DetachSpendRuleResponse> {
    const { data } =
      await this.client.graphql.rawRequest<DetachSpendRuleFromPaymentCardMutation>(
        print(DetachSpendRuleFromPaymentCardDocument),
        { input },
      );

    const result = data?.detachSpendRuleFromPaymentCard;
    throwIfError(result);

    if (!result || result.__typename !== "PaymentCard") {
      throw new HighnoteUnexpectedResponseError(
        result?.__typename ?? "null",
        "Unexpected response from detachSpendRuleFromPaymentCard",
      );
    }

    return result as DetachSpendRuleResponse;
  }
}
