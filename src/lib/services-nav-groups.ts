import type { SiteLocale } from "@/lib/site-locale";
import { pickLocale } from "@/lib/site-locale";

type Label3 = { readonly ko: string; readonly en: string; readonly zh: string };

type NavItemDef = { readonly path: string; readonly label: Label3 };

type NavGroupDef = { readonly heading: Label3; readonly items: readonly NavItemDef[] };

/** 데스크톱·모바일·서비스 허브 메뉴 공통 소스 — 의뢰 업무 기준 분류 */
const SERVICE_NAV_GROUP_DEFS: readonly NavGroupDef[] = [
  {
    heading: {
      ko: "법인 설립·인도 진출",
      en: "Incorporation & India entry",
      zh: "公司设立·进入印度",
    },
    items: [
      {
        path: "/services/corporate-incorporation",
        label: { ko: "법인 설립", en: "Corporate incorporation", zh: "公司设立" },
      },
      {
        path: "/services/india-entry-guide",
        label: { ko: "인도 진출 안내", en: "India entry guide", zh: "印度进入指南" },
      },
      {
        path: "/services/factory-licensing",
        label: { ko: "공장 설립·인허가", en: "Factory setup & permits", zh: "工厂设立与许可" },
      },
    ],
  },
  {
    heading: {
      ko: "회계·세무",
      en: "Accounting & tax",
      zh: "会计与税务",
    },
    items: [
      {
        path: "/services",
        label: { ko: "회계·세무 관리", en: "Accounting & tax services", zh: "会计与税务管理" },
      },
      {
        path: "/services/gst-practice-guide",
        label: { ko: "GST", en: "GST", zh: "GST" },
      },
      {
        path: "/services/guide-india-tax",
        label: { ko: "법인세·TDS", en: "Corporate tax & TDS", zh: "法人税与 TDS" },
      },
    ],
  },
  {
    heading: {
      ko: "인사·급여",
      en: "HR & payroll",
      zh: "人事与薪酬",
    },
    items: [
      {
        path: "/services/hr-payroll",
        label: { ko: "인사·급여 관리", en: "HR & payroll", zh: "人事与薪酬管理" },
      },
      {
        path: "/services/recruitment-support",
        label: { ko: "채용 지원", en: "Recruitment support", zh: "招聘支持" },
      },
    ],
  },
  {
    heading: {
      ko: "외환·투자",
      en: "FX & investment",
      zh: "外汇与投资",
    },
    items: [
      {
        path: "/services/fdi-fema-guide",
        label: { ko: "FDI·FEMA", en: "FDI & FEMA", zh: "FDI·FEMA" },
      },
      {
        path: "/services/ecb",
        label: { ko: "ECB", en: "ECB", zh: "ECB" },
      },
      {
        path: "/services/form-41-registration",
        label: { ko: "Form 41", en: "Form 41", zh: "Form 41" },
      },
    ],
  },
  {
    heading: {
      ko: "비자·체류",
      en: "Visa & stay",
      zh: "签证与居留",
    },
    items: [
      {
        path: "/services/frro",
        label: { ko: "FRRO 등록", en: "FRRO registration", zh: "FRRO 登记" },
      },
    ],
  },
  {
    heading: {
      ko: "법무·기업 변경",
      en: "Legal & corporate change",
      zh: "法务与公司变更",
    },
    items: [
      {
        path: "/services/contracts-legal",
        label: { ko: "계약 검토", en: "Contract review", zh: "合同审阅" },
      },
      {
        path: "/services/license-registration",
        label: { ko: "인허가 등록", en: "Licence registration", zh: "许可登记" },
      },
      {
        path: "/services/corporate-merger",
        label: { ko: "법인 합병", en: "Corporate merger", zh: "公司合并" },
      },
      {
        path: "/services/corporate-liquidation",
        label: { ko: "법인 청산", en: "Corporate liquidation", zh: "公司清算" },
      },
    ],
  },
  {
    heading: {
      ko: "수출입",
      en: "Import & export",
      zh: "进出口",
    },
    items: [
      {
        path: "/services/import-export-iec",
        label: { ko: "IEC 및 수출입 지원", en: "IEC & trade support", zh: "IEC 与进出口支持" },
      },
    ],
  },
] as const;

export type ServiceNavGroup = {
  readonly heading: string;
  readonly items: readonly { readonly href: string; readonly label: string }[];
};

export function servicesNavGroups(locale: SiteLocale): readonly ServiceNavGroup[] {
  return SERVICE_NAV_GROUP_DEFS.map((g) => ({
    heading: pickLocale(locale, g.heading),
    items: g.items.map((i) => ({
      href: i.path,
      label: pickLocale(locale, i.label),
    })),
  }));
}

/** 서비스 드롭다운에 올리는 경로(자료실 전용 페이지와 구분) */
export function serviceNavPaths(): ReadonlySet<string> {
  return new Set(SERVICE_NAV_GROUP_DEFS.flatMap((g) => g.items.map((i) => i.path)));
}

/** `/services` 허브 카드 그리드용 — 내비와 동일 순서·라벨 */
export function accountingHubMenuLinks(
  locale: SiteLocale,
): readonly { path: string; label: string; current?: boolean }[] {
  return servicesNavGroups(locale).flatMap((g) =>
    g.items.map((item) => ({
      path: item.href,
      label: item.label,
      current: item.href === "/services",
    })),
  );
}
