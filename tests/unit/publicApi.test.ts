import { describe, it, expect } from "vitest";
import * as sdk from "../../src/index.js";

describe("public API surface (Wave 1 additions)", () => {
  it("exports verifyCollaborativeAuthSignature", () => {
    expect(typeof sdk.verifyCollaborativeAuthSignature).toBe("function");
  });

  it("exports CollaborativeAuthorizationResponseCode enum", () => {
    expect(sdk.CollaborativeAuthorizationResponseCode).toBeDefined();
  });
});
