import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, "../data/tax-calendar.json");
const FIXED_ISO = "2026-04-27T12:00:00.000Z";

let n = 0;
const id = () => `seed-${(++n).toString(36)}-${Math.random().toString(36).slice(2, 10)}`;

const Y = 2026;
const pad = (y, m, d) =>
  `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`;

/** @typedef {{ id: string, date: string, kind: string, title?: string, note?: string, createdAt: string, updatedAt: string }} Ev */
/** @param {string} date @param {string} kind @param {string} [title] @param {string} [note] @returns {Ev} */
const ev = (date, kind, title, note) => ({
  id: id(),
  date,
  kind,
  title,
  note,
  createdAt: FIXED_ISO,
  updatedAt: FIXED_ISO,
});

/** @type {Ev[]} */
const out = [];

for (let m = 1; m <= 12; m++) {
  out.push(ev(pad(Y, m, 7), "TDS", "월별 TDS 신고·납부", "매월 7일까지"));
  out.push(
    ev(pad(Y, m, 7), "ECB", "ECB-2 등(해당 시)", "전월 잔액이 있을 때 익월 7일까지(RBI FIRMS)")
  );
  out.push(ev(pad(Y, m, 11), "GST", "GST-R1(매출)", "매월 11일까지"));
  out.push(ev(pad(Y, m, 15), "ESI", "ESI·PF(연금)", "매월 15일까지"));
  out.push(ev(pad(Y, m, 20), "GST", "GST-3B(매입)", "매월 20일까지"));
  out.push(ev(pad(Y, m, 20), "PT", "Professional Tax", "매월 20일까지(주별 상이)"));
}

// Advance Tax (6·9·12·3월 15일)
out.push(ev(pad(Y, 6, 15), "ADVANCE_TAX", "Advance Tax", "15% — 6월 15일"));
out.push(ev(pad(Y, 9, 15), "ADVANCE_TAX", "Advance Tax", "45% — 9월 15일"));
out.push(ev(pad(Y, 12, 15), "ADVANCE_TAX", "Advance Tax", "75% — 12월 15일"));
out.push(ev(pad(Y, 3, 15), "ADVANCE_TAX", "Advance Tax", "100% — 3월 15일"));
out.push(ev(pad(Y + 1, 3, 15), "ADVANCE_TAX", "Advance Tax", "100% — 익년 3월 15일"));

// TDS 분기 확정
out.push(ev(pad(Y, 5, 31), "TDS", "TDS 분기 확정(Q4)", "1–3월분 — 5월 31일까지"));
out.push(ev(pad(Y, 7, 31), "TDS", "TDS 분기 확정(Q1)", "4–6월분 — 7월 31일까지"));
out.push(ev(pad(Y, 10, 31), "TDS", "TDS 분기 확정(Q2)", "7–9월분 — 10월 31일까지"));
out.push(ev(pad(Y + 1, 1, 31), "TDS", "TDS 분기 확정(Q3)", "10–12월분 — 익년 1월 31일까지"));

// GST 분기(연매출 5 Crore 이하 선택 시): R1 익월 13일, 3B 익월 22–24일(대표 22일)
out.push(ev(pad(Y, 4, 13), "GST", "GST-R1(분기)", "전분기 종료 후 다음달 13일(해당 시)"));
out.push(ev(pad(Y, 4, 22), "GST", "GST-3B(분기)", "전분기 종료 후 다음달 22–24일(해당 시)"));
out.push(ev(pad(Y, 7, 13), "GST", "GST-R1(분기)", ""));
out.push(ev(pad(Y, 7, 22), "GST", "GST-3B(분기)", ""));
out.push(ev(pad(Y, 10, 13), "GST", "GST-R1(분기)", ""));
out.push(ev(pad(Y, 10, 22), "GST", "GST-3B(분기)", ""));
out.push(ev(pad(Y + 1, 1, 13), "GST", "GST-R1(분기)", ""));
out.push(ev(pad(Y + 1, 1, 22), "GST", "GST-3B(분기)", ""));

// 이사회 리마인더(연 4회·120일 이내 등 — 일정은 사내 기준으로 조정)
out.push(
  ev(pad(Y, 3, 31), "SHAREHOLDER_MEETING", "이사회 점검", "설립 후 30일 이내 첫 회의, 연 최소 4회, 회의 간격 120일 초과 불가 등")
);
out.push(ev(pad(Y, 6, 30), "SHAREHOLDER_MEETING", "이사회 점검", "분기별 일정 예시 — 실제 일정은 법정 간격에 맞게 조정"));
out.push(ev(pad(Y, 9, 30), "SHAREHOLDER_MEETING", "이사회 점검", ""));
out.push(ev(pad(Y, 12, 31), "SHAREHOLDER_MEETING", "이사회 점검", ""));

// 연간
out.push(ev(pad(Y, 4, 30), "PT", "Professional Tax 연간", "4월 1–30일 구간"));
out.push(ev(pad(Y, 5, 31), "TDS", "SFT(금융거래 명세)", "5월 1–30일 구간"));
out.push(ev(pad(Y, 7, 20), "ECB", "FLA(대외부채·자산)", "7월 1–20일 구간"));
out.push(
  ev(pad(Y, 9, 30), "SHAREHOLDER_MEETING", "DIR-3 KYC", "이사 DIN — 9월 30일까지(미이행 시 비활성)")
);
out.push(ev(pad(Y, 9, 30), "GST", "재무제표·감사", "9월 30일까지(해당 법인)"));
out.push(ev(pad(Y, 9, 30), "TDS", "ITR(소득세 신고)", "9월 30일까지(해당 시)"));
out.push(ev(pad(Y, 10, 30), "SHAREHOLDER_MEETING", "ROC AOC-4 / MGT-7", "10월 30일까지"));
out.push(ev(pad(Y, 11, 30), "ADVANCE_TAX", "TP Audit Report", "이전가격 감사보고 — 11월 30일까지(해당 시)"));
out.push(
  ev(pad(Y, 12, 31), "GST", "GSTR-9 / GST Audit", "연간(매출 2 Crore 초과 시 GSTR-9 의무 등, GSTR-9C는 통지에 따름)")
);

out.sort((a, b) => a.date.localeCompare(b.date) || (a.title || "").localeCompare(b.title || ""));

fs.writeFileSync(OUT, JSON.stringify(out, null, 2), "utf8");
console.log("Wrote", out.length, "events to", OUT);
