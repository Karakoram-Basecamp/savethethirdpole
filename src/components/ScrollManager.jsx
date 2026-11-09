import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollManager — handles scroll position on navigation.
 *  - New page without a hash → jump to top
 *  - Link with a hash (e.g. /vision#team) → smooth-scroll to that section,
 *    retrying briefly while the target page renders
 * Also keeps the document title in sync with the current page.
 */
const TITLES = {
  '/': 'Save The Third Pole',
  '/vision': 'Vision & Team · Save The Third Pole',
  '/dashboard': 'Impact Dashboard · Save The Third Pole',
  '/blog': 'Blog · Save The Third Pole',
  '/contact': 'Contact · Save The Third Pole',
};

export default function ScrollManager() {
  const { pathname, hash, key } = useLocation();

  useEffect(() => {
    document.title = TITLES[pathname] || TITLES['/'];
  }, [pathname]);

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'auto' });
      return undefined;
    }
    let tries = 0;
    let timer;
    const scroll = () => {
      const el = document.getElementById(hash.slice(1));
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else if (tries++ < 10) {
        timer = setTimeout(scroll, 60);
      }
    };
    // Wait one frame so the new route has painted.
    timer = setTimeout(scroll, 30);
    return () => clearTimeout(timer);
  }, [pathname, hash, key]);

  return null;
}
