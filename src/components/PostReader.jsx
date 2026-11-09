import { useEffect, useRef } from 'react';
import Icon from './Icon.jsx';
import { formatDate } from './PostCard.jsx';
import styles from './PostReader.module.css';

/**
 * PostReader — modal dialog that shows a full article.
 * Uses the native <dialog> element for focus trapping and Escape-to-close.
 */
export default function PostReader({ post, onClose }) {
  const ref = useRef(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return undefined;
    if (post && !dialog.open) {
      dialog.showModal();
      document.body.classList.add('no-scroll');
    }
    const handleClose = () => {
      document.body.classList.remove('no-scroll');
      onClose();
    };
    dialog.addEventListener('close', handleClose);
    return () => dialog.removeEventListener('close', handleClose);
  }, [post, onClose]);

  // Click on the backdrop (outside the panel) closes the dialog.
  const onClick = (e) => {
    if (e.target === ref.current) ref.current.close();
  };

  if (!post) return null;

  return (
    <dialog ref={ref} className={styles.dialog} onClick={onClick} aria-labelledby="reader-title">
      <article className={styles.panel}>
        <button type="button" className={styles.close} onClick={() => ref.current.close()} aria-label="Close article">
          <Icon name="close" size={20} />
        </button>
        <img className={styles.image} src={post.image} alt="" />
        <div className={styles.content}>
          <span className="pill">{post.category}</span>
          <h2 id="reader-title" className={styles.title}>
            {post.title}
          </h2>
          <p className={styles.meta}>
            <time dateTime={post.date}>{formatDate(post.date)}</time> · {post.readTime} read · Save The Third Pole editorial team
          </p>
          {post.body.map((para) => (
            <p key={para.slice(0, 24)} className={styles.para}>
              {para}
            </p>
          ))}
        </div>
      </article>
    </dialog>
  );
}
