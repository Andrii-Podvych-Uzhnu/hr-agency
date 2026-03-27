export const revalidate = 10

export default async function RevalidatedPage() {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts/2')
  await response.json()

  const hrPost = {
    title: "Топ-5 помилок на технічному інтерв'ю",
    body: "Хвилювання — нормальна річ, але деякі помилки можуть коштувати вам офферу. Розбираємо реальні кейси з практики наших HR-спеціалістів та вчимося уникати типових пасток на лайв-кодингу."
  }

  return (
    <div className="min-h-screen w-full bg-slate-50 py-12 font-sans text-slate-900">
      <div className="container mx-auto px-6 max-w-4xl">
        <h1 className="text-3xl font-black mb-6 text-slate-900 tracking-tight">Revalidated пост (ISR)</h1>
        
        <div className="bg-emerald-600 p-6 rounded-2xl mb-8 shadow-md border border-emerald-500">
          <p className="text-sm text-white font-bold mb-2 uppercase tracking-wide">
            Production: <span className="font-medium normal-case">Сторінка оновлюється у фоні не частіше, ніж раз на 10 секунд.</span>
          </p>
          <p className="text-sm text-emerald-100 font-medium">
            Dev-режим: <span className="italic text-emerald-50">В npm run dev revalidation не працює.</span>
          </p>
        </div>

        <article className="bg-white rounded-[2rem] shadow-xl p-10 border border-slate-200">
          <h2 className="text-3xl font-extrabold mb-6 text-slate-900 leading-tight">{hrPost.title}</h2>
          <p className="text-slate-600 text-lg leading-relaxed mb-10 font-medium">{hrPost.body}</p>
          
          <div className="pt-6 border-t border-slate-100 flex justify-between items-center">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Оновлено кожні 10 сек</span>
            <span className="text-sm font-bold text-emerald-600 bg-emerald-50 px-5 py-2.5 rounded-full border border-emerald-100 shadow-sm">
              {new Date().toLocaleTimeString()}
            </span>
          </div>
        </article>
      </div>
    </div>
  )
}