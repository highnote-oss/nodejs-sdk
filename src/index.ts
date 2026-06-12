// ── Client ──
export { Highnote } from "./client.js";

// ── Types ──
export type { HighnoteOptions, HighnoteEnvironment } from "./types.js";
export type { CardProduct, ListCardProductsOptions } from "./resources/cardProducts.js";
export type {
  PersonAccountHolder,
  BusinessAccountHolder,
  AccountHolder,
  ListPersonAccountHoldersOptions,
  ListBusinessAccountHoldersOptions,
  SearchPersonAccountHoldersOptions,
  SearchBusinessAccountHoldersOptions,
  AccountHolderFinancialAccountSummary,
  ListAccountHolderFinancialAccountsOptions,
} from "./resources/accountHolders.js";
export type { Application } from "./resources/applications.js";
export type { AchTransfer, OneTimeAchTransfer, RecurringAchTransfer, CancelledTransfer } from "./resources/ach.js";
export type { AddressValidationResult } from "./resources/addresses.js";
export type { PaymentCard, PhysicalPaymentCardOrder } from "./resources/cards.js";
export type { ClientToken } from "./resources/clientTokens.js";
export type {
  CollaborativeAuthorizationEndpoint,
  CollaborativeAuthorizationEndpointNode,
  ListCollaborativeAuthorizationEndpointsOptions,
} from "./resources/collaborativeAuth.js";
export type { ApplePayProvisioning, GooglePayProvisioning } from "./resources/digitalWallets.js";
export type { Dispute } from "./resources/disputes.js";
export type { DocumentUploadSession, DocumentUploadLink } from "./resources/documents.js";
export type { ExternalBankAccount, NonVerifiedExternalBankAccount } from "./resources/externalAccounts.js";
export type { FinancialAccount, FinancialAccountActivity, ListActivitiesOptions, ListReviewWorkflowEventsOptions, ReviewWorkflowEvent } from "./resources/financialAccounts.js";
export type { AccountHolderProvisioning } from "./resources/provisioning.js";
export type { SpendRule } from "./resources/spendRules.js";
export type { PaymentTransaction, ListTransactionsOptions } from "./resources/transactions.js";
export type { InterFinancialAccountTransfer } from "./resources/transfers.js";
export type {
  WebhookNotificationTarget,
  WebhookNotificationTargetNode,
  WebhookNotificationTargetEventNode,
  ListWebhookNotificationTargetsOptions,
  ListWebhookNotificationTargetEventsOptions,
} from "./resources/webhooks.js";
export type { RelayConnection, PageFetcher } from "./pagination.js";

// ── Enums ──
export {
  AchTransferPurpose,
  BankAccountType,
  AccountHolderApplicationStatusCode,
  CardFormFactor,
  ElectronicFundTransferSource,
  CollaborativeAuthorizationEndpointStatus,
  CollaborativeAuthorizationResponseCode,
  DocumentType,
  DocumentUploadClientTokenPermission,
  DocumentUploadSessionStatusCode,
  FinancialAccountFeatureType,
  FinancialAccountStatus,
  FinancialAccountSuspensionReasonInput,
  GeneratePaymentMethodTokenizationClientTokenPermission,
  InterFinancialAccountTransferStatus,
  Iso3166Alpha3Country,
  Iso4217Alpha3SupportedCurrency,
  MerchantCategory,
  NotificationEventName,
  NotificationTargetStatus,
  PaymentCardChargebackStatus,
  PaymentCardClientTokenPermission,
  PaymentCardDigitalWalletDeviceType,
  PaymentCardDisputeCategoryType,
  PaymentCardDisputeCustomerClaimType,
  PaymentCardDisputeStatus,
  PaymentCardOrderStatus,
  PaymentCardStatus,
  PaymentTransactionStatus,
  PhoneLabel,
  ProvisionAccountHolderAction,
  TransferPurpose,
} from "./generated/graphql.js";

// ── Errors ──
export {
  HighnoteError,
  HighnoteUserError,
  HighnoteAccessDeniedError,
  HighnoteUnexpectedResponseError,
  HighnoteSimulationError,
  throwIfError,
} from "./errors.js";
export type { FieldError } from "./errors.js";

// ── Test / Simulation ──
export { TestResource } from "./resources/test/index.js";

// ── Utilities ──
export { paginate } from "./pagination.js";
export { verifyWebhookSignature } from "./webhookVerification.js";
export type {
  VerifyWebhookSignatureInput,
  VerifyWebhookSignatureResult,
  WebhookEvent,
} from "./webhookVerification.js";
export { verifyCollaborativeAuthSignature } from "./collaborativeAuthVerification.js";
export type {
  VerifyCollaborativeAuthSignatureInput,
  VerifyCollaborativeAuthSignatureResult,
  CollaborativeAuthRequest,
  CollaborativeAuthResponse,
} from "./collaborativeAuthVerification.js";
