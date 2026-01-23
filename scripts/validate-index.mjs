import fs from "node:fs/promises";
import path from "node:path";

function isPlainObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function analyzeMarkdown(markdown) {
  const lines = markdown.replace(/^\uFEFF/, "").split(/\r?\n/);
  let inFence = false;
  let fenceMarker = null;

  let firstNonEmptyLine = null;
  let firstH1 = null;
  let h1Count = 0;

  for (const rawLine of lines) {
    const line = rawLine.replace(/\s+$/, "");

    const fenceMatch = line.match(/^(```|~~~)/);
    if (fenceMatch) {
      const marker = fenceMatch[1];
      if (!inFence) {
        inFence = true;
        fenceMarker = marker;
      } else if (marker === fenceMarker) {
        inFence = false;
        fenceMarker = null;
      }
      continue;
    }

    if (inFence) continue;

    if (firstNonEmptyLine === null && line.trim() !== "") {
      firstNonEmptyLine = line;
    }

    const h1Match = line.match(/^#\s+(.+?)\s*$/);
    if (h1Match) {
      h1Count += 1;
      if (firstH1 === null) firstH1 = h1Match[1];
    }
  }

  return { firstNonEmptyLine, firstH1, h1Count };
}

async function fileExists(filePath) {
  try {
    const stat = await fs.stat(filePath);
    return stat.isFile();
  } catch {
    return false;
  }
}

function normalizeTitle(value) {
  return String(value ?? "").trim();
}

async function main() {
  const repoRoot = process.cwd();
  const indexPath = path.join(repoRoot, "index.json");

  const errors = [];
  const addError = (message) => errors.push(message);

  let indexRaw;
  try {
    indexRaw = await fs.readFile(indexPath, "utf8");
  } catch (error) {
    addError(`index.json: failed to read (${error.message})`);
    indexRaw = null;
  }

  let indexJson;
  if (indexRaw !== null) {
    try {
      indexJson = JSON.parse(indexRaw);
    } catch (error) {
      addError(`index.json: invalid JSON (${error.message})`);
    }
  }

  if (!isPlainObject(indexJson)) {
    addError("index.json: expected a JSON object at the top level");
  }

  const chapters = isPlainObject(indexJson) ? indexJson.chapters : null;
  if (!Array.isArray(chapters)) {
    addError("index.json: expected `chapters` to be an array");
  }

  const seenItemIds = new Map();

  for (const [chapterIndex, chapter] of (chapters ?? []).entries()) {
    if (!isPlainObject(chapter)) {
      addError(`index.json: chapters[${chapterIndex}] must be an object`);
      continue;
    }

    const items = chapter.items;
    if (!Array.isArray(items)) {
      addError(`index.json: chapters[${chapterIndex}].items must be an array`);
      continue;
    }

    for (const [itemIndex, item] of items.entries()) {
      const itemLabel = `chapters[${chapterIndex}].items[${itemIndex}]`;

      if (!isPlainObject(item)) {
        addError(`index.json: ${itemLabel} must be an object`);
        continue;
      }

      const id = item.id;
      const title = item.title;
      const relativePath = item.path;

      if (typeof id !== "string" || id.trim() === "") {
        addError(`index.json: ${itemLabel}.id must be a non-empty string`);
      } else if (seenItemIds.has(id)) {
        addError(
          `index.json: duplicate item id "${id}" (${seenItemIds.get(id)} and ${itemLabel})`,
        );
      } else {
        seenItemIds.set(id, itemLabel);
      }

      if (typeof title !== "string" || title.trim() === "") {
        addError(`index.json: ${itemLabel}.title must be a non-empty string`);
      }

      if (typeof relativePath !== "string" || relativePath.trim() === "") {
        addError(`index.json: ${itemLabel}.path must be a non-empty string`);
        continue;
      }

      if (path.isAbsolute(relativePath) || relativePath.includes("..")) {
        addError(`index.json: ${itemLabel}.path must be a relative file path: "${relativePath}"`);
        continue;
      }

      const absolutePath = path.join(repoRoot, relativePath);
      const exists = await fileExists(absolutePath);
      if (!exists) {
        addError(`missing file: ${relativePath} (referenced by ${itemLabel})`);
        continue;
      }

      if (path.extname(relativePath).toLowerCase() !== ".md") {
        continue;
      }

      const markdown = await fs.readFile(absolutePath, "utf8");
      const { firstNonEmptyLine, firstH1, h1Count } = analyzeMarkdown(markdown);

      if (firstNonEmptyLine === null) {
        addError(`${relativePath}: file is empty`);
        continue;
      }

      if (!firstNonEmptyLine.startsWith("# ")) {
        addError(`${relativePath}: first non-empty line must be a H1 heading (# ...)`);
      }

      if (firstH1 === null) {
        addError(`${relativePath}: missing H1 heading (# ...)`);
        continue;
      }

      if (h1Count !== 1) {
        addError(`${relativePath}: expected exactly 1 H1 heading, found ${h1Count}`);
      }

      const expected = normalizeTitle(title);
      const actual = normalizeTitle(firstH1);
      if (expected !== "" && actual !== "" && expected !== actual) {
        addError(
          `${relativePath}: title mismatch (index.json: "${expected}" / H1: "${actual}")`,
        );
      }
    }
  }

  if (errors.length > 0) {
    console.error(`Found ${errors.length} issue(s):`);
    for (const message of errors) console.error(`- ${message}`);
    process.exit(1);
  }

  console.log("OK: index.json and chapters are consistent.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

