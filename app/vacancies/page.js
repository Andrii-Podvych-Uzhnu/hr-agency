import VacancyFilter from "@/components/VacancyFilter";

export default function VacanciesPage() {
  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="bg-indigo-900 text-white py-16 text-center">
        <h1 className="text-4xl font-bold mb-4 tracking-tight">Каталог вакансій</h1>
        <p className="opacity-80">Знайдіть свою наступну можливість серед кращих пропозицій</p>
      </div>
      <VacancyFilter />
    </div>
  );
}