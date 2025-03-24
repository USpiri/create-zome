import * as p from "@clack/prompts";
import fs from "node:fs";
import { setTimeout } from "node:timers/promises";
import { clearDir, formatDir, isEmpty } from "@/utils/fs";

const defaultProjectName = "zome-project";
const cancel = (note?: string) => {
  p.cancel("Operation cancelled.");
  note && p.note(note, "Note:");
  p.log.message("Bye! 👋🏻\n");
  process.exit(0);
};

async function main() {
  console.clear();
  await setTimeout(1000);

  p.intro(`📂 create-zome Λ`);

  // 1. Project name
  const projectName = await p.text({
    message: "Project name:",
    defaultValue: defaultProjectName,
    placeholder: defaultProjectName,
    validate: (value) => {
      if (value.match(/[^a-zA-Z0-9-_]+/g))
        return "Project name can only contain letters, numbers, dashes and underscores";
    },
  });
  if (p.isCancel(projectName)) return cancel();
  const projectPath = formatDir(projectName as string);

  // 1.1. Check if the directory exists
  if (fs.existsSync(projectPath) && !isEmpty(projectPath)) {
    const overwrite = await p.select({
      message:
        `Target directory "${projectPath}"` +
        ` is not empty. Please choose how to proceed:`,
      options: [
        { label: "Overwrite", value: "yes" },
        { label: "Cancel", value: "no" },
        { label: "Ignore", value: "ignore" },
      ],
    });
    if (p.isCancel(overwrite))
      return cancel(
        "Please make sure the directory is empty or does not exist.",
      );

    switch (overwrite) {
      case "yes":
        clearDir(projectPath);
        break;
      case "no":
        cancel("Please make sure the directory is empty or does not exist.");
        break;
    }
  }

  // 2. Get template folder
  const framework = await p.select({
    message: "Choose a framework:",
    options: [
      { value: "react", label: "React (Vite)" },
      // { value: "angular", label: "Angular" },
      // { value: "next", label: "Next.js" },
      // { value: "tauri", label: "Tauri" },
      // { value: "ts", label: "Vanilla TS" },
    ],
  });

  // 3. Get flavor
  // 4. Copy files from the template folder to the current directory

  console.log({ name: projectName, path: projectPath, framework });
}

// Run the main function
main().catch(console.error);
