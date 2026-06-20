import type { LucideIcon } from "lucide-react";

export type TabKey = "home" | "goals" | "add" | "profile";

export type AppView = "home" | "ledger-list";

export type LedgerEntryType = "expense" | "income" | "saving";

export type LedgerTone = "coral" | "mint" | "sunflower";

export type GoalStatus = "active" | "completed";

export type NavItem = {
  key: TabKey;
  label: string;
  icon: LucideIcon;
};

export type LedgerEntry = {
  id: string;
  type: LedgerEntryType;
  title: string;
  category: string;
  amount: number;
  account: string;
  occurredAt: string;
  createdAt: string;
  note?: string;
  receiptImageUrl?: string;
};

export type LedgerGoal = {
  id: string;
  title: string;
  note: string;
  current: number;
  total: number;
  tone: LedgerTone;
  status: GoalStatus;
  createdAt: string;
  updatedAt: string;
};

export type LedgerPreference = {
  monthlyBudget: number;
  defaultAccount: string;
  theme: string;
};

export type LedgerStats = {
  monthlyExpense: number;
  monthlyIncome: number;
  remainingBudget: number;
  availableAmount: number;
  monthlyBalance: number;
  totalAssetEstimate: number;
  totalEntries: number;
};

export type LedgerEntryInput = {
  amount: number;
  category: string;
  type: LedgerEntryType;
  title?: string;
  account: string;
  occurredAt: string;
  note?: string;
  receiptImageUrl?: string;
};

export type LedgerGoalInput = {
  title: string;
  note?: string;
  current: number;
  total: number;
  tone: LedgerTone;
};

export type StorageResult = {
  ok: boolean;
  message?: string;
};

export type StorageReadResult<T> = {
  data: T;
  error?: string;
};

export type LedgerFilterType = LedgerEntryType | "all";

export type Transaction = {
  id: string;
  title: string;
  category: string;
  amount: string;
  time: string;
  tone: LedgerTone;
};

export type Goal = LedgerGoal;
