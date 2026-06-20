# Design: Ledger MVP

## Architecture Approach

Use a local-first frontend architecture inside the existing React app. The root `App` owns ledger state, goal state, preferences, and page navigation. Shared utilities handle persistence, calculations, formatting, and validation. Existing visual components remain, but page components receive real data and callbacks instead of reading static data directly.

No backend API, server route, or database migration is required for MVP.

## Current Project Context

- Framework: React 18.
- Build tool: Vite 5.
- Language: TypeScript.
- Styling: Tailwind CSS.
- Icons: lucide-react.
- Navigation: local `activeTab` state in `src/App.tsx`.
- Current data source: static arrays in `src/data/ledger.ts`.

## Affected Files and Modules

Expected new files:

- `src/lib/storage.ts`: localStorage read/write helpers with JSON validation and error handling.
- `src/lib/ledgerMath.ts`: derived statistics, filtering, sorting, date helpers, and progress helpers.
- `src/lib/format.ts`: currency and date display helpers.
- `src/lib/validation.ts`: form validation helpers for entries and goals.
- `src/components/EmptyState.tsx`: reusable empty state component.
- `src/components/LedgerList.tsx`: full ledger list and filtered display.
- `src/components/Toast.tsx` or inline feedback component if no global toast is introduced.

Expected changed files:

- `src/types.ts`: replace static `Transaction` shape with real ledger entry, goal, preference, and view types.
- `src/data/ledger.ts`: retain nav items and curated defaults; remove hard dependency on static transaction statistics.
- `src/App.tsx`: own app state, persistence lifecycle, and callbacks.
- `src/pages/HomePage.tsx`: consume derived stats, today's entries, empty state, and "查看全部" action.
- `src/pages/AddBillPage.tsx`: manage form state, validation, category selection, date input, and save callback.
- `src/pages/GoalsPage.tsx`: consume saved goals and provide create/update/delete interactions.
- `src/pages/ProfilePage.tsx`: consume derived profile metrics.
- Existing card/list components: update props to use real numeric entry data and formatted display output.

## Data Model

```ts
export type LedgerEntryType = "expense" | "income" | "saving";

export type LedgerTone = "coral" | "mint" | "sunflower";

export type LedgerEntry = {
  id: string;
  type: LedgerEntryType;
  title: string;
  category: string;
  amount: number;
  account: string;
  occurredAt: string;
  createdAt: string;
  note?: string;
  receiptImageUrl?: string;
};

export type LedgerGoal = {
  id: string;
  title: string;
  note: string;
  current: number;
  total: number;
  tone: LedgerTone;
  status: "active" | "completed";
  createdAt: string;
  updatedAt: string;
};

export type LedgerPreference = {
  monthlyBudget: number;
  defaultAccount: string;
  theme: string;
};

export type LedgerStats = {
  monthlyExpense: number;
  monthlyIncome: number;
  remainingBudget: number;
  availableAmount: number;
  monthlyBalance: number;
  totalAssetEstimate: number;
  totalEntries: number;
};
```

## Persistence Contract

Use versioned keys:

- `my-time-ledger.entries.v1`
- `my-time-ledger.goals.v1`
- `my-time-ledger.preferences.v1`

Storage behavior:

- Read helpers return defaults when a key is missing.
- Read helpers catch JSON parse failures and return defaults with a recoverable error flag.
- Write helpers return `{ ok: true }` or `{ ok: false, message: string }`.
- App state remains usable even if persistence fails.

## State Ownership

`App` should own:

- `activeTab`
- optional `activeView` for list subview, for example `home` vs `ledger-list`
- `entries`
- `goals`
- `preferences`
- transient feedback state
- storage error state

Callbacks passed down:

- `onCreateEntry(entryInput)`
- `onOpenLedgerList()`
- `onCreateGoal(goalInput)`
- `onUpdateGoalProgress(goalId, current)`
- `onDeleteGoal(goalId)`
- `onTabChange(tab)`

## UI Flow

### Add Entry

1. User opens the "记账" tab.
2. User enters amount.
3. User selects category.
4. User optionally changes date/account/note.
5. User clicks "保存账单".
6. Validation runs.
7. On success, app creates a `LedgerEntry`, persists it, clears the form, shows success feedback, and keeps user in the add tab.
8. Home and profile metrics are recalculated from state.

### Home Statistics

1. Home receives `stats` and `todayEntries`.
2. Stat cards format numeric values at render time.
3. Today's list renders newest entries first.
4. Empty state includes an action to switch to the add tab.
5. "查看全部" opens the ledger list view.

### Ledger List

1. User opens list from home.
2. The list defaults to all entries.
3. Type and category filters are local component state.
4. Filtered entries display newest first.
5. Empty state explains that no entries match filters.

### Goals

1. Goals page receives saved goals.
2. Goal progress is calculated from current and total.
3. Create and update forms validate numeric inputs.
4. Completion status is derived whenever current reaches or exceeds total.
5. Delete requires explicit confirmation.

## Error Handling

- Validation errors appear near the relevant form area.
- Persistence errors appear as a visible inline alert or toast.
- Corrupted storage is treated as recoverable and falls back to defaults.
- The app must not throw during render when optional data is missing.

## Accessibility

- Use semantic `button`, `label`, `input`, and `section` elements.
- Keep existing `aria-label` and `title` patterns for icon-only controls.
- Add text errors with `aria-live="polite"` where practical.
- Ensure focus rings are not removed without a visible replacement.

## Security and Privacy

- All data is stored locally in the browser.
- No sensitive data leaves the device in MVP.
- Receipt photo upload is not implemented; optional image references should not be sent anywhere.
- No payment, billing, purchase, subscription, invoice, or money-transfer action is introduced.

## Test Strategy

- Use unit tests for pure math, formatting, validation, and storage recovery helpers.
- Use component tests for form validation, category selection, empty states, and goal progress display.
- Use E2E or browser tests for the add-entry-to-home flow and persistence after refresh.
- Use screenshot visual regression for 320px, 375px, 430px, and desktop centered shell.

## Rollout Notes

- This is a local-only MVP; no deployment migration is required.
- Existing static demo data can remain as curated first-run demo content only if clearly marked as demo or converted into initial default state.
- If production use is expected later, add export/import before changing storage schemas.
