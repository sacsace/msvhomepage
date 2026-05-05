"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export type LicenseCardItem = {
  name: string;
  subtitle?: string;
  description: string;
  disableModal?: boolean;
  monochrome?: boolean;
  comingSoon?: boolean;
};

type Props = {
  items: readonly LicenseCardItem[];
};

function estimateTimeline(name: string): string {
  if (name === "ISO") return "심사 일정 포함 평균 4~8주";
  if (name === "Startup Certificate") return "요건 검토 포함 평균 2~6주";
  if (name === "ICEGATE" || name === "IEC") return "계정/코드 발급 기준 평균 1~3주";
  if (name === "EPCG" || name === "MOOWR" || name === "PIMS") return "사전 검토 포함 평균 3~8주";
  return "관할 기관·사업 유형에 따라 평균 2~6주";
}

function registrationOwner(name: string): string {
  switch (name) {
    case "FSSAI":
      return "식품 제조·유통·수입을 수행하는 법인(사업자) 명의로 등록합니다.";
    case "GST":
      return "과세 대상 거래를 수행하는 법인(사업자) 명의로 등록합니다.";
    case "PAN":
      return "인도 내 설립 법인(또는 사업자) 명의로 발급받아야 합니다.";
    case "IEC":
    case "ICEGATE":
    case "RCMC":
    case "EPCG":
    case "MOOWR":
    case "PIMS":
    case "SIMS":
    case "LUT":
      return "수출입 거래의 당사자인 법인(수입자/수출자) 명의로 등록·신고합니다.";
    case "Professional Tax":
      return "해당 주(State)에서 급여를 지급하는 고용주 법인이 등록·신고합니다.";
    case "Startup Certificate":
      return "스타트업 요건을 충족하는 법인(또는 LLP) 명의로 신청합니다.";
    case "Factory License":
    case "Fire NOC":
    case "Pollution NOC":
    case "S&E Registration":
    case "Trading License":
      return "사업장을 실제 운영하는 법인(사업자) 명의로 등록합니다.";
    case "CLRA":
      return "사업장 운영 주체(Principal Employer) 및 도급업체(Contractor)가 각자 해당 등록을 진행합니다.";
    case "Contractor License":
      return "계약근로자를 공급·운영하는 도급업체(Contractor) 명의로 신청합니다.";
    case "ISMW":
      return "주 간 이주 노동자를 고용하는 사업장 운영 법인이 등록 주체가 됩니다.";
    case "EPR Registration":
      return "생산자·수입자·브랜드소유자(PIBO) 해당 법인 명의로 등록합니다.";
    case "RERA Registration":
      return "부동산 프로젝트 시행사(Developer) 또는 중개업체(Agent) 명의로 등록합니다.";
    case "Legal Metrology":
      return "계량기·포장상품 관련 제조/수입/유통 주체 법인 명의로 등록합니다.";
    case "Digital Signature (DSC)":
      return "법인 대표자 또는 권한 위임된 서명권자 개인 명의로 발급받습니다.";
    case "ISO":
      return "인증 대상 조직(법인) 명의로 인증을 진행합니다.";
    case "Trademark":
      return "상표권 보유 주체(법인 또는 개인 사업자) 명의로 출원합니다.";
    case "Udyam":
    case "MSME":
      return "MSME 요건을 충족하는 사업자(법인/개인사업자/LLP) 명의로 등록합니다.";
    case "Capexile Certificate":
      return "해당 수출 품목의 실제 수출 주체 법인 명의로 등록합니다.";
    default:
      return "원칙적으로 해당 사업을 실제 수행하는 법인(사업자) 명의로 등록합니다.";
  }
}

function detailedDescriptions(name: string): readonly string[] {
  switch (name) {
    case "FSSAI":
      return [
        "FSSAI는 식품 제조·가공·보관·유통·수입 등 식품 밸류체인 전반에 적용되는 핵심 등록/면허 체계입니다. 사업 규모(소규모/주정부/중앙)와 취급 품목에 따라 등록 유형이 달라집니다.",
        "신청 단계에서는 사업장 정보, 취급 품목, 생산/유통 범위, 위생·안전 관련 자료를 기준으로 유형을 먼저 확정해야 하며, 유형 선택이 잘못되면 보완이나 재신청으로 일정이 지연될 수 있습니다.",
        "승인 이후에도 표시사항, 갱신 주기, 변경 신고(주소·품목·법인정보) 등 사후관리 요건이 중요하므로 초기 등록과 함께 운영 단계의 컴플라이언스 체계를 같이 설계하는 것이 안전합니다.",
      ];
    case "GST":
      return [
        "GST 등록은 단순 번호 발급을 넘어서, 사업 모델(상품/서비스), 거래 구조(B2B/B2C), 주(State)별 사업장 운영 방식에 맞게 세무 운영 체계를 세팅하는 과정입니다.",
        "초기 등록 시 업종·품목 코드, 사업장 정보, 대표자·승인권자 정보, 은행·연락처 정보 정확도가 중요하며, 이후 신고 체계와 인보이스 발행 규칙까지 연결해 설계해야 실무 오류를 줄일 수 있습니다.",
        "등록 후에는 정기 신고, 세액공제 관리, 공급지 규정 대응 등 운영 이슈가 이어지므로, 발급 이후 월별 운영 루틴까지 함께 정리하는 것이 일반적입니다.",
      ];
    case "IEC":
      return [
        "IEC는 인도 수출입 거래의 기본 식별 코드로, 해외 거래를 시작하기 전에 우선 확보해야 하는 핵심 등록입니다.",
        "코드 발급 자체는 비교적 빠른 편이지만, 은행·관세·물류 실무와 연결되는 정보 일치가 중요합니다. 법인 정보 불일치가 있으면 후속 단계에서 거래 지연이 발생할 수 있습니다.",
        "따라서 IEC 신청 시점에 회사 기본정보, 담당자 정보, 향후 수출입 품목/거래 흐름을 함께 점검해 두는 것이 안정적인 운영에 유리합니다.",
      ];
    case "ICEGATE":
      return [
        "ICEGATE는 인도 관세 전자 시스템 연계를 위한 관문으로, 수출입 신고·추적·통관 관련 전자 업무의 기반이 됩니다.",
        "등록 과정에서는 계정 권한, 사용자 정보, 연계 대상(법인/대리인) 구분이 중요하며, 초기 설정이 정확해야 실제 통관 단계에서 시행착오를 줄일 수 있습니다.",
        "계정 생성 후에도 권한 관리, 담당자 변경, 연계 정보 업데이트 같은 운영 관리가 필요하므로 등록 이후 관리 절차까지 함께 마련하는 것이 좋습니다.",
      ];
    case "RCMC":
      return [
        "RCMC는 수출 품목 및 업종에 맞는 수출진흥기관(Export Promotion Council 등)에 가입·등록해 발급받는 인증 성격의 문서입니다.",
        "어느 기관에 신청해야 하는지 업종 매핑이 핵심이며, 기관 선택이 잘못되면 보완 기간이 길어질 수 있어 사전 검토가 중요합니다.",
        "발급 후에는 갱신·변경 및 관련 수출 지원 제도 활용 여부를 함께 관리하면 실무 효율을 높일 수 있습니다.",
      ];
    case "EPCG":
      return [
        "EPCG는 자본재 수입 시 관세 혜택을 받는 대신 일정 기간 수출 의무를 이행하는 제도입니다. 신청 전 사업의 수출 계획과 설비 투자 계획을 함께 검토해야 합니다.",
        "승인 단계에서는 대상 설비, 사용 목적, 의무 이행 계획의 정합성이 중요하며, 승인 이후에는 의무 이행 추적과 증빙 관리가 핵심 관리 포인트가 됩니다.",
        "즉, EPCG는 발급 자체보다 사후 의무 관리가 더 중요한 라이센스이므로, 초기부터 모니터링 체계를 포함해 설계하는 것이 좋습니다.",
      ];
    case "MOOWR":
      return [
        "MOOWR는 보세창고 체계 내 제조·가공 운영을 허용하는 제도로, 관세 유예 효과와 운영 효율 측면에서 활용됩니다.",
        "적용 가능 여부는 공정 구조, 원자재/완제품 흐름, 창고 운영 방식에 따라 달라지므로 사전 구조 검토가 필요합니다.",
        "승인 후에는 재고·이동·가공 기록 관리 등 운영 컴플라이언스가 핵심이며, 문서화 수준이 실제 리스크를 크게 좌우합니다.",
      ];
    case "PIMS":
      return [
        "PIMS는 종이류 수입에 대한 사전 모니터링 등록 체계로, 수입 전 정해진 정보 등록과 일정 관리가 핵심입니다.",
        "품목 코드, 수량, 선적 일정 등의 정보 정합성이 중요하며, 등록 시점과 실제 선적/통관 일정이 어긋나면 운영 차질이 생길 수 있습니다.",
        "반복 수입 기업은 품목별 기준 정보와 내부 체크리스트를 표준화해 운영하면 실무 속도와 정확도를 동시에 확보할 수 있습니다.",
      ];
    default:
      return [
        "해당 등록은 사업 형태, 업종, 거래 구조, 사업장 위치(주/관할 기관)에 따라 요구 요건과 심사 포인트가 달라질 수 있습니다.",
        "초기에는 요건 적합성 검토와 문서 정합성 확보가 가장 중요하며, 접수 후 보완 요청을 신속히 대응할 수 있도록 자료 체계를 미리 갖추는 것이 효과적입니다.",
        "등록 후에도 갱신·변경 신고 및 관련 컴플라이언스 관리가 이어지므로, 발급 이후 운영 기준까지 함께 설계하는 것을 권장합니다.",
      ];
  }
}

export function LicenseCardsWithModal({ items }: Props) {
  const [selected, setSelected] = useState<LicenseCardItem | null>(null);

  useEffect(() => {
    if (!selected) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelected(null);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selected]);

  useEffect(() => {
    if (!selected) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [selected]);

  return (
    <>
      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => {
          const monochromeStyle = item.monochrome
            ? "border-slate-300 bg-slate-100 text-slate-700 hover:border-slate-400"
            : "border-slate-200 bg-white hover:border-msv-blue/35";

          if (item.disableModal) {
            return (
              <article
                key={item.name}
                className={`rounded-xl p-5 text-left shadow-sm transition ${monochromeStyle}`}
              >
                <h3 className={`text-3xl font-medium tracking-tight ${item.monochrome ? "text-slate-900" : "text-msv-navy"}`}>
                  {item.name}
                </h3>
                {item.subtitle ? (
                  <p className={`mt-1 text-[11px] ${item.monochrome ? "text-slate-600" : "text-slate-500"}`}>
                    {item.subtitle}
                  </p>
                ) : null}
                <p className={`mt-5 text-sm leading-relaxed line-clamp-3 ${item.monochrome ? "text-slate-700" : "text-slate-600"}`}>
                  {item.description}
                </p>
              </article>
            );
          }

          return (
            <button
              key={item.name}
              type="button"
              onClick={() => setSelected(item)}
              className={`rounded-xl p-5 text-left shadow-sm transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-msv-blue ${monochromeStyle}`}
            >
              <h3
                className={`text-3xl font-medium tracking-tight ${
                  item.monochrome ? "text-slate-700" : "text-msv-navy"
                }`}
              >
                {item.name}
              </h3>
              {item.subtitle ? (
                <p className={`mt-1 text-[11px] ${item.monochrome ? "text-slate-500" : "text-slate-500"}`}>
                  {item.subtitle}
                </p>
              ) : null}
              <p
                className={`mt-5 text-sm leading-relaxed line-clamp-3 ${
                  item.monochrome ? "text-slate-600" : "text-slate-600"
                }`}
              >
                {item.description}
              </p>
              {!item.monochrome ? (
                <p className="mt-3 text-xs font-semibold text-msv-blue">클릭하여 자세히 보기</p>
              ) : null}
            </button>
          );
        })}
      </div>

      {selected && typeof document !== "undefined"
        ? createPortal(
            <div
              className="fixed inset-0 z-[200] overflow-y-auto bg-slate-950/55 backdrop-blur-[2px]"
              role="dialog"
              aria-modal="true"
              aria-labelledby="license-modal-title"
            >
              <div
                className="flex min-h-[100dvh] justify-center px-4 pb-16 pt-12 sm:px-6 sm:pb-20 sm:pt-16"
                onClick={() => setSelected(null)}
              >
                <div
                  className="relative h-fit w-full max-w-2xl self-center rounded-3xl border border-slate-200/80 bg-white p-6 shadow-[0_25px_50px_-12px_rgba(15,23,42,0.25)] sm:p-8 sm:shadow-2xl"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0 pr-2">
                      <h3
                        id="license-modal-title"
                        className="text-2xl font-semibold tracking-[-0.02em] text-slate-900 sm:text-[1.65rem]"
                      >
                        {selected.name}
                      </h3>
                      {selected.subtitle ? (
                        <p className="mt-1.5 text-sm text-slate-500">{selected.subtitle}</p>
                      ) : null}
                    </div>
                    <button
                      type="button"
                      onClick={() => setSelected(null)}
                      className="shrink-0 rounded-xl border border-slate-200 bg-slate-50/80 px-3 py-1.5 text-sm font-medium text-slate-600 transition hover:border-slate-300 hover:bg-white hover:text-slate-900"
                      aria-label="팝업 닫기"
                    >
                      닫기
                    </button>
                  </div>

                  {selected.comingSoon ? (
                    <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5">
                      <p className="text-sm font-semibold text-slate-700">서비스 준비 중</p>
                    </div>
                  ) : (
                    <>
                      <p className="mt-6 text-[15px] leading-[1.65] text-slate-600">{selected.description}</p>

                      <div className="mt-5 rounded-2xl border border-msv-blue/25 bg-msv-blue-soft/25 p-5">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-msv-blue">
                          예상 소요 기간 (참고)
                        </p>
                        <p className="mt-2.5 text-sm leading-relaxed text-slate-700">
                          {estimateTimeline(selected.name)}
                        </p>
                      </div>

                      <div className="mt-4 rounded-2xl border border-slate-200/90 bg-slate-50/40 p-5">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500">
                          등록 주체 (누가 등록해야 하나요?)
                        </p>
                        <p className="mt-2.5 text-sm leading-relaxed text-slate-700">
                          {registrationOwner(selected.name)}
                        </p>
                      </div>

                      <div className="mt-4 rounded-2xl border border-slate-200/90 p-5">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500">
                          상세 설명
                        </p>
                        <div className="mt-3 space-y-3 text-sm leading-relaxed text-slate-700">
                          {detailedDescriptions(selected.name).map((line, idx) => (
                            <p key={`${selected.name}-detail-${idx}`}>{line}</p>
                          ))}
                        </div>
                      </div>

                      <div className="mt-4 rounded-2xl border border-amber-200/80 bg-amber-50/90 p-5">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-amber-800">
                          유의사항
                        </p>
                        <p className="mt-2.5 text-sm leading-relaxed text-amber-950/90">
                          실제 요구 문서와 처리 기간은 주(State), 관할 기관, 업종, 신청 시점에 따라 달라질 수
                          있으며, 접수 후 보완 요청이 발생할 수 있습니다.
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
