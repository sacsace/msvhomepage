export function memberByEmail<T extends { email: string }>(list: readonly T[], email: string): T | undefined {
  const key = email.toLowerCase();
  return list.find((m) => m.email.toLowerCase() === key);
}

/** DB 추가 경영진(sortOrder 오름차순) */
export function compareGreetingExtra(
  a: { sortOrder?: number; email: string },
  b: { sortOrder?: number; email: string },
): number {
  const ao = a.sortOrder ?? 100;
  const bo = b.sortOrder ?? 100;
  if (ao !== bo) return ao - bo;
  return a.email.toLowerCase().localeCompare(b.email.toLowerCase());
}
