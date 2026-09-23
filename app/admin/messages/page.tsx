import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { getAllMessages } from "@/lib/supabase/queries";
import MessageActions from "./MessageActions";

export default async function AdminMessagesPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  const messages = await getAllMessages();
  const unreadCount = messages.filter((m) => !m.read).length;

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-white mb-2">Messages</h1>
      <p className="text-gray-400 mb-10">
        {messages.length} total
        {unreadCount > 0 && (
          <>
            {" · "}
            <span className="text-yellow-400">{unreadCount} unread</span>
          </>
        )}
      </p>

      {messages.length === 0 ? (
        <p className="text-gray-500">
          No messages yet. They&apos;ll appear here when someone uses your
          contact form.
        </p>
      ) : (
        <div className="space-y-3">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`rounded-xl border p-5 ${
                message.read
                  ? "border-gray-800 bg-gray-900/40"
                  : "border-yellow-700/50 bg-yellow-950/10"
              }`}
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    {!message.read && (
                      <span className="w-2 h-2 rounded-full bg-yellow-400 flex-shrink-0" />
                    )}
                    <p className="font-semibold text-white text-sm truncate">
                      {message.name}
                    </p>
                  </div>
                  <a
                    href={`mailto:${message.email}`}
                    className="text-xs text-blue-400 hover:text-blue-300 transition"
                  >
                    {message.email}
                  </a>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(message.createdAt).toLocaleString()}
                  </p>
                </div>
                <MessageActions
                  messageId={message.id}
                  read={message.read}
                  email={message.email}
                  subject={`Reply to ${message.name}`}
                />
              </div>

              <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap mt-3 pt-3 border-t border-gray-800">
                {message.message}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}