import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { getAdminStats } from "@/lib/supabase/queries";

export default async function AdminPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/admin/login");

  const stats = await getAdminStats();

  const cards = [
    {
      label: "Projects",
      value: stats.projects,
      href: "/admin/projects",
      hint: "Manage your portfolio items",
    },
    {
      label: "Pending comments",
      value: stats.pendingComments,
      href: "/admin/comments",
      hint: "Waiting for your approval",
      highlight: stats.pendingComments > 0,
    },
    {
      label: "Total comments",
      value: stats.totalComments,
      href: "/admin/comments",
      hint: "All comments ever",
    },
    {
      label: "Unread messages",
      value: stats.unreadMessages,
      href: "/admin/messages",
      hint: "From your contact form",
      highlight: stats.unreadMessages > 0,
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
      <p className="text-gray-400 mb-10">Signed in as {user.email}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className={`rounded-xl border p-6 transition hover:border-gray-600 ${
              card.highlight
                ? "border-yellow-700/50 bg-yellow-950/20"
                : "border-gray-800 bg-gray-900/40"
            }`}
          >
            <p className="text-sm text-gray-400 mb-2">{card.label}</p>
            <p className="text-3xl font-bold text-white mb-1">{card.value}</p>
            <p className="text-xs text-gray-500">{card.hint}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}