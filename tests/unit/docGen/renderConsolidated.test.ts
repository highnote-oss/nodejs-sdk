import { describe, it, expect } from "vitest";
import { renderConsolidated } from "../../../scripts/doc-gen/render/renderConsolidated.js";
import type { DocSpec } from "../../../scripts/doc-gen/render/types.js";

const minimalSpec: DocSpec = {
  config: {
    typeName: "HighnoteOptions",
    options: [
      {
        name: "apiKey",
        type: "string",
        required: true,
        description: "Highnote API key.",
      },
      {
        name: "environment",
        type: '"test" | "live"',
        required: false,
        defaultValue: '"test"',
        description: "API environment.",
      },
    ],
  },
  resources: [
    {
      name: "cards",
      className: "CardsResource",
      methods: [
        {
          name: "issue",
          signatureLabel: "issue(input)",
          summary: "Issue a payment card.",
          parameters: [
            { path: "financialAccountId", type: "string", required: true },
          ],
          returns: { typeName: "PaymentCard", fields: ["id"] },
          throws: ["HighnoteUserError"],
          example: 'await client.cards.issue({ financialAccountId: "fa_..." });',
        },
      ],
    },
  ],
  errors: [
    {
      name: "HighnoteUserError",
      description: "Validation error.",
      properties: [{ name: "fieldErrors", type: "FieldError[]" }],
    },
  ],
  utilities: [
    {
      name: "paginate",
      signatureLabel: "paginate(fetchPage)",
      summary: "Async iterable over Relay connections.",
      parameters: [{ path: "fetchPage", type: "PageFetcher<T>", required: true }],
      returns: { typeName: "AsyncIterable<T>", fields: [] },
      example: "for await (const x of paginate(fetchPage)) {}",
    },
  ],
  enums: [
    {
      name: "PhoneLabel",
      members: [{ name: "MOBILE" }, { name: "HOME" }],
    },
  ],
  types: [
    {
      name: "PaymentCard",
      fields: [{ name: "id", type: "string" }],
    },
  ],
};

describe("renderConsolidated", () => {
  it("starts with a level-1 heading naming the package", () => {
    const md = renderConsolidated(minimalSpec);
    expect(md).toMatch(/^# @highnote-oss\/nodejs-sdk/);
  });

  it("includes a generated-preamble blockquote", () => {
    const md = renderConsolidated(minimalSpec);
    expect(md).toContain("> Auto-generated from src/. Do not edit by hand.");
  });

  it("includes a Setup section with the options table", () => {
    const md = renderConsolidated(minimalSpec);
    expect(md).toContain("## Setup");
    expect(md).toContain("| Option | Type | Default | Description |");
    expect(md).toContain("| `apiKey` | `string` | *required* | Highnote API key. |");
    expect(md).toContain('| `environment` | `"test" \\| "live"` | `"test"` | API environment. |');
  });

  it("includes a Resources section followed by each resource block", () => {
    const md = renderConsolidated(minimalSpec);
    expect(md).toContain("## Resources");
    expect(md).toContain("### client.cards");
    expect(md).toContain("#### `issue(input)`");
  });

  it("includes an Errors section", () => {
    const md = renderConsolidated(minimalSpec);
    expect(md).toContain("## Errors");
    expect(md).toContain("### `HighnoteUserError`");
  });

  it("includes a Utilities section", () => {
    const md = renderConsolidated(minimalSpec);
    expect(md).toContain("## Utilities");
    expect(md).toContain("### `paginate(fetchPage)`");
  });

  it("includes an Enums section", () => {
    const md = renderConsolidated(minimalSpec);
    expect(md).toContain("## Enums");
    expect(md).toContain("### `PhoneLabel`");
  });

  it("includes a Types section", () => {
    const md = renderConsolidated(minimalSpec);
    expect(md).toContain("## Types");
    expect(md).toContain("### `PaymentCard`");
  });

  it("orders sections: Setup, Resources, Errors, Utilities, Enums, Types", () => {
    const md = renderConsolidated(minimalSpec);
    const order = ["## Setup", "## Resources", "## Errors", "## Utilities", "## Enums", "## Types"].map((s) => md.indexOf(s));
    expect(order).toEqual([...order].sort((a, b) => a - b));
    expect(order.every((i) => i >= 0)).toBe(true);
  });

  it("escapes the pipe character in option types so the table doesn't break", () => {
    const md = renderConsolidated(minimalSpec);
    expect(md).toContain('`"test" \\| "live"`');
    expect(md).not.toContain('`"test" | "live"`');
  });

  it("ends with exactly one trailing newline", () => {
    const md = renderConsolidated(minimalSpec);
    expect(md.endsWith("\n")).toBe(true);
    expect(md.endsWith("\n\n")).toBe(false);
  });
});
