import { NextRequest, NextResponse } from "next/server";
import { isSerialLicensed } from "@/lib/db";

export const dynamic = "force-dynamic";

function cors(res: NextResponse) {
  res.headers.set("Access-Control-Allow-Origin", "*");
  res.headers.set("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Admin-Password");
  return res;
}

export async function OPTIONS() {
  return cors(new NextResponse(null, { status: 204 }));
}

// GET ?serial=XXX&hash=YYY
export async function GET(req: NextRequest) {
  const serial = req.nextUrl.searchParams.get("serial")?.trim() || "";
  const hash = req.nextUrl.searchParams.get("hash")?.trim() || "";
  if (!serial && !hash) {
    return cors(NextResponse.json({ valid: false, error: "serial required" }, { status: 400 }));
  }
  const valid = isSerialLicensed(serial || hash, hash);
  return cors(NextResponse.json({ valid, serial, hash, licensed: valid }));
}

// POST { serial, hash }
export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const serial = (body.serial || "").toString().trim();
    const hash = (body.hash || "").toString().trim();
    if (!serial && !hash) {
      return cors(NextResponse.json({ valid: false, error: "serial required" }, { status: 400 }));
    }
    const valid = isSerialLicensed(serial || hash, hash);
    return cors(NextResponse.json({ valid, serial, hash, licensed: valid }));
  } catch (e: any) {
    return cors(NextResponse.json({ valid: false, error: e.message }, { status: 500 }));
  }
}
