import { groupCompanies } from "@/lib/site-content";
import type { GroupCompany } from "@/types/group-company";

export function findGroupCompanyBySlug(slug: string): GroupCompany | undefined {
  return groupCompanies.find((g) => g.slug === slug);
}
