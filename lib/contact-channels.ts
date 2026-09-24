export const CONTACT_CHANNELS = {
  email: "adetony2006@gmail.com",
  whatsapp: "2348012345678",           // ← your personal WhatsApp number
  whatsappBusiness: "2348012345678",   // ← your WhatsApp Business number
  telegram: "tonydev",                  // ← your Telegram username (no @)
  snapchat: "tony.dev",                 // ← your Snapchat username
};

export function whatsappUrl(phone: string, message?: string) {
  const digits = phone.replace(/\D/g, "");
  const base = `https://wa.me/${digits}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export function telegramUrl(username: string, message?: string) {
  const clean = username.replace(/^@/, "");
  // tg:// deep link supports prefilled text; t.me doesn't
  return message
    ? `https://t.me/${clean}?text=${encodeURIComponent(message)}`
    : `https://t.me/${clean}`;
}

export function snapchatUrl(username: string) {
  return `https://www.snapchat.com/add/${username}`;
}

export function mailtoUrl(email: string, subject?: string, body?: string) {
  const params = new URLSearchParams();
  if (subject) params.set("subject", subject);
  if (body) params.set("body", body);
  const qs = params.toString();
  return `mailto:${email}${qs ? `?${qs}` : ""}`;
}