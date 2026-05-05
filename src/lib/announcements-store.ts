import type { Announcement } from "@/types/announcement";
import { prisma } from "@/lib/prisma";
import { withRecoverableDbRead } from "@/lib/prisma-read-fallback";

export type { Announcement } from "@/types/announcement";

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

export function sortAnnouncementsPublic(list: Announcement[]): Announcement[] {
  return [...list].sort((a, b) => {
    if (a.pinned !== b.pinned) return a.pinned ? -1 : 1;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });
}
