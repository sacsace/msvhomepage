import { groupCompanies } from "@/lib/site-content";

export function findGroupCompanyBySlug(slug: string) {
  return groupCompanies.find((g) => g.slug === slug);
}
