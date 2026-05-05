"use client";

import { useCallback, useRef, useState } from "react";

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
const thRow = "border-b border-slate-300 bg-slate-100 px-3 py-2 text-left font-semibold text-slate-800";
const tdLabel =
  "w-[min(40%,220px)] border-b border-slate-200 bg-slate-50/80 px-3 py-2 align-top font-medium text-slate-800";
const tdInput = "border-b border-slate-200 px-2 py-1.5 align-top";

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

export function CorporateIncorporationApplyForm() {
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
    setStatus("loading");
    setErrMsg("");
    const form = e.currentTarget;
    const fd = new FormData(form);
    try {
      const res = await fetch("/api/corporate-incorporation-apply", {
        method: "POST",
        body: fd,
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        setErrMsg(data.error || "전송에 실패했습니다.");
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
      setErrMsg("네트워크 오류가 발생했습니다.");
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
          신청이 접수되었습니다. 첨부하신 파일과 내용을 검토한 뒤 담당자가 연락드릴 수 있습니다.
        </p>
      ) : null}
      {status === "err" && errMsg ? (
        <p className="rounded-xl border border-red-200/80 bg-red-50/90 px-4 py-3.5 text-sm leading-relaxed text-red-900">
          {errMsg}
        </p>
      ) : null}

      <fieldset className="space-y-4 border-0 p-0">
        <legend className={`${labelClass} text-base`}>신청자 연락처</legend>
        <p className="text-xs text-slate-500">회신·보완 요청에 사용됩니다.</p>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="applicantName" className={labelClass}>
              이름 <span className="text-red-500">*</span>
            </label>
            <input id="applicantName" name="applicantName" required maxLength={120} className={fieldClass} />
          </div>
          <div>
            <label htmlFor="applicantEmail" className={labelClass}>
              이메일 <span className="text-red-500">*</span>
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
            전화 (선택)
          </label>
          <input id="applicantPhone" name="applicantPhone" type="tel" maxLength={40} className={fieldClass} />
        </div>
      </fieldset>

      <fieldset className="space-y-4 border-0 p-0">
        <legend className={`${labelClass} text-base`}>법인명 신청 순위 1~3위</legend>
        <div>
          <label htmlFor="corpName1" className={labelClass}>
            1순위 <span className="text-red-500">*</span>
          </label>
          <input id="corpName1" name="corpName1" required maxLength={200} className={fieldClass} />
        </div>
        <div>
          <label htmlFor="corpName2" className={labelClass}>
            2순위
          </label>
          <input id="corpName2" name="corpName2" maxLength={200} className={fieldClass} />
        </div>
        <div>
          <label htmlFor="corpName3" className={labelClass}>
            3순위
          </label>
          <input id="corpName3" name="corpName3" maxLength={200} className={fieldClass} />
        </div>
      </fieldset>

      <fieldset className="space-y-4 border-0 p-0">
        <legend className={`${labelClass} text-base`}>주소</legend>
        <div>
          <label htmlFor="addressFull" className={labelClass}>
            본점(또는 등기) 주소 <span className="text-red-500">*</span>
          </label>
          <textarea
            id="addressFull"
            name="addressFull"
            required
            rows={4}
            maxLength={2000}
            className={`${fieldClass} resize-y leading-relaxed`}
            placeholder="우편번호, 도로명/지번, 건물명·층수 등"
          />
        </div>
      </fieldset>

      <fieldset className="space-y-4 border-0 p-0">
        <legend className={`${labelClass} text-base`}>자본금</legend>
        <p className="text-xs text-slate-500">
          첫 칸(자본금)을 입력하면 납입자본금·수권자본금에 같은 값이 자동으로 채워집니다. 다르게 적어야 하면 뒤 두 칸만 따로 수정하세요.
        </p>
        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <label htmlFor="capitalSubscribed" className={labelClass}>
              자본금 (인수·발행 기준 등)
            </label>
            <input
              id="capitalSubscribed"
              name="capitalSubscribed"
              maxLength={120}
              className={fieldClass}
              placeholder="예: INR 10,000,000"
            />
          </div>
          <div>
            <label htmlFor="capitalPaidIn" className={labelClass}>
              납입자본금
            </label>
            <input
              id="capitalPaidIn"
              name="capitalPaidIn"
              maxLength={120}
              className={fieldClass}
              placeholder="예: INR 10,000,000"
            />
          </div>
          <div>
            <label htmlFor="capitalAuthorized" className={labelClass}>
              수권자본금 (Authorized)
            </label>
            <input
              id="capitalAuthorized"
              name="capitalAuthorized"
              maxLength={120}
              className={fieldClass}
              placeholder="예: INR 15,000,000"
            />
          </div>
        </div>
      </fieldset>

      <fieldset className="space-y-3 border-0 p-0">
        <legend className={`${labelClass} text-base`}>5. 지분구조</legend>
        <p className="text-xs text-slate-500">
          주주별로 개인 또는 법인(회사)을 선택하고, 이름과 지분율을 적어 주세요. 개인 주주가 등기이사와 동일이면「이사와 동일」에서 이사를 고르면 5번 이름이 등기이사 성명·8.1 이름·9번 이름과 맞춰지고, 연동 중에는 5번 이름을 바꾸면 이사·8.1 이름도 같이 바뀝니다. 이사의 연락처·주소 등(이름 제외)은 8.1에서 고치면 9번에 반영됩니다. (지분율은 주주별로만 입력합니다.)
        </p>
        <div className={tableWrap}>
          <table className={tableBase}>
            <thead>
              <tr>
                <th className={`${thRow} w-[100px]`}>구분</th>
                <th className={`${thRow} w-[min(34%,200px)]`}>주주 유형</th>
                <th className={`${thRow} w-[min(28%,160px)]`}>이사와 동일</th>
                <th className={thRow}>이름</th>
                <th className={`${thRow} w-[min(22%,120px)]`}>지분율</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: shareholderRows }, (_, i) => (
                <tr key={`sh-${i}`}>
                  <td className={tdLabel}>주주 {i + 1}</td>
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
                    <div className="flex flex-wrap gap-1" role="group" aria-label={`주주 ${i + 1} 유형`}>
                      <button
                        type="button"
                        onClick={() => setKindAt(i, "individual")}
                        className={`rounded-lg px-2.5 py-1.5 text-xs font-semibold transition ${
                          (shareholderKinds[i] ?? "individual") === "individual"
                            ? "bg-msv-navy text-white shadow-sm"
                            : "bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50"
                        }`}
                      >
                        개인
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
                        법인(회사)
                      </button>
                    </div>
                  </td>
                  <td className={`${tdInput} min-w-[140px]`}>
                    {(shareholderKinds[i] ?? "individual") === "individual" ? (
                      <select
                        className="w-full max-w-[220px] rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-xs text-slate-800 outline-none focus:border-msv-blue focus:ring-2 focus:ring-msv-blue/20"
                        aria-label={`주주 ${i + 1} 이사와 동일 여부`}
                        value={shareholderSameDirector[i] === null || shareholderSameDirector[i] === undefined ? "" : String(shareholderSameDirector[i])}
                        onChange={(e) => setSameDirectorAt(i, e.target.value)}
                      >
                        <option value="">아니오 (별도)</option>
                        {Array.from({ length: directorRows }, (_, d) => {
                          const taken = isDirectorLinkedElsewhere(d, i);
                          return (
                            <option
                              key={d}
                              value={String(d)}
                              disabled={taken}
                              title={taken ? "이미 다른 주주 행에 지정된 이사입니다." : undefined}
                            >
                              예 · 이사 {d + 1}과 동일
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
                      placeholder={(shareholderKinds[i] ?? "individual") === "company" ? "예: (주)○○" : "예: 홍길동"}
                      aria-label={`주주 ${i + 1} 이름`}
                    />
                  </td>
                  <td className={tdInput}>
                    <input
                      name={`shareholdingPct_${i}`}
                      maxLength={40}
                      className={tableFieldClass}
                      placeholder="예: 60%"
                      aria-label={`주주 ${i + 1} 지분율`}
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
        />
      </fieldset>

      <fieldset className="space-y-3 border-0 p-0">
        <legend className={`${labelClass} text-base`}>6. 등기이사</legend>
        <p className="text-xs text-slate-500">
          기본 2명입니다. 이사가 3명 이상이면「등기이사 추가」로 늘리면 8.1 영문 항목 블록도 함께 늘어납니다.
        </p>
        <div className={tableWrap}>
          <table className={tableBase}>
            <thead>
              <tr>
                <th className={`${thRow} w-[140px]`}>구분</th>
                <th className={thRow}>내용</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: directorRows }, (_, i) => {
                const nameLocked = isDirectorLinkedAsShareholder(i);
                return (
                  <tr key={`dir-${i}`}>
                    <td className={tdLabel}>이사 {i + 1}</td>
                    <td className={tdInput}>
                      <input
                        name={`directorName_${i}`}
                        maxLength={200}
                        readOnly={nameLocked}
                        title={nameLocked ? "성명은 5번 지분구조의 해당 주주 이름에서 입력하세요." : undefined}
                        className={`${tableFieldClass}${nameLocked ? " cursor-not-allowed bg-slate-100/90" : ""}`}
                        placeholder="성명 (여권과 동일 권장)"
                        aria-label={`등기이사 ${i + 1} 성명`}
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
          addLabel="등기이사 추가"
          removeLabel="마지막 등기이사 삭제"
          hideRemoveUnlessAboveMin
          addButtonClassName="rounded-lg border border-msv-navy/20 bg-msv-navy px-3 py-2 text-xs font-semibold text-white shadow-sm hover:bg-msv-navy/90 disabled:opacity-40"
        />
      </fieldset>

      <section className="space-y-6">
        <h2 className={`${labelClass} text-base`}>8.1 필요정보 (영문작성)</h2>
        <p className="text-xs text-slate-500">
          각 등기이사별로 영문으로 기재해 주세요. 해당 없음은 &quot;X&quot; 등으로 표시할 수 있습니다. 5번에서 해당 이사와「동일」로 연결된 주주가 있으면, 이름(첫 행)은 5번 지분 이름과 같게 맞춰지며 이 칸은 읽기 전용입니다. 같은 이사 블록 하단에서 여권·신분 관련 서류를 첨부할 수 있습니다.
        </p>
        {Array.from({ length: directorRows }, (_, i) => (
          <fieldset key={`dir-en-${i}`} className="space-y-0 border-0 p-0">
            <legend className="mb-2 text-sm font-semibold text-msv-navy">이사 {i + 1}</legend>
            <div className={tableWrap}>
              <table className={tableBase}>
                <thead>
                  <tr>
                    <th className={`${thRow} w-[min(42%,260px)]`}>구분</th>
                    <th className={thRow}>내용</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { label: "이름", name: `dirEn_${i}_name`, ph: "English name", max: 200 },
                    { label: "한국 휴대폰 번호", name: `dirEn_${i}_krPhone`, ph: "", max: 40 },
                    { label: "메일 주소", name: `dirEn_${i}_email`, ph: "email@example.com", max: 254 },
                    { label: "최종학력 & 학교 및 전공", name: `dirEn_${i}_education`, ph: "e.g. BA, University, Major", max: 400 },
                    { label: "출생일", name: `dirEn_${i}_dob`, ph: "YYYY-MM-DD", max: 40 },
                    { label: "출생지 (도시명)", name: `dirEn_${i}_pob`, ph: "City, Country", max: 120 },
                    { label: "현재 주소", name: `dirEn_${i}_address`, ph: "Full address (English)", max: 800 },
                    { label: "아버지 성함", name: `dirEn_${i}_fatherName`, ph: "Father's name (English)", max: 120 },
                    {
                      label: "인도내 회사 이사 등재 여부 및 보유 주식 수",
                      name: `dirEn_${i}_indiaOther`,
                      ph: "없으면 X",
                      max: 400,
                    },
                  ].map((row) => {
                    const dirNameLocked = isDirectorLinkedAsShareholder(i) && row.label === "이름";
                    return (
                      <tr key={row.name}>
                        <td className={tdLabel}>{row.label}</td>
                        <td className={tdInput}>
                          <input
                            name={row.name}
                            maxLength={row.max}
                            readOnly={dirNameLocked}
                            title={
                              dirNameLocked ? "이름은 5번 지분구조의 해당 주주 이름에서 입력하세요." : undefined
                            }
                            className={`${tableFieldClass}${dirNameLocked ? " cursor-not-allowed bg-slate-100/90" : ""}`}
                            placeholder={row.ph}
                          />
                        </td>
                      </tr>
                    );
                  })}
                  {(
                    [
                      { label: "여권 사본 첨부", name: `dirAttach_${i}_passport` as const },
                      { label: "영문 주민등록등본 첨부", name: `dirAttach_${i}_residence` as const },
                      { label: "증명 사진 첨부", name: `dirAttach_${i}_photo` as const },
                      { label: "운전면허증 사본 첨부", name: `dirAttach_${i}_license` as const },
                    ] as const
                  ).map((f) => (
                    <tr key={f.name}>
                      <td className={tdLabel}>{f.label}</td>
                      <td className={tdInput}>
                        <input
                          type="file"
                          name={f.name}
                          accept="image/*,.pdf,application/pdf"
                          className={tableFileInputClass}
                          aria-label={`이사 ${i + 1} ${f.label}`}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </fieldset>
        ))}
      </section>

      <section className="space-y-6">
        <h2 className={`${labelClass} text-base`}>9. 주주별 상세 정보</h2>
        <p className="text-xs text-slate-500">
          5번에서 선택한 유형(개인 / 법인)에 따라 입력란이 바뀝니다. 개인은 9.1.1 항목, 법인은 회사 정보 항목입니다. 이사와 동일로 연결된 개인 주주는 9번 입력란을 보이지 않게 하며, 6번·8.1을 수정한 뒤「이사 입력 다시 반영」으로 전송용 값을 맞춥니다.
        </p>
        {Array.from({ length: shareholderRows }, (_, j) => {
          const kind = shareholderKinds[j] ?? "individual";
          const linkedDir = shareholderSameDirector[j];
          const linked = kind === "individual" && linkedDir !== null && linkedDir !== undefined;
          return (
            <fieldset key={`sh-detail-${j}`} className="space-y-0 border-0 p-0">
              <legend className="mb-2 text-sm font-semibold text-msv-navy">
                주주 {j + 1} · {kind === "individual" ? "개인 (9.1.1)" : "법인(회사)"}
                {linked ? (
                  <span className="font-normal text-slate-600"> — 이사 {linkedDir + 1}과 동일 (5번에서 연동)</span>
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
                        이사 입력 다시 반영
                      </button>
                      <span className="text-xs text-slate-600">
                        이사와 동일 연동 중이라 주주 상세 입력란은 표시하지 않습니다. 5번 이름·6번·8.1을 수정한 뒤 버튼으로 제출 데이터를 맞추세요. (서류는 8.1 이사 첨부를 이용하세요.)
                      </span>
                    </div>
                  ) : null}
                  <div className={linked ? "sr-only" : undefined}>
                    <div className={tableWrap}>
                      <table className={tableBase}>
                        <thead>
                          <tr>
                            <th className={`${thRow} w-[min(42%,260px)]`}>구분</th>
                            <th className={thRow}>내용</th>
                          </tr>
                        </thead>
                        <tbody>
                          {[
                            { label: "이름", name: `shInd_${j}_name`, max: 200 },
                            { label: "국적", name: `shInd_${j}_nationality`, max: 80 },
                            { label: "휴대폰 번호", name: `shInd_${j}_mobile`, max: 40 },
                            { label: "이메일 주소", name: `shInd_${j}_email`, max: 254 },
                            { label: "최종학력 / 학교 및 전공", name: `shInd_${j}_education`, max: 400 },
                            { label: "출생일", name: `shInd_${j}_dob`, max: 40 },
                            { label: "출생지 (도시명)", name: `shInd_${j}_pob`, max: 120 },
                            { label: "인도 주소", name: `shInd_${j}_addrIndia`, max: 800 },
                            { label: "한국 주소", name: `shInd_${j}_addrKorea`, max: 800 },
                            { label: "아버지 성함", name: `shInd_${j}_fatherName`, max: 120 },
                            {
                              label: "인도 내 타회사 이사 등재 여부 및 보유 주식수",
                              name: `shInd_${j}_otherDir`,
                              max: 400,
                              placeholder: "없으면 X",
                            },
                          ].map((row) => (
                            <tr key={row.name}>
                              <td className={tdLabel}>{row.label}</td>
                              <td className={tdInput}>
                                <input
                                  name={row.name}
                                  maxLength={row.max}
                                  readOnly={linked}
                                  tabIndex={linked ? -1 : undefined}
                                  className={tableFieldClass}
                                  placeholder={"placeholder" in row ? row.placeholder : ""}
                                />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  {!linked ? (
                    <div className={`${infoBoxClass} mt-3`}>
                      <p className="m-0 mb-2 text-sm font-semibold text-msv-navy">주주가 개인인 경우 첨부되어야 할 파일</p>
                      <ol className="m-0 list-decimal space-y-1 pl-5 text-sm text-slate-700">
                        <li>여권 사본</li>
                        <li>영문 주민등록 등본</li>
                        <li>운전면허증 또는 주민등록증</li>
                      </ol>
                      <p className="mb-0 mt-2 text-xs text-slate-600">
                        해당 주주(개인)마다 위 서류를 준비해 담당자 안내에 따라 제출해 주세요. 민감정보는 마스킹하거나 암호화 ZIP 등 정책에 맞게 보내 주세요.
                      </p>
                    </div>
                  ) : null}
                </>
              ) : (
                <>
                  <div className={tableWrap}>
                    <table className={tableBase}>
                      <thead>
                        <tr>
                          <th className={`${thRow} w-[min(42%,260px)]`}>구분</th>
                          <th className={thRow}>내용</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          {
                            label: "회사 정식 명칭 (영문·현지어)",
                            name: `shCorp_${j}_legalName`,
                            max: 400,
                            ph: "Legal name as registered",
                          },
                          {
                            label: "등록국·등록번호 (CIN 등)",
                            name: `shCorp_${j}_regCountryNo`,
                            max: 300,
                            ph: "Country / registration number",
                          },
                          { label: "본점 주소", name: `shCorp_${j}_hqAddress`, max: 800, ph: "" },
                          { label: "대표자 성명·직책", name: `shCorp_${j}_rep`, max: 300, ph: "" },
                          { label: "지분율 (%)", name: `shCorp_${j}_sharePct`, max: 40, ph: "예: 40" },
                          { label: "회사 대표 이메일", name: `shCorp_${j}_email`, max: 254, ph: "" },
                          { label: "회사 대표 전화", name: `shCorp_${j}_phone`, max: 40, ph: "" },
                        ].map((row) => (
                          <tr key={row.name}>
                            <td className={tdLabel}>{row.label}</td>
                            <td className={tdInput}>
                              <input
                                name={row.name}
                                maxLength={row.max}
                                className={tableFieldClass}
                                placeholder={row.ph}
                              />
                            </td>
                          </tr>
                        ))}
                        {(
                          [
                            {
                              label: "법인 영문 사업자 등록증",
                              name: `shCorpAttach_${j}_businessRegEng` as const,
                            },
                            { label: "법인 정관", name: `shCorpAttach_${j}_articles` as const },
                            {
                              label: "법인 영문 주소 확인증 (세금 납부 확인증)",
                              name: `shCorpAttach_${j}_addressTaxProof` as const,
                            },
                            { label: "영문 이사 리스트", name: `shCorpAttach_${j}_directorsListEn` as const },
                            {
                              label: "영문 주주 명부 리스트 (주식 10% 이상)",
                              name: `shCorpAttach_${j}_shareholdersRegister10En` as const,
                            },
                          ] as const
                        ).map((f) => (
                          <tr key={f.name}>
                            <td className={tdLabel}>{f.label}</td>
                            <td className={tdInput}>
                              <input
                                type="file"
                                name={f.name}
                                accept="image/*,.pdf,application/pdf,.doc,.docx"
                                className={tableFileInputClass}
                                aria-label={`법인 주주 ${j + 1} ${f.label}`}
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <p className="text-xs text-slate-500">
                    법인 주주인 경우 위 표의 파일란에 PDF 등으로 첨부해 주세요.
                  </p>
                </>
              )}
            </fieldset>
          );
        })}
        <div>
          <label htmlFor="shareholderOtherNotes" className={labelClass}>
            주주 관련 추가 메모 (선택)
          </label>
          <textarea
            id="shareholderOtherNotes"
            name="shareholderOtherNotes"
            rows={3}
            maxLength={4000}
            className={`${fieldClass} resize-y leading-relaxed`}
            placeholder="특이 사항, 복수 국적, 추후 제출 예정 자료 등"
          />
        </div>
      </section>

      <section className="space-y-3">
        <h2 className={`${labelClass} text-base`}>등기이사 필요 정보 (참고)</h2>
        <div className={infoBoxClass}>
          <ul className="m-0 list-disc space-y-1 pl-5">
            <li>여권 사본(유효기간 확인) 및 바이오 페이지</li>
            <li>현지 주소 증빙(임대차·유틸리티 청구서 등, 요건은 주별 상이)</li>
            <li>증명사진(규격은 신청 시점 기준 안내)</li>
            <li>연락 가능 이메일·휴대전화</li>
            <li>DIN 보유 여부, 기존 인도 내 등기 이력이 있으면 기재</li>
            <li>상주이사(연 182일 이상 인도 체류) 해당 여부</li>
          </ul>
        </div>
        <div>
          <label htmlFor="directorExtraInfo" className={labelClass}>
            등기이사 관련 추가 기재
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
          {status === "loading" ? "전송 중…" : "신청서 보내기"}
        </button>
      </div>
    </form>
  );
}
