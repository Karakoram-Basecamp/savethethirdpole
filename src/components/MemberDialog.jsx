import { useEffect, useRef } from 'react';
import MemberPhoto from './MemberPhoto.jsx';
import Icon from './Icon.jsx';
import styles from './MemberDialog.module.css';

/**
 * MemberDialog — full profile of a team member in a native <dialog>
 * (focus is trapped inside; Escape or a click on the backdrop closes it).
 */
export default function MemberDialog({ member, onClose }) {
  const ref = useRef(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return undefined;
    if (member && !dialog.open) {
      dialog.showModal();
      document.body.classList.add('no-scroll');
    }
    const handleClose = () => {
      document.body.classList.remove('no-scroll');
      onClose();
    };
    dialog.addEventListener('close', handleClose);
    return () => dialog.removeEventListener('close', handleClose);
  }, [member, onClose]);

  if (!member) return null;

  const close = () => ref.current?.close();

  return (
    <dialog ref={ref} className={styles.dialog} onClick={(e) => e.target === ref.current && close()} aria-labelledby="member-name">
      <article className={styles.panel}>
        <button type="button" className={styles.close} onClick={close} aria-label="Close profile">
          <Icon name="close" size={20} />
        </button>

        <header className={styles.head}>
          <MemberPhoto member={member} size="dialog" />
          <div className={styles.headText}>
            <span className="pill">{member.role}</span>
            <h2 id="member-name" className={styles.name}>
              {member.name}
            </h2>
            {member.location && (
              <p className={styles.location}>
                <Icon name="pin" size={15} /> {member.location}
              </p>
            )}
          </div>
        </header>

        <div className={styles.bio}>
          {member.bio.map((para) => (
            <p key={para.slice(0, 30)}>{para}</p>
          ))}
        </div>

        {member.focus?.length > 0 && (
          <section className={styles.block} aria-label="Focus areas">
            <h3 className={styles.blockTitle}>Focus areas</h3>
            <ul className={styles.tags}>
              {member.focus.map((f) => (
                <li key={f} className="pill">
                  {f}
                </li>
              ))}
            </ul>
          </section>
        )}

        {member.links?.length > 0 && (
          <section className={styles.block} aria-label="Links">
            <h3 className={styles.blockTitle}>Links</h3>
            <ul className={styles.links}>
              {member.links.map((l) => (
                <li key={l.href}>
                  <a href={l.href} target="_blank" rel="noopener noreferrer" className="btn btn--glass">
                    {l.label} <Icon name="arrow-right" size={15} />
                  </a>
                </li>
              ))}
            </ul>
          </section>
        )}
      </article>
    </dialog>
  );
}
