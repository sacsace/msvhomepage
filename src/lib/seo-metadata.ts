import type { Metadata } from "next";
import type { SiteLocale } from "@/lib/site-locale";
import { withLocalePrefix } from "@/lib/site-locale";
import { company, siteUrl } from "@/lib/site-content";

/** OG·Twitter 기본 이미지(공개 `public` 기준) */
const ogImage = "/msv-wordmark.png";

type OpenGraphConfig = NonNullable<Metadata["openGraph"]>;

/** `metadataBase`와 결합되는 절대 URL */
export function absoluteSiteUrl(pathname: string): string {
  const path = pathname === "" || pathname === "/" ? "/" : pathname.startsWith("/") ? pathname : `/${pathname}`;
  if (path === "/") return siteUrl;
  return `${siteUrl}${path}`;
}

const SEO_LOCALES: readonly SiteLocale[] = ["ko", "en", "zh"] as const;

/** hreflang용 동일 페이지의 ko·en·zh 절대 URL */
export function languageAlternates(internalPath: string): NonNullable<Metadata["alternates"]>["languages"] {
  const path = internalPath === "" || internalPath === "/" ? "/" : internalPath.startsWith("/") ? internalPath : `/${internalPath}`;
  const out: Record<string, string> = {};
  for (const locale of SEO_LOCALES) {
    const localized = withLocalePrefix(path, locale);
    const abs = absoluteSiteUrl(localized);
    if (locale === "ko") out["ko-KR"] = abs;
    else if (locale === "en") out.en = abs;
    else out["zh-CN"] = abs;
  }
  out["x-default"] = absoluteSiteUrl(withLocalePrefix(path, "ko"));
  return out;
}

function alternatesForPage(canonicalPath: string, internalPathForLanguages: string): Metadata["alternates"] {
  return {
    canonical: canonicalPath,
    languages: languageAlternates(internalPathForLanguages),
  };
}

/** metadataBase 기준 상대 경로 → canonical + hreflang */
export function canonicalFor(pathname: string, internalPathForLanguages?: string): Pick<Metadata, "alternates"> {
  const path = pathname.startsWith("/") ? pathname : `/${pathname}`;
  const langPath = internalPathForLanguages ?? path;
  return { alternates: alternatesForPage(path, langPath) };
}

/** 기본 Open Graph(페이지별 title·description은 상위 metadata와 병합) */
export function openGraphFor(pathname: string, overrides?: Partial<OpenGraphConfig>) {
  const path = pathname.startsWith("/") ? pathname : `/${pathname}`;
  const url = absoluteSiteUrl(path === "/" ? "/" : path);
  return {
    type: "website" as const,
    locale: "ko_KR",
    siteName: company.shortName,
    url,
    images: [{ url: ogImage, width: 640, height: 160, alt: `${company.shortName} — minsub ventures` }],
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

/** 정적 페이지용 canonical·hreflang·Open Graph·Twitter 한 번에 */
export function staticPageSeo(pathname: string, opts: StaticPageSeoOpts): Metadata {
  const path = pathname.startsWith("/") ? pathname : `/${pathname}`;
  const fullTitle = opts.absoluteTitle ?? `${opts.title} | ${company.shortName}`;
  const description = opts.description ?? company.taglineKo;
  const titleField: Metadata["title"] = opts.absoluteTitle
    ? { absolute: opts.absoluteTitle }
    : opts.title;
  return {
    title: titleField,
    description,
    ...canonicalFor(path, path),
    openGraph: {
      ...openGraphFor(path),
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

/** `/en/...` 등 실제 공개 URL과 맞는 canonical·OG locale·hreflang */
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
  const pathForOg = canonicalPath.startsWith("/") ? canonicalPath : `/${canonicalPath}`;
  return {
    title: titleField,
    description,
    ...canonicalFor(pathForOg, internalPath.startsWith("/") ? internalPath : `/${internalPath}`),
    openGraph: {
      ...openGraphFor(pathForOg, { locale: ogLocaleFor(locale) }),
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

/** 루트 `metadata`용 — 환경 변수만 있을 때 검색엔진 소유권 확인 */
/** 배포 환경에 `MSV_GOOGLE_SITE_VERIFICATION` 설정 시 Search Console HTML 태그 방식 소유권 확인 */
export function siteVerificationMetadata(): Partial<Metadata> {
  const google = process.env.MSV_GOOGLE_SITE_VERIFICATION?.trim();
  if (!google) return {};
  return { verification: { google } };
}
