import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { PrismaClient } from "./generated/client";
import bcrypt from "bcryptjs";
import type { Article } from "../src/types/article";
import type { Announcement } from "../src/types/announcement";
import type { QnaThread } from "../src/types/qna";
import type { Client } from "../src/types/client";
import type { StaffProfile } from "../src/types/staff-profile";
import type { MailSettings } from "../src/types/mail-settings";
import type { TaxCalendarEvent } from "../src/types/tax-calendar-event";
import type { OngoingTask } from "../src/types/ongoing-task";

const prisma = new PrismaClient();

const root = join(__dirname, "..");
const dataDir = join(root, "data");

function readJson<T>(file: string): T | null {
  const p = join(dataDir, file);
  if (!existsSync(p)) return null;
  try {
    return JSON.parse(readFileSync(p, "utf-8")) as T;
  } catch {
    return null;
  }
}

async function main() {
  const mail = readJson<Partial<MailSettings>>("mail-settings.json");
  await prisma.mailSettings.upsert({
    where: { id: 1 },
    create: {
      id: 1,
      host: String(mail?.host ?? ""),
      port: Number(mail?.port) || 587,
      secure: Boolean(mail?.secure),
      user: String(mail?.user ?? ""),
      pass: String(mail?.pass ?? ""),
      fromAddress: String(mail?.fromAddress ?? ""),
      toAddress:
        String(mail?.toAddress ?? "lee@msventures.in, info@msventures.in") ||
        "lee@msventures.in, info@msventures.in",
    },
    update: {
      host: String(mail?.host ?? ""),
      port: Number(mail?.port) || 587,
      secure: Boolean(mail?.secure),
      user: String(mail?.user ?? ""),
      pass: String(mail?.pass ?? ""),
      fromAddress: String(mail?.fromAddress ?? ""),
      toAddress:
        String(mail?.toAddress ?? "lee@msventures.in, info@msventures.in") ||
        "lee@msventures.in, info@msventures.in",
    },
  });

  const auth = readJson<{ passwordHash?: string }>("admin-auth.json");
  const fromFile = auth?.passwordHash?.trim();
  const passwordHash =
    fromFile && fromFile.length > 12 ? fromFile : bcrypt.hashSync("admin123", 10);
  await prisma.adminAuth.upsert({
    where: { id: 1 },
    create: { id: 1, passwordHash },
    update: { passwordHash },
  });

  if ((await prisma.article.count()) > 0) {
    console.log("Skip list tables — already seeded (article count > 0).");
    return;
  }

  const articles = readJson<Article[]>("articles.json");
  if (articles?.length) {
    await prisma.article.createMany({
      data: articles.map((a) => ({
        id: a.id,
        title: a.title,
        slug: a.slug,
        excerpt: a.excerpt,
        body: a.body,
        createdAt: new Date(a.createdAt),
        updatedAt: new Date(a.updatedAt),
      })),
    });
  }

  const announcements = readJson<Announcement[]>("announcements.json");
  if (announcements?.length) {
    await prisma.announcement.createMany({
      data: announcements.map((x) => ({
        id: x.id,
        title: x.title,
        body: x.body,
        pinned: x.pinned,
        createdAt: new Date(x.createdAt),
        updatedAt: new Date(x.updatedAt),
      })),
    });
  }

  const threads = readJson<QnaThread[]>("qna.json");
  if (threads?.length) {
    await prisma.qnaThread.createMany({
      data: threads.map((t) => ({
        id: t.id,
        title: t.title,
        body: t.body,
        author: t.author,
        createdAt: new Date(t.createdAt),
        answers: t.answers as object,
      })),
    });
  }

  const clients = readJson<Client[]>("clients.json");
  if (clients?.length) {
    await prisma.client.createMany({
      data: clients.map((c) => ({
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
      })),
    });
  }

  const profiles = readJson<StaffProfile[]>("staff-profiles.json");
  if (profiles?.length) {
    await prisma.staffProfile.createMany({
      data: profiles.map((p) => ({
        id: p.id,
        name: p.name,
        role: p.role,
        intro: p.intro,
        email: p.email ?? null,
        photoSrc: p.photoSrc ?? null,
        createdAt: new Date(p.createdAt),
        updatedAt: new Date(p.updatedAt),
      })),
    });
  }

  const events = readJson<TaxCalendarEvent[]>("tax-calendar.json");
  if (events?.length) {
    await prisma.taxCalendarEvent.createMany({
      data: events.map((e) => ({
        id: e.id,
        date: e.date,
        kind: e.kind,
        title: e.title ?? null,
        note: e.note ?? null,
        createdAt: new Date(e.createdAt),
        updatedAt: new Date(e.updatedAt),
      })),
    });
  }

  const tasks = readJson<OngoingTask[]>("ongoing-tasks.json");
  if (tasks?.length) {
    await prisma.ongoingTask.createMany({
      data: tasks.map((t) => ({
        id: t.id,
        title: t.title,
        body: t.body,
        createdAt: new Date(t.createdAt),
        updatedAt: new Date(t.updatedAt),
      })),
    });
  }

  const photos = readJson<Record<string, string>>("staff-photos.json");
  if (photos && typeof photos === "object" && !Array.isArray(photos)) {
    const entries = Object.entries(photos).filter(([, v]) => typeof v === "string" && v.length > 0);
    if (entries.length) {
      await prisma.staffPhoto.createMany({
        data: entries.map(([emailLower, path]) => ({ emailLower, path })),
      });
    }
  }

  const summaries = readJson<Record<string, string>>("leadership-summaries.json");
  if (summaries && typeof summaries === "object" && !Array.isArray(summaries)) {
    const entries = Object.entries(summaries).filter(([, v]) => typeof v === "string");
    if (entries.length) {
      await prisma.leadershipSummary.createMany({
        data: entries.map(([emailLower, summary]) => ({ emailLower, summary, summaryEn: "" })),
      });
    }
  }

  console.log("Seed completed.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
