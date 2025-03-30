#!/usr/bin/env node

import * as p from "@clack/prompts";
import { glob } from "glob";
import fs from "node:fs";
import { cp, mkdir, rename } from "node:fs/promises";
import path from "node:path";
import { setTimeout } from "node:timers/promises";
import { fileURLToPath } from "node:url";
import { yellow } from "picocolors";
import {
  args,
  clearDir,
  formatDir,
  getPackageManager,
  isEmpty,
  shell,
  cancel,
  print,
} from "./utils";
import { Framework, FrameworkVariant } from "./models";
import { DEFAULT_PROJECT_NAME, FRAMEWORKS } from "./config";

const cwd = process.cwd();

// TODO:
// - replace package.json with pkgManager
// - Create tokens inside templates to replace: name and package
// - If template and name exists, there is no template or variant
// These values can be obtained by filtering FRAMEWORKS and its variants
// spliting <framework.value>-<variant.value>

async function main() {
  console.clear();
  // await setTimeout(1000);
  const { name, template } = await args(process.argv).argv;

  p.intro(`📂 create-zome Λ`);

  // 1. Project name
  let projectName = name;
  if (!projectName) {
    const projectNamePrompt = await p.text({
      message: "Project name:",
      defaultValue: DEFAULT_PROJECT_NAME,
      placeholder: DEFAULT_PROJECT_NAME,
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
  const destination = path.join(cwd, projectPath);
  const templatePath = path.join(
    path.dirname(fileURLToPath(import.meta.url)),
    "templates",
    `${framework?.value}`,
    `${variant?.value}`,
  );

  const spinner = p.spinner();
  spinner.start("Creating project");

  await mkdir(destination, { recursive: true });
  await cp(templatePath, destination, { recursive: true });
  let files = await glob(`**/*`, {
    nodir: true,
    cwd: destination,
    absolute: true,
  });

  for await (const file of files) {
    const basename = path.basename(file);
    if (basename.startsWith("_")) {
      const newPath = path.join(path.dirname(file), basename.replace("_", "."));
      await rename(file, newPath);
    }
  }

  spinner.stop("Project created!");

  // 6. Initialize git?
  let initializeGit = await p.confirm({
    message: "Do you want to initialize Git?",
  });
  if (p.isCancel(initializeGit)) initializeGit = false;
  if (initializeGit) {
    await shell("git", ["init"], { cwd: destination });
    await shell("git", ["add", "-A"], { cwd: destination });
  }

  // 7. Install dependencies?
  let installDependencies = await p.confirm({
    message: "Do you want to install dependencies?",
  });
  if (p.isCancel(installDependencies)) installDependencies = false;

  const pkgInfo = getPackageManager(process.env.npm_config_user_agent);
  const pkgManager = pkgInfo ? pkgInfo.name : "npm";
  if (installDependencies) {
    try {
      await shell(pkgManager, ["install"], {
        cwd: destination,
        timeout: 90000,
      });
    } catch (error) {
      console.log(error);
    }
  }

  p.outro(
    `${yellow("Awesome!")}\n You create ${projectName} in ${projectPath}`,
  );
  process.exit(0);
}

// Run the main function
main().catch(console.error);
