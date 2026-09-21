"use client";

import { useEffect, useState } from "react";

export function useVisitorId() {
  const [visitorId, setVisitorId] = useState<string | null>(null);

  useEffect(() => {
    let id = localStorage.getItem("visitor_id");
    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem("visitor_id", id);
    }
    setVisitorId(id);
  }, []);

  return visitorId;
}