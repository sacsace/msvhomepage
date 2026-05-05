import type { Metadata } from "next";
import type { SiteLocale } from "@/lib/site-locale";
import { withLocalePrefix } from "@/lib/site-locale";
import { company, siteUrl } from "@/lib/site-content";

const ogImage = "/msv-logo.png";

type OpenGraphConfig = NonNullable<Metadata["openGraph"]>;

/** metadataBase 기준 상대 경로 → canonical alternates */
export function canonicalFor(pathname: string): Pick<Metadata, "alternates"> {
  const path = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return { alternates: { canonical: path } };
}

/** 기본 Open Graph(페이지별 title·description은 상위 metadata와 병합) */
export function openGraphFor(pathname: string, overrides?: Partial<OpenGraphConfig>) {
  const path = pathname.startsWith("/") ? pathname : `/${pathname}`;
  const url = `${siteUrl}${path === "/" ? "" : path}`;
  return {
    type: "website" as const,
    locale: "ko_KR",
    siteName: company.shortName,
    url,
    images: [{ url: ogImage, alt: `${company.shortName} 로고` }],
    ...overrides,
  };
}

function ogLocaleFor(locale: SiteLocale): string {
  if (locale === "en") return "en_IN";
  if (locale === "zh") return "zh_CN";
  return "ko_KR";
}

type TwitterConfig = NonNullable<Metadata["twitter"]>;

export function twitterCard(overrides?: Partial<TwitterConfig>) {
  return {
    card: "summary_large_image" as const,
    images: [ogImage],
    ...overrides,
  };
}

type StaticPageSeoOpts = {
  title: string;
  description?: string;
  /** 홈 등: `title` 템플릿과 중복되지 않는 전체 `<title>` */
  absoluteTitle?: string;
};

/** 정적 페이지용 canonical·Open Graph·Twitter 한 번에 */
export function staticPageSeo(pathname: string, opts: StaticPageSeoOpts): Metadata {
  const fullTitle = opts.absoluteTitle ?? `${opts.title} | ${company.shortName}`;
  const description = opts.description ?? company.taglineKo;
  const titleField: Metadata["title"] = opts.absoluteTitle
    ? { absolute: opts.absoluteTitle }
    : opts.title;
  return {
    title: titleField,
    description,
    ...canonicalFor(pathname),
    openGraph: {
      ...openGraphFor(pathname),
      title: fullTitle,
      description,
    },
    twitter: {
      ...twitterCard(),
      title: fullTitle,
      description,
    },
  };
}

/** `/en/...` 등 실제 공개 URL과 맞는 canonical·OG locale */
export function staticPageSeoLocalized(
  internalPath: string,
  opts: StaticPageSeoOpts,
  locale: SiteLocale,
): Metadata {
  const canonicalPath = withLocalePrefix(internalPath.startsWith("/") ? internalPath : `/${internalPath}`, locale);
  const fullTitle = opts.absoluteTitle ?? `${opts.title} | ${company.shortName}`;
  const description = opts.description ?? company.taglineKo;
  const titleField: Metadata["title"] = opts.absoluteTitle
    ? { absolute: opts.absoluteTitle }
    : opts.title;
  return {
    title: titleField,
    description,
    ...canonicalFor(canonicalPath),
    openGraph: {
      ...openGraphFor(canonicalPath, { locale: ogLocaleFor(locale) }),
      title: fullTitle,
      description,
    },
    twitter: {
      ...twitterCard(),
      title: fullTitle,
      description,
    },
  };
}
