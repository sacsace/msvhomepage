import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/layout/PageHeader";
import { StandardPageBody } from "@/components/layout/StandardPageBody";
import { SectionTitle } from "@/components/SectionTitle";
import { findGroupCompanyBySlug } from "@/lib/group-companies";
import { getRequestLocale } from "@/lib/get-request-locale";
import { staticPageSeo } from "@/lib/seo-metadata";
import { splitIntroParagraphs } from "@/lib/split-intro-paragraphs";
import { withLocalePrefix } from "@/lib/site-locale";
import { groupCompanies } from "@/lib/site-content";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return groupCompanies.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const g = findGroupCompanyBySlug(slug);
  if (!g) return { title: "그룹사" };
  return staticPageSeo(`/group/${g.slug}`, {
    title: g.legalName,
    absoluteTitle: `${g.legalName} | 그룹사`,
    description: `${g.legalName} — ${g.role}`,
  });
}

const cardSection = "rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8";

const bodyText = "text-sm leading-relaxed text-slate-600 break-keep";

/** 자료실 글 상세(`StandardPageBody width="3xl"`)와 동일한 읽기 폭 */
const introColumn = "mx-auto w-full max-w-3xl text-pretty";

export default async function GroupCompanyPage({ params }: Props) {
  const { slug } = await params;
  const g = findGroupCompanyBySlug(slug);
  if (!g) notFound();

  const locale = await getRequestLocale();
  const L = (path: string) => withLocalePrefix(path, locale);
  const aboutParagraphs = splitIntroParagraphs(g.intro);

  return (
    <>
      <PageHeader
        title={g.legalName}
        description={g.menuLabel === g.legalName ? g.role : `${g.menuLabel} — ${g.role}`}
        descriptionWide
      />
      <StandardPageBody className="space-y-12 sm:space-y-14">
        {g.website || g.profilePdf ? (
          <section className={cardSection}>
            <p className="msv-eyebrow">바로가기</p>
            <div className="mt-4 flex flex-wrap gap-3">
              {g.website ? (
                <a
                  href={g.website}
                  className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-msv-navy transition hover:border-msv-blue/35 hover:text-msv-blue"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  웹사이트
                </a>
              ) : null}
              {g.profilePdf ? (
                <a
                  href={g.profilePdf}
                  className="rounded-lg border border-msv-navy/40 bg-white px-4 py-2 text-sm font-semibold text-msv-navy transition hover:bg-msv-navy/5"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  비즈니스 소개 PDF
                </a>
              ) : null}
            </div>
          </section>
        ) : null}

        <section className={cardSection}>
          <div className={introColumn}>
            <SectionTitle
              eyebrow="About"
              title="소개"
              spacing="tight"
              density="compact"
              contentWidth="full"
            />
            <div className="mt-4 space-y-3">
              {aboutParagraphs.map((para, i) => (
                <p key={`${g.slug}-about-${i}`} className={`m-0 ${bodyText}`}>
                  {para}
                </p>
              ))}
            </div>
          </div>
        </section>

        {g.gallery && g.gallery.length > 0 ? (
          <section className={cardSection}>
            <SectionTitle
              eyebrow="Gallery"
              title="사진"
              spacing="tight"
              density="compact"
              headingLevel={3}
              contentWidth="full"
            />
            <ul className="mt-6 grid list-none gap-4 sm:grid-cols-2 sm:gap-5">
              {g.gallery.map((img) => (
                <li
                  key={img.src}
                  className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"
                >
                  <div className="relative aspect-[4/3] w-full bg-slate-100">
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1152px) 50vw, 560px"
                    />
                  </div>
                  {img.caption ? (
                    <p className="border-t border-slate-200 px-4 py-3 text-sm leading-relaxed text-slate-600 sm:px-5">
                      {img.caption}
                    </p>
                  ) : null}
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <section className={cardSection}>
          <div className={introColumn}>
            <SectionTitle
              eyebrow="Highlights"
              title="주요 내용"
              spacing="tight"
              density="compact"
              headingLevel={3}
              contentWidth="full"
            />
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate-600 marker:text-msv-blue">
              {g.highlights.map((h) => (
                <li key={h} className="pl-1">
                  {h}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-msv-blue-soft/15 p-6 sm:p-8">
          <p className={`${introColumn} ${bodyText}`}>
            그룹사 목록으로 돌아가거나 회사 소개를 이어서 보실 수 있습니다.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href={L("/group")}
              className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-msv-navy transition hover:border-msv-blue/35 hover:text-msv-blue"
            >
              그룹사 목록
            </Link>
            <Link
              href={L("/about")}
              className="rounded-lg border border-msv-navy/40 bg-white px-4 py-2 text-sm font-semibold text-msv-navy transition hover:bg-msv-navy/5"
            >
              회사 소개
            </Link>
          </div>
        </section>
      </StandardPageBody>
    </>
  );
}
