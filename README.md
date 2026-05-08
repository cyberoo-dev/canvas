# Canvas — PWA bundle

An infinite, calm canvas for sticky notes and grouping. Once installed it runs offline,
launches like a native app, and keeps your work in browser storage.

## What's in here

```
canvas-pwa/
├── index.html              ← the app (single-page, all logic inline)
├── manifest.webmanifest    ← PWA metadata: name, icons, colors
├── service-worker.js       ← offline cache for the app shell + Google Fonts
├── icon-192.png            ← any-purpose icon (Chrome, Edge, Safari)
├── icon-512.png            ← larger any-purpose icon
├── icon-maskable-192.png   ← Android adaptive-icon variant
├── icon-maskable-512.png   ← Android adaptive-icon variant
├── apple-touch-icon.png    ← iOS home-screen icon (180×180)
└── favicon.png             ← browser-tab icon
```

## Getting it online

PWAs require HTTPS (or `localhost`). Pick whichever is easiest:

**Netlify Drop — simplest, ~30 seconds**
1. Open <https://app.netlify.com/drop>
2. Drag this whole `canvas-pwa` folder onto the page
3. You'll get a URL like `https://something-random.netlify.app`
4. Open it on any device and install

**GitHub Pages — free, your own URL**
1. Create a public repo, drop these files in the root, commit
2. Settings → Pages → deploy from `main` branch, root folder
3. Wait a minute, visit `https://<user>.github.io/<repo>/`

**Cloudflare Pages / Vercel** — same idea: connect a repo, push, done.

**Local-only (testing on your machine)**
```bash
cd canvas-pwa
python3 -m http.server 8080
# then open http://localhost:8080 in Chrome
```
PWA features work on `localhost` even without HTTPS.

## Installing as an app

**Chrome / Edge (desktop and Android)**
Look for the install icon in the URL bar (a little monitor with a down-arrow), or
use the menu: ⋮ → "Install Canvas". On Android, also "Add to Home Screen".

**Safari (iOS / iPadOS)**
Tap the Share button → **Add to Home Screen**. This is the only install path on iOS.

**Safari (macOS, Sonoma+)**
File → Add to Dock.

After installing, the app launches in its own window without browser chrome.

## Moving work between devices

Each device stores its canvas in its own browser, so installing on your phone and
laptop gives you two separate canvases. To sync:

- **`⌘E` (or `Ctrl+E`)** — exports your current canvas as a JSON file
- **`⌘O` (or `Ctrl+O`)** — imports a JSON file (replaces the current canvas)

For automatic sync across devices you'd need a backend — that's beyond a static PWA.

## A note on data

Everything lives in `localStorage` under the key `canvas-state-v2`. Clearing site
data in your browser will erase your canvas, so export occasionally if it matters.

## Updating the app

The service worker caches files aggressively for offline use. To force the latest
version after you re-upload:
- Bump the `VERSION` string at the top of `service-worker.js` (e.g. `canvas-v1` → `canvas-v2`)
- Re-deploy
- On next launch, the old cache is wiped and the new files are fetched
