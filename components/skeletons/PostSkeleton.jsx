export function PostSkeleton() {
  return (
    <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100 animate-pulse flex flex-col h-full">
      <div className="w-14 h-14 bg-slate-100 rounded-2xl mb-8"></div>
      <div className="h-6 bg-slate-200 rounded-full w-3/4 mb-4"></div>
      <div className="space-y-3 flex-grow">
        <div className="h-4 bg-slate-100 rounded-full w-full"></div>
        <div className="h-4 bg-slate-100 rounded-full w-5/6"></div>
        <div className="h-4 bg-slate-100 rounded-full w-4/5"></div>
      </div>
      <div className="mt-auto pt-6 border-t border-slate-50 flex justify-between items-center mt-8">
        <div className="flex items-center gap-3 w-1/2">
          <div className="w-8 h-8 rounded-full bg-slate-200"></div>
          <div className="h-4 bg-slate-100 rounded-full w-20"></div>
        </div>
        <div className="h-4 bg-slate-100 rounded-full w-16"></div>
      </div>
    </div>
  )
}

export function StatsSkeleton() {
  return (
    <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100 animate-pulse">
      <div className="h-4 bg-slate-200 rounded-full w-24 mb-4"></div>
      <div className="h-10 bg-slate-200 rounded-full w-16"></div>
    </div>
  )
}

export function TableSkeleton({ rows = 5 }) {
  return (
    <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden">
      <table className="w-full">
        <thead className="bg-slate-50">
          <tr>
            {[...Array(5)].map((_, i) => (
              <th key={i} className="px-6 py-4 text-left">
                <div className="h-4 bg-slate-200 rounded-full w-20 animate-pulse"></div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[...Array(rows)].map((_, i) => (
            <tr key={i} className="border-t border-slate-100">
              {[...Array(5)].map((_, j) => (
                <td key={j} className="px-6 py-5">
                  <div className="h-4 bg-slate-100 rounded-full animate-pulse w-full"></div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}