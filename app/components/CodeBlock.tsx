import { CopyButton } from "./CopyButton";

interface CodeBlockProps {
  code: string;
  lang?: string;
}

export function CodeBlock({ code, lang }: CodeBlockProps) {
  return (
    <div
      style={{
        position: "relative",
        background: "#141414",
        border: "1px solid #2a2a2a",
        borderRadius: "6px",
        margin: "12px 0",
        overflowX: "auto",
      }}
    >
      {lang && (
        <span
          style={{
            position: "absolute",
            top: "10px",
            left: "14px",
            fontSize: "10px",
            color: "#52525b",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            fontFamily: "ui-monospace, monospace",
          }}
        >
          {lang}
        </span>
      )}
      <CopyButton text={code} />
      <pre
        style={{
          margin: 0,
          padding: lang ? "32px 14px 14px" : "14px",
          fontSize: "13px",
          lineHeight: "1.65",
          color: "#e2e8f0",
          overflowX: "auto",
          whiteSpace: "pre",
        }}
      >
        <code>{code}</code>
      </pre>
    </div>
  );
}
