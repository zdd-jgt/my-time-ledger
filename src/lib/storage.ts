import type { LedgerEntry, LedgerGoal, LedgerPreference, StorageReadResult, StorageResult } from "../types";

const STORAGE_KEYS = {
  entries: "my-time-ledger.entries.v1",
  goals: "my-time-ledger.goals.v1",
  preferences: "my-time-ledger.preferences.v1",
} as const;

export const defaultPreferences: LedgerPreference = {
  monthlyBudget: 5000,
  defaultAccount: "日常钱包",
  theme: "珊瑚奶油",
};

function canUseStorage() {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

function readJson<T>(key: string, fallback: T): StorageReadResult<T> {
  if (!canUseStorage()) {
    return { data: fallback };
  }

  try {
    const rawValue = window.localStorage.getItem(key);

    if (!rawValue) {
      return { data: fallback };
    }

    return { data: JSON.parse(rawValue) as T };
  } catch {
    return {
      data: fallback,
      error: "本地数据读取失败，已恢复默认数据。",
    };
  }
}

function writeJson<T>(key: string, value: T): StorageResult {
  if (!canUseStorage()) {
    return { ok: true };
  }

  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    return { ok: true };
  } catch {
    return {
      ok: false,
      message: "本地数据保存失败，请检查浏览器存储空间后重试。",
    };
  }
}

export function readEntries() {
  return readJson<LedgerEntry[]>(STORAGE_KEYS.entries, []);
}

export function writeEntries(entries: LedgerEntry[]) {
  return writeJson(STORAGE_KEYS.entries, entries);
}

export function readGoals() {
  return readJson<LedgerGoal[]>(STORAGE_KEYS.goals, []);
}

export function writeGoals(goals: LedgerGoal[]) {
  return writeJson(STORAGE_KEYS.goals, goals);
}

export function readPreferences() {
  return readJson<LedgerPreference>(STORAGE_KEYS.preferences, defaultPreferences);
}

export function writePreferences(preferences: LedgerPreference) {
  return writeJson(STORAGE_KEYS.preferences, preferences);
}
