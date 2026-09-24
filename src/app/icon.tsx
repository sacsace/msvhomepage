import { ImageResponse } from "next/og";

/** Google 검색·브라우저용 PNG 파비콘 (SVG보다 수집·표시 안정적) — MSV 6점 원형 마크 */
export const size = { width: 48, height: 48 };
export const contentType = "image/png";

const DOTS: readonly [number, number][] = [
  [12, 16],
  [24, 16],
  [36, 16],
  [12, 32],
  [24, 32],
  [36, 32],
];

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0f2744",
          borderRadius: 24,
          position: "relative",
        }}
      >
        {DOTS.map(([cx, cy], i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: cx - 5,
              top: cy - 5,
              width: 10,
              height: 10,
              borderRadius: 5,
              background: "#ffffff",
            }}
          />
        ))}
      </div>
    ),
    { ...size },
  );
}
