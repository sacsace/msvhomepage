import Script from "next/script";

/** Google Tag Manager — `NEXT_PUBLIC_GTM_ID` 또는 기본 컨테이너 */
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID?.trim() || "GTM-KQZR2GFW";

export function GoogleAnalytics() {
  if (!GTM_ID) return null;

  return (
    <>
      <Script id="gtm-datalayer" strategy="afterInteractive">
        {`
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
`}
      </Script>
      <Script
        src={`https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`}
        strategy="afterInteractive"
      />
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
          title="Google Tag Manager"
        />
      </noscript>
    </>
  );
}
