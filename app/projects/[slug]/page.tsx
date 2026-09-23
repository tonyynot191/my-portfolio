import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { getProjectBySlug, getComments } from "@/lib/supabase/queries";
import { getEmbedUrl, getDirectVideoUrl } from "@/lib/utils";
import LikeButton from "@/components/projects/LikeButton";
import CommentForm from "@/components/comments/CommentForm";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) return { title: "Project Not Found" };

  return {
    title: project.title,
    description: project.tagline,
    openGraph: {
      title: project.title,
      description: project.tagline,
      type: "article",
    },
  };
}

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
  const videoEmbedUrl = project.videoUrl ? getEmbedUrl(project.videoUrl) : null;
  const directVideoUrl =
    project.videoUrl && !videoEmbedUrl
      ? getDirectVideoUrl(project.videoUrl)
      : null;

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

      {/* External link buttons */}
      <div className="flex flex-wrap gap-4 mb-8">
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-black px-5 py-2.5 rounded-lg font-medium hover:bg-gray-200 transition"
          >
            Visit Live Site ↗
          </a>
        )}
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="border border-gray-600 px-5 py-2.5 rounded-lg font-medium hover:border-white transition"
          >
            View Code ↗
          </a>
        )}
      </div>

      <div className="flex items-center gap-4 mb-10">
        <LikeButton projectId={project.id} />
      </div>

      {/* Hero image */}
      <div className="relative aspect-video rounded-2xl overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center mb-12">
        {project.heroImage ? (
          <Image
            src={project.heroImage}
            alt={project.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 768px"
          />
        ) : (
          <span className="text-gray-600 text-sm">
            Project screenshot coming soon
          </span>
        )}
      </div>

      {/* Live Preview (iframe) */}
      {project.liveUrl && (
        <section className="mb-12">
          <div className="flex items-end justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold text-white">Live Preview</h2>
              <p className="text-sm text-gray-500 mt-1">
                A live view of the deployed app.
              </p>
            </div>
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-400 hover:text-white transition whitespace-nowrap"
            >
              Open full size ↗
            </a>
          </div>

          {/* Fake browser chrome */}
          <div className="rounded-2xl border border-gray-800 bg-gray-900/40 overflow-hidden">
            <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-800 bg-gray-900/60">
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-red-500/60" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/60" />
                <span className="w-3 h-3 rounded-full bg-green-500/60" />
              </div>
              <div className="flex-1 px-3 py-1 rounded bg-gray-950/80 border border-gray-800 text-xs text-gray-500 truncate font-mono">
                {project.liveUrl}
              </div>
            </div>

            <div className="aspect-video bg-gray-950">
              <iframe
                src={project.liveUrl}
                title={`${project.title} live preview`}
                className="w-full h-full"
                loading="lazy"
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
              />
            </div>
          </div>

          <p className="text-xs text-gray-600 mt-3">
            Preview may be blocked by some sites. If you don&apos;t see it, use
            the &ldquo;Open full size&rdquo; link above.
          </p>
        </section>
      )}

      {/* Video — embedded iframe (YouTube, Vimeo, Loom, Instagram, TikTok) */}
      {videoEmbedUrl && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">Demo</h2>
          <div className="rounded-2xl overflow-hidden border border-gray-800 bg-black">
            <div className="aspect-video">
              <iframe
                src={videoEmbedUrl}
                title={`${project.title} demo video`}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                allowFullScreen
                loading="lazy"
              />
            </div>
          </div>
        </section>
      )}

      {/* Video — direct file (.mp4, .webm, .ogg, .mov) */}
      {directVideoUrl && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">Demo</h2>
          <div className="rounded-2xl overflow-hidden border border-gray-800 bg-black">
            <video controls preload="metadata" className="w-full aspect-video">
              <source src={directVideoUrl} />
              Your browser doesn&apos;t support video playback.
            </video>
          </div>
        </section>
      )}

      {/* Video — URL present but not embeddable */}
      {project.videoUrl && !videoEmbedUrl && !directVideoUrl && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">Demo</h2>
          <a
            href={project.videoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block border border-gray-600 px-5 py-2.5 rounded-lg font-medium hover:border-white transition"
          >
            Watch Demo Video ↗
          </a>
        </section>
      )}

      {/* Overview */}
      {project.description && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">Overview</h2>
          <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
            {project.description}
          </p>
        </section>
      )}

      {/* The Challenge */}
      {project.problem && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">
            The Challenge
          </h2>
          <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
            {project.problem}
          </p>
        </section>
      )}

      {/* The Solution */}
      {project.solution && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">
            The Solution
          </h2>
          <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
            {project.solution}
          </p>
        </section>
      )}

      {/* Key Features */}
      {project.features && project.features.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">
            Key Features
          </h2>
          <ul className="space-y-2">
            {project.features.map((feature) => (
              <li
                key={feature}
                className="text-gray-300 leading-relaxed flex items-start gap-3"
              >
                <span className="text-purple-400 mt-1.5 flex-shrink-0">
                  ▸
                </span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Role + Challenges */}
      {(project.role || project.challenges) && (
        <section className="mb-12 rounded-2xl border border-gray-800 bg-gray-900/40 p-6">
          <h2 className="text-2xl font-bold text-white mb-4">
            My Role &amp; Learnings
          </h2>
          {project.role && (
            <div className="mb-4">
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                Role
              </p>
              <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                {project.role}
              </p>
            </div>
          )}
          {project.challenges && (
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                Challenges
              </p>
              <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                {project.challenges}
              </p>
            </div>
          )}
        </section>
      )}

      {/* Comments */}
      <section className="border-t border-gray-800 pt-10">
        <h2 className="text-2xl font-bold text-white mb-6">
          Comments{" "}
          {comments.length > 0 && (
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