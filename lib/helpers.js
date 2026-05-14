import dbConnect from './db';
import Vacancy from './models/Vacancy';

export async function getVacancyStats() {
  await dbConnect();

  const vacancies = await Vacancy.find();
  const total = vacancies.length;
  const available = vacancies.filter((v) => v.available).length;
  const unavailable = total - available;
  const categories = [...new Set(vacancies.map((v) => v.category))];
  const avgSalary =
    total > 0
      ? Math.round(vacancies.reduce((sum, v) => sum + v.salary, 0) / total)
      : 0;

  return {
    total,
    available,
    unavailable,
    categoriesCount: categories.length,
    avgSalary,
  };
}