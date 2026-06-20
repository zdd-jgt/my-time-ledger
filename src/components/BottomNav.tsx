import { navItems } from "../data/ledger";
import type { TabKey } from "../types";

type BottomNavProps = {
  activeTab: TabKey;
  onTabChange: (tab: TabKey) => void;
};

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  return (
    <nav className="z-10 shrink-0 border-t border-cloud bg-paper/95 px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-4 backdrop-blur">
      <div className="grid grid-cols-4 gap-2 rounded-full bg-cloud-low p-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.key;

          return (
            <button
              key={item.key}
              className={`flex h-14 flex-col items-center justify-center rounded-full text-xs font-bold transition ${
                isActive
                  ? "bg-coral text-white shadow-coral"
                  : "text-muted hover:bg-white hover:text-coral-deep"
              }`}
              type="button"
              onClick={() => onTabChange(item.key)}
              aria-label={item.label}
              title={item.label}
            >
              <Icon className="h-5 w-5" strokeWidth={2.4} />
              <span className="mt-1">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
