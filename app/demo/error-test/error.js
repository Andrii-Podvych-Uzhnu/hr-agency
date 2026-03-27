'use client'

import { useEffect } from 'react'

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error('Системна помилка HR.agency:', error)
  }, [error])

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-slate-50 font-sans px-6">
      <div className="max-w-md w-full bg-white rounded-[2rem] shadow-xl p-10 text-center border border-red-100 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-red-500"></div>
        
        <div className="w-20 h-20 bg-red-50 text-red-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-inner border border-red-100">
          <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        
        <h2 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">
          Помилка з'єднання
        </h2>
        
        <p className="text-slate-500 mb-10 font-medium leading-relaxed">
          {error.message}
        </p>
        
        <button
          onClick={() => reset()}
          className="w-full bg-slate-900 text-white px-6 py-4 rounded-2xl font-bold text-lg hover:bg-indigo-600 transition-all shadow-lg active:scale-95"
        >
          Спробувати знову
        </button>
      </div>
    </div>
  )
}