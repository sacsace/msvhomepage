import type { SiteLocale } from "@/lib/site-locale";
import { pickLocale } from "@/lib/site-locale";

/** Labels for the payslip block inside email/PDF (modern layout). Always English regardless of site locale. */
export type PayslipEmailLabels = {
  heroKicker: string;
  salaryStatement: string;
  summaryGross: string;
  summaryDeductions: string;
  summaryNet: string;
  sectionEmployee: string;
  /** Excel "Working Month" = months worked since date of join (not calendar pay period). */
  monthsWorkedSinceJoin: string;
  employeeName: string;
  dateOfJoin: string;
  email: string;
  designation: string;
  statementDate: string;
  code: string;
  department: string;
  bank: string;
  accountNumber: string;
  ifsc: string;
  sectionCompensation: string;
  earnings: string;
  deductions: string;
  basicSalary: string;
  hra: string;
  otherAllowance: string;
  grossSalary: string;
  pf: string;
  esi: string;
  professionalTax: string;
  tds: string;
  otherDeduction: string;
  totalDeduction: string;
  netPay: string;
  inWords: string;
  generatedNote: string;
  dash: string;
  /** Shown under the title next to {{month}} value in the hero */
  heroMonthsWorkedCaption: string;
};

export type PayrollMailerMailSettingsCopy = {
  title: string;
  leadSmtp: string;
  leadApi: string;
  apiModeHint: string;
  railwayDiagTitle: string;
  diagMode: string;
  diagResendKey: string;
  diagProvider: string;
  diagFrom: string;
  railwayApiKeyMissing: string;
  railwaySmtpBlocked: string;
  smtpHost: string;
  smtpPort: string;
  smtpUser: string;
  smtpPassword: string;
  smtpPasswordPlaceholder: string;
  from: string;
  fromApiPlaceholder: string;
  secureLabel: string;
  testEmailLabel: string;
  sendTest: string;
  sending: string;
  save: string;
  reset: string;
  statusReady: string;
  statusIncomplete: string;
  statusReadyApi: string;
  statusIncompleteApi: string;
  footerNote: string;
  footerNoteApi: string;
  presetSuffix: string;
  envHint: string;
  envHintApi: string;
  saveFillAll: string;
  saveFillFrom: string;
  savedSession: string;
  cleared: string;
  testNeedSmtp: string;
  testNeedFrom: string;
  testNeedEmail: string;
  testFail: string;
  testSuccess: string;
};

export type PayrollMailerPageCopy = {
  locale: SiteLocale;
  pageTitle: string;
  pageHeaderDescription: string;
  defaultSubject: string;
  defaultBody: string;
  mail: PayrollMailerMailSettingsCopy;
  step: (n: number, title: string) => string;
  step1Title: string;
  step2Title: string;
  step3Title: string;
  step4Title: string;
  step5Title: string;
  excelIntro: string;
  sampleDownload: string;
  bulletPassword: string;
  bulletSheets: string;
  bulletLayout: string;
  sheetPickerTitle: string;
  sheetNameLabel: string;
  loadSheet: string;
  uploading: string;
  uploadGenericError: string;
  uploadPasswordHint: string;
  noEmployees: string;
  noSheets: string;
  mailVarsIntro: string;
  payslipVarNote: string;
  /** Explains that {{month}} maps to Working Month = months since hire */
  monthVariableHint: string;
  mailSubjectLabel: string;
  mailBodyLabel: string;
  previewTitle: string;
  previewSubjectLabel: string;
  previewBodyTitle: string;
  previewIframeTitle: string;
  previewNeedExcel: string;
  dataSheetLabel: string;
  templateMsv: string;
  templateLegacy: string;
  statSendable: string;
  statExcluded: string;
  statIssues: string;
  excludedHeading: string;
  issuesHeading: string;
  formatIssueRow: (row: number) => string;
  sendInProgress: string;
  selectEmployee: string;
  employeeInfo: string;
  labelId: string;
  labelEmail: string;
  labelDept: string;
  labelRole: string;
  netPayLabel: string;
  earningsHeading: string;
  deductionsHeading: string;
  sendCompleteSmtp: string;
  sendBlockedNet: string;
  sendConfirmLabel: string;
  sendAll: string;
  resendFailed: string;
  tableEmployee: string;
  tableEmail: string;
  tableStatus: string;
  tableMessage: string;
  statusOk: string;
  statusFail: string;
  sendNeedSmtp: string;
  sendErrorGeneric: string;
};

const payslipEn: PayslipEmailLabels = {
  heroKicker: "Payroll",
  salaryStatement: "Salary statement",
  summaryGross: "Gross pay",
  summaryDeductions: "Deductions",
  summaryNet: "Net pay",
  sectionEmployee: "Employee",
  monthsWorkedSinceJoin: "Months worked since hire (Working Month)",
  employeeName: "Name",
  dateOfJoin: "Date of join",
  email: "Email",
  designation: "Designation",
  statementDate: "Statement date",
  code: "Employee code",
  department: "Department",
  bank: "Bank",
  accountNumber: "Account number",
  ifsc: "IFSC",
  sectionCompensation: "Earnings & deductions",
  earnings: "Earnings",
  deductions: "Deductions",
  basicSalary: "Basic salary",
  hra: "HRA",
  otherAllowance: "Other allowance",
  grossSalary: "Gross salary",
  pf: "PF",
  esi: "ESI",
  professionalTax: "Professional tax",
  tds: "TDS",
  otherDeduction: "Other deduction",
  totalDeduction: "Total deductions",
  netPay: "Net pay",
  inWords: "Amount in words",
  generatedNote: "This statement was generated automatically.",
  dash: "—",
  heroMonthsWorkedCaption: "Months worked",
};

/** Payslip card labels: always English, independent of site locale. */
export function payslipEmailLabels(_locale: SiteLocale): PayslipEmailLabels {
  return payslipEn;
}

export type MailDocumentChrome = {
  htmlLang: string;
  docTitle: string;
  footer: string;
};

const mailDocKo: MailDocumentChrome = {
  htmlLang: "ko",
  docTitle: "급여 안내",
  footer: "MS Ventures · 자동 발송 메일",
};

const mailDocEn: MailDocumentChrome = {
  htmlLang: "en",
  docTitle: "Payslip notification",
  footer: "MS Ventures · Automated message",
};

const mailDocZh: MailDocumentChrome = {
  htmlLang: "zh-CN",
  docTitle: "工资单通知",
  footer: "MS Ventures · 系统自动发送",
};

export function payrollMailerMailDocumentChrome(locale: SiteLocale): MailDocumentChrome {
  return pickLocale(locale, { ko: mailDocKo, en: mailDocEn, zh: mailDocZh }) as MailDocumentChrome;
}

function mailSettings(locale: SiteLocale): PayrollMailerMailSettingsCopy {
  return pickLocale(locale, {
    ko: {
      title: "메일 환경 설정",
      leadSmtp: "SMTP 계정 정보를 입력하고 저장한 뒤, 테스트 메일로 연결을 확인하세요.",
      leadApi:
        "서버에 Resend 등 HTTPS 메일 API가 설정되어 있습니다. 인증된 발신 주소만 입력·저장한 뒤 테스트 메일로 확인하세요.",
      apiModeHint:
        "SMTP 호스트·비밀번호 없이 발송됩니다. 발신 주소는 Resend/SendGrid/Postmark에서 검증한 도메인(예: lee@msventures.in)과 일치해야 합니다. 비어 있으면 MSV_TRANSACTIONAL_FROM 환경 변수가 사용됩니다.",
      railwayDiagTitle: "서버가 인식한 발송 설정 (Railway 런타임)",
      diagMode: "발송 모드",
      diagResendKey: "RESEND_API_KEY",
      diagProvider: "MSV_EMAIL_PROVIDER",
      diagFrom: "MSV_TRANSACTIONAL_FROM",
      railwayApiKeyMissing:
        "API 키가 서버에 보이지 않습니다. Railway → msvhomepage(웹) 서비스 Variables에 RESEND_API_KEY 등을 넣고 Redeploy 하세요.",
      railwaySmtpBlocked:
        "Railway에서는 SMTP(465·587)가 막혀 타임아웃이 날 수 있습니다. RESEND_API_KEY를 설정하고 재배포하면 HTTPS API로 발송됩니다.",
      smtpHost: "SMTP Host",
      smtpPort: "SMTP Port",
      smtpUser: "SMTP User",
      smtpPassword: "SMTP Password",
      smtpPasswordPlaceholder: "앱 비밀번호 또는 API Key",
      from: "발신자 (From)",
      fromApiPlaceholder: "lee@msventures.in 또는 MS Ventures Payroll <lee@msventures.in>",
      secureLabel: "SSL/TLS 사용 (보통 포트 465일 때 체크)",
      testEmailLabel: "테스트 수신 이메일",
      sendTest: "테스트 메일 발송",
      sending: "발송 중...",
      save: "설정 저장",
      reset: "설정 초기화",
      statusReady: "SMTP 설정 완료",
      statusIncomplete: "SMTP 설정 미완료",
      statusReadyApi: "발신 주소 설정 완료 (API 모드)",
      statusIncompleteApi: "발신 주소를 입력하세요",
      footerNote:
        "설정은 브라우저 sessionStorage에만 저장되며 서버에 영구 저장되지 않습니다. .env.local 값은 서버 기본값으로만 사용됩니다.",
      footerNoteApi:
        "발신 주소는 sessionStorage에만 저장됩니다. API 키·발송 모드는 Railway Variables(RESEND_API_KEY, MSV_TRANSACTIONAL_FROM 등)로 서버에 설정합니다.",
      presetSuffix: "프리셋",
      envHint: ".env.local 값이 일부 필드에 자동 입력되었습니다. 비밀번호는 직접 입력하세요.",
      envHintApi: "서버 환경 변수에서 발신 주소가 자동 입력되었습니다. 필요 시 수정 후 저장하세요.",
      saveFillAll: "필수 항목을 모두 입력한 뒤 저장하세요.",
      saveFillFrom: "발신 주소(From)를 입력한 뒤 저장하세요.",
      savedSession: "설정이 이 브라우저 세션에 저장되었습니다.",
      cleared: "저장된 설정을 삭제했습니다.",
      testNeedSmtp: "SMTP 설정을 먼저 완료하세요.",
      testNeedFrom: "발신 주소(From)를 먼저 입력하세요.",
      testNeedEmail: "테스트 수신 이메일을 입력하세요.",
      testFail: "테스트 메일 발송 실패",
      testSuccess: "테스트 메일 발송 성공",
    },
    en: {
      title: "Mail settings",
      leadSmtp: "Enter your SMTP credentials, save, then send a test email to verify connectivity.",
      leadApi:
        "This deployment uses an HTTPS mail API (e.g. Resend). Enter a verified From address, save, then send a test email.",
      apiModeHint:
        "No SMTP host or password is required. The From address must match a domain verified in Resend/SendGrid/Postmark (e.g. lee@msventures.in). If empty, MSV_TRANSACTIONAL_FROM is used on the server.",
      railwayDiagTitle: "Server-detected delivery settings (Railway runtime)",
      diagMode: "Delivery mode",
      diagResendKey: "RESEND_API_KEY",
      diagProvider: "MSV_EMAIL_PROVIDER",
      diagFrom: "MSV_TRANSACTIONAL_FROM",
      railwayApiKeyMissing:
        "No API key visible on the server. Add RESEND_API_KEY to the msvhomepage web service Variables on Railway, then Redeploy.",
      railwaySmtpBlocked:
        "SMTP ports 465/587 are often blocked on Railway. Set RESEND_API_KEY and redeploy to send via HTTPS API.",
      smtpHost: "SMTP host",
      smtpPort: "SMTP port",
      smtpUser: "SMTP user",
      smtpPassword: "SMTP password",
      smtpPasswordPlaceholder: "App password or API key",
      from: "From address",
      fromApiPlaceholder: "lee@msventures.in or MS Ventures Payroll <lee@msventures.in>",
      secureLabel: "Use SSL/TLS (often checked for port 465)",
      testEmailLabel: "Test recipient email",
      sendTest: "Send test email",
      sending: "Sending...",
      save: "Save settings",
      reset: "Clear settings",
      statusReady: "SMTP configured",
      statusIncomplete: "SMTP not configured",
      statusReadyApi: "From address ready (API mode)",
      statusIncompleteApi: "Enter a From address",
      footerNote:
        "Settings are stored only in the browser sessionStorage and are not persisted on the server. Values from .env.local are used as server defaults only.",
      footerNoteApi:
        "Only the From address is stored in sessionStorage. API keys and delivery mode are set via Railway Variables (RESEND_API_KEY, MSV_TRANSACTIONAL_FROM, etc.).",
      presetSuffix: "preset",
      envHint: "Some fields were filled from .env.local. Enter the password manually.",
      envHintApi: "From address was prefilled from server environment variables. Edit and save if needed.",
      saveFillAll: "Fill all required fields before saving.",
      saveFillFrom: "Enter a From address before saving.",
      savedSession: "Settings saved for this browser session.",
      cleared: "Saved settings were removed.",
      testNeedSmtp: "Complete SMTP settings first.",
      testNeedFrom: "Enter a From address first.",
      testNeedEmail: "Enter a test recipient email address.",
      testFail: "Failed to send test email",
      testSuccess: "Test email sent successfully",
    },
    zh: {
      title: "邮件环境设置",
      leadSmtp: "填写 SMTP 账号并保存，然后发送测试邮件以确认连接。",
      leadApi:
        "当前部署使用 HTTPS 邮件 API（如 Resend）。填写已验证的发件地址并保存，然后发送测试邮件。",
      apiModeHint:
        "无需 SMTP 主机或密码。发件地址须与 Resend/SendGrid/Postmark 中已验证的域名一致（如 lee@msventures.in）。若留空，服务器将使用 MSV_TRANSACTIONAL_FROM。",
      railwayDiagTitle: "服务器识别的发信设置（Railway 运行时）",
      diagMode: "发信模式",
      diagResendKey: "RESEND_API_KEY",
      diagProvider: "MSV_EMAIL_PROVIDER",
      diagFrom: "MSV_TRANSACTIONAL_FROM",
      railwayApiKeyMissing:
        "服务器未检测到 API 密钥。请在 Railway 的 msvhomepage  Web 服务 Variables 中设置 RESEND_API_KEY 并重新部署。",
      railwaySmtpBlocked:
        "Railway 上 SMTP（465/587）常被阻断。请设置 RESEND_API_KEY 并重新部署，以通过 HTTPS API 发信。",
      smtpHost: "SMTP 主机",
      smtpPort: "SMTP 端口",
      smtpUser: "SMTP 用户",
      smtpPassword: "SMTP 密码",
      smtpPasswordPlaceholder: "应用专用密码或 API 密钥",
      from: "发件人 (From)",
      fromApiPlaceholder: "lee@msventures.in 或 MS Ventures Payroll <lee@msventures.in>",
      secureLabel: "使用 SSL/TLS（端口 465 时常用）",
      testEmailLabel: "测试收件邮箱",
      sendTest: "发送测试邮件",
      sending: "发送中...",
      save: "保存设置",
      reset: "清除设置",
      statusReady: "SMTP 已配置",
      statusIncomplete: "SMTP 未配置",
      statusReadyApi: "发件地址已就绪（API 模式）",
      statusIncompleteApi: "请输入发件地址",
      footerNote: "设置仅保存在浏览器 sessionStorage，不会在服务器永久存储。.env.local 中的值仅作服务器默认值。",
      footerNoteApi:
        "仅发件地址保存在 sessionStorage。API 密钥与发信模式通过 Railway Variables（RESEND_API_KEY、MSV_TRANSACTIONAL_FROM 等）在服务器配置。",
      presetSuffix: "预设",
      envHint: "部分字段已从 .env.local 自动填入，请手动输入密码。",
      envHintApi: "发件地址已从服务器环境变量自动填入，如需可修改后保存。",
      saveFillAll: "请填写所有必填项后再保存。",
      saveFillFrom: "请先填写发件地址再保存。",
      savedSession: "设置已保存到本会话。",
      cleared: "已删除已保存的设置。",
      testNeedSmtp: "请先完成 SMTP 设置。",
      testNeedFrom: "请先填写发件地址。",
      testNeedEmail: "请输入测试收件邮箱。",
      testFail: "测试邮件发送失败",
      testSuccess: "测试邮件发送成功",
    },
  });
}

/** Default subject/body and Step 2 placeholder hints: English only, regardless of UI locale. */
const PAYROLL_MAILER_DEFAULT_SUBJECT_EN = "[Payslip] Salary statement — {{employeeName}}";
const PAYROLL_MAILER_DEFAULT_BODY_EN = `Dear {{employeeName}},
Please find attached your salary statement for {{payrollMonth}}.
The attached PDF contains your payroll details, including salary components, deductions, and net salary payable.
If you have any questions regarding your salary statement, please contact the HR or Accounts department.`;
const PAYROLL_MAILER_MAIL_VARS_INTRO_EN = "Available placeholders:";
const PAYROLL_MAILER_PAYSLIP_VAR_NOTE_EN =
  "(payslip HTML table — if omitted, it is appended at the end of the body)";
const PAYROLL_MAILER_MONTH_VARIABLE_HINT_EN =
  "{{payrollMonth}}: pay period label — use a Payroll Month (or Pay Month) column on the MSV sheet when needed; on the legacy sheet it matches the Month column. {{month}} on MSV is Working Month (months since hire). {{payslip}} inserts the payslip HTML; if omitted, it is still appended when sending.";

export function payrollMailerPageCopy(locale: SiteLocale): PayrollMailerPageCopy {
  const mail = mailSettings(locale);
  const step = (n: number, title: string) => pickLocale(locale, { ko: `단계 ${n}. ${title}`, en: `Step ${n}. ${title}`, zh: `步骤 ${n}. ${title}` });
  const sendInProgress = pickLocale(locale, { ko: "발송 중...", en: "Sending...", zh: "发送中..." });
  const formatIssueRow = (row: number) => (locale === "ko" ? `${row}행` : locale === "zh" ? `第${row}行` : `Row ${row}`);

  const inner = pickLocale(locale, {
    ko: {
      pageTitle: "급여 명세서 이메일 발송 시스템",
      pageHeaderDescription:
        "메일 설정 → 엑셀 업로드(3행 헤더·4행부터 데이터) → 제목·본문 템플릿 → 검증·미리보기 → 직원별 발송. 업로드 내용과 SMTP 비밀번호는 브라우저 sessionStorage·요청 시 메모리에서만 사용하며 Prisma DB에는 저장하지 않습니다.",
      defaultSubject: PAYROLL_MAILER_DEFAULT_SUBJECT_EN,
      defaultBody: PAYROLL_MAILER_DEFAULT_BODY_EN,
      step1Title: "엑셀 업로드",
      step2Title: "메일 제목/본문 작성",
      step3Title: "데이터 확인 및 오류 검증",
      step4Title: "급여 명세서 미리보기",
      step5Title: "발송 및 결과 확인",
      excelIntro: "`.xlsx` 파일만 업로드할 수 있습니다.",
      sampleDownload: "샘플 양식 다운로드",
      bulletPassword:
        "통합문서 암호(열람용 암호)가 있는 파일은 업로드할 수 없습니다. Excel에서 「파일 → 정보 → 통합문서 암호화」를 해제한 뒤 저장한 .xlsx만 선택해 주세요.",
      bulletSheets:
        "시트가 여러 개이면 파일 선택 후 목록에서 시트를 고르고 \"선택한 시트 불러오기\"를 누르세요. 시트가 하나면 자동으로 불러옵니다.",
      bulletLayout: "급여 표는 3행에 컬럼 헤더, 4행부터 직원 데이터가 있는 양식을 기준으로 읽습니다.",
      sheetPickerTitle: "시트가 {count}개 있습니다. 급여 데이터가 있는 시트를 선택하세요.",
      sheetNameLabel: "시트 이름",
      loadSheet: "선택한 시트 불러오기",
      uploading: "업로드 및 검증 중...",
      uploadGenericError: "파일 처리 중 오류가 발생했습니다.",
      uploadPasswordHint:
        "이 파일에는 통합문서 암호(열람용 암호)가 설정되어 있습니다. Excel에서 「파일 → 정보 → 통합문서 암호화」를 해제한 뒤 저장한 .xlsx를 다시 업로드해 주세요. (이 화면에서는 암호를 입력해 열 수 없습니다.)",
      noEmployees: "발송 가능한 직원 데이터가 없습니다.",
      noSheets: "엑셀 시트를 찾을 수 없습니다.",
      mailVarsIntro: PAYROLL_MAILER_MAIL_VARS_INTRO_EN,
      payslipVarNote: PAYROLL_MAILER_PAYSLIP_VAR_NOTE_EN,
      monthVariableHint: PAYROLL_MAILER_MONTH_VARIABLE_HINT_EN,
      mailSubjectLabel: "메일 제목",
      mailBodyLabel: "메일 본문",
      previewTitle: "선택 직원 기준 미리보기",
      previewSubjectLabel: "제목:",
      previewBodyTitle: "본문 미리보기 (발송 HTML)",
      previewIframeTitle: "메일 본문 미리보기",
      previewNeedExcel: "엑셀을 업로드한 뒤 아래 단계에서 직원을 선택하면 변수가 반영된 제목·본문 미리보기가 표시됩니다.",
      dataSheetLabel: "불러온 시트",
      templateMsv: "신규 급여 양식",
      templateLegacy: "기존 양식",
      statSendable: "발송 가능 직원",
      statExcluded: "제외 직원 (이메일 없음)",
      statIssues: "검증 이슈",
      excludedHeading: "제외 대상",
      issuesHeading: "검증 상세",
      selectEmployee: "직원 선택",
      employeeInfo: "직원 정보",
      labelId: "ID",
      labelEmail: "이메일",
      labelDept: "부서",
      labelRole: "직책",
      netPayLabel: "실수령액",
      earningsHeading: "급여 항목",
      deductionsHeading: "공제 항목",
      sendCompleteSmtp: "상단 메일 환경 설정(발신 주소·SMTP)을 완료하고 저장한 뒤 발송할 수 있습니다.",
      sendBlockedNet: "Net Salary 검증 오류가 있어 발송이 차단되었습니다. 엑셀 데이터를 수정 후 다시 업로드하세요.",
      sendConfirmLabel: "최종 확인: 직원별 개별 메일로 발송하며, 각 메일에는 해당 직원의 PDF만 첨부됩니다.",
      sendAll: "전체 발송",
      resendFailed: "실패 건 재발송",
      tableEmployee: "직원",
      tableEmail: "이메일",
      tableStatus: "상태",
      tableMessage: "메시지",
      statusOk: "성공",
      statusFail: "실패",
      sendNeedSmtp: "메일 환경 설정(발신 주소)을 먼저 완료하고 저장하세요.",
      sendErrorGeneric: "발송 중 오류가 발생했습니다.",
    },
    en: {
      pageTitle: "Payroll payslip email system",
      pageHeaderDescription:
        "Mail settings → upload Excel (headers on row 3, data from row 4) → subject/body templates → validation & preview → send per employee. Upload contents and SMTP passwords stay in browser sessionStorage and request memory only; nothing is persisted in Prisma/DB.",
      defaultSubject: PAYROLL_MAILER_DEFAULT_SUBJECT_EN,
      defaultBody: PAYROLL_MAILER_DEFAULT_BODY_EN,
      step1Title: "Upload Excel",
      step2Title: "Email subject & body",
      step3Title: "Review data & validation",
      step4Title: "Payslip preview",
      step5Title: "Send & results",
      excelIntro: "Only `.xlsx` files can be uploaded.",
      sampleDownload: "Download sample file",
      bulletPassword:
        "Workbooks protected with an open password cannot be uploaded. In Excel, use File → Info → Protect Workbook → Encrypt with Password to remove protection, save, then upload again.",
      bulletSheets:
        "If the workbook has multiple sheets, choose the payroll sheet and click \"Load selected sheet\". A single-sheet file loads automatically.",
      bulletLayout: "Payroll rows are read with column headers on row 3 and employee data from row 4.",
      sheetPickerTitle: "This workbook has {count} sheets. Select the sheet that contains payroll data.",
      sheetNameLabel: "Sheet name",
      loadSheet: "Load selected sheet",
      uploading: "Uploading and validating...",
      uploadGenericError: "Something went wrong while processing the file.",
      uploadPasswordHint:
        "This workbook is password-protected. Remove the open password in Excel (File → Info → Protect Workbook), save as .xlsx, and upload again. Passwords cannot be entered in this screen.",
      noEmployees: "No sendable employee rows were found.",
      noSheets: "No sheets were found in the Excel file.",
      mailVarsIntro: PAYROLL_MAILER_MAIL_VARS_INTRO_EN,
      payslipVarNote: PAYROLL_MAILER_PAYSLIP_VAR_NOTE_EN,
      monthVariableHint: PAYROLL_MAILER_MONTH_VARIABLE_HINT_EN,
      mailSubjectLabel: "Email subject",
      mailBodyLabel: "Email body",
      previewTitle: "Preview for selected employee",
      previewSubjectLabel: "Subject:",
      previewBodyTitle: "Body preview (HTML as sent)",
      previewIframeTitle: "Email body preview",
      previewNeedExcel: "Upload Excel and pick an employee below to preview the rendered subject and body.",
      dataSheetLabel: "Loaded sheet",
      templateMsv: "New payroll format",
      templateLegacy: "Legacy format",
      statSendable: "Sendable employees",
      statExcluded: "Excluded (no email)",
      statIssues: "Validation issues",
      excludedHeading: "Excluded recipients",
      issuesHeading: "Validation details",
      selectEmployee: "Select employee",
      employeeInfo: "Employee",
      labelId: "ID",
      labelEmail: "Email",
      labelDept: "Department",
      labelRole: "Role",
      netPayLabel: "Net pay",
      earningsHeading: "Earnings",
      deductionsHeading: "Deductions",
      sendCompleteSmtp: "Finish mail settings at the top and save before sending.",
      sendBlockedNet: "Sending is blocked because of Net Salary validation errors. Fix the Excel data and upload again.",
      sendConfirmLabel:
        "Final confirmation: one email per employee, each with that employee’s PDF payslip attached only.",
      sendAll: "Send all",
      resendFailed: "Retry failed",
      tableEmployee: "Employee",
      tableEmail: "Email",
      tableStatus: "Status",
      tableMessage: "Message",
      statusOk: "OK",
      statusFail: "Failed",
      sendNeedSmtp: "Complete mail settings at the top and save first.",
      sendErrorGeneric: "An error occurred while sending.",
    },
    zh: {
      pageTitle: "工资单邮件发送系统",
      pageHeaderDescription:
        "邮件设置 → 上传 Excel（第 3 行为表头，第 4 行起为员工数据）→ 编辑主题/正文模板 → 校验与预览 → 按员工发送。上传内容与 SMTP 密码仅保存在浏览器 sessionStorage 与请求内存中，不会写入 Prisma 数据库。",
      defaultSubject: PAYROLL_MAILER_DEFAULT_SUBJECT_EN,
      defaultBody: PAYROLL_MAILER_DEFAULT_BODY_EN,
      step1Title: "上传 Excel",
      step2Title: "邮件主题与正文",
      step3Title: "数据核对与校验",
      step4Title: "工资单预览",
      step5Title: "发送与结果",
      excelIntro: "仅支持上传 `.xlsx` 文件。",
      sampleDownload: "下载示例模板",
      bulletPassword:
        "无法上传设置了打开密码的工作簿。请在 Excel 中通过「文件 → 信息 → 保护工作簿」移除密码，保存后再上传。",
      bulletSheets: "若工作簿含多个工作表，请选择工资表并点击「加载所选工作表」。仅有一张表时会自动加载。",
      bulletLayout: "系统按第 3 行为列名、第 4 行起为员工数据读取工资表。",
      sheetPickerTitle: "该工作簿有 {count} 个工作表，请选择包含工资数据的工作表。",
      sheetNameLabel: "工作表名称",
      loadSheet: "加载所选工作表",
      uploading: "正在上传并校验...",
      uploadGenericError: "处理文件时出错。",
      uploadPasswordHint: "该文件受打开密码保护。请在 Excel 中移除密码后保存为 .xlsx 再上传。本页面无法输入密码打开文件。",
      noEmployees: "未找到可发送的员工数据。",
      noSheets: "Excel 中未找到工作表。",
      mailVarsIntro: PAYROLL_MAILER_MAIL_VARS_INTRO_EN,
      payslipVarNote: PAYROLL_MAILER_PAYSLIP_VAR_NOTE_EN,
      monthVariableHint: PAYROLL_MAILER_MONTH_VARIABLE_HINT_EN,
      mailSubjectLabel: "邮件主题",
      mailBodyLabel: "邮件正文",
      previewTitle: "所选员工预览",
      previewSubjectLabel: "主题：",
      previewBodyTitle: "正文预览（发送用 HTML）",
      previewIframeTitle: "邮件正文预览",
      previewNeedExcel: "上传 Excel 并在下方选择员工后，即可预览替换变量后的主题与正文。",
      dataSheetLabel: "已加载工作表",
      templateMsv: "新版工资格式",
      templateLegacy: "旧版格式",
      statSendable: "可发送员工",
      statExcluded: "排除（无邮箱）",
      statIssues: "校验问题",
      excludedHeading: "排除名单",
      issuesHeading: "校验明细",
      selectEmployee: "选择员工",
      employeeInfo: "员工信息",
      labelId: "工号",
      labelEmail: "邮箱",
      labelDept: "部门",
      labelRole: "职位",
      netPayLabel: "实发工资",
      earningsHeading: "收入项",
      deductionsHeading: "扣款项",
      sendCompleteSmtp: "请先在上方完成邮件设置并保存后再发送。",
      sendBlockedNet: "因实发工资校验错误已阻止发送。请修正 Excel 后重新上传。",
      sendConfirmLabel: "最终确认：每位员工单独一封邮件，且仅附带该员工的 PDF 工资单。",
      sendAll: "全部发送",
      resendFailed: "重试失败项",
      tableEmployee: "员工",
      tableEmail: "邮箱",
      tableStatus: "状态",
      tableMessage: "消息",
      statusOk: "成功",
      statusFail: "失败",
      sendNeedSmtp: "请先在上方完成邮件设置并保存。",
      sendErrorGeneric: "发送过程中发生错误。",
    },
  });

  return {
    ...inner,
    locale,
    mail,
    step,
    formatIssueRow,
    sendInProgress,
  } as PayrollMailerPageCopy;
}
