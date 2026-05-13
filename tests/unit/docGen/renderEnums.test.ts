import { describe, it, expect } from "vitest";
import { renderEnums } from "../../../scripts/doc-gen/render/renderEnums.js";
import type { EnumDoc } from "../../../scripts/doc-gen/render/types.js";

const phoneLabel: EnumDoc = {
  name: "PhoneLabel",
  members: [
    { name: "MOBILE", value: "MOBILE" },
    { name: "HOME", value: "HOME" },
    { name: "WORK", value: "WORK" },
    { name: "SUPPORT", value: "SUPPORT" },
  ],
};

describe("renderEnums", () => {
  it("emits a top-level `## Enums` heading", () => {
    const md = renderEnums([phoneLabel]);
    expect(md).toMatch(/^## Enums/);
  });

  it("emits a level-3 heading per enum with the type name", () => {
    const md = renderEnums([phoneLabel]);
    expect(md).toContain("### `PhoneLabel`");
  });

  it("lists every member as a bullet", () => {
    const md = renderEnums([phoneLabel]);
    expect(md).toContain("- `MOBILE`");
    expect(md).toContain("- `HOME`");
    expect(md).toContain("- `WORK`");
    expect(md).toContain("- `SUPPORT`");
  });

  it("does not append a value when member name matches value", () => {
    const md = renderEnums([phoneLabel]);
    expect(md).not.toContain('"MOBILE"');
  });

  it("appends the value when it differs from the member name", () => {
    const enumDoc: EnumDoc = {
      name: "Stylish",
      members: [{ name: "MOBILE", value: "mobile_phone" }],
    };
    const md = renderEnums([enumDoc]);
    expect(md).toContain('- `MOBILE` = `"mobile_phone"`');
  });

  it("renders enums in input order", () => {
    const a: EnumDoc = { name: "AAA", members: [{ name: "X" }] };
    const b: EnumDoc = { name: "BBB", members: [{ name: "Y" }] };
    const md = renderEnums([a, b]);
    expect(md.indexOf("### `AAA`")).toBeLessThan(md.indexOf("### `BBB`"));
  });

  it("renders the enum description as a paragraph below the heading", () => {
    const md = renderEnums([{ ...phoneLabel, description: "Phone number labels." }]);
    expect(md).toContain("### `PhoneLabel`\n\nPhone number labels.");
  });

  it("emits exactly the section heading when given an empty array", () => {
    const md = renderEnums([]);
    expect(md).toBe("## Enums");
  });
});
