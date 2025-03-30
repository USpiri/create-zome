import { existsSync } from "fs";
import { cancel, clearDir, isEmpty } from "../utils";
import { isCancel, select } from "@clack/prompts";

export const handleExistingDirectory = async (dir: string) => {
  if (!existsSync(dir) || isEmpty(dir)) return;

  const overwrite = await select({
    message: `Project directory "${dir}/" is not empty. Please choose how to proceed:`,
    options: [
      { label: "Overwrite", value: "overwrite" },
      { label: "Cancel", value: "cancel" },
      { label: "Ignore", value: "ignore" },
    ],
  });

  if (isCancel(overwrite))
    cancel("Please make sure the directory is empty or does not exist.");

  if (overwrite === "overwrite") {
    clearDir(dir);
  } else if (overwrite === "cancel") {
    cancel("Please make sure the directory is empty or does not exist.");
  }

  return { overwrite };
};
