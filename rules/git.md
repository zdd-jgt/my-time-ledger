# Git Rules

## Worktree Safety

- The working tree may contain user changes.
- Do not revert files you did not intentionally modify.
- Do not run destructive git commands unless the user explicitly requests them.
- Keep generated build output and dependency folders out of review unless the user specifically asks to include them.

## Branches

- Use branch prefix `codex/` when creating branches unless the user requests another name.
- Keep branches focused on one feature or fix.

## Commits

- Do not create commits unless the user asks.
- Commit messages should describe the user-facing or technical outcome.
- Before committing, review `git status --short` and include only intended files.

## Reviews

- For review requests, prioritize bugs, regressions, missing tests, and risky behavior.
- Findings should include file and line references where possible.
