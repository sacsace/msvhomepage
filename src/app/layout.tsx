import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";

/** 관리자 경로에서는 렌더하지 않지만, 정적 import 시 Turbopack이 RSC 번들에서 클라이언트 팩토리를 끌어와 오류가 날 수 있어 dynamic으로 분리합니다. */
const BrowserPathnameProvider = dynamic(
  () =>
    import("@/components/layout/BrowserPathnameProvider").then((mod) => ({
      default: mod.BrowserPathnameProvider,
    })),
  { ssr: true },
);
import { PageViewTracker } from "@/components/layout/PageViewTracker";
import { OrganizationJsonLd } from "@/components/seo/OrganizationJsonLd";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { getAdminUiLocale } from "@/lib/admin-ui-locale";
import { getRequestBrowserPath } from "@/lib/get-request-browser-path";
import { getRequestLocale } from "@/lib/get-request-locale";
import { shellStrings } from "@/lib/i18n/shell";
import { openGraphFor, siteVerificationMetadata, twitterCard } from "@/lib/seo-metadata";
import { company, siteUrl } from "@/lib/site-content";

const noto = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-noto",
  display: "swap",
});

const defaultTitle = `${company.shortName} | 인도 회계·세무·현장 실행`;

export const metadata: Metadata = {
  title: {
    default: defaultTitle,
    template: `%s | ${company.shortName}`,
  },
  description: company.taglineKo,
  metadataBase: new URL(siteUrl),
  ...siteVerificationMetadata(),
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    ...openGraphFor("/"),
    title: defaultTitle,
    description: company.taglineKo,
  },
  twitter: {
    ...twitterCard(),
    title: defaultTitle,
    description: company.taglineKo,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [locale, browserPath] = await Promise.all([getRequestLocale(), getRequestBrowserPath()]);
  const shell = shellStrings(locale);
  /** 관리자 UI는 자체 레이아웃만 사용 — Turbopack에서 공개용 클라이언트 프로바이더와 RSC 경계가 충돌하는 경우 방지 */
  const isAdminRoute = browserPath === "/admin" || browserPath.startsWith("/admin/");
  const adminUiLocale = isAdminRoute ? await getAdminUiLocale() : null;
  const htmlLang = isAdminRoute
    ? adminUiLocale === "en"
      ? "en"
      : "ko"
    : locale === "en"
      ? "en"
      : locale === "zh"
        ? "zh"
        : "ko";

  return (
    <html
      lang={htmlLang}
      className={`${noto.variable} h-full scroll-smooth`}
      data-scroll-behavior="smooth"
    >
      <body className="flex min-h-full flex-col bg-background font-sans text-slate-800 antialiased">
        {isAdminRoute ? (
          <main id="main-content" className="min-w-0 flex-1" tabIndex={-1}>
            {children}
          </main>
        ) : (
          <BrowserPathnameProvider serverPathname={browserPath}>
            <PageViewTracker />
            <OrganizationJsonLd />
            <a
              href="#main-content"
              className="fixed left-4 top-4 z-[100] inline-flex translate-y-[-120vh] rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow-lg transition focus:translate-y-0 focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-white/80 motion-reduce:transition-none"
            >
              {shell.skipToContent}
            </a>
            <SiteHeader locale={locale} />
            <main id="main-content" className="min-w-0 flex-1" tabIndex={-1}>
              {children}
            </main>
            <SiteFooter />
          </BrowserPathnameProvider>
        )}
      </body>
    </html>
  );
}
