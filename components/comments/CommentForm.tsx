"use client";

import { useState } from "react";

export default function CommentForm({ projectId }: { projectId: string }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "sent" | "error">(
    "idle"
  );
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectId, name, email, content }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMessage(data.error || "Something went wrong.");
        setStatus("error");
        return;
      }

      setStatus("sent");
      setName("");
      setEmail("");
      setContent("");
    } catch {
      setErrorMessage("Network error. Please try again.");
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="rounded-xl border border-green-900/50 bg-green-950/30 p-6 text-center">
        <p className="text-green-400 font-medium mb-1">
          ✓ Comment submitted
        </p>
        <p className="text-sm text-gray-400">
          Your comment is awaiting approval. It will appear once reviewed.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          className="w-full rounded-lg bg-gray-900 border border-gray-800 px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-gray-600"
        />
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email (not published)"
          className="w-full rounded-lg bg-gray-900 border border-gray-800 px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-gray-600"
        />
      </div>
      <textarea
        required
        rows={4}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Share your thoughts..."
        className="w-full rounded-lg bg-gray-900 border border-gray-800 px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-gray-600"
      />

      {status === "error" && (
        <p className="text-sm text-red-400">{errorMessage}</p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="bg-white text-black px-6 py-2.5 rounded-lg font-medium hover:bg-gray-200 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === "loading" ? "Submitting..." : "Post Comment"}
      </button>
    </form>
  );
}