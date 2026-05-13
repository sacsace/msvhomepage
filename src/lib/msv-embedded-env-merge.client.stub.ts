/**
 * Webpack 클라이언트 번들 전용 스tub.
 * 실제 `msv-embedded-env-merge.ts`는 Node(fs)·instrumentation·Prisma에서만 사용됩니다.
 */
export function resolveMsvWebRoot(fallback: string = ""): string {
  return fallback;
}

export function applyMsvEmbeddedDatabaseEnvFromDisk(_cwd?: string): boolean {
  return false;
}
