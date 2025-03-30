import { log } from "@clack/prompts";
import { yellow } from "picocolors";
import { MESSAGES } from "../config";

const getRandomMessage = () => {
  return MESSAGES[Math.floor(Math.random() * MESSAGES.length)];
};

export const outro = (
  projectName: string,
  framework: string,
  variant: string,
) => {
  const { title, message } = getRandomMessage();
  log.success(
    [`${yellow(title)}`, `   ${message(projectName, framework, variant)}`].join(
      "\n",
    ),
  );
};
