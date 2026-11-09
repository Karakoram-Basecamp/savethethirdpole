import Icon from './Icon.jsx';
import styles from './EmbedFrame.module.css';

/**
 * EmbedFrame — responsive iframe for embedded pages (the Glacier Atlas map,
 * YouTube/Vimeo videos). In the static single-file preview build, where
 * iframes are blocked, it shows a card with a link instead.
 *
 * @param {string} src        URL to embed.
 * @param {string} title      Accessible title (required for iframes).
 * @param {string} [openHref] Link for the "open in new tab" button / fallback.
 * @param {string} [openLabel]
 * @param {string} [icon]     Icon for the preview fallback.
 * @param {boolean} [active=true] When false the iframe is not loaded yet
 *        (used by the carousel so off-screen videos don't load or keep playing).
 */
export default function EmbedFrame({ src, title, openHref, openLabel = 'Open in new tab', icon = 'mountain', active = true, className = '' }) {
  const isStaticPreview = import.meta.env.VITE_STATIC_PREVIEW === 'true';

  return (
    <div className={`${styles.wrap} ${className}`}>
      {isStaticPreview || !src ? (
        <div className={styles.fallback}>
          <span className={styles.badge}>
            <Icon name={icon} size={28} />
          </span>
          <p className={styles.name}>{title}</p>
          <p className={styles.note}>{src ? 'This loads live on the published site.' : 'Add a link in src/data/site.js to show it here.'}</p>
        </div>
      ) : (
        active && (
          <iframe
            className={styles.frame}
            src={src}
            title={title}
            loading="lazy"
            allow="fullscreen; autoplay; encrypted-media; picture-in-picture; accelerometer; gyroscope"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
          />
        )
      )}
      {openHref && (
        <a className={`btn btn--glass ${styles.open}`} href={openHref} target="_blank" rel="noopener noreferrer">
          {openLabel} <Icon name="arrow-right" size={15} />
        </a>
      )}
    </div>
  );
}
