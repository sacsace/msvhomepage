import { CompanyCredentialGalleryClient } from "@/components/about/CompanyCredentialGalleryClient";
import { SectionTitle } from "@/components/SectionTitle";
import { companyCredentialPreviews } from "@/lib/site-content";
import { publicFileExists } from "@/lib/public-file";

const cardSection = "rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8";

type Props = {
  title?: string;
  subtitle?: string;
};

export function CompanyCredentialSection({
  title = "회사 증빙 서류",
  subtitle = "원본 PDF 다운로드는 제공하지 않으며, 대외용으로 준비한 서류 첫 페이지 이미지입니다. 갱신 시 `npm run credentials:export` 로 `public/company-credentials/` PNG를 다시 만들 수 있습니다.",
}: Props) {
  const items = companyCredentialPreviews.filter((x) => publicFileExists(x.imageSrc));
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
