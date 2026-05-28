import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { isAuthed } from "../../_auth";
import { supabaseAdmin } from "@/lib/supabase";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!isAuthed(req))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;

  const { data: record } = await supabaseAdmin
    .from("carousel_logos")
    .select("storage_path")
    .eq("id", id)
    .single();

  if (record?.storage_path)
    await supabaseAdmin.storage.from("carousel-logos").remove([record.storage_path]);

  const { error } = await supabaseAdmin
    .from("carousel_logos")
    .delete()
    .eq("id", id);

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });

  revalidatePath("/insurance");
  return NextResponse.json({ ok: true });
}
