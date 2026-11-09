import { useState } from 'react';
import { asset } from '../data/site.js';
import styles from './MemberPhoto.module.css';

/**
 * MemberPhoto — a team member's portrait.
 * Falls back to the person's initials when the photo file is missing or
 * fails to load, so the layout never shows a broken image.
 */
export default function MemberPhoto({ member, size = 'card' }) {
  const [failed, setFailed] = useState(!member.photo);
  const [x = '0', y = '0'] = String(member.photoPosition || '0 0').split(/\s+/);

  return (
    <div className={`${styles.photo} ${styles[size]}`}>
      {failed ? (
        <span className={styles.initials} aria-hidden="true">
          {member.initials}
        </span>
      ) : (
        <img
          src={asset(member.photo)}
          alt={`Portrait of ${member.name}`}
          loading="lazy"
          style={{ '--photo-x': `${Number.parseFloat(x) || 0}px`, '--photo-y': `${Number.parseFloat(y) || 0}px` }}
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}
