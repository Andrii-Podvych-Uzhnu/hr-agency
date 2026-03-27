export default async function CachedPage() {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts/1')
  await response.json()

  const hrPost = {
    title: "Як скласти ідеальне резюме у 2026 році",
    body: "Резюме — це ваша візитівка. Роботодавці витрачають в середньому 7 секунд на його перегляд. Дізнайтеся, як привернути увагу рекрутера з перших рядків, які навички варто виділити, а про що краще промовчати."
  }

  return (
    <div className="min-h-screen w-full bg-slate-50 py-12 font-sans text-slate-900">
      <div className="container mx-auto px-6 max-w-4xl">
        <h1 className="text-3xl font-black mb-6 text-slate-900">Закешований пост</h1>
        
        <div className="bg-blue-600 p-6 rounded-2xl mb-8 shadow-md">
          <p className="text-sm text-white font-medium mb-2">
            <strong className="font-black">Production:</strong> Цей контент закешований назавжди (на момент збірки).
          </p>
          <p className="text-sm text-blue-100 font-medium">
            <strong className="font-black">Dev-режим:</strong> В <code>npm run dev</code> кешування не працює.
          </p>
        </div>

        <article className="bg-white rounded-[2rem] shadow-xl p-10 border border-slate-200">
          <h2 className="text-3xl font-extrabold mb-6 text-slate-900">{hrPost.title}</h2>
          <p className="text-slate-600 text-lg leading-relaxed mb-10 font-medium">{hrPost.body}</p>
          
          <div className="pt-6 border-t border-slate-100 flex justify-between items-center">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Останнє оновлення</span>
            <span className="text-sm font-bold text-blue-600 bg-blue-50 px-4 py-2 rounded-full">
              {new Date().toLocaleTimeString()}
            </span>
          </div>
        </article>
      </div>
    </div>
  )
}