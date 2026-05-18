import { notFound, redirect } from 'next/navigation'
import Link from 'next/link'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import dbConnect from '@/lib/db'
import Application from '@/lib/models/Application'
import ApplicationItem from '@/lib/models/ApplicationItem'
import Vacancy from '@/lib/models/Vacancy'
import User from '@/lib/models/User'
import ApplicationStatusBadge from '@/components/ApplicationStatusBadge'
import ApplicationActions from '@/components/ApplicationActions'

void [Vacancy, User, ApplicationItem]

export default async function ApplicationDetailsPage({ params }) {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/login')

  const { id } = await params
  await dbConnect()

  let app
  try {
    app = await Application.findById(id)
      .populate({ path: 'user', select: 'name email role' })
      .populate({
        path: 'items',
        populate: { path: 'vacancy', select: 'title company category' },
      })
      .lean()
  } catch { 
    notFound() 
  }

  if (!app) notFound()

  const isAdmin = session.user.role === 'admin'
  const isOwner = app.user?._id?.toString() === session.user.id
  if (!isAdmin && !isOwner) redirect('/dashboard')

  return (
    <div className="max-w-4xl">
      <Link href="/dashboard/applications" className="text-indigo-600 hover:underline text-sm mb-4 inline-block">
        ← До всіх відгуків
      </Link>
      
      <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-black text-slate-900 mb-2">Відгук від {new Date(app.createdAt).toLocaleDateString()}</h1>
            <p className="text-slate-500">ID: {app._id}</p>
          </div>
          <ApplicationStatusBadge status={app.status} />
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8 border-b border-slate-100 pb-8">
          <div>
            <h3 className="text-xs font-black uppercase text-slate-400 tracking-widest mb-2">Кандидат</h3>
            <p className="font-bold text-slate-800">{app.user?.name}</p>
            <p className="text-slate-500 text-sm">{app.user?.email}</p>
          </div>
          <div>
            <h3 className="text-xs font-black uppercase text-slate-400 tracking-widest mb-2">Коментар до заявки</h3>
            <p className="text-slate-700 italic">{app.notes || "Відсутній"}</p>
          </div>
        </div>

        <h2 className="text-xl font-black text-slate-900 mb-4">Обрані вакансії ({app.items?.length})</h2>
        <div className="space-y-4">
          {app.items?.map((item) => (
            <div key={item._id} className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="font-bold text-lg text-indigo-600">{item.vacancy?.title || "Вакансію видалено"}</h4>
                  <p className="text-slate-600 font-medium">{item.vacancy?.company}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs uppercase font-black text-slate-400">Очікувана з/п</p>
                  <p className="font-bold text-slate-900 text-lg">{item.salaryExpectation} $</p>
                </div>
              </div>
              <div className="bg-white p-4 rounded-xl text-sm text-slate-600 italic">
                <span className="font-bold text-slate-400 block not-italic uppercase text-[10px] mb-1">Супровідний лист:</span>
                {item.coverLetter || "Без супровідного листа"}
              </div>
            </div>
          ))}
        </div>

        <ApplicationActions application={JSON.parse(JSON.stringify(app))} role={session.user.role} currentUserId={session.user.id} />
      </div>
    </div>
  )
}