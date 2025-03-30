import type { Framework, FrameworkVariant } from "../models";

export const print = ({ color, label }: Framework | FrameworkVariant) =>
  color ? color(label) : label;
