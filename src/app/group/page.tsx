import type { Metadata } from "next";
import Link from "next/link";
import { GroupCompaniesList } from "@/components/group/GroupCompaniesList";
import { PageHeader } from "@/components/layout/PageHeader";
import { StandardPageBody } from "@/components/layout/StandardPageBody";
import { SectionTitle } from "@/components/SectionTitle";
import { getRequestLocale } from "@/lib/get-request-locale";
import { groupIndexPageCopy } from "@/lib/i18n/group-pages-locale";
import { staticPageSeoLocalized } from "@/lib/seo-metadata";
import { withLocalePrefix } from "@/lib/site-locale";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale();
  const c = groupIndexPageCopy(locale);
  return staticPageSeoLocalized("/group", { title: c.metaTitle, description: c.metaDescription }, locale);
}

const cardSection = "rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8";

const bodyText = "text-sm leading-relaxed text-slate-600 break-keep";

export default async function GroupPage() {
  const locale = await getRequestLocale();
  const L = (path: string) => withLocalePrefix(path, locale);
  const c = groupIndexPageCopy(locale);

  return (
    <>
      <PageHeader title={c.pageTitle} description={c.pageDescription} descriptionWide />
      <StandardPageBody className="space-y-12 sm:space-y-14">
        <section className={cardSection}>
          <SectionTitle
            eyebrow={c.sectionPartnersEyebrow}
            title={c.sectionPartnersTitle}
            subtitle={c.sectionPartnersSubtitle}
            spacing="tight"
            density="compact"
            contentWidth="full"
          />
          <div className="mt-6">
            <GroupCompaniesList locale={locale} />
          </div>
        </section>

        <section className={cardSection}>
          <SectionTitle
            eyebrow={c.sectionCompanyEyebrow}
            title={c.sectionCompanyTitle}
            spacing="tight"
            density="compact"
            headingLevel={3}
            contentWidth="full"
          />
          <p className={`mt-4 max-w-3xl ${bodyText}`}>
            {c.aboutLeadBefore}
            <Link
              href={L("/about")}
              className="font-semibold text-msv-navy underline-offset-2 transition hover:text-msv-blue hover:underline"
            >
              {c.aboutLinkLabel}
            </Link>
            {c.aboutLeadAfter}
          </p>
        </section>
      </StandardPageBody>
    </>
  );
}
