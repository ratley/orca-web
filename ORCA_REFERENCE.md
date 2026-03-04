# orca

Coordinated agent run harness.

## Install

```bash
npm install -g orcastrator
```

## Run Management

Orca starts each run with a lightweight planning-necessity decision (`needsPlan?`). Multi-step work goes through full planning; simple focused work can execute directly as one task.

```bash
orca status                  # list all runs (default)
orca status --last           # most recent run details
orca status --run <run-id>   # specific run details

orca resume --last
orca resume --run <run-id>
orca resume --run <run-id> --codex-only --codex-effort high

orca cancel --last
orca cancel --run <run-id>

orca answer <run-id> "yes, use migration A"
```

## PR Workflow

Canonical public flow:

```bash
orca pr draft --run <run-id>
orca pr create --run <run-id>
orca pr publish --run <run-id>
orca pr status --run <run-id>
```

`orca pr publish` run selection behavior:
- TTY: if `--run`/`--last` omitted, interactive picker is shown.
- non-TTY: pass `--run` or `--last`.

## Config Discovery / Precedence

Load order (later overrides earlier):
1. global config: `~/.orca/config.ts` then `~/.orca/config.js` (`.ts` takes precedence when both exist)
2. project config: `./orca.config.ts` then `./orca.config.js` (`.ts` takes precedence when both exist)
3. `--config <path>`

## CLI Flags Reference

`orca` / `orca run`:
- `[task]`, `--task <text>`, `-p, --prompt <text>`
- `--spec <path>`, `--plan <path>`, `--config <path>`
- `--codex-only`
- `--codex-effort <low|medium|high|xhigh>`
- `--on-milestone <cmd>`
- `--on-task-complete <cmd>`
- `--on-task-fail <cmd>`
- `--on-invalid-plan <cmd>`
- `--on-findings <cmd>`
- `--on-complete <cmd>`
- `--on-error <cmd>`

`orca plan`:
- `--spec <path>`
- `--config <path>`
- `--on-milestone <cmd>`
- `--on-error <cmd>`

`orca status`: `--run <run-id>`, `--last`, `--config <path>`

`orca resume`: `--run <run-id>`, `--last`, `--config <path>`, `--codex-only`, `--codex-effort <low|medium|high|xhigh>`

`orca cancel`: `--run <run-id>`, `--last`, `--config <path>`

`orca answer`: `[run-id] [answer]`, `--run <id>`

`orca list`: `--config <path>`

`orca pr draft|create|publish|status`: `--run <run-id>`, `--last`, `--config <path>` (accepted for compatibility; currently unused by PR command run resolution)

`orca setup`:
- `--openai-key <key>`
- `--global`
- `--project`
- `--project-config-template`
- `--skip-project-config`

`orca skills`: `--config <path>`

`orca help`: `[command]`

## Hooks + Types

Hook names:
- `onMilestone`
- `onTaskComplete`
- `onTaskFail`
- `onInvalidPlan`
- `onFindings`
- `onComplete`
- `onError`

Hook contract:
- Function hooks (`hooks`) receive `(event, context)`.
- `context` is `{ cwd, pid, invokedAt }`.
- Command hooks (`hookCommands` and CLI `--on-*`) receive JSON via stdin.
- No `ORCA_*` hook payload env-var framing.
- `onError` fires for run errors and hook-dispatch/command-hook failures.

## OrcaConfig Reference (complete)

Top-level: `executor`, `openaiApiKey`, `runsDir`, `sessionLogs`, `skills`, `maxRetries`, `codex`, `hooks`, `hookCommands`, `pr`, `review`

`maxRetries` is an accepted OrcaConfig field; current planner-generated task retry limits are still fixed by task graph contracts.


`codex.*`: `enabled`, `model`, `effort`, `thinkingLevel.decision|planning|execution`, `command`, `timeoutMs`, `multiAgent`, `perCwdExtraUserRoots`

`pr.*`: `enabled`, `requireConfirmation`

`review.plan.*`: `enabled`, `onInvalid`

`review.execution.*`: `enabled`, `maxCycles`, `onFindings`, `validator.auto`, `validator.commands`, `prompt`

Thinking-level controls use `codex.thinkingLevel.decision|planning|execution` with canonical values `low|medium|high|xhigh`.

Codex app-server integration: at session startup Orca calls `skills/list` with `cwds: [cwd]`, `forceReload: true`, and optional `codex.perCwdExtraUserRoots` mappings.

Deprecated compatibility aliases:
- `review.enabled`
- `review.onInvalid`

Validator caveat:
- `ORCA_SKIP_VALIDATORS=1` forces `review.execution.validator.auto` off.
