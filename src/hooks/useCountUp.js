import { useEffect, useState } from 'react';

/** Ease-out cubic: fast start, gentle landing — feels natural for counters. */
const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

/**
 * useCountUp — animates a number from 0 to `end` once `start` becomes true.
 *
 * @param {number} end              Final value.
 * @param {boolean} start           Begin animating when true (e.g. element in view).
 * @param {number} [duration=1800]  Animation length in ms.
 * @returns {number} The current (rounded) value.
 */
export function useCountUp(end, start, duration = 1800) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) return undefined;

    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      setValue(end);
      return undefined;
    }

    let frame;
    const t0 = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - t0) / duration, 1);
      setValue(Math.round(end * easeOutCubic(progress)));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [end, start, duration]);

  return value;
}
