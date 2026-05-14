"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";

export default function ApplicationActions({ application, role, currentUserId }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const isAdmin = role === "admin";
  const isOwner = (application.user?._id || application.user || "").toString() === currentUserId;
  const canCancel = isOwner && application.status === "pending";

  const handleDelete = async () => {
    if (!confirm("Видалити цей відгук остаточно?")) return;
    
    setLoading(true);
    try {
      const res = await fetch(`/api/applications/${application._id}`, { 
        method: "DELETE" 
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Помилка видалення");
      }

      toast.success("Відгук видалено");
      router.push("/dashboard/applications");
      router.refresh();
    } catch (e) {
      toast.error(e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async () => {
    if (!confirm("Скасувати цей відгук?")) return;

    setLoading(true);
    try {
      const res = await fetch(`/api/applications/${application._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "cancelled" }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Помилка скасування");
      }

      toast.success("Відгук скасовано");
      router.refresh();
    } catch (e) {
      toast.error(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-8 flex gap-4 items-center">
      {isAdmin && (
        <>
          <Link
            href={`/dashboard/applications/${application._id}/edit`}
            className="bg-indigo-600 text-white px-6 py-2 rounded-xl font-bold hover:bg-indigo-700 transition"
          >
            Редагувати статус
          </Link>
          <button
            onClick={handleDelete}
            disabled={loading}
            className="text-rose-600 font-bold hover:underline disabled:opacity-50"
          >
            {loading ? "Видалення..." : "Видалити запис"}
          </button>
        </>
      )}
      {!isAdmin && canCancel && (
        <button
          onClick={handleCancel}
          disabled={loading}
          className="bg-slate-200 text-slate-700 px-6 py-2 rounded-xl font-bold hover:bg-slate-300 transition disabled:opacity-50"
        >
          {loading ? "Обробка..." : "Скасувати відгук"}
        </button>
      )}
    </div>
  );
}