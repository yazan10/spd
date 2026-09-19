"use client";
import { useEffect, useState } from "react";

type Lic = { serial: string; hash?: string; device?: string; addedAt: string; creditsUsed: number };
type Credits = { balance: number; totalAdded: number; totalUsed: number; history: any[] };

export default function AdminPage(){
  const [pass, setPass] = useState("");
  const [authed, setAuthed] = useState(false);
  const [error, setError] = useState("");
  const [lics, setLics] = useState<Lic[]>([]);
  const [credits, setCredits] = useState<Credits|null>(null);
  const [newSerial, setNewSerial] = useState("");
  const [newHash, setNewHash] = useState("");
  const [newDevice, setNewDevice] = useState("");
  const [addAmount, setAddAmount] = useState("10");
  const [msg, setMsg] = useState("");

  useEffect(()=>{
    const saved = localStorage.getItem("yaz_admin_pass");
    if (saved){ setPass(saved); checkAuth(saved); }
  },[]);

  async function checkAuth(pw:string){
    const res = await fetch("/api/auth",{method:"POST", headers:{"Content-Type":"application/json"}, body: JSON.stringify({password:pw})});
    if (res.ok){ setAuthed(true); setError(""); localStorage.setItem("yaz_admin_pass", pw); loadData(pw); }
    else { setError("كلمة المرور غير صحيحة"); }
  }

  async function loadData(pw:string){
    const h = { "X-Admin-Password": pw };
    const r1 = await fetch("/api/licenses",{headers:h});
    if (r1.ok){ const d=await r1.json(); setLics(d.licenses); setCredits(d.credits); }
    else { const r2=await fetch("/api/credits",{headers:h}); if(r2.ok) setCredits(await r2.json()); }
  }

  async function handleAdd(){
    setMsg("");
    if (!newSerial.trim()){ setMsg("أدخل السيريال"); return; }
    const res = await fetch("/api/licenses",{method:"POST", headers:{"Content-Type":"application/json","X-Admin-Password":pass}, body: JSON.stringify({ serial:newSerial.trim(), hash:newHash.trim(), device:newDevice.trim(), password:pass })});
    const data = await res.json();
    if (res.ok){ setMsg("✅ " + data.message); setNewSerial(""); setNewHash(""); loadData(pass); }
    else setMsg("⛔ " + (data.error||"فشل"));
  }

  async function handleDelete(s:string){
    if(!confirm("حذف "+s+" ؟")) return;
    const res = await fetch("/api/licenses",{method:"DELETE", headers:{"Content-Type":"application/json","X-Admin-Password":pass}, body: JSON.stringify({serial:s, password:pass})});
    if(res.ok) loadData(pass);
  }

  async function handleAddCredits(){
    const amt = parseInt(addAmount);
    if(!amt || amt<=0){ setMsg("أدخل كمية صحيحة"); return; }
    const res = await fetch("/api/credits",{method:"POST", headers:{"Content-Type":"application/json","X-Admin-Password":pass}, body: JSON.stringify({amount:amt, reason:"شحن يدوي", password:pass})});
    const data = await res.json();
    if(res.ok){ setMsg(`✅ تم شحن ${amt} كريدت`); loadData(pass); setAddAmount("10"); } else setMsg("⛔ "+data.error);
  }

  async function handleLogout(){
    localStorage.removeItem("yaz_admin_pass");
    setAuthed(false); setPass("");
  }

  if (!authed){
    return (
      <div className="min-h-screen grid place-items-center bg-zinc-100 p-6">
        <div className="w-full max-w-md p-8 rounded-3xl bg-white shadow-xl border">
          <div className="w-12 h-12 rounded-2xl bg-black text-white grid place-items-center font-black text-xl mx-auto">yaz</div>
          <h1 className="text-center mt-4 text-2xl font-black">لوحة تحكم yaz SPD</h1>
          <p className="text-center text-sm text-zinc-500 mt-1">نظام الأدمن - مخفي عن المستخدمين</p>
          <div className="mt-6 space-y-3">
            <input type="password" value={pass} onChange={e=>setPass(e.target.value)} placeholder="كلمة مرور الأدمن" className="w-full px-4 py-3 rounded-xl border bg-white text-center tracking-widest" />
            <button onClick={()=>checkAuth(pass)} className="w-full py-3 rounded-xl bg-black text-white font-bold hover:bg-zinc-800">دخول</button>
            {error && <div className="p-3 rounded-xl bg-red-50 text-red-700 text-sm text-center font-bold">{error}</div>}
            <div className="text-xs text-center text-zinc-400">الباس الافتراضي: yaz@#spd</div>
          </div>
        </div>
      </div>
    );
  }

  const canRegister = credits ? Math.floor(credits.balance / 4) : 0;

  return (
    <div className="min-h-screen bg-zinc-50">
      <header className="sticky top-0 z-30 bg-white border-b">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-black text-white grid place-items-center font-black">yaz</div>
            <div><div className="font-black leading-none">yaz SPD - Admin</div><div className="text-xs text-zinc-500">لوحة تحكم الموزع</div></div>
          </div>
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-200">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-sm font-bold text-emerald-700">{credits?.balance ?? 0} كريدت</span>
              <span className="text-xs text-zinc-500">(${credits?.balance ?? 0}) • يكفي لـ {canRegister} جهاز</span>
            </div>
            <a href="https://t.me/YAZsalaq" target="_blank" className="px-4 py-2 rounded-full bg-[#0088cc] text-white text-sm font-bold">✈️ تيليجرام</a>
            <button onClick={handleLogout} className="px-4 py-2 rounded-full border bg-white text-sm font-bold">خروج</button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8 space-y-6">
        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-4">
          <div className="p-6 rounded-2xl bg-white border"><div className="text-xs text-zinc-500 font-bold">الرصيد الحالي</div><div className="text-3xl font-black mt-1">{credits?.balance ?? 0} <span className="text-base font-normal">كريدت</span></div><div className="text-xs text-zinc-400">${credits?.balance ?? 0} • 1 كريدت = $1</div></div>
          <div className="p-6 rounded-2xl bg-white border"><div className="text-xs text-zinc-500 font-bold">أجهزة مسجلة</div><div className="text-3xl font-black mt-1">{lics.length}</div><div className="text-xs text-zinc-400">كل جهاز 4 كريدت</div></div>
          <div className="p-6 rounded-2xl bg-white border"><div className="text-xs text-zinc-500 font-bold">مستهلك</div><div className="text-3xl font-black mt-1">{credits?.totalUsed ?? 0}</div><div className="text-xs text-zinc-400">كريدت</div></div>
          <div className="p-6 rounded-2xl bg-white border"><div className="text-xs text-zinc-500 font-bold">يمكن تسجيل</div><div className="text-3xl font-black mt-1 text-emerald-600">{canRegister}</div><div className="text-xs text-zinc-400">جهاز إضافي</div></div>
        </div>

        {/* Add credits */}
        <div className="p-6 rounded-2xl bg-white border flex flex-col md:flex-row gap-4 items-end">
          <div className="flex-1">
            <div className="text-sm font-black">شحن رصيد</div>
            <div className="text-xs text-zinc-500">أضف كريدت للإدمن (1 كريدت = $1)</div>
            <div className="mt-3 flex gap-2">
              <input value={addAmount} onChange={e=>setAddAmount(e.target.value)} type="number" className="flex-1 px-4 py-2.5 rounded-xl border" placeholder="الكمية" />
              <button onClick={handleAddCredits} className="px-6 py-2.5 rounded-xl bg-emerald-600 text-white font-bold">+ شحن</button>
            </div>
          </div>
          <div className="text-xs text-zinc-400 leading-relaxed">بعد الشحن يمكنك تسجيل أجهزة جديدة. كل جهاز يخصم 4 كريدت مرة واحدة ويبقى مسجل للأبد بدون إعادة دفع.</div>
        </div>

        {/* Add serial */}
        <div className="p-6 rounded-2xl bg-white border">
          <h3 className="font-black text-lg">تسجيل جهاز جديد - 4 كريدت ($4)</h3>
          <p className="text-sm text-zinc-500">بعد التسجيل يبقى السيريال مسجل للأبد ويمكن للزبون عمل أي عملية بدون مطالبة مرة أخرى</p>
          <div className="grid md:grid-cols-4 gap-3 mt-4">
            <input value={newSerial} onChange={e=>setNewSerial(e.target.value)} placeholder="السيريال * (مثال: MB123...)" className="px-4 py-3 rounded-xl border dir-ltr" dir="ltr" />
            <input value={newHash} onChange={e=>setNewHash(e.target.value)} placeholder="الهاش (اختياري - SHA)" className="px-4 py-3 rounded-xl border dir-ltr" dir="ltr" />
            <input value={newDevice} onChange={e=>setNewDevice(e.target.value)} placeholder="الموديل (اختياري)" className="px-4 py-3 rounded-xl border" />
            <button onClick={handleAdd} className="px-6 py-3 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700">تسجيل - خصم 4 كريدت</button>
          </div>
          {msg && <div className="mt-4 p-3 rounded-xl bg-zinc-100 text-sm font-bold">{msg}</div>}
          <div className="mt-3 text-xs text-zinc-400">💡 انسخ السيريال من رسالة الأداة (زر نسخ) والصقه هنا. تأكد من الرصيد قبل التسجيل.</div>
        </div>

        {/* List */}
        <div className="p-6 rounded-2xl bg-white border">
          <div className="flex items-center justify-between">
            <h3 className="font-black">الأجهزة المسجلة ({lics.length})</h3>
            <button onClick={()=>loadData(pass)} className="px-4 py-2 rounded-full border text-sm font-bold">تحديث</button>
          </div>
          {lics.length===0 ? (
            <div className="mt-6 p-10 text-center rounded-2xl border-2 border-dashed text-zinc-400">لا يوجد أجهزة مسجلة بعد - أضف أول سيريال</div>
          ):(
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="text-xs text-zinc-500 border-b">
                  <tr><th className="p-3 text-right">السيريال</th><th className="p-3 text-right">الهاش</th><th className="p-3 text-right">الجهاز</th><th className="p-3 text-right">التاريخ</th><th className="p-3 text-right">كريدت</th><th className="p-3"></th></tr>
                </thead>
                <tbody>
                  {lics.map(l=> (
                    <tr key={l.serial} className="border-b hover:bg-zinc-50">
                      <td className="p-3 font-mono text-xs dir-ltr" dir="ltr">{l.serial}</td>
                      <td className="p-3 font-mono text-xs dir-ltr" dir="ltr">{l.hash || "-"}</td>
                      <td className="p-3">{l.device || "-"}</td>
                      <td className="p-3 text-xs text-zinc-500">{new Date(l.addedAt).toLocaleString("ar-EG")}</td>
                      <td className="p-3"><span className="px-2 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold">{l.creditsUsed}</span></td>
                      <td className="p-3"><button onClick={()=>handleDelete(l.serial)} className="px-3 py-1 rounded-full bg-red-50 text-red-600 text-xs font-bold hover:bg-red-100">حذف</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          <div className="mt-4 flex flex-wrap gap-2">
            <a href="https://t.me/YAZsalaq" target="_blank" className="px-4 py-2 rounded-full bg-[#0088cc] text-white text-sm font-bold">✈️ تواصل تيليجرام</a>
            <button onClick={()=>{navigator.clipboard.writeText(JSON.stringify(lics,null,2)); setMsg("✅ تم نسخ كل السيريالات");}} className="px-4 py-2 rounded-full border text-sm font-bold">نسخ الكل JSON</button>
          </div>
        </div>

        {/* History */}
        {credits?.history && (
          <div className="p-6 rounded-2xl bg-white border">
            <h3 className="font-black">سجل الكريدت</h3>
            <div className="mt-3 space-y-2 max-h-64 overflow-y-auto">
              {credits.history.slice().reverse().slice(0,20).map((h:any,i:number)=> (
                <div key={i} className={`p-3 rounded-xl border flex items-center justify-between text-sm ${h.type==="add"?"bg-emerald-50 border-emerald-200":"bg-red-50 border-red-200"}`}>
                  <div><span className="font-black">{h.type==="add"?"+":"-"}{h.amount} كريدت</span><span className="text-xs text-zinc-500 mr-2">{h.reason}</span></div>
                  <div className="text-xs text-zinc-500 dir-ltr" dir="ltr">{new Date(h.at).toLocaleString("ar-EG")}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      <footer className="max-w-6xl mx-auto px-6 py-8 text-center text-xs text-zinc-400">
        yaz SPD Admin • الباس: yaz@#spd • مخفي عن المستخدمين • <a href="https://t.me/YAZsalaq" className="underline">t.me/YAZsalaq</a>
      </footer>
    </div>
  );
}
