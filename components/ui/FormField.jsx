export default function FormField({ label, error, children, id }) {
  return (
    <div className="space-y-1 w-full">
      {label && (
        <label htmlFor={id} className="block text-sm font-bold text-slate-700">
          {label}
        </label>
      )}
      {children}
      {error && (
        <p className="text-xs font-medium text-rose-500 animate-in fade-in slide-in-from-top-1">
          {error}
        </p>
      )}
    </div>
  );
}