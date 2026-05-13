import { print } from "graphql";

import type { Highnote } from "../client.js";
import { paginate, type RelayConnection } from "../pagination.js";
import type {
  ListPaymentTransactionsQuery,
  ListPaymentTransactionsQueryVariables,
} from "../generated/graphql.js";
import { ListPaymentTransactionsDocument } from "../generated/graphql.js";

// ── Types ──

type PaymentTransactionNode = NonNullable<
  NonNullable<
    NonNullable<ListPaymentTransactionsQuery["paymentTransactions"]>["edges"]
  >[number]
>["node"];

export type PaymentTransaction = NonNullable<PaymentTransactionNode>;

export interface ListTransactionsOptions {
  pageSize?: number;
  filterBy?: ListPaymentTransactionsQueryVariables["filterBy"];
}

// ── Resource ──

export class TransactionsResource {
  constructor(private readonly client: Highnote) {}

  /**
   * List payment transactions with auto-pagination.
   *
   * ```ts
   * for await (const txn of client.transactions.list()) {
   *   console.log(txn.authorizedAmount);
   * }
   * ```
   */
  list(options?: ListTransactionsOptions): AsyncIterable<PaymentTransaction> {
    const pageSize = options?.pageSize ?? this.client.defaultPageSize;
    const filterBy = options?.filterBy;

    return paginate<PaymentTransaction>(async (after) => {
      const { data } =
        await this.client.graphql.rawRequest<ListPaymentTransactionsQuery>(
          print(ListPaymentTransactionsDocument),
          { first: pageSize, after, filterBy },
        );

      return (data?.paymentTransactions ?? {
        edges: [],
        pageInfo: { hasNextPage: false, endCursor: "" },
      }) as RelayConnection<PaymentTransaction>;
    });
  }
}
