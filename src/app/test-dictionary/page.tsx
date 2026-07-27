import type { Metadata } from "next";
import testDirectoryData from "@/data/test-directory.json";
import DictionaryClient, { TestCategory } from "./DictionaryClient";

export const metadata: Metadata = {
  title: "Test Directory — 180+ Lab Tests | Paramount Diagnostic Lab",
  description:
    "Browse 180+ lab tests with specimen, CPT, and turnaround details. Order with confidence at Paramount Diagnostic Lab, Edison NJ.",
  alternates: { canonical: "/test-dictionary" },
};

export default function DictionaryPage() {
  return <DictionaryClient categories={testDirectoryData as TestCategory[]} />;
}
