"use client";

import { usePathname } from "next/navigation";
import Script from "next/script";
import { GTM_ID } from "@/lib/site";

/**
 * Google Tag Manager (R2-23). The container is loaded on every public page by the
 * root layout. It leaves the admin out, so staff visits are not counted. (This is a
 * client component, not a PublicOnly child: a server-rendered child of PublicOnly would
 * still be sent to the browser in the admin's page data.)
 *
 * It loads only in a production build: `next dev` on a laptop must not send hits, but
 * Vercel's preview deployments are production builds, so Tag Manager's Preview mode
 * can be pointed at them.
 *
 * The script is the one Google gives for a container, run after the page is
 * interactive; the iframe is its fallback for visitors with JavaScript off.
 */
export function GoogleTagManager() {
  const pathname = usePathname();
  if (process.env.NODE_ENV !== "production" || pathname.startsWith("/admin")) return null;

  return (
    <>
      <Script id="google-tag-manager" strategy="afterInteractive">
        {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`}
      </Script>
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
          height="0"
          width="0"
          title="Google Tag Manager"
          style={{ display: "none", visibility: "hidden" }}
        />
      </noscript>
    </>
  );
}
