import { Formatter } from "picocolors/types";

export type FrameworkVariant = {
  value: string;
  label: string;
  color?: Formatter;
};

export type Framework = {
  value: string;
  label: string;
  color?: Formatter;
  variants: FrameworkVariant[];
};
