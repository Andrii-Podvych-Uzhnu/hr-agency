'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import FavoriteButton from './FavoriteButton';
import { applyToVacancy } from '@/app/vacancies/actions';
import { toast } from 'sonner';

export default function VacancyCard({ id, title, company, salary, type, category, available }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleApply = () => {
    if (!available) return;

    startTransition(async () => {
      try {
        const result = await applyToVacancy(id);
        
        if (result?.success) {
          
          toast.success("Ви успішно відгукнулися на вакансію!");
          
          
          setTimeout(() => {
            router.push("/dashboard/applications");
          }, 1200);
        }
      } catch (error) {
        console.error("Помилка при відгуку:", error);
        toast.error(error.message || "Щось пішло не так або ви не авторизовані");
      }
    });
  };

  return (
    <div className={`bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between ${!available ? 'opacity-60 grayscale' : ''}`}>
      <div>
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
      </div>

      <div className="flex justify-between items-center mt-6 border-t border-slate-100 pt-6">
        <span className="text-2xl font-black text-slate-900">
          {salary?.toLocaleString()} <span className="text-sm text-slate-400 font-medium">грн</span>
        </span>
        
        <button 
          onClick={handleApply}
          disabled={isPending || !available}
          className="text-indigo-600 font-bold hover:text-indigo-800 disabled:opacity-50 transition-colors uppercase text-sm tracking-wider"
        >
          {isPending ? 'Відправка...' : 'Відгукнутися →'}
        </button>
      </div>
    </div>
  );
}