/**
 * A Lambda function that logs the payload received from a CloudWatch scheduled event.
 */

const webPush = require('web-push');

const pushNotification = async () => { 
  const payload = JSON.stringify({
    title: 'web pushテスト',
    message: 'メッセージです！'
  })

  // 通知を送信するためのオプションを設定
  const options = {
    TTL: 60, // 通知が有効な期間（秒単位）
    vapidDetails: {
      subject: 'http://localhost:3000', // この通知を送信するサイトのURL
      publicKey: 'BNLu-BaOugfzE8CYW9sTmNxquwRM1Td4XhQOIvGlH6U8grkYT_TwJtr-ELHt_i08e-LSjTOb84YBv5L_o250u-A', // VAPIDで使用する公開鍵
      privateKey: 'j7MeXhoqElLnRKIWGNYOKHfj82CiN3Z85LYwe8Pyrsg' // VAPIDで使用する秘密鍵
    }
  };

  const targets = [
    {
      endpoint: 'https://updates.push.services.mozilla.com/wpush/v2/gAAAAABkUvLPmviB1S1hOqw5ONg9S2zh762h-e4ZP0dpGq6MJ9Ck_aGnFQnKz-G_BANNQdOP4vkZDToI4XDtZ6SFEl18IWAPxhBuhks82HKBH-JlssE0v1N_gbAtZNBVDbQ7L4NU1pIHcW_NDAFw-KDA2NBAN9NpAhtNL9KEyLUaef24eRn8XcM',
      keys: {
        p256dh: 'BGAPzYtSfJryR4FuMAStJ2yO24Mjmsvkz3m0RhnHhacmvUNGE8LcU-RYGZzDe3eSZgWFeniDwSLCNqTAtMFA0Nw',
        auth: 'WsUJ2SDscho_1VAU5HhirA'
      }
    },
  ];

  if (options.vapidDetails.publicKey === '' || options.vapidDetails.privateKey === '') return

  console.log('通知をします。')

  // targetsをPromiseで処理する配列を作る
  const sends = targets.map(async target => {
    try {
      console.log('target', target)
      const response = await webPush.sendNotification(target, payload, options)
      console.info(response)
    }
    catch (e) {
      console.error('通知の送信に失敗しました。', e);
    }
  })

  // promise allでsendsを実行する
  Promise.all(sends)
}

// debug
// pushNotification()

exports.LambdaHandler = async (event, context) => {
  console.info(JSON.stringify(event));
  pushNotification()
}