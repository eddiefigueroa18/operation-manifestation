const { offlineFallback, warmStrategyCache } = require('workbox-recipes');
const { CacheFirst } = require('workbox-strategies');
const { registerRoute } = require('workbox-routing');
const { CacheableResponsePlugin } = require('workbox-cacheable-response');
const { ExpirationPlugin } = require('workbox-expiration');
const { precacheAndRoute } = require('workbox-precaching/precacheAndRoute');

precacheAndRoute(self.__WB_MANIFEST);

const pageCache = new CacheFirst({
  cacheName: 'page-cache',
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60,
    }),
  ],
});

warmStrategyCache({
  urls: ['/index.html', '/'],
  strategy: pageCache,
});

registerRoute(({ request }) => request.mode === 'navigate', pageCache);

// TODO: Implement asset caching
// This implements asset caching
// We define the callback function that is going to filter the requests that we want to cache (JS and CSS files)
registerRoute(({ request }) => ['style', 'script', 'worker'].includes(request.destination),
new CacheFirst({
  cacheName: 'asset-cache',
  plugins: [ // This plugin caches responses with the headers to 30 days max
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
  ],
}));
