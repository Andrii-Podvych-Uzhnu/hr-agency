"use client";

export default function FormField({ label, error, required, hint, children }) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="block text-gray-700 font-bold mb-1">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      {children}
      
      {hint && !error && (
        <p className="text-xs text-gray-500 mt-1">{hint}</p>
      )}
      
      {error && (
        <p className="text-sm text-red-600 mt-1 font-medium" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}