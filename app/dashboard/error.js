'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error('Dashboard error:', error)
  }, [error])

  return (
    <div className="max-w-md mx-auto mt-16 bg-red-50 border border-red-100 rounded-[2rem] p-10 shadow-sm font-sans text-center">
      <div className="w-16 h-16 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>
      
      <h2 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">
        Помилка в Dashboard
      </h2>
      
      <p className="text-slate-600 mb-8 font-medium leading-relaxed">
        {error.message || 'Сталася непередбачувана помилка під час завантаження панелі керування.'}
      </p>
      
      <div className="flex flex-col gap-3">
        <button
          onClick={() => reset()}
          className="w-full bg-slate-900 text-white px-6 py-3.5 rounded-xl font-bold hover:bg-slate-800 transition-all shadow-md active:scale-[0.98]"
        >
          Спробувати знову
        </button>
        <Link
          href="/"
          className="w-full bg-white border border-slate-200 text-slate-700 px-6 py-3.5 rounded-xl font-bold hover:text-indigo-600 hover:border-indigo-100 hover:bg-indigo-50 transition-all active:scale-[0.98]"
        >
          На головну
        </Link>
      </div>
    </div>
  )
}