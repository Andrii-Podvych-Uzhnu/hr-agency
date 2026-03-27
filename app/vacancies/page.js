import { Suspense } from 'react'
import { vacancies } from '@/lib/data'
import VacancyCard from '@/components/VacancyCard'
import { PostSkeleton } from '@/components/skeletons/PostSkeleton'

async function VacancyList({ query }) {
  await new Promise(resolve => setTimeout(resolve, 1500))
  
  const filtered = query 
    ? vacancies.filter(v => 
        v.title.toLowerCase().includes(query.toLowerCase()) || 
        v.company.toLowerCase().includes(query.toLowerCase())
      )
    : vacancies

  if (filtered.length === 0) {
    return (
      <div className="bg-slate-50 border border-slate-100 rounded-[2rem] p-12 text-center">
        <p className="text-slate-500 font-bold text-lg">Нічого не знайдено за запитом "{query}"</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filtered.map(v => (
        <VacancyCard key={v.id} {...v} />
      ))}
    </div>
  )
}

export default async function VacanciesPage({ searchParams }) {
  const resolvedParams = await searchParams
  const query = resolvedParams?.q || ''

  return (
    <div className="bg-slate-50 min-h-screen py-16 font-sans">
      <div className="container mx-auto px-6 max-w-7xl">
        <h1 className="text-4xl font-black text-slate-900 mb-8 tracking-tight">Вакансії</h1>
        
        <form className="mb-12">
          <div className="relative max-w-2xl">
            <input 
              type="text" 
              name="q" 
              defaultValue={query}
              placeholder="Пошук за посадою або компанією..." 
              className="w-full px-6 py-4 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-600 shadow-sm font-medium text-slate-900 pr-32"
            />
            <button 
              type="submit" 
              className="absolute right-2 top-2 bottom-2 bg-indigo-600 text-white px-6 rounded-xl font-bold hover:bg-indigo-700 transition-colors"
            >
              Знайти
            </button>
          </div>
        </form>

        <Suspense key={query} fallback={
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <PostSkeleton />
            <PostSkeleton />
            <PostSkeleton />
          </div>
        }>
          <VacancyList query={query} />
        </Suspense>
      </div>
    </div>
  )
}