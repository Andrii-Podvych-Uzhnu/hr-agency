import { vacancies } from '@/lib/data'

export default async function DashboardVacanciesPage() {
  await new Promise(resolve => setTimeout(resolve, 2000))

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-black text-slate-900">Управління вакансіями</h1>
        <button className="bg-indigo-600 text-white px-6 py-3 rounded-2xl font-bold">
          + Додати вакансію
        </button>
      </div>

      <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr>
              <th className="px-6 py-4 text-sm font-bold text-slate-500 uppercase">ID</th>
              <th className="px-6 py-4 text-sm font-bold text-slate-500 uppercase">Посада</th>
              <th className="px-6 py-4 text-sm font-bold text-slate-500 uppercase">Компанія</th>
              <th className="px-6 py-4 text-sm font-bold text-slate-500 uppercase">Зарплата</th>
              <th className="px-6 py-4 text-sm font-bold text-slate-500 uppercase">Статус</th>
            </tr>
          </thead>
          <tbody>
            {vacancies.map(v => (
              <tr key={v.id} className="border-b border-slate-50 hover:bg-slate-50">
                <td className="px-6 py-4 text-slate-500 font-medium">#{v.id}</td>
                <td className="px-6 py-4 font-bold text-slate-900">{v.title}</td>
                <td className="px-6 py-4 text-slate-600">{v.company}</td>
                <td className="px-6 py-4 text-slate-900 font-bold">{v.salary} ₴</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${v.available ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                    {v.available ? 'Активна' : 'Закрита'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}