"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ProjectRowActions({ id }: { id: string }) {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);

  async function handleDelete() {
    if (!confirm("Delete this project permanently? This cannot be undone.")) {
      return;
    }
    setDeleting(true);
    await fetch(`/api/admin/projects/${id}`, { method: "DELETE" });
    router.refresh();
    setDeleting(false);
  }

  return (
    <div className="flex gap-2 flex-shrink-0">
      <Link
        href={`/admin/projects/${id}/edit`}
        className="text-sm border border-gray-700 px-3 py-1.5 rounded-lg hover:border-gray-500 transition"
      >
        Edit
      </Link>
      <button
        onClick={handleDelete}
        disabled={deleting}
        className="text-sm border border-red-900/50 text-red-400 px-3 py-1.5 rounded-lg hover:bg-red-950/30 transition disabled:opacity-50"
      >
        {deleting ? "..." : "Delete"}
      </button>
    </div>
  );
}