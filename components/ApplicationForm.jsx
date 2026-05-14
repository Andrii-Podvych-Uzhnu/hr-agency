"use client";

import { useEffect, useMemo, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import Link from "next/link";

import { createApplicationSchema } from "@/lib/validations/application";
import FormField from "@/components/forms/FormField";

export default function ApplicationForm() {
  const router = useRouter();
  const { data: session } = useSession();
  const isAdmin = session?.user?.role === "admin";

  const [vacancies, setVacancies] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(createApplicationSchema),
    defaultValues: {
      user: "",
      items: [{ vacancy: "", coverLetter: "" }],
      notes: "",
    },
  });

  const { fields, append, remove } = useFieldArray({ control, name: "items" });

  useEffect(() => {
   
    fetch("/api/vacancies")
      .then((res) => res.json())
      .then((data) => {
        setVacancies((data || []).filter((v) => v.available));
        setLoading(false);
      })
      .catch(() => setLoading(false));

  
    if (isAdmin) {
      fetch("/api/users")
        .then((res) => res.json())
        .then((data) => { if (Array.isArray(data)) setUsers(data); });
    }
  }, [isAdmin]);

  
  useEffect(() => {
    if (isAdmin && session?.user?.id) {
      setValue("user", session.user.id);
    }
  }, [isAdmin, session?.user?.id, setValue]);


  const vacanciesById = useMemo(() => {
    const map = new Map();
    vacancies.forEach((v) => map.set(v._id, v));
    return map;
  }, [vacancies]);

  const watchedItems = watch("items");
  const totalSalary = useMemo(() => {
    return (watchedItems || []).reduce((sum, item) => {
      const vacancy = vacanciesById.get(item?.vacancy);
      return sum + (vacancy?.salary || 0);
    }, 0);
  }, [watchedItems, vacanciesById]);

  const onSubmit = async (data) => {
    try {
      const res = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const body = await res.json();
      if (!res.ok) throw new Error(body.errors?.join(", ") || body.error || "Помилка");
      
      toast.success("Відгук успішно надіслано");
      router.push(`/dashboard/applications/${body._id}`);
      router.refresh();
    } catch (e) {
      toast.error(e.message);
    }
  };

  if (loading) return <div className="p-8 animate-pulse text-slate-500">Завантаження даних...</div>;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white p-8 rounded-[2rem] shadow-xl border border-slate-100">
      {isAdmin && (
        <FormField label="Кандидат" required error={errors.user?.message}>
          <select {...register("user")} className="w-full px-4 py-2 border rounded-xl outline-none focus:ring-2 focus:ring-indigo-500">
            <option value="">Оберіть користувача</option>
            {users.map((u) => (
              <option key={u._id} value={u._id}>{u.name} ({u.email})</option>
            ))}
          </select>
        </FormField>
      )}

      <div>
        <div className="flex justify-between items-center mb-4">
          <label className="block text-slate-700 font-bold text-lg">Вакансії для відгуку *</label>
          <button
            type="button"
            onClick={() => append({ vacancy: "", coverLetter: "" })}
            className="text-indigo-600 hover:text-indigo-800 font-bold text-sm"
          >
            + Додати вакансію
          </button>
        </div>

        <div className="space-y-4">
          {fields.map((field, index) => (
            <div key={field.id} className="p-5 bg-slate-50 rounded-2xl border border-slate-100 relative space-y-3">
              <FormField error={errors.items?.[index]?.vacancy?.message}>
                <select {...register(`items.${index}.vacancy`)} className="w-full px-4 py-2 rounded-xl border outline-none focus:ring-2 focus:ring-indigo-500">
                  <option value="">Оберіть вакансію</option>
                  {vacancies.map((v) => (
                    <option key={v._id} value={v._id}>{v.title} — {v.company}</option>
                  ))}
                </select>
              </FormField>

              <FormField error={errors.items?.[index]?.coverLetter?.message}>
                <textarea 
                  placeholder="Супровідний лист для цієї посади..." 
                  {...register(`items.${index}.coverLetter`)} 
                  className="w-full px-4 py-2 rounded-xl border outline-none focus:ring-2 focus:ring-indigo-500 h-24"
                />
              </FormField>

              {fields.length > 1 && (
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="absolute top-2 right-4 text-rose-500 font-bold hover:text-rose-700 text-xl"
                >×</button>
              )}
            </div>
          ))}
        </div>
      </div>

      <FormField label="Загальні примітки" error={errors.notes?.message}>
        <textarea rows="2" {...register("notes")} className="w-full px-4 py-2 border rounded-xl outline-none focus:ring-2 focus:ring-indigo-500" />
      </FormField>

      {totalSalary > 0 && (
        <div className="bg-indigo-50 border border-indigo-100 px-6 py-4 rounded-2xl">
          <p className="text-indigo-900 font-medium">Сумарний бюджет обраних позицій: <span className="text-xl font-black">${totalSalary}</span></p>
        </div>
      )}

      <div className="flex gap-4">
        <button type="submit" disabled={isSubmitting}
          className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-700 disabled:opacity-50 transition-all"
        >
          {isSubmitting ? "Надсилання..." : "Відправити відгук"}
        </button>
        <Link href="/dashboard/applications" className="bg-slate-200 text-slate-700 px-8 py-3 rounded-xl font-bold inline-block hover:bg-slate-300 transition-all">
          Скасувати
        </Link>
      </div>
    </form>
  );
}