"use client";

import { useEffect, useState } from "react";

function generateUUID(): string {
  // Modern browsers on HTTPS or localhost
  if (
    typeof crypto !== "undefined" &&
    typeof crypto.randomUUID === "function"
  ) {
    return crypto.randomUUID();
  }

  // Fallback for plain HTTP (e.g. testing on your phone via LAN IP)
  if (typeof crypto !== "undefined" && crypto.getRandomValues) {
    const bytes = new Uint8Array(16);
    crypto.getRandomValues(bytes);
    bytes[6] = (bytes[6] & 0x0f) | 0x40; // version 4
    bytes[8] = (bytes[8] & 0x3f) | 0x80; // variant
    const hex = Array.from(bytes, (b) => b.toString(16).padStart(2, "0"));
    return (
      hex.slice(0, 4).join("") +
      "-" +
      hex.slice(4, 6).join("") +
      "-" +
      hex.slice(6, 8).join("") +
      "-" +
      hex.slice(8, 10).join("") +
      "-" +
      hex.slice(10, 16).join("")
    );
  }

  // Last-resort fallback (very old browsers)
  return (
    Date.now().toString(36) +
    Math.random().toString(36).slice(2) +
    Math.random().toString(36).slice(2)
  );
}

export function useVisitorId() {
  const [visitorId, setVisitorId] = useState<string | null>(null);

  useEffect(() => {
    let id = localStorage.getItem("visitor_id");
    if (!id) {
      id = generateUUID();
      localStorage.setItem("visitor_id", id);
    }
    setVisitorId(id);
  }, []);

  return visitorId;
}