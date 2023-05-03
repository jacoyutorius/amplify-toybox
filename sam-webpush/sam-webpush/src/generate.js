const webpush = require('web-push');

(() => { 
  const vapidKeys = webpush.generateVAPIDKeys();
  console.log(`公開鍵: ${vapidKeys.publicKey}`);
  console.log(`秘密鍵: ${vapidKeys.privateKey}`);
})();