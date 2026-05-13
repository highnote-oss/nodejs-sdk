import { describe, it, expect } from "vitest";
import { createHmac } from "node:crypto";
import { verifyWebhookSignature } from "../../src/webhookVerification.js";

const SECRET = "test-signing-secret-that-is-long-enough";

function sign(payload: string, secret: string = SECRET): string {
  return createHmac("sha256", secret).update(payload).digest("hex");
}

function makePayload(timestampMs?: number): string {
  return JSON.stringify({
    data: { id: "evt_123", type: "CARD_PAYMENT_AUTHORIZED_EVENT" },
    extensions: {
      signatureTimestamp: timestampMs ?? Date.now(),
    },
  });
}

describe("verifyWebhookSignature", () => {
  it("returns valid for a correctly signed payload", () => {
    const payload = makePayload();
    const signature = sign(payload);
    const result = verifyWebhookSignature({
      payload,
      signature,
      secret: SECRET,
    });
    expect(result.valid).toBe(true);
    expect(result.event).toBeDefined();
    expect(result.event.extensions.signatureTimestamp).toBeTypeOf("number");
  });

  it("returns invalid for a wrong signature", () => {
    const payload = makePayload();
    const result = verifyWebhookSignature({
      payload,
      signature: "bad-signature",
      secret: SECRET,
    });
    expect(result.valid).toBe(false);
  });

  it("returns invalid for a wrong secret", () => {
    const payload = makePayload();
    const signature = sign(payload, "wrong-secret");
    const result = verifyWebhookSignature({
      payload,
      signature,
      secret: SECRET,
    });
    expect(result.valid).toBe(false);
  });

  it("matches against comma-separated signatures (key rotation)", () => {
    const payload = makePayload();
    const correctSig = sign(payload);
    const signature = `old-invalid-sig,${correctSig}`;
    const result = verifyWebhookSignature({
      payload,
      signature,
      secret: SECRET,
    });
    expect(result.valid).toBe(true);
  });

  it("returns invalid for an expired timestamp", () => {
    const fifteenMinutesAgo = Date.now() - 16 * 60 * 1000;
    const payload = makePayload(fifteenMinutesAgo);
    const signature = sign(payload);
    const result = verifyWebhookSignature({
      payload,
      signature,
      secret: SECRET,
    });
    expect(result.valid).toBe(false);
  });

  it("accepts a custom tolerance", () => {
    const thirtyMinutesAgo = Date.now() - 30 * 60 * 1000;
    const payload = makePayload(thirtyMinutesAgo);
    const signature = sign(payload);
    const result = verifyWebhookSignature({
      payload,
      signature,
      secret: SECRET,
      toleranceInMs: 60 * 60 * 1000, // 1 hour
    });
    expect(result.valid).toBe(true);
  });

  it("returns invalid for malformed JSON", () => {
    const payload = "not-json";
    const signature = sign(payload);
    const result = verifyWebhookSignature({
      payload,
      signature,
      secret: SECRET,
    });
    expect(result.valid).toBe(false);
  });
});
