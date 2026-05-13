import { describe, it, expect, beforeAll } from "vitest";
import {
  Highnote,
  PhoneLabel,
  FinancialAccountSuspensionReasonInput,
} from "../../src/index.js";

/**
 * Card and financial account lifecycle integration tests.
 *
 * Sets up: account holder → application → poll for approval → financial account
 * Then tests card issuance variants, lifecycle transitions, and financial account management.
 */
describe("card & financial account lifecycle (integration)", () => {
  let client: Highnote;
  let financialAccountId: string;

  beforeAll(async () => {
    client = new Highnote({
      apiKey: process.env.HIGHNOTE_API_KEY!,
      environment: "test",
    });

    // Get a card product
    let cardProductId: string | undefined;
    for await (const product of client.cardProducts.list({ pageSize: 1 })) {
      cardProductId = product.id;
      break;
    }
    expect(cardProductId).toBeDefined();

    // Create account holder
    const holder = await client.accountHolders.createUSPerson({
      personAccountHolder: {
        name: { givenName: "CardTest", familyName: "Integration" },
        dateOfBirth: "1985-03-20",
        email: "card-lifecycle@example.com",
        billingAddress: {
          streetAddress: "789 Card St",
          locality: "San Francisco",
          region: "CA",
          postalCode: "94105",
          countryCodeAlpha3: "USA",
        },
        phoneNumber: {
          countryCode: "1",
          number: "5559876543",
          label: PhoneLabel.MOBILE,
        },
        identificationDocument: {
          socialSecurityNumber: {
            number: "123-45-6789",
            countryCodeAlpha3: "USA",
          },
        },
      },
    });

    // Create and approve application
    const app = await client.applications.create({
      accountHolderId: holder.id,
      cardProductId: cardProductId!,
      cardHolderAgreementConsent: {
        consentTimestamp: new Date().toISOString(),
        primaryAuthorizedPersonId: holder.id,
      },
    });

    const deadline = Date.now() + 30_000;
    let status = app.applicationState?.status;
    while (status !== "APPROVED" && Date.now() < deadline) {
      await new Promise((r) => setTimeout(r, 2000));
      const polled = await client.applications.get(app.id);
      status = polled.applicationState?.status;
      if (status === "DENIED" || status === "CLOSED") {
        throw new Error(`Application was ${status}, expected APPROVED`);
      }
    }
    expect(status).toBe("APPROVED");

    // Issue financial account
    const account = await client.financialAccounts.issue({
      applicationId: app.id,
      name: "Card Lifecycle Test Account",
    });
    financialAccountId = account.id;
  }, 60_000);

  // ── Card issuance variants ──

  it("issues a card with activateOnCreate: true → status is ACTIVE with enriched fields", async () => {
    const card = await client.cards.issue({
      financialAccountId,
      options: {
        activateOnCreate: true,
        expirationDate: "2029-12-31T00:00:00Z",
      },
    });

    expect(card.id).toBeDefined();
    expect(card.status).toBe("ACTIVE");

    // Verify enriched response fields
    expect(card.bin).toBeDefined();
    expect(card.last4).toBeDefined();
    expect(card.last4).toHaveLength(4);
    expect(card.network).toBeDefined();
    expect(card.formFactor).toBeDefined();
    expect(card.expirationDate).toBeDefined();
  });

  it("issues a card with activateOnCreate: false → then activates separately", async () => {
    const card = await client.cards.issue({
      financialAccountId,
      options: {
        activateOnCreate: false,
        expirationDate: "2029-12-31T00:00:00Z",
      },
    });

    expect(card.status).toBe("ACTIVATION_REQUIRED");

    const activated = await client.cards.activate({ paymentCardId: card.id });
    expect(activated.status).toBe("ACTIVE");

    // Verify enriched response fields from activate mutation
    expect(activated.bin).toBeDefined();
    expect(activated.last4).toBeDefined();
    expect(activated.last4).toHaveLength(4);
    expect(activated.network).toBeDefined();
    expect(activated.formFactor).toBeDefined();
    expect(activated.expirationDate).toBeDefined();
  });

  // ── Card lifecycle transitions ──

  it("suspends an active card", async () => {
    const card = await client.cards.issue({
      financialAccountId,
      options: { activateOnCreate: true, expirationDate: "2029-12-31T00:00:00Z" },
    });
    expect(card.status).toBe("ACTIVE");

    const suspended = await client.cards.suspend({
      paymentCardId: card.id,
    });
    expect(suspended.status).toBe("SUSPENDED");

    // Verify enriched response fields from suspend mutation
    expect(suspended.bin).toBeDefined();
    expect(suspended.last4).toBeDefined();
    expect(suspended.last4).toHaveLength(4);
    expect(suspended.network).toBeDefined();
    expect(suspended.formFactor).toBeDefined();
    expect(suspended.expirationDate).toBeDefined();
  });

  it("closes an active card with enriched response fields", async () => {
    const card = await client.cards.issue({
      financialAccountId,
      options: { activateOnCreate: true, expirationDate: "2029-12-31T00:00:00Z" },
    });
    expect(card.status).toBe("ACTIVE");

    const closed = await client.cards.close({
      paymentCardId: card.id,
    });
    expect(closed.status).toBe("CLOSED");

    // Verify enriched response fields from close mutation
    expect(closed.bin).toBeDefined();
    expect(closed.last4).toBeDefined();
    expect(closed.last4).toHaveLength(4);
    expect(closed.network).toBeDefined();
    expect(closed.formFactor).toBeDefined();
    expect(closed.expirationDate).toBeDefined();
  });

  it("reissues a card → creates a new card from the original", async () => {
    const original = await client.cards.issue({
      financialAccountId,
      options: { activateOnCreate: true, expirationDate: "2028-06-30T00:00:00Z" },
    });
    expect(original.id).toBeDefined();

    const reissued = await client.cards.reissue({
      originalPaymentCardId: original.id,
      options: {
        activateOnCreate: true,
        expirationDate: "2029-06-30T00:00:00Z",
      },
    });

    expect(reissued.id).toBeDefined();
    expect(reissued.id).not.toBe(original.id);
    expect(reissued.status).toBe("ACTIVE");
  });

  // ── Card fulfillment ──

  it("orders a physical card and cancels the order", async () => {
    const card = await client.cards.issue({
      financialAccountId,
      options: { activateOnCreate: true, expirationDate: "2029-12-31T00:00:00Z" },
    });

    const order = await client.cards.orderPhysical({
      paymentCardId: card.id,
      cardPersonalization: { textLines: { line1: "CARDTEST INTEGRATION" } },
      deliveryDetails: {
        name: { givenName: "CardTest", familyName: "Integration" },
        address: {
          streetAddress: "789 Card St",
          locality: "San Francisco",
          region: "CA",
          postalCode: "94105",
          countryCodeAlpha3: "USA",
        },
      },
    });

    expect(order.id).toBeDefined();
    expect(order.orderState?.status).toBeDefined();
    expect(order.cardPersonalization?.textLines?.line1).toBe("CARDTEST INTEGRATION");

    // Cancel the order
    const canceled = await client.cards.cancelPhysicalOrder({
      physicalPaymentCardOrderId: order.id,
    });

    expect(canceled.id).toBe(order.id);
    expect(canceled.orderState?.status).toBe("CANCELED");
  });

  // ── Financial account management ──

  it("suspends and unsuspends a financial account", async () => {
    // Issue a separate financial account for this test so we don't break the shared one
    // We'll use the same pattern — get a fresh application
    let cardProductId: string | undefined;
    for await (const product of client.cardProducts.list({ pageSize: 1 })) {
      cardProductId = product.id;
      break;
    }

    const holder = await client.accountHolders.createUSPerson({
      personAccountHolder: {
        name: { givenName: "SuspendFA", familyName: "Test" },
        dateOfBirth: "1988-11-05",
        email: "suspend-fa@example.com",
        billingAddress: {
          streetAddress: "321 Suspend Ln",
          locality: "San Francisco",
          region: "CA",
          postalCode: "94105",
          countryCodeAlpha3: "USA",
        },
        phoneNumber: {
          countryCode: "1",
          number: "5551112222",
          label: PhoneLabel.MOBILE,
        },
        identificationDocument: {
          socialSecurityNumber: {
            number: "123-45-6789",
            countryCodeAlpha3: "USA",
          },
        },
      },
    });

    const app = await client.applications.create({
      accountHolderId: holder.id,
      cardProductId: cardProductId!,
      cardHolderAgreementConsent: {
        consentTimestamp: new Date().toISOString(),
        primaryAuthorizedPersonId: holder.id,
      },
    });

    const deadline = Date.now() + 30_000;
    let status = app.applicationState?.status;
    while (status !== "APPROVED" && Date.now() < deadline) {
      await new Promise((r) => setTimeout(r, 2000));
      const polled = await client.applications.get(app.id);
      status = polled.applicationState?.status;
      if (status === "DENIED" || status === "CLOSED") {
        throw new Error(`Application was ${status}`);
      }
    }
    expect(status).toBe("APPROVED");

    const account = await client.financialAccounts.issue({
      applicationId: app.id,
      name: "Suspend Test Account",
    });

    // Suspend
    const suspended = await client.financialAccounts.suspend({
      id: account.id,
      memo: "Integration test suspension",
      suspensionReason: FinancialAccountSuspensionReasonInput.ACCOUNT_HOLDER_REQUEST,
    });
    expect(suspended.accountStatus).toBe("SUSPENDED");

    // Unsuspend
    const unsuspended = await client.financialAccounts.unsuspend({
      id: account.id,
      memo: "Integration test unsuspension",
    });
    expect(unsuspended.accountStatus).toBe("ACTIVE");
  }, 60_000);
});
