export default function StatsCard({ title, value, type = 'indigo' }) {
  const styles = {
    indigo: 'bg-indigo-50 text-indigo-700 border-indigo-100',
    emerald: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    blue: 'bg-blue-50 text-blue-700 border-blue-100',
    slate: 'bg-slate-100 text-slate-800 border-slate-200',
  }

  const selectedStyle = styles[type] || styles.indigo;

  return (
    <div className={`p-8 rounded-[2rem] border shadow-sm ${selectedStyle}`}>
      <h3 className="text-sm font-bold uppercase tracking-widest opacity-60 mb-2">{title}</h3>
      <p className="text-4xl font-black">{value}</p>
    </div>
  )
}