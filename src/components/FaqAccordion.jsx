import { useId, useState } from 'react';
import Icon from './Icon.jsx';
import Reveal from './Reveal.jsx';
import styles from './FaqAccordion.module.css';

/**
 * FaqAccordion — one panel open at a time, keyboard accessible.
 * Panels animate height with the `grid-template-rows: 0fr → 1fr` technique,
 * which works without measuring DOM heights in JS.
 */
export default function FaqAccordion({ items }) {
  const [openIndex, setOpenIndex] = useState(0);
  const baseId = useId();

  return (
    <div className={styles.list}>
      {items.map((item, i) => {
        const open = openIndex === i;
        const btnId = `${baseId}-q${i}`;
        const panelId = `${baseId}-a${i}`;
        return (
          <Reveal key={item.q} delay={i * 80} className={`glass ${styles.item} ${open ? styles.open : ''}`}>
            <h3 className={styles.heading}>
              <button
                id={btnId}
                type="button"
                className={styles.trigger}
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setOpenIndex(open ? -1 : i)}
              >
                <span>{item.q}</span>
                <span className={styles.icon} aria-hidden="true">
                  <Icon name="chevron" size={18} />
                </span>
              </button>
            </h3>
            <div id={panelId} role="region" aria-labelledby={btnId} className={styles.panel}>
              <div className={styles.panelInner}>
                <p>{item.a}</p>
              </div>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}
