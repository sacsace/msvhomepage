/** 공식 CI: 네이비 원형 필드 위 흰색 6점(2×3) 마크 — 헤더 등에 사용 */
export function MsvMark({ className = "h-9 w-9 shrink-0" }: { className?: string }) {
  return (
    <svg
      className={`rounded-full ${className}`}
      viewBox="0 0 96 96"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <circle cx="48" cy="48" r="48" fill="#0f2744" />
      <circle cx="24" cy="32" r="10" fill="#ffffff" />
      <circle cx="48" cy="32" r="10" fill="#ffffff" />
      <circle cx="72" cy="32" r="10" fill="#ffffff" />
      <circle cx="24" cy="64" r="10" fill="#ffffff" />
      <circle cx="48" cy="64" r="10" fill="#ffffff" />
      <circle cx="72" cy="64" r="10" fill="#ffffff" />
    </svg>
  );
}
