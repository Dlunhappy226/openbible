const cacheName = "openbible";
const cacheFile = [
    "/",
    "/bootstrap/css/bootstrap.min.css",
    "/reader.css",
    "/bootstrap/js/bootstrap.bundle.min.js",
    "/jquery-3.6.3.min.js",
    "/bible/key_english.json",
    "/bible/t_kjv.json",
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
            return res || fetch(event.request);
        })
    );
});
