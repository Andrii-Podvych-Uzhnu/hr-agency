import { Suspense } from 'react'
import { PostSkeleton, StatsSkeleton } from '@/components/skeletons/PostSkeleton'
import { vacancies } from '@/lib/data'

async function FastAnalytics() {
  await new Promise(resolve => setTimeout(resolve, 500))

  const totalVacancies = vacancies.length
  const activeVacancies = vacancies.filter(v => v.available).length
  const avgSalary = Math.round(vacancies.reduce((acc, curr) => acc + curr.salary, 0) / totalVacancies)

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
      <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100">
        <h3 className="text-slate-400 text-sm font-bold uppercase tracking-widest mb-2">Всього вакансій</h3>
        <p className="text-4xl font-black text-indigo-600">{totalVacancies}</p>
      </div>
      <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100">
        <h3 className="text-slate-400 text-sm font-bold uppercase tracking-widest mb-2">Активні (Наразі)</h3>
        <p className="text-4xl font-black text-emerald-600">{activeVacancies}</p>
      </div>
      <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100">
        <h3 className="text-slate-400 text-sm font-bold uppercase tracking-widest mb-2">Середня зарплата</h3>
        <p className="text-4xl font-black text-blue-600">{avgSalary.toLocaleString()} ₴</p>
      </div>
    </div>
  )
}

async function SlowNews() {
  await new Promise(resolve => setTimeout(resolve, 3000))
  
  const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=3')
  const rawNews = await response.json()

  const realHrNews = [
    {
      title: "Тренди найму в IT на кінець року",
      body: "Аналіз нашої бази показує стабільний попит на розробників. Особливо зросла кількість вакансій для спеціалістів із кібербезпеки та DevOps-інженерів."
    },
    {
      title: "Як виділитися серед кандидатів?",
      body: "Технічних навичок вже недостатньо. Роботодавці все частіше звертають увагу на soft skills, вміння працювати в команді та адаптивність до нових умов."
    },
    {
      title: "Зарплатні очікування: що змінилося",
      body: "Детальний звіт по зарплатах. Чому важливо правильно оцінювати свій рівень на співбесіді та як аргументовано просити підвищення."
    }
  ]

  const news = rawNews.map((item, index) => ({
    ...item,
    title: realHrNews[index]?.title || item.title,
    body: realHrNews[index]?.body || item.body
  }))

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-black text-slate-900 mb-6">Аналітика ринку (завантажено за 3 сек)</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {news.map(item => (
          <article key={item.id} className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100 flex flex-col">
            <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-6">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-3 capitalize line-clamp-2">{item.title}</h3>
            <p className="text-slate-500 font-medium line-clamp-3">{item.body}</p>
          </article>
        ))}
      </div>
    </div>
  )
}

export default function StreamingPage() {
  return (
    <div className="bg-slate-50 min-h-screen py-16 font-sans">
      <div className="container mx-auto px-6 max-w-6xl">
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">Streaming Data</h1>
        
        <div className="bg-blue-50 border border-blue-100 p-6 rounded-2xl mb-12 shadow-sm">
          <p className="text-blue-800 font-medium">
            Базова статистика з'являється через 0.5 сек (береться з бази), а детальні статті — через 3 сек. 
            Next.js завантажує контент частинами, не блокуючи сторінку.
          </p>
        </div>

        <Suspense fallback={
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <StatsSkeleton />
            <StatsSkeleton />
            <StatsSkeleton />
          </div>
        }>
          <FastAnalytics />
        </Suspense>

        <Suspense fallback={
          <div className="space-y-6">
            <div className="h-8 bg-slate-200 rounded-full w-64 animate-pulse mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <PostSkeleton />
              <PostSkeleton />
              <PostSkeleton />
            </div>
          </div>
        }>
          <SlowNews />
        </Suspense>

      </div>
    </div>
  )
}