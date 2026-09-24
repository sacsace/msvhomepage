import { revalidatePath, revalidateTag } from "next/cache";
import { PUBLIC_COMPANY_HISTORY_CACHE_TAG } from "@/lib/public-page-data-cache";

/** 관리자 연혁 저장 후 공개 회사 소개 페이지 캐시를 갱신합니다. */
export function revalidateCompanyHistoryPublicCaches() {
  revalidateTag(PUBLIC_COMPANY_HISTORY_CACHE_TAG);
  for (const path of ["/about", "/en/about", "/zh/about"]) {
    revalidatePath(path);
  }
}
