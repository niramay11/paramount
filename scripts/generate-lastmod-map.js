// Generates src/data/lastmod-map.json from real git commit history.
//
// This must be run in an environment with full git history (e.g. a local
// clone), NOT during the Vercel build — Vercel's build checkout is shallow,
// so `git log` silently returns nothing for older commits there and any
// code that shells out to git at build/request time falls back to the
// build timestamp for most routes. Running this locally and committing the
// output avoids that failure mode entirely: sitemap.ts just reads static,
// pre-computed dates.
//
// Run whenever a tracked page's content changes and you want the sitemap
// lastmod to reflect it:
//   node scripts/generate-lastmod-map.js

const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

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

function getLastCommitDate(file) {
  const output = execSync(`git log -1 --format=%cI -- "${file}"`, {
    encoding: "utf-8",
  }).trim();
  if (!output) {
    throw new Error(
      `No git history found for "${file}" — is this running against a full clone?`
    );
  }
  return output;
}

const map = {};
for (const { path: routePath, file } of routes) {
  map[routePath] = getLastCommitDate(file);
}

const outPath = path.join(__dirname, "..", "src", "data", "lastmod-map.json");
fs.writeFileSync(outPath, JSON.stringify(map, null, 2) + "\n");

console.log(`Wrote ${Object.keys(map).length} route dates to ${outPath}`);
