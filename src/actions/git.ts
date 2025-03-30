import { confirm, isCancel, log, note } from "@clack/prompts";
import { shell } from "../utils";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { reset, dim } from "picocolors";

export const gitInit = async (destination: string) => {
  if (existsSync(join(destination, ".git"))) {
    note("Git has already been initialized", "Nice!");
    return { init: true };
  }

  const shoulInit = await confirm({
    message: "Do you want to initialize Git?",
  });
  if (isCancel(shoulInit)) return { init: false };

  if (!shoulInit) {
    log.info(`You can always run ${reset("git init")}${dim(" manually.")}`);
    return { init: false };
  }

  try {
    await shell("git", ["init"], { cwd: destination });
    await shell("git", ["add", "-A"], { cwd: destination });
    return { init: true };
  } catch {
    log.error(
      `Git failed to init. Please run ${reset("git init")} manually after setup.`,
    );
    return { init: false };
  }
};
