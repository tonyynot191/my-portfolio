"use client";

import { useEffect, useState } from "react";
import { useVisitorId } from "@/hooks/useVisitorId";

export default function LikeButton({ projectId }: { projectId: string }) {
  const visitorId = useVisitorId();
  const [count, setCount] = useState(0);
  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!visitorId) return;
    fetch(`/api/likes?projectId=${projectId}&visitorId=${visitorId}`)
      .then((r) => r.json())
      .then((data) => {
        setCount(data.count);
        setLiked(data.liked);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [projectId, visitorId]);

  async function toggle() {
    if (!visitorId || loading) return;

    // Optimistic update
    const previousCount = count;
    const previousLiked = liked;
    setLiked(!liked);
    setCount(liked ? count - 1 : count + 1);

    try {
      const res = await fetch("/api/likes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectId, visitorId }),
      });

      if (!res.ok) throw new Error("Failed");

      const data = await res.json();
      setCount(data.count);
      setLiked(data.liked);
    } catch {
      // Revert on error
      setCount(previousCount);
      setLiked(previousLiked);
    }
  }

  return (
    <button
      onClick={toggle}
      disabled={loading}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition ${
        liked
          ? "border-red-500/50 bg-red-500/10 text-red-400"
          : "border-gray-700 text-gray-400 hover:border-gray-500 hover:text-white"
      } ${loading ? "opacity-50 cursor-wait" : ""}`}
      aria-label={liked ? "Unlike" : "Like"}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill={liked ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
      <span className="text-sm font-medium">{loading ? "·" : count}</span>
    </button>
  );
}