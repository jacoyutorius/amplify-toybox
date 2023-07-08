import { Amplify } from "aws-amplify";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// pages
import { Home } from './pages/Home';
import { ServiceWorkerPage } from './pages/ServiceWorker';
import { CachePage } from './pages/Cache';
import { AnalyticsPage } from './pages/Analytics';
import { AuthPage } from './pages/Auth';

import awsConfig from './aws-exports';

const isLocalhost = Boolean(
  window.location.hostname === 'localhost' ||
    // [::1] is the IPv6 localhost address.
    window.location.hostname === '[::1]' ||
    // 127.0.0.1/8 is considered localhost for IPv4.
    window.location.hostname.match(
      /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    )
);

// Assuming you have two redirect URIs, and the first is for localhost and second is for production
const [
  localRedirectSignIn,
  productionRedirectSignIn,
] = awsConfig.oauth.redirectSignIn.split(',');

const [
  localRedirectSignOut,
  productionRedirectSignOut,
] = awsConfig.oauth.redirectSignOut.split(',');

const updatedAwsConfig = {
  ...awsConfig,
  oauth: {
    ...awsConfig.oauth,
    redirectSignIn: isLocalhost ? localRedirectSignIn : productionRedirectSignIn,
    redirectSignOut: isLocalhost ? localRedirectSignOut : productionRedirectSignOut,
  }
}

Amplify.configure(updatedAwsConfig);
console.log(updatedAwsConfig)

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/service-worker" element={<ServiceWorkerPage />}></Route>
        <Route path="/cache" element={<CachePage />}></Route>
        <Route path="/analytics" element={<AnalyticsPage />}></Route>
        <Route path="/auth" element={<AuthPage />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
