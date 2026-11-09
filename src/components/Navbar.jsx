import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from './Icon.jsx';
import { LOGO_SRC, NAV_LINKS, ORG } from '../data/site.js';
import styles from './Navbar.module.css';

/**
 * Navbar — fixed top navigation.
 *  - Transparent over the hero, turns to frosted glass once the page scrolls.
 *  - Below 960px the links collapse into an accessible hamburger menu
 *    (Escape closes it, body scroll is locked while open).
 *  - Links with a `hash` smooth-scroll to a section (see ScrollManager).
 */
export default function Navbar() {
  const { pathname, hash } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  // Switch to the solid glass style after a small scroll distance.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the mobile menu whenever the route changes.
  useEffect(() => setOpen(false), [pathname, hash]);

  // Lock body scroll + listen for Escape while the menu is open.
  useEffect(() => {
    document.body.classList.toggle('no-scroll', open);
    if (!open) return undefined;
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  /** A link is active when both the path and (optional) hash match. */
  const isActive = (link) => {
    if (link.hash) return pathname === link.to && hash === `#${link.hash}`;
    if (link.to === '/vision') return pathname === '/vision' && hash !== '#team';
    return pathname === link.to;
  };

  const solid = scrolled || open;

  return (
    <header className={`${styles.nav} ${solid ? styles.solid : ''}`}>
      <nav className={`container ${styles.inner}`} aria-label="Main">
        <Link to="/" className={styles.brand} aria-label={`${ORG.name} — home`}>
          <img className={styles.mark} src={LOGO_SRC} alt="" width="40" height="40" />
          <span className={styles.brandText}>
            Save The <strong>Third Pole</strong>
          </span>
        </Link>

        {/* Hamburger toggle (mobile/tablet only) */}
        <button
          type="button"
          className={styles.toggle}
          aria-expanded={open}
          aria-controls="primary-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          <span className={`${styles.burger} ${open ? styles.burgerOpen : ''}`} aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
        </button>

        <div id="primary-menu" className={`${styles.menu} ${open ? styles.menuOpen : ''}`}>
          <ul className={styles.links}>
            {NAV_LINKS.map((link, i) => (
              <li key={link.label} style={{ '--i': i }}>
                <Link
                  to={{ pathname: link.to, hash: link.hash ? `#${link.hash}` : '' }}
                  className={`${styles.link} ${isActive(link) ? styles.active : ''}`}
                  aria-current={isActive(link) ? 'page' : undefined}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link to={{ pathname: '/contact', hash: '#donate' }} className={`btn btn--primary ${styles.cta}`}>
            <Icon name="heart" size={16} /> Donate
          </Link>
        </div>
      </nav>
    </header>
  );
}
