import { useCallback, useEffect, useRef, useState } from 'react';
import Icon from './Icon.jsx';
import styles from './Carousel.module.css';

const AUTOPLAY_MS = 6000;

/**
 * Carousel — accessible image slider.
 *  - Prev / next buttons, dot navigation, ←/→ keys, touch swipe
 *  - Autoplays; pauses on hover, keyboard focus, or when the tab is hidden
 *  - Respects prefers-reduced-motion (no autoplay)
 *
 * @param {{src:string,title:string,place:string,caption:string}[]} slides
 */
export default function Carousel({ slides, label = 'Field photography' }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchX = useRef(null);
  const count = slides.length;

  const go = useCallback((i) => setIndex(((i % count) + count) % count), [count]);
  const next = useCallback(() => go(index + 1), [go, index]);
  const prev = useCallback(() => go(index - 1), [go, index]);

  // Autoplay timer — restarts whenever the slide changes.
  useEffect(() => {
    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (paused || reduced) return undefined;
    const id = setTimeout(next, AUTOPLAY_MS);
    return () => clearTimeout(id);
  }, [index, paused, next]);

  // Pause while the browser tab is hidden.
  useEffect(() => {
    const onVis = () => setPaused(document.hidden);
    document.addEventListener('visibilitychange', onVis);
    return () => document.removeEventListener('visibilitychange', onVis);
  }, []);

  const onKeyDown = (e) => {
    if (e.key === 'ArrowRight') next();
    if (e.key === 'ArrowLeft') prev();
  };

  // Simple swipe detection (> 40px horizontal movement).
  const onTouchStart = (e) => (touchX.current = e.touches[0].clientX);
  const onTouchEnd = (e) => {
    if (touchX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (Math.abs(dx) > 40) (dx < 0 ? next : prev)();
    touchX.current = null;
  };

  return (
    <div
      className={styles.carousel}
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      tabIndex={0}
      onKeyDown={onKeyDown}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div className={styles.viewport}>
        <ul className={styles.track} style={{ transform: `translateX(-${index * 100}%)` }}>
          {slides.map((slide, i) => (
            <li
              key={slide.title}
              className={styles.slide}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${count}`}
              aria-hidden={i !== index}
            >
              <img src={slide.src} alt={slide.title} loading={i === 0 ? 'eager' : 'lazy'} className={styles.image} />
              <div className={`${styles.caption} ${i === index ? styles.captionActive : ''}`}>
                <span className={styles.place}>
                  <Icon name="pin" size={14} /> {slide.place}
                </span>
                <h3 className={styles.title}>{slide.title}</h3>
                <p className={styles.text}>{slide.caption}</p>
              </div>
            </li>
          ))}
        </ul>

        {/* Progress bar shows time until the next slide */}
        {!paused && <span key={index} className={styles.progress} style={{ animationDuration: `${AUTOPLAY_MS}ms` }} aria-hidden="true" />}
      </div>

      <div className={styles.controls}>
        <button type="button" className={styles.arrow} onClick={prev} aria-label="Previous slide">
          <Icon name="arrow-left" size={18} />
        </button>
        <div className={styles.dots} role="tablist" aria-label="Choose slide">
          {slides.map((s, i) => (
            <button
              key={s.title}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Slide ${i + 1}: ${s.title}`}
              className={`${styles.dot} ${i === index ? styles.dotActive : ''}`}
              onClick={() => go(i)}
            />
          ))}
        </div>
        <button type="button" className={styles.arrow} onClick={next} aria-label="Next slide">
          <Icon name="arrow-right" size={18} />
        </button>
      </div>

      {/* Announces slide changes to screen readers */}
      <p className="visually-hidden" aria-live="polite">
        Slide {index + 1} of {count}: {slides[index].title}
      </p>
    </div>
  );
}
