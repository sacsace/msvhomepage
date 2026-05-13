import type { SiteLocale } from "@/lib/site-locale";
import { pickLocale } from "@/lib/site-locale";
import { company } from "@/lib/site-content";

export type LicenseCardItem = {
  name: string;
  subtitle?: string;
  description: string;
  disableModal?: boolean;
  monochrome?: boolean;
  comingSoon?: boolean;
};

/** 모달·타임라인 등 · 클라이언트에 전달 가능한 lookup만 포함 */
export type LicenseRegistrationModalLookups = {
  ui: {
    /** 카드 버튼 aria-label 접미(항목명과 조합) */
    clickToSeeMore: string;
    close: string;
    closeAria: string;
    comingSoon: string;
    timelineHeading: string;
    registrationOwnerHeading: string;
    detailHeading: string;
    disclaimerHeading: string;
    disclaimerBody: string;
    /** 카드 하단 통일 CTA (전체 버튼 클릭 가능) */
    viewDetailsCta: string;
    /** 모달 하단 관련 등록 섹션 제목 */
    relatedHeading: string;
  };
  timelineDefault: string;
  timelineByName: Partial<Record<string, string>>;
  ownerDefault: string;
  ownerByName: Partial<Record<string, string>>;
  detailDefault: readonly string[];
  detailByName: Partial<Record<string, readonly string[]>>;
  /** 카드 `name` 기준 관련 등록(앵커 이동); 값은 `licenseCardShell`의 name과 동일 */
  relatedByName: Partial<Record<string, readonly string[]>>;
  /** 관련 등록 목록 아래 보조 문구(예: PF/ESI) */
  relatedNoteByName?: Partial<Record<string, string>>;
};

export type LicenseTaxonomyGroup = {
  heading: string;
  /** `licenseCardShell`의 `name`과 동일(영문 표기) */
  items: readonly string[];
};

export type LicenseIndustrySpotlight = {
  industry: string;
  items: readonly string[];
};

export type LicenseRegistrationServiceCopy = {
  metaTitle: string;
  metaDescription: string;
  pageTitle: string;
  pageDescription: string;
  scopeTitle: string;
  scopeItems: readonly string[];
  backToServices: string;
  contactCta: string;
  taxonomyEyebrow: string;
  taxonomyTitle: string;
  taxonomyIntro: string;
  taxonomyGroups: readonly LicenseTaxonomyGroup[];
  industryExamplesEyebrow: string;
  industryExamplesTitle: string;
  industryExamplesIntro: string;
  industryExamples: readonly LicenseIndustrySpotlight[];
  cardsEyebrow: string;
  cardsTitle: string;
  cardsIntro: string;
  licenseCards: readonly LicenseCardItem[];
  modal: LicenseRegistrationModalLookups;
};

/** 카드 앵커용 DOM id (`#${licenseCardDomId(name)}`) */
export function licenseCardDomId(name: string): string {
  const slug = name
    .replace(/[()]/g, " ")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return `lic-${slug || "item"}`;
}

const licenseCardShell = [
  { name: "BIS", subtitle: "Bureau of Indian Standards", monochrome: true as const, comingSoon: true as const },
  { name: "CDSCO", subtitle: "Central Drugs Standard Control Organisation", monochrome: true as const, comingSoon: true as const },
  { name: "Capexile Certificate" },
  { name: "CLRA", subtitle: "Contract Labour (Regulation and Abolition)" },
  { name: "Contractor License", subtitle: "Contract Labour Contractor License" },
  { name: "Digital Signature (DSC)", subtitle: "Digital Signature Certificate" },
  { name: "EPCG", subtitle: "Export Promotion Capital Goods Scheme" },
  { name: "EPR Registration", subtitle: "Extended Producer Responsibility Registration" },
  { name: "Factory License", subtitle: "Factories Act Registration" },
  { name: "Fire NOC", subtitle: "Fire No Objection Certificate" },
  { name: "FSSAI", subtitle: "Food Safety and Standards Authority of India" },
  { name: "GST", subtitle: "Goods and Services Tax" },
  { name: "ICEGATE", subtitle: "Indian Customs Electronic Gateway" },
  { name: "IEC", subtitle: "Import Export Code" },
  { name: "ISO", subtitle: "International Organization for Standardization" },
  { name: "ISMW", subtitle: "Inter-State Migrant Workmen" },
  { name: "Legal Metrology", subtitle: "Legal Metrology Registration" },
  { name: "LUT", subtitle: "Letter of Undertaking" },
  { name: "MOOWR", subtitle: "Manufacture and Other Operations in Warehouse Regulations" },
  { name: "MSME", subtitle: "Micro, Small, and Medium Enterprises" },
  { name: "PAN", subtitle: "Permanent Account Number" },
  { name: "PIMS", subtitle: "Paper Import Monitoring System" },
  { name: "Pollution NOC", subtitle: "Consent to Establish / Operate (CTE/CTO)" },
  { name: "RCMC", subtitle: "Registration-Cum-Membership Certificate" },
  { name: "RERA Registration", subtitle: "Real Estate Regulatory Authority Registration" },
  { name: "S&E Registration", subtitle: "Registration Certificate of Establishment" },
  { name: "SIMS", subtitle: "Steel Import Monitoring System" },
  { name: "Startup Certificate" },
  { name: "Trademark", subtitle: "Brand and Intellectual Property Registration" },
  { name: "Trading License", subtitle: "Municipal Trade License" },
] as const;

type CardName = (typeof licenseCardShell)[number]["name"];

/** 모달 하단 「관련 등록」 ·  값은 카드 `name`과 동일(앵커·스크롤 연동). */
const LICENSE_MODAL_RELATED_BY_NAME = {
  BIS: ["ISO", "Factory License", "Legal Metrology"],
  CDSCO: ["FSSAI", "Legal Metrology", "Trading License"],
  "Capexile Certificate": ["IEC", "RCMC", "ICEGATE"],
  CLRA: ["Factory License", "ISMW", "Contractor License"],
  "Contractor License": ["CLRA", "ISMW", "Factory License"],
  "Digital Signature (DSC)": ["GST", "PAN", "ICEGATE"],
  EPCG: ["IEC", "LUT", "RCMC"],
  "EPR Registration": ["Pollution NOC", "Factory License", "IEC"],
  "Factory License": ["Fire NOC", "Pollution NOC", "CLRA"],
  "Fire NOC": ["Factory License", "Pollution NOC", "Trading License"],
  FSSAI: ["GST", "Trading License", "Legal Metrology"],
  GST: ["PAN", "MSME", "IEC"],
  ICEGATE: ["IEC", "LUT", "RCMC"],
  IEC: ["ICEGATE", "RCMC", "LUT"],
  ISO: ["BIS", "Factory License", "MSME"],
  ISMW: ["CLRA", "Contractor License", "Factory License"],
  "Legal Metrology": ["FSSAI", "GST", "Trading License"],
  LUT: ["GST", "IEC", "RCMC"],
  MOOWR: ["EPCG", "IEC", "Factory License"],
  MSME: ["GST", "PAN", "Startup Certificate"],
  PAN: ["GST", "MSME", "Digital Signature (DSC)"],
  PIMS: ["IEC", "ICEGATE", "SIMS"],
  "Pollution NOC": ["Factory License", "Fire NOC", "Trading License"],
  RCMC: ["IEC", "ICEGATE", "Capexile Certificate"],
  "RERA Registration": ["Trading License", "Fire NOC", "GST"],
  "S&E Registration": ["Trading License", "Factory License", "GST"],
  SIMS: ["IEC", "ICEGATE", "PIMS"],
  "Startup Certificate": ["MSME", "PAN", "GST"],
  Trademark: ["GST", "MSME", "PAN"],
  "Trading License": ["GST", "FSSAI", "S&E Registration"],
} satisfies Partial<Record<CardName, readonly CardName[]>>;

function mergeCards(desc: Record<CardName, string>): readonly LicenseCardItem[] {
  return licenseCardShell.map((s) => ({
    ...s,
    description: desc[s.name as CardName],
  }));
}

const descriptionsKo: Record<CardName, string> = {
  BIS: "전자·철강·소비재 등 BIS 인증 대상 품목의 적용 기준 검토 및 등록 절차를 지원합니다.",
  CDSCO: "의료기기·의약품 수입·판매를 위한 CDSCO 등록 및 허가 절차를 지원합니다.",
  "Capexile Certificate": "CAPEXIL 등록 인증 발급 절차를 진행해 해당 품목 수출 활동과 관련 신고를 지원합니다.",
  CLRA:
    "계약 구조·인원 기준에 따라 Principal Employer 등록과 도급업체(Contractor) 측 절차가 달리 적용될 수 있어, 해당 범위별 문서와 요건을 구분해 지원합니다.",
  "Contractor License":
    "노무 도급(계약근로자 공급)에 필요한 도급업체 라이센스 신청과 관련 컴플라이언스 요건 점검을 지원합니다.",
  "Digital Signature (DSC)":
    "전자서명(DSC) 발급·갱신 절차와 포털 연동을 지원해 각종 온라인 신고/신청 업무를 준비합니다.",
  EPCG: "자본재 수입 관세 혜택을 위한 EPCG 신청, 의무 수출 조건 검토, 사후 관리 절차를 지원합니다.",
  "EPR Registration":
    "플라스틱·배터리·전자제품 등 EPR 등록 요건 검토부터 등록 신청, 이행·보고 체계 준비까지 지원합니다.",
  "Factory License": "제조 사업장 운영에 필요한 공장 등록·허가 절차를 지원하고 정기 갱신 요건을 안내합니다.",
  "Fire NOC": "건물·공장·상업시설 대상 Fire NOC 신청 및 갱신 절차를 지원합니다.",
  FSSAI:
    "인도 식품안전기준청으로, 식품의 안전과 품질을 보장하며 제조·유통·식품 사업 전반 규제, 면허 및 등록을 발급합니다.",
  GST: "GST 등록·사업장 추가·수정 및 필수 신고 구조를 지원합니다.",
  ICEGATE: "관세 시스템 연동용 ICEGATE 계정 등록과 기본 사용자 세팅을 지원합니다.",
  IEC: "수출입 코드(IEC) 발급 및 DGFT 등록 절차를 지원합니다.",
  ISO: "기업 운영·제품 품질·안전 관련 표준 충족을 위한 인증 준비와 등록 절차를 지원합니다.",
  ISMW: "주 간 이주 노동자 고용 시 필요한 등록·컴플라이언스 절차를 준비하고 신청을 지원합니다.",
  "Legal Metrology": "계량·포장·라벨링 관련 법정 등록 및 신고 절차를 지원해 유통 컴플라이언스를 맞춥니다.",
  LUT: "수출 GST 면세 적용을 위한 LUT 신청·갱신을 지원합니다.",
  MOOWR:
    "보세창고 기반 제조·가공 운영을 위한 MOOWR 등록, 승인, 운영 컴플라이언스 체계를 지원합니다.",
  MSME: "중소기업(MSME/Udyam) 등록 및 정부 지원 연계 절차를 지원합니다.",
  PAN: "법인 PAN 신청과 세무 계정 연계 단계까지 진행을 지원합니다.",
  PIMS: "종이류 수입 사전 등록(PIMS) 신청, 품목·수량 정보 등록, 수입 일정 연계 절차를 지원합니다.",
  "Pollution NOC": "환경 허가(CTE/CTO) 신청 및 갱신 절차를 지원합니다.",
  RCMC: "수출진흥협회 등록(RCMC) 및 수출 관련 인증 절차를 지원합니다.",
  "RERA Registration":
    "부동산 프로젝트/중개업 관련 RERA 등록 절차와 제출 문서 준비, 보완 대응을 지원합니다.",
  "S&E Registration":
    "Shop & Establishment 등록 및 주정부 사업장 등록 절차를 지원합니다.",
  SIMS: "철강류 수입 사전 등록(SIMS) 신청, 품목 정보 검토, 선적·통관 일정 연계 절차를 지원합니다.",
  "Startup Certificate": "Startup India 등록 요건 검토부터 증빙 문서 제출까지 단계별로 지원합니다.",
  Trademark:
    "인도에서 상표를 등록해 브랜드 권리를 확보하고, 제3자의 무단 사용을 예방할 수 있도록 지원합니다.",
  "Trading License": "지자체 기준에 맞는 사업장 영업 허가를 등록하고 갱신 일정을 관리합니다.",
};

const descriptionsEn: Record<CardName, string> = {
  BIS: "For electronics, steel, consumer goods and other BIS-covered products, we review applicable standards and support registration and certification steps.",
  CDSCO: "We support CDSCO registration and licensing for importing and selling medical devices and pharmaceutical products.",
  "Capexile Certificate": "We guide CAPEXIL registration and certification steps tied to eligible export categories and related declarations.",
  CLRA:
    "We support principal employer registration and contractor-side licensing where they apply under your contract structure and headcount profile, with documents and checks scoped to each track.",
  "Contractor License":
    "We support contractor licences for labour contracting (contract labour supply) and related compliance checks.",
  "Digital Signature (DSC)": "We help with DSC issuance and renewal and portal setup for e-filing and online applications.",
  EPCG: "We support EPCG applications, review of export obligation conditions, and post-approval monitoring steps.",
  "EPR Registration":
    "We support EPR registration for plastics, batteries, electronics and similar streams, including applications, compliance plans and reporting readiness.",
  "Factory License": "We support factory registration and licensing for manufacturing sites and renewal planning.",
  "Fire NOC": "We support Fire NOC applications and renewals for buildings, factories and commercial premises.",
  FSSAI:
    "FSSAI governs food safety and quality across manufacture, distribution and import; we help with licences and registrations.",
  GST: "We support GST registration, additional place amendments and the core filing structure you need to operate.",
  ICEGATE: "We help set up ICEGATE accounts for Indian customs e-filing and baseline user configuration.",
  IEC: "We support Import Export Code (IEC) issuance and DGFT registration steps.",
  ISO: "We support certification readiness and registration aligned with operations, product quality and safety standards.",
  ISMW: "We prepare registrations and compliance when engaging inter-state migrant workmen.",
  "Legal Metrology": "We support legal metrology registration and filings for weights, measures and pre-packaged goods.",
  LUT: "We support LUT applications and renewals for zero-rated export GST treatment.",
  MOOWR: "We support MOOWR registration, approvals and operating compliance for bonded-warehouse manufacturing.",
  MSME: "We support MSME/Udyam registration and linking into government benefit and support programmes.",
  PAN: "We support corporate PAN applications and linkage with tax accounts.",
  PIMS: "We support PIMS registration for paper imports, item and quantity data, and shipment scheduling.",
  "Pollution NOC": "We support environmental consent (CTE/CTO) applications and renewals.",
  RCMC: "We support RCMC registration with export promotion councils and related export certification steps.",
  "RERA Registration": "We support RERA registration for projects and brokers, document preparation and authority follow-up.",
  "S&E Registration":
    "We support Shop & Establishment registration and related state establishment registration steps.",
  SIMS: "We support SIMS registration for steel imports, item checks, and customs/shipment alignment.",
  "Startup Certificate": "We guide Startup India registration from eligibility review through evidence submission.",
  Trademark: "We help register trade marks in India to secure brand rights and deter unauthorised use.",
  "Trading License": "We register and renew municipal trade licences aligned with local rules.",
};

const descriptionsZh: Record<CardName, string> = {
  BIS: "针对电子、钢铁、消费品等 BIS 认证品类，协助适用标准梳理及注册与认证流程。",
  CDSCO: "协助医疗器械与药品进口、销售所需的 CDSCO 注册及许可办理。",
  "Capexile Certificate": "办理 CAPEXIL 注册与认证流程，配合相关出口品类及申报要求。",
  CLRA: "依合同结构与用工人数等，用工单位登记与承包商侧手续可能分别适用；我们协助分项梳理材料与合规要点。",
  "Contractor License": "协助劳工派遣（合同工供应）承包商执照及相关合规检查。",
  "Digital Signature (DSC)": "协助电子签名证书签发、续期及与门户绑定，为各类线上申报做准备。",
  EPCG: "协助 EPCG 申请、出口义务条件审阅及获批后的跟踪管理。",
  "EPR Registration": "协助塑料、电池、电子产品等品类 EPR 注册申请、履约计划与报告体系准备。",
  "Factory License": "协助制造场所工厂注册与许可，并提示定期续期要求。",
  "Fire NOC": "协助厂房、办公楼及商业设施 Fire NOC 申请与续期。",
  FSSAI: "印度食品安全标准局，负责食品制造、流通与进口等环节的安全与质量监管及许可注册。",
  GST: "协助 GST 注册、营业场所增改及必备申报结构梳理。",
  ICEGATE: "协助开通海关电子系统 ICEGATE 账户及基础用户配置。",
  IEC: "协助进出口代码（IEC）签发及 DGFT 登记流程。",
  ISO: "协助企业运营、产品质量与安全相关的认证准备与注册流程。",
  ISMW: "协助跨邦流动劳工雇佣场景的注册与合规准备。",
  "Legal Metrology": "协助计量、预包装商品标签等法定注册与申报，满足流通合规。",
  LUT: "协助为出口适用零税率 GST 而办理 LUT 申请与续期。",
  MOOWR: "协助保税仓内制造/加工的 MOOWR 注册、审批及运营合规体系。",
  MSME: "协助中小企业（MSME/Udyam）登记及政府支持计划衔接。",
  PAN: "协助法人 PAN 申请及与税务账户衔接。",
  PIMS: "协助纸张进口 PIMS 登记、品名与数量信息及与船期、通关衔接。",
  "Pollution NOC": "协助环境许可（CTE/CTO）申请与续期。",
  RCMC: "协助出口促进机构 RCMC 注册及相关出口认证流程。",
  "RERA Registration": "协助房地产项目/中介相关 RERA 注册、材料准备与补件沟通。",
  "S&E Registration": "协助 Shop & Establishment 登记及邦级营业场所登记流程。",
  SIMS: "协助钢铁进口 SIMS 登记、品名核对及与装运、通关安排衔接。",
  "Startup Certificate": "从 Startup India 资格条件审阅到证明材料分步提交。",
  Trademark: "协助在印度注册商标以保护品牌并降低被他人抢用风险。",
  "Trading License": "按市政要求办理营业许可注册并管理续期节点。",
};

const importExportOwnerKo =
  "수출입 거래의 당사자인 법인(수입자/수출자) 명의로 등록·신고합니다.";
const premisesOwnerKo = "사업장을 실제 운영하는 법인(사업자) 명의로 등록합니다.";

const modalKo: LicenseRegistrationModalLookups = {
  ui: {
    /** 카드 전체가 버튼일 때 스크린리더용 (화면에 반복 표시하지 않음) */
    clickToSeeMore: "상세 내용 열기",
    close: "닫기",
    closeAria: "팝업 닫기",
    comingSoon: "서비스 준비 중",
    timelineHeading: "예상 소요 기간 (참고)",
    registrationOwnerHeading: "등록 주체 (누가 등록해야 하나요?)",
    detailHeading: "상세 설명",
    disclaimerHeading: "유의사항",
    disclaimerBody:
      "실제 요구 문서와 처리 기간은 주(State), 관할 기관, 업종 및 신청 시기에 따라 달라질 수 있으며, 접수 후 추가 보완 요청이 발생할 수 있습니다.",
    viewDetailsCta: "자세히 보기 →",
    relatedHeading: "관련 등록",
  },
  timelineDefault: "관할 주(State), 사업장 규모 및 제출 서류 상태에 따라 평균 2~6주 소요될 수 있습니다.",
  timelineByName: {
    ISO: "심사 일정 포함 평균 4~8주",
    "Startup Certificate": "요건 검토 포함 평균 2~6주",
    ICEGATE: "계정/코드 발급 기준 평균 1~3주",
    IEC: "계정/코드 발급 기준 평균 1~3주",
    EPCG: "사전 검토 포함 평균 3~8주",
    MOOWR: "사전 검토 포함 평균 3~8주",
    PIMS: "사전 검토 포함 평균 3~8주",
  },
  ownerDefault: "원칙적으로 해당 사업을 실제 수행하는 법인(사업자) 명의로 등록합니다.",
  ownerByName: {
    FSSAI: "식품 제조·유통·수입을 수행하는 법인(사업자) 명의로 등록합니다.",
    GST: "과세 대상 거래를 수행하는 법인(사업자) 명의로 등록합니다.",
    PAN: "인도 내 설립 법인(또는 사업자) 명의로 발급받아야 합니다.",
    IEC: importExportOwnerKo,
    ICEGATE: importExportOwnerKo,
    RCMC: importExportOwnerKo,
    EPCG: importExportOwnerKo,
    MOOWR: importExportOwnerKo,
    PIMS: importExportOwnerKo,
    SIMS: importExportOwnerKo,
    LUT: importExportOwnerKo,
    "Startup Certificate": "스타트업 요건을 충족하는 법인(또는 LLP) 명의로 신청합니다.",
    "Factory License": premisesOwnerKo,
    "Fire NOC": premisesOwnerKo,
    "Pollution NOC": premisesOwnerKo,
    "S&E Registration": premisesOwnerKo,
    "Trading License": premisesOwnerKo,
    CLRA:
      "사업장 운영 주체(Principal Employer) 등록 및 도급업체(Contractor) 라이선스는 계약 인원·사업장 구조·관할 규정에 따라 각각 적용됩니다.",
    "Contractor License": "계약근로자를 공급·운영하는 도급업체(Contractor) 명의로 신청합니다.",
    ISMW: "주 간 이주 노동자를 고용하는 사업장 운영 법인이 등록 주체가 됩니다.",
    "EPR Registration": "생산자·수입자·브랜드소유자(PIBO) 해당 법인 명의로 등록합니다.",
    "RERA Registration": "부동산 프로젝트 시행사(Developer) 또는 중개업체(Agent) 명의로 등록합니다.",
    "Legal Metrology": "계량기·포장상품 관련 제조/수입/유통 주체 법인 명의로 등록합니다.",
    "Digital Signature (DSC)": "법인 대표자 또는 권한 위임된 서명권자 개인 명의로 발급받습니다.",
    ISO: "인증 대상 조직(법인) 명의로 인증을 진행합니다.",
    Trademark: "상표권 보유 주체(법인 또는 개인 사업자) 명의로 출원합니다.",
    MSME: "MSME 요건을 충족하는 사업자(법인/개인사업자/LLP) 명의로 등록합니다.",
    "Capexile Certificate": "해당 수출 품목의 실제 수출 주체 법인 명의로 등록합니다.",
  },
  detailDefault: [
    "해당 등록은 사업 형태, 업종, 계약 구조, 사업장 위치(주/관할 기관)에 따라 요구 요건과 심사 포인트가 달라질 수 있습니다.",
    "초기에는 요건 적합성 검토와 문서 정합성 확보가 가장 중요하며, 접수 후 보완 요청을 신속히 대응할 수 있도록 자료 체계를 미리 갖추는 것이 효과적입니다.",
    "등록 후에도 갱신·변경 신고 및 관련 컴플라이언스 관리가 이어지므로, 발급 이후 운영 기준까지 함께 설계하는 것을 권장합니다.",
  ],
  relatedByName: LICENSE_MODAL_RELATED_BY_NAME,
  relatedNoteByName: {
    CLRA: "사회보험(PF·ESI) 등은 사업·인력 구조에 따라 별도로 검토·연계할 수 있습니다.",
  },
  detailByName: {
    FSSAI: [
      "FSSAI는 식품 제조·가공·보관·유통·수입 등 식품 밸류체인 전반에 적용되는 핵심 등록/면허 체계입니다. 사업 규모(소규모/주정부/중앙)와 취급 품목에 따라 등록 유형이 달라집니다.",
      "신청 단계에서는 사업장 정보, 취급 품목, 생산/유통 범위, 위생·안전 관련 자료를 기준으로 유형을 먼저 확정해야 하며, 유형 선택이 잘못되면 보완이나 재신청으로 일정이 지연될 수 있습니다.",
      "승인 이후에도 표시사항, 갱신 주기, 변경 신고(주소·품목·법인정보) 등 사후관리 요건이 중요하므로 초기 등록과 함께 운영 단계의 컴플라이언스 체계를 같이 설계하는 것이 안전합니다.",
    ],
    GST: [
      "GST 등록은 단순 번호 발급을 넘어서, 사업 모델(상품/서비스), 거래 구조(B2B/B2C), 주(State)별 사업장 운영 방식에 맞게 세무 운영 체계를 세팅하는 과정입니다.",
      "초기 등록 시 업종·품목 코드, 사업장 정보, 대표자·승인권자 정보, 은행·연락처 정보 정확도가 중요하며, 이후 신고 체계와 인보이스 발행 규칙까지 연결해 설계해야 실무 오류를 줄일 수 있습니다.",
      "등록 후에는 정기 신고, 세액공제 관리, 공급지 규정 대응 등 운영 이슈가 이어지므로, 발급 이후 월별 운영 루틴까지 함께 정리하는 것이 일반적입니다.",
    ],
    IEC: [
      "IEC는 인도 수출입 거래의 기본 식별 코드로, 해외 거래를 시작하기 전에 우선 확보해야 하는 핵심 등록입니다.",
      "코드 발급 자체는 비교적 빠른 편이지만, 은행·관세·물류 실무와 연결되는 정보 일치가 중요합니다. 법인 정보 불일치가 있으면 후속 단계에서 거래 지연이 발생할 수 있습니다.",
      "따라서 IEC 신청 시점에 회사 기본정보, 담당자 정보, 향후 수출입 품목/거래 흐름을 함께 점검해 두는 것이 안정적인 운영에 유리합니다.",
    ],
    ICEGATE: [
      "ICEGATE는 인도 관세 전자 시스템 연계를 위한 관문으로, 수출입 신고·추적·통관 관련 전자 업무의 기반이 됩니다.",
      "등록 과정에서는 계정 권한, 사용자 정보, 연계 대상(법인/대리인) 구분이 중요하며, 초기 설정이 정확해야 실제 통관 단계에서 시행착오를 줄일 수 있습니다.",
      "계정 생성 후에도 권한 관리, 담당자 변경, 연계 정보 업데이트 같은 운영 관리가 필요하므로 등록 이후 관리 절차까지 함께 마련하는 것이 좋습니다.",
    ],
    RCMC: [
      "RCMC는 수출 품목 및 업종에 맞는 수출진흥기관(Export Promotion Council 등)에 가입·등록해 발급받는 인증 성격의 문서입니다.",
      "어느 기관에 신청해야 하는지 업종 매핑이 핵심이며, 기관 선택이 잘못되면 보완 기간이 길어질 수 있어 사전 검토가 중요합니다.",
      "발급 후에는 갱신·변경 및 관련 수출 지원 제도 활용 여부를 함께 관리하면 실무 효율을 높일 수 있습니다.",
    ],
    EPCG: [
      "EPCG는 자본재 수입 시 관세 혜택을 받는 대신 일정 기간 수출 의무를 이행하는 제도입니다. 신청 전 사업의 수출 계획과 설비 투자 계획을 함께 검토해야 합니다.",
      "승인 단계에서는 대상 설비, 사용 목적, 의무 이행 계획의 정합성이 중요하며, 승인 이후에는 의무 이행 추적과 증빙 관리가 핵심 관리 포인트가 됩니다.",
      "즉, EPCG는 발급 자체보다 사후 의무 관리가 더 중요한 라이센스이므로, 초기부터 모니터링 체계를 포함해 설계하는 것이 좋습니다.",
    ],
    MOOWR: [
      "MOOWR는 보세창고 체계 내 제조·가공 운영을 허용하는 제도로, 관세 유예 효과와 운영 효율 측면에서 활용됩니다.",
      "적용 가능 여부는 공정 구조, 원자재/완제품 흐름, 창고 운영 방식에 따라 달라지므로 사전 구조 검토가 필요합니다.",
      "승인 후에는 재고·이동·가공 기록 관리 등 운영 컴플라이언스가 핵심이며, 문서화 수준이 실제 리스크를 크게 좌우합니다.",
    ],
    PIMS: [
      "PIMS는 종이류 수입에 대한 사전 모니터링 등록 체계로, 수입 전 정해진 정보 등록과 일정 관리가 핵심입니다.",
      "품목 코드, 수량, 선적 일정 등의 정보 정합성이 중요하며, 등록 시점과 실제 선적/통관 일정이 어긋나면 운영 차질이 생길 수 있습니다.",
      "반복 수입 기업은 품목별 기준 정보와 내부 체크리스트를 표준화해 운영하면 실무 속도와 정확도를 동시에 확보할 수 있습니다.",
    ],
    CLRA: [
      "CLRA 관련 절차는 사업 형태, 업종, 계약 구조·인원 규모, 노동 투입 방식 및 사업장 위치(주/관할 기관)에 따라 요구되는 등록·허가 유형과 심사 포인트가 달라질 수 있습니다.",
      "초기에는 요건 적합성 검토와 문서 정합성 확보가 가장 중요하며, 접수 후 보완 요청을 신속히 대응할 수 있도록 자료 체계를 미리 갖추는 것이 효과적입니다.",
      "등록 후에도 갱신·변경 신고 및 관련 컴플라이언스 관리가 이어지므로, 발급 이후 운영 기준까지 함께 설계하는 것을 권장합니다.",
    ],
  },
};

const importExportOwnerEn =
  "Registered and reported in the name of the corporate entity that is party to import/export transactions.";
const premisesOwnerEn = "Registered in the name of the corporate entity that actually operates the premises.";

const modalEn: LicenseRegistrationModalLookups = {
  ui: {
    clickToSeeMore: "Open details",
    close: "Close",
    closeAria: "Close dialog",
    comingSoon: "Coming soon",
    timelineHeading: "Indicative timeline",
    registrationOwnerHeading: "Who should register?",
    detailHeading: "Overview",
    disclaimerHeading: "Disclaimer",
    disclaimerBody:
      "Required documents and processing times vary by state, authority, industry and the timing of your application; additional clarification requests may follow submission.",
    viewDetailsCta: "View details →",
    relatedHeading: "Related registrations",
  },
  timelineDefault:
    "Typically 2–6 weeks depending on state, site scale and how complete your filing materials are.",
  timelineByName: {
    ISO: "Typically 4–8 weeks including audit scheduling",
    "Startup Certificate": "Typically 2–6 weeks including eligibility review",
    ICEGATE: "Typically 1–3 weeks for account or code activation",
    IEC: "Typically 1–3 weeks for account or code activation",
    EPCG: "Typically 3–8 weeks including pre-filing review",
    MOOWR: "Typically 3–8 weeks including pre-filing review",
    PIMS: "Typically 3–8 weeks including pre-filing review",
  },
  ownerDefault: "As a rule, the corporate entity that actually carries on the activity should be the applicant.",
  ownerByName: {
    FSSAI: "Registered in the name of the food business operator undertaking manufacture, distribution or import.",
    GST: "Registered in the name of the taxable person carrying on taxable supplies.",
    PAN: "Issued in the name of the Indian incorporated entity (or business) as applicable.",
    IEC: importExportOwnerEn,
    ICEGATE: importExportOwnerEn,
    RCMC: importExportOwnerEn,
    EPCG: importExportOwnerEn,
    MOOWR: importExportOwnerEn,
    PIMS: importExportOwnerEn,
    SIMS: importExportOwnerEn,
    LUT: importExportOwnerEn,
    "Startup Certificate": "Applied for in the name of the company or LLP that meets Startup India criteria.",
    "Factory License": premisesOwnerEn,
    "Fire NOC": premisesOwnerEn,
    "Pollution NOC": premisesOwnerEn,
    "S&E Registration": premisesOwnerEn,
    "Trading License": premisesOwnerEn,
    CLRA:
      "Principal employer registration and contractor licensing apply separately depending on contract headcount, site structure and regulatory jurisdiction.",
    "Contractor License": "Applied for by the labour contractor that supplies or manages contract labour.",
    ISMW: "The operating employer that engages inter-state migrant workmen is generally the registration applicant.",
    "EPR Registration": "Registered by the producer, importer or brand owner (PIBO) entity as applicable.",
    "RERA Registration": "Registered by the project developer or real-estate agent entity as applicable.",
    "Legal Metrology": "Registered by the entity that manufactures, imports or trades regulated weights/measures or pre-packaged goods.",
    "Digital Signature (DSC)": "Issued to the authorised signatory individual (director or attorney) as per portal rules.",
    ISO: "Certification is pursued in the name of the organisation in scope.",
    Trademark: "Filed in the name of the entity or individual that will own the trade mark rights.",
    MSME: "Registered in the name of the enterprise (company, LLP or proprietorship) that meets MSME thresholds.",
    "Capexile Certificate": "Registered in the name of the exporting entity for the relevant product lines.",
  },
  detailDefault: [
    "Requirements and review focus vary with business model, sector, contracting structure and location (state and regulator).",
    "Early eligibility screening and consistent documentation are critical; a structured evidence pack speeds up clarifications.",
    "Post-registration renewals, change filings and ongoing compliance should be planned alongside the initial approval.",
  ],
  relatedByName: LICENSE_MODAL_RELATED_BY_NAME,
  relatedNoteByName: {
    CLRA: "Provident fund and ESI compliance may need separate review depending on your workforce model.",
  },
  detailByName: {
    FSSAI: [
      "FSSAI licensing sits across the food value chain · manufacturing, processing, storage, distribution and import · with categories driven by scale (basic/state/central) and product risk.",
      "At application stage you must lock the licence type using premises, product range, hygiene evidence and operating model; wrong categorisation often causes rework and delays.",
      "After approval, labelling, renewal cycles and change intimation (address, products, entity data) remain material · design post-market routines together with the first registration.",
    ],
    GST: [
      "GST registration is not only a number · it sets up how you treat supplies (goods/services), channels (B2B/B2C) and multi-state operations for tax operations.",
      "Accuracy of HSN/SAC, place of business, authorised signatories and banking/contact data matters up front because it anchors returns, e-invoicing and credit workflows.",
      "After registration, periodic returns, ITC governance and place-of-supply analysis continue · plan monthly operating rhythms alongside enrolment.",
    ],
    IEC: [
      "The IEC is the baseline identifier for Indian cross-border trade and should be in place before banks, customs and logistics workflows scale.",
      "Issuance can be quick, but alignment with corporate master data matters for banks, shipping and ICEGATE · mismatches often surface downstream as operational delays.",
      "Review company particulars, responsible contacts and expected product flows at IEC stage to keep later steps smooth.",
    ],
    ICEGATE: [
      "ICEGATE is the gateway for Indian customs e-filing · declarations, tracking and clearance-related electronic work build on it.",
      "Account roles, user mapping and whether the filer is the importer/exporter or a broker must be configured correctly up front to avoid clearance friction.",
      "After go-live, user lifecycle, delegation and profile updates need governance · plan operating controls alongside registration.",
    ],
    RCMC: [
      "RCMC is obtained by joining the export promotion council mapped to your product or industry segment.",
      "Choosing the correct council is the main risk driver; wrong mapping typically lengthens clarification cycles.",
      "After issuance, renewals, changes and how you leverage export schemes should be tracked together.",
    ],
    EPCG: [
      "EPCG offers customs benefits on capital goods imports against an export obligation · export and capex plans should be reviewed together before filing.",
      "Approval hinges on equipment scope, end-use and a credible obligation fulfilment plan; post-approval, tracking and evidence are the main control points.",
      "Treat EPCG as an obligation-led licence and embed monitoring from day one.",
    ],
    MOOWR: [
      "MOOWR enables manufacturing or processing in bonded warehouses with duty deferral benefits where the operating model fits.",
      "Feasibility depends on process layout, stock flows and warehouse design · structure review should precede filing.",
      "Post approval, stock movements, processing records and documentation depth drive compliance risk.",
    ],
    PIMS: [
      "PIMS is a pre-import monitoring regime for paper · timely registration and shipment alignment are central.",
      "Consistency across HS codes, quantities and sailing dates matters; drift between registration and actual shipment disrupts operations.",
      "Repeat importers benefit from standardised SKU playbooks and internal checklists.",
    ],
    CLRA: [
      "CLRA tracks vary by operating model, sector, contracting and headcount patterns, how labour is deployed on site, and the state and regulator you sit under.",
      "Early eligibility screening and consistent documentation are critical; a structured evidence pack speeds up clarifications.",
      "Post-registration renewals, change filings and ongoing compliance should be planned alongside the initial approval.",
    ],
  },
};

const importExportOwnerZh = "由作为进出口交易当事人的法人（进口方/出口方）名义办理登记与申报。";
const premisesOwnerZh = "由实际运营该场所的法人（经营者）名义办理登记。";

const modalZh: LicenseRegistrationModalLookups = {
  ui: {
    clickToSeeMore: "打开详细说明",
    close: "关闭",
    closeAria: "关闭弹窗",
    comingSoon: "服务筹备中",
    timelineHeading: "预计周期（参考）",
    registrationOwnerHeading: "登记主体（谁应办理？）",
    detailHeading: "详细说明",
    disclaimerHeading: "注意事项",
    disclaimerBody:
      "实际所需材料与办理时间因各邦、主管机关、行业及提出申请的时间而异，受理后亦可能发生补充材料要求。",
    viewDetailsCta: "查看详情 →",
    relatedHeading: "相关登记",
  },
  timelineDefault: "视所在邦、场所规模及提交材料完备程度，平均约需 2–6 周",
  timelineByName: {
    ISO: "含审核排期，平均约 4–8 周",
    "Startup Certificate": "含资格条件审阅，平均约 2–6 周",
    ICEGATE: "账户/代码类，平均约 1–3 周",
    IEC: "账户/代码类，平均约 1–3 周",
    EPCG: "含事前梳理，平均约 3–8 周",
    MOOWR: "含事前梳理，平均约 3–8 周",
    PIMS: "含事前梳理，平均约 3–8 周",
  },
  ownerDefault: "原则上应由实际开展该业务的法人（经营者）名义办理登记。",
  ownerByName: {
    FSSAI: "由从事食品制造、流通或进口的法人（经营者）名义注册。",
    GST: "由从事应税交易的法人（经营者）名义注册。",
    PAN: "印度境内设立的法人（或经营者）应依法取得 PAN。",
    IEC: importExportOwnerZh,
    ICEGATE: importExportOwnerZh,
    RCMC: importExportOwnerZh,
    EPCG: importExportOwnerZh,
    MOOWR: importExportOwnerZh,
    PIMS: importExportOwnerZh,
    SIMS: importExportOwnerZh,
    LUT: importExportOwnerZh,
    "Startup Certificate": "由符合 Startup India 条件的公司或 LLP 名义申请。",
    "Factory License": premisesOwnerZh,
    "Fire NOC": premisesOwnerZh,
    "Pollution NOC": premisesOwnerZh,
    "S&E Registration": premisesOwnerZh,
    "Trading License": premisesOwnerZh,
    CLRA: "用工单位（Principal Employer）登记与承包商（Contractor）执照依合同用工人数、场所结构及管辖规定分别适用。",
    "Contractor License": "由供应或运营合同工的承包商名义申请。",
    ISMW: "雇佣跨邦流动劳工的运营法人通常为登记主体。",
    "EPR Registration": "由生产者、进口商或品牌持有人（PIBO）等适用主体名义注册。",
    "RERA Registration": "由项目开发商或房地产中介机构等适用主体名义注册。",
    "Legal Metrology": "由计量器具、预包装商品等相关制造/进口/流通主体法人名义注册。",
    "Digital Signature (DSC)": "按门户规则，由法定代表人或获授权签字的个人名义申领。",
    ISO: "以受认证组织（法人）名义推进认证。",
    Trademark: "以将持有商标权的公司或个人经营者名义提交申请。",
    MSME: "由符合 MSME 门槛的企业（公司/LLP/个体）名义登记。",
    "Capexile Certificate": "由相关出口产品的实际出口法人名义注册。",
  },
  detailDefault: [
    "具体要件与审查重点因业态、行业、合同结构及所在地（邦与主管机关）而异。",
    "初期应重点完成适用性评估与材料一致性；完善的资料体系有助于快速应对补件。",
    "获批后仍需办理续期、变更申报及持续合规，建议与首次登记同步规划运营机制。",
  ],
  relatedByName: LICENSE_MODAL_RELATED_BY_NAME,
  relatedNoteByName: {
    CLRA: "PF/ESI 等社保义务可视用工与组织结构另行衔接评估。",
  },
  detailByName: {
    FSSAI: [
      "FSSAI 覆盖食品制造、加工、储存、流通与进口等全链条，是小规模/邦级/中央级等分级许可体系的核心。",
      "申请阶段需依据场所、品类、产销范围及卫生安全资料先确定许可类型；类型选择错误易导致补件或重报延误。",
      "获批后标签、续期、变更申报（地址、品类、法人信息等）同样关键，建议与首次登记一并设计运营合规机制。",
    ],
    GST: [
      "GST 注册不仅是获取税号，更是按业务模式（商品/服务）、渠道（B2B/B2C）及跨邦经营方式搭建税务运营体系的过程。",
      "初期行业与商品编码、场所信息、授权签字人及银行联系方式的准确性，将直接影响后续申报与发票规则。",
      "注册后仍需处理定期申报、进项管理及供应地规则等事项，建议同步建立月度运营节奏。",
    ],
    IEC: [
      "IEC 是印度跨境贸易的基础识别码，建议在开展海外交易前优先取得。",
      "代码本身发放较快，但与银行、海关、物流信息的一致性很重要；法人信息不一致可能在后续环节造成延误。",
      "建议在 IEC 申请阶段同步核对公司基本信息、联系人及未来进出口品类与流向。",
    ],
    ICEGATE: [
      "ICEGATE 是印度海关电子申报系统的入口，进出口报关、跟踪及通关相关电子化工作的基础。",
      "注册时需正确配置账户权限、用户及法人/代理人关系，以减少通关阶段试错。",
      "账户启用后仍需管理权限、人员变更与资料更新，建议将运营流程与注册同步设计。",
    ],
    RCMC: [
      "RCMC 需加入与出口产品及行业相匹配的出口促进委员会等机构后取得，具有会员/注册证明性质。",
      "机构对口选择是核心风险点；选择不当往往拉长补件周期，事前核对十分重要。",
      "取证后应同步管理续期、变更及相关出口支持政策的适用。",
    ],
    EPCG: [
      "EPCG 在资本货物进口关税优惠与一定期限内出口义务之间挂钩，申请前应同时审视出口计划与资本开支。",
      "审批关注设备范围、用途及义务履行计划的可信度；获批后义务跟踪与凭证管理是管控重点。",
      "应将 EPCG 视为义务驱动型许可，自初期即纳入监测体系。",
    ],
    MOOWR: [
      "MOOWR 允许在保税仓体系内开展制造或加工，在符合条件时可获得关税递延等效率优势。",
      "是否适用取决于工艺流程、物料与成品流向及仓配模式，建议先进行结构可行性评估。",
      "获批后库存、移库与加工记录等运营合规与文档化水平将显著影响风险暴露。",
    ],
    PIMS: [
      "PIMS 针对纸张进口的事前监测登记，核心是进口前信息登记与日程衔接。",
      "品目编码、数量与船期等信息需保持一致；登记与实际装运/通关脱节可能造成运营中断。",
      "对重复进口企业，建议将品目基线与内部核对清单标准化以兼顾效率与准确。",
    ],
    CLRA: [
      "CLRA 相关手续会因业态、行业、合同与用工规模、劳动力投入方式及所在地（邦与主管机关）而不同。",
      "初期应重点完成适用性评估与材料一致性；完善的资料体系有助于快速应对补件。",
      "获批后仍需办理续期、变更申报及持续合规，建议与首次登记同步规划运营机制。",
    ],
  },
};

const ko: LicenseRegistrationServiceCopy = {
  metaTitle: "라이센스 등록 서비스",
  metaDescription: "인도 현지 라이센스·인허가 등록 업무를 단계별로 지원합니다.",
  pageTitle: "라이센스 등록 서비스",
  pageDescription:
    "사업 업종·운영 형태에 필요한 인허가 항목을 검토하고,\n등록·갱신·컴플라이언스 대응까지 실무 중심으로 지원합니다.",
  scopeTitle: "지원 범위",
  scopeItems: [
    "사업 유형별 필수 라이센스 식별 및 등록 로드맵 설계",
    "관할 기관 제출 서류 준비, 검토, 접수 대행",
    "갱신·변경·정부 보완 대응 및 일정 관리",
  ],
  backToServices: "회계 서비스로 돌아가기",
  contactCta: "문의하기",
  taxonomyEyebrow: "License taxonomy",
  taxonomyTitle: "라이선스 분류",
  taxonomyIntro:
    "제조·수출입·식품·의료·노무·세무·규제 등 실무 영역별로 묶었습니다. 항목명을 누르면 아래 해당 카드로 이동합니다.",
  taxonomyGroups: [
    {
      heading: "제조업·공장 운영",
      items: ["Factory License", "Fire NOC", "Pollution NOC", "CLRA"],
    },
    {
      heading: "수출입·DGFT·통관",
      items: ["IEC", "EPCG", "RCMC", "ICEGATE", "LUT", "Capexile Certificate", "MOOWR", "PIMS", "SIMS"],
    },
    { heading: "식품·의료", items: ["FSSAI", "CDSCO"] },
    {
      heading: "세무·사업자·전자 등록",
      items: ["GST", "PAN", "MSME", "Digital Signature (DSC)"],
    },
    {
      heading: "노무·현지 고용",
      items: ["Contractor License", "ISMW"],
    },
    {
      heading: "규제·인증·지속가능",
      items: ["BIS", "ISO", "EPR Registration", "Legal Metrology"],
    },
    {
      heading: "사업 운영·상업 등록",
      items: ["Trading License", "S&E Registration", "Startup Certificate"],
    },
    {
      heading: "지식재산·브랜드",
      items: ["Trademark"],
    },
    {
      heading: "부동산·건설",
      items: ["RERA Registration"],
    },
  ],
  industryExamplesEyebrow: "Industry playbook",
  industryExamplesTitle: "업종별 주요 라이선스 예시",
  industryExamplesIntro:
    "대표 업종에서 우선 검토되는 등록·허가 조합입니다. 실제 적용 범위는 사업 모델·관할에 따라 달라질 수 있습니다.",
  industryExamples: [
    {
      industry: "제조업",
      items: ["Factory License", "Pollution NOC", "GST", "IEC", "Fire NOC", "CLRA"],
    },
    {
      industry: "식품업",
      items: ["FSSAI", "GST", "Trading License"],
    },
    {
      industry: "수입·유통",
      items: ["IEC", "ICEGATE", "RCMC"],
    },
    {
      industry: "건설업",
      items: ["GST", "CLRA", "Contractor License", "Pollution NOC"],
    },
    {
      industry: "전자·기계 제조",
      items: ["BIS", "EPR Registration", "Factory License", "IEC"],
    },
    {
      industry: "호텔·F&B",
      items: ["FSSAI", "Fire NOC", "Trading License", "Pollution NOC"],
    },
  ],
  cardsEyebrow: "License registration",
  cardsTitle: "등록 가능 항목",
  cardsIntro: "주요 라이센스·등록 항목별로 준비 서류와 접수 절차를 실무 중심으로 지원합니다.",
  licenseCards: mergeCards(descriptionsKo),
  modal: modalKo,
};

const en: LicenseRegistrationServiceCopy = {
  metaTitle: "Licence registration",
  metaDescription: `${company.shortName} · step-by-step support for Indian licences and regulatory registrations.`,
  pageTitle: "Licence registration",
  pageDescription:
    "We review licences and permits required for your sector and operating model,\nand support registrations, renewals and compliance responses with a practice-led approach.",
  scopeTitle: "What we cover",
  scopeItems: [
    "Identify mandatory licences by business model and design a registration roadmap",
    "Prepare, review and file documentation with the relevant authorities",
    "Renewals, changes, responses to authority deficiency letters and deadline tracking",
  ],
  backToServices: "Back to services",
  contactCta: "Contact us",
  taxonomyEyebrow: "License taxonomy",
  taxonomyTitle: "How we group registrations",
  taxonomyIntro:
    "Manufacturing, trade, food & drugs, labour, tax and compliance clusters mirror how teams plan filings in practice. Click a name to jump to its card below.",
  taxonomyGroups: [
    {
      heading: "Manufacturing & plant operations",
      items: ["Factory License", "Fire NOC", "Pollution NOC", "CLRA"],
    },
    {
      heading: "Imports, exports & DGFT / customs",
      items: ["IEC", "EPCG", "RCMC", "ICEGATE", "LUT", "Capexile Certificate", "MOOWR", "PIMS", "SIMS"],
    },
    { heading: "Food & life sciences", items: ["FSSAI", "CDSCO"] },
    {
      heading: "Tax, business & digital registration",
      items: ["GST", "PAN", "MSME", "Digital Signature (DSC)"],
    },
    {
      heading: "Labour & local establishment",
      items: ["Contractor License", "ISMW"],
    },
    {
      heading: "Regulation, certification & sustainability",
      items: ["BIS", "ISO", "EPR Registration", "Legal Metrology"],
    },
    {
      heading: "Operations & commercial registration",
      items: ["Trading License", "S&E Registration", "Startup Certificate"],
    },
    {
      heading: "IP & brand",
      items: ["Trademark"],
    },
    {
      heading: "Real estate & construction",
      items: ["RERA Registration"],
    },
  ],
  industryExamplesEyebrow: "Industry playbook",
  industryExamplesTitle: "Typical licence bundles by sector",
  industryExamplesIntro:
    "Illustrative combinations we see reviewed first for common entry profiles · your stack will still depend on facts on the ground.",
  industryExamples: [
    {
      industry: "Manufacturing",
      items: ["Factory License", "Pollution NOC", "GST", "IEC", "Fire NOC", "CLRA"],
    },
    {
      industry: "Food businesses",
      items: ["FSSAI", "GST", "Trading License"],
    },
    {
      industry: "Import & distribution",
      items: ["IEC", "ICEGATE", "RCMC"],
    },
    {
      industry: "Construction",
      items: ["GST", "CLRA", "Contractor License", "Pollution NOC"],
    },
    {
      industry: "Electronics & machinery manufacturing",
      items: ["BIS", "EPR Registration", "Factory License", "IEC"],
    },
    {
      industry: "Hotels & F&B",
      items: ["FSSAI", "Fire NOC", "Trading License", "Pollution NOC"],
    },
  ],
  cardsEyebrow: "Licence registration",
  cardsTitle: "Registrations we support",
  cardsIntro: "Practical help on documentation and filing pathways for major Indian registrations and licences.",
  licenseCards: mergeCards(descriptionsEn),
  modal: modalEn,
};

const zh: LicenseRegistrationServiceCopy = {
  metaTitle: "许可证登记服务",
  metaDescription: `${company.shortName} · 在印度当地分步协助办理各类许可证与登记。`,
  pageTitle: "许可证登记服务",
  pageDescription:
    "按行业与运营形态梳理所需许可与登记，\n以实务为导向协助办理、续期及合规应对。",
  scopeTitle: "服务范围",
  scopeItems: [
    "按业务类型识别必备许可证并制定登记路线图",
    "准备、审阅并向主管机关递交材料",
    "续期、变更、政府补件应对及进度管理",
  ],
  backToServices: "返回服务页",
  contactCta: "联系我们",
  taxonomyEyebrow: "License taxonomy",
  taxonomyTitle: "许可与登记分类",
  taxonomyIntro:
    "按制造、进出口、食品医疗、劳工、税务与合规等实务板块归纳。点击名称可跳转至下方对应卡片。",
  taxonomyGroups: [
    {
      heading: "制造业与工厂运营",
      items: ["Factory License", "Fire NOC", "Pollution NOC", "CLRA"],
    },
    {
      heading: "进出口·DGFT·通关",
      items: ["IEC", "EPCG", "RCMC", "ICEGATE", "LUT", "Capexile Certificate", "MOOWR", "PIMS", "SIMS"],
    },
    { heading: "食品与医疗", items: ["FSSAI", "CDSCO"] },
    {
      heading: "税务、主体与电子登记",
      items: ["GST", "PAN", "MSME", "Digital Signature (DSC)"],
    },
    {
      heading: "劳工与本地用工",
      items: ["Contractor License", "ISMW"],
    },
    {
      heading: "监管、认证与可持续",
      items: ["BIS", "ISO", "EPR Registration", "Legal Metrology"],
    },
    {
      heading: "商业运营与商事登记",
      items: ["Trading License", "S&E Registration", "Startup Certificate"],
    },
    {
      heading: "知识产权与品牌",
      items: ["Trademark"],
    },
    {
      heading: "房地产与建设",
      items: ["RERA Registration"],
    },
  ],
  industryExamplesEyebrow: "Industry playbook",
  industryExamplesTitle: "按行业的主要许可示例",
  industryExamplesIntro:
    "以下为常见业态中优先梳理的登记组合示例；实际范围仍取决于业务模式与管辖机关。",
  industryExamples: [
    {
      industry: "制造业",
      items: ["Factory License", "Pollution NOC", "GST", "IEC", "Fire NOC", "CLRA"],
    },
    {
      industry: "食品业",
      items: ["FSSAI", "GST", "Trading License"],
    },
    {
      industry: "进口与流通",
      items: ["IEC", "ICEGATE", "RCMC"],
    },
    {
      industry: "建筑业",
      items: ["GST", "CLRA", "Contractor License", "Pollution NOC"],
    },
    {
      industry: "电子与机械制造",
      items: ["BIS", "EPR Registration", "Factory License", "IEC"],
    },
    {
      industry: "酒店与餐饮",
      items: ["FSSAI", "Fire NOC", "Trading License", "Pollution NOC"],
    },
  ],
  cardsEyebrow: "License registration",
  cardsTitle: "可协助登记的项目",
  cardsIntro: "针对主要许可与登记类别，从材料准备到递交路径提供实务导向支持。",
  licenseCards: mergeCards(descriptionsZh),
  modal: modalZh,
};

export function licenseRegistrationServiceCopy(locale: SiteLocale): LicenseRegistrationServiceCopy {
  return pickLocale(locale, { ko, en, zh });
}
