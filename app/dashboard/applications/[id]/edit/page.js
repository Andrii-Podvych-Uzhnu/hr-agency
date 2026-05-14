'use client'
import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { useSession } from 'next-auth/react'
import Link from 'next/link'

const STATUSES = [
  { value: 'pending', label: 'Очікує' },
  { value: 'reviewing', label: 'Розгляд' },
  { value: 'interviewing', label: 'Співбесіда' },
  { value: 'accepted', label: 'Прийнято' },
  { value: 'rejected', label: 'Відмова' },
  { value: 'cancelled', label: 'Скасовано' },
]

export default function EditApplicationPage() {
  const router = useRouter()
  const { id } = useParams()
  const { data: session } = useSession()
  const [status, setStatus] = useState('')
  const [notes, setNotes] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`/api/applications/${id}`).then(res => res.json()).then(data => {
      setStatus(data.status)
      setNotes(data.notes || '')
      setLoading(false)
    })
  }, [id])

  const handleSave = async (e) => {
    e.preventDefault()
    await fetch(`/api/applications/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status, notes }),
    })
    router.push(`/dashboard/applications/${id}`)
    router.refresh()
  }

  if (loading) return <div className="p-10 text-center">Завантаження...</div>

  return (
    <div className="max-w-xl">
      <h1 className="text-3xl font-black mb-6">Керування статусом</h1>
      <form onSubmit={handleSave} className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 space-y-6">
        <div>
          <label className="block font-bold mb-2 text-slate-700">Статус відгуку</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-500">
            {STATUSES.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
          </select>
        </div>
        <div>
          <label className="block font-bold mb-2 text-slate-700">Примітки рекрутера</label>
          <textarea value={notes} onChange={(e) => setNotes(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-slate-200 h-32 outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>
        <button type="submit" className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold">Оновити</button>
      </form>
    </div>
  )
}