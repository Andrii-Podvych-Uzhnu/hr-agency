import { StatsSkeleton } from '@/components/skeletons/PostSkeleton'

export default function Loading() {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="h-10 bg-slate-200 rounded-full w-64 mb-2 animate-pulse"></div>
      <div className="h-6 bg-slate-200 rounded-full w-48 mb-10 animate-pulse"></div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsSkeleton />
        <StatsSkeleton />
        <StatsSkeleton />
        <StatsSkeleton />
      </div>
    </div>
  )
}