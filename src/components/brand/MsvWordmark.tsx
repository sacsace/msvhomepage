import Image from "next/image";

/** 가로 워드마크 — 기본 `public/msv-wordmark.png`, 헤더는 `imageSrc` 로 전용 PNG 가능 */
export type MsvWordmarkTone = "default" | "onDark";

type Props = {
  alt: string;
  className?: string;
  /** Tailwind 높이 클래스 — 헤더는 `h-8 sm:h-9` 정도가 한 줄에 맞음 */
  heightClass?: string;
  /** 어두운 배경에서는 밝게 반전(네이비 원본 기준) */
  tone?: MsvWordmarkTone;
  priority?: boolean;
  /** 기본 `/msv-wordmark.png` — 헤더는 `/msv-wordmark-header.png` */
  imageSrc?: string;
  /** `imageSrc` 지정 시 비율(기본 1024×102) */
  imageWidth?: number;
  imageHeight?: number;
};

export function MsvWordmark({
  alt,
  className = "",
  heightClass = "h-8 sm:h-9",
  tone = "default",
  priority = false,
  imageSrc = "/msv-wordmark.png",
  imageWidth = 1024,
  imageHeight = 102,
}: Props) {
  const onDark = tone === "onDark" ? "brightness-0 invert opacity-95" : "";
  return (
    <Image
      src={imageSrc}
      alt={alt}
      width={imageWidth}
      height={imageHeight}
      priority={priority}
      /** 공개 `public` 정적 파일 — 프로덕션 `/_next/image` 최적화(Sharp·호스트) 차이로 크기가 무너지는 것을 막음 */
      unoptimized
      className={`bg-transparent ${heightClass} w-auto min-w-[7.5rem] max-w-[min(260px,78vw)] shrink-0 object-contain object-left ${onDark} ${className}`.trim()}
      sizes="(max-width: 640px) 78vw, 260px"
    />
  );
}
