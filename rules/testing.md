# Testing Rules

## Current State

- No test script is configured yet.
- `npm run build` is the current minimum verification command.

## Expected Coverage

- Unit tests for pure helpers:
  - currency formatting
  - date filtering
  - monthly statistics
  - goal progress
  - local storage recovery
  - form validation
- Component tests for:
  - add bill form validation
  - category selection state
  - home statistics rendering
  - empty states
  - goal progress rendering
- E2E or browser tests for:
  - add expense and see home update
  - add income and see home update
  - refresh persistence
  - open full ledger list
  - filter ledger entries
  - update goal progress
- Visual checks for:
  - 320px
  - 375px
  - 430px
  - desktop centered app shell

## Commands

- Until a test framework is added, run `npm run build` before reporting implementation complete.
- When a test framework is introduced, add a stable `npm run test` script.
- If E2E tests are introduced, document the dev server and test command in the relevant spec or README.

## Test Data

- Prefer small deterministic fixtures.
- Do not rely on wall-clock dates without controlling the current date in tests.
- Clear or mock local storage between tests.

## Reporting

- Report the exact commands run.
- If a command cannot be run, state why and what risk remains.
