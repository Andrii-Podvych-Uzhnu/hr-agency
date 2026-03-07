export default function VacancyCard({ title, company, salary, type, category, available = true }) {
  return (
    <div className={`bg-white rounded-3xl p-8 shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-300 ${!available ? 'opacity-50 grayscale' : ''}`}>
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-bold text-slate-900">{title}</h3>
        <span className={`text-[10px] uppercase font-bold px-2 py-1 rounded ${available ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {available ? 'Активна' : 'Закрита'}
        </span>
      </div>
      <p className="text-indigo-600 font-semibold mb-2">{company}</p>
      <div className="flex flex-wrap gap-2 mb-6">
        <span className="text-xs bg-slate-100 px-2 py-1 rounded text-slate-600">{type}</span>
        <span className="text-xs bg-indigo-50 px-2 py-1 rounded text-indigo-600">{category}</span>
      </div>
      <div className="flex justify-between items-center border-t pt-4">
        <span className="text-lg font-bold text-slate-950">{salary} грн</span>
        <button disabled={!available} className="text-sm font-bold text-indigo-600 hover:text-indigo-800 disabled:text-slate-400">Відгукнутися →</button>
      </div>
    </div>
  );
}