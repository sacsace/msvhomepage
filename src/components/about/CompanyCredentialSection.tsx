import { CompanyCredentialGalleryClient } from "@/components/about/CompanyCredentialGalleryClient";
import { SectionTitle } from "@/components/SectionTitle";
import { company, companyCredentialPreviews } from "@/lib/site-content";
import { publicFileExists } from "@/lib/public-file";

const cardSection = "rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8";

type Props = {
  title?: string;
  subtitle?: string;
};

export async function CompanyCredentialSection({
  title = "회사 증빙 서류",
  subtitle = `${company.shortName}의 법인 등록, 세무, 인증 및 운영 관련 주요 증빙 서류입니다. 모든 문서는 최신 상태로 관리되며, 고객사 검토 및 실무 진행 목적으로 제공됩니다.`,
}: Props) {
  const items = (
    await Promise.all(
      companyCredentialPreviews.map(async (x) => ((await publicFileExists(x.imageSrc)) ? x : null)),
    )
  ).filter((x): x is (typeof companyCredentialPreviews)[number] => Boolean(x));
  if (items.length === 0) return null;

  return (
    <section className={cardSection}>
      <SectionTitle
        eyebrow="Credentials"
        title={title}
        subtitle={subtitle}
        spacing="tight"
        density="compact"
        contentWidth="full"
      />
      <div className="mt-4">
        <CompanyCredentialGalleryClient items={items} />
      </div>
    </section>
  );
}
