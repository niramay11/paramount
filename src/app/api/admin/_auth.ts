import { NextRequest } from "next/server";
import crypto from "crypto";
import fs from "fs/promises";
import path from "path";

export const DATA_PATH = path.join(
  process.cwd(),
  "src",
  "data",
  "test-directory.json"
);

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

export async function readData() {
  const raw = await fs.readFile(DATA_PATH, "utf-8");
  return JSON.parse(raw);
}

export async function writeData(data: unknown) {
  await fs.writeFile(DATA_PATH, JSON.stringify(data, null, 2), "utf-8");
}
