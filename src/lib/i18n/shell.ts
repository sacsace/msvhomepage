import type { SiteLocale } from "@/lib/site-locale";
import { pickLocale } from "@/lib/site-locale";

/** 헤더·푸터·스킵 링크 등 공통 껍데기 문구 */
export function shellStrings(locale: SiteLocale) {
  return {
    skipToContent: pickLocale(locale, {
      ko: "본문 바로가기",
      en: "Skip to main content",
      zh: "跳到正文",
    }),
    navAria: pickLocale(locale, {
      ko: "주요 메뉴",
      en: "Main navigation",
      zh: "主导航",
    }),
    home: pickLocale(locale, { ko: "홈", en: "Home", zh: "首页" }),
    about: pickLocale(locale, { ko: "About", en: "About", zh: "关于" }),
    services: pickLocale(locale, { ko: "서비스", en: "Services", zh: "服务" }),
    software: pickLocale(locale, { ko: "소프트웨어", en: "Software", zh: "软件" }),
    group: pickLocale(locale, { ko: "그룹사", en: "Group companies", zh: "集团公司" }),
    news: pickLocale(locale, { ko: "소식", en: "News", zh: "资讯" }),
    contact: pickLocale(locale, { ko: "문의", en: "Contact", zh: "联系" }),
    menu: pickLocale(locale, { ko: "메뉴", en: "Menu", zh: "菜单" }),
    langLabel: pickLocale(locale, { ko: "언어 선택", en: "Language", zh: "语言" }),
    footerInquiry: pickLocale(locale, { ko: "문의", en: "Contact", zh: "联系" }),
    footerLinks: pickLocale(locale, { ko: "링크", en: "Links", zh: "链接" }),
    companyProfilePdf: pickLocale(locale, {
      ko: "회사 프로필 PDF",
      en: "Company profile (PDF)",
      zh: "公司简介（PDF）",
    }),
    aboutIntro: pickLocale(locale, {
      ko: "회사 소개",
      en: "About the company",
      zh: "公司简介",
    }),
    admin: pickLocale(locale, { ko: "관리자", en: "Admin", zh: "管理" }),
    copyright: pickLocale(locale, { ko: "", en: "All rights reserved.", zh: "保留所有权利。" }),
    groupSection: pickLocale(locale, { ko: "그룹사", en: "Group", zh: "集团" }),
    servicesSection: pickLocale(locale, { ko: "서비스", en: "Services", zh: "服务" }),
    aboutSection: pickLocale(locale, { ko: "About", en: "About", zh: "关于" }),
    newsSection: pickLocale(locale, { ko: "소식", en: "News", zh: "资讯" }),
    googleMapsLarge: pickLocale(locale, {
      ko: "Google 지도에서 크게 보기 →",
      en: "Open in Google Maps →",
      zh: "在 Google 地图中放大查看 →",
    }),
    mapIframeTitle: pickLocale(locale, {
      ko: "본사 위치 (Google Maps)",
      en: "Head office (Google Maps)",
      zh: "总部位置（Google 地图）",
    }),
  };
}
