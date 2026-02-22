"use client";

import { useState } from "react";
import { CodeBlock } from "./CodeBlock";

const INSTALL_COMMANDS = {
  npm: "npm install -g orcastrator",
  pnpm: "pnpm add -g orcastrator",
  yarn: "yarn global add orcastrator",
  bun: "bun add -g orcastrator",
} as const;

type PackageManager = keyof typeof INSTALL_COMMANDS;

const PACKAGE_MANAGERS: PackageManager[] = ["npm", "pnpm", "yarn", "bun"];

export function InstallCommandSwitcher() {
  const [selected, setSelected] = useState<PackageManager>("npm");

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "6px",
        }}
      >
        <span
          style={{
            fontSize: "11px",
            color: "#52525b",
            fontFamily: "ui-monospace, monospace",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
          }}
        >
          Install
        </span>

        <div
          style={{
            display: "inline-flex",
            gap: "6px",
          }}
        >
          {PACKAGE_MANAGERS.map((manager) => {
            const isActive = selected === manager;

            return (
              <button
                key={manager}
                type="button"
                onClick={() => setSelected(manager)}
                style={{
                  border: "1px solid",
                  borderColor: isActive ? "#22d3ee" : "#3f3f46",
                  background: isActive ? "#082f49" : "transparent",
                  color: isActive ? "#67e8f9" : "#71717a",
                  borderRadius: "4px",
                  padding: "4px 8px",
                  fontSize: "11px",
                  lineHeight: "1.2",
                  fontFamily: "ui-monospace, monospace",
                  letterSpacing: "0.04em",
                  textTransform: "lowercase",
                  cursor: "pointer",
                }}
              >
                {manager}
              </button>
            );
          })}
        </div>
      </div>
      <CodeBlock code={INSTALL_COMMANDS[selected]} lang="shell" />
    </div>
  );
}
