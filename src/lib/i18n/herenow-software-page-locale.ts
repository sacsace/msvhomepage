import type { SiteLocale } from "@/lib/site-locale";
import { pickLocale } from "@/lib/site-locale";
import { company } from "@/lib/site-content";

export type HerenowSoftwareSectionCopy = {
  eyebrow: string;
  title: string;
  body: string;
};

export type HerenowSoftwarePageCopy = {
  metaTitle: string;
  metaDescription: string;
  pageTitle: string;
  pageHeaderDescription: string;
  overviewEyebrow: string;
  overviewTitle: string;
  heroLead: string;
  sections: readonly HerenowSoftwareSectionCopy[];
  ctaLead: string;
  linkSoftware: string;
  linkAbout: string;
  linkServices: string;
  linkContact: string;
};

const ko: HerenowSoftwarePageCopy = {
  metaTitle: "출퇴근 기록 시스템 (HereNow)",
  metaDescription:
    "회사(테넌트) 단위로 격리되는 출퇴근·근태 관리 웹앱입니다. 세부 기능·도입 문의는 담당자에게 연락 주시면 안내드립니다.",
  pageTitle: "출퇴근 기록 시스템 (HereNow)",
  pageHeaderDescription:
    "회사(테넌트) 단위로 격리되는 출퇴근·근태 관리 웹앱입니다. 세부 기능·도입 문의는 담당자에게 연락 주시면 안내드립니다.",
  overviewEyebrow: "Overview",
  overviewTitle: "개요",
  heroLead: `HereNow는 회사(테넌트)마다 데이터와 설정이 분리되는 출퇴근·근태 관리 웹 애플리케이션입니다. 조직 단위로 근무지·근태 정책을 적용할 수 있도록 설계하는 것을 목표로 합니다.

법인 ${company.shortName}의 회계·세무 실행은 서비스 페이지와 동일한 전문 조직이 담당합니다.`,
  sections: [
    {
      eyebrow: "Focus",
      title: "테넌트·근태",
      body: "회사(조직) 단위로 환경을 격리해, 타 고객사 데이터와 섞이지 않도록 하는 방향입니다.\n\n출퇴근 기록·근태 승인 등 구체적인 화면·모듈은 제품 로드맵에 따라 공개됩니다.",
    },
    {
      eyebrow: "Fit",
      title: "MSV 서비스와의 관계",
      body: "인사·근태 데이터는 회계·급여 처리와 맞물릴 수 있으며, 회계·세무·컴플라이언스 실행은 상근 CPA 체계의 서비스와 연계됩니다.",
    },
    {
      eyebrow: "Next",
      title: "문의",
      body: "도입·데모·협업 가능 여부는 문의 페이지로 연락 주시면 담당자가 안내드립니다.",
    },
  ],
  ctaLead: "소프트웨어·서비스 소개로 이동하시거나, 도입·연동 문의를 남겨 주세요.",
  linkSoftware: "소프트웨어",
  linkAbout: "회사 소개",
  linkServices: "서비스",
  linkContact: "문의하기",
};

const en: HerenowSoftwarePageCopy = {
  metaTitle: "Attendance system (HereNow)",
  metaDescription: `${company.shortName} — tenant-isolated web app for clock-in/out and attendance. Contact us for features and adoption.`,
  pageTitle: "Attendance system (HereNow)",
  pageHeaderDescription:
    "A web app for clock-in/out and attendance with data and settings isolated per company (tenant). Contact us for detailed features and adoption.",
  overviewEyebrow: "Overview",
  overviewTitle: "Overview",
  heroLead: `HereNow is a web application for clock-in/out and attendance where each company (tenant) has separated data and settings. It is designed so workplaces and attendance policies can be applied at organisation level.

${company.shortName}’s accounting and tax delivery is handled by the same specialist organisation as on the Services page.`,
  sections: [
    {
      eyebrow: "Focus",
      title: "Tenant & attendance",
      body: "The direction is to isolate each company’s environment so customer data does not mix.\n\nSpecific screens and modules for clock records and attendance approvals will be disclosed according to the product roadmap.",
    },
    {
      eyebrow: "Fit",
      title: "Relationship to MSV services",
      body: "HR and attendance data can connect to accounting and payroll processing; accounting, tax and compliance execution links to the in-house CPA-led service line.",
    },
    {
      eyebrow: "Next",
      title: "Contact",
      body: "For adoption, demos or partnership, use the Contact page and our team will respond.",
    },
  ],
  ctaLead: "Go to software and services, or leave a message about adoption and integrations.",
  linkSoftware: "Software",
  linkAbout: "About",
  linkServices: "Services",
  linkContact: "Contact",
};

const zh: HerenowSoftwarePageCopy = {
  metaTitle: "考勤记录系统（HereNow）",
  metaDescription: `${company.shortName} — 按公司（租户）隔离数据的打卡与考勤网页应用。功能细节与采购请咨询我们。`,
  pageTitle: "考勤记录系统（HereNow）",
  pageHeaderDescription:
    "按公司（租户）隔离数据与设置的打卡与考勤管理网页应用。功能细节与采购事宜请联系负责人，我们将予以说明。",
  overviewEyebrow: "Overview",
  overviewTitle: "概述",
  heroLead: `HereNow 是一款打卡与考勤管理网页应用，各公司（租户）的数据与设置相互隔离，目标是在组织维度应用工作地点与考勤政策。

法人 ${company.shortName} 的会计与税务落地由与服务页面相同的专业团队负责。`,
  sections: [
    {
      eyebrow: "Focus",
      title: "租户与考勤",
      body: "按公司（组织）隔离环境，避免与其他客户数据混用。\n\n打卡记录、考勤审批等具体界面与模块将随产品路线图陆续公开。",
    },
    {
      eyebrow: "Fit",
      title: "与 MSV 服务的关系",
      body: "人事与考勤数据可与会计、工资处理衔接；会计、税务与合规执行与常驻 CPA 体系的服务线联动。",
    },
    {
      eyebrow: "Next",
      title: "咨询",
      body: "采购、演示或合作意向请通过联系页面垂询，将由负责人回复。",
    },
  ],
  ctaLead: "可前往软件与服务介绍页面，或留下采购与对接集成的咨询。",
  linkSoftware: "软件",
  linkAbout: "公司介绍",
  linkServices: "服务",
  linkContact: "联系我们",
};

export function herenowSoftwarePageCopy(locale: SiteLocale): HerenowSoftwarePageCopy {
  return pickLocale(locale, { ko, en, zh });
}
