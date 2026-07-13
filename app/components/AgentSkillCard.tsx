"use client";

import { CopyButton } from "./CopyButton";

export const SKILL_MD = `---
name: orca
description: "Dispatch and manage Codex, Claude, or Cursor lanes through Orca's machine-readable contract."
---

# Orca

Orca is an observable agent-lane harness. It does not plan or route work for you.

## First use
orca contract
orca agents

Trust the live contract and manifests over remembered CLI behavior.

## Dispatch
# Internal worker lane
orca dispatch --agent codex --cwd /path/to/repo --timeout 600000 "<brief>"

# Named, user-followable Codex task
orca dispatch --agent codex --surface task --label "HAPPY-123 — Fix API" --cwd /path/to/worktree "<brief>"

## Manage
orca inspect <laneId> [--follow] [--since <seq>] [--wait-for blocked|done]
orca answer <laneId> "<answer>"
orca resume <laneId> --timeout 600000 "<follow-up>"
orca lanes
orca kill <laneId>

## Contract rules
- Every lane verb ends with exactly one JSON envelope on stdout.
- dispatch prints a handle line first.
- status blocked is successful (exit 0); inspect the envelope status.
- Read status and result.text; continuity alone does not prove task success.
- --surface task names a durable Codex thread but does not provision a Desktop worktree.
- Persistent lane threads can also appear in Codex Desktop; surface is not a visibility filter.`;

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
