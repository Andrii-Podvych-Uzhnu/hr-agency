'use client'
import { useState } from 'react'
import SidebarToggle from './SidebarToggle'
import Link from 'next/link'
import { useSession } from 'next-auth/react' 

export default function DashboardShell({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const { data: session } = useSession() 
  
  const isAdmin = session?.user?.role === 'admin'

  return (
    <div className="flex min-h-[calc(100vh-80px)] bg-slate-100 font-sans">
      <aside className={`bg-slate-900 text-white transition-all duration-300 ${sidebarOpen ? 'w-72 p-6' : 'w-20 p-4'}`}>
        <SidebarToggle isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
        
        {sidebarOpen && (
          <nav className="space-y-2 mt-6">
            <Link href="/dashboard" className="block px-4 py-3 hover:bg-slate-800 rounded-xl font-bold transition-colors">
              📊 Огляд
            </Link>
            
           
            <Link href="/dashboard/applications" className="block px-4 py-3 bg-indigo-600 rounded-xl font-bold">
              📝 {isAdmin ? 'Всі відгуки' : 'Мої відгуки'}
            </Link>

            <Link href="/vacancies" className="block px-4 py-3 hover:bg-slate-800 rounded-xl font-bold text-slate-300 transition-colors">
              💼 Пошук вакансій
            </Link>

           
            {isAdmin && (
              <div className="pt-4 mt-4 border-t border-slate-800 space-y-2">
                <p className="px-4 text-xs font-black uppercase tracking-widest text-slate-500 mb-2">Адміністрування</p>
                
                <Link href="/dashboard/vacancies" className="block px-4 py-3 hover:bg-slate-800 rounded-xl font-bold text-emerald-400 transition-colors">
                  ⚙️ Керування вакансіями
                </Link>

                <Link href="/dashboard/users" className="block px-4 py-3 hover:bg-slate-800 rounded-xl font-bold text-rose-400 border border-rose-900/30 transition-colors">
                  👥 Користувачі
                </Link>
              </div>
            )}
          </nav>
        )}
      </aside>
      
      <div className="flex-1 p-10 overflow-y-auto">
        {children}
      </div>
    </div>
  )
}