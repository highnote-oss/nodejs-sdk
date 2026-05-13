import { describe, it, expect } from "vitest";
import { renderErrors } from "../../../scripts/doc-gen/render/renderErrors.js";
import type { ErrorClassDoc } from "../../../scripts/doc-gen/render/types.js";

const userError: ErrorClassDoc = {
  name: "HighnoteUserError",
  description: "Thrown when the API returns a UserError (validation / bad input).",
  properties: [
    {
      name: "fieldErrors",
      type: "FieldError[]",
      description: "Array of field-level errors.",
    },
  ],
};

const accessDenied: ErrorClassDoc = {
  name: "HighnoteAccessDeniedError",
  description: "Thrown when the API returns an AccessDeniedError.",
  properties: [],
};

describe("renderErrors", () => {
  it("emits a `## Errors` heading", () => {
    const md = renderErrors([userError]);
    expect(md).toMatch(/^## Errors/);
  });

  it("emits a level-3 heading for each error class", () => {
    const md = renderErrors([userError, accessDenied]);
    expect(md).toContain("### `HighnoteUserError`");
    expect(md).toContain("### `HighnoteAccessDeniedError`");
  });

  it("renders the error description as a paragraph", () => {
    const md = renderErrors([userError]);
    expect(md).toContain(
      "Thrown when the API returns a UserError (validation / bad input)."
    );
  });

  it("renders a Properties block listing each public property", () => {
    const md = renderErrors([userError]);
    expect(md).toContain("**Properties**");
    expect(md).toContain(
      "- `fieldErrors` (`FieldError[]`) — Array of field-level errors."
    );
  });

  it("omits the Properties block when there are no properties", () => {
    const md = renderErrors([accessDenied]);
    expect(md).toContain("### `HighnoteAccessDeniedError`");
    expect(md).not.toContain("**Properties**");
  });

  it("renders the section heading alone when given an empty array", () => {
    const md = renderErrors([]);
    expect(md).toBe("## Errors");
  });

  it("preserves declaration order", () => {
    const md = renderErrors([userError, accessDenied]);
    expect(md.indexOf("HighnoteUserError")).toBeLessThan(
      md.indexOf("HighnoteAccessDeniedError")
    );
  });

  it("renders properties without descriptions cleanly", () => {
    const md = renderErrors([
      {
        name: "Foo",
        properties: [{ name: "code", type: "string" }],
      },
    ]);
    expect(md).toContain("- `code` (`string`)");
    expect(md).not.toContain("— undefined");
  });
});
