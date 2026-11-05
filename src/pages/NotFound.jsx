import { Link } from 'react-router-dom';
import Hero from '../components/Hero.jsx';
import { img } from '../data/site.js';

/** 404 page — reuses the hero for a consistent look. */
export default function NotFound() {
  return (
    <Hero size="page" image={img(1036, 2000, 1200)} eyebrow="404" title="This trail doesn’t go anywhere" subtitle="The page you were looking for has moved or no longer exists.">
      <Link to="/" className="btn btn--primary">
        Back to the home page
      </Link>
    </Hero>
  );
}
