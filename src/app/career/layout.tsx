import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Careers at Paramount Diagnostic Lab | Edison, NJ",
  description:
    "Join our team at Paramount Diagnostic Lab. Explore career opportunities in clinical laboratory science and diagnostics in Edison, NJ.",
  alternates: { canonical: "/career" },
};

export default function CareerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
