"use client";

import { useState } from "react";

const APPS = [
  { value: "whatsapp", label: "WhatsApp" },
  { value: "whatsapp_business", label: "WhatsApp Business" },
  { value: "telegram", label: "Telegram" },
  { value: "snapchat", label: "Snapchat" },
] as const;

type AppValue = (typeof APPS)[number]["value"];

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
  const [status, setStatus] = useState<
    "idle" | "loading" | "sent" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    // Hire-specific client validation
    if (isHire) {
      if (phone.replace(/\D/g, "").length < 7) {
        setErrorMessage("Please enter a valid phone number.");
        setStatus("error");
        return;
      }
      if (!preferredApp) {
        setErrorMessage("Please select your preferred contact app.");
        setStatus("error");
        return;
      }
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          message,
          source,
          phone: isHire ? phone : undefined,
          preferredApp: isHire ? preferredApp : undefined,
        }),
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
      setPhone("");
      setPreferredApp("");
      setMessage("");
    } catch {
      setErrorMessage("Network error. Please try again.");
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="rounded-xl border border-green-900/50 bg-green-950/30 p-8 text-center">
        <p className="text-green-400 font-medium mb-1">✓ Message sent</p>
        <p className="text-sm text-gray-400">
          Thanks for reaching out. I&apos;ll get back to you within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block text-sm text-gray-400 mb-2">
          Name <span className="text-red-400">*</span>
        </label>
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          className="w-full rounded-lg bg-gray-900 border border-gray-800 px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-gray-600"
        />
      </div>

      <div>
        <label className="block text-sm text-gray-400 mb-2">
          Email <span className="text-red-400">*</span>
        </label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="w-full rounded-lg bg-gray-900 border border-gray-800 px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-gray-600"
        />
      </div>

      {isHire && (
        <>
          <div>
            <label className="block text-sm text-gray-400 mb-2">
              Phone number <span className="text-red-400">*</span>
            </label>
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+234 800 000 0000"
              className="w-full rounded-lg bg-gray-900 border border-gray-800 px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-gray-600"
            />
            <p className="text-xs text-gray-600 mt-1">
              Include your country code so I can reach you on messaging apps.
            </p>
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-2">
              Preferred contact app <span className="text-red-400">*</span>
            </label>
            <div className="grid grid-cols-2 gap-2">
              {APPS.map((app) => {
                const active = preferredApp === app.value;
                return (
                  <button
                    key={app.value}
                    type="button"
                    onClick={() => setPreferredApp(app.value)}
                    className={`text-sm px-4 py-2.5 rounded-lg border transition text-center ${
                      active
                        ? "bg-white text-black border-white font-medium"
                        : "border-gray-800 text-gray-300 hover:border-gray-600"
                    }`}
                  >
                    {app.label}
                  </button>
                );
              })}
            </div>
            <p className="text-xs text-gray-600 mt-2">
              I&apos;ll reach out on the app you select here.
            </p>
          </div>
        </>
      )}

      <div>
        <label className="block text-sm text-gray-400 mb-2">
          Message <span className="text-red-400">*</span>
        </label>
        <textarea
          required
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={
            isHire
              ? "Tell me about your project, budget, and timeline..."
              : "Tell me about your project..."
          }
          className="w-full rounded-lg bg-gray-900 border border-gray-800 px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-gray-600"
        />
      </div>

      {status === "error" && (
        <p className="text-sm text-red-400">{errorMessage}</p>
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