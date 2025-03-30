#!/usr/bin/env node

import * as p from "@clack/prompts";
import { setTimeout } from "node:timers/promises";
import { args } from "./utils";
import {
  template,
  projectName,
  handleExistingDirectory,
  setup,
  createProject,
  gitInit,
  installDependencies,
  outro,
  nextSteps,
} from "./actions";

// TODO:
// - replace package.json commands with pkgManager "<manager> run dev", etc.
// - Create tokens inside templates to replace: name and package

async function main() {
  console.clear();
  await setTimeout(1000);
  const { name: nameArg, template: templateArg } = await args(process.argv)
    .argv;

  p.intro(`📂 create-zome Λ`);

  // 1. Project name
  const { name } = await projectName(nameArg);

  // 1.1. Check if the directory exists
  await handleExistingDirectory(name);

  // 2. Get template: Framework and Variant
  const { framework, variant } = await template(templateArg);

  // 3. Select Extras (Coming soon...)

  // 4. Setup Project
  const { destination, origin, pkgManager } = setup(name, framework, variant);

  // 5. Create Project
  await createProject(origin, destination);

  // 6. Initialize git?
  const { init } = await gitInit(destination);

  // 7. Install dependencies?
  const { installedDependencies } = await installDependencies(
    destination,
    pkgManager,
  );

  // Outro
  outro(name, framework, variant);

  // Next steps
  nextSteps(name, pkgManager, init, installedDependencies);

  process.exit(0);
}

// Run the main function
main().catch(console.error);
