import { AgentSkillCard } from "./components/AgentSkillCard";
import { CodeBlock } from "./components/CodeBlock";
import { DocsSidebar, type DocsNavGroup } from "./components/DocsSidebar";
import { InstallCommandSwitcher } from "./components/InstallCommandSwitcher";
import { PageCopyButton } from "./components/PageCopyButton";

const NAV_GROUPS: DocsNavGroup[] = [
  {
    label: "Start",
    items: [
      { id: "get-started", label: "Get Started" },
      { id: "mental-model", label: "Mental Model" },
      { id: "surfaces", label: "Dispatch Surfaces" },
    ],
  },
  {
    label: "Commands",
    items: [
      { id: "cmd-dispatch", label: "orca dispatch" },
      { id: "cmd-inspect", label: "orca inspect" },
      { id: "cmd-answer", label: "orca answer" },
      { id: "cmd-resume", label: "orca resume" },
      { id: "cmd-lanes", label: "orca lanes" },
      { id: "cmd-kill", label: "orca kill" },
      { id: "cmd-agents", label: "orca agents" },
      { id: "cmd-contract", label: "orca contract" },
    ],
  },
  {
    label: "Contract",
    items: [
      { id: "question-flow", label: "Blocked Questions" },
      { id: "envelopes", label: "Envelopes" },
      { id: "exit-codes", label: "Exit Codes" },
      { id: "storage", label: "Durable State" },
    ],
  },
  {
    label: "Resources",
    items: [{ id: "agent-skill", label: "Agent Skill" }],
  },
];

const S = {
  section: {
    padding: "40px 0",
    borderBottom: "1px solid #1f1f1f",
  } as React.CSSProperties,
  h2: {
    fontSize: "22px",
    fontWeight: 600,
    color: "#f1f5f9",
    margin: "0 0 8px",
    fontFamily: "ui-monospace, monospace",
    letterSpacing: "-0.02em",
  } as React.CSSProperties,
  h3: {
    fontSize: "16px",
    fontWeight: 600,
    color: "#e2e8f0",
    margin: "28px 0 8px",
    fontFamily: "ui-monospace, monospace",
  } as React.CSSProperties,
  p: {
    color: "#a1a1aa",
    lineHeight: "1.7",
    margin: "0 0 12px",
  } as React.CSSProperties,
  table: {
    width: "100%",
    borderCollapse: "collapse" as const,
    fontSize: "13px",
    margin: "14px 0",
  },
  row: {
    borderBottom: "1px solid #1f1f1f",
  } as React.CSSProperties,
  keyCell: {
    padding: "8px 16px 8px 0",
    verticalAlign: "top",
    color: "#22d3ee",
    fontFamily: "ui-monospace, monospace",
    whiteSpace: "nowrap" as const,
    fontSize: "12px",
  } as React.CSSProperties,
  valueCell: {
    padding: "8px 0",
    verticalAlign: "top",
    color: "#a1a1aa",
    lineHeight: "1.55",
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
  note: {
    background: "#111d2b",
    border: "1px solid #1e3a5f",
    borderRadius: "6px",
    padding: "12px 16px",
    color: "#7dd3fc",
    fontSize: "13px",
    lineHeight: "1.65",
    margin: "14px 0",
  } as React.CSSProperties,
  list: {
    color: "#a1a1aa",
    lineHeight: "1.8",
    paddingLeft: "20px",
    margin: "8px 0 16px",
  } as React.CSSProperties,
};

function DocRow({ name, children }: { name: string; children: React.ReactNode }) {
  return (
    <tr style={S.row}>
      <td style={S.keyCell}>{name}</td>
      <td style={S.valueCell}>{children}</td>
    </tr>
  );
}

function CmdSection({
  id,
  title,
  usage,
  description,
  children,
}: {
  id: string;
  title: string;
  usage: string;
  description: string;
  children?: React.ReactNode;
}) {
  return (
    <section id={id} style={S.section}>
      <h2 style={S.h2}>{title}</h2>
      <div style={{ marginBottom: "12px" }}>
        <span style={S.badge}>usage</span>
        <code style={{ color: "#e2e8f0", fontSize: "13px" }}>{usage}</code>
      </div>
      <p style={S.p}>{description}</p>
      {children}
    </section>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        paddingTop: "36px",
        paddingBottom: "2px",
        color: "#52525b",
        fontSize: "11px",
        fontFamily: "ui-monospace, monospace",
        letterSpacing: "0.1em",
        textTransform: "uppercase",
      }}
    >
      {children}
    </div>
  );
}

export default function Home() {
  return (
    <>
      <header className="docs-header">
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
        <div className="docs-header-links">
          <a href="#cmd-dispatch">commands</a>
          <a href="#envelopes">contract</a>
        </div>
        <a
          href="https://github.com/ratley/orca"
          target="_blank"
          rel="noopener noreferrer"
          style={{ marginLeft: "auto", color: "#52525b", textDecoration: "none", fontSize: "13px" }}
        >
          github ↗
        </a>
      </header>

      <div className="docs-shell">
        <DocsSidebar groups={NAV_GROUPS} />

        <main className="docs-main">
          <PageCopyButton />

          <section id="hero" className="docs-hero">
            <div style={{ display: "flex", alignItems: "center", gap: "9px", marginBottom: "12px" }}>
              <h1
                style={{
                  fontSize: "30px",
                  fontWeight: 700,
                  color: "#f1f5f9",
                  margin: 0,
                  fontFamily: "ui-monospace, monospace",
                  letterSpacing: "-0.04em",
                }}
              >
                orca
              </h1>
              <span style={S.badge}>orca/v1</span>
            </div>
            <p
              style={{
                fontSize: "16px",
                color: "#a1a1aa",
                margin: "0 0 24px",
                lineHeight: "1.65",
                maxWidth: "590px",
              }}
            >
              Observable agent lanes with one machine-readable contract. Dispatch Codex, Claude, or Cursor work; inspect
              durable evidence; answer blocked questions; and resume the same native session with verified continuity.
            </p>

            <div id="get-started">
              <InstallCommandSwitcher />
            </div>
            <CodeBlock
              code={`# Discover the installed contract first
orca contract
orca agents

# Dispatch an internal Codex worker
orca dispatch --agent codex --cwd . "Review the current diff"`}
              lang="shell"
            />
          </section>

          <section id="mental-model" style={S.section}>
            <h2 style={S.h2}>Mental Model</h2>
            <p style={S.p}>
              Orca is a substrate for orchestrators, not an orchestrator itself. The caller decides what work to
              delegate and how to judge it. Orca owns native session binding, durable state, process control, continuity
              checks, and a stable JSON boundary across agents.
            </p>
            <div style={S.note}>
              Run <code>orca contract</code> and trust it over remembered behavior. Run <code>orca agents</code> before
              routing work so capability and caveat decisions use the live adapter manifests.
            </div>
            <table style={S.table}>
              <tbody>
                <DocRow name="lane">Orca&apos;s durable unit of delegated work.</DocRow>
                <DocRow name="native session">The Codex thread, Claude session, or Cursor chat bound to a lane.</DocRow>
                <DocRow name="event stream">Append-only evidence with gap-free sequence numbers.</DocRow>
                <DocRow name="envelope">The final, versioned JSON result emitted by every lane verb.</DocRow>
              </tbody>
            </table>
          </section>

          <section id="surfaces" style={S.section}>
            <h2 style={S.h2}>Dispatch Surfaces</h2>
            <h3 style={S.h3}>lane — internal worker (default)</h3>
            <p style={S.p}>
              A worker intended to report its result back to a coordinating agent or script. It remains durable so it
              can be inspected and resumed.
            </p>
            <CodeBlock code={`orca dispatch --agent codex --cwd . "Investigate the flaky test"`} lang="shell" />

            <h3 style={S.h3}>task — user-followable Codex thread</h3>
            <p style={S.p}>
              A deliberately named thread intended for direct follow-up in Codex clients that share the same
              <code> CODEX_HOME</code>. Task surface is Codex-only and requires a non-empty <code>--label</code>.
            </p>
            <CodeBlock
              code={`orca dispatch --agent codex --surface task \\
  --label "HAPPY-123 — Fix API" \\
  --cwd /path/to/existing/worktree \\
  "Implement HAPPY-123 and run its focused tests"`}
              lang="shell"
            />
            <div style={S.note}>
              Task surface does not provision a Codex Desktop-managed project or worktree. Pass an existing checkout
              with <code>--cwd</code>. Persistent lane threads can also appear in Desktop because the requested source
              is a host-normalized hint, not a visibility filter.
            </div>
          </section>

          <SectionLabel>Commands</SectionLabel>

          <CmdSection
            id="cmd-dispatch"
            title="orca dispatch"
            usage="orca dispatch --agent <agent> [--surface lane|task] [--model <model>] [--cwd <dir>] [--label <label>] [--timeout <ms>] <prompt>"
            description="Create a lane and drive one native agent turn until it completes, fails, is killed, times out, or blocks on a question."
          >
            <table style={S.table}>
              <tbody>
                <DocRow name="--agent">Required adapter: codex, claude, or cursor.</DocRow>
                <DocRow name="--surface">Ownership surface. Defaults to lane; task is Codex-only.</DocRow>
                <DocRow name="--model">Adapter-specific model override.</DocRow>
                <DocRow name="--cwd">Agent working directory. Defaults to the current directory.</DocRow>
                <DocRow name="--label">Orca label; required native title for task surface.</DocRow>
                <DocRow name="--timeout">One deadline shared by connection, session binding, and the turn.</DocRow>
              </tbody>
            </table>
            <p style={S.p}>
              Dispatch prints a handle line immediately after lane creation, then exactly one final envelope. Capture
              the handle when another process may need to inspect or kill the lane before the turn settles.
            </p>
            <CodeBlock
              code={`{"v":1,"kind":"handle","laneId":"lane_a3f81c02","agent":"codex"}
{"v":1,"kind":"lane","ok":true,"status":"completed","lane":{"id":"lane_a3f81c02","agent":"codex","surface":"lane"},"delivery":"confirmed","nativeStatus":"completed","semanticOutcome":"unknown","result":{"text":"..."}}`}
              lang="json"
            />
          </CmdSection>

          <CmdSection
            id="cmd-inspect"
            title="orca inspect"
            usage="orca inspect <laneId> [--follow] [--since <seq>] [--wait-for blocked|done] [--timeout <ms>]"
            description="Read current state and durable events, optionally following until a target state is reached."
          >
            <CodeBlock
              code={`orca inspect lane_a3f81c02
orca inspect lane_a3f81c02 --since 7
orca inspect lane_a3f81c02 --follow
orca inspect lane_a3f81c02 --wait-for blocked --timeout 600000`}
              lang="shell"
            />
            <p style={S.p}>
              <code>--since N</code> returns events with a sequence greater than N. Terminal states also satisfy
              <code> --wait-for blocked</code>, so always read the returned <code>status</code> instead of assuming the
              lane actually blocked.
            </p>
          </CmdSection>

          <CmdSection
            id="cmd-answer"
            title="orca answer"
            usage="orca answer <laneId> <text>"
            description="Submit an answer to a blocked lane's pending question."
          >
            <CodeBlock code={`orca answer lane_a3f81c02 "Use the staging database"`} lang="shell" />
            <p style={S.p}>
              Answering a lane that is not blocked returns <code>invalid_state</code> (exit 4). Only Codex currently
              supports question parking, and that model behavior remains best-effort.
            </p>
          </CmdSection>

          <CmdSection
            id="cmd-resume"
            title="orca resume"
            usage="orca resume <laneId> [--timeout <ms>] <prompt>"
            description="Start a follow-up turn on the same native session and fail loud if continuity cannot be verified."
          >
            <CodeBlock code={`orca resume lane_a3f81c02 "Now add tests for the edge cases"`} lang="shell" />
            <p style={S.p}>
              Completed and parked blocked lanes can resume. Failed, killed, and lost lanes cannot. A blocked lane with
              a live question poller rejects resume to prevent two processes from driving one native session.
            </p>
          </CmdSection>

          <CmdSection
            id="cmd-lanes"
            title="orca lanes"
            usage="orca lanes"
            description="List known lane records newest-first in a kind:list envelope."
          >
            <CodeBlock code="orca lanes" lang="shell" />
          </CmdSection>

          <CmdSection
            id="cmd-kill"
            title="orca kill"
            usage="orca kill <laneId>"
            description="Terminate a queued, running, or blocked lane using the persisted native process identity."
          >
            <CodeBlock code="orca kill lane_a3f81c02" lang="shell" />
            <p style={S.p}>
              Killing an already-killed lane is idempotent. Killing a completed, failed, or lost lane returns
              <code> invalid_state</code>.
            </p>
          </CmdSection>

          <CmdSection
            id="cmd-agents"
            title="orca agents"
            usage="orca agents"
            description="Return the live adapter manifests used for evidence-based routing."
          >
            <CodeBlock code={`orca agents | jq '.agents[] | {agent, capabilities, caveats}'`} lang="shell" />
            <table style={S.table}>
              <tbody>
                <DocRow name="codex">
                  App Server threads, thread-ID continuity, best-effort question parking, optional browser use, and
                  named task surface.
                </DocRow>
                <DocRow name="claude">
                  One-shot <code>claude -p</code>, session-ID continuity, no question parking, and permissions that can
                  deny writes by default.
                </DocRow>
                <DocRow name="cursor">
                  Cursor chat continuity, worktree support, no question parking, and a first-output heartbeat for cold
                  starts that can take 30–100 seconds.
                </DocRow>
              </tbody>
            </table>
            <p style={S.p}>
              Model lists and measured overhead can change. Read the manifest instead of hard-coding them.
            </p>
          </CmdSection>

          <CmdSection
            id="cmd-contract"
            title="orca contract"
            usage="orca contract [--schema envelope|event|manifest]"
            description="Return the versioned command contract, exit codes, notes, and JSON Schemas."
          >
            <CodeBlock
              code={`orca contract
orca contract --schema envelope
orca contract --schema event
orca contract --schema manifest`}
              lang="shell"
            />
            <div style={S.note}>If this page and an installed Orca disagree, the installed contract wins.</div>
          </CmdSection>

          <SectionLabel>Contract</SectionLabel>

          <section id="question-flow" style={S.section}>
            <h2 style={S.h2}>Blocked Question Flow</h2>
            <CodeBlock
              code={`# Terminal states also satisfy this wait; inspect status.
orca inspect lane_a3f81c02 --wait-for blocked --timeout 600000

orca answer lane_a3f81c02 "Postgres"
orca resume lane_a3f81c02 "Continue with that answer"`}
              lang="shell"
            />
            <p style={S.p}>
              <code>blocked</code> is a successful state: <code>ok:true</code>, exit 0. It means the turn stopped at an
              explicit input boundary, not that the adapter failed.
            </p>
          </section>

          <section id="envelopes" style={S.section}>
            <h2 style={S.h2}>Envelope Semantics</h2>
            <p style={S.p}>Three independent axes prevent protocol delivery from being mistaken for task success:</p>
            <table style={S.table}>
              <tbody>
                <DocRow name="delivery">Whether the native agent acknowledged the turn.</DocRow>
                <DocRow name="nativeStatus">What the native protocol or process reported.</DocRow>
                <DocRow name="semanticOutcome">
                  An explicit validator result. Without a validator it stays unknown; Orca never infers correctness from
                  prose.
                </DocRow>
              </tbody>
            </table>
            <CodeBlock
              code={`{
  "v": 1,
  "kind": "lane",
  "ok": true,
  "status": "completed",
  "lane": {
    "id": "lane_a3f81c02",
    "agent": "codex",
    "surface": "task",
    "agentSessionId": "019f..."
  },
  "delivery": "confirmed",
  "nativeStatus": "completed",
  "semanticOutcome": "unknown",
  "result": { "text": "..." },
  "timing": { "wallMs": 6557, "startupMs": 2050 }
}`}
              lang="json"
            />
            <ul style={S.list}>
              <li>
                A command never exits 0 with <code>ok:false</code>.
              </li>
              <li>
                <code>usage</code> and <code>timing</code> cover one dispatch or resume turn, not lane history.
              </li>
              <li>
                Continuity proves session identity, not semantic compliance. Read <code>status</code> and{" "}
                <code>result.text</code>.
              </li>
              <li>stderr is diagnostic and non-contractual; stdout carries the handle and envelope.</li>
            </ul>
          </section>

          <section id="exit-codes" style={S.section}>
            <h2 style={S.h2}>Exit Codes</h2>
            <table style={S.table}>
              <tbody>
                <DocRow name="0">
                  Success, including <code>status:&quot;blocked&quot;</code>.
                </DocRow>
                <DocRow name="2">
                  <code>usage_error</code> — malformed command line.
                </DocRow>
                <DocRow name="3">
                  <code>agent_unavailable</code>, <code>adapter_error</code>, or <code>agent_failed</code>.
                </DocRow>
                <DocRow name="4">
                  <code>invalid_state</code>, <code>lane_not_found</code>, or <code>continuity_unverified</code>.
                </DocRow>
                <DocRow name="5">
                  <code>timeout</code> — the turn deadline was exceeded.
                </DocRow>
              </tbody>
            </table>
          </section>

          <section id="storage" style={S.section}>
            <h2 style={S.h2}>Durable State</h2>
            <p style={S.p}>
              Lane state lives under <code>${"${ORCA_HOME:-~/.orca}"}/lanes/&lt;laneId&gt;/</code>. Set
              <code> ORCA_HOME</code> to isolate tests and automation from personal history.
            </p>
            <CodeBlock
              code={`lane.json       # durable lane record
events.ndjson   # append-only evidence stream
answer.txt      # transient blocked-answer handoff`}
              lang="text"
            />
          </section>

          <section id="agent-skill" style={S.section}>
            <h2 style={S.h2}>Agent Skill</h2>
            <p style={S.p}>
              Give an agent a compact operator guide. It starts with live contract discovery and keeps routing,
              question, continuity, and task-surface caveats close to the commands.
            </p>
            <AgentSkillCard />
          </section>

          <footer
            style={{
              padding: "28px 0 48px",
              color: "#3f3f46",
              fontSize: "12px",
              fontFamily: "ui-monospace, monospace",
            }}
          >
            orcastrator · observable agent lanes · orca/v1
          </footer>
        </main>
      </div>
    </>
  );
}
