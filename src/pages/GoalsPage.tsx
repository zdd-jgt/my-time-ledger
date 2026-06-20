import { Trash2 } from "lucide-react";
import { useState } from "react";
import { EmptyState } from "../components/EmptyState";
import { GoalCard } from "../components/GoalCard";
import { PageHeader } from "../components/PageHeader";
import { SoftCard } from "../components/SoftCard";
import { validateGoalInput } from "../lib/validation";
import type { LedgerGoal, LedgerGoalInput, LedgerTone, StorageResult } from "../types";

type GoalsPageProps = {
  goals: LedgerGoal[];
  onCreateGoal: (input: LedgerGoalInput) => StorageResult;
  onUpdateGoalProgress: (goalId: string, current: number) => StorageResult;
  onDeleteGoal: (goalId: string) => StorageResult;
};

const tones: { label: string; value: LedgerTone }[] = [
  { label: "珊瑚", value: "coral" },
  { label: "薄荷", value: "mint" },
  { label: "向日葵", value: "sunflower" },
];

export function GoalsPage({ goals, onCreateGoal, onDeleteGoal, onUpdateGoalProgress }: GoalsPageProps) {
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const [current, setCurrent] = useState("0");
  const [total, setTotal] = useState("");
  const [tone, setTone] = useState<LedgerTone>("mint");
  const [error, setError] = useState<string | undefined>();

  const handleCreate = () => {
    const input: LedgerGoalInput = {
      title,
      note,
      current: Number(current),
      total: Number(total),
      tone,
    };
    const validation = validateGoalInput(input);

    if (!Number.isFinite(input.current) || !Number.isFinite(input.total)) {
      setError("金额必须是有效数字。");
      return;
    }

    if (!validation.ok) {
      setError(validation.message);
      return;
    }

    const result = onCreateGoal(input);

    if (!result.ok) {
      setError(result.message ?? "目标保存失败。");
      return;
    }

    setTitle("");
    setNote("");
    setCurrent("0");
    setTotal("");
    setTone("mint");
    setError(undefined);
  };

  const handleDelete = (goalId: string) => {
    if (!window.confirm("确定删除这个目标吗？")) {
      return;
    }

    const result = onDeleteGoal(goalId);

    if (!result.ok) {
      setError(result.message ?? "目标删除失败。");
    }
  };

  return (
    <div>
      <PageHeader eyebrow="事项与目标" title="给钱安排可爱的去处" subtitle="预算、存钱和生活计划都可以慢慢推进。" />

      <SoftCard className="mb-4 bg-mint-pale text-mint-deep shadow-mint">
        <p className="text-sm font-extrabold">本周小目标</p>
        <h2 className="mt-2 font-display text-2xl font-extrabold">少点 2 次外卖</h2>
        <p className="mt-2 text-sm leading-6">预计可以多攒 ¥96，刚好给旅行基金加一格进度。</p>
      </SoftCard>

      <SoftCard className="mb-4">
        <h2 className="font-display text-lg font-extrabold">新增目标</h2>
        <div className="mt-4 space-y-3">
          <input
            className="h-12 w-full rounded-full bg-cloud-low px-4 text-sm font-bold outline-none placeholder:text-muted/45 focus:ring-4 focus:ring-mint/40"
            placeholder="目标名称"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            aria-label="目标名称"
          />
          <input
            className="h-12 w-full rounded-full bg-cloud-low px-4 text-sm font-bold outline-none placeholder:text-muted/45 focus:ring-4 focus:ring-mint/40"
            placeholder="说明，可选"
            value={note}
            onChange={(event) => setNote(event.target.value)}
            aria-label="目标说明"
          />
          <div className="grid grid-cols-2 gap-2">
            <input
              className="h-12 min-w-0 rounded-full bg-cloud-low px-4 text-sm font-bold outline-none placeholder:text-muted/45 focus:ring-4 focus:ring-mint/40"
              placeholder="当前金额"
              inputMode="decimal"
              value={current}
              onChange={(event) => setCurrent(event.target.value)}
              aria-label="当前金额"
            />
            <input
              className="h-12 min-w-0 rounded-full bg-cloud-low px-4 text-sm font-bold outline-none placeholder:text-muted/45 focus:ring-4 focus:ring-mint/40"
              placeholder="目标金额"
              inputMode="decimal"
              value={total}
              onChange={(event) => setTotal(event.target.value)}
              aria-label="目标金额"
            />
          </div>
          <div className="grid grid-cols-3 gap-2">
            {tones.map((item) => (
              <button
                key={item.value}
                className={`rounded-full px-3 py-3 text-sm font-extrabold focus:outline-none focus:ring-4 focus:ring-coral/30 ${
                  tone === item.value ? "bg-coral text-white shadow-coral" : "bg-cloud-low text-muted"
                }`}
                type="button"
                onClick={() => setTone(item.value)}
              >
                {item.label}
              </button>
            ))}
          </div>
          {error ? (
            <p className="rounded-[1.5rem] bg-coral-pale px-4 py-3 text-sm font-extrabold text-coral-deep" aria-live="polite">
              {error}
            </p>
          ) : null}
          <button
            className="h-12 w-full rounded-full bg-coral font-display text-sm font-extrabold text-white shadow-coral focus:outline-none focus:ring-4 focus:ring-coral/30"
            type="button"
            onClick={handleCreate}
          >
            保存目标
          </button>
        </div>
      </SoftCard>

      <div className="space-y-4">
        {goals.length > 0 ? (
          goals.map((goal) => (
            <div key={goal.id} className="relative">
              <GoalCard goal={goal} onUpdateCurrent={(value) => onUpdateGoalProgress(goal.id, value)} />
              <button
                className="absolute bottom-4 right-4 grid h-9 w-9 place-items-center rounded-full bg-cloud-low text-muted focus:outline-none focus:ring-4 focus:ring-coral/30"
                type="button"
                onClick={() => handleDelete(goal.id)}
                aria-label={`删除${goal.title}`}
                title={`删除${goal.title}`}
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))
        ) : (
          <EmptyState title="还没有目标" description="先创建一个小目标，让每一笔储蓄都有方向。" />
        )}
      </div>
    </div>
  );
}
