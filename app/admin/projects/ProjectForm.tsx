"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { slugify } from "@/lib/utils";
import type { Project } from "@/lib/data";

type Props = {
  initial?: Project;
  mode: "create" | "edit";
};

export default function ProjectForm({ initial, mode }: Props) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [slugTouched, setSlugTouched] = useState(mode === "edit");

  const [title, setTitle] = useState(initial?.title ?? "");
  const [slug, setSlug] = useState(initial?.slug ?? "");
  const [tagline, setTagline] = useState(initial?.tagline ?? "");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [problem, setProblem] = useState(initial?.problem ?? "");
  const [solution, setSolution] = useState(initial?.solution ?? "");
  const [role, setRole] = useState(initial?.role ?? "");
  const [challenges, setChallenges] = useState(initial?.challenges ?? "");
  const [techStack, setTechStack] = useState(
    (initial?.techStack ?? []).join(", ")
  );
  const [features, setFeatures] = useState(
    (initial?.features ?? []).join(", ")
  );
  const [heroImage, setHeroImage] = useState(initial?.heroImage ?? "");
  const [liveUrl, setLiveUrl] = useState(initial?.liveUrl ?? "");
  const [githubUrl, setGithubUrl] = useState(initial?.githubUrl ?? "");
  const [videoUrl, setVideoUrl] = useState(initial?.videoUrl ?? "");
  const [status, setStatus] = useState(initial?.status ?? "live");
  const [featured, setFeatured] = useState(initial?.featured ?? false);
  const [displayOrder, setDisplayOrder] = useState(
    initial?.displayOrder?.toString() ?? "0"
  );

  function handleTitleChange(value: string) {
    setTitle(value);
    if (!slugTouched) {
      setSlug(slugify(value));
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");

    const payload = {
      title,
      slug,
      tagline,
      description,
      problem,
      solution,
      role,
      challenges,
      techStack: techStack
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      features: features
        .split(",")
        .map((f) => f.trim())
        .filter(Boolean),
      heroImage,
      liveUrl,
      githubUrl,
      videoUrl,
      status,
      featured,
      displayOrder: parseInt(displayOrder) || 0,
    };

    const url =
      mode === "create"
        ? "/api/admin/projects"
        : `/api/admin/projects/${initial?.id}`;

    const method = mode === "create" ? "POST" : "PATCH";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong.");
        setSaving(false);
        return;
      }

      router.push("/admin/projects");
      router.refresh();
    } catch {
      setError("Network error.");
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-gray-400 mb-2">Title *</label>
          <input
            required
            value={title}
            onChange={(e) => handleTitleChange(e.target.value)}
            className="w-full rounded-lg bg-gray-900 border border-gray-800 px-4 py-2.5 text-white focus:outline-none focus:border-gray-600"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-2">Slug *</label>
          <input
            required
            value={slug}
            onChange={(e) => {
              setSlug(e.target.value);
              setSlugTouched(true);
            }}
            className="w-full rounded-lg bg-gray-900 border border-gray-800 px-4 py-2.5 text-white focus:outline-none focus:border-gray-600"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm text-gray-400 mb-2">Tagline *</label>
        <input
          required
          value={tagline}
          onChange={(e) => setTagline(e.target.value)}
          placeholder="One-line summary shown on cards"
          className="w-full rounded-lg bg-gray-900 border border-gray-800 px-4 py-2.5 text-white focus:outline-none focus:border-gray-600"
        />
      </div>

      <div>
        <label className="block text-sm text-gray-400 mb-2">Description</label>
        <textarea
          rows={5}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full rounded-lg bg-gray-900 border border-gray-800 px-4 py-2.5 text-white focus:outline-none focus:border-gray-600"
        />
      </div>

      <details className="rounded-lg border border-gray-800 bg-gray-900/30 p-4">
        <summary className="cursor-pointer text-sm text-gray-300 font-medium">
          Case study fields (optional)
        </summary>
        <div className="mt-4 space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-2">Problem</label>
            <textarea
              rows={3}
              value={problem}
              onChange={(e) => setProblem(e.target.value)}
              className="w-full rounded-lg bg-gray-900 border border-gray-800 px-4 py-2.5 text-white focus:outline-none focus:border-gray-600"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">Solution</label>
            <textarea
              rows={3}
              value={solution}
              onChange={(e) => setSolution(e.target.value)}
              className="w-full rounded-lg bg-gray-900 border border-gray-800 px-4 py-2.5 text-white focus:outline-none focus:border-gray-600"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">Your role</label>
            <input
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full rounded-lg bg-gray-900 border border-gray-800 px-4 py-2.5 text-white focus:outline-none focus:border-gray-600"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">
              Challenges
            </label>
            <textarea
              rows={3}
              value={challenges}
              onChange={(e) => setChallenges(e.target.value)}
              className="w-full rounded-lg bg-gray-900 border border-gray-800 px-4 py-2.5 text-white focus:outline-none focus:border-gray-600"
            />
          </div>
        </div>
      </details>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-gray-400 mb-2">
            Tech stack (comma-separated)
          </label>
          <input
            value={techStack}
            onChange={(e) => setTechStack(e.target.value)}
            placeholder="Next.js, Supabase, Tailwind"
            className="w-full rounded-lg bg-gray-900 border border-gray-800 px-4 py-2.5 text-white focus:outline-none focus:border-gray-600"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-2">
            Features (comma-separated)
          </label>
          <input
            value={features}
            onChange={(e) => setFeatures(e.target.value)}
            placeholder="Auth, Payments, Admin panel"
            className="w-full rounded-lg bg-gray-900 border border-gray-800 px-4 py-2.5 text-white focus:outline-none focus:border-gray-600"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm text-gray-400 mb-2">
          Hero image URL
        </label>
        <input
          value={heroImage}
          onChange={(e) => setHeroImage(e.target.value)}
          placeholder="https://..."
          className="w-full rounded-lg bg-gray-900 border border-gray-800 px-4 py-2.5 text-white focus:outline-none focus:border-gray-600"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm text-gray-400 mb-2">Live URL</label>
          <input
            value={liveUrl}
            onChange={(e) => setLiveUrl(e.target.value)}
            className="w-full rounded-lg bg-gray-900 border border-gray-800 px-4 py-2.5 text-white focus:outline-none focus:border-gray-600"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-2">GitHub URL</label>
          <input
            value={githubUrl}
            onChange={(e) => setGithubUrl(e.target.value)}
            className="w-full rounded-lg bg-gray-900 border border-gray-800 px-4 py-2.5 text-white focus:outline-none focus:border-gray-600"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-2">Video URL</label>
          <input
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            className="w-full rounded-lg bg-gray-900 border border-gray-800 px-4 py-2.5 text-white focus:outline-none focus:border-gray-600"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm text-gray-400 mb-2">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full rounded-lg bg-gray-900 border border-gray-800 px-4 py-2.5 text-white focus:outline-none focus:border-gray-600"
          >
            <option value="live">Live</option>
            <option value="draft">Draft</option>
            <option value="archived">Archived</option>
          </select>
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-2">
            Display order
          </label>
          <input
            type="number"
            value={displayOrder}
            onChange={(e) => setDisplayOrder(e.target.value)}
            className="w-full rounded-lg bg-gray-900 border border-gray-800 px-4 py-2.5 text-white focus:outline-none focus:border-gray-600"
          />
        </div>
        <div className="flex items-end">
          <label className="flex items-center gap-2 text-sm text-gray-300 cursor-pointer">
            <input
              type="checkbox"
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
              className="accent-white"
            />
            Featured on homepage
          </label>
        </div>
      </div>

      {error && <p className="text-sm text-red-400">{error}</p>}

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={saving}
          className="bg-white text-black px-6 py-2.5 rounded-lg font-medium hover:bg-gray-200 transition disabled:opacity-50"
        >
          {saving ? "Saving..." : mode === "create" ? "Create project" : "Save changes"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/projects")}
          className="border border-gray-700 px-6 py-2.5 rounded-lg font-medium hover:border-gray-500 transition"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}