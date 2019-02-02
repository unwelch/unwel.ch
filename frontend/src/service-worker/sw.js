self.addEventListener('install', () => {
  self.skipWaiting()
})

self.addEventListener('push', ev => {
  const data = ev.data.json()

  self.registration.showNotification(data.title, {
    body: data.body,
    data: {
      url: data.link || 'https://unwel.ch'
    }
  })
})

self.addEventListener('notificationclick', event => {
  if (event.notification) {
    event.notification.close()
    if (event.notification.data && event.notification.data.url) {
      // FIX: ???
      // event.waitUntil(clients.openWindow(event.notification.data.url))
      event.waitUntil(self.clients.openWindow(event.notification.data.url))
    }
  }
})

self.addEventListener('fetch', function() {})
