import { Bell, Sparkles } from "lucide-react";
import { EmptyState } from "../components/EmptyState";
import { PageHeader } from "../components/PageHeader";
import { SoftCard } from "../components/SoftCard";
import { StatPill } from "../components/StatPill";
import { TransactionList } from "../components/TransactionList";
import { formatCurrency } from "../lib/format";
import type { LedgerEntry, LedgerStats } from "../types";

type HomePageProps = {
  stats: LedgerStats;
  todayEntries: LedgerEntry[];
  onAddEntry: () => void;
  onOpenLedgerList: () => void;
};

export function HomePage({ stats, todayEntries, onAddEntry, onOpenLedgerList }: HomePageProps) {
  const monthStats = [
    { label: "本月支出", value: formatCurrency(stats.monthlyExpense), tone: "coral" as const },
    { label: "本月收入", value: formatCurrency(stats.monthlyIncome), tone: "mint" as const },
    { label: "剩余预算", value: formatCurrency(stats.remainingBudget), tone: "sunflower" as const },
  ];

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div className="rounded-full bg-coral-pale px-4 py-2 text-sm font-extrabold text-coral-deep">
          暖萌小账本
        </div>
        <button
          className="grid h-11 w-11 place-items-center rounded-full bg-white text-coral-deep shadow-soft"
          type="button"
          aria-label="提醒"
          title="提醒"
        >
          <Bell className="h-5 w-5" />
        </button>
      </div>

      <PageHeader title="今天也在温柔理财" subtitle="把每一笔小花费整理好，月底就会轻松很多。" />

      <SoftCard className="bg-coral text-white shadow-coral">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-extrabold text-white/80">可安心使用</p>
            <p className="mt-3 font-display text-4xl font-extrabold">{formatCurrency(stats.availableAmount)}</p>
          </div>
          <div className="grid h-12 w-12 place-items-center rounded-full bg-white/25">
            <Sparkles className="h-6 w-6" />
          </div>
        </div>
        <p className="mt-5 rounded-full bg-white/20 px-4 py-3 text-sm font-bold">
          本月结余 {formatCurrency(stats.monthlyBalance)}，继续保持清爽节奏
        </p>
      </SoftCard>

      <div className="mt-4 grid grid-cols-3 gap-3">
        {monthStats.map((stat) => (
          <StatPill key={stat.label} label={stat.label} value={stat.value} tone={stat.tone} />
        ))}
      </div>

      <section className="mt-7">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-display text-xl font-extrabold">今日账单</h2>
          <button className="text-sm font-extrabold text-coral-deep focus:outline-none focus:ring-4 focus:ring-coral/30" type="button" onClick={onOpenLedgerList}>
            查看全部
          </button>
        </div>
        {todayEntries.length > 0 ? (
          <TransactionList items={todayEntries} />
        ) : (
          <EmptyState title="今天还没有账单" description="现在记下一笔，月底复盘会轻松很多。" actionLabel="去记一笔" onAction={onAddEntry} />
        )}
      </section>
    </div>
  );
}
