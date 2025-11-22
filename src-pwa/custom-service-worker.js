/// <reference lib="webworker" />
/* eslint-env serviceworker */

import { clientsClaim } from 'workbox-core'
import {
  precacheAndRoute,
  cleanupOutdatedCaches,
  createHandlerBoundToURL,
} from 'workbox-precaching'
import { registerRoute, NavigationRoute } from 'workbox-routing'
import { NetworkFirst, CacheFirst, StaleWhileRevalidate } from 'workbox-strategies'
import { ExpirationPlugin } from 'workbox-expiration'

self.skipWaiting()
clientsClaim()

// ----------------------
// ✅ Precache
// ----------------------
const PRECACHE_MANIFEST = [{ url: '/index.html', revision: '1' }, ...self.__WB_MANIFEST]
precacheAndRoute(PRECACHE_MANIFEST)
cleanupOutdatedCaches()

// ----------------------
// ✅ SPA Navigation fallback
// ----------------------
const FALLBACK_HTML = '/index.html' // pastikan ini sesuai path yang di-precache
const navigationHandler = createHandlerBoundToURL(FALLBACK_HTML)
const navigationRoute = new NavigationRoute(navigationHandler, {
  denylist: [/^\/workbox-(.)*\.js$/, /^\/__/], // jangan intercept SW dan manifest
})
registerRoute(navigationRoute)

// ----------------------
// ✅ API caching
// ----------------------
registerRoute(
  ({ url }) => url.pathname.startsWith('/api/'),
  new NetworkFirst({
    cacheName: 'api-cache',
    networkTimeoutSeconds: 5,
    plugins: [
      new ExpirationPlugin({
        maxEntries: 50,
        maxAgeSeconds: 5 * 60,
      }),
    ],
  }),
)

// ----------------------
// ✅ Image caching
// ----------------------
registerRoute(
  ({ request }) => request.destination === 'image',
  new CacheFirst({
    cacheName: 'image-cache',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 50,
        maxAgeSeconds: 24 * 60 * 60,
      }),
    ],
  }),
)

// ----------------------
// ✅ Font caching
// ----------------------
registerRoute(
  ({ request, url }) =>
    request.destination === 'font' ||
    url.origin.includes('fonts.googleapis.com') ||
    url.origin.includes('fonts.gstatic.com'),
  new CacheFirst({
    cacheName: 'font-cache',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 30,
        maxAgeSeconds: 365 * 24 * 60 * 60,
      }),
    ],
  }),
)

// ----------------------
// ✅ CSS & JS static assets
// ----------------------
registerRoute(
  ({ request }) => request.destination === 'style' || request.destination === 'script',
  new StaleWhileRevalidate({
    cacheName: 'static-assets-cache',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 50,
        maxAgeSeconds: 7 * 24 * 60 * 60,
      }),
    ],
  }),
)

// ----------------------
// ✅ Push Notifications
// ----------------------
self.addEventListener('push', (event) => {
  const data = event.data?.json() || {}
  const title = data.title || 'Notification'
  const options = {
    body: data.body || 'You have a new message',
    icon: data.icon || '/icons/icon-192x192.png',
    badge: data.badge || '/icons/icon-128x128.png',
    data: data.url || '/',
  }
  event.waitUntil(self.registration.showNotification(title, options))
})

self.addEventListener('notificationclick', (event) => {
  event.notification.close()
  const url = event.notification.data
  event.waitUntil(
    clients.matchAll({ type: 'window' }).then((clientList) => {
      for (const client of clientList) {
        if (client.url === url && 'focus' in client) return client.focus()
      }
      if (clients.openWindow) return clients.openWindow(url)
    }),
  )
})

// ----------------------
// ✅ Force update SW immediately
// ----------------------
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') self.skipWaiting()
})
