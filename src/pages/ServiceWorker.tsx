import { useAmplifyServiceWorker } from '../hooks/useServiceWorker'

export const ServiceWorker = () => {
  const { state, endpointInfo } = useAmplifyServiceWorker()

  return (<section id='service-worker'>
      <h2>Service Worker</h2>
      <p>Service Workerの状態: {state}</p>
      <p>Service Workerのエンドポイント: </p>
      <code>{ endpointInfo }</code>
    </section>)
}
