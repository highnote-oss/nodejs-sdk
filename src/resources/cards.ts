import { print } from "graphql";

import type { Highnote } from "../client.js";
import { throwIfError, HighnoteUnexpectedResponseError } from "../errors.js";
import type {
  IssuePaymentCardForApplicationWithOnDemandFundingSourceMutation,
  IssuePaymentCardForApplicationWithOnDemandFundingSourceMutationVariables,
  IssuePaymentCardForFinancialAccountMutation,
  IssuePaymentCardForFinancialAccountMutationVariables,
  ActivatePaymentCardMutation,
  ActivatePaymentCardMutationVariables,
  SuspendPaymentCardMutation,
  SuspendPaymentCardMutationVariables,
  ClosePaymentCardMutation,
  ClosePaymentCardMutationVariables,
  ReissuePaymentCardMutation,
  ReissuePaymentCardMutationVariables,
  OrderPhysicalPaymentCardMutation,
  OrderPhysicalPaymentCardMutationVariables,
  OrderPhysicalPaymentCardWithValidatedAddressTokenMutation,
  OrderPhysicalPaymentCardWithValidatedAddressTokenMutationVariables,
  CancelPhysicalPaymentCardOrderMutation,
  CancelPhysicalPaymentCardOrderMutationVariables,
  FindPaymentCardQuery,
  FindAtmLocationsForPaymentCardQuery,
} from "../generated/graphql.js";
import {
  IssuePaymentCardForApplicationWithOnDemandFundingSourceDocument,
  IssuePaymentCardForFinancialAccountDocument,
  ActivatePaymentCardDocument,
  SuspendPaymentCardDocument,
  ClosePaymentCardDocument,
  ReissuePaymentCardDocument,
  OrderPhysicalPaymentCardDocument,
  OrderPhysicalPaymentCardWithValidatedAddressTokenDocument,
  CancelPhysicalPaymentCardOrderDocument,
  FindPaymentCardDocument,
  FindAtmLocationsForPaymentCardDocument,
} from "../generated/graphql.js";

// ── Types ──

type IssuedPaymentCard = Extract<
  NonNullable<IssuePaymentCardForFinancialAccountMutation["issuePaymentCardForFinancialAccount"]>,
  { __typename: "PaymentCard" }
>;

type IssuedPaymentCardWithOdfFa = Extract<
  NonNullable<
    IssuePaymentCardForApplicationWithOnDemandFundingSourceMutation["issuePaymentCardForApplicationWithOnDemandFundingSource"]
  >,
  { __typename: "PaymentCard" }
>;

type PaymentCardStatusResponse = Extract<
  NonNullable<ActivatePaymentCardMutation["activatePaymentCard"]>,
  { __typename: "PaymentCard" }
>;

type FindPaymentCardNode = Extract<
  NonNullable<FindPaymentCardQuery["node"]>,
  { __typename: "PaymentCard" }
>;

type PhysicalPaymentCardOrderResponse = Extract<
  NonNullable<OrderPhysicalPaymentCardMutation["orderPhysicalPaymentCard"]>,
  { __typename: "PhysicalPaymentCardOrder" }
>;

type CanceledPhysicalPaymentCardOrderResponse = Extract<
  NonNullable<CancelPhysicalPaymentCardOrderMutation["cancelPhysicalPaymentCardOrder"]>,
  { __typename: "PhysicalPaymentCardOrder" }
>;

export type PaymentCard = IssuedPaymentCard | IssuedPaymentCardWithOdfFa | FindPaymentCardNode;
export type PhysicalPaymentCardOrder = PhysicalPaymentCardOrderResponse | CanceledPhysicalPaymentCardOrderResponse;

// ── Resource ──

export class CardsResource {
  constructor(private readonly client: Highnote) {}

  /**
   * Issue a payment card for a financial account.
   *
   * ```ts
   * const card = await client.cards.issue({
   *   financialAccountId: "fa_...",
   *   options: { activateOnCreate: true, expirationDate: "2028-12-31T00:00:00Z" },
   * });
   * ```
   */
  async issue(
    input: IssuePaymentCardForFinancialAccountMutationVariables["input"],
  ): Promise<IssuedPaymentCard> {
    const { data } =
      await this.client.graphql.rawRequest<IssuePaymentCardForFinancialAccountMutation>(
        print(IssuePaymentCardForFinancialAccountDocument),
        { input },
      );

    const result = data?.issuePaymentCardForFinancialAccount;
    throwIfError(result);

    if (!result || result.__typename !== "PaymentCard") {
      throw new HighnoteUnexpectedResponseError(
        result?.__typename ?? "null",
        "Unexpected response from issuePaymentCardForFinancialAccount",
      );
    }

    return result as IssuedPaymentCard;
  }

  /**
   * Issue a payment card AND open a new on-demand-funded FinancialAccount
   * under the given approved application, in a single mutation. The new FA
   * pulls from `sourceFinancialAccountId` at authorization time.
   *
   * Use this when each card needs its own backing FA (e.g. AP invoice
   * automation: one card == one invoice == one FA).
   * For issuing an additional card on an EXISTING FA, use `cards.issue()`.
   *
   * ```ts
   * const card = await client.cards.issueForApplicationWithOnDemandFunding({
   *   applicationId: "app_...",
   *   sourceFinancialAccountId: "fa_program_funding",
   *   options: { activateOnCreate: true, expirationDate: "2028-12-31T00:00:00Z" },
   *   idempotencyKey: invoice.id,
   * });
   * ```
   */
  async issueForApplicationWithOnDemandFunding(
    input: IssuePaymentCardForApplicationWithOnDemandFundingSourceMutationVariables["input"],
  ): Promise<IssuedPaymentCardWithOdfFa> {
    const { data } =
      await this.client.graphql.rawRequest<IssuePaymentCardForApplicationWithOnDemandFundingSourceMutation>(
        print(IssuePaymentCardForApplicationWithOnDemandFundingSourceDocument),
        { input },
      );

    const result = data?.issuePaymentCardForApplicationWithOnDemandFundingSource;
    throwIfError(result);

    if (!result || result.__typename !== "PaymentCard") {
      throw new HighnoteUnexpectedResponseError(
        result?.__typename ?? "null",
        "Unexpected response from issuePaymentCardForApplicationWithOnDemandFundingSource",
      );
    }

    return result as IssuedPaymentCardWithOdfFa;
  }

  /**
   * Activate a payment card.
   *
   * ```ts
   * const card = await client.cards.activate({ paymentCardId: "pc_..." });
   * ```
   */
  async activate(
    input: ActivatePaymentCardMutationVariables["input"],
  ): Promise<PaymentCardStatusResponse> {
    const { data } =
      await this.client.graphql.rawRequest<ActivatePaymentCardMutation>(
        print(ActivatePaymentCardDocument),
        { input },
      );

    const result = data?.activatePaymentCard;
    throwIfError(result);

    if (!result || result.__typename !== "PaymentCard") {
      throw new HighnoteUnexpectedResponseError(
        result?.__typename ?? "null",
        "Unexpected response from activatePaymentCard",
      );
    }

    return result as PaymentCardStatusResponse;
  }

  /**
   * Suspend a payment card.
   *
   * ```ts
   * await client.cards.suspend({ paymentCardId: "pc_..." });
   * ```
   */
  async suspend(
    input: SuspendPaymentCardMutationVariables["input"],
  ): Promise<PaymentCardStatusResponse> {
    const { data } =
      await this.client.graphql.rawRequest<SuspendPaymentCardMutation>(
        print(SuspendPaymentCardDocument),
        { input },
      );

    const result = data?.suspendPaymentCard;
    throwIfError(result);

    if (!result || result.__typename !== "PaymentCard") {
      throw new HighnoteUnexpectedResponseError(
        result?.__typename ?? "null",
        "Unexpected response from suspendPaymentCard",
      );
    }

    return result as PaymentCardStatusResponse;
  }

  /**
   * Close a payment card permanently.
   *
   * ```ts
   * await client.cards.close({ paymentCardId: "pc_..." });
   * ```
   */
  async close(
    input: ClosePaymentCardMutationVariables["input"],
  ): Promise<PaymentCardStatusResponse> {
    const { data } =
      await this.client.graphql.rawRequest<ClosePaymentCardMutation>(
        print(ClosePaymentCardDocument),
        { input },
      );

    const result = data?.closePaymentCard;
    throwIfError(result);

    if (!result || result.__typename !== "PaymentCard") {
      throw new HighnoteUnexpectedResponseError(
        result?.__typename ?? "null",
        "Unexpected response from closePaymentCard",
      );
    }

    return result as PaymentCardStatusResponse;
  }

  /**
   * Reissue a payment card (e.g., lost, stolen, or expired).
   * Creates a new card from an existing one.
   *
   * ```ts
   * const newCard = await client.cards.reissue({
   *   originalPaymentCardId: "pc_...",
   *   options: { activateOnCreate: true, expirationDate: "2029-12-31T00:00:00Z" },
   * });
   * ```
   */
  async reissue(
    input: ReissuePaymentCardMutationVariables["input"],
  ): Promise<IssuedPaymentCard> {
    const { data } =
      await this.client.graphql.rawRequest<ReissuePaymentCardMutation>(
        print(ReissuePaymentCardDocument),
        { input },
      );

    const result = data?.reissuePaymentCard;
    throwIfError(result);

    if (!result || result.__typename !== "PaymentCard") {
      throw new HighnoteUnexpectedResponseError(
        result?.__typename ?? "null",
        "Unexpected response from reissuePaymentCard",
      );
    }

    return result as IssuedPaymentCard;
  }

  /**
   * Order a physical card for an existing payment card.
   *
   * ```ts
   * const order = await client.cards.orderPhysical({
   *   paymentCardId: "pc_...",
   *   cardPersonalization: { textLines: { line1: "JANE DOE" } },
   *   deliveryDetails: {
   *     name: { givenName: "Jane", familyName: "Doe" },
   *     address: {
   *       streetAddress: "123 Main St",
   *       locality: "San Francisco",
   *       region: "CA",
   *       postalCode: "94105",
   *       countryCodeAlpha3: "USA",
   *     },
   *   },
   * });
   * ```
   */
  async orderPhysical(
    input: OrderPhysicalPaymentCardMutationVariables["input"],
  ): Promise<PhysicalPaymentCardOrderResponse> {
    const { data } =
      await this.client.graphql.rawRequest<OrderPhysicalPaymentCardMutation>(
        print(OrderPhysicalPaymentCardDocument),
        { input },
      );

    const result = data?.orderPhysicalPaymentCard;
    throwIfError(result);

    if (!result || result.__typename !== "PhysicalPaymentCardOrder") {
      throw new HighnoteUnexpectedResponseError(
        result?.__typename ?? "null",
        "Unexpected response from orderPhysicalPaymentCard",
      );
    }

    return result as PhysicalPaymentCardOrderResponse;
  }

  /**
   * Order a physical card using a validated address token.
   * Call `client.addresses.validate()` first to get the token ID.
   *
   * ```ts
   * const { token } = await client.addresses.validate({ address });
   * const order = await client.cards.orderPhysicalWithValidatedAddress({
   *   paymentCardId: "pc_...",
   *   cardPersonalization: { textLines: { line1: "JANE DOE" } },
   *   validatedAddressToken: token,
   * });
   * ```
   */
  async orderPhysicalWithValidatedAddress(
    input: OrderPhysicalPaymentCardWithValidatedAddressTokenMutationVariables["input"],
  ): Promise<PhysicalPaymentCardOrderResponse> {
    const { data } =
      await this.client.graphql.rawRequest<OrderPhysicalPaymentCardWithValidatedAddressTokenMutation>(
        print(OrderPhysicalPaymentCardWithValidatedAddressTokenDocument),
        { input },
      );

    const result = data?.orderPhysicalPaymentCardWithValidatedAddressToken;
    throwIfError(result);

    if (!result || result.__typename !== "PhysicalPaymentCardOrder") {
      throw new HighnoteUnexpectedResponseError(
        result?.__typename ?? "null",
        "Unexpected response from orderPhysicalPaymentCardWithValidatedAddressToken",
      );
    }

    return result as PhysicalPaymentCardOrderResponse;
  }

  /**
   * Cancel a pending physical card order.
   *
   * ```ts
   * const canceled = await client.cards.cancelPhysicalOrder({
   *   physicalPaymentCardOrderId: "pco_...",
   * });
   * ```
   */
  async cancelPhysicalOrder(
    input: CancelPhysicalPaymentCardOrderMutationVariables["input"],
  ): Promise<CanceledPhysicalPaymentCardOrderResponse> {
    const { data } =
      await this.client.graphql.rawRequest<CancelPhysicalPaymentCardOrderMutation>(
        print(CancelPhysicalPaymentCardOrderDocument),
        { input },
      );

    const result = data?.cancelPhysicalPaymentCardOrder;
    throwIfError(result);

    if (!result || result.__typename !== "PhysicalPaymentCardOrder") {
      throw new HighnoteUnexpectedResponseError(
        result?.__typename ?? "null",
        "Unexpected response from cancelPhysicalPaymentCardOrder",
      );
    }

    return result as CanceledPhysicalPaymentCardOrderResponse;
  }

  /**
   * Retrieve a payment card by ID.
   *
   * ```ts
   * const card = await client.cards.get("pc_...");
   * ```
   */
  async get(id: string): Promise<FindPaymentCardNode> {
    const { data } = await this.client.graphql.rawRequest<FindPaymentCardQuery>(
      print(FindPaymentCardDocument),
      { id },
    );

    const node = data?.node;
    if (!node || node.__typename !== "PaymentCard") {
      throw new HighnoteUnexpectedResponseError(
        node?.__typename ?? "null",
        `Payment card not found: ${id}`,
      );
    }

    return node as FindPaymentCardNode;
  }

  /**
   * Find ATM locations near coordinates for a payment card.
   *
   * ```ts
   * const atms = await client.cards.findATMLocations({
   *   paymentCardId: "pc_...",
   *   latitude: "37.7749",
   *   longitude: "-122.4194",
   *   radiusMiles: 10,
   * });
   * ```
   */
  async findATMLocations(input: {
    paymentCardId: string;
    latitude: string;
    longitude: string;
    radiusMiles?: number;
    features?: string[];
    limit?: number;
  }) {
    const { data } = await this.client.graphql.rawRequest<FindAtmLocationsForPaymentCardQuery>(
      print(FindAtmLocationsForPaymentCardDocument),
      {
        id: input.paymentCardId,
        radius: {
          coordinates: { latitude: input.latitude, longitude: input.longitude },
          distance: { length: input.radiusMiles ?? 10, unit: "MILE" as any },
        },
        ...(input.features?.length ? { atmFilter: { includes: input.features as any[] } } : {}),
        ...(input.limit ? { limit: input.limit } : {}),
      },
    );
    const node = data?.node;
    if (!node || node.__typename !== "PaymentCard") {
      throw new HighnoteUnexpectedResponseError(node?.__typename ?? "null", "Expected PaymentCard node");
    }
    const result = (node as any).atmLocations;
    throwIfError(result);
    if (!result || result.__typename !== "ATMLocations") {
      throw new HighnoteUnexpectedResponseError(result?.__typename ?? "null", "Unexpected response from atmLocations");
    }
    return result.atmLocations ?? [];
  }
}
