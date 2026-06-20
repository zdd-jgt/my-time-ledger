import { CalendarDays, Camera, ChevronDown, Wallet } from "lucide-react";
import { useState } from "react";
import { PageHeader } from "../components/PageHeader";
import { SoftCard } from "../components/SoftCard";
import { dateInputToIso, toDateInputValue } from "../lib/format";
import { categories, inferEntryType, parseAmount, validateEntryInput } from "../lib/validation";
import type { LedgerEntryInput, StorageResult } from "../types";

type AddBillPageProps = {
  defaultAccount: string;
  onCreateEntry: (input: LedgerEntryInput) => StorageResult;
  onSaved?: () => void;
  storageMessage?: string;
  variant?: "page" | "modal";
};

export function AddBillPage({ defaultAccount, onCreateEntry, onSaved, storageMessage, variant = "page" }: AddBillPageProps) {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("餐饮");
  const [date, setDate] = useState(() => toDateInputValue(new Date()));
  const [note, setNote] = useState("");
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const handleSubmit = () => {
    setError(undefined);
    setSuccess(undefined);

    const amountResult = parseAmount(amount);

    if (!amountResult.ok) {
      setError(amountResult.message);
      return;
    }

    const input: LedgerEntryInput = {
      amount: amountResult.amount,
      category,
      type: inferEntryType(category),
      title: note.trim() || category,
      account: defaultAccount,
      occurredAt: dateInputToIso(date),
      note,
    };
    const validation = validateEntryInput(input);

    if (!validation.ok) {
      setError(validation.message);
      return;
    }

    const result = onCreateEntry(input);

    if (!result.ok) {
      setError(result.message ?? "保存失败，请稍后重试。");
      return;
    }

    setAmount("");
    setCategory("餐饮");
    setDate(toDateInputValue(new Date()));
    setNote("");
    setSuccess("保存成功，今日账单已更新。");
    onSaved?.();
  };

  return (
    <div>
      {variant === "page" ? (
        <PageHeader eyebrow="新增账单" title="记下一笔小日常" subtitle="轻轻点几下，让预算保持清清爽爽。" />
      ) : null}

      <SoftCard>
        <label className="block text-sm font-extrabold text-muted" htmlFor="amount">
          金额
        </label>
        <div className="mt-3 flex items-center rounded-full bg-cloud-low px-5 py-4 focus-within:ring-4 focus-within:ring-mint/40">
          <span className="font-display text-3xl font-extrabold text-coral-deep">¥</span>
          <input
            id="amount"
            className="ml-3 w-full bg-transparent font-display text-3xl font-extrabold outline-none placeholder:text-muted/35"
            placeholder="0.00"
            inputMode="decimal"
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
          />
        </div>

        <div className="mt-5 grid grid-cols-3 gap-2">
          {categories.map((item) => (
            <button
              key={item}
              className={`rounded-full px-3 py-3 text-sm font-extrabold focus:outline-none focus:ring-4 focus:ring-coral/30 ${
                item === category ? "bg-coral text-white shadow-coral" : "bg-cloud-low text-muted"
              }`}
              type="button"
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>

        <label className="mt-5 block text-sm font-extrabold text-muted" htmlFor="note">
          备注
        </label>
        <input
          id="note"
          className="mt-3 h-12 w-full rounded-full bg-cloud-low px-5 text-sm font-bold outline-none placeholder:text-muted/45 focus:ring-4 focus:ring-mint/40"
          placeholder="可选，例如午餐、工资、旅行基金"
          value={note}
          onChange={(event) => setNote(event.target.value)}
        />
      </SoftCard>

      <div className="mt-4 space-y-3">
        <BillOption icon={Wallet} label="支付账户" value={defaultAccount} />
        <label className="flex w-full items-center gap-3 rounded-full bg-white p-3 text-left shadow-soft">
          <div className="grid h-11 w-11 place-items-center rounded-full bg-mint-pale text-mint-deep">
            <CalendarDays className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-extrabold text-muted">日期</p>
            <input
              className="w-full bg-transparent font-display font-extrabold outline-none"
              type="date"
              value={date}
              onChange={(event) => setDate(event.target.value)}
              aria-label="账单日期"
            />
          </div>
        </label>
        <BillOption icon={Camera} label="票据照片" value="可选" />
      </div>

      {error ? (
        <p className="mt-4 rounded-[1.5rem] bg-coral-pale px-4 py-3 text-sm font-extrabold text-coral-deep" aria-live="polite">
          {error}
        </p>
      ) : null}

      {success ? (
        <p className="mt-4 rounded-[1.5rem] bg-mint-pale px-4 py-3 text-sm font-extrabold text-mint-deep" aria-live="polite">
          {success}
        </p>
      ) : null}

      {storageMessage ? (
        <p className="mt-3 text-center text-xs font-bold text-muted" aria-live="polite">
          {storageMessage}
        </p>
      ) : null}

      <button
        className="mt-6 h-14 w-full rounded-full border-b-4 border-coral-deep bg-coral font-display text-base font-extrabold text-white shadow-coral focus:outline-none focus:ring-4 focus:ring-coral/30 active:translate-y-0.5 active:border-b-2"
        type="button"
        onClick={handleSubmit}
      >
        保存账单
      </button>
    </div>
  );
}

type BillOptionProps = {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
};

function BillOption({ icon: Icon, label, value }: BillOptionProps) {
  return (
    <button className="flex w-full items-center gap-3 rounded-full bg-white p-3 text-left shadow-soft focus:outline-none focus:ring-4 focus:ring-mint/40" type="button">
      <div className="grid h-11 w-11 place-items-center rounded-full bg-mint-pale text-mint-deep">
        <Icon className="h-5 w-5" />
      </div>
      <div className="flex-1">
        <p className="text-sm font-extrabold text-muted">{label}</p>
        <p className="font-display font-extrabold">{value}</p>
      </div>
      <ChevronDown className="h-5 w-5 text-muted" />
    </button>
  );
}
