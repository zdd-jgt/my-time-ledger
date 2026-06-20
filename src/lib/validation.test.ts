import { describe, expect, it } from "vitest";
import { dateInputToIso } from "./format";
import { inferEntryType, parseAmount, validateGoalInput } from "./validation";

describe("validation", () => {
  it("rejects invalid amounts and accepts positive numbers", () => {
    expect(parseAmount("").ok).toBe(false);
    expect(parseAmount("abc").ok).toBe(false);
    expect(parseAmount("0").ok).toBe(false);
    expect(parseAmount("-1").ok).toBe(false);
    expect(parseAmount("38")).toEqual({ ok: true, amount: 38 });
  });

  it("infers entry type from category", () => {
    expect(inferEntryType("收入")).toBe("income");
    expect(inferEntryType("储蓄")).toBe("saving");
    expect(inferEntryType("餐饮")).toBe("expense");
  });

  it("validates goal input", () => {
    expect(validateGoalInput({ title: "", current: 0, total: 100, tone: "mint" }).ok).toBe(false);
    expect(validateGoalInput({ title: "旅行", current: -1, total: 100, tone: "mint" }).ok).toBe(false);
    expect(validateGoalInput({ title: "旅行", current: 0, total: 0, tone: "mint" }).ok).toBe(false);
    expect(validateGoalInput({ title: "旅行", current: 0, total: 100, tone: "mint" }).ok).toBe(true);
  });

  it("keeps empty date input safe for later validation", () => {
    expect(dateInputToIso("")).toBe("");
  });
});
