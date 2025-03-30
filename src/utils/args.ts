import { blue, green, bold } from "picocolors";
import yargs from "yargs";
import { getValidTemplates } from "./template";

const description = `
${green("Welcome to create Zome Λ")}

${blue("Usage:")} create-zome [options]

Create a new project in TypeScript.
With no arguments, start the CLI in interactive mode.
`;

const templates = [
  bold("Available templates: \n"),
  ...getValidTemplates().map(
    ({ color, template, variant, frameworK }) =>
      `${color ? color(template) : template}          ${frameworK} + ${variant}`,
  ),
  "-\n",
].join("\n");

export const args = (args: string[]) =>
  yargs(args)
    .options({
      name: {
        alias: "n",
        type: "string",
        describe: "Name of the project",
      },
      template: {
        alias: "t",
        type: "string",
        describe: "Template to use",
      },
    })
    .usage(description)
    .epilog(templates)
    .version("1.0.0");
