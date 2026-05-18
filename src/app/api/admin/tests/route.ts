import { NextRequest, NextResponse } from "next/server";
import { isAuthed, readData, writeData } from "../_auth";

// GET /api/admin/tests — return full category tree
export async function GET(req: NextRequest) {
  if (!isAuthed(req))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const data = await readData();
  return NextResponse.json(data);
}

// POST /api/admin/tests — add a new test
// body: { categoryId, sectionId, sectionName, test }
export async function POST(req: NextRequest) {
  if (!isAuthed(req))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { categoryId, sectionId, sectionName, test } = await req.json();
  const data = await readData();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const category = data.find((c: any) => c.id === categoryId);
  if (!category)
    return NextResponse.json({ error: "Category not found" }, { status: 404 });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let section = category.sections.find((s: any) => s.id === sectionId);
  if (!section) {
    section = { id: sectionId, name: sectionName || sectionId, tests: [] };
    category.sections.push(section);
  }

  section.tests.push(test);
  await writeData(data);

  return NextResponse.json({ ok: true });
}
