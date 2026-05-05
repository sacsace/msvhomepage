import { company } from "@/lib/site-content";
import type { SiteLocale } from "@/lib/site-locale";

export type ContactFormStrings = {
  metaTitle: string;
  metaDescription: string;
  pageTitle: string;
  pageDescription: string;
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
  labelSubject: string;
  labelMessage: string;
  submit: string;
  submitting: string;
  messageToolbar: string;
  messageHint: string;
  tbBold: string;
  tbItalic: string;
  tbCode: string;
  tbList: string;
  tbNumbered: string;
  tbQuote: string;
  tbRule: string;
  tbLink: string;
  linkPromptTitle: string;
  linkPromptDefault: string;
  listInsert: string;
  quoteInsert: string;
  numberedInsert: string;
  listWord: string;
  quoteWord: string;
  firstNumberedWord: string;
  wrapBoldPlaceholder: string;
  wrapItalicPlaceholder: string;
  linkTextPlaceholder: string;
};

const ko: ContactFormStrings = {
  metaTitle: "문의",
  metaDescription: `${company.legalName} 문의 양식·본사 위치·연락처`,
  pageTitle: "문의",
  pageDescription: "아래 양식을 작성해 보내주시면 접수 후 필요 시 담당자가 회신 드립니다.",
  locationEyebrow: "Location",
  locationTitle: "본사 · 오시는 길",
  mapIframeTitle: "본사 위치 (Google Maps)",
  googleMaps: "Google 지도에서 크게 보기 →",
  contactEyebrow: "Contact",
  contactTitle: "연락",
  formSr: "문의 양식",
  success: "문의가 접수되었습니다. 필요 시 담당자가 회신 드립니다.",
  errNetwork: "네트워크 오류가 발생했습니다.",
  errSend: "전송에 실패했습니다.",
  labelName: "이름",
  labelEmail: "이메일",
  labelSubject: "제목",
  labelMessage: "문의 내용",
  submit: "보내기",
  submitting: "전송 중…",
  messageToolbar: "문의 내용 서식",
  messageHint:
    "버튼은 마크다운 형식을 넣습니다. 메일 본문은 일반 텍스트로 전달되며, 담당자가 읽기 쉽게 표시됩니다.",
  tbBold: "굵게",
  tbItalic: "기울임",
  tbCode: "코드",
  tbList: "목록",
  tbNumbered: "번호",
  tbQuote: "인용",
  tbRule: "구분선",
  tbLink: "링크",
  linkPromptTitle: "링크 URL을 입력하세요",
  linkPromptDefault: "https://",
  listInsert: "- 항목\n",
  quoteInsert: "> 인용\n",
  numberedInsert: "1. 첫 항목\n2. 둘째 항목\n",
  listWord: "항목",
  quoteWord: "인용",
  firstNumberedWord: "첫 항목",
  wrapBoldPlaceholder: "굵게",
  wrapItalicPlaceholder: "기울임",
  linkTextPlaceholder: "링크 텍스트",
};

const en: ContactFormStrings = {
  metaTitle: "Contact",
  metaDescription: `${company.legalName} — contact form, office location and email.`,
  pageTitle: "Contact",
  pageDescription: "Submit the form below and our team will respond when needed.",
  locationEyebrow: "Location",
  locationTitle: "Head office · directions",
  mapIframeTitle: "Head office (Google Maps)",
  googleMaps: "Open in Google Maps →",
  contactEyebrow: "Contact",
  contactTitle: "Get in touch",
  formSr: "Contact form",
  success: "Your message has been received. We will follow up if needed.",
  errNetwork: "A network error occurred.",
  errSend: "Failed to send.",
  labelName: "Name",
  labelEmail: "Email",
  labelSubject: "Subject",
  labelMessage: "Message",
  submit: "Send",
  submitting: "Sending…",
  messageToolbar: "Message formatting",
  messageHint:
    "Buttons insert Markdown. The email body is delivered as plain text and rendered for staff readability.",
  tbBold: "Bold",
  tbItalic: "Italic",
  tbCode: "Code",
  tbList: "Bullets",
  tbNumbered: "Numbered",
  tbQuote: "Quote",
  tbRule: "Divider",
  tbLink: "Link",
  linkPromptTitle: "Enter link URL",
  linkPromptDefault: "https://",
  listInsert: "- Item\n",
  quoteInsert: "> Quote\n",
  numberedInsert: "1. First item\n2. Second item\n",
  listWord: "Item",
  quoteWord: "Quote",
  firstNumberedWord: "First item",
  wrapBoldPlaceholder: "bold",
  wrapItalicPlaceholder: "italic",
  linkTextPlaceholder: "link text",
};

const zh: ContactFormStrings = {
  metaTitle: "联系",
  metaDescription: `${company.legalName} — 联系表单、总部地址与邮箱。`,
  pageTitle: "联系",
  pageDescription: "请填写下方表单提交，我们将在需要时由专人回复。",
  locationEyebrow: "地址",
  locationTitle: "总部 · 来访路线",
  mapIframeTitle: "总部位置（Google 地图）",
  googleMaps: "在 Google 地图中放大查看 →",
  contactEyebrow: "联系",
  contactTitle: "取得联系",
  formSr: "联系表单",
  success: "已收到您的留言。如有需要我们将进一步联系您。",
  errNetwork: "网络错误。",
  errSend: "发送失败。",
  labelName: "姓名",
  labelEmail: "电子邮箱",
  labelSubject: "主题",
  labelMessage: "留言内容",
  submit: "发送",
  submitting: "发送中…",
  messageToolbar: "留言格式",
  messageHint:
    "按钮可插入 Markdown。邮件正文以纯文本送达，并以便阅读的方式呈现给工作人员。",
  tbBold: "粗体",
  tbItalic: "斜体",
  tbCode: "代码",
  tbList: "无序列表",
  tbNumbered: "有序列表",
  tbQuote: "引用",
  tbRule: "分隔线",
  tbLink: "链接",
  linkPromptTitle: "请输入链接 URL",
  linkPromptDefault: "https://",
  listInsert: "- 项目\n",
  quoteInsert: "> 引用\n",
  numberedInsert: "1. 第一项\n2. 第二项\n",
  listWord: "项目",
  quoteWord: "引用",
  firstNumberedWord: "第一项",
  wrapBoldPlaceholder: "粗体",
  wrapItalicPlaceholder: "斜体",
  linkTextPlaceholder: "链接文字",
};

export function contactFormStrings(locale: SiteLocale): ContactFormStrings {
  if (locale === "en") return en;
  if (locale === "zh") return zh;
  return ko;
}
