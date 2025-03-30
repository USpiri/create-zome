import type { Framework } from "../models";
import { blue, cyan, magenta } from "picocolors";

export const FRAMEWORKS: Framework[] = [
  {
    value: "react",
    label: "React",
    color: cyan,
    variants: [{ label: "Typescript", value: "ts", color: blue }],
  },
  { value: "next", label: "Next.js", color: magenta, variants: [] },
];
