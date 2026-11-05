import { useInView } from '../hooks/useInView.js';

/**
 * Reveal — wraps content in a slide-up-on-scroll animation.
 * Pass `delay` (ms) to stagger siblings, e.g. delay={index * 120}.
 *
 * @example
 * {items.map((item, i) => (
 *   <Reveal key={item.id} delay={i * 120}><Card {...item} /></Reveal>
 * ))}
 */
export default function Reveal({ as: Tag = 'div', delay = 0, className = '', children, ...rest }) {
  const [ref, inView] = useInView();

  return (
    <Tag
      ref={ref}
      className={`reveal ${inView ? 'is-visible' : ''} ${className}`.trim()}
      style={{ '--reveal-delay': `${delay}ms` }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
