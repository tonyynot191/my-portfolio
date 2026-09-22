import type { MetadataRoute } from "next";
import { getProjects } from "@/lib/supabase/queries";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: `${siteUrl}/`, lastModified: new Date(), priority: 1.0 },
    { url: `${siteUrl}/about`, lastModified: new Date(), priority: 0.8 },
    { url: `${siteUrl}/projects`, lastModified: new Date(), priority: 0.9 },
    { url: `${siteUrl}/contact`, lastModified: new Date(), priority: 0.7 },
    { url: `${siteUrl}/hire`, lastModified: new Date(), priority: 0.7 },
  ];

  // Dynamic project pages
  let projectPages: MetadataRoute.Sitemap = [];
  try {
    const projects = await getProjects();
    projectPages = projects.map((project) => ({
      url: `${siteUrl}/projects/${project.slug}`,
      lastModified: new Date(),
      priority: 0.8,
    }));
  } catch {
    // If DB fails, skip project pages rather than break the whole sitemap
  }

  return [...staticPages, ...projectPages];
}