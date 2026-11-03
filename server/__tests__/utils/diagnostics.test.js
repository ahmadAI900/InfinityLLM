const { isValidUrl } = require("../../utils/diagnostics");

describe("isValidUrl", () => {
  test("accepts http/https", () => {
    expect(isValidUrl("https://example.com")).toBe(true);
    expect(isValidUrl("http://localhost:3001")).toBe(true);
  });
  test("rejects invalid", () => {
    expect(isValidUrl("not a url")).toBe(false);
    expect(isValidUrl("ftp://example.com")).toBe(false);
  });
});
