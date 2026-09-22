import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import ProjectForm from "../ProjectForm";

export default async function NewProjectPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <Link
        href="/admin/projects"
        className="text-sm text-gray-500 hover:text-white transition"
      >
        ← Back to projects
      </Link>
      <h1 className="text-3xl font-bold text-white mt-4 mb-8">
        New Project
      </h1>
      <ProjectForm mode="create" />
    </div>
  );
}