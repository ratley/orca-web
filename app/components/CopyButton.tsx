"use client";

import { useState } from "react";

export function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // clipboard not available
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      title="Copy to clipboard"
      style={{
        position: "absolute",
        top: "10px",
        right: "10px",
        padding: "3px 8px",
        fontSize: "11px",
        fontFamily: "inherit",
        background: copied ? "#166534" : "#27272a",
        color: copied ? "#86efac" : "#71717a",
        border: "1px solid",
        borderColor: copied ? "#166534" : "#3f3f46",
        borderRadius: "4px",
        cursor: "pointer",
        transition: "all 0.15s",
        lineHeight: "1.4",
        letterSpacing: "0.02em",
      }}
    >
      {copied ? "copied" : "copy"}
    </button>
  );
}
