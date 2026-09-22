import Link from "next/link";
import LogoutButton from "./LogoutButton";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <div className="border-b border-gray-800 bg-gray-950">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/admin" className="text-white font-semibold">
              Admin
            </Link>
            <Link
              href="/admin/comments"
              className="text-sm text-gray-400 hover:text-white transition"
            >
              Comments
            </Link>
            <Link
              href="/admin/projects"
              className="text-sm text-gray-400 hover:text-white transition"
            >
              Projects
            </Link>
            <Link
              href="/admin/messages"
              className="text-sm text-gray-400 hover:text-white transition"
            >
              Messages
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="text-sm text-gray-400 hover:text-white transition"
            >
              View Site
            </Link>
            <LogoutButton />
          </div>
        </div>
      </div>
      {children}
    </div>
  );
}