"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";
import { loginSchema } from "@/lib/validations/auth";
import FormField from "@/components/forms/FormField";

export default function LoginForm() {
  const router = useRouter();
  const {
    register, handleSubmit, setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (data) => {
    try {
      const result = await signIn("credentials", { ...data, redirect: false });
      if (result?.error) {
        setError("password", { type: "server", message: "Невірний email або пароль" });
        toast.error("Не вдалося увійти");
        return;
      }
      toast.success("Вітаємо в HR.agency!");
      router.push("/dashboard");
      router.refresh();
    } catch {
      toast.error("Помилка при вході");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border border-slate-100">
        <h1 className="text-2xl font-black text-center mb-6 text-slate-900">Вхід</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <FormField label="Email" error={errors.email?.message}>
            <input type="email" autoComplete="email" {...register("email")}
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all" />
          </FormField>
          <FormField label="Пароль" error={errors.password?.message}>
            <input type="password" autoComplete="current-password" {...register("password")}
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all" />
          </FormField>
          <button type="submit" disabled={isSubmitting}
            className="w-full bg-indigo-600 text-white py-3 px-4 rounded-xl font-bold hover:bg-indigo-700 disabled:opacity-50 transition-all shadow-lg shadow-indigo-100">
            {isSubmitting ? "Вхід..." : "Увійти"}
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-slate-500">
          Немає акаунту? <Link href="/register" className="text-indigo-600 font-bold hover:underline">Зареєструватися</Link>
        </p>
      </div>
    </div>
  );
}