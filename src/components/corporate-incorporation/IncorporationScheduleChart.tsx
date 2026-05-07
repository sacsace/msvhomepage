/** 인도 법인 설립 예시 일정(일 단위). 관청·서류에 따라 달라질 수 있습니다. */
const TOTAL_DAYS = 89;

/** 사업자 등록증(등기 완료) 발급 예상 시점 — 일정표 기준 */
const MILESTONE_DAY = 43;

const SCHEDULE_ROWS = [
  { label: "법인명 사용 허가", start: 1, end: 12 },
  { label: "공증/아포스티유 서류 준비", start: 13, end: 14 },
  { label: "공증/아포스티유 작성 (한국)", start: 15, end: 24 },
  { label: "기업관리국 법인 설립 서류 제출 및 심사", start: 26, end: 42 },
  { label: "법인 계좌 등록", start: 43, end: 49 },
  { label: "자본금 납부 및 인도 법인 계좌 입금 확인", start: 50, end: 58 },
  { label: "해외투자금 신고 (인도 중앙은행 심사)", start: 59, end: 74 },
  { label: "GST 신청", start: 50, end: 78 },
  { label: "수출입 코드 신청", start: 79, end: 79 },
  { label: "연금보험/건강보험", start: 51, end: 58 },
  { label: "주재원 비자 서류 준비 (사업주 및 취업비자)", start: 44, end: 48 },
  { label: "MSME (중소기업청 인증) 등록", start: 79, end: 81 },
  { label: "PT (전문세/갑급세) 등록", start: 79, end: 83 },
  { label: "ICEGate (관세청) 등록", start: 79, end: 89 },
] as const;

function barStyle(start: number, end: number): { leftPct: number; widthPct: number } {
  const leftPct = ((start - 1) / TOTAL_DAYS) * 100;
  const widthPct = ((end - start + 1) / TOTAL_DAYS) * 100;
  return { leftPct, widthPct };
}

const milestoneLeftPct = ((MILESTONE_DAY - 1) / TOTAL_DAYS) * 100;

/** 항목 최대 2줄·막대·기간 행 높이 맞춤 (10px 기준 약 2줄) */
const rowCell = "flex min-h-[2.625rem] items-center";

export function IncorporationScheduleChart() {
  return (
    <div className="mt-8">
      <h3 className="text-sm font-semibold tracking-tight text-msv-navy sm:text-base">
        설립 진행 일정표 (일 단위 예시)
      </h3>
      <div className="mt-3 overflow-x-auto rounded-xl border border-slate-200 bg-slate-50/80 p-3 sm:p-4">
        <div className="flex min-w-[36rem] gap-2 sm:min-w-[44rem] sm:gap-2.5">
          <div className="flex w-[10.5rem] shrink-0 flex-col gap-1.5 sm:w-[12.5rem]">
            <div className={`${rowCell} h-6 min-h-6 text-[10px] font-semibold text-slate-500 sm:text-[11px]`}>
              항목
            </div>
            {SCHEDULE_ROWS.map((row) => (
              <div key={row.label} className={`${rowCell} min-w-0`}>
                <p
                  className="w-full text-left text-[10px] leading-tight text-slate-700 line-clamp-2 break-words sm:text-[11px]"
                  title={row.label}
                >
                  {row.label}
                </p>
              </div>
            ))}
          </div>

          <div className="relative min-h-0 min-w-0 flex-1">
            <div
              className="pointer-events-none absolute bottom-0 top-0 z-20 w-px bg-red-500"
              style={{ left: `${milestoneLeftPct}%` }}
              aria-hidden
            />
            <div
              className={`relative z-10 flex h-6 min-h-6 shrink-0 items-end border-b border-slate-200/90 pb-0.5 text-[9px] sm:text-[10px]`}
            >
              <span className="absolute bottom-0.5 left-0 tabular-nums text-slate-500">1일차</span>
              <span
                className="absolute bottom-0.5 -translate-x-1/2 font-semibold tabular-nums text-red-600"
                style={{ left: `${milestoneLeftPct}%` }}
              >
                {MILESTONE_DAY}일차
              </span>
              <span className="absolute bottom-0.5 right-0 tabular-nums text-slate-500">{TOTAL_DAYS}일차</span>
            </div>
            <div className="mt-1.5 flex flex-col gap-1.5">
              {SCHEDULE_ROWS.map((row) => {
                const { leftPct, widthPct } = barStyle(row.start, row.end);
                return (
                  <div key={row.label} className={`${rowCell} min-w-0`}>
                    <div
                      className="relative h-7 w-full shrink-0 rounded-md bg-white ring-1 ring-slate-200/80"
                      role="img"
                      aria-label={`${row.label}: ${row.start}일차부터 ${row.end}일차까지`}
                    >
                      <div
                        className="absolute inset-y-0.5 z-[5] rounded-sm bg-msv-blue/90 shadow-sm"
                        style={{
                          left: `${leftPct}%`,
                          width: `${Math.max(widthPct, 0.55)}%`,
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex w-[3.25rem] shrink-0 flex-col gap-1.5 sm:w-16">
            <div
              className={`${rowCell} h-6 min-h-6 justify-end text-[10px] font-semibold text-slate-500 sm:text-[11px]`}
            >
              기간
              <span className="sr-only"> 일차</span>
            </div>
            {SCHEDULE_ROWS.map((row) => (
              <div
                key={`${row.label}-range`}
                className={`${rowCell} justify-end text-right text-[9px] tabular-nums text-slate-500 sm:text-[10px]`}
              >
                {row.start === row.end ? `${row.start}` : `${row.start}–${row.end}`}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-3 flex flex-wrap items-start gap-2 border-t border-slate-200 pt-3 text-[11px] leading-snug text-slate-600 sm:text-xs">
          <span className="mt-0.5 inline-flex h-3.5 w-px shrink-0 bg-red-500" aria-hidden />
          <p>
            <strong className="font-semibold text-msv-navy">빨간 세로선</strong>:{" "}
            <strong>{MILESTONE_DAY}일차</strong> — 사업자 등록증 발급 예상일(예시)
          </p>
        </div>
      </div>
      <p className="mt-2 text-[11px] leading-relaxed text-slate-500 sm:text-xs">
        병행 업무(GST·비자 등)가 겹치는 구간은 막대가 동시에 표시됩니다. 실제 소요는 주(邦)·은행·서류 보완에 따라
        달라질 수 있습니다.
      </p>
    </div>
  );
}
