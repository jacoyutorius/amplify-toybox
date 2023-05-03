import { Link } from "react-router-dom";

export const Home = () => (
  <div>
    <h1>Amplify Toybox</h1>
    <p>Amplifyの機能を試すためのサンプルアプリです。</p>
    <p>以下の機能を試すことができます。</p>
    <ul>
      <li><Link to="service-worker">Service Worker</Link></li>
      
      
      <li>Cache</li>
    </ul>
  </div>
)
