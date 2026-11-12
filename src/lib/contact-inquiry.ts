import type { InquiryTypeValue } from "@/lib/i18n/contact-locale";
import { INQUIRY_TYPE_VALUES } from "@/lib/i18n/contact-locale";
import type { SiteLocale } from "@/lib/site-locale";
import { withLocalePrefix } from "@/lib/site-locale";

/** 서비스 경로 → 문의 유형 프리셀렉트 */
const PATH_TO_INQUIRY: ReadonlyArray<{ prefix: string; type: InquiryTypeValue }> = [
  { prefix: "/services/corporate-incorporation", type: "incorporation" },
  { prefix: "/services/hr-payroll", type: "accounting_tax" },
  { prefix: "/services/recruitment-support", type: "accounting_tax" },
  { prefix: "/services/frro", type: "visa_frro" },
  { prefix: "/services/import-export-iec", type: "import_export_iec" },
  { prefix: "/services/gst-practice-guide", type: "gst_tds" },
  { prefix: "/services/guide-india-tax", type: "gst_tds" },
  { prefix: "/services/form-41-registration", type: "accounting_tax" },
  { prefix: "/services/fdi-fema-guide", type: "accounting_tax" },
  { prefix: "/services/ecb", type: "accounting_tax" },
  { prefix: "/software/mvs", type: "groupware_mvs" },
  { prefix: "/software", type: "development" },
  { prefix: "/services", type: "accounting_tax" },
];

export function inquiryTypeFromPath(barePath: string): InquiryTypeValue | null {
  const bare = barePath.split("?")[0]?.split("#")[0] || barePath;
  for (const row of PATH_TO_INQUIRY) {
    if (bare === row.prefix || bare.startsWith(`${row.prefix}/`)) return row.type;
  }
  return null;
}

export function parseInquiryTypeParam(raw: string | null | undefined): InquiryTypeValue | "" {
  if (!raw) return "";
  return (INQUIRY_TYPE_VALUES as readonly string[]).includes(raw) ? (raw as InquiryTypeValue) : "";
}

export function contactHref(
  locale: SiteLocale,
  opts?: { type?: InquiryTypeValue | null; barePath?: string },
): string {
  const type = opts?.type ?? (opts?.barePath ? inquiryTypeFromPath(opts.barePath) : null);
  const base = withLocalePrefix("/contact", locale);
  if (!type) return base;
  return `${base}?type=${encodeURIComponent(type)}`;
}
