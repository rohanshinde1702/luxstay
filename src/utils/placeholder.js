/**
 * ThemeForest Placeholder Image Utility
 * Generates neutral gray placeholders with exact pixel dimension labels
 * matching Envato ThemeForest submission standards.
 */

export function getPlaceholder(width = 800, height = 600, label) {
  const text = label || `${width} × ${height}`;
  const fontSize = Math.max(12, Math.min(Math.round(Math.min(width, height) * 0.08), 64));
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <rect width="100%" height="100%" fill="#D1D5DB"/>
  <text x="50%" y="50%" dominant-baseline="central" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="${fontSize}" font-weight="500" fill="#262626">${text}</text>
</svg>`).trim()}`;
}

export const PLACEHOLDERS = {
  hero: "/images/placeholders/1920x1080.svg",
  heroWide: "/images/placeholders/1920x800.svg",
  banner: "/images/placeholders/1900x500.svg",
  bannerMid: "/images/placeholders/1905x680.svg",
  card: "/images/placeholders/800x600.svg",
  card1610: "/images/placeholders/800x530.svg",
  portrait: "/images/placeholders/600x800.svg",
  square: "/images/placeholders/600x600.svg",
  team: "/images/placeholders/500x600.svg",
  avatar: "/images/placeholders/100x100.svg",
  split: "/images/placeholders/750x1000.svg",
  large: "/images/placeholders/1200x800.svg",
};

export const VIDEO_PLACEHOLDERS = {
  hero: "/images/placeholders/1905x680.svg",
  cta: "/images/placeholders/1900x500.svg",
  modal: "/images/placeholders/1920x1080.svg",
  card: "/images/placeholders/1200x800.svg",
  stream: "/images/placeholders/1920x1080.svg",
};
