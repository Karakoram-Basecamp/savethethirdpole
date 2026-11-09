import { useParallax } from '../hooks/useParallax.js';
import Reveal from './Reveal.jsx';
import styles from './ParallaxBand.module.css';

/**
 * ParallaxBand — a full-width photographic strip with a slower-moving
 * background and a frosted quote/message panel on top.
 */
export default function ParallaxBand({ image, children }) {
  const bgRef = useParallax(0.35);

  return (
    <section className={styles.band}>
      <div ref={bgRef} className={styles.bg} style={{ backgroundImage: `url(${image})` }} aria-hidden="true" />
      <div className="container">
        <Reveal className={styles.panel}>{children}</Reveal>
      </div>
    </section>
  );
}
