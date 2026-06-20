import type { LedgerEntry, LedgerFilterType, LedgerGoal, LedgerStats } from "../types";

function toDate(value: string) {
  return new Date(value);
}

function isSameMonth(date: Date, referenceDate: Date) {
  return date.getFullYear() === referenceDate.getFullYear() && date.getMonth() === referenceDate.getMonth();
}

function isSameDay(date: Date, referenceDate: Date) {
  return (
    date.getFullYear() === referenceDate.getFullYear() &&
    date.getMonth() === referenceDate.getMonth() &&
    date.getDate() === referenceDate.getDate()
  );
}

export function sortEntriesByNewest(entries: LedgerEntry[]) {
  return [...entries].sort((left, right) => {
    const occurredDiff = toDate(right.occurredAt).getTime() - toDate(left.occurredAt).getTime();

    if (occurredDiff !== 0) {
      return occurredDiff;
    }

    return toDate(right.createdAt).getTime() - toDate(left.createdAt).getTime();
  });
}

export function getTodayEntries(entries: LedgerEntry[], referenceDate = new Date()) {
  return sortEntriesByNewest(entries.filter((entry) => isSameDay(toDate(entry.occurredAt), referenceDate)));
}

export function calculateLedgerStats(entries: LedgerEntry[], monthlyBudget: number, referenceDate = new Date()): LedgerStats {
  const currentMonthEntries = entries.filter((entry) => isSameMonth(toDate(entry.occurredAt), referenceDate));
  const monthlyExpense = sumEntries(currentMonthEntries, "expense");
  const monthlyIncome = sumEntries(currentMonthEntries, "income");
  const allTimeExpense = sumEntries(entries, "expense");
  const allTimeIncome = sumEntries(entries, "income");
  const remainingBudget = monthlyBudget - monthlyExpense;

  return {
    monthlyExpense,
    monthlyIncome,
    remainingBudget,
    availableAmount: remainingBudget,
    monthlyBalance: monthlyIncome - monthlyExpense,
    totalAssetEstimate: allTimeIncome - allTimeExpense,
    totalEntries: entries.length,
  };
}

export function filterEntries(entries: LedgerEntry[], typeFilter: LedgerFilterType, categoryFilter: string) {
  return sortEntriesByNewest(
    entries.filter((entry) => {
      const matchesType = typeFilter === "all" || entry.type === typeFilter;
      const matchesCategory = categoryFilter === "all" || entry.category === categoryFilter;

      return matchesType && matchesCategory;
    }),
  );
}

export function getEntryCategories(entries: LedgerEntry[]) {
  return Array.from(new Set(entries.map((entry) => entry.category))).sort((left, right) => left.localeCompare(right, "zh-Hans-CN"));
}

export function getGoalProgress(goal: Pick<LedgerGoal, "current" | "total">) {
  if (goal.total <= 0) {
    return 0;
  }

  return Math.min(Math.round((goal.current / goal.total) * 100), 100);
}

export function getGoalStatus(goal: Pick<LedgerGoal, "current" | "total">): LedgerGoal["status"] {
  return goal.current >= goal.total ? "completed" : "active";
}

function sumEntries(entries: LedgerEntry[], type: LedgerEntry["type"]) {
  return entries.reduce((total, entry) => (entry.type === type ? total + entry.amount : total), 0);
}
