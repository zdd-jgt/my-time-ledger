import { Coffee, Gift, WalletCards } from "lucide-react";
import { formatEntryTime, formatSignedEntryAmount } from "../lib/format";
import type { LedgerEntry, LedgerTone } from "../types";

type TransactionListProps = {
  items: LedgerEntry[];
};

const toneClass = {
  coral: "bg-coral-pale text-coral-deep",
  mint: "bg-mint-pale text-mint-deep",
  sunflower: "bg-sunflower-pale text-sunflower-deep",
};

const icons = [Coffee, WalletCards, Gift];

function getEntryTone(item: LedgerEntry): LedgerTone {
  if (item.type === "income") {
    return "mint";
  }

  if (item.type === "saving") {
    return "sunflower";
  }

  return "coral";
}

export function TransactionList({ items }: TransactionListProps) {
  return (
    <div className="space-y-3">
      {items.map((item, index) => {
        const Icon = icons[index % icons.length];
        const tone = getEntryTone(item);

        return (
          <article key={item.id} className="flex items-center gap-3 rounded-[1.75rem] bg-cloud-low p-3">
            <div className={`grid h-12 w-12 shrink-0 place-items-center rounded-full ${toneClass[tone]}`}>
              <Icon className="h-5 w-5" strokeWidth={2.4} />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="truncate font-display text-base font-bold">{item.title}</h3>
              <p className="text-sm text-muted">
                {item.category} · {formatEntryTime(item.occurredAt)}
              </p>
            </div>
            <strong className="font-display text-base font-extrabold">{formatSignedEntryAmount(item)}</strong>
          </article>
        );
      })}
    </div>
  );
}
