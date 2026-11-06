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

A phone-first web app for picking where to eat in Williamsburg, Brooklyn. It lives in `eat/` and is served at `/eat/` on the same GitHub Pages site.

- **Google Maps scan**: with a Google Places API key, it searches about 40 cuisine queries inside a Williamsburg bounding box and loads every restaurant, café and bar it finds, with live rating, review count, price and open-now.
- **Stays fresh**: it rescans on its own (daily, every 3 days, weekly or monthly, set in Settings), or tap the "Updated…" pill to rescan now. Places missing from three scans in a row are dropped, unless you rated or saved them.
- **Minimum rating** slider and presets, plus search, genre chips, and views for Saved, Been, Not yet and Added.
- **Slot machine** spins through the genres that pass your filters; "Pick a spot" then chooses one restaurant from that genre.
- **Your own data**: add places, give them your own stars, notes, saved and been-there flags. Turn on "Filter by my rating" to have your stars override Google's.
- Before the first scan it shows a hand-picked starter list with approximate ratings.

## Set up the Google Maps scan
1. In Google Cloud, create a project and enable **Places API (New)**.
2. Create an API key. Restrict it to *Places API (New)* and to the site address (for example `https://<user>.github.io/*`).
3. Open eat., tap the gear, paste the key, and tap **Scan Williamsburg now**.

The key, your ratings and your added places are stored only in that browser (localStorage). Use Settings → Export to back them up. A full scan is roughly 100 Text Search requests; at a weekly refresh that stays within Google's monthly free usage, but check current Places API pricing for your account.

## Install on iPhone
Open the page in Safari → Share → **Add to Home Screen**. It runs full screen like an app.
