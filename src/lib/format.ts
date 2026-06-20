import type { LedgerEntry } from "../types";

const currencyFormatter = new Intl.NumberFormat("zh-CN", {
  style: "currency",
  currency: "CNY",
  maximumFractionDigits: 0,
});

const dateFormatter = new Intl.DateTimeFormat("zh-CN", {
  month: "2-digit",
  day: "2-digit",
});

const timeFormatter = new Intl.DateTimeFormat("zh-CN", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});

export function formatCurrency(value: number) {
  return currencyFormatter.format(value);
}

export function formatSignedEntryAmount(entry: Pick<LedgerEntry, "type" | "amount">) {
  const prefix = entry.type === "income" ? "+" : "-";

  return `${prefix}${formatCurrency(entry.amount)}`;
}

export function formatEntryTime(value: string) {
  return timeFormatter.format(new Date(value));
}

export function formatEntryDate(value: string) {
  return dateFormatter.format(new Date(value));
}

export function toDateInputValue(value: Date) {
  const year = value.getFullYear();
  const month = String(value.getMonth() + 1).padStart(2, "0");
  const day = String(value.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function dateInputToIso(value: string) {
  if (!value) {
    return "";
  }

  return new Date(`${value}T12:00:00`).toISOString();
}
