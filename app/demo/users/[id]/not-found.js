import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 font-sans px-6">
      <div className="text-center max-w-md w-full bg-white rounded-[2rem] shadow-sm p-12 border border-slate-100">
        <div className="text-6xl font-black text-slate-200 mb-6">404</div>
        
        <h2 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">
          Кандидата не знайдено
        </h2>
        
        <p className="text-slate-500 mb-10 font-medium leading-relaxed">
          Профіль кандидата з таким ID не існує в базі даних нашої агенції, або його було видалено.
        </p>
        
        <Link 
          href="/demo/users/1"
          className="block w-full bg-indigo-600 text-white px-6 py-4 rounded-2xl font-bold text-lg hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 active:scale-95"
        >
          Відкрити профіль #1
        </Link>
      </div>
    </div>
  )
}