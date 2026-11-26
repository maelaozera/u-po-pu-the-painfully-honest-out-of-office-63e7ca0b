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

// Join the segments into the single-sentence auto-reply.
const ENTRY_TEXT =
  SEGMENT_OPENING + SEGMENT_CONFESSION + SEGMENT_CLOSING;

// The gate allows 1 to 200 characters; keep the text inside it.
if (ENTRY_TEXT.length < 1 || ENTRY_TEXT.length > 200) {
  throw new Error(`entry length ${ENTRY_TEXT.length} outside 1..200`);
}
if (ENTRY_TEXT.trim().length === 0) {
  throw new Error("entry must not be only white space");
}

// Write the entry exactly as assembled, no trailing newline.
mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", ENTRY_TEXT, "utf8");
