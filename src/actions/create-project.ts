import { spinner as spinnerP } from "@clack/prompts";
import { cp, mkdir, rename } from "fs/promises";
import { glob } from "glob";
import path from "path";

export const createProject = async (origin: string, destination: string) => {
  const spinner = spinnerP();
  spinner.start("Creating project");

  // Create project folder
  await mkdir(destination, { recursive: true });

  // Copy template
  await cp(origin, destination, { recursive: true });

  //Rename _gitignore and other files
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
};
