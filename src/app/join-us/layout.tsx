import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Join Our Provider Network | Paramount Diagnostic Lab",
  description:
    "Partner with Paramount Diagnostic Lab — physician and provider enrollment information for our Edison, NJ clinical laboratory.",
  alternates: { canonical: "/join-us" },
};

export default function JoinUsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
