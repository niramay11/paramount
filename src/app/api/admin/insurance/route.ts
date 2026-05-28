import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { isAuthed } from "../_auth";
import { supabaseAdmin } from "@/lib/supabase";

export async function GET(req: NextRequest) {
  if (!isAuthed(req))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { data, error } = await supabaseAdmin
    .from("insurance_providers")
    .select("*")
    .order("category")
    .order("sort_order")
    .order("name");

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json(data ?? []);
}

export async function POST(req: NextRequest) {
  if (!isAuthed(req))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const formData = await req.formData();
  const name = (formData.get("name") as string | null)?.trim();
  const category = (formData.get("category") as string | null) ?? "featured";
  const sort_order = Number(formData.get("sort_order") ?? 0);
  const file = formData.get("image") as File | null;

  if (!name)
    return NextResponse.json({ error: "Name is required" }, { status: 400 });

  let image_url: string | undefined;
  let storage_path: string | undefined;

  if (file && file.size > 0) {
    const ext = file.name.split(".").pop() ?? "png";
    storage_path = `insurance/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

    const { error: uploadError } = await supabaseAdmin.storage
      .from("carousel-logos")
      .upload(storage_path, await file.arrayBuffer(), { contentType: file.type });

    if (uploadError)
      return NextResponse.json({ error: uploadError.message }, { status: 500 });

    const { data: { publicUrl } } = supabaseAdmin.storage
      .from("carousel-logos")
      .getPublicUrl(storage_path);

    image_url = publicUrl;
  }

  const { error } = await supabaseAdmin
    .from("insurance_providers")
    .insert({
      name,
      category,
      sort_order,
      ...(image_url ? { image_url, storage_path } : {}),
    });

  if (error) {
    if (storage_path)
      await supabaseAdmin.storage.from("carousel-logos").remove([storage_path]);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  revalidatePath("/insurance");
  return NextResponse.json({ ok: true });
}
