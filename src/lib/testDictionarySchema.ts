import testDirectoryData from "@/data/test-directory.json";

const SITE_URL = "https://www.myparamountlab.com";

interface RawTest {
  id: string;
  code: string;
  name: string;
  subTests: string[];
  patientPreparation: string;
  tatForResult: string;
  cptCodes: string;
}

interface RawSection {
  tests: RawTest[];
}

interface RawCategory {
  sections: RawSection[];
}

// Builds an ItemList of MedicalTest schema from the full test directory so
// crawlers/AI systems have machine-readable test data even though the UI
// itself is a paginated client-side table. Only populated fields are
// included per test to keep payload size reasonable.
export function buildMedicalTestItemList() {
  const categories = testDirectoryData as RawCategory[];
  const itemListElement = categories
    .flatMap((category) => category.sections)
    .flatMap((section) => section.tests)
    .map((test, index) => {
      const medicalTest: Record<string, unknown> = {
        "@type": "MedicalTest",
        name: test.name,
        identifier: test.code || test.id,
        provider: { "@id": `${SITE_URL}/#business` },
      };
      if (test.subTests?.length) medicalTest.signDetected = test.subTests;
      if (test.patientPreparation) medicalTest.preparation = test.patientPreparation;
      if (test.cptCodes) medicalTest.code = { "@type": "MedicalCode", code: test.cptCodes, codingSystem: "CPT" };

      return {
        "@type": "ListItem",
        position: index + 1,
        item: medicalTest,
      };
    });

  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Lab Tests Offered at Paramount Diagnostic Lab",
    numberOfItems: itemListElement.length,
    itemListElement,
  };
}
