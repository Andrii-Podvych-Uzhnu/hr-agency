const STATUS_CONFIG = {
  pending:      { label: "Очікує",     classes: "bg-amber-100 text-amber-700" },
  reviewing:    { label: "Розгляд",    classes: "bg-blue-100 text-blue-700" },
  interviewing: { label: "Співбесіда", classes: "bg-indigo-100 text-indigo-700" },
  accepted:     { label: "Прийнято",   classes: "bg-emerald-100 text-emerald-700" },
  rejected:     { label: "Відмова",    classes: "bg-rose-100 text-rose-700" },
  cancelled:    { label: "Скасовано",  classes: "bg-slate-200 text-slate-600" },
};

export default function ApplicationStatusBadge({ status }) {
  const cfg = STATUS_CONFIG[status] || { label: status, classes: "bg-slate-100" };
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${cfg.classes}`}>
      {cfg.label}
    </span>
  );
}