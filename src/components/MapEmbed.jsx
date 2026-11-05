import Icon from './Icon.jsx';
import styles from './MapEmbed.module.css';

/**
 * MapEmbed — Google Maps iframe (no API key needed for the basic embed).
 * In the static single-file preview build (VITE_STATIC_PREVIEW), iframes are
 * blocked by the host, so a styled card with an "Open in Google Maps" link is
 * rendered instead.
 */
export default function MapEmbed({ query, title = 'Our location' }) {
  const q = encodeURIComponent(query);
  const embedSrc = `https://www.google.com/maps?q=${q}&z=13&output=embed`;
  const linkHref = `https://www.google.com/maps/search/?api=1&query=${q}`;
  const isStaticPreview = import.meta.env.VITE_STATIC_PREVIEW === 'true';

  return (
    <div className={styles.wrap}>
      {isStaticPreview ? (
        <div className={styles.fallback}>
          <span className={styles.pin}>
            <Icon name="pin" size={28} />
          </span>
          <p className={styles.place}>{query}</p>
          <p className={styles.note}>The interactive Google Map loads here on the live site.</p>
        </div>
      ) : (
        <iframe
          className={styles.frame}
          title={title}
          src={embedSrc}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      )}
      <a className={`btn btn--glass ${styles.open}`} href={linkHref} target="_blank" rel="noopener noreferrer">
        <Icon name="pin" size={16} /> Open in Google Maps
      </a>
    </div>
  );
}
