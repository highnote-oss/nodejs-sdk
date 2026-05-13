import type { Highnote } from "../../client.js";
import type { HighnoteEnvironment } from "../../types.js";
import { HighnoteSimulationError } from "../../errors.js";
import { TestTransactionsResource } from "./transactions.js";
import { TestApplicationsResource } from "./applications.js";
import { TestDepositsResource } from "./deposits.js";
import { TestAchResource } from "./ach.js";
import { TestPhysicalCardsResource } from "./physicalCards.js";
import { TestFinancialAccountsResource } from "./financialAccounts.js";

export class TestResource {
  /** @internal */
  readonly _client: Highnote;
  /** @internal */
  readonly _environment: HighnoteEnvironment;
  readonly transactions: TestTransactionsResource;
  readonly applications: TestApplicationsResource;
  readonly deposits: TestDepositsResource;
  readonly ach: TestAchResource;
  readonly physicalCards: TestPhysicalCardsResource;
  readonly financialAccounts: TestFinancialAccountsResource;

  constructor(client: Highnote, environment: HighnoteEnvironment) {
    this._client = client;
    this._environment = environment;
    this.transactions = new TestTransactionsResource(this);
    this.applications = new TestApplicationsResource(this);
    this.deposits = new TestDepositsResource(this);
    this.ach = new TestAchResource(this);
    this.physicalCards = new TestPhysicalCardsResource(this);
    this.financialAccounts = new TestFinancialAccountsResource(this);
  }

  /** @internal Throws if not in test environment. */
  guardEnvironment(method: string): void {
    if (this._environment !== "test") {
      throw new HighnoteSimulationError(method);
    }
  }
}
