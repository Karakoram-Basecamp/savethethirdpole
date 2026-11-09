import { useState } from 'react';
import Icon from './Icon.jsx';
import styles from './NewsletterForm.module.css';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * NewsletterForm — email signup with inline validation and status messages.
 *
 * The submit handler currently simulates a request. To go live, replace
 * `fakeSubscribe` with a call to your provider (Mailchimp, Brevo, Buttondown…).
 */
const fakeSubscribe = () => new Promise((resolve) => setTimeout(resolve, 900));

export default function NewsletterForm({ compact = false }) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [message, setMessage] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!EMAIL_RE.test(email.trim())) {
      setStatus('error');
      setMessage('Enter an email address like name@example.com.');
      return;
    }
    setStatus('loading');
    setMessage('');
    try {
      await fakeSubscribe(email.trim());
      setStatus('success');
      setMessage('You’re subscribed. Look out for our next field update.');
      setEmail('');
    } catch {
      setStatus('error');
      setMessage('We couldn’t subscribe you just now. Please try again in a minute.');
    }
  };

  return (
    <form className={`${styles.form} ${compact ? styles.compact : ''}`} onSubmit={onSubmit} noValidate>
      <label htmlFor="newsletter-email" className="visually-hidden">
        Email address
      </label>
      <div className={styles.row}>
        <input
          id="newsletter-email"
          type="email"
          className={`input ${styles.input}`}
          placeholder="your@email.com"
          autoComplete="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status === 'error') setStatus('idle');
          }}
          aria-invalid={status === 'error'}
          aria-describedby="newsletter-msg"
        />
        <button type="submit" className="btn btn--primary" disabled={status === 'loading'}>
          {status === 'loading' ? 'Subscribing…' : 'Subscribe'}
          {status !== 'loading' && <Icon name="arrow-right" size={16} />}
        </button>
      </div>
      <p id="newsletter-msg" className={`${styles.msg} ${styles[status] || ''}`} role="status" aria-live="polite">
        {status === 'success' && <Icon name="check" size={16} />} {message || 'One email a month. Unsubscribe any time.'}
      </p>
    </form>
  );
}
