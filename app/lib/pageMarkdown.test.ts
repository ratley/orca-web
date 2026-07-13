import { expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import { join } from "node:path";

import { PAGE_MARKDOWN } from "./pageMarkdown";

const ROOT = join(import.meta.dir, "..", "..");
const ORCA_REFERENCE_PATH = join(ROOT, "ORCA_REFERENCE.md");

test("documents the canonical lane contract and task surface", () => {
  expect(PAGE_MARKDOWN).toContain("versioned `orca/v1` contract");
  expect(PAGE_MARKDOWN).toContain("orca dispatch --agent <agent> [--surface lane|task]");
  expect(PAGE_MARKDOWN).toContain("--surface task");
  expect(PAGE_MARKDOWN).toContain("does not create a Codex Desktop-managed project");
  expect(PAGE_MARKDOWN).toContain("`continuity_unverified` (exit 4)");
  expect(PAGE_MARKDOWN).toContain('Success, including `status:"blocked"`');
});

test("does not present the legacy graph runner as canonical", () => {
  expect(PAGE_MARKDOWN).not.toContain("Breaks down a task into a graph");
  expect(PAGE_MARKDOWN).not.toContain("Usage: orca run");
  expect(PAGE_MARKDOWN).not.toContain("planner.router");
  expect(PAGE_MARKDOWN).not.toContain("executor?:");
});

test("matches the checked-in Markdown reference", () => {
  expect(PAGE_MARKDOWN).toBe(readFileSync(ORCA_REFERENCE_PATH, "utf8"));
});
