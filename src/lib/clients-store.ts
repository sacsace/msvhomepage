import { promises as fs } from "fs";
import path from "path";
import type { Client } from "@/types/client";

export type { Client } from "@/types/client";

const dataFile = path.join(process.cwd(), "data", "clients.json");

async function ensureDir() {
  await fs.mkdir(path.dirname(dataFile), { recursive: true });
}

export async function readClients(): Promise<Client[]> {
  await ensureDir();
  try {
    const raw = await fs.readFile(dataFile, "utf-8");
    const parsed = JSON.parse(raw) as Client[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export async function writeClients(items: Client[]): Promise<void> {
  await ensureDir();
  await fs.writeFile(dataFile, JSON.stringify(items, null, 2), "utf-8");
}

export function sortClientsPublic(list: Client[]): Client[] {
  return [...list].sort((a, b) => {
    if (a.sortOrder !== b.sortOrder) return a.sortOrder - b.sortOrder;
    return a.name.localeCompare(b.name, "ko");
  });
}
