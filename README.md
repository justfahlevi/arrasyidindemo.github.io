# Ar Rasyidin Academy — website

Live build of the Figma file "Ar Rasyidin - Web Design" (Design Revision page), with the approved motion spec.

## Run it on localhost

You need Node.js 18 or newer (check with `node -v`; install from https://nodejs.org if missing).

```bash
cd ar-rasyidin-site
npm install
npm run dev
```

Your browser opens at http://localhost:5173. Stop it with Ctrl + C.

## Pages

| Route | Page |
| --- | --- |
| `/` | Home |
| `/about` | About |
| `/episodes` | Episodes (filters, sort, See More) |
| `/quick-answers` | Open video / Quick answers (player, answer list) |
| `/guests` | Guests (Load More) |
| `/collaboration` | Collaboration (form with Sending → Sent) |
| `/contact` | Contact (form with Sending → Sent) |

## Things to fill in

- **External links:** `src/links.js` — every `#TODO-…` (Instagram, Facebook, X, TikTok, LinkedIn, WhatsApp channel, Orius Digital, legal pages, per-guest YouTube episodes).
- **Hero videos:** Home uses `public/video/ar-rasyidin-hero.mp4`, About uses `public/video/ar-logo.mp4`. Replace those files to change them.
- **Co-host roles and write-ups:** still placeholders in `COHOSTS` in `src/data.js` (shown in the list and the co-host pop-up).
- **Forms:** they show the Sending/Sent states but don't send email yet — connect them to a form service (Formspree, Resend, etc.) in `src/components/Form.jsx`.

## Motion

Tokens live in `src/motion.js` (same values as the Figma spec): quick 160 ms, medium 320 ms, slow 560 ms, press spring 400/30/1, 60 ms stagger, 24 px rise (16 px on mobile).

## Deploy

The site uses relative paths and hash URLs (`/#/about`), so the build works from any folder, including a GitHub Pages repo (`username.github.io/repo-name/`).

**GitHub Pages:** build into the upload folder, then upload everything inside `../github-upload` (including `.nojekyll`) to the root of the repo. In the repo go to Settings → Pages → Deploy from a branch → `main` / `(root)`.

```bash
npm run build -- --outDir ../github-upload --emptyOutDir && touch ../github-upload/.nojekyll
```

Plain `npm run build` creates `dist/` for Vercel or Netlify (framework: Vite).
