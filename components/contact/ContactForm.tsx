"use client";

import { useState } from "react";
import {
  WhatsAppIcon,
  WhatsAppBusinessIcon,
  TelegramIcon,
  SnapchatIcon,
} from "./MessagingIcons";
import { CONTACT_CHANNELS, whatsappUrl, telegramUrl } from "@/lib/contact-channels";

const APPS = [
  { value: "whatsapp", label: "WhatsApp", icon: WhatsAppIcon },
  { value: "whatsapp_business", label: "WhatsApp Business", icon: WhatsAppBusinessIcon },
  { value: "telegram", label: "Telegram", icon: TelegramIcon },
  { value: "snapchat", label: "Snapchat", icon: SnapchatIcon },
] as const;

type AppValue = (typeof APPS)[number]["value"];

type Errors = {
  name?: string;
  email?: string;
  phone?: string;
  preferredApp?: string;
  message?: string;
};

export default function ContactForm({
  source = "contact",
}: {
  source?: "contact" | "hire";
}) {
  const isHire = source === "hire";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [preferredApp, setPreferredApp] = useState<AppValue | "">("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "sent" | "error">("idle");
  const [serverError, setServerError] = useState("");

  function validate(): Errors {
    const next: Errors = {};
    if (!name.trim()) next.name = "Please enter your name.";
    else if (name.trim().length > 80) next.name = "Name is too long.";
    if (!email.trim()) next.email = "Please enter your email.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      next.email = "Please enter a valid email address.";
    if (!phone.trim()) next.phone = "Please enter your phone number.";
    else if (phone.replace(/\D/g, "").length < 7)
      next.phone = "Please enter a valid phone number with country code.";
    if (isHire && !preferredApp)
      next.preferredApp = "Please select a preferred contact app.";
    if (!message.trim()) next.message = "Please enter a message.";
    else if (message.trim().length < 5)
      next.message = "Message must be at least 5 characters.";
    return next;
  }

  function openPreferredApp() {
    if (!isHire || !preferredApp) return;
    const text = `Hi Tony, I'm ${name}. ${message}\n\nEmail: ${email}\nPhone: ${phone}`;

    if (preferredApp === "whatsapp") {
      window.open(whatsappUrl(CONTACT_CHANNELS.whatsapp, text), "_blank");
    } else if (preferredApp === "whatsapp_business") {
      window.open(whatsappUrl(CONTACT_CHANNELS.whatsappBusiness, text), "_blank");
    } else if (preferredApp === "telegram") {
      window.open(telegramUrl(CONTACT_CHANNELS.telegram, text), "_blank");
    }
    // Snapchat doesn't support pre-filled message deep links — skip
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      const firstKey = Object.keys(validationErrors)[0];
      const el = document.querySelector<HTMLElement>(`[data-field="${firstKey}"]`);
      el?.focus();
      el?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    setErrors({});
    setStatus("loading");
    setServerError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          message,
          source,
          phone,
          preferredApp: isHire ? preferredApp : undefined,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setServerError(data.error || "Something went wrong.");
        setStatus("error");
        return;
      }

      setStatus("sent");
      // After success, open the visitor's chosen app with a pre-filled message
      openPreferredApp();

      setName("");
      setEmail("");
      setPhone("");
      setPreferredApp("");
      setMessage("");
    } catch {
      setServerError("Network error. Please try again.");
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="rounded-xl border border-green-900/50 bg-green-950/30 p-8 text-center">
        <p className="text-green-400 font-medium mb-1">✓ Message sent</p>
        <p className="text-sm text-gray-400">
          {isHire && preferredApp
            ? "Your messaging app should have opened with your message ready to send."
            : "Thanks for reaching out. I'll get back to you within 24 hours."}
        </p>
      </div>
    );
  }

  const baseInput =
    "w-full rounded-lg bg-gray-900 border px-4 py-3 text-white placeholder-gray-500 focus:outline-none transition";
  const normalBorder = "border-gray-800 focus:border-gray-600";
  const errorBorder = "border-red-500/60 focus:border-red-500";

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div>
        <label className="block text-sm text-gray-400 mb-2">Name</label>
        <input
          type="text"
          value={name}
          data-field="name"
          onChange={(e) => {
            setName(e.target.value);
            if (errors.name) setErrors((p) => ({ ...p, name: undefined }));
          }}
          placeholder="Your name"
          className={`${baseInput} ${errors.name ? errorBorder : normalBorder}`}
        />
        {errors.name && <p className="text-xs text-red-400 mt-1.5">{errors.name}</p>}
      </div>

      <div>
        <label className="block text-sm text-gray-400 mb-2">Email</label>
        <input
          type="email"
          value={email}
          data-field="email"
          onChange={(e) => {
            setEmail(e.target.value);
            if (errors.email) setErrors((p) => ({ ...p, email: undefined }));
          }}
          placeholder="you@example.com"
          className={`${baseInput} ${errors.email ? errorBorder : normalBorder}`}
        />
        {errors.email && <p className="text-xs text-red-400 mt-1.5">{errors.email}</p>}
      </div>

      <div>
        <label className="block text-sm text-gray-400 mb-2">Phone number</label>
        <input
          type="tel"
          value={phone}
          data-field="phone"
          onChange={(e) => {
            setPhone(e.target.value);
            if (errors.phone) setErrors((p) => ({ ...p, phone: undefined }));
          }}
          placeholder="+234 800 000 0000"
          className={`${baseInput} ${errors.phone ? errorBorder : normalBorder}`}
        />
        {errors.phone ? (
          <p className="text-xs text-red-400 mt-1.5">{errors.phone}</p>
        ) : (
          <p className="text-xs text-gray-600 mt-1.5">
            Include your country code so I can reach you on messaging apps.
          </p>
        )}
      </div>

      {isHire && (
        <div>
          <label className="block text-sm text-gray-400 mb-2">
            Preferred contact app
          </label>
          <div
            data-field="preferredApp"
            tabIndex={-1}
            className={`grid grid-cols-2 gap-2 rounded-lg p-1 -m-1 ${
              errors.preferredApp ? "ring-1 ring-red-500/60" : ""
            }`}
          >
            {APPS.map((app) => {
              const Icon = app.icon;
              const active = preferredApp === app.value;
              return (
                <button
                  key={app.value}
                  type="button"
                  onClick={() => {
                    setPreferredApp(app.value);
                    if (errors.preferredApp)
                      setErrors((p) => ({ ...p, preferredApp: undefined }));
                  }}
                  className={`flex items-center justify-center gap-2 text-sm px-4 py-2.5 rounded-lg border transition ${
                    active
                      ? "bg-white text-black border-white font-medium"
                      : "border-gray-800 text-gray-300 hover:border-gray-600"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{app.label}</span>
                </button>
              );
            })}
          </div>
          {errors.preferredApp ? (
            <p className="text-xs text-red-400 mt-2">{errors.preferredApp}</p>
          ) : (
            <p className="text-xs text-gray-600 mt-2">
              I&apos;ll reach out on the app you select here.
            </p>
          )}
        </div>
      )}

      <div>
        <label className="block text-sm text-gray-400 mb-2">Message</label>
        <textarea
          rows={5}
          value={message}
          data-field="message"
          onChange={(e) => {
            setMessage(e.target.value);
            if (errors.message) setErrors((p) => ({ ...p, message: undefined }));
          }}
          placeholder={
            isHire
              ? "Tell me about your project, budget, and timeline..."
              : "Tell me about your project..."
          }
          className={`${baseInput} ${errors.message ? errorBorder : normalBorder}`}
        />
        {errors.message && <p className="text-xs text-red-400 mt-1.5">{errors.message}</p>}
      </div>

      {status === "error" && serverError && (
        <div className="rounded-lg border border-red-900/50 bg-red-950/30 p-3">
          <p className="text-sm text-red-400">{serverError}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full bg-white text-black px-6 py-3 rounded-lg font-medium hover:bg-gray-200 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === "loading" ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}