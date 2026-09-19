import { NextRequest, NextResponse } from "next/server";
import { getCredits, addCredits } from "@/lib/db";
import { isValidAdminPassword } from "@/lib/auth";

export const dynamic = "force-dynamic";
function cors(r: NextResponse){ r.headers.set("Access-Control-Allow-Origin","*"); r.headers.set("Access-Control-Allow-Methods","GET,POST,OPTIONS"); r.headers.set("Access-Control-Allow-Headers","Content-Type, Authorization, X-Admin-Password"); return r; }
export async function OPTIONS(){ return cors(new NextResponse(null,{status:204})); }

function auth(req: NextRequest){
  const h1 = req.headers.get("authorization")?.replace("Bearer ","") || "";
  const h2 = req.headers.get("x-admin-password") || "";
  const q = req.nextUrl.searchParams.get("password") || "";
  return isValidAdminPassword(h1) || isValidAdminPassword(h2) || isValidAdminPassword(q);
}

export async function GET(req: NextRequest){
  if (!auth(req)) return cors(NextResponse.json({ error: "Unauthorized" },{status:401}));
  return cors(NextResponse.json(getCredits()));
}

export async function POST(req: NextRequest){
  const body = await req.json().catch(()=> ({}));
  const password = body.password || req.headers.get("x-admin-password") || req.headers.get("authorization")?.replace("Bearer ","") || "";
  if (!isValidAdminPassword(password)) return cors(NextResponse.json({error:"كلمة مرور خاطئة"},{status:401}));
  const amount = parseInt(body.amount);
  const reason = body.reason || "إضافة يدوية";
  if (!amount || amount <=0) return cors(NextResponse.json({error:"amount >0"},{status:400}));
  const data = addCredits(amount, reason);
  return cors(NextResponse.json({ ok:true, credits:data }));
}
