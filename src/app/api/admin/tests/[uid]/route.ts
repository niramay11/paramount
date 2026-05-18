import { NextRequest, NextResponse } from "next/server";
import { isAuthed, readData, writeData } from "../../_auth";

// uid = base64( categoryId||sectionId||code||name )
// Using base64 to safely handle slashes/special chars in URL segments

function decodeUid(uid: string): [string, string, string, string] {
  const decoded = Buffer.from(uid, "base64url").toString("utf-8");
  const [catId, secId, code, ...nameParts] = decoded.split("||");
  return [catId, secId, code, nameParts.join("||")];
}

// PUT /api/admin/tests/[uid] — update a test (handles category/section moves)
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

  const data = await readData();
  const isSameLocation = newCategoryId === oldCatId && newSectionId === oldSecId;

  if (isSameLocation) {
    // In-place update — preserve position in array
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const cat = data.find((c: any) => c.id === oldCatId);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const sec = cat?.sections.find((s: any) => s.id === oldSecId);
    if (!sec)
      return NextResponse.json({ error: "Section not found" }, { status: 404 });

    const idx = sec.tests.findIndex(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (t: any) => t.code === oldCode && t.name === oldName
    );
    if (idx !== -1) sec.tests[idx] = test;
    else sec.tests.push(test);
  } else {
    // Remove from old location
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const oldCat = data.find((c: any) => c.id === oldCatId);
    if (oldCat) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const oldSec = oldCat.sections.find((s: any) => s.id === oldSecId);
      if (oldSec) {
        oldSec.tests = oldSec.tests.filter(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (t: any) => !(t.code === oldCode && t.name === oldName)
        );
      }
    }

    // Add to new location
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const newCat = data.find((c: any) => c.id === newCategoryId);
    if (!newCat)
      return NextResponse.json({ error: "New category not found" }, { status: 404 });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let newSec = newCat.sections.find((s: any) => s.id === newSectionId);
    if (!newSec) {
      newSec = { id: newSectionId, name: newSectionName || newSectionId, tests: [] };
      newCat.sections.push(newSec);
    }
    newSec.tests.push(test);
  }

  await writeData(data);
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

  const data = await readData();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const cat = data.find((c: any) => c.id === catId);
  if (cat) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const sec = cat.sections.find((s: any) => s.id === secId);
    if (sec) {
      sec.tests = sec.tests.filter(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (t: any) => !(t.code === code && t.name === name)
      );
    }
  }

  await writeData(data);
  return NextResponse.json({ ok: true });
}
