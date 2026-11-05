import { useState } from 'react';
import { useInView } from '../hooks/useInView.js';
import styles from './AreaChart.module.css';

/**
 * AreaChart — dependency-free responsive SVG area chart with a hover/focus
 * tooltip. The line draws itself when the chart scrolls into view.
 *
 * @param {{month:string,value:number}[]} data
 * @param {string} unit Label used in the tooltip (e.g. "participants").
 */
export default function AreaChart({ data, unit = '' }) {
  const [ref, inView] = useInView({ threshold: 0.3 });
  const [active, setActive] = useState(data.length - 1);

  // Chart geometry in viewBox units (scales with the container).
  const W = 640;
  const H = 260;
  const pad = { top: 20, right: 16, bottom: 32, left: 40 };
  const innerW = W - pad.left - pad.right;
  const innerH = H - pad.top - pad.bottom;

  // Round the y-axis max up to a clean step of 50.
  const max = Math.ceil(Math.max(...data.map((d) => d.value)) / 50) * 50;
  const ticks = [0, max / 4, max / 2, (max * 3) / 4, max];

  const x = (i) => pad.left + (i / (data.length - 1)) * innerW;
  const y = (v) => pad.top + innerH - (v / max) * innerH;

  const line = data.map((d, i) => `${i === 0 ? 'M' : 'L'}${x(i).toFixed(1)},${y(d.value).toFixed(1)}`).join(' ');
  const area = `${line} L${x(data.length - 1)},${pad.top + innerH} L${x(0)},${pad.top + innerH} Z`;

  const point = data[active];

  return (
    <div ref={ref} className={`${styles.wrap} ${inView ? styles.drawn : ''}`}>
      <svg viewBox={`0 0 ${W} ${H}`} className={styles.svg} role="img" aria-label={`Monthly ${unit}: ${data.map((d) => `${d.month} ${d.value}`).join(', ')}`}>
        <defs>
          <linearGradient id="areaFill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="var(--color-sage)" stopOpacity="0.55" />
            <stop offset="100%" stopColor="var(--color-sage)" stopOpacity="0.02" />
          </linearGradient>
        </defs>

        {/* Grid + y-axis labels */}
        {ticks.map((t) => (
          <g key={t}>
            <line x1={pad.left} x2={W - pad.right} y1={y(t)} y2={y(t)} className={styles.grid} />
            <text x={pad.left - 10} y={y(t) + 4} className={styles.axis} textAnchor="end">
              {t}
            </text>
          </g>
        ))}

        {/* x-axis labels */}
        {data.map((d, i) => (
          <text key={d.month} x={x(i)} y={H - 8} className={styles.axis} textAnchor="middle">
            {d.month}
          </text>
        ))}

        <path d={area} fill="url(#areaFill)" className={styles.area} />
        <path d={line} fill="none" className={styles.line} pathLength="1" />

        {/* Active point marker */}
        <line x1={x(active)} x2={x(active)} y1={pad.top} y2={pad.top + innerH} className={styles.cursor} />
        <circle cx={x(active)} cy={y(point.value)} r="6" className={styles.dot} />

        {/* Invisible hit areas for hover / keyboard focus */}
        {data.map((d, i) => (
          <rect
            key={d.month}
            x={x(i) - innerW / (data.length - 1) / 2}
            y={pad.top}
            width={innerW / (data.length - 1)}
            height={innerH}
            fill="transparent"
            tabIndex={0}
            aria-label={`${d.month}: ${d.value} ${unit}`}
            onMouseEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
          />
        ))}
      </svg>

      <div className={styles.tooltip} style={{ left: `${(x(active) / W) * 100}%`, top: `${(y(point.value) / H) * 100}%` }} aria-hidden="true">
        <strong>{point.value}</strong> {unit}
        <span>{point.month} 2026</span>
      </div>
    </div>
  );
}
