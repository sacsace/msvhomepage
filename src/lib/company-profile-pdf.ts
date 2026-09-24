import fs from "node:fs/promises";
import path from "node:path";
import { company } from "@/lib/site-content";
import { resolveMsvWebRoot } from "@/lib/msv-web-root";

export const COMPANY_PROFILE_PDF_MAX_BYTES = 25 * 1024 * 1024;

export function companyProfilePdfPublicPath(): string {
  return company.brochurePath;
}

export function companyProfilePdfAbsolutePath(): string {
  const rel = company.brochurePath.replace(/^\//, "");
  return path.join(resolveMsvWebRoot(), "public", rel);
}

export type CompanyProfilePdfMeta = {
  path: string;
  exists: boolean;
  sizeBytes?: number;
  updatedAt?: string;
};

export async function readCompanyProfilePdfMeta(): Promise<CompanyProfilePdfMeta> {
  const pathPublic = companyProfilePdfPublicPath();
  const abs = companyProfilePdfAbsolutePath();
  try {
    const st = await fs.stat(abs);
    if (!st.isFile()) {
      return { path: pathPublic, exists: false };
    }
    return {
      path: pathPublic,
      exists: true,
      sizeBytes: st.size,
      updatedAt: st.mtime.toISOString(),
    };
  } catch {
    return { path: pathPublic, exists: false };
  }
}

export async function writeCompanyProfilePdf(bytes: Buffer): Promise<CompanyProfilePdfMeta> {
  const abs = companyProfilePdfAbsolutePath();
  await fs.mkdir(path.dirname(abs), { recursive: true });
  await fs.writeFile(abs, bytes);
  return readCompanyProfilePdfMeta();
}

export function isPdfUpload(file: File): boolean {
  const mime = String(file.type || "").toLowerCase();
  if (mime === "application/pdf") return true;
  const name = String(file.name || "").toLowerCase();
  return name.endsWith(".pdf");
}
