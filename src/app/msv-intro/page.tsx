import { redirect } from "next/navigation";

/** 예전 주소 `/msv-intro` → MV System(Minsub Ventus System) 소개 */
export default function MsvIntroRedirectPage() {
  redirect("/mvs-intro");
}
