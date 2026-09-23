import Link from "next/link";
import type { Project } from "@/lib/data";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group block rounded-2xl border border-gray-800 bg-gray-900/40 overflow-hidden card-lift hover:border-gray-600"
    >
      <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center overflow-hidden">
        <span className="text-5xl font-bold text-gray-700 card-image">
          {project.title.charAt(0)}
        </span>
      </div>
      <div className="p-6">
        <h3 className="text-lg font-semibold text-white group-hover:text-gray-300 transition">
          {project.title}
        </h3>
        <p className="text-sm text-gray-400 mt-1 line-clamp-2">
          {project.tagline}
        </p>
        <div className="flex flex-wrap gap-2 mt-4">
          {project.techStack.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="text-xs px-2 py-1 rounded bg-gray-800 text-gray-300"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}