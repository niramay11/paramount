// Run: node scripts/seedTestDirectory.mjs
import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));

const SUPABASE_URL = "https://tgggyddsxolatgthrrgv.supabase.co";
const SERVICE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRnZ2d5ZGRzeG9sYXRndGhycmd2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3OTEwMzM5OCwiZXhwIjoyMDk0Njc5Mzk4fQ.hk-CLOLSJiPCP3cN_TtSNSazZc9IEIjkREWJ-wnsbuc";

const supabase = createClient(SUPABASE_URL, SERVICE_KEY);

const raw = readFileSync(
  join(__dirname, "../src/data/test-directory.json"),
  "utf-8"
);
const categories = JSON.parse(raw);

// Flatten categories → sections → tests into one row per test
const rows = [];
for (const cat of categories) {
  for (const sec of cat.sections) {
    for (const t of sec.tests) {
      rows.push({
        category_id:          cat.id,
        category_name:        cat.name,
        section_id:           sec.id,
        section_name:         sec.name,
        code:                 t.code            ?? "",
        name:                 t.name            ?? "",
        sub_tests:            t.subTests        ?? [],
        specimen_tube:        t.specimenTube    ?? "",
        patient_preparation:  t.patientPreparation ?? "",
        minimum_volume:       t.minimumVolume   ?? "",
        specimen_preparation: t.specimenPreparation ?? "",
        storage_transport:    t.storageTransport ?? "",
        stability:            t.stability       ?? "",
        rejection_criteria:   t.rejectionCriteria ?? "",
        special_notes:        t.specialNotes    ?? "",
        approved_for:         t.approvedFor     ?? "",
        performing_lab:       t.performingLab   ?? "",
        cpt_codes:            t.cptCodes        ?? "",
        tat_for_result:       t.tatForResult    ?? "",
        methodology:          t.methodology     ?? "",
      });
    }
  }
}

console.log(`Seeding ${rows.length} tests…`);

// Insert in batches of 50 to stay within Supabase limits
const BATCH = 50;
let inserted = 0;
for (let i = 0; i < rows.length; i += BATCH) {
  const batch = rows.slice(i, i + BATCH);
  const { error } = await supabase.from("test_directory").insert(batch);
  if (error) {
    console.error(`Batch ${i}–${i + BATCH} failed:`, error.message);
    process.exit(1);
  }
  inserted += batch.length;
  console.log(`  ✓ ${inserted}/${rows.length}`);
}

console.log("Done! All tests seeded successfully.");
