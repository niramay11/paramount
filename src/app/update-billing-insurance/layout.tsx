import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Update Billing & Insurance Info | Paramount Diagnostic Lab",
  description:
    "Submit updated billing and insurance information to Paramount Diagnostic Lab, Edison, NJ.",
  alternates: { canonical: "/update-billing-insurance" },
};

export default function UpdateBillingInsuranceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
