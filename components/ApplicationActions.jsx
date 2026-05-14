'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function ApplicationActions({ application, role, currentUserId }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const isAdmin = role === 'admin'
  const isOwner = (application.user?._id || application.user || '').toString() === currentUserId
  const canCancel = isOwner && application.status === 'pending'

  const handleDelete = async () => {
    if (!confirm('Видалити цей відгук остаточно?')) return
    setLoading(true)
    const res = await fetch(`/api/applications/${application._id}`, { method: 'DELETE' })
    if (!res.ok) {
      const data = await res.json().catch(() => ({}))
      setError(data.error || 'Помилка видалення')
      setLoading(false)
      return
    }
    router.push('/dashboard/applications')
    router.refresh()
  }

  const handleCancel = async () => {
    if (!confirm('Скасувати цей відгук?')) return
    setLoading(true)
    const res = await fetch(`/api/applications/${application._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'cancelled' }),
    })
    if (!res.ok) {
      const data = await res.json().catch(() => ({}))
      setError(data.error || 'Помилка скасування')
      setLoading(false)
      return
    }
    router.refresh()
  }

  return (
    <div className="mt-8 flex gap-4 items-center">
      {error && <p className="text-red-500 text-sm">{error}</p>}
      {isAdmin && (
        <>
          <Link href={`/dashboard/applications/${application._id}/edit`} className="bg-indigo-600 text-white px-6 py-2 rounded-xl font-bold hover:bg-indigo-700 transition">
            Редагувати статус
          </Link>
          <button onClick={handleDelete} disabled={loading} className="text-red-600 font-bold hover:underline">
            Видалити запис
          </button>
        </>
      )}
      {!isAdmin && canCancel && (
        <button onClick={handleCancel} disabled={loading} className="bg-slate-200 text-slate-700 px-6 py-2 rounded-xl font-bold hover:bg-slate-300 transition">
          Скасувати відгук
        </button>
      )}
    </div>
  )
}