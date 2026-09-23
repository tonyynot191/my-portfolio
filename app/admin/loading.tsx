export default function AdminLoading() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      {/* Heading */}
      <div className="h-9 w-48 bg-gray-800/60 rounded-lg animate-pulse mb-2" />
      <div className="h-5 w-64 bg-gray-800/40 rounded animate-pulse mb-10" />

      {/* Stat cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="rounded-xl border border-gray-800 bg-gray-900/40 p-6"
          >
            <div className="h-4 w-24 bg-gray-800/60 rounded animate-pulse mb-3" />
            <div className="h-8 w-16 bg-gray-800/60 rounded animate-pulse mb-2" />
            <div className="h-3 w-32 bg-gray-800/40 rounded animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  );
}