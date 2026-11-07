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

## Set up the Google Maps scan
1. In Google Cloud, create a project, link billing, and enable **Places API (New)**.
2. Create an API key. Restrict it to *Places API (New)* and to the site address (`https://isifoo.github.io/*`).
3. Open eat., tap the settings button, paste the key, and tap **Scan … now**.

The key, your ratings and your added places are stored only in that browser (localStorage). Use Settings → Export to back them up. One neighborhood scan is roughly 40–120 Text Search requests, billed as Text Search Enterprise (1,000 free a month, then about $35 per 1,000). A weekly refresh of one neighborhood stays inside the free amount.

## Install on iPhone
Open the page in Safari → Share → **Add to Home Screen**. It runs full screen like an app.
