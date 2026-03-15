import { vacancies } from './data';

export function getVacancyStats() {
  const total = vacancies.length;
  const available = vacancies.filter(v => v.available).length;
  
  
  const categories = [...new Set(vacancies.map(v => v.category))];
  
  
  const avgSalary = total > 0 
    ? Math.round(vacancies.reduce((sum, v) => sum + v.salary, 0) / total) 
    : 0;

  return { 
    total, 
    available, 
    categoriesCount: categories.length, 
    avgSalary 
  };
}