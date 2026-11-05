import { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero.jsx';
import Reveal from '../components/Reveal.jsx';
import SectionHeader from '../components/SectionHeader.jsx';
import StatsCounter from '../components/StatsCounter.jsx';
import Carousel from '../components/Carousel.jsx';
import ParallaxBand from '../components/ParallaxBand.jsx';
import PostCard from '../components/PostCard.jsx';
import PostReader from '../components/PostReader.jsx';
import NewsletterForm from '../components/NewsletterForm.jsx';
import Icon from '../components/Icon.jsx';
import { img } from '../data/site.js';
import { GALLERY, PILLARS, POSTS, REGION_STATS, REGION_STATS_SOURCE } from '../data/content.js';
import styles from './Home.module.css';

/**
 * Home page
 * Hero → mission & pillars → regional statistics → field gallery carousel
 * → parallax statement → latest stories → newsletter signup.
 */
export default function Home() {
  const [reading, setReading] = useState(null);
  const closeReader = useCallback(() => setReading(null), []);

  /** Smooth-scroll from the hero cue to the first section. */
  const scrollToMission = () => document.getElementById('mission')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <>
      <Hero
        image={img(1018, 2000, 1300)}
        eyebrow="Hindu Kush · Karakoram · Himalaya"
        title={
          <>
            The Third Pole is melting. <em>We can still change what comes next.</em>
          </>
        }
        subtitle="We monitor glaciers, teach mountain communities and prepare villages for floods across Gilgit-Baltistan, and we carry their voices to Europe."
        scrollCue={
          <button type="button" className={styles.cue} onClick={scrollToMission} aria-label="Scroll to our mission">
            <span className={styles.cueLine} aria-hidden="true" />
            Scroll
          </button>
        }
      >
        <Link to={{ pathname: '/contact', hash: '#donate' }} className="btn btn--primary">
          <Icon name="heart" size={16} /> Support our work
        </Link>
        <Link to="/vision" className="btn btn--on-photo">
          Our vision <Icon name="arrow-right" size={16} />
        </Link>
      </Hero>

      {/* Mission + pillars --------------------------------------------- */}
      <section id="mission" className="section" aria-labelledby="mission-title">
        <div className="container">
          <div className={styles.missionGrid}>
            <SectionHeader
              id="mission-title"
              eyebrow="Our mission"
              title="Protecting the ice that feeds Asia’s great rivers"
              intro="The Hindu Kush–Karakoram–Himalaya holds more ice than anywhere outside the Arctic and Antarctic. We work where that ice meets daily life: in the valleys that drink from it, farm with it and live in the path of its floods."
            />
            <div className={styles.pillars}>
              {PILLARS.map((p, i) => (
                <Reveal key={p.title} delay={i * 120} className={`glass ${styles.pillar}`}>
                  <span className={styles.pillarIcon}>
                    <Icon name={p.icon} size={22} />
                  </span>
                  <h3>{p.title}</h3>
                  <p>{p.text}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Animated statistics ------------------------------------------- */}
      <section className="section section--tight" aria-labelledby="stats-title">
        <div className="container">
          <SectionHeader id="stats-title" eyebrow="Why it matters" title="The Third Pole in four numbers" align="center" />
          <StatsCounter stats={REGION_STATS} source={REGION_STATS_SOURCE} />
        </div>
      </section>

      {/* Field gallery carousel ---------------------------------------- */}
      <section className="section" aria-labelledby="gallery-title">
        <div className="container">
          <SectionHeader
            id="gallery-title"
            eyebrow="From the field"
            title="Where we work"
            intro="Photographs from our monitoring routes across Hunza, Nagar and Gojal."
          />
          <Reveal>
            <Carousel slides={GALLERY} />
          </Reveal>
        </div>
      </section>

      {/* Parallax statement -------------------------------------------- */}
      <ParallaxBand image={img(1036, 2000, 1300)}>
        <blockquote>“A glacier does not vanish overnight. It disappears one season at a time, while we are told there is still time.”</blockquote>
        <cite>Save The Third Pole</cite>
        <Link to="/vision" className="btn btn--on-photo">
          Read our vision for 2030
        </Link>
      </ParallaxBand>

      {/* Latest stories ------------------------------------------------- */}
      <section className="section" aria-labelledby="latest-title">
        <div className="container">
          <div className={styles.rowHead}>
            <SectionHeader id="latest-title" eyebrow="Latest stories" title="Notes from the ice" />
            <Reveal>
              <Link to="/blog" className="btn btn--glass">
                All articles <Icon name="arrow-right" size={16} />
              </Link>
            </Reveal>
          </div>
          <div className="grid grid--3">
            {POSTS.slice(0, 3).map((post, i) => (
              <Reveal key={post.id} delay={i * 120}>
                <PostCard post={post} onOpen={setReading} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter ----------------------------------------------------- */}
      <section className="section section--tight" aria-labelledby="newsletter-title">
        <div className="container">
          <Reveal className={`glass ${styles.newsletter}`}>
            <div className={styles.newsletterText}>
              <span className="eyebrow">Newsletter</span>
              <h2 id="newsletter-title">Field updates, once a month</h2>
              <p>Survey results, new photo pairs and ways to help, straight from the valleys to your inbox.</p>
            </div>
            <NewsletterForm />
          </Reveal>
        </div>
      </section>

      <PostReader post={reading} onClose={closeReader} />
    </>
  );
}
