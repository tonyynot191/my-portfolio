import Link from "next/link";

export const metadata = {
  title: "Hire Me | Tony",
  description: "Work with Tony on your next web project.",
};

export default function HirePage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-20">
      <h1 className="text-4xl font-bold text-white mb-6">Hire Me</h1>
      <p className="text-lg text-gray-400 mb-10">
        I&apos;m available for freelance projects and full-time roles. Here&apos;s
        what I can help with.
      </p>

      <div className="space-y-6 mb-12">
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
            className="rounded-xl border border-gray-800 bg-gray-900/50 p-6"
          >
            <h2 className="text-lg font-semibold text-white mb-2">
              {service.title}
            </h2>
            <p className="text-gray-400 text-sm">{service.desc}</p>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-8 text-center">
        <h3 className="text-xl font-semibold text-white mb-2">
          Let&apos;s work together
        </h3>
        <p className="text-gray-400 mb-6">
          I typically respond within 24 hours.
        </p>
        <Link
          href="/contact"
          className="inline-block bg-white text-black px-6 py-3 rounded-lg font-medium hover:bg-gray-200 transition"
        >
          Get in Touch
        </Link>
      </div>
    </div>
  );
}