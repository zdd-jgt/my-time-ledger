# Frontend Rules

## Stack

- Use React 18 and TypeScript.
- Keep Vite as the build tool.
- Use Tailwind CSS for styling.
- Use `lucide-react` for icons when an icon already exists in the library.

## Architecture

- Keep shared app state near `src/App.tsx` until a feature clearly needs a dedicated state module.
- Prefer simple typed props over global state abstractions.
- Put reusable display components in `src/components/`.
- Put page-level workflows in `src/pages/`.
- Put shared pure helpers in `src/lib/` when introduced.
- Keep static curated data in `src/data/`.

## UI and UX

- Preserve the current mobile-first app shell and bottom navigation.
- Keep core screens usable at 320px, 375px, and 430px widths.
- Use clear touch targets for mobile controls.
- Avoid text overflow, overlapping controls, and layout shifts in fixed UI areas.
- Do not use visible instructional text to explain obvious UI behavior.
- Keep the current soft ledger visual language unless a spec requires a redesign.

## Accessibility

- Use semantic buttons, labels, inputs, and sections.
- Icon-only buttons must have `aria-label` or `title`.
- Form validation errors must be visible as text and not rely on color only.
- Do not remove focus indicators unless replacing them with visible focus styling.

## Data Handling

- MVP data should stay local unless a spec explicitly introduces a backend.
- Store numeric amounts as numbers, not formatted strings.
- Format currency at render boundaries.
- Keep date handling predictable in the user's local timezone.

## Browser Verification

- For UI changes, verify the app in a browser or with screenshots when practical.
- For visual changes, check home, add bill, goals, profile, and any new list/detail view.
