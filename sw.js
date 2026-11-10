// emPat Data sin internet. Generado por tools/demo.mjs: no editar a mano.
// Guarda la app al instalarse y la sirve desde la caché (rápido y sin red); en segundo plano trae la versión nueva si la hay.
// Firebase (cuenta y directo) no pasa por aquí: va directo a la red y la app ya sabe esperar a que vuelva la conexión.
const CACHE = "empat-79779313490e";
const SHELL = ["./","privacidad.html","manifest.webmanifest","icono.svg","icono-32.png","icono-180.png","icono-192.png","icono-512.png","icono-maskable-512.png"];
self.addEventListener("install", e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting())) });
self.addEventListener("activate", e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k.startsWith("empat-") && k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())) });
self.addEventListener("fetch", e => {
  const req = e.request, url = new URL(req.url);
  if (req.method !== "GET" || url.origin !== location.origin) return;
  const key = req.mode === "navigate" && url.pathname.endsWith("/") ? new Request("./") : req;
  e.respondWith(caches.open(CACHE).then(async c => {
    const hit = await c.match(key, { ignoreSearch: true });
    const net = fetch(req).then(r => { if (r.ok && r.type === "basic") c.put(key, r.clone()); return r }).catch(() => hit || Response.error());
    if (hit) { e.waitUntil(net.catch(() => {})); return hit }
    return net;
  }));
});
