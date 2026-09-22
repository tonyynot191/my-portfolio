import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { getAllComments } from "@/lib/supabase/queries";
import CommentActions from "./CommentActions";

export default async function AdminCommentsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/admin/login");

  // Get all comments with approved status
  const { data } = await supabase
    .from("comments")
    .select(
      "id, project_id, name, email, content, approved, created_at, projects(title, slug)"
    )
    .order("approved", { ascending: true })
    .order("created_at", { ascending: false });

  const comments = (data ?? []) as any[];

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-white mb-2">Comments</h1>
      <p className="text-gray-400 mb-10">
        Approve or delete comments on your projects.
      </p>

      {comments.length === 0 ? (
        <p className="text-gray-500">No comments yet.</p>
      ) : (
        <div className="space-y-4">
          {comments.map((comment) => (
            <div
              key={comment.id}
              className={`rounded-xl border p-5 ${
                comment.approved
                  ? "border-gray-800 bg-gray-900/40"
                  : "border-yellow-700/50 bg-yellow-950/20"
              }`}
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <p className="font-semibold text-white text-sm">
                    {comment.name}
                    <span className="text-gray-500 font-normal">
                      {" "}
                      · {comment.email}
                    </span>
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    on{" "}
                    <span className="text-gray-400">
                      {comment.projects?.title ?? "Unknown project"}
                    </span>{" "}
                    · {new Date(comment.created_at).toLocaleString()}
                  </p>
                </div>
                <span
                  className={`text-xs px-2 py-1 rounded-full whitespace-nowrap ${
                    comment.approved
                      ? "bg-green-950/50 text-green-400"
                      : "bg-yellow-950/50 text-yellow-400"
                  }`}
                >
                  {comment.approved ? "Approved" : "Pending"}
                </span>
              </div>

              <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap mb-4">
                {comment.content}
              </p>

              <CommentActions
                commentId={comment.id}
                approved={comment.approved}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}