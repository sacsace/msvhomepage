import type { SiteLocale } from "@/lib/site-locale";
import { pickLocale } from "@/lib/site-locale";
import { company } from "@/lib/site-content";

export type HerenowSoftwareSubsection = {
  readonly title: string;
  readonly intro?: string;
  readonly bullets?: readonly string[];
};

export type HerenowSoftwareSectionCopy = {
  eyebrow: string;
  title: string;
  /** `\n\n`으로 문단 구분 */
  body: string;
  /** 본문 아래 불릿(선택) */
  bullets?: readonly string[];
  /** 불릿 위 소제목(선택) */
  bulletsTitle?: string;
  /** 번호·기능 블록 등(선택) */
  subsections?: readonly HerenowSoftwareSubsection[];
  /** 불릿·subsections 아래 마무리 문단(선택) */
  closing?: string;
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
    "회사(테넌트) 단위 GPS 기반 출퇴근·근태 관리. 위치 기반 출근, 현장 확인, 승인 흐름과 Attendance·Payroll·HR 데이터 연계.",
  pageTitle: "출퇴근 기록 시스템 (HereNow)",
  pageHeaderDescription:
    "회사(테넌트) 단위로 운영되는 GPS 기반 출퇴근·근태 관리 시스템입니다.\n\n직원 위치 기반 출근 기록, 출장지·현장 근무 확인, 근태 승인 흐름을 통합하여 Attendance·Payroll·HR 운영 데이터를 연결할 수 있도록 설계하였습니다.",
  overviewEyebrow: "Overview",
  overviewTitle: "개요",
  heroLead: `HereNow는 GPS 기반 출퇴근 기록과 근태 운영을 지원하는 웹 기반 시스템입니다.

직원은 모바일 또는 웹 환경에서 위치 기반으로 출근·퇴근 기록을 수행할 수 있으며, 회사는 조직·현장·부서별 근무 데이터를 통합 관리할 수 있습니다.

본 시스템은 단순 출퇴근 체크 기능이 아니라 Attendance·근태 승인·근무 시간·지각·조퇴·현장 근무 기록을 연결하여 Payroll 및 HR 운영과 연계될 수 있도록 설계되었습니다.

주요 기능은 회사(테넌트) 단위로 분리 운영되며, 고객별 근무 정책·근무지·승인 구조를 별도로 설정할 수 있습니다.

법인 ${company.shortName}의 회계·세무 실행은 서비스 페이지와 동일한 전문 조직이 담당합니다.`,
  sections: [
    {
      eyebrow: "Focus",
      title: "GPS 기반 출퇴근 관리",
      body: `HereNow는 GPS 위치 정보를 기반으로 출근·퇴근 기록을 관리합니다.

직원은 지정된 사업장·현장·지점 반경 내에서 출근 기록을 수행할 수 있으며, 관리자는 근무 위치·시간·승인 상태를 확인할 수 있습니다.

직원은 본사·지점·공장뿐 아니라 출장지·고객사·현장 방문 위치에서도 GPS 기반 출퇴근 및 근무 기록을 남길 수 있습니다.

회사 정책에 따라 출장 승인·현장 코드·프로젝트 단위와 연결하여 운영할 수 있습니다.

실제 운영에서는 다음과 같은 항목이 함께 관리될 수 있습니다.`,
      bullets: [
        "GPS 기반 출근·퇴근 기록",
        "지정 사업장 반경(Geo-fencing) 설정",
        "지점·현장별 근무 위치 관리",
        "지각·조퇴·근무 시간 계산",
        "현장 방문 기록",
        "Attendance 승인 흐름",
        "휴일·주말·교대 근무 정책 연계",
        "Payroll 연동용 Attendance 데이터 관리",
      ],
      closing: "회사 정책에 따라 GPS 허용 범위·출근 가능 위치·승인 절차는 다르게 설정될 수 있습니다.",
    },
    {
      eyebrow: "Feature",
      title: "주요 기능",
      body: "",
      subsections: [
        {
          title: "1. GPS 출퇴근 기록",
          bullets: [
            "모바일 위치 기반 출근·퇴근 체크",
            "지정 반경 외 출근 제한 설정 가능",
            "출근 위치 좌표 저장",
            "현장·지점별 출근 허용 정책 설정",
            "출장지·고객사 현장 출근 기록 지원",
            "프로젝트·현장 단위 Attendance 운영 가능",
            "출장 승인 내역과 연계 검토 가능",
            "원격 근무(Remote work) 위치 기록 지원 가능",
          ],
        },
        {
          title: "2. Attendance 관리",
          bullets: [
            "일별·월별 근태 현황 조회",
            "지각·조퇴·결근 자동 분류",
            "근무 시간 계산",
            "Attendance 수정 요청 및 승인",
          ],
        },
        {
          title: "3. 조직·테넌트 분리",
          bullets: ["회사(테넌트)별 데이터 분리", "고객사별 근무 정책 독립 운영", "부서·지점·현장 단위 관리"],
        },
        {
          title: "4. 승인 및 운영 흐름",
          bullets: [
            "팀장·HR 승인 체계 운영 가능",
            "Attendance correction workflow",
            "휴가·외근·출장 기록 연계 가능",
          ],
        },
        {
          title: "5. Payroll 연계",
          bullets: [
            "Payroll 계산용 Attendance 데이터 연동",
            "PF·ESI·Leave·OT 계산 참고 데이터 관리",
            "급여 마감 전 Attendance 검증 가능",
          ],
        },
      ],
    },
    {
      eyebrow: "Security",
      title: "데이터 및 운영 관리",
      body: `근태 데이터는 회사 운영 및 Payroll 계산과 연결될 수 있으므로 접근 권한과 데이터 분리 구조가 중요합니다.

HereNow는 다음과 같은 운영 구조를 고려하여 설계됩니다.`,
      bullets: [
        "테넌트 기반 데이터 분리",
        "관리자 권한 분리",
        "Attendance 변경 이력 관리",
        "승인 기록(Audit trail) 관리",
        "Employee master 연계 가능",
        "Payroll 데이터 연결 검토 가능",
      ],
      closing: "실제 운영 정책 및 데이터 보관 기준은 고객사 내부 정책에 따라 달라질 수 있습니다.",
    },
    {
      eyebrow: "Use case",
      title: "일반적인 운영 흐름",
      body: "",
      subsections: [
        {
          title: "1. 직원 등록",
          bullets: ["Employee master 생성", "부서·직책·근무지 설정", "출근 허용 위치 등록"],
        },
        {
          title: "2. 출근 기록",
          bullets: [
            "GPS 기반 출근 체크",
            "지정 반경 여부 확인",
            "Attendance 생성",
            "출장지·현장 방문 시 GPS 기반 현장 출근 기록",
            "고객사·프로젝트 위치별 Attendance 구분 가능",
          ],
        },
        {
          title: "3. 근태 검토",
          bullets: ["지각·조퇴·누락 확인", "Attendance 수정 요청", "관리자 승인"],
        },
        {
          title: "4. Payroll 연계",
          bullets: ["Attendance 데이터 마감", "OT·Leave·근무 시간 반영", "Payroll 데이터 연결"],
        },
      ],
      bulletsTitle: "실무상 자주 발생하는 이슈",
      bullets: [
        "GPS off 상태로 출근 시도",
        "사업장 외부 출근 기록",
        "Attendance 누락",
        "Duplicate attendance",
        "야외 현장 근무 위치 불일치",
        "승인 지연으로 Payroll cutoff 영향",
        "Employee master mismatch",
        "Mobile device permission 문제",
        "출장지 GPS 정확도 차이",
        "현장 네트워크 불안정",
        "승인되지 않은 위치 출근 기록",
        "프로젝트 코드 누락",
      ],
    },
    {
      eyebrow: "Fit",
      title: "MSV 서비스와의 연계",
      body: `HereNow는 MSV의 Payroll·HR 운영 서비스와 함께 활용될 수 있습니다.

운영 구조에 따라 다음 영역과 연결될 수 있습니다.`,
      bullets: [
        "Attendance 운영",
        "Payroll 데이터 검토",
        "Leave 관리",
        "HR 문서 운영",
        "Expat employee attendance",
        "현장 근무 관리",
        "Multi-branch attendance 운영",
      ],
      closing: "실제 Payroll·세무·노무 처리 범위는 별도 서비스 계약 및 운영 구조에 따라 달라질 수 있습니다.",
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
  metaDescription: `${company.shortName} — GPS-based clock-in/out and attendance per tenant; ties attendance approvals to payroll and HR data.`,
  pageTitle: "Attendance system (HereNow)",
  pageHeaderDescription:
    "HereNow is a GPS-based attendance system operated per company (tenant).\n\nIt brings together location-based clock-in, travel and field-site work checks, and approval flows so Attendance, payroll and HR operating data can be connected.",
  overviewEyebrow: "Overview",
  overviewTitle: "Overview",
  heroLead: `HereNow is a web system that supports GPS-based clock records and attendance operations.

Employees can clock in and out from mobile or web using location signals; the company can manage work data by organisation, site and department.

The product is designed to go beyond a simple punch clock: it links attendance approvals, working hours, lateness, early leave and on-site records so payroll and HR operations can stay aligned.

Features are isolated per tenant; each customer can configure work policies, workplaces and approval structures separately.

${company.shortName}’s accounting and tax delivery is handled by the same specialist organisation as on the Services page.`,
  sections: [
    {
      eyebrow: "Focus",
      title: "GPS-based attendance",
      body: `HereNow manages clock-in/out records using GPS location.

Employees can record attendance within defined radii around plants, sites or branches; managers can review location, time and approval status.

Staff can also capture GPS-based clock-in/out and work activity from business travel locations, customer sites and field visits — not only HQ, branches and plants.

Depending on policy, operations can be linked to travel approvals, site codes and project dimensions.

In live operations, teams often manage items such as:`,
      bullets: [
        "GPS-based clock-in/out",
        "Geo-fencing around designated workplaces",
        "Location management by branch or site",
        "Lateness, early leave and hours calculation",
        "Site visit logs",
        "Attendance approval flows",
        "Linkage to holiday, weekend and shift policies",
        "Attendance data for payroll integration",
      ],
      closing: "Depending on company policy, GPS tolerance, eligible clock-in locations and approval steps can differ.",
    },
    {
      eyebrow: "Feature",
      title: "Key features",
      body: "",
      subsections: [
        {
          title: "1. GPS clock-in/out",
          bullets: [
            "Mobile location-based clock-in/out",
            "Optional block on punches outside the allowed radius",
            "Store punch coordinates",
            "Per-site or per-branch clock-in rules",
            "Clock-in at travel and customer-site locations",
            "Project- and site-scoped attendance where configured",
            "Cross-check with travel approvals where used",
            "Remote-work location logging where policy allows",
          ],
        },
        {
          title: "2. Attendance management",
          bullets: [
            "Daily and monthly attendance views",
            "Automatic tagging for late, early leave and absence",
            "Working time calculation",
            "Attendance correction requests and approvals",
          ],
        },
        {
          title: "3. Tenant and organisation separation",
          bullets: ["Data isolated per tenant", "Independent work policies per customer", "Department, branch and site scopes"],
        },
        {
          title: "4. Approvals and workflows",
          bullets: [
            "Team lead / HR approval patterns",
            "Attendance correction workflow",
            "Can link to leave, field work and travel records",
          ],
        },
        {
          title: "5. Payroll linkage",
          bullets: [
            "Attendance data for payroll runs",
            "Reference data for PF, ESI, leave and OT",
            "Pre-payroll attendance checks",
          ],
        },
      ],
    },
    {
      eyebrow: "Security",
      title: "Data and operations",
      body: `Because attendance data feeds operations and payroll, access control and tenant separation matter.

HereNow is designed with structures such as:`,
      bullets: [
        "Tenant-separated data",
        "Split administrator privileges",
        "History on attendance changes",
        "Approval audit trails",
        "Optional employee master linkage",
        "Payroll data connection reviews",
      ],
      closing: "Retention and operating rules follow each customer’s internal policy.",
    },
    {
      eyebrow: "Use case",
      title: "Typical operating flow",
      body: "",
      subsections: [
        {
          title: "1. Employee onboarding",
          bullets: ["Create employee master", "Set department, role and workplace", "Register allowed clock-in locations"],
        },
        {
          title: "2. Clock-in",
          bullets: [
            "GPS punch",
            "Radius validation",
            "Create attendance record",
            "Field / travel visits via GPS where enabled",
            "Attendance by customer or project location where configured",
          ],
        },
        {
          title: "3. Attendance review",
          bullets: ["Check late, early leave and gaps", "Attendance correction requests", "Manager approval"],
        },
        {
          title: "4. Payroll hand-off",
          bullets: ["Close attendance data", "Reflect OT, leave and hours", "Connect to payroll datasets"],
        },
      ],
      bulletsTitle: "Common operating issues",
      bullets: [
        "Punch attempts with GPS disabled",
        "Punches recorded outside the plant",
        "Missing attendance rows",
        "Duplicate attendance",
        "Outdoor site location mismatch",
        "Approval delays hitting payroll cut-off",
        "Employee master mismatch",
        "Mobile permission issues",
        "GPS accuracy gaps on the road",
        "Unstable networks at remote sites",
        "Punches from non-approved locations",
        "Missing project / site codes",
      ],
    },
    {
      eyebrow: "Fit",
      title: "Working with MSV services",
      body: `HereNow can be used alongside MSV payroll and HR operations.

Depending on your operating model, it may connect to areas such as:`,
      bullets: [
        "Attendance operations",
        "Payroll data review",
        "Leave administration",
        "HR document workflows",
        "Expat attendance",
        "Field workforce attendance",
        "Multi-branch attendance",
      ],
      closing: "Actual payroll, tax and labour scope depends on separate service agreements and your operating design.",
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
  metaDescription: `${company.shortName} — 按租户运营的 GPS 考勤；整合打卡、现场核对与审批，衔接考勤与薪酬、HR 数据。`,
  pageTitle: "考勤记录系统（HereNow）",
  pageHeaderDescription:
    "HereNow 是按公司（租户）运营的 GPS 考勤与现场管理系统。\n\n整合基于员工位置的打卡、出差地与现场出勤核对与审批流，使考勤、薪酬与 HR 运营数据能够衔接。",
  overviewEyebrow: "Overview",
  overviewTitle: "概述",
  heroLead: `HereNow 是基于 GPS 的打卡与考勤运营网页系统。

员工可在移动端或网页以位置方式完成上下班打卡；企业可按组织、现场与部门整合管理工时数据。

系统不仅提供简单打卡，还将考勤审批、工时、迟到早退与现场出勤记录串联，以便与薪酬及 HR 运营衔接。

功能按公司（租户）隔离部署，客户可分别配置考勤政策、工作地点与审批结构。

法人 ${company.shortName} 的会计与税务落地由与服务页面相同的专业团队负责。`,
  sections: [
    {
      eyebrow: "Focus",
      title: "基于 GPS 的考勤",
      body: `HereNow 以 GPS 位置信息记录上下班。

员工可在指定的工厂、现场或分支半径内打卡；管理者可查看位置、时间与审批状态。

除总部、分支与工厂外，员工亦可在出差地、客户处及现场拜访等位置留下基于 GPS 的上下班与工时记录。

依据公司政策，可与出差审批、现场编码及项目维度等衔接运营。

实际运营中，常见一并管理的项目包括：`,
      bullets: [
        "基于 GPS 的上下班记录",
        "指定厂区地理围栏（Geo-fencing）",
        "按分支与现场管理位置",
        "迟到、早退与工时计算",
        "现场拜访记录",
        "考勤审批流",
        "与节假日、周末与轮班政策衔接",
        "可供薪酬对接的考勤数据",
      ],
      closing: "依据公司政策，GPS 允许范围、可打卡位置与审批流程可分别配置。",
    },
    {
      eyebrow: "Feature",
      title: "主要功能",
      body: "",
      subsections: [
        {
          title: "1. GPS 上下班",
          bullets: ["移动端位置打卡", "可限制半径外打卡", "保存打卡坐标", "按现场/分支配置允许规则", "出差地与客户现场打卡支持", "按项目/现场维度考勤（可配置）", "可与出差审批记录联动核对", "在政策允许下支持远程办公位置记录"],
        },
        {
          title: "2. 考勤管理",
          bullets: ["按日、按月查看考勤", "迟到、早退、缺勤自动归类", "工时计算", "考勤更正申请与审批"],
        },
        {
          title: "3. 组织与租户隔离",
          bullets: ["按租户隔离数据", "客户独立考勤政策", "部门、分支、现场维度管理"],
        },
        {
          title: "4. 审批与流程",
          bullets: ["可配置组长/HR 审批", "考勤更正工作流", "可与休假、外勤、出差记录衔接"],
        },
        {
          title: "5. 与薪酬衔接",
          bullets: ["为算薪提供考勤数据", "PF、ESI、休假、加班等参考数据", "发薪前考勤核对"],
        },
      ],
    },
    {
      eyebrow: "Security",
      title: "数据与运营管理",
      body: `考勤数据常与日常运营及算薪相连，因此权限与数据隔离至关重要。

HereNow 在设计上考虑如下结构：`,
      bullets: [
        "租户级数据隔离",
        "管理员权限分离",
        "考勤变更历史",
        "审批留痕（Audit trail）",
        "可与员工主数据衔接",
        "可审视与薪酬数据的连接",
      ],
      closing: "具体留存与运营标准以客户内部制度为准。",
    },
    {
      eyebrow: "Use case",
      title: "典型运营流程",
      body: "",
      subsections: [
        {
          title: "1. 员工建档",
          bullets: ["建立员工主数据", "配置部门、职务与工作地点", "登记允许打卡位置"],
        },
        {
          title: "2. 打卡",
          bullets: ["GPS 打卡", "校验是否在允许半径内", "生成考勤记录", "出差与现场拜访场景的 GPS 现场打卡（如启用）", "按客户或项目位置区分考勤（如配置）"],
        },
        {
          title: "3. 考勤复核",
          bullets: ["核对迟到、早退与遗漏", "考勤更正申请", "管理者审批"],
        },
        {
          title: "4. 与薪酬衔接",
          bullets: ["考勤数据封账", "反映加班、休假与工时", "连接薪酬侧数据"],
        },
      ],
      bulletsTitle: "常见实务问题",
      bullets: [
        "关闭 GPS 仍尝试打卡",
        "厂区外产生打卡",
        "考勤遗漏",
        "重复考勤",
        "户外现场位置不一致",
        "审批拖延影响薪酬截止",
        "员工主数据不一致",
        "移动端权限问题",
        "出差场景 GPS 精度差异",
        "现场网络不稳定",
        "未经批准位置的打卡记录",
        "项目/现场编码遗漏",
      ],
    },
    {
      eyebrow: "Fit",
      title: "与 MSV 服务的衔接",
      body: `HereNow 可与 MSV 的薪酬与 HR 运营服务一并使用。

视运营结构，可与以下领域衔接：`,
      bullets: ["考勤运营", "薪酬数据复核", "假期管理", "人事文档运营", "外籍员工考勤", "现场用工考勤", "多分支考勤"],
      closing: "实际薪酬、税务与劳动事务的处理范围，依另行签署的服务合同与运营结构而定。",
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
