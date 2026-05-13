import { print } from "graphql";

import type { Highnote } from "../client.js";
import { throwIfError, HighnoteUnexpectedResponseError } from "../errors.js";
import type {
  ValidateAddressMutation,
  ValidateAddressMutationVariables,
} from "../generated/graphql.js";
import {
  ValidateAddressDocument,
} from "../generated/graphql.js";

// ── Types ──

type AddressValidationResult = Extract<
  NonNullable<ValidateAddressMutation["validateAddress"]>,
  { __typename: "AddressValidationResult" }
>;

export type { AddressValidationResult };

// ── Resource ──

export class AddressesResource {
  constructor(private readonly client: Highnote) {}

  /**
   * Validate an address for physical card delivery.
   * Returns an AddressValidationResult with an outcome union:
   * - AddressValidatedResult: address is valid, has token.id
   * - AddressValidatedWithChangesResult: valid but corrected, has token.id + componentsChanged
   * - AddressIncompleteResult: address is missing components
   * - AddressInvalidResult: address is not deliverable
   *
   * ```ts
   * const result = await client.addresses.validate({
   *   address: { streetAddress: "24 Willie Mays Plz", locality: "San Francisco", region: "CA", postalCode: "94107", countryCodeAlpha3: "USA" },
   *   idempotencyKey: crypto.randomUUID(),
   * });
   * if (result.outcome?.__typename === "AddressValidatedResult") {
   *   const tokenId = result.outcome.token?.id; // use for ordering
   * }
   * ```
   */
  async validate(
    input: ValidateAddressMutationVariables["input"],
  ): Promise<AddressValidationResult> {
    const { data } = await this.client.graphql.rawRequest<ValidateAddressMutation>(
      print(ValidateAddressDocument),
      { input },
    );

    const result = data?.validateAddress;
    throwIfError(result);

    if (!result || result.__typename !== "AddressValidationResult") {
      throw new HighnoteUnexpectedResponseError(
        result?.__typename ?? "null",
        "Unexpected response from validateAddress",
      );
    }

    return result as AddressValidationResult;
  }
}
