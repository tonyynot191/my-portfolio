"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CommentActions({
  commentId,
  approved,
}: {
  commentId: string;
  approved: boolean;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function update(approvedValue: boolean | null) {
    if (loading) return;
    setLoading(true);

    if (approvedValue === null) {
      // Delete
      await fetch(`/api/admin/comments/${commentId}`, { method: "DELETE" });
    } else {
      // Update approval
      await fetch(`/api/admin/comments/${commentId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ approved: approvedValue }),
      });
    }

    router.refresh();
    setLoading(false);
  }

  return (
    <div className="flex gap-3">
      {!approved && (
        <button
          onClick={() => update(true)}
          disabled={loading}
          className="text-sm bg-green-600/20 text-green-400 border border-green-900/50 px-3 py-1.5 rounded-lg hover:bg-green-600/30 transition disabled:opacity-50"
        >
          Approve
        </button>
      )}
      {approved && (
        <button
          onClick={() => update(false)}
          disabled={loading}
          className="text-sm bg-yellow-600/20 text-yellow-400 border border-yellow-900/50 px-3 py-1.5 rounded-lg hover:bg-yellow-600/30 transition disabled:opacity-50"
        >
          Unapprove
        </button>
      )}
      <button
        onClick={() => {
          if (confirm("Delete this comment permanently?")) update(null);
        }}
        disabled={loading}
        className="text-sm bg-red-600/20 text-red-400 border border-red-900/50 px-3 py-1.5 rounded-lg hover:bg-red-600/30 transition disabled:opacity-50"
      >
        Delete
      </button>
    </div>
  );
}