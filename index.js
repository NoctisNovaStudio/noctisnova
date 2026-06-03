#!/usr/bin/env node

import * as p from "@clack/prompts";
import chalk from "chalk";
import { execSync } from "node:child_process";
import { parseArgs } from "node:util";

const VERSION = "1.0.0";

const TOOLS = [
  {
    value: "dead-doctor",
    label: chalk.yellow.bold("dead-doctor"),
    hint: "finds dead files, unused exports, zombie deps, commented blocks",
  },
  {
    value: "auth-doctor",
    label: chalk.red.bold("auth-doctor"),
    hint: "detects auth vulnerabilities, unprotected routes, exposed secrets",
  },
  {
    value: "orm-doctor",
    label: chalk.cyan.bold("orm-doctor"),
    hint: "spots N+1 queries, missing indexes, unsafe raw SQL, unbounded queries",
  },
  {
    value: "neat-doctor",
    label: chalk.green.bold("neat-doctor"),
    hint: "analyses code structure, circular deps, god files, deep imports",
  },
];

function parseCLIArgs() {
  let parsed;
  try {
    parsed = parseArgs({
      allowPositionals: true,
      options: {
        version: { type: "boolean", short: "v", default: false },
        help:    { type: "boolean", short: "h", default: false },
      },
    });
  } catch (err) {
    console.error(chalk.red(`Error: ${err.message}`));
    process.exit(1);
  }
  return parsed;
}

async function main() {
  const parsed = parseCLIArgs();

  if (parsed.values.version) {
    console.log(`noctisnova v${VERSION}`);
    process.exit(0);
  }

  if (parsed.values.help) {
    console.log(`
${chalk.bold("noctisnova")}  v${VERSION}
The NoctisNova CLI suite.
Built by NoctisNova — noctisnova.com

${chalk.bold("Usage")}
  noctisnova [tool] [options]

${chalk.bold("Tools")}
  dead-doctor   Dead code detector
  auth-doctor   Auth & security analyser
  orm-doctor    ORM & database bottleneck detector
  neat-doctor   Code structure analyser

${chalk.bold("Examples")}
  noctisnova
  noctisnova dead-doctor ./my-app
  noctisnova auth-doctor --json
`.trim());
    process.exit(0);
  }

  // If a tool name was passed as first positional, forward straight to it
  const forwardTool = parsed.positionals[0];
  if (forwardTool) {
    const match = TOOLS.find((t) => t.value === forwardTool);
    if (!match) {
      console.error(chalk.red(`Unknown tool: ${forwardTool}`));
      console.error(chalk.dim(`Available: ${TOOLS.map((t) => t.value).join(", ")}`));
      process.exit(1);
    }
    const rest = process.argv.slice(3).join(" ");
    execSync(`npx ${forwardTool} ${rest}`, { stdio: "inherit", shell: true });
    process.exit(0);
  }

  // Interactive picker
  console.log();
  p.intro(
    chalk.bgMagenta.white.bold("  noctisnova  ") +
    chalk.dim(`  v${VERSION}  ·  by `) +
    chalk.magenta("NoctisNova") +
    chalk.dim("  noctisnova.com")
  );

  console.log();

  const tool = await p.select({
    message: chalk.bold("Which doctor do you want to run?"),
    options: TOOLS,
  });

  if (p.isCancel(tool)) {
    p.cancel("Cancelled.");
    process.exit(0);
  }

  console.log();
  p.log.step(chalk.dim(`Launching ${tool}…`));
  console.log();

  try {
    execSync(`npx ${tool}`, { stdio: "inherit", shell: true });
  } catch (err) {
    process.exit(err.status ?? 1);
  }

  process.exit(0);
}

main().catch((err) => {
  console.error(chalk.red("\nUnexpected error:"), err.message ?? err);
  process.exit(1);
});
