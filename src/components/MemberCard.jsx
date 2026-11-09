import MemberPhoto from './MemberPhoto.jsx';
import Icon from './Icon.jsx';
import styles from './MemberCard.module.css';

/**
 * MemberCard — photo, name, role and a one-line summary.
 * The whole card is a button that opens the member's full profile.
 */
export default function MemberCard({ member, onOpen }) {
  return (
    <article className={`glass ${styles.card}`}>
      <button type="button" className={styles.button} onClick={() => onOpen(member)} aria-haspopup="dialog">
        <div className={styles.media}>
          <MemberPhoto member={member} />
          <span className={styles.role}>{member.role}</span>
        </div>
        <div className={styles.body}>
          <h3 className={styles.name}>{member.name}</h3>
          {member.location && (
            <p className={styles.location}>
              <Icon name="pin" size={14} /> {member.location}
            </p>
          )}
          <p className={styles.summary}>{member.summary}</p>
          <span className={styles.more}>
            View profile <Icon name="arrow-right" size={15} />
          </span>
        </div>
      </button>
    </article>
  );
}
