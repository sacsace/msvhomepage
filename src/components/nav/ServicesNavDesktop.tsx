"use client";

import Link from "next/link";
import { useBrowserPathname } from "@/components/layout/BrowserPathnameProvider";
import { desktopNavTopSegmentClass } from "@/components/nav/desktop-nav-top-class";
import type { SiteLocale } from "@/lib/site-locale";
import { localeFromPathname, pickLocale, stripLocalePrefix, withLocalePrefix } from "@/lib/site-locale";

const subKo = [
  { href: "/services/corporate-incorporation", label: "법인 설립 서비스" },
  { href: "/services", label: "회계 서비스" },
  { href: "/services/india-accounting-glossary", label: "인도 회계·세무 지식 베이스" },
  { href: "/services/license-registration", label: "라이센스 등록 서비스" },
  { href: "/services/recruitment-support", label: "채용지원 서비스" },
  { href: "/services/frro", label: "FRRO 서비스" },
  { href: "/services/ecb", label: "ECB 안내" },
  { href: "/services/form-41-registration", label: "Form 41(구 Form 10F) 등록 서비스" },
  { href: "/services/personal-income-tax-calculator", label: "개인 소득세 계산기" },
  { href: "/services/corporate-tax-calculator", label: "법인세 계산기" },
  { href: "/services/professional-tax-calculator", label: "Professional Tax 계산기" },
] as const;

const subEn = [
  { href: "/services/corporate-incorporation", label: "Corporate incorporation" },
  { href: "/services", label: "Accounting services" },
  { href: "/services/india-accounting-glossary", label: "India accounting knowledge base" },
  { href: "/services/license-registration", label: "License registration" },
  { href: "/services/recruitment-support", label: "Recruitment support" },
  { href: "/services/frro", label: "FRRO services" },
  { href: "/services/ecb", label: "ECB guide" },
  {
    href: "/services/form-41-registration",
    label: "Form 41 registration (formerly Form 10F)",
  },
  { href: "/services/personal-income-tax-calculator", label: "Personal income tax calculator" },
  { href: "/services/corporate-tax-calculator", label: "Corporate tax calculator" },
  { href: "/services/professional-tax-calculator", label: "Professional tax calculator" },
] as const;

const subZh = [
  { href: "/services/corporate-incorporation", label: "公司设立服务" },
  { href: "/services", label: "会计与税务服务" },
  { href: "/services/india-accounting-glossary", label: "印度会计实务知识库" },
  { href: "/services/license-registration", label: "许可证注册" },
  { href: "/services/recruitment-support", label: "招聘支持" },
  { href: "/services/frro", label: "FRRO 服务" },
  { href: "/services/ecb", label: "ECB 说明" },
  { href: "/services/form-41-registration", label: "Form 41 注册（原 Form 10F）" },
  { href: "/services/personal-income-tax-calculator", label: "个人所得税计算器" },
  { href: "/services/corporate-tax-calculator", label: "企业所得税计算器" },
  { href: "/services/professional-tax-calculator", label: "职业税计算器" },
] as const;

function linkClass(active: boolean) {
  return `px-3 py-1.5 text-[13px] tracking-tight transition duration-200 ease-out ${desktopNavTopSegmentClass(active)}`;
}

export function ServicesNavDesktop() {
  const pathname = useBrowserPathname();
  const locale = localeFromPathname(pathname) as SiteLocale;
  const sub = locale === "en" ? subEn : locale === "zh" ? subZh : subKo;
  const bare = stripLocalePrefix(pathname.split("#")[0] || pathname);
  const active = bare === "/services" || bare.startsWith("/services/");
  const topLabel = pickLocale(locale, { ko: "서비스", en: "Services", zh: "服务" });
  const ariaSub = pickLocale(locale, {
    ko: "서비스 하위 메뉴",
    en: "Services submenu",
    zh: "服务子菜单",
  });

  return (
    <div className="group relative flex items-center">
      <Link
        href={withLocalePrefix("/services", locale)}
        className={`${linkClass(active)} block select-none`}
        aria-current={bare === "/services" ? "page" : undefined}
      >
        {topLabel}
      </Link>
      <div
        className="pointer-events-none invisible absolute left-0 top-full z-50 w-[min(20rem,calc(100vw-2rem))] pt-1.5 opacity-0 transition duration-150 group-hover:pointer-events-auto group-hover:visible group-hover:opacity-100"
        role="navigation"
        aria-label={ariaSub}
      >
        <div className="rounded-lg border border-slate-100 bg-white py-1 shadow-lg shadow-slate-900/5">
          {sub.map((item) => {
            const subActive = bare === item.href || bare.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={withLocalePrefix(item.href, locale)}
                className={`block px-3 py-2 text-[13px] transition hover:bg-slate-50 ${
                  subActive ? "bg-msv-blue-soft/70 font-semibold text-msv-navy" : "font-medium text-slate-600 hover:text-msv-navy"
                }`}
                aria-current={subActive ? "page" : undefined}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
