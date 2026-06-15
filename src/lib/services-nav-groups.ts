import type { SiteLocale } from "@/lib/site-locale";
import { pickLocale } from "@/lib/site-locale";

type Label3 = { readonly ko: string; readonly en: string; readonly zh: string };

type NavItemDef = { readonly path: string; readonly label: Label3 };

type NavGroupDef = { readonly heading: Label3; readonly items: readonly NavItemDef[] };

/** 데스크톱·모바일·회계 서비스 허브 메뉴 공통 소스 (순서 = 노출 순) */
const SERVICE_NAV_GROUP_DEFS: readonly NavGroupDef[] = [
  {
    heading: {
      ko: "법인 · 진출",
      en: "Entity & entry",
      zh: "法人·进入印度",
    },
    items: [
      {
        path: "/services",
        label: {
          ko: "서비스 개요",
          en: "Services overview",
          zh: "服务总览",
        },
      },
      {
        path: "/services/corporate-incorporation",
        label: { ko: "법인 설립 서비스", en: "Corporate incorporation", zh: "公司设立服务" },
      },
      {
        path: "/services/india-entry-guide",
        label: { ko: "인도 진출 가이드", en: "India entry guide", zh: "印度进入指南" },
      },
    ],
  },
  {
    heading: {
      ko: "회계 · 세무",
      en: "Accounting & tax",
      zh: "会计与税务",
    },
    items: [
      {
        path: "/services/gst-practice-guide",
        label: { ko: "GST 실무 안내", en: "GST practice guide", zh: "GST 实务指南" },
      },
      {
        path: "/services/form-41-registration",
        label: {
          ko: "Form 41 / Form 10F 등록·신고",
          en: "Form 41 / Form 10F registration",
          zh: "Form 41 / Form 10F 登记与申报",
        },
      },
      {
        path: "/services/guide-india-tax",
        label: { ko: "인도 세무 가이드", en: "India tax guide", zh: "印度税务指南" },
      },
      {
        path: "/services/guide-india-accounting",
        label: { ko: "인도 회계 가이드", en: "India accounting guide", zh: "印度会计指南" },
      },
      {
        path: "/services/india-accounting-glossary",
        label: { ko: "회계·세무 지식 베이스", en: "Accounting & tax knowledge base", zh: "会计实务知识库" },
      },
    ],
  },
  {
    heading: {
      ko: "구조조정",
      en: "Restructuring",
      zh: "重组",
    },
    items: [
      {
        path: "/services/corporate-merger",
        label: { ko: "법인 합병 안내", en: "Corporate merger guide", zh: "公司合并指引" },
      },
      {
        path: "/services/corporate-liquidation",
        label: { ko: "법인 청산 안내", en: "Company closure guide", zh: "公司注销与休眠指引" },
      },
    ],
  },
  {
    heading: {
      ko: "HR · 노무",
      en: "HR & payroll",
      zh: "人力资源与薪酬",
    },
    items: [
      {
        path: "/services/hr-payroll",
        label: { ko: "HR·Payroll 서비스", en: "HR & payroll services", zh: "人力资源与薪酬服务" },
      },
      {
        path: "/services/recruitment-support",
        label: { ko: "채용지원 서비스", en: "Recruitment support", zh: "招聘支持" },
      },
      {
        path: "/services/guide-hr-labour",
        label: { ko: "HR·노무 가이드", en: "HR & labour guide", zh: "人力资源与劳动指南" },
      },
    ],
  },
  {
    heading: {
      ko: "라이선스 · 공장",
      en: "Licences & factory",
      zh: "许可与工厂",
    },
    items: [
      {
        path: "/services/license-registration",
        label: { ko: "라이선스 등록 서비스", en: "Licence registration", zh: "许可证登记服务" },
      },
      {
        path: "/services/factory-licensing",
        label: { ko: "공장·산업 인허가 안내", en: "Factory & industrial permits", zh: "工厂与工业许可" },
      },
    ],
  },
  {
    heading: {
      ko: "수출입 · 통관",
      en: "Import / export",
      zh: "进出口与通关",
    },
    items: [
      {
        path: "/services/import-export-iec",
        label: { ko: "수출입(IEC)·통관 안내", en: "IEC & customs guide", zh: "IEC 与通关指南" },
      },
    ],
  },
  {
    heading: {
      ko: "FDI · FEMA",
      en: "FDI & FEMA",
      zh: "FDI 与 FEMA",
    },
    items: [
      {
        path: "/services/fdi-fema-guide",
        label: { ko: "FDI·FEMA 안내", en: "FDI & FEMA guide", zh: "FDI 与 FEMA 指南" },
      },
      {
        path: "/services/ecb",
        label: { ko: "ECB·FEMA 실무 안내", en: "ECB / FEMA guide", zh: "ECB·FEMA 实务指南" },
      },
      {
        path: "/services/guide-fema-fx",
        label: { ko: "FEMA·외환 가이드", en: "FEMA & FX guide", zh: "FEMA 与外汇指南" },
      },
    ],
  },
  {
    heading: {
      ko: "FRRO · 비자",
      en: "FRRO & visas",
      zh: "FRRO 与签证",
    },
    items: [
      {
        path: "/services/frro",
        label: { ko: "FRRO 서비스", en: "FRRO services", zh: "FRRO 服务" },
      },
    ],
  },
  {
    heading: {
      ko: "도구 · 일정",
      en: "Tools & calendar",
      zh: "工具与日程",
    },
    items: [
      {
        path: "/services/compliance-calendar",
        label: { ko: "신고준수 달력", en: "Compliance calendar", zh: "合规日历" },
      },
      {
        path: "/services/personal-income-tax-calculator",
        label: { ko: "급여 TDS 계산기", en: "Salary TDS calculator", zh: "工资 TDS 计算器" },
      },
      {
        path: "/services/corporate-tax-calculator",
        label: { ko: "법인세 계산기", en: "Corporate tax calculator", zh: "企业所得税计算器" },
      },
      {
        path: "/services/professional-tax-calculator",
        label: { ko: "Professional Tax 계산기", en: "Professional Tax (PT) calculator", zh: "Professional Tax（PT）计算器" },
      },
    ],
  },
  {
    heading: {
      ko: "계약 · 거버넌스",
      en: "Contracts & governance",
      zh: "合同与公司治理",
    },
    items: [
      {
        path: "/services/contracts-legal",
        label: { ko: "계약·법률 문서", en: "Contracts & legal templates", zh: "合同与法律文件" },
      },
      {
        path: "/services/guide-companies-act",
        label: { ko: "회사법 가이드", en: "Companies Act guide", zh: "公司法指南" },
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
