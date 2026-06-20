# AGENTS.md

## Project Overview

- Project name: `my-time-ledger`
- App type: mobile-first React single-page ledger app
- Framework: React 18 with Vite 5
- Language: TypeScript with `strict` enabled
- Styling: Tailwind CSS
- Package manager: npm

## Project Commands

- Install dependencies: `npm install`
- Start dev server: `npm run dev`
- Build: `npm run build`
- Preview production build: `npm run preview`
- Test: not configured yet
- Lint: not configured yet

## Source Layout

- App entry: `src/main.tsx`
- Root component and tab state: `src/App.tsx`
- Pages: `src/pages/`
- Reusable components: `src/components/`
- Static app data and nav items: `src/data/ledger.ts`
- Shared types: `src/types.ts`
- Global styles: `src/styles.css`
- Product docs: `dosc/`
- XJ specs: `specs/`
- XJ project rules: `rules/`

## XJ Workflow

- Use `xj-prd` to generate or update executable specs under `specs/{feature}/`.
- Use `xj-ai` to implement tasks from `specs/{feature}/tasks.md`.
- Keep requirements, design, tasks, and test cases aligned before implementation.
- Do not mark tasks complete unless the implementation and verification described in that task are done.

## Implementation Boundaries

- Prefer small, scoped changes that match the current React and Tailwind structure.
- Do not introduce backend services, databases, authentication, payments, billing, subscriptions, or cloud sync unless a spec explicitly requires them and the user confirms the risk.
- Do not install new dependencies unless they are required for the active spec or test setup.
- Do not edit generated build output in `dist/`.
- Do not edit `node_modules/`.

## Rule Files

- Frontend rules: `rules/frontend.md`
- Testing rules: `rules/testing.md`
- Git rules: `rules/git.md`
- Security rules: `rules/security.md`

## Confirmation Gates

Ask the user before:

- Security-sensitive work or scanning external targets.
- Payment, billing, subscription, purchase, invoice, or money-transfer behavior.
- Actions that may create financial cost.
- Destructive file or git operations.
- Adding backend, database, authentication, cloud storage, or third-party service integrations.

## Current Known Gaps

- No test framework is configured.
- No lint command is configured.
- Data is currently static and local-only.
- Existing specs for the ledger MVP are in `specs/ledger-mvp/`.
