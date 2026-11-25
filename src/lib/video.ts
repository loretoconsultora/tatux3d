// Turns a video link (YouTube, YouTube Shorts, Instagram reel/post or a direct
// .mp4/.webm file) into something we can render.

export type VideoSource =
  | { kind: "youtube"; id: string; embedUrl: string }
  | { kind: "instagram"; embedUrl: string }
  | { kind: "file"; src: string }
  | { kind: "none" };

export function parseVideoUrl(url: string | undefined | null): VideoSource {
  const value = (url ?? "").trim();
  if (!value) return { kind: "none" };

  if (/\.(mp4|webm|mov)(\?.*)?$/i.test(value)) return { kind: "file", src: value };

  const yt = value.match(
    /(?:youtube\.com\/(?:watch\?(?:.*&)?v=|shorts\/|embed\/|live\/)|youtu\.be\/)([A-Za-z0-9_-]{6,})/,
  );
  if (yt) return { kind: "youtube", id: yt[1], embedUrl: `https://www.youtube.com/embed/${yt[1]}` };

  const ig = value.match(/instagram\.com\/(?:[^/]+\/)?(reel|reels|p|tv)\/([A-Za-z0-9_-]+)/);
  if (ig) {
    const type = ig[1] === "reels" ? "reel" : ig[1];
    return { kind: "instagram", embedUrl: `https://www.instagram.com/${type}/${ig[2]}/embed` };
  }

  return { kind: "none" };
}
