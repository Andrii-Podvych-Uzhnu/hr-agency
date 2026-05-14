"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RoleToggle({ userId, currentRole, currentUserId }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

 
  if (userId === currentUserId) {
    return <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">(Ви)</span>;
  }

  const newRole = currentRole === "admin" ? "user" : "admin";

  const handleToggle = async () => {
    if (!confirm(`Змінити роль користувача на ${newRole}?`)) return;
    
    setLoading(true);
    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: newRole }),
      });

      if (!response.ok) {
        const data = await response.json();
        alert(data.error || "Помилка зміни ролі");
        return;
      }

      router.refresh(); 
    } catch (err) {
      alert("Помилка з'єднання");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleToggle}
      disabled={loading}
      className={`text-[10px] font-bold uppercase tracking-tighter px-3 py-1 rounded-lg transition disabled:opacity-50 ${
        newRole === "admin" 
          ? "bg-slate-900 text-white hover:bg-slate-800" 
          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
      }`}
    >
      {loading ? "..." : `Зробити ${newRole}`}
    </button>
  );
}