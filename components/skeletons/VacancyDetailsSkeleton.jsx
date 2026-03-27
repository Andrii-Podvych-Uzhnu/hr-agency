export function VacancyDetailsSkeleton() {
  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-3xl mx-auto px-6">
        <div className="h-4 w-48 bg-slate-200 rounded-full mb-8 animate-pulse"></div>

        <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-sm border border-slate-100 relative overflow-hidden animate-pulse">
          
          <div className="flex justify-between items-start mb-8">
            <div className="w-3/4">
              <div className="h-10 w-full max-w-md bg-slate-200 rounded-2xl mb-4"></div>
              <div className="h-6 w-1/2 bg-slate-200 rounded-xl"></div>
            </div>
            <div className="w-12 h-12 bg-slate-200 rounded-full"></div>
          </div>

          <div className="flex flex-wrap gap-3 mb-10 pb-10 border-b border-slate-100">
            <div className="h-8 w-24 bg-slate-200 rounded-xl"></div>
            <div className="h-8 w-32 bg-slate-200 rounded-xl"></div>
            <div className="h-8 w-20 bg-slate-200 rounded-xl"></div>
          </div>

          <div className="bg-slate-50 rounded-2xl p-8 mb-10 border border-slate-100">
            <div className="h-4 w-40 bg-slate-200 rounded-full mb-4"></div>
            <div className="h-10 w-48 bg-slate-200 rounded-2xl"></div>
          </div>

          <div className="h-16 w-full bg-slate-200 rounded-2xl mt-8"></div>
        </div>
      </div>
    </div>
  )
}