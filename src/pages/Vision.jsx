import { Link } from 'react-router-dom';
import Hero from '../components/Hero.jsx';
import Reveal from '../components/Reveal.jsx';
import SectionHeader from '../components/SectionHeader.jsx';
import ParallaxBand from '../components/ParallaxBand.jsx';
import Icon from '../components/Icon.jsx';
import { img, ORG } from '../data/site.js';
import { TEAM, VALUES, VISION_GOALS } from '../data/content.js';
import styles from './Vision.module.css';

/**
 * Vision page (also hosts the Team section, reachable at /vision#team)
 * Hero → why we exist → 2027–2030 roadmap → values → parallax → team → join CTA.
 */
export default function Vision() {
  return (
    <>
      <Hero
        size="page"
        image={img(1043, 2000, 1200)}
        eyebrow="Vision"
        title="Mountains that keep their ice, and valleys ready for change"
        subtitle="Our plan to 2030: better evidence, stronger schools, safer villages and a seat at the table for the people who live beside the glaciers."
      />

      {/* Why we exist ----------------------------------------------------- */}
      <section className="section" aria-labelledby="why-title">
        <div className={`container ${styles.split}`}>
          <Reveal className={styles.splitMedia}>
            <img src={img(1015, 1000, 1200)} alt="A river valley below snow-covered mountains" loading="lazy" />
            <div className={`glass ${styles.badge}`}>
              <strong>Est. {ORG.founded}</strong>
              <span>Registered Verein · {ORG.city}</span>
            </div>
          </Reveal>
          <div className={styles.splitText}>
            <SectionHeader
              id="why-title"
              eyebrow="Why we exist"
              title="Glacier loss is a mountain problem first"
              intro="Global reports describe the Third Pole in billions of people and gigatonnes of ice. In the valleys it looks different: a spring that dries in August, a terrace that floods, a pasture the herders no longer trust."
            />
            <Reveal delay={120}>
              <p className={styles.body}>
                Save The Third Pole was founded in Salzburg by people from Gilgit-Baltistan who study, climb and guide in both the Alps and the Karakoram.
                We connect the two: Alpine experience with glacier monitoring and hazard planning, and Karakoram knowledge that rarely reaches European audiences.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Roadmap timeline ------------------------------------------------- */}
      <section className="section section--tight" aria-labelledby="roadmap-title">
        <div className="container">
          <SectionHeader id="roadmap-title" eyebrow="Roadmap" title="What we will deliver by 2030" align="center" />
          <ol className={styles.timeline}>
            {VISION_GOALS.map((goal, i) => (
              <Reveal as="li" key={goal.year} delay={i * 140} className={`glass ${styles.goal}`}>
                <span className={styles.year}>{goal.year}</span>
                <h3>{goal.title}</h3>
                <p>{goal.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Values ------------------------------------------------------------ */}
      <section className="section" aria-labelledby="values-title">
        <div className="container">
          <SectionHeader id="values-title" eyebrow="How we work" title="Four commitments" />
          <div className="grid grid--4">
            {VALUES.map((v, i) => (
              <Reveal key={v.title} delay={i * 110} className={styles.value}>
                <span className={styles.valueIcon}>
                  <Icon name="check" size={18} />
                </span>
                <h3>{v.title}</h3>
                <p>{v.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ParallaxBand image={img(29, 2000, 1300)}>
        <blockquote>Science tells us how fast the ice is going. Communities tell us what that means.</blockquote>
        <cite>Our working principle</cite>
      </ParallaxBand>

      {/* Team -------------------------------------------------------------- */}
      <section id="team" className="section" aria-labelledby="team-title">
        <div className="container">
          <SectionHeader
            id="team-title"
            eyebrow="Team"
            title="A small team, growing with the work"
            intro="We are a young, volunteer-run association. These are our founders and the roles we are looking to fill."
          />
          <div className="grid grid--3">
            {TEAM.map((m, i) => (
              <Reveal key={m.name} delay={(i % 3) * 120} className={`glass ${styles.member} ${m.open ? styles.open : ''}`}>
                <div className={styles.avatar} aria-hidden="true">
                  {m.open ? <Icon name="users" size={26} /> : m.initials}
                </div>
                <div className={styles.memberText}>
                  <h3>{m.name}</h3>
                  <p className={styles.role}>{m.role}</p>
                  <p className={styles.bio}>{m.bio}</p>
                </div>
                {m.open && (
                  <Link to="/contact" className={styles.apply}>
                    Apply for this role <Icon name="arrow-right" size={15} />
                  </Link>
                )}
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Join CTA ---------------------------------------------------------- */}
      <section className="section section--tight">
        <div className="container">
          <Reveal className={`glass ${styles.cta}`}>
            <h2>Bring your skills to the Third Pole</h2>
            <p>GIS, teaching, translation, design, fundraising: most of our volunteer work can be done from anywhere.</p>
            <Link to="/contact" className="btn btn--primary">
              Get involved <Icon name="arrow-right" size={16} />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
