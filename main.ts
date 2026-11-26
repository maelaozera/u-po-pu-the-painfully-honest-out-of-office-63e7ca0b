import { mkdirSync, writeFileSync } from "node:fs";

// The Painfully Honest Out-of-Office — one auto-reply, one sentence.
// Built from short labelled segments so every line stays readable
// and the final text is assembled deterministically, byte for byte.
const SEGMENT_OPENING =
  "I'm away this week, honestly hiding from an inbox ";
const SEGMENT_CONFESSION =
  "that grew faster than I could answer it, and I'll reply ";
const SEGMENT_CLOSING =
  "properly when I'm back — thank you for understanding.";

// Assemble the labelled segments into the single-sentence auto-reply.
function buildEntry(): string {
  const segments = [SEGMENT_OPENING, SEGMENT_CONFESSION, SEGMENT_CLOSING];
  return segments.join("");
}

// The gate allows 1 to 200 characters; keep the text inside it.
const MAX_ENTRY_CHARS = 200;
const MIN_ENTRY_CHARS = 1;

// A valid entry is 1..200 characters long and not only whitespace.
function validateLine(text: string): void {
  if (text.length < MIN_ENTRY_CHARS || text.length > MAX_ENTRY_CHARS) {
    throw new Error(`entry length ${text.length} outside 1..200`);
  }
  if (text.trim().length === 0) {
    throw new Error("entry must not be only white space");
  }
  // Exactly one sentence: a single run of text ending in one terminator.
  const sentences = text.trim().split(/[.!?]/).filter(Boolean);
  if (sentences.length !== 1) {
    throw new Error("entry must be exactly one sentence");
  }
}

const ENTRY_TEXT = buildEntry();
validateLine(ENTRY_TEXT);

// Write the entry exactly as assembled, no trailing newline.
mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", ENTRY_TEXT, "utf8");
