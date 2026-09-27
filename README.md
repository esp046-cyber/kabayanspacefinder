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

## 🔄 Keeping listings fresh (automated, free, no scraping)

This project intentionally does **not** scrape Dubizzle/Bayut — both sites'
Terms of Service prohibit automated scraping, and Facebook groups have no
public feed to scrape at all. Instead, `scripts/sync-sheet.js` refreshes
`src/data/listings.js` every morning from a **Google Sheet you maintain
yourself**, which is a source you fully control and are authorized to
publish. This is also the only realistic way to get Kabayan Facebook-group
posts into the app: someone manually copies a promising post into the sheet.

### 1. Create the sheet

Make a Google Sheet with this exact header row (order doesn't matter, casing
doesn't matter):

```
id, source, title, location, type, price, gender, dewaIncluded, wifiIncluded,
metroStation, metroWalkMins, postedBy, postedVia, postedDaysAgo, notes
```

- `location` must be one of: `Deira`, `Al Karama`, `Al Satwa`, `Bur Dubai`
- `type` must be one of: `Lower Bunk`, `Upper Bunk`, `Solo Partition`
- `price` must be a number between 500 and 1500 (AED) — anything outside
  that range is automatically skipped
- `dewaIncluded` / `wifiIncluded` accept `true`/`false`/`yes`/`no`

Add one row per listing (e.g. whenever you spot a good Kabayan-group post,
copy its details into a new row).

### 2. Publish the sheet as CSV

File → Share → **Publish to web** → select the correct sheet/tab → format
**Comma-separated values (.csv)** → Publish. Copy the URL it gives you (it
looks like `https://docs.google.com/spreadsheets/d/e/.../pub?output=csv`).
This makes only that sheet readable by anyone with the link — your Google
account and Drive stay private.

### 3. Add it as a repo secret

In your GitHub repo: **Settings → Secrets and variables → Actions → New
repository secret**, name it `SHEET_CSV_URL`, and paste the published URL.

### 4. Let automation take it from here

`.github/workflows/sync-listings.yml` runs every day at **8:00 AM Dubai time**
(and can also be triggered manually from the **Actions** tab):

1. Fetches your published CSV
2. Validates and normalizes each row (bad rows are skipped with a warning,
   never a crash)
3. Regenerates `src/data/listings.js`
4. Commits the change (only if something actually changed)
5. Builds and deploys straight to GitHub Pages in the same run

That last point matters: a push made with the default `GITHUB_TOKEN` does
**not** trigger other workflows (GitHub blocks that on purpose to prevent
recursive runs), so this workflow builds & deploys itself rather than relying
on `deploy.yml` to notice the push.

### Local testing

```bash
SHEET_CSV_URL="https://docs.google.com/.../pub?output=csv" npm run sync:sheet
```

If `SHEET_CSV_URL` is missing, or the fetch/parse fails, or zero valid rows
come back, the script logs a clear warning and leaves your existing
`listings.js` untouched — it will never wipe your data or break the build.

### Alternative: private sheet via the Sheets API

If you'd rather not publish the sheet at all (e.g. it contains a landlord's
personal contact info you don't want indexable), a Google Service Account +
the Sheets API (read-only, sheet shared only with the service account email)
is a more locked-down option. That requires a few extra setup steps in Google
Cloud Console — ask if you'd like that version instead.

## ⚠️ Disclaimer

This app ships with **mock/sample listings** for demonstration. Always verify
any real listing, visit in person, and never send a deposit before confirming
the room, landlord identity, and refund terms.
