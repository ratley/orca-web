import { describe, expect, test } from "bun:test";

import { getActiveSectionId } from "./docsNavigation";

const sections = [
  { id: "get-started", top: -400 },
  { id: "mental-model", top: -40 },
  { id: "surfaces", top: 420 },
];

describe("getActiveSectionId", () => {
  test("defaults to the first section before any section crosses the anchor", () => {
    expect(
      getActiveSectionId(
        [
          { id: "get-started", top: 240 },
          { id: "mental-model", top: 640 },
        ],
        64,
      ),
    ).toBe("get-started");
  });

  test("returns the last section that crossed the scroll anchor", () => {
    expect(getActiveSectionId(sections, 64)).toBe("mental-model");
  });

  test("activates the final section at the bottom of the page", () => {
    expect(getActiveSectionId(sections, 64, true)).toBe("surfaces");
  });

  test("handles a page with no navigable sections", () => {
    expect(getActiveSectionId([], 64)).toBe("");
  });
});
