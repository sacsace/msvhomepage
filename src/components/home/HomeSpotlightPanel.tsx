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
    <div className="relative border-y border-msv-ink/15 py-12 sm:py-14">
      <div className="absolute left-0 top-0 h-3 w-3 border-l border-t border-msv-ink/30" aria-hidden />
      <div className="absolute right-0 top-0 h-3 w-3 border-r border-t border-msv-ink/30" aria-hidden />
      <div className="absolute bottom-0 left-0 h-3 w-3 border-b border-l border-msv-ink/30" aria-hidden />
      <div className="absolute bottom-0 right-0 h-3 w-3 border-b border-r border-msv-ink/30" aria-hidden />
      <HomeSpotlightIntro id={headingId} eyebrow={eyebrow} title={title} paragraphs={paragraphs} />
      <SpotlightHighlightGrid items={highlights} />
      <Link href={ctaHref} className={`mt-10 inline-flex ${homeTypo.linkCta}`}>
        {ctaLabel}
      </Link>
    </div>
  );
}
