'use client'
import { useState } from 'react'
import VacancyCard from './VacancyCard'

const vacancies = [
  { id: 1, title: "Frontend Developer", company: "TechFlow", salary: 45000, type: "Remote", category: "IT", available: true },
  { id: 2, title: "Cybersecurity Analyst", company: "SecureNet", salary: 65000, type: "Office", category: "Security", available: true },
  { id: 3, title: "HR Manager", company: "TalentLink", salary: 35000, type: "Hybrid", category: "HR", available: true },
  { id: 4, title: "Backend Engineer", company: "DataSync", salary: 55000, type: "Remote", category: "IT", available: false },
  { id: 5, title: "Security Auditor", company: "SafeCode", salary: 60000, type: "Office", category: "Security", available: true },
  { id: 6, title: "Recruiter", company: "PeopleFirst", salary: 28000, type: "Remote", category: "HR", available: true },
  { id: 7, title: "React Native Dev", company: "AppWorks", salary: 48000, type: "Hybrid", category: "IT", available: true },
  { id: 8, title: "SOC Analyst", company: "GuardTower", salary: 70000, type: "Office", category: "Security", available: false },
]

export default function VacancyFilter() {
  const [search, setSearch] = useState('')
  const [activeCat, setActiveCat] = useState('Всі')
  const [onlyAvailable, setOnlyAvailable] = useState(false)

  const categories = ["Всі", ...new Set(vacancies.map(v => v.category))]

  const filtered = vacancies.filter(v => {
    const matchesSearch = v.title.toLowerCase().includes(search.toLowerCase()) || v.company.toLowerCase().includes(search.toLowerCase())
    const matchesCat = activeCat === 'Всі' || v.category === activeCat
    const matchesAvail = !onlyAvailable || v.available
    return matchesSearch && matchesCat && matchesAvail
  })

  return (
    <div className="max-w-7xl mx-auto px-6 pb-24">
      
      <div className="bg-white rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 p-6 md:p-8 relative z-10 -mt-12 mb-16 mx-auto max-w-5xl">
        
        <div className="relative mb-6">
          <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
            <svg className="h-7 w-7 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Посада, компанія або ключове слово..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-16 pr-8 py-5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 placeholder-slate-400 text-lg font-medium focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none"
          />
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCat(cat)}
                className={`px-6 py-3 rounded-xl text-sm font-bold transition-all ${
                  activeCat === cat 
                  ? 'bg-indigo-900 text-white shadow-md scale-105' 
                  : 'bg-white text-slate-600 border border-slate-200 hover:border-indigo-400 hover:text-indigo-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <label className="flex items-center gap-4 cursor-pointer group bg-slate-50 px-6 py-3 rounded-xl border border-slate-200 hover:bg-slate-100 transition-all select-none">
            <span className="text-slate-700 font-bold text-sm group-hover:text-indigo-900 transition-colors">
              Тільки активні
            </span>
            <div className={`relative w-14 h-7 transition-colors rounded-full shadow-inner flex items-center ${onlyAvailable ? 'bg-indigo-600' : 'bg-slate-300'}`}>
              <div className={`absolute left-1 bg-white w-5 h-5 rounded-full shadow-sm transition-transform duration-300 ${onlyAvailable ? 'translate-x-7' : 'translate-x-0'}`}></div>
            </div>
            <input 
              type="checkbox" 
              checked={onlyAvailable} 
              onChange={(e) => setOnlyAvailable(e.target.checked)} 
              className="sr-only" 
            />
          </label>

        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.map(v => <VacancyCard key={v.id} {...v} />)}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20 bg-white rounded-3xl border border-slate-100 shadow-sm mt-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-slate-50 mb-6">
            <svg className="w-10 h-10 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-slate-900 mb-2">Вакансій не знайдено</h3>
          <p className="text-slate-500 text-lg">Спробуйте змінити параметри пошуку або обрати іншу категорію.</p>
        </div>
      )}

    </div>
  )
}