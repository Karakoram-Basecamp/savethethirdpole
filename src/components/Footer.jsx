import SocialLinks from './SocialLinks.jsx';
import { ORG } from '../data/site.js';
import styles from './Footer.module.css';

/** Footer — minimal single line: copyright on one side, social links on the other. */
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <p className={styles.copy}>
          © {year} {ORG.name} · Registered non-profit association, {ORG.city}
        </p>
        <SocialLinks size={16} />
      </div>
    </footer>
  );
}
