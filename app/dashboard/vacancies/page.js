'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function VacanciesDashboardPage() {
  const [vacancies, setVacancies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  async function fetchVacancies() {
    try {
      setLoading(true)
      const response = await fetch('/api/vacancies')
      if (!response.ok) throw new Error('Помилка завантаження')
      const data = await response.json()
      setVacancies(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchVacancies()
  }, [])

  async function handleDelete(id, title) {
    if (!confirm(`Видалити вакансію "${title}"?`)) return

    try {
      const response = await fetch(`/api/vacancies/${id}`, {
        method: 'DELETE'
      })
      if (!response.ok) throw new Error('Помилка видалення')
      setVacancies(prev => prev.filter(v => v.id !== id))
    } catch (err) {
      alert(err.message)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20 bg-slate-50 min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-8 bg-slate-50 min-h-screen text-center">
        <p className="text-red-600 font-bold">{error}</p>
        <button onClick={fetchVacancies} className="mt-4 text-indigo-600 underline">
          Спробувати знову
        </button>
      </div>
    )
  }

  return (
    <div className="bg-slate-50 min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-black text-slate-900">Вакансії ({vacancies.length})</h1>
          <Link
            href="/dashboard/vacancies/new"
            className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg"
          >
            + Додати вакансію
          </Link>
        </div>

        <div className="bg-white rounded-[2rem] shadow-xl overflow-hidden border border-slate-100">
          <table className="w-full">
            <thead className="bg-slate-900 text-white">
              <tr>
                <th className="px-8 py-5 text-left text-sm font-bold uppercase tracking-wider">Посада</th>
                <th className="px-8 py-5 text-left text-sm font-bold uppercase tracking-wider">Категорія</th>
                <th className="px-8 py-5 text-left text-sm font-bold uppercase tracking-wider">Зарплата</th>
                <th className="px-8 py-5 text-left text-sm font-bold uppercase tracking-wider">Статус</th>
                <th className="px-8 py-5 text-right text-sm font-bold uppercase tracking-wider">Дії</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {vacancies.map(vacancy => (
                <tr key={vacancy.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-8 py-5">
                    <div className="font-bold text-slate-900">{vacancy.title}</div>
                    <div className="text-slate-400 text-sm">{vacancy.company}</div>
                  </td>
                  <td className="px-8 py-5">
                    <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-bold uppercase">
                      {vacancy.category}
                    </span>
                  </td>
                  <td className="px-8 py-5 font-bold text-slate-700">
                    {vacancy.salary?.toLocaleString()} ₴
                  </td>
                  <td className="px-8 py-5">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                      vacancy.available ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {vacancy.available ? 'Активна' : 'Закрита'}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <button
                      onClick={() => handleDelete(vacancy.id, vacancy.title)}
                      className="text-red-500 hover:text-red-700 font-bold text-sm uppercase"
                    >
                      Видалити
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}