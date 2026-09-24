import { revalidatePath, revalidateTag } from "next/cache";
import { PUBLIC_COMPANY_HISTORY_CACHE_TAG } from "@/lib/public-page-data-cache";

/** 관리자 연혁 저장 후 공개 회사 소개 페이지 캐시를 갱신합니다. */
export function revalidateCompanyHistoryPublicCaches() {
  // Next 16: 관리자 저장 직후 공개 캐시를 즉시 만료 (Route Handler용)
  revalidateTag(PUBLIC_COMPANY_HISTORY_CACHE_TAG, { expire: 0 });
  for (const path of ["/about", "/en/about", "/zh/about"]) {
    revalidatePath(path);
  }
}
