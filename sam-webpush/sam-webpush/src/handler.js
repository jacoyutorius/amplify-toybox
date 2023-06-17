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
      publicKey: 'BD7ZbnEaf3YkXLvOYxuKrKUAciDWvZwoXzUg5cW34TE_D1tflAQqFLhKjObqOPv3c4XneBJ6GMpmOZCgd2tQeLM', // VAPIDで使用する公開鍵
      privateKey: '3abTj2qW2Php-pSPq2w6FwBq4OP6nlT_VBZI6FDHbKw' // VAPIDで使用する秘密鍵
    }
  };

  const targets = [
    // {
    //   endpoint: 'https://updates.push.services.mozilla.com/wpush/v2/gAAAAABkUvLPmviB1S1hOqw5ONg9S2zh762h-e4ZP0dpGq6MJ9Ck_aGnFQnKz-G_BANNQdOP4vkZDToI4XDtZ6SFEl18IWAPxhBuhks82HKBH-JlssE0v1N_gbAtZNBVDbQ7L4NU1pIHcW_NDAFw-KDA2NBAN9NpAhtNL9KEyLUaef24eRn8XcM',
    //   keys: {
    //     p256dh: 'BGAPzYtSfJryR4FuMAStJ2yO24Mjmsvkz3m0RhnHhacmvUNGE8LcU-RYGZzDe3eSZgWFeniDwSLCNqTAtMFA0Nw',
    //     auth: 'WsUJ2SDscho_1VAU5HhirA'
    //   }
    // },
    {
      endpoint: 'https://fcm.googleapis.com/fcm/send/fL7Kr7uRcUU:APA91bF5MhP7ATJ3TtHXUXC3F3OTWIQw1owlxf1csYzEsv4hVm7-QhYWgr2Dp3ekazIZvN0bNQ6DX9Qz7AQvQ-G2fMCagVJakiOxPPMg0K5T47eYnsL6iqaRMWI_E2wsITKcElCGNjhk',
      keys: {
        p256dh: 'BGu6sgiGCB3-rFUEO3qfJSEjW1cde3Nz2zIzI-Iwx7h-dcBM7qNzFZoQe7KgZb-Tx7Yx33CbqTQEOu-t-tSH2c0',
        auth: '7rWZWSQnOmMrd0Cq7Yj5hA'
      }
    },
    {
      endpoint: 'https://updates.push.services.mozilla.com/wpush/v2/gAAAAABkU608J7-0oO9pbsxBUojMPNBYBMrV0YrDpF2RIhE_-PR53ar9gjf0QEaJlDz2GvIHZV14ElLX8Y1CZRqb5AtW_X0_NgS37AodlfQgC0vzyl5QT6U0BxiYxAVVJJ6JkDsSi2zt2Ikh95s600uGzwAch32YGFY5RQ7QYfsjqKXiyxxgMQk',
      keys: {
        p256dh: 'BLR90NlF4H3Bu8siUU0vg3s3hfwtsVbMvhEeEmWizZP98XVH9rueQ2ES1QiR9ld9DI6vZElIpXbvXN_WoIXB1R0',
        auth: 'OYQv7QwCR-XX90Iv44y_rw'
      }
    },
    {
      endpoint: 'https://fcm.googleapis.com/fcm/send/fN0WQLsXK1w:APA91bEcebkMDKGrsenIx96lvz_bW4CGPwPOktUpNxDU0b3WJGhPPQs09dW1dmi50Rqc6uILkXCu0Msl0I7Yied8jqYS6Z1k5vPOOTFSbo0uu1CMxjfsWI-7gXoYMn5bL--kHodR3QQD',
      keys: {
        p256dh: 'BBuZIwdEu1UcTT_U0WNOcvpVc4ThBr-cETvq56KTxu_ABfDvt9oMKpwv8gKBnSZOFPVOY-wN6qVZcSi52etqiCA',
        auth: 'WwGvKlHw3ZaJng51g8tK1A'
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
pushNotification()

// exports.LambdaHandler = async (event, context) => {
//   console.info(JSON.stringify(event));
//   pushNotification()
// }