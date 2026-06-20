import { ArrowLeft } from "lucide-react";
import { useMemo, useState } from "react";
import { formatEntryDate } from "../lib/format";
import { filterEntries, getEntryCategories } from "../lib/ledgerMath";
import type { LedgerEntry, LedgerFilterType } from "../types";
import { EmptyState } from "./EmptyState";
import { TransactionList } from "./TransactionList";

type LedgerListProps = {
  entries: LedgerEntry[];
  onBack: () => void;
};

const typeFilters: { label: string; value: LedgerFilterType }[] = [
  { label: "全部", value: "all" },
  { label: "支出", value: "expense" },
  { label: "收入", value: "income" },
  { label: "储蓄", value: "saving" },
];

export function LedgerList({ entries, onBack }: LedgerListProps) {
  const [typeFilter, setTypeFilter] = useState<LedgerFilterType>("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const categories = useMemo(() => getEntryCategories(entries), [entries]);
  const filteredEntries = useMemo(
    () => filterEntries(entries, typeFilter, categoryFilter),
    [categoryFilter, entries, typeFilter],
  );

  return (
    <div>
      <div className="mb-5 flex items-center gap-3">
        <button
          className="grid h-11 w-11 place-items-center rounded-full bg-white text-coral-deep shadow-soft focus:outline-none focus:ring-4 focus:ring-coral/30"
          type="button"
          onClick={onBack}
          aria-label="返回首页"
          title="返回首页"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div>
          <p className="text-sm font-extrabold text-coral-deep">全部账单</p>
          <h1 className="font-display text-2xl font-extrabold">每一笔都有迹可循</h1>
        </div>
      </div>

      <section className="mb-4 space-y-3">
        <div className="flex gap-2 overflow-x-auto pb-1">
          {typeFilters.map((filter) => (
            <button
              key={filter.value}
              className={`shrink-0 rounded-full px-4 py-2 text-sm font-extrabold focus:outline-none focus:ring-4 focus:ring-coral/30 ${
                typeFilter === filter.value ? "bg-coral text-white shadow-coral" : "bg-cloud-low text-muted"
              }`}
              type="button"
              onClick={() => setTypeFilter(filter.value)}
            >
              {filter.label}
            </button>
          ))}
        </div>
        <select
          className="h-12 w-full rounded-full bg-white px-4 text-sm font-extrabold text-muted shadow-soft outline-none focus:ring-4 focus:ring-mint/40"
          value={categoryFilter}
          onChange={(event) => setCategoryFilter(event.target.value)}
          aria-label="按分类筛选"
        >
          <option value="all">全部分类</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </section>

      {filteredEntries.length > 0 ? (
        <div className="space-y-4">
          <TransactionList items={filteredEntries} />
          <p className="text-center text-xs font-bold text-muted">
            共 {filteredEntries.length} 笔 · 最近一笔 {formatEntryDate(filteredEntries[0].occurredAt)}
          </p>
        </div>
      ) : (
        <EmptyState title="没有匹配的账单" description="换个筛选条件看看，或者先去记下一笔新的日常。" />
      )}
    </div>
  );
}
