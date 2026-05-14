'use client'

import { useState } from 'react'
import Link from 'next/link'

const CATEGORIES = ['IT', 'Security', 'HR', 'Management']
const TYPES = ['Remote', 'Office', 'Hybrid']

export default function VacancyForm({
  initialData, onSubmit, submitLabel = 'Зберегти',
  isSubmitting, error
}) {
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    company: initialData?.company || '',
    category: initialData?.category || '',
    type: initialData?.type || 'Remote',
    salary: initialData?.salary || '',
    description: initialData?.description || '',
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit({ ...formData, salary: Number(formData.salary) })
  }

  return (
    <>
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-slate-700 font-bold mb-2">Назва посади *</label>
            <input type="text" name="title" value={formData.title} onChange={handleChange} required className="w-full px-4 py-2 border rounded focus:outline-none focus:border-indigo-500" />
          </div>
          <div>
            <label className="block text-slate-700 font-bold mb-2">Компанія *</label>
            <input type="text" name="company" value={formData.company} onChange={handleChange} required className="w-full px-4 py-2 border rounded focus:outline-none focus:border-indigo-500" />
          </div>
          <div>
            <label className="block text-slate-700 font-bold mb-2">Категорія *</label>
            <select name="category" value={formData.category} onChange={handleChange} required className="w-full px-4 py-2 border rounded focus:outline-none focus:border-indigo-500">
              <option value="">Оберіть категорію</option>
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-slate-700 font-bold mb-2">Тип зайнятості *</label>
            <select name="type" value={formData.type} onChange={handleChange} required className="w-full px-4 py-2 border rounded focus:outline-none focus:border-indigo-500">
              {TYPES.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-slate-700 font-bold mb-2">Зарплата (₴) *</label>
            <input type="number" name="salary" value={formData.salary} onChange={handleChange} required min="1" className="w-full px-4 py-2 border rounded focus:outline-none focus:border-indigo-500" />
          </div>
        </div>

        <div>
          <label className="block text-slate-700 font-bold mb-2">Опис вакансії</label>
          <textarea name="description" value={formData.description} onChange={handleChange} rows="4" className="w-full px-4 py-2 border rounded focus:outline-none focus:border-indigo-500" />
        </div>

        <div className="flex gap-4">
          <button type="submit" disabled={isSubmitting} className="bg-indigo-600 text-white px-6 py-3 rounded hover:bg-indigo-700 font-bold disabled:opacity-50">
            {isSubmitting ? 'Збереження...' : submitLabel}
          </button>
          <Link href="/dashboard/vacancies" className="bg-slate-200 text-slate-700 px-6 py-3 rounded hover:bg-slate-300 font-bold inline-block">
            Скасувати
          </Link>
        </div>
      </form>
    </>
  )
}