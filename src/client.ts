import { GraphQLClient } from "graphql-request";

import { encodeApiKey } from "./auth.js";
import { AccountHoldersResource } from "./resources/accountHolders.js";
import { AddressesResource } from "./resources/addresses.js";
import { ApplicationsResource } from "./resources/applications.js";
import { CardProductsResource } from "./resources/cardProducts.js";
import { CardsResource } from "./resources/cards.js";
import { ClientTokensResource } from "./resources/clientTokens.js";
import { CollaborativeAuthResource } from "./resources/collaborativeAuth.js";
import { DigitalWalletsResource } from "./resources/digitalWallets.js";
import { DisputesResource } from "./resources/disputes.js";
import { DocumentsResource } from "./resources/documents.js";
import { AchResource } from "./resources/ach.js";
import { ExternalAccountsResource } from "./resources/externalAccounts.js";
import { FinancialAccountsResource } from "./resources/financialAccounts.js";
import { ProvisioningResource } from "./resources/provisioning.js";
import { SpendRulesResource } from "./resources/spendRules.js";
import { TransactionsResource } from "./resources/transactions.js";
import { TransfersResource } from "./resources/transfers.js";
import { WebhooksResource } from "./resources/webhooks.js";
import { TestResource } from "./resources/test/index.js";
import { type HighnoteOptions, type HighnoteEnvironment, API_URLS } from "./types.js";

export class Highnote {
  /** The underlying GraphQL client (exposed for advanced use cases). */
  readonly graphql: GraphQLClient;

  /** Default page size for paginated queries. */
  readonly defaultPageSize: number;

  /** The API environment this client targets. */
  readonly environment: HighnoteEnvironment;

  /** Simulation methods (test environment only). */
  readonly test: TestResource;

  // ── Resources ──────────────────────────────────────────────
  readonly addresses: AddressesResource;
  readonly accountHolders: AccountHoldersResource;
  readonly applications: ApplicationsResource;
  readonly cardProducts: CardProductsResource;
  readonly cards: CardsResource;
  readonly clientTokens: ClientTokensResource;
  readonly collaborativeAuth: CollaborativeAuthResource;
  readonly digitalWallets: DigitalWalletsResource;
  readonly disputes: DisputesResource;
  readonly documents: DocumentsResource;
  readonly ach: AchResource;
  readonly externalAccounts: ExternalAccountsResource;
  readonly financialAccounts: FinancialAccountsResource;
  readonly provisioning: ProvisioningResource;
  readonly spendRules: SpendRulesResource;
  readonly transactions: TransactionsResource;
  readonly transfers: TransfersResource;
  readonly webhooks: WebhooksResource;

  constructor(options: HighnoteOptions) {
    const { apiKey, environment = "test", baseUrl, defaultPageSize = 20 } = options;

    if (!apiKey) {
      throw new Error("Highnote API key is required");
    }

    const url = baseUrl ?? `${API_URLS[environment]}/graphql`;

    this.graphql = new GraphQLClient(url, {
      headers: {
        authorization: encodeApiKey(apiKey),
      },
    });

    this.defaultPageSize = defaultPageSize;
    this.environment = environment;

    // Wire up resources
    this.addresses = new AddressesResource(this);
    this.accountHolders = new AccountHoldersResource(this);
    this.applications = new ApplicationsResource(this);
    this.cardProducts = new CardProductsResource(this);
    this.cards = new CardsResource(this);
    this.clientTokens = new ClientTokensResource(this);
    this.collaborativeAuth = new CollaborativeAuthResource(this);
    this.digitalWallets = new DigitalWalletsResource(this);
    this.disputes = new DisputesResource(this);
    this.documents = new DocumentsResource(this);
    this.ach = new AchResource(this);
    this.externalAccounts = new ExternalAccountsResource(this);
    this.financialAccounts = new FinancialAccountsResource(this);
    this.provisioning = new ProvisioningResource(this);
    this.spendRules = new SpendRulesResource(this);
    this.transactions = new TransactionsResource(this);
    this.transfers = new TransfersResource(this);
    this.webhooks = new WebhooksResource(this);

    this.test = new TestResource(this, this.environment);
  }
}
