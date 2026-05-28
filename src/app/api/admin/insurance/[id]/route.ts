import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { isAuthed } from "../../_auth";
import { supabaseAdmin } from "@/lib/supabase";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!isAuthed(req))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const formData = await req.formData();
  const name = (formData.get("name") as string | null)?.trim();
  const category = (formData.get("category") as string | null) ?? "featured";
  const sort_order = Number(formData.get("sort_order") ?? 0);
  const file = formData.get("image") as File | null;
  const remove_image = formData.get("remove_image") === "true";

  if (!name)
    return NextResponse.json({ error: "Name is required" }, { status: 400 });

  // Fetch current record to get existing storage_path
  const { data: existing } = await supabaseAdmin
    .from("insurance_providers")
    .select("storage_path")
    .eq("id", id)
    .single();

  let image_url: string | null | undefined;
  let storage_path: string | null | undefined;
  let oldPath: string | null = existing?.storage_path ?? null;

  if (remove_image) {
    image_url = null;
    storage_path = null;
  } else if (file && file.size > 0) {
    const ext = file.name.split(".").pop() ?? "png";
    const newPath = `insurance/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

    const { error: uploadError } = await supabaseAdmin.storage
      .from("carousel-logos")
      .upload(newPath, await file.arrayBuffer(), { contentType: file.type });

    if (uploadError)
      return NextResponse.json({ error: uploadError.message }, { status: 500 });

    const { data: { publicUrl } } = supabaseAdmin.storage
      .from("carousel-logos")
      .getPublicUrl(newPath);

    image_url = publicUrl;
    storage_path = newPath;
  }

  const updatePayload: Record<string, unknown> = { name, category, sort_order };
  if (image_url !== undefined) updatePayload.image_url = image_url;
  if (storage_path !== undefined) updatePayload.storage_path = storage_path;

  const { error } = await supabaseAdmin
    .from("insurance_providers")
    .update(updatePayload)
    .eq("id", id);

  if (error) {
    if (storage_path)
      await supabaseAdmin.storage.from("carousel-logos").remove([storage_path]);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Delete old image from storage after successful DB update
  if (oldPath && (remove_image || (file && file.size > 0)))
    await supabaseAdmin.storage.from("carousel-logos").remove([oldPath]);

  revalidatePath("/insurance");
  return NextResponse.json({ ok: true });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!isAuthed(req))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;

  const { data: existing } = await supabaseAdmin
    .from("insurance_providers")
    .select("storage_path")
    .eq("id", id)
    .single();

  const { error } = await supabaseAdmin
    .from("insurance_providers")
    .delete()
    .eq("id", id);

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });

  if (existing?.storage_path)
    await supabaseAdmin.storage.from("carousel-logos").remove([existing.storage_path]);

  revalidatePath("/insurance");
  return NextResponse.json({ ok: true });
}
