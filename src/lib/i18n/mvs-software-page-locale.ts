import type { SiteLocale } from "@/lib/site-locale";
import { pickLocale } from "@/lib/site-locale";
import { company } from "@/lib/site-content";

export type MvsScreenshotCopy = {
  src: string;
  alt: string;
  caption: string;
};

export type MvsSoftwareSectionCopy = {
  eyebrow: string;
  title: string;
  body: string;
};

export type MvsSoftwarePageCopy = {
  metaTitle: string;
  metaDescription: string;
  pageTitle: string;
  pageHeaderDescription: string;
  overviewEyebrow: string;
  overviewTitle: string;
  heroLead: string;
  sections: readonly MvsSoftwareSectionCopy[];
  screensEyebrow: string;
  screensTitle: string;
  screenshotsLead: string;
  screenshots: readonly MvsScreenshotCopy[];
  ctaLead: string;
  /** 상단 바로가기 카드 */
  shortcutsHeading: string;
  shortcutWebsite: string;
  shortcutBusinessPdf: string;
  /** 비어 있으면 PDF 버튼 미표시. 예: "/documents/mvs-intro.pdf" */
  businessIntroPdfUrl: string;
  linkSoftware: string;
  linkAbout: string;
  linkServices: string;
  linkContact: string;
};

/** 그룹웨어(MVS) 제품 사이트 — 외부 링크. */
export const MVS_PRODUCT_SITE_URL = "https://www.mvsystem.in";

const SHOTS = [
  "/software/mvs/inventory-status.png",
  "/software/mvs/receiving.png",
  "/software/mvs/shipping.png",
  "/software/mvs/inventory-report.png",
  "/software/mvs/quotations.png",
  "/software/mvs/tax-invoice-general.png",
  "/software/mvs/expense-resolution.png",
] as const;

const ko: MvsSoftwarePageCopy = {
  metaTitle: "그룹웨어 (MVS)",
  metaDescription: `${company.shortName}이 운영하는 웹 통합 그룹웨어입니다. 인사·근태·휴가·급여, 전자근로계약·전자결재, 업무 보드·보고·통계, 파트너·재고·전자세금계산서 등 법인 운영 업무를 한 로그인 체계에서 다룹니다.`,
  pageTitle: "그룹웨어 (MVS)",
  pageHeaderDescription: `${company.shortName}이 운영하는 웹 통합 그룹웨어입니다. 인사·근태·휴가·급여, 전자근로계약·전자결재, 업무 보드·보고·통계, 파트너·재고·전자세금계산서 등 법인 운영 업무를 한 로그인 체계에서 다룹니다.`,
  overviewEyebrow: "Overview",
  overviewTitle: "개요",
  heroLead: `MVS(MS Ventures System, 브랜드 표기에 따라 Ventus 계열을 함께 쓰기도 합니다)는 ${company.shortName}(${company.legalName})이 보유·운영하는 웹 기반 통합 그룹웨어입니다. 대시보드, 기본정보·조직·사용자·권한, 근태·휴가·급여, 전자근로계약, 전자결재·업무 보드·업무 보고·통계, 파트너·고객사, 재고·전자세금계산서 등 현장에서 매일 이어지는 업무를 모듈로 묶었고, 회사 단위 데이터 격리, SMTP·알림, 언어·통화(예: INR), 출근 반경·세션·비밀번호 정책 같은 운영·보안 항목은 시스템 설정에서 통제합니다.

직원에게는 출퇴근·근태·휴가 신청·급여 조회, 관리자에게는 결재·엑셀 연동·집계·감사 같은 운영 기능을 같은 제품 안에서 이어 줍니다. 필요 시 회계·세무·컴플라이언스 실행은 상근 CPA 체계의 서비스 라인과 연계해 설계할 수 있습니다.

법인 소개·비전·연혁은 회사 소개 페이지에서 확인하실 수 있습니다.`,
  sections: [
    {
      eyebrow: "Name",
      title: "Minsub Ventus System",
      body: "MVS는 Minsub Ventus System을 아우르는 제품 브랜드로, Ventus(라틴어 ‘바람’)에 담긴 실행·순환의 이미지를 바탕으로 합니다. 그룹웨어로서 사내 업무 흐름을 한데 묶는 것을 목표로 합니다.",
    },
    {
      eyebrow: "Scope",
      title: "주요 기능",
      body: "도입 범위에 따라 모듈 구성이 달라질 수 있으며, 일반적으로 다음 영역을 한 제품 안에서 전환하며 사용합니다.\n\n• 기본정보·사용자·부서·역할, 시스템 설정·로그인 이력·SMTP\n\n• 근태(출퇴근, 통계), 휴가, 급여, 전자근로계약\n\n• 전자결재, 업무 보드(칸반), 업무 보고·업무 통계\n\n• 파트너·고객사, 재고(현황·입고·출고·보고서)·견적서·일반 세금계산서(인보이스)·지출결의서·전자세금계산서 등 거래·재무 보조\n\n• 호텔 등 그룹 확장 모듈(옵션)\n\n재고는 등록 품목 기준으로 조회·입출고·집계 보고서까지 이어지고, 견적·인보이스·지출결의는 각각 작성·승인·결제·지급 상태를 화면에서 추적합니다. 아래 화면 예시에서 UI 형태를 참고하실 수 있습니다.\n\n회계·세무·신고 실행은 외부 서비스 라인과 연계해 설계할 수 있습니다.",
    },
    {
      eyebrow: "Next steps",
      title: "더 알아보기",
      body: "비전·인사말·마일스톤은 회사 소개에서 확인하실 수 있습니다.\n\n서비스 라인과 사례는 서비스 페이지에서 확인하실 수 있습니다.",
    },
  ],
  screensEyebrow: "Screens",
  screensTitle: "화면 예시",
  screenshotsLead:
    "아래 캡처는 MVS 재고·견적·일반 세금계산서(인보이스)·지출결의서 등 일부 화면입니다. 테넌트·역할·통화·언어 설정에 따라 숫자·라벨·노출 필드가 달라질 수 있습니다.",
  screenshots: [
    {
      src: SHOTS[0],
      alt: "MVS 재고 현황 조회 화면. 요약 지표와 상품별 재고 테이블",
      caption:
        "재고 현황 조회 — 총 재고 가치·부족·품목 수 등 요약과 함께 품목별 현재 재고·최소·최대·재고율·단가·총가치·상태를 표시합니다. 행을 선택하면 해당 품목의 입·출고 내역으로 이어질 수 있습니다.",
    },
    {
      src: SHOTS[1],
      alt: "MVS 입고 관리 화면. 제품명 검색과 품목코드 입력",
      caption:
        "입고 관리 — 시스템에 등록된 품목만 입고할 수 있도록 제품명 검색·품목코드(바코드) 입력으로 품목을 특정하고, 신규 품목은 재고(제품) 관리에서 먼저 등록하는 흐름과 맞춥니다.",
    },
    {
      src: SHOTS[2],
      alt: "MVS 출고 관리 화면. 검색·수량·출고 이유와 출고 버튼",
      caption:
        "출고 관리 — 바코드·품목코드·제품명으로 품목을 찾은 뒤 수량·출고 사유를 입력하고, 출고 전 품목 정보를 읽기 전용으로 확인한 다음 처리합니다.",
    },
    {
      src: SHOTS[3],
      alt: "MVS 재고 보고서 화면. 요약·차트·상세 테이블",
      caption:
        "재고 보고서 — 기간·카테고리 필터, 새로고침·인쇄·보고서 내려받기와 함께 추이·카테고리별 분포·회전율 분석 등을 시각화하고, 하단에서 상세 재고 현황을 표로 확인합니다.",
    },
    {
      src: SHOTS[4],
      alt: "MVS 견적서 관리 화면. 요약 카드·탭·필터·견적 목록",
      caption:
        "견적서 관리 — 총 견적·총액·승인·대기 건수를 카드로 보여 주고, 내가 요청한 견적·승인 대기 탭과 검색·상태 필터로 목록을 좁힌 뒤 견적서 작성·발송·승인 상태를 관리합니다.",
    },
    {
      src: SHOTS[5],
      alt: "MVS 일반 세금계산서 화면. 인보이스 목록·승인·결제 상태",
      caption:
        "일반 세금계산서 — 내가 요청한 인보이스·승인 대기 탭으로 구분하고, 번호·고객명 검색·결제 상태 필터와 새 인보이스 작성으로 발행 건을 관리합니다. 발행일·만기일·금액·승인·결제 상태를 표로 보여 주며 행 단위로 조회·승인·인쇄 등 작업을 이어 갈 수 있습니다.",
    },
    {
      src: SHOTS[6],
      alt: "MVS 지출결의서 화면. 요약 카드·탭·지출 목록",
      caption:
        "지출결의서 — 작성한 지출·받은 지출·송금 대기 탭으로 흐름을 나누고, 총 지출·승인·대기·긴급 건을 카드로 요약합니다. 제목·지출번호·신청자 검색과 상태·우선순위 필터로 목록을 좁힌 뒤 금액·지급 상태 등을 표에서 관리합니다.",
    },
  ],
  ctaLead: "소프트웨어·서비스 소개로 이동하시거나, 도입·연동 문의를 남겨 주세요.",
  shortcutsHeading: "바로가기",
  shortcutWebsite: "웹사이트",
  shortcutBusinessPdf: "비즈니스 소개 PDF",
  businessIntroPdfUrl: "",
  linkSoftware: "소프트웨어",
  linkAbout: "회사 소개",
  linkServices: "서비스",
  linkContact: "문의하기",
};

const en: MvsSoftwarePageCopy = {
  metaTitle: "Groupware (MVS)",
  metaDescription: `${company.shortName} — web-based integrated groupware: HR, attendance, leave, payroll, e-labour contracts, e-approval, tasks, partners, inventory and e-invoicing in one login.`,
  pageTitle: "Groupware (MVS)",
  pageHeaderDescription: `${company.shortName} operates web-based integrated groupware. HR, attendance, leave, payroll, e-labour contracts, e-approval, work boards, reporting, statistics, partners, inventory and e-invoicing are handled in one login.`,
  overviewEyebrow: "Overview",
  overviewTitle: "Overview",
  heroLead: `MVS (MS Ventures System; the Ventus family name is sometimes used with the brand) is web-based integrated groupware owned and operated by ${company.shortName} (${company.legalName}). Dashboard, master data·organisation·users·roles, attendance·leave·payroll, e-labour contracts, e-approval·task boards·reports·statistics, partners·customers, inventory·e-invoicing and other day-to-day work are organised as modules. Tenant isolation, SMTP·notifications, language·currency (e.g. INR), clock-in radius·session·password policy and similar controls are managed in system settings.

Employees get clock-in/out, attendance, leave requests and payroll views; administrators get approvals, Excel integration, roll-ups and audit in the same product. Where needed, accounting, tax and compliance execution can be designed together with the in-house CPA-led service line.

Company profile, vision and milestones are on the About page.`,
  sections: [
    {
      eyebrow: "Name",
      title: "Minsub Ventus System",
      body: "MVS is the product brand encompassing Minsub Ventus System, drawing on Ventus (Latin for ‘wind’) as a symbol of motion and cycle. As groupware, it aims to bring internal workflows together in one place.",
    },
    {
      eyebrow: "Scope",
      title: "Key capabilities",
      body: "Module mix depends on scope; customers typically run the following areas in one product:\n\n• Master data·users·departments·roles, system settings·login history·SMTP\n\n• Attendance (clock-in/out, statistics), leave, payroll, e-labour contracts\n\n• E-approval, task boards (Kanban), work reports·statistics\n\n• Partners·customers, inventory (status·receiving·shipping·reports)·quotations·general tax invoices·expense resolutions·e-invoicing\n\n• Optional group extensions such as hotel modules\n\nInventory follows registered items through inquiry, movements and summary reports; quotations, invoices and expense flows track draft·approval·payment·payout on screen. See the screenshots below for UI patterns.\n\nAccounting, tax and statutory filing can be wired to the external service line where required.",
    },
    {
      eyebrow: "Next steps",
      title: "Learn more",
      body: "Vision, leadership message and milestones are on the About page.\n\nService lines and examples are on the Services page.",
    },
  ],
  screensEyebrow: "Screens",
  screensTitle: "Screenshots",
  screenshotsLead:
    "The captures below show parts of MVS: inventory, quotations, general tax invoices and expense resolutions. Numbers, labels and visible fields may vary by tenant, role, currency and language settings.",
  screenshots: [
    {
      src: SHOTS[0],
      alt: "MVS inventory status screen with summary KPIs and per-item stock table",
      caption:
        "Inventory status — summary KPIs (total stock value, shortages, SKU count) with per-item on-hand, min/max, stock ratio, unit price, total value and status. Selecting a row can open that item’s movement history.",
    },
    {
      src: SHOTS[1],
      alt: "MVS receiving screen with product search and item code entry",
      caption:
        "Receiving — only registered items can be received: locate items by product search or item code (barcode). New SKUs are registered first under inventory (products) to match the workflow.",
    },
    {
      src: SHOTS[2],
      alt: "MVS shipping screen with search, quantity, reason and ship action",
      caption:
        "Shipping — find items by barcode, code or name, enter quantity and reason, confirm read-only item details, then post the shipment.",
    },
    {
      src: SHOTS[3],
      alt: "MVS inventory report with summary, charts and detail table",
      caption:
        "Inventory report — period and category filters, refresh·print·export, with trend, category mix and turnover visuals and a detailed stock table below.",
    },
    {
      src: SHOTS[4],
      alt: "MVS quotation management with summary cards, tabs, filters and list",
      caption:
        "Quotations — cards for totals, amounts, approved and pending counts; “my requests” and “pending approval” tabs plus search and status filters to narrow the list, then manage create·send·approval states.",
    },
    {
      src: SHOTS[5],
      alt: "MVS general tax invoice screen with invoice list and approval/payment status",
      caption:
        "General tax invoices — “my requests” vs “pending approval” tabs, number·customer search and payment-status filters, plus new invoice creation. Issue date, due date, amount, approval and payment columns support row-level view·approve·print actions.",
    },
    {
      src: SHOTS[6],
      alt: "MVS expense resolution screen with summary cards, tabs and expense list",
      caption:
        "Expense resolutions — tabs for created, received and payout-pending flows, with cards for totals, approved, pending and urgent items. Title·expense no.·requester search and status·priority filters narrow the list; amounts and payout status are managed in the grid.",
    },
  ],
  ctaLead: "Go to software and services, or leave a message about adoption and integrations.",
  shortcutsHeading: "Shortcuts",
  shortcutWebsite: "Website",
  shortcutBusinessPdf: "Business overview (PDF)",
  businessIntroPdfUrl: "",
  linkSoftware: "Software",
  linkAbout: "About",
  linkServices: "Services",
  linkContact: "Contact",
};

const zh: MvsSoftwarePageCopy = {
  metaTitle: "集团办公（MVS）",
  metaDescription: `${company.shortName} — 基于网页的一体化集团办公：人事、考勤、休假、工资、电子劳动合同、电子审批、任务看板、伙伴、库存与电子发票等，同一登录体系完成。`,
  pageTitle: "集团办公（MVS）",
  pageHeaderDescription: `${company.shortName} 运营的网页一体化集团办公。人事、考勤、休假、工资、电子劳动合同、电子审批、工作看板、报表统计、伙伴、库存与电子发票等法人日常业务可在同一登录体系内处理。`,
  overviewEyebrow: "Overview",
  overviewTitle: "概述",
  heroLead: `MVS（MS Ventures System；品牌展示中有时也会并列 Ventus 系列）是由 ${company.shortName}（${company.legalName}）持有并运营的网页一体化集团办公。将看板、主数据·组织·用户·权限、考勤·休假·工资、电子劳动合同、电子审批·任务看板·工作报告·统计、伙伴·客户、库存·电子发票等日常现场工作模块化；按公司隔离数据，SMTP·通知、语言·币种（如 INR）、打卡半径·会话·密码策略等运营与安全项在系统设置中集中控制。

员工侧可完成打卡、考勤、休假申请与工资查询；管理侧可在同一产品内衔接审批、Excel 联动、汇总与审计。如需与会计、税务、合规落地衔接，可与常驻 CPA 体系的服务线一并设计。

公司简介、愿景与里程碑请见「关于我们」页面。`,
  sections: [
    {
      eyebrow: "Name",
      title: "Minsub Ventus System",
      body: "MVS 以 Minsub Ventus System 为所属产品品牌，Ventus（拉丁语「风」）寓意流动与循环，集团办公旨在把内部业务流程集中在一处。",
    },
    {
      eyebrow: "Scope",
      title: "主要功能",
      body: "按实施范围模块组合可能不同，常见在同一产品内覆盖：\n\n• 主数据·用户·部门·角色，系统设置·登录日志·SMTP\n\n• 考勤（打卡、统计）、休假、工资、电子劳动合同\n\n• 电子审批、任务看板（看板）、工作报告与统计\n\n• 伙伴·客户，库存（现况·入库·出库·报表）·报价单·一般税务发票（发票）·费用报销单·电子发票等交易与财务辅助\n\n• 酒店等集团扩展模块（可选）\n\n库存按已登记物料贯穿查询、出入库与汇总报表；报价、发票与费用流程在界面跟踪拟稿·审批·付款·支付状态。界面示例见下文截图。\n\n会计、税务与申报执行可与外部服务线联动设计。",
    },
    {
      eyebrow: "Next steps",
      title: "了解更多",
      body: "愿景、致辞与里程碑可在「关于我们」查看。\n\n服务线与案例可在「服务」页面查看。",
    },
  ],
  screensEyebrow: "Screens",
  screensTitle: "界面示例",
  screenshotsLead:
    "以下截图为 MVS 在库存、报价、一般税务发票（发票）、费用报销等部分界面示例。数字、标签与可见字段可能因租户、角色、币种与语言设置而不同。",
  screenshots: [
    {
      src: SHOTS[0],
      alt: "MVS 库存现况界面：汇总指标与按商品库存表",
      caption:
        "库存现况 — 汇总总库存价值、缺货、SKU 数量等，并列出各物料现存量、最低/最高、库存率、单价、总价值与状态；选中行可进入该物料出入库明细。",
    },
    {
      src: SHOTS[1],
      alt: "MVS 入库管理：品名搜索与物料编码录入",
      caption:
        "入库管理 — 仅可对系统已登记物料入库：通过品名搜索或物料编码（条码）定位；新品需先在库存（产品）管理中登记以匹配流程。",
    },
    {
      src: SHOTS[2],
      alt: "MVS 出库管理：搜索、数量、出库原因与出库按钮",
      caption:
        "出库管理 — 以条码、物料编码或品名查找物料，录入数量与出库原因，在只读确认物料信息后执行出库。",
    },
    {
      src: SHOTS[3],
      alt: "MVS 库存报表：汇总、图表与明细表",
      caption:
        "库存报表 — 支持期间与类别筛选、刷新·打印·导出，可视化趋势、类别分布与周转分析，下方以表格展示明细库存。",
    },
    {
      src: SHOTS[4],
      alt: "MVS 报价单管理：汇总卡片、页签、筛选与列表",
      caption:
        "报价单管理 — 卡片展示报价总数、金额、已批准与待处理；「我发起的」与「待审批」页签配合搜索与状态筛选缩小列表，并管理创建·发送·审批状态。",
    },
    {
      src: SHOTS[5],
      alt: "MVS 一般税务发票：发票列表与审批、付款状态",
      caption:
        "一般税务发票 — 区分「我发起的」与「待审批」页签，支持编号·客户名搜索与付款状态筛选，并可新建发票。列表展示开票日、到期日、金额、审批与付款状态，支持行级查看·审批·打印等操作。",
    },
    {
      src: SHOTS[6],
      alt: "MVS 费用报销：汇总卡片、页签与支出列表",
      caption:
        "费用报销 — 以「已创建」「收到」「待打款」等页签划分流程，卡片汇总总支出、已批、待处理与紧急件；支持标题·报销单号·申请人搜索及状态·优先级筛选，在表格中管理金额与支付状态。",
    },
  ],
  ctaLead: "可前往软件与服务介绍页面，或留下采购与对接集成的咨询。",
  shortcutsHeading: "快捷入口",
  shortcutWebsite: "网站",
  shortcutBusinessPdf: "业务介绍 PDF",
  businessIntroPdfUrl: "",
  linkSoftware: "软件",
  linkAbout: "公司介绍",
  linkServices: "服务",
  linkContact: "联系我们",
};

export function mvsSoftwarePageCopy(locale: SiteLocale): MvsSoftwarePageCopy {
  return pickLocale(locale, { ko, en, zh });
}
