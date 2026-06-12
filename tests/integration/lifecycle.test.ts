import { describe, it, expect, beforeAll } from "vitest";
import {
  Highnote,
  PhoneLabel,
  PaymentCardClientTokenPermission,
} from "../../src/index.js";
import { resolveConsumerCardProductId } from "./cardProductHelpers.js";

/**
 * Full lifecycle integration test:
 * account holder → application → approval (poll) → financial account → card → client token
 *
 * This test runs against the real Highnote test environment.
 * Application approval usually takes a few seconds but may occasionally be slow.
 */
describe("full lifecycle (integration)", () => {
  let client: Highnote;
  let cardProductId: string;

  beforeAll(async () => {
    client = new Highnote({
      apiKey: process.env.HIGHNOTE_API_KEY!,
      environment: "test",
    });

    // Resolve a consumer card product (one that accepts USPerson applicants). The test
    // environment may have commercial-only products listed first which
    // would reject our USPerson applicant with PARTY_ROLE_TYPE_NOT_SUPPORTED.
    cardProductId = await resolveConsumerCardProductId(client);
    expect(cardProductId).toBeDefined();
  });

  it("creates account holder → application → financial account → card → client token", async () => {
    // 1. Create account holder
    const holder = await client.accountHolders.createUSPerson({
      personAccountHolder: {
        name: { givenName: "Lifecycle", familyName: "Test" },
        dateOfBirth: "1990-06-15",
        email: "lifecycle-test@example.com",
        billingAddress: {
          streetAddress: "456 Test Ave",
          locality: "San Francisco",
          region: "CA",
          postalCode: "94105",
          countryCodeAlpha3: "USA",
        },
        phoneNumber: {
          countryCode: "1",
          number: "5551234567",
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

    expect(holder.id).toBeDefined();

    // 2. Create application
    const app = await client.applications.create({
      accountHolderId: holder.id,
      cardProductId,
      cardHolderAgreementConsent: {
        consentTimestamp: new Date().toISOString(),
        primaryAuthorizedPersonId: holder.id,
      },
    });

    expect(app.id).toBeDefined();
    expect(app.applicationState).toBeDefined();

    // 3. Poll for approval (up to 30 seconds)
    let status = app.applicationState?.status;
    const deadline = Date.now() + 30_000;
    let polledApp: Awaited<ReturnType<typeof client.applications.get>> | undefined;

    while (status !== "APPROVED" && Date.now() < deadline) {
      await new Promise((r) => setTimeout(r, 2000));
      polledApp = await client.applications.get(app.id);
      status = polledApp.applicationState?.status;

      // If denied or closed, fail fast
      if (status === "DENIED" || status === "CLOSED") {
        throw new Error(`Application was ${status}, expected APPROVED`);
      }
    }

    expect(status).toBe("APPROVED");

    // Verify applicationWorkflows are present on the polled application
    expect(polledApp).toBeDefined();
    expect(polledApp!.applicationWorkflows).toBeDefined();
    expect(Array.isArray(polledApp!.applicationWorkflows)).toBe(true);

    // 4. Issue financial account
    const account = await client.financialAccounts.issue({
      applicationId: app.id,
      name: "Lifecycle Test Account",
    });

    expect(account.id).toBeDefined();

    // 5. Issue payment card
    const card = await client.cards.issue({
      financialAccountId: account.id,
      options: {
        activateOnCreate: false,
        expirationDate: "2029-12-31T00:00:00Z",
      },
    });

    expect(card.id).toBeDefined();
    expect(card.status).toBe("ACTIVATION_REQUIRED");

    // Verify enriched response fields from issue mutation
    expect(card.bin).toBeDefined();
    expect(card.last4).toBeDefined();
    expect(card.last4).toHaveLength(4);
    expect(card.network).toBeDefined();
    expect(card.formFactor).toBeDefined();
    expect(card.expirationDate).toBeDefined();

    // 6. Activate card
    const activated = await client.cards.activate({
      paymentCardId: card.id,
    });

    expect(activated.status).toBe("ACTIVE");

    // Verify enriched response fields from activate mutation
    expect(activated.bin).toBeDefined();
    expect(activated.last4).toBeDefined();
    expect(activated.last4).toHaveLength(4);
    expect(activated.network).toBeDefined();
    expect(activated.formFactor).toBeDefined();
    expect(activated.expirationDate).toBeDefined();

    // 7. Get card
    const fetched = await client.cards.get(card.id);
    expect(fetched.id).toBe(card.id);
    expect(fetched.status).toBe("ACTIVE");

    // 8. Generate client token
    const token = await client.clientTokens.createForPaymentCard({
      paymentCardId: card.id,
      permissions: [PaymentCardClientTokenPermission.READ_RESTRICTED_DETAILS],
    });

    expect(token.value).toBeDefined();
    expect(token.value.length).toBeGreaterThan(0);
    expect(token.expirationDate).toBeDefined();
  }, 60_000); // 60 second timeout for the full lifecycle
});
