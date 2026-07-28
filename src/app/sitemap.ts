import type { MetadataRoute } from "next";
import { execSync } from "child_process";

const BASE_URL = "https://www.myparamountlab.com";

const routes = [
  { path: "", file: "src/app/page.tsx" },
  { path: "/about", file: "src/app/about/page.tsx" },
  { path: "/services", file: "src/app/services/page.tsx" },
  { path: "/contact", file: "src/app/contact/page.tsx" },
  { path: "/test-dictionary", file: "src/app/test-dictionary/page.tsx" },
  { path: "/career", file: "src/app/career/page.tsx" },
  { path: "/insurance", file: "src/app/insurance/page.tsx" },
  { path: "/join-us", file: "src/app/join-us/page.tsx" },
  { path: "/laboratory-forms", file: "src/app/laboratory-forms/page.tsx" },
  { path: "/test-preparation", file: "src/app/test-preparation/page.tsx" },
  { path: "/testimonial", file: "src/app/testimonial/page.tsx" },
  {
    path: "/update-billing-insurance",
    file: "src/app/update-billing-insurance/page.tsx",
  },
];

function getLastCommitDate(file: string): Date {
  try {
    const output = execSync(`git log -1 --format=%cI -- "${file}"`, {
      encoding: "utf-8",
    }).trim();
    return output ? new Date(output) : new Date();
  } catch {
    return new Date();
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map(({ path, file }) => ({
    url: `${BASE_URL}${path}`,
    lastModified: getLastCommitDate(file),
  }));
}
