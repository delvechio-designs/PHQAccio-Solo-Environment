import { describe, it, expect, vi } from "vitest";
import { handler } from "../src/handler";
import payload from "./fixtures/payload.json";

vi.mock("../src/accio", () => ({
  createCase: vi.fn().mockResolvedValue({ status: 200, data: { caseId: "CASE-1" } })
}));
vi.mock("../src/slack", () => ({ alert: vi.fn().mockResolvedValue(undefined) }));

function eventFrom(body: unknown) {
  return { body: JSON.stringify(body) } as any;
}

describe("handler", () => {
  it("returns 200 and caseId on success", async () => {
    process.env.ACCIO_BASE_URL = "https://mock.example";
    const res = await handler(eventFrom(payload), {} as any, {} as any) as any;
    expect(res.statusCode).toBe(200);
    expect(JSON.parse(res.body).caseId).toBe("CASE-1");
  });
});
