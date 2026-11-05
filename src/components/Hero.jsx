import { useParallax } from '../hooks/useParallax.js';
import styles from './Hero.module.css';

/**
 * Hero — background photograph with parallax, dark overlay and centred text.
 *
 * @param {'full'|'page'} [size='full'] `full` fills the viewport (home page);
 *        `page` is a shorter banner for inner pages.
 * @param {string} image   Background image URL.
 * @param {string} eyebrow Small label above the title.
 * @param {ReactNode} title
 * @param {ReactNode} subtitle
 * @param {ReactNode} children Call-to-action buttons.
 * @param {ReactNode} scrollCue Optional element rendered at the bottom (e.g. scroll button).
 */
export default function Hero({ size = 'full', image, eyebrow, title, subtitle, children, scrollCue }) {
  const bgRef = useParallax(0.25);

  return (
    <section className={`${styles.hero} ${styles[size]}`} aria-labelledby="hero-title">
      {/* Parallax layer — decorative, so the image has no alt text */}
      <div ref={bgRef} className={styles.bg} style={{ backgroundImage: `url(${image})` }} aria-hidden="true" />
      <div className={styles.overlay} aria-hidden="true" />

      <div className={`container ${styles.content}`}>
        {eyebrow && <span className={styles.eyebrow}>{eyebrow}</span>}
        <h1 id="hero-title" className={styles.title}>
          {title}
        </h1>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        {children && <div className={styles.actions}>{children}</div>}
      </div>

      {scrollCue}
    </section>
  );
}
