import { print } from "graphql";

import type { TestResource } from "./index.js";
import { throwIfError, HighnoteUnexpectedResponseError } from "../../errors.js";
import type {
  SimulatePhysicalPaymentCardOrderSendToPrinterMutation,
  SimulatePhysicalPaymentCardOrderSendToPrinterMutationVariables,
  SimulatePhysicalPaymentCardOrderApprovalMutation,
  SimulatePhysicalPaymentCardOrderApprovalMutationVariables,
  SimulatePhysicalPaymentCardOrderShippedMutation,
  SimulatePhysicalPaymentCardOrderShippedMutationVariables,
  SimulatePhysicalPaymentCardOrderShipmentFailedMutation,
  SimulatePhysicalPaymentCardOrderShipmentFailedMutationVariables,
} from "../../generated/graphql.js";
import {
  SimulatePhysicalPaymentCardOrderSendToPrinterDocument,
  SimulatePhysicalPaymentCardOrderApprovalDocument,
  SimulatePhysicalPaymentCardOrderShippedDocument,
  SimulatePhysicalPaymentCardOrderShipmentFailedDocument,
} from "../../generated/graphql.js";

// ── Types ──

type SimulatedPhysicalPaymentCardOrder = Extract<
  NonNullable<SimulatePhysicalPaymentCardOrderSendToPrinterMutation["simulatePhysicalPaymentCardOrderSendToPrinter"]>,
  { __typename: "PhysicalPaymentCardOrder" }
>;

// ── Resource ──

export class TestPhysicalCardsResource {
  constructor(private readonly _test: TestResource) {}

  async sendToPrinter(
    input: SimulatePhysicalPaymentCardOrderSendToPrinterMutationVariables["input"],
  ): Promise<SimulatedPhysicalPaymentCardOrder> {
    this._test.guardEnvironment("test.physicalCards.sendToPrinter");
    const { data } = await this._test._client.graphql.rawRequest<SimulatePhysicalPaymentCardOrderSendToPrinterMutation>(
      print(SimulatePhysicalPaymentCardOrderSendToPrinterDocument),
      { input },
    );
    const result = data?.simulatePhysicalPaymentCardOrderSendToPrinter;
    throwIfError(result);
    if (!result || result.__typename !== "PhysicalPaymentCardOrder") {
      throw new HighnoteUnexpectedResponseError(result?.__typename ?? "null", "Unexpected response from simulatePhysicalPaymentCardOrderSendToPrinter");
    }
    return result as SimulatedPhysicalPaymentCardOrder;
  }

  async approve(
    input: SimulatePhysicalPaymentCardOrderApprovalMutationVariables["input"],
  ): Promise<SimulatedPhysicalPaymentCardOrder> {
    this._test.guardEnvironment("test.physicalCards.approve");
    const { data } = await this._test._client.graphql.rawRequest<SimulatePhysicalPaymentCardOrderApprovalMutation>(
      print(SimulatePhysicalPaymentCardOrderApprovalDocument),
      { input },
    );
    const result = data?.simulatePhysicalPaymentCardOrderApproval;
    throwIfError(result);
    if (!result || result.__typename !== "PhysicalPaymentCardOrder") {
      throw new HighnoteUnexpectedResponseError(result?.__typename ?? "null", "Unexpected response from simulatePhysicalPaymentCardOrderApproval");
    }
    return result as SimulatedPhysicalPaymentCardOrder;
  }

  async ship(
    input: SimulatePhysicalPaymentCardOrderShippedMutationVariables["input"],
  ): Promise<SimulatedPhysicalPaymentCardOrder> {
    this._test.guardEnvironment("test.physicalCards.ship");
    const { data } = await this._test._client.graphql.rawRequest<SimulatePhysicalPaymentCardOrderShippedMutation>(
      print(SimulatePhysicalPaymentCardOrderShippedDocument),
      { input },
    );
    const result = data?.simulatePhysicalPaymentCardOrderShipped;
    throwIfError(result);
    if (!result || result.__typename !== "PhysicalPaymentCardOrder") {
      throw new HighnoteUnexpectedResponseError(result?.__typename ?? "null", "Unexpected response from simulatePhysicalPaymentCardOrderShipped");
    }
    return result as SimulatedPhysicalPaymentCardOrder;
  }

  async failShipment(
    input: SimulatePhysicalPaymentCardOrderShipmentFailedMutationVariables["input"],
  ): Promise<SimulatedPhysicalPaymentCardOrder> {
    this._test.guardEnvironment("test.physicalCards.failShipment");
    const { data } = await this._test._client.graphql.rawRequest<SimulatePhysicalPaymentCardOrderShipmentFailedMutation>(
      print(SimulatePhysicalPaymentCardOrderShipmentFailedDocument),
      { input },
    );
    const result = data?.simulatePhysicalPaymentCardOrderShipmentFailed;
    throwIfError(result);
    if (!result || result.__typename !== "PhysicalPaymentCardOrder") {
      throw new HighnoteUnexpectedResponseError(result?.__typename ?? "null", "Unexpected response from simulatePhysicalPaymentCardOrderShipmentFailed");
    }
    return result as SimulatedPhysicalPaymentCardOrder;
  }
}
