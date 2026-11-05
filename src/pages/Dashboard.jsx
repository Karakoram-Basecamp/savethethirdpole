import Hero from '../components/Hero.jsx';
import Reveal from '../components/Reveal.jsx';
import SectionHeader from '../components/SectionHeader.jsx';
import AreaChart from '../components/AreaChart.jsx';
import Icon from '../components/Icon.jsx';
import { useInView } from '../hooks/useInView.js';
import { useCountUp } from '../hooks/useCountUp.js';
import { img } from '../data/site.js';
import { DASHBOARD_KPIS, FUND_ALLOCATION, GLACIER_WATCH, MONTHLY_REACH } from '../data/content.js';
import styles from './Dashboard.module.css';

/** Maps a glacier status to a pill colour class. */
const STATUS_CLASS = {
  Retreating: styles.statusWarn,
  'Surge watch': styles.statusAlert,
  Stable: styles.statusGood,
};

/** KPI tile with its own count-up animation. */
function Kpi({ label, value, delta, start }) {
  const n = useCountUp(value, start, 1500);
  return (
    <div className={styles.kpi}>
      <p className={styles.kpiLabel}>{label}</p>
      <p className={styles.kpiValue}>{n.toLocaleString('en-US')}</p>
      <p className={styles.kpiDelta}>
        <Icon name="trend" size={14} /> {delta}
      </p>
    </div>
  );
}

/** Horizontal bar list — fills animate when scrolled into view. */
function Allocation({ items }) {
  const [ref, inView] = useInView({ threshold: 0.3 });
  return (
    <ul ref={ref} className={styles.bars}>
      {items.map((item, i) => (
        <li key={item.label}>
          <div className={styles.barHead}>
            <span>{item.label}</span>
            <strong>{item.value}%</strong>
          </div>
          <div className={styles.barTrack}>
            <span
              className={styles.barFill}
              style={{ width: inView ? `${item.value}%` : 0, transitionDelay: `${i * 110}ms` }}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}

/**
 * Dashboard page — a transparent view of the association's activity.
 * All figures come from DASHBOARD_* in data/content.js (currently sample data).
 */
export default function Dashboard() {
  const [kpiRef, kpiInView] = useInView({ threshold: 0.3 });

  return (
    <>
      <Hero
        size="page"
        image={img(1044, 2000, 1200)}
        eyebrow="Impact dashboard"
        title="Our work, in the open"
        subtitle="What we monitored, who we reached and where every euro went this year."
      />

      <section className="section" aria-labelledby="kpi-title">
        <div className="container">
          <div className={styles.head}>
            <SectionHeader id="kpi-title" eyebrow="2026 at a glance" title="Key figures" />
            <Reveal>
              <span className={styles.sample}>
                <Icon name="clock" size={14} /> Sample data · updated Oct 2026
              </span>
            </Reveal>
          </div>

          {/* KPI tiles */}
          <div ref={kpiRef} className="grid grid--4">
            {DASHBOARD_KPIS.map((k, i) => (
              <Reveal key={k.label} delay={i * 100} className={`glass ${styles.tile}`}>
                <Kpi {...k} start={kpiInView} />
              </Reveal>
            ))}
          </div>

          {/* Charts row */}
          <div className={styles.charts}>
            <Reveal className={`glass ${styles.panel}`}>
              <div className={styles.panelHead}>
                <h3>Workshop participants per month</h3>
                <p>Schools, guide trainings and village meetings · Jan–Oct 2026</p>
              </div>
              <AreaChart data={MONTHLY_REACH} unit="participants" />
            </Reveal>

            <Reveal delay={150} className={`glass ${styles.panel}`}>
              <div className={styles.panelHead}>
                <h3>Where each euro goes</h3>
                <p>Share of 2026 spending</p>
              </div>
              <Allocation items={FUND_ALLOCATION} />
            </Reveal>
          </div>

          {/* Glacier watch list */}
          <Reveal className={`glass ${styles.panel} ${styles.tablePanel}`}>
            <div className={styles.panelHead}>
              <h3>Glacier watch list</h3>
              <p>Glaciers on our repeat-photography routes and their observed status</p>
            </div>
            <div className={styles.tableWrap}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th scope="col">Glacier</th>
                    <th scope="col">Valley</th>
                    <th scope="col">Last field visit</th>
                    <th scope="col">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {GLACIER_WATCH.map((g) => (
                    <tr key={g.name}>
                      <th scope="row">{g.name}</th>
                      <td>{g.valley}</td>
                      <td>{g.lastVisit}</td>
                      <td>
                        <span className={`pill ${STATUS_CLASS[g.status]}`}>
                          <span className={styles.statusDot} aria-hidden="true" />
                          {g.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
