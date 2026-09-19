const SUPPORTED = [
  { brand: "Infinix", devices: ["Hot 10i PR652B", "Hot 12 Play X6816C", "Hot 12 Play NFC X6816D / X6816DRU", "Smart 6 X6511 / X6511B"] },
  { brand: "Realme", devices: ["C11 RMX3231", "C21Y RMX3261 / RMX3263", "C25Y RMX3265 / RMX3269", "C30 RMX3581", "C31 RMX3501", "C35 RMX3511", "Narzo 50A Prime RMX3516"] },
  { brand: "Techno", devices: ["Pop 4 BC2C", "Pop 5 BD2 / BD2P / Go BD1 / Lte BD4", "Pova Neo LE6H", "Spark 7 PR651 / PR651E / PR651H", "Spark 8C KG5K"] },
];

export default function Home() {

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
            <p className="mt-4 text-lg text-zinc-600 leading-relaxed">أداة Windows لفك FRP وإزالة القفل لأجهزة Unisoc عبر Download Mode. دعم 25 جهاز حقيقي مع حماية متقدمة ونظام كريدت.</p>
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
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-bold">✓ موثوق • سريع • آمن</div>
              <h3 className="mt-4 text-2xl font-black">جاهز للعمل فوراً</h3>
              <p className="text-sm text-zinc-400 mt-2">واجهة بسيطة، اختر الجهاز وابدأ العملية بضغطة واحدة بدون تعقيد.</p>
              <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="p-4 rounded-2xl bg-white/10 border border-white/10 text-center"><div className="text-xl font-black">25</div><div className="text-xs text-zinc-400">جهاز مدعوم</div></div>
                <div className="p-4 rounded-2xl bg-white/10 border border-white/10 text-center"><div className="text-xl font-black">1 click</div><div className="text-xs text-zinc-400">فك القفل</div></div>
              </div>
              <div className="mt-6">
                <a href="https://t.me/YAZsalaq" target="_blank" className="w-full py-3 rounded-xl bg-blue-600 text-white font-black text-center block hover:bg-blue-700">✈️ تواصل عبر تيليجرام</a>
              </div>
              <div className="mt-3 text-xs text-zinc-500 text-center">Windows x86 • .NET 4.8 • واجهة رسومية</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features - بدون شرح السيرفر */}
      <section className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { t: "فك FRP فوري", d: "إزالة قفل جوجل FRP لأجهزة SPD بضغطة واحدة", i: "🔓" },
            { t: "أمان وموثوقية", d: "حماية متقدمة وأداء مستقر لجميع الموديلات", i: "🛡️" },
            { t: "تحديثات مستمرة", d: "دعم متواصل وتحديثات دورية للأجهزة الجديدة", i: "♾️" },
            { t: "واجهة سهلة", d: "اختر الموديل واضغط العملية - كل شيء تلقائي مع شريط تقدم", i: "🖥️" },
            { t: "دعم FDL حقيقي", d: "تحميل FDL1/FDL2 الأصلي لكل موديل مع إعدادات العناوين الصحيحة", i: "⚡" },
            { t: "دعم فني تيليجرام", d: "تواصل مباشر مع المطور yaz عبر تيليجرام للمساعدة", i: "✈️" },
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
          <div className="grid md:grid-cols-2 gap-4 mt-8">
            <div className="p-6 rounded-2xl border-2 border-blue-600 bg-blue-50 relative">
              <div className="absolute -top-3 right-6 px-3 py-1 rounded-full bg-blue-600 text-white text-xs font-bold">الأكثر طلباً</div>
              <div className="text-sm font-bold text-blue-700">سعر الجهاز الواحد</div>
              <div className="mt-2 flex items-baseline gap-2"><span className="text-4xl font-black">4</span><span className="font-bold">كريدت</span><span className="text-zinc-500">= $4</span></div>
              <div className="text-xs text-zinc-500 mt-1">1 كريدت = 1 دولار</div>
              <ul className="mt-4 space-y-2 text-sm">
                <li>✅ يشمل كل العمليات (FRP + Wipe)</li>
                <li>✅ دعم فني عبر تيليجرام</li>
                <li>✅ تحديثات مستمرة</li>
              </ul>
            </div>
            <div className="p-6 rounded-2xl border bg-zinc-50">
              <div className="text-sm font-bold">مثال: باقة 100 كريدت</div>
              <div className="mt-2 text-3xl font-black">$100 <span className="text-base font-normal text-zinc-500">= 25 جهاز</span></div>
              <div className="mt-4 text-sm text-zinc-600">يكفي لـ 25 جهاز SPD مختلف (25 × 4 = 100)</div>
              <div className="mt-2 text-xs text-zinc-400">الرصيد يبقى حتى الاستهلاك - لا انتهاء</div>
              <a href="https://t.me/YAZsalaq" target="_blank" className="mt-4 inline-flex px-5 py-2.5 rounded-full bg-black text-white text-sm font-black">اشحن الآن ✈️</a>
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

      {/* Download - رابط التحميل سيضاف لاحقاً بدون أي إشارة لجيث هاب */}
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
            <a href="https://www.mediafire.com/file/qblpk7ktxdt3ary/yaz+SPD.zip/file" target="_blank" className="px-8 py-4 rounded-full bg-white text-black font-black hover:bg-zinc-100">⬇️ تحميل yaz SPD</a>
            <a href="https://t.me/YAZsalaq" target="_blank" className="px-8 py-4 rounded-full bg-[#0088cc] text-white font-black hover:bg-[#0099e6]">✈️ دعم</a>
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
