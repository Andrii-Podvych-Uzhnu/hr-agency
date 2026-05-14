'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import VacancyForm from '@/components/VacancyForm'

export default function EditVacancyPage() {
  const { id } = useParams()
  const router = useRouter()
  const [vacancy, setVacancy] = useState(null)
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState(null)
  const [submitError, setSubmitError] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    fetch(`/api/vacancies/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Вакансію не знайдено')
        return res.json()
      })
      .then((data) => {
        setVacancy(data)
        setLoading(false)
      })
      .catch((err) => {
        setLoadError(err.message)
        setLoading(false)
      })
  }, [id])

  const handleSubmit = async (formData) => {
    setSubmitError(null)
    setIsSubmitting(true)

    try {
      const response = await fetch(`/api/vacancies/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.errors?.join(', ') || data.error || 'Помилка оновлення')
      }

      router.push(`/dashboard/vacancies/${id}`)
    } catch (err) {
      setSubmitError(err.message)
      setIsSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div>
        <div className="h-4 bg-slate-200 rounded w-32 mb-4 animate-pulse"></div>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
          <div className="h-8 bg-slate-200 rounded w-48 animate-pulse mb-6"></div>
          <div className="h-64 bg-slate-100 rounded w-full animate-pulse"></div>
        </div>
      </div>
    )
  }

  if (loadError) {
    return (
      <div>
        <Link href="/dashboard/vacancies" className="text-indigo-600 hover:underline mb-4 inline-block">
          &larr; Назад до списку
        </Link>
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-2">Помилка</h2>
          <p className="text-red-700">{loadError}</p>
        </div>
      </div>
    )
  }

  return (
    <div>
      <Link href={`/dashboard/vacancies/${id}`} className="text-indigo-600 hover:underline mb-4 inline-block">
        &larr; Назад до вакансії
      </Link>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
        <h1 className="text-3xl font-black mb-6 text-slate-900">
          Редагувати: {vacancy.title}
        </h1>
        <VacancyForm
          initialData={vacancy}
          onSubmit={handleSubmit}
          submitLabel="Зберегти зміни"
          isSubmitting={isSubmitting}
          error={submitError}
        />
      </div>
    </div>
  )
}