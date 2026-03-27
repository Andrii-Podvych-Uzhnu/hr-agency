'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function NewVacancyPage() {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)

  async function handleSubmit(e) {
    e.preventDefault()
    setSaving(true)
    setError(null)

    const formData = new FormData(e.target)
    const data = {
      title: formData.get('title'),
      company: formData.get('company'),
      category: formData.get('category'),
      salary: Number(formData.get('salary')),
      type: formData.get('type'),
      description: formData.get('description'),
      available: formData.get('available') === 'on'
    }

    try {
      const response = await fetch('/api/vacancies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })

      if (!response.ok) {
        const result = await response.json()
        throw new Error(result.error || 'Помилка створення')
      }

      router.push('/dashboard/vacancies')
      router.refresh()
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-2xl mx-auto">
        <Link href="/dashboard/vacancies" className="text-slate-400 font-bold hover:text-indigo-600 transition-colors uppercase text-xs tracking-widest">
          &larr; Назад до списку
        </Link>

        <h1 className="text-4xl font-black text-slate-900 tracking-tight mt-6 mb-10">
          Нова <span className="text-indigo-600">вакансія</span>
        </h1>

        {error && (
          <div className="bg-red-50 border-2 border-red-100 rounded-2xl p-4 mb-6">
            <p className="text-red-600 font-bold">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white rounded-[2.5rem] shadow-xl p-10 border border-slate-100">
          <div className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Назва посади *</label>
              <input
                type="text"
                name="title"
                required
                placeholder="Напр. Senior React Developer"
                className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-indigo-500 font-bold text-slate-700"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Компанія *</label>
                <input
                  type="text"
                  name="company"
                  required
                  className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-indigo-500 font-bold text-slate-700"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Категорія *</label>
                <select
                  name="category"
                  required
                  className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-indigo-500 font-bold text-slate-700 appearance-none"
                >
                  <option value="IT">IT</option>
                  <option value="Security">Security</option>
                  <option value="HR">HR</option>
                  <option value="Management">Management</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Зарплата (₴) *</label>
                <input
                  type="number"
                  name="salary"
                  min="1"
                  required
                  className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-indigo-500 font-bold text-slate-700"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Тип *</label>
                <select
                  name="type"
                  className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-indigo-500 font-bold text-slate-700 appearance-none"
                >
                  <option value="Remote">Remote</option>
                  <option value="Office">Office</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Опис вакансії</label>
              <textarea
                name="description"
                rows="4"
                className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-indigo-500 font-bold text-slate-700"
              ></textarea>
            </div>

            <div className="flex items-center gap-3 py-2">
              <input 
                type="checkbox" 
                name="available" 
                id="available"
                defaultChecked 
                className="w-5 h-5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
              />
              <label htmlFor="available" className="text-sm font-bold text-slate-600 uppercase tracking-wider cursor-pointer">Опублікувати відразу</label>
            </div>

            <button
              type="submit"
              disabled={saving}
              className="w-full bg-indigo-600 text-white py-5 rounded-2xl font-black uppercase tracking-[0.2em] hover:bg-indigo-700 disabled:opacity-50 transition-all shadow-lg shadow-indigo-100 mt-4"
            >
              {saving ? 'Збереження...' : 'Створити вакансію'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}