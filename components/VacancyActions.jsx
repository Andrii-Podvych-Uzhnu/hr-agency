"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function VacancyActions({ vacancyId }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/vacancies/${vacancyId}`, { 
        method: "DELETE" 
      });

      if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        throw new Error(body.error || "Помилка видалення");
      }

      toast.success("Вакансію видалено");
      setShowConfirm(false);
      router.push("/dashboard/vacancies");
      router.refresh();
    } catch (error) {
      toast.error(error.message);
      setShowConfirm(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex gap-4 items-center">
      {!showConfirm ? (
        <button
          onClick={() => setShowConfirm(true)}
          className="text-rose-600 font-bold hover:underline"
        >
          Видалити вакансію
        </button>
      ) : (
        <div className="flex items-center gap-3 bg-rose-50 p-2 rounded-lg border border-rose-100">
          <span className="text-sm text-rose-700 font-medium">Ви впевнені?</span>
          <button
            onClick={handleDelete}
            disabled={loading}
            className="bg-rose-600 text-white px-3 py-1 rounded-md text-sm disabled:opacity-50"
          >
            {loading ? "Видалення..." : "Так"}
          </button>
          <button
            onClick={() => setShowConfirm(false)}
            className="text-slate-500 text-sm hover:underline"
          >
            Ні
          </button>
        </div>
      )}
    </div>
  );
}