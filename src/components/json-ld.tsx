import { SITE_NAME, SITE_URL } from "@/lib/seo";

/**
 * Arama motorları için yapılandırılmış veri (schema.org, JSON-LD). Çalıştırılan betik değil, veri bloğudur; CSP'nin
 * betik kuralı onu engellemez. `<` kaçışı, içerikteki metnin bloğu kapatmasını önler.
 */
export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

export const ORGANIZATION = {
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: SITE_NAME,
  alternateName: "Tamga",
  url: SITE_URL,
  logo: {
    "@type": "ImageObject",
    url: `${SITE_URL}/logo-512.png`,
    width: 512,
    height: 512,
  },
  sameAs: [
    "https://github.com/tamga-network",
    "https://www.npmjs.com/org/tamga-network",
    "https://www.linkedin.com/company/tamganetwork/",
    "https://www.instagram.com/tamganetwork/",
  ],
};

/** Her sayfada: kurum + site (Google site adı ve bilgi paneli bunlardan okunur). */
export function siteGraph(description: string) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      { ...ORGANIZATION, description },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        name: SITE_NAME,
        alternateName: ["Tamga", "tamga.network"],
        url: SITE_URL,
        inLanguage: ["en", "tr", "tk"],
        publisher: { "@id": `${SITE_URL}/#organization` },
      },
    ],
  };
}
