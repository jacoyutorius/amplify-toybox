const webPush = require('web-push');

const payload = JSON.stringify({
  title: 'web pushテスト',
  message: 'メッセージです！'
})

// 通知を送信するためのオプションを設定
const options = {
  TTL: 60, // 通知が有効な期間（秒単位）
  vapidDetails: {
    subject: 'http://localhost:3000', // この通知を送信するサイトのURL
    publicKey: '', // VAPIDで使用する公開鍵
    privateKey: '' // VAPIDで使用する秘密鍵
  }
};

const targets = [
  {
    endpoint: '',
    keys: {
      p256dh: '',
      auth: ''
    }
  },
];

(async () => {
  // targetsをPromiseで処理する配列を作る
  const sends = targets.map(async target => {
    try {
      const response = await webPush.sendNotification(target, payload, options)
      console.info(response)
    }
    catch (e) {
      console.error('通知の送信に失敗しました。', e);
    }
  })

  // promise allでsendsを実行する
  Promise.all(sends)
})();