/**
 * Site-wide configuration.
 * Edit this file to change organisation details, navigation and social links
 * without touching any component code.
 */

/** Image helper — picsum.photos placeholders with fixed IDs so they stay stable.
 *  Replace with your own photography (e.g. /images/batura.jpg) before launch. */
export const img = (id, w = 1600, h = 1000) => `https://picsum.photos/id/${id}/${w}/${h}`;

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
