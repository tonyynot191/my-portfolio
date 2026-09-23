"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function MessageActions({
  messageId,
  read,
  email,
  subject,
}: {
  messageId: string;
  read: boolean;
  email: string;
  subject: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function toggleRead() {
    if (loading) return;
    setLoading(true);
    await fetch(`/api/admin/messages/${messageId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ read: !read }),
    });
    router.refresh();
    setLoading(false);
  }

  async function handleDelete() {
    if (
      !confirm(
        "Delete this message permanently? This cannot be undone."
      )
    )
      return;
    setLoading(true);
    await fetch(`/api/admin/messages/${messageId}`, { method: "DELETE" });
    router.refresh();
    setLoading(false);
  }

  return (
    <div className="flex gap-2 flex-shrink-0">
      <a
        href={`mailto:${email}?subject=${encodeURIComponent(subject)}`}
        className="text-sm border border-gray-700 px-3 py-1.5 rounded-lg hover:border-gray-500 transition whitespace-nowrap"
      >
        Reply
      </a>
      <button
        onClick={toggleRead}
        disabled={loading}
        className={`text-sm border px-3 py-1.5 rounded-lg transition whitespace-nowrap disabled:opacity-50 ${
          read
            ? "border-gray-700 text-gray-400 hover:border-gray-500"
            : "border-yellow-700/50 text-yellow-400 hover:bg-yellow-950/30"
        }`}
      >
        {read ? "Mark unread" : "Mark read"}
      </button>
      <button
        onClick={handleDelete}
        disabled={loading}
        className="text-sm border border-red-900/50 text-red-400 px-3 py-1.5 rounded-lg hover:bg-red-950/30 transition disabled:opacity-50"
      >
        {loading ? "..." : "Delete"}
      </button>
    </div>
  );
}