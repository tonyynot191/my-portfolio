import { notFound } from "next/navigation";
import Link from "next/link";
import { getProjectBySlug, getComments } from "@/lib/supabase/queries";
import LikeButton from "@/components/projects/LikeButton";
import CommentForm from "@/components/comments/CommentForm";

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const comments = await getComments(project.id);

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

      <div className="flex items-center gap-4 mb-10">
        <LikeButton projectId={project.id} />
      </div>

      <div className="aspect-video rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center mb-10">
        <span className="text-gray-600 text-sm">Project screenshot coming soon</span>
      </div>

      <div className="prose prose-invert max-w-none mb-16">
        <p className="text-gray-300 leading-relaxed">{project.description}</p>
      </div>

      {/* Comments section */}
      <section className="border-t border-gray-800 pt-10">
        <h2 className="text-2xl font-bold text-white mb-6">
          Comments {comments.length > 0 && (
            <span className="text-gray-500 font-normal text-lg">
              ({comments.length})
            </span>
          )}
        </h2>

        {comments.length === 0 ? (
          <p className="text-gray-500 text-sm mb-8">
            No comments yet. Be the first!
          </p>
        ) : (
          <ul className="space-y-6 mb-10">
            {comments.map((comment) => (
              <li
                key={comment.id}
                className="rounded-xl border border-gray-800 bg-gray-900/40 p-5"
              >
                <div className="flex items-baseline justify-between mb-2">
                  <span className="font-semibold text-white text-sm">
                    {comment.name}
                  </span>
                  <time className="text-xs text-gray-500">
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </time>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap">
                  {comment.content}
                </p>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-8">
          <h3 className="text-lg font-semibold text-white mb-4">
            Leave a comment
          </h3>
          <CommentForm projectId={project.id} />
        </div>
      </section>
    </article>
  );
}