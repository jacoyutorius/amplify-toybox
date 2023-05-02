import { useEffect, useState } from "react";
import { ServiceWorker } from "aws-amplify";

// AmplifyでServiceWorkerを利用する
// https://docs.amplify.aws/lib/project-setup/prereq/q/platform/js#service-worker
export const useAmplifyServiceWorker = () => { 
  const [state, setState] = useState<string>("");
  const [endpointInfo, setEndpointInfo] = useState<string>("");
  const serviceWorker = new ServiceWorker();

  const isPushSupported = () => { 
    return ('serviceWorker' in navigator && 'PushManager' in window);
  }
  
  const updateState = async (registeredServiceWorker:any) => {
    if (!isPushSupported()) {
      console.log("Push 通知がサポートされていない環境")
      setState('Push 通知がサポートされていない環境')
      setEndpointInfo('')
      return;
    }

    console.log(Notification.permission)

    // 購読状況によって UI を変える
    if (Notification.permission === 'denied') {
      setState('ブロック済')
      setEndpointInfo('')
    } else {
      const subscription = await registeredServiceWorker.pushManager.getSubscription();
      if (subscription) {
        setState('購読済')
        setEndpointInfo(JSON.stringify(subscription))
      } else {
        setState('未購読')
        setEndpointInfo('')
      }
    }
  }

  useEffect(() => {
    const register = async () => {
      const registeredServiceWorker:any = await serviceWorker.register('./serviceWorker.js', '/');

      if ('permissions' in navigator) {
        const notificationPermission = await navigator.permissions.query({name:'notifications'});
        notificationPermission.onchange = () => {
          updateState(registeredServiceWorker)
        };
      }

      if (Notification.permission !== 'denied') {
        await serviceWorker.enablePush('<service worker public key>');
      }

      updateState(registeredServiceWorker)
    }

    register();
  })

  return {
    state,
    endpointInfo
  }
}