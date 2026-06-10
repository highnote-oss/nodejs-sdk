import type { Highnote } from "../client.js";
import { HighnoteUnexpectedResponseError } from "../errors.js";
import type {
  ListCardProductsQuery,
  FindCardProductQuery,
  ListCardProductFinancialAccountsQuery,
  ListCardProductFinancialAccountsQueryVariables,
  FinancialAccountSummaryFragment,
} from "../generated/graphql.js";
import {
  ListCardProductsDocument,
  FindCardProductDocument,
  ListCardProductFinancialAccountsDocument,
} from "../generated/graphql.js";
import { paginate, type RelayConnection } from "../pagination.js";
import { print } from "graphql";

// ── Types ──

/** A card product node as returned by the list/get queries. */
export type CardProduct = NonNullable<
  NonNullable<
    NonNullable<ListCardProductsQuery["cardProducts"]>["edges"]
  >[number]
>["node"];

/**
 * A financial account as returned by `cardProducts.listFinancialAccounts`.
 * Matches the shared `FinancialAccountSummary` fragment used by the
 * `accountHolders.listFinancialAccounts` query, so consumers can compare
 * results from either listing without re-narrowing the shape.
 */
export type CardProductFinancialAccountSummary = FinancialAccountSummaryFragment;

export interface ListCardProductsOptions {
  /** Number of items per page. Defaults to client's defaultPageSize. */
  pageSize?: number;
}

export interface ListCardProductFinancialAccountsOptions {
  /** Number of items per page. Defaults to client's defaultPageSize. */
  pageSize?: number;
  /** Optional Highnote search-language filter passed through to the API. */
  filterBy?: ListCardProductFinancialAccountsQueryVariables["filterBy"];
}

// ── Resource ──

export class CardProductsResource {
  constructor(private readonly client: Highnote) {}

  /**
   * Returns an async iterable over all card products.
   *
   * ```ts
   * for await (const product of client.cardProducts.list()) {
   *   console.log(product.name);
   * }
   * ```
   */
  list(options?: ListCardProductsOptions): AsyncIterable<NonNullable<CardProduct>> {
    const pageSize = options?.pageSize ?? this.client.defaultPageSize;

    return paginate<NonNullable<CardProduct>>(async (after) => {
      const { data } = await this.client.graphql.rawRequest<ListCardProductsQuery>(
        print(ListCardProductsDocument),
        { first: pageSize, after },
      );

      return (data?.cardProducts ?? { edges: [], pageInfo: { hasNextPage: false, endCursor: "" } }) as RelayConnection<NonNullable<CardProduct>>;
    });
  }

  /**
   * Retrieve a single card product by ID.
   *
   * ```ts
   * const product = await client.cardProducts.get("cp_...");
   * ```
   */
  async get(id: string): Promise<NonNullable<CardProduct>> {
    const { data } = await this.client.graphql.rawRequest<FindCardProductQuery>(
      print(FindCardProductDocument),
      { id },
    );

    const node = data?.node;
    if (!node || node.__typename !== "CardProduct") {
      throw new HighnoteUnexpectedResponseError(
        node?.__typename ?? "null",
        `Card product not found: ${id}`,
      );
    }

    return node;
  }

  /**
   * Returns an async iterable over the financial accounts associated with a
   * card product. This is the right entry point for org-scoped accounts such
   * as the Product Funding Account (`ProductFundingFinancialAccountFeature`)
   * which back ODF-enabled card products — those FAs do NOT appear under
   * `accountHolders.listFinancialAccounts(<applicant's accountHolderId>)`,
   * because they are owned by the issuer, not by the applicant.
   *
   * The optional `filterBy` accepts Highnote's search-query language:
   *
   * ```ts
   * for await (const fa of client.cardProducts.listFinancialAccounts(
   *   cardProductId,
   *   { filterBy: { searchQueryLanguage: { query: "", version: "VERSION_1" } } },
   * )) {
   *   console.log(fa.name, fa.features?.map((f) => f.__typename));
   * }
   * ```
   *
   * Pass no options to iterate every account on the product.
   */
  listFinancialAccounts(
    cardProductId: string,
    options?: ListCardProductFinancialAccountsOptions,
  ): AsyncIterable<CardProductFinancialAccountSummary> {
    const pageSize = options?.pageSize ?? this.client.defaultPageSize;
    const filterBy = options?.filterBy;

    return paginate<CardProductFinancialAccountSummary>(async (after) => {
      const { data } =
        await this.client.graphql.rawRequest<ListCardProductFinancialAccountsQuery>(
          print(ListCardProductFinancialAccountsDocument),
          { id: cardProductId, first: pageSize, after, filterBy },
        );

      const node = data?.node;
      if (!node) {
        throw new HighnoteUnexpectedResponseError(
          "null",
          `Card product not found: ${cardProductId}`,
        );
      }

      if (node.__typename !== "CardProduct") {
        throw new HighnoteUnexpectedResponseError(
          node.__typename,
          `Expected CardProduct, got ${node.__typename} for ${cardProductId}`,
        );
      }

      return (node.accounts ?? {
        edges: [],
        pageInfo: { hasNextPage: false, endCursor: "" },
      }) as RelayConnection<CardProductFinancialAccountSummary>;
    });
  }
}
