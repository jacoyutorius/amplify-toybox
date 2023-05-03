import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// pages
import { Home } from './pages/Home';
import { ServiceWorkerPage } from './pages/ServiceWorker';
import { CachePage } from './pages/Cache';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/service-worker" element={<ServiceWorkerPage />}></Route>
        <Route path="/cache" element={<CachePage />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
