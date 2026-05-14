'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function LoginForm() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    try {
      const result = await signIn('credentials', {
        email: formData.email,
        password: formData.password,
        redirect: false,
      })

      if (result?.error) {
        setError('Невірний email або пароль')
        setIsLoading(false)
        return
      }

      router.push('/dashboard')
      router.refresh()
    } catch {
      setError('Щось пішло не так')
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto mt-20 px-4">
      <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-10">
        <h1 className="text-3xl font-black text-center mb-2 text-slate-900">Вхід</h1>
        <p className="text-slate-500 text-center mb-8">З поверненням до HR.agency</p>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-slate-700 font-bold mb-2 text-sm">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
              placeholder="name@company.com"
            />
          </div>

          <div>
            <label className="block text-slate-700 font-bold mb-2 text-sm">Пароль</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-indigo-600 text-white py-4 rounded-xl hover:bg-indigo-700 font-black uppercase tracking-widest text-xs transition-all shadow-lg shadow-indigo-100 disabled:opacity-50"
          >
            {isLoading ? 'Вхід...' : 'Увійти в кабінет'}
          </button>
        </form>

        <p className="text-center mt-8 text-slate-600 text-sm">
          Немає акаунту?{' '}
          <Link href="/auth/register" className="text-indigo-600 font-bold hover:underline">
            Створити зараз
          </Link>
        </p>
      </div>
    </div>
  )
}