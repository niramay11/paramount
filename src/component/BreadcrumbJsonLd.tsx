import JsonLd from "@/component/JsonLd";

const SITE_URL = "https://www.myparamountlab.com";

export default function BreadcrumbJsonLd({
  label,
  path,
}: {
  label: string;
  path: string;
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: SITE_URL,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: label,
            item: `${SITE_URL}${path}`,
          },
        ],
      }}
    />
  );
}
