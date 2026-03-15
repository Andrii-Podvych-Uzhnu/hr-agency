'use client'

export default function SidebarToggle({ isOpen, onToggle }) {
  return (
    <button
      onClick={onToggle}
      className="w-full bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 p-3 rounded-xl transition-all mb-6 font-bold flex items-center justify-center gap-2"
    >
      {isOpen ? '◀ Згорнути меню' : '▶'}
    </button>
  )
}