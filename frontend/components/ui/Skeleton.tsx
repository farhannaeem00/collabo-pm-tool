export function Skeleton({ className }: { className?: string }) {
  return <div className={`animate-pulse bg-gray-800 rounded-lg ${className}`} />;
}

export function TaskCardSkeleton() {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-3 animate-pulse space-y-2">
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-3 w-full" />
      <Skeleton className="h-3 w-1/2" />
    </div>
  );
}

export function BoardSkeleton() {
  return (
    <div className="flex gap-4 p-6">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="w-72 shrink-0 space-y-3">
          <Skeleton className="h-6 w-32" />
          {[1, 2, 3].map((j) => <TaskCardSkeleton key={j} />)}
        </div>
      ))}
    </div>
  );
}
