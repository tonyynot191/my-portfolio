export default function ProjectDetailLoading() {
  return (
    <article className="max-w-3xl mx-auto px-6 py-20">
      {/* Back link skeleton */}
      <div className="h-4 w-32 bg-gray-800/60 rounded animate-pulse" />

      {/* Title + tagline */}
      <div className="h-10 w-2/3 bg-gray-800/60 rounded-lg animate-pulse mt-6 mb-4" />
      <div className="h-5 w-full bg-gray-800/40 rounded animate-pulse mb-6" />

      {/* Tech tags */}
      <div className="flex gap-2 mb-8">
        <div className="h-7 w-20 bg-gray-800/60 rounded-full animate-pulse" />
        <div className="h-7 w-24 bg-gray-800/60 rounded-full animate-pulse" />
        <div className="h-7 w-16 bg-gray-800/60 rounded-full animate-pulse" />
      </div>

      {/* Buttons */}
      <div className="flex gap-4 mb-10">
        <div className="h-11 w-36 bg-gray-800/60 rounded-lg animate-pulse" />
        <div className="h-11 w-32 bg-gray-800/60 rounded-lg animate-pulse" />
      </div>

      {/* Like button */}
      <div className="h-10 w-20 bg-gray-800/60 rounded-lg animate-pulse mb-10" />

      {/* Hero image */}
      <div className="aspect-video rounded-2xl bg-gray-800/60 animate-pulse mb-10" />

      {/* Description lines */}
      <div className="space-y-3 mb-16">
        <div className="h-4 w-full bg-gray-800/40 rounded animate-pulse" />
        <div className="h-4 w-full bg-gray-800/40 rounded animate-pulse" />
        <div className="h-4 w-5/6 bg-gray-800/40 rounded animate-pulse" />
      </div>

      {/* Comments skeleton */}
      <div className="border-t border-gray-800 pt-10">
        <div className="h-7 w-40 bg-gray-800/60 rounded-lg animate-pulse mb-6" />
        <div className="h-4 w-56 bg-gray-800/40 rounded animate-pulse mb-8" />
        <div className="h-12 w-full bg-gray-800/40 rounded-lg animate-pulse mb-3" />
        <div className="h-12 w-full bg-gray-800/40 rounded-lg animate-pulse mb-3" />
        <div className="h-24 w-full bg-gray-800/40 rounded-lg animate-pulse" />
      </div>
    </article>
  );
}