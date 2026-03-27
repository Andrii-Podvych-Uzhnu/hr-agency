'use client'

import { useRouter } from 'next/navigation'

export default function VacancyActions({ vacancyId, vacancyTitle }) {
  const router = useRouter()

  async function handleDelete() {
    if (!confirm(`Ви впевнені, що хочете видалити вакансію "${vacancyTitle}"?`)) return

    try {
      const response = await fetch(`/api/vacancies/${vacancyId}`, {
        method: 'DELETE'
      })

      if (!response.ok) {
        throw new Error('Помилка видалення')
      }

      
      router.push('/dashboard/vacancies')
      
      router.refresh()
    } catch (err) {
      alert(err.message)
    }
  }

  return (
    <div className="flex gap-4">
      <button
        onClick={handleDelete}
        className="bg-red-500 text-white px-6 py-3 rounded-xl font-black uppercase tracking-widest text-xs hover:bg-red-600 transition-all shadow-lg shadow-red-100"
      >
        Видалити вакансію
      </button>
    </div>
  )
}