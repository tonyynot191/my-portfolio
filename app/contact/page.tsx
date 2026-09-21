export const metadata = {
  title: "Contact | Tony",
  description: "Get in touch with Tony.",
};

export default function ContactPage() {
  return (
    <div className="max-w-xl mx-auto px-6 py-20">
      <h1 className="text-4xl font-bold text-white mb-3">Contact</h1>
      <p className="text-gray-400 mb-10">
        Have a project in mind, or just want to say hi? Send me a message.
      </p>

      <form className="space-y-5">
        <div>
          <label className="block text-sm text-gray-400 mb-2">Name</label>
          <input
            type="text"
            className="w-full rounded-lg bg-gray-900 border border-gray-800 px-4 py-3 text-white focus:outline-none focus:border-gray-600"
            placeholder="Your name"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-2">Email</label>
          <input
            type="email"
            className="w-full rounded-lg bg-gray-900 border border-gray-800 px-4 py-3 text-white focus:outline-none focus:border-gray-600"
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-2">Message</label>
          <textarea
            rows={5}
            className="w-full rounded-lg bg-gray-900 border border-gray-800 px-4 py-3 text-white focus:outline-none focus:border-gray-600"
            placeholder="Tell me about your project..."
          />
        </div>
        <button
          type="button"
          className="w-full bg-white text-black px-6 py-3 rounded-lg font-medium hover:bg-gray-200 transition"
        >
          Send Message
        </button>
        <p className="text-xs text-gray-500 text-center">
          The form isn&apos;t wired up yet — coming in a later phase.
        </p>
      </form>
    </div>
  );
}