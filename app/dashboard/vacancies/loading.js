import { TableSkeleton } from '@/components/skeletons/PostSkeleton'

export default function Loading() {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div className="h-10 bg-slate-200 rounded-full w-48 animate-pulse"></div>
        <div className="h-12 bg-slate-200 rounded-2xl w-40 animate-pulse"></div>
      </div>
      <TableSkeleton rows={10} />
    </div>
  )
}