import { prisma } from "@/lib/prisma";
import { isPrismaErrorCode, withRecoverableDbRead } from "@/lib/prisma-read-fallback";

export type LeadershipStaticProfileRow = {
  emailLower: string;
  name: string;
  role: string;
  updatedAt: Date;
};

type StaticProfileDelegate = {
  findMany: () => Promise<{ emailLower: string; name: string; role: string }[]>;
  upsert: (args: {
    where: { emailLower: string };
    create: { emailLower: string; name: string; role: string };
    update: { name: string; role: string };
  }) => Promise<unknown>;
};

function getStaticProfileDelegate(): StaticProfileDelegate | undefined {
  const d = (prisma as unknown as Record<string, unknown>)["leadershipStaticProfile"];
  if (!d || typeof d !== "object") return undefined;
  const findMany = (d as Record<string, unknown>)["findMany"];
  const upsert = (d as Record<string, unknown>)["upsert"];
  if (typeof findMany !== "function" || typeof upsert !== "function") return undefined;
  return d as StaticProfileDelegate;
}

let warnedMissingLeadershipStaticProfileTable = false;

/** `findMany` 전에 호출 — 테이블이 없으면 Prisma P2021 로그 없이 건너뜀 */
async function leadershipStaticProfileTableExists(): Promise<boolean> {
  try {
    const rows = await prisma.$queryRawUnsafe<{ ok: boolean }[]>(`
      SELECT EXISTS (
        SELECT 1
        FROM pg_catalog.pg_class c
        JOIN pg_catalog.pg_namespace n ON n.oid = c.relnamespace
        WHERE n.nspname = current_schema()
          AND c.relkind = 'r'
          AND c.relname = 'LeadershipStaticProfile'
      ) AS ok
    `);
    return Boolean(rows[0]?.ok);
  } catch {
    return true;
  }
}

/** site-content 기본 경영진 이메일 → 관리자가 덮어쓴 표시 이름·직함 */
export async function readLeadershipStaticProfiles(): Promise<Record<string, { name: string; role: string }>> {
  const delegate = getStaticProfileDelegate();
  if (!delegate) {
    if (process.env.NODE_ENV === "development") {
      console.warn(
        "[leadership-static-profile] Prisma에 LeadershipStaticProfile이 없습니다. dev 종료 후 `npx prisma generate`·`npx prisma db push` 하고 다시 실행하세요.",
      );
    }
    return {};
  }
  const exists = await leadershipStaticProfileTableExists();
  if (!exists) {
    if (process.env.NODE_ENV === "development" && !warnedMissingLeadershipStaticProfileTable) {
      warnedMissingLeadershipStaticProfileTable = true;
      console.warn(
        "[MSV] LeadershipStaticProfile 테이블이 DB에 없습니다. `web`에서 `npx prisma db push` 한 뒤 dev를 재시작하면 이름·직함 오버라이드가 적용됩니다.",
      );
    }
    return {};
  }
  return withRecoverableDbRead({}, async () => {
    const rows = await delegate.findMany();
    const map: Record<string, { name: string; role: string }> = {};
    for (const r of rows) {
      map[r.emailLower] = { name: r.name, role: r.role };
    }
    return map;
  });
}

export async function upsertLeadershipStaticProfile(
  emailLower: string,
  input: { name: string; role: string },
): Promise<void> {
  const delegate = getStaticProfileDelegate();
  if (!delegate) {
    throw new Error(
      "Prisma 클라이언트에 LeadershipStaticProfile이 없습니다. dev 서버를 종료한 뒤 `npx prisma generate` 및 `npx prisma db push` 후 다시 실행하세요.",
    );
  }
  if (!(await leadershipStaticProfileTableExists())) {
    throw new Error(
      "DB에 LeadershipStaticProfile 테이블이 없습니다. `web` 폴더에서 `npx prisma db push` 실행 후 다시 저장하세요.",
    );
  }
  const key = emailLower.trim().toLowerCase();
  try {
    await delegate.upsert({
      where: { emailLower: key },
      create: {
        emailLower: key,
        name: input.name.trim(),
        role: input.role.trim(),
      },
      update: {
        name: input.name.trim(),
        role: input.role.trim(),
      },
    });
  } catch (e: unknown) {
    if (isPrismaErrorCode(e, "P2021")) {
      throw new Error(
        "DB에 LeadershipStaticProfile 테이블이 없습니다. `web` 폴더에서 `npx prisma db push` 실행 후 다시 저장하세요.",
      );
    }
    throw e;
  }
}
