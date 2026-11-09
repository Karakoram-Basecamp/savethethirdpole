import Icon from './Icon.jsx';
import { SOCIAL_LINKS } from '../data/site.js';
import styles from './SocialLinks.module.css';

/** SocialLinks — round glass icon buttons linking to each social profile. */
export default function SocialLinks({ size = 18 }) {
  return (
    <ul className={styles.list} aria-label="Social media">
      {SOCIAL_LINKS.map(({ label, icon, href }) => (
        <li key={label}>
          <a className={styles.link} href={href} target="_blank" rel="noopener noreferrer" aria-label={`${label} (opens in a new tab)`}>
            <Icon name={icon} size={size} />
          </a>
        </li>
      ))}
    </ul>
  );
}
