import { NextRequest, NextResponse } from "next/server";
import { isValidAdminPassword } from "@/lib/auth";

export const dynamic = "force-dynamic";
export async function POST(req: NextRequest){
  const body = await req.json().catch(()=> ({}));
  const pw = (body.password || "").toString();
  if (isValidAdminPassword(pw)) {
    return NextResponse.json({ ok: true });
  }
  return NextResponse.json({ ok:false, error: "كلمة المرور غير صحيحة" },{status:401});
}
