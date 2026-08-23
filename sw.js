const CACHE_NAME = 'hajib-scanner-v1';
const ASSETS = [
  './index.html',
  './js/jsQR.js',
  './success.mp3',
  './error.mp3',
  './used.mp3'
];

// تثبيت ملفات الكاش الأساسية
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS).catch(err => console.log("Caching on install skipped: ", err));
    })
  );
});

// تفعيل وتطهير الكاش القديم
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});

// الاستجابة لطلبات الشبكة وتوفير الكاش في حالة انقطاع الإنترنت
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((cachedResponse) => {
      return cachedResponse || fetch(e.request);
    })
  );
});