import { print } from "graphql";

import type { Highnote } from "../client.js";
import { throwIfError, HighnoteUnexpectedResponseError } from "../errors.js";
import type {
  AddCollaborativeAuthorizationEndpointMutation,
  AddCollaborativeAuthorizationEndpointMutationVariables,
  ActivateCollaborativeAuthorizationEndpointMutation,
  ActivateCollaborativeAuthorizationEndpointMutationVariables,
  DeactivateCollaborativeAuthorizationEndpointMutation,
  DeactivateCollaborativeAuthorizationEndpointMutationVariables,
} from "../generated/graphql.js";
import {
  AddCollaborativeAuthorizationEndpointDocument,
  ActivateCollaborativeAuthorizationEndpointDocument,
  DeactivateCollaborativeAuthorizationEndpointDocument,
} from "../generated/graphql.js";

// ── Types ──

type CollaborativeAuthEndpointResponse = Extract<
  NonNullable<
    AddCollaborativeAuthorizationEndpointMutation["addCollaborativeAuthorizationEndpoint"]
  >,
  { __typename: "CollaborativeAuthorizationEndpoint" }
>;

type ActivatedCollaborativeAuthEndpointResponse = Extract<
  NonNullable<
    ActivateCollaborativeAuthorizationEndpointMutation["activateCollaborativeAuthorizationEndpoint"]
  >,
  { __typename: "CollaborativeAuthorizationEndpoint" }
>;

type DeactivatedCollaborativeAuthEndpointResponse = Extract<
  NonNullable<
    DeactivateCollaborativeAuthorizationEndpointMutation["deactivateCollaborativeAuthorizationEndpoint"]
  >,
  { __typename: "CollaborativeAuthorizationEndpoint" }
>;

export type CollaborativeAuthorizationEndpoint =
  | CollaborativeAuthEndpointResponse
  | ActivatedCollaborativeAuthEndpointResponse
  | DeactivatedCollaborativeAuthEndpointResponse;

// ── Resource ──

export class CollaborativeAuthResource {
  constructor(private readonly client: Highnote) {}

  /**
   * Add a collaborative authorization endpoint.
   *
   * ```ts
   * const endpoint = await client.collaborativeAuth.addEndpoint({
   *   name: "My Auth Endpoint",
   *   uri: "https://example.com/auth",
   * });
   * ```
   */
  async addEndpoint(
    input: AddCollaborativeAuthorizationEndpointMutationVariables["input"],
  ): Promise<CollaborativeAuthEndpointResponse> {
    const { data } =
      await this.client.graphql.rawRequest<AddCollaborativeAuthorizationEndpointMutation>(
        print(AddCollaborativeAuthorizationEndpointDocument),
        { input },
      );

    const result = data?.addCollaborativeAuthorizationEndpoint;
    throwIfError(result);

    if (!result || result.__typename !== "CollaborativeAuthorizationEndpoint") {
      throw new HighnoteUnexpectedResponseError(
        result?.__typename ?? "null",
        "Unexpected response from addCollaborativeAuthorizationEndpoint",
      );
    }

    return result as CollaborativeAuthEndpointResponse;
  }

  /**
   * Activate a collaborative authorization endpoint.
   *
   * ```ts
   * await client.collaborativeAuth.activateEndpoint({ endpointId: "cae_..." });
   * ```
   */
  async activateEndpoint(
    input: ActivateCollaborativeAuthorizationEndpointMutationVariables["input"],
  ): Promise<ActivatedCollaborativeAuthEndpointResponse> {
    const { data } =
      await this.client.graphql.rawRequest<ActivateCollaborativeAuthorizationEndpointMutation>(
        print(ActivateCollaborativeAuthorizationEndpointDocument),
        { input },
      );

    const result = data?.activateCollaborativeAuthorizationEndpoint;
    throwIfError(result);

    if (!result || result.__typename !== "CollaborativeAuthorizationEndpoint") {
      throw new HighnoteUnexpectedResponseError(
        result?.__typename ?? "null",
        "Unexpected response from activateCollaborativeAuthorizationEndpoint",
      );
    }

    return result as ActivatedCollaborativeAuthEndpointResponse;
  }

  /**
   * Deactivate a collaborative authorization endpoint.
   *
   * ```ts
   * await client.collaborativeAuth.deactivateEndpoint({ endpointId: "cae_..." });
   * ```
   */
  async deactivateEndpoint(
    input: DeactivateCollaborativeAuthorizationEndpointMutationVariables["input"],
  ): Promise<DeactivatedCollaborativeAuthEndpointResponse> {
    const { data } =
      await this.client.graphql.rawRequest<DeactivateCollaborativeAuthorizationEndpointMutation>(
        print(DeactivateCollaborativeAuthorizationEndpointDocument),
        { input },
      );

    const result = data?.deactivateCollaborativeAuthorizationEndpoint;
    throwIfError(result);

    if (!result || result.__typename !== "CollaborativeAuthorizationEndpoint") {
      throw new HighnoteUnexpectedResponseError(
        result?.__typename ?? "null",
        "Unexpected response from deactivateCollaborativeAuthorizationEndpoint",
      );
    }

    return result as DeactivatedCollaborativeAuthEndpointResponse;
  }
}
