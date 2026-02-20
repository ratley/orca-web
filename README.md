# orca-web

UI docs site for the **orca** CLI.

## What this repo is

- Next.js app that renders an orca command/config reference page.
- Main page implementation: `app/page.tsx`
- Copyable markdown source used by the UI: `app/lib/pageMarkdown.ts`

## Run locally

```bash
bun install
bun dev
```

Then open `http://localhost:3000`.

## Useful scripts

From `package.json`:

- `bun dev` — start local dev server
- `bun run build` — production build
- `bun start` — run production server
- `bun run lint` — run Biome checks
- `bun run format` — format with Biome

## Project links

- orca repository: https://github.com/ratley/orca

## Terminology

Use **task/tasks** in user-facing docs and UI copy (not goal/goals).
