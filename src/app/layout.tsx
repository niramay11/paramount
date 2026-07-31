import type { Metadata } from "next";
import { Poppins, Sora, Inter, Open_Sans } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";
import ConditionalHeader from "@/component/ConditionalHeader";
import JsonLd from "@/component/JsonLd";
import MotionProvider from "@/component/MotionProvider";

const GA_MEASUREMENT_ID = "G-JNRBVHE7MV";

const SITE_URL = "https://www.myparamountlab.com";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title:
    "Paramount Diagnostic Lab – Accurate, Reliable, and Compassionate Diagnostics",
  description:
    "Paramount Diagnostic Lab provides advanced diagnostic testing in New Jersey with precision, quality, and care. CLIA-certified and state-licensed, we ensure reliable results for healthcare providers and patients.",
  authors: [{ name: "Paramount Diagnostic Lab" }],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title:
      "Paramount Diagnostic Lab – Accurate, Reliable, and Compassionate Diagnostics",
    description:
      "Providing advanced diagnostic testing in New Jersey with precision, quality, and care. CLIA-certified and state-licensed laboratory services.",
    url: SITE_URL,
    siteName: "Paramount Diagnostic Lab",
    images: [
      {
        url: "/about_hero.png",
        width: 1200,
        height: 630,
        alt: "Paramount Diagnostic Lab",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Paramount Diagnostic Lab – Accurate, Reliable, and Compassionate Diagnostics",
    description:
      "Advanced diagnostic testing in New Jersey with precision and care. CLIA-certified and state-licensed laboratory.",
    images: ["/about_hero.png"],
  },
};

const medicalBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalClinic",
  "@id": `${SITE_URL}/#business`,
  name: "Paramount Diagnostic Lab",
  url: SITE_URL,
  image: `${SITE_URL}/about_hero.png`,
  telephone: "+19088348034",
  email: "info@myparamountlab.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "2177 Oak Tree Rd, Ste 208",
    addressLocality: "Edison",
    addressRegion: "NJ",
    postalCode: "08820",
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 40.4311,
    longitude: -74.3774,
  },
  medicalSpecialty: "Pathology",
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ],
    opens: "07:00",
    closes: "18:00",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`
          ${poppins.variable}
          ${sora.variable}
          ${inter.variable}
          ${openSans.variable}
          antialiased
        `}
      >
        <JsonLd data={medicalBusinessJsonLd} />
        <MotionProvider>
          <ConditionalHeader />
          {children}
        </MotionProvider>
        <GoogleAnalytics gaId={GA_MEASUREMENT_ID} />
      </body>
    </html>
  );
}
