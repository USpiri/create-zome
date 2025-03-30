import { Message } from "../models";

export const DEFAULT_PROJECT_NAME = "zome-project";

export const MESSAGES: Message[] = [
  {
    title: "🚀 Boom!",
    message: (name, framework) =>
      `${name} with ${framework} is ready to take off!`,
  },
  {
    title: "🎨 A fresh new canvas!",
    message: (name, framework, variant) =>
      `${name} is set up with ${framework} + ${variant}!`,
  },
  {
    title: "🏗️ Built and ready!",
    message: () => `Time to craft something aweZome!`,
  },
  {
    title: "🔥 It’s alive!",
    message: (name, framework) =>
      `${name} is now breathing with ${framework}! Go build something aweZome!`,
  },
  {
    title: "🏆 Victory!",
    message: (name, framework) =>
      `${name} (powered by ${framework}) has joined your collection!`,
  },
  {
    title: "🌍 One giant leap!",
    message: (name) => `One small step for you, one giant leap for ${name}!`,
  },
  {
    title: "📦 Unpacked & ready!",
    message: (name, framework, variant) =>
      `Your ${framework} project, ${name}, is set up with ${variant}.`,
  },
  {
    title: "✨ Magic has happened!",
    message: (name) => `Your new project ${name} is conjured successfully!`,
  },
  { title: "✨ AweZome!", message: (name) => `You just created ${name}` },
  { title: "💪🏻Great Job!", message: (name) => `"${name}" is ready!` },
  {
    title: "🚀 Boom!",
    message: () => `Your project is ready to go!`,
  },
  { title: "🎉 Congratulations!", message: () => "A new project is ready" },
  {
    title: "📩 Victory!",
    message: (name) => `${name} has joined your collection!`,
  },
  {
    title: "🔥 It’s alive!",
    message: () => `Your codebase is now breathing and waiting for action.`,
  },
  {
    title: "📦 Unpacked & ready!",
    message: () => `Now let’s build something great.`,
  },
  { title: "△ Lest ship!", message: () => "Get into Founder Mode" },
];
