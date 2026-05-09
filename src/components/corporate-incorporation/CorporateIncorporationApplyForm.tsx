"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import { corporateIncorporationApplyFormCopy } from "@/lib/i18n/corporate-incorporation-apply-form-locale";
import type { SiteLocale } from "@/lib/site-locale";

type ShareholderKind = "individual" | "company";

const fieldClass =
  "mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-msv-blue focus:ring-2 focus:ring-msv-blue/20";

const tableFieldClass =
  "mt-0 w-full rounded-lg border border-slate-200 bg-amber-50/50 px-3 py-2 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-msv-blue focus:ring-2 focus:ring-msv-blue/20";

const tableFileInputClass =
  "mt-0 block w-full text-xs text-slate-600 file:mr-2 file:rounded-md file:border-0 file:bg-msv-blue-soft file:px-2 file:py-1.5 file:font-medium file:text-msv-navy";

const labelClass = "block text-sm font-semibold text-msv-navy";

const infoBoxClass =
  "rounded-xl border border-slate-200 bg-slate-50/90 px-4 py-3 text-sm leading-relaxed text-slate-700";

const MIN_ROWS = 2;
const MAX_ROWS = 15;

const tableWrap = "overflow-x-auto rounded-xl border border-slate-300";
const tableBase = "w-full border-collapse text-sm";
/** 구분 / 내용 2열 표 — 열 폭 50:50 */
const tableBaseTwoCol = `${tableBase} table-fixed`;
const thRow = "border-b border-slate-300 bg-slate-100 px-3 py-2 text-left font-semibold text-slate-800";
const thHalf = "w-1/2 min-w-0";
const tdLabel =
  "w-[min(40%,220px)] border-b border-slate-200 bg-slate-50/80 px-3 py-2 align-top font-medium text-slate-800";
const tdLabelHalf =
  "w-1/2 min-w-0 border-b border-slate-200 bg-slate-50/80 px-3 py-2 align-top font-medium text-slate-800";
const tdInput = "border-b border-slate-200 px-2 py-1.5 align-top";
const tdInputHalf = "w-1/2 min-w-0 border-b border-slate-200 px-2 py-1.5 align-top";

function RowControls({
  count,
  onAdd,
  onRemove,
  min = MIN_ROWS,
  max = MAX_ROWS,
  addLabel = "행 추가",
  removeLabel = "마지막 행 삭제",
  addButtonClassName,
  hideRemoveUnlessAboveMin = false,
}: {
  count: number;
  onAdd: () => void;
  onRemove: () => void;
  min?: number;
  max?: number;
  addLabel?: string;
  removeLabel?: string;
  /** 예: 등기이사 추가 버튼 강조 */
  addButtonClassName?: string;
  /** true이면 이사·주주 최소 인원(2명) 초과일 때만 삭제 버튼 표시 */
  hideRemoveUnlessAboveMin?: boolean;
}) {
  const showRemove = !hideRemoveUnlessAboveMin || count > min;
  const addClass =
    addButtonClassName ??
    "rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-40";
  return (
    <div className="flex flex-wrap items-center gap-2 pt-2">
      <button type="button" onClick={onAdd} disabled={count >= max} className={addClass}>
        {addLabel}
      </button>
      {showRemove ? (
        <button
          type="button"
          onClick={onRemove}
          disabled={count <= min}
          className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-40"
        >
          {removeLabel}
        </button>
      ) : null}
    </div>
  );
}

function kindsForRowCount(n: number): ShareholderKind[] {
  return Array.from({ length: n }, () => "individual");
}

function sameDirectorForRowCount(n: number): (number | null)[] {
  return Array.from({ length: n }, () => null);
}

function kindsAfterShareholderRowCountChange(prev: ShareholderKind[], nextRows: number): ShareholderKind[] {
  if (prev.length === nextRows) return prev;
  if (nextRows > prev.length) {
    return [...prev, ...Array(nextRows - prev.length).fill("individual" as ShareholderKind)];
  }
  return prev.slice(0, nextRows);
}

function sameDirectorAfterShareholderRowCountChange(prev: (number | null)[], nextRows: number): (number | null)[] {
  if (prev.length === nextRows) return prev;
  if (nextRows > prev.length) {
    return [...prev, ...Array(nextRows - prev.length).fill(null)];
  }
  return prev.slice(0, nextRows);
}

function sanitizeShareholderSameDirectorValues(
  prev: (number | null)[],
  directorRowCount: number,
  kinds: ShareholderKind[],
): (number | null)[] {
  return prev.map((v, idx) => {
    if (v === null || v === undefined) return null;
    if ((kinds[idx] ?? "individual") === "company") return null;
    if (v < 0 || v >= directorRowCount) return null;
    return v;
  });
}

type DirectorShareholderCopyMode = "all" | "detailsOnly";

/** 주주 지분 이름 → 연동된 이사 성명·8.1 이름·9.1.1 이름 */
function syncLinkedNameTrioFromShareholder(form: HTMLFormElement, shareholderIdx: number, directorIdx: number) {
  const el = (name: string) => form.elements.namedItem(name);
  const shn = el(`shareholdingName_${shareholderIdx}`);
  if (!(shn instanceof HTMLInputElement)) return;
  const v = shn.value;
  const dn = el(`directorName_${directorIdx}`);
  const en = el(`dirEn_${directorIdx}_name`);
  const shi = el(`shInd_${shareholderIdx}_name`);
  if (dn instanceof HTMLInputElement) dn.value = v;
  if (en instanceof HTMLInputElement) en.value = v;
  if (shi instanceof HTMLInputElement) shi.value = v;
}

/** 이사 d의 6·8.1 입력값을 개인 주주 s의 5·9.1.1 필드로 복사. detailsOnly는 이름·지분명 제외(연동 시 주주 이름이 기준). */
function copyDirectorToShareholderInputs(
  form: HTMLFormElement,
  directorIdx: number,
  shareholderIdx: number,
  mode: DirectorShareholderCopyMode = "all",
) {
  const el = (name: string) => form.elements.namedItem(name);
  const copyInput = (fromName: string, toName: string) => {
    const from = el(fromName);
    const to = el(toName);
    if (from instanceof HTMLInputElement && to instanceof HTMLInputElement) {
      to.value = from.value;
    }
  };

  if (mode === "all") {
    copyInput(`directorName_${directorIdx}`, `shareholdingName_${shareholderIdx}`);

    const en = el(`dirEn_${directorIdx}_name`);
    const dn = el(`directorName_${directorIdx}`);
    const shName = el(`shInd_${shareholderIdx}_name`);
    if (shName instanceof HTMLInputElement) {
      if (en instanceof HTMLInputElement && en.value.trim()) {
        shName.value = en.value.trim();
      } else if (dn instanceof HTMLInputElement) {
        shName.value = dn.value;
      }
    }
  }

  const pairs: [string, string][] = [
    [`dirEn_${directorIdx}_krPhone`, `shInd_${shareholderIdx}_mobile`],
    [`dirEn_${directorIdx}_email`, `shInd_${shareholderIdx}_email`],
    [`dirEn_${directorIdx}_education`, `shInd_${shareholderIdx}_education`],
    [`dirEn_${directorIdx}_dob`, `shInd_${shareholderIdx}_dob`],
    [`dirEn_${directorIdx}_pob`, `shInd_${shareholderIdx}_pob`],
    [`dirEn_${directorIdx}_address`, `shInd_${shareholderIdx}_addrIndia`],
    [`dirEn_${directorIdx}_fatherName`, `shInd_${shareholderIdx}_fatherName`],
    [`dirEn_${directorIdx}_indiaOther`, `shInd_${shareholderIdx}_otherDir`],
  ];
  for (const [from, to] of pairs) {
    copyInput(from, to);
  }

  const krAddr = el(`shInd_${shareholderIdx}_addrKorea`);
  if (krAddr instanceof HTMLInputElement) {
    krAddr.value = "";
  }
}

function shFieldName(template: string, j: number) {
  return template.replaceAll("${j}", String(j));
}

const DIR_ATTACH_FIELD_KEYS = ["passport", "residence", "photo", "license"] as const;

const SH_CORP_ATTACH_FIELD_KEYS = [
  "businessRegEng",
  "articles",
  "addressTaxProof",
  "directorsListEn",
  "shareholdersRegister10En",
] as const;

export function CorporateIncorporationApplyForm({ locale }: { locale: SiteLocale }) {
  const copy = useMemo(() => corporateIncorporationApplyFormCopy(locale), [locale]);
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "err">("idle");
  const [errMsg, setErrMsg] = useState("");
  const [shareholderRows, setShareholderRows] = useState(MIN_ROWS);
  const [directorRows, setDirectorRows] = useState(MIN_ROWS);
  const [shareholderKinds, setShareholderKinds] = useState<ShareholderKind[]>(() => kindsForRowCount(MIN_ROWS));
  const [shareholderSameDirector, setShareholderSameDirector] = useState<(number | null)[]>(() =>
    sameDirectorForRowCount(MIN_ROWS),
  );

  const bumpShareholderRows = useCallback((delta: 1 | -1) => {
    setShareholderRows((n) => {
      const next = delta === 1 ? Math.min(MAX_ROWS, n + 1) : Math.max(MIN_ROWS, n - 1);
      if (next === n) return n;
      setShareholderKinds((k) => kindsAfterShareholderRowCountChange(k, next));
      setShareholderSameDirector((s) => sameDirectorAfterShareholderRowCountChange(s, next));
      return next;
    });
  }, []);

  const bumpDirectorRows = useCallback((delta: 1 | -1) => {
    setDirectorRows((n) => {
      const next = delta === 1 ? Math.min(MAX_ROWS, n + 1) : Math.max(MIN_ROWS, n - 1);
      if (next === n) return n;
      setShareholderSameDirector((s) => sanitizeShareholderSameDirectorValues(s, next, shareholderKinds));
      return next;
    });
  }, [shareholderKinds]);

  const applyDirectorToShareholder = useCallback((shareholderIdx: number, directorIdx: number | null) => {
    const form = formRef.current;
    if (!form || directorIdx === null) return;
    if (directorIdx < 0 || directorIdx >= directorRows) return;
    if ((shareholderKinds[shareholderIdx] ?? "individual") !== "individual") return;
    requestAnimationFrame(() => {
      const f = formRef.current;
      if (!f) return;
      const shn = f.elements.namedItem(`shareholdingName_${shareholderIdx}`);
      const nameBefore =
        shn instanceof HTMLInputElement ? shn.value : "";
      copyDirectorToShareholderInputs(f, directorIdx, shareholderIdx, "all");
      if (nameBefore.trim()) {
        if (shn instanceof HTMLInputElement) shn.value = nameBefore;
      }
      syncLinkedNameTrioFromShareholder(f, shareholderIdx, directorIdx);
    });
  }, [directorRows, shareholderKinds]);

  function setKindAt(index: number, kind: ShareholderKind) {
    setShareholderKinds((prev) => {
      const next = [...prev];
      if (index >= 0 && index < next.length) next[index] = kind;
      setShareholderSameDirector((sd) => {
        const patched = kind === "company" ? sd.map((v, i) => (i === index ? null : v)) : sd;
        return sanitizeShareholderSameDirectorValues(patched, directorRows, next);
      });
      return next;
    });
  }

  function isDirectorLinkedElsewhere(directorIdx: number, shareholderIdx: number): boolean {
    return shareholderSameDirector.some(
      (assigned, idx) => idx !== shareholderIdx && assigned === directorIdx,
    );
  }

  /** 해당 이사가 개인 주주와「이사와 동일」로 연결된 경우 — 이름은 5번 지분에서만 수정 */
  function isDirectorLinkedAsShareholder(directorIdx: number): boolean {
    return shareholderSameDirector.some(
      (assigned, j) => assigned === directorIdx && (shareholderKinds[j] ?? "individual") === "individual",
    );
  }

  function setSameDirectorAt(shareholderIdx: number, raw: string) {
    if (raw === "") {
      setShareholderSameDirector((prev) => {
        const next = [...prev];
        if (shareholderIdx >= 0 && shareholderIdx < next.length) next[shareholderIdx] = null;
        return next;
      });
      return;
    }
    const directorIdx = Number.parseInt(raw, 10);
    if (!Number.isFinite(directorIdx) || directorIdx < 0 || directorIdx >= directorRows) return;
    setShareholderSameDirector((prev) => {
      const next = [...prev];
      if (shareholderIdx >= 0 && shareholderIdx < next.length) next[shareholderIdx] = directorIdx;
      return next;
    });
    applyDirectorToShareholder(shareholderIdx, directorIdx);
  }

  /** 자본금(인수·발행 기준) 입력 시 납입·수권자본금에 같은 값 반영 */
  function handleCapitalSubscribedSync(ev: React.FormEvent<HTMLFormElement>) {
    const target = ev.target;
    if (!(target instanceof HTMLInputElement) || target.name !== "capitalSubscribed") return;
    const form = formRef.current;
    if (!form) return;
    const v = target.value;
    const paid = form.elements.namedItem("capitalPaidIn");
    const auth = form.elements.namedItem("capitalAuthorized");
    if (paid instanceof HTMLInputElement) paid.value = v;
    if (auth instanceof HTMLInputElement) auth.value = v;
  }

  function handleFormInput(ev: React.FormEvent<HTMLFormElement>) {
    handleCapitalSubscribedSync(ev);
    handleDirectorLinkedSync(ev);
  }

  /** 주주 지분 이름·이사 6·8.1 입력 연동 */
  function handleDirectorLinkedSync(ev: React.FormEvent<HTMLFormElement>) {
    const target = ev.target;
    if (!(target instanceof HTMLInputElement)) return;
    if (target.type === "file" || target.type === "hidden") return;
    const nm = target.name;
    if (!nm) return;

    const shMatch = nm.match(/^shareholdingName_(\d+)$/);
    if (shMatch) {
      const s = Number.parseInt(shMatch[1], 10);
      if (!Number.isFinite(s) || s < 0 || s >= shareholderRows) return;
      const d = shareholderSameDirector[s];
      if (d === null || d === undefined) return;
      if ((shareholderKinds[s] ?? "individual") !== "individual") return;
      const form = formRef.current;
      if (!form) return;
      syncLinkedNameTrioFromShareholder(form, s, d);
      return;
    }

    let directorIdx: number | null = null;
    if (nm.startsWith("directorName_")) {
      directorIdx = Number.parseInt(nm.slice("directorName_".length), 10);
    } else if (nm.startsWith("dirEn_")) {
      const after = nm.slice("dirEn_".length);
      const u = after.indexOf("_");
      if (u === -1) return;
      directorIdx = Number.parseInt(after.slice(0, u), 10);
    } else {
      return;
    }
    if (!Number.isFinite(directorIdx) || directorIdx < 0 || directorIdx >= directorRows) return;
    const form = formRef.current;
    if (!form) return;

    for (let j = 0; j < shareholderRows; j++) {
      if ((shareholderKinds[j] ?? "individual") !== "individual") continue;
      if (shareholderSameDirector[j] !== directorIdx) continue;
      copyDirectorToShareholderInputs(form, directorIdx, j, "detailsOnly");
    }
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrMsg("");
    const form = e.currentTarget;
    for (let i = 0; i < directorRows; i++) {
      const el = form.elements.namedItem(`directorName_${i}`);
      const v =
        el instanceof HTMLInputElement ? el.value.trim() : typeof el === "string" ? el.trim() : "";
      if (!v) {
        setErrMsg(copy.errAllDirectorNamesRequired);
        setStatus("err");
        if (el instanceof HTMLInputElement) {
          el.focus();
          el.scrollIntoView({ behavior: "smooth", block: "center" });
        }
        return;
      }
    }
    setStatus("loading");
    const fd = new FormData(form);
    try {
      const res = await fetch("/api/corporate-incorporation-apply", {
        method: "POST",
        body: fd,
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        setErrMsg(data.error || copy.errSendDefault);
        setStatus("err");
        return;
      }
      setStatus("ok");
      form.reset();
      setShareholderRows(MIN_ROWS);
      setDirectorRows(MIN_ROWS);
      setShareholderKinds(kindsForRowCount(MIN_ROWS));
      setShareholderSameDirector(sameDirectorForRowCount(MIN_ROWS));
    } catch {
      setErrMsg(copy.errNetwork);
      setStatus("err");
    }
  }

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      onInput={handleFormInput}
      encType="multipart/form-data"
      className="space-y-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
    >
      <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden />
      <input type="hidden" name="shareholderRowCount" value={shareholderRows} />
      <input type="hidden" name="directorRowCount" value={directorRows} />

      {status === "ok" ? (
        <p className="rounded-xl border border-teal-200/80 bg-teal-50/90 px-4 py-3.5 text-sm leading-relaxed text-teal-900">
          {copy.successMessage}
        </p>
      ) : null}
      {status === "err" && errMsg ? (
        <p className="rounded-xl border border-red-200/80 bg-red-50/90 px-4 py-3.5 text-sm leading-relaxed text-red-900">
          {errMsg}
        </p>
      ) : null}

      <fieldset className="space-y-4 border-0 p-0">
        <legend className={`${labelClass} text-base`}>{copy.applicantLegend}</legend>
        <p className="text-xs text-slate-500">{copy.applicantHint}</p>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="applicantName" className={labelClass}>
              {copy.labelName} <span className="text-red-500">*</span>
            </label>
            <input id="applicantName" name="applicantName" required maxLength={120} className={fieldClass} />
          </div>
          <div>
            <label htmlFor="applicantEmail" className={labelClass}>
              {copy.labelEmail} <span className="text-red-500">*</span>
            </label>
            <input
              id="applicantEmail"
              name="applicantEmail"
              type="email"
              required
              maxLength={254}
              className={fieldClass}
            />
          </div>
        </div>
        <div>
          <label htmlFor="applicantPhone" className={labelClass}>
            {copy.labelPhoneOptional}
          </label>
          <input id="applicantPhone" name="applicantPhone" type="tel" maxLength={40} className={fieldClass} />
        </div>
      </fieldset>

      <fieldset className="space-y-4 border-0 p-0">
        <legend className={`${labelClass} text-base`}>{copy.corpNamesLegend}</legend>
        <div>
          <label htmlFor="corpName1" className={labelClass}>
            {copy.rank1} <span className="text-red-500">*</span>
          </label>
          <input id="corpName1" name="corpName1" required maxLength={200} className={fieldClass} />
        </div>
        <div>
          <label htmlFor="corpName2" className={labelClass}>
            {copy.rank2}
          </label>
          <input id="corpName2" name="corpName2" maxLength={200} className={fieldClass} />
        </div>
        <div>
          <label htmlFor="corpName3" className={labelClass}>
            {copy.rank3}
          </label>
          <input id="corpName3" name="corpName3" maxLength={200} className={fieldClass} />
        </div>
      </fieldset>

      <fieldset className="space-y-4 border-0 p-0">
        <legend className={`${labelClass} text-base`}>{copy.addressLegend}</legend>
        <div>
          <label htmlFor="addressFull" className={labelClass}>
            {copy.addressLabel} <span className="text-red-500">*</span>
          </label>
          <textarea
            id="addressFull"
            name="addressFull"
            required
            rows={4}
            maxLength={2000}
            className={`${fieldClass} resize-y leading-relaxed`}
            placeholder={copy.addressPlaceholder}
          />
        </div>
      </fieldset>

      <fieldset className="space-y-4 border-0 p-0">
        <legend className={`${labelClass} text-base`}>{copy.capitalLegend}</legend>
        <p className="text-xs text-slate-500">{copy.capitalHint}</p>
        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <label htmlFor="capitalSubscribed" className={labelClass}>
              {copy.capitalSubscribed}
            </label>
            <input
              id="capitalSubscribed"
              name="capitalSubscribed"
              maxLength={120}
              className={fieldClass}
              placeholder={copy.inrPlaceholder}
            />
          </div>
          <div>
            <label htmlFor="capitalPaidIn" className={labelClass}>
              {copy.capitalPaidIn}
            </label>
            <input
              id="capitalPaidIn"
              name="capitalPaidIn"
              maxLength={120}
              className={fieldClass}
              placeholder={copy.inrPlaceholder}
            />
          </div>
          <div>
            <label htmlFor="capitalAuthorized" className={labelClass}>
              {copy.capitalAuthorized}
            </label>
            <input
              id="capitalAuthorized"
              name="capitalAuthorized"
              maxLength={120}
              className={fieldClass}
              placeholder={copy.inrPlaceholder}
            />
          </div>
        </div>
      </fieldset>

      <fieldset className="space-y-3 border-0 p-0">
        <legend className={`${labelClass} text-base`}>{copy.sec5Legend}</legend>
        <p className="text-xs text-slate-500">{copy.sec5Hint}</p>
        <div className={tableWrap}>
          <table className={tableBase}>
            <thead>
              <tr>
                <th className={`${thRow} w-[100px]`}>{copy.thDivide}</th>
                <th className={`${thRow} w-[min(34%,200px)]`}>{copy.thShType}</th>
                <th className={`${thRow} w-[min(28%,160px)]`}>{copy.thSameDirector}</th>
                <th className={thRow}>{copy.thName}</th>
                <th className={`${thRow} w-[min(22%,120px)]`}>{copy.thPct}</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: shareholderRows }, (_, i) => (
                <tr key={`sh-${i}`}>
                  <td className={tdLabel}>
                    {copy.shareholderPrefix} {i + 1}
                  </td>
                  <td className={`${tdInput} min-w-[168px]`}>
                    <input type="hidden" name={`shareholderKind_${i}`} value={shareholderKinds[i] ?? "individual"} />
                    <input
                      type="hidden"
                      name={`shareholderSameDirector_${i}`}
                      value={
                        (shareholderKinds[i] ?? "individual") === "individual" &&
                        shareholderSameDirector[i] !== null &&
                        shareholderSameDirector[i] !== undefined
                          ? String(shareholderSameDirector[i])
                          : ""
                      }
                    />
                    <div className="flex flex-wrap gap-1" role="group" aria-label={copy.shareholderKindAria(i)}>
                      <button
                        type="button"
                        onClick={() => setKindAt(i, "individual")}
                        className={`rounded-lg px-2.5 py-1.5 text-xs font-semibold transition ${
                          (shareholderKinds[i] ?? "individual") === "individual"
                            ? "bg-msv-navy text-white shadow-sm"
                            : "bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50"
                        }`}
                      >
                        {copy.individual}
                      </button>
                      <button
                        type="button"
                        onClick={() => setKindAt(i, "company")}
                        className={`rounded-lg px-2.5 py-1.5 text-xs font-semibold transition ${
                          shareholderKinds[i] === "company"
                            ? "bg-msv-navy text-white shadow-sm"
                            : "bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50"
                        }`}
                      >
                        {copy.company}
                      </button>
                    </div>
                  </td>
                  <td className={`${tdInput} min-w-[140px]`}>
                    {(shareholderKinds[i] ?? "individual") === "individual" ? (
                      <select
                        className="w-full max-w-[220px] rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-xs text-slate-800 outline-none focus:border-msv-blue focus:ring-2 focus:ring-msv-blue/20"
                        aria-label={`${copy.shareholderKindAria(i)} — ${copy.thSameDirector}`}
                        value={shareholderSameDirector[i] === null || shareholderSameDirector[i] === undefined ? "" : String(shareholderSameDirector[i])}
                        onChange={(e) => setSameDirectorAt(i, e.target.value)}
                      >
                        <option value="">{copy.optNoSeparate}</option>
                        {Array.from({ length: directorRows }, (_, d) => {
                          const taken = isDirectorLinkedElsewhere(d, i);
                          return (
                            <option
                              key={d}
                              value={String(d)}
                              disabled={taken}
                              title={taken ? copy.directorTakenTitle : undefined}
                            >
                              {copy.sameDirectorOption(d)}
                            </option>
                          );
                        })}
                      </select>
                    ) : (
                      <span className="text-xs text-slate-400">—</span>
                    )}
                  </td>
                  <td className={tdInput}>
                    <input
                      name={`shareholdingName_${i}`}
                      maxLength={300}
                      className={tableFieldClass}
                      placeholder={
                        (shareholderKinds[i] ?? "individual") === "company"
                          ? copy.namePlaceholderCompany
                          : copy.namePlaceholderPerson
                      }
                      aria-label={copy.shareholderNameAria(i)}
                    />
                  </td>
                  <td className={tdInput}>
                    <input
                      name={`shareholdingPct_${i}`}
                      maxLength={40}
                      className={tableFieldClass}
                      placeholder={copy.pctPlaceholder}
                      aria-label={copy.shareholderPctAria(i)}
                      inputMode="decimal"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <RowControls
          count={shareholderRows}
          onAdd={() => bumpShareholderRows(1)}
          onRemove={() => bumpShareholderRows(-1)}
          addLabel={copy.rowAdd}
          removeLabel={copy.rowRemove}
        />
      </fieldset>

      <fieldset className="space-y-3 border-0 p-0">
        <legend className={`${labelClass} text-base`}>{copy.sec6Legend}</legend>
        <p className="text-xs text-slate-500">{copy.sec6Hint}</p>
        <div className={tableWrap}>
          <table className={tableBaseTwoCol}>
            <thead>
              <tr>
                <th className={`${thRow} ${thHalf}`}>{copy.thDivide}</th>
                <th className={`${thRow} ${thHalf}`}>{copy.thContent}</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: directorRows }, (_, i) => {
                const nameLocked = isDirectorLinkedAsShareholder(i);
                return (
                  <tr key={`dir-${i}`}>
                    <td className={tdLabelHalf}>
                      {copy.directorPrefix} {i + 1}
                    </td>
                    <td className={tdInputHalf}>
                      <input
                        name={`directorName_${i}`}
                        maxLength={200}
                        readOnly={nameLocked}
                        title={nameLocked ? copy.directorNameLockedTitle : undefined}
                        className={`${tableFieldClass}${nameLocked ? " cursor-not-allowed bg-slate-100/90" : ""}`}
                        placeholder={copy.directorNamePlaceholder}
                        aria-label={copy.directorNameAria(i)}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <RowControls
          count={directorRows}
          onAdd={() => bumpDirectorRows(1)}
          onRemove={() => bumpDirectorRows(-1)}
          addLabel={copy.addDirector}
          removeLabel={copy.removeDirector}
          hideRemoveUnlessAboveMin
          addButtonClassName="rounded-lg border border-msv-navy/20 bg-msv-navy px-3 py-2 text-xs font-semibold text-white shadow-sm hover:bg-msv-navy/90 disabled:opacity-40"
        />
      </fieldset>

      <section className="space-y-6">
        <h2 className={`${labelClass} text-base`}>{copy.sec81Title}</h2>
        <p className="text-xs text-slate-500">{copy.sec81Hint}</p>
        {Array.from({ length: directorRows }, (_, i) => (
          <fieldset key={`dir-en-${i}`} className="space-y-0 border-0 p-0">
            <legend className="mb-2 text-sm font-semibold text-msv-navy">{copy.directorBlockLegend(i)}</legend>
            <div className={tableWrap}>
              <table className={tableBaseTwoCol}>
                <thead>
                  <tr>
                    <th className={`${thRow} ${thHalf}`}>{copy.thDivide}</th>
                    <th className={`${thRow} ${thHalf}`}>{copy.thContent}</th>
                  </tr>
                </thead>
                <tbody>
                  {copy.dirEnLabels.map((row) => {
                    const fieldName = `dirEn_${i}_${row.key}`;
                    const dirNameLocked = isDirectorLinkedAsShareholder(i) && row.key === "name";
                    return (
                      <tr key={fieldName}>
                        <td className={tdLabelHalf}>{row.label}</td>
                        <td className={tdInputHalf}>
                          <input
                            name={fieldName}
                            maxLength={row.max}
                            readOnly={dirNameLocked}
                            title={dirNameLocked ? copy.directorNameLockedTitle : undefined}
                            className={`${tableFieldClass}${dirNameLocked ? " cursor-not-allowed bg-slate-100/90" : ""}`}
                            placeholder={row.ph}
                          />
                        </td>
                      </tr>
                    );
                  })}
                  {DIR_ATTACH_FIELD_KEYS.map((attachKey, ai) => {
                    const label = copy.dirAttachLabels[ai] ?? "";
                    const name = `dirAttach_${i}_${attachKey}` as const;
                    return (
                      <tr key={name}>
                        <td className={tdLabelHalf}>{label}</td>
                        <td className={tdInputHalf}>
                          <input
                            type="file"
                            name={name}
                            accept="image/*,.pdf,application/pdf"
                            className={tableFileInputClass}
                            aria-label={copy.directorAttachAria(i, label)}
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </fieldset>
        ))}
      </section>

      <section className="space-y-6">
        <h2 className={`${labelClass} text-base`}>{copy.sec9Title}</h2>
        <p className="text-xs text-slate-500">{copy.sec9Hint}</p>
        {Array.from({ length: shareholderRows }, (_, j) => {
          const kind = shareholderKinds[j] ?? "individual";
          const linkedDir = shareholderSameDirector[j];
          const linked = kind === "individual" && linkedDir !== null && linkedDir !== undefined;
          return (
            <fieldset key={`sh-detail-${j}`} className="space-y-0 border-0 p-0">
              <legend className="mb-2 text-sm font-semibold text-msv-navy">
                {copy.shareholderPrefix} {j + 1} · {kind === "individual" ? copy.sec9IndividualTag : copy.company}
                {linked && linkedDir !== null && linkedDir !== undefined ? (
                  <span className="font-normal text-slate-600">{copy.linkedLegendSuffix(linkedDir)}</span>
                ) : null}
              </legend>
              {kind === "individual" ? (
                <>
                  {linked ? (
                    <div className="mb-2 flex flex-wrap items-center gap-2 rounded-xl border border-slate-200 bg-slate-50/90 px-3 py-2.5">
                      <button
                        type="button"
                        onClick={() => applyDirectorToShareholder(j, linkedDir)}
                        className="rounded-lg border border-slate-300 bg-white px-3 py-1 text-xs font-medium text-slate-700 hover:bg-slate-50"
                      >
                        {copy.syncFromDirector}
                      </button>
                      <span className="text-xs text-slate-600">{copy.syncFromDirectorNote}</span>
                    </div>
                  ) : null}
                  <div className={linked ? "sr-only" : undefined}>
                    <div className={tableWrap}>
                      <table className={tableBaseTwoCol}>
                        <thead>
                          <tr>
                            <th className={`${thRow} ${thHalf}`}>{copy.thDivide}</th>
                            <th className={`${thRow} ${thHalf}`}>{copy.thContent}</th>
                          </tr>
                        </thead>
                        <tbody>
                          {copy.shIndRows.map((row) => {
                            const nm = shFieldName(row.name, j);
                            return (
                              <tr key={nm}>
                                <td className={tdLabelHalf}>{row.label}</td>
                                <td className={tdInputHalf}>
                                  <input
                                    name={nm}
                                    maxLength={row.max}
                                    readOnly={linked}
                                    tabIndex={linked ? -1 : undefined}
                                    className={tableFieldClass}
                                    placeholder={row.placeholder ?? ""}
                                  />
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  {!linked ? (
                    <div className={`${infoBoxClass} mt-3`}>
                      <p className="m-0 mb-2 text-sm font-semibold text-msv-navy">{copy.indAttachTitle}</p>
                      <ol className="m-0 list-decimal space-y-1 pl-5 text-sm text-slate-700">
                        <li>{copy.indAttachOl1}</li>
                        <li>{copy.indAttachOl2}</li>
                        <li>{copy.indAttachOl3}</li>
                      </ol>
                      <p className="mb-0 mt-2 text-xs text-slate-600">{copy.indAttachFoot}</p>
                    </div>
                  ) : null}
                </>
              ) : (
                <>
                  <div className={tableWrap}>
                    <table className={tableBaseTwoCol}>
                      <thead>
                        <tr>
                          <th className={`${thRow} ${thHalf}`}>{copy.thDivide}</th>
                          <th className={`${thRow} ${thHalf}`}>{copy.thContent}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {copy.shCorpRows.map((row) => {
                          const nm = shFieldName(row.name, j);
                          return (
                            <tr key={nm}>
                              <td className={tdLabelHalf}>{row.label}</td>
                              <td className={tdInputHalf}>
                                <input name={nm} maxLength={row.max} className={tableFieldClass} placeholder={row.ph} />
                              </td>
                            </tr>
                          );
                        })}
                        {SH_CORP_ATTACH_FIELD_KEYS.map((attachKey, ai) => {
                          const label = copy.shCorpAttachLabels[ai] ?? "";
                          const name = `shCorpAttach_${j}_${attachKey}` as const;
                          return (
                            <tr key={name}>
                              <td className={tdLabelHalf}>{label}</td>
                              <td className={tdInputHalf}>
                                <input
                                  type="file"
                                  name={name}
                                  accept="image/*,.pdf,application/pdf,.doc,.docx"
                                  className={tableFileInputClass}
                                  aria-label={copy.corpShareholderAttachAria(j, label)}
                                />
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                  <p className="text-xs text-slate-500">{copy.shCorpFoot}</p>
                </>
              )}
            </fieldset>
          );
        })}
        <div>
          <label htmlFor="shareholderOtherNotes" className={labelClass}>
            {copy.shareholderNotesLabel}
          </label>
          <textarea
            id="shareholderOtherNotes"
            name="shareholderOtherNotes"
            rows={3}
            maxLength={4000}
            className={`${fieldClass} resize-y leading-relaxed`}
            placeholder={copy.shareholderNotesPlaceholder}
          />
        </div>
      </section>

      <section className="space-y-3">
        <h2 className={`${labelClass} text-base`}>{copy.directorRefTitle}</h2>
        <div className={infoBoxClass}>
          <ul className="m-0 list-disc space-y-1 pl-5">
            {copy.directorRefItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div>
          <label htmlFor="directorExtraInfo" className={labelClass}>
            {copy.directorExtraLabel}
          </label>
          <textarea
            id="directorExtraInfo"
            name="directorExtraInfo"
            rows={4}
            maxLength={8000}
            className={`${fieldClass} resize-y leading-relaxed`}
          />
        </div>
      </section>

      <div className="pt-2">
        <button
          type="submit"
          disabled={status === "loading"}
          className="rounded-xl bg-msv-navy px-8 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-msv-navy/90 disabled:opacity-60"
        >
          {status === "loading" ? copy.submitting : copy.submit}
        </button>
      </div>
    </form>
  );
}
