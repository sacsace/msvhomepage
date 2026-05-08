import type { Metadata } from "next";
import Link from "next/link";
import { CorporateIncorporationApplyForm } from "@/components/corporate-incorporation/CorporateIncorporationApplyForm";
import { PageHeader } from "@/components/layout/PageHeader";
import { StandardPageBody } from "@/components/layout/StandardPageBody";
import { getRequestLocale } from "@/lib/get-request-locale";
import {
  corporateIncorporationApplyFormCopy,
} from "@/lib/i18n/corporate-incorporation-apply-form-locale";
import { corporateIncorporationApplyShellCopy } from "@/lib/i18n/corporate-incorporation-service-locale";
import { staticPageSeoLocalized } from "@/lib/seo-metadata";
import { withLocalePrefix } from "@/lib/site-locale";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale();
  const shell = corporateIncorporationApplyShellCopy(locale);
  return staticPageSeoLocalized(
    "/services/corporate-incorporation/apply",
    { title: shell.metaTitle, description: shell.metaDescription },
    locale,
  );
}

export default async function CorporateIncorporationApplyPage() {
  const locale = await getRequestLocale();
  const L = (path: string) => withLocalePrefix(path, locale);
  const shell = corporateIncorporationApplyShellCopy(locale);
  const formCopy = corporateIncorporationApplyFormCopy(locale);

  return (
    <>
      <PageHeader title={shell.pageTitle} description={shell.pageDescription} descriptionWide />
      <StandardPageBody>
        <p className="text-sm text-slate-600">
          <Link
            href={L("/services/corporate-incorporation")}
            className="font-semibold text-msv-blue underline-offset-2 hover:underline"
          >
            {shell.breadcrumbService}
          </Link>
          <span aria-hidden className="mx-1.5 text-slate-300">
            ·
          </span>
          <Link
            href={L("/services")}
            className="font-medium text-slate-500 underline-offset-2 hover:text-msv-navy hover:underline"
          >
            {shell.breadcrumbServicesList}
          </Link>
        </p>
        <div className="mt-8">
          <CorporateIncorporationApplyForm copy={formCopy} />
        </div>
      </StandardPageBody>
    </>
  );
}
