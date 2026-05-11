# Canvas

Canvas is a small offline-first sticky note board for thinking visually. It runs as a static Progressive Web App, stores notes in the browser, and works without a backend after the first load.

## Features

- Infinite canvas with pan and zoom
- Sticky notes with quick swatches and custom colours
- Checklist, bullet list, simple text sizing, bold, and italic formatting inside notes
- Multi-select, grouping, duplication, deletion, and fit-to-content
- Local JSON export and import
- Installable PWA with offline caching

## Demo

Open `index.html` directly for a quick look, or serve the folder over `localhost` to test the PWA behavior.

```bash
python -m http.server 8080
```

Then visit <http://localhost:8080>.

## Project Structure

```text
.
├── index.html
├── manifest.webmanifest
├── service-worker.js
├── apple-touch-icon.png
├── favicon.png
├── icon-192.png
├── icon-512.png
├── icon-maskable-192.png
└── icon-maskable-512.png
```

## Usage

- Add a note with the **Note** button or press `N`.
- Pan by dragging empty canvas space.
- Zoom with the toolbar controls or mouse wheel.
- Select notes, then use the toolbar to group, ungroup, recolor, or delete them.
- Use the swatches for quick colours, or the colour-wheel control for a custom colour. Desktop users can type a hex value.
- While editing a note, select text to use bold, italic, text size, bullet list, or checklist formatting.
- Export with `Cmd/Ctrl + E`; import with `Cmd/Ctrl + O`.

## Mobile Notes

The toolbar scrolls horizontally on narrow screens so all controls remain reachable. Tap a note to edit it, drag empty space to pan, and use the **Note** button to create new notes.

## Data Storage

Canvas stores data in `localStorage` under `canvas-state-v2`. Browser site-data clearing will remove saved notes, so export important boards regularly.

## Deployment

Any static host works. PWA installation requires HTTPS, except on `localhost`.

Common options:

- GitHub Pages
- Netlify
- Cloudflare Pages
- Vercel

After deploying an update, bump the `VERSION` value in `service-worker.js`. Existing installed PWAs will update their cached app shell and show a small reload prompt when the new service worker activates.

## Development

This project is intentionally dependency-free: the HTML, CSS, and JavaScript live in `index.html`. Keep changes small and test both desktop and mobile-sized viewports before publishing.

## License

No license is currently specified. Add a license before publishing if you want others to use or contribute to the project.
