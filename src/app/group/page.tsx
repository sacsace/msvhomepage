import type { Metadata } from "next";
import Link from "next/link";
import { GroupCompaniesList } from "@/components/group/GroupCompaniesList";
import { PageHeader } from "@/components/layout/PageHeader";
import { MagazineSpreadSection } from "@/components/magazine/MagazineSpreadSection";
import { homeTypo } from "@/lib/home-typography";
import { getRequestLocale } from "@/lib/get-request-locale";
import { groupIndexPageCopy } from "@/lib/i18n/group-pages-locale";
import { publicPageBodyShell } from "@/lib/public-page-styles";
import { staticPageSeoLocalized } from "@/lib/seo-metadata";
import { withLocalePrefix } from "@/lib/site-locale";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale();
  const c = groupIndexPageCopy(locale);
  return staticPageSeoLocalized("/group", { title: c.metaTitle, description: c.metaDescription }, locale);
}

export default async function GroupPage() {
  const locale = await getRequestLocale();
  const L = (path: string) => withLocalePrefix(path, locale);
  const c = groupIndexPageCopy(locale);

  return (
    <>
      <PageHeader title={c.pageTitle} description={c.pageDescription} descriptionWide />
      <div className={`${publicPageBodyShell} !pt-0`}>
        <div className="mx-auto max-w-6xl">
          <MagazineSpreadSection index="01" label={c.sectionPartnersEyebrow} tone="white">
            <h2 className={homeTypo.sectionHeading}>{c.sectionPartnersTitle}</h2>
            <div className="msv-magazine-rule mt-6 max-w-[6rem]" aria-hidden />
            {c.sectionPartnersSubtitle ? (
              <p className={`mt-6 max-w-2xl ${homeTypo.body}`}>{c.sectionPartnersSubtitle}</p>
            ) : null}
            <GroupCompaniesList locale={locale} />
          </MagazineSpreadSection>


          <MagazineSpreadSection index="02" label={c.sectionCompanyEyebrow} tone="paper">
            <h2 className={homeTypo.sectionHeading}>{c.sectionCompanyTitle}</h2>
            <div className="msv-magazine-rule mt-6 max-w-[6rem]" aria-hidden />
            <p className={`mt-6 max-w-2xl ${homeTypo.body}`}>
              {c.aboutLeadBefore}
              <Link href={L("/about")} className={`${homeTypo.linkCta} mx-1`}>
                {c.aboutLinkLabel}
              </Link>
              {c.aboutLeadAfter}
            </p>
          </MagazineSpreadSection>
        </div>
      </div>
    </>
  );
}
