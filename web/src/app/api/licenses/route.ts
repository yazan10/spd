import { NextRequest, NextResponse } from "next/server";
import { getLicenses, addLicense, removeLicense, deductCredits, getCredits } from "@/lib/db";
import { isValidAdminPassword, COST_PER_DEVICE } from "@/lib/auth";

export const dynamic = "force-dynamic";

function cors(res: NextResponse) {
  res.headers.set("Access-Control-Allow-Origin", "*");
  res.headers.set("Access-Control-Allow-Methods", "GET,POST,DELETE,OPTIONS");
  res.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Admin-Password");
  return res;
}
export async function OPTIONS() { return cors(new NextResponse(null,{status:204})); }

function auth(req: NextRequest): boolean {
  const h1 = req.headers.get("authorization")?.replace("Bearer ","") || "";
  const h2 = req.headers.get("x-admin-password") || "";
  const q = req.nextUrl.searchParams.get("password") || "";
  return isValidAdminPassword(h1) || isValidAdminPassword(h2) || isValidAdminPassword(q);
}

export async function GET(req: NextRequest) {
  if (!auth(req)) return cors(NextResponse.json({ error: "Unauthorized" }, { status: 401 }));
  const list = getLicenses();
  const credits = getCredits();
  return cors(NextResponse.json({ licenses: list, count: list.length, credits }));
}

export async function POST(req: NextRequest) {
  // يحتاج باس الأدمن
  const body = await req.json().catch(()=> ({}));
  const password = body.password || req.headers.get("x-admin-password") || req.headers.get("authorization")?.replace("Bearer ","") || "";
  if (!isValidAdminPassword(password)) return cors(NextResponse.json({ error: "كلمة مرور الأدمن غير صحيحة" }, { status: 401 }));

  const serial = (body.serial || "").toString().trim();
  const hash = (body.hash || "").toString().trim();
  const device = (body.device || "").toString().trim();
  if (!serial) return cors(NextResponse.json({ error: "السيريال مطلوب" }, { status: 400 }));

  // إذا مسجل مسبقاً لا نخصم
  const existing = getLicenses().find(l=> l.serial.toUpperCase()===serial.toUpperCase());
  if (existing) return cors(NextResponse.json({ error: "السيريال مسجل مسبقاً - لا يحتاج تسجيل مرة أخرى" }, { status: 409 }));

  // خصم 4 كريدت
  const deduct = deductCredits(COST_PER_DEVICE, `تسجيل جهاز ${serial}`);
  if (!deduct.ok) return cors(NextResponse.json({ error: deduct.error }, { status: 402 }));

  const res = addLicense({
    serial,
    hash: hash || undefined,
    device: device || undefined,
    addedAt: new Date().toISOString(),
    creditsUsed: COST_PER_DEVICE,
    addedBy: "admin"
  });
  if (!res.ok) {
    // إرجاع الرصيد في حال فشل الإضافة
    const { addCredits } = await import("@/lib/db");
    addCredits(COST_PER_DEVICE, `إرجاع بسبب فشل ${serial}`);
    return cors(NextResponse.json({ error: res.error }, { status: 409 }));
  }

  return cors(NextResponse.json({ ok: true, message: `تم تسجيل ${serial} بنجاح - 4 كريدت ($4) - يبقى مسجل للأبد`, credits: deduct.data }));
}

export async function DELETE(req: NextRequest) {
  const body = await req.json().catch(()=> ({}));
  const password = body.password || req.headers.get("x-admin-password") || req.headers.get("authorization")?.replace("Bearer ","") || req.nextUrl.searchParams.get("password") || "";
  if (!isValidAdminPassword(password)) return cors(NextResponse.json({ error: "Unauthorized" }, { status: 401 }));
  const serial = (body.serial || req.nextUrl.searchParams.get("serial") || "").toString().trim();
  if (!serial) return cors(NextResponse.json({ error: "serial required" }, { status: 400 }));
  const ok = removeLicense(serial);
  if (!ok) return cors(NextResponse.json({ error: "غير موجود" }, { status: 404 }));
  return cors(NextResponse.json({ ok: true }));
}
