import { createHmac, timingSafeEqual } from "node:crypto";

export interface VerifyWebhookSignatureInput {
  /** Raw request body string. */
  payload: string;
  /** Value of the `highnote-signature` header (comma-separated if multiple keys). */
  signature: string;
  /** Signing secret from webhook registration. */
  secret: string;
  /** Max age of the signature timestamp in ms. Default: 15 minutes (900_000). */
  toleranceInMs?: number;
}

export interface WebhookEvent {
  data: Record<string, unknown>;
  extensions: {
    signatureTimestamp: number;
    [key: string]: unknown;
  };
  [key: string]: unknown;
}

export interface VerifyWebhookSignatureResult {
  valid: boolean;
  event: WebhookEvent;
}

const DEFAULT_TOLERANCE_MS = 15 * 60 * 1000; // 15 minutes

/**
 * Verify a webhook payload's HMAC-SHA256 signature against the signing secret
 * issued at webhook registration. Returns `{ valid, event }` — the parsed
 * event is returned even when invalid so callers can inspect it for logging.
 *
 * ```ts
 * const { valid, event } = verifyWebhookSignature({
 *   payload: rawBodyString,
 *   signature: req.headers["highnote-signature"],
 *   secret: process.env.WEBHOOK_SIGNING_SECRET!,
 * });
 * ```
 */
export function verifyWebhookSignature(
  input: VerifyWebhookSignatureInput,
): VerifyWebhookSignatureResult {
  const { payload, signature, secret, toleranceInMs = DEFAULT_TOLERANCE_MS } = input;
  const invalid = { valid: false, event: {} as WebhookEvent };

  // Compute expected HMAC
  const expected = createHmac("sha256", secret).update(payload).digest("hex");
  const expectedBuffer = Buffer.from(expected, "utf8");

  // Check each comma-separated signature (supports key rotation)
  const signatures = signature.split(",").map((s) => s.trim());
  let signatureMatch = false;

  for (const sig of signatures) {
    const sigBuffer = Buffer.from(sig, "utf8");
    if (sigBuffer.length === expectedBuffer.length) {
      if (timingSafeEqual(sigBuffer, expectedBuffer)) {
        signatureMatch = true;
        break;
      }
    }
  }

  if (!signatureMatch) {
    return invalid;
  }

  // Parse and validate timestamp
  let event: WebhookEvent;
  try {
    event = JSON.parse(payload) as WebhookEvent;
  } catch {
    return invalid;
  }

  const timestamp = event?.extensions?.signatureTimestamp;
  if (typeof timestamp !== "number") {
    return invalid;
  }

  const age = Math.abs(Date.now() - timestamp);
  if (age > toleranceInMs) {
    return invalid;
  }

  return { valid: true, event };
}
