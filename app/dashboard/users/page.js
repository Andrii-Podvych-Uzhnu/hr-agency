// app/dashboard/users/page.js
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import dbConnect from "@/lib/db";
import User from "@/lib/models/User";
import RoleToggle from "@/components/RoleToggle";

export const metadata = {
  title: "Управління користувачами | HR.agency",
};

export default async function UsersPage() {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/auth/login");
  if (session.user.role !== "admin") redirect("/dashboard");

  await dbConnect();
  const users = await User.find()
    .select("-password")
    .sort({ createdAt: -1 })
    .lean();

  return (
    <div className="p-8">
      <h1 className="text-3xl font-black mb-8 text-slate-900">
        Спеціалісти системи <span className="text-indigo-600">.</span>
      </h1>

      <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/50 border-b border-slate-100">
              <th className="px-6 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Користувач</th>
              <th className="px-6 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Роль</th>
              <th className="px-6 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest text-right">Дії</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {users.map((user) => (
              <tr key={user._id.toString()} className="hover:bg-slate-50/80 transition">
                <td className="px-6 py-5">
                  <div className="font-bold text-slate-900">{user.name}</div>
                  <div className="text-xs text-slate-500">{user.email}</div>
                </td>
                <td className="px-6 py-5">
                  <span className={`px-3 py-1 text-[10px] font-black uppercase rounded-full ${
                    user.role === "admin"
                      ? "bg-rose-100 text-rose-600"
                      : "bg-emerald-100 text-emerald-600"
                  }`}>
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-5 text-right">
                  <RoleToggle
                    userId={user._id.toString()}
                    currentRole={user.role}
                    currentUserId={session.user.id}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}