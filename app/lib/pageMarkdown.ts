export const PAGE_MARKDOWN = `# orca

Coordinated agent run harness. Breaks down a task into a graph of tasks, then executes it end-to-end via a persistent [Codex](https://developers.openai.com/codex/app-server/) session with full context across tasks.

## Install

\`\`\`shell
npm install -g orcastrator
\`\`\`

---

## Commands

### orca <task>

**Usage:** \`orca [task] [flags]\`

Start a new run from a plain-language task. Orca plans tasks, executes them in sequence, and persists run state. You can also provide a spec or plan file instead of a task string.

\`\`\`shell
# Run a task
orca "add auth to the app"

# Run with a spec or plan file
orca --spec ./specs/feature.md
orca --plan ./specs/feature.md
\`\`\`

**Flags:**

| Flag | Description |
|------|-------------|
| \`[task]\` | Plain-language task (positional) |
| \`--task, -p, --prompt <text>\` | Task as a named flag (alias for positional) |
| \`--spec <path>\` | Path to a spec/markdown breakdown file |
| \`--plan <path>\` | Path to a plan file (same as --spec) |
| \`--config <path>\` | Path to an orca config file |
| \`--codex-only\` | Force Codex executor for this run |
| \`--claude-only\` | Force Claude executor for this run |
| \`--codex-effort <low|medium|high>\` | Override Codex effort for this run |
| \`--claude-effort <low|medium|high|max>\` | Override Claude effort for this run |
| \`--on-milestone <cmd>\` | Shell command to run on each milestone |
| \`--on-task-complete <cmd>\` | Shell command to run when a task completes |
| \`--on-task-fail <cmd>\` | Shell command to run when a task fails |
| \`--on-complete <cmd>\` | Shell command to run when the full run completes |
| \`--on-error <cmd>\` | Shell command to run on error |
| \`-h, --help\` | Show help |
| \`-V, --version\` | Show version |

---

### orca plan

**Usage:** \`orca plan [flags]\`

Plan tasks without executing them. Useful for reviewing the task breakdown before committing to a run.

\`\`\`shell
orca plan --spec ./specs/feature.md
\`\`\`

**Flags:**

| Flag | Description |
|------|-------------|
| \`--spec <path>\` | Path to a spec/markdown breakdown file |
| \`--config <path>\` | Path to an orca config file |
| \`--on-milestone <cmd>\` | Shell command to run on each milestone |
| \`--on-error <cmd>\` | Shell command to run on error |

---

### orca status

**Usage:** \`orca status [flags]\`

Show the status of a run — tasks completed, in-progress, pending, or failed.

\`\`\`shell
orca status            # status of most recent run
orca status --last     # same as above
orca status --run <id> # status of a specific run
\`\`\`

**Flags:**

| Flag | Description |
|------|-------------|
| \`--run <run-id>\` | Show status for a specific run ID |
| \`--last\` | Show status for the most recent run |
| \`--config <path>\` | Path to an orca config file |

---

### orca list

**Usage:** \`orca list [flags]\`

List all runs stored in the runs directory.

\`\`\`shell
orca list
\`\`\`

**Flags:**

| Flag | Description |
|------|-------------|
| \`--config <path>\` | Path to an orca config file |

---

### orca resume

**Usage:** \`orca resume [flags]\`

Resume a paused or interrupted run from where it left off.

\`\`\`shell
orca resume --last
orca resume --run feature-auth-1766228123456-1a2b
\`\`\`

**Flags:**

| Flag | Description |
|------|-------------|
| \`--run <run-id>\` | Resume a specific run by ID |
| \`--last\` | Resume the most recent run |
| \`--config <path>\` | Path to an orca config file |
| \`--codex-only\` | Force Codex executor for this resume |
| \`--claude-only\` | Force Claude executor for this resume |
| \`--codex-effort <low|medium|high>\` | Override Codex effort for this resume |
| \`--claude-effort <low|medium|high|max>\` | Override Claude effort for this resume |

---

### orca cancel

**Usage:** \`orca cancel [flags]\`

Cancel a running or paused run.

\`\`\`shell
orca cancel --last
orca cancel --run feature-auth-1766228123456-1a2b
\`\`\`

**Flags:**

| Flag | Description |
|------|-------------|
| \`--run <run-id>\` | Cancel a specific run by ID |
| \`--last\` | Cancel the most recent run |
| \`--config <path>\` | Path to an orca config file |

---

### orca answer

**Usage:** \`orca answer <run-id> <answer>\`

Provide an answer to a run that is blocked waiting for input.

\`\`\`shell
orca answer feature-auth-1766228123456-1a2b "yes, use migration A"
\`\`\`

**Flags:**

| Flag | Description |
|------|-------------|
| \`[run-id]\` | Run ID (positional) |
| \`[answer]\` | Answer text (positional) |
| \`--run <id>\` | Run ID as a named flag (alias for positional) |

---

### orca pr

**Usage:** \`orca pr <subcommand> [flags]\`

Manage pull requests for a run. Subcommands: draft, create, publish, status.

\`\`\`shell
orca pr                          # default pr action
orca pr draft   --run <run-id>   # open a draft PR
orca pr create  --run <run-id>   # create a PR
orca pr publish --run <run-id>   # publish (un-draft) the PR
orca pr status  --run <run-id>   # check PR status
\`\`\`

**Flags:**

| Flag | Description |
|------|-------------|
| \`--run <run-id>\` | Target a specific run by ID |
| \`--last\` | Target the most recent run |
| \`--config <path>\` | Path to an orca config file |

---

### orca pr publish

**Usage:** \`orca pr publish [flags]\`

Finalize the PR workflow — typically run after all tasks complete.

\`\`\`shell
orca pr publish --config ./orca.config.js
\`\`\`

**Flags:**

| Flag | Description |
|------|-------------|
| \`--config <path>\` | Path to an orca config file |

---

### orca setup

**Usage:** \`orca setup [flags]\`

Configure API keys and environment. Supports scoped config (global or project-level).

\`\`\`shell
orca setup --openai-key sk-...
orca setup --anthropic-key sk-ant-...
orca setup --check     # verify current config (flag/env/openclaw/claude env files)
orca setup --global    # write to ~/.orca/config.js
orca setup --project   # write to ./orca.config.js
\`\`\`

**Flags:**

| Flag | Description |
|------|-------------|
| \`--openai-key <key>\` | Set OpenAI API key |
| \`--anthropic-key <key>\` | Set Anthropic API key |
| \`--check\` | Verify current configuration is valid |
| \`--global\` | Write config to ~/.orca/config.js |
| \`--project\` | Write config to ./orca.config.js |

---

### orca help

**Usage:** \`orca help [command]\`

Show help for any command.

\`\`\`shell
orca help
orca help plan
orca help pr
orca --help
\`\`\`

---

## Config

### Config Discovery

Orca auto-discovers config in this order — later entries override earlier ones:

1. \`~/.orca/config.js\` — global user config
2. \`./orca.config.js\` or \`./orca.config.ts\` — project config
3. \`--config <path>\` — explicit override

Run state is stored at \`<runsDir>/<run-id>/status.json\`. Defaults to \`~/.orca/runs\` unless overridden by \`ORCA_RUNS_DIR\`.

---

### Project Instruction Files

During planning, Orca automatically injects project instruction files when present:

1. \`AGENTS.md\`
2. \`CLAUDE.md\`

Orca resolves the project root from the nearest \`.git\` and injects files in deterministic order: AGENTS first, then CLAUDE.

---

### Config Options

Full example — all options are optional:

\`\`\`js
// orca.config.js
export default {
  // Directory where run state is persisted
  runsDir: "./.orca/runs",

  // Directory for session logs
  sessionLogs: "./session-logs",

  // Function hooks are primary and typed
  hooks: {
    onComplete: async (event, context) => {
      console.log(event.message, context.cwd);
    },
  },

  // Command hooks remain supported; payload arrives as stdin JSON
  hookCommands: {
    onTaskComplete: "node ./scripts/on-task-complete.mjs",
    onError: "node ./scripts/on-error.mjs",
  },

  // Codex-specific options
  codex: {
    model:      "gpt-5.3-codex", // override the codex model
    multiAgent: true,             // enable multi-agent mode (see below)
  },
};
\`\`\`

**Top-level fields:**

| Field | Description |
|-------|-------------|
| \`runsDir\` | Directory for run state. Default: ~/.orca/runs (or $ORCA_RUNS_DIR) |
| \`sessionLogs\` | Directory for session logs |
| \`hookCommands\` | Object of lifecycle hook shell commands (see Hooks) |
| \`codex.model\` | Override the Codex model used for execution |
| \`codex.multiAgent\` | Enable Codex multi-agent mode (see Multi-agent) |

---

### Hooks

Function hooks are primary (\`hooks\`) and command hooks (\`hookCommands\`) are also supported via config or CLI \`--on-...\` flags.

| Hook | Description |
|------|-------------|
| \`onMilestone\` | Fired at each milestone checkpoint |
| \`onTaskComplete\` | Fired when a single task completes successfully |
| \`onTaskFail\` | Fired when a task fails |
| \`onComplete\` | Fired when the entire run completes successfully |
| \`onError\` | Fired on run error |

Command hooks receive structured event payload JSON on stdin (no \`ORCA_*\` payload env vars).

\`\`\`js
// Via config (function hooks + command hooks)
export default {
  hooks: {
    onTaskComplete: async (event, context) => {
      console.log("task done: " + event.taskName, context.cwd);
    },
  },
  hookCommands: {
    onTaskComplete: "node ./scripts/on-task-complete.mjs",
  }
};

// ./scripts/on-task-complete.mjs
// let s = ""; process.stdin.on("data", d => s += d);
// process.stdin.on("end", () => {
//   const payload = JSON.parse(s);
//   console.log("done: " + payload.taskName);
// });
\`\`\`
---

### Multi-agent Mode

Codex supports experimental multi-agent workflows where it can spawn parallel sub-agents for complex tasks. Off by default because enabling it modifies your global \`~/.codex/config.toml\`.

> ⚠️ Enabling multi-agent mode writes \`multi_agent = true\` to your global Codex config. If you already have it enabled there, orca picks it up automatically.

\`\`\`js
// orca.config.js
export default {
  codex: { multiAgent: true }
};
\`\`\`

**Run ID format**

Run IDs are generated as \`<slug>-<unix-ms>-<hex4>\`:

\`\`\`
feature-auth-1766228123456-1a2b
\`\`\`
`;
