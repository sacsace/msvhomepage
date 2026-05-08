import Image from "next/image";

/** 공식 가로 워드마크 — `public/msv-wordmark.png` */
export type MsvWordmarkTone = "default" | "onDark";

type Props = {
  alt: string;
  className?: string;
  /** Tailwind 높이 클래스 예: `h-7 sm:h-8` */
  heightClass?: string;
  /** 어두운 배경에서는 밝게 반전(네이비 원본 기준) */
  tone?: MsvWordmarkTone;
  priority?: boolean;
};

export function MsvWordmark({
  alt,
  className = "",
  heightClass = "h-7 sm:h-8",
  tone = "default",
  priority = false,
}: Props) {
  const onDark = tone === "onDark" ? "brightness-0 invert opacity-95" : "";
  return (
    <Image
      src="/msv-wordmark.png"
      alt={alt}
      width={640}
      height={160}
      priority={priority}
      /** 공개 `public` 정적 파일 — 프로덕션 `/_next/image` 최적화(Sharp·호스트) 차이로 크기가 무너지는 것을 막음 */
      unoptimized
      className={`${heightClass} w-auto min-w-[7.5rem] max-w-[min(240px,72vw)] shrink-0 origin-left scale-[0.95] object-contain object-left ${onDark} ${className}`.trim()}
      sizes="(max-width: 640px) 72vw, 240px"
    />
  );
}
