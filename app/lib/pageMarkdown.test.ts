import { expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { PAGE_MARKDOWN } from "./pageMarkdown";

const ROOT = join(import.meta.dir, "..", "..");
const ORCA_REFERENCE_PATH = join(ROOT, "ORCA_REFERENCE.md");

test("uses canonical codex effort values and thinkingLevel naming", () => {
  expect(PAGE_MARKDOWN).toContain("--codex-effort <low|medium|high|xhigh>");
  expect(PAGE_MARKDOWN).toContain(
    "codex.thinkingLevel.decision|planning|execution",
  );
  expect(PAGE_MARKDOWN).not.toContain("extra-high");
  expect(PAGE_MARKDOWN).not.toContain("codex.thinking:");
});

test("documents planning-necessity gate and skills/list cwd behavior", () => {
  expect(PAGE_MARKDOWN).toContain("planning-necessity decision (`needsPlan?`)");
  expect(PAGE_MARKDOWN).toContain("skills/list");
  expect(PAGE_MARKDOWN).toContain("cwds: [cwd]");
  expect(PAGE_MARKDOWN).toContain("forceReload: true");
});

test("ORCA_REFERENCE.md stays aligned with PAGE_MARKDOWN semantics", () => {
  const reference = readFileSync(ORCA_REFERENCE_PATH, "utf8");
  expect(reference).toContain("--codex-effort <low|medium|high|xhigh>");
  expect(reference).toContain(
    "codex.thinkingLevel.decision|planning|execution",
  );
  expect(reference).toContain("skills/list");
  expect(reference).toContain("cwds: [cwd]");
  expect(reference).not.toContain("extra-high");
});
