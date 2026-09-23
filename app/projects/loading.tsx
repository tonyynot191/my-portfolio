export default function ProjectsLoading() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-20">
      {/* Heading skeleton */}
      <div className="h-10 w-48 bg-gray-800/60 rounded-lg animate-pulse mb-3" />
      <div className="h-5 w-96 max-w-full bg-gray-800/40 rounded animate-pulse mb-12" />

      {/* Grid of card skeletons */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="rounded-2xl border border-gray-800 bg-gray-900/40 overflow-hidden"
          >
            <div className="aspect-video bg-gray-800/60 animate-pulse" />
            <div className="p-6 space-y-3">
              <div className="h-5 w-3/4 bg-gray-800/60 rounded animate-pulse" />
              <div className="h-4 w-full bg-gray-800/40 rounded animate-pulse" />
              <div className="h-4 w-5/6 bg-gray-800/40 rounded animate-pulse" />
              <div className="flex gap-2 pt-2">
                <div className="h-6 w-16 bg-gray-800/60 rounded animate-pulse" />
                <div className="h-6 w-20 bg-gray-800/60 rounded animate-pulse" />
                <div className="h-6 w-14 bg-gray-800/60 rounded animate-pulse" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}