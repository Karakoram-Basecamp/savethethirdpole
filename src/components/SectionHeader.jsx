import Reveal from './Reveal.jsx';
import styles from './SectionHeader.module.css';

/**
 * SectionHeader — consistent eyebrow + heading + intro used at the top of
 * every section. `align="center"` centres it for full-width sections.
 */
export default function SectionHeader({ eyebrow, title, intro, align = 'left', id }) {
  return (
    <Reveal as="header" className={`${styles.header} ${align === 'center' ? styles.center : ''}`}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2 id={id} className={styles.title}>
        {title}
      </h2>
      {intro && <p className="lead">{intro}</p>}
    </Reveal>
  );
}
