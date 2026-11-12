import type { SiteLocale } from "@/lib/site-locale";
import { pickLocale } from "@/lib/site-locale";
import { company } from "@/lib/site-content";

type Label3 = { readonly ko: string; readonly en: string; readonly zh: string };

type NavItemDef = { readonly path: string; readonly label: Label3; readonly external?: boolean };

type NavGroupDef = { readonly heading: Label3; readonly items: readonly NavItemDef[] };

/** 계산기·실무 가이드·일정·용어·다운로드 — URL은 기존 유지 */
const RESOURCES_NAV_GROUP_DEFS: readonly NavGroupDef[] = [
  {
    heading: {
      ko: "세금·급여 계산기",
      en: "Tax & payroll calculators",
      zh: "税务与薪酬计算器",
    },
    items: [
      {
        path: "/services/personal-income-tax-calculator",
        label: { ko: "급여 TDS", en: "Salary TDS", zh: "工资 TDS" },
      },
      {
        path: "/services/corporate-tax-calculator",
        label: { ko: "법인세", en: "Corporate tax", zh: "企业所得税" },
      },
      {
        path: "/services/professional-tax-calculator",
        label: { ko: "Professional Tax", en: "Professional Tax", zh: "Professional Tax" },
      },
      {
        path: "/services/gratuity-calculator",
        label: { ko: "퇴직금", en: "Gratuity", zh: "退休金" },
      },
    ],
  },
  {
    heading: {
      ko: "실무 가이드",
      en: "Practice guides",
      zh: "实务指南",
    },
    items: [
      {
        path: "/services/guide-india-tax",
        label: { ko: "세무", en: "Tax", zh: "税务" },
      },
      {
        path: "/services/guide-india-accounting",
        label: { ko: "회계", en: "Accounting", zh: "会计" },
      },
      {
        path: "/services/gst-practice-guide",
        label: { ko: "GST", en: "GST", zh: "GST" },
      },
      {
        path: "/services/guide-fema-fx",
        label: { ko: "외환", en: "FEMA & FX", zh: "外汇" },
      },
      {
        path: "/services/guide-hr-labour",
        label: { ko: "노동법", en: "Labour law", zh: "劳动法" },
      },
      {
        path: "/services/guide-companies-act",
        label: { ko: "회사법", en: "Companies Act", zh: "公司法" },
      },
    ],
  },
  {
    heading: {
      ko: "신고 일정",
      en: "Compliance calendar",
      zh: "申报日程",
    },
    items: [
      {
        path: "/services/compliance-calendar",
        label: {
          ko: "세무·법정 신고 일정",
          en: "Tax & statutory deadlines",
          zh: "税务与法定申报日程",
        },
      },
    ],
  },
  {
    heading: {
      ko: "용어사전",
      en: "Glossary",
      zh: "术语表",
    },
    items: [
      {
        path: "/services/india-accounting-glossary",
        label: {
          ko: "인도 회계·세무 용어",
          en: "India accounting & tax terms",
          zh: "印度会计税务术语",
        },
      },
    ],
  },
  {
    heading: {
      ko: "자료 다운로드",
      en: "Downloads",
      zh: "资料下载",
    },
    items: [
      {
        path: "/articles",
        label: { ko: "안내 자료·게시글", en: "Guides & articles", zh: "说明资料与文章" },
      },
      {
        path: company.brochurePath,
        label: { ko: "회사 소개서 (PDF)", en: "Company profile (PDF)", zh: "公司简介（PDF）" },
        external: true,
      },
    ],
  },
] as const;

export type ResourcesNavGroup = {
  readonly heading: string;
  readonly items: readonly {
    readonly href: string;
    readonly label: string;
    readonly external?: boolean;
  }[];
};

export function resourcesNavGroups(locale: SiteLocale): readonly ResourcesNavGroup[] {
  return RESOURCES_NAV_GROUP_DEFS.map((g) => ({
    heading: pickLocale(locale, g.heading),
    items: g.items.map((i) => ({
      href: i.path,
      label: pickLocale(locale, i.label),
      external: i.external,
    })),
  }));
}

export function resourceNavPaths(): ReadonlySet<string> {
  return new Set(
    RESOURCES_NAV_GROUP_DEFS.flatMap((g) =>
      g.items.filter((i) => !i.external && i.path.startsWith("/")).map((i) => i.path),
    ),
  );
}

export function isResourcesBarePath(bare: string): boolean {
  if (bare === "/articles" || bare.startsWith("/articles/")) return true;
  if (resourceNavPaths().has(bare)) return true;
  for (const p of resourceNavPaths()) {
    if (p !== "/services" && (bare === p || bare.startsWith(`${p}/`))) return true;
  }
  return false;
}
