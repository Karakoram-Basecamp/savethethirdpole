import { useInView } from '../hooks/useInView.js';
import { useCountUp } from '../hooks/useCountUp.js';
import Reveal from './Reveal.jsx';
import styles from './StatsCounter.module.css';

/** One animated figure. Counting starts when the stat grid scrolls into view. */
function Stat({ value, suffix, label, start }) {
  const current = useCountUp(value, start);
  return (
    <div className={styles.stat}>
      <p className={styles.number}>
        {/* Screen readers get the final value straight away */}
        <span aria-hidden="true">
          {current.toLocaleString('en-US')}
          {suffix}
        </span>
        <span className="visually-hidden">
          {value.toLocaleString('en-US')}
          {suffix}
        </span>
      </p>
      <p className={styles.label}>{label}</p>
    </div>
  );
}

/**
 * StatsCounter — grid of numbers that count up on scroll.
 * @param {{value:number, suffix:string, label:string}[]} stats
 * @param {string} [source] Citation shown under the grid.
 */
export default function StatsCounter({ stats, source }) {
  const [ref, inView] = useInView({ threshold: 0.3 });

  return (
    <div ref={ref}>
      <div className={styles.grid}>
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 120} className={`glass ${styles.card}`}>
            <Stat {...s} start={inView} />
          </Reveal>
        ))}
      </div>
      {source && <p className={styles.source}>Source: {source}</p>}
    </div>
  );
}
