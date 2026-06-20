import { BottomNav } from "./BottomNav";
import type { TabKey } from "../types";

type AppShellProps = {
  activeTab: TabKey;
  children: React.ReactNode;
  onTabChange: (tab: TabKey) => void;
};

export function AppShell({ activeTab, children, onTabChange }: AppShellProps) {
  return (
    <main className="h-dvh bg-paper font-body text-ink sm:bg-cream sm:px-6 sm:py-6">
      <div className="mx-auto flex h-dvh w-full max-w-[430px] flex-col overflow-hidden bg-paper shadow-coral ring-1 ring-white/80 sm:h-[calc(100dvh-48px)] sm:rounded-[2.5rem]">
        <div className="min-h-0 flex-1 overflow-y-auto px-5 pb-6 pt-6">{children}</div>
        <BottomNav activeTab={activeTab} onTabChange={onTabChange} />
      </div>
    </main>
  );
}
