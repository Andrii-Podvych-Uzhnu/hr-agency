import { Suspense } from 'react'
import StatsCard from "@/components/StatsCard"
import { getVacancyStats } from "@/lib/helpers"
import { StatsSkeleton } from '@/components/skeletons/PostSkeleton'

export const metadata = {
  title: "Дашборд | HR.agency",
}

async function DashboardStats() {
  await new Promise(resolve => setTimeout(resolve, 1500))
  const stats = await getVacancyStats() 

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatsCard title="Всього вакансій" value={stats.total} type="slate" />
      <StatsCard title="Активні" value={stats.available} type="emerald" />
      <StatsCard title="Категорії" value={stats.categoriesCount} type="blue" />
      <StatsCard title="Сер. зарплата" value={`${stats.avgSalary} ₴`} type="indigo" />
    </div>
  )
}

export default function DashboardPage() {
  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-4xl font-black text-slate-900 mb-2">Огляд платформи</h1>
      <p className="text-slate-500 mb-10 text-lg">Статистика активності HR.agency</p>
      
      <Suspense fallback={
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsSkeleton />
          <StatsSkeleton />
          <StatsSkeleton />
          <StatsSkeleton />
        </div>
      }>
        <DashboardStats />
      </Suspense>
    </div>
  )
}