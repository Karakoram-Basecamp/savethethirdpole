import { useState } from 'react';
import Hero from '../components/Hero.jsx';
import Reveal from '../components/Reveal.jsx';
import SectionHeader from '../components/SectionHeader.jsx';
import ContactForm from '../components/ContactForm.jsx';
import MapEmbed from '../components/MapEmbed.jsx';
import FaqAccordion from '../components/FaqAccordion.jsx';
import SocialLinks from '../components/SocialLinks.jsx';
import Icon from '../components/Icon.jsx';
import { img, ORG } from '../data/site.js';
import { FAQS } from '../data/content.js';
import styles from './Contact.module.css';

/** Ways to give — shown in the #donate section. */
const GIVING = [
  { icon: 'users', title: 'Become a member', text: 'Annual membership supports our core work and gives you a vote at the general assembly.' },
  { icon: 'mountain', title: 'Sponsor a photo point', text: 'Fund one repeat-photography station for a year, and receive its before-and-after images.' },
  { icon: 'heart', title: 'One-off donation', text: 'Write to us for bank transfer details. Every gift is acknowledged and reported in our annual accounts.' },
];

/**
 * Contact page
 * Hero → contact details + validated form → ways to give (#donate)
 * → Google Map → FAQ accordion.
 */
export default function Contact() {
  const [copied, setCopied] = useState(false);

  /** Copies the email address (mailto links may not work in every context). */
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(ORG.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <>
      <Hero
        size="page"
        image={img(1016, 2000, 1200)}
        eyebrow="Contact"
        title="Let’s protect the Third Pole together"
        subtitle="Volunteer, partner with us, ask a question or support the work. We reply within three working days."
      />

      {/* Details + form ---------------------------------------------------- */}
      <section className="section" aria-labelledby="contact-title">
        <div className={`container ${styles.grid}`}>
          <div className={styles.info}>
            <SectionHeader
              id="contact-title"
              eyebrow="Get in touch"
              title="Write to the team"
              intro="Whether you are a researcher, a teacher, a climber or simply worried about the mountains, we would like to hear from you."
            />
            <ul className={styles.details}>
              <Reveal as="li" className={`glass ${styles.detail}`}>
                <span className={styles.detailIcon}>
                  <Icon name="mail" />
                </span>
                <div>
                  <p className={styles.detailLabel}>Email</p>
                  <p className={styles.detailValue}>{ORG.email}</p>
                </div>
                <button type="button" className={styles.copy} onClick={copyEmail}>
                  {copied ? 'Copied' : 'Copy'}
                </button>
              </Reveal>
              <Reveal as="li" delay={100} className={`glass ${styles.detail}`}>
                <span className={styles.detailIcon}>
                  <Icon name="pin" />
                </span>
                <div>
                  <p className={styles.detailLabel}>Registered office</p>
                  <p className={styles.detailValue}>{ORG.city}</p>
                </div>
              </Reveal>
              <Reveal as="li" delay={200} className={`glass ${styles.detail}`}>
                <span className={styles.detailIcon}>
                  <Icon name="mountain" />
                </span>
                <div>
                  <p className={styles.detailLabel}>Field work</p>
                  <p className={styles.detailValue}>{ORG.fieldBase}</p>
                </div>
              </Reveal>
            </ul>
            <Reveal delay={300} className={styles.social}>
              <p className={styles.detailLabel}>Follow our work</p>
              <SocialLinks />
            </Reveal>
          </div>

          <Reveal delay={150} className={`glass ${styles.formCard}`}>
            <ContactForm />
          </Reveal>
        </div>
      </section>

      {/* Ways to give ------------------------------------------------------ */}
      <section id="donate" className="section section--tight" aria-labelledby="donate-title">
        <div className="container">
          <SectionHeader
            id="donate-title"
            eyebrow="Support us"
            title="Ways to give"
            intro="We are run by volunteers, so your support goes to field work, schools and flood preparedness."
            align="center"
          />
          <div className="grid grid--3">
            {GIVING.map((g, i) => (
              <Reveal key={g.title} delay={i * 120} className={`glass ${styles.give}`}>
                <span className={styles.detailIcon}>
                  <Icon name={g.icon} />
                </span>
                <h3>{g.title}</h3>
                <p>{g.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Map ---------------------------------------------------------------- */}
      <section className="section section--tight" aria-labelledby="map-title">
        <div className="container">
          <SectionHeader id="map-title" eyebrow="Find us" title="Based in Salzburg, working in the Karakoram" />
          <Reveal>
            <MapEmbed query={ORG.mapQuery} title={`Map of ${ORG.city}`} />
          </Reveal>
        </div>
      </section>

      {/* FAQ ---------------------------------------------------------------- */}
      <section className="section" aria-labelledby="faq-title">
        <div className={`container ${styles.faq}`}>
          <SectionHeader
            id="faq-title"
            eyebrow="FAQ"
            title="Questions we are often asked"
            intro="Can’t find your answer? Use the form above and we’ll get back to you."
          />
          <FaqAccordion items={FAQS} />
        </div>
      </section>
    </>
  );
}
