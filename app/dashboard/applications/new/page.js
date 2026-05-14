"use client";

import ApplicationForm from "@/components/ApplicationForm";

export default function NewApplicationPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-black text-slate-900 mb-8">Створення пакетного відгуку</h1>
      <ApplicationForm />
    </div>
  );
}