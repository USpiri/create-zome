import { FRAMEWORKS } from "../config";

export const getValidTemplates = () => {
  return FRAMEWORKS.flatMap((framework) => {
    const {
      variants,
      color,
      label: frameworkLabel,
      value: frameworkValue,
    } = framework;

    return variants.map(({ label, value }) => ({
      frameworK: frameworkLabel,
      variant: label,
      color,
      template: `${frameworkValue}-${value}`,
    }));
  });
};

export const getValidTemplatesStrings = () =>
  getValidTemplates().map((i) => i.template);

export const validateTemplate = (template: string) =>
  getValidTemplatesStrings().includes(template);
