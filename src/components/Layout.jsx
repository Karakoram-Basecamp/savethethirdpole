import { Outlet } from 'react-router-dom';
import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';
import ScrollManager from './ScrollManager.jsx';
import BackToTop from './BackToTop.jsx';
import styles from './Layout.module.css';

/**
 * Layout — shared shell for every page: skip link, ambient background,
 * fixed navbar, the routed page (<Outlet />), footer and back-to-top button.
 */
export default function Layout() {
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      {/* Soft blurred colour fields that give the glass panels something to frost */}
      <div className={styles.ambient} aria-hidden="true">
        <span className={styles.blob1} />
        <span className={styles.blob2} />
        <span className={styles.blob3} />
      </div>
      <ScrollManager />
      <Navbar />
      <main id="main" tabIndex={-1} className={styles.main}>
        <Outlet />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
