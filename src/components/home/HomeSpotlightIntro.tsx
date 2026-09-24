import { homeSpotlightLeadRow, homeTypo } from "@/lib/home-typography";

type Props = {
  id: string;
  eyebrow: string;
  title: string;
  paragraphs: readonly string[];
};

/** 홈 스포트라이트 — 라벨·제목·본문(2문단) */
export function HomeSpotlightIntro({ id, eyebrow, title, paragraphs }: Props) {
  return (
    <>
      <p className={homeSpotlightLeadRow}>
        <span className="w-0.5 shrink-0 bg-msv-navy/40" aria-hidden />
        <span className={homeTypo.leadInNavy}>{eyebrow}</span>
      </p>
      <h2 id={id} className={`mt-4 ${homeTypo.sectionHeadingNavy}`}>
        {title}
      </h2>
      <div className={`mt-4 space-y-3 ${homeTypo.body} break-keep`}>
        {paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
    </>
  );
}
