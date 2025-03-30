import { cancel as promptCancel, note as promptNote } from "@clack/prompts";

export const cancel = (note?: string) => {
  promptCancel("Operation cancelled.");
  note && promptNote(note, "Note:");
  console.log("Bye! 👋🏻\n\n");
  process.exit(0);
};
