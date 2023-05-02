// @see https://qiita.com/akitsukada/items/9a72742d7598db84a28a#web-push-%E3%82%84%E3%82%8A%E3%81%9F%E3%81%84%E3%81%A8%E3%81%8D%E3%81%AB%E3%82%84%E3%82%89%E3%81%AA%E3%81%8D%E3%82%83%E3%81%84%E3%81%91%E3%81%AA%E3%81%84%E3%81%93%E3%81%A8

/**
 * Push 通知の受信時に発火するイベント
 */
addEventListener('push', (event) => {
  console.log('[Service Worker] Push Received.');
  console.log(`[Service Worker] Push had this data: "${event.data.text()}"`);

  if (!(self.Notification && self.Notification.permission === 'granted'))
    return;

  const data = event.data ? event.data.json() : {};

  const title = data.title || "Web Push Notification";
  const message = data.message || "New Push Notification Received";
  const icon = "path/to/image";
  const badge = "path/to/image";
  const options = {
    body: message,
    icon: icon,
    badge: badge
  };
  event.waitUntil(self.registration.showNotification(title, options));
});

/**
 * 通知がクリックされたときに発火するイベント
 * 通知ごとに適切なクリック時の処理を記述。
 * 今回は Amplify JavaScript のドキュメントを開くという処理にする。
 */
addEventListener('notificationclick', (event) => {
  console.log('[Service Worker] Notification click: ', event);
  event.notification.close();
  event.waitUntil(
    clients.openWindow('https://docs.amplify.aws/lib/utilities/serviceworker/q/platform/js/#handling-a-push-notification')
  );
});