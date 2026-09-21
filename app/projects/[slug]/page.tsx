import { notFound } from "next/navigation";
import Link from "next/link";
import { projects } from "@/lib/data";

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <article className="max-w-3xl mx-auto px-6 py-20">
      <Link
        href="/projects"
        className="text-sm text-gray-500 hover:text-white transition"
      >
        ← Back to projects
      </Link>

      <h1 className="text-4xl font-bold text-white mt-6 mb-3">
        {project.title}
      </h1>
      <p className="text-lg text-gray-400 mb-6">{project.tagline}</p>

      <div className="flex flex-wrap gap-2 mb-8">
        {project.techStack.map((tech) => (
          <span
            key={tech}
            className="text-xs px-3 py-1 rounded-full bg-gray-800 text-gray-300"
          >
            {tech}
          </span>
        ))}
      </div>

      <div className="flex flex-wrap gap-4 mb-10">
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-black px-5 py-2.5 rounded-lg font-medium hover:bg-gray-200 transition"
          >
            View Live Demo
          </a>
        )}
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="border border-gray-600 px-5 py-2.5 rounded-lg font-medium hover:border-white transition"
          >
            View Code
          </a>
        )}
      </div>

      <div className="aspect-video rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center mb-10">
        <span className="text-gray-600 text-sm">Project screenshot coming soon</span>
      </div>

      <div className="prose prose-invert max-w-none">
        <p className="text-gray-300 leading-relaxed">{project.description}</p>
      </div>
    </article>
  );
}