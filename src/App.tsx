import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// pages
import { Home } from './pages/Home';
import { ServiceWorkerPage } from './pages/ServiceWorker';
import { CachePage } from './pages/Cache';
import { AnalyticsPage } from './pages/Analytics';
import { AuthPage } from './pages/Auth';

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
