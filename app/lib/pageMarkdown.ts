import { readFileSync } from "node:fs";
import { join } from "node:path";

export const PAGE_MARKDOWN = readFileSync(
  join(process.cwd(), "ORCA_REFERENCE.md"),
  "utf8",
);
