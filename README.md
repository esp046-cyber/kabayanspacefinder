# Kabayan Space Finder 🇵🇭🏠

A Progressive Web App (PWA) to help Filipino expats find budget accommodation
(bed spaces & partitions) in Dubai, within a **500–1,500 AED/month** budget.

Built with **React + Vite + Tailwind CSS**, installable to home screen, and
works offline once loaded (via `vite-plugin-pwa` / Workbox).

## ✨ Features

- **Search Dashboard** — filter by location popular with Filipinos (Deira,
  Al Karama, Al Satwa, Bur Dubai), accommodation type (Lower Bunk, Upper Bunk,
  Solo Partition), max budget slider, DEWA-included toggle, and gender
  preference.
- **Listing Aggregator (mock)** — `src/data/listings.js` contains sample
  listings structured the way real posts from **Dubizzle**, **Bayut**, and
  **Facebook "Kabayan Bedspace" groups** typically look (price, gender pref,
  DEWA/WiFi inclusion, metro distance, notes, etc). Swap this file for a real
  API/scraper later without touching any UI code.
- **Social Media Contact Generator** — one tap generates a Taglish/English
  message asking the landlord about the 1-month deposit, DEWA/utilities
  inclusion, and Metro walking distance, then opens **WhatsApp** with the
  message pre-filled, or copies it and opens **Messenger**.
- **Installable PWA** — manifest + service worker included, so users can
  "Add to Home Screen" on mobile.

## 🚀 Run it locally

You need [Node.js](https://nodejs.org) 18+ installed.

```bash
# 1. Unzip the project, then cd into it
cd kabayan-space-finder

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

Then open the URL shown in the terminal (usually **http://localhost:5173**).

### Build for production

```bash
npm run build      # outputs to /dist
npm run preview    # serve the production build locally to test PWA install
```

To actually test "Add to Home Screen" / offline behavior, you must use
`npm run preview` (or deploy it) — the PWA service worker doesn't fully
activate under `npm run dev`.

## 📁 Project structure

```
kabayan-space-finder/
├── public/
│   ├── favicon.svg
│   └── icons/                  # PWA icons (192px, 512px)
├── src/
│   ├── components/
│   │   ├── SearchDashboard.jsx # Filters (location, type, budget, DEWA, gender)
│   │   ├── ListingCard.jsx     # Individual listing card
│   │   └── ContactModal.jsx    # WhatsApp / Messenger template generator
│   ├── data/
│   │   └── listings.js         # Mock aggregator "database"
│   ├── utils/
│   │   └── messageTemplates.js # Taglish message generation + deep links
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js              # includes vite-plugin-pwa config
└── package.json
```

## 🌐 Deploying to GitHub Pages

This project is pre-configured to deploy at `https://<your-username>.github.io/kabayanspacefinder/`:

- `vite.config.js` sets `base: '/kabayanspacefinder/'` so all built asset paths
  resolve correctly under the repo subfolder (a plain `npm run build` served
  as raw source, or missing this `base`, is what causes a blank white screen
  on GitHub Pages).
- `.github/workflows/deploy.yml` automatically runs `npm ci`, `npm run build`,
  and publishes the `dist/` folder to GitHub Pages on every push to `main`.

To activate it:

1. Push this project to a GitHub repo named **`kabayanspacefinder`** (if you
   use a different repo name, update the `base`, `start_url`, and `scope`
   values in `vite.config.js` to match: `/your-repo-name/`).
2. In the repo, go to **Settings → Pages → Build and deployment → Source**,
   and change it to **GitHub Actions**.
3. Push to `main`. The workflow builds and deploys automatically — check the
   **Actions** tab for progress, then visit the Pages URL shown there.

## 🔌 Wiring up real data later

Replace the contents of `src/data/listings.js` with data from:
- A **Dubizzle**/**Bayut** scraper or their (unofficial) APIs, or
- A backend that periodically pulls posts from **Facebook Kabayan groups**
  (via Graph API with proper permissions, or manual curation).

Keep each listing object's shape (`location`, `type`, `price`, `dewaIncluded`,
`metroStation`, etc.) the same and the whole UI keeps working as-is.

## ⚠️ Disclaimer

This app ships with **mock/sample listings** for demonstration. Always verify
any real listing, visit in person, and never send a deposit before confirming
the room, landlord identity, and refund terms.
