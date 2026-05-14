'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import ApplicationForm from '@/components/ApplicationForm'

export default function NewApplicationPage() {
  const router = useRouter()
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (data) => {
    setSubmitting(true)
    setError('')
    const res = await fetch('/api/applications', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    
    const body = await res.json().catch(() => ({}))
    setSubmitting(false)
    
    if (!res.ok) {
      setError(body.errors?.join(', ') || body.error || 'Помилка надсилання')
      return
    }
    
    router.push(`/dashboard/applications/${body._id}`)
    router.refresh()
  }

  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-black text-slate-900 mb-6">Подати відгук</h1>
      <ApplicationForm onSubmit={handleSubmit} isSubmitting={submitting} error={error} />
    </div>
  )
}