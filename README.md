# Qorbit Tech — Web & Digital Agency Application

Full-featured React digital agency website for **Qorbit Tech**.

## What's replicated

- Original CSS (animations, hovers, layout, typography)
- All homepage sections in the same order
- Portfolio tab switching (`box-*` / `showfirst` pattern)
- Pricing tabs + carousel (`package_slider`)
- Reliability carousel with SVG shape overlays
- Animated counters on scroll
- Testimonials slick carousel
- Contact form + footer
- Custom cursor with follower ring
- Popup quote form (`#popup_form`)
- AOS scroll animations

## Run locally

```bash
npm install
npm run dev
```

Open the URL shown in the terminal (usually `http://localhost:5173`).

## Stack

- React 19 + Vite
- Tailwind CSS (base only — styling comes from original CSS)
- AOS, React Slick, SweetAlert2
- Bootstrap 4 grid (via CDN)
- Font Awesome 5 (via CDN)

## Customize colors later

Edit `src/theme.css` — CSS variables are set to the original gold palette by default.

## Project structure

```
src/
  components/     Section components matching original HTML classes
  data/           Pricing package data
  assets/css/     Downloaded original CSS + CDN image path fixes
  constants/      CDN asset URLs
```

Assets (images, backgrounds) load from the live CDN so the site looks identical without downloading files. To cache locally:

```bash
node scripts/fetchAssets.mjs
```
