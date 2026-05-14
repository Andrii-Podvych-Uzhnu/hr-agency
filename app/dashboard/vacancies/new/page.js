'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import VacancyForm from '@/components/VacancyForm'

export default function NewVacancyPage() {
  const router = useRouter()
  const [error, setError] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (formData) => {
    setError(null)
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/vacancies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.errors?.join(', ') || data.error || 'Помилка створення')
      }

      router.push('/dashboard/vacancies')
    } catch (err) {
      setError(err.message)
      setIsSubmitting(false)
    }
  }

  return (
    <div>
      <Link href="/dashboard/vacancies" className="text-indigo-600 hover:underline mb-4 inline-block">
        &larr; Назад до списку
      </Link>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
        <h1 className="text-3xl font-black mb-6 text-slate-900">
          Додати нову вакансію
        </h1>
        <VacancyForm
          onSubmit={handleSubmit}
          submitLabel="Створити вакансію"
          isSubmitting={isSubmitting}
          error={error}
        />
      </div>
    </div>
  )
}