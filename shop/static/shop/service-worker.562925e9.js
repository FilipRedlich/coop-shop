const e=["../../templates/shop/index.html","./ReadexPro-Regular.a256a5ed.ttf"];self.addEventListener("install",(t=>{t.waitUntil(caches.open("pwa-cache").then((t=>t.addAll(e))))})),self.addEventListener("fetch",(e=>{e.respondWith(caches.match(e.request).then((t=>t||fetch(e.request))))}));
//# sourceMappingURL=service-worker.562925e9.js.map
