import { describe, it, expect } from "vitest";
import { encodeApiKey } from "../../src/auth.js";

describe("encodeApiKey", () => {
  it("encodes API key as Basic auth with trailing colon", () => {
    const result = encodeApiKey("sk_test_abc123");
    const expected = `Basic ${Buffer.from("sk_test_abc123:").toString("base64")}`;
    expect(result).toBe(expected);
  });

  it("starts with 'Basic '", () => {
    const result = encodeApiKey("any_key");
    expect(result).toMatch(/^Basic /);
  });

  it("base64 decodes to key + colon", () => {
    const result = encodeApiKey("my_secret_key");
    const base64Part = result.replace("Basic ", "");
    const decoded = Buffer.from(base64Part, "base64").toString("ascii");
    expect(decoded).toBe("my_secret_key:");
  });

  it("handles empty string", () => {
    const result = encodeApiKey("");
    const base64Part = result.replace("Basic ", "");
    const decoded = Buffer.from(base64Part, "base64").toString("ascii");
    expect(decoded).toBe(":");
  });
});
