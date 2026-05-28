import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { isAuthed } from "../_auth";
import { supabaseAdmin } from "@/lib/supabase";

export async function GET(req: NextRequest) {
  if (!isAuthed(req))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { data, error } = await supabaseAdmin
    .from("carousel_logos")
    .select("*")
    .order("sort_order")
    .order("created_at");

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json(data ?? []);
}

export async function POST(req: NextRequest) {
  if (!isAuthed(req))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const formData = await req.formData();
  const file = formData.get("file") as File | null;
  const alt = (formData.get("alt") as string | null) || "Insurance partner";
  const sort_order = Number(formData.get("sort_order") ?? 0);

  if (!file)
    return NextResponse.json({ error: "No file provided" }, { status: 400 });

  const ext = file.name.split(".").pop() ?? "png";
  const storage_path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

  const { error: uploadError } = await supabaseAdmin.storage
    .from("carousel-logos")
    .upload(storage_path, await file.arrayBuffer(), { contentType: file.type });

  if (uploadError)
    return NextResponse.json({ error: uploadError.message }, { status: 500 });

  const { data: { publicUrl } } = supabaseAdmin.storage
    .from("carousel-logos")
    .getPublicUrl(storage_path);

  const { error: dbError } = await supabaseAdmin
    .from("carousel_logos")
    .insert({ url: publicUrl, storage_path, alt, sort_order });

  if (dbError) {
    await supabaseAdmin.storage.from("carousel-logos").remove([storage_path]);
    return NextResponse.json({ error: dbError.message }, { status: 500 });
  }

  revalidatePath("/insurance");
  return NextResponse.json({ ok: true });
}
