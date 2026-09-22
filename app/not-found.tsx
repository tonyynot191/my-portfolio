import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-6 text-center">
      <p className="text-7xl md:text-9xl font-bold text-gray-800 mb-4">404</p>
      <h1 className="text-2xl md:text-3xl font-bold text-white mb-3">
        Page not found
      </h1>
      <p className="text-gray-400 mb-8 max-w-md">
        Sorry — this page doesn&apos;t exist, or may have been moved.
      </p>
      <div className="flex flex-wrap gap-4 justify-center">
        <Link
          href="/"
          className="bg-white text-black px-6 py-3 rounded-lg font-medium hover:bg-gray-200 transition"
        >
          Go Home
        </Link>
        <Link
          href="/projects"
          className="border border-gray-600 px-6 py-3 rounded-lg font-medium hover:border-white transition"
        >
          See My Work
        </Link>
      </div>
    </div>
  );
}