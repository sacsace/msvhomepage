import type { Client } from "@/types/client";

export function sortClientsPublic(list: Client[]): Client[] {
  return [...list].sort((a, b) => {
    if (a.sortOrder !== b.sortOrder) return a.sortOrder - b.sortOrder;
    return a.name.localeCompare(b.name, "ko");
  });
}
