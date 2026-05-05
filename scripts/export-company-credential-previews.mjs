/**
 * Dropbox 등 로컬 PDF 첫 페이지를 PNG로 `public/company-credentials/` 에 둡니다.
 * 실행: node scripts/export-company-credential-previews.mjs
 */
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { pdf } from "pdf-to-img";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const webRoot = path.join(__dirname, "..");
const outDir = path.join(webRoot, "public", "company-credentials");

const base =
  "C:\\Users\\NXTGN-PC\\Dropbox\\01.Minsub Ventures\\a.Company overview\\Company Document (회사 증명 서류)";

const docs = [
  { id: "coi", file: path.join(base, "01.MOA & AOA & COI & TAN", "20200304_COI (Minsub Ventures).PDF") },
  { id: "pan", file: path.join(base, "02.PAN Card", "20200309_PAN (Minsub Ventures).pdf") },
  { id: "gst", file: path.join(base, "03.TIN & GST Certificate", "20251213_GST Certificate (MSV).pdf") },
  { id: "iec", file: path.join(base, "04.Import & Exporter Code (IEC)", "20240630_IEC Certificate (MSV).pdf") },
  {
    id: "trading-license",
    file: path.join(
      base,
      "05.Trading License",
      "20260227_Trading Licence",
      "20250219_Licence Certificate (TS250219013327) (MSV).pdf",
    ),
  },
  { id: "fssai", file: path.join(base, "06.FSSAI License", "20250207_FSSAI Certificate (MSV).pdf") },
  {
    id: "labour-shop",
    file: path.join(base, "08.Labour Certificate (Shop & Establishment)", "Labour Certificate (S&E).pdf"),
  },
  { id: "epf", file: path.join(base, "09.EPF", "20210924_PF CERTIFICATE (MSV).pdf") },
  {
    id: "msme",
    file: path.join(base, "10.MSME", "20250821_MSME (Udyam Registration Certificate) (Minsub Ventures).pdf"),
  },
];

async function exportFirstPage(pdfPath, pngPath) {
  const doc = await pdf(pdfPath, { scale: 2.5 });
  for await (const buffer of doc) {
    await writeFile(pngPath, buffer);
    return;
  }
  throw new Error(`빈 PDF: ${pdfPath}`);
}

async function main() {
  await mkdir(outDir, { recursive: true });
  for (const { id, file } of docs) {
    const out = path.join(outDir, `${id}.png`);
    process.stdout.write(`${id} … `);
    await exportFirstPage(file, out);
    process.stdout.write(`→ ${path.relative(webRoot, out)}\n`);
  }
  console.log("완료.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
