import Link from "next/link";
import { getProjects } from "@/lib/supabase/queries";
import ProjectCard from "@/components/projects/ProjectCard";

export default async function Home() {
  const allProjects = await getProjects();
  const featured = allProjects.filter((p) => p.featured).slice(0, 3);

  return (
    <>
      {/* HERO */}
      <section className="min-h-[85vh] flex flex-col items-center justify-center px-6">
        <div className="max-w-3xl text-center">
          <p className="text-sm text-gray-500 mb-4 tracking-wide uppercase">
            Full-Stack Web Developer
          </p>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-white mb-6">
            Hi, I&apos;m Tony.
          </h1>
          <p className="text-xl text-gray-400 mb-10 max-w-xl mx-auto">
            I build fast, accessible, and modern web applications — from
            database to polished UI.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/projects"
              className="bg-white text-black px-6 py-3 rounded-lg font-medium hover:bg-gray-200 transition"
            >
              View My Work
            </Link>
            <Link
              href="/contact"
              className="border border-gray-600 px-6 py-3 rounded-lg font-medium hover:border-white transition"
            >
              Contact Me
            </Link>
          </div>
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
              className="text-sm text-gray-400 hover:text-white transition hidden md:inline"
            >
              View all →
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
              className="text-sm text-gray-400 hover:text-white transition"
            >
              View all projects →
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