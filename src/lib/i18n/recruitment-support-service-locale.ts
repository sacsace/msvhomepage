import type { SiteLocale } from "@/lib/site-locale";
import { pickLocale } from "@/lib/site-locale";
import { company } from "@/lib/site-content";

export type RecruitmentProcessStep = {
  labelPrefix: string;
  labelNumber: string;
  title: string;
  bullets: readonly string[];
};

export type RecruitmentSupportServiceCopy = {
  metaTitle: string;
  metaDescription: string;
  /** 히어로 제목 위 소형 라벨 */
  heroEyebrow: string;
  pageTitle: string;
  pageDescription: string;
  processTitle: string;
  processBlurb: string;
  processSteps: readonly RecruitmentProcessStep[];
  processClosing: string;
  scopeTitle: string;
  scopeBlurb: string;
  scopeItems: readonly string[];
  footNote: string;
  backToServices: string;
  contactCta: string;
};

const ko: RecruitmentSupportServiceCopy = {
  metaTitle: "채용지원 서비스",
  metaDescription:
    "인도 현지 채용을 JD 작성부터 공고·이력서 검토·사전 인터뷰까지 실무 중심으로 지원합니다. 최종 면접에만 집중할 수 있도록 돕습니다.",
  heroEyebrow: "LOCAL RECRUITMENT SUPPORT",
  pageTitle: "채용지원 서비스",
  pageDescription:
    "MS Ventures는 인도 현지 채용 프로세스를 실무 중심으로 지원합니다.\nJD(Job Description) 작성부터 채용 공고 운영, 이력서 검토, 사전 인터뷰까지 진행하여,\n고객사가 최종 면접에만 집중할 수 있도록 지원합니다.",
  processTitle: "채용 진행 프로세스",
  processBlurb: "실제 채용 대행 흐름을 단계별로 정리했습니다.",
  processSteps: [
    {
      labelPrefix: "STEP",
      labelNumber: "01",
      title: "JD 작성 및 채용\n포지션 정의",
      bullets: ["직무 분석", "채용 조건 정리", "급여/경력 범위 협의"],
    },
    {
      labelPrefix: "STEP",
      labelNumber: "02",
      title: "채용 공고 등록 및 채널 운영",
      bullets: ["Naukri / LinkedIn 등 채널 운영", "후보자 모집", "초기 커뮤니케이션\n진행"],
    },
    {
      labelPrefix: "STEP",
      labelNumber: "03",
      title: "이력서 검토 및 1차 선별",
      bullets: ["이력서 검토", "경력 및 기술 검증", "조건 적합 여부 확인"],
    },
    {
      labelPrefix: "STEP",
      labelNumber: "04",
      title: "사전 인터뷰 및 후보자 압축",
      bullets: ["기본 인터뷰 진행", "실무 적합성 및\n커뮤니케이션 검토", "최종 후보자 리스트 정리"],
    },
    {
      labelPrefix: "STEP",
      labelNumber: "05",
      title: "최종 면접 지원",
      bullets: ["고객사 최종 면접\n일정 조율", "인터뷰 피드백 정리", "오퍼 및 입사 프로세스 지원"],
    },
  ],
  processClosing: "고객사는 최종 면접 및 핵심 의사결정에 집중할 수 있습니다.",
  scopeTitle: "지원 범위",
  scopeBlurb: "인도 현지 채용 운영 과정에서 필요한 주요 지원 항목을 정리했습니다.",
  scopeItems: [
    "JD(Job Description) 작성 지원",
    "채용 공고 등록 및 관리",
    "이력서 검토 및 후보자 선별",
    "사전 인터뷰 진행",
    "면접 일정 조율",
    "오퍼레터 및 초기 온보딩 지원",
    "한국어·영어 커뮤니케이션 지원",
    "현지 채용 시장 기반 급여 범위 가이드",
  ],
  footNote:
    "채용 진행 방식 및 후보자 수급 상황은 직무·지역·경력 수준에 따라 달라질 수 있습니다.\n최종 채용 결정은 고객사의 판단을 기준으로 진행됩니다.\n\n※ 채용 프로젝트는 사전 협의 및 계약 체결 후 진행되며, 업무 착수는 선급금 확인 이후 순차적으로 진행됩니다.",
  backToServices: "서비스로 돌아가기",
  contactCta: "문의하기",
};

const en: RecruitmentSupportServiceCopy = {
  metaTitle: "Recruitment support",
  metaDescription: `${company.shortName} · India hiring from JD and postings through CV review and pre-screening, so you can focus on final interviews.`,
  heroEyebrow: "LOCAL RECRUITMENT SUPPORT",
  pageTitle: "Recruitment support",
  pageDescription:
    `${company.shortName} supports India hiring operations with a practical, hands-on approach.\nFrom drafting job descriptions and running postings to CV review and pre-interviews,\nwe help your team stay focused on final interviews.`,
  processTitle: "How we run hiring",
  processBlurb: "A concise view of how we run hiring on the ground.",
  processSteps: [
    {
      labelPrefix: "STEP",
      labelNumber: "01",
      title: "JD and role definition",
      bullets: ["Role analysis", "Hiring criteria alignment", "Salary and experience band alignment"],
    },
    {
      labelPrefix: "STEP",
      labelNumber: "02",
      title: "Postings and channel management",
      bullets: ["Channels such as Naukri / LinkedIn", "Candidate sourcing", "Early candidate communication"],
    },
    {
      labelPrefix: "STEP",
      labelNumber: "03",
      title: "CV review and first-pass screening",
      bullets: ["CV review", "Experience and skills checks", "Fit against agreed criteria"],
    },
    {
      labelPrefix: "STEP",
      labelNumber: "04",
      title: "Pre-interviews and shortlisting",
      bullets: ["Structured pre-interviews", "Practical fit and communication review", "Final shortlist preparation"],
    },
    {
      labelPrefix: "STEP",
      labelNumber: "05",
      title: "Final interview support",
      bullets: ["Scheduling with your team", "Interview feedback consolidation", "Offer and joining process support"],
    },
  ],
  processClosing: "Your team can focus on final interviews and the decisions that matter most.",
  scopeTitle: "What we cover",
  scopeBlurb:
    "Key support areas we provide across India hiring operations, from sourcing through shortlisting and coordination.",
  scopeItems: [
    "Job description (JD) drafting support",
    "Posting setup and ongoing management",
    "CV review and candidate screening",
    "Pre-interviews on your behalf",
    "Interview scheduling and coordination",
    "Offer letters and early onboarding support",
    "Korean and English communication support",
    "Salary band guidance based on the local market",
  ],
  footNote:
    "Timelines and candidate flow vary by role, location, and seniority.\nFinal hiring decisions remain with your organisation.\n\n※ Recruitment projects proceed after preliminary discussion and contract signing; work begins in sequence once advance payment is confirmed.",
  backToServices: "Back to services",
  contactCta: "Contact us",
};

const zh: RecruitmentSupportServiceCopy = {
  metaTitle: "招聘支持服务",
  metaDescription: `${company.shortName} · 从职位说明、发布与渠道运营到简历筛选与初试，协助您把精力放在终面。`,
  heroEyebrow: "LOCAL RECRUITMENT SUPPORT",
  pageTitle: "招聘支持服务",
  pageDescription:
    `${company.shortName}以实务方式协助印度本地招聘流程。\n从撰写职位说明（JD）、运营招聘发布与渠道，到简历筛选与初试，\n帮助贵司将精力集中在终面环节。`,
  processTitle: "招聘推进流程",
  processBlurb: "以下为实际协助推进的招聘流程概览。",
  processSteps: [
    {
      labelPrefix: "步骤",
      labelNumber: "01",
      title: "撰写 JD 与岗位界定",
      bullets: ["岗位分析", "招聘条件梳理", "薪资与经验区间协商"],
    },
    {
      labelPrefix: "步骤",
      labelNumber: "02",
      title: "发布职位与渠道运营",
      bullets: ["Naukri / LinkedIn 等渠道运营", "候选人招募", "初期沟通"],
    },
    {
      labelPrefix: "步骤",
      labelNumber: "03",
      title: "简历筛选与初筛",
      bullets: ["简历审阅", "经历与技能核验", "条件匹配评估"],
    },
    {
      labelPrefix: "步骤",
      labelNumber: "04",
      title: "初试与候选人压缩",
      bullets: ["基础面试", "沟通与实务适配评估", "终选候选人名单整理"],
    },
    {
      labelPrefix: "步骤",
      labelNumber: "05",
      title: "终面支持",
      bullets: ["协调贵司终面日程", "面试反馈整理", "录用与入职流程协助"],
    },
  ],
  processClosing: "贵司可将重心放在终面及关键决策上。",
  scopeTitle: "服务范围",
  scopeBlurb: "以下梳理在印度本地招聘运营中可提供的主要协助项。",
  scopeItems: [
    "职位说明（JD）撰写协助",
    "招聘发布登记与管理",
    "简历审阅与候选人筛选",
    "初试（预面试）执行",
    "面试日程协调",
    "录用通知与初期入职协助",
    "韩语、英语沟通支持",
    "基于当地市场的薪资区间参考",
  ],
  footNote:
    "推进方式与候选人供给会因岗位、地区与资历而异。\n最终录用决定以贵司判断为准。\n\n※ 招聘项目在事前协商并签订合同后启动；实务工作在确认预付款后按顺序推进。",
  backToServices: "返回服务页",
  contactCta: "联系我们",
};

export function recruitmentSupportServiceCopy(locale: SiteLocale): RecruitmentSupportServiceCopy {
  return pickLocale(locale, { ko, en, zh });
}
