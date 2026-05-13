import { print } from "graphql";

import type { Highnote } from "../client.js";
import { throwIfError, HighnoteUnexpectedResponseError } from "../errors.js";
import type {
  IssueFinancialAccountForApplicationMutation,
  IssueFinancialAccountForApplicationMutationVariables,
  FindFinancialAccountQuery,
  FindFinancialAccountActivitiesQuery,
  FindReviewWorkflowEventsQuery,
  SuspendFinancialAccountMutation,
  SuspendFinancialAccountMutationVariables,
  UnsuspendFinancialAccountMutation,
  UnsuspendFinancialAccountMutationVariables,
} from "../generated/graphql.js";
import {
  IssueFinancialAccountForApplicationDocument,
  FindFinancialAccountDocument,
  FindFinancialAccountActivitiesDocument,
  FindReviewWorkflowEventsDocument,
  SuspendFinancialAccountDocument,
  UnsuspendFinancialAccountDocument,
} from "../generated/graphql.js";
import { paginate, type RelayConnection } from "../pagination.js";

// ── Types ──

type IssuedFinancialAccount = Extract<
  NonNullable<IssueFinancialAccountForApplicationMutation["issueFinancialAccountForApplication"]>,
  { __typename: "FinancialAccount" }
>;

type FindFinancialAccountNode = Extract<
  NonNullable<FindFinancialAccountQuery["node"]>,
  { __typename: "FinancialAccount" }
>;

type SuspendedFinancialAccount = Extract<
  NonNullable<SuspendFinancialAccountMutation["suspendFinancialAccount"]>,
  { __typename: "FinancialAccount" }
>;

type UnsuspendedFinancialAccount = Extract<
  NonNullable<UnsuspendFinancialAccountMutation["unsuspendFinancialAccount"]>,
  { __typename: "FinancialAccount" }
>;

export type FinancialAccount =
  | IssuedFinancialAccount
  | FindFinancialAccountNode
  | SuspendedFinancialAccount
  | UnsuspendedFinancialAccount;

type ActivitiesFinancialAccount = Extract<
  NonNullable<FindFinancialAccountActivitiesQuery["node"]>,
  { __typename: "FinancialAccount" }
>;

type ActivityNode = NonNullable<
  NonNullable<
    NonNullable<ActivitiesFinancialAccount["financialAccountActivities"]>["edges"]
  >[number]
>["node"];

export type FinancialAccountActivity = NonNullable<ActivityNode>;

export interface ListActivitiesOptions {
  pageSize?: number;
}

type ReviewWorkflowFinancialAccount = Extract<
  NonNullable<FindReviewWorkflowEventsQuery["node"]>,
  { __typename: "FinancialAccount" }
>;

type ReviewWorkflowConnection = Extract<
  NonNullable<ReviewWorkflowFinancialAccount["reviewWorkflowEvents"]>,
  { __typename: "ReviewWorkflowEventConnection" }
>;

type ReviewWorkflowEventNode = NonNullable<
  NonNullable<ReviewWorkflowConnection["edges"]>[number]
>["node"];

export type ReviewWorkflowEvent = NonNullable<ReviewWorkflowEventNode>;

export interface ListReviewWorkflowEventsOptions {
  pageSize?: number;
}

// ── Resource ──

export class FinancialAccountsResource {
  constructor(private readonly client: Highnote) {}

  /**
   * Issue a financial account for an approved application.
   *
   * ```ts
   * const account = await client.financialAccounts.issue({
   *   applicationId: "app_...",
   *   name: "Main Account",
   * });
   * ```
   */
  async issue(
    input: IssueFinancialAccountForApplicationMutationVariables["input"],
  ): Promise<IssuedFinancialAccount> {
    const { data } =
      await this.client.graphql.rawRequest<IssueFinancialAccountForApplicationMutation>(
        print(IssueFinancialAccountForApplicationDocument),
        { input },
      );

    const result = data?.issueFinancialAccountForApplication;
    throwIfError(result);

    if (!result || result.__typename !== "FinancialAccount") {
      throw new HighnoteUnexpectedResponseError(
        result?.__typename ?? "null",
        "Unexpected response from issueFinancialAccountForApplication",
      );
    }

    return result as IssuedFinancialAccount;
  }

  /**
   * Retrieve a financial account by ID.
   *
   * ```ts
   * const account = await client.financialAccounts.get("fa_...");
   * ```
   */
  async get(id: string): Promise<FindFinancialAccountNode> {
    const { data } = await this.client.graphql.rawRequest<FindFinancialAccountQuery>(
      print(FindFinancialAccountDocument),
      { id },
    );

    const node = data?.node;
    if (!node || node.__typename !== "FinancialAccount") {
      throw new HighnoteUnexpectedResponseError(
        node?.__typename ?? "null",
        `Financial account not found: ${id}`,
      );
    }

    return node as FindFinancialAccountNode;
  }

  /**
   * Suspend a financial account.
   *
   * ```ts
   * import { FinancialAccountSuspensionReasonInput } from "@highnote-oss/nodejs-sdk";
   *
   * await client.financialAccounts.suspend({
   *   id: "fa_...",
   *   memo: "Suspected fraud",
   *   suspensionReason: FinancialAccountSuspensionReasonInput.SUSPECTED_FRAUD,
   * });
   * ```
   */
  async suspend(
    input: SuspendFinancialAccountMutationVariables["input"],
  ): Promise<SuspendedFinancialAccount> {
    const { data } =
      await this.client.graphql.rawRequest<SuspendFinancialAccountMutation>(
        print(SuspendFinancialAccountDocument),
        { input },
      );

    const result = data?.suspendFinancialAccount;
    throwIfError(result);

    if (!result || result.__typename !== "FinancialAccount") {
      throw new HighnoteUnexpectedResponseError(
        result?.__typename ?? "null",
        "Unexpected response from suspendFinancialAccount",
      );
    }

    return result as SuspendedFinancialAccount;
  }

  /**
   * Unsuspend a financial account.
   *
   * ```ts
   * await client.financialAccounts.unsuspend({
   *   id: "fa_...",
   *   memo: "Issue resolved",
   * });
   * ```
   */
  async unsuspend(
    input: UnsuspendFinancialAccountMutationVariables["input"],
  ): Promise<UnsuspendedFinancialAccount> {
    const { data } =
      await this.client.graphql.rawRequest<UnsuspendFinancialAccountMutation>(
        print(UnsuspendFinancialAccountDocument),
        { input },
      );

    const result = data?.unsuspendFinancialAccount;
    throwIfError(result);

    if (!result || result.__typename !== "FinancialAccount") {
      throw new HighnoteUnexpectedResponseError(
        result?.__typename ?? "null",
        "Unexpected response from unsuspendFinancialAccount",
      );
    }

    return result as UnsuspendedFinancialAccount;
  }

  /**
   * List activities for a financial account with auto-pagination.
   * Activities include card transactions, deposits, transfers, and fees.
   *
   * ```ts
   * for await (const activity of client.financialAccounts.listActivities("fa_...")) {
   *   console.log(activity.sign, activity.pendingAmount, activity.postedAmount);
   * }
   * ```
   */
  listActivities(
    financialAccountId: string,
    options?: ListActivitiesOptions,
  ): AsyncIterable<FinancialAccountActivity> {
    const pageSize = options?.pageSize ?? this.client.defaultPageSize;

    return paginate<FinancialAccountActivity>(async (after) => {
      const { data } =
        await this.client.graphql.rawRequest<FindFinancialAccountActivitiesQuery>(
          print(FindFinancialAccountActivitiesDocument),
          { id: financialAccountId, first: pageSize, after },
        );

      const node = data?.node;
      if (!node || node.__typename !== "FinancialAccount") {
        return {
          edges: [],
          pageInfo: { hasNextPage: false, endCursor: "" },
        } as RelayConnection<FinancialAccountActivity>;
      }

      return (node.financialAccountActivities ?? {
        edges: [],
        pageInfo: { hasNextPage: false, endCursor: "" },
      }) as RelayConnection<FinancialAccountActivity>;
    });
  }

  /**
   * List review workflow events (wire transfers) for a financial account.
   *
   * ```ts
   * for await (const event of client.financialAccounts.listReviewWorkflowEvents("fa_...")) {
   *   console.log(event.reviewState, event.transfer?.amount, event.transfer?.type);
   * }
   * ```
   */
  listReviewWorkflowEvents(
    financialAccountId: string,
    options?: ListReviewWorkflowEventsOptions,
  ): AsyncIterable<ReviewWorkflowEvent> {
    const pageSize = options?.pageSize ?? this.client.defaultPageSize;

    return paginate<ReviewWorkflowEvent>(async (after) => {
      const { data } =
        await this.client.graphql.rawRequest<FindReviewWorkflowEventsQuery>(
          print(FindReviewWorkflowEventsDocument),
          { id: financialAccountId, first: pageSize, after },
        );

      const node = data?.node;
      if (!node || node.__typename !== "FinancialAccount") {
        return {
          edges: [],
          pageInfo: { hasNextPage: false, endCursor: "" },
        } as RelayConnection<ReviewWorkflowEvent>;
      }

      const result = node.reviewWorkflowEvents;
      throwIfError(result);

      if (!result || result.__typename !== "ReviewWorkflowEventConnection") {
        return {
          edges: [],
          pageInfo: { hasNextPage: false, endCursor: "" },
        } as RelayConnection<ReviewWorkflowEvent>;
      }

      return result as RelayConnection<ReviewWorkflowEvent>;
    });
  }
}
