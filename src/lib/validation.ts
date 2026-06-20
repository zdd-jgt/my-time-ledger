import type { LedgerEntryInput, LedgerEntryType, LedgerGoalInput } from "../types";

export const categories = ["餐饮", "交通", "购物", "生活", "收入", "储蓄"] as const;

export function inferEntryType(category: string): LedgerEntryType {
  if (category === "收入") {
    return "income";
  }

  if (category === "储蓄") {
    return "saving";
  }

  return "expense";
}

export function parseAmount(value: string) {
  const amount = Number(value);

  if (!value.trim()) {
    return { ok: false as const, message: "请输入金额。" };
  }

  if (!Number.isFinite(amount)) {
    return { ok: false as const, message: "金额必须是有效数字。" };
  }

  if (amount <= 0) {
    return { ok: false as const, message: "金额必须大于 0。" };
  }

  return { ok: true as const, amount };
}

export function validateEntryInput(input: LedgerEntryInput) {
  if (input.amount <= 0) {
    return { ok: false as const, message: "金额必须大于 0。" };
  }

  if (!input.category.trim()) {
    return { ok: false as const, message: "请选择分类。" };
  }

  if (!input.account.trim()) {
    return { ok: false as const, message: "请选择支付账户。" };
  }

  if (!input.occurredAt) {
    return { ok: false as const, message: "请选择日期。" };
  }

  return { ok: true as const };
}

export function validateGoalInput(input: LedgerGoalInput) {
  if (!input.title.trim()) {
    return { ok: false as const, message: "请输入目标名称。" };
  }

  if (input.current < 0) {
    return { ok: false as const, message: "当前金额不能小于 0。" };
  }

  if (input.total <= 0) {
    return { ok: false as const, message: "目标金额必须大于 0。" };
  }

  return { ok: true as const };
}
