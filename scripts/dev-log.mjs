/** 개발 스크립트 공통 로그 — 기본 조용, 오류는 항상 출력 */
export const devVerbose =
  process.env.MSV_DEV_VERBOSE === "1" || process.env.MSV_EMBEDDED_VERBOSE === "1";

export function devInfo(...args) {
  if (devVerbose) console.info(...args);
}

export function devWarn(...args) {
  console.warn(...args);
}

export function devError(...args) {
  console.error(...args);
}

/** 한 줄 성공 요약(기본 모드에서도 표시) */
export function devOk(...args) {
  console.info(...args);
}
