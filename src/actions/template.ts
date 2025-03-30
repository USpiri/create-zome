import { isCancel, select } from "@clack/prompts";
import { FRAMEWORKS } from "../config";
import { cancel, print } from "../utils";

export const template = async (initialValue?: string) => {
  if (initialValue) {
    const [framework, variant] = initialValue.split("-");
    return { framework, variant, value: initialValue };
  }

  // 2.1 Framework
  const frameworkPrompt = await select({
    message: "Choose a framework:",
    options: FRAMEWORKS.map((f) => {
      return {
        label: print(f),
        value: f,
      };
    }),
  });
  if (isCancel(frameworkPrompt)) return cancel();

  // 2.2 Variant
  const variantPrompt = await select({
    message: "Select a variant:",
    options: frameworkPrompt.variants.map((v) => {
      return {
        label: print(v),
        value: v,
      };
    }),
  });
  if (isCancel(variantPrompt)) return cancel();

  const value = `${frameworkPrompt.value}-${variantPrompt.value}`;

  return {
    framework: frameworkPrompt.value,
    variant: variantPrompt.value,
    value,
  };
};
