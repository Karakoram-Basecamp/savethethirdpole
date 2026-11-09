import { useEffect, useState } from 'react';
import { useParallax } from '../hooks/useParallax.js';
import styles from './Hero.module.css';

/** Time each slide stays on screen before cross-fading to the next. */
const SLIDE_MS = 7000;

/**
 * Hero — background photo(s) with parallax, dark overlay and centred text.
 *
 * With several `images`, the background becomes a slideshow: every photo
 * drifts slowly (a "Ken Burns" pan-and-zoom) and they cross-fade in turn.
 * The slideshow pauses while the browser tab is hidden and stays on the
 * first photo for visitors who prefer reduced motion.
 *
 * @param {'full'|'page'} [size='full'] `full` fills the viewport (home page);
 *        `page` is a shorter banner for inner pages.
 * @param {string} [image] A single background image URL (inner pages).
 * @param {{src:string, alt?:string, credit?:string, creditHref?:string}[]} [images]
 *        Slides for the home slideshow (see HERO_SLIDES in data/site.js).
 * @param {string} eyebrow Small label above the title.
 * @param {ReactNode} title
 * @param {ReactNode} subtitle
 * @param {ReactNode} children Call-to-action buttons.
 * @param {ReactNode} scrollCue Optional element rendered at the bottom (e.g. scroll button).
 * @param {{text:string, href:string}} [credit] Photo credit for a single `image`.
 * @param {string} [logo] Optional logo image shown above the eyebrow (home page).
 */
export default function Hero({ size = 'full', image, images, eyebrow, title, subtitle, children, scrollCue, credit, logo }) {
  const bgRef = useParallax(0.25);
  const slides = images?.length ? images : [{ src: image, credit: credit?.text, creditHref: credit?.href }];
  const [index, setIndex] = useState(0);

  // Advance the slideshow on a timer (only when there is more than one photo).
  useEffect(() => {
    if (slides.length < 2) return undefined;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return undefined;
    const id = setInterval(() => {
      if (!document.hidden) setIndex((i) => (i + 1) % slides.length);
    }, SLIDE_MS);
    return () => clearInterval(id);
  }, [slides.length]);

  const current = slides[index];

  return (
    <section className={`${styles.hero} ${styles[size]}`} aria-labelledby="hero-title">
      {/* Parallax layer holding the slides — decorative, hidden from screen readers */}
      <div ref={bgRef} className={styles.bg} aria-hidden="true">
        {slides.map((s, i) => (
          <div
            key={s.src}
            className={`${styles.slide} ${i === index ? styles.slideActive : ''}`}
            style={{ backgroundImage: `url(${s.src})` }}
          />
        ))}
      </div>
      <div className={styles.overlay} aria-hidden="true" />

      <div className={`container ${styles.content}`}>
        {logo && <img className={styles.logo} src={logo} alt="Save The Third Pole logo" width="96" height="96" />}
        {eyebrow && <span className={styles.eyebrow}>{eyebrow}</span>}
        <h1 id="hero-title" className={styles.title}>
          {title}
        </h1>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        {children && <div className={styles.actions}>{children}</div>}
      </div>

      {scrollCue}

      {/* Slide indicator — lets visitors jump to a photo */}
      {slides.length > 1 && (
        <div className={styles.dots} role="group" aria-label="Background photos">
          {slides.map((s, i) => (
            <button
              key={s.src}
              type="button"
              className={`${styles.dot} ${i === index ? styles.dotActive : ''}`}
              aria-label={`Show photo ${i + 1}: ${s.alt || 'background photo'}`}
              aria-pressed={i === index}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>
      )}

      {/* Credit for the photo currently on screen */}
      {current.credit &&
        (current.creditHref ? (
          <a key={index} className={styles.credit} href={current.creditHref} target="_blank" rel="noopener noreferrer">
            {current.credit}
          </a>
        ) : (
          <span key={index} className={styles.credit}>
            {current.credit}
          </span>
        ))}
    </section>
  );
}
