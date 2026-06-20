import { Banknote, ChartNoAxesColumnIncreasing, CirclePlus, UserRound } from "lucide-react";
import type { LedgerEntry, LedgerGoal, NavItem } from "../types";

export const navItems: NavItem[] = [
  { key: "home", label: "首页", icon: Banknote },
  { key: "goals", label: "目标", icon: ChartNoAxesColumnIncreasing },
  { key: "add", label: "记账", icon: CirclePlus },
  { key: "profile", label: "我的", icon: UserRound },
];

export const demoEntries: LedgerEntry[] = [
  {
    id: "demo-entry-1",
    type: "expense",
    title: "拿铁和可颂",
    category: "咖啡",
    amount: 38,
    account: "日常钱包",
    occurredAt: "2026-06-17T09:24:00.000Z",
    createdAt: "2026-06-17T09:24:00.000Z",
  },
  {
    id: "demo-entry-2",
    type: "income",
    title: "工资到账",
    category: "收入",
    amount: 8600,
    account: "日常钱包",
    occurredAt: "2026-06-17T11:03:00.000Z",
    createdAt: "2026-06-17T11:03:00.000Z",
  },
  {
    id: "demo-entry-3",
    type: "expense",
    title: "鲜花和水果",
    category: "生活",
    amount: 126,
    account: "日常钱包",
    occurredAt: "2026-06-17T18:42:00.000Z",
    createdAt: "2026-06-17T18:42:00.000Z",
  },
];

export const demoGoals: LedgerGoal[] = [
  {
    id: "demo-goal-1",
    title: "旅行小金库",
    note: "距离周末海边计划更近啦",
    current: 4280,
    total: 6000,
    tone: "mint",
    status: "active",
    createdAt: "2026-06-01T00:00:00.000Z",
    updatedAt: "2026-06-01T00:00:00.000Z",
  },
  {
    id: "demo-goal-2",
    title: "六月餐饮预算",
    note: "还可以安心吃 9 顿喜欢的饭",
    current: 1180,
    total: 1800,
    tone: "coral",
    status: "active",
    createdAt: "2026-06-01T00:00:00.000Z",
    updatedAt: "2026-06-01T00:00:00.000Z",
  },
  {
    id: "demo-goal-3",
    title: "学习基金",
    note: "下一门课程已经在招手",
    current: 760,
    total: 1200,
    tone: "sunflower",
    status: "active",
    createdAt: "2026-06-01T00:00:00.000Z",
    updatedAt: "2026-06-01T00:00:00.000Z",
  },
];

export const monthStats = [
  { label: "本月支出", value: "¥3,280", tone: "coral" },
  { label: "本月收入", value: "¥10,860", tone: "mint" },
  { label: "剩余预算", value: "¥1,720", tone: "sunflower" },
] as const;
