"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";
import { registerFormSchema } from "@/lib/validations/auth";
import FormField from "@/components/forms/FormField";

export default function RegisterForm() {
  const router = useRouter();
  const {
    register, handleSubmit, setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registerFormSchema),
    defaultValues: { name: "", email: "", password: "", confirmPassword: "" },
  });

  const onSubmit = async (data) => {
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name, email: data.email, password: data.password,
        }),
      });
      const body = await res.json().catch(() => ({}));

      if (res.status === 409) {
        setError("email", { type: "server", message: body.error || "Цей email вже зареєстрований" });
        toast.error("Email вже зайнятий");
        return;
      }
      if (!res.ok) { toast.error(body.error || "Помилка реєстрації"); return; }

      const signInResult = await signIn("credentials", {
        email: data.email, password: data.password, redirect: false,
      });

      if (signInResult?.error) {
        toast.warning("Акаунт створено, тепер увійдіть");
        router.push("/login");
        return;
      }

      toast.success("Реєстрація успішна!");
      router.push("/dashboard");
      router.refresh();
    } catch {
      toast.error("Помилка реєстрації");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border border-slate-100">
        <h1 className="text-2xl font-black text-center mb-6 text-slate-900">Реєстрація</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <FormField label="Ім'я" error={errors.name?.message}>
            <input type="text" {...register("name")} className="w-full px-4 py-2 border rounded-xl" />
          </FormField>
          <FormField label="Email" error={errors.email?.message}>
            <input type="email" {...register("email")} className="w-full px-4 py-2 border rounded-xl" />
          </FormField>
          <FormField label="Пароль" error={errors.password?.message}>
            <input type="password" autoComplete="new-password" {...register("password")} className="w-full px-4 py-2 border rounded-xl" />
          </FormField>
          <FormField label="Підтвердження пароля" error={errors.confirmPassword?.message}>
            <input type="password" autoComplete="new-password" {...register("confirmPassword")} className="w-full px-4 py-2 border rounded-xl" />
          </FormField>
          <button type="submit" disabled={isSubmitting}
            className="w-full bg-indigo-600 text-white py-3 px-4 rounded-xl font-bold hover:bg-indigo-700 disabled:opacity-50 shadow-lg shadow-indigo-100">
            {isSubmitting ? "Реєстрація..." : "Зареєструватися"}
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-slate-500">
          Вже маєте акаунт? <Link href="/login" className="text-indigo-600 font-bold hover:underline">Увійти</Link>
        </p>
      </div>
    </div>
  );
}