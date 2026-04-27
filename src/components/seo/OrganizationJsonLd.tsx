import { company, siteUrl } from "@/lib/site-content";

/** Organization + WebSite 구조화 데이터(JSON-LD) */
export function OrganizationJsonLd() {
  const org = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: company.legalName,
    alternateName: company.shortName,
    url: siteUrl,
    logo: `${siteUrl}/msv-logo.png`,
    email: company.infoEmail,
    address: {
      "@type": "PostalAddress",
      streetAddress: company.address,
      addressCountry: "IN",
    },
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: company.shortName,
    url: siteUrl,
    publisher: { "@type": "Organization", name: company.legalName },
    inLanguage: "ko-KR",
  };

  const payload = [org, website];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(payload) }}
    />
  );
}
