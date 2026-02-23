import { AgentSkillCard } from "./components/AgentSkillCard";
import { CodeBlock } from "./components/CodeBlock";
import { InstallCommandSwitcher } from "./components/InstallCommandSwitcher";
import { PageCopyButton } from "./components/PageCopyButton";

// ─── Nav items ───────────────────────────────────────────────────────────────

const NAV_COMMANDS: Array<{ id: string; label: string; accent?: boolean }> = [
  { id: "get-started", label: "Get Started", accent: true },
  { id: "cmd-run", label: "orca <task>" },
  { id: "cmd-plan", label: "orca plan" },
  { id: "cmd-status", label: "orca status" },
  { id: "cmd-list", label: "orca list" },
  { id: "cmd-resume", label: "orca resume" },
  { id: "cmd-cancel", label: "orca cancel" },
  { id: "cmd-answer", label: "orca answer" },
  { id: "cmd-pr", label: "orca pr" },
  { id: "cmd-setup", label: "orca setup" },
  { id: "cmd-skills", label: "orca skills" },
  { id: "cmd-help", label: "orca help" },
];

const NAV_CONFIG = [
  { id: "config-discovery", label: "Discovery" },
  { id: "config-project-instructions", label: "Project Instructions" },
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

function Flag({ flag, desc }: { flag: string; desc: string }) {
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
              color: item.accent ? "#22d3ee" : "#71717a",
              textDecoration: "none",
              fontFamily: "ui-monospace, monospace",
              opacity: item.accent ? 0.85 : 1,
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

      <div style={{ marginTop: "20px" }}>
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
          Resources
        </div>
        <a
          href="#agent-skill"
          style={{
            display: "block",
            padding: "4px 16px",
            fontSize: "13px",
            color: "#71717a",
            textDecoration: "none",
            fontFamily: "ui-monospace, monospace",
          }}
        >
          Agent Skill
        </a>
        <a
          href="#types"
          style={{
            display: "block",
            padding: "4px 16px",
            fontSize: "13px",
            color: "#71717a",
            textDecoration: "none",
            fontFamily: "ui-monospace, monospace",
          }}
        >
          Types
        </a>
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
            href="https://github.com/ratley/orca"
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
        <div className="sidebar-wrapper" style={{ display: "flex" }}>
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
          {/* ── Copy page button ── */}
          <PageCopyButton />

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
              Coordinated agent run harness. Breaks down a task into a graph of
              tasks, then executes it end-to-end via a persistent{" "}
              <a
                href="https://developers.openai.com/codex/app-server/"
                style={{ color: "#22d3ee", textDecoration: "none" }}
              >
                Codex
              </a>{" "}
              session with full context across tasks.
            </p>

            <div id="get-started" style={{ marginBottom: "8px" }}>
              <InstallCommandSwitcher />
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

          {/* orca <task> */}
          <CmdSection
            id="cmd-run"
            title="orca <task>"
            usage="orca [task] [flags]"
            desc="Start a new run from a plain-language task. Orca plans tasks, executes them in sequence, and persists run state. You can also provide a spec or plan file instead of a task string."
          >
            <CodeBlock
              code={`# Run a task
orca "add auth to the app"

# Run with a spec or plan file
orca --spec ./specs/feature.md
orca --plan ./specs/feature.md`}
              lang="shell"
            />
            <h3 style={S.h3}>Flags</h3>
            <table style={S.flagTable}>
              <tbody>
                <Flag flag="[task]" desc="Plain-language task (positional)" />
                <Flag
                  flag="--task, -p, --prompt <text>"
                  desc="Task as a named flag (alias for positional)"
                />
                <Flag
                  flag="--spec <path>"
                  desc="Path to a spec/markdown breakdown file"
                />
                <Flag
                  flag="--plan <path>"
                  desc="Path to a plan file (same as --spec)"
                />
                <Flag
                  flag="--config <path>"
                  desc="Path to an orca config file"
                />
                <Flag
                  flag="--on-milestone <cmd>"
                  desc="Shell command to run on each milestone"
                />
                <Flag
                  flag="--on-error <cmd>"
                  desc="Shell command to run on error"
                />
                <Flag
                  flag="--codex-only"
                  desc="Force Codex executor for this run"
                />
                <Flag
                  flag="--codex-effort <low|medium|high>"
                  desc="Override Codex effort for this run"
                />
                <Flag
                  flag="--on-task-complete <cmd>"
                  desc="Shell command to run when a task completes"
                />
                <Flag
                  flag="--on-task-fail <cmd>"
                  desc="Shell command to run when a task fails"
                />
                <Flag
                  flag="--on-invalid-plan <cmd>"
                  desc="Shell command to run when planner/review output is invalid"
                />
                <Flag
                  flag="--on-findings <cmd>"
                  desc="Shell command to run when post-execution review reports findings"
                />
                <Flag
                  flag="--on-complete <cmd>"
                  desc="Shell command to run when the full run completes"
                />
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
                <Flag
                  flag="--spec <path>"
                  desc="Path to a spec/markdown breakdown file"
                />
                <Flag
                  flag="--config <path>"
                  desc="Path to an orca config file"
                />
                <Flag
                  flag="--on-milestone <cmd>"
                  desc="Shell command to run on each milestone"
                />
                <Flag
                  flag="--on-error <cmd>"
                  desc="Shell command to run on error"
                />
              </tbody>
            </table>
          </CmdSection>

          {/* orca status */}
          <CmdSection
            id="cmd-status"
            title="orca status"
            usage="orca status [flags]"
            desc="Without --run or --last, lists all runs as a summary table. With --run or --last, shows detailed status for a specific run — tasks completed, in-progress, pending, or failed."
          >
            <CodeBlock
              code={`orca status            # list all runs (summary table)
orca status --last     # status of the most recent run
orca status --run <id> # status of a specific run`}
              lang="shell"
            />
            <h3 style={S.h3}>Flags</h3>
            <table style={S.flagTable}>
              <tbody>
                <Flag
                  flag="--run <run-id>"
                  desc="Show status for a specific run ID"
                />
                <Flag
                  flag="--last"
                  desc="Show status for the most recent run"
                />
                <Flag
                  flag="--config <path>"
                  desc="Path to an orca config file"
                />
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
            <CodeBlock code={`orca list`} lang="shell" />
            <h3 style={S.h3}>Flags</h3>
            <table style={S.flagTable}>
              <tbody>
                <Flag
                  flag="--config <path>"
                  desc="Path to an orca config file"
                />
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
                <Flag
                  flag="--run <run-id>"
                  desc="Resume a specific run by ID"
                />
                <Flag flag="--last" desc="Resume the most recent run" />
                <Flag
                  flag="--config <path>"
                  desc="Path to an orca config file"
                />
                <Flag
                  flag="--codex-only"
                  desc="Force Codex executor for this resume"
                />
                <Flag
                  flag="--codex-effort <low|medium|high>"
                  desc="Override Codex effort for this resume"
                />
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
                <Flag
                  flag="--run <run-id>"
                  desc="Cancel a specific run by ID"
                />
                <Flag flag="--last" desc="Cancel the most recent run" />
                <Flag
                  flag="--config <path>"
                  desc="Path to an orca config file"
                />
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
                <Flag
                  flag="--run <id>"
                  desc="Run ID as a named flag (alias for positional)"
                />
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
                <Flag
                  flag="--run <run-id>"
                  desc="Target a specific run by ID"
                />
                <Flag flag="--last" desc="Target the most recent run" />
                <Flag
                  flag="--config <path>"
                  desc="Accepted for compatibility; currently unused by PR command run resolution"
                />
              </tbody>
            </table>
          </CmdSection>

          {/* orca pr publish */}
          <CmdSection
            id="cmd-pr-publish"
            title="orca pr publish"
            usage="orca pr publish [flags]"
            desc="Publish a draft PR for a run (ready for review). In TTY mode, run selection is interactive when --run/--last is omitted; non-TTY requires --run or --last."
          >
            <CodeBlock
              code={`orca pr publish --run <run-id>
orca pr publish --last
orca pr publish --config ./orca.config.js   # accepted, currently unused by PR command resolution

# Non-TTY requires explicit selection
orca pr publish --last`}
              lang="shell"
            />
            <h3 style={S.h3}>Flags</h3>
            <table style={S.flagTable}>
              <tbody>
                <Flag
                  flag="--run <run-id>"
                  desc="Target a specific run by ID"
                />
                <Flag flag="--last" desc="Target the most recent run" />
                <Flag
                  flag="--config <path>"
                  desc="Accepted for compatibility; currently unused by PR command run resolution"
                />
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
              code={`orca setup                      # auto-detect (default)
orca setup --openai-key sk-...
orca setup --openai-key sk-...
orca setup --executor codex
orca setup --ts --global         # write to ~/.orca/config.ts
orca setup --ts --project        # write to ./orca.config.ts`}
              lang="shell"
            />
            <h3 style={S.h3}>Flags</h3>
            <table style={S.flagTable}>
              <tbody>
                <Flag flag="--openai-key <key>" desc="Set OpenAI API key" />
                <Flag
                  flag="--executor <codex>"
                  desc="Explicitly set executor in written config"
                />
                <Flag
                  flag="--ts"
                  desc="Write TypeScript config output (.ts) instead of .js"
                />
                <Flag
                  flag="--global"
                  desc="Write global config (~/.orca/config.js by default, or .ts with --ts)"
                />
                <Flag
                  flag="--project"
                  desc="Write project config (./orca.config.js by default, or .ts with --ts)"
                />
                <Flag
                  flag="--project-config-template"
                  desc="Write a typed project hook template to ./orca.config.ts"
                />
                <Flag
                  flag="--skip-project-config"
                  desc="Do not prompt to generate a project config template"
                />
              </tbody>
            </table>
          </CmdSection>

          {/* orca skills */}
          <CmdSection
            id="cmd-skills"
            title="orca skills"
            usage="orca skills [flags]"
            desc="List loaded skills and their sources."
          >
            <CodeBlock
              code={`orca skills
orca skills --config ./orca.config.js`}
              lang="shell"
            />
            <h3 style={S.h3}>Flags</h3>
            <table style={S.flagTable}>
              <tbody>
                <Flag
                  flag="--config <path>"
                  desc="Path to an orca config file"
                />
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
                  ~/.orca/config.ts
                </code>{" "}
                (takes precedence when both exist) or{" "}
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
                  ./orca.config.ts
                </code>{" "}
                (takes precedence when both exist) or{" "}
                <code
                  style={{
                    fontFamily: "ui-monospace, monospace",
                    color: "#22d3ee",
                  }}
                >
                  ./orca.config.js
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
                style={{
                  fontFamily: "ui-monospace, monospace",
                  color: "#22d3ee",
                }}
              >
                {"<runsDir>/<run-id>/status.json"}
              </code>
              . Defaults to{" "}
              <code
                style={{
                  fontFamily: "ui-monospace, monospace",
                  color: "#22d3ee",
                }}
              >
                ~/.orca/runs
              </code>{" "}
              unless overridden by{" "}
              <code
                style={{
                  fontFamily: "ui-monospace, monospace",
                  color: "#22d3ee",
                }}
              >
                ORCA_RUNS_DIR
              </code>
              .
            </p>
            <p style={{ ...S.p, fontSize: "13px" }}>
              Validator caveat:{" "}
              <code
                style={{
                  fontFamily: "ui-monospace, monospace",
                  color: "#22d3ee",
                }}
              >
                ORCA_SKIP_VALIDATORS=1
              </code>{" "}
              forces{" "}
              <code
                style={{
                  fontFamily: "ui-monospace, monospace",
                  color: "#22d3ee",
                }}
              >
                review.execution.validator.auto
              </code>{" "}
              off at runtime.
            </p>
          </section>

          {/* Project instruction files */}
          <section id="config-project-instructions" style={S.section}>
            <h2 style={S.h2}>Project Instruction Files</h2>
            <p style={S.p}>
              During planning, Orca automatically injects project instruction
              files when present:
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
                  AGENTS.md
                </code>
              </li>
              <li>
                <code
                  style={{
                    fontFamily: "ui-monospace, monospace",
                    color: "#22d3ee",
                  }}
                >
                  CLAUDE.md
                </code>
              </li>
            </ol>
            <p style={{ ...S.p, fontSize: "13px" }}>
              Orca resolves the project root from the nearest{" "}
              <code
                style={{
                  fontFamily: "ui-monospace, monospace",
                  color: "#22d3ee",
                }}
              >
                .git
              </code>{" "}
              and injects files in deterministic order: AGENTS first, then
              CLAUDE.
            </p>
          </section>

          {/* Config options */}
          <section id="config-options" style={S.section}>
            <h2 style={S.h2}>Config Options</h2>
            <p style={S.p}>Full example — all options are optional:</p>
            <CodeBlock
              code={`// orca.config.ts
import { defineOrcaConfig } from "orcastrator";

export default defineOrcaConfig({
  executor: "codex",
  openaiApiKey: process.env.OPENAI_API_KEY,
  runsDir: "./.orca/runs",
  sessionLogs: "./session-logs",
  skills: ["./.orca/skills"],
  maxRetries: 1,

  codex: {
    enabled: true,
    model: "gpt-5.3-codex",
    effort: "medium",
    command: "codex",
    timeoutMs: 300000,
    multiAgent: false,
  },
  pr: { enabled: true, requireConfirmation: true },
  review: {
    // Deprecated aliases: review.enabled / review.onInvalid
    plan: { enabled: true, onInvalid: "fail" },
    execution: {
      enabled: true,
      maxCycles: 2,
      onFindings: "auto_fix",
      validator: { auto: true },
    },
  },
});`}
              lang="ts"
            />
            <h3 style={S.h3}>Field reference</h3>
            <table style={S.flagTable}>
              <tbody>
                <Flag
                  flag="Top-level"
                  desc="executor, openaiApiKey, runsDir, sessionLogs, skills, maxRetries, hooks, hookCommands, pr, review, codex"
                />
                <Flag
                  flag="maxRetries"
                  desc="Accepted OrcaConfig field; current planner-generated task retry limits remain fixed by task graph contracts"
                />
                <Flag
                  flag="codex.*"
                  desc="enabled, model, effort, command, timeoutMs, multiAgent, perCwdExtraUserRoots"
                />
                <Flag flag="pr.*" desc="enabled, requireConfirmation" />
                <Flag flag="review.plan.*" desc="enabled, onInvalid" />
                <Flag
                  flag="review.execution.*"
                  desc="enabled, maxCycles, onFindings, validator.auto, validator.commands, prompt"
                />
                <Flag
                  flag="Deprecated aliases"
                  desc="review.enabled, review.onInvalid"
                />
              </tbody>
            </table>
          </section>

          {/* Hooks */}
          <section id="config-hooks" style={S.section}>
            <h2 style={S.h2}>Hooks</h2>
            <p style={S.p}>
              Function hooks are primary (
              <code
                style={{
                  fontFamily: "ui-monospace, monospace",
                  color: "#22d3ee",
                  fontSize: "13px",
                }}
              >
                hooks
              </code>
              ) and are strongly typed with `defineOrcaConfig`. Command hooks (
              <code
                style={{
                  fontFamily: "ui-monospace, monospace",
                  color: "#22d3ee",
                  fontSize: "13px",
                }}
              >
                hookCommands
              </code>
              ) are supported via config or CLI{" "}
              <code
                style={{
                  fontFamily: "ui-monospace, monospace",
                  color: "#22d3ee",
                  fontSize: "13px",
                }}
              >
                --on-...
              </code>{" "}
              flags.
            </p>
            <table style={S.flagTable}>
              <tbody>
                <Flag
                  flag="onMilestone"
                  desc="Fired at each milestone checkpoint"
                />
                <Flag
                  flag="onTaskComplete"
                  desc="Fired when a single task completes successfully"
                />
                <Flag flag="onTaskFail" desc="Fired when a task fails" />
                <Flag
                  flag="onInvalidPlan"
                  desc="Fired when planner/review output is invalid"
                />
                <Flag
                  flag="onFindings"
                  desc="Fired when post-exec review reports findings"
                />
                <Flag
                  flag="onComplete"
                  desc="Fired when the entire run completes successfully"
                />
                <Flag
                  flag="onError"
                  desc="Fired on run failure and on hook-dispatch/command-hook failures"
                />
              </tbody>
            </table>
            <p style={{ ...S.p, fontSize: "13px", marginTop: "16px" }}>
              Hook handler context is deterministic:{" "}
              <code
                style={{
                  fontFamily: "ui-monospace, monospace",
                  color: "#22d3ee",
                }}
              >
                {"{ cwd, pid, invokedAt }"}
              </code>
              .
            </p>
            <p style={{ ...S.p, fontSize: "13px" }}>
              Command hooks receive structured event payload JSON on stdin.
            </p>
            <h3 style={S.h3}>Interactive hook flow</h3>
            <p style={{ ...S.p, fontSize: "13px" }}>
              If a run needs operator input, Orca moves the run into
              <code
                style={{
                  fontFamily: "ui-monospace, monospace",
                  color: "#22d3ee",
                }}
              >
                {" waiting_for_answer "}
              </code>
              and pauses execution until an answer is submitted.
            </p>
            <CodeBlock
              code={`# 1) Inspect the blocked run
orca status --run <run-id>

# 2) Submit the answer
orca answer <run-id> "yes, use migration A"

# 3) Continue execution
orca resume --run <run-id>`}
              lang="shell"
            />
            <p
              style={{
                ...S.p,
                fontSize: "13px",
                color: "#71717a",
                marginTop: "8px",
              }}
            >
              See{" "}
              <a
                href="#types"
                style={{ color: "#93c5fd", textDecoration: "none" }}
              >
                Types ↓
              </a>{" "}
              for full hook event and context contracts.
            </p>
            <CodeBlock
              code={`# Via config (function hooks + command hooks)
import { defineOrcaConfig } from "orcastrator";
import type { HookEventMap, HookHandlerContext } from "orcastrator/types";

export default defineOrcaConfig({
  hooks: {
    onTaskComplete: async (event, context) => {
      const _typedEvent: HookEventMap["onTaskComplete"] = event;
      const _typedContext: HookHandlerContext = context;
      console.log(\`task done: \${event.taskName}\`, context.cwd);
    },
  },
  hookCommands: {
    onTaskComplete: "node ./scripts/on-task-complete.mjs",
  },
});

# ./scripts/on-task-complete.mjs
# let s = ""; process.stdin.on("data", d => s += d);
# process.stdin.on("end", () => {
#   const payload = JSON.parse(s);
#   console.log(\`done: \${payload.taskName}\`);
# });`}
              lang="ts"
            />
          </section>

          {/* Multi-agent */}
          <section id="config-multiagent" style={S.section}>
            <h2 style={S.h2}>Multi-agent Mode</h2>
            <p style={S.p}>
              Codex supports experimental multi-agent workflows where it can
              spawn parallel sub-agents for complex tasks. Off by default
              because enabling it modifies your global{" "}
              <code
                style={{
                  fontFamily: "ui-monospace, monospace",
                  color: "#22d3ee",
                  fontSize: "13px",
                }}
              >
                ~/.codex/config.toml
              </code>
              .
            </p>
            <div style={S.note}>
              ⚠️ Enabling multi-agent mode writes{" "}
              <code style={{ fontFamily: "ui-monospace, monospace" }}>
                multi_agent = true
              </code>{" "}
              to your global Codex config. If you already have it enabled there,
              orca picks it up automatically.
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
              <code
                style={{
                  fontFamily: "ui-monospace, monospace",
                  color: "#22d3ee",
                }}
              >
                {"<slug>-<unix-ms>-<hex4>"}
              </code>
              :
            </p>
            <CodeBlock code="feature-auth-1766228123456-1a2b" />
          </section>

          {/* Agent Skill */}
          <section id="agent-skill" style={S.section}>
            <h2 style={S.h2}>Agent Skill</h2>
            <p style={S.p}>
              Drop this SKILL.md into your agent&apos;s skills directory to give
              it native Orca support.
            </p>
            <AgentSkillCard />
          </section>

          {/* Types */}
          <section id="types" style={S.section}>
            <h2 style={S.h2}>Types</h2>
            <p style={S.p}>
              Full TypeScript contracts for hook events and context. Import
              directly from{" "}
              <a
                href="https://github.com/ratley/orca/blob/master/src/types/index.ts"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: "ui-monospace, monospace",
                  color: "#22d3ee",
                  textDecoration: "none",
                }}
              >
                orcastrator/types ↗
              </a>
              .
            </p>
            <h3 style={{ ...S.h3, marginTop: "24px" }}>HookHandlerContext</h3>
            <p style={S.p}>
              Passed as the second argument to every function hook.
            </p>
            <CodeBlock
              code={`type HookHandlerContext = {
  cwd: string;       // working directory of the orca run
  pid: number;       // process id
  invokedAt: string; // ISO timestamp of invocation
};`}
              lang="ts"
            />
            <h3 style={{ ...S.h3, marginTop: "24px" }}>BaseHookEvent</h3>
            <p style={S.p}>
              Base shape shared by all hook events. Hook-specific events extend
              this.
            </p>
            <CodeBlock
              code={`type BaseHookEvent = {
  runId: RunId;
  message: string;
  timestamp: string;
  taskId?: string;
  taskName?: string;
  error?: string;
  metadata?: Record<string, string | number | boolean | null>;
};`}
              lang="ts"
            />
            <h3 style={{ ...S.h3, marginTop: "24px" }}>HookEventMap</h3>
            <p style={S.p}>Maps each hook name to its full event type.</p>
            <CodeBlock
              code={`type HookEventMap = {
  onMilestone:    BaseHookEvent & { hook: "onMilestone" };
  onTaskComplete: BaseHookEvent & { hook: "onTaskComplete"; taskId: string; taskName: string };
  onTaskFail:     BaseHookEvent & { hook: "onTaskFail"; taskId: string; taskName: string; error: string };
  onInvalidPlan:  BaseHookEvent & { hook: "onInvalidPlan"; error: string };
  onFindings:     BaseHookEvent & { hook: "onFindings" };
  onComplete:     BaseHookEvent & { hook: "onComplete" };
  onError:        BaseHookEvent & { hook: "onError"; error: string };
};`}
              lang="ts"
            />
            <h3 style={{ ...S.h3, marginTop: "24px" }}>
              Example payload (JSON)
            </h3>
            <p style={S.p}>
              Shape of the JSON written to stdin for command hooks.
            </p>
            <CodeBlock
              code={`{
  "hook": "onTaskComplete",
  "runId": "feature-auth-1766228123456-1a2b",
  "message": "Task completed",
  "timestamp": "2026-02-22T12:00:00.000Z",
  "taskId": "task-2",
  "taskName": "Apply migration"
}`}
              lang="json"
            />
          </section>

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
              href="https://github.com/ratley/orca"
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
        @media (max-width: 640px) {
          .sidebar-wrapper { display: none !important; }
          main { padding: 0 20px !important; }
        }
        nav a:hover { color: #22d3ee !important; }
        header a:hover { color: #e2e8f0 !important; }
      `}</style>
    </>
  );
}
