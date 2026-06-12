import { describe, it, expect } from "vitest";
import * as sdk from "../../src/index.js";

describe("public API surface (Wave 1 additions)", () => {
  it("exports verifyCollaborativeAuthSignature", () => {
    expect(typeof sdk.verifyCollaborativeAuthSignature).toBe("function");
  });

  it("exports CollaborativeAuthorizationResponseCode enum", () => {
    expect(sdk.CollaborativeAuthorizationResponseCode).toBeDefined();
  });

  it("exports Iso4217Alpha3SupportedCurrency enum", () => {
    expect(sdk.Iso4217Alpha3SupportedCurrency).toBeDefined();
    expect(sdk.Iso4217Alpha3SupportedCurrency.USD).toBe("USD");
  });

  it("exports MerchantCategory enum", () => {
    expect(sdk.MerchantCategory).toBeDefined();
  });

  it("exports Iso3166Alpha3Country enum", () => {
    expect(sdk.Iso3166Alpha3Country).toBeDefined();
    expect(sdk.Iso3166Alpha3Country.USA).toBe("USA");
  });
});
