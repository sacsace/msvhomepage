import fs from "fs";
import path from "path";
import { resolveMsvWebRoot } from "./msv-web-root";

/**
 * 개발 모드에서 동일 메시지를 워커·프로세스 간 1회만 출력합니다.
 * `wait-embedded-ready.mjs` 가 세션 시작 시 플래그 파일을 정리합니다.
 */
export function logDevOnce(flagName: string, message: string): void {
  if (process.env.NODE_ENV === "production") return;

  const memKey = `__msvLog_${flagName}`;
  const g = globalThis as typeof globalThis & Record<string, boolean | undefined>;
  if (g[memKey]) return;

  const flagPath = path.join(resolveMsvWebRoot(), ".msv-embedded-pg", flagName);
  try {
    if (fs.existsSync(flagPath)) {
      g[memKey] = true;
      return;
    }
    fs.mkdirSync(path.dirname(flagPath), { recursive: true });
    fs.writeFileSync(flagPath, String(Date.now()), "utf8");
  } catch {
    /* 플래그 실패 시에도 한 번은 출력 */
  }

  g[memKey] = true;
  if (String(process.env.MSV_DEV_VERBOSE || "").trim() === "1") {
    console.info(message);
  }
}
