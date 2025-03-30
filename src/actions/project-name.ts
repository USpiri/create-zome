import { isCancel, text } from "@clack/prompts";
import { DEFAULT_PROJECT_NAME } from "../config";
import { cancel } from "../utils";

export const projectName = async (initialValue?: string) => {
  if (initialValue) return { name: initialValue };

  const namePrompt = await text({
    message: "Project name:",
    defaultValue: DEFAULT_PROJECT_NAME,
    placeholder: DEFAULT_PROJECT_NAME,
    validate,
  });
  if (isCancel(namePrompt)) return cancel();

  return { name: namePrompt };
};

const validate = (value: string) => {
  if (value.match(/[^a-zA-Z0-9-_]+/g))
    return "Project name can only contain letters, numbers, dashes and underscores";

  if (value.length === 0) return "You must provide a project name";
};
