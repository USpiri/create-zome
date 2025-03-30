import { spawn, StdioOptions } from "node:child_process";

export interface ShellOptions {
  cwd?: string | URL;
  stdio?: StdioOptions;
  timeout?: number;
}

export const shell = async (
  command: string,
  flags: string[],
  opts: ShellOptions,
) => {
  return new Promise((resolve, reject) => {
    console.log(command, flags, opts);

    const child = spawn(command, flags, {
      cwd: opts.cwd,
      shell: true,
      stdio: opts?.stdio ?? "ignore",
      timeout: opts.timeout,
    });

    let stdout = "";
    let stderr = "";

    if (child.stdout) {
      child.stdout.on("data", (data) => {
        stdout += data.toString();
      });
    }

    if (child.stderr) {
      child.stderr.on("data", (data) => {
        stderr += data.toString();
      });
    }

    child.on("error", (error) => {
      reject(new Error(`Error executing command: ${error.message}`));
    });

    child.on("close", (exitCode) => {
      if (exitCode === 0) {
        resolve({ stdout, stderr, exitCode });
      } else {
        reject(
          new Error(
            `Process ended with code: ${exitCode}\nSTDOUT: ${stdout}\nSTDERR: ${stderr}`,
          ),
        );
      }
    });
  });
};
