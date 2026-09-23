import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { getAllMessages } from "@/lib/supabase/queries";
import MessageActions from "./MessageActions";

const APP_LABELS: Record<string, string> = {
  whatsapp: "WhatsApp",
  whatsapp_business: "WhatsApp Business",
  telegram: "Telegram",
  snapchat: "Snapchat",
};

function getAppLink(
  app: string | null,
  phone: string | null
): string | null {
  if (!app || !phone) return null;
  const digits = phone.replace(/\D/g, "");
  if (digits.length < 7) return null;

  if (app === "whatsapp" || app === "whatsapp_business") {
    return `https://wa.me/${digits}`;
  }
  if (app === "telegram") {
    return `https://t.me/+${digits}`;
  }
  // Snapchat doesn't support phone-based deep links
  return null;
}

export default async function AdminMessagesPage({
  searchParams,
}: {
  searchParams: Promise<{ source?: string }>;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  const { source } = await searchParams;
  const allMessages = await getAllMessages();

  const filtered =
    source === "hire"
      ? allMessages.filter((m) => m.source === "hire")
      : source === "contact"
        ? allMessages.filter((m) => m.source === "contact")
        : allMessages;

  const unreadCount = filtered.filter((m) => !m.read).length;
  const hireCount = allMessages.filter((m) => m.source === "hire").length;
  const contactCount = allMessages.filter((m) => m.source === "contact").length;

  const tabs = [
    { label: `All (${allMessages.length})`, value: "" },
    { label: `Hire (${hireCount})`, value: "hire" },
    { label: `Contact (${contactCount})`, value: "contact" },
  ];

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-white mb-2">Messages</h1>
      <p className="text-gray-400 mb-6">
        {filtered.length} shown
        {unreadCount > 0 && (
          <>
            {" · "}
            <span className="text-yellow-400">{unreadCount} unread</span>
          </>
        )}
      </p>

      <div className="flex flex-wrap gap-2 mb-8">
        {tabs.map((tab) => {
          const active = (source ?? "") === tab.value;
          return (
            <Link
              key={tab.value}
              href={
                tab.value
                  ? `/admin/messages?source=${tab.value}`
                  : "/admin/messages"
              }
              className={`text-sm px-4 py-2 rounded-lg border transition ${
                active
                  ? "bg-white text-black border-white"
                  : "border-gray-800 text-gray-400 hover:border-gray-600 hover:text-white"
              }`}
            >
              {tab.label}
            </Link>
          );
        })}
      </div>

      {filtered.length === 0 ? (
        <p className="text-gray-500">
          No {source === "hire" ? "hire " : source === "contact" ? "contact " : ""}
          messages yet.
        </p>
      ) : (
        <div className="space-y-3">
          {filtered.map((message) => {
            const appLink = getAppLink(message.preferredApp, message.phone);
            return (
              <div
                key={message.id}
                className={`rounded-xl border p-5 ${
                  message.read
                    ? "border-gray-800 bg-gray-900/40"
                    : "border-yellow-700/50 bg-yellow-950/10"
                }`}
              >
                <div className="flex items-start justify-between gap-4 mb-3 flex-wrap">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      {!message.read && (
                        <span className="w-2 h-2 rounded-full bg-yellow-400 flex-shrink-0" />
                      )}
                      <p className="font-semibold text-white text-sm truncate">
                        {message.name}
                      </p>
                      <span
                        className={`text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded ${
                          message.source === "hire"
                            ? "bg-purple-500/20 text-purple-300"
                            : "bg-gray-700/50 text-gray-400"
                        }`}
                      >
                        {message.source === "hire" ? "Hire" : "Contact"}
                      </span>
                      {message.preferredApp && (
                        <span className="text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded bg-blue-500/20 text-blue-300">
                          {APP_LABELS[message.preferredApp] ??
                            message.preferredApp}
                        </span>
                      )}
                    </div>

                    <a
                      href={`mailto:${message.email}`}
                      className="text-xs text-blue-400 hover:text-blue-300 transition"
                    >
                      {message.email}
                    </a>

                    {message.phone && (
                      <p className="text-xs text-gray-400 mt-1">
                        Phone:{" "}
                        <span className="text-gray-300 font-mono">
                          {message.phone}
                        </span>
                        {message.preferredApp === "snapchat" && (
                          <span className="text-gray-600 ml-2">
                            (search on Snapchat)
                          </span>
                        )}
                      </p>
                    )}

                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(message.createdAt).toLocaleString()}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {appLink && (
                      <a
                        href={appLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm bg-green-600/20 text-green-400 border border-green-900/50 px-3 py-1.5 rounded-lg hover:bg-green-600/30 transition whitespace-nowrap"
                      >
                        Message on {APP_LABELS[message.preferredApp!]}
                      </a>
                    )}
                    <MessageActions
                      messageId={message.id}
                      read={message.read}
                      email={message.email}
                      subject={`Reply to ${message.name}`}
                    />
                  </div>
                </div>

                <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap mt-3 pt-3 border-t border-gray-800">
                  {message.message}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}