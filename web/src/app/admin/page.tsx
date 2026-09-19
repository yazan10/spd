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
  const [addAmount, setAddAmount] = useState("25");
  const [msg, setMsg] = useState("");
  const [msgType, setMsgType] = useState<"ok"|"err"|"">("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(()=>{
    const saved = localStorage.getItem("yaz_admin_pass");
    if (saved){ setPass(saved); checkAuth(saved); }
  },[]);

  async function checkAuth(pw:string){
    setError(""); setLoading(true);
    try{
      const res = await fetch("/api/auth",{method:"POST", headers:{"Content-Type":"application/json"}, body: JSON.stringify({password:pw})});
      if (res.ok){ setAuthed(true); localStorage.setItem("yaz_admin_pass", pw); await loadData(pw); }
      else { setError("كلمة المرور غير صحيحة - الباس هو yaz@#spd"); setAuthed(false); }
    } catch { setError("خطأ اتصال بالسيرفر"); }
    setLoading(false);
  }

  async function loadData(pw:string){
    const h = { "X-Admin-Password": pw };
    try{
      const r1 = await fetch("/api/licenses",{headers:h});
      if (r1.ok){ const d=await r1.json(); setLics(d.licenses || []); setCredits(d.credits); return; }
      const r2=await fetch("/api/credits",{headers:h}); if(r2.ok) setCredits(await r2.json());
    } catch {}
  }

  function showMsg(text:string, type:"ok"|"err"){
    setMsg(text); setMsgType(type); setTimeout(()=>{setMsg(""); setMsgType("");}, 4000);
  }

  async function handleAdd(){
    if (!newSerial.trim()){ showMsg("أدخل السيريال أولاً", "err"); return; }
    setLoading(true);
    const res = await fetch("/api/licenses",{method:"POST", headers:{"Content-Type":"application/json","X-Admin-Password":pass}, body: JSON.stringify({ serial:newSerial.trim(), hash:newHash.trim(), device:newDevice.trim(), password:pass })});
    const data = await res.json();
    if (res.ok){ showMsg(data.message || `تم تسجيل ${newSerial.trim()} بنجاح - خصم 4 كريدت`, "ok"); setNewSerial(""); setNewHash(""); setNewDevice(""); await loadData(pass); }
    else showMsg(data.error||"فشل التسجيل", "err");
    setLoading(false);
  }

  async function handleDelete(s:string){
    if(!confirm(`حذف السيريال ${s} ؟`)) return;
    const res = await fetch("/api/licenses",{method:"DELETE", headers:{"Content-Type":"application/json","X-Admin-Password":pass}, body: JSON.stringify({serial:s, password:pass})});
    if(res.ok){ showMsg(`تم حذف ${s}`, "ok"); loadData(pass); } else showMsg("فشل الحذف", "err");
  }

  async function handleAddCredits(){
    const amt = parseInt(addAmount);
    if(!amt || amt<=0){ showMsg("أدخل كمية صحيحة", "err"); return; }
    setLoading(true);
    const res = await fetch("/api/credits",{method:"POST", headers:{"Content-Type":"application/json","X-Admin-Password":pass}, body: JSON.stringify({amount:amt, reason:"شحن يدوي من الأدمن", password:pass})});
    const data = await res.json();
    if(res.ok){ showMsg(`تم شحن ${amt} كريدت بنجاح`, "ok"); await loadData(pass); setAddAmount("25"); } else showMsg(data.error||"فشل الشحن", "err");
    setLoading(false);
  }

  async function handleLogout(){
    localStorage.removeItem("yaz_admin_pass");
    setAuthed(false); setPass(""); setLics([]); setCredits(null);
  }

  const canRegister = credits ? Math.floor(credits.balance / 4) : 0;
  const filtered = lics.filter(l => !search || l.serial.toLowerCase().includes(search.toLowerCase()) || (l.device||"").toLowerCase().includes(search.toLowerCase()));

  if (!authed){
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-zinc-900 to-black flex items-center justify-center p-6" dir="rtl">
        <div className="w-full max-w-[440px]">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center text-white font-black text-2xl mx-auto shadow-lg shadow-blue-500/20">yaz</div>
            <h1 className="text-white mt-4 text-[28px] font-black tracking-tight">لوحة تحكم yaz SPD</h1>
            <p className="text-zinc-400 text-sm mt-1">نظام إدارة السيريالات والكريدت • مخفي عن المستخدمين</p>
            <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-xs text-zinc-300">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> آمن • مشفر • خاص بالموزع
            </div>
          </div>

          <div className="bg-white rounded-[24px] p-8 shadow-2xl border border-zinc-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-black text-white grid place-items-center">🔐</div>
              <div>
                <div className="font-black leading-none">تسجيل دخول الأدمن</div>
                <div className="text-xs text-zinc-500">أدخل كلمة مرور لوحة التحكم</div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-zinc-700">كلمة المرور</label>
                <input type="password" value={pass} onChange={e=>setPass(e.target.value)} onKeyDown={e=>e.key==='Enter' && checkAuth(pass)} placeholder="••••••••" className="mt-2 w-full px-4 py-3.5 rounded-2xl border-2 border-zinc-200 bg-zinc-50 focus:bg-white focus:border-black focus:outline-none text-center tracking-[0.3em] font-mono text-lg transition" />
              </div>

              <button onClick={()=>checkAuth(pass)} disabled={loading || !pass} className="w-full py-3.5 rounded-2xl bg-black text-white font-black text-[15px] hover:bg-zinc-800 disabled:opacity-40 disabled:cursor-not-allowed transition flex items-center justify-center gap-2">
                {loading ? "جاري التحقق..." : "دخول لوحة التحكم →"}
              </button>

              {error && <div className="p-3.5 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-sm font-bold text-center">{error}</div>}

              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
                <div className="text-xs font-black text-amber-800">💡 بيانات الدخول الافتراضية</div>
                <div className="mt-2 font-mono text-sm bg-white border rounded-xl px-3 py-2 flex items-center justify-between">
                  <span className="font-black tracking-widest">yaz@#spd</span>
                  <button onClick={()=>{navigator.clipboard.writeText("yaz@#spd"); showMsg("تم نسخ الباس", "ok")}} className="text-xs px-3 py-1 rounded-full bg-black text-white font-bold">نسخ</button>
                </div>
                <div className="text-[11px] text-amber-700 mt-2 leading-relaxed">هذه اللوحة مخفية تماماً عن موقع المستخدمين. لا يوجد أي رابط لها في الموقع العام.</div>
              </div>

              <div className="flex items-center justify-center gap-2 text-xs text-zinc-400 pt-2 border-t">
                <a href="https://t.me/YAZsalaq" target="_blank" className="hover:text-black font-bold">✈️ دعم تيليجرام</a>
                <span>•</span>
                <span>yaz SPD v1.0</span>
              </div>
            </div>
          </div>

          <div className="text-center mt-6 text-xs text-zinc-500">© 2026 yaz • كل الحقوق محفوظة • <span className="text-zinc-300">التحميل قريباً</span></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f9fb]" dir="rtl">
      {/* Top Bar */}
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-zinc-200">
        <div className="max-w-[1200px] mx-auto px-6 h-[64px] flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-black text-white grid place-items-center font-black shadow">yaz</div>
            <div>
              <div className="font-black text-[15px] leading-none">yaz SPD — لوحة التحكم</div>
              <div className="text-xs text-zinc-500">إدارة السيريالات والكريدت • الموزع المعتمد</div>
            </div>
            <span className="hidden lg:inline-flex ml-2 px-3 py-1 rounded-full bg-emerald-500 text-white text-xs font-black">● Online</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="hidden md:flex items-center gap-3 pl-3 pr-4 py-2 rounded-full bg-zinc-900 text-white">
              <span className="w-8 h-8 rounded-full bg-emerald-500 grid place-items-center text-sm">💳</span>
              <div className="text-left" dir="ltr">
                <div className="text-sm font-black leading-none">{credits?.balance ?? 0} كريدت</div>
                <div className="text-[11px] text-zinc-400 leading-none">${credits?.balance ?? 0} • يكفي {canRegister} جهاز</div>
              </div>
            </div>
            <a href="https://t.me/YAZsalaq" target="_blank" className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0088cc] text-white text-sm font-black hover:opacity-90">✈️ تيليجرام</a>
            <button onClick={handleLogout} className="px-4 py-2 rounded-full border border-zinc-200 bg-white text-sm font-bold hover:bg-zinc-50">خروج</button>
          </div>
        </div>
      </header>

      {/* Alerts */}
      {msg && (
        <div className={`max-w-[1200px] mx-auto px-6 mt-4`}>
          <div className={`p-4 rounded-2xl border-2 font-bold text-sm flex items-center justify-between ${msgType==='ok' ? "bg-emerald-50 border-emerald-200 text-emerald-800" : "bg-red-50 border-red-200 text-red-800"}`}>
            <span>{msg}</span>
            <button onClick={()=>setMsg("")} className="text-xs px-3 py-1 rounded-full bg-white border font-black">إغلاق</button>
          </div>
        </div>
      )}

      <main className="max-w-[1200px] mx-auto px-6 py-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-[20px] p-5 border border-zinc-200 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white grid place-items-center">💰</div>
            <div className="text-xs font-bold text-zinc-500 mt-3">الرصيد الحالي</div>
            <div className="text-[28px] font-black leading-none mt-1">{credits?.balance ?? 0} <span className="text-sm font-bold text-zinc-400">كريدت</span></div>
            <div className="text-xs text-zinc-400 mt-1">${credits?.balance ?? 0} • 1 كريدت = $1</div>
          </div>
          <div className="bg-white rounded-[20px] p-5 border border-zinc-200 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white grid place-items-center">📱</div>
            <div className="text-xs font-bold text-zinc-500 mt-3">أجهزة مسجلة</div>
            <div className="text-[28px] font-black leading-none mt-1">{lics.length}</div>
            <div className="text-xs text-zinc-400 mt-1">كل جهاز 4 كريدت ($4)</div>
          </div>
          <div className="bg-white rounded-[20px] p-5 border border-zinc-200 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-zinc-900 text-white grid place-items-center">📊</div>
            <div className="text-xs font-bold text-zinc-500 mt-3">مستهلك</div>
            <div className="text-[28px] font-black leading-none mt-1">{credits?.totalUsed ?? 0}</div>
            <div className="text-xs text-zinc-400 mt-1">كريدت منذ البداية</div>
          </div>
          <div className="bg-gradient-to-br from-blue-600 to-cyan-500 rounded-[20px] p-5 text-white shadow-lg shadow-blue-500/20">
            <div className="w-10 h-10 rounded-xl bg-white/20 grid place-items-center">✅</div>
            <div className="text-xs font-bold text-blue-100 mt-3">يمكن تسجيل</div>
            <div className="text-[28px] font-black leading-none mt-1">{canRegister} <span className="text-sm font-bold text-blue-100">جهاز</span></div>
            <div className="text-xs text-blue-100 mt-1">بدون شحن إضافي</div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Register Serial - Main Action */}
          <div className="lg:col-span-2 bg-white rounded-[24px] border border-zinc-200 shadow-sm overflow-hidden">
            <div className="bg-gradient-to-r from-zinc-900 to-black p-6 text-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white text-black grid place-items-center font-black">＋</div>
                <div>
                  <div className="font-black text-lg leading-none">تسجيل سيريال جديد</div>
                  <div className="text-xs text-zinc-400 mt-1">4 كريدت ($4) لكل جهاز • يبقى مسجل للأبد بدون إعادة دفع</div>
                </div>
                <span className="mr-auto hidden sm:inline-flex px-3 py-1 rounded-full bg-emerald-500 text-white text-xs font-black">خصم تلقائي 4</span>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="text-xs font-black text-zinc-700 flex items-center gap-2">السيريال <span className="text-red-500">*</span> <span className="text-zinc-400 font-normal">انسخه من رسالة الأداة</span></label>
                <input value={newSerial} onChange={e=>setNewSerial(e.target.value)} placeholder="مثال: MB1234567890ABCDEF" dir="ltr" className="mt-2 w-full px-4 py-3.5 rounded-2xl border-2 border-zinc-200 bg-zinc-50 focus:bg-white focus:border-black focus:outline-none font-mono text-sm tracking-widest dir-ltr" />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-zinc-600">الهاش (اختياري)</label>
                  <input value={newHash} onChange={e=>setNewHash(e.target.value)} placeholder="SHA HASH" dir="ltr" className="mt-2 w-full px-4 py-3 rounded-2xl border border-zinc-200 bg-white focus:border-black focus:outline-none font-mono text-xs dir-ltr" />
                </div>
                <div>
                  <label className="text-xs font-bold text-zinc-600">موديل الجهاز (اختياري)</label>
                  <input value={newDevice} onChange={e=>setNewDevice(e.target.value)} placeholder="مثال: Infinix Hot 12 Play" className="mt-2 w-full px-4 py-3 rounded-2xl border border-zinc-200 bg-white focus:border-black focus:outline-none text-sm" />
                </div>
              </div>
              <button onClick={handleAdd} disabled={loading} className="w-full py-4 rounded-2xl bg-blue-600 text-white font-black text-[15px] hover:bg-blue-700 disabled:opacity-40 flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20">
                {loading ? "جاري التسجيل..." : "✓ تسجيل الآن — خصم 4 كريدت ($4)"}
              </button>
              <div className="flex gap-2 text-xs">
                <span className="px-3 py-1 rounded-full bg-zinc-100 border text-zinc-600">💡 بعد التسجيل يبقى للأبد</span>
                <span className="px-3 py-1 rounded-full bg-zinc-100 border text-zinc-600">🔒 لا يمكن تسجيل نفس السيريال مرتين</span>
              </div>
            </div>
          </div>

          {/* Credits */}
          <div className="bg-white rounded-[24px] border border-zinc-200 shadow-sm overflow-hidden">
            <div className="p-6">
              <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white grid place-items-center">💳</div>
              <div className="font-black mt-3">شحن رصيد</div>
              <div className="text-xs text-zinc-500">1 كريدت = $1 • أضف رصيد للموزع</div>
              <div className="mt-5">
                <label className="text-xs font-bold text-zinc-700">الكمية</label>
                <div className="mt-2 flex gap-2">
                  <input value={addAmount} onChange={e=>setAddAmount(e.target.value)} type="number" className="flex-1 px-4 py-3 rounded-2xl border-2 border-zinc-200 bg-zinc-50 focus:bg-white focus:border-black focus:outline-none font-black text-center" />
                  <button onClick={handleAddCredits} disabled={loading} className="px-6 py-3 rounded-2xl bg-emerald-600 text-white font-black hover:bg-emerald-700 disabled:opacity-40">+ شحن</button>
                </div>
                <div className="mt-3 grid grid-cols-3 gap-2">
                  {[10,25,50,100].map(n=> (
                    <button key={n} onClick={()=>setAddAmount(String(n))} className={`py-2 rounded-xl border-2 font-black text-sm ${addAmount===String(n) ? "bg-black text-white border-black" : "bg-white border-zinc-200 hover:border-black"}`}>{n}</button>
                  ))}
                </div>
              </div>
              <div className="mt-5 p-4 rounded-2xl bg-zinc-900 text-white">
                <div className="text-xs text-zinc-400">الرصيد بعد الشحن يكفي لـ</div>
                <div className="text-lg font-black mt-1">{Math.floor(( (credits?.balance||0) + parseInt(addAmount||"0"))/4)} جهاز إضافي</div>
              </div>
              <div className="mt-4 text-xs text-zinc-400 leading-relaxed">الشحن فوري ويظهر في السجل. كل تسجيل يخصم تلقائياً.</div>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-[24px] border border-zinc-200 shadow-sm overflow-hidden">
          <div className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b bg-zinc-50/50">
            <div>
              <div className="font-black text-lg">الأجهزة المسجلة <span className="px-2.5 py-1 rounded-full bg-black text-white text-xs">{lics.length}</span></div>
              <div className="text-xs text-zinc-500">كل سيريال مسجل يبقى للأبد • البحث بالسيريال أو الموديل</div>
            </div>
            <div className="flex gap-2">
              <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="بحث..." className="px-4 py-2.5 rounded-full border bg-white text-sm w-48 focus:border-black focus:outline-none" />
              <button onClick={()=>loadData(pass)} className="px-5 py-2.5 rounded-full bg-black text-white text-sm font-black hover:bg-zinc-800">تحديث</button>
            </div>
          </div>
          {filtered.length===0 ? (
            <div className="p-12 text-center">
              <div className="w-16 h-16 rounded-2xl bg-zinc-100 border-2 border-dashed border-zinc-300 grid place-items-center mx-auto text-2xl">📭</div>
              <div className="font-black mt-4">{lics.length===0 ? "لا يوجد أجهزة مسجلة بعد" : "لا نتائج للبحث"}</div>
              <div className="text-sm text-zinc-500 mt-1">أضف أول سيريال من الحقل أعلاه — 4 كريدت فقط</div>
            </div>
          ):(
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="text-xs font-black text-zinc-500 bg-zinc-50 border-b">
                  <tr><th className="p-4 text-right">السيريال</th><th className="p-4 text-right">الهاش</th><th className="p-4 text-right">الجهاز</th><th className="p-4 text-right">التاريخ</th><th className="p-4 text-center">كريدت</th><th className="p-4"></th></tr>
                </thead>
                <tbody className="divide-y">
                  {filtered.map(l=> (
                    <tr key={l.serial} className="hover:bg-zinc-50/70 transition">
                      <td className="p-4 font-mono text-xs font-bold dir-ltr" dir="ltr"><span className="px-2.5 py-1 rounded-full bg-zinc-900 text-white">{l.serial}</span></td>
                      <td className="p-4 font-mono text-[11px] text-zinc-500 dir-ltr" dir="ltr">{l.hash || <span className="text-zinc-300">—</span>}</td>
                      <td className="p-4 text-sm font-bold">{l.device || <span className="text-zinc-300">—</span>}</td>
                      <td className="p-4 text-xs text-zinc-500 whitespace-nowrap">{new Date(l.addedAt).toLocaleDateString("ar-EG")} <span className="text-zinc-300">{new Date(l.addedAt).toLocaleTimeString("ar-EG")}</span></td>
                      <td className="p-4 text-center"><span className="px-3 py-1 rounded-full bg-blue-600 text-white text-xs font-black">{l.creditsUsed}</span></td>
                      <td className="p-4"><button onClick={()=>handleDelete(l.serial)} className="px-3 py-1.5 rounded-full bg-red-50 text-red-600 border border-red-200 text-xs font-black hover:bg-red-600 hover:text-white transition">حذف</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          <div className="p-4 bg-zinc-50 border-t flex flex-wrap gap-2">
            <a href="https://t.me/YAZsalaq" target="_blank" className="px-4 py-2 rounded-full bg-[#0088cc] text-white text-sm font-black">✈️ تيليجرام الموزع</a>
            <button onClick={()=>{navigator.clipboard.writeText(JSON.stringify(filtered,null,2)); showMsg("تم نسخ JSON", "ok")}} className="px-4 py-2 rounded-full bg-white border text-sm font-bold hover:bg-zinc-900 hover:text-white transition">📋 نسخ الكل JSON</button>
            <span className="mr-auto text-xs text-zinc-400 self-center">يتم الحفظ في السيرفر تلقائياً • /tmp + GitHub</span>
          </div>
        </div>

        {/* History */}
        {credits?.history && (
          <div className="bg-white rounded-[24px] border border-zinc-200 shadow-sm p-6">
            <div className="font-black">سجل الكريدت — آخر 20 عملية</div>
            <div className="mt-4 space-y-2 max-h-[320px] overflow-y-auto pr-1">
              {credits.history.slice().reverse().slice(0,20).map((h:any,i:number)=> (
                <div key={i} className={`p-4 rounded-2xl border flex items-center justify-between ${h.type==="add"?"bg-emerald-50 border-emerald-200":"bg-red-50 border-red-200"}`}>
                  <div className="flex items-center gap-3">
                    <span className={`w-8 h-8 rounded-full grid place-items-center text-sm font-black ${h.type==="add"?"bg-emerald-500 text-white":"bg-red-500 text-white"}`}>{h.type==="add"?"+":"−"}</span>
                    <div>
                      <div className="font-black text-sm">{h.type==="add"?"+":"−"}{h.amount} كريدت <span className="font-normal text-zinc-500">• {h.reason}</span></div>
                      <div className="text-xs text-zinc-500">{new Date(h.at).toLocaleString("ar-EG")}</div>
                    </div>
                  </div>
                  <div className={`text-xs font-black px-3 py-1 rounded-full ${h.type==="add"?"bg-emerald-500 text-white":"bg-red-500 text-white"}`}>{h.type==="add"?"شحن":"خصم"}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      <footer className="max-w-[1200px] mx-auto px-6 py-8 text-center text-xs text-zinc-400">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border">yaz SPD Admin • الباس: yaz@#spd • مخفي عن المستخدمين • <a href="https://t.me/YAZsalaq" className="underline font-black text-black">t.me/YAZsalaq</a></div>
      </footer>
    </div>
  );
}
