import Link from 'next/link';
import { vacancies } from '@/lib/data';
import FavoriteButton from '@/components/FavoriteButton';
import VacancyActions from '@/components/VacancyActions';

export default async function VacancyDetailsPage({ params }) {
  const resolvedParams = await params;
  const vacancyId = parseInt(resolvedParams.id);
  const vacancy = vacancies.find((v) => v.id === vacancyId);

  if (!vacancy) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-slate-50">
        <h1 className="text-4xl font-black text-slate-900 mb-4">404</h1>
        <p className="text-lg text-slate-500 mb-8">Такої вакансії не існує або її було видалено.</p>
        <Link href="/vacancies" className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-indigo-700 transition">
          Повернутися до списку
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-3xl mx-auto px-6">
        <Link href="/vacancies" className="inline-flex items-center text-indigo-600 font-bold mb-8 hover:underline">
          ← Назад до списку вакансій
        </Link>

        <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-sm border border-slate-100 relative overflow-hidden">
          
          <div className="flex justify-between items-start mb-8">
            <div>
              <h1 className="text-3xl md:text-5xl font-black text-slate-900 mb-4">{vacancy.title}</h1>
              <p className="text-2xl font-bold text-indigo-600">{vacancy.company}</p>
            </div>
            
            <div className="relative z-10">
              <FavoriteButton vacancyId={vacancy.id} />
            </div>
          </div>

          <div className="flex flex-wrap gap-3 mb-10 pb-10 border-b border-slate-100">
            <span className="bg-slate-100 text-slate-700 px-4 py-2 rounded-xl font-bold">{vacancy.type}</span>
            <span className="bg-indigo-50 text-indigo-700 px-4 py-2 rounded-xl font-bold">{vacancy.category}</span>
            {vacancy.available ? (
              <span className="bg-emerald-50 text-emerald-700 px-4 py-2 rounded-xl font-bold">Активна</span>
            ) : (
              <span className="bg-red-50 text-red-700 px-4 py-2 rounded-xl font-bold">Закрита</span>
            )}
          </div>

          <div className="bg-slate-50 rounded-2xl p-8 mb-10 border border-slate-100">
            <p className="text-sm text-slate-500 font-bold uppercase tracking-widest mb-2">Пропонована зарплата</p>
            <div className="text-4xl font-black text-slate-900">
              {vacancy.salary} <span className="text-xl text-slate-400 font-medium">грн/міс</span>
            </div>
          </div>

         
          <div className="mt-8 pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
            <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">Дії адміністратора</span>
            <VacancyActions vacancyId={vacancy.id} />
          </div>

          <button 
            className="mt-8 w-full bg-indigo-600 text-white py-5 rounded-2xl font-bold text-lg hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 active:scale-[0.98] disabled:opacity-50 disabled:active:scale-100"
            disabled={!vacancy.available}
          >
            {vacancy.available ? 'Відгукнутися на вакансію' : 'Прийом заявок закрито'}
          </button>
        </div>
      </div>
    </div>
  );
}