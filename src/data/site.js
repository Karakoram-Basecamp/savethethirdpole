/**
 * Site-wide configuration.
 * Edit this file to change organisation details, navigation and social links
 * without touching any component code.
 */

/** Image helper — picsum.photos placeholders with fixed IDs so they stay stable.
 *  Replace with your own photography (e.g. /images/batura.jpg) before launch. */
export const img = (id, w = 1600, h = 1000) => `https://picsum.photos/id/${id}/${w}/${h}`;

/** Resolves a file in /public against the deploy base path
 *  (e.g. "/save-the-third-pole/" on GitHub Pages project sites). */
export const asset = (path) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;

/** Logo shown in the navbar and used as favicon. Replace public/logo.svg
 *  (or point this at public/logo.png) to use the official logo. */
export const LOGO_SRC = asset('logo.png');

/**
 * ── HOME BACKGROUND SLIDESHOW ───────────────────────────────────────────────
 * The home page background slowly drifts and cross-fades between these
 * photos (about 7 seconds each). Add as many as you like.
 *
 * TO ADD A PHOTO:
 *   1. Save it in  public/images/hero/  (landscape, ~2400 px wide, under 600 KB).
 *   2. Copy one block below and change the file name, alt text and credit:
 *        {
 *          src: asset('images/hero/batura-glacier.jpg'),
 *          alt: 'Batura Glacier in Upper Hunza',
 *          credit: 'Batura Glacier · Photo: Your Name',
 *          creditHref: '',          // optional link for the credit
 *        },
 *   3. Save, commit and push; the site updates in about a minute.
 *
 * TO REMOVE A PHOTO: delete its block. Order here = order on screen.
 * Credits are shown in the corner; keep them for any Creative Commons photo.
 */
export const HERO_SLIDES = [
  {
    // Rakaposhi (7,788 m) — "Rakaposhi Mountain, GB.jpg" by Thealimir, CC BY-SA, via Wikimedia Commons.
    // To self-host: download it from the Commons page, save as public/images/hero/rakaposhi.jpg
    // and change src to asset('images/hero/rakaposhi.jpg').
    src: 'https://commons.wikimedia.org/wiki/Special:FilePath/Rakaposhi_Mountain,_GB.jpg?width=2400',
    alt: 'Rakaposhi, the snow-covered 7,788 m peak above the Nagar and Hunza valleys',
    credit: 'Rakaposhi · Photo: Thealimir, CC BY-SA, Wikimedia Commons',
    creditHref: 'https://commons.wikimedia.org/wiki/File:Rakaposhi_Mountain,_GB.jpg',
  },
  {
    // PLACEHOLDER — replace with your own glacier photo, e.g. asset('images/hero/passu-glacier.jpg')
    src: img(1036, 2400, 1500),
    alt: 'Snow-covered mountains in winter (placeholder)',
    credit: 'Placeholder photo · replace in src/data/site.js',
    creditHref: '',
  },
];

/** First slide, kept for code that expects a single hero photo. */
export const HERO_PHOTO = HERO_SLIDES[0];

/**
 * ── MEDIA LINKS ─────────────────────────────────────────────────────────────
 * Change the links here; the Dashboard and the home-page slider update.
 *
 * glacierMap.url  The Glacier Atlas web map (embedded live).
 * video.url       Paste a YouTube or Vimeo link, e.g.
 *                   'https://www.youtube.com/watch?v=XXXXXXXXXXX'
 *                   'https://youtu.be/XXXXXXXXXXX'
 *                   'https://vimeo.com/123456789'
 *                 or a video file you put in public/videos/, e.g.
 *                   asset('videos/glaciers.mp4')
 *                 Leave it '' and the video slide is simply hidden.
 */
export const MEDIA = {
  glacierMap: {
    url: 'https://karakoram-basecamp.github.io/Glacier-Web-Map/',
    title: 'Glacier Atlas: the ten largest glaciers of the Third Pole',
    caption: 'Explore Baltoro, Biafo, Hispar and seven more glaciers in 3D, using outlines from the Randolph Glacier Inventory.',
  },
  video: {
    url: '', // ← paste your video link here
    title: 'Save The Third Pole: why the glaciers matter',
    caption: 'Our short film from the Karakoram.',
    poster: '', // optional cover image for .mp4 files, e.g. asset('videos/poster.jpg')
  },
};

/** Turns any YouTube/Vimeo link into its embeddable URL. Returns null for
 *  direct video files (.mp4/.webm), which are played with <video> instead. */
export function toEmbedUrl(url) {
  if (!url || /\.(mp4|webm|mov)(\?|$)/i.test(url)) return null;
  const yt = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/|live\/))([\w-]{11})/);
  if (yt) return `https://www.youtube-nocookie.com/embed/${yt[1]}?rel=0`;
  const vimeo = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (vimeo) return `https://player.vimeo.com/video/${vimeo[1]}`;
  return url; // already an embed URL
}

export const ORG = {
  name: 'Save The Third Pole',
  legalName: 'SAVE THE THIRD POLE – Verein zum Schutz des Dritten Pols',
  tagline: 'Protecting the glaciers of the Hindu Kush–Karakoram–Himalaya',
  // TODO: replace with the association's real contact details before launch.
  email: 'info@savethethirdpole.org',
  city: 'Salzburg, Austria',
  fieldBase: 'Hunza Valley, Gilgit-Baltistan',
  founded: 2026,
  mapQuery: 'Salzburg, Austria',
};

/**
 * Primary navigation. `hash` scrolls smoothly to a section on the target page
 * (the Team section lives on the Vision page).
 */
export const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Vision', to: '/vision' },
  { label: 'Team', to: '/vision', hash: 'team' },
  { label: 'Dashboard', to: '/dashboard' },
  { label: 'Blog', to: '/blog' },
  { label: 'Contact', to: '/contact' },
];

/** Social profiles — replace the generic platform URLs with your own handles. */
export const SOCIAL_LINKS = [
  { label: 'Instagram', icon: 'instagram', href: 'https://www.instagram.com/' },
  { label: 'Facebook', icon: 'facebook', href: 'https://www.facebook.com/' },
  { label: 'YouTube', icon: 'youtube', href: 'https://www.youtube.com/' },
  { label: 'LinkedIn', icon: 'linkedin', href: 'https://www.linkedin.com/' },
  { label: 'X', icon: 'x', href: 'https://x.com/' },
];
