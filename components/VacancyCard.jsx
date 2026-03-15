import Link from 'next/link';
import FavoriteButton from './FavoriteButton';

export default function VacancyCard({ id, title, company, salary, type, category, available }) {
  return (
    <div className={`bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 ${!available ? 'opacity-60 grayscale' : ''}`}>
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-xl font-bold text-slate-900 mb-1">{title}</h3>
          <p className="text-indigo-600 font-bold">{company}</p>
        </div>
        
        <FavoriteButton vacancyId={id} />
      </div>

      <div className="flex gap-2 mb-8">
        <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-bold">{type}</span>
        <span className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-xs font-bold">{category}</span>
        {available && <span className="bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full text-xs font-bold">Активна</span>}
      </div>

      <div className="flex justify-between items-center mt-auto border-t border-slate-100 pt-6">
        <span className="text-2xl font-black text-slate-900">{salary} <span className="text-sm text-slate-400 font-medium">грн</span></span>
        <Link href={`/vacancies/${id}`} className="text-indigo-600 font-bold hover:text-indigo-800 transition-colors">
          Відгукнутися →
        </Link>
      </div>
    </div>
  );
}