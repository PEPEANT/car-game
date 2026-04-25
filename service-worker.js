const CACHE_NAME = "car-game-v11";
const ASSETS = [
  "./",
  "./index.html",
  "./admin.html",
  "./styles.css",
  "./data/levels.json",
  "./js/vehicle-assets.js?v=11",
  "./js/levels-data.js?v=11",
  "./game.js?v=11",
  "./assets/cars/individual/01-white-minivan.png",
  "./assets/cars/individual/02-pale-blue-compact.png",
  "./assets/cars/individual/03-silver-sedan.png",
  "./assets/cars/individual/04-charcoal-suv.png",
  "./assets/cars/individual/05-navy-wagon.png",
  "./assets/cars/individual/06-red-sedan.png",
  "./assets/cars/individual/07-white-van.png",
  "./assets/cars/individual/08-olive-pickup.png",
  "./favicon.svg",
  "./manifest.webmanifest",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)),
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))),
    ),
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  event.respondWith(
    caches.match(event.request).then((cached) =>
      cached || fetch(event.request).then((response) => {
        const copy = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
        return response;
      }),
    ),
  );
});
