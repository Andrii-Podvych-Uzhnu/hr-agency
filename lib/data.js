let vacancies = [
  { id: 1, title: "Senior Frontend Developer", company: "TechFlow", salary: 120000, category: "Development", available: true },
  { id: 2, title: "UI/UX Designer", company: "CreativeMind", salary: 85000, category: "Design", available: true },
  { id: 3, title: "DevOps Engineer", company: "CloudScale", salary: 110000, category: "Infrastructure", available: false },
  { id: 4, title: "Project Manager", company: "StepAhead", salary: 95000, category: "Management", available: true },
  { id: 5, title: "QA Automation", company: "BugFree", salary: 75000, category: "Testing", available: true }
]

let nextId = 6

export { vacancies }

export function getVacancyById(id) {
  return vacancies.find((v) => v.id === Number(id))
}

export function getCategories() {
  return ["Всі", ...new Set(vacancies.map((item) => item.category))]
}

export function addVacancy(data) {
  const newVacancy = {
    id: nextId++,
    title: data.title,
    company: data.company || 'Unknown',
    salary: Number(data.salary) || 0,
    category: data.category || 'Інше',
    available: data.available !== undefined ? data.available : true
  }
  vacancies.push(newVacancy)
  return newVacancy
}

export function updateVacancy(id, data) {
  const index = vacancies.findIndex((v) => v.id === Number(id))
  if (index === -1) return null

  vacancies[index] = {
    ...vacancies[index],
    ...data,
    id: vacancies[index].id
  }
  return vacancies[index]
}

export function deleteVacancy(id) {
  const index = vacancies.findIndex((v) => v.id === Number(id))
  if (index === -1) return null

  const deleted = vacancies[index]
  vacancies.splice(index, 1)
  return deleted
}