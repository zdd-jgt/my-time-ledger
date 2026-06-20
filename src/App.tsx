import { useEffect, useMemo, useState } from "react";
import { GoalsPage } from "./pages/GoalsPage";
import { HomePage } from "./pages/HomePage";
import { ProfilePage } from "./pages/ProfilePage";
import { AddBillModal } from "./components/AddBillModal";
import { AppShell } from "./components/AppShell";
import { LedgerList } from "./components/LedgerList";
import { calculateLedgerStats, getGoalStatus, getTodayEntries } from "./lib/ledgerMath";
import {
  readEntries,
  readGoals,
  readPreferences,
  writeEntries,
  writeGoals,
  writePreferences,
} from "./lib/storage";
import type { AppView, LedgerEntry, LedgerEntryInput, LedgerGoal, LedgerGoalInput, TabKey } from "./types";

function createId(prefix: string) {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return `${prefix}-${crypto.randomUUID()}`;
  }

  return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export function App() {
  const [activeTab, setActiveTab] = useState<TabKey>("home");
  const [activeView, setActiveView] = useState<AppView>("home");
  const [isAddBillOpen, setIsAddBillOpen] = useState(false);
  const entriesState = useState(() => readEntries());
  const goalsState = useState(() => readGoals());
  const preferencesState = useState(() => readPreferences());
  const [entries, setEntries] = useState(entriesState[0].data);
  const [goals, setGoals] = useState(goalsState[0].data);
  const [preferences] = useState(preferencesState[0].data);
  const [feedback, setFeedback] = useState<string | undefined>(
    entriesState[0].error ?? goalsState[0].error ?? preferencesState[0].error,
  );

  const stats = useMemo(() => calculateLedgerStats(entries, preferences.monthlyBudget), [entries, preferences.monthlyBudget]);
  const todayEntries = useMemo(() => getTodayEntries(entries), [entries]);

  const handleTabChange = (tab: TabKey) => {
    if (tab === "add") {
      setIsAddBillOpen(true);
      return;
    }

    setActiveTab(tab);
    setActiveView("home");
  };

  const handleCreateEntry = (input: LedgerEntryInput) => {
    const now = new Date().toISOString();
    const entry: LedgerEntry = {
      id: createId("entry"),
      title: input.title?.trim() || input.category,
      category: input.category,
      type: input.type,
      amount: input.amount,
      account: input.account,
      occurredAt: input.occurredAt,
      createdAt: now,
      note: input.note?.trim() || undefined,
      receiptImageUrl: input.receiptImageUrl,
    };
    const nextEntries = [entry, ...entries];
    const result = writeEntries(nextEntries);

    if (!result.ok) {
      setFeedback(result.message);
      return result;
    }

    setEntries(nextEntries);
    setFeedback("账单已保存。");
    return result;
  };

  const handleCreateGoal = (input: LedgerGoalInput) => {
    const now = new Date().toISOString();
    const goal: LedgerGoal = {
      id: createId("goal"),
      title: input.title.trim(),
      note: input.note?.trim() || "慢慢推进，也很了不起",
      current: input.current,
      total: input.total,
      tone: input.tone,
      status: getGoalStatus(input),
      createdAt: now,
      updatedAt: now,
    };
    const nextGoals = [goal, ...goals];
    const result = writeGoals(nextGoals);

    if (!result.ok) {
      setFeedback(result.message);
      return result;
    }

    setGoals(nextGoals);
    setFeedback("目标已保存。");
    return result;
  };

  const handleUpdateGoalProgress = (goalId: string, current: number) => {
    const nextGoals = goals.map((goal) =>
      goal.id === goalId
        ? {
            ...goal,
            current,
            status: getGoalStatus({ current, total: goal.total }),
            updatedAt: new Date().toISOString(),
          }
        : goal,
    );
    const result = writeGoals(nextGoals);

    if (!result.ok) {
      setFeedback(result.message);
      return result;
    }

    setGoals(nextGoals);
    setFeedback("目标进度已更新。");
    return result;
  };

  const handleDeleteGoal = (goalId: string) => {
    const nextGoals = goals.filter((goal) => goal.id !== goalId);
    const result = writeGoals(nextGoals);

    if (!result.ok) {
      setFeedback(result.message);
      return result;
    }

    setGoals(nextGoals);
    setFeedback("目标已删除。");
    return result;
  };

  useEffect(() => {
    const result = writePreferences(preferences);

    if (!result.ok) {
      setFeedback(result.message);
    }
  }, [preferences]);

  const page = useMemo(() => {
    if (activeTab === "home" && activeView === "ledger-list") {
      return <LedgerList entries={entries} onBack={() => setActiveView("home")} />;
    }

    switch (activeTab) {
      case "goals":
        return (
          <GoalsPage
            goals={goals}
            onCreateGoal={handleCreateGoal}
            onDeleteGoal={handleDeleteGoal}
            onUpdateGoalProgress={handleUpdateGoalProgress}
          />
        );
      case "profile":
        return <ProfilePage stats={stats} />;
      default:
        return (
          <HomePage
            stats={stats}
            todayEntries={todayEntries}
            onAddEntry={() => setIsAddBillOpen(true)}
            onOpenLedgerList={() => setActiveView("ledger-list")}
          />
        );
    }
  }, [activeTab, activeView, entries, goals, stats, todayEntries]);

  return (
    <>
      <AppShell activeTab={isAddBillOpen ? "add" : activeTab} onTabChange={handleTabChange}>
        {page}
      </AppShell>
      <AddBillModal
        defaultAccount={preferences.defaultAccount}
        isOpen={isAddBillOpen}
        onClose={() => setIsAddBillOpen(false)}
        onCreateEntry={handleCreateEntry}
        storageMessage={feedback}
      />
    </>
  );
}
