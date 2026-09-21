export const metadata = {
  title: "About | Tony",
  description: "Learn more about Tony, a Full-Stack Web Developer.",
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-20">
      <h1 className="text-4xl font-bold text-white mb-6">About Me</h1>
      <div className="space-y-6 text-gray-300 leading-relaxed">
        <p>
          I&apos;m Tony, a full-stack web developer focused on building fast,
          accessible, and modern web applications. I work primarily with
          Next.js, TypeScript, and Postgres, and I care deeply about the small
          details that make a product feel polished.
        </p>
        <p>
          I got into web development because I wanted to build things people
          could actually use — not just demos. Since then, I&apos;ve shipped
          projects ranging from admin dashboards to real-time collaborative
          tools.
        </p>
        <p>
          When I&apos;m not coding, I&apos;m usually learning something new,
          reading about design, or tinkering with side projects.
        </p>
      </div>

      <h2 className="text-2xl font-bold text-white mt-14 mb-6">Skills</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {[
          "TypeScript",
          "React",
          "Next.js",
          "Node.js",
          "Tailwind CSS",
          "PostgreSQL",
          "Supabase",
          "Git",
          "REST APIs",
        ].map((skill) => (
          <div
            key={skill}
            className="rounded-lg border border-gray-800 bg-gray-900/50 px-4 py-2 text-sm text-gray-300 text-center"
          >
            {skill}
          </div>
        ))}
      </div>
    </div>
  );
}