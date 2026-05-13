import { describe, it, expect } from "vitest";
import { renderReadmeTable } from "../../../scripts/doc-gen/render/renderReadmeTable.js";
import type { ResourceDoc } from "../../../scripts/doc-gen/render/types.js";

const cards: ResourceDoc = {
  name: "cards",
  className: "CardsResource",
  methods: [
    { name: "issue", signatureLabel: "issue(input)", summary: "", parameters: [], returns: { typeName: "X", fields: [] }, throws: [], example: "" },
    { name: "activate", signatureLabel: "activate(input)", summary: "", parameters: [], returns: { typeName: "X", fields: [] }, throws: [], example: "" },
    { name: "get", signatureLabel: "get(id)", summary: "", parameters: [], returns: { typeName: "X", fields: [] }, throws: [], example: "" },
  ],
};

const cardProducts: ResourceDoc = {
  name: "cardProducts",
  className: "CardProductsResource",
  methods: [
    { name: "list", signatureLabel: "list(options)", summary: "", parameters: [], returns: { typeName: "X", fields: [] }, throws: [], example: "" },
    { name: "get", signatureLabel: "get(id)", summary: "", parameters: [], returns: { typeName: "X", fields: [] }, throws: [], example: "" },
  ],
};

describe("renderReadmeTable", () => {
  it("emits a header row with the three columns", () => {
    const md = renderReadmeTable([cards]);
    expect(md.split("\n")[0]).toBe("| Resource | Methods | Status |");
  });

  it("emits a separator row", () => {
    const md = renderReadmeTable([cards]);
    expect(md.split("\n")[1]).toBe("|----------|---------|--------|");
  });

  it("renders one row per resource", () => {
    const md = renderReadmeTable([cards, cardProducts]);
    const rows = md.split("\n").slice(2);
    expect(rows).toHaveLength(2);
  });

  it("renders the resource property name in backticks in the first column", () => {
    const md = renderReadmeTable([cards]);
    expect(md).toContain("| `cards` |");
  });

  it("lists every method name with parens and no args, comma-separated", () => {
    const md = renderReadmeTable([cards]);
    expect(md).toContain("`issue()`, `activate()`, `get()`");
  });

  it("preserves resource order", () => {
    const md = renderReadmeTable([cards, cardProducts]);
    expect(md.indexOf("`cards`")).toBeLessThan(md.indexOf("`cardProducts`"));
  });

  it("marks each row with Available status", () => {
    const md = renderReadmeTable([cards]);
    expect(md).toContain("| Available |");
  });

  it("returns just the header and separator when given an empty array", () => {
    const md = renderReadmeTable([]);
    expect(md).toBe("| Resource | Methods | Status |\n|----------|---------|--------|");
  });
});
