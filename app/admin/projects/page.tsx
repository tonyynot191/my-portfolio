import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { getAllProjects } from "@/lib/supabase/queries";
import ProjectRowActions from "./ProjectRowActions";

export default async function AdminProjectsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  const projects = await getAllProjects();

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-1">Projects</h1>
          <p className="text-gray-400 text-sm">
            Manage your portfolio. Total: {projects.length}
          </p>
        </div>
        <Link
          href="/admin/projects/new"
          className="bg-white text-black px-4 py-2.5 rounded-lg font-medium hover:bg-gray-200 transition text-sm"
        >
          + New Project
        </Link>
      </div>

      {projects.length === 0 ? (
        <p className="text-gray-500">No projects yet. Create your first one.</p>
      ) : (
        <div className="space-y-3">
          {projects.map((p) => (
            <div
              key={p.id}
              className="rounded-xl border border-gray-800 bg-gray-900/40 p-4 flex items-center gap-4"
            >
              <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center flex-shrink-0">
                <span className="text-xl font-bold text-gray-700">
                  {p.title.charAt(0)}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-white truncate">
                    {p.title}
                  </h3>
                  {p.featured && (
                    <span className="text-xs px-2 py-0.5 rounded bg-blue-950/50 text-blue-400">
                      Featured
                    </span>
                  )}
                  {p.status !== "live" && (
                    <span className="text-xs px-2 py-0.5 rounded bg-yellow-950/50 text-yellow-400">
                      {p.status}
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-500 truncate">{p.tagline}</p>
              </div>
              <ProjectRowActions id={p.id} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}