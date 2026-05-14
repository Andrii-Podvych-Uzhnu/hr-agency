'use client'
import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import ApplicationStatusBadge from '@/components/ApplicationStatusBadge'

export default function ApplicationsPage() {
  const { data: session } = useSession()
  const [apps, setApps] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/applications').then(res => res.json()).then(data => {
      setApps(Array.isArray(data) ? data : [])
      setLoading(false)
    })
  }, [])

  if (loading) return <div className="p-10 text-center animate-pulse">Завантаження...</div>

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-black text-slate-900">
          {session?.user?.role === 'admin' ? 'Всі відгуки' : 'Мої відгуки'}
        </h1>
        <Link href="/dashboard/applications/new" className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:bg-indigo-700 transition-all">
          + Новий відгук
        </Link>
      </div>

      <div className="grid gap-4">
        {apps.map(app => (
          <Link key={app._id} href={`/dashboard/applications/${app._id}`} className="bg-white p-6 rounded-[1.5rem] shadow-sm border border-slate-100 hover:shadow-md transition-all flex justify-between items-center">
            <div>
              <div className="text-sm text-slate-400 mb-1">{new Date(app.createdAt).toLocaleDateString('uk-UA')}</div>
              <div className="font-bold text-slate-800">
                {app.items?.length} вакансій: {app.items?.[0]?.vacancy?.title} {app.items?.length > 1 && `+ ще ${app.items.length - 1}`}
              </div>
              {session?.user?.role === 'admin' && <div className="text-xs text-indigo-600 font-medium">Кандидат: {app.user?.name}</div>}
            </div>
            <ApplicationStatusBadge status={app.status} />
          </Link>
        ))}
      </div>
    </div>
  )
}