export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Converts a video URL (YouTube, Vimeo, Loom, Instagram, TikTok) into an
 * embeddable iframe URL. Returns null if the platform isn't recognized.
 */
export function getEmbedUrl(url: string): string | null {
  if (!url) return null;

  try {
    const u = new URL(url);
    const host = u.hostname.replace("www.", "");
    const path = u.pathname;

    // ================= YouTube =================
    if (host === "youtube.com" || host === "m.youtube.com") {
      const v = u.searchParams.get("v");
      if (v) return `https://www.youtube.com/embed/${v}`;

      if (path.startsWith("/shorts/")) {
        const id = path.replace("/shorts/", "").split("/")[0];
        if (id) return `https://www.youtube.com/embed/${id}`;
      }

      if (path.startsWith("/embed/")) {
        const id = path.replace("/embed/", "").split("/")[0];
        if (id) return `https://www.youtube.com/embed/${id}`;
      }

      if (path.startsWith("/live/")) {
        const id = path.replace("/live/", "").split("/")[0];
        if (id) return `https://www.youtube.com/embed/${id}`;
      }
    }

    if (host === "youtu.be") {
      const id = path.slice(1).split("/")[0];
      if (id) return `https://www.youtube.com/embed/${id}`;
    }

    // ================= Vimeo =================
    if (host === "vimeo.com") {
      const id = path.slice(1).split("/")[0];
      if (id && /^\d+$/.test(id)) {
        return `https://player.vimeo.com/video/${id}`;
      }
    }

    // ================= Loom =================
    if (host === "loom.com" && path.startsWith("/share/")) {
      const id = path.replace("/share/", "").split("/")[0];
      if (id) return `https://www.loom.com/embed/${id}`;
    }

    // ================= Instagram (Reels, Posts, IGTV) =================
    // Note: Instagram embeds only work for public content and are often
    // blocked by Meta. If it fails, the fallback button will show.
    if (host === "instagram.com") {
      const match = path.match(/^\/(reel|reels|p|tv)\/([^/]+)/);
      if (match) {
        const type = match[1] === "reels" ? "reel" : match[1];
        const id = match[2];
        return `https://www.instagram.com/${type}/${id}/embed`;
      }
    }

    // ================= TikTok =================
    // Note: TikTok embeds may be blocked in some regions.
    if (host === "tiktok.com") {
      const match = path.match(/\/video\/(\d+)/);
      if (match) return `https://www.tiktok.com/embed/v2/${match[1]}`;
    }

    return null;
  } catch {
    return null;
  }
}

/**
 * Returns the URL if it's a direct video file (mp4, webm, ogg, mov).
 * These need a <video> tag instead of an <iframe>.
 */
export function getDirectVideoUrl(url: string): string | null {
  if (!url) return null;
  try {
    const u = new URL(url);
    if (/\.(mp4|webm|ogg|mov)$/i.test(u.pathname)) return url;
    return null;
  } catch {
    return null;
  }
}