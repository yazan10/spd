"use client";
import { useState } from "react";

const SUPPORTED = [
  { brand: "Infinix", devices: ["Hot 10i PR652B", "Hot 12 Play X6816C", "Hot 12 Play NFC X6816D / X6816DRU", "Smart 6 X6511 / X6511B"] },
  { brand: "Realme", devices: ["C11 RMX3231", "C21Y RMX3261 / RMX3263", "C25Y RMX3265 / RMX3269", "C30 RMX3581", "C31 RMX3501", "C35 RMX3511", "Narzo 50A Prime RMX3516"] },
  { brand: "Techno", devices: ["Pop 4 BC2C", "Pop 5 BD2 / BD2P / Go BD1 / Lte BD4", "Pova Neo LE6H", "Spark 7 PR651 / PR651E / PR651H", "Spark 8C KG5K"] },
];

export default function Home() {
  const [serial, setSerial] = useState("");
  const [checkResult, setCheckResult] = useState<null | {valid:boolean}>(null);
  const [loading, setLoading] = useState(false);

  async function handleCheck() {
    if (!serial.trim()) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/check-serial`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ serial: serial.trim() })
      });
      const data = await res.json();
      setCheckResult(data);
    } catch { setCheckResult({ valid: false }); }
    setLoading(false);
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center text-white font-black text-lg">yaz</div>
            <div>
              <div className="font-black text-xl leading-none">yaz SPD</div>
              <div className="text-xs text-zinc-500">UniSPD FRP Tools</div>
            </div>
            <span className="hidden sm:inline-flex ml-3 px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold">v1.0 • 2026</span>
          </div>
          <div className="flex items-center gap-2">
            <a href="https://t.me/YAZsalaq" target="_blank" className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0088cc] text-white text-sm font-bold hover:opacity-90">✈️ تيليجرام</a>
            <a href="#download" className="px-5 py-2.5 rounded-full bg-black text-white text-sm font-bold hover:bg-zinc-800">تحميل الأداة</a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-12 pb-8">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-sm font-bold">🔓 أداة احترافية لـ Spreadtrum</div>
            <h1 className="mt-4 text-4xl lg:text-5xl font-black leading-tight">yaz SPD <span className="text-blue-600">لفك القفل</span><br/>بضغطة واحدة</h1>
            <p className="mt-4 text-lg text-zinc-600 leading-relaxed">أداة Windows لفك FRP وإزالة القفل لأجهزة Unisoc عبر Download Mode. دعم 25 جهاز حقيقي مع حماية سيريال ونظام كريدت.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="#pricing" className="px-6 py-3 rounded-full bg-blue-600 text-white font-bold hover:bg-blue-700">💳 الأسعار - 4 كريدت / جهاز</a>
              <a href="https://t.me/YAZsalaq" target="_blank" className="px-6 py-3 rounded-full border border-zinc-200 bg-white font-bold hover:bg-zinc-50">تواصل مع الموزع ✈️</a>
            </div>
            <div className="mt-8 grid grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-white border text-center"><div className="text-2xl font-black">25</div><div className="text-xs text-zinc-500">جهاز مدعوم</div></div>
              <div className="p-4 rounded-2xl bg-white border text-center"><div className="text-2xl font-black">$4</div><div className="text-xs text-zinc-500">لكل جهاز (4 كريدت)</div></div>
              <div className="p-4 rounded-2xl bg-white border text-center"><div className="text-2xl font-black">∞</div><div className="text-xs text-zinc-500">مرة واحدة للأبد</div></div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-zinc-900 to-black rounded-[2rem] p-8 text-white relative overflow-hidden">
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl"></div>
            <div className="relative">
              <div className="text-sm text-zinc-400 font-mono">yaz SPD &gt; check-serial</div>
              <h3 className="mt-3 text-xl font-bold">تحقق هل سيريالك مسجل؟</h3>
              <p className="text-sm text-zinc-400 mt-2">بعد ما تقرأ الأداة سيريال جهازك، سيتم التحقق من السيرفر تلقائياً. إذا غير مسجل ستظهر رسالة مع رابط التيليجرام.</p>
              <div className="mt-6 space-y-3">
                <input value={serial} onChange={e=>setSerial(e.target.value)} placeholder="أدخل السيريال هنا (مثال: 1234ABCD...)" className="w-full px-4 py-3 rounded-xl bg-zinc-800 border border-zinc-700 text-white placeholder:text-zinc-500 text-left dir-ltr" dir="ltr" />
                <button onClick={handleCheck} disabled={loading} className="w-full py-3 rounded-xl bg-blue-600 font-bold hover:bg-blue-700 disabled:opacity-50">{loading?"جاري التحقق...":"تحقق الآن"}</button>
                {checkResult!==null && (
                  <div className={`p-4 rounded-xl text-sm font-bold ${checkResult.valid ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30" : "bg-red-500/20 text-red-300 border border-red-500/30"}`}>
                    {checkResult.valid ? "✅ السيريال مسجل - الأداة ستعمل بدون مشاكل وللأبد" : "⛔ السيريال غير مسجل - يرجى التواصل مع الموزع عبر تيليجرام"}
                    {!checkResult.valid && <div className="mt-2"><a href="https://t.me/YAZsalaq" target="_blank" className="underline">https://t.me/YAZsalaq ✈️</a></div>}
                  </div>
                )}
              </div>
              <div className="mt-6 p-3 rounded-xl bg-white/10 border border-white/10 text-xs leading-relaxed">💡 بعد تسجيل السيريال مرة واحدة، يبقى مسجل للأبد ويمكن للزبون عمل ما يريد بدون مطالبة تسجيل مرة أخرى.</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { t: "فك FRP فوري", d: "إزالة قفل جوجل FRP لأجهزة SPD بضغطة واحدة عبر persist partition", i: "🔓" },
            { t: "حماية سيريال", d: "الأداة لا تعمل إلا بعد تسجيل سيريال الجهاز عبر الموزع", i: "🛡️" },
            { t: "بدون إعادة تسجيل", d: "بعد التسجيل يبقى الجهاز مسجل للأبد بدون رسوم إضافية", i: "♾️" },
            { t: "واجهة سهلة", d: "اختر الموديل واضغط العملية - كل شيء تلقائي مع شريط تقدم", i: "🖥️" },
            { t: "دعم FDL حقيقي", d: "تحميل FDL1/FDL2 الأصلي لكل موديل مع إعدادات العناوين الصحيحة", i: "⚡" },
            { t: "دعم فني تيليجرام", d: "تواصل مباشر مع المطور yaz عبر تيليجرام للمساعدة والكريدت", i: "✈️" },
          ].map(f=> (
            <div key={f.t} className="p-6 rounded-2xl bg-white border hover:shadow-lg transition">
              <div className="text-2xl">{f.i}</div>
              <div className="mt-2 font-black">{f.t}</div>
              <div className="text-sm text-zinc-500 mt-1 leading-relaxed">{f.d}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="max-w-6xl mx-auto px-6 py-8">
        <div className="rounded-[2rem] bg-white border p-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-black">نظام الكريدت</h2>
              <p className="text-zinc-500 mt-1">الدفع مرة واحدة لكل جهاز - لا اشتراك شهري</p>
            </div>
            <a href="https://t.me/YAZsalaq" target="_blank" className="px-6 py-3 rounded-full bg-[#0088cc] text-white font-bold">اشحن الآن ✈️</a>
          </div>
          <div className="grid md:grid-cols-3 gap-4 mt-8">
            <div className="p-6 rounded-2xl border-2 border-blue-600 bg-blue-50 relative">
              <div className="absolute -top-3 right-6 px-3 py-1 rounded-full bg-blue-600 text-white text-xs font-bold">الأكثر طلباً</div>
              <div className="text-sm font-bold text-blue-700">سعر الجهاز الواحد</div>
              <div className="mt-2 flex items-baseline gap-2"><span className="text-4xl font-black">4</span><span className="font-bold">كريدت</span><span className="text-zinc-500">= $4</span></div>
              <div className="text-xs text-zinc-500 mt-1">1 كريدت = 1 دولار</div>
              <ul className="mt-4 space-y-2 text-sm">
                <li>✅ تسجيل سيريال واحد للأبد</li>
                <li>✅ يشمل كل العمليات (FRP + Wipe)</li>
                <li>✅ بدون إعادة دفع لنفس السيريال</li>
              </ul>
            </div>
            <div className="p-6 rounded-2xl border bg-zinc-50">
              <div className="text-sm font-bold">مثال: باقة 100 كريدت</div>
              <div className="mt-2 text-3xl font-black">$100 <span className="text-base font-normal text-zinc-500">= 25 جهاز</span></div>
              <div className="mt-4 text-sm text-zinc-600">يكفي لـ 25 جهاز SPD مختلف (25 × 4 = 100)</div>
              <div className="mt-2 text-xs text-zinc-400">الرصيد يبقى حتى الاستهلاك - لا انتهاء</div>
            </div>
            <div className="p-6 rounded-2xl border bg-zinc-50">
              <div className="text-sm font-bold">كيف تعمل؟</div>
              <ol className="mt-3 space-y-2 text-sm list-decimal list-inside text-zinc-600">
                <li>الأداة تقرأ سيريال جهازك</li>
                <li>تتحقق من السيرفر</li>
                <li>إذا غير مسجل: تظهر رسالة + رابط تيليجرام</li>
                <li>الموزع يسجل السيريال (4 كريدت)</li>
                <li>يعمل للأبد بدون تسجيل مرة أخرى</li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* Devices */}
      <section className="max-w-6xl mx-auto px-6 py-8">
        <h2 className="text-2xl font-black">الأجهزة المدعومة (25)</h2>
        <p className="text-zinc-500">جميعها SPD Unisoc - وضع Download</p>
        <div className="grid md:grid-cols-3 gap-4 mt-6">
          {SUPPORTED.map(g=> (
            <div key={g.brand} className="p-6 rounded-2xl bg-white border">
              <div className="font-black text-lg flex items-center gap-2"><span className="w-8 h-8 rounded-lg bg-black text-white grid place-items-center text-xs font-black">{g.brand[0]}</span>{g.brand}</div>
              <ul className="mt-3 space-y-1.5 text-sm">
                {g.devices.map(d=> <li key={d} className="flex gap-2"><span className="text-emerald-600">•</span><span className="text-zinc-700 dir-ltr" dir="ltr">{d}</span></li>)}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Download */}
      <section id="download" className="max-w-6xl mx-auto px-6 py-8">
        <div className="rounded-[2rem] bg-black text-white p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-black">حمّل yaz SPD الآن</h3>
            <p className="text-zinc-400 mt-1">Windows x86 • .NET 4.8 • واجهة رسومية</p>
            <div className="mt-3 flex flex-wrap gap-2 text-xs font-mono">
              <span className="px-3 py-1 rounded-full bg-white/10">yaz SPD v1.0</span>
              <span className="px-3 py-1 rounded-full bg-white/10">Insta: yaz.salaqq</span>
              <span className="px-3 py-1 rounded-full bg-white/10">FB: yazsalaq</span>
            </div>
          </div>
          <div className="flex gap-3">
            <a href="https://github.com/yazan10/spd" target="_blank" className="px-8 py-4 rounded-full bg-white text-black font-black hover:bg-zinc-100">⬇️ تحميل من GitHub</a>
            <a href="https://t.me/YAZsalaq" target="_blank" className="px-8 py-4 rounded-full bg-[#0088cc] text-white font-black">✈️ دعم</a>
          </div>
        </div>
      </section>

      <footer className="max-w-6xl mx-auto px-6 py-10 text-center text-sm text-zinc-500 border-t mt-8">
        <div className="font-bold text-zinc-900">yaz SPD • Developed by yaz</div>
        <div className="mt-1 flex flex-wrap justify-center gap-3">
          <a href="https://instagram.com/yaz.salaqq" target="_blank" className="hover:underline">IG: yaz.salaqq</a>
          <span>•</span>
          <a href="https://facebook.com/yazsalaq" target="_blank" className="hover:underline">FB: yazsalaq</a>
          <span>•</span>
          <a href="https://t.me/YAZsalaq" target="_blank" className="hover:underline">Telegram: t.me/YAZsalaq</a>
        </div>
        <div className="mt-2 text-xs">© 2026 yaz - جميع الحقوق محفوظة</div>
      </footer>
    </div>
  );
}
