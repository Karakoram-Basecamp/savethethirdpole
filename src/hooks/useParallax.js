import { useEffect, useRef } from 'react';

/**
 * useParallax — moves an element vertically at a fraction of the scroll speed,
 * producing a depth effect. Uses transform (GPU-friendly) inside
 * requestAnimationFrame, and works on touch devices where
 * `background-attachment: fixed` does not.
 *
 * @param {number} [speed=0.3] 0 = static, 1 = moves with the page.
 * @returns {React.RefObject} Attach to the layer that should move.
 */
export function useParallax(speed = 0.3) {
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return undefined;

    let frame = null;

    const update = () => {
      frame = null;
      const parent = node.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      // Skip work while the section is off-screen.
      if (rect.bottom < 0 || rect.top > window.innerHeight) return;
      // Offset relative to the viewport centre keeps motion symmetric.
      const offset = (rect.top + rect.height / 2 - window.innerHeight / 2) * -speed;
      node.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0) scale(1.15)`;
    };

    const onScroll = () => {
      if (frame === null) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [speed]);

  return ref;
}
