#!/usr/bin/env node

import * as p from "@clack/prompts";
import fs from "node:fs";
import { setTimeout } from "node:timers/promises";
import { blue, cyan, magenta, yellow } from "picocolors";
import { Formatter } from "picocolors/types";
import { clearDir, formatDir, isEmpty, args } from "./utils";
import path from "node:path";
import { fileURLToPath } from "node:url";

const defaultProjectName = "zome-project";
const cwd = process.cwd();
const cancel = (note?: string) => {
  p.cancel("Operation cancelled.");
  note && p.note(note, "Note:");
  p.log.message("Bye! 👋🏻\n");
  process.exit(0);
};

type FrameworkVariant = {
  value: string;
  label: string;
  color?: Formatter;
};

type Framework = {
  value: string;
  label: string;
  color?: Formatter;
  variants: FrameworkVariant[];
};

const print = ({ color, label }: Framework | FrameworkVariant) =>
  color ? color(label) : label;

const FRAMEWORKS: Framework[] = [
  {
    value: "react",
    label: "React",
    color: cyan,
    variants: [{ label: "Typescript", value: "ts", color: blue }],
  },
  { value: "next", label: "Next.js", color: magenta, variants: [] },
];

async function main() {
  console.clear();
  await setTimeout(1000);
  const { name, template } = await args(process.argv).argv;

  p.intro(`📂 create-zome Λ`);

  // 1. Project name
  let projectName = name;
  if (!projectName) {
    const projectNamePrompt = await p.text({
      message: "Project name:",
      defaultValue: defaultProjectName,
      placeholder: defaultProjectName,
      validate: (value: string) => {
        if (value.match(/[^a-zA-Z0-9-_]+/g))
          return "Project name can only contain letters, numbers, dashes and underscores";

        if (value.length === 0) return "You must provide a project name";
      },
    });
    if (p.isCancel(projectNamePrompt)) return cancel();
    projectName = projectNamePrompt;
  }
  const projectPath = formatDir(projectName);

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
  let projectTemplate = template;
  let framework: Framework | undefined;
  let variant: FrameworkVariant | undefined;

  if (!projectTemplate) {
    const frameworkPrompt = await p.select({
      message: "Choose a framework:",
      options: FRAMEWORKS.map((f) => {
        return {
          label: print(f),
          value: f,
        };
      }),
    });
    if (p.isCancel(frameworkPrompt)) return cancel();

    // 3. Get variant
    const variantPrompt = await p.select({
      message: "Select a variant:",
      options: frameworkPrompt.variants.map((v: FrameworkVariant) => {
        return {
          label: print(v),
          value: v,
        };
      }),
    });
    if (p.isCancel(variantPrompt)) return cancel();

    framework = frameworkPrompt;
    variant = variantPrompt;
    projectTemplate = `${framework.value}-${variant.value}`;
  }

  // 4. Select Extras (Coming soon...)
  // 5. Setup Project
  // const templatePath = path.join(process.env.url!);

  const destination = path.join(cwd, projectPath);
  const templatePath = path.resolve(
    fileURLToPath(import.meta.url),
    "templates",
    `${framework?.value}`,
    `${variant?.value}`,
  );

  console.log(destination, templatePath);

  // 6. Initialize git?
  let initializeGit = await p.confirm({
    message: "Do you want to initialize Git?",
  });
  if (p.isCancel(initializeGit)) initializeGit = false;

  // 7. Install dependencies?
  let installDependencies = await p.confirm({
    message: "Do you want to install dependencies?",
  });
  if (p.isCancel(installDependencies)) installDependencies = false;

  // TODO:
  // - If template and name exists, there is no template or variant
  // These values can be obtained by filtering FRAMEWORKS and its variants
  // spliting <framework.value>-<variant.value>

  p.outro(
    `${yellow("Awesome!")}\n You create ${projectName} in ${projectPath}`,
  );
  // console.log(projectPath);
  // console.log(initializeGit);
  // console.log(installDependencies);
  process.exit(0);
}

// Run the main function
main().catch(console.error);
