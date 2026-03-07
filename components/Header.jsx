import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white sticky top-0 z-50 border-b border-slate-100 shadow-sm font-sans">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-slate-900 tracking-tight">
          HR<span className="text-indigo-600">.</span>agency
        </Link>
        <nav className="flex items-center gap-6">
          <Link href="/" className="text-sm font-medium text-slate-700 hover:text-indigo-600 transition">Головна</Link>
          <Link href="/vacancies" className="text-sm font-medium text-slate-700 hover:text-indigo-600 transition">Вакансії</Link>
          <Link href="/about" className="text-sm font-medium text-slate-700 hover:text-indigo-600 transition">Про нас</Link>
          <button className="bg-indigo-600 text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-indigo-700 transition">Увійти</button>
        </nav>
      </div>
    </header>
  );
}