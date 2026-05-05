import { company } from "@/lib/site-content";
import type { SiteLocale } from "@/lib/site-locale";

export const milestonesEn = [
  {
    phase: "Foundation",
    title: "One-stop operating model",
    description:
      "Built an execution-led organization that runs incorporation, accounting, export/import, HR, expatriate visas and licensing in-house—minimizing hand-offs to third parties.",
  },
  {
    phase: "Growth",
    title: "Cross-industry references",
    description:
      "Accumulated Korean and global corporate projects across manufacturing, construction, hospitality, distribution and biotech—expanding field know-how.",
  },
  {
    phase: "Network",
    title: "Group & partner ecosystem",
    description:
      "Strengthened delivery with Wilmat (premium entrance matting) in India, Lotus Korean Hotel, and export/engineering affiliates (Neocle, Seda)—from consulting through logistics and accommodation.",
  },
  {
    phase: "Today",
    title: "Nationwide consulting & operations",
    description:
      "Supports incorporation, non-stop operations and investment reviews across India including Bangalore, Chennai and Delhi.",
  },
] as const;

export const overviewEn = {
  title: "Company overview",
  body: `${company.shortName} is an execution-led partner for India entities, centered on accounting, tax and compliance. Monthly, quarterly and annual bookkeeping, GST, TDS, corporate tax and FDI filings, audit and transfer-pricing responses are delivered by a resident CPA-led team in Bangalore. Company formation, licensing, HR, import/export and expatriate support, plus Wilmat entrance-mat supply and Lotus Korean Hotel, are coordinated with group brands so accounting data and operations stay connected. Headquartered at ${company.address}, we integrate incorporation, accounting, tax, licensing and HR in one organization. Accounting and tax are led on a day-to-day basis by Vice President Ha Heon-beom (Korean CPA) and Kashul Sharma (Indian CA), aligning IFRS with India regulatory practice.`,
} as const;

export const visionEn = {
  headline: "India’s most dependable execution partner",
  statement:
    "From incorporation through scale, we stay beside customers inside complex regulation and culture, aiming to be a trusted bridge between Korea and India.",
  pillars: [
    {
      title: "Execution",
      text: "We do not stop at documents and advice—we take ownership of filings, banks and revenue authorities on the ground.",
    },
    {
      title: "Transparency",
      text: "Accounting, tax and regulatory responses are delivered with accuracy and open communication.",
    },
    {
      title: "Shared growth",
      text: "We treat customer settlement and sustainable growth as our own outcome and invest in long-term relationships.",
    },
  ],
} as const;

export const milestonesZh = [
  {
    phase: "创立",
    title: "一站式执行模式",
    description:
      "建立以落地执行为核心的组织，在内部统筹公司设立、会计、进出口、人力、外籍签证与许可，尽量减少对第三方的转手。",
  },
  {
    phase: "成长",
    title: "跨行业项目沉淀",
    description:
      "在制造、建筑、酒店、流通与生物科技等领域积累韩国及全球企业项目，持续扩展现场经验。",
  },
  {
    phase: "网络",
    title: "集团与合作伙伴生态",
    description:
      "与 Wilmat（高端入口地垫）、Lotus Korean Hotel 及进出口/工程关联企业（Neocle、Seda）等协同交付，从咨询到物流与住宿形成闭环。",
  },
  {
    phase: "今天",
    title: "全国范围的咨询与运营",
    description:
      "支持在印度全境（含班加罗尔、金奈、德里等）的公司设立、持续运营与投资相关审查。",
  },
] as const;

export const overviewZh = {
  title: "公司简介",
  body: `${company.shortName} 是面向印度实体的执行型合作伙伴，以会计、税务与合规为核心。由常驻班加罗尔的注册会计师团队负责月度、季度与年度账务、GST、TDS、法人税与外商投资申报、审计及转让定价应对。公司设立、许可、人力、进出口与外籍支持，以及 Wilmat 入口地垫与 Lotus Korean Hotel 等业务，与集团品牌协同衔接，使会计数据与运营保持一致。总部位于 ${company.address}，将设立、会计、税务、许可与人力整合在同一组织内。会计与税务日常工作由副总裁河宪范（韩国注册会计师）与 Kashul Sharma（印度特许会计师）牵头，在 IFRS 与印度监管实践之间对齐。`,
} as const;

export const visionZh = {
  headline: "在印度最值得信赖的执行伙伴",
  statement:
    "从设立到规模化发展，我们在复杂的制度与文化环境中与客户并肩前行，致力于成为连接韩国与印度的可靠桥梁。",
  pillars: [
    {
      title: "执行力",
      text: "不止于文件与建议——我们对申报、银行与税务机关等落地环节负责到底。",
    },
    {
      title: "透明",
      text: "以准确的信息与开放的沟通交付会计、税务与监管应对。",
    },
    {
      title: "共同成长",
      text: "把客户的稳健落地与可持续增长视为自身成果，并投资于长期关系。",
    },
  ],
} as const;

export type AboutPageI18n = {
  metaTitle: string;
  metaDescription: string;
  pageTitle: string;
  pageDescription: string;
  historyEyebrow: string;
  historyTitle: string;
  historySubtitle: string;
  milestonesEyebrow: string;
  milestonesTitle: string;
  milestonesSubtitle: string;
  divisionsEyebrow: string;
  divisionsTitle: string;
  divisionsSubtitle: string;
  websiteCta: string;
  servicesCta: string;
  credentialTitle: string;
  credentialSubtitle: string;
  strengthsTitle: string;
  historyEmpty: string;
};

const aboutPageEn: AboutPageI18n = {
  metaTitle: "About",
  metaDescription: `${company.legalName} (${company.shortName}) — India incorporation, accounting, tax, operations and vision.`,
  pageTitle: "About the company",
  pageDescription: `${company.legalName} (${company.shortName}) is a one-stop business partner for India incorporation, accounting, tax and operations—with accountable execution on the ground.`,
  historyEyebrow: "History",
  historyTitle: "Company history",
  historySubtitle:
    "The timeline below reflects what administrators save under “Company history”. Wording can be aligned with official external materials when updated.",
  milestonesEyebrow: "Milestones",
  milestonesTitle: "Milestones",
  milestonesSubtitle:
    "Key growth phases. Specific dates can be synchronized with official publications and updated in site content when needed.",
  divisionsEyebrow: "Divisions",
  divisionsTitle: "Business divisions",
  divisionsSubtitle: `Major operating areas led directly by ${company.shortName}.`,
  websiteCta: "Website →",
  servicesCta: "Service details →",
  credentialTitle: "Company credentials",
  credentialSubtitle:
    "We do not distribute original PDFs here—the images are first-page previews prepared for external use. Regenerate PNGs under public/company-credentials/ with npm run credentials:export when documents change.",
  strengthsTitle: "Strengths at a glance",
  historyEmpty: "No history entries yet.",
};

const aboutPageZh: AboutPageI18n = {
  metaTitle: "关于我们",
  metaDescription: `${company.legalName}（${company.shortName}）— 印度公司设立、会计、税务、运营与愿景。`,
  pageTitle: "公司简介",
  pageDescription: `${company.legalName}（${company.shortName}）是面向印度公司设立、会计、税务与运营的一站式商业伙伴，并在现场承担可问责的执行。`,
  historyEyebrow: "沿革",
  historyTitle: "公司沿革",
  historySubtitle: "以下时间线反映管理员在「公司沿革」中保存的内容。措辞可与对外正式资料对齐后更新。",
  milestonesEyebrow: "里程碑",
  milestonesTitle: "里程碑",
  milestonesSubtitle: "主要成长阶段。具体日期可与官方出版物同步，并在站点内容中按需更新。",
  divisionsEyebrow: "事业部",
  divisionsTitle: "业务板块",
  divisionsSubtitle: `${company.shortName} 直接运营的主要业务领域。`,
  websiteCta: "网站 →",
  servicesCta: "服务详情 →",
  credentialTitle: "公司资质",
  credentialSubtitle:
    "此处不提供原始 PDF——图片为对外使用准备的首页预览。文档变更时请使用 npm run credentials:export 重新生成 public/company-credentials/ 下的 PNG。",
  strengthsTitle: "优势一览",
  historyEmpty: "暂无沿革记录。",
};

export function aboutPageCopy(locale: SiteLocale): AboutPageI18n | null {
  if (locale === "en") return aboutPageEn;
  if (locale === "zh") return aboutPageZh;
  return null;
}
