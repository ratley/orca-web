import { CodeBlock } from "./components/CodeBlock";
import { AgentSkillCard } from "./components/AgentSkillCard";

// ─── Nav items ───────────────────────────────────────────────────────────────

const NAV_COMMANDS = [
  { id: "cmd-run", label: "orca <goal>" },
  { id: "cmd-plan", label: "orca plan" },
  { id: "cmd-status", label: "orca status" },
  { id: "cmd-list", label: "orca list" },
  { id: "cmd-resume", label: "orca resume" },
  { id: "cmd-cancel", label: "orca cancel" },
  { id: "cmd-answer", label: "orca answer" },
  { id: "cmd-pr", label: "orca pr" },
  { id: "cmd-pr-finalize", label: "orca pr-finalize" },
  { id: "cmd-setup", label: "orca setup" },
  { id: "cmd-help", label: "orca help" },
];

const NAV_CONFIG = [
  { id: "config-discovery", label: "Discovery" },
  { id: "config-options", label: "Options" },
  { id: "config-hooks", label: "Hooks" },
  { id: "config-multiagent", label: "Multi-agent" },
];

// ─── Shared style tokens ─────────────────────────────────────────────────────

const S = {
  section: {
    padding: "40px 0",
    borderBottom: "1px solid #1f1f1f",
  } as React.CSSProperties,
  h2: {
    fontSize: "22px",
    fontWeight: 600,
    color: "#f1f5f9",
    margin: "0 0 6px",
    fontFamily: "ui-monospace, monospace",
    letterSpacing: "-0.02em",
  } as React.CSSProperties,
  h3: {
    fontSize: "17px",
    fontWeight: 600,
    color: "#e2e8f0",
    margin: "28px 0 6px",
    fontFamily: "ui-monospace, monospace",
  } as React.CSSProperties,
  p: {
    color: "#a1a1aa",
    lineHeight: "1.7",
    margin: "0 0 12px",
  } as React.CSSProperties,
  flagTable: {
    width: "100%",
    borderCollapse: "collapse" as const,
    fontSize: "13px",
    margin: "12px 0",
  },
  flagRow: {
    borderBottom: "1px solid #1f1f1f",
  } as React.CSSProperties,
  flagCell: {
    padding: "7px 12px 7px 0",
    verticalAlign: "top",
    color: "#a1a1aa",
  } as React.CSSProperties,
  flagName: {
    padding: "7px 16px 7px 0",
    verticalAlign: "top",
    color: "#22d3ee",
    fontFamily: "ui-monospace, monospace",
    whiteSpace: "nowrap" as const,
    fontSize: "12px",
  } as React.CSSProperties,
  badge: {
    display: "inline-block",
    padding: "1px 7px",
    borderRadius: "4px",
    fontSize: "11px",
    background: "#1e293b",
    color: "#94a3b8",
    marginRight: "6px",
    letterSpacing: "0.04em",
  } as React.CSSProperties,
  divider: {
    height: "1px",
    background: "#1f1f1f",
    margin: "28px 0",
    border: "none",
  } as React.CSSProperties,
  note: {
    background: "#1a1a2e",
    border: "1px solid #1e3a5f",
    borderRadius: "6px",
    padding: "12px 16px",
    color: "#7dd3fc",
    fontSize: "13px",
    lineHeight: "1.6",
    margin: "12px 0",
  } as React.CSSProperties,
};

// ─── Flag row helper ─────────────────────────────────────────────────────────

function Flag({
  flag,
  desc,
}: { flag: string; desc: string }) {
  return (
    <tr style={S.flagRow}>
      <td style={S.flagName}>{flag}</td>
      <td style={S.flagCell}>{desc}</td>
    </tr>
  );
}

// ─── Section header ───────────────────────────────────────────────────────────

function CmdSection({
  id,
  title,
  usage,
  desc,
  children,
}: {
  id: string;
  title: string;
  usage?: string;
  desc?: string;
  children?: React.ReactNode;
}) {
  return (
    <section id={id} style={S.section}>
      <h2 style={S.h2}>{title}</h2>
      {usage && (
        <div style={{ marginBottom: "10px" }}>
          <span style={S.badge}>usage</span>
          <code
            style={{
              fontFamily: "ui-monospace, monospace",
              fontSize: "13px",
              color: "#e2e8f0",
            }}
          >
            {usage}
          </code>
        </div>
      )}
      {desc && <p style={S.p}>{desc}</p>}
      {children}
    </section>
  );
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────

function Sidebar() {
  return (
    <nav
      style={{
        width: "200px",
        flexShrink: 0,
        position: "sticky",
        top: "64px",
        height: "calc(100vh - 64px)",
        overflowY: "auto",
        padding: "24px 0 24px 0",
        borderRight: "1px solid #1f1f1f",
      }}
    >
      <div style={{ marginBottom: "20px" }}>
        <div
          style={{
            fontSize: "10px",
            fontFamily: "ui-monospace, monospace",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "#52525b",
            marginBottom: "8px",
            paddingLeft: "16px",
          }}
        >
          Commands
        </div>
        {NAV_COMMANDS.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            style={{
              display: "block",
              padding: "4px 16px",
              fontSize: "13px",
              color: "#71717a",
              textDecoration: "none",
              fontFamily: "ui-monospace, monospace",
            }}
          >
            {item.label}
          </a>
        ))}
      </div>
      <div>
        <div
          style={{
            fontSize: "10px",
            fontFamily: "ui-monospace, monospace",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "#52525b",
            marginBottom: "8px",
            paddingLeft: "16px",
          }}
        >
          Config
        </div>
        {NAV_CONFIG.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            style={{
              display: "block",
              padding: "4px 16px",
              fontSize: "13px",
              color: "#71717a",
              textDecoration: "none",
              fontFamily: "ui-monospace, monospace",
            }}
          >
            {item.label}
          </a>
        ))}
      </div>

      {/* Agent Skill card — sidebar desktop */}
      <div style={{ padding: "0 12px" }}>
        <AgentSkillCard compact />
      </div>
    </nav>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <>
      {/* ── Header ── */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          background: "#0f0f0f",
          borderBottom: "1px solid #1f1f1f",
          height: "56px",
          display: "flex",
          alignItems: "center",
          padding: "0 24px",
          gap: "24px",
        }}
      >
        <a
          href="#hero"
          style={{
            fontFamily: "ui-monospace, monospace",
            fontSize: "16px",
            fontWeight: 700,
            color: "#f1f5f9",
            textDecoration: "none",
            letterSpacing: "-0.02em",
          }}
        >
          🐋 orca
        </a>
        <div
          style={{
            display: "flex",
            gap: "20px",
            fontSize: "13px",
            marginLeft: "8px",
          }}
        >
          <a
            href="#cmd-run"
            style={{ color: "#71717a", textDecoration: "none" }}
          >
            commands
          </a>
          <a
            href="#config-discovery"
            style={{ color: "#71717a", textDecoration: "none" }}
          >
            config
          </a>
        </div>
        <div style={{ marginLeft: "auto", fontSize: "13px" }}>
          <a
            href="https://github.com/ratley/orcastrator"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#52525b", textDecoration: "none" }}
          >
            github ↗
          </a>
        </div>
      </header>

      {/* ── Body: sidebar + main ── */}
      <div
        style={{
          display: "flex",
          maxWidth: "1000px",
          margin: "0 auto",
          minHeight: "calc(100vh - 56px)",
        }}
      >
        {/* Sidebar — hidden on small screens via inline media query workaround */}
        <div
          className="sidebar-wrapper"
          style={{ display: "flex" }}
        >
          <Sidebar />
        </div>

        {/* Main content */}
        <main
          style={{
            flex: 1,
            padding: "0 40px",
            minWidth: 0,
            maxWidth: "740px",
          }}
        >
          {/* ── Hero ── */}
          <section
            id="hero"
            style={{
              padding: "48px 0 32px",
              borderBottom: "1px solid #1f1f1f",
            }}
          >
            <h1
              style={{
                fontSize: "28px",
                fontWeight: 700,
                color: "#f1f5f9",
                margin: "0 0 12px",
                fontFamily: "ui-monospace, monospace",
                letterSpacing: "-0.03em",
              }}
            >
              orca
            </h1>
            <p
              style={{
                fontSize: "16px",
                color: "#a1a1aa",
                margin: "0 0 24px",
                lineHeight: "1.6",
                maxWidth: "520px",
              }}
            >
              Coordinated agent run harness. Breaks down a goal into a task
              graph, then executes it end-to-end via a persistent{" "}
              <a
                href="https://github.com/ratley/codex-client"
                style={{ color: "#22d3ee", textDecoration: "none" }}
              >
                Codex
              </a>{" "}
              session with full context across tasks.
            </p>

            <div style={{ marginBottom: "8px" }}>
              <span
                style={{
                  fontSize: "11px",
                  color: "#52525b",
                  fontFamily: "ui-monospace, monospace",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  display: "block",
                  marginBottom: "6px",
                }}
              >
                Install
              </span>
              <CodeBlock code="npm install -g orcastrator" lang="shell" />
            </div>
          </section>

          {/* ══════════════════════════════════════════════
              COMMANDS
          ══════════════════════════════════════════════ */}

          <div
            style={{
              paddingTop: "32px",
              paddingBottom: "8px",
              color: "#52525b",
              fontSize: "11px",
              fontFamily: "ui-monospace, monospace",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            Commands
          </div>

          {/* orca <goal> */}
          <CmdSection
            id="cmd-run"
            title="orca <goal>"
            usage="orca [goal] [flags]"
            desc="Start a new run from a plain-language goal. Orca plans tasks, executes them in sequence, and persists run state. You can also provide a spec or plan file instead of a goal string."
          >
            <CodeBlock
              code={`# Run a goal
orca "add auth to the app"

# Run with a spec or plan file
orca --spec ./specs/feature.md
orca --plan ./specs/feature.md`}
              lang="shell"
            />
            <h3 style={S.h3}>Flags</h3>
            <table style={S.flagTable}>
              <tbody>
                <Flag flag="[goal]" desc="Plain-language goal (positional)" />
                <Flag flag="--task, -p, --prompt <text>" desc="Goal as a named flag (alias for positional)" />
                <Flag flag="--spec <path>" desc="Path to a spec/markdown breakdown file" />
                <Flag flag="--plan <path>" desc="Path to a plan file (same as --spec)" />
                <Flag flag="--config <path>" desc="Path to an orca config file" />
                <Flag flag="--on-milestone <cmd>" desc="Shell command to run on each milestone" />
                <Flag flag="--on-task-complete <cmd>" desc="Shell command to run when a task completes" />
                <Flag flag="--on-task-fail <cmd>" desc="Shell command to run when a task fails" />
                <Flag flag="--on-complete <cmd>" desc="Shell command to run when the full run completes" />
                <Flag flag="--on-error <cmd>" desc="Shell command to run on error" />
                <Flag flag="-h, --help" desc="Show help" />
                <Flag flag="-V, --version" desc="Show version" />
              </tbody>
            </table>
          </CmdSection>

          {/* orca plan */}
          <CmdSection
            id="cmd-plan"
            title="orca plan"
            usage="orca plan [flags]"
            desc="Plan tasks without executing them. Useful for reviewing the task breakdown before committing to a run."
          >
            <CodeBlock
              code={`orca plan --spec ./specs/feature.md`}
              lang="shell"
            />
            <h3 style={S.h3}>Flags</h3>
            <table style={S.flagTable}>
              <tbody>
                <Flag flag="--spec <path>" desc="Path to a spec/markdown breakdown file" />
                <Flag flag="--config <path>" desc="Path to an orca config file" />
                <Flag flag="--on-milestone <cmd>" desc="Shell command to run on each milestone" />
                <Flag flag="--on-error <cmd>" desc="Shell command to run on error" />
              </tbody>
            </table>
          </CmdSection>

          {/* orca status */}
          <CmdSection
            id="cmd-status"
            title="orca status"
            usage="orca status [flags]"
            desc="Show the status of a run — tasks completed, in-progress, pending, or failed."
          >
            <CodeBlock
              code={`orca status            # status of most recent run
orca status --last     # same as above
orca status --run <id> # status of a specific run`}
              lang="shell"
            />
            <h3 style={S.h3}>Flags</h3>
            <table style={S.flagTable}>
              <tbody>
                <Flag flag="--run <run-id>" desc="Show status for a specific run ID" />
                <Flag flag="--last" desc="Show status for the most recent run" />
                <Flag flag="--config <path>" desc="Path to an orca config file" />
              </tbody>
            </table>
          </CmdSection>

          {/* orca list */}
          <CmdSection
            id="cmd-list"
            title="orca list"
            usage="orca list [flags]"
            desc="List all runs stored in the runs directory."
          >
            <CodeBlock
              code={`orca list`}
              lang="shell"
            />
            <h3 style={S.h3}>Flags</h3>
            <table style={S.flagTable}>
              <tbody>
                <Flag flag="--config <path>" desc="Path to an orca config file" />
              </tbody>
            </table>
          </CmdSection>

          {/* orca resume */}
          <CmdSection
            id="cmd-resume"
            title="orca resume"
            usage="orca resume [flags]"
            desc="Resume a paused or interrupted run from where it left off."
          >
            <CodeBlock
              code={`orca resume --last
orca resume --run feature-auth-1766228123456-1a2b`}
              lang="shell"
            />
            <h3 style={S.h3}>Flags</h3>
            <table style={S.flagTable}>
              <tbody>
                <Flag flag="--run <run-id>" desc="Resume a specific run by ID" />
                <Flag flag="--last" desc="Resume the most recent run" />
                <Flag flag="--config <path>" desc="Path to an orca config file" />
              </tbody>
            </table>
          </CmdSection>

          {/* orca cancel */}
          <CmdSection
            id="cmd-cancel"
            title="orca cancel"
            usage="orca cancel [flags]"
            desc="Cancel a running or paused run."
          >
            <CodeBlock
              code={`orca cancel --last
orca cancel --run feature-auth-1766228123456-1a2b`}
              lang="shell"
            />
            <h3 style={S.h3}>Flags</h3>
            <table style={S.flagTable}>
              <tbody>
                <Flag flag="--run <run-id>" desc="Cancel a specific run by ID" />
                <Flag flag="--last" desc="Cancel the most recent run" />
                <Flag flag="--config <path>" desc="Path to an orca config file" />
              </tbody>
            </table>
          </CmdSection>

          {/* orca answer */}
          <CmdSection
            id="cmd-answer"
            title="orca answer"
            usage="orca answer <run-id> <answer>"
            desc="Provide an answer to a run that is blocked waiting for input."
          >
            <CodeBlock
              code={`orca answer feature-auth-1766228123456-1a2b "yes, use migration A"`}
              lang="shell"
            />
            <h3 style={S.h3}>Flags</h3>
            <table style={S.flagTable}>
              <tbody>
                <Flag flag="[run-id]" desc="Run ID (positional)" />
                <Flag flag="[answer]" desc="Answer text (positional)" />
                <Flag flag="--run <id>" desc="Run ID as a named flag (alias for positional)" />
              </tbody>
            </table>
          </CmdSection>

          {/* orca pr */}
          <CmdSection
            id="cmd-pr"
            title="orca pr"
            usage="orca pr <subcommand> [flags]"
            desc="Manage pull requests for a run. Subcommands: draft, create, publish, status."
          >
            <CodeBlock
              code={`orca pr                          # default pr action
orca pr draft   --run <run-id>   # open a draft PR
orca pr create  --run <run-id>   # create a PR
orca pr publish --run <run-id>   # publish (un-draft) the PR
orca pr status  --run <run-id>   # check PR status`}
              lang="shell"
            />
            <h3 style={S.h3}>Flags</h3>
            <table style={S.flagTable}>
              <tbody>
                <Flag flag="--run <run-id>" desc="Target a specific run by ID" />
                <Flag flag="--last" desc="Target the most recent run" />
                <Flag flag="--config <path>" desc="Path to an orca config file" />
              </tbody>
            </table>
          </CmdSection>

          {/* orca pr-finalize */}
          <CmdSection
            id="cmd-pr-finalize"
            title="orca pr-finalize"
            usage="orca pr-finalize [flags]"
            desc="Finalize the PR workflow — typically run after all tasks complete."
          >
            <CodeBlock
              code={`orca pr-finalize --config ./orca.config.js`}
              lang="shell"
            />
            <h3 style={S.h3}>Flags</h3>
            <table style={S.flagTable}>
              <tbody>
                <Flag flag="--config <path>" desc="Path to an orca config file" />
              </tbody>
            </table>
          </CmdSection>

          {/* orca setup */}
          <CmdSection
            id="cmd-setup"
            title="orca setup"
            usage="orca setup [flags]"
            desc="Configure API keys and environment. Supports scoped config (global or project-level)."
          >
            <CodeBlock
              code={`orca setup --openai-key sk-...
orca setup --anthropic-key sk-ant-...
orca setup --check     # verify current config
orca setup --global    # write to ~/.orca/config.js
orca setup --project   # write to ./orca.config.js`}
              lang="shell"
            />
            <h3 style={S.h3}>Flags</h3>
            <table style={S.flagTable}>
              <tbody>
                <Flag flag="--openai-key <key>" desc="Set OpenAI API key" />
                <Flag flag="--anthropic-key <key>" desc="Set Anthropic API key" />
                <Flag flag="--check" desc="Verify current configuration is valid" />
                <Flag flag="--global" desc="Write config to ~/.orca/config.js" />
                <Flag flag="--project" desc="Write config to ./orca.config.js" />
              </tbody>
            </table>
          </CmdSection>

          {/* orca help */}
          <CmdSection
            id="cmd-help"
            title="orca help"
            usage="orca help [command]"
            desc="Show help for any command."
          >
            <CodeBlock
              code={`orca help
orca help plan
orca help pr
orca --help`}
              lang="shell"
            />
          </CmdSection>

          {/* ══════════════════════════════════════════════
              CONFIG
          ══════════════════════════════════════════════ */}

          <div
            style={{
              paddingTop: "40px",
              paddingBottom: "8px",
              color: "#52525b",
              fontSize: "11px",
              fontFamily: "ui-monospace, monospace",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              borderTop: "1px solid #1f1f1f",
            }}
          >
            Config
          </div>

          {/* Config discovery */}
          <section id="config-discovery" style={S.section}>
            <h2 style={S.h2}>Config Discovery</h2>
            <p style={S.p}>
              Orca auto-discovers config in this order — later entries override
              earlier ones:
            </p>
            <ol
              style={{
                color: "#a1a1aa",
                lineHeight: "2",
                paddingLeft: "20px",
                margin: "0 0 16px",
                fontSize: "14px",
              }}
            >
              <li>
                <code
                  style={{
                    fontFamily: "ui-monospace, monospace",
                    color: "#22d3ee",
                  }}
                >
                  ~/.orca/config.js
                </code>{" "}
                — global user config
              </li>
              <li>
                <code
                  style={{
                    fontFamily: "ui-monospace, monospace",
                    color: "#22d3ee",
                  }}
                >
                  ./orca.config.js
                </code>{" "}
                or{" "}
                <code
                  style={{
                    fontFamily: "ui-monospace, monospace",
                    color: "#22d3ee",
                  }}
                >
                  ./orca.config.ts
                </code>{" "}
                — project config
              </li>
              <li>
                <code
                  style={{
                    fontFamily: "ui-monospace, monospace",
                    color: "#22d3ee",
                  }}
                >
                  --config {"<path>"}
                </code>{" "}
                — explicit override
              </li>
            </ol>
            <p style={{ ...S.p, fontSize: "13px" }}>
              <strong style={{ color: "#e2e8f0" }}>Run state</strong> is stored
              at{" "}
              <code
                style={{ fontFamily: "ui-monospace, monospace", color: "#22d3ee" }}
              >
                {"<runsDir>/<run-id>/status.json"}
              </code>
              . Defaults to{" "}
              <code
                style={{ fontFamily: "ui-monospace, monospace", color: "#22d3ee" }}
              >
                ~/.orca/runs
              </code>{" "}
              unless overridden by{" "}
              <code
                style={{ fontFamily: "ui-monospace, monospace", color: "#22d3ee" }}
              >
                ORCA_RUNS_DIR
              </code>
              .
            </p>
          </section>

          {/* Config options */}
          <section id="config-options" style={S.section}>
            <h2 style={S.h2}>Config Options</h2>
            <p style={S.p}>
              Full example — all options are optional:
            </p>
            <CodeBlock
              code={`// orca.config.js
export default {
  // Directory where run state is persisted
  runsDir: "./.orca/runs",

  // Directory for session logs
  sessionLogs: "./session-logs",

  // Hook commands — shell strings run at lifecycle events
  hookCommands: {
    onMilestone:    "echo milestone: $ORCA_MILESTONE",
    onTaskComplete: "echo task done: $ORCA_TASK_NAME",
    onTaskFail:     "echo task failed: $ORCA_TASK_NAME",
    onComplete:     "echo run complete",
    onError:        "echo run failed",
  },

  // Codex-specific options
  codex: {
    model:      "gpt-5.3-codex", // override the codex model
    multiAgent: true,             // enable multi-agent mode (see below)
  },
};`}
              lang="js"
            />
            <h3 style={S.h3}>Top-level fields</h3>
            <table style={S.flagTable}>
              <tbody>
                <Flag flag="runsDir" desc="Directory for run state. Default: ~/.orca/runs (or $ORCA_RUNS_DIR)" />
                <Flag flag="sessionLogs" desc="Directory for session logs" />
                <Flag flag="hookCommands" desc="Object of lifecycle hook shell commands (see Hooks)" />
                <Flag flag="codex.model" desc="Override the Codex model used for execution" />
                <Flag flag="codex.multiAgent" desc="Enable Codex multi-agent mode (see Multi-agent)" />
              </tbody>
            </table>
          </section>

          {/* Hooks */}
          <section id="config-hooks" style={S.section}>
            <h2 style={S.h2}>Hooks</h2>
            <p style={S.p}>
              Hooks let you run shell commands at lifecycle events. Set them via
              config (<code style={{ fontFamily: "ui-monospace, monospace", color: "#22d3ee", fontSize: "13px" }}>hookCommands</code>) or CLI flags (<code style={{ fontFamily: "ui-monospace, monospace", color: "#22d3ee", fontSize: "13px" }}>--on-...</code>).
            </p>
            <table style={S.flagTable}>
              <tbody>
                <Flag flag="onMilestone" desc="Fired at each milestone checkpoint" />
                <Flag flag="onTaskComplete" desc="Fired when a single task completes successfully" />
                <Flag flag="onTaskFail" desc="Fired when a task fails" />
                <Flag flag="onComplete" desc="Fired when the entire run completes successfully" />
                <Flag flag="onError" desc="Fired on run error" />
              </tbody>
            </table>
            <p style={{ ...S.p, fontSize: "13px", marginTop: "16px" }}>
              Hooks are exposed as environment variables (e.g.{" "}
              <code style={{ fontFamily: "ui-monospace, monospace", color: "#22d3ee" }}>$ORCA_TASK_NAME</code>
              ,{" "}
              <code style={{ fontFamily: "ui-monospace, monospace", color: "#22d3ee" }}>$ORCA_MILESTONE</code>
              ) inside the shell command.
            </p>
            <CodeBlock
              code={`# Via config (hookCommands)
export default {
  hookCommands: {
    onTaskComplete: "notify-send 'Task done' $ORCA_TASK_NAME",
    onComplete:     "osascript -e 'display notification \"Run complete\"'",
  }
};

# Via CLI flags (orca run)
orca "add auth" \\
  --on-task-complete "echo done: $ORCA_TASK_NAME" \\
  --on-complete "say run complete"`}
              lang="js"
            />
          </section>

          {/* Multi-agent */}
          <section id="config-multiagent" style={S.section}>
            <h2 style={S.h2}>Multi-agent Mode</h2>
            <p style={S.p}>
              Codex supports experimental multi-agent workflows where it can
              spawn parallel sub-agents for complex tasks. Off by default
              because enabling it modifies your global{" "}
              <code style={{ fontFamily: "ui-monospace, monospace", color: "#22d3ee", fontSize: "13px" }}>~/.codex/config.toml</code>.
            </p>
            <div style={S.note}>
              ⚠️ Enabling multi-agent mode writes{" "}
              <code style={{ fontFamily: "ui-monospace, monospace" }}>multi_agent = true</code> to your{" "}
              global Codex config. If you already have it enabled there, orca picks it up
              automatically.
            </div>
            <CodeBlock
              code={`// orca.config.js
export default {
  codex: { multiAgent: true }
};`}
              lang="js"
            />

            {/* Run ID format */}
            <hr style={S.divider} />
            <h3
              style={{
                ...S.h3,
                marginTop: "0",
                color: "#71717a",
                fontSize: "13px",
                fontWeight: 400,
              }}
            >
              Run ID format
            </h3>
            <p style={{ ...S.p, fontSize: "13px" }}>
              Run IDs are generated as{" "}
              <code style={{ fontFamily: "ui-monospace, monospace", color: "#22d3ee" }}>
                {"<slug>-<unix-ms>-<hex4>"}
              </code>
              :
            </p>
            <CodeBlock code="feature-auth-1766228123456-1a2b" />
          </section>

          {/* Agent Skill card — mobile only (sidebar hidden on mobile) */}
          <div className="mobile-agent-skill">
            <AgentSkillCard />
          </div>

          {/* Footer */}
          <footer
            style={{
              borderTop: "1px solid #1f1f1f",
              padding: "32px 0",
              color: "#3f3f46",
              fontSize: "12px",
              fontFamily: "ui-monospace, monospace",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <span>orca — orcastrator</span>
            <a
              href="https://github.com/ratley/orcastrator"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#3f3f46", textDecoration: "none" }}
            >
              github ↗
            </a>
          </footer>
        </main>
      </div>

      {/* Sidebar hide on mobile */}
      <style>{`
        .mobile-agent-skill { display: none; }
        @media (max-width: 640px) {
          .sidebar-wrapper { display: none !important; }
          main { padding: 0 20px !important; }
          .mobile-agent-skill { display: block; }
        }
        nav a:hover { color: #22d3ee !important; }
        header a:hover { color: #e2e8f0 !important; }
      `}</style>
    </>
  );
}
