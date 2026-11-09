import { BrowserRouter, MemoryRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import Home from './pages/Home.jsx';
import Vision from './pages/Vision.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Blog from './pages/Blog.jsx';
import Contact from './pages/Contact.jsx';
import NotFound from './pages/NotFound.jsx';

/**
 * App — route table.
 * Production uses BrowserRouter (clean URLs: /vision, /blog …). The static
 * single-file preview uses MemoryRouter because it runs in a sandbox where
 * the URL path can't change.
 */
const isPreview = import.meta.env.VITE_STATIC_PREVIEW === 'true';
const Router = isPreview ? MemoryRouter : BrowserRouter;
// "/save-the-third-pole/" → "/save-the-third-pole" (React Router wants no trailing slash)
const basename = isPreview ? undefined : import.meta.env.BASE_URL.replace(/\/$/, '') || '/';

export default function App() {
  return (
    <Router basename={basename}>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="vision" element={<Vision />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="blog" element={<Blog />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}
