import { X } from "lucide-react";
import { AddBillPage } from "../pages/AddBillPage";
import type { LedgerEntryInput, StorageResult } from "../types";

type AddBillModalProps = {
  defaultAccount: string;
  isOpen: boolean;
  onClose: () => void;
  onCreateEntry: (input: LedgerEntryInput) => StorageResult;
  storageMessage?: string;
};

export function AddBillModal({ defaultAccount, isOpen, onClose, onCreateEntry, storageMessage }: AddBillModalProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-ink/35 px-3 py-3 backdrop-blur-sm sm:items-center sm:py-6" role="dialog" aria-modal="true" aria-label="新增账单">
      <div className="max-h-[92dvh] w-full max-w-[430px] overflow-hidden rounded-[2rem] bg-paper shadow-coral ring-1 ring-white/80">
        <div className="flex items-center justify-between border-b border-cloud px-5 py-4">
          <div>
            <p className="text-sm font-extrabold text-coral-deep">新增账单</p>
            <h2 className="font-display text-xl font-extrabold">记下一笔小日常</h2>
          </div>
          <button
            className="grid h-10 w-10 place-items-center rounded-full bg-cloud-low text-muted focus:outline-none focus:ring-4 focus:ring-coral/30"
            type="button"
            onClick={onClose}
            aria-label="关闭记账弹窗"
            title="关闭"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="max-h-[calc(92dvh-73px)] overflow-y-auto px-5 pb-5 pt-4">
          <AddBillPage
            defaultAccount={defaultAccount}
            onCreateEntry={onCreateEntry}
            onSaved={onClose}
            storageMessage={storageMessage}
            variant="modal"
          />
        </div>
      </div>
    </div>
  );
}
