import { useEffect, useRef, useState } from 'react';

/**
 * useInView — reports when an element first enters the viewport.
 * Used by <Reveal> (slide-up animation) and the statistics counter.
 *
 * @param {object} options
 * @param {number} [options.threshold=0.15] Portion of the element that must be visible.
 * @param {string} [options.rootMargin]     Expands/shrinks the trigger area.
 * @param {boolean} [options.once=true]     Stop observing after the first hit.
 * @returns {[React.RefObject, boolean]} A ref to attach and the visibility flag.
 */
export function useInView({ threshold = 0.15, rootMargin = '0px 0px -8% 0px', once = true } = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    // Older browsers / reduced-motion users: show content immediately.
    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (!('IntersectionObserver' in window) || reduced) {
      setInView(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return [ref, inView];
}
