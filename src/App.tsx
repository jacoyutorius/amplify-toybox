import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// pages
import { Home } from './pages/Home';
import { ServiceWorkerPage } from './pages/ServiceWorker';
import { CachePage } from './pages/Cache';
import { AnalyticsPage } from './pages/Analytics';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/service-worker" element={<ServiceWorkerPage />}></Route>
        <Route path="/cache" element={<CachePage />}></Route>
        <Route path="/analytics" element={<AnalyticsPage />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
