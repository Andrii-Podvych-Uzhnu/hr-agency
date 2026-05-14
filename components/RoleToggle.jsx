"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function RoleToggle({ userId, currentRole }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleToggle = async () => {
    const newRole = currentRole === "admin" ? "user" : "admin";
    
    setLoading(true);
    try {
      const response = await fetch(`/api/users/${userId}/role`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: newRole }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Помилка зміни ролі");
      }

      toast.success(`Роль змінено на: ${newRole}`);
      router.refresh();
    } catch (e) {
      toast.error(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleToggle}
      disabled={loading}
      className={`px-3 py-1 rounded-full text-xs font-bold transition-all disabled:opacity-50 ${
        currentRole === "admin"
          ? "bg-rose-100 text-rose-700 hover:bg-rose-200"
          : "bg-slate-100 text-slate-700 hover:bg-slate-200"
      }`}
    >
      {loading ? "..." : currentRole === "admin" ? "Зробити юзером" : "Зробити адміном"}
    </button>
  );
}