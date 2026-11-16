import { copyFile, stat } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const source = join(here, "entry.png");

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const dest = join(outDir, "entry.png");

const srcInfo = await stat(source);
if (srcInfo.size === 0) {
  throw new Error(`entry.png is empty: ${source}`);
}
console.log(`Copying ${source} (${srcInfo.size} bytes) -> ${dest}`);

await copyFile(source, dest);

const info = await stat(dest);
console.log(`Wrote ${dest} (${info.size} bytes)`);
