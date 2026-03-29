// src/utils/youtube.ts
export const getYouTubeEmbedUrl = (
  url: string | undefined | null,
): string | null => {
  // 1. Verificación de seguridad inmediata
  if (!url || typeof url !== "string") return null;

  try {
    const parsedUrl = new URL(url);

    // Verificamos que hostname exista antes de hacer el replace
    const hostname = parsedUrl.hostname || "";
    const host = hostname.replace(/^www\./, "");

    let videoId: string | null = null;

    if (host === "youtu.be") {
      videoId = parsedUrl.pathname.slice(1);
    } else if (host === "youtube.com" || host === "m.youtube.com") {
      if (parsedUrl.pathname === "/watch") {
        videoId = parsedUrl.searchParams.get("v");
      } else if (parsedUrl.pathname.startsWith("/embed/")) {
        videoId = parsedUrl.pathname.split("/")[2] ?? null;
      } else if (parsedUrl.pathname.startsWith("/shorts/")) {
        videoId = parsedUrl.pathname.split("/")[2] ?? null;
      }
    }

    if (!videoId || videoId.length !== 11) {
      return fallbackRegex(url);
    }

    return `https://www.youtube-nocookie.com/embed/${videoId}?enablejsapi=1`;
  } catch (e) {
    return fallbackRegex(url);
  }
};

function fallbackRegex(url: string): string | null {
  if (!url) return null;
  const regExp =
    /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|shorts\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  const videoId = match && match[2].length === 11 ? match[2] : null;

  return videoId
    ? `https://www.youtube-nocookie.com/embed/${videoId}?enablejsapi=1`
    : null;
}
