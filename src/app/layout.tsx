import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import { BrowserPathnameProvider } from "@/components/layout/BrowserPathnameProvider";
import { OrganizationJsonLd } from "@/components/seo/OrganizationJsonLd";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { getRequestBrowserPath } from "@/lib/get-request-browser-path";
import { getRequestLocale } from "@/lib/get-request-locale";
import { shellStrings } from "@/lib/i18n/shell";
import { openGraphFor, twitterCard } from "@/lib/seo-metadata";
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
  const htmlLang = locale === "en" ? "en" : locale === "zh" ? "zh" : "ko";
  /** 관리자 UI는 자체 레이아웃만 사용 — Turbopack에서 공개용 클라이언트 프로바이더와 RSC 경계가 충돌하는 경우 방지 */
  const isAdminRoute = browserPath === "/admin" || browserPath.startsWith("/admin/");

  return (
    <html
      lang={htmlLang}
      className={`${noto.variable} h-full scroll-smooth`}
      data-scroll-behavior="smooth"
    >
      <body className="flex min-h-full flex-col bg-background font-sans text-slate-900 antialiased">
        {isAdminRoute ? (
          <main id="main-content" className="flex-1" tabIndex={-1}>
            {children}
          </main>
        ) : (
          <BrowserPathnameProvider serverPathname={browserPath}>
            <OrganizationJsonLd />
            <a
              href="#main-content"
              className="absolute left-[-9999px] top-0 z-[100] overflow-hidden whitespace-nowrap bg-slate-900 px-4 py-2 text-sm font-medium text-white focus:left-4 focus:top-4 focus:overflow-visible focus:rounded-sm focus:shadow-md"
            >
              {shell.skipToContent}
            </a>
            <SiteHeader locale={locale} />
            <main id="main-content" className="flex-1" tabIndex={-1}>
              {children}
            </main>
            <SiteFooter />
          </BrowserPathnameProvider>
        )}
      </body>
    </html>
  );
}
