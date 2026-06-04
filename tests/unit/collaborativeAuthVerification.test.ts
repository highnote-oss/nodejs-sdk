import { describe, it, expect } from "vitest";
import { createHmac } from "node:crypto";
import {
  verifyCollaborativeAuthSignature,
  type CollaborativeAuthRequest,
} from "../../src/collaborativeAuthVerification.js";

function makeSignedPayload(secret: string, timestampMs: number): { raw: string; signature: string; parsed: CollaborativeAuthRequest } {
  const parsed: CollaborativeAuthRequest = {
    data: {
      collaborativeAuthorizationRequest: {
        id: "req_1",
        transaction: { id: "tx_1" },
        paymentCard: { id: "pc_1" },
        transactionAmount: { value: 100, currencyCode: "USD" },
        settlementAmount: { value: 100, currencyCode: "USD" },
        requestedAmount: { value: 100, currencyCode: "USD" },
        merchantDetails: {
          merchantId: "m_1",
          merchantCategoryCode: "5411",
          description: "Acme",
          countryCodeAlpha3: "USA",
        },
        responseCode: "APPROVED",
      },
    },
    extensions: { signatureTimestamp: timestampMs },
  };
  const raw = JSON.stringify(parsed);
  const signature = createHmac("sha256", secret).update(raw).digest("hex");
  return { raw, signature, parsed };
}

describe("verifyCollaborativeAuthSignature", () => {
  const SECRET = "test-secret-do-not-use";

  it("returns the parsed request when signature is valid and fresh", () => {
    const { raw, signature } = makeSignedPayload(SECRET, Date.now());
    const result = verifyCollaborativeAuthSignature({
      payload: raw,
      signature,
      signingKey: SECRET,
    });
    expect(result.valid).toBe(true);
    expect(result.request?.data.collaborativeAuthorizationRequest.id).toBe("req_1");
  });

  it("rejects when signature is wrong", () => {
    const { raw } = makeSignedPayload(SECRET, Date.now());
    const result = verifyCollaborativeAuthSignature({
      payload: raw,
      signature: "deadbeef".repeat(8),
      signingKey: SECRET,
    });
    expect(result.valid).toBe(false);
  });

  it("rejects when timestamp is outside tolerance", () => {
    const stale = Date.now() - 10 * 60 * 1000; // 10 min ago
    const { raw, signature } = makeSignedPayload(SECRET, stale);
    const result = verifyCollaborativeAuthSignature({
      payload: raw,
      signature,
      signingKey: SECRET,
      toleranceInMs: 5 * 60 * 1000, // 5 min
    });
    expect(result.valid).toBe(false);
  });

  it("rejects when payload is not valid JSON", () => {
    const signature = createHmac("sha256", SECRET).update("not-json").digest("hex");
    const result = verifyCollaborativeAuthSignature({
      payload: "not-json",
      signature,
      signingKey: SECRET,
    });
    expect(result.valid).toBe(false);
  });

  it("supports comma-separated rotated keys", () => {
    const { raw, signature } = makeSignedPayload(SECRET, Date.now());
    const wrong = "0".repeat(64);
    const result = verifyCollaborativeAuthSignature({
      payload: raw,
      signature: `${wrong},${signature}`,
      signingKey: SECRET,
    });
    expect(result.valid).toBe(true);
  });
});
