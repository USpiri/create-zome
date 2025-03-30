export type Message = {
  title: string;
  message: (name: string, framework: string, variant: string) => string;
};
