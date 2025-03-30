import { isCancel, log, text } from "@clack/prompts";
import { DEFAULT_PROJECT_NAME } from "../config";
import { cancel } from "../utils";

export const projectName = async (initialValue?: string) => {
  const grammarCheck = validateGrammar(initialValue);
  if (initialValue && grammarCheck) return { name: initialValue };

  const shouldShowMessage = initialValue && !grammarCheck;
  if (shouldShowMessage) log.warn(`Invalid project name "${initialValue}"`);

  const namePrompt = await text({
    message: !shouldShowMessage
      ? "Project name:"
      : "Provide a valid name for your project:",
    defaultValue: initialValue ?? DEFAULT_PROJECT_NAME,
    placeholder: initialValue ?? DEFAULT_PROJECT_NAME,
    validate,
  });
  if (isCancel(namePrompt)) return cancel();

  return { name: namePrompt };
};

const validate = (value: string) => {
  if (!validateGrammar(value))
    return "Project name can only contain letters, numbers, dashes and underscores";

  if (value.length === 0) return "You must provide a project name";
};

const validateGrammar = (value?: string) =>
  !!value && /^[a-zA-Z0-9-_]+$/.test(value);
