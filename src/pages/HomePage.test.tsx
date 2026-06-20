import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { HomePage } from "./HomePage";
import type { LedgerStats } from "../types";

const stats: LedgerStats = {
  monthlyExpense: 0,
  monthlyIncome: 0,
  remainingBudget: 5000,
  availableAmount: 5000,
  monthlyBalance: 0,
  totalAssetEstimate: 0,
  totalEntries: 0,
};

describe("HomePage", () => {
  it("shows empty state and add action when today has no entries", () => {
    const onAddEntry = vi.fn();
    render(<HomePage stats={stats} todayEntries={[]} onAddEntry={onAddEntry} onOpenLedgerList={vi.fn()} />);

    expect(screen.getByText("今天还没有账单")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "去记一笔" }));
    expect(onAddEntry).toHaveBeenCalled();
  });

  it("opens full ledger list", () => {
    const onOpenLedgerList = vi.fn();
    render(<HomePage stats={stats} todayEntries={[]} onAddEntry={vi.fn()} onOpenLedgerList={onOpenLedgerList} />);

    fireEvent.click(screen.getByRole("button", { name: "查看全部" }));
    expect(onOpenLedgerList).toHaveBeenCalled();
  });
});
