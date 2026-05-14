'use client'

import { useEffect, useState, useMemo } from 'react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'

const emptyItem = () => ({ vacancy: '', coverLetter: '' })

export default function ApplicationForm({ onSubmit, isSubmitting, error }) {
  const { data: session } = useSession()
  const isAdmin = session?.user?.role === 'admin'

  const [vacancies, setVacancies] = useState([])
  const [items, setItems] = useState([emptyItem()])
  const [notes, setNotes] = useState('')
  const [loadingVacancies, setLoadingVacancies] = useState(true)
  const [users, setUsers] = useState([])
  const [userId, setUserId] = useState('')

  useEffect(() => {
    fetch('/api/vacancies')
      .then((res) => res.json())
      .then((data) => {
        setVacancies((data || []).filter((v) => v.available))
        setLoadingVacancies(false)
      })
      .catch(() => setLoadingVacancies(false))
  }, [])

  useEffect(() => {
    if (!isAdmin) return
    fetch('/api/users').then((res) => res.json()).then((data) => {
      if (Array.isArray(data)) setUsers(data)
    })
  }, [isAdmin])

  const updateItem = (index, patch) => {
    setItems((prev) => prev.map((it, i) => (i === index ? { ...it, ...patch } : it)))
  }

  const addItem = () => setItems((prev) => [...prev, emptyItem()])
  const removeItem = (index) => {
    setItems((prev) => (prev.length === 1 ? prev : prev.filter((_, i) => i !== index)))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const payload = {
      items: items.filter(it => it.vacancy),
      notes: notes.trim(),
    }
    if (isAdmin && userId) payload.user = userId
    onSubmit(payload)
  }

  if (loadingVacancies) return <div className="p-8 text-slate-500">Завантаження вакансій...</div>

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-[2rem] shadow-xl border border-slate-100">
      {error && <div className="bg-red-50 text-red-700 p-4 rounded-xl border border-red-100">{error}</div>}

      {isAdmin && (
        <div>
          <label className="block text-slate-700 font-bold mb-2">Кандидат (Admin only)</label>
          <select value={userId} onChange={(e) => setUserId(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none">
            <option value="">Оберіть користувача</option>
            {users.map((u) => (
              <option key={u._id} value={u._id}>{u.name} ({u.email})</option>
            ))}
          </select>
        </div>
      )}

      <div>
        <div className="flex justify-between items-center mb-4">
          <label className="block text-slate-700 font-bold text-lg">Обрані вакансії</label>
          <button type="button" onClick={addItem} className="text-indigo-600 hover:text-indigo-800 font-bold text-sm">+ Додати ще одну</button>
        </div>

        <div className="space-y-4">
          {items.map((item, index) => (
            <div key={index} className="p-5 bg-slate-50 rounded-2xl border border-slate-100 relative">
              <select required value={item.vacancy} onChange={(e) => updateItem(index, { vacancy: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-slate-200 mb-3 outline-none">
                <option value="">Оберіть вакансію із списку</option>
                {vacancies.map((v) => (
                  <option key={v._id} value={v._id}>{v.title} в {v.company}</option>
                ))}
              </select>
              <textarea placeholder="Ваш супровідний лист для цієї вакансії..." value={item.coverLetter} onChange={(e) => updateItem(index, { coverLetter: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-slate-200 h-24 outline-none" />
              {items.length > 1 && (
                <button type="button" onClick={() => removeItem(index)} className="absolute top-2 right-2 text-slate-400 hover:text-red-500 text-xl">×</button>
              )}
            </div>
          ))}
        </div>
      </div>

      <button type="submit" disabled={isSubmitting} className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold hover:bg-indigo-700 transition-all disabled:opacity-50 shadow-lg shadow-indigo-100">
        {isSubmitting ? 'Надсилання...' : 'Відправити відгук'}
      </button>
    </form>
  )
}