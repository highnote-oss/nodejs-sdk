import { describe, it, expect, beforeAll } from "vitest";
import {
  Highnote,
  GeneratePaymentMethodTokenizationClientTokenPermission,
} from "../../src/index.js";

describe("clientTokens (integration)", () => {
  let client: Highnote;

  beforeAll(() => {
    client = new Highnote({
      apiKey: process.env.HIGHNOTE_API_KEY!,
      environment: "test",
    });
  });

  it("createForTokenization() returns a valid client token", async () => {
    const token = await client.clientTokens.createForTokenization({
      permissions: [GeneratePaymentMethodTokenizationClientTokenPermission.TOKENIZE_PAYMENT_METHOD],
    });

    expect(token.value).toBeDefined();
    expect(token.value.length).toBeGreaterThan(0);
    expect(token.expirationDate).toBeDefined();
  });
});
