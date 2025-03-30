import { confirm, isCancel, log, spinner } from "@clack/prompts";
import { shell } from "../utils";
import { bold } from "picocolors";

export const installDependencies = async (
  destination: string,
  pkgManager: string,
) => {
  const shouldInstall = await confirm({
    message: "Do you want to install dependencies?",
  });
  if (isCancel(installDependencies)) return { installedDependencies: false };

  if (!shouldInstall) {
    log.info("Remember to install dependencies after setup.");
    return { installedDependencies: false };
  }

  const spin = spinner();
  spin.start("Installing Dependencies");
  try {
    await shell(pkgManager, ["install"], {
      cwd: destination,
      timeout: 90000,
    }).then(() => spin.stop());
    return { installedDependencies: true };
  } catch (error) {
    log.error(
      `Dependencies failed to install, please run ${bold(
        pkgManager + " install",
      )} to install them manually after setup.`,
    );
    spin.stop();
    return { installedDependencies: false };
  }
};
