import { NextRequest, NextResponse } from "next/server";
import { isAuthed } from "../_auth";
import { supabaseAdmin } from "@/lib/supabase";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function rowToTest(row: any) {
  return {
    id: row.code,
    code: row.code,
    name: row.name,
    subTests: row.sub_tests ?? [],
    specimenTube: row.specimen_tube ?? "",
    patientPreparation: row.patient_preparation ?? "",
    minimumVolume: row.minimum_volume ?? "",
    specimenPreparation: row.specimen_preparation ?? "",
    storageTransport: row.storage_transport ?? "",
    stability: row.stability ?? "",
    rejectionCriteria: row.rejection_criteria ?? "",
    specialNotes: row.special_notes ?? "",
    approvedFor: row.approved_for ?? "",
    performingLab: row.performing_lab ?? "",
    cptCodes: row.cpt_codes ?? "",
    tatForResult: row.tat_for_result ?? "",
    methodology: row.methodology ?? "",
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function buildTree(rows: any[]) {
  const catMap = new Map<string, {
    id: string; name: string;
    sections: Map<string, { id: string; name: string; tests: ReturnType<typeof rowToTest>[] }>;
  }>();

  for (const row of rows) {
    if (!catMap.has(row.category_id)) {
      catMap.set(row.category_id, { id: row.category_id, name: row.category_name, sections: new Map() });
    }
    const cat = catMap.get(row.category_id)!;
    if (!cat.sections.has(row.section_id)) {
      cat.sections.set(row.section_id, { id: row.section_id, name: row.section_name, tests: [] });
    }
    cat.sections.get(row.section_id)!.tests.push(rowToTest(row));
  }

  return Array.from(catMap.values()).map((cat) => ({
    id: cat.id,
    name: cat.name,
    sections: Array.from(cat.sections.values()),
  }));
}

// GET /api/admin/tests — return full category tree from Supabase
export async function GET(req: NextRequest) {
  if (!isAuthed(req))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { data, error } = await supabaseAdmin
    .from("test_directory")
    .select("*")
    .order("category_id")
    .order("section_id")
    .order("name");

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json(buildTree(data));
}

// POST /api/admin/tests — add a new test
// body: { categoryId, sectionId, sectionName, test }
export async function POST(req: NextRequest) {
  if (!isAuthed(req))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { categoryId, sectionId, sectionName, test } = await req.json();

  // Look up category name from an existing row with the same categoryId
  const { data: existing } = await supabaseAdmin
    .from("test_directory")
    .select("category_name")
    .eq("category_id", categoryId)
    .limit(1)
    .maybeSingle();

  const categoryName = existing?.category_name ?? categoryId;

  const { error } = await supabaseAdmin.from("test_directory").insert({
    category_id: categoryId,
    category_name: categoryName,
    section_id: sectionId,
    section_name: sectionName,
    code: test.code,
    name: test.name,
    sub_tests: test.subTests ?? [],
    specimen_tube: test.specimenTube ?? "",
    patient_preparation: test.patientPreparation ?? "",
    minimum_volume: test.minimumVolume ?? "",
    specimen_preparation: test.specimenPreparation ?? "",
    storage_transport: test.storageTransport ?? "",
    stability: test.stability ?? "",
    rejection_criteria: test.rejectionCriteria ?? "",
    special_notes: test.specialNotes ?? "",
    approved_for: test.approvedFor ?? "",
    performing_lab: test.performingLab ?? "",
    cpt_codes: test.cptCodes ?? "",
    tat_for_result: test.tatForResult ?? "",
    methodology: test.methodology ?? "",
    updated_at: new Date().toISOString(),
  });

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ ok: true });
}
