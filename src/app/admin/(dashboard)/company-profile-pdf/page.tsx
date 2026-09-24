import { CompanyProfilePdfForm } from "@/components/admin/CompanyProfilePdfForm";
import { getAdminUiLocale } from "@/lib/admin-ui-locale";
import { ADMIN_FORM_CARD_CLASS, ADMIN_PAGE_LEAD_CLASS } from "@/lib/admin-page-layout";

export const dynamic = "force-dynamic";

export default async function AdminCompanyProfilePdfPage() {
  const locale = await getAdminUiLocale();
  const title = locale === "en" ? "Company profile PDF" : "회사 프로필 PDF";
  const lead =
    locale === "en"
      ? "Replace the public company profile PDF linked in footer, hero, and site links."
      : "푸터·히어로 등 공개 사이트 「회사 프로필 PDF」 링크 파일 교체.";

  return (
    <div>
      <h1 className="text-xl font-bold tracking-tight text-slate-900">{title}</h1>
      <p className={ADMIN_PAGE_LEAD_CLASS}>{lead}</p>
      <div className={ADMIN_FORM_CARD_CLASS}>
        <CompanyProfilePdfForm />
      </div>
    </div>
  );
}
