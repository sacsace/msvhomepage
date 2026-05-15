import "server-only";

import { existsSync, statSync } from "node:fs";
import path from "node:path";
import type { Browser } from "puppeteer-core";
import puppeteer from "puppeteer-core";
import chromium from "@sparticuz/chromium";

const launchArgs = [
  "--no-sandbox",
  "--disable-setuid-sandbox",
  "--disable-dev-shm-usage",
  "--disable-gpu",
] as const;

function isExecutableFile(p: string): boolean {
  try {
    return existsSync(p) && statSync(p).isFile();
  } catch {
    return false;
  }
}

/** Windows: installed Google Chrome (Sparticuz bundle is Linux-only). */
function resolveWindowsChrome(): string | null {
  const candidates: string[] = [];
  const chromePath = process.env.CHROME_PATH?.trim();
  if (chromePath) candidates.push(chromePath);
  const local = process.env.LOCALAPPDATA?.trim();
  if (local) {
    candidates.push(path.join(local, "Google", "Chrome", "Application", "chrome.exe"));
  }
  candidates.push(
    "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
  );
  for (const c of candidates) {
    if (isExecutableFile(c)) return c;
  }
  return null;
}

function resolveMacChrome(): string | null {
  const p = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
  return isExecutableFile(p) ? p : null;
}

/**
 * Payslip PDF: `PUPPETEER_EXECUTABLE_PATH` → Win/Mac installed Chrome → Linux/Railway: @sparticuz/chromium.
 */
export async function launchPayrollPdfBrowser(): Promise<Browser> {
  const customPath = process.env.PUPPETEER_EXECUTABLE_PATH?.trim();
  if (customPath && isExecutableFile(customPath)) {
    return puppeteer.launch({
      executablePath: customPath,
      headless: true,
      args: [...launchArgs],
    });
  }

  if (process.platform === "win32") {
    const chrome = resolveWindowsChrome();
    if (!chrome) {
      throw new Error(
        "Google Chrome was not found. Install Chrome for Windows, or set PUPPETEER_EXECUTABLE_PATH to chrome.exe (full path). " +
          "(@sparticuz/chromium is for Linux servers such as Railway, not for local Windows.)",
      );
    }
    return puppeteer.launch({
      executablePath: chrome,
      headless: true,
      args: [...launchArgs],
    });
  }

  if (process.platform === "darwin") {
    const chrome = resolveMacChrome();
    if (chrome) {
      return puppeteer.launch({
        executablePath: chrome,
        headless: true,
        args: [...launchArgs],
      });
    }
  }

  return puppeteer.launch({
    args: [...chromium.args, "--disable-dev-shm-usage"],
    executablePath: await chromium.executablePath(),
    headless: true,
  });
}
