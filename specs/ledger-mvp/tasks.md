# Tasks: Ledger MVP

## Implementation

- [x] Task 1 [general]: Refactor shared types in `src/types.ts` for ledger entries, goals, preferences, tones, stats, and form input payloads. Verification: TypeScript build accepts the new types and existing components compile against explicit props. Estimate: 0.5-1h. Depends on: none.

- [x] Task 2 [frontend]: Add local storage helpers in `src/lib/storage.ts` for versioned entries, goals, and preferences with parse recovery and write failure results. Verification: unit tests cover missing keys, valid JSON, corrupted JSON, and write failure path. Estimate: 1-2h. Depends on: Task 1.

- [x] Task 3 [frontend]: Add ledger calculation and formatting helpers in `src/lib/ledgerMath.ts` and `src/lib/format.ts` for monthly stats, today's entries, sorting, filters, goal progress, and currency display. Verification: unit tests cover monthly income, monthly expense, remaining budget, today filtering, sort order, and capped goal progress. Estimate: 1-2h. Depends on: Task 1.

- [x] Task 4 [frontend]: Update `src/App.tsx` to own entries, goals, preferences, persistence lifecycle, derived stats, active tab, and ledger-list subview state. Verification: app loads without static transaction dependencies and refresh preserves saved state. Estimate: 0.5d. Depends on: Task 2 and Task 3.

- [x] Task 5 [frontend]: Rework `src/pages/AddBillPage.tsx` into a controlled form with amount validation, category selection, date input, inferred entry type, default account, save callback, success feedback, and visible error messages. Verification: invalid amounts are rejected, valid entries are saved, and the form clears only after success. Estimate: 0.5d. Depends on: Task 4.

- [x] Task 6 [frontend]: Update home display in `src/pages/HomePage.tsx` and transaction list components to render real stats, today's entries, empty state, formatted amounts, and "查看全部" behavior. Verification: adding income or expense updates the home cards and today's list immediately. Estimate: 0.5d. Depends on: Task 4 and Task 5.

- [x] Task 7 [frontend]: Add a full ledger list view with type and category filters using the existing app navigation approach rather than backend routing. Verification: "查看全部" opens all entries, filters work, and empty filter results show a clear empty state. Estimate: 0.5d. Depends on: Task 4 and Task 6.

- [x] Task 8 [frontend]: Rework `src/pages/GoalsPage.tsx` to support saved goals, create goal, update current amount, completed state, and delete confirmation. Verification: goals validate numeric inputs, progress is capped at 100%, completed goals are visually clear, and refresh preserves changes. Estimate: 0.5-1d. Depends on: Task 2, Task 3, and Task 4.

- [x] Task 9 [frontend]: Update `src/pages/ProfilePage.tsx` to render total recorded entries, monthly balance, and total asset estimate from real data, and revise placeholder menu copy to avoid implying sync or sharing is implemented. Verification: metrics update after adding entries and no unimplemented state claims are shown. Estimate: 1-2h. Depends on: Task 4 and Task 6.

- [!] Task 10 [frontend]: Add reusable empty/error feedback components and ensure core controls have accessible labels, visible focus states, and non-color-only validation messaging. Verification: keyboard navigation and mobile layout checks pass at 320px, 375px, and 430px. Estimate: 1-2h. Depends on: Task 5, Task 6, Task 7, Task 8, and Task 9. Blocked: implementation is present and build passes, but local browser/dev-server visual verification could not be completed because the environment did not keep a Vite server reachable.

- [x] Task 11 [test]: Add or configure the test stack for unit and component testing, then cover storage, calculations, validation, add-entry form, home stats, and goal progress. Verification: `npm run test` or documented equivalent passes locally. Estimate: 0.5-1d. Depends on: Task 2, Task 3, Task 5, Task 6, and Task 8.

- [!] Task 12 [test]: Add E2E or browser-driven regression coverage for adding expense, adding income, refreshing persistence, opening ledger list, filtering entries, and updating a goal. Verification: documented command passes against the Vite dev server. Estimate: 0.5-1d. Depends on: Task 7, Task 8, and Task 11. Blocked: App-level regression tests cover the requested flows in jsdom and pass, but Vite dev-server/browser execution was not reachable in this environment.

- [!] Task 13 [test]: Add visual regression coverage or documented screenshot baselines for home, add bill, goals, profile, and ledger list at 320px, 375px, 430px, and desktop centered shell. Verification: baseline run passes with no unexpected layout overlap or text overflow. Estimate: 1-2h. Depends on: Task 10 and Task 12. Blocked: 2D visual verification was requested, but local Vite dev/preview servers did not remain reachable for browser screenshot capture.

## Notes

- Decisions:
  - Use `localStorage` for MVP persistence.
  - Keep existing tab-state navigation instead of introducing React Router.
  - Use default monthly budget `5000` until a settings feature exists.
  - Treat receipt photo as a non-uploaded optional placeholder field.
- Risks:
  - The project currently has no test framework configured, so test setup may add dependency and script work.
  - Local storage can fail or be cleared by the browser; user data is local-only.
  - A full ledger list inside existing navigation needs careful state naming to avoid confusing tab behavior.
