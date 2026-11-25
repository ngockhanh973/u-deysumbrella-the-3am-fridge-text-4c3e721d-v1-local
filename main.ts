import * as fs from "node:fs";
import * as path from "node:path";

// The fridge speaks at 3AM. One line, no more, no less.
const LINE = "Your leftovers from 2019 have outlived two phones, a relationship, and my warranty. Let them go.";

// A line only counts if you can actually see something in it.
function hasVisibleGlyph(text: string): boolean {
  for (const ch of text) {
    if (ch.trim().length > 0) {
      return true;
    }
  }
  return false;
}

// The bounty allows a single short line: at least one character,
// at most one hundred and forty, and never blank.
function checkFridgeLine(text: string): void {
  if (text.length < 1 || text.length > 140) {
    throw new Error(`line must be 1..140 chars, got ${text.length}`);
  }
  if (!hasVisibleGlyph(text)) {
    throw new Error("line must contain a visible character");
  }
}

// Where the entry lands: the kit's output folder when set,
// otherwise a plain out folder next to this file.
function entryPath(): string {
  const folder = process.env.MAKEFUN_OUTPUT_DIR ?? "out";
  return path.join(folder, "entry.txt");
}

function main(): void {
  checkFridgeLine(LINE);
  const target = entryPath();
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, LINE, "utf8");
}

main();
