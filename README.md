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
