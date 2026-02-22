import { CopyButton } from "./CopyButton";

interface CodeBlockProps {
  code: string;
  lang?: string;
}

const KEYWORDS = new Set([
  "import",
  "export",
  "default",
  "from",
  "const",
  "let",
  "var",
  "return",
  "async",
  "await",
  "type",
  "interface",
  "extends",
  "if",
  "else",
  "true",
  "false",
  "null",
]);

function tokenSpan(token: string, key: string, color: string) {
  return (
    <span key={key} style={{ color }}>
      {token}
    </span>
  );
}

function highlightInline(line: string, lang?: string): React.ReactNode[] {
  if (lang === "shell") {
    return [tokenSpan(line, `shell-${line.length}`, "#e2e8f0")];
  }

  const tokens = line
    .split(/(\s+|"[^"]*"|'[^']*'|`[^`]*`|\/\/.*$|[{}()[\];,.:=<>])/g)
    .filter(Boolean);

  const nodes: React.ReactNode[] = [];
  let cursor = 0;

  for (let i = 0; i < tokens.length; i += 1) {
    const token = tokens[i] ?? "";
    const trimmed = token.trim();
    const key = `${cursor}-${token}`;
    cursor += token.length;

    if (trimmed.startsWith("//") || trimmed.startsWith("#")) {
      nodes.push(tokenSpan(token, key, "#71717a"));
      continue;
    }

    if (lang === "json" && /^"[A-Za-z0-9_.$-]+"$/.test(trimmed)) {
      let nextNonWhitespace = "";
      for (let j = i + 1; j < tokens.length; j += 1) {
        const candidate = tokens[j]?.trim() ?? "";
        if (candidate.length > 0) {
          nextNonWhitespace = candidate;
          break;
        }
      }

      if (nextNonWhitespace === ":") {
        nodes.push(tokenSpan(token, key, "#f9a8d4"));
        continue;
      }
    }

    if (/^".*"$|^'.*'$|^`.*`$/.test(trimmed)) {
      nodes.push(tokenSpan(token, key, "#86efac"));
      continue;
    }

    if (KEYWORDS.has(trimmed)) {
      nodes.push(tokenSpan(token, key, "#7dd3fc"));
      continue;
    }

    if (/^[{}()[\];,.:=<>]$/.test(trimmed)) {
      nodes.push(tokenSpan(token, key, "#a1a1aa"));
      continue;
    }

    nodes.push(tokenSpan(token, key, "#e2e8f0"));
  }

  return nodes;
}

function highlightCode(code: string, lang?: string): React.ReactNode {
  const lines = code.split("\n");
  const nodes: React.ReactNode[] = [];
  let offset = 0;

  for (const line of lines) {
    nodes.push(
      <span key={`${offset}-${line}`} style={{ display: "block" }}>
        {highlightInline(line, lang)}
      </span>,
    );
    offset += line.length + 1;
  }

  return <>{nodes}</>;
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
        <code>{highlightCode(code, lang)}</code>
      </pre>
    </div>
  );
}
