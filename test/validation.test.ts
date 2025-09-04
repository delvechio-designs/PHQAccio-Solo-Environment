import { describe, it, expect } from "vitest";
import { phqSchema, normalizeDob, normalizePhone } from "../src/validation";
import payload from "./fixtures/payload.json";

describe("validation", () => {
  it("parses valid payload", () => {
    const p = phqSchema.parse(payload);
    expect(p.email).toBe("applicant@example.com");
  });
  it("normalizes dob", () => {
    expect(normalizeDob("12/10/1988")).toBe("1988-12-10");
    expect(() => normalizeDob("99/99/9999")).toThrow();
  });
  it("normalizes phone", () => {
    const n = normalizePhone("(509) 555-1212");
    expect(n).toMatch(/^\+1/);
  });
});
