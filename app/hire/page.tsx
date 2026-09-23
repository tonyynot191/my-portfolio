import Link from "next/link";

export const metadata = {
  title: "Hire Me",
  description: "Work with Tony on your next web project.",
};

const CALCOM_USERNAME = "tony"; // ← replace with your Cal.com username

export default function HirePage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-20">
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-green-500/30 bg-green-500/10 text-green-400 text-xs font-medium mb-6">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
          </span>
          Available for new projects
        </div>
        <h1 className="text-4xl font-bold text-white mb-4">Hire Me</h1>
        <p className="text-lg text-gray-400">
          I&apos;m available for freelance projects and full-time roles.
          Here&apos;s how I can help.
        </p>
      </div>

      {/* Services */}
      <div className="space-y-4 mb-12">
        {[
          {
            title: "Full-Stack Web Apps",
            desc: "End-to-end builds — from database design to polished UI.",
          },
          {
            title: "Frontend Development",
            desc: "Responsive, accessible interfaces built with React and Next.js.",
          },
          {
            title: "Backend & APIs",
            desc: "REST APIs, authentication, database schemas, and integrations.",
          },
        ].map((service) => (
          <div
            key={service.title}
            className="rounded-xl border border-gray-800 bg-gray-900/40 p-6"
          >
            <h2 className="text-lg font-semibold text-white mb-2">
              {service.title}
            </h2>
            <p className="text-gray-400 text-sm">{service.desc}</p>
          </div>
        ))}
      </div>

      {/* Booking */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-3">
          Book a call
        </h2>
        <p className="text-gray-400 text-sm mb-6">
          Pick a time that works for you — 30 minutes, no obligation.
        </p>
        <div className="rounded-xl border border-gray-800 overflow-hidden bg-gray-900/40">
          <iframe
            src={`https://cal.com/${CALCOM_USERNAME}?embed=true&theme=dark`}
            width="100%"
            height="600"
            frameBorder="0"
            title="Book a call"
            className="w-full"
          />
        </div>
        <p className="text-xs text-gray-600 mt-3">
          Prefer email? Use the contact form or email me directly below.
        </p>
      </section>

      {/* Contact details */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-6">
          Or reach out directly
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <a
            href="mailto:adetony2006@gmail.com"
            className="rounded-xl border border-gray-800 bg-gray-900/40 p-5 hover:border-gray-600 transition group"
          >
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
              Email
            </p>
            <p className="text-white group-hover:text-gray-300 transition truncate">
              adetony2006@gmail.com
            </p>
          </a>
          <div className="rounded-xl border border-gray-800 bg-gray-900/40 p-5">
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
              Location
            </p>
            <p className="text-white">Nigeria · Remote worldwide</p>
          </div>
          <div className="rounded-xl border border-gray-800 bg-gray-900/40 p-5">
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
              Response time
            </p>
            <p className="text-white">Within 24 hours</p>
          </div>
          <a
            href="/resume.pdf"
            download
            className="rounded-xl border border-gray-800 bg-gray-900/40 p-5 hover:border-gray-600 transition group"
          >
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
              Resume
            </p>
            <p className="text-white group-hover:text-gray-300 transition">
              Download PDF →
            </p>
          </a>
        </div>
      </section>

      {/* CTA */}
      <div className="rounded-xl border border-gray-800 bg-gradient-to-br from-purple-950/30 via-gray-900/40 to-blue-950/30 p-8 text-center">
        <h3 className="text-xl font-semibold text-white mb-2">
          Ready to start?
        </h3>
        <p className="text-gray-400 mb-6 text-sm">
          Tell me about your project and I&apos;ll get back to you quickly.
        </p>
        <Link
          href="/contact"
          className="inline-block bg-white text-black px-6 py-3 rounded-lg font-medium hover:bg-gray-200 transition"
        >
          Send a Message
        </Link>
      </div>
    </div>
  );
}