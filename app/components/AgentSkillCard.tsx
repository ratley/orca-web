"use client";

import { CopyButton } from "./CopyButton";

export const SKILL_MD = `---
name: orca
description: "Orchestrate multi-step AI coding tasks via the Orca CLI. Use when: running multi-file code changes, spawning background agents, planning and executing complex tasks end-to-end. NOT for: simple single-file edits, reading code."
---

# Orca

Orca (orcastrator) is a CLI that breaks a task into a graph of tasks and executes it end-to-end via Codex or Claude.

## Install
npm install -g orcastrator

## Run a Task
orca "your task here"

## Key Commands
orca <task>              Start a new run
orca status [--last]     Check run status
orca answer <text>       Answer a question the agent raised
orca resume [--last]     Resume a paused run
orca cancel [--last]     Cancel a run
orca pr create [--last]  Open a PR for the run's branch

## Config (~/.orca/config.js or ./orca.config.js)
export default {
  executor: "codex",           // "codex" (default) or "claude"
  sessionLogs: "./session-logs",
  hooks: {
    onComplete: "your-notify-command",
    onError: "your-error-command",
  },
  codex: { multiAgent: false },
}

## Notes
- Codex executor requires ~/.codex/auth.json
- Must be run inside a git repo
- Run ID format: <adjective>-<noun>-<timestamp>
- Use orca answer to unblock a waiting run`;

export function AgentSkillCard({ compact = false }: { compact?: boolean }) {
  return (
    <div
      style={{
        marginTop: "24px",
        border: "1px solid #2a2a2a",
        borderRadius: "6px",
        background: "#0d0d0d",
        overflow: "hidden",
      }}
    >
      {/* Header row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "7px 10px",
          borderBottom: "1px solid #1e1e1e",
          background: "#111",
        }}
      >
        <span
          style={{
            fontSize: "10px",
            fontFamily: "ui-monospace, monospace",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "#52525b",
            fontWeight: 600,
          }}
        >
          Agent Skill
        </span>
        <span
          style={{
            fontSize: "10px",
            fontFamily: "ui-monospace, monospace",
            color: "#3f3f46",
            letterSpacing: "0.04em",
          }}
        >
          SKILL.md
        </span>
      </div>

      {/* Content */}
      <div style={{ position: "relative" }}>
        <CopyButton text={SKILL_MD} />
        <pre
          style={{
            margin: 0,
            padding: compact ? "10px 40px 10px 10px" : "12px 44px 12px 12px",
            fontSize: "10.5px",
            lineHeight: "1.6",
            color: "#6b7280",
            overflowX: "auto",
            whiteSpace: "pre",
            fontFamily: "ui-monospace, monospace",
            maxHeight: compact ? "260px" : "none",
            overflowY: compact ? "auto" : "visible",
          }}
        >
          {SKILL_MD}
        </pre>
      </div>
    </div>
  );
}
