import { notFound } from 'next/navigation'

const users = {
  '1': { id: 1, name: 'Олександр Петренко', role: 'Senior Frontend Developer', experience: '5 років' },
  '2': { id: 2, name: 'Марія Коваленко', role: 'UI/UX Designer', experience: '3 роки' },
  '3': { id: 3, name: 'Іван Сидоренко', role: 'DevOps Engineer', experience: '7 років' }
}

export default async function UserPage({ params }) {
  const resolvedParams = await params
  const { id } = resolvedParams
  const user = users[id]

  if (!user) {
    notFound()
  }

  return (
    <div className="bg-slate-50 min-h-screen py-16 font-sans">
      <div className="container mx-auto px-6 max-w-3xl">
        <div className="bg-white rounded-[2rem] p-10 shadow-sm border border-slate-100 flex items-center gap-8">
          <div className="w-24 h-24 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center text-3xl font-black">
            {user.name.charAt(0)}
          </div>
          
          <div>
            <div className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">
              ID Кандидата: #{user.id}
            </div>
            <h1 className="text-3xl font-black text-slate-900 mb-2">
              {user.name}
            </h1>
            <div className="flex items-center gap-3">
              <span className="bg-slate-100 text-slate-700 px-4 py-1.5 rounded-xl text-sm font-bold">
                {user.role}
              </span>
              <span className="bg-emerald-50 text-emerald-700 px-4 py-1.5 rounded-xl text-sm font-bold">
                Досвід: {user.experience}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}