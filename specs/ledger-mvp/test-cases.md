# Test Cases: Ledger MVP

## Summary

- Test scope: local-first ledger entry creation, persistence, derived statistics, ledger list filtering, goal management, profile metrics, mobile layout, and accessibility basics.
- Required test layers: unit, component, integration, E2E, visual.
- Visual baseline: original HTML render after MVP implementation is accepted as the baseline because no external design image exists.
- Design source: existing React/Tailwind app screens and `dosc/PRD.md`.

## Cases

- ID: TC-001
  Priority: P0
  Layer: unit
  Requirement: REQ-001
  Task: Task 1
  Automation target: TypeScript typecheck and unit test
  Setup: import ledger type fixtures.
  Steps: create valid expense, income, and saving fixtures with numeric amounts.
  Expected: fixtures compile and helper functions accept all supported entry types.

- ID: TC-002
  Priority: P0
  Layer: unit
  Requirement: REQ-002
  Task: Task 2
  Automation target: storage helper unit test
  Setup: mock localStorage with no existing keys.
  Steps: read entries, goals, and preferences.
  Expected: helpers return valid defaults and no exception is thrown.

- ID: TC-003
  Priority: P0
  Layer: unit
  Requirement: REQ-002
  Task: Task 2
  Automation target: storage helper unit test
  Setup: mock localStorage with corrupted JSON under each versioned key.
  Steps: read entries, goals, and preferences.
  Expected: helpers recover to defaults and report a recoverable parse error.

- ID: TC-004
  Priority: P1
  Layer: unit
  Requirement: REQ-002
  Task: Task 2
  Automation target: storage helper unit test
  Setup: mock localStorage `setItem` to throw.
  Steps: attempt to save entries.
  Expected: write helper returns `ok: false` with a user-safe message.

- ID: TC-005
  Priority: P0
  Layer: unit
  Requirement: REQ-003
  Task: Task 5
  Automation target: validation unit test
  Setup: import entry validation helper.
  Steps: validate empty, non-numeric, zero, negative, and positive amount inputs.
  Expected: invalid values fail with messages; positive numeric input passes.

- ID: TC-006
  Priority: P0
  Layer: component
  Requirement: REQ-003
  Task: Task 5
  Automation target: component test
  Setup: render AddBillPage with a mocked save callback.
  Steps: click save with an empty amount.
  Expected: save callback is not called and a visible text error is shown.

- ID: TC-007
  Priority: P0
  Layer: component
  Requirement: REQ-003
  Task: Task 5
  Automation target: component test
  Setup: render AddBillPage with a mocked successful save callback.
  Steps: enter `38`, select `餐饮`, save.
  Expected: callback receives amount `38`, category `餐饮`, type `expense`, default account, and today's date; form clears after success.

- ID: TC-008
  Priority: P1
  Layer: component
  Requirement: REQ-003
  Task: Task 5
  Automation target: component test
  Setup: render AddBillPage.
  Steps: select `收入`, then `储蓄`, then `交通`.
  Expected: inferred types are `income`, `saving`, and `expense`; selected chip has clear active state.

- ID: TC-009
  Priority: P0
  Layer: unit
  Requirement: REQ-004
  Task: Task 3
  Automation target: ledger math unit test
  Setup: create current-month income, expense, saving, and previous-month entries.
  Steps: calculate monthly stats with monthly budget `5000`.
  Expected: only current-month income and expense affect monthly income, monthly expense, remaining budget, and monthly balance.

- ID: TC-010
  Priority: P0
  Layer: unit
  Requirement: REQ-004
  Task: Task 3
  Automation target: ledger math unit test
  Setup: create entries for today, yesterday, and tomorrow.
  Steps: calculate today's entries.
  Expected: only local-date today entries are returned, sorted newest first.

- ID: TC-011
  Priority: P0
  Layer: integration
  Requirement: REQ-004
  Task: Task 6
  Automation target: React integration test
  Setup: render App with empty storage.
  Steps: add an expense through the add tab, then open home.
  Expected: monthly expense increases, remaining budget decreases, and today's list includes the new entry.

- ID: TC-012
  Priority: P0
  Layer: integration
  Requirement: REQ-004
  Task: Task 6
  Automation target: React integration test
  Setup: render App with empty storage.
  Steps: add an income through the add tab, then open home.
  Expected: monthly income increases and monthly balance increases.

- ID: TC-013
  Priority: P1
  Layer: component
  Requirement: REQ-004
  Task: Task 6
  Automation target: component test
  Setup: render HomePage with no today entries.
  Steps: inspect today's bill section.
  Expected: empty state is visible and includes an action to go to the add tab.

- ID: TC-014
  Priority: P0
  Layer: component
  Requirement: REQ-005
  Task: Task 7
  Automation target: component test
  Setup: render ledger list with mixed income, expense, saving, and categories.
  Steps: filter by type `expense`.
  Expected: only expense entries are visible and empty state is hidden.

- ID: TC-015
  Priority: P1
  Layer: component
  Requirement: REQ-005
  Task: Task 7
  Automation target: component test
  Setup: render ledger list with no matching category.
  Steps: choose a category filter with no entries.
  Expected: filtered empty state appears.

- ID: TC-016
  Priority: P0
  Layer: E2E
  Requirement: REQ-005
  Task: Task 12
  Automation target: browser E2E test
  Setup: start Vite dev server with clean localStorage.
  Steps: add two entries, return home, click `查看全部`.
  Expected: full ledger list opens and both entries are visible in newest-first order.

- ID: TC-017
  Priority: P0
  Layer: unit
  Requirement: REQ-006
  Task: Task 3
  Automation target: ledger math unit test
  Setup: create goals with 0%, 50%, 100%, and over-100% progress.
  Steps: calculate goal progress and status.
  Expected: progress is capped at 100%; current amount greater than or equal to target is completed.

- ID: TC-018
  Priority: P0
  Layer: component
  Requirement: REQ-006
  Task: Task 8
  Automation target: component test
  Setup: render GoalsPage with mocked goal callbacks.
  Steps: submit goal form with target amount `0`, then with valid values.
  Expected: invalid target shows text error; valid goal calls create callback.

- ID: TC-019
  Priority: P1
  Layer: component
  Requirement: REQ-006
  Task: Task 8
  Automation target: component test
  Setup: render GoalsPage with one active goal.
  Steps: update current amount to equal the target amount.
  Expected: update callback fires and the rendered goal shows completed state.

- ID: TC-020
  Priority: P1
  Layer: component
  Requirement: REQ-006
  Task: Task 8
  Automation target: component test
  Setup: render GoalsPage with one goal and mock confirmation.
  Steps: click delete, decline confirmation, then click delete and accept confirmation.
  Expected: delete callback is not called when declined and called once when accepted.

- ID: TC-021
  Priority: P0
  Layer: integration
  Requirement: REQ-007
  Task: Task 9
  Automation target: React integration test
  Setup: render App with clean storage.
  Steps: add one expense and one income, then open profile.
  Expected: total recorded entries equals 2, monthly balance equals income minus expense, and total asset estimate uses all-time income minus all-time expense.

- ID: TC-022
  Priority: P1
  Layer: component
  Requirement: REQ-007
  Task: Task 9
  Automation target: component test
  Setup: render ProfilePage.
  Steps: inspect placeholder menu rows.
  Expected: menu copy does not claim sync or family sharing is already active.

- ID: TC-023
  Priority: P0
  Layer: E2E
  Requirement: REQ-002
  Task: Task 12
  Automation target: browser E2E test
  Setup: start Vite dev server with clean localStorage.
  Steps: add an expense, reload the page, open home.
  Expected: saved entry remains visible and home stats still include it.

- ID: TC-024
  Priority: P0
  Layer: visual
  Requirement: REQ-008
  Task: Task 13
  Automation target: BackstopJS or screenshot comparison script
  Setup: start Vite dev server and load the home route/state.
  Steps: capture screenshots at 320px, 375px, 430px, and desktop centered shell.
  Expected: no unexpected visual diff against accepted baseline; no text overlap or clipped primary controls.

- ID: TC-025
  Priority: P1
  Layer: visual
  Requirement: REQ-008
  Task: Task 13
  Automation target: BackstopJS or screenshot comparison script
  Setup: start Vite dev server and navigate through add bill, goals, profile, and ledger list views.
  Steps: capture screenshots at 320px, 375px, and 430px.
  Expected: no unexpected visual diff against accepted baseline; controls remain touch-friendly and readable.

- ID: TC-026
  Priority: P1
  Layer: accessibility
  Requirement: REQ-008
  Task: Task 10
  Automation target: component or browser accessibility check
  Setup: render core pages.
  Steps: inspect icon-only buttons, validation errors, and keyboard focus movement.
  Expected: icon-only buttons have labels, validation errors are text-visible, and focus indicators are visible.
