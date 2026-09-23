export const metadata = {
  title: "Terms of Service",
  description: "Terms for using Tony's portfolio site.",
};

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-20">
      <h1 className="text-4xl font-bold text-white mb-2">Terms of Service</h1>
      <p className="text-sm text-gray-500 mb-12">
        Last updated: {new Date().toLocaleDateString()}
      </p>

      <div className="space-y-8 text-gray-300 leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold text-white mb-3">
            Acceptance of terms
          </h2>
          <p>
            By using this website, you agree to these terms. If you do not
            agree, please do not use the site.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">
            User-generated content
          </h2>
          <p>
            You may submit comments on projects. By submitting content, you
            confirm that:
          </p>
          <ul className="list-disc list-inside mt-3 space-y-2 text-gray-400">
            <li>You own the content or have the right to submit it.</li>
            <li>
              The content is not defamatory, abusive, spam, or illegal.
            </li>
            <li>
              The content does not contain viruses or malicious code.
            </li>
          </ul>
          <p className="mt-3">
            All comments are moderated. I reserve the right to reject or
            remove any comment for any reason.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">
            Intellectual property
          </h2>
          <p>
            All original content on this site — including text, design, and
            code — is my property unless otherwise credited. You may not copy
            or redistribute it without permission.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">
            Limitation of liability
          </h2>
          <p>
            This site is provided &ldquo;as is&rdquo; without warranties of
            any kind. I am not liable for any damages arising from your use
            of the site.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">
            Changes to these terms
          </h2>
          <p>
            I may update these terms at any time. Continued use of the site
            constitutes acceptance of the latest version.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">Contact</h2>
          <p>
            Questions? Email{" "}
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