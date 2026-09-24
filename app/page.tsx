import Link from "next/link";
import Image from "next/image";
import { getProjects } from "@/lib/supabase/queries";
import ProjectCard from "@/components/projects/ProjectCard";
import SocialLinks from "@/components/shared/SocialLinks";

export default async function Home() {
  const allProjects = await getProjects();
  const featured = allProjects.filter((p) => p.featured).slice(0, 3);

  const hasPhoto = false; // set to false to use the placeholder below

  return (
    <>
      {/* HERO */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden px-6">
        {/* Grid background */}
        <div
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
            maskImage:
              "radial-gradient(ellipse 80% 60% at 50% 50%, black 40%, transparent 100%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 80% 60% at 50% 50%, black 40%, transparent 100%)",
          }}
        />

        {/* Animated gradient blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -left-20 w-[500px] h-[500px] rounded-full bg-purple-600/30 blur-[100px] animate-blob" />
          <div className="absolute top-40 -right-20 w-[500px] h-[500px] rounded-full bg-blue-600/30 blur-[100px] animate-blob animation-delay-2000" />
          <div className="absolute bottom-0 left-1/3 w-[500px] h-[500px] rounded-full bg-cyan-500/20 blur-[100px] animate-blob animation-delay-4000" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center py-20">
          {/* Left: text */}
          <div className="text-center lg:text-left animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-green-500/30 bg-green-500/10 text-green-400 text-xs font-medium mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
              </span>
              Available for work
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6 leading-[1.1]">
              Hi, I&apos;m Tony.
              <br />
              <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Full-Stack Developer.
              </span>
            </h1>

            <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-xl mx-auto lg:mx-0">
              I build fast, accessible, and modern web applications — from
              database to polished UI.
            </p>

            {/* Buttons row */}
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start mb-10">
              <Link
                href="/projects"
                className="bg-white text-black px-6 py-3 rounded-lg font-medium hover:bg-gray-200 transition"
              >
                View My Work
              </Link>
              <Link
                href="/contact"
                className="border border-gray-700 px-6 py-3 rounded-lg font-medium text-white hover:border-gray-400 transition"
              >
                Contact Me
              </Link>
              <a
                href="/resume.pdf"
                download
                className="border border-gray-700 px-6 py-3 rounded-lg font-medium text-white hover:border-gray-400 transition inline-flex items-center gap-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Resume
              </a>
            </div>

            {/* Social links row */}
            <SocialLinks />
          </div>

          {/* Right: photo or fallback */}
          <div className="flex justify-center lg:justify-end animate-fade-in-up animation-delay-200">
            <div className="relative animate-float">
              {/* Glow behind photo */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-purple-600/40 via-blue-600/40 to-cyan-500/40 rounded-full blur-3xl opacity-70" />

              {/* Photo container */}
              <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-2 border-gray-800 bg-gradient-to-br from-gray-800 to-gray-900">
                {hasPhoto ? (
                  <Image
                    src="/tony.jpg"
                    alt="Tony — Full-Stack Web Developer"
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 768px) 256px, (max-width: 1024px) 320px, 384px"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-7xl md:text-8xl font-bold bg-gradient-to-br from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                      T
                    </span>
                  </div>
                )}
              </div>

              {/* Decorative ring */}
              <div className="absolute inset-0 rounded-full border border-white/10 -m-6" />
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 text-gray-600 animate-fade-in-up animation-delay-600">
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-gray-600 to-transparent" />
        </div>
      </section>

      {/* FEATURED PROJECTS */}
      {featured.length > 0 && (
        <section className="max-w-5xl mx-auto px-6 py-24">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">
                Featured Projects
              </h2>
              <p className="text-gray-400">
                A few things I&apos;ve built recently.
              </p>
            </div>
            <Link
              href="/projects"
              className="group hidden md:inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
            >
              <span>View all projects</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-transform duration-200 group-hover:translate-x-1"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>

          <div className="mt-10 md:hidden text-center">
            <Link
              href="/projects"
              className="group inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
            >
              <span>View all projects</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-transform duration-200 group-hover:translate-x-1"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </div>
        </section>
      )}

      {/* SERVICES */}
      <section className="border-t border-gray-900">
        <div className="max-w-5xl mx-auto px-6 py-24">
          <h2 className="text-3xl font-bold text-white mb-3">What I do</h2>
          <p className="text-gray-400 mb-12 max-w-xl">
            I work across the full stack — from designing the database to
            shipping pixel-perfect interfaces.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Full-Stack Development",
                desc: "End-to-end web apps with Next.js, TypeScript, and Postgres.",
              },
              {
                title: "Frontend Engineering",
                desc: "Responsive, accessible interfaces with React and Tailwind.",
              },
              {
                title: "Backend & APIs",
                desc: "REST APIs, authentication, and database architecture.",
              },
            ].map((service) => (
              <div
                key={service.title}
                className="rounded-2xl border border-gray-800 bg-gray-900/40 p-6"
              >
                <h3 className="text-lg font-semibold text-white mb-2">
                  {service.title}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {service.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-gray-900">
        <div className="max-w-3xl mx-auto px-6 py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Let&apos;s build something together.
          </h2>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">
            I&apos;m currently open to freelance work and full-time roles.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/hire"
              className="bg-white text-black px-6 py-3 rounded-lg font-medium hover:bg-gray-200 transition"
            >
              Hire Me
            </Link>
            <Link
              href="/projects"
              className="border border-gray-600 px-6 py-3 rounded-lg font-medium hover:border-white transition"
            >
              See My Work
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}