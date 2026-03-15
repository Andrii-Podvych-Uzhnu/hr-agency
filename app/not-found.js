import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center bg-slate-50 px-6 font-sans">
      <div className="text-center max-w-lg mx-auto relative">
        
        
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15rem] font-black text-slate-100 select-none -z-10">
          404
        </div>
        
        <div className="relative z-10">
          <div className="w-20 h-20 bg-indigo-100 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-inner border border-indigo-200">
            <svg className="w-10 h-10 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">
            Ой, сторінку не знайдено
          </h1>
          
          <p className="text-lg text-slate-500 mb-10 font-medium">
            Схоже, ви перейшли за неправильним посиланням, або цю вакансію вже було видалено з платформи.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="/" 
              className="w-full sm:w-auto bg-indigo-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 active:scale-95"
            >
              На головну
            </Link>
            <Link 
              href="/vacancies" 
              className="w-full sm:w-auto bg-white text-slate-700 px-8 py-4 rounded-2xl font-bold text-lg hover:text-indigo-600 border border-slate-200 transition-all shadow-sm active:scale-95"
            >
              До каталогу вакансій
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}