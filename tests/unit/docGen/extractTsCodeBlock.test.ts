import { describe, it, expect } from "vitest";
import { extractFirstTsCodeBlock } from "../../../scripts/doc-gen/buildDocSpec.js";

describe("extractFirstTsCodeBlock", () => {
  it("extracts the contents of the first ts code block", () => {
    const comment = "Issue a card.\n\n```ts\nconst card = await client.cards.issue({});\n```\n";
    expect(extractFirstTsCodeBlock(comment)).toBe(
      "const card = await client.cards.issue({});"
    );
  });

  it("returns undefined when there is no fenced code block", () => {
    expect(extractFirstTsCodeBlock("just prose, no code")).toBeUndefined();
  });

  it("accepts the `typescript` language tag", () => {
    const comment = "```typescript\nconst x = 1;\n```";
    expect(extractFirstTsCodeBlock(comment)).toBe("const x = 1;");
  });

  it("ignores non-ts/typescript code blocks", () => {
    const comment = "```bash\nls -la\n```\n```ts\nconst x = 1;\n```";
    expect(extractFirstTsCodeBlock(comment)).toBe("const x = 1;");
  });

  it("returns the first ts block when there are multiple", () => {
    const comment = "```ts\nconst first = 1;\n```\n```ts\nconst second = 2;\n```";
    expect(extractFirstTsCodeBlock(comment)).toBe("const first = 1;");
  });

  it("preserves multi-line content verbatim", () => {
    const comment = "```ts\nconst a = 1;\nconst b = 2;\nconst c = a + b;\n```";
    expect(extractFirstTsCodeBlock(comment)).toBe(
      "const a = 1;\nconst b = 2;\nconst c = a + b;"
    );
  });

  it("trims trailing newlines but preserves internal blank lines", () => {
    const comment = "```ts\nconst a = 1;\n\nconst b = 2;\n```";
    expect(extractFirstTsCodeBlock(comment)).toBe("const a = 1;\n\nconst b = 2;");
  });

  it("returns undefined when given an empty string", () => {
    expect(extractFirstTsCodeBlock("")).toBeUndefined();
  });

  it("returns undefined for an empty ts block (no code inside)", () => {
    expect(extractFirstTsCodeBlock("```ts\n```")).toBeUndefined();
  });
});
