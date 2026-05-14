'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function RegisterForm() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)

    if (formData.password !== formData.confirmPassword) {
      setError('Паролі не збігаються')
      return
    }

    setIsLoading(true)

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Помилка реєстрації')
        setIsLoading(false)
        return
      }

      await signIn('credentials', {
        email: formData.email,
        password: formData.password,
        callbackUrl: '/dashboard'
      })

    } catch {
      setError('Щось пішло не так')
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto mt-16 px-4">
      <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-10">
        <h1 className="text-3xl font-black text-center mb-2 text-slate-900">Реєстрація</h1>
        <p className="text-slate-500 text-center mb-8">Станьте частиною HR.agency</p>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-slate-700 font-bold mb-1 text-xs uppercase tracking-wider">Повне ім’я</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500"
              placeholder="Олександр Коваленко"
            />
          </div>

          <div>
            <label className="block text-slate-700 font-bold mb-1 text-xs uppercase tracking-wider">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500"
              placeholder="alex@example.com"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-700 font-bold mb-1 text-xs uppercase tracking-wider">Пароль</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                minLength={6}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-slate-700 font-bold mb-1 text-xs uppercase tracking-wider">Підтвердження</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                minLength={6}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-indigo-600 text-white py-4 rounded-xl hover:bg-indigo-700 font-black uppercase tracking-widest text-xs transition-all shadow-lg shadow-indigo-100 mt-4 disabled:opacity-50"
          >
            {isLoading ? 'Створення...' : 'Зареєструватися'}
          </button>
        </form>

        <p className="text-center mt-8 text-slate-600 text-sm">
          Вже є профіль?{' '}
          <Link href="/auth/login" className="text-indigo-600 font-bold hover:underline">
            Увійти
          </Link>
        </p>
      </div>
    </div>
  )
}