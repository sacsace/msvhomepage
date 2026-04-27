import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { company } from "@/lib/site-content";

const noto = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-noto",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${company.shortName} | 인도 회계·세무·현장 실행`,
    template: `%s | ${company.shortName}`,
  },
  description: company.taglineKo,
  metadataBase: new URL("https://www.msventures.in"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${noto.variable} h-full scroll-smooth`}>
      <body className="flex min-h-full flex-col bg-background font-sans text-slate-900 antialiased">
        <a
          href="#main-content"
          className="absolute left-[-9999px] top-0 z-[100] overflow-hidden whitespace-nowrap bg-slate-900 px-4 py-2 text-sm font-medium text-white focus:left-4 focus:top-4 focus:overflow-visible focus:rounded-sm focus:shadow-md"
        >
          본문 바로가기
        </a>
        <SiteHeader />
        <main id="main-content" className="flex-1" tabIndex={-1}>
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
