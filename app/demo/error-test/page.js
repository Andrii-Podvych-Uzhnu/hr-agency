export default async function ErrorTestPage() {
  const shouldFail = Math.random() > 0.5

  if (shouldFail) {
    throw new Error('Не вдалося з\'єднатися із сервером парсингу резюме. Спробуйте ще раз.')
  }

  return (
    <div className="container mx-auto px-6 py-16 max-w-4xl font-sans min-h-[60vh] flex flex-col justify-center">
      <div className="bg-emerald-50 border border-emerald-100 p-10 rounded-[2rem] shadow-sm text-center">
        <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-inner">
          <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">
          Синхронізація успішна
        </h1>
        <p className="text-lg text-emerald-700 font-medium max-w-md mx-auto">
          Базу кандидатів успішно оновлено. Оновіть сторінку (F5) — є 50% шанс виникнення штучної помилки.
        </p>
      </div>
    </div>
  )
}