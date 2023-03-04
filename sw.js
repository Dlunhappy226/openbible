const cacheName = "openbible";
const cacheFile = [
    "/",
    "/index.html",
    "/bootstrap/css/bootstrap.min.css",
    "/reader.css",
    "reader.js",
    "/bootstrap/js/bootstrap.bundle.min.js",
    "/jquery-3.6.3.min.js",
    "/bible/key_english.json",
    "/bible/t_kjv.json",
    "/bootstrap-icons/bootstrap-icons.css",
    "/bootstrap-icons/fonts/bootstrap-icons.woff2?24e3eb84d0bcaf83d77f904c78ac1f47",
    "/bootstrap-icons/fonts/bootstrap-icons.woff?24e3eb84d0bcaf83d77f904c78ac1f47",
];

for (let x = 1; x < 67; x++) {
    cacheFile.push("/b?=" + x)
}

self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(cacheName).then(cache => {
            cache.addAll(cacheFile);
        })
    );
});

self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request).then(res => {
            if (res) {
                return res;
            }else{
                return fetch(event.request);
            }
        })
    );
});
