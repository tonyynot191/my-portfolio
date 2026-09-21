export default function Footer() {
  return (
    <footer className="border-t border-gray-800 bg-gray-950 py-8 text-center text-sm text-gray-500">
      <div className="max-w-5xl mx-auto px-6 flex flex-col items-center gap-4">
        <div className="flex gap-6">
          <a href="https://github.com" target="_blank" className="hover:text-white transition">GitHub</a>
          <a href="https://linkedin.com" target="_blank" className="hover:text-white transition">LinkedIn</a>
          <a href="https://x.com" target="_blank" className="hover:text-white transition">X (Twitter)</a>
        </div>
        <p>© {new Date().getFullYear()} Tony. All rights reserved.</p>
      </div>
    </footer>
  );
}