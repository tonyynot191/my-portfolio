import {
  WhatsAppIcon,
  WhatsAppBusinessIcon,
  TelegramIcon,
  SnapchatIcon,
} from "./MessagingIcons";
import { CONTACT_CHANNELS, whatsappUrl, telegramUrl, snapchatUrl, mailtoUrl } from "@/lib/contact-channels";

export default function ContactChannels() {
  const channels = [
    {
      name: "Email",
      href: mailtoUrl(CONTACT_CHANNELS.email),
      icon: null,
      emoji: "✉",
      color: "hover:border-gray-500",
      hint: CONTACT_CHANNELS.email,
    },
    {
      name: "WhatsApp",
      href: whatsappUrl(CONTACT_CHANNELS.whatsapp, "Hi Tony!"),
      icon: <WhatsAppIcon className="w-5 h-5" />,
      color: "hover:border-green-500/60",
      hint: "Instant chat",
    },
    {
      name: "WhatsApp Business",
      href: whatsappUrl(CONTACT_CHANNELS.whatsappBusiness, "Hi Tony!"),
      icon: <WhatsAppBusinessIcon className="w-5 h-5" />,
      color: "hover:border-teal-500/60",
      hint: "Business inquiries",
    },
    {
      name: "Telegram",
      href: telegramUrl(CONTACT_CHANNELS.telegram, "Hi Tony!"),
      icon: <TelegramIcon className="w-5 h-5" />,
      color: "hover:border-sky-500/60",
      hint: "Instant chat",
    },
    {
      name: "Snapchat",
      href: snapchatUrl(CONTACT_CHANNELS.snapchat),
      icon: <SnapchatIcon className="w-5 h-5" />,
      color: "hover:border-yellow-500/60",
      hint: `@${CONTACT_CHANNELS.snapchat}`,
    },
  ];

  return (
    <div className="mb-10">
      <h2 className="text-2xl font-bold text-white mb-4">Or message me directly</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {channels.map((c) => (
          <a
            key={c.name}
            href={c.href}
            target={c.name === "Email" ? undefined : "_blank"}
            rel={c.name === "Email" ? undefined : "noopener noreferrer"}
            className={`flex items-center gap-3 rounded-xl border border-gray-800 bg-gray-900/40 px-4 py-3 transition group ${c.color}`}
          >
            <span className="text-gray-300 group-hover:text-white transition">
              {c.icon ?? <span className="text-lg">{c.emoji}</span>}
            </span>
            <span className="min-w-0">
              <span className="block text-sm font-medium text-white">
                {c.name}
              </span>
              <span className="block text-xs text-gray-500 truncate">
                {c.hint}
              </span>
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}