# Orca CLI Reference

Orca is an observable agent-lane harness. Callers dispatch work to Codex,
Claude, or Cursor and receive durable, machine-readable state. Orca provides a
substrate for orchestrators; it does not plan, decompose, route, or judge lane
work itself.

This reference is validated against the built `orca contract` output. When
documentation and the installed CLI disagree, trust `orca contract`.

## Install

```sh
npm install -g orcastrator
# pnpm add -g orcastrator
# yarn global add orcastrator
# bun add -g orcastrator
```

## Discover the Contract

```sh
orca contract
orca agents
orca dispatch --help
```

Every lane verb prints exactly one JSON envelope as its final stdout line.
`dispatch` first prints a small handle line so a caller can capture the lane ID
before native agent work begins. `--help` and `-h` are the documented
human-readable exceptions.

## Quick Start

```sh
# Internal worker lane (default surface)
orca dispatch --agent codex --cwd . \
  "Review the current diff and report actionable findings"

# Named, user-followable Codex task
orca dispatch --agent codex --surface task \
  --label "HAPPY-123 — Fix API" \
  --cwd /path/to/existing/worktree \
  "Implement HAPPY-123 and run its focused tests"
```

The final envelope includes Orca's lane ID and, after native binding, the
agent's session/thread ID.

## Dispatch Surfaces

### `lane` (default)

An internal worker intended to report its result back to the coordinating
agent or script. The lane remains durable so it can be inspected and resumed.

### `task` (Codex only)

A deliberately named, durable Codex thread intended for direct user follow-up.
It requires a non-empty `--label`, which Orca applies as the native thread
name.

`--surface task` does not create a Codex Desktop-managed project, worktree, or
handoff environment. Supply an existing checkout or worktree with `--cwd`.
Persistent lane threads may also appear in Codex Desktop: the requested
`user`/`subagent` source is a host-normalized hint, not a visibility filter.

## Commands

### `orca dispatch`

```text
orca dispatch --agent <agent> [--surface lane|task] [--model <model>]
  [--cwd <dir>] [--label <label>] [--timeout <ms>] <prompt>
```

Creates a lane and synchronously drives it until the turn is completed, failed,
killed, timed out, or blocked on a question.

| Option                 | Meaning                                                       |
| ---------------------- | ------------------------------------------------------------- |
| `--agent <agent>`      | Required adapter: `codex`, `claude`, or `cursor`              |
| `--surface lane\|task` | Ownership surface; defaults to `lane`                         |
| `--model <model>`      | Adapter-specific model override                               |
| `--cwd <dir>`          | Agent working directory; defaults to the current directory    |
| `--label <label>`      | Orca label; required native task title for `--surface task`   |
| `--timeout <ms>`       | One deadline shared by connect, session binding, and the turn |

Output order:

```json
{"v":1,"kind":"handle","laneId":"lane_a3f81c02","agent":"codex"}
{"v":1,"kind":"lane","ok":true,"status":"completed","lane":{"id":"lane_a3f81c02","agent":"codex","surface":"lane"},"delivery":"confirmed","nativeStatus":"completed","semanticOutcome":"unknown","result":{"text":"..."}}
```

Harness diagnostics can appear on stderr during a successful run. Only stdout
carries the contractual handle and envelope.

### `orca inspect`

```text
orca inspect <laneId> [--follow] [--since <seq>]
  [--wait-for blocked|done] [--timeout <ms>]
```

Reports current lane state and stored events.

```sh
orca inspect lane_a3f81c02
orca inspect lane_a3f81c02 --since 7
orca inspect lane_a3f81c02 --follow
orca inspect lane_a3f81c02 --wait-for blocked --timeout 600000
```

`--since N` emits events whose sequence is greater than `N`. Terminal states
also satisfy `--wait-for blocked`, so a wait does not hang when the agent
finishes without asking a question. Read the returned `status` to distinguish
`blocked` from a terminal result.

### `orca answer`

```text
orca answer <laneId> <text>
```

Submits an answer to a blocked lane. Answering a lane that is not blocked
returns `invalid_state` (exit 4).

```sh
orca answer lane_a3f81c02 "Use the staging database"
```

Only Codex currently supports tool-mediated question parking. The capability
is best-effort: a model can still place a question in result prose and complete
the lane instead of blocking.

### `orca resume`

```text
orca resume <laneId> [--timeout <ms>] <prompt>
```

Starts a new turn on the same native session. Orca verifies continuity or
returns `continuity_unverified` (exit 4).

```sh
orca resume lane_a3f81c02 "Now add tests for the edge cases"
```

Completed lanes and parked blocked lanes can be resumed. Failed, killed, and
lost lanes cannot. A blocked lane with a live question poller rejects resume to
prevent two processes from driving the same native session.

### `orca lanes`

```sh
orca lanes
```

Lists known lane records newest-first in a `kind:"list"` envelope.

### `orca kill`

```text
orca kill <laneId>
```

Terminates a queued, running, or blocked lane. Killing an already-killed lane
is idempotent. Killing a completed, failed, or lost lane returns
`invalid_state`.

### `orca agents`

```sh
orca agents
```

Returns adapter manifests with resume, kill, question, continuity, browser,
worktree, model, measured-overhead, and caveat declarations.

| Adapter | Continuity                       | Questions           | Important behavior                                                  |
| ------- | -------------------------------- | ------------------- | ------------------------------------------------------------------- |
| Codex   | `thread-id-match`                | Best-effort parking | App Server thread; supports named `task` surface                    |
| Claude  | `session-id-match`               | No parking          | One-shot `claude -p`; default permissions can deny writes           |
| Cursor  | `session-id-match`, `nonce-echo` | No parking          | Cold starts can take 30–100s; first native output emits a heartbeat |

Use the live manifest rather than hard-coding model lists or assumptions:

```sh
orca agents | jq '.agents[] | {agent, capabilities, caveats}'
```

### `orca contract`

```text
orca contract [--schema envelope|event|manifest]
```

Returns the versioned `orca/v1` contract: command synopses, exit codes, notes,
and JSON Schemas for envelopes, events, manifests, and dispatch handles.

```sh
orca contract
orca contract --schema envelope
orca contract --schema event
orca contract --schema manifest
```

## Blocked Question Flow

```sh
# Terminal states also satisfy this wait; inspect the returned status.
orca inspect lane_a3f81c02 --wait-for blocked --timeout 600000

orca answer lane_a3f81c02 "Postgres"
orca resume lane_a3f81c02 "Continue with that answer"
```

`blocked` is a successful state (`ok:true`, exit 0), not an agent failure.

## Envelope Semantics

The three outcome axes are independent:

- `delivery`: whether the native agent acknowledged the turn.
- `nativeStatus`: native protocol/process state.
- `semanticOutcome`: explicit validation result. Without a validator, it stays
  `unknown`; Orca never infers semantic correctness from prose.

Common fields:

```ts
type Envelope = {
  v: 1;
  kind: "lane" | "list" | "agents" | "contract" | "error";
  ok: boolean;
  status: "queued" | "running" | "blocked" | "completed" | "failed" | "killed" | "lost";
  code?:
    | "usage_error"
    | "invalid_state"
    | "lane_not_found"
    | "continuity_unverified"
    | "agent_unavailable"
    | "adapter_error"
    | "agent_failed"
    | "timeout";
  lane?: {
    id: string;
    agent: string;
    surface?: "lane" | "task";
    cwd: string;
    label?: string;
    agentSessionId?: string;
  };
  delivery: "not_sent" | "confirmed" | "unknown";
  nativeStatus: "running" | "completed" | "failed" | "interrupted" | "unknown";
  semanticOutcome: "unknown" | "validated_pass" | "validated_fail";
  blocked?: { questions: Array<{ id: string; question: string; options?: string[] }> };
  result?: { text: string; artifacts?: string[] };
  usage?: { inputTokens?: number; outputTokens?: number; costUsd?: number };
  timing?: { wallMs: number; apiMs?: number; startupMs?: number };
  continuity?: {
    verified: boolean;
    method: "thread-id-match" | "session-id-match" | "nonce-echo";
    detail?: string;
  };
  next?: string[];
  warnings?: string[];
  error?: { message: string; remediation?: string };
};
```

`usage` and `timing` cover the single dispatch or resume turn, not cumulative
lane history. A command never exits 0 with `ok:false`.

## Exit Codes

| Exit | Meaning                               | Error codes                                                |
| ---- | ------------------------------------- | ---------------------------------------------------------- |
| `0`  | Success, including `status:"blocked"` | —                                                          |
| `2`  | Malformed command line                | `usage_error`                                              |
| `3`  | Adapter or agent failure              | `agent_unavailable`, `adapter_error`, `agent_failed`       |
| `4`  | Invalid lane operation or continuity  | `invalid_state`, `lane_not_found`, `continuity_unverified` |
| `5`  | Deadline exceeded                     | `timeout`                                                  |

## Durable State

Lane state lives under `${ORCA_HOME:-~/.orca}/lanes/<laneId>/`:

```text
lane.json       durable lane record
events.ndjson   append-only evidence stream
answer.txt      transient blocked-question answer handoff
```

Set `ORCA_HOME` to isolate tests or automation from personal lane history.

## Legacy Compatibility

Graph-era `run`, `plan`, `status`, `list`, `cancel`, setup/config, and PR
commands can still appear in root help for compatibility. They are not the
canonical lane architecture.

The command names `answer` and `resume` exist in both surfaces. Orca selects
the lane implementation when the first argument starts with `lane_` (all lane
IDs do), or when lane help is requested. Other values route to the legacy
commands.

## Source

- Package and source: <https://github.com/ratley/orca>
- Public docs: <https://orcastrator.dev>
