/**
 * `data/tax-calendar.json` 내용으로 DB `TaxCalendarEvent` 테이블을 덮어씁니다.
 * `scripts/seed-tax-calendar.mjs` 로 JSON을 갱신한 뒤 필요 시 실행하세요.
 */
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { PrismaClient } from "../prisma/generated/client";
import type { TaxCalendarEvent } from "../src/types/tax-calendar-event";

const prisma = new PrismaClient();
const file = join(__dirname, "..", "data", "tax-calendar.json");

async function main() {
  if (!existsSync(file)) {
    console.error("Missing data/tax-calendar.json");
    process.exit(1);
  }
  const events = JSON.parse(readFileSync(file, "utf-8")) as TaxCalendarEvent[];
  if (!Array.isArray(events) || !events.length) {
    console.error("Invalid or empty tax-calendar.json");
    process.exit(1);
  }
  const data = events.map((e) => ({
    id: e.id,
    date: e.date,
    kind: e.kind,
    title: e.title ?? null,
    note: e.note ?? null,
    createdAt: new Date(e.createdAt),
    updatedAt: new Date(e.updatedAt),
  }));
  await prisma.$transaction(async (tx) => {
    await tx.taxCalendarEvent.deleteMany();
    await tx.taxCalendarEvent.createMany({ data });
  });
  console.log(`Imported ${data.length} tax calendar rows.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
