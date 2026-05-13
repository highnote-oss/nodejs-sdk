import { describe, it, expect } from "vitest";
import {
  HighnoteError,
  HighnoteUserError,
  HighnoteAccessDeniedError,
  HighnoteUnexpectedResponseError,
  throwIfError,
} from "../../src/errors.js";

describe("error classes", () => {
  it("HighnoteError is instanceof Error", () => {
    const err = new HighnoteError("test");
    expect(err).toBeInstanceOf(Error);
    expect(err.name).toBe("HighnoteError");
  });

  it("HighnoteUserError carries field errors", () => {
    const err = new HighnoteUserError([
      { code: "INVALID_FIELD", description: "Name is required" },
    ]);
    expect(err).toBeInstanceOf(HighnoteError);
    expect(err.name).toBe("HighnoteUserError");
    expect(err.message).toBe("Name is required");
    expect(err.fieldErrors).toHaveLength(1);
    expect(err.fieldErrors[0].code).toBe("INVALID_FIELD");
  });

  it("HighnoteUserError joins multiple field errors", () => {
    const err = new HighnoteUserError([
      { description: "Name is required" },
      { description: "Email is invalid" },
    ]);
    expect(err.message).toBe("Name is required; Email is invalid");
    expect(err.fieldErrors).toHaveLength(2);
  });

  it("HighnoteUserError handles empty errors array", () => {
    const err = new HighnoteUserError([]);
    expect(err.message).toBe("User error");
    expect(err.fieldErrors).toHaveLength(0);
  });

  it("HighnoteAccessDeniedError", () => {
    const err = new HighnoteAccessDeniedError("not allowed");
    expect(err).toBeInstanceOf(HighnoteError);
    expect(err.name).toBe("HighnoteAccessDeniedError");
  });

  it("HighnoteUnexpectedResponseError carries typename", () => {
    const err = new HighnoteUnexpectedResponseError("SomeWeirdError");
    expect(err).toBeInstanceOf(HighnoteError);
    expect(err.typename).toBe("SomeWeirdError");
    expect(err.message).toBe("Unexpected response type: SomeWeirdError");
  });
});

describe("throwIfError", () => {
  it("does nothing for null/undefined", () => {
    expect(() => throwIfError(null)).not.toThrow();
    expect(() => throwIfError(undefined)).not.toThrow();
  });

  it("does nothing for success __typename", () => {
    expect(() => throwIfError({ __typename: "CardProduct" })).not.toThrow();
    expect(() => throwIfError({ __typename: "ClientToken" })).not.toThrow();
  });

  it("throws HighnoteUserError for UserError with field errors", () => {
    expect(() =>
      throwIfError({
        __typename: "UserError",
        errors: [{ code: "INVALID", description: "Bad input" }],
      }),
    ).toThrow(HighnoteUserError);

    try {
      throwIfError({
        __typename: "UserError",
        errors: [{ code: "INVALID", description: "Bad input" }],
      });
    } catch (err) {
      expect(err).toBeInstanceOf(HighnoteUserError);
      expect((err as HighnoteUserError).fieldErrors[0].code).toBe("INVALID");
    }
  });

  it("throws HighnoteAccessDeniedError for AccessDeniedError", () => {
    expect(() =>
      throwIfError({ __typename: "AccessDeniedError", message: "Forbidden" }),
    ).toThrow(HighnoteAccessDeniedError);
  });

  it("throws HighnoteUnexpectedResponseError for unknown Error types", () => {
    expect(() =>
      throwIfError({ __typename: "RateLimitError", message: "Too fast" }),
    ).toThrow(HighnoteUnexpectedResponseError);
  });

  it("does not throw for types that don't end with Error", () => {
    expect(() => throwIfError({ __typename: "PaymentCard" })).not.toThrow();
    expect(() => throwIfError({ __typename: "AccountHolder" })).not.toThrow();
  });
});
