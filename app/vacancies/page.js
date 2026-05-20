import { Suspense } from 'react'
import dbConnect from '@/lib/db'
import Vacancy from '@/lib/models/Vacancy'
import VacancyCard from '@/components/VacancyCard'
import { PostSkeleton } from '@/components/skeletons/PostSkeleton'

export const dynamic = "force-dynamic";

async function VacancyList({ query }) {
  try {
    await dbConnect()

  
    const mongoQuery = query 
      ? {
          available: true, 
          $or: [
            { title: { $regex: query, $options: 'i' } },    
            { company: { $regex: query, $options: 'i' } }
          ]
        }
      : { available: true };

    
    const filtered = await Vacancy.find(mongoQuery).sort({ createdAt: -1 })

    if (filtered.length === 0) {
      return (
        <div className="bg-slate-50 border border-slate-100 rounded-[2rem] p-12 text-center">
          <p className="text-slate-500 font-bold text-lg">Нічого не знайдено за запитом "{query}"</p>
        </div>
      )
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(v => {
         
          const vacancyData = {
            id: v._id.toString(),
            title: v.title,
            company: v.company,
            category: v.category,
            salary: v.salary,
            available: v.available
          }
          return <VacancyCard key={vacancyData.id} {...vacancyData} />
        })}
      </div>
    )
  } catch (error) {
    console.error("Помилка завантаження публічних вакансій:", error)
    return (
      <div className="bg-red-50 border border-red-100 rounded-[2rem] p-12 text-center">
        <p className="text-red-600 font-bold text-lg">Не вдалося завантажити вакансії. Спробуйте пізніше.</p>
      </div>
    )
  }
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
              className="w-full px-6 py-4 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-600 shadow-sm font-medium text-slate-900 pr-32 bg-white"
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