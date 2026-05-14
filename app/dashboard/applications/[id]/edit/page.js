"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import Link from "next/link";

import { updateApplicationSchema } from "@/lib/validations/application";
import FormField from "@/components/forms/FormField";

const STATUSES = [
  { value: "pending", label: "Очікує" },
  { value: "reviewing", label: "Розгляд" },
  { value: "interviewing", label: "Співбесіда" },
  { value: "accepted", label: "Прийнято" },
  { value: "rejected", label: "Відмова" },
];

export default function EditApplicationPage() {
  const router = useRouter();
  const { id } = useParams();
  const { data: session, status: sessionStatus } = useSession();
  const [loading, setLoading] = useState(true);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(updateApplicationSchema),
  });

  useEffect(() => {
    fetch(`/api/applications/${id}`)
      .then((res) => res.json())
      .then((data) => {
        reset({ status: data.status, notes: data.notes || "" });
        setLoading(false);
      });
  }, [id, reset]);

  const onSubmit = async (data) => {
    try {
      const res = await fetch(`/api/applications/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Помилка оновлення");
      toast.success("Статус оновлено");
      router.push(`/dashboard/applications/${id}`);
      router.refresh();
    } catch (e) {
      toast.error(e.message);
    }
  };

  if (sessionStatus === "loading" || loading) return <div className="p-10 text-center">Завантаження...</div>;

  return (
    <div className="max-w-xl mx-auto">
      <h1 className="text-3xl font-black mb-8">Керування відгуком</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 rounded-[2rem] shadow-xl border border-slate-100 space-y-6">
        <FormField label="Статус відгуку" required error={errors.status?.message}>
          <select {...register("status")} className="w-full px-4 py-2 border rounded-xl outline-none focus:ring-2 focus:ring-indigo-500">
            {STATUSES.map((s) => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
        </FormField>
        
        <FormField label="Нотатки рекрутера" error={errors.notes?.message}>
          <textarea rows="4" {...register("notes")} className="w-full px-4 py-2 border rounded-xl outline-none focus:ring-2 focus:ring-indigo-500" />
        </FormField>

        <button type="submit" disabled={isSubmitting} className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold hover:bg-indigo-700 transition-all">
          {isSubmitting ? "Збереження..." : "Зберегти зміни"}
        </button>
      </form>
    </div>
  );
}