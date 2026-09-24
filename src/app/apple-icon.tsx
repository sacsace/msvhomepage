import { ImageResponse } from "next/og";

/** iOS/홈 화면용 — MSV 6점 원형 마크 */
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

const DOTS: readonly [number, number][] = [
  [45, 60],
  [90, 60],
  [135, 60],
  [45, 120],
  [90, 120],
  [135, 120],
];

export default function AppleIcon() {
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
          borderRadius: 90,
          position: "relative",
        }}
      >
        {DOTS.map(([cx, cy], i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: cx - 18,
              top: cy - 18,
              width: 36,
              height: 36,
              borderRadius: 18,
              background: "#ffffff",
            }}
          />
        ))}
      </div>
    ),
    { ...size },
  );
}
