import type { Announcement, AnnouncementListItem } from "@/types/announcement";
import { prisma } from "@/lib/prisma";
import { withRecoverableDbRead } from "@/lib/prisma-read-fallback";
import { textExcerpt } from "@/lib/richtext";

export type { Announcement, AnnouncementListItem } from "@/types/announcement";

function toAnnouncement(row: {
  id: string;
  title: string;
  body: string;
  pinned: boolean;
  createdAt: Date;
  updatedAt: Date;
}): Announcement {
  return {
    id: row.id,
    title: row.title,
    body: row.body,
    pinned: row.pinned,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  };
}

export async function readAnnouncements(): Promise<Announcement[]> {
  return withRecoverableDbRead([], async () => {
    const rows = await prisma.announcement.findMany();
    return rows.map(toAnnouncement);
  });
}

/** 공개 목록·홈 미리보기 — 본문은 DB에서 읽되 응답·캐시에는 짧은 `summary`만 포함 */
export async function readAnnouncementsListPublic(): Promise<AnnouncementListItem[]> {
  return withRecoverableDbRead([], async () => {
    const rows = await prisma.announcement.findMany({
      select: {
        id: true,
        title: true,
        body: true,
        pinned: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    return rows.map((row) => ({
      id: row.id,
      title: row.title,
      pinned: row.pinned,
      createdAt: row.createdAt.toISOString(),
      updatedAt: row.updatedAt.toISOString(),
      summary: textExcerpt(row.body, 200),
    }));
  });
}

export async function getAnnouncement(id: string): Promise<Announcement | null> {
  const row = await prisma.announcement.findUnique({ where: { id } });
  return row ? toAnnouncement(row) : null;
}

/** 대량 동기화(시드·스크립트 등) 전용 — 관리자 API는 단건 create/update/delete 사용 */
export async function writeAnnouncements(items: Announcement[]): Promise<void> {
  const data = items.map((a) => ({
    id: a.id,
    title: a.title,
    body: a.body,
    pinned: a.pinned,
    createdAt: new Date(a.createdAt),
    updatedAt: new Date(a.updatedAt),
  }));
  await prisma.$transaction(async (tx) => {
    await tx.announcement.deleteMany();
    if (data.length) await tx.announcement.createMany({ data });
  });
}

export async function createAnnouncement(item: Announcement): Promise<void> {
  await prisma.announcement.create({
    data: {
      id: item.id,
      title: item.title,
      body: item.body,
      pinned: item.pinned,
      createdAt: new Date(item.createdAt),
      updatedAt: new Date(item.updatedAt),
    },
  });
}

export async function updateAnnouncement(id: string, next: Announcement): Promise<void> {
  await prisma.announcement.update({
    where: { id },
    data: {
      title: next.title,
      body: next.body,
      pinned: next.pinned,
      updatedAt: new Date(next.updatedAt),
    },
  });
}

/** 삭제됐으면 true */
export async function deleteAnnouncement(id: string): Promise<boolean> {
  const r = await prisma.announcement.deleteMany({ where: { id } });
  return r.count > 0;
}

export function sortAnnouncementsPublic<T extends { pinned: boolean; createdAt: string }>(
  list: readonly T[],
): T[] {
  return [...list].sort((a, b) => {
    if (a.pinned !== b.pinned) return a.pinned ? -1 : 1;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });
}
