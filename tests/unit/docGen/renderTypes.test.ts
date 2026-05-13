import { describe, it, expect } from "vitest";
import { renderTypes } from "../../../scripts/doc-gen/render/renderTypes.js";
import type { TypeAliasDoc } from "../../../scripts/doc-gen/render/types.js";

const paymentCard: TypeAliasDoc = {
  name: "PaymentCard",
  description: "A payment card resource.",
  fields: [
    { name: "id", type: "string" },
    { name: "bin", type: "string", description: "First 6 digits of the card." },
    { name: "last4", type: "string" },
  ],
};

const stringAlias: TypeAliasDoc = {
  name: "FormFactor",
  sourceText: 'type FormFactor = "PHYSICAL" | "VIRTUAL";',
};

describe("renderTypes", () => {
  it("emits a `## Types` heading", () => {
    const md = renderTypes([paymentCard]);
    expect(md).toMatch(/^## Types/);
  });

  it("emits a level-3 heading per type alias", () => {
    const md = renderTypes([paymentCard, stringAlias]);
    expect(md).toContain("### `PaymentCard`");
    expect(md).toContain("### `FormFactor`");
  });

  it("renders the description as a paragraph below the heading", () => {
    const md = renderTypes([paymentCard]);
    expect(md).toContain("### `PaymentCard`\n\nA payment card resource.");
  });

  it("emits a Fields block for object-shaped types", () => {
    const md = renderTypes([paymentCard]);
    expect(md).toContain("**Fields**");
    expect(md).toContain("- `id` (`string`)");
    expect(md).toContain("- `bin` (`string`) — First 6 digits of the card.");
  });

  it("emits a fenced ts block for sourceText-only types", () => {
    const md = renderTypes([stringAlias]);
    expect(md).toContain("```ts\ntype FormFactor");
  });

  it("does not emit a Fields block for sourceText-only types", () => {
    const md = renderTypes([stringAlias]);
    expect(md).not.toContain("**Fields**");
  });

  it("renders the section heading alone when given an empty array", () => {
    const md = renderTypes([]);
    expect(md).toBe("## Types");
  });

  it("preserves declaration order", () => {
    const md = renderTypes([paymentCard, stringAlias]);
    expect(md.indexOf("PaymentCard")).toBeLessThan(md.indexOf("FormFactor"));
  });
});
