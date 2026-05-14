"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";
import { vacancySchema } from "@/lib/validations/vacancy";
import FormField from "@/components/forms/FormField";

const CATEGORIES = ["IT", "Security", "HR", "Management"];
const TYPES = ["Remote", "Office", "Hybrid"];

export default function VacancyForm({ mode = "create", initialData, vacancyId }) {
  const router = useRouter();
  const isEdit = mode === "edit";

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(vacancySchema),
    defaultValues: {
      title: initialData?.title ?? "",
      company: initialData?.company ?? "",
      category: initialData?.category ?? "",
      salary: initialData?.salary ?? 0,
      type: initialData?.type ?? "Remote",
      description: initialData?.description ?? "",
      available: initialData?.available ?? true,
    },
  });

  const onSubmit = async (data) => {
    const url = isEdit ? `/api/vacancies/${vacancyId}` : "/api/vacancies";
    const method = isEdit ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Не вдалося зберегти дані");
      }
      toast.success(isEdit ? "Вакансію оновлено" : "Вакансію створено");
      router.push("/dashboard/vacancies");
      router.refresh();
    } catch (e) {
      toast.error(e.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField label="Назва посади" required error={errors.title?.message}>
          <input
            type="text"
            {...register("title")}
            className={`w-full px-4 py-2 border rounded focus:border-indigo-500 outline-none ${
              errors.title ? "border-red-500" : "border-gray-300"
            }`}
          />
        </FormField>

        <FormField label="Компанія" required error={errors.company?.message}>
          <input
            type="text"
            {...register("company")}
            className={`w-full px-4 py-2 border rounded focus:border-indigo-500 outline-none ${
              errors.company ? "border-red-500" : "border-gray-300"
            }`}
          />
        </FormField>

        <FormField label="Категорія" required error={errors.category?.message}>
          <select
            {...register("category")}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:border-indigo-500 outline-none"
          >
            <option value="">Оберіть категорію</option>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </FormField>

        <FormField label="Зарплата ($)" required error={errors.salary?.message}>
          <input
            type="number"
            {...register("salary", { valueAsNumber: true })}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:border-indigo-500 outline-none"
          />
        </FormField>
      </div>

      <FormField label="Тип зайнятості">
        <div className="flex gap-4">
          {TYPES.map((t) => (
            <label key={t} className="flex items-center gap-2 cursor-pointer">
              <input type="radio" value={t} {...register("type")} />
              <span>{t}</span>
            </label>
          ))}
        </div>
      </FormField>

      <FormField label="Опис вакансії" error={errors.description?.message}>
        <textarea
          rows="5"
          {...register("description")}
          className="w-full px-4 py-2 border border-gray-300 rounded focus:border-indigo-500 outline-none"
        />
      </FormField>

      <label className="flex items-center gap-2">
        <input type="checkbox" {...register("available")} className="w-4 h-4" />
        <span className="text-slate-700 font-medium">Вакансія активна</span>
      </label>

      <div className="flex gap-4 pt-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-700 disabled:opacity-50 transition-all"
        >
          {isSubmitting ? "Збереження..." : isEdit ? "Оновити" : "Опублікувати"}
        </button>
        <Link
          href="/dashboard/vacancies"
          className="bg-slate-200 text-slate-700 px-8 py-3 rounded-xl font-bold hover:bg-slate-300 transition-all"
        >
          Скасувати
        </Link>
      </div>
    </form>
  );
}