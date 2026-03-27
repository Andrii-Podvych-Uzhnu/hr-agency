export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] bg-slate-50 font-sans">
      <div className="text-center">
        <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-indigo-600 mx-auto mb-6"></div>
        <p className="text-xl font-bold text-slate-600 tracking-wide">Завантаження даних...</p>
      </div>
    </div>
  )
}