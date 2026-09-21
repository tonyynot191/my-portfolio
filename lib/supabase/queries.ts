import { createClient } from "./server";
import type { Project } from "@/lib/data";

type DbProject = {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  description: string | null;
  problem: string | null;
  solution: string | null;
  role: string | null;
  challenges: string | null;
  tech_stack: string[];
  features: string[] | null;
  hero_image: string | null;
  screenshots: string[] | null;
  live_url: string | null;
  github_url: string | null;
  video_url: string | null;
};

function toProject(row: DbProject): Project {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    tagline: row.tagline,
    description: row.description ?? "",
    problem: row.problem ?? undefined,
    solution: row.solution ?? undefined,
    role: row.role ?? undefined,
    challenges: row.challenges ?? undefined,
    techStack: row.tech_stack,
    features: row.features ?? undefined,
    heroImage: row.hero_image ?? undefined,
    screenshots: row.screenshots ?? undefined,
    liveUrl: row.live_url ?? undefined,
    githubUrl: row.github_url ?? undefined,
    videoUrl: row.video_url ?? undefined,
  };
}

export async function getProjects(): Promise<Project[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("status", "live")
    .order("display_order", { ascending: true });

  if (error || !data) return [];
  return (data as DbProject[]).map(toProject);
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("slug", slug)
    .eq("status", "live")
    .single();

  if (error || !data) return null;
  return toProject(data as DbProject);
}
export type Comment = {
  id: string;
  name: string;
  content: string;
  createdAt: string;
};

export async function getComments(projectId: string): Promise<Comment[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("comments")
    .select("id, name, content, created_at")
    .eq("project_id", projectId)
    .eq("approved", true)
    .order("created_at", { ascending: false });

  if (error || !data) return [];

  return data.map((row) => ({
    id: row.id,
    name: row.name,
    content: row.content,
    createdAt: row.created_at,
  }));
}