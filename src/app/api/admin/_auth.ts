import { NextRequest } from "next/server";
import crypto from "crypto";

function makeToken(password: string): string {
  const secret = process.env.ADMIN_SECRET ?? "paramount-lab-admin-secret";
  return crypto.createHmac("sha256", secret).update(password).digest("hex");
}

export function isAuthed(req: NextRequest): boolean {
  const cookie = req.cookies.get("admin_session")?.value;
  const expected = process.env.ADMIN_PASSWORD;
  if (!cookie || !expected) return false;
  return cookie === makeToken(expected);
}
