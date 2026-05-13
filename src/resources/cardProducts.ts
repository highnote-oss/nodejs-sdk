import type { Highnote } from "../client.js";
import { HighnoteUnexpectedResponseError } from "../errors.js";
import type { ListCardProductsQuery, FindCardProductQuery } from "../generated/graphql.js";
import { ListCardProductsDocument, FindCardProductDocument } from "../generated/graphql.js";
import { paginate, type RelayConnection } from "../pagination.js";
import { print } from "graphql";

// ── Types ──

/** A card product node as returned by the list/get queries. */
export type CardProduct = NonNullable<
  NonNullable<
    NonNullable<ListCardProductsQuery["cardProducts"]>["edges"]
  >[number]
>["node"];

export interface ListCardProductsOptions {
  /** Number of items per page. Defaults to client's defaultPageSize. */
  pageSize?: number;
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
}
