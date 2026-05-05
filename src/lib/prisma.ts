import { PrismaClient } from "@prisma-generated";
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

const databaseUrl = withPrismaQueryEngineTimeouts(
  withPrismaConnectionPoolHint(resolveDatabaseUrl()),
);
if (process.env.NODE_ENV !== "production") {
  process.env.DATABASE_URL = databaseUrl;
}

if (process.env.NODE_ENV === "development") {
  const preview =
    databaseUrl.length > 96 ? `${databaseUrl.slice(0, 96)}…` : databaseUrl;
  const redacted = preview.replace(/:([^:@/]+)@/, ":****@");
  console.info("[MSV] Prisma DATABASE_URL =", redacted);
}

if (g.prisma && g.prismaDatasourceUrl !== databaseUrl) {
  void g.prisma.$disconnect().catch(() => {});
  g.prisma = undefined;
  g.prismaDatasourceUrl = undefined;
}

/** `prisma generate` / HMR 후 글로벌 캐시가 예전 PrismaClient를 들고 있으면 새 model delegate가 없다 → 버리고 새로 만든다. */
function hasLeadershipStaticProfileDelegate(client: unknown): boolean {
  const d = (client as { leadershipStaticProfile?: { findMany?: unknown } })?.leadershipStaticProfile;
  return typeof d?.findMany === "function";
}

if (g.prisma && !hasLeadershipStaticProfileDelegate(g.prisma)) {
  void g.prisma.$disconnect().catch(() => {});
  g.prisma = undefined;
  g.prismaDatasourceUrl = undefined;
  if (process.env.NODE_ENV === "development") {
    console.warn(
      "[MSV] Prisma 싱글톤에 LeadershipStaticProfile이 없어 연결을 끊고 새 클라이언트를 만듭니다. (지속 시 `npx prisma generate` 후 dev 재시작)",
    );
  }
}

// Turbopack HMR 시 `PrismaClient` 클래스 참조가 바뀌어 `instanceof`가 매번 false가 되면
// 여기서 끊고 새로 만들면 연결이 계속 늘어납니다. 스키마 변경 후에는 dev 서버를 재시작하세요.

export const prisma =
  g.prisma ??
  new PrismaClient({
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

/** 개발·운영 모두 동일 프로세스에서 단일 클라이언트 유지 (Turbopack HMR·연결 고갈 방지) */
g.prisma = prisma;
g.prismaDatasourceUrl = databaseUrl;

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
