// Sube VERSION en cada cambio de la app: es el número que enseña la insignia de la cabecera.
const VERSION = 'casa-v1';
const SHELL = ['./', 'index.html', 'manifest.webmanifest', 'icono-fuente.svg', 'icono-192.png', 'icono-512.png', 'icono-maskable-512.png', 'icono-apple.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});

// Red primero y caché si no hay conexión: así un cambio publicado llega sin depender de VERSION,
// y la app sigue abriendo sin cobertura (en el sótano, junto al cuadro).
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
  e.respondWith(
    fetch(req).then(res => {
      if (res.ok) { const copy = res.clone(); caches.open(VERSION).then(c => c.put(req, copy)); }
      return res;
    }).catch(() => caches.match(req, { ignoreSearch: true }).then(r => r || caches.match('index.html')))
  );
});

self.addEventListener('message', e => {
  if (e.data === 'version' && e.ports[0]) e.ports[0].postMessage(VERSION);
});
