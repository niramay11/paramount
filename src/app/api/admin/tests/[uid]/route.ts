import { NextRequest, NextResponse } from "next/server";
import { isAuthed } from "../../_auth";
import { supabaseAdmin } from "@/lib/supabase";

// uid = base64url( categoryId||sectionId||code||name )
function decodeUid(uid: string): [string, string, string, string] {
  const decoded = Buffer.from(uid, "base64url").toString("utf-8");
  const [catId, secId, code, ...nameParts] = decoded.split("||");
  return [catId, secId, code, nameParts.join("||")];
}

// PUT /api/admin/tests/[uid] — update a test
// body: { newCategoryId, newSectionId, newSectionName, test }
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ uid: string }> }
) {
  if (!isAuthed(req))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { uid } = await params;
  const { newCategoryId, newSectionId, newSectionName, test } = await req.json();
  const [oldCatId, oldSecId, oldCode, oldName] = decodeUid(uid);

  // Look up category name from an existing row
  const { data: existing } = await supabaseAdmin
    .from("test_directory")
    .select("category_name")
    .eq("category_id", newCategoryId)
    .limit(1)
    .maybeSingle();

  const categoryName = existing?.category_name ?? newCategoryId;

  const { error } = await supabaseAdmin
    .from("test_directory")
    .update({
      category_id: newCategoryId,
      category_name: categoryName,
      section_id: newSectionId,
      section_name: newSectionName,
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
    })
    .eq("category_id", oldCatId)
    .eq("section_id", oldSecId)
    .eq("code", oldCode)
    .eq("name", oldName);

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ ok: true });
}

// DELETE /api/admin/tests/[uid]
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ uid: string }> }
) {
  if (!isAuthed(req))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { uid } = await params;
  const [catId, secId, code, name] = decodeUid(uid);

  const { error } = await supabaseAdmin
    .from("test_directory")
    .delete()
    .eq("category_id", catId)
    .eq("section_id", secId)
    .eq("code", code)
    .eq("name", name);

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ ok: true });
}
