import { useEffect, useState } from 'react';
import Icon from './Icon.jsx';
import styles from './BackToTop.module.css';

/** BackToTop — floating button that smooth-scrolls to the top after 600px. */
export default function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <button
      type="button"
      className={`${styles.btn} ${show ? styles.show : ''}`}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
      tabIndex={show ? 0 : -1}
    >
      <Icon name="arrow-up" size={18} />
    </button>
  );
}
