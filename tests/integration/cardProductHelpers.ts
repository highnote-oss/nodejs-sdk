import { CardProductVertical } from "../../src/generated/graphql.js";
import type { Highnote } from "../../src/index.js";

/**
 * Verticals known to accept USPerson applicants. The `commercial` boolean on
 * `CardProduct` is NOT a reliable discriminator here — both `CONSUMER_PREPAID`
 * and `AP_INVOICE_AUTOMATION` products report `commercial: false`, but only the
 * former accepts person applicants. `AP_INVOICE_AUTOMATION` requires a business
 * or subscriber-product applicant and returns `PARTY_ROLE_TYPE_NOT_SUPPORTED`
 * on `applications.create` with a USPerson account holder id.
 *
 * Add more verticals here as integration tests start exercising them.
 */
const PERSONAL_APPLICANT_VERTICALS: ReadonlySet<CardProductVertical> = new Set([
  CardProductVertical.CONSUMER_PREPAID,
  CardProductVertical.CONSUMER_CREDIT,
  CardProductVertical.GENERAL_PURPOSE_RELOADABLE,
  CardProductVertical.EARNED_WAGE_ACCESS,
  CardProductVertical.PAYROLL,
]);

/**
 * Resolve a card product suitable for the createUSPerson → applications.create
 * lifecycle.
 *
 * Resolution order:
 *  1. `HIGHNOTE_TEST_PERSONAL_CARD_PRODUCT_ID` env var — explicit pin.
 *  2. First card product whose `vertical` is in {@link PERSONAL_APPLICANT_VERTICALS}.
 *
 * Throws if neither is found. Paginates up to 50 products to avoid sticking on
 * the first page when the environment grows.
 */
export async function resolvePersonalCardProductId(
  client: Highnote,
): Promise<string> {
  const explicit = process.env.HIGHNOTE_TEST_PERSONAL_CARD_PRODUCT_ID;
  if (explicit) return explicit;

  let scanned = 0;
  for await (const product of client.cardProducts.list({ pageSize: 20 })) {
    if (
      product.vertical !== undefined &&
      product.vertical !== null &&
      PERSONAL_APPLICANT_VERTICALS.has(product.vertical)
    ) {
      return product.id;
    }
    scanned += 1;
    if (scanned >= 50) break;
  }

  throw new Error(
    `No personal-applicant card product found in the test environment (verticals tried: ${[
      ...PERSONAL_APPLICANT_VERTICALS,
    ].join(", ")}). Either pin one via HIGHNOTE_TEST_PERSONAL_CARD_PRODUCT_ID or provision one on the Highnote dashboard.`,
  );
}
