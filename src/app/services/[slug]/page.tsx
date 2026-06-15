import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/layout/PageHeader";
import { StandardPageBody } from "@/components/layout/StandardPageBody";
import { ServiceGuidePageBody } from "@/components/services/ServiceGuidePageBody";
import { getRequestLocale } from "@/lib/get-request-locale";
import {
  SERVICE_GUIDE_SLUGS,
  isServiceGuideSlug,
  serviceGuideCopy,
  type ServiceGuideSlug,
} from "@/lib/i18n/service-guides-locale";
import { staticPageSeoLocalized, noIndexPageSeo } from "@/lib/seo-metadata";
import { withLocalePrefix } from "@/lib/site-locale";

type PageProps = { params: Promise<{ slug: string }> };

const SERVICE_GUIDE_SLUGS_EXCEPT_COMPLIANCE_CALENDAR = SERVICE_GUIDE_SLUGS.filter((s) => s !== "compliance-calendar");

export function generateStaticParams(): { slug: ServiceGuideSlug }[] {
  return SERVICE_GUIDE_SLUGS_EXCEPT_COMPLIANCE_CALENDAR.map((slug) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  if (!isServiceGuideSlug(slug) || slug === "compliance-calendar") {
    return noIndexPageSeo();
  }
  const locale = await getRequestLocale();
  const copy = serviceGuideCopy(slug, locale);
  return staticPageSeoLocalized(`/services/${slug}`, { title: copy.metaTitle, description: copy.metaDescription }, locale);
}

export default async function ServiceGuideDynamicPage({ params }: PageProps) {
  const { slug } = await params;
  if (!isServiceGuideSlug(slug)) notFound();
  if (slug === "compliance-calendar") notFound();

  const locale = await getRequestLocale();
  const L = (path: string) => withLocalePrefix(path, locale);
  const copy = serviceGuideCopy(slug, locale);

  return (
    <>
      <PageHeader
        title={copy.pageTitle}
        eyebrow={copy.pageEyebrow}
        description={copy.pageDescription}
        descriptionWide
      />
      <StandardPageBody>
        <ServiceGuidePageBody copy={copy} L={L} />
      </StandardPageBody>
    </>
  );
}
