'use client'
import { useState } from 'react'

export default function VacancyActions({ vacancyId }) {
  const [showConfirm, setShowConfirm] = useState(false)

  const handleDelete = () => {
    console.log(`Видалення вакансії ${vacancyId}...`)
   
    setShowConfirm(false)
    alert('Вакансію успішно видалено (імітація)!')
  }

  if (showConfirm) {
    return (
      <div className="flex items-center gap-3 bg-red-50 p-3 rounded-xl border border-red-100">
        <span className="text-red-700 font-bold text-sm">Точно видалити?</span>
        <button onClick={handleDelete} className="bg-red-600 text-white px-4 py-1.5 rounded-lg text-sm font-bold hover:bg-red-700 transition">
          Так
        </button>
        <button onClick={() => setShowConfirm(false)} className="bg-slate-200 text-slate-700 px-4 py-1.5 rounded-lg text-sm font-bold hover:bg-slate-300 transition">
          Ні
        </button>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-2">
      <button className="bg-slate-100 text-slate-700 px-4 py-2 rounded-xl text-sm font-bold hover:bg-slate-200 transition">
        Редагувати
      </button>
      <button onClick={() => setShowConfirm(true)} className="bg-red-100 text-red-600 px-4 py-2 rounded-xl text-sm font-bold hover:bg-red-200 transition">
        Видалити
      </button>
    </div>
  )
}