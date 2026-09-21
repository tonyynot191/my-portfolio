"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const links = [
    { href: "/projects", label: "Projects" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-950/80 backdrop-blur-md border-b border-gray-800">
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="text-xl font-bold text-white hover:text-gray-300 transition"
          onClick={() => setOpen(false)}
        >
          Tony.dev
        </Link>

        {/* Desktop links — hidden on mobile */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-400">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-white transition"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/hire"
            className="bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-200 transition"
          >
            Hire Me
          </Link>
        </div>

        {/* Mobile menu button — hidden on desktop */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? (
            // X icon
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            // Hamburger icon
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu dropdown */}
      {/* Mobile menu dropdown */}
{open && (
  <div className="md:hidden absolute top-16 left-0 right-0 border-t border-gray-800 bg-gray-950 px-6 py-4 flex flex-col gap-4 shadow-lg">
    {links.map((link) => (
      <Link
        key={link.href}
        href={link.href}
        className="text-gray-300 hover:text-white transition py-2"
        onClick={() => setOpen(false)}
      >
        {link.label}
      </Link>
    ))}
    <Link
      href="/hire"
      className="bg-white text-black px-4 py-2 rounded-lg font-medium text-center hover:bg-gray-200 transition"
      onClick={() => setOpen(false)}
    >
      Hire Me
    </Link>
  </div>
)}
    </nav>
  );
}