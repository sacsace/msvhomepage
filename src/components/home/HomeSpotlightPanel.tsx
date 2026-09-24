import Link from "next/link";
import { HomeSpotlightIntro } from "@/components/home/HomeSpotlightIntro";
import { SpotlightHighlightGrid } from "@/components/home/SpotlightHighlightGrid";
import { homeTypo } from "@/lib/home-typography";

type Props = {
  headingId: string;
  eyebrow: string;
  title: string;
  paragraphs: readonly string[];
  highlights: readonly string[];
  ctaHref: string;
  ctaLabel: string;
};

/** 홈 스포트라이트 — 밝은 배경 위 흰 카드 + 2열 번호 그리드 */
export function HomeSpotlightPanel({
  headingId,
  eyebrow,
  title,
  paragraphs,
  highlights,
  ctaHref,
  ctaLabel,
}: Props) {
  return (
    <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-md ring-1 ring-slate-900/5 sm:p-8 lg:p-10">
      <HomeSpotlightIntro id={headingId} eyebrow={eyebrow} title={title} paragraphs={paragraphs} />
      <SpotlightHighlightGrid items={highlights} />
      <Link href={ctaHref} className={`mt-7 inline-flex ${homeTypo.linkCta}`}>
        {ctaLabel}
      </Link>
    </div>
  );
}
