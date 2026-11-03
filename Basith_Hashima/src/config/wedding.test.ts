import { describe, it, expect } from "vitest";
import { timeLeft, whatsappLink, buildICS, wedding } from "./wedding";

describe("wedding rules", () => {
  it("targets 21 Nov 2026 11:00 IST (05:30 UTC)", () => {
    expect(new Date(wedding.dateISO).toISOString()).toBe("2026-11-21T05:30:00.000Z");
  });
  it("countdown is exactly 1 day before", () => {
    const t = timeLeft(Date.parse("2026-11-20T05:30:00Z"));
    expect(t).toMatchObject({ done: false, days: 1, hours: 0, minutes: 0 });
  });
  it("countdown done after event", () => {
    expect(timeLeft(Date.parse("2026-11-21T05:30:01Z")).done).toBe(true);
  });
  it("no WhatsApp link without a number", () => {
    expect(whatsappLink(true)).toBeNull();
  });
  it("calendar starts at 05:30 UTC", () => {
    expect(buildICS()).toContain("DTSTART:20261121T053000Z");
  });
});
