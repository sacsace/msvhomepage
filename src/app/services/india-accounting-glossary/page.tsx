import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { StandardPageBody } from "@/components/layout/StandardPageBody";
import { IndiaAccountingGlossaryView } from "@/components/services/IndiaAccountingGlossaryView";
import { getRequestLocale } from "@/lib/get-request-locale";
import { indiaAccountingGlossaryCopy } from "@/lib/i18n/india-accounting-glossary-locale";
import { staticPageSeoLocalized } from "@/lib/seo-metadata";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale();
  const c = indiaAccountingGlossaryCopy(locale);
  return staticPageSeoLocalized(
    "/services/india-accounting-glossary",
    { title: c.metaTitle, description: c.metaDescription },
    locale,
  );
}

export default async function IndiaAccountingGlossaryPage() {
  const locale = await getRequestLocale();
  const c = indiaAccountingGlossaryCopy(locale);
  return (
    <>
      <PageHeader title={c.pageHeaderTitle} description={c.pageHeaderDescription} descriptionWide />
      <StandardPageBody>
        <IndiaAccountingGlossaryView locale={locale} />
      </StandardPageBody>
    </>
  );
}
