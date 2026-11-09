# Save The Third Pole — website

React 18 + Vite + React Router, styled with CSS Modules and global CSS custom properties.

## Pages
| Route | Contents |
|---|---|
| `/` | Full-screen parallax hero, mission pillars, animated statistics, field-photo carousel, parallax quote, latest stories, newsletter |
| `/vision` | Vision, 2027–2030 roadmap, values, **Team** section (`/vision#team`): founder photo cards with profile pop-ups, open volunteer roles |
| `/dashboard` | KPI counters, animated SVG chart, fund allocation bars, glacier watch table |
| `/blog` | Featured article, category filter, article reader dialog, newsletter |
| `/contact` | Validated contact form, ways to give (`/contact#donate`), Google Maps embed, FAQ accordion |

## Run
```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build in dist/
npm run build:pages  # same, plus 404.html for GitHub Pages
```
`npm run build:single` makes a one-file preview build (memory router, no map iframe).


## Deploying to GitHub Pages
A workflow in `.github/workflows/deploy.yml` builds and publishes the site on every push to `main`.

1. Create a new **public** repository on GitHub, e.g. `save-the-third-pole` (no README).
2. From this folder:
   ```bash
   git init
   git add .
   git commit -m "Save The Third Pole website"
   git branch -M main
   git remote add origin https://github.com/<your-username>/save-the-third-pole.git
   git push -u origin main
   ```
3. On GitHub: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
4. Open the **Actions** tab, wait for "Deploy to GitHub Pages" to turn green (about a minute; re-run it if it ran before step 3).
5. The site is live at `https://<your-username>.github.io/save-the-third-pole/`.

The workflow sets the sub-path automatically. Naming the repo `<your-username>.github.io` serves it from the root instead.

### Email: can I get info@ with github.io?
No. GitHub Pages only hosts websites, so `karakoram-basecamp.github.io` cannot receive email. To get `info@yourdomain`:
1. Buy a domain and connect it to GitHub Pages (steps below).
2. Set up email for that domain:
   - **Free forwarding to Gmail:** Cloudflare Email Routing or ImprovMX forward `info@` to your existing Gmail. To send from `info@`, add it in Gmail under Settings → Accounts → "Send mail as".
   - **A separate inbox:** Zoho Mail (free plan) or Google Workspace. Nonprofits can apply to Google for Nonprofits.
3. Put the new address in `ORG.email` in `src/data/site.js`.

### Custom domain (needed for an info@ email address)
1. Buy a domain (e.g. `savethethirdpole.org`) from any registrar.
2. Add a file `public/CNAME` containing just the domain, commit and push.
3. At the registrar, add DNS records: four `A` records for `@` → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`, and a `CNAME` for `www` → `<your-username>.github.io`.
4. Settings → Pages → Custom domain → enter the domain → tick **Enforce HTTPS** once offered.

### Contact form
GitHub Pages has no server. Create a free form at a service such as Formspree, then in the repo go to
**Settings → Secrets and variables → Actions → Variables → New repository variable**: `FORM_ENDPOINT` = your form URL. Push any change (or re-run the workflow) and the form sends real emails.

## Home background slideshow
The home page background drifts slowly and cross-fades between photos every 7 seconds.
1. Put your photo in `public/images/hero/` (landscape, about 2400 px wide, under 600 KB).
2. In `src/data/site.js`, find `HERO_SLIDES` and add a block:
   ```js
   {
     src: asset('images/hero/batura-glacier.jpg'),
     alt: 'Batura Glacier in Upper Hunza',
     credit: 'Batura Glacier · Photo: Your Name',
     creditHref: '',
   },
   ```
3. Commit and push. Delete a block to remove a photo; the order in the list is the order on screen.
To change the timing, edit `SLIDE_MS` at the top of `src/components/Hero.jsx`.

## Before launch
- **Team photos:** save square photos (600 × 600 px or larger) as `public/images/team/ajmal-masood.jpg`, `muneer-ahmed.jpg` and `khizer-zakir.jpg`. Until then the cards show initials. Bios, focus areas and links are in `TEAM` in `src/data/content.js`; Muneer's and Khizer's profiles still need text.
- `src/data/site.js` — real email address, social profile URLs, map location.
- `public/logo.svg` and `public/favicon.svg` — placeholder logo; replace with the official one.
- Hero photo of Rakaposhi loads from Wikimedia Commons (CC BY-SA, credit shown in the hero). Self-hosting it is recommended; see the comment in `src/data/site.js`.
- `src/data/content.js` — dashboard figures are **sample data**; team bios and blog posts are draft copy to review.
- Replace picsum.photos placeholders (`img()` helper) with your own photography.
- The contact form sends real messages once `FORM_ENDPOINT` is set (see above). The newsletter form still simulates signup; connect it to your newsletter provider.

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
