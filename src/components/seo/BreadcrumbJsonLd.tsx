import { buildBreadcrumbJsonLd } from "@/lib/breadcrumb-seo";
import type { SiteLocale } from "@/lib/site-locale";

type Props = {
  browserPath: string;
  locale: SiteLocale;
};

export function BreadcrumbJsonLd({ browserPath, locale }: Props) {
  const payload = buildBreadcrumbJsonLd(browserPath, locale);
  if (!payload) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(payload) }}
    />
  );
}
