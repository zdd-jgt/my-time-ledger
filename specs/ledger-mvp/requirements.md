# Requirements: Ledger MVP

## Overview

Ledger MVP turns the current static "暖萌小账本" React prototype into a usable local-first personal ledger. Users can add income, expense, and saving entries, see home statistics update immediately, manage simple goals, and retain data after page refresh.

## Goals

- Replace static ledger display data with state-driven local data.
- Let users add a valid ledger entry from the existing "记账" tab.
- Calculate monthly income, monthly expense, remaining budget, available amount, today's entries, total entries, and monthly balance from actual data.
- Persist ledger entries, goals, and preferences in browser storage.
- Keep the existing mobile-first visual style and bottom-tab navigation.
- Add focused automated coverage for calculation, storage, form, and critical user flows.

## Non-Goals

- No user authentication, cloud sync, backend API, or database service.
- No bank account import, real payment, subscription, billing, purchase, invoice, or financial transaction execution.
- No multi-user family sharing implementation.
- No browser notification implementation for the reminder button.
- No real file upload service for receipt photos.
- No investment, loan, credit card, or advanced asset management.

## Functional Requirements

### REQ-001: Ledger Entry Data Model

The app shall define reusable TypeScript types for ledger entries.

Acceptance criteria:

- AC-001.1: Each ledger entry has a unique string `id`.
- AC-001.2: Each ledger entry has `type`, `title`, `category`, `amount`, `account`, `occurredAt`, and `createdAt`.
- AC-001.3: `type` supports `expense`, `income`, and `saving`.
- AC-001.4: `amount` is stored as a positive number, not a formatted currency string.
- AC-001.5: Optional `note` and `receiptImageUrl` fields can be present without breaking display or persistence.

Affected layers: frontend.

### REQ-002: Local Persistence

The app shall persist ledger entries, goals, and basic preferences in browser local storage.

Acceptance criteria:

- AC-002.1: On first load with no saved data, the app initializes with a valid empty state or curated demo state.
- AC-002.2: After a valid ledger entry is saved, refreshing the browser keeps the entry.
- AC-002.3: After a valid goal is saved or updated, refreshing the browser keeps the goal.
- AC-002.4: Invalid or corrupted stored JSON does not crash the app; the app recovers to defaults.
- AC-002.5: Storage write failures surface a user-visible error state.

Affected layers: frontend.

### REQ-003: Add Ledger Entry

The "记账" tab shall let users create a valid ledger entry.

Acceptance criteria:

- AC-003.1: The amount field rejects empty, non-numeric, zero, and negative values.
- AC-003.2: The user can select a category and the selected state is visually clear.
- AC-003.3: The entry type is inferred from category by default: `收入` maps to `income`, `储蓄` maps to `saving`, all other categories map to `expense`.
- AC-003.4: The user can override or set a date, defaulting to today.
- AC-003.5: The user can save without a custom title or note; the app uses the category as the title.
- AC-003.6: A successful save clears the form and shows success feedback.
- AC-003.7: A failed save keeps user input and shows a clear validation or persistence error.

Affected layers: frontend.

### REQ-004: Home Statistics

The home tab shall calculate and display statistics from ledger entries and preferences.

Acceptance criteria:

- AC-004.1: Monthly expense equals the sum of current-month entries with type `expense`.
- AC-004.2: Monthly income equals the sum of current-month entries with type `income`.
- AC-004.3: Remaining budget equals `monthlyBudget - monthlyExpense`.
- AC-004.4: Available amount uses remaining budget as the MVP source of truth.
- AC-004.5: Today's entries show only entries whose `occurredAt` is today in the user's local timezone.
- AC-004.6: Today's entries are sorted by `occurredAt` descending, then `createdAt` descending.
- AC-004.7: When there are no entries for today, the home tab shows an empty state with an entry point to add a bill.

Affected layers: frontend.

### REQ-005: Ledger List Entry Point

The home "查看全部" action shall expose a complete ledger list view within the current app navigation approach.

Acceptance criteria:

- AC-005.1: Clicking "查看全部" opens a view that lists all saved entries.
- AC-005.2: The list is sorted by `occurredAt` descending, then `createdAt` descending.
- AC-005.3: Users can filter by entry type: all, expense, income, saving.
- AC-005.4: Users can filter by category.
- AC-005.5: The list has an empty state when no entries match filters.
- AC-005.6: The implementation does not require backend routing.

Affected layers: frontend.

### REQ-006: Goal Management

The goals tab shall support simple local goal management.

Acceptance criteria:

- AC-006.1: Users can view all saved goals and each goal's progress.
- AC-006.2: Users can create a goal with title, optional note, current amount, target amount, and tone.
- AC-006.3: Current amount must be greater than or equal to 0.
- AC-006.4: Target amount must be greater than 0.
- AC-006.5: Progress is capped at 100%.
- AC-006.6: Goals whose current amount is greater than or equal to target amount display as completed.
- AC-006.7: Users can update a goal's current amount.
- AC-006.8: Users can delete a goal after explicit confirmation.

Affected layers: frontend.

### REQ-007: Profile Metrics

The profile tab shall replace static metrics with derived values.

Acceptance criteria:

- AC-007.1: Total recorded entries equals the number of saved ledger entries.
- AC-007.2: Monthly balance equals current-month income minus current-month expense.
- AC-007.3: Total asset estimate uses all-time income minus all-time expense unless a future account model exists.
- AC-007.4: Placeholder menu rows avoid misleading states such as "已同步" when sync is not implemented.

Affected layers: frontend.

### REQ-008: Mobile UX and Accessibility

The MVP shall preserve the current mobile-first app feel and meet baseline accessibility expectations.

Acceptance criteria:

- AC-008.1: The app remains usable at 320px, 375px, and 430px viewport widths.
- AC-008.2: Buttons, inputs, filter chips, and bottom navigation targets remain touch-friendly.
- AC-008.3: Icon-only buttons have `aria-label` or `title`.
- AC-008.4: Form errors are visible as text and are not conveyed by color alone.
- AC-008.5: Keyboard focus is visible on interactive controls.
- AC-008.6: Text does not overflow or overlap in core pages.

Affected layers: frontend, test.

## Edge Cases

- Empty local storage.
- Corrupted local storage JSON.
- Local storage quota or write failure.
- Entries created near midnight.
- Multiple entries with the same occurred time.
- Very large amount values.
- Goal current amount greater than target amount.
- Filters returning no ledger entries.

## Assumptions

- MVP uses `localStorage`, not IndexedDB, because data volume is small and no binary receipt storage is required.
- The existing state-based tab navigation remains in place.
- The default monthly budget is `5000` until a settings screen is introduced.
- Receipt photo remains an optional placeholder field in MVP.
- Test tooling may be added as dev dependencies if implementation proceeds.
