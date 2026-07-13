# orca-web

UI docs site for the **orca** CLI.

## What this repo is

- Next.js app that renders the canonical `orca/v1` lane-contract reference.
- Main page implementation: `app/page.tsx`
- Concise and copyable Markdown reference: `ORCA_REFERENCE.md`
- Markdown route loader: `app/lib/pageMarkdown.ts`

## Run locally

```bash
bun install
bun run dev
```

Then open `http://localhost:3000`.

## Useful scripts

From `package.json`:

- `bun run dev` — start local dev server
- `bun run build` — production build
- `bun start` — run production server
- `bun run lint` — run Oxlint checks
- `bun run format` — format with Oxfmt
- `bun run format:check` — check formatting with Oxfmt
- `bun test` — verify the Markdown reference stays on the lane contract

## Project links

- orca repository: https://github.com/ratley/orca

## Terminology

Use **task/tasks** in user-facing docs and UI copy (not goal/goals).
