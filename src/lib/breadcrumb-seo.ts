import { groupCompanies } from "@/lib/site-content";
import { absoluteSiteUrl } from "@/lib/seo-metadata";
import type { SiteLocale } from "@/lib/site-locale";
import { pickLocale, stripLocalePrefix, withLocalePrefix } from "@/lib/site-locale";

type BreadcrumbItem = { name: string; url: string };

const STATIC_LABELS: Record<string, { ko: string; en: string; zh: string }> = {
  "/about": { ko: "회사 소개", en: "About", zh: "公司介绍" },
  "/about/ci": { ko: "CI 가이드", en: "Brand guidelines", zh: "品牌规范" },
  "/about/team": { ko: "팀원 소개", en: "Team", zh: "团队" },
  "/about/clients": { ko: "고객사", en: "Clients", zh: "客户" },
  "/services": { ko: "서비스", en: "Services", zh: "服务" },
  "/software": { ko: "소프트웨어", en: "Software", zh: "软件" },
  "/software/mvs": { ko: "업무 통합 시스템 (MVS)", en: "Integrated Business System (MVS)", zh: "业务集成系统（MVS）" },
  "/software/herenow": { ko: "출퇴근 기록 (HeresNow)", en: "Attendance (HeresNow)", zh: "考勤（HeresNow）" },
  "/software/payroll-mailer": { ko: "급여 명세서 이메일", en: "Payroll payslip email", zh: "工资单邮件" },
  "/software/wisc": { ko: "WISC", en: "WISC", zh: "WISC" },
  "/group": { ko: "그룹 · 법인", en: "Group companies", zh: "集团与法人" },
  "/contact": { ko: "문의", en: "Contact", zh: "联系" },
  "/notice": { ko: "공지사항", en: "Announcements", zh: "公告" },
  "/ongoing": { ko: "프로젝트 현황", en: "Project status", zh: "项目动态" },
  "/articles": { ko: "자료실", en: "Resources", zh: "资料库" },
  "/team": { ko: "팀", en: "Team", zh: "团队" },
  "/services/compliance-calendar": { ko: "준수 달력", en: "Compliance calendar", zh: "合规日历" },
  "/services/corporate-incorporation": { ko: "법인 설립", en: "Incorporation", zh: "公司设立" },
  "/services/corporate-incorporation/apply": { ko: "설립 신청", en: "Apply", zh: "设立申请" },
  "/services/corporate-liquidation": { ko: "법인 청산", en: "Liquidation", zh: "公司清算" },
  "/services/corporate-merger": { ko: "법인 합병", en: "Merger", zh: "公司合并" },
  "/services/frro": { ko: "FRRO", en: "FRRO", zh: "FRRO" },
  "/services/form-41-registration": { ko: "Form 41", en: "Form 41", zh: "Form 41" },
  "/services/ecb": { ko: "ECB", en: "ECB", zh: "ECB" },
  "/services/license-registration": { ko: "인허가 등록", en: "Licenses", zh: "许可注册" },
  "/services/recruitment-support": { ko: "채용 지원", en: "Recruitment", zh: "招聘支持" },
  "/services/personal-income-tax-calculator": { ko: "개인소득세 계산기", en: "Personal tax calculator", zh: "个税计算器" },
  "/services/corporate-tax-calculator": { ko: "법인세 계산기", en: "Corporate tax calculator", zh: "企业所得税计算器" },
  "/services/professional-tax-calculator": { ko: "프로페셔널 세 계산기", en: "Professional tax calculator", zh: "职业税计算器" },
  "/services/india-accounting-glossary": { ko: "회계 용어집", en: "Accounting glossary", zh: "会计术语" },
};

function labelForPath(path: string, locale: SiteLocale): string {
  const group = groupCompanies.find((g) => path === `/group/${g.slug}`);
  if (group) return group.menuLabel;

  const staticLabel = STATIC_LABELS[path];
  if (staticLabel) {
    return pickLocale(locale, staticLabel);
  }

  if (path.startsWith("/services/")) {
    const slug = path.slice("/services/".length);
    return slug.replace(/-/g, " ");
  }
  if (path.startsWith("/notice/")) {
    return pickLocale(locale, { ko: "공지 상세", en: "Announcement", zh: "公告详情" });
  }
  if (path.startsWith("/articles/")) {
    return pickLocale(locale, { ko: "자료 상세", en: "Article", zh: "资料详情" });
  }

  const tail = path.split("/").filter(Boolean).pop() ?? "";
  return tail.replace(/-/g, " ");
}

export function buildBreadcrumbItems(browserPath: string, locale: SiteLocale): BreadcrumbItem[] | null {
  const internal = stripLocalePrefix(browserPath.split("#")[0] || browserPath);

  const homeLabel = pickLocale(locale, { ko: "홈", en: "Home", zh: "首页" });
  if (internal === "/" || internal === "") {
    return [{ name: homeLabel, url: absoluteSiteUrl(withLocalePrefix("/", locale)) }];
  }

  const items: BreadcrumbItem[] = [
    { name: homeLabel, url: absoluteSiteUrl(withLocalePrefix("/", locale)) },
  ];

  const segments = internal.split("/").filter(Boolean);
  let acc = "";
  for (const seg of segments) {
    acc += `/${seg}`;
    items.push({
      name: labelForPath(acc, locale),
      url: absoluteSiteUrl(withLocalePrefix(acc, locale)),
    });
  }

  return items;
}

export function buildBreadcrumbJsonLd(browserPath: string, locale: SiteLocale): Record<string, unknown> | null {
  const items = buildBreadcrumbItems(browserPath, locale);
  if (!items || items.length === 0) return null;

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
