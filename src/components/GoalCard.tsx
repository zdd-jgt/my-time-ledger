import { useState } from "react";
import { formatCurrency } from "../lib/format";
import { getGoalProgress } from "../lib/ledgerMath";
import type { Goal } from "../types";

type GoalCardProps = {
  goal: Goal;
  onUpdateCurrent?: (current: number) => void;
};

const barClass = {
  coral: "bg-coral",
  mint: "bg-mint",
  sunflower: "bg-sunflower",
};

const chipClass = {
  coral: "bg-coral-pale text-coral-deep",
  mint: "bg-mint-pale text-mint-deep",
  sunflower: "bg-sunflower-pale text-sunflower-deep",
};

export function GoalCard({ goal, onUpdateCurrent }: GoalCardProps) {
  const [currentValue, setCurrentValue] = useState(String(goal.current));
  const progress = getGoalProgress(goal);
  const isCompleted = goal.status === "completed";

  const handleUpdate = () => {
    const nextValue = Number(currentValue);

    if (!Number.isFinite(nextValue) || nextValue < 0) {
      setCurrentValue(String(goal.current));
      return;
    }

    onUpdateCurrent?.(nextValue);
  };

  return (
    <article className="rounded-cloud bg-white p-5 shadow-soft">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-display text-lg font-extrabold">{goal.title}</h3>
          <p className="mt-1 text-sm leading-5 text-muted">{goal.note}</p>
        </div>
        <span className={`shrink-0 rounded-full px-3 py-1 text-sm font-extrabold ${chipClass[goal.tone]}`}>
          {isCompleted ? "完成" : `${progress}%`}
        </span>
      </div>
      <div className="mt-5 h-4 rounded-full bg-cloud">
        <div className={`h-full rounded-full ${barClass[goal.tone]}`} style={{ width: `${progress}%` }} />
      </div>
      <div className="mt-3 flex justify-between text-sm font-bold text-muted">
        <span>{formatCurrency(goal.current)}</span>
        <span>{formatCurrency(goal.total)}</span>
      </div>
      {onUpdateCurrent ? (
        <div className="mt-4 flex gap-2 pr-12">
          <input
            className="h-10 min-w-0 flex-1 rounded-full bg-cloud-low px-4 text-sm font-bold outline-none focus:ring-4 focus:ring-mint/40"
            inputMode="decimal"
            value={currentValue}
            onChange={(event) => setCurrentValue(event.target.value)}
            aria-label={`${goal.title}当前金额`}
          />
          <button
            className="shrink-0 rounded-full bg-mint px-4 text-sm font-extrabold text-mint-deep focus:outline-none focus:ring-4 focus:ring-mint/40"
            type="button"
            onClick={handleUpdate}
          >
            更新
          </button>
        </div>
      ) : null}
    </article>
  );
}
