import { cyan } from "picocolors";
import { log, outro } from "@clack/prompts";

export const nextSteps = (
  projectName: string,
  pkgManager: string,
  isGitInitialized: boolean,
  isDependenciesInstalled: boolean,
) => {
  const steps = [
    `🚀 Next steps:\n`,
    ` - Enter your project directory using:`,
    `   ${cyan(`cd ${projectName}`)}\n`,
  ];

  if (!isDependenciesInstalled) {
    steps.push(
      ` - Install dependencies with:`,
      `   ${cyan(`${pkgManager} install`)}\n`,
    );
  }

  steps.push(
    ` - Start the development server:`,
    `   ${cyan(`${pkgManager} run dev`)}\n`,
  );

  if (!isGitInitialized) {
    steps.push(
      ` - Initialize Git (optional):`,
      `   ${cyan(`git init && git add . && git commit -m "Initial commit"`)}`,
      `   or push your project to a remote repository.`,
    );
  }

  log.info(steps.join("\n"));
  outro(`🎉 Happy coding! ✨\n\n`);
};
