/* 熊本城 深度導覽 — Service Worker（離線快取）*/
var CACHE = "kumamoto-guide-v2";
var ASSETS = [
  "./",
  "./index.html",
  "./css/style.css",
  "./js/app.js",
  "./data/spots.js",
  "./data/timeline.js",
  "./manifest.webmanifest",
  "./icons/icon.svg",
  "./images/hero_tenshu.jpg",
  "./images/tenshu.jpg",
  "./images/uto_tenshu.jpg",
  "./images/iidamaru.png",
  "./images/three_towers.jpg",
  "./images/nagabei.jpg",
  "./images/johsaien.jpg",
  "./images/wakuwakuza.jpg",
  "./images/tokubetsu.jpg",
  "./images/niyou.jpg",
  "./images/kuragari.jpg"
];

self.addEventListener("install", function (e) {
  e.waitUntil(
    caches.open(CACHE).then(function (c) { return c.addAll(ASSETS); })
      .then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener("activate", function (e) {
  e.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.map(function (k) {
        if (k !== CACHE) return caches.delete(k);
      }));
    }).then(function () { return self.clients.claim(); })
  );
});

// cache-first：離線優先，命中即回；沒命中再上網並順手快取
self.addEventListener("fetch", function (e) {
  if (e.request.method !== "GET") return;
  e.respondWith(
    caches.match(e.request).then(function (hit) {
      if (hit) return hit;
      return fetch(e.request).then(function (res) {
        if (res && res.status === 200 && res.type === "basic") {
          var copy = res.clone();
          caches.open(CACHE).then(function (c) { c.put(e.request, copy); });
        }
        return res;
      }).catch(function () {
        return caches.match("./index.html");
      });
    })
  );
});
