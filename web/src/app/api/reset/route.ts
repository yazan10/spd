import { NextRequest, NextResponse } from "next/server";
import { isValidAdminPassword } from "@/lib/auth";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

function cors(r: NextResponse){ r.headers.set("Access-Control-Allow-Origin","*"); r.headers.set("Access-Control-Allow-Methods","POST,OPTIONS"); r.headers.set("Access-Control-Allow-Headers","Content-Type, Authorization, X-Admin-Password"); return r; }
export async function OPTIONS(){ return cors(new NextResponse(null,{status:204})); }

export async function POST(req: NextRequest){
  const body = await req.json().catch(()=> ({}));
  const password = body.password || req.headers.get("x-admin-password") || req.headers.get("authorization")?.replace("Bearer ","") || "";
  if (!isValidAdminPassword(password)) return cors(NextResponse.json({error:"كلمة المرور غير صحيحة"},{status:401}));

  try{
    const dataDir = path.join(process.cwd(), "data");
    const tmpDir = path.join("/tmp", "yaz-spd-data");
    // مسح licenses
    const emptyLic = "[]";
    const emptyCredits = JSON.stringify({ balance: 0, totalAdded: 0, totalUsed: 0, history: [] }, null, 2);
    
    // حاول الكتابة في كل المسارات المحتملة
    for (const dir of [dataDir, tmpDir]){
      try{
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, {recursive:true});
        fs.writeFileSync(path.join(dir, "licenses.json"), emptyLic, "utf-8");
        fs.writeFileSync(path.join(dir, "credits.json"), emptyCredits, "utf-8");
      } catch {}
    }
    // أيضاً حاول مسح الذاكرة عبر استدعاء db (سيتم إعادة التهيئة في الطلب التالي)
    // نحتاج لمسح المتغيرات العامة - نعيد كتابة الملفات يكفي لأن db سيقرأ من /tmp في Vercel
    return cors(NextResponse.json({ ok:true, message:"تم تصفير جميع الأرقام - الرصيد 0 والسيريالات 0" }));
  } catch(e:any){
    return cors(NextResponse.json({error:e.message},{status:500}));
  }
}
