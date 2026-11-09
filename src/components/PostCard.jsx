import Icon from './Icon.jsx';
import styles from './PostCard.module.css';

/** Formats an ISO date as e.g. "18 Oct 2026". */
export const formatDate = (iso) =>
  new Date(`${iso}T12:00:00`).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

/**
 * PostCard — blog teaser card. `onOpen` is called with the post when the
 * card's button is pressed (the Blog page opens a reader dialog).
 */
export default function PostCard({ post, onOpen, featured = false }) {
  return (
    <article className={`glass ${styles.card} ${featured ? styles.featured : ''}`}>
      <div className={styles.media}>
        <img src={post.image} alt="" loading="lazy" />
        <span className={`pill ${styles.tag}`}>{post.category}</span>
      </div>
      <div className={styles.body}>
        <p className={styles.meta}>
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span aria-hidden="true">·</span>
          <span>
            <Icon name="clock" size={13} /> {post.readTime} read
          </span>
        </p>
        <h3 className={styles.title}>{post.title}</h3>
        <p className={styles.excerpt}>{post.excerpt}</p>
        <button type="button" className={styles.more} onClick={() => onOpen?.(post)}>
          Read article <Icon name="arrow-right" size={16} />
          <span className="visually-hidden">: {post.title}</span>
        </button>
      </div>
    </article>
  );
}
