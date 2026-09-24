/**
 * MVS 제품 화면을 캡처해 `public/software/mvs/*.png` 로 저장합니다.
 *
 * 사용: MVS_FRONTEND_URL, MVS_CAPTURE_USER, MVS_CAPTURE_PASSWORD (또는 기본 root/admin123)
 *   npm run capture:mvs-screenshots
 */
import { existsSync, mkdirSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer-core";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const outDir = path.join(root, "public", "software", "mvs");

const BASE = (process.env.MVS_FRONTEND_URL || "https://www.mvsystem.in").replace(/\/$/, "");
const USER = process.env.MVS_CAPTURE_USER || "root";
const PASS = process.env.MVS_CAPTURE_PASSWORD || "admin123";

/** 파일명 → 앱 경로 */
const TARGETS = [
  { file: "dashboard.png", route: "/dashboard" },
  { file: "attendance.png", route: "/hr/attendance" },
  { file: "electronic-approval.png", route: "/work/approval" },
  { file: "inventory-status.png", route: "/inventory/status" },
  { file: "receiving.png", route: "/inventory/stock-in" },
  { file: "shipping.png", route: "/inventory/stock-out" },
  { file: "inventory-report.png", route: "/inventory/report" },
  { file: "quotations.png", route: "/accounting/quotation" },
  { file: "tax-invoice-general.png", route: "/accounting/invoice" },
  { file: "expense-resolution.png", route: "/accounting/expense" },
];

function isExecutableFile(p) {
  try {
    return existsSync(p) && statSync(p).isFile();
  } catch {
    return false;
  }
}

function resolveChrome() {
  const custom = process.env.PUPPETEER_EXECUTABLE_PATH?.trim();
  if (custom && isExecutableFile(custom)) return custom;
  const local = process.env.LOCALAPPDATA?.trim();
  if (local) {
    const p = path.join(local, "Google", "Chrome", "Application", "chrome.exe");
    if (isExecutableFile(p)) return p;
  }
  const candidates = [
    "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
  ];
  for (const c of candidates) {
    if (isExecutableFile(c)) return c;
  }
  throw new Error("Chrome not found. Set PUPPETEER_EXECUTABLE_PATH.");
}

async function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function login(page) {
  await page.goto(`${BASE}/login`, { waitUntil: "networkidle2", timeout: 120000 });
  await page.waitForSelector("#userid", { timeout: 30000 });
  await page.click("#userid", { clickCount: 3 });
  await page.type("#userid", USER, { delay: 20 });
  await page.click("#password", { clickCount: 3 });
  await page.type("#password", PASS, { delay: 20 });
  const loginBtn = await page.$("button[type='submit']");
  if (!loginBtn) throw new Error("Login submit button not found");
  await loginBtn.click();
  await page.waitForFunction(
    () => !window.location.pathname.includes("/login"),
    { timeout: 60000 },
  );
  await sleep(1500);
}

async function capture(page, route, filePath) {
  await page.goto(`${BASE}${route}`, { waitUntil: "networkidle2", timeout: 120000 });
  await sleep(2500);
  await page.screenshot({ path: filePath, type: "png", fullPage: false });
  console.log(`  saved ${path.basename(filePath)} (${route})`);
}

async function main() {
  mkdirSync(outDir, { recursive: true });
  const browser = await puppeteer.launch({
    executablePath: resolveChrome(),
    headless: "new",
    defaultViewport: { width: 1440, height: 900, deviceScaleFactor: 1 },
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage"],
  });
  const page = await browser.newPage();
  console.log(`Logging in to ${BASE} as ${USER}…`);
  await login(page);
  console.log("Capturing screens…");
  for (const t of TARGETS) {
    await capture(page, t.route, path.join(outDir, t.file));
  }
  await browser.close();
  console.log(`Done. ${TARGETS.length} files in public/software/mvs/`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
