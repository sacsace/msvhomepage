import { company } from "@/lib/site-content";
import type { SiteLocale } from "@/lib/site-locale";

/** API·검증과 동일한 값 — 라벨만 로케일별 */
export const INQUIRY_TYPE_VALUES = [
  "incorporation",
  "accounting_tax",
  "gst_tds",
  "visa_frro",
  "import_export_iec",
  "groupware_mvs",
  "other",
] as const;

export type InquiryTypeValue = (typeof INQUIRY_TYPE_VALUES)[number];

export type ContactFormStrings = {
  metaTitle: string;
  metaDescription: string;
  pageTitle: string;
  pageDescription: string;
  cardTagline: string;
  locationEyebrow: string;
  locationTitle: string;
  mapIframeTitle: string;
  googleMaps: string;
  contactEyebrow: string;
  contactTitle: string;
  formSr: string;
  success: string;
  errNetwork: string;
  errSend: string;
  labelName: string;
  labelEmail: string;
  labelInquiryType: string;
  labelSubject: string;
  labelMessage: string;
  inquiryTypeUnset: string;
  inquiryTypes: { value: InquiryTypeValue; label: string }[];
  placeholderSubject: string;
  placeholderMessage: string;
  submit: string;
  submitting: string;
};

const ko: ContactFormStrings = {
  metaTitle: "문의",
  metaDescription: `${company.legalName} 문의 양식·본사 위치·연락처`,
  pageTitle: "문의",
  pageDescription: "아래 양식을 작성해 주시면 검토 후 담당자가 순차적으로 회신드립니다.",
  cardTagline: "인도 비즈니스 자문 · 회계 · 세무 · 컴플라이언스",
  locationEyebrow: "Location",
  locationTitle: "본사 · 오시는 길",
  mapIframeTitle: "본사 위치 (Google Maps)",
  googleMaps: "Google 지도에서 크게 보기 →",
  contactEyebrow: "Contact",
  contactTitle: "연락",
  formSr: "문의 양식",
  success: "문의가 접수되었습니다. 담당자가 확인 후 회신드리겠습니다.",
  errNetwork: "네트워크 오류가 발생했습니다.",
  errSend: "전송에 실패했습니다.",
  labelName: "이름",
  labelEmail: "이메일",
  labelInquiryType: "문의 유형",
  labelSubject: "제목",
  labelMessage: "문의 내용",
  inquiryTypeUnset: "유형을 선택해 주세요",
  inquiryTypes: [
    { value: "incorporation", label: "법인 설립" },
    { value: "accounting_tax", label: "회계/세무" },
    { value: "gst_tds", label: "GST/TDS" },
    { value: "visa_frro", label: "비자/FRRO" },
    { value: "import_export_iec", label: "수출입/IEC" },
    { value: "groupware_mvs", label: "그룹웨어(MVS)" },
    { value: "other", label: "기타" },
  ],
  placeholderSubject: "예: 인도 법인 설립 문의",
  placeholderMessage:
    "문의 내용을 입력해 주세요.\n회사명 / 문의 서비스 / 연락처 등을 함께 남겨 주시면 빠르게 안내드립니다.\n\n회사명:\n업종:\n진행 예정 업무:\n희망 일정:\n문의 사항:",
  submit: "보내기",
  submitting: "전송 중…",
};

const en: ContactFormStrings = {
  metaTitle: "Contact",
  metaDescription: `${company.legalName} — contact form, office location and email.`,
  pageTitle: "Contact",
  pageDescription: "Please complete the form below; our team will review and respond in order.",
  cardTagline: "India Business Consulting · Accounting · Tax · Compliance",
  locationEyebrow: "Location",
  locationTitle: "Head office · directions",
  mapIframeTitle: "Head office (Google Maps)",
  googleMaps: "Open in Google Maps →",
  contactEyebrow: "Contact",
  contactTitle: "Get in touch",
  formSr: "Contact form",
  success: "Your inquiry has been received. We will reply after review.",
  errNetwork: "A network error occurred.",
  errSend: "Failed to send.",
  labelName: "Name",
  labelEmail: "Email",
  labelInquiryType: "Inquiry type",
  labelSubject: "Subject",
  labelMessage: "Message",
  inquiryTypeUnset: "Select a type",
  inquiryTypes: [
    { value: "incorporation", label: "Corporate incorporation" },
    { value: "accounting_tax", label: "Accounting / tax" },
    { value: "gst_tds", label: "GST / TDS" },
    { value: "visa_frro", label: "Visa / FRRO" },
    { value: "import_export_iec", label: "Import-export / IEC" },
    { value: "groupware_mvs", label: "Groupware (MVS)" },
    { value: "other", label: "Other" },
  ],
  placeholderSubject: "e.g. India incorporation inquiry",
  placeholderMessage:
    "Please describe your inquiry.\nCompany name, service area, and contact details help us respond faster.\n\nCompany:\nIndustry:\nPlanned work:\nPreferred timeline:\nDetails:",
  submit: "Send",
  submitting: "Sending…",
};

const zh: ContactFormStrings = {
  metaTitle: "联系",
  metaDescription: `${company.legalName} — 联系表单、总部地址与邮箱。`,
  pageTitle: "联系",
  pageDescription: "请填写下方表单，我们将审阅后按顺序由专人回复。",
  cardTagline: "印度商务咨询 · 会计 · 税务 · 合规",
  locationEyebrow: "地址",
  locationTitle: "总部 · 来访路线",
  mapIframeTitle: "总部位置（Google 地图）",
  googleMaps: "在 Google 地图中放大查看 →",
  contactEyebrow: "联系",
  contactTitle: "取得联系",
  formSr: "联系表单",
  success: "已收到您的咨询。我们将审阅后回复。",
  errNetwork: "网络错误。",
  errSend: "发送失败。",
  labelName: "姓名",
  labelEmail: "电子邮箱",
  labelInquiryType: "咨询类型",
  labelSubject: "主题",
  labelMessage: "留言内容",
  inquiryTypeUnset: "请选择类型",
  inquiryTypes: [
    { value: "incorporation", label: "公司设立" },
    { value: "accounting_tax", label: "会计/税务" },
    { value: "gst_tds", label: "GST/TDS" },
    { value: "visa_frro", label: "签证/FRRO" },
    { value: "import_export_iec", label: "进出口/IEC" },
    { value: "groupware_mvs", label: "集团办公（MVS）" },
    { value: "other", label: "其他" },
  ],
  placeholderSubject: "例如：印度公司设立咨询",
  placeholderMessage:
    "请输入咨询内容。\n如能提供公司名称、服务范围与联系方式，我们将更快回复。\n\n公司：\n行业：\n拟办事项：\n希望时间：\n具体问题：",
  submit: "发送",
  submitting: "发送中…",
};

export function contactFormStrings(locale: SiteLocale): ContactFormStrings {
  if (locale === "en") return en;
  if (locale === "zh") return zh;
  return ko;
}
