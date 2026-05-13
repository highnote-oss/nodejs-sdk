import { print } from "graphql";

import type { Highnote } from "../client.js";
import { throwIfError, HighnoteUnexpectedResponseError } from "../errors.js";
import type {
  ProvisionAccountHolderMutation,
  ProvisionAccountHolderMutationVariables,
} from "../generated/graphql.js";
import { ProvisionAccountHolderDocument } from "../generated/graphql.js";

// ── Types ──

type ProvisioningResult = Extract<
  NonNullable<ProvisionAccountHolderMutation["provisionAccountHolder"]>,
  { __typename: "AccountHolderProvisioning" }
>;

export type AccountHolderProvisioning = ProvisioningResult;

// ── Resource ──

export class ProvisioningResource {
  constructor(private readonly client: Highnote) {}

  /**
   * Provision an account holder — orchestrates application creation,
   * approval, and financial account issuance in a single call.
   *
   * ```ts
   * const provisioning = await client.provisioning.create({
   *   accountHolderId: "ah_...",
   *   idempotencyKey: "uuid-v4",
   *   actions: [
   *     ProvisionAccountHolderAction.CREATE_APPLICATION,
   *     ProvisionAccountHolderAction.ISSUE_FINANCIAL_ACCOUNT,
   *   ],
   *   actionInput: {
   *     createAccountHolderCardProductApplicationInput: {
   *       cardProductId: "cp_...",
   *       cardHolderAgreementConsent: {
   *         consentTimestamp: new Date().toISOString(),
   *         primaryAuthorizedPersonId: "ah_...",
   *       },
   *     },
   *     issueFinancialAccountForApplicationInput: {
   *       name: "My Account",
   *     },
   *   },
   * });
   * ```
   */
  async create(
    input: ProvisionAccountHolderMutationVariables["input"],
  ): Promise<ProvisioningResult> {
    const { data } =
      await this.client.graphql.rawRequest<ProvisionAccountHolderMutation>(
        print(ProvisionAccountHolderDocument),
        { input },
      );

    const result = data?.provisionAccountHolder;
    throwIfError(result);

    if (!result || result.__typename !== "AccountHolderProvisioning") {
      throw new HighnoteUnexpectedResponseError(
        result?.__typename ?? "null",
        "Unexpected response from provisionAccountHolder",
      );
    }

    return result as ProvisioningResult;
  }
}
