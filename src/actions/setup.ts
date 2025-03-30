import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { getPackageManager } from "../utils";

const cwd = process.cwd();

export const setup = (
  projectName: string,
  framework: string,
  variant: string,
) => {
  const destination = join(cwd, projectName);
  const origin = join(
    dirname(fileURLToPath(import.meta.url)),
    "templates",
    `${framework}`,
    `${variant}`,
  );

  const { name: pkgManager } = getPackageManager(
    process.env.npm_config_user_agent,
  ) || { name: "npm" };

  return { destination, origin, pkgManager };
};
