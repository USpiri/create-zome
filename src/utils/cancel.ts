import {
  cancel as promptCancel,
  note as promptNote,
  log,
} from "@clack/prompts";

export const cancel = (note?: string) => {
  promptCancel("Operation cancelled.");
  note && promptNote(note, "Note:");
  log.message("Bye! 👋🏻\n");
  process.exit(0);
};
