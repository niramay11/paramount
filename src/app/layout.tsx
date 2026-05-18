import type { Metadata } from "next";
import { Poppins, Sora, Inter, Open_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/component/Header";

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
  title:
    "Paramount Diagnostic Lab – Accurate, Reliable, and Compassionate Diagnostics",
  description:
    "Paramount Diagnostic Lab provides advanced diagnostic testing in New Jersey with precision, quality, and care. CLIA-certified and state-licensed, we ensure reliable results for healthcare providers and patients.",
  keywords: [
    "Paramount Diagnostic Lab",
    "CLIA certified lab",
    "New Jersey diagnostics",
    "pathology lab",
    "radiology services",
    "accurate lab testing",
    "medical diagnostics",
    "healthcare lab NJ",
  ],
  authors: [{ name: "Paramount Diagnostic Lab" }],
  openGraph: {
    title:
      "Paramount Diagnostic Lab – Accurate, Reliable, and Compassionate Diagnostics",
    description:
      "Providing advanced diagnostic testing in New Jersey with precision, quality, and care. CLIA-certified and state-licensed laboratory services.",
    url: "https://www.paramountdiagnosticlab.com", // replace with actual URL
    siteName: "Paramount Diagnostic Lab",
    images: [
      {
        url: "/og-image.png", // add an Open Graph image in public folder
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
    images: ["/og-image.png"], // same as Open Graph image
    site: "@ParamountLab", // replace with actual Twitter handle
    creator: "@ParamountLab", // replace with actual handle if exists
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
        <Header />
        {children}
      </body>
    </html>
  );
}
