import type { Metadata } from "next";
import AdminDashboard from "./AdminDashboard";

export const metadata: Metadata = {
  title: "Admin | Paramount Diagnostic Lab",
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return <AdminDashboard />;
}
