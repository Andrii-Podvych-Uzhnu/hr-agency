export default function Loading() {
  return (
    <div className="bg-slate-50 min-h-screen py-16 font-sans">
      <div className="container mx-auto px-6 max-w-7xl">
        
        <div className="text-center mb-16 flex flex-col items-center">
          <div className="h-4 w-32 bg-slate-200 rounded-full mb-4 animate-pulse"></div>
          <div className="h-12 w-3/4 max-w-md bg-slate-200 rounded-2xl mb-6 animate-pulse"></div>
          <div className="h-6 w-full max-w-2xl bg-slate-200 rounded-full animate-pulse"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(9)].map((_, i) => (
            <div key={i} className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100 flex flex-col h-[350px]">
              <div className="w-14 h-14 bg-slate-100 rounded-2xl mb-8 animate-pulse"></div>
              
              <div className="h-6 bg-slate-200 rounded-full w-3/4 mb-4 animate-pulse"></div>
              
              <div className="h-4 bg-slate-100 rounded-full w-full mb-2 animate-pulse"></div>
              <div className="h-4 bg-slate-100 rounded-full w-5/6 mb-2 animate-pulse"></div>
              <div className="h-4 bg-slate-100 rounded-full w-4/5 mb-8 animate-pulse"></div>
              
              <div className="mt-auto pt-6 border-t border-slate-50 flex justify-between items-center">
                <div className="flex items-center gap-3 w-1/2">
                  <div className="w-8 h-8 rounded-full bg-slate-200 animate-pulse"></div>
                  <div className="h-4 bg-slate-100 rounded-full w-20 animate-pulse"></div>
                </div>
                <div className="h-4 bg-slate-100 rounded-full w-16 animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}