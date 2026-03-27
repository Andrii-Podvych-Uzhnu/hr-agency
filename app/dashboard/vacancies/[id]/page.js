'use client'

import { useState, useEffect, use } from 'react'
import Link from 'next/link'

export default function VacancyDetailPage({ params }) {
  const { id } = use(params)
  const [vacancy, setVacancy] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchVacancy() {
      try {
        const response = await fetch(`/api/vacancies/${id}`)
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('Вакансію не знайдено')
          }
          throw new Error('Помилка завантаження')
        }
        const data = await response.json()
        setVacancy(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchVacancy()
  }, [id])

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20 min-h-screen bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-20 min-h-screen bg-slate-50">
        <h1 className="text-6xl font-black text-slate-200 mb-4">404</h1>
        <p className="text-slate-600 font-bold mb-8 uppercase tracking-widest">{error}</p>
        <Link href="/dashboard/vacancies" className="text-indigo-600 font-bold hover:underline">
          &larr; До списку вакансій
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-4xl mx-auto">
        <Link href="/dashboard/vacancies" className="text-slate-400 font-bold hover:text-indigo-600 transition-colors uppercase text-xs tracking-widest">
          &larr; Назад до дашборду
        </Link>

        <div className="bg-white rounded-[2.5rem] shadow-xl p-10 mt-6 border border-slate-100">
          <div className="flex flex-col md:flex-row justify-between items-start mb-10 gap-4">
            <div>
              <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-2">{vacancy.title}</h1>
              <p className="text-xl font-bold text-indigo-600">{vacancy.company}</p>
            </div>
            <span className={`px-6 py-2 rounded-full text-xs font-black uppercase tracking-tighter ${
              vacancy.available ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
            }`}>
              {vacancy.available ? 'Активна' : 'Закрита'}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 border-t border-slate-50 pt-10">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Категорія</p>
              <p className="text-lg font-black text-slate-700">{vacancy.category}</p>
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Зарплата</p>
              <p className="text-lg font-black text-slate-700">{vacancy.salary?.toLocaleString()} ₴</p>
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Тип зайнятості</p>
              <p className="text-lg font-black text-slate-700">{vacancy.type || 'Remote'}</p>
            </div>
          </div>

          {vacancy.description && (
            <div className="mt-10 pt-10 border-t border-slate-50">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Опис позиції</p>
              <p className="text-slate-600 leading-relaxed font-medium text-lg">{vacancy.description}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}