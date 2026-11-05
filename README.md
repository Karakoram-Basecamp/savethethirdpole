# Save The Third Pole — website

React 18 + Vite + React Router, styled with CSS Modules and global CSS custom properties.

## Pages
| Route | Contents |
|---|---|
| `/` | Full-screen parallax hero, mission pillars, animated statistics, field-photo carousel, parallax quote, latest stories, newsletter |
| `/vision` | Vision, 2027–2030 roadmap, values, **Team** section (`/vision#team`) |
| `/dashboard` | KPI counters, animated SVG chart, fund allocation bars, glacier watch table |
| `/blog` | Featured article, category filter, article reader dialog, newsletter |
| `/contact` | Validated contact form, ways to give (`/contact#donate`), Google Maps embed, FAQ accordion |

## Run
```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build in dist/
```
`npm run build:single` makes a one-file preview build (memory router, no map iframe).

## Git and publishing example
```bash
git init
git add .
git commit -m "Initial Save The Third Pole website"
git branch -M main
git remote add origin https://github.com/<account>/<repository>.git
git push -u origin main
```

For Netlify, connect the repository with `npm run build` as the build command and
`dist` as the publish directory. For a one-file preview, use `npm run build:single`
and `dist-single` instead.

### GitHub Pages

The repository includes a GitHub Actions workflow at `.github/workflows/deploy.yml`.
After pushing to GitHub:

1. Open the repository's **Settings → Pages**.
2. Set **Source** to **GitHub Actions**.
3. Wait for the **Deploy to GitHub Pages** workflow to finish under the **Actions** tab.

The site will be available at
`https://<account>.github.io/<repository>/`.

## Deploying
The site uses clean URLs (BrowserRouter), so the host must serve `index.html` for unknown paths:
- Netlify: add `public/_redirects` with `/*  /index.html  200`
- Vercel: add a rewrite of `/(.*)` to `/index.html`

## Before launch
- `src/data/site.js` — real email address, social profile URLs, map location.
- `src/data/content.js` — dashboard figures are **sample data**; team bios and blog posts are draft copy to review.
- Replace picsum.photos placeholders (`img()` helper) with your own photography.
- Wire `NewsletterForm.jsx` and `ContactForm.jsx` to a real service (both currently simulate the request).

## Structure
```
src/
  components/   Navbar, Hero, Carousel, FaqAccordion, ContactForm, NewsletterForm,
                MapEmbed, StatsCounter, AreaChart, ParallaxBand, Reveal, …
  hooks/        useInView, useCountUp, useParallax
  pages/        Home, Vision, Dashboard, Blog, Contact, NotFound
  data/         site.js (config), content.js (all copy and data)
  styles/       global.css (tokens, light/dark theme, utilities)
```
