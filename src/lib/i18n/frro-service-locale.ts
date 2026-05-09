import type { SiteLocale } from "@/lib/site-locale";
import { pickLocale } from "@/lib/site-locale";
import { company } from "@/lib/site-content";

export type FrroWorkBlock = {
  title: string;
  intro?: string;
  exampleHeading?: string;
  exampleItems?: readonly string[];
  supportHeading: string;
  supportItems: readonly string[];
};

export type FrroFormDoc = {
  title: string;
  body: string;
  listLead?: string;
  listItems?: readonly string[];
};

export type FrroExitPermit = {
  title: string;
  intro: string;
  supportHeading: string;
  supportItems: readonly string[];
};

export type FrroServiceCopy = {
  metaTitle: string;
  metaDescription: string;
  pageTitle: string;
  pageIntroA: string;
  pageIntroB: string;
  contextParas: readonly string[];
  mainWorkTitle: string;
  workBlocks: readonly FrroWorkBlock[];
  documentsTitle: string;
  cForm: FrroFormDoc;
  sForm: FrroFormDoc;
  exitPermit: FrroExitPermit;
  footNote: string;
  backToServices: string;
  contactCta: string;
};

const ko: FrroServiceCopy = {
  metaTitle: "FRRO 서비스",
  metaDescription: `${company.shortName} 인도 FRRO·RP 등록, 비자 연장, 주소·여권·조직 변경 신고 및 Exit Permit 등 체류 행정 실무 지원`,
  pageTitle: "FRRO 서비스",
  pageIntroA:
    "인도 체류 외국인의 FRRO(Foreigners Regional Registration Office) 등록·연장·변경 업무를 실무 중심으로 지원합니다.",
  pageIntroB:
    "MS Ventures는 한국 및 해외 주재원의 비자 상태와 체류 일정에 맞추어 FRRO 신고, Residential Permit(RP) 등록,\u00A0비자\u00A0연장, 주소 변경, Exit Permit 대응까지 전반적인 절차를 지원하고 있습니다.",
  contextParas: [
    "FRRO 업무는 단순 온라인 신청만으로 완료되지 않으며, 비자 종류·체류 목적·회사 상태·거주 형태에 따라 요구 서류와 심사 방식이 달라질 수 있습니다.",
    "MS Ventures는 실제 운영 사례를 기반으로 서류 검토, 일정 관리, 기관 대응 및 커뮤니케이션 업무를 함께 지원합니다.",
  ],
  mainWorkTitle: "주요 지원 업무",
  workBlocks: [
    {
      title: "1. FRRO 신규 등록 및 Residential Permit(RP) 등록 지원",
      intro:
        "인도 장기 체류 외국인은 입국 후 일정 기간 내 FRRO 등록 및 RP(Residential Permit) 발급이 필요할 수 있습니다.",
      supportHeading: "지원 내용:",
      supportItems: [
        "FRRO 온라인 등록 계정 생성 및 신청 지원",
        "RP 등록 대상 여부 검토",
        "비자·여권·입국 스탬프·사진 등 기본 서류 검토",
        "고용계약서·회사 서류·거주 증빙 서류 정리 지원",
        "FRRO 제출 서류 업로드 및 신청 절차 안내",
        "필요 시 FRRO 방문 및 현장 대응 지원",
      ],
    },
    {
      title: "2. 비자 연장(E Registration / Visa Extension) 지원",
      intro:
        "Employment Visa 등 장기 체류 비자의 경우 연장 신청 시 회사 및 체류 관련 자료 제출이 요구될 수 있습니다.",
      exampleHeading: "일반적인 제출 항목 예시:",
      exampleItems: [
        "여권 및 현재 비자 사본",
        "RP(Residential Permit) 사본",
        "회사 재직 증빙 및 고용계약 관련 자료",
        "최근 급여 자료 및 세금 관련 자료(PAN/TDS 등)",
        "회사 법인 서류 및 FRRO 요청 추가 자료",
        "현재 주소 증빙 및 사진",
      ],
      supportHeading: "지원 내용:",
      supportItems: [
        "연장 가능 여부 및 일정 사전 검토",
        "제출 서류 정리 및 누락 점검",
        "온라인 신청 및 보완 대응 지원",
        "FRRO 인터뷰·방문 일정 조율 지원",
      ],
    },
    {
      title: "3. Change of Address (주소 변경 신고) 지원",
      intro:
        "게스트하우스·호텔 체류 후 일반 주거지로 이사하거나, 인도 내 거주지가 변경된 경우 FRRO 주소 변경 신고가 필요할 수 있습니다.",
      supportHeading: "지원 내용:",
      supportItems: [
        "임대차계약서(Lease Agreement) 검토",
        "집주인 서류 및 주소 증빙 확인",
        "Change of Address 온라인 신고 지원",
        "RP 주소 정보 변경 확인 지원",
      ],
    },
    {
      title: "4. 여권 변경(Passport Renewal / Reissue) 신고 지원",
      intro:
        "여권 갱신·재발급으로 여권번호가 변경된 경우, FRRO 시스템 내 정보 업데이트가 필요할 수 있습니다.",
      supportHeading: "지원 내용:",
      supportItems: [
        "구여권·신여권 정보 정리",
        "신규 여권 정보 업데이트 신고 지원",
        "RP 및 비자 정보 연계 검토",
        "필요 시 FRRO 추가 서류 대응 지원",
      ],
    },
    {
      title: "5. 조직 변경(Change of Organization) 신고 지원",
      intro:
        "근무 회사가 변경되거나, 동일 그룹 내 조직 이동이 발생한 경우 FRRO 신고 또는 비자 조건 검토가 필요할 수 있습니다.",
      supportHeading: "지원 내용:",
      supportItems: [
        "조직 변경 가능 여부 검토",
        "신규 고용계약 및 회사 서류 검토",
        "Change of Organization 신고 지원",
        "기존 RP·비자 상태 연계 검토",
        "필요 시 Exit 및 신규 비자 절차 안내",
      ],
    },
  ],
  documentsTitle: "FRRO 주요 서류 안내",
  cForm: {
    title: "C Form",
    body: "C Form은 호텔·게스트하우스·서비스 아파트 등 외국인 숙박 시설 운영자가 외국인 투숙 정보를 FRRO에 신고하는 문서입니다.",
    listLead: "일반적으로:",
    listItems: [
      "호텔 체크인 시 자동 등록",
      "입국 초기 체류 기록 확인용",
      "RP 등록 또는 주소 변경 시 참고 자료로 사용될 수 있음",
    ],
  },
  sForm: {
    title: "S Form",
    body: "S Form은 외국인의 체류 목적 및 소속 기관 정보를 확인하기 위해 제출되는 확인 문서입니다. 비자 종류 및 FRRO 요구 사항에 따라 학교, 회사, 교육기관 또는 초청기관 등이 발급할 수 있습니다.",
    listLead: "일반적으로:",
    listItems: [
      "Student Visa, Intern Visa 등에서 학교·교육기관 확인 문서로 사용",
      "Employment Visa의 경우 회사 재직 및 근무 정보 확인 자료로 요청될 수 있음",
      "체류 목적·소속 기관·직책·기간 등의 확인 목적",
      "비자 연장 또는 정보 변경 시 추가 요청될 수 있음",
    ],
  },
  exitPermit: {
    title: "Exit Permit 지원",
    intro:
      "특정 비자 상태 또는 체류 기간 초과 등의 사유로 출국 전 Exit Permit이 필요한 경우가 있습니다.",
    supportHeading: "지원 내용:",
    supportItems: [
      "Exit Permit 필요 여부 사전 검토",
      "출국 일정 조율 및 긴급 대응",
      "FRRO 제출 서류 정리 지원",
      "승인 후 출국 일정 확인 지원",
    ],
  },
  footNote:
    "※ FRRO 운영 방식 및 요구 서류는 지역·비자 종류·체류 목적에 따라 상이할 수 있습니다.\n\n최종 승인 및 판단 기준은 관할 FRRO 및 인도 이민국 정책을 따릅니다.",
  backToServices: "서비스로 돌아가기",
  contactCta: "문의하기",
};

const en: FrroServiceCopy = {
  metaTitle: "FRRO services",
  metaDescription: `${company.shortName} — practical support for India FRRO, RP registration, visa extensions, address, passport and employer-change filings, and exit permits.`,
  pageTitle: "FRRO services",
  pageIntroA:
    "We support foreign nationals in India with Foreigners Regional Registration Office (FRRO) registration, extension and change-of-circumstance work in a hands-on, operations-focused way.",
  pageIntroB: `${company.shortName} helps Korean and overseas assignees align FRRO filings, Residential Permit (RP) registration, visa extensions, address updates and exit-permit steps with visa status and permitted stay.`,
  contextParas: [
    "FRRO work is rarely “submit online and done”: required documents and review practices vary with visa type, purpose of stay, employer status and living arrangements.",
    `${company.shortName} supports document review, timeline management, authority-facing follow-up and day-to-day communication based on real operating experience.`,
  ],
  mainWorkTitle: "Key support areas",
  workBlocks: [
    {
      title: "1. New FRRO registration and Residential Permit (RP)",
      intro:
        "Long-stay foreign nationals may need FRRO registration and an RP within a set period after arrival in India.",
      supportHeading: "What we help with:",
      supportItems: [
        "FRRO online account setup and application support",
        "Eligibility review for RP registration",
        "Checks on passport, visa, entry stamps, photos and other baseline documents",
        "Organising employment contracts, employer documents and proof of residence",
        "Uploads to FRRO portals and step-by-step filing guidance",
        "On-site attendance and liaison at FRRO when required",
      ],
    },
    {
      title: "2. Visa extension (E registration / visa extension)",
      intro:
        "Long-stay visas such as Employment Visa often require company and stay-related evidence at extension.",
      exampleHeading: "Typical documents (illustrative):",
      exampleItems: [
        "Passport and current visa copies",
        "Residential Permit (RP) copy",
        "Employer letters and employment-contract related evidence",
        "Recent payroll and tax-related materials (PAN / TDS, etc.)",
        "Corporate documents and any further items FRRO requests",
        "Current address proof and photographs",
      ],
      supportHeading: "What we help with:",
      supportItems: [
        "Feasibility and timing review before extension",
        "Document packs, gap checks and version control",
        "Online filing and follow-up on queries or additional requests",
        "Coordination of FRRO interviews or in-person visits",
      ],
    },
    {
      title: "3. Change of address reporting",
      intro:
        "If you move from a hotel or guest house to private accommodation—or change address within India—FRRO may require a change-of-address filing.",
      supportHeading: "What we help with:",
      supportItems: [
        "Review of lease agreements",
        "Landlord documents and address evidence checks",
        "Online change-of-address filing support",
        "Cross-checks that RP address details are updated consistently",
      ],
    },
    {
      title: "4. Passport renewal / reissue reporting",
      intro:
        "When a passport is renewed or reissued and the number changes, FRRO systems may need an update filing.",
      supportHeading: "What we help with:",
      supportItems: [
        "Old vs new passport information structured for filing",
        "Support to update passport details with FRRO",
        "Consistency checks across RP and visa records",
        "Additional FRRO document requests when they arise",
      ],
    },
    {
      title: "5. Change of organisation reporting",
      intro:
        "If the employing entity changes or you move within a group, FRRO filings and visa conditions may need a structured review.",
      supportHeading: "What we help with:",
      supportItems: [
        "Feasibility review for organisation-change scenarios",
        "Review of new employment contracts and employer documents",
        "Change-of-organisation filing support",
        "Cross-checks against existing RP and visa status",
        "Guidance on exit and new visa routes where relevant",
      ],
    },
  ],
  documentsTitle: "Key FRRO forms (overview)",
  cForm: {
    title: "C Form",
    body: "The C Form is the lodging report operators of hotels, guest houses and serviced apartments file with FRRO for foreign guests.",
    listLead: "In practice:",
    listItems: [
      "Often captured at hotel check-in",
      "Useful for early-stay records after entry",
      "May be referenced when registering an RP or changing address",
    ],
  },
  sForm: {
    title: "S Form",
    body: "The S Form is a confirmation document filed to verify a foreign national’s purpose of stay and sponsoring or host organisation. Depending on the visa category and FRRO requirements, it may be issued by a school, employer, training institute or inviting organisation.",
    listLead: "In practice:",
    listItems: [
      "Often used as a school or training-institute confirmation for Student Visa, Intern Visa and similar categories",
      "For Employment Visa, may be requested as evidence of employment status and work details",
      "Typically covers purpose of stay, organisation, role and intended period",
      "May be requested again on visa extension or when particulars change",
    ],
  },
  exitPermit: {
    title: "Exit permit support",
    intro:
      "Depending on visa status or overstay risk, an exit permit may be required before leaving India.",
    supportHeading: "What we help with:",
    supportItems: [
      "Whether an exit permit is likely to apply",
      "Departure timing and urgent coordination",
      "FRRO document packs and submissions",
      "Post-approval departure confirmation",
    ],
  },
  footNote:
    "※ FRRO operating rules and required documents vary by location, visa type and purpose of stay.\n\nFinal approvals and decisions follow the competent FRRO and India immigration policy.",
  backToServices: "Back to services",
  contactCta: "Contact us",
};

const zh: FrroServiceCopy = {
  metaTitle: "FRRO 服务",
  metaDescription: `${company.shortName} — 印度 FRRO、RP 登记、签证延期、地址/护照/雇主变更申报及出境许可等居留行政实务协助`,
  pageTitle: "FRRO 服务",
  pageIntroA:
    "面向在印度居留的外国人，我们以实务为导向协助办理外国人地区登记处（FRRO）的登记、延期与变更相关手续。",
  pageIntroB: `${company.shortName} 依据韩国及海外派驻人员的签证状态与停留计划，协助 FRRO 申报、居留许可（RP）登记、签证延期、地址变更及 Exit Permit 等全流程。`,
  contextParas: [
    "FRRO 事项往往无法仅靠一次线上申请完成；所需材料与审查方式会因签证类别、居留目的、公司及居住安排而异。",
    `${company.shortName} 结合实际运营案例，协助材料审阅、进度管理、与主管机关沟通及日常对接。`,
  ],
  mainWorkTitle: "主要协助内容",
  workBlocks: [
    {
      title: "1. FRRO 首次登记及 Residential Permit（RP）登记",
      intro: "在印度长期居留的外国人，入境后通常须在指定期限内完成 FRRO 登记并可能需办理 RP（居留许可）。",
      supportHeading: "协助范围：",
      supportItems: [
        "FRRO 线上账户开立与申请协助",
        "是否需办理 RP 的初步判断",
        "护照、签证、入境章、照片等基础材料核对",
        "劳动合同、公司文件、居住证明等整理",
        "FRRO 上传材料与申请步骤说明",
        "必要时陪同前往 FRRO 并现场沟通",
      ],
    },
    {
      title: "2. 签证延期（E registration / 延期）",
      intro: "就业签证等长期签证延期时，主管机关可能要求提交公司及居留相关材料。",
      exampleHeading: "常见提交材料示例：",
      exampleItems: [
        "护照及当前签证复印件",
        "RP（居留许可）复印件",
        "在职及劳动合同相关证明",
        "近期工资及税务资料（PAN/TDS 等）",
        "公司法人文件及 FRRO 要求的补充材料",
        "现住址证明及照片",
      ],
      supportHeading: "协助范围：",
      supportItems: [
        "延期可行性及时间安排预审",
        "材料整理与缺项检查",
        "线上申请及补件沟通协助",
        "FRRO 面谈或到场时间协调",
      ],
    },
    {
      title: "3. Change of Address（地址变更申报）",
      intro: "由酒店、民宿等转入普通住所，或在印度境内更换住址时，可能需向 FRRO 办理地址变更申报。",
      supportHeading: "协助范围：",
      supportItems: [
        "租赁合同（Lease Agreement）审阅",
        "房东材料与地址证明核对",
        "Change of Address 线上申报协助",
        "核对 RP 地址信息是否一致更新",
      ],
    },
    {
      title: "4. 护照换发/补发后的信息更新申报",
      intro: "护照续期或补发导致护照号码变更时，可能需在 FRRO 系统内更新信息并完成相应申报。",
      supportHeading: "协助范围：",
      supportItems: [
        "旧护照与新护照信息梳理",
        "新护照信息更新申报协助",
        "与 RP、签证信息的交叉核对",
        "必要时应对 FRRO 追加材料要求",
      ],
    },
    {
      title: "5. Change of Organization（雇主/组织变更）申报",
      intro: "更换用工主体或集团内岗位调整时，可能需办理 FRRO 相关申报并复核签证条件。",
      supportHeading: "协助范围：",
      supportItems: [
        "组织变更路径可行性评估",
        "新劳动合同及公司材料审阅",
        "Change of Organization 申报协助",
        "与既有 RP、签证状态的衔接核对",
        "必要时说明 Exit 及新签证路径",
      ],
    },
  ],
  documentsTitle: "FRRO 主要表格说明",
  cForm: {
    title: "C Form",
    body: "C Form 由酒店、民宿、服务式公寓等住宿经营者向 FRRO 申报外籍住客信息的表格。",
    listLead: "一般情形：",
    listItems: ["多在酒店入住时登记", "用于入境初期停留记录核对", "办理 RP 或地址变更时可能作为参考材料"],
  },
  sForm: {
    title: "S Form",
    body: "S Form 为核实外国人居留目的及所属机构信息而提交的确认类文件。根据签证类别及 FRRO 要求，可由学校、公司、教育机构或邀请方等出具。",
    listLead: "一般情形：",
    listItems: [
      "学生签证、实习签证等常作为学校或教育机构出具的确认材料",
      "就业签证场景下，可能被要求作为在职与履职信息的佐证",
      "用于确认居留目的、所属机构、职务与期限等",
      "签证延期或信息变更时可能被再次要求提供",
    ],
  },
  exitPermit: {
    title: "Exit Permit 协助",
    intro: "在特定签证状态或停留超期风险等情形下，离境前可能需要办理 Exit Permit。",
    supportHeading: "协助范围：",
    supportItems: [
      "是否需要 Exit Permit 的预审",
      "离境时间安排与紧急事项协调",
      "FRRO 提交材料整理协助",
      "获批后的离境安排核对协助",
    ],
  },
  footNote:
    "※ FRRO 的办理方式与所需材料可能因地区、签证类型与居留目的而异。\n\n最终批准与判断标准以主管 FRRO 及印度移民局政策为准。",
  backToServices: "返回服务页",
  contactCta: "联系我们",
};

export function frroServiceCopy(locale: SiteLocale): FrroServiceCopy {
  return pickLocale(locale, { ko, en, zh });
}
