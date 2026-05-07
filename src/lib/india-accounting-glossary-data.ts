/** 인도 회계·세무 실무 용어집 (한국어 기준 정리) */
export type GlossaryRow = {
  /** four 변형: 약어 컬럼 */
  abbr?: string;
  en: string;
  ko: string;
  /** 실무 설명. phrase 변형은 비우고 `ko`만 쓰는 경우가 많음 */
  desc: string;
};

export type GlossarySection = {
  id: string;
  titleKo: string;
  /** three: 영·한·설명 / four: 약어·영·한·설명 / forms: Form·용도·설명 / phrase: 2열 / notes: 서술형 */
  variant: "three" | "four" | "forms" | "phrase" | "notes";
  rows: GlossaryRow[];
  /** phrase 전용: 표 헤더(기본 영어 표현 / 한국어 의미) */
  phraseColumns?: readonly [string, string];
  /** phrase 전용: 표 위 안내 문단(선택) */
  phraseIntro?: string;
  /** notes 전용: 도입 문단·불릿·맺음말(rows는 빈 배열) */
  noteIntro?: string;
  noteBullets?: readonly string[];
  noteFooter?: string;
};

const r = (en: string, ko: string, desc: string): GlossaryRow => ({ en, ko, desc });
const p = (en: string, koMeaning: string): GlossaryRow => ({ en, ko: koMeaning, desc: "" });
const q = (abbr: string, en: string, ko: string, desc: string): GlossaryRow => ({ abbr, en, ko, desc });

export const indiaGlossarySections: GlossarySection[] = [
  {
    id: "basic-accounting",
    titleKo: "1. 기본 회계 용어",
    variant: "three",
    rows: [
      r("Accounting", "회계", "회사 거래 기록 및 재무 관리"),
      r("Bookkeeping", "부기 / 장부기장", "일일 거래 입력 업무"),
      r("Ledger", "원장", "계정별 거래 기록"),
      r("Journal Entry", "분개", "회계 입력 단위"),
      r("Trial Balance (TB)", "합계잔액시산표", "재무제표 작성 전 검증표"),
      r("Balance Sheet (BS)", "재무상태표", "자산·부채·자본 현황"),
      r("Profit & Loss (P&L)", "손익계산서", "수익·비용·이익"),
      r("Cash Flow Statement", "현금흐름표", "현금 유입·유출"),
      r("Fixed Assets", "고정자산", "설비·기계·차량 등"),
      r("Depreciation", "감가상각", "자산 비용 배분"),
      r("Accrued Expense", "미지급비용", "아직 지급 안 된 비용"),
      r("Provision", "충당금", "예상 비용 반영"),
      r("Advance", "선급금", "미리 지급한 금액"),
      r("Prepaid Expense", "선급비용", "미래 비용 선지급"),
      r("Outstanding Expense", "미지급비용", "회계기간 종료 후 미지급"),
      r("Sundry Debtors", "외상매출금", "매출채권. 고객 미수금(인도 실무에서도 매출채권 병기)."),
      r("Sundry Creditors", "외상매입금", "매입채무. 공급업체 미지급(인도 실무에서도 매입채무 병기)."),
      r("Inventory / Stock", "재고자산", "판매용 재고"),
      r("Cost of Goods Sold (COGS)", "매출원가", "판매된 상품 원가"),
      r("Revenue", "매출", "수익"),
      r("Net Profit", "순이익", "최종 이익"),
      r("Gross Profit", "매출총이익", "매출-매출원가"),
      r("Month-end closing", "월마감", "월말 장부·신고 마감 절차"),
      r("Year-end closing", "연마감", "연말 결산·재무제표 마감"),
      r("Cost center", "비용센터", "비용 배부 단위"),
      r("Expense booking", "비용 반영", "비용 계정에 분개·기장"),
      r("Revenue booking", "매출 인식", "수익 계정에 매출 반영"),
      r("Knock off", "상계 처리", "채권·채무 등 상계 정리"),
      r("Write off", "대손 처리", "회수 불가 채권·자산 제거"),
      r("Deferred tax", "이연법인세", "일시적 차이에 따른 법인세"),
      r("Related party", "특수관계자", "지배·종속·공동지배 등 연계 당사자"),
      r("Going concern", "계속기업", "사업 지속 전제"),
    ],
  },
  {
    id: "gst-tds",
    titleKo: "2. 인도 세무(GST/TDS) 용어",
    variant: "three",
    rows: [
      r("GST", "상품서비스세", "인도 부가세 체계"),
      r("CGST", "중앙 GST", "중앙정부 몫 GST"),
      r("SGST", "주 GST", "주정부 몫 GST"),
      r("IGST", "통합 GST", "주간 거래 GST"),
      r("Input Tax Credit (ITC)", "매입세액공제", "구매 GST 공제"),
      r("Output GST", "매출 GST", "판매 시 부과 GST"),
      r("GSTIN", "GST 등록번호", "GST 사업자 번호"),
      r("GSTR-1", "매출 신고", "GST 매출 신고"),
      r("GSTR-3B", "요약 신고", "월 GST 납부 신고"),
      r("E-Invoice", "전자세금계산서", "IRP 등록 전자 인보이스"),
      r("E-Way Bill", "전자 운송장", "물류 이동 신고"),
      r("TDS", "원천징수세", "지급 시 세금 공제"),
      r("TCS", "원천징수징수세", "판매자 대신 징수"),
      r("Advance Tax", "선납세", "분기별 법인세 선납"),
      r("Professional Tax (PT)", "직업세", "주정부 급여세"),
      r("Income Tax", "소득세", "법인·개인 소득세"),
      r("ITR", "소득세 확정신고", "Income Tax Return. 납세자 유형별 신고 양식(e-filing)."),
      r("Form 26AS", "세금 크레딧 명세", "TDS·납부 등이 반영되는 통합 명세(환급·대사 참고)."),
      r("Withholding Tax (WHT)", "원천세", "해외송금 세금"),
      r("Surcharge", "서차지", "추가 세금"),
      r("Cess", "교육·건강세", "추가 목적세"),
      r("ITC reversal", "매입세액공제 취소", "이미 공제받은 ITC의 환입·조정"),
      r("RCM liability", "역납부 GST", "Reverse Charge Mechanism에 따른 납세 의무"),
      r("LUT filing", "LUT 제출", "수출 면세 등 Letter of Undertaking 제출"),
      r("GST refund", "GST 환급", "과납·적격 신청에 따른 환급"),
      r("Blocked credit", "불공제 ITC", "공제 제한·차단된 매입세액"),
      r("Place of supply", "공급 장소", "GST율·과세 판단 기준이 되는 공급지"),
      r("Lower deduction certificate", "저율 원천세 승인", "정상 TDS율보다 낮은 공제 승인"),
      r("TDS challan", "TDS 납부서", "세금 납부용 챌란"),
      r("Short deduction", "부족 공제", "TDS 과소 공제"),
      r("TDS receivable", "환급 예정 TDS", "정산·환급 대기 TDS"),
      r("AIS", "연간정보성명세", "Annual Information Statement. 금융·거래 정보 종합 자료."),
    ],
  },
  {
    id: "corporate",
    titleKo: "3. 회사·법인 용어",
    variant: "three",
    rows: [
      r("Private Limited Company", "비공개 주식회사", "Pvt Ltd"),
      r("LLP", "유한책임조합", "Limited Liability Partnership"),
      r("OPC", "1인 법인", "One Person Company"),
      r("Authorised Capital", "수권자본금", "등록 최대 자본"),
      r("Paid-up Capital", "납입자본금", "실제 납입 자본"),
      r("Shareholder", "주주", "지분 보유자"),
      r("Director", "이사", "등기임원"),
      r("DIN", "이사 식별번호", "Director Identification Number"),
      r("DSC", "전자서명", "Digital Signature Certificate"),
      r("MOA", "정관(목적)", "Memorandum of Association"),
      r("AOA", "정관(운영)", "Articles of Association"),
      r("Board Resolution", "이사회 결의", "공식 의사결정"),
      r("ROC Filing", "법인등기 신고", "MCA 신고"),
      r("Annual Return", "연차보고", "연간 MCA 신고"),
      r("CIN", "법인 식별번호", "Corporate Identification Number"),
    ],
  },
  {
    id: "fema",
    titleKo: "4. FEMA·외환·송금 용어",
    variant: "three",
    rows: [
      r("FEMA", "외환관리법", "Foreign Exchange Management Act"),
      r("FDI", "외국인직접투자", "외국인 투자"),
      r("FC-GPR", "외국인 투자 보고", "주식 발행 보고"),
      r("FC-TRS", "주식 양도 보고", "외국인 간 지분 이전"),
      r("ECB", "외화차입", "External Commercial Borrowing"),
      r("AD Bank", "지정 외국환은행", "RBI 승인 은행"),
      r("FIRC", "외화입금증명", "Foreign Inward Remittance Certificate"),
      r("LRN", "대출등록번호", "ECB 등록번호"),
      r("Form 15CA", "해외송금 자가진술", "대외 송금 시 소득세 포털 정보 제출(15CB와 연계)."),
      r("Form 15CB", "해외송금 CA 증명", "Chartered Accountant 검토·증명(15CA와 연계)."),
      r("Form 15CA/CB", "해외송금 신고", "해외송금 세무 신고(15CA·15CB 절차 통칭)."),
      r("DTAA", "조세조약", "이중과세방지협약"),
      r("TRC", "거주자증명서", "Tax Residency Certificate. DTAA·TDS 협약 요율과 연계."),
      r("ODI", "해외직접투자", "Outbound Direct Investment 등 역외 투자"),
      r("FEMA compliance", "FEMA 준수", "외환 규정·신고 이행"),
      r("Inward remittance", "외화 입금", "국내로 유입되는 외화"),
      r("Outward remittance", "해외 송금", "국외로 나가는 자금 송금"),
    ],
  },
  {
    id: "india-unique-concepts",
    titleKo: "5. 놓치기 쉬운 인도 고유 개념",
    variant: "phrase",
    phraseColumns: ["용어", "설명"],
    phraseIntro: "이건 한국인이 잘 모르는 인도 특화 영역입니다.",
    rows: [
      p("LUT", "수출 GST 면세 등록"),
      p("MSME compliance", "중소기업 대금 규정"),
      p("MSME interest", "지급 지연 이자"),
      p("DIN KYC", "이사 KYC 갱신"),
      p("Active compliance", "MCA 정상 상태"),
      p("Strike off", "법인 폐업"),
      p("Dormant company", "휴면 법인"),
    ],
  },
  {
    id: "payroll",
    titleKo: "6. 급여·HR 용어",
    variant: "three",
    rows: [
      r("Payroll", "급여관리", "급여 계산"),
      r("Basic Salary", "기본급", "급여 기본 구성"),
      r("HRA", "주택수당", "House Rent Allowance"),
      r("Special Allowance", "특별수당", "기타 수당"),
      r("Bonus", "보너스", "상여금"),
      r("PF", "직원연금", "Provident Fund"),
      r("ESI", "건강보험", "Employee State Insurance"),
      r("Gratuity", "퇴직금", "장기근속 보상"),
      r("CTC", "총보상금액", "Cost to Company"),
      r("Take-home Salary", "실수령액", "실제 수령 급여"),
      r("Leave Encashment", "연차수당", "미사용 연차 보상"),
    ],
  },
  {
    id: "audit",
    titleKo: "7. 감사·컴플라이언스 용어",
    variant: "three",
    rows: [
      r("Statutory Audit", "법정감사", "의무 회계감사"),
      r("Tax Audit", "세무감사", "세무 검증"),
      r("Internal Audit", "내부감사", "내부 통제 점검"),
      r("Compliance", "컴플라이언스", "법규 준수"),
      r("Notice", "세무통지", "세무서 통보"),
      r("Assessment", "세무조사", "세금 심사"),
      r("Scrutiny", "정밀심사", "세무 상세 검토"),
      r("Reconciliation", "대사(Reconciliation)", "장부·포털·거래처 간 금액·세액 일치 검증"),
      r("Due Date", "신고기한", "법정 마감일"),
      r("Form 3CA / 3CB / 3CD", "세무감사 보고서", "지정 감사·과세연도별 세무감사 양식."),
    ],
  },
  {
    id: "phrases",
    titleKo: "8. 실무에서 자주 쓰는 표현",
    variant: "phrase",
    rows: [
      p("Books are pending", "장부 마감이 지연됨(회계 입력 미완료 상태)"),
      p("GST mismatch", "GST 불일치"),
      p("ITC reversal", "매입세액공제 취소"),
      p("Payment entry", "지급 분개"),
      p("Vendor reconciliation", "거래처(공급업체) 대사"),
      p("Outstanding aging", "미수금 연령분석"),
      p("TDS deducted", "TDS 공제됨"),
      p("GST payable", "납부할 GST"),
      p("Net payable", "최종 납부액"),
      p("Refund due", "환급 예정"),
      p("Nil filing", "무실적 신고"),
      p("Tax exposure", "세무 리스크"),
      p("Supporting documents", "증빙서류"),
    ],
  },
  {
    id: "ap-ar",
    titleKo: "9. AP / AR 계열",
    variant: "four",
    rows: [
      q("AP", "Accounts Payable", "매입채무", "공급업체에 지급할 금액"),
      q("AR", "Accounts Receivable", "매출채권", "고객에게 받을 금액"),
      q("Vendor", "Vendor", "공급업체", "매입 거래처"),
      q("Customer", "Customer", "고객사", "매출 거래처"),
      q("Outstanding", "Outstanding", "미결금액 / 미정산금액", "AP·AR 등 아직 정산되지 않은 잔액(미수·미지급 포함)"),
      q("Aging", "Aging", "연령분석", "기간별 채권 분석"),
    ],
  },
  {
    id: "accounts-abbr",
    titleKo: "10. 회계(Accounts) 약어",
    variant: "four",
    rows: [
      q("GL", "General Ledger", "총계정원장", "전체 회계 계정"),
      q("TB", "Trial Balance", "합계잔액시산표", "결산 전 검증"),
      q("BS", "Balance Sheet", "재무상태표", "자산·부채"),
      q("P&L", "Profit & Loss", "손익계산서", "수익·비용"),
      q("JV", "Journal Voucher", "대체전표", "분개 입력"),
      q("PV", "Payment Voucher", "지급전표", "지출 입력"),
      q("RV", "Receipt Voucher", "입금전표", "수금 입력"),
      q("CV", "Contra Voucher", "계좌간이체전표", "Bank↔Cash, Bank↔Bank 등 계좌간 이체(Tally 등 실무)"),
      q("DN", "Debit Note", "차변통지", "공급업체 차감"),
      q("CN", "Credit Note", "대변통지", "환입·할인"),
    ],
  },
  {
    id: "procurement",
    titleKo: "11. 구매·물류·재고",
    variant: "four",
    rows: [
      q("PO", "Purchase Order", "구매발주서", "구매 요청"),
      q("SO", "Sales Order", "판매주문서", "판매 주문"),
      q("GRN", "Goods Receipt Note", "입고확인서", "자재 입고"),
      q("DC", "Delivery Challan", "납품서", "GST 없이 이동 가능"),
      q("BOM", "Bill of Materials", "자재명세서", "제조 BOM"),
      q("SKU", "Stock Keeping Unit", "재고 코드", "품목 단위"),
      q("QC", "Quality Check", "품질검사", "품질 확인"),
    ],
  },
  {
    id: "gst-abbr",
    titleKo: "12. 세무·GST",
    variant: "four",
    rows: [
      q("ITC", "Input Tax Credit", "매입세액공제", "GST 공제"),
      q("RCM", "Reverse Charge Mechanism", "역납부제도", "구매자가 GST 납부"),
      q("LUT", "Letter of Undertaking", "수출 면세 확인", "IGST 없이 수출"),
      q("HSN", "Harmonized System Nomenclature", "품목 코드", "GST 코드"),
      q("SAC", "Service Accounting Code", "서비스 코드", "서비스 GST 코드"),
      q("GSTIN", "GST Identification Number", "GST 번호", "GST 등록번호"),
      q("TAN", "Tax Deduction Account Number", "TDS 번호", "원천세 번호"),
      q("PAN", "Permanent Account Number", "PAN 번호", "세무 번호"),
    ],
  },
  {
    id: "payroll-abbr",
    titleKo: "13. 급여·HR",
    variant: "four",
    rows: [
      q("CTC", "Cost to Company", "총연봉", "회사 총 비용"),
      q("PF", "Provident Fund", "직원연금", "EPF"),
      q("ESI", "Employee State Insurance", "건강보험", "ESI"),
      q("PT", "Professional Tax", "직업세", "주정부 세금"),
      q("LOP", "Loss of Pay", "무급처리", "급여 차감"),
      q("DOJ", "Date of Joining", "입사일", "입사 날짜"),
      q("FNF", "Full & Final Settlement", "퇴사정산", "최종 정산"),
    ],
  },
  {
    id: "fema-trade",
    titleKo: "14. FEMA·송금·무역",
    variant: "four",
    rows: [
      q("IEC", "Import Export Code", "수출입 코드", "DGFT 등록"),
      q("BOE", "Bill of Entry", "수입신고서", "수입 통관"),
      q("COO", "Certificate of Origin", "원산지증명", "FTA 용"),
      q("BRC", "Bank Realisation Certificate", "수출입금증명", "외화 수령"),
      q("AD Bank", "Authorized Dealer Bank", "지정 외국환은행", "FEMA 은행"),
      q("FIRC", "Foreign Inward Remittance Certificate", "외화입금증명", "외화 유입"),
      q("ECB", "External Commercial Borrowing", "외화차입", "해외 차입"),
    ],
  },
  {
    id: "erp",
    titleKo: "15. ERP·관리·보고",
    variant: "four",
    rows: [
      q("ERP", "Enterprise Resource Planning", "전사자원관리", "통합 시스템"),
      q("MIS", "Management Information System", "경영보고", "관리 보고"),
      q("KPI", "Key Performance Indicator", "핵심성과지표", "성과 지표"),
      q("SOP", "Standard Operating Procedure", "표준업무절차", "프로세스"),
      q("UAT", "User Acceptance Test", "사용자 테스트", "시스템 검증"),
      q("Admin", "Administration", "총무", "운영 관리"),
    ],
  },
  {
    id: "team-expressions",
    titleKo: "16. 인도 회계팀에서 정말 많이 쓰는 표현",
    variant: "phrase",
    phraseColumns: ["표현", "의미"],
    rows: [
      p("AP aging", "미지급금 기간 분석"),
      p("AR follow-up", "미수금 회수 관리"),
      p("Vendor reconciliation", "거래처(공급업체) 대사"),
      p("GST reconciliation", "GST 대사(Reconciliation)"),
      p("Books closing", "월마감"),
      p("Provision entry", "충당금 분개(비용 예상 반영 분개)"),
      p("Accrual entry", "미지급비용 반영(발생주의·Accrual) 분개"),
      p("TDS working", "TDS 계산자료"),
      p("Payment advice", "지급 안내서(지급 통지)"),
      p("Supporting docs", "증빙자료"),
    ],
  },
  {
    id: "forms-income-tax",
    titleKo: "17. 소득세(TDS / 법인세) 관련 Form",
    variant: "forms",
    rows: [
      r("Form 16", "근로소득 TDS 증명", "직원 연말정산용"),
      r("Form 16A", "비급여 TDS 증명", "외주·용역·임대료 등"),
      r("Form 24Q", "급여 TDS 신고", "Salary TDS quarterly return"),
      r("Form 26Q", "일반 TDS 신고", "Vendor/Professional TDS"),
      r("Form 27Q", "해외송금 TDS 신고", "Non-resident 지급"),
      r("Form 10F", "비거주자 정보", "DTAA 적용용(현장에서는 Form 41 전자 절차로 이행되는 경우가 많음)"),
      r("Form 41", "전자 등록 절차", "비거주자 정보 전자등록·e-filing 절차(Form 10F 실무의 후속)"),
      r("ITR-6", "법인세 신고서", "회사 Income Tax Return"),
    ],
  },
  {
    id: "forms-gst",
    titleKo: "18. GST 관련 Form",
    variant: "forms",
    rows: [
      r("GSTR-2B", "매입세액 조회", "ITC 확인"),
      r("GSTR-9", "GST 연간 신고", "Annual Return"),
      r("GSTR-9C", "GST 연간 검토/감사", "연간 재무와 GST 정합·검토(구조·면제 요건은 고시에 따름)"),
    ],
  },
  {
    id: "forms-fema-rbi",
    titleKo: "19. FEMA / FDI / RBI 관련 Form",
    variant: "forms",
    rows: [
      r("FLA Return", "외국인 자산부채 보고", "Annual RBI reporting"),
      r("ECB-2", "ECB 월간 보고", "External Commercial Borrowing 사후 보고"),
      r("Form 83", "ECB 등록", "LRN 신청·AD Bank 경유"),
      r("KYC Report", "투자자 확인", "AD Bank 발행"),
    ],
  },
  {
    id: "forms-mca",
    titleKo: "20. 회사법(MCA/ROC) 관련 Form",
    variant: "forms",
    rows: [
      r("SPICe+", "법인 설립", "Incorporation 원스톱"),
      r("AGILE-PRO", "GST/ESI/PF 신청", "설립 연계 등록"),
      r("INC-20A", "사업개시 신고", "Commencement of business"),
      r("DIR-3", "DIN 신청", "Director ID 최초 신청"),
      r("DIR-12", "이사 변경", "Director 정보 변경"),
      r("MGT-7", "Annual Return", "연차보고(MCA)"),
      r("AOC-4", "재무제표 제출", "Financial filing"),
      r("PAS-3", "신주 발행 보고", "Allotment filing"),
      r("ADT-1", "감사인 선임", "Auditor appointment"),
    ],
  },
  {
    id: "forms-payroll",
    titleKo: "21. 급여·노무 관련 Form",
    variant: "forms",
    rows: [
      r("PF ECR", "PF 월 신고", "Employee Provident Fund 전자 납부·명세"),
      r("ESIC Return", "ESI 신고", "직원 보험 정기 신고"),
      r("PT Return", "Professional Tax 신고", "주(邦)별 상이"),
      r("Form 11", "PF 이전 정보", "EPF joining·이전"),
      r("Form 19", "PF 인출", "퇴사 후 인출"),
      r("Form 10C", "연금 인출", "Pension withdrawal"),
    ],
  },
  {
    id: "forms-trade",
    titleKo: "22. 수출입·무역 관련 Form",
    variant: "forms",
    rows: [
      r("Shipping Bill", "수출 신고", "수출 통관 신고(세관·수출 절차)"),
      r("AD Code", "세관 은행 등록", "ICEGATE 수출입 은행코드 등록·연계"),
    ],
  },
  {
    id: "phrases-compliance-desk",
    titleKo: "23. 실무에서 정말 자주 쓰는 표현 (신고·대응)",
    variant: "phrase",
    phraseColumns: ["표현", "의미"],
    rows: [
      p("TDS return filing", "TDS 신고"),
      p("GST filing", "GST 신고"),
      p("ROC filing", "ROC/MCA 신고"),
      p("Form pending", "서류 미제출"),
      p("Notice received", "세무통지 수령(정부 Notice: GST/MCA/PF/ESI 등)"),
      p("Reconciliation required", "대사(Reconciliation) 필요"),
      p("Refund under process", "환급 진행 중"),
      p("Challan generated", "납부서 생성"),
      p("Tax working", "세금 계산자료(세액 산출 Working)"),
      p("Compliance calendar", "신고 일정표·컴플라이언스 일정표"),
    ],
  },
  {
    id: "india-practice-focus",
    titleKo: "24. 인도 회계 실무 특징",
    variant: "notes",
    rows: [],
    noteIntro:
      "인도 회계·세무 실무에서는 단순 장부 입력보다 아래와 같은 운영·대사(Reconciliation) 업무 비중이 매우 큰 편입니다.",
    noteBullets: [
      "GST 신고(GSTR-1/GSTR-3B) 간 mismatch 관리",
      "Vendor reconciliation 및 고객사 잔액 대사",
      "TDS 공제·납부·26AS 반영 확인",
      "월마감(Books closing) 및 Provision entry 처리",
      "Working file(세액 계산자료) 및 supporting documents 관리",
      "GST Input Tax Credit(ITC) 검증 및 reversal 확인",
      "MCA/GST/TDS 신고 Due date 관리",
      "AD Bank·FEMA 관련 외환 증빙 관리",
    ],
    noteFooter:
      "인도 실무에서는 Tally·ERP·Excel 기반 reconciliation 및 working 관리 표현이 매우 자주 사용됩니다.",
  },
];

export function flattenGlossaryRows(): { section: GlossarySection; row: GlossaryRow; key: string }[] {
  const out: { section: GlossarySection; row: GlossaryRow; key: string }[] = [];
  for (const section of indiaGlossarySections) {
    if (section.variant === "notes") {
      let j = 0;
      if (section.noteIntro) {
        j += 1;
        out.push({
          section,
          row: { en: section.noteIntro, ko: "", desc: "" },
          key: `${section.id}-${j}-intro`,
        });
      }
      for (const bullet of section.noteBullets ?? []) {
        j += 1;
        out.push({
          section,
          row: { en: bullet, ko: "", desc: "" },
          key: `${section.id}-${j}-bullet`,
        });
      }
      if (section.noteFooter) {
        j += 1;
        out.push({
          section,
          row: { en: section.noteFooter, ko: "", desc: "" },
          key: `${section.id}-${j}-footer`,
        });
      }
      continue;
    }
    let i = 0;
    for (const row of section.rows) {
      i += 1;
      out.push({ section, row, key: `${section.id}-${i}-${row.en}` });
    }
  }
  return out;
}

export const indiaGlossaryTotalCount = flattenGlossaryRows().length;

export function glossaryRowHaystack(section: GlossarySection, row: GlossaryRow): string {
  const phraseLead =
    section.variant === "phrase" && section.phraseIntro ? `${section.phraseIntro} ` : "";
  const parts = [section.titleKo, phraseLead, section.id, row.abbr ?? "", row.en, row.ko, row.desc];
  const base = parts.join(" ").toLowerCase();
  const compact = base.replace(/\s/g, "");
  return `${base} ${compact}`;
}
