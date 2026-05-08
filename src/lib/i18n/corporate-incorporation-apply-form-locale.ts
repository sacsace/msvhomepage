import { pickLocale, type SiteLocale } from "@/lib/site-locale";

export type CorporateIncorporationApplyFormCopy = {
  rowAdd: string;
  rowRemove: string;
  successMessage: string;
  errSendDefault: string;
  errNetwork: string;
  applicantLegend: string;
  applicantHint: string;
  labelName: string;
  labelEmail: string;
  labelPhoneOptional: string;
  corpNamesLegend: string;
  rank1: string;
  rank2: string;
  rank3: string;
  addressLegend: string;
  addressLabel: string;
  addressPlaceholder: string;
  capitalLegend: string;
  capitalHint: string;
  capitalSubscribed: string;
  capitalPaidIn: string;
  capitalAuthorized: string;
  inrPlaceholder: string;
  sec5Legend: string;
  sec5Hint: string;
  thDivide: string;
  thShType: string;
  thSameDirector: string;
  thName: string;
  thPct: string;
  /** 등기이사 표 등 두 번째 열(「내용」) */
  thContent: string;
  shareholderPrefix: string;
  individual: string;
  company: string;
  optNoSeparate: string;
  sameDirectorOption: (directorIndex: number) => string;
  directorTakenTitle: string;
  namePlaceholderCompany: string;
  namePlaceholderPerson: string;
  pctPlaceholder: string;
  shareholderKindAria: (i: number) => string;
  shareholderNameAria: (i: number) => string;
  shareholderPctAria: (i: number) => string;
  sec6Legend: string;
  sec6Hint: string;
  directorPrefix: string;
  directorNamePlaceholder: string;
  directorNameLockedTitle: string;
  directorNameAria: (i: number) => string;
  addDirector: string;
  removeDirector: string;
  sec81Title: string;
  sec81Hint: string;
  directorBlockLegend: (i: number) => string;
  dirEnLabels: readonly { key: string; label: string; ph: string; max: number }[];
  dirAttachLabels: readonly string[];
  sec9Title: string;
  sec9Hint: string;
  /** 주주 상세 필드셋 범례 — 개인 행에만 사용 (예: 「개인 (9.1.1)」) */
  sec9IndividualTag: string;
  syncFromDirector: string;
  syncFromDirectorNote: string;
  linkedLegendSuffix: (directorIndex: number) => string;
  shIndRows: readonly { label: string; name: string; max: number; placeholder?: string }[];
  indAttachTitle: string;
  indAttachOl1: string;
  indAttachOl2: string;
  indAttachOl3: string;
  indAttachFoot: string;
  shCorpRows: readonly { label: string; name: string; max: number; ph: string }[];
  shCorpAttachLabels: readonly string[];
  shCorpFoot: string;
  shareholderNotesLabel: string;
  shareholderNotesPlaceholder: string;
  directorRefTitle: string;
  directorRefItems: readonly string[];
  directorExtraLabel: string;
  /** 이사 블록 파일 입력 `aria-label` */
  directorAttachAria: (directorIndex: number, fileLabel: string) => string;
  /** 법인 주주 파일 입력 `aria-label` */
  corpShareholderAttachAria: (shareholderIndex: number, fileLabel: string) => string;
  submit: string;
  submitting: string;
};

const shIndRowTemplate = [
  { label: "이름", name: "shInd_${j}_name", max: 200 },
  { label: "국적", name: "shInd_${j}_nationality", max: 80 },
  { label: "휴대폰 번호", name: "shInd_${j}_mobile", max: 40 },
  { label: "이메일 주소", name: "shInd_${j}_email", max: 254 },
  { label: "최종학력 / 학교 및 전공", name: "shInd_${j}_education", max: 400 },
  { label: "출생일", name: "shInd_${j}_dob", max: 40 },
  { label: "출생지 (도시명)", name: "shInd_${j}_pob", max: 120 },
  { label: "인도 주소", name: "shInd_${j}_addrIndia", max: 800 },
  { label: "한국 주소", name: "shInd_${j}_addrKorea", max: 800 },
  { label: "아버지 성함", name: "shInd_${j}_fatherName", max: 120 },
  {
    label: "인도 내 타회사 이사 등재 여부 및 보유 주식수",
    name: "shInd_${j}_otherDir",
    max: 400,
    placeholder: "없으면 X",
  },
] as const;

const shCorpRowTemplate = [
  { label: "회사 정식 명칭 (영문·현지어)", name: "shCorp_${j}_legalName", max: 400, ph: "Legal name as registered" },
  { label: "등록국·등록번호 (CIN 등)", name: "shCorp_${j}_regCountryNo", max: 300, ph: "Country / registration number" },
  { label: "본점 주소", name: "shCorp_${j}_hqAddress", max: 800, ph: "" },
  { label: "대표자 성명·직책", name: "shCorp_${j}_rep", max: 300, ph: "" },
  { label: "지분율 (%)", name: "shCorp_${j}_sharePct", max: 40, ph: "예: 40" },
  { label: "회사 대표 이메일", name: "shCorp_${j}_email", max: 254, ph: "" },
  { label: "회사 대표 전화", name: "shCorp_${j}_phone", max: 40, ph: "" },
] as const;

const koBase = {
  rowAdd: "행 추가",
  rowRemove: "마지막 행 삭제",
  successMessage: "신청이 접수되었습니다. 첨부하신 파일과 내용을 검토한 뒤 담당자가 연락드릴 수 있습니다.",
  errSendDefault: "전송에 실패했습니다.",
  errNetwork: "네트워크 오류가 발생했습니다.",
  applicantLegend: "신청자 연락처",
  applicantHint: "회신·보완 요청에 사용됩니다.",
  labelName: "이름",
  labelEmail: "이메일",
  labelPhoneOptional: "전화 (선택)",
  corpNamesLegend: "법인명 신청 순위 1~3위",
  rank1: "1순위",
  rank2: "2순위",
  rank3: "3순위",
  addressLegend: "주소",
  addressLabel: "본점(또는 등기) 주소",
  addressPlaceholder: "우편번호, 도로명/지번, 건물명·층수 등",
  capitalLegend: "자본금",
  capitalHint:
    "첫 칸(자본금)을 입력하면 납입자본금·수권자본금에 같은 값이 자동으로 채워집니다. 다르게 적어야 하면 뒤 두 칸만 따로 수정하세요.",
  capitalSubscribed: "자본금 (인수·발행 기준 등)",
  capitalPaidIn: "납입자본금",
  capitalAuthorized: "수권자본금 (Authorized)",
  inrPlaceholder: "예: INR 10,000,000",
  sec5Legend: "5. 지분구조",
  sec5Hint:
    "주주별로 개인 또는 법인(회사)을 선택하고, 이름과 지분율을 적어 주세요. 개인 주주가 등기이사와 동일이면「이사와 동일」에서 이사를 고르면 5번 이름이 등기이사 성명·8.1 이름·9번 이름과 맞춰지고, 연동 중에는 5번 이름을 바꾸면 이사·8.1 이름도 같이 바뀝니다. 이사의 연락처·주소 등(이름 제외)은 8.1에서 고치면 9번에 반영됩니다. (지분율은 주주별로만 입력합니다.)",
  thDivide: "구분",
  thShType: "주주 유형",
  thSameDirector: "이사와 동일",
  thName: "이름",
  thPct: "지분율",
  thContent: "내용",
  shareholderPrefix: "주주",
  individual: "개인",
  company: "법인(회사)",
  optNoSeparate: "아니오 (별도)",
  sameDirectorOption: (d: number) => `예 · 이사 ${d + 1}과 동일`,
  directorTakenTitle: "이미 다른 주주 행에 지정된 이사입니다.",
  namePlaceholderCompany: "예: (주)○○",
  namePlaceholderPerson: "예: 홍길동",
  pctPlaceholder: "예: 60%",
  shareholderKindAria: (i: number) => `주주 ${i + 1} 유형`,
  shareholderNameAria: (i: number) => `주주 ${i + 1} 이름`,
  shareholderPctAria: (i: number) => `주주 ${i + 1} 지분율`,
  sec6Legend: "6. 등기이사",
  sec6Hint:
    "기본 2명입니다. 이사가 3명 이상이면「등기이사 추가」로 늘리면 8.1 영문 항목 블록도 함께 늘어납니다.",
  directorPrefix: "이사",
  directorNamePlaceholder: "성명 (여권과 동일 권장)",
  directorNameLockedTitle: "성명은 5번 지분구조의 해당 주주 이름에서 입력하세요.",
  directorNameAria: (i: number) => `등기이사 ${i + 1} 성명`,
  addDirector: "등기이사 추가",
  removeDirector: "마지막 등기이사 삭제",
  sec81Title: "8.1 필요정보 (영문작성)",
  sec81Hint:
    '각 등기이사별로 영문으로 기재해 주세요. 해당 없음은 "X" 등으로 표시할 수 있습니다. 5번에서 해당 이사와「동일」로 연결된 주주가 있으면, 이름(첫 행)은 5번 지분 이름과 같게 맞춰지며 이 칸은 읽기 전용입니다. 같은 이사 블록 하단에서 여권·신분 관련 서류를 첨부할 수 있습니다.',
  directorBlockLegend: (i: number) => `이사 ${i + 1}`,
  dirEnLabels: [
    { key: "name", label: "이름", ph: "English name", max: 200 },
    { key: "krPhone", label: "한국 휴대폰 번호", ph: "", max: 40 },
    { key: "email", label: "메일 주소", ph: "email@example.com", max: 254 },
    { key: "education", label: "최종학력 & 학교 및 전공", ph: "e.g. BA, University, Major", max: 400 },
    { key: "dob", label: "출생일", ph: "YYYY-MM-DD", max: 40 },
    { key: "pob", label: "출생지 (도시명)", ph: "City, Country", max: 120 },
    { key: "address", label: "현재 주소", ph: "Full address (English)", max: 800 },
    { key: "fatherName", label: "아버지 성함", ph: "Father's name (English)", max: 120 },
    { key: "indiaOther", label: "인도내 회사 이사 등재 여부 및 보유 주식 수", ph: "없으면 X", max: 400 },
  ],
  dirAttachLabels: ["여권 사본 첨부", "영문 주민등록등본 첨부", "증명 사진 첨부", "운전면허증 사본 첨부"],
  sec9Title: "9. 주주별 상세 정보",
  sec9Hint:
    "5번에서 선택한 유형(개인 / 법인)에 따라 입력란이 바뀝니다. 개인은 9.1.1 항목, 법인은 회사 정보 항목입니다. 이사와 동일로 연결된 개인 주주는 9번 입력란을 보이지 않게 하며, 6번·8.1을 수정한 뒤「이사 입력 다시 반영」으로 전송용 값을 맞춥니다.",
  sec9IndividualTag: "개인 (9.1.1)",
  syncFromDirector: "이사 입력 다시 반영",
  syncFromDirectorNote:
    "이사와 동일 연동 중이라 주주 상세 입력란은 표시하지 않습니다. 5번 이름·6번·8.1을 수정한 뒤 버튼으로 제출 데이터를 맞추세요. (서류는 8.1 이사 첨부를 이용하세요.)",
  linkedLegendSuffix: (d: number) => ` — 이사 ${d + 1}과 동일 (5번에서 연동)`,
  shIndRows: [...shIndRowTemplate],
  indAttachTitle: "주주가 개인인 경우 첨부되어야 할 파일",
  indAttachOl1: "여권 사본",
  indAttachOl2: "영문 주민등록 등본",
  indAttachOl3: "운전면허증 또는 주민등록증",
  indAttachFoot:
    "해당 주주(개인)마다 위 서류를 준비해 담당자 안내에 따라 제출해 주세요. 민감정보는 마스킹하거나 암호화 ZIP 등 정책에 맞게 보내 주세요.",
  shCorpRows: [...shCorpRowTemplate],
  shCorpAttachLabels: [
    "법인 영문 사업자 등록증",
    "법인 정관",
    "법인 영문 주소 확인증 (세금 납부 확인증)",
    "영문 이사 리스트",
    "영문 주주 명부 리스트 (주식 10% 이상)",
  ],
  shCorpFoot: "법인 주주인 경우 위 표의 파일란에 PDF 등으로 첨부해 주세요.",
  shareholderNotesLabel: "주주 관련 추가 메모 (선택)",
  shareholderNotesPlaceholder: "특이 사항, 복수 국적, 추후 제출 예정 자료 등",
  directorRefTitle: "등기이사 필요 정보 (참고)",
  directorRefItems: [
    "여권 사본(유효기간 확인) 및 바이오 페이지",
    "현지 주소 증빙(임대차·유틸리티 청구서 등, 요건은 주별 상이)",
    "증명사진(규격은 신청 시점 기준 안내)",
    "연락 가능 이메일·휴대전화",
    "DIN 보유 여부, 기존 인도 내 등기 이력이 있으면 기재",
    "상주이사(연 182일 이상 인도 체류) 해당 여부",
  ],
  directorExtraLabel: "등기이사 관련 추가 기재",
  directorAttachAria: (i, label) => `이사 ${i + 1} ${label}`,
  corpShareholderAttachAria: (j, label) => `법인 주주 ${j + 1} ${label}`,
  submit: "신청서 보내기",
  submitting: "전송 중…",
} satisfies CorporateIncorporationApplyFormCopy;

const ko: CorporateIncorporationApplyFormCopy = koBase;

const en: CorporateIncorporationApplyFormCopy = {
  ...ko,
  rowAdd: "Add row",
  rowRemove: "Remove last row",
  successMessage:
    "Your application has been received. We may contact you after reviewing the details and attachments.",
  errSendDefault: "Submission failed.",
  errNetwork: "A network error occurred.",
  applicantLegend: "Applicant contact",
  applicantHint: "Used for replies and follow-up requests.",
  labelName: "Name",
  labelEmail: "Email",
  labelPhoneOptional: "Phone (optional)",
  corpNamesLegend: "Proposed company names (1st–3rd choice)",
  rank1: "1st choice",
  rank2: "2nd choice",
  rank3: "3rd choice",
  addressLegend: "Address",
  addressLabel: "Registered office address",
  addressPlaceholder: "Postal code, street, building and floor, etc.",
  capitalLegend: "Share capital",
  capitalHint:
    "When you fill the first field (subscribed capital), paid-in and authorized amounts are auto-filled. Edit the last two fields only if they must differ.",
  capitalSubscribed: "Subscribed capital (issued / subscribed basis)",
  capitalPaidIn: "Paid-up capital",
  capitalAuthorized: "Authorized capital",
  sec5Legend: "5. Shareholding",
  sec5Hint:
    "For each shareholder choose individual or company, then enter name and percentage. If an individual shareholder matches a director, pick the director under “Same as director”; names then stay aligned with section 6 and 8.1. Contact details (not names) edited in 8.1 flow into section 9. Enter percentages per shareholder row only.",
  thDivide: "Item",
  thShType: "Shareholder type",
  thSameDirector: "Same as director",
  thName: "Name",
  thPct: "Share %",
  thContent: "Details",
  shareholderPrefix: "Shareholder",
  individual: "Individual",
  company: "Company",
  optNoSeparate: "No (separate)",
  sameDirectorOption: (d) => `Yes — same as director ${d + 1}`,
  directorTakenTitle: "This director is already linked to another shareholder row.",
  namePlaceholderCompany: "e.g. ABC Pvt Ltd",
  namePlaceholderPerson: "e.g. Jane Doe",
  pctPlaceholder: "e.g. 60%",
  shareholderKindAria: (i) => `Shareholder ${i + 1} type`,
  shareholderNameAria: (i) => `Shareholder ${i + 1} name`,
  shareholderPctAria: (i) => `Shareholder ${i + 1} share %`,
  sec6Legend: "6. Directors on record",
  sec6Hint:
    "Two directors by default. Use “Add director” for three or more; section 8.1 English blocks grow with each director.",
  directorPrefix: "Director",
  directorNamePlaceholder: "Full name (passport style recommended)",
  directorNameLockedTitle: "Enter the name in section 5 for the linked shareholder row.",
  directorNameAria: (i) => `Director ${i + 1} name`,
  addDirector: "Add director",
  removeDirector: "Remove last director",
  sec81Title: "8.1 Details (English)",
  sec81Hint:
    'Complete in English for each director. Use “X” where not applicable. If linked from section 5, the first name row is read-only and mirrors the shareholder name. Upload passport and ID files at the bottom of each director block.',
  directorBlockLegend: (i) => `Director ${i + 1}`,
  dirEnLabels: [
    { key: "name", label: "Name", ph: "English name", max: 200 },
    { key: "krPhone", label: "Korea mobile", ph: "", max: 40 },
    { key: "email", label: "Email", ph: "email@example.com", max: 254 },
    { key: "education", label: "Education", ph: "e.g. BA, University, Major", max: 400 },
    { key: "dob", label: "Date of birth", ph: "YYYY-MM-DD", max: 40 },
    { key: "pob", label: "Place of birth", ph: "City, Country", max: 120 },
    { key: "address", label: "Current address", ph: "Full address (English)", max: 800 },
    { key: "fatherName", label: "Father’s name", ph: "Father's name (English)", max: 120 },
    { key: "indiaOther", label: "Other Indian directorships / shareholdings", ph: "X if none", max: 400 },
  ],
  dirAttachLabels: ["Passport copy", "English residence certificate", "Passport photo", "Driver licence copy"],
  sec9Title: "9. Shareholder details",
  sec9Hint:
    "Fields depend on the type chosen in section 5. Individuals use 9.1.1; companies use the company table. Linked individual shareholders hide section 9 inputs—update sections 5, 6 and 8.1, then press “Sync from director”.",
  sec9IndividualTag: "Individual (9.1.1)",
  syncFromDirector: "Sync from director inputs",
  syncFromDirectorNote:
    "While linked as “same as director”, shareholder detail fields are hidden. After editing section 5, 6 or 8.1, press the button to refresh values for submission. (Use director attachments in 8.1 for documents.)",
  linkedLegendSuffix: (d) => ` — same as director ${d + 1} (linked in section 5)`,
  shIndRows: [
    { label: "Name", name: "shInd_${j}_name", max: 200 },
    { label: "Nationality", name: "shInd_${j}_nationality", max: 80 },
    { label: "Mobile", name: "shInd_${j}_mobile", max: 40 },
    { label: "Email", name: "shInd_${j}_email", max: 254 },
    { label: "Education", name: "shInd_${j}_education", max: 400 },
    { label: "Date of birth", name: "shInd_${j}_dob", max: 40 },
    { label: "Place of birth", name: "shInd_${j}_pob", max: 120 },
    { label: "India address", name: "shInd_${j}_addrIndia", max: 800 },
    { label: "Korea address", name: "shInd_${j}_addrKorea", max: 800 },
    { label: "Father’s name", name: "shInd_${j}_fatherName", max: 120 },
    {
      label: "Other Indian directorships / shareholdings",
      name: "shInd_${j}_otherDir",
      max: 400,
      placeholder: "X if none",
    },
  ],
  indAttachTitle: "Documents typically required for individual shareholders",
  indAttachOl1: "Passport copy",
  indAttachOl2: "English residence certificate",
  indAttachOl3: "Driver licence or national ID",
  indAttachFoot:
    "Prepare the above per individual shareholder and send as instructed. Mask sensitive data or use encrypted ZIP where required.",
  shCorpRows: [
    { label: "Legal name (English / local)", name: "shCorp_${j}_legalName", max: 400, ph: "Legal name as registered" },
    { label: "Country / registration no. (CIN, etc.)", name: "shCorp_${j}_regCountryNo", max: 300, ph: "Country / registration number" },
    { label: "Registered address", name: "shCorp_${j}_hqAddress", max: 800, ph: "" },
    { label: "Representative name & title", name: "shCorp_${j}_rep", max: 300, ph: "" },
    { label: "Share %", name: "shCorp_${j}_sharePct", max: 40, ph: "e.g. 40" },
    { label: "Company contact email", name: "shCorp_${j}_email", max: 254, ph: "" },
    { label: "Company contact phone", name: "shCorp_${j}_phone", max: 40, ph: "" },
  ],
  shCorpAttachLabels: [
    "English certificate of incorporation",
    "Articles of association",
    "English address proof (tax/utility)",
    "Director list (English)",
    "Shareholder register (English, ≥10% holdings)",
  ],
  shCorpFoot: "For corporate shareholders, attach PDFs in the file rows above.",
  shareholderNotesLabel: "Additional shareholder notes (optional)",
  shareholderNotesPlaceholder: "Dual nationality, documents to follow, etc.",
  directorRefTitle: "Director checklist (reference)",
  directorRefItems: [
    "Passport copy (validity) including bio page",
    "India address proof (lease / utility; rules vary by state)",
    "Passport photo (format per current guidance)",
    "Reachable email and mobile",
    "DIN status and prior Indian incorporation history, if any",
    "Resident director (182+ days in India) status",
  ],
  directorExtraLabel: "Additional director remarks",
  directorAttachAria: (i, label) => `Director ${i + 1}: ${label}`,
  corpShareholderAttachAria: (j, label) => `Corporate shareholder ${j + 1}: ${label}`,
  submit: "Submit application",
  submitting: "Sending…",
};

const zh: CorporateIncorporationApplyFormCopy = {
  ...ko,
  rowAdd: "添加行",
  rowRemove: "删除末行",
  successMessage: "申请已收到。我们将在审阅内容与附件后与您联系。",
  errSendDefault: "提交失败。",
  errNetwork: "发生网络错误。",
  applicantLegend: "申请人联系方式",
  applicantHint: "用于回复与补件通知。",
  labelName: "姓名",
  labelEmail: "电子邮箱",
  labelPhoneOptional: "电话（选填）",
  corpNamesLegend: "拟定公司名称（第1–3志愿）",
  rank1: "第1志愿",
  rank2: "第2志愿",
  rank3: "第3志愿",
  addressLegend: "地址",
  addressLabel: "注册办公地址",
  addressPlaceholder: "邮编、道路/门牌、建筑物与楼层等",
  capitalLegend: "注册资本",
  capitalHint: "填写首栏（认缴资本）后，实缴与授权资本将自动填入；若不同请仅修改后两栏。",
  capitalSubscribed: "认缴资本（认购/发行口径等）",
  capitalPaidIn: "实缴资本",
  capitalAuthorized: "授权资本（Authorized）",
  sec5Legend: "5. 股权结构",
  sec5Hint:
    "请为每位股东选择个人或法人，并填写姓名与持股比例。若个人股东与董事为同一人，请在「与董事相同」中选择对应董事；第5栏姓名将与第6、8.1及第9栏联动。董事联系方式与地址（不含姓名）请在8.1修改后同步到第9栏。（持股比例仅在股东行填写。）",
  thDivide: "项目",
  thShType: "股东类型",
  thSameDirector: "与董事相同",
  thName: "姓名",
  thPct: "持股比例",
  thContent: "内容",
  shareholderPrefix: "股东",
  individual: "个人",
  company: "法人（公司）",
  optNoSeparate: "否（单独填写）",
  sameDirectorOption: (d) => `是 · 与董事 ${d + 1} 相同`,
  directorTakenTitle: "该董事已绑定到其他股东行。",
  namePlaceholderCompany: "例：某某有限公司",
  namePlaceholderPerson: "例：张三",
  pctPlaceholder: "例：60%",
  shareholderKindAria: (i) => `股东 ${i + 1} 类型`,
  shareholderNameAria: (i) => `股东 ${i + 1} 姓名`,
  shareholderPctAria: (i) => `股东 ${i + 1} 持股比例`,
  sec6Legend: "6. 登记董事",
  sec6Hint: "默认两名董事。若需三名及以上，请点击「添加登记董事」，8.1 英文信息块将随之增加。",
  directorPrefix: "董事",
  directorNamePlaceholder: "姓名（建议与护照一致）",
  directorNameLockedTitle: "请在第5栏对应股东行填写姓名。",
  directorNameAria: (i) => `登记董事 ${i + 1} 姓名`,
  addDirector: "添加登记董事",
  removeDirector: "删除末位登记董事",
  sec81Title: "8.1 所需信息（英文填写）",
  sec81Hint:
    "请为每位登记董事用英文填写；若无请填「X」等。若与第5栏「相同」绑定，则首行姓名与股东名称一致且只读。可在各董事块底部上传护照及身份证明附件。",
  directorBlockLegend: (i) => `董事 ${i + 1}`,
  dirEnLabels: [
    { key: "name", label: "姓名", ph: "English name", max: 200 },
    { key: "krPhone", label: "韩国手机号", ph: "", max: 40 },
    { key: "email", label: "邮箱", ph: "email@example.com", max: 254 },
    { key: "education", label: "最终学历及院校专业", ph: "e.g. BA, University, Major", max: 400 },
    { key: "dob", label: "出生日期", ph: "YYYY-MM-DD", max: 40 },
    { key: "pob", label: "出生地（城市）", ph: "City, Country", max: 120 },
    { key: "address", label: "现住址", ph: "Full address (English)", max: 800 },
    { key: "fatherName", label: "父亲姓名", ph: "Father's name (English)", max: 120 },
    { key: "indiaOther", label: "在印度其他公司担任董事及持股情况", ph: "无则填 X", max: 400 },
  ],
  dirAttachLabels: ["护照复印件", "英文户籍誊本", "证件照", "驾驶证复印件"],
  sec9Title: "9. 股东详细信息",
  sec9Hint:
    "字段随第5栏类型（个人/法人）变化：个人见9.1.1，法人见公司信息表。若个人股东与董事绑定为「相同」，则隐藏第9栏输入；请先修改第5、6、8.1栏，再点「自董事信息同步」。",
  sec9IndividualTag: "个人（9.1.1）",
  syncFromDirector: "自董事信息同步",
  syncFromDirectorNote:
    "与董事绑定期间不显示股东详细输入。修改第5、6、8.1栏后请点击按钮以更新提交数据。（附件请使用8.1董事附件。）",
  linkedLegendSuffix: (d) => ` — 与董事 ${d + 1} 相同（第5栏已绑定）`,
  shIndRows: [
    { label: "姓名", name: "shInd_${j}_name", max: 200 },
    { label: "国籍", name: "shInd_${j}_nationality", max: 80 },
    { label: "手机号", name: "shInd_${j}_mobile", max: 40 },
    { label: "邮箱", name: "shInd_${j}_email", max: 254 },
    { label: "最终学历 / 学校及专业", name: "shInd_${j}_education", max: 400 },
    { label: "出生日期", name: "shInd_${j}_dob", max: 40 },
    { label: "出生地（城市）", name: "shInd_${j}_pob", max: 120 },
    { label: "印度地址", name: "shInd_${j}_addrIndia", max: 800 },
    { label: "韩国地址", name: "shInd_${j}_addrKorea", max: 800 },
    { label: "父亲姓名", name: "shInd_${j}_fatherName", max: 120 },
    { label: "在印度其他公司担任董事及持股数量", name: "shInd_${j}_otherDir", max: 400, placeholder: "无则填 X" },
  ],
  indAttachTitle: "个人股东通常需准备的文件",
  indAttachOl1: "护照复印件",
  indAttachOl2: "英文户籍誊本",
  indAttachOl3: "驾驶证或居民身份证",
  indAttachFoot: "每位个人股东请按指引准备并提交；敏感信息请脱敏或按政策使用加密 ZIP 等。",
  shCorpRows: [
    { label: "公司正式名称（英文/当地语）", name: "shCorp_${j}_legalName", max: 400, ph: "Legal name as registered" },
    { label: "注册国·注册号（CIN 等）", name: "shCorp_${j}_regCountryNo", max: 300, ph: "Country / registration number" },
    { label: "总部地址", name: "shCorp_${j}_hqAddress", max: 800, ph: "" },
    { label: "代表姓名·职务", name: "shCorp_${j}_rep", max: 300, ph: "" },
    { label: "持股比例（%）", name: "shCorp_${j}_sharePct", max: 40, ph: "例：40" },
    { label: "公司联系邮箱", name: "shCorp_${j}_email", max: 254, ph: "" },
    { label: "公司联系电话", name: "shCorp_${j}_phone", max: 40, ph: "" },
  ],
  shCorpAttachLabels: [
    "法人英文注册证明",
    "公司章程",
    "法人英文地址证明（纳税/公用事业账单等）",
    "英文董事名单",
    "英文股东名册（持股10%以上）",
  ],
  shCorpFoot: "法人股东请在上方文件栏以 PDF 等形式上传附件。",
  shareholderNotesLabel: "股东相关补充说明（选填）",
  shareholderNotesPlaceholder: "特殊情况、多重国籍、资料后补等",
  directorRefTitle: "登记董事所需信息（参考）",
  directorRefItems: [
    "护照复印件（含有效期与生物页）",
    "当地地址证明（租赁/水电等，各邦要求不同）",
    "证件照（规格以当时指引为准）",
    "可联系的邮箱与手机",
    "是否持有 DIN、既往印度登记经历等",
    "是否属于常住董事（每年在印度居住 182 日以上）",
  ],
  directorExtraLabel: "登记董事补充说明",
  directorAttachAria: (i, label) => `董事 ${i + 1} ${label}`,
  corpShareholderAttachAria: (j, label) => `法人股东 ${j + 1} ${label}`,
  submit: "提交申请",
  submitting: "发送中…",
};

export function corporateIncorporationApplyFormCopy(locale: SiteLocale): CorporateIncorporationApplyFormCopy {
  return pickLocale(locale, { ko, en, zh });
}
