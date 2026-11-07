// Renders cv/CurriculumFranckEP.html to public/CurriculumFranckEP.pdf with headless Chrome or Edge.
// Usage: node cv/build.mjs
import { execFileSync } from "node:child_process";
import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

const candidates = [
  process.env.CHROME_PATH,
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
].filter(Boolean);

const browser = candidates.find((p) => existsSync(p));
if (!browser) throw new Error("No Chrome or Edge found. Set CHROME_PATH.");

const src = pathToFileURL(resolve("cv/CurriculumFranckEP.html")).href;
const out = resolve(process.argv[2] ?? "public/CurriculumFranckEP.pdf");

execFileSync(browser, [
  "--headless=new",
  "--disable-gpu",
  "--no-pdf-header-footer",
  "--virtual-time-budget=8000",
  `--print-to-pdf=${out}`,
  src,
], { stdio: "inherit" });

console.log(`Wrote ${out}`);
