import Image from "next/image";
import type { SiteLocale } from "@/lib/site-locale";

type Props = {
  locale: SiteLocale;
  /** 현재 히어로 슬라이드 id — 해당 인물을 살짝 강조 */
  focusId?: string;
};

type Figure = {
  id: string;
  slideIds: readonly string[];
  src: string;
  width: number;
  height: number;
  caption: Record<SiteLocale, string>;
};

const LEADERS: readonly Figure[] = [
  {
    id: "ceo",
    slideIds: ["software", "investment"],
    src: "/team/lee-minsub-hero.png?v=20261108d",
    width: 716,
    height: 1024,
    caption: {
      ko: "대표 / 이민섭",
      en: "CEO / Lee Min-seop",
      zh: "代表 / 李旻燮",
    },
  },
  {
    id: "ha",
    slideIds: ["operations"],
    src: "/team/ha-heonbeom-hero.png?v=20260925b",
    width: 686,
    height: 1013,
    caption: {
      ko: "하헌범 부대표 / 공인회계사",
      en: "Ha Heon-beom / CPA",
      zh: "河宪范 副社长 / CPA",
    },
  },
  {
    id: "kashul",
    slideIds: ["accounting"],
    src: "/team/ca-kashul-sharma.png?v=20261108c",
    width: 744,
    height: 819,
    caption: {
      ko: "카슐 샤르마 / 공인회계사",
      en: "Kashul Sharma / CA",
      zh: "Kashul Sharma / CA",
    },
  },
];

function focusClass(active: boolean, hasFocus: boolean) {
  if (!hasFocus) return "opacity-100";
  return active ? "opacity-100 brightness-100" : "opacity-65 brightness-[0.94]";
}

export function HeroTeamCollage({ locale, focusId }: Props) {
  const hasFocus = Boolean(focusId);

  return (
    <div className="pointer-events-none flex h-full w-full flex-col overflow-hidden px-5 pb-4 pt-6">
      <div className="relative z-10 shrink-0">
        <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.32em] text-msv-ink/50">
          Leadership
        </p>
        <ul className="mt-3 space-y-1">
          {LEADERS.map((f) => {
            const active = focusId ? f.slideIds.includes(focusId) : false;
            return (
              <li
                key={f.id}
                className={`font-sans text-[11px] leading-snug tracking-[-0.01em] transition-colors duration-300 ${
                  active ? "font-semibold text-msv-ink" : "text-msv-ink/60"
                }`}
              >
                {f.caption[locale]}
              </li>
            );
          })}
        </ul>
      </div>

      <div className="relative mt-2 min-h-0 flex-1">
        {/* 대표 — 뒤·우측 */}
        <figure
          className={`absolute bottom-[22%] right-[-4%] z-[1] w-[48%] transition duration-500 ${focusClass(
            Boolean(focusId && LEADERS[0].slideIds.includes(focusId)),
            hasFocus,
          )}`}
        >
          <Image
            src={LEADERS[0].src}
            alt=""
            width={LEADERS[0].width}
            height={LEADERS[0].height}
            unoptimized
            priority
            className="h-auto w-full object-contain object-bottom"
            sizes="18vw"
          />
        </figure>

        {/* 하헌범 — 좌측 크게 */}
        <figure
          className={`absolute bottom-[-2%] left-[-6%] z-[3] w-[72%] transition duration-500 ${focusClass(
            Boolean(focusId && LEADERS[1].slideIds.includes(focusId)),
            hasFocus,
          )}`}
        >
          <Image
            src={LEADERS[1].src}
            alt=""
            width={LEADERS[1].width}
            height={LEADERS[1].height}
            unoptimized
            priority
            className="h-auto w-full object-contain object-bottom"
            sizes="28vw"
          />
        </figure>

        {/* 카슐 — 앞·우측 */}
        <figure
          className={`absolute bottom-[-1%] right-[-2%] z-[4] w-[58%] transition duration-500 ${focusClass(
            Boolean(focusId && LEADERS[2].slideIds.includes(focusId)),
            hasFocus,
          )}`}
        >
          <Image
            src={LEADERS[2].src}
            alt=""
            width={LEADERS[2].width}
            height={LEADERS[2].height}
            unoptimized
            priority
            className="h-auto w-full object-contain object-bottom"
            sizes="22vw"
          />
        </figure>
      </div>
    </div>
  );
}
