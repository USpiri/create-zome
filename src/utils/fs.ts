import fs from "node:fs";
import path from "node:path";

export function isEmpty(path: string) {
  const files = fs.readdirSync(path);
  return files.length === 0 || (files.length === 1 && files[0] === ".git");
}

export function clearDir(dir: string) {
  if (!fs.existsSync(dir)) return;
  for (const file of fs.readdirSync(dir)) {
    if (file === ".git") continue;
    fs.rmSync(path.resolve(dir, file), { recursive: true, force: true });
  }
}

export function formatDir(targetDir: string) {
  return targetDir.trim().replace(/\/+$/g, "");
}
