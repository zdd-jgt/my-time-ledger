import { describe, expect, it } from "vitest";
import { calculateLedgerStats, filterEntries, getGoalProgress, getGoalStatus, getTodayEntries } from "./ledgerMath";
import type { LedgerEntry, LedgerGoal } from "../types";

const entries: LedgerEntry[] = [
  {
    id: "1",
    type: "expense",
    title: "午餐",
    category: "餐饮",
    amount: 38,
    account: "日常钱包",
    occurredAt: "2026-06-17T09:00:00.000Z",
    createdAt: "2026-06-17T09:01:00.000Z",
  },
  {
    id: "2",
    type: "income",
    title: "工资",
    category: "收入",
    amount: 8600,
    account: "日常钱包",
    occurredAt: "2026-06-17T11:00:00.000Z",
    createdAt: "2026-06-17T11:01:00.000Z",
  },
  {
    id: "3",
    type: "expense",
    title: "上月账单",
    category: "生活",
    amount: 100,
    account: "日常钱包",
    occurredAt: "2026-05-17T11:00:00.000Z",
    createdAt: "2026-05-17T11:01:00.000Z",
  },
];

describe("ledgerMath", () => {
  it("calculates current month stats", () => {
    const stats = calculateLedgerStats(entries, 5000, new Date("2026-06-17T12:00:00.000Z"));

    expect(stats.monthlyExpense).toBe(38);
    expect(stats.monthlyIncome).toBe(8600);
    expect(stats.remainingBudget).toBe(4962);
    expect(stats.monthlyBalance).toBe(8562);
    expect(stats.totalAssetEstimate).toBe(8462);
    expect(stats.totalEntries).toBe(3);
  });

  it("returns today entries in newest order", () => {
    const todayEntries = getTodayEntries(entries, new Date("2026-06-17T12:00:00.000Z"));

    expect(todayEntries.map((entry) => entry.id)).toEqual(["2", "1"]);
  });

  it("filters by type and category", () => {
    const filtered = filterEntries(entries, "expense", "餐饮");

    expect(filtered).toHaveLength(1);
    expect(filtered[0].id).toBe("1");
  });

  it("caps goal progress and derives completed status", () => {
    const goal: Pick<LedgerGoal, "current" | "total"> = { current: 120, total: 100 };

    expect(getGoalProgress(goal)).toBe(100);
    expect(getGoalStatus(goal)).toBe("completed");
  });
});
