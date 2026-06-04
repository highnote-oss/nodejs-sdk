import { createHmac, timingSafeEqual } from "node:crypto";

export interface VerifyCollaborativeAuthSignatureInput {
  /** Raw request body string (must be the exact bytes received). */
  payload: string;
  /** Value of the `highnote-signature` header (comma-separated if rotated). */
  signature: string;
  /** Signing key issued when the endpoint was registered. */
  signingKey: string;
  /** Max age of the signature timestamp in ms. Default: 5 minutes. */
  toleranceInMs?: number;
}

export interface CollaborativeAuthRequest {
  data: {
    collaborativeAuthorizationRequest: {
      id: string;
      transaction: { id: string };
      paymentCard: { id: string };
      transactionAmount: { value: number; currencyCode: string };
      settlementAmount: { value: number; currencyCode: string };
      requestedAmount: { value: number; currencyCode: string };
      merchantDetails: {
        merchantId: string;
        merchantCategoryCode: string;
        description?: string;
        countryCodeAlpha3?: string;
      };
      pointOfSaleDetails?: Record<string, unknown>;
      responseCode?: string;
      avsResponseCode?: string;
      postalCodeResponseCode?: string;
      cvvResponseCode?: string;
    };
  };
  extensions: {
    signatureTimestamp: number;
  };
  [key: string]: unknown;
}

export interface CollaborativeAuthResponse {
  transaction: { id: string };
  responseCode: string;
  authorizedAmount?: { value: number; currencyCode: string };
}

export interface VerifyCollaborativeAuthSignatureResult {
  valid: boolean;
  request?: CollaborativeAuthRequest;
}

const DEFAULT_TOLERANCE_MS = 5 * 60 * 1000;

/**
 * Verify a collaborative-authorization request's HMAC-SHA256 signature
 * against the signing key issued at endpoint registration. Returns
 * `{ valid, request? }` — the parsed body is returned only when valid.
 *
 * Highnote sends the signature in the `highnote-signature` header and
 * embeds a unix-ms `signatureTimestamp` in `extensions` for freshness
 * checking. Comma-separated signatures are supported to handle key rotation.
 *
 * ```ts
 * import { verifyCollaborativeAuthSignature } from "@highnote-oss/nodejs-sdk";
 *
 * const { valid, request } = verifyCollaborativeAuthSignature({
 *   payload: rawBodyString,
 *   signature: req.headers["highnote-signature"],
 *   signingKey: process.env.CA_SIGNING_KEY!,
 * });
 *
 * if (!valid || !request) return reply.code(400).send();
 * // ... make a decision, respond within 2 seconds
 * ```
 */
export function verifyCollaborativeAuthSignature(
  input: VerifyCollaborativeAuthSignatureInput,
): VerifyCollaborativeAuthSignatureResult {
  const { payload, signature, signingKey, toleranceInMs = DEFAULT_TOLERANCE_MS } = input;

  const expected = createHmac("sha256", signingKey).update(payload).digest("hex");
  const expectedBuffer = Buffer.from(expected, "utf8");

  const signatures = signature.split(",").map((s) => s.trim());
  let signatureMatch = false;
  for (const sig of signatures) {
    const sigBuffer = Buffer.from(sig, "utf8");
    if (sigBuffer.length === expectedBuffer.length && timingSafeEqual(sigBuffer, expectedBuffer)) {
      signatureMatch = true;
      break;
    }
  }
  if (!signatureMatch) return { valid: false };

  let parsed: CollaborativeAuthRequest;
  try {
    parsed = JSON.parse(payload) as CollaborativeAuthRequest;
  } catch {
    return { valid: false };
  }

  const timestamp = parsed?.extensions?.signatureTimestamp;
  if (typeof timestamp !== "number") return { valid: false };
  if (Math.abs(Date.now() - timestamp) > toleranceInMs) return { valid: false };

  return { valid: true, request: parsed };
}
