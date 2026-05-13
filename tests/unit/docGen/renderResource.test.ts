import { describe, it, expect } from "vitest";
import { renderResource } from "../../../scripts/doc-gen/render/renderResource.js";
import type { ResourceDoc } from "../../../scripts/doc-gen/render/types.js";

const baseResource: ResourceDoc = {
  name: "cards",
  className: "CardsResource",
  methods: [
    {
      name: "issue",
      signatureLabel: "issue(input)",
      summary: "Issue a payment card for a financial account.",
      parameters: [
        { path: "financialAccountId", type: "string", required: true },
        {
          path: "options.activateOnCreate",
          type: "boolean",
          required: true,
          description: "Whether to activate the card on creation.",
        },
        { path: "idempotencyKey", type: "string", required: false },
      ],
      returns: {
        typeName: "IssuedPaymentCard",
        fields: ["id", "bin", "last4", "status"],
      },
      throws: ["HighnoteUserError", "HighnoteAccessDeniedError"],
      example:
        'const card = await client.cards.issue({\n  financialAccountId: "fa_...",\n});',
    },
  ],
};

describe("renderResource", () => {
  it("emits a level-3 heading for the resource", () => {
    const md = renderResource(baseResource);
    expect(md).toContain("### client.cards");
  });

  it("emits a level-4 heading for each method using its signatureLabel", () => {
    const md = renderResource(baseResource);
    expect(md).toContain("#### `issue(input)`");
  });

  it("emits the method summary as a paragraph", () => {
    const md = renderResource(baseResource);
    expect(md).toContain("Issue a payment card for a financial account.");
  });

  it("renders required parameters with bold required marker", () => {
    const md = renderResource(baseResource);
    expect(md).toContain("- `financialAccountId` (string, **required**)");
  });

  it("renders optional parameters with plain optional marker", () => {
    const md = renderResource(baseResource);
    expect(md).toContain("- `idempotencyKey` (string, optional)");
  });

  it("appends parameter descriptions after an em dash", () => {
    const md = renderResource(baseResource);
    expect(md).toContain(
      "- `options.activateOnCreate` (boolean, **required**) — Whether to activate the card on creation."
    );
  });

  it("renders the return block with type and field list", () => {
    const md = renderResource(baseResource);
    expect(md).toContain(
      "**Returns** `IssuedPaymentCard` — fields: `id`, `bin`, `last4`, `status`."
    );
  });

  it("omits the field list when there are no fields", () => {
    const md = renderResource({
      ...baseResource,
      methods: [
        {
          ...baseResource.methods[0],
          returns: { typeName: "void", fields: [] },
        },
      ],
    });
    expect(md).toContain("**Returns** `void`");
    expect(md).not.toContain("fields:");
  });

  it("renders the throws line with all error class names", () => {
    const md = renderResource(baseResource);
    expect(md).toContain(
      "**Throws** `HighnoteUserError`, `HighnoteAccessDeniedError`."
    );
  });

  it("omits the throws line when no throws are declared", () => {
    const md = renderResource({
      ...baseResource,
      methods: [{ ...baseResource.methods[0], throws: [] }],
    });
    expect(md).not.toContain("**Throws**");
  });

  it("emits the example as a fenced ts code block", () => {
    const md = renderResource(baseResource);
    expect(md).toMatch(
      /\*\*Example\*\*\n\n```ts\nconst card = await client\.cards\.issue/
    );
  });

  it("renders multiple methods in declaration order", () => {
    const resource: ResourceDoc = {
      ...baseResource,
      methods: [
        { ...baseResource.methods[0], name: "issue", signatureLabel: "issue(input)" },
        {
          ...baseResource.methods[0],
          name: "activate",
          signatureLabel: "activate(input)",
          summary: "Activate a payment card.",
        },
      ],
    };
    const md = renderResource(resource);
    const issueIdx = md.indexOf("#### `issue(input)`");
    const activateIdx = md.indexOf("#### `activate(input)`");
    expect(issueIdx).toBeGreaterThan(0);
    expect(activateIdx).toBeGreaterThan(issueIdx);
  });

  it("indents continuation lines of multi-line parameter descriptions so they stay inside the bullet", () => {
    const md = renderResource({
      ...baseResource,
      methods: [
        {
          ...baseResource.methods[0],
          parameters: [
            {
              path: "input.foo",
              type: "string",
              required: true,
              description: "First line.\nSecond line.\n\n**Note:** more info.",
            },
          ],
        },
      ],
    });
    expect(md).toContain(
      "- `input.foo` (string, **required**) — First line.\n  Second line.\n\n  **Note:** more info."
    );
  });

  it("includes the optional resource description after the heading", () => {
    const md = renderResource({
      ...baseResource,
      description: "Card lifecycle operations.",
    });
    expect(md).toContain("### client.cards\n\nCard lifecycle operations.");
  });
});
