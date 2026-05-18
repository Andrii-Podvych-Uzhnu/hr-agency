import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import StatsCard from "@/components/StatsCard";
import { getVacancyStats, getApplicationStats } from "@/lib/helpers";

export const metadata = {
  title: "Панель керування | HR.agency",
};

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  const isAdmin = session?.user?.role === "admin";

  const [vacancyStats, appStats] = await Promise.all([
    getVacancyStats(),
    isAdmin ? getApplicationStats() : Promise.resolve(null),
  ]);

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-4xl font-black text-slate-900 mb-2">
          Привіт, {session?.user?.name || "користувачу"}! 👋
        </h1>
        <p className="text-slate-500">
          Ось короткий огляд активності в системі на сьогодні.
        </p>
      </div>

      <section>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-2 h-8 bg-indigo-600 rounded-full"></div>
          <h2 className="text-xl font-bold text-slate-800 uppercase tracking-wider">
            Ринок вакансій
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatsCard 
            title="Всього вакансій" 
            value={vacancyStats.total} 
            color="indigo" 
          />
          <StatsCard 
            title="Актуальні пропозиції" 
            value={vacancyStats.available} 
            color="emerald" 
          />
          <StatsCard 
            title="Середня зарплата" 
            value={`$${vacancyStats.avgSalary}`} 
            color="blue" 
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <StatsCard 
            title="Категорій на вибір" 
            value={vacancyStats.categoriesCount} 
            color="slate" 
          />
          <StatsCard 
            title="Закриті вакансії" 
            value={vacancyStats.unavailable} 
            color="rose" 
          />
        </div>
      </section>

      {isAdmin && appStats && (
        <section className="pt-6 border-t border-slate-200">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-2 h-8 bg-amber-500 rounded-full"></div>
            <h2 className="text-xl font-bold text-slate-800 uppercase tracking-wider">
              Активність рекрутингу (Admin)
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatsCard 
              title="Всього відгуків" 
              value={appStats.total} 
              color="amber" 
            />
            <StatsCard 
              title="Нові (Очікують)" 
              value={appStats.pending} 
              color="rose" 
            />
            <StatsCard 
              title="На розгляді / Інтерв'ю" 
              value={appStats.reviewing} 
              color="blue" 
            />
          </div>
          
          <div className="mt-6 bg-amber-50 border border-amber-100 p-4 rounded-2xl flex items-center gap-4 text-amber-800">
            <span className="text-2xl">💡</span>
            <p className="text-sm font-medium">
              У вас є <strong>{appStats.pending}</strong> нових відгуків, які потребують перевірки. 
              Перейдіть у розділ "Відгуки", щоб обробити їх.
            </p>
          </div>
        </section>
      )}
    </div>
  );
}