/* Canvas service worker — minimal offline-first cache for the app shell and fonts. */

const VERSION = "canvas-v3";
const APP_SHELL = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./icon-192.png",
  "./icon-512.png",
  "./apple-touch-icon.png",
  "./favicon.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(VERSION).then((cache) => cache.addAll(APP_SHELL))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      const hadPreviousVersion = keys.some((k) => k.startsWith("canvas-") && k !== VERSION);
      return Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k)))
        .then(() => self.clients.claim())
        .then(() => {
          if (!hadPreviousVersion) return;
          return self.clients.matchAll({ type: "window", includeUncontrolled: true }).then((clients) => {
            for (const client of clients) client.postMessage({ type: "CANVAS_UPDATED", version: VERSION });
          });
        });
    })
  );
});

/* Strategy:
   - For navigations and same-origin GETs: cache-first, fall back to network, then update the cache.
   - For Google Fonts (CSS + woff2): stale-while-revalidate-style caching so they work offline.
   - Anything else: just go to network.
*/
self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;

  const url = new URL(req.url);
  const sameOrigin = url.origin === self.location.origin;
  const isFonts = url.hostname === "fonts.googleapis.com" || url.hostname === "fonts.gstatic.com";

  if (!sameOrigin && !isFonts) return; // let everything else go straight to the network

  event.respondWith(
    caches.match(req).then((cached) => {
      const networkFetch = fetch(req)
        .then((response) => {
          if (response && response.ok) {
            const clone = response.clone();
            caches.open(VERSION).then((cache) => cache.put(req, clone));
          }
          return response;
        })
        .catch(() => cached); // offline → fall back to whatever we have

      // Cache-first for the shell so launches are instant; revalidate in the background.
      return cached || networkFetch;
    })
  );
});
