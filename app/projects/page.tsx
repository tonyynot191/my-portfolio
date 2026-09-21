import ProjectCard from "@/components/projects/ProjectCard";
import { projects } from "@/lib/data";

export const metadata = {
  title: "Projects | Tony",
  description: "A selection of web applications I have built.",
};

export default function ProjectsPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-20">
      <h1 className="text-4xl font-bold text-white mb-3">Projects</h1>
      <p className="text-gray-400 mb-12">
        A selection of things I&apos;ve built. Click any project to read more.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </div>
  );
}