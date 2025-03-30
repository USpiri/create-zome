import { cyan, blue, green } from "picocolors";
import yargs from "yargs";

const description = `
${green("Welcome to create Zome Λ")}

${blue("Usage:")} create-zome [options]

Create a new project in TypeScript.
With no arguments, start the CLI in interactive mode.
`;

const templates = `
Available templates:

${cyan("react-ts")}          React + Typescript
\n
`;

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
