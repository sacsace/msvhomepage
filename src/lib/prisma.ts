import "server-only";

import { PrismaClient } from "@prisma-generated";
import { applyMsvEmbeddedDatabaseEnvFromDisk } from "@/lib/msv-embedded-env-merge";
import {
  resolveDatabaseUrl,
  withPrismaConnectionPoolHint,
  withPrismaQueryEngineTimeouts,
} from "@/lib/database-url";

type PrismaGlobal = {
  prisma?: PrismaClient;
  prismaDatasourceUrl?: string;
  __msvPrismaExitHooks?: boolean;
};

const g = globalThis as unknown as PrismaGlobal;

/** `resolveDatabaseUrl()` 은 `process.env`·embedded 병합 시점에 따라 달라질 수 있어 매 접근마다 평가합니다. */
function msvPrismaDatasourceUrl(): string {
  // instrumentation·next.config 와의 레이스로 첫 Prisma 접근이 `.env.local` 의 DATABASE_URL(예: 원격)만 본 뒤
  // 싱글톤이 고정되는 경우를 줄이기 위해, 연결 문자열 계산 직전에 embedded 병합을 한 번 더 시도합니다.
  applyMsvEmbeddedDatabaseEnvFromDisk();
  return withPrismaQueryEngineTimeouts(
    withPrismaConnectionPoolHint(resolveDatabaseUrl()),
  );
}

function logDevDatasourceOnce(databaseUrl: string): void {
  if (process.env.NODE_ENV !== "development") return;
  const preview =
    databaseUrl.length > 96 ? `${databaseUrl.slice(0, 96)}…` : databaseUrl;
  const redacted = preview.replace(/:([^:@/]+)@/, ":****@");
  console.info("[MSV] Prisma DATABASE_URL =", redacted);
}

function createPrismaClientForUrl(databaseUrl: string): PrismaClient {
  if (process.env.NODE_ENV !== "production") {
    process.env.DATABASE_URL = databaseUrl;
  }
  return new PrismaClient({
    datasources: {
      db: { url: databaseUrl },
    },
    log:
      process.env.MSV_LENIENT_DB_BUILD === "1"
        ? []
        : process.env.NODE_ENV === "development"
          ? ["error", "warn"]
          : ["error"],
  });
}

/**
 * `instrumentation-db-check` 등에서 DB URL 이 바뀐 뒤 재연결할 때 사용합니다.
 */
export function msvDisconnectAndResetPrismaSingleton(): void {
  void g.prisma?.$disconnect().catch(() => {});
  g.prisma = undefined;
  g.prismaDatasourceUrl = undefined;
}

/**
 * `prisma generate` / HMR 후 글로벌 캐시가 예전 PrismaClient를 들고 있으면 새 model delegate가 없다 → 버리고 새로 만든다.
 * 스키마에 모델을 추가할 때마다 여기에 해당 delegate 검사를 넣어 주세요.
 */
function prismaSingletonMatchesCurrentSchema(client: unknown): boolean {
  const c = client as {
    leadershipStaticProfile?: { findMany?: unknown };
    sitePageView?: { count?: unknown };
  };
  return (
    typeof c.leadershipStaticProfile?.findMany === "function" &&
    typeof c.sitePageView?.count === "function"
  );
}

function getOrCreatePrisma(): PrismaClient {
  const databaseUrl = msvPrismaDatasourceUrl();
  if (g.prisma && g.prismaDatasourceUrl !== databaseUrl) {
    void g.prisma.$disconnect().catch(() => {});
    g.prisma = undefined;
    g.prismaDatasourceUrl = undefined;
  }
  if (g.prisma && !prismaSingletonMatchesCurrentSchema(g.prisma)) {
    void g.prisma.$disconnect().catch(() => {});
    g.prisma = undefined;
    g.prismaDatasourceUrl = undefined;
    if (process.env.NODE_ENV === "development") {
      console.warn(
        "[MSV] Prisma 싱글톤이 현재 스키마와 맞지 않아 연결을 끊고 새 클라이언트를 만듭니다. (지속 시 `npx prisma generate` 후 dev 재시작)",
      );
    }
  }
  if (!g.prisma) {
    logDevDatasourceOnce(databaseUrl);
    g.prisma = createPrismaClientForUrl(databaseUrl);
    g.prismaDatasourceUrl = databaseUrl;
  }
  return g.prisma;
}

/**
 * 지연 평가: `instrumentation` 이 `next.config` 보다 먼저 돌거나 embedded 병합이 늦어도 최신 URL 로 클라이언트를 만듭니다.
 * 대부분의 코드는 기존처럼 `prisma.` 로 접근하면 됩니다.
 */
export const prisma = new Proxy({} as PrismaClient, {
  get(_target, prop, receiver) {
    const client = getOrCreatePrisma();
    const value = Reflect.get(client, prop, receiver) as unknown;
    if (typeof value === "function") {
      return (value as (...args: unknown[]) => unknown).bind(client);
    }
    return value;
  },
}) as PrismaClient;

/** 프로세스·dev 서버 종료 시 풀 연결을 정리해 로컬 Postgres 슬롯이 남지 않게 합니다. */
function registerPrismaDisconnectOnProcessEnd(): void {
  if (typeof process === "undefined") return;
  if (g.__msvPrismaExitHooks) return;
  g.__msvPrismaExitHooks = true;

  const disconnectLatest = () => {
    const gg = globalThis as unknown as PrismaGlobal;
    void gg.prisma?.$disconnect().catch(() => {});
  };

  process.once("beforeExit", disconnectLatest);
  process.once("SIGINT", disconnectLatest);
  process.once("SIGTERM", disconnectLatest);
  if (process.env.NODE_ENV === "development") {
    process.once("SIGUSR2", disconnectLatest);
  }
}
registerPrismaDisconnectOnProcessEnd();
