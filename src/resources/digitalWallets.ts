import { print } from "graphql";

import type { Highnote } from "../client.js";
import { throwIfError, HighnoteUnexpectedResponseError } from "../errors.js";
import type {
  AddPaymentCardToApplePayByDevicePushProvisioningMutation,
  AddPaymentCardToApplePayByDevicePushProvisioningMutationVariables,
  AddPaymentCardToGooglePayByDevicePushProvisioningMutation,
  AddPaymentCardToGooglePayByDevicePushProvisioningMutationVariables,
} from "../generated/graphql.js";
import {
  AddPaymentCardToApplePayByDevicePushProvisioningDocument,
  AddPaymentCardToGooglePayByDevicePushProvisioningDocument,
} from "../generated/graphql.js";

// ── Types ──

type ApplePayProvisioningResponse = Extract<
  NonNullable<
    AddPaymentCardToApplePayByDevicePushProvisioningMutation["addPaymentCardToApplePayByDevicePushProvisioning"]
  >,
  { __typename: "PaymentCardDigitalWalletTokenApplePayDevicePushProvisioning" }
>;

type GooglePayProvisioningResponse = Extract<
  NonNullable<
    AddPaymentCardToGooglePayByDevicePushProvisioningMutation["addPaymentCardToGooglePayByDevicePushProvisioning"]
  >,
  { __typename: "PaymentCardDigitalWalletTokenGooglePayPushProvisioning" }
>;

export type ApplePayProvisioning = ApplePayProvisioningResponse;
export type GooglePayProvisioning = GooglePayProvisioningResponse;

// ── Resource ──

export class DigitalWalletsResource {
  constructor(private readonly client: Highnote) {}

  /**
   * Add a payment card to Apple Pay via device push provisioning.
   *
   * ```ts
   * import { PaymentCardDigitalWalletDeviceType } from "@highnote-oss/nodejs-sdk";
   *
   * const result = await client.digitalWallets.addToApplePay({
   *   paymentCardId: "pc_...",
   *   certificates: ["base64cert1", "base64cert2"],
   *   nonce: "base64nonce",
   *   nonceSignature: "base64sig",
   *   deviceType: PaymentCardDigitalWalletDeviceType.MOBILE,
   * });
   * ```
   */
  async addToApplePay(
    input: AddPaymentCardToApplePayByDevicePushProvisioningMutationVariables["input"],
  ): Promise<ApplePayProvisioningResponse> {
    const { data } =
      await this.client.graphql.rawRequest<AddPaymentCardToApplePayByDevicePushProvisioningMutation>(
        print(AddPaymentCardToApplePayByDevicePushProvisioningDocument),
        { input },
      );

    const result = data?.addPaymentCardToApplePayByDevicePushProvisioning;
    throwIfError(result);

    if (!result || result.__typename !== "PaymentCardDigitalWalletTokenApplePayDevicePushProvisioning") {
      throw new HighnoteUnexpectedResponseError(
        result?.__typename ?? "null",
        "Unexpected response from addPaymentCardToApplePayByDevicePushProvisioning",
      );
    }

    return result as ApplePayProvisioningResponse;
  }

  /**
   * Add a payment card to Google Pay via device push provisioning.
   *
   * ```ts
   * import { PaymentCardDigitalWalletDeviceType } from "@highnote-oss/nodejs-sdk";
   *
   * const result = await client.digitalWallets.addToGooglePay({
   *   paymentCardId: "pc_...",
   *   deviceType: PaymentCardDigitalWalletDeviceType.MOBILE,
   * });
   * ```
   */
  async addToGooglePay(
    input: AddPaymentCardToGooglePayByDevicePushProvisioningMutationVariables["input"],
  ): Promise<GooglePayProvisioningResponse> {
    const { data } =
      await this.client.graphql.rawRequest<AddPaymentCardToGooglePayByDevicePushProvisioningMutation>(
        print(AddPaymentCardToGooglePayByDevicePushProvisioningDocument),
        { input },
      );

    const result = data?.addPaymentCardToGooglePayByDevicePushProvisioning;
    throwIfError(result);

    if (!result || result.__typename !== "PaymentCardDigitalWalletTokenGooglePayPushProvisioning") {
      throw new HighnoteUnexpectedResponseError(
        result?.__typename ?? "null",
        "Unexpected response from addPaymentCardToGooglePayByDevicePushProvisioning",
      );
    }

    return result as GooglePayProvisioningResponse;
  }
}
