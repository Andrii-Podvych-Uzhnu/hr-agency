export default async function NoCachePage() {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts/3', {
    cache: 'no-store'
  })
  await response.json()

  const hrPost = {
    title: "Динаміка вакансій: Live-статистика",
    body: "Ринок праці постійно змінюється. На цій сторінці ми відображаємо найактуальнішу інформацію щодо кількості відкритих позицій та активності кандидатів без затримок та кешування."
  }

  return (
    <div className="min-h-screen w-full bg-slate-50 py-12 font-sans text-slate-900">
      <div className="container mx-auto px-6 max-w-4xl">
        <h1 className="text-3xl font-black mb-6 text-slate-900 tracking-tight">Пост без кешу (SSR)</h1>
        
        <div className="bg-red-600 p-6 rounded-2xl mb-8 shadow-md border border-red-500">
          <p className="text-sm text-white font-bold mb-2 uppercase tracking-wide">
            Production: <span className="font-medium normal-case">Цей пост НЕ кешується. Кожне оновлення робить новий запит.</span>
          </p>
          <p className="text-sm text-red-100 font-medium">
            Dev-режим: <span className="italic text-red-50">Всі три варіанти поводяться однаково.</span>
          </p>
        </div>

        <article className="bg-white rounded-[2rem] shadow-xl p-10 border border-slate-200">
          <h2 className="text-3xl font-extrabold mb-6 text-slate-900 leading-tight">{hrPost.title}</h2>
          <p className="text-slate-600 text-lg leading-relaxed mb-10 font-medium">{hrPost.body}</p>
          
          <div className="pt-6 border-t border-slate-100 flex justify-between items-center">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Час завантаження (Live)</span>
            <span className="text-sm font-bold text-red-600 bg-red-50 px-5 py-2.5 rounded-full border border-red-100 shadow-sm">
              {new Date().toLocaleTimeString()}
            </span>
          </div>
        </article>
      </div>
    </div>
  )
}