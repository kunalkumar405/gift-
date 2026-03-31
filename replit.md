# Happy Birthday / Valentine's Day - Ananya

## Overview

A pure static HTML/CSS/JS interactive surprise website for Ananya. No build system or package manager — everything runs directly in the browser.

## Project Structure

- `index.html` — Main page with all sections (hero, envelope, gallery, love notes, proposal, countdown, etc.)
- `style.css` — Stylesheet (referenced, may need to be added)
- `script.js` — JavaScript interactions (referenced, may need to be added)
- `images/` — Photo assets referenced in the gallery
- `music/` — Background music (`gift.mp3`)

## Running the App

The app is served using Python's built-in HTTP server:

```
python3 -m http.server 5000
```

Workflow: **Start application** → serves on port 5000.

## Deployment

Configured as a **static** deployment. The public directory is `.` (project root).
