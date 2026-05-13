import { describe, it, expect } from "vitest";
import { renderUtilities } from "../../../scripts/doc-gen/render/renderUtilities.js";
import type { UtilityDoc } from "../../../scripts/doc-gen/render/types.js";

const paginate: UtilityDoc = {
  name: "paginate",
  signatureLabel: "paginate(fetchPage)",
  summary:
    "Returns an async iterable that lazily fetches pages and yields individual nodes.",
  parameters: [
    {
      path: "fetchPage",
      type: "PageFetcher<T>",
      required: true,
      description: "Function that fetches a page given an optional cursor.",
    },
  ],
  returns: { typeName: "AsyncIterable<T>", fields: [] },
  example: 'for await (const x of paginate(fetchPage)) {\n  console.log(x);\n}',
};

const verify: UtilityDoc = {
  name: "verifyWebhookSignature",
  signatureLabel: "verifyWebhookSignature(input)",
  summary: "Verifies a webhook signature.",
  parameters: [
    { path: "input.payload", type: "string", required: true },
    { path: "input.signature", type: "string", required: true },
    { path: "input.secret", type: "string", required: true },
    { path: "input.toleranceInMs", type: "number", required: false },
  ],
  returns: { typeName: "VerifyWebhookSignatureResult", fields: [] },
  example: 'const { valid, event } = verifyWebhookSignature({ ... });',
};

describe("renderUtilities", () => {
  it("emits a `## Utilities` heading", () => {
    const md = renderUtilities([paginate]);
    expect(md).toMatch(/^## Utilities/);
  });

  it("emits a level-3 heading per utility using its signatureLabel", () => {
    const md = renderUtilities([paginate, verify]);
    expect(md).toContain("### `paginate(fetchPage)`");
    expect(md).toContain("### `verifyWebhookSignature(input)`");
  });

  it("includes the summary", () => {
    const md = renderUtilities([paginate]);
    expect(md).toContain("Returns an async iterable that lazily fetches pages");
  });

  it("renders parameters with the same shape as resource methods", () => {
    const md = renderUtilities([paginate]);
    expect(md).toContain(
      "- `fetchPage` (PageFetcher<T>, **required**) — Function that fetches a page given an optional cursor."
    );
  });

  it("renders multiple parameters preserving order", () => {
    const md = renderUtilities([verify]);
    const payloadIdx = md.indexOf("`input.payload`");
    const toleranceIdx = md.indexOf("`input.toleranceInMs`");
    expect(payloadIdx).toBeGreaterThan(0);
    expect(toleranceIdx).toBeGreaterThan(payloadIdx);
  });

  it("renders the return type", () => {
    const md = renderUtilities([paginate]);
    expect(md).toContain("**Returns** `AsyncIterable<T>`.");
  });

  it("renders the example as a fenced ts code block", () => {
    const md = renderUtilities([paginate]);
    expect(md).toMatch(/\*\*Example\*\*\n\n```ts\nfor await/);
  });

  it("renders the section heading alone when given an empty array", () => {
    const md = renderUtilities([]);
    expect(md).toBe("## Utilities");
  });
});
