import StatsCard from "@/components/StatsCard";
import { getVacancyStats } from "@/lib/helpers";

export const metadata = {
  title: "Дашборд | HR.agency",
};

export default function DashboardPage() {
  // Отримуємо статистику з нашої функції
  const stats = getVacancyStats();

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-4xl font-black text-slate-900 mb-2">Огляд платформи</h1>
      <p className="text-slate-500 mb-10 text-lg">Статистика активності HR.agency</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard title="Всього вакансій" value={stats.total} type="slate" />
        <StatsCard title="Активні" value={stats.available} type="emerald" />
        <StatsCard title="Категорії" value={stats.categoriesCount} type="blue" />
        <StatsCard title="Сер. зарплата" value={`${stats.avgSalary} ₴`} type="indigo" />
      </div>
    </div>
  );
}