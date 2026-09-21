export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-950 text-white px-6">
      <h1 className="text-5xl font-bold tracking-tight text-center mb-4">
        Hi, I'm Tony.
      </h1>
      <p className="text-xl text-gray-400 text-center max-w-xl mb-8">
        A Full-Stack Web Developer building fast, accessible, and modern web applications.
      </p>
      <div className="flex gap-4">
        <a
          href="/projects"
          className="bg-white text-black px-6 py-3 rounded-lg font-medium hover:bg-gray-200 transition"
        >
          View My Work
        </a>
        <a
          href="/contact"
          className="border border-gray-600 px-6 py-3 rounded-lg font-medium hover:border-white transition"
        >
          Contact Me
        </a>
      </div>
    </main>
  );
}