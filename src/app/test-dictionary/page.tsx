import type { Metadata } from "next";
import testDirectoryData from "@/data/test-directory.json";
import DictionaryClient, { TestCategory } from "./DictionaryClient";
import BreadcrumbJsonLd from "@/component/BreadcrumbJsonLd";
import JsonLd from "@/component/JsonLd";
import { buildMedicalTestItemList } from "@/lib/testDictionarySchema";

export const metadata: Metadata = {
  title: "Test Directory — 180+ Lab Tests | Paramount Diagnostic Lab",
  description:
    "Browse 180+ lab tests with specimen, CPT, and turnaround details. Order with confidence at Paramount Diagnostic Lab, Edison NJ.",
  alternates: { canonical: "/test-dictionary" },
};

export default function DictionaryPage() {
  return (
    <>
      <BreadcrumbJsonLd label="Test Dictionary" path="/test-dictionary" />
      <JsonLd data={buildMedicalTestItemList()} />
      <DictionaryClient categories={testDirectoryData as TestCategory[]} />
    </>
  );
}
