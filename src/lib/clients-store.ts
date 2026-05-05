import type { Client } from "@/types/client";
import { sortClientsPublic as sortClientsPublicFn } from "@/lib/clients-sort";
import { prisma } from "@/lib/prisma";
import { withRecoverableDbRead } from "@/lib/prisma-read-fallback";

export type { Client } from "@/types/client";

export { sortClientsPublic } from "@/lib/clients-sort";

function toClient(row: {
  id: string;
  name: string;
  logoSrc: string | null;
  sector: string | null;
  website: string | null;
  note: string | null;
  sortOrder: number;
  showOnHome?: boolean | null;
  createdAt: Date;
  updatedAt: Date;
}): Client {
  return {
    id: row.id,
    name: row.name,
    logoSrc: row.logoSrc ?? undefined,
    sector: row.sector ?? undefined,
    website: row.website ?? undefined,
    note: row.note ?? undefined,
    sortOrder: row.sortOrder,
    showOnHome: Boolean(row.showOnHome),
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  };
}

export async function readClients(): Promise<Client[]> {
  return withRecoverableDbRead([], async () => {
    const rows = await prisma.client.findMany();
    return rows.map(toClient);
  });
}

const HOME_CLIENTS_MAX = 12;

/** 메인 하단 「주요 고객사」용 — `showOnHome`이 켜진 항목만, 정렬 순서 후 최대 12개 */
export async function readClientsForHome(): Promise<Client[]> {
  const all = await readClients();
  return sortClientsPublicFn(all.filter((c) => c.showOnHome)).slice(0, HOME_CLIENTS_MAX);
}

export async function writeClients(items: Client[]): Promise<void> {
  const data = items.map((c) => ({
    id: c.id,
    name: c.name,
    logoSrc: c.logoSrc ?? null,
    sector: c.sector ?? null,
    website: c.website ?? null,
    note: c.note ?? null,
    sortOrder: c.sortOrder,
    showOnHome: Boolean(c.showOnHome),
    createdAt: new Date(c.createdAt),
    updatedAt: new Date(c.updatedAt),
  }));
  await prisma.$transaction(async (tx) => {
    await tx.client.deleteMany();
    if (data.length) await tx.client.createMany({ data });
  });
}

