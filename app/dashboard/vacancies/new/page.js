"use client";

import Link from "next/link";
import VacancyForm from "@/components/VacancyForm";

export default function NewVacancyPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <Link href="/dashboard/vacancies" className="text-indigo-600 hover:underline mb-6 inline-block">
        ← Назад до списку
      </Link>
      <div className="bg-white rounded-[2rem] shadow-xl p-10 border border-slate-100">
        <h1 className="text-3xl font-black mb-8 text-slate-900">Нова вакансія</h1>
        <VacancyForm mode="create" />
      </div>
    </div>
  );
}