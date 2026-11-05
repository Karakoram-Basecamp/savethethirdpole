import { useState } from 'react';
import Icon from './Icon.jsx';
import { CONTACT_SUBJECTS } from '../data/content.js';
import styles from './ContactForm.module.css';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const INITIAL = { name: '', email: '', subject: '', message: '', consent: false };

/**
 * validate — returns an object of field → error message.
 * Kept as a pure function so it is easy to unit-test.
 */
export function validate(values) {
  const errors = {};
  if (values.name.trim().length < 2) errors.name = 'Enter your name (at least 2 characters).';
  if (!EMAIL_RE.test(values.email.trim())) errors.email = 'Enter an email address like name@example.com.';
  if (!values.subject) errors.subject = 'Choose what your message is about.';
  if (values.message.trim().length < 20) errors.message = `Tell us a little more (${Math.max(0, 20 - values.message.trim().length)} more characters).`;
  if (!values.consent) errors.consent = 'Please agree so we can reply to you.';
  return errors;
}

/**
 * ContactForm — validated contact form.
 *  - Errors show after a field is left (blur) or on submit
 *  - Focus jumps to the first invalid field on submit
 *  - aria-invalid / aria-describedby wire errors to inputs for screen readers
 *
 * Replace `sendMessage` with your backend endpoint or form service.
 */
const sendMessage = () => new Promise((resolve) => setTimeout(resolve, 1100));

export default function ContactForm({ defaultSubject = '' }) {
  const [values, setValues] = useState({ ...INITIAL, subject: defaultSubject });
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | sent
  const errors = validate(values);

  const update = (e) => {
    const { name, value, type, checked } = e.target;
    setValues((v) => ({ ...v, [name]: type === 'checkbox' ? checked : value }));
  };

  const blur = (e) => setTouched((t) => ({ ...t, [e.target.name]: true }));

  const showError = (field) => touched[field] && errors[field];

  const onSubmit = async (e) => {
    e.preventDefault();
    setTouched({ name: true, email: true, subject: true, message: true, consent: true });
    const first = Object.keys(errors)[0];
    if (first) {
      document.getElementById(`contact-${first}`)?.focus();
      return;
    }
    setStatus('sending');
    await sendMessage(values);
    setStatus('sent');
  };

  const reset = () => {
    setValues({ ...INITIAL, subject: defaultSubject });
    setTouched({});
    setStatus('idle');
  };

  // Success state replaces the form
  if (status === 'sent') {
    return (
      <div className={styles.success} role="status">
        <span className={styles.successIcon}>
          <Icon name="check" size={28} />
        </span>
        <h3>Thank you, {values.name.split(' ')[0]}.</h3>
        <p>Your message has been received. A member of the team will reply to {values.email} within three working days.</p>
        <button type="button" className="btn btn--glass" onClick={reset}>
          Send another message
        </button>
      </div>
    );
  }

  /** Shared props for text inputs */
  const fieldProps = (name) => ({
    id: `contact-${name}`,
    name,
    value: values[name],
    onChange: update,
    onBlur: blur,
    'aria-invalid': Boolean(showError(name)),
    'aria-describedby': `contact-${name}-error`,
  });

  return (
    <form className={styles.form} onSubmit={onSubmit} noValidate>
      <div className={styles.row}>
        <div className="field">
          <label htmlFor="contact-name">Full name</label>
          <input type="text" className="input" autoComplete="name" placeholder="Amina Baig" {...fieldProps('name')} />
          <p id="contact-name-error" className="field-error">{showError('name')}</p>
        </div>
        <div className="field">
          <label htmlFor="contact-email">Email</label>
          <input type="email" className="input" autoComplete="email" placeholder="amina@example.com" {...fieldProps('email')} />
          <p id="contact-email-error" className="field-error">{showError('email')}</p>
        </div>
      </div>

      <div className="field">
        <label htmlFor="contact-subject">Subject</label>
        <select className={`input ${styles.select}`} {...fieldProps('subject')}>
          <option value="">Select a topic…</option>
          {CONTACT_SUBJECTS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <p id="contact-subject-error" className="field-error">{showError('subject')}</p>
      </div>

      <div className="field">
        <label htmlFor="contact-message">Message</label>
        <textarea
          className={`input ${styles.textarea}`}
          rows={6}
          maxLength={1000}
          placeholder="Tell us how you’d like to help, or what you’d like to know."
          {...fieldProps('message')}
        />
        <div className={styles.meta}>
          <p id="contact-message-error" className="field-error">{showError('message')}</p>
          <span className={styles.counter}>{values.message.length} / 1000</span>
        </div>
      </div>

      <div className={styles.consent}>
        <input
          id="contact-consent"
          name="consent"
          type="checkbox"
          checked={values.consent}
          onChange={update}
          onBlur={blur}
          aria-invalid={Boolean(showError('consent'))}
          aria-describedby="contact-consent-error"
        />
        <label htmlFor="contact-consent">I agree that Save The Third Pole may store my details to reply to this message. We never share them.</label>
      </div>
      <p id="contact-consent-error" className="field-error">{showError('consent')}</p>

      <button type="submit" className={`btn btn--primary ${styles.submit}`} disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending…' : 'Send message'}
        {status !== 'sending' && <Icon name="arrow-right" size={16} />}
      </button>
    </form>
  );
}
