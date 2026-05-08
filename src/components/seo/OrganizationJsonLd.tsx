import { company, siteUrl } from "@/lib/site-content";
import { absoluteSiteUrl } from "@/lib/seo-metadata";

/** Organization + WebSite 구조화 데이터(JSON-LD) */
export function OrganizationJsonLd() {
  const logoUrl = absoluteSiteUrl("/msv-wordmark.png");

  const org = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: company.legalName,
    alternateName: `${company.shortName} · minsub ventures`,
    url: siteUrl,
    logo: { "@type": "ImageObject", url: logoUrl, contentUrl: logoUrl },
    email: company.infoEmail,
    slogan: company.tagline,
    areaServed: { "@type": "Country", name: "India" },
    address: {
      "@type": "PostalAddress",
      streetAddress: company.address,
      addressLocality: "Bangalore",
      addressRegion: "Karnataka",
      addressCountry: "IN",
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer service",
        email: company.infoEmail,
        areaServed: "IN",
        availableLanguage: ["Korean", "English", "Chinese"],
      },
    ],
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: company.shortName,
    alternateName: company.legalName,
    url: siteUrl,
    inLanguage: ["ko-KR", "en-IN", "zh-CN"],
    publisher: { "@type": "Organization", name: company.legalName, url: siteUrl },
  };

  const payload = [org, website];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(payload) }}
    />
  );
}
