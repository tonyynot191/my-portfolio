export const metadata = {
  title: "Privacy Policy",
  description: "How Tony collects, uses, and protects your data.",
};

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-20">
      <h1 className="text-4xl font-bold text-white mb-2">Privacy Policy</h1>
      <p className="text-sm text-gray-500 mb-12">
        Last updated: {new Date().toLocaleDateString()}
      </p>

      <div className="space-y-8 text-gray-300 leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold text-white mb-3">
            What data I collect
          </h2>
          <p>
            This site collects the following information:
          </p>
          <ul className="list-disc list-inside mt-3 space-y-2 text-gray-400">
            <li>
              <strong className="text-gray-300">Contact form:</strong> your
              name, email, and message, so I can respond.
            </li>
            <li>
              <strong className="text-gray-300">Comments:</strong> your name,
              email (never displayed publicly), and comment content.
            </li>
            <li>
              <strong className="text-gray-300">Likes:</strong> an anonymous,
              randomly generated identifier stored in your browser — not
              linked to any personal information.
            </li>
            <li>
              <strong className="text-gray-300">Analytics:</strong> anonymized
              page-view data (no personally identifying information).
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">
            How I use your data
          </h2>
          <p>
            Your data is used solely to respond to your messages, display
            your comments on this site (if approved), and understand which
            pages are popular. Your email address is never displayed publicly
            and is never shared with third parties.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">
            Data storage
          </h2>
          <p>
            Data is stored securely with Supabase (Postgres database) and
            Resend (email delivery). Both providers are GDPR-compliant.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">
            Your rights
          </h2>
          <p>
            You can request deletion of any data you&apos;ve submitted by
            emailing{" "}
            <a
              href="mailto:adetony2006@gmail.com"
              className="text-blue-400 hover:text-blue-300 transition"
            >
              adetony2006@gmail.com
            </a>
            . Requests are handled within 30 days.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">Cookies</h2>
          <p>
            This site uses browser localStorage to remember whether
            you&apos;ve liked a project. No tracking cookies are set.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">Contact</h2>
          <p>
            For any privacy-related questions, contact me at{" "}
            <a
              href="mailto:adetony2006@gmail.com"
              className="text-blue-400 hover:text-blue-300 transition"
            >
              adetony2006@gmail.com
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
}