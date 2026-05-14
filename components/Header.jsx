'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSession, signOut } from 'next-auth/react'

const navLinks = [
  { href: '/', label: 'Головна' },
  { href: '/vacancies', label: 'Вакансії' },
  { href: '/candidates', label: 'Кандидати' },
  { href: '/about', label: 'Про нас' },
]

export default function Header() {
  const pathname = usePathname()
  const { data: session, status } = useSession()

  return (
    <header className="bg-white sticky top-0 z-50 border-b border-slate-100 shadow-sm font-sans py-4">
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link href="/"
          className="text-2xl font-bold text-slate-900 tracking-tight hover:text-indigo-600 transition">
          HR<span className="text-indigo-600">.</span>agency
        </Link>

        <nav className="flex items-center gap-6">
          <ul className="flex gap-6">
            {navLinks.map((link) => {
              const isActive =
                link.href === '/'
                  ? pathname === '/'
                  : pathname.startsWith(link.href)

              return (
                <li key={link.href}>
                  <Link href={link.href}
                    className={`text-sm font-medium transition ${
                      isActive
                        ? 'text-indigo-600'
                        : 'text-slate-700 hover:text-indigo-600'
                    }`}>
                    {link.label}
                  </Link>
                </li>
              )
            })}
          </ul>

          {/* Блок автентифікації */}
          {status === 'loading' ? (
            <span className="text-slate-400 text-sm">...</span>
          ) : session ? (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Link href="/dashboard"
                  className="text-sm font-bold text-indigo-600 bg-indigo-50 px-4 py-2 rounded-xl hover:bg-indigo-100 transition">
                  {session.user.name}
                </Link>
                
                {/* ТИЖДЕНЬ 9: Badge ролі користувача */}
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-black uppercase tracking-tighter ${
                  session.user.role === 'admin'
                    ? 'bg-rose-500 text-white' // Червоний для адміна
                    : 'bg-slate-100 text-slate-600' // Сірий для юзера
                }`}>
                  {session.user.role}
                </span>
              </div>

              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className="bg-slate-900 text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-slate-800 transition"
              >
                Вийти
              </button>
            </div>
          ) : (
            <Link href="/auth/login"
              className="bg-indigo-600 text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-indigo-700 transition">
              Увійти
            </Link>
          )}
        </nav>
      </div>
    </header>
  )
}