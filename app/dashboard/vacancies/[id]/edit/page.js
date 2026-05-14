"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import VacancyForm from "@/components/VacancyForm";

export default function EditVacancyPage() {
  const { id } = useParams();
  const [vacancy, setVacancy] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/vacancies/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setVacancy(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="p-10 text-center animate-pulse">Завантаження...</div>;
  if (!vacancy) return <div className="p-10 text-center text-red-500">Вакансію не знайдено</div>;

  return (
    <div className="max-w-4xl mx-auto">
      <Link href="/dashboard/vacancies" className="text-indigo-600 hover:underline mb-6 inline-block">
        ← Скасувати редагування
      </Link>
      <div className="bg-white rounded-[2rem] shadow-xl p-10 border border-slate-100">
        <h1 className="text-3xl font-black mb-8 text-slate-900">Редагувати вакансію</h1>
        <VacancyForm mode="edit" vacancyId={id} initialData={vacancy} />
      </div>
    </div>
  );
}