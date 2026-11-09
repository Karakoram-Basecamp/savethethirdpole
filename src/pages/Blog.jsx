import { useCallback, useMemo, useState } from 'react';
import Hero from '../components/Hero.jsx';
import Reveal from '../components/Reveal.jsx';
import SectionHeader from '../components/SectionHeader.jsx';
import PostCard from '../components/PostCard.jsx';
import PostReader from '../components/PostReader.jsx';
import NewsletterForm from '../components/NewsletterForm.jsx';
import { img } from '../data/site.js';
import { BLOG_CATEGORIES, POSTS } from '../data/content.js';
import styles from './Blog.module.css';

// The newest post is featured; the rest form the filterable archive.
const [featured, ...rest] = POSTS;

/**
 * Blog page — featured article, category filter and article grid.
 * Articles open in an accessible reader dialog (PostReader).
 */
export default function Blog() {
  const [category, setCategory] = useState('All');
  const [reading, setReading] = useState(null);
  const closeReader = useCallback(() => setReading(null), []);

  // Filter the remaining posts by the selected category.
  const visible = useMemo(() => (category === 'All' ? rest : rest.filter((p) => p.category === category)), [category]);

  return (
    <>
      <Hero
        size="page"
        image={img(1039, 2000, 1200)}
        eyebrow="Blog"
        title="Notes from the ice"
        subtitle="Field reports, research explained in plain language, and stories from the communities we work with."
      />

      <section className="section" aria-labelledby="featured-title">
        <div className="container">
          <h2 id="featured-title" className="visually-hidden">
            Featured article
          </h2>
          <Reveal>
            <PostCard post={featured} onOpen={setReading} featured />
          </Reveal>
        </div>
      </section>

      <section className="section section--tight" aria-labelledby="all-title">
        <div className="container">
          <div className={styles.head}>
            <SectionHeader id="all-title" eyebrow="Archive" title="All articles" />
            {/* Category filter chips */}
            <Reveal as="div" className={styles.filters} role="group" aria-label="Filter by category">
              {BLOG_CATEGORIES.map((c) => (
                <button
                  key={c}
                  type="button"
                  className={`${styles.chip} ${category === c ? styles.chipActive : ''}`}
                  aria-pressed={category === c}
                  onClick={() => setCategory(c)}
                >
                  {c}
                </button>
              ))}
            </Reveal>
          </div>

          {visible.length ? (
            <div className="grid grid--3" aria-live="polite">
              {visible.map((post, i) => (
                // Keyed by category too, so cards re-animate when the filter changes
                <Reveal key={`${category}-${post.id}`} delay={(i % 3) * 120}>
                  <PostCard post={post} onOpen={setReading} />
                </Reveal>
              ))}
            </div>
          ) : (
            <p className={`glass ${styles.empty}`}>No other articles in “{category}” yet. Try another category.</p>
          )}
        </div>
      </section>

      <section className="section section--tight" aria-labelledby="blog-news-title">
        <div className="container">
          <Reveal className={`glass ${styles.subscribe}`}>
            <h2 id="blog-news-title">Get new articles by email</h2>
            <p>One digest a month with our latest field notes and research summaries.</p>
            <NewsletterForm />
          </Reveal>
        </div>
      </section>

      <PostReader post={reading} onClose={closeReader} />
    </>
  );
}
