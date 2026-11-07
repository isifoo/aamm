# AAMM: All Apps Mind Map

A private tracker for everything I have built: status, category, roadmap, tasks, updates and links per project.

## Run it
Open `index.html` in a browser, or use the hosted copy on GitHub Pages. It is one self-contained file with no build step.

## How it works
- Data lives in a Firebase Realtime Database (`aamm/projects`) and syncs across devices.
- Access is private. You sign in with the owner account, and the database rules only let that account read or write, so the data stays locked even though the page is public.
- Views: Table, Grid, Board, Timeline, Dashboard. Group by status, priority, tag or category.

## Editing
Everything is in `index.html`. Edit the file, commit, and push to `main`. GitHub Pages rebuilds in about a minute.

---

# eat.

A phone-first web app for picking where to eat in New York. It lives in `eat/` and is served at `/eat/` on the same GitHub Pages site.

- **Neighborhoods**: Williamsburg, Greenpoint, Bushwick, DUMBO, Fort Greene, Park Slope, Midtown, Chelsea, the Villages, LES, SoHo, FiDi, the Upper East and West Sides, Harlem, Astoria, LIC, or **Near me** (about 1 km around your location). Tap the name under the logo to switch. Each neighborhood keeps its own list; your ratings follow you everywhere.
- **Google Maps scan**: with a Google Places API key, it searches about 40 cuisine queries inside the neighborhood and loads every restaurant, café and bar it finds, with rating, review count, price, open-now and map position.
- **Stays fresh**: it rescans the current neighborhood on its own (daily, every 3 days, weekly or monthly), or tap the refresh time above the list. Places missing from three scans in a row are dropped unless you rated or saved them.
- **List, grid and map** views. The map uses OpenStreetMap.
- **Minimum rating** chips, search, genre chips, and tabs for Saved, Been, Not yet and Added.
- **Genres to skip** (Settings): hide the genres you never want, everywhere.
- **Slot machine**: the 🎰 button shows or hides a small reel that spins through the genres that pass your filters; "Pick a spot" then chooses a restaurant.
- **Your own data**: add places, give them stars, notes, saved and been-there flags. "Filter by my rating" makes your stars override Google's.

## Weekly Google Maps scan (no key on your phone)
GitHub scans the neighborhoods in `eat/scan-config.json` every Monday with `.github/workflows/eat-scan.yml`, and saves the results to `eat/data/`. The page reads those files, so phones never need a Google key.

1. In Google Cloud, link billing, enable **Places API (New)**, and create an API key restricted to *Places API (New)*. A key that is also restricted to `https://isifoo.github.io/*` works too; the scan sends that address.
2. In this repo on GitHub: **Settings → Secrets and variables → Actions → New repository secret**, name it `EAT_GOOGLE_KEY` and paste the key.
3. **Actions → eat weekly scan → Run workflow** to run the first scan now.

To scan more neighborhoods, add their names to `zones` in `eat/scan-config.json` (the names are the keys of `ZONES` in `eat/core.js`, like `eastvillage` or `ues`).

**Cost guard**: one neighborhood scan is about 60–150 Text Search requests (billed as Text Search Enterprise: 1,000 free a month, then about $35 per 1,000). The scan stops each neighborhood at 150 requests and skips scans once the month reaches `monthlyLimit` (900 by default), so a weekly scan of two neighborhoods stays inside the free amount. Setting a $1 budget alert in Google Cloud Billing is still a good idea.

**Your own key (optional)**: Settings → "Your own key" lets one device scan Near me or other neighborhoods directly. That key lives only in that browser; Safari and the Home Screen app keep separate copies.

## Install on iPhone
Open the page in Safari → Share → **Add to Home Screen**. It runs full screen like an app.
