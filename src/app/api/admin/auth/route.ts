import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

function makeToken(password: string): string {
  const secret = process.env.ADMIN_SECRET ?? "paramount-lab-admin-secret";
  return crypto.createHmac("sha256", secret).update(password).digest("hex");
}

// POST /api/admin/auth  — login
export async function POST(req: NextRequest) {
  const { password } = await req.json();
  const expected = process.env.ADMIN_PASSWORD;

  if (!expected) {
    return NextResponse.json(
      { error: "ADMIN_PASSWORD env variable not set" },
      { status: 500 }
    );
  }

  if (password !== expected) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set("admin_session", makeToken(password), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 8, // 8 hours
    path: "/",
  });
  return res;
}

// DELETE /api/admin/auth  — logout
export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.delete("admin_session");
  return res;
}
