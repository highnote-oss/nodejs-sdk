import { print } from "graphql";

import type { Highnote } from "../client.js";
import { throwIfError, HighnoteUnexpectedResponseError } from "../errors.js";
import { paginate, type RelayConnection } from "../pagination.js";
import type {
  CreateUsPersonAccountHolderMutation,
  CreateUsPersonAccountHolderMutationVariables,
  FindAccountHolderQuery,
  ListPersonAccountHoldersQuery,
  ListBusinessAccountHoldersQuery,
  SearchPersonAccountHoldersQuery,
  SearchPersonAccountHoldersQueryVariables,
  SearchBusinessAccountHoldersQuery,
  SearchBusinessAccountHoldersQueryVariables,
} from "../generated/graphql.js";
import {
  CreateUsPersonAccountHolderDocument,
  FindAccountHolderDocument,
  ListPersonAccountHoldersDocument,
  ListBusinessAccountHoldersDocument,
  SearchPersonAccountHoldersDocument,
  SearchBusinessAccountHoldersDocument,
} from "../generated/graphql.js";

// ── Types ──

type PersonAccountHolderNode = NonNullable<
  NonNullable<NonNullable<ListPersonAccountHoldersQuery["personAccountHolders"]>["edges"]>[number]
>["node"];

export type PersonAccountHolder = NonNullable<PersonAccountHolderNode>;

type CreatedPersonAccountHolder = Extract<
  NonNullable<CreateUsPersonAccountHolderMutation["createUSPersonAccountHolder"]>,
  { __typename: "USPersonAccountHolder" }
>;

type FindAccountHolderNode = Extract<
  NonNullable<FindAccountHolderQuery["node"]>,
  { __typename: "USPersonAccountHolder" | "USBusinessAccountHolder" }
>;

export type AccountHolder = FindAccountHolderNode;

type BusinessAccountHolderNode = NonNullable<
  NonNullable<NonNullable<ListBusinessAccountHoldersQuery["businessAccountHolders"]>["edges"]>[number]
>["node"];

export type BusinessAccountHolder = NonNullable<BusinessAccountHolderNode>;

export interface ListPersonAccountHoldersOptions {
  pageSize?: number;
}

export interface ListBusinessAccountHoldersOptions {
  pageSize?: number;
}

export interface SearchPersonAccountHoldersOptions {
  pageSize?: number;
}

export interface SearchBusinessAccountHoldersOptions {
  pageSize?: number;
}

// ── Resource ──

export class AccountHoldersResource {
  constructor(private readonly client: Highnote) {}

  /**
   * Create a US person account holder.
   *
   * ```ts
   * const holder = await client.accountHolders.createUSPerson({
   *   personAccountHolder: { ... },
   * });
   * ```
   */
  async createUSPerson(
    input: CreateUsPersonAccountHolderMutationVariables["input"],
  ): Promise<CreatedPersonAccountHolder> {
    const { data } =
      await this.client.graphql.rawRequest<CreateUsPersonAccountHolderMutation>(
        print(CreateUsPersonAccountHolderDocument),
        { input },
      );

    const result = data?.createUSPersonAccountHolder;
    throwIfError(result);

    if (!result || result.__typename !== "USPersonAccountHolder") {
      throw new HighnoteUnexpectedResponseError(
        result?.__typename ?? "null",
        "Unexpected response from createUSPersonAccountHolder",
      );
    }

    return result as CreatedPersonAccountHolder;
  }

  /**
   * Retrieve an account holder by ID (person or business).
   *
   * ```ts
   * const holder = await client.accountHolders.get("ah_...");
   * ```
   */
  async get(id: string): Promise<AccountHolder> {
    const { data } = await this.client.graphql.rawRequest<FindAccountHolderQuery>(
      print(FindAccountHolderDocument),
      { id },
    );

    const node = data?.node;
    if (
      !node ||
      (node.__typename !== "USPersonAccountHolder" &&
        node.__typename !== "USBusinessAccountHolder")
    ) {
      throw new HighnoteUnexpectedResponseError(
        node?.__typename ?? "null",
        `Account holder not found: ${id}`,
      );
    }

    return node;
  }

  /**
   * List person account holders with auto-pagination.
   *
   * ```ts
   * for await (const holder of client.accountHolders.listPersons()) {
   *   console.log(holder.id);
   * }
   * ```
   */
  listPersons(options?: ListPersonAccountHoldersOptions): AsyncIterable<PersonAccountHolder> {
    const pageSize = options?.pageSize ?? this.client.defaultPageSize;

    return paginate<PersonAccountHolder>(async (after) => {
      const { data } =
        await this.client.graphql.rawRequest<ListPersonAccountHoldersQuery>(
          print(ListPersonAccountHoldersDocument),
          { first: pageSize, after },
        );

      return (data?.personAccountHolders ?? {
        edges: [],
        pageInfo: { hasNextPage: false, endCursor: "" },
      }) as RelayConnection<PersonAccountHolder>;
    });
  }

  /**
   * List business account holders with auto-pagination.
   *
   * ```ts
   * for await (const holder of client.accountHolders.listBusinesses()) {
   *   console.log(holder.id);
   * }
   * ```
   */
  listBusinesses(options?: ListBusinessAccountHoldersOptions): AsyncIterable<BusinessAccountHolder> {
    const pageSize = options?.pageSize ?? this.client.defaultPageSize;

    return paginate<BusinessAccountHolder>(async (after) => {
      const { data } =
        await this.client.graphql.rawRequest<ListBusinessAccountHoldersQuery>(
          print(ListBusinessAccountHoldersDocument),
          { first: pageSize, after },
        );

      return (data?.businessAccountHolders ?? {
        edges: [],
        pageInfo: { hasNextPage: false, endCursor: "" },
      }) as RelayConnection<BusinessAccountHolder>;
    });
  }

  /**
   * Search person account holders with auto-pagination.
   *
   * ```ts
   * for await (const holder of client.accountHolders.searchPersons({ email: { contains: "@example.com" } })) {
   *   console.log(holder.id);
   * }
   * ```
   */
  searchPersons(
    filterBy: SearchPersonAccountHoldersQueryVariables["filterBy"],
    options?: SearchPersonAccountHoldersOptions,
  ): AsyncIterable<PersonAccountHolder> {
    const pageSize = options?.pageSize ?? this.client.defaultPageSize;

    return paginate<PersonAccountHolder>(async (after) => {
      const { data } =
        await this.client.graphql.rawRequest<SearchPersonAccountHoldersQuery>(
          print(SearchPersonAccountHoldersDocument),
          { first: pageSize, after, filterBy },
        );

      return (data?.personAccountHolders ?? {
        edges: [],
        pageInfo: { hasNextPage: false, endCursor: "" },
      }) as RelayConnection<PersonAccountHolder>;
    });
  }

  /**
   * Search business account holders with auto-pagination.
   *
   * ```ts
   * for await (const holder of client.accountHolders.searchBusinesses({ businessProfile: { website: { contains: "example.com" } } })) {
   *   console.log(holder.id);
   * }
   * ```
   */
  searchBusinesses(
    filterBy: SearchBusinessAccountHoldersQueryVariables["filterBy"],
    options?: SearchBusinessAccountHoldersOptions,
  ): AsyncIterable<BusinessAccountHolder> {
    const pageSize = options?.pageSize ?? this.client.defaultPageSize;

    return paginate<BusinessAccountHolder>(async (after) => {
      const { data } =
        await this.client.graphql.rawRequest<SearchBusinessAccountHoldersQuery>(
          print(SearchBusinessAccountHoldersDocument),
          { first: pageSize, after, filterBy },
        );

      return (data?.businessAccountHolders ?? {
        edges: [],
        pageInfo: { hasNextPage: false, endCursor: "" },
      }) as RelayConnection<BusinessAccountHolder>;
    });
  }
}
