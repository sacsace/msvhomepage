import { redirect } from "next/navigation";

/** 예전 주소 `/qna` → 문의 페이지의 질의응답 구역 */
export default function QnaPage() {
  redirect("/contact");
}
