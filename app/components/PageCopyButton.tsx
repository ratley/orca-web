"use client";

import { useState } from "react";

export function PageCopyButton() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      const response = await fetch("/md");
      if (!response.ok) {
        throw new Error(
          `Failed to fetch Markdown reference: ${response.status}`,
        );
      }

      await navigator.clipboard.writeText(await response.text());
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // clipboard not available
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-end",
        padding: "14px 0 0",
      }}
    >
      <button
        type="button"
        onClick={handleCopy}
        title="Copy full CLI reference as Markdown (includes all install package managers)"
        style={{
          padding: "3px 10px",
          fontSize: "11px",
          fontFamily: "ui-monospace, monospace",
          background: copied ? "#166534" : "transparent",
          color: copied ? "#86efac" : "#52525b",
          border: "1px solid",
          borderColor: copied ? "#166534" : "#3f3f46",
          borderRadius: "4px",
          cursor: "pointer",
          transition: "all 0.15s",
          lineHeight: "1.6",
          letterSpacing: "0.04em",
        }}
      >
        {copied ? "✓ copied" : "copy page"}
      </button>
    </div>
  );
}
