import { execFileSync } from "node:child_process";
import { readFileSync, statSync } from "node:fs";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);
const safeDirectory = repoRoot.replace(/\\/g, "/");
const outputPath = path.resolve(repoRoot, process.argv[2] ?? ".agent/review-bundle.md");

function runGit(args) {
  try {
    return execFileSync("git", ["-c", `safe.directory=${safeDirectory}`, ...args], {
      cwd: repoRoot,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
    }).trimEnd();
  } catch (error) {
    const stderr = error.stderr?.toString().trim();
    const stdout = error.stdout?.toString().trim();
    return `[command failed: git ${args.join(" ")}]\n${stderr || stdout || error.message}`;
  }
}

const status = runGit(["status", "--short"]);
const diffStat = runGit(["diff", "--stat"]);
const stagedDiffStat = runGit(["diff", "--cached", "--stat"]);
const changedFiles = runGit(["diff", "--name-only"]);
const stagedFiles = runGit(["diff", "--cached", "--name-only"]);
const untrackedFiles = runGit(["ls-files", "--others", "--exclude-standard"]);
const unstagedDiff = runGit(["diff", "--"]);
const stagedDiff = runGit(["diff", "--cached", "--"]);

function readUntrackedFiles(filesText) {
  const files = filesText
    .split(/\r?\n/)
    .map((entry) => entry.trim())
    .filter(Boolean);

  if (files.length === 0) {
    return "(none)";
  }

  return files
    .map((file) => {
      const absolutePath = path.resolve(repoRoot, file);

      try {
        const stats = statSync(absolutePath);
        if (!stats.isFile()) {
          return `## ${file}\n\n(skipped: not a regular file)`;
        }

        if (stats.size > 200_000) {
          return `## ${file}\n\n(skipped: file is larger than 200 KB)`;
        }

        const buffer = readFileSync(absolutePath);
        if (buffer.includes(0)) {
          return `## ${file}\n\n(skipped: binary file)`;
        }

        const text = buffer.toString("utf8");
        const longestFence = text
          .match(/`+/g)
          ?.reduce((longest, fence) => Math.max(longest, fence.length), 0) ?? 0;
        const fence = "`".repeat(Math.max(3, longestFence + 1));

        return `## ${file}\n\n${fence}txt\n${text}\n${fence}`;
      } catch (error) {
        return `## ${file}\n\n(skipped: ${error.message})`;
      }
    })
    .join("\n\n");
}

const content = `# StateKit Agent Review Bundle

Generated at: ${new Date().toISOString()}

## How to use

Give this file to a Reviewer Agent together with the task goal and the verification commands that were actually run.

Reviewer Agent should also read:

1. AGENTS.md
2. docs/statekit-agent-harness.md
3. docs/agent-review-loop.md
4. docs/agent-review-template.md
5. Relevant source, tests, and docs for the task

## Task Goal

Fill this in before review:

- Goal:
- Review level: Light / Standard / Release
- Verification already run:
- Browser MCP QA, if UI-facing:
  - Playwright MCP:
  - Chrome DevTools MCP:
  - Screenshots:
  - Console/network notes:

## Git Status

\`\`\`txt
${status || "(clean)"}
\`\`\`

## Changed Files

### Unstaged

\`\`\`txt
${changedFiles || "(none)"}
\`\`\`

### Untracked

\`\`\`txt
${untrackedFiles || "(none)"}
\`\`\`

### Staged

\`\`\`txt
${stagedFiles || "(none)"}
\`\`\`

## Diff Stat

### Unstaged

\`\`\`txt
${diffStat || "(none)"}
\`\`\`

### Staged

\`\`\`txt
${stagedDiffStat || "(none)"}
\`\`\`

## Unstaged Diff

\`\`\`diff
${unstagedDiff || "(none)"}
\`\`\`

## Untracked File Contents

${readUntrackedFiles(untrackedFiles)}

## Staged Diff

\`\`\`diff
${stagedDiff || "(none)"}
\`\`\`
`;

await mkdir(path.dirname(outputPath), { recursive: true });
await writeFile(outputPath, content, "utf8");

console.log(`[StateKit] Wrote review bundle: ${path.relative(repoRoot, outputPath)}`);
