/**
 * Icon — a small inline-SVG icon set (no external icon font needed).
 * Icons inherit `currentColor`, so they follow the surrounding text colour.
 *
 * Usage: <Icon name="arrow-right" size={18} />
 */

const PATHS = {
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="M6 6l12 12M18 6L6 18" />,
  'arrow-right': <path d="M5 12h14M13 6l6 6-6 6" />,
  'arrow-left': <path d="M19 12H5M11 6l-6 6 6 6" />,
  'arrow-up': <path d="M12 19V5M6 11l6-6 6 6" />,
  chevron: <path d="M6 9l6 6 6-6" />,
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  check: <path d="M5 12.5l4.5 4.5L19 7" />,
  mountain: <path d="M3 20l6.5-11 4 6.5 2.5-4L21 20H3zM9.5 9l1.8 3" />,
  book: (
    <>
      <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5v-15z" />
      <path d="M4 20.5A2.5 2.5 0 0 1 6.5 18H20v3H6.5" />
    </>
  ),
  shield: <path d="M12 3l8 3v6c0 4.5-3.4 8.3-8 9-4.6-.7-8-4.5-8-9V6l8-3zM8.5 12l2.5 2.5 4.5-5" />,
  megaphone: (
    <>
      <path d="M3 10v4a1 1 0 0 0 1 1h3l8 4V5L7 9H4a1 1 0 0 0-1 1z" />
      <path d="M19 9a4 4 0 0 1 0 6" />
    </>
  ),
  heart: <path d="M12 20s-7.5-4.6-9-9.4C2 7 4.4 4 7.6 4c1.9 0 3.4 1 4.4 2.5C13 5 14.5 4 16.4 4 19.6 4 22 7 21 10.6 19.5 15.4 12 20 12 20z" />,
  users: (
    <>
      <circle cx="9" cy="8" r="3.5" />
      <path d="M2.5 20a6.5 6.5 0 0 1 13 0" />
      <path d="M16 4.5a3.5 3.5 0 0 1 0 7M18 14.2a6.5 6.5 0 0 1 3.5 5.8" />
    </>
  ),
  trend: <path d="M3 17l6-6 4 4 8-8M15 7h6v6" />,
  // Social icons (simplified, monochrome)
  instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
    </>
  ),
  facebook: <path d="M14 8h3V4h-3a4 4 0 0 0-4 4v2H7v4h3v7h4v-7h3l1-4h-4V8.5a.5.5 0 0 1 .5-.5z" />,
  youtube: (
    <>
      <rect x="2.5" y="5.5" width="19" height="13" rx="4" />
      <path d="M10 9.2v5.6l5-2.8-5-2.8z" fill="currentColor" />
    </>
  ),
  linkedin: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <path d="M7.5 10v6.5M7.5 7.3v.2M11 16.5V10m0 3c0-1.7 1-3 2.6-3S16.5 11 16.5 13v3.5" />
    </>
  ),
  x: <path d="M4 4l16 16M20 4L4 20" />,
};

export default function Icon({ name, size = 20, strokeWidth = 1.8, className, title }) {
  const content = PATHS[name];
  if (!content) return null;

  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      // Decorative by default; pass `title` to make it meaningful to screen readers.
      aria-hidden={title ? undefined : true}
      role={title ? 'img' : undefined}
      focusable="false"
    >
      {title && <title>{title}</title>}
      {content}
    </svg>
  );
}
