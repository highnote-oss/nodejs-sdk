import { print } from "graphql";

import type { Highnote } from "../client.js";
import { throwIfError, HighnoteUnexpectedResponseError } from "../errors.js";
import type {
  CreateAccountHolderCardProductApplicationMutation,
  CreateAccountHolderCardProductApplicationMutationVariables,
  FindApplicationQuery,
} from "../generated/graphql.js";
import {
  CreateAccountHolderCardProductApplicationDocument,
  FindApplicationDocument,
} from "../generated/graphql.js";

// ── Types ──

type CreatedApplication = Extract<
  NonNullable<
    CreateAccountHolderCardProductApplicationMutation["createAccountHolderCardProductApplication"]
  >,
  { __typename: "AccountHolderCardProductApplication" }
>;

type FindApplicationNode = Extract<
  NonNullable<FindApplicationQuery["node"]>,
  { __typename: "AccountHolderCardProductApplication" }
>;

export type Application = CreatedApplication | FindApplicationNode;

// ── Resource ──

export class ApplicationsResource {
  constructor(private readonly client: Highnote) {}

  /**
   * Create a card product application for an account holder.
   *
   * ```ts
   * const app = await client.applications.create({
   *   accountHolderId: "ah_...",
   *   cardProductId: "cp_...",
   *   cardHolderAgreementConsent: {
   *     consentTimestamp: new Date().toISOString(),
   *     primaryAuthorizedPersonId: "ah_...",
   *   },
   * });
   * ```
   */
  async create(
    input: CreateAccountHolderCardProductApplicationMutationVariables["input"],
  ): Promise<CreatedApplication> {
    const { data } =
      await this.client.graphql.rawRequest<CreateAccountHolderCardProductApplicationMutation>(
        print(CreateAccountHolderCardProductApplicationDocument),
        { input },
      );

    const result = data?.createAccountHolderCardProductApplication;
    throwIfError(result);

    if (!result || result.__typename !== "AccountHolderCardProductApplication") {
      throw new HighnoteUnexpectedResponseError(
        result?.__typename ?? "null",
        "Unexpected response from createAccountHolderCardProductApplication",
      );
    }

    return result as CreatedApplication;
  }

  /**
   * Retrieve an application by ID.
   *
   * ```ts
   * const app = await client.applications.get("app_...");
   * ```
   */
  async get(id: string): Promise<FindApplicationNode> {
    const { data } = await this.client.graphql.rawRequest<FindApplicationQuery>(
      print(FindApplicationDocument),
      { id },
    );

    const node = data?.node;
    if (!node || node.__typename !== "AccountHolderCardProductApplication") {
      throw new HighnoteUnexpectedResponseError(
        node?.__typename ?? "null",
        `Application not found: ${id}`,
      );
    }

    return node as FindApplicationNode;
  }
}
